"""
FastAPI backend for the Policy Intelligence Stewardship Tool dashboard.

Serves read-only JSON endpoints backed by Palantir Foundry (Spark SQL), and
also serves the static frontend so everything runs on a single port.

Endpoints:
  GET /api/health   - config + Foundry connectivity check
  GET /api/wins     - Policy Wins summary + detail rows
  GET /api/metrics  - DCR/stewardship KPIs + chart data
  GET /*            - static frontend (index.html, app.js, styles.css, ...)

Auth: Foundry bearer token or OAuth2 client credentials (env secrets).
"""

import os

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

import foundry
import queries

app = FastAPI(title="Stewardship Dashboard API")

# Repo root (one level up from backend/) holds the static frontend.
STATIC_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


@app.get("/api/health")
def health():
    """Report configuration and whether Foundry is reachable."""
    missing = foundry.config_missing()
    cfg = foundry.foundry_config()
    # host/branch/auth_mode are safe to expose; the token/secret are never read here.
    status = {
        "config": cfg,
        "config_complete": len(missing) == 0,
        "missing": missing,
    }
    if missing:
        status["foundry"] = "not_configured"
        return JSONResponse(status, status_code=200)
    # Lightweight connectivity probe
    try:
        foundry.run_query("SELECT 1")
        status["foundry"] = "ok"
    except Exception as e:  # noqa: BLE001 - surface any Foundry error
        status["foundry"] = "error"
        status["error"] = str(e)
    return JSONResponse(status, status_code=200)


@app.get("/api/wins")
def wins():
    """
    Return Policy Wins data:
      { "summary": {...}, "rows": [ {win fields...}, ... ] }

    Frontend maps rows to its existing WINS shape (id, date, payer, brand,
    bob, benefit, subInd).
    """
    if foundry.config_missing():
        return JSONResponse(
            {"error": "Foundry not configured — set FOUNDRY_HOST and auth secrets"},
            status_code=503,
        )
    try:
        detail = foundry.run_query(queries.WINS_DETAIL_SQL)
        summary_rows = foundry.run_query(queries.WINS_SUMMARY_SQL)
    except Exception as e:  # noqa: BLE001
        return JSONResponse({"error": str(e)}, status_code=502)

    summary = summary_rows[0] if summary_rows else {}
    rows = [
        {
            "id": r.get("win_identifier"),
            "date": r.get("creation_date"),
            "payer": r.get("gne_payer_name"),
            "brand": r.get("oasis_product_brand_name"),
            "bob": r.get("gne_book_of_business"),
            "benefit": r.get("benefit_type"),
            "subInd": r.get("oasis_sub_indication_value"),
        }
        for r in detail
    ]
    # Column names match the aliases in queries.WINS_SUMMARY_SQL.
    return {
        "summary": {
            "totalCreated": _to_int(summary.get("total_num_of_cteated_dcrs")),
            "autoApproved": _to_int(summary.get("auto_approved")),
            "stewardValidated": _to_int(summary.get("steward_validated")),
            "firstAutoApproved": summary.get("auto_approve_start"),
        },
        "rows": rows,
    }


@app.get("/api/metrics")
def metrics():
    """
    Return DCR/stewardship metrics. Not yet configured until the metrics
    query is provided — the frontend falls back to its mock data on 503.
    """
    if queries.METRICS_SQL is None:
        return JSONResponse(
            {"error": "METRICS_SQL not configured — add it in backend/queries.py"},
            status_code=503,
        )
    if foundry.config_missing():
        return JSONResponse(
            {"error": "Foundry not configured — set FOUNDRY_HOST and auth secrets"},
            status_code=503,
        )
    try:
        rows = foundry.run_query(queries.METRICS_SQL)
    except Exception as e:  # noqa: BLE001
        return JSONResponse({"error": str(e)}, status_code=502)
    return {"rows": rows}


def _to_int(v):
    try:
        return int(v)
    except (TypeError, ValueError):
        return 0


# Mount static frontend LAST so /api/* routes take priority.
app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
