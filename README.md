# Policy Intelligence Stewardship Tool — Interactive Mockup

A self-contained, front-end mockup of the Policy Intelligence Stewardship Tool.
No build step or server required — open `index.html` in any modern browser.

## Pages

- `index.html` — Stewardship Tool: filterable policy table with editable status
  dropdowns, steward assignment, per-row and bulk DCR creation, and edit history.
- `multi-form.html` — Multiple Policies update form: receives selected records,
  pre-populates each DCR from its product coverage record, and creates DCRs.
- `dcr-detail.html` — DCR detail view opened from a DCR-ID hyperlink.

## Running

Open `index.html` directly, or serve the folder statically:

```bash
python3 -m http.server 8080
# then browse to http://localhost:8080
```

## Notes

- State (edits, created DCRs, assignments) is kept in the browser via
  `sessionStorage` and resets when the tab is closed.
- DCR IDs are generated client-side; email notifications are represented by
  on-screen messages only.
