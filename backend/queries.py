"""
SQL statements for the dashboard (Palantir Foundry / Spark SQL dialect),
kept separate so they are easy to review and edit without touching the API
plumbing.

Column-name contract expected by the frontend/backend mapping:

  WINS_DETAIL_SQL returns per-row columns:
    win_identifier, creation_date, payer, brand, book_of_business,
    benefit_type, indication

  WINS_SUMMARY_SQL returns a single row with columns:
    auto_approve_start, total_num_of_created_dcrs, auto_approved,
    steward_validated

  METRICS_SQL : add when the DCR/stewardship query is provided.

Dialect notes (Foundry/Spark, NOT Athena/Trino):
  - identifiers are backtick-quoted
  - DATE_FORMAT uses 'YYYY-MM-dd' tokens
  - no trailing semicolons (the SQL API expects a single statement)

Dataset (5ac9cc19) real columns:
  primary_key_, am_i_steward, approval_date, approve_or_reject_bulk_id,
  approve_or_reject_type, dcr_identifier, brand, payer, indication,
  lives_id, benefit_type, book_of_business, status, request_date,
  flag_auto_approval, assignment_type, user_who_submitted_action,
  final_decision (null - do not use)

  approve_or_reject_type values:
    APPROVED, AUTO-APPROVED, BULK-APPROVED, BULK-REJECTED, null
  status values: NEW, APPROVED, IN PROGRESS, REJECTED, REVERTED
"""

# Foundry dataset RID (Spark SQL dialect: backtick-quoted, DATE_FORMAT tokens).
WINS_TABLE = "`master`.`ri.foundry.main.dataset.5ac9cc19-e5e7-4fbf-84d6-6a3e8f324ed9`"

# A "policy win" = an automated/bulk machine decision (no manual steward action).
AUTO_TYPES = "('AUTO-APPROVED', 'BULK-APPROVED', 'BULK-REJECTED')"

# The "automation era" starts at the first DCR *created* (request_date) that
# ended up as an automated decision. All summary figures are counted from that
# date onward so the manual baseline before automation is excluded.
AUTO_ERA_START = f"""(
  SELECT MIN(request_date)
  FROM {WINS_TABLE}
  WHERE approve_or_reject_type IN {AUTO_TYPES}
)"""

# Detail rows for the Policy Wins table + pie chart (automated decisions only).
# Auto/bulk rows always carry an approval_date; fall back to request_date just
# in case. Aliases match the backend column-name mapping in main.py.
WINS_DETAIL_SQL = f"""
SELECT
  dcr_identifier                                                 AS win_identifier,
  DATE_FORMAT(COALESCE(approval_date, request_date), 'YYYY-MM-dd') AS creation_date,
  payer,
  brand,
  book_of_business,
  benefit_type,
  indication
FROM {WINS_TABLE}
WHERE approve_or_reject_type IN {AUTO_TYPES}
"""

# Summary card figures for Policy Wins, counted from the first DCR created in
# the automation era onward. Returns one row with:
#   auto_approve_start, total_num_of_created_dcrs, auto_approved, steward_validated
# Notes on the source data:
#   - request_date = when the DCR was created (populated for ~all rows)
#   - approval_date = when a decision was made (null for NEW / in-progress rows,
#     and often null for manual APPROVED rows), so we window on request_date.
WINS_SUMMARY_SQL = f"""
SELECT
  DATE_FORMAT({AUTO_ERA_START}, 'YYYY-MM-dd') AS auto_approve_start,
  COUNT(*) AS total_num_of_created_dcrs,
  COUNT(CASE WHEN approve_or_reject_type IN {AUTO_TYPES} THEN 1 END) AS auto_approved,
  COUNT(CASE WHEN approve_or_reject_type = 'APPROVED' THEN 1 END) AS steward_validated
FROM {WINS_TABLE}
WHERE request_date >= {AUTO_ERA_START}
"""

# ---- DCR / stewardship metrics (fill in when you share the query) ----
# Expected to return grouped counts the /api/metrics endpoint reshapes into
# KPI cards and bar charts. Left as None so the endpoint reports "not configured".
METRICS_SQL = None
