"""
Palantir Foundry SQL connector (Platform API v2).

Runs Spark SQL against Foundry's SQL Query API and returns rows as
list[dict]. Foundry executes queries asynchronously and returns results as
an Apache Arrow IPC stream, which we parse with pyarrow.

API flow (confirmed against gene.palantirfoundry.com):
  POST /api/v2/sqlQueries/execute          {"query": "<sql>"}  -> {"queryId": ...}
  GET  /api/v2/sqlQueries/{id}/getResults  -> Arrow IPC stream (200 when ready)

Configuration (environment variables / Ona secrets):
  FOUNDRY_HOST   - defaults to https://gene.palantirfoundry.com
  Token, first match wins:
    GITHUB_DEV_WINS      (the working project token)
    FOUNDRY_TOKEN        (generic override)
  OAuth2 fallback (only if no token present):
    FOUNDRY_CLIENT_ID + FOUNDRY_CLIENT_SECRET
"""

import io
import os
import time

import requests

_POLL_INTERVAL_SEC = 1.0
_POLL_TIMEOUT_SEC = 90
_HTTP_TIMEOUT_SEC = 60

_DEFAULT_HOST = "https://gene.palantirfoundry.com"

# Cached OAuth2 token (only used when no static token is set).
_token_cache = {"token": None, "exp": 0}


def foundry_config():
    """Non-secret config for the health endpoint (never echoes the token)."""
    return {
        "host": _host(),
        "auth_mode": _auth_mode(),
    }


def _host():
    return (os.environ.get("FOUNDRY_HOST") or _DEFAULT_HOST).rstrip("/")


def _static_token():
    # Prefer the known-working project secret, then a generic override.
    return os.environ.get("GITHUB_DEV_WINS") or os.environ.get("FOUNDRY_TOKEN")


def _auth_mode():
    if _static_token():
        return "bearer_token"
    if os.environ.get("FOUNDRY_CLIENT_ID") and os.environ.get("FOUNDRY_CLIENT_SECRET"):
        return "oauth2_client_credentials"
    return None


def config_missing():
    """Return required config that is not set."""
    missing = []
    if not _host():
        missing.append("FOUNDRY_HOST")
    if _auth_mode() is None:
        missing.append("GITHUB_DEV_WINS / FOUNDRY_TOKEN or (FOUNDRY_CLIENT_ID + FOUNDRY_CLIENT_SECRET)")
    return missing


def _bearer():
    """Return a valid bearer token, exchanging client credentials if needed."""
    static = _static_token()
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

    base = f"{_host()}/api/v2/sqlQueries"

    # 1) Submit the query
    start = requests.post(
        f"{base}/execute",
        json={"query": sql},
        headers=_headers(),
        timeout=_HTTP_TIMEOUT_SEC,
    )
    start.raise_for_status()
    payload = start.json()
    query_id = payload.get("queryId") or payload.get("id")
    if not query_id:
        raise RuntimeError(f"Foundry did not return a queryId: {payload}")

    # 2) Poll getResults until it returns 200 with a body (query finished).
    #    While the query runs, getResults returns a non-200 / empty response.
    deadline = time.time() + _POLL_TIMEOUT_SEC
    auth_only = {"Authorization": f"Bearer {_bearer()}"}
    while True:
        res = requests.get(
            f"{base}/{query_id}/getResults",
            headers=auth_only,
            timeout=_HTTP_TIMEOUT_SEC,
        )
        if res.status_code == 200 and res.content:
            return _arrow_to_rows(res.content)
        if res.status_code >= 400 and res.status_code not in (202, 204, 409):
            # 4xx/5xx that isn't a "still running" style code -> real error
            raise RuntimeError(f"Foundry getResults {res.status_code}: {res.text[:300]}")
        if time.time() > deadline:
            raise RuntimeError(f"Foundry query timed out after {_POLL_TIMEOUT_SEC}s (id={query_id})")
        time.sleep(_POLL_INTERVAL_SEC)


def _arrow_to_rows(raw):
    """Parse an Arrow IPC stream (bytes) into list[dict]."""
    import pyarrow as pa  # imported lazily so the module loads without pyarrow

    reader = pa.ipc.open_stream(io.BytesIO(raw))
    table = reader.read_all()
    return table.to_pylist()
