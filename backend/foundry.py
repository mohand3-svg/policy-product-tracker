"""
Palantir Foundry SQL connector.

Runs Spark SQL against Foundry's SQL Query API and returns rows as
list[dict]. Foundry executes queries asynchronously and returns results as
an Apache Arrow stream, which we parse with pyarrow.

Configuration (set as Ona environment secrets):
  FOUNDRY_HOST        - e.g. https://gene.palantirfoundry.com
  Auth, pick ONE:
    FOUNDRY_TOKEN                         - a bearer token, OR
    FOUNDRY_CLIENT_ID + FOUNDRY_CLIENT_SECRET  - OAuth2 client credentials
  FOUNDRY_BRANCH      - optional, defaults to "master"

Auth precedence: FOUNDRY_TOKEN wins if set; otherwise client-credentials are
exchanged for a token at /multipass/api/oauth2/token.
"""

import io
import os
import time

import requests

_POLL_INTERVAL_SEC = 0.75
_POLL_TIMEOUT_SEC = 90
_HTTP_TIMEOUT_SEC = 30

# Cached OAuth2 token: (access_token, expires_at_epoch)
_token_cache = {"token": None, "exp": 0}


def foundry_config():
    """Non-secret config for the health endpoint (never echoes token/secret)."""
    return {
        "host": os.environ.get("FOUNDRY_HOST"),
        "branch": os.environ.get("FOUNDRY_BRANCH", "master"),
        "auth_mode": _auth_mode(),
    }


def _auth_mode():
    if os.environ.get("FOUNDRY_TOKEN"):
        return "bearer_token"
    if os.environ.get("FOUNDRY_CLIENT_ID") and os.environ.get("FOUNDRY_CLIENT_SECRET"):
        return "oauth2_client_credentials"
    return None


def config_missing():
    """Return required env vars that are not set."""
    missing = []
    if not os.environ.get("FOUNDRY_HOST"):
        missing.append("FOUNDRY_HOST")
    if _auth_mode() is None:
        missing.append("FOUNDRY_TOKEN or (FOUNDRY_CLIENT_ID + FOUNDRY_CLIENT_SECRET)")
    return missing


def _host():
    return os.environ.get("FOUNDRY_HOST", "").rstrip("/")


def _bearer():
    """Return a valid bearer token, exchanging client credentials if needed."""
    static = os.environ.get("FOUNDRY_TOKEN")
    if static:
        return static

    now = time.time()
    if _token_cache["token"] and now < _token_cache["exp"] - 30:
        return _token_cache["token"]

    cid = os.environ.get("FOUNDRY_CLIENT_ID")
    secret = os.environ.get("FOUNDRY_CLIENT_SECRET")
    if not (cid and secret):
        raise RuntimeError("No Foundry auth configured (token or client credentials)")

    resp = requests.post(
        f"{_host()}/multipass/api/oauth2/token",
        data={"grant_type": "client_credentials", "client_id": cid, "client_secret": secret},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        timeout=_HTTP_TIMEOUT_SEC,
    )
    resp.raise_for_status()
    tok = resp.json()
    _token_cache["token"] = tok["access_token"]
    _token_cache["exp"] = now + int(tok.get("expires_in", 3600))
    return _token_cache["token"]


def _headers():
    return {"Authorization": f"Bearer {_bearer()}", "Content-Type": "application/json"}


def run_query(sql):
    """
    Execute Spark SQL on Foundry and return rows as list[dict], keyed by
    column name. Raises RuntimeError on failure or timeout.
    """
    missing = config_missing()
    if missing:
        raise RuntimeError(f"Missing Foundry configuration: {', '.join(missing)}")

    branch = os.environ.get("FOUNDRY_BRANCH", "master")
    base = f"{_host()}/foundry-sql-server/api/queries"

    # 1) Start the query
    start = requests.post(
        f"{base}/execute",
        json={"query": sql, "dialect": "SPARK", "fallbackBranchIds": [branch]},
        headers=_headers(),
        timeout=_HTTP_TIMEOUT_SEC,
    )
    start.raise_for_status()
    payload = start.json()
    query_id = payload.get("queryId") or payload.get("id")
    if not query_id:
        raise RuntimeError(f"Foundry did not return a queryId: {payload}")

    # 2) Poll until ready
    deadline = time.time() + _POLL_TIMEOUT_SEC
    while True:
        st = requests.get(f"{base}/{query_id}/status", headers=_headers(), timeout=_HTTP_TIMEOUT_SEC)
        st.raise_for_status()
        status = st.json().get("status", {})
        ready = status.get("ready") or status.get("type") == "ready"
        failed = status.get("failed") or status.get("type") == "failed"
        if ready:
            break
        if failed:
            raise RuntimeError(f"Foundry query failed: {status}")
        if time.time() > deadline:
            raise RuntimeError(f"Foundry query timed out after {_POLL_TIMEOUT_SEC}s (id={query_id})")
        time.sleep(_POLL_INTERVAL_SEC)

    # 3) Fetch Arrow results
    res = requests.get(
        f"{base}/{query_id}/results",
        headers={"Authorization": f"Bearer {_bearer()}", "Accept": "application/octet-stream"},
        timeout=_HTTP_TIMEOUT_SEC,
    )
    res.raise_for_status()
    return _arrow_to_rows(res.content)


def _arrow_to_rows(raw):
    """Parse an Arrow IPC stream (bytes) into list[dict]."""
    import pyarrow as pa  # imported lazily so the module loads without pyarrow

    reader = pa.ipc.open_stream(io.BytesIO(raw))
    table = reader.read_all()
    return table.to_pylist()
