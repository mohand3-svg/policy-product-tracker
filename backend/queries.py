"""
SQL statements for the dashboard (Palantir Foundry / Spark SQL dialect),
kept separate so they are easy to review and edit without touching the API
plumbing.

Column-name contract expected by the frontend/backend mapping:

  WINS_DETAIL_SQL returns per-row columns:
    win_identifier, creation_date, gne_payer_name, oasis_product_brand_name,
    gne_book_of_business, benefit_type, oasis_sub_indication_value

  WINS_SUMMARY_SQL returns a single row with columns:
    auto_approve_start, total_num_of_cteated_dcrs, auto_approved, steward_validated

  METRICS_SQL : add when the DCR/stewardship query is provided.

Dialect notes (Foundry/Spark, NOT Athena/Trino):
  - identifiers are backtick-quoted
  - DATE_FORMAT uses 'YYYY-MM-dd' tokens
  - no trailing semicolons (the SQL API expects a single statement)
"""

# Foundry dataset RID (Spark SQL dialect: backtick-quoted, DATE_FORMAT tokens).
WINS_TABLE = "`master`.`ri.foundry.main.dataset.8eb140db-0b6e-4f34-8a0d-3e27f9cfba80`"

# Detail rows for the Policy Wins table + pie chart (auto-approved WINs only).
# NOTE: `creation_date` alias added so the backend can map the column by name.
WINS_DETAIL_SQL = f"""
SELECT
  win_identifier,
  DATE_FORMAT(creation_ts, 'YYYY-MM-dd') AS creation_date,
  gne_payer_name,
  oasis_product_brand_name,
  gne_book_of_business,
  benefit_type,
  oasis_sub_indication_value
FROM {WINS_TABLE}
WHERE approve_or_reject_type = 'AUTO'
"""

# Summary card figures for Policy Wins, counted from the first auto-approval
# onward. Returns one row with:
#   auto_approve_start, total_num_of_cteated_dcrs, auto_approved, steward_validated
WINS_SUMMARY_SQL = f"""
SELECT
  DATE_FORMAT(MIN(CASE WHEN approve_or_reject_type = 'AUTO' THEN creation_ts END), 'YYYY-MM-dd') AS auto_approve_start,
  COUNT(*) AS total_num_of_cteated_dcrs,
  COUNT(CASE WHEN approve_or_reject_type = 'AUTO' THEN 1 END) AS auto_approved,
  COUNT(CASE WHEN status != 'NEW' AND approve_or_reject_type != 'AUTO' THEN 1 END) AS steward_validated
FROM {WINS_TABLE}
WHERE creation_ts >= (
  SELECT MIN(creation_ts)
  FROM {WINS_TABLE}
  WHERE approve_or_reject_type = 'AUTO'
)
"""

# ---- DCR / stewardship metrics (fill in when you share the query) ----
# Expected to return grouped counts the /api/metrics endpoint reshapes into
# KPI cards and bar charts. Left as None so the endpoint reports "not configured".
METRICS_SQL = None
