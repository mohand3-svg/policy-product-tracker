# Dashboard backend (Palantir Foundry)

FastAPI service that serves the static frontend and read-only Foundry SQL
endpoints on port 8080.

- `GET /api/health` — config + Foundry connectivity check
- `GET /api/wins` — Policy Wins summary + detail rows
- `GET /api/metrics` — DCR/stewardship metrics (pending query)
- `GET /*` — static frontend

Data source: `gene.palantirfoundry.com`, dataset RID
`ri.foundry.main.dataset.8eb140db-0b6e-4f34-8a0d-3e27f9cfba80`.
SQL lives in `queries.py` (Spark dialect).

## Required environment secrets

Set these in the Ona environment (Settings → Environment Variables / Secrets).
They are injected as env vars; nothing is committed to the repo.

| Secret | Required | Example |
|---|---|---|
| `FOUNDRY_HOST` | yes | `https://gene.palantirfoundry.com` |
| `FOUNDRY_TOKEN` | one of these | a Foundry bearer token |
| `FOUNDRY_CLIENT_ID` + `FOUNDRY_CLIENT_SECRET` | one of these | OAuth2 service-account credentials |
| `FOUNDRY_BRANCH` | no (default `master`) | `master` |

Auth precedence: `FOUNDRY_TOKEN` is used if set; otherwise the client
credentials are exchanged for a token.

### How to get Foundry credentials

- **Bearer token (quickest for testing):** in Foundry, open
  **Account → Settings → Tokens** (or "Personal access tokens") and generate a
  token scoped to read the dataset. Set it as `FOUNDRY_TOKEN`.
- **OAuth2 client (recommended for shared/long-lived use):** ask your Foundry
  admin / platform team to register a **third-party application** (service
  account) with permission to read the dataset, then use its client id/secret.

## After setting secrets

1. Restart the service: `gitpod automations service start dashboard-backend`
2. Check: `curl -s http://localhost:8080/api/health` → expect `"foundry":"ok"`
3. Open the app → **Metric Dashboard → Policy Wins**. The footer shows
   "· live" when data comes from Foundry (vs "· demo data" fallback).

## Known validation point

A dummy-token probe reached the host successfully but returned HTTP 400 from
`/foundry-sql-server/api/queries/execute`. With a real token this should
resolve, but if a 400 persists, the exact SQL API path or request-body shape
may need a small tweak for this Foundry version — see `foundry.py::run_query`.

## Run locally (without the managed service)

```bash
cd backend
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
FOUNDRY_HOST=https://gene.palantirfoundry.com FOUNDRY_TOKEN=... \
  uvicorn main:app --host 0.0.0.0 --port 8080
```
