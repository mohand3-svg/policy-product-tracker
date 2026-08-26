/* ============================================================
   Review Policy page — receives the rows selected on the Multiple
   Policies form, shows DCR validity + auto-approve status, and lets
   the user select rows to set a property value or submit the change.
   Front-end mockup: data comes from sessionStorage.
   ============================================================ */

// Row schema from multi-form.js (index -> field):
// 0 parentPayer, 1 payer, 2 bob, 3 product, 4 indication, 5 benefit,
// 6 pa, 7 stepEdit, 8 numSteps, 9 placement, 10 stepProducts, 11 status,
// 12 simplified, 13 policyLink, 14 siteLink, 15 paLink, 16 effDate

// A couple of demo rows shown if the page is opened directly.
const FALLBACK = [
  ["CIGNA GROUP", "CIGNA", "COMMERCIAL", "OCREVUS", "Multiple Sclerosis", "PHARMACY BENEFIT", "No", "No", 0, "Not Covered", "N/A", "NOT COVERED", "NOT COVERED", "N/A", "N/A", "N/A", "N/A"],
  ["CIGNA GROUP", "CIGNA", "COMMERCIAL", "OCREVUS", "Multiple Sclerosis", "MEDICAL BENEFIT", "Yes", "No", 0, "No Step", "N/A", "TO PI WITH CRITERIA", "COVERED – NO STEPS", "N/A", "\"Commercial and medicare…", "https://static.cigna.com/asset…", "N/A"],
];

let ROWS = [];
try {
  const saved = JSON.parse(sessionStorage.getItem("reviewRows") || "[]");
  ROWS = Array.isArray(saved) && saved.length ? saved : FALLBACK;
} catch (_) {
  ROWS = FALLBACK;
}

const body = document.getElementById("reviewBody");
const selectAll = document.getElementById("rvSelectAll");
const setPropBtn = document.getElementById("setPropBtn");
const submitBtn = document.getElementById("submitChangeBtn");

const MIN_ROWS = 26;
const TOTAL_COLS = 21;

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function cell(v) {
  const s = v === undefined || v === null ? "" : String(v);
  return s === "N/A" ? `<td class="na">N/A</td>` : `<td>${esc(s)}</td>`;
}
// Editable URL cell (Policy / Site of Care / PA Form links). Tagged so the
// AC1–AC4 change-tracking + validation can find it. `data-original` holds the
// loaded value so unchanged fields are never validated.
function urlCell(v) {
  const s = v === undefined || v === null ? "" : String(v);
  return `<td class="url-cell"><input type="text" class="url-input"` +
         ` data-url-field data-original="${esc(s)}" value="${esc(s)}" /></td>`;
}
function statusClass(s) {
  const t = String(s).toUpperCase();
  if (t.startsWith("NOT COVERED")) return "ps-notcovered";
  if (t.startsWith("BIO MANAGED")) return "ps-biomanaged";
  if (t.startsWith("UNKNOWN")) return "ps-unknown";
  if (t.startsWith("PA REQUIRED")) return "ps-pareq";
  if (t.startsWith("TO PI")) return "ps-topi";
  if (t.includes("ST (NON")) return "ps-1st";
  return "ps-unknown";
}

// DCR is valid if it has a resolvable policy status (not UNKNOWN).
function isValid(r) { return String(r[11]).toUpperCase() !== "UNKNOWN"; }
// Auto-approve is a mockup flag: off by default (matches screenshot ❌).
function isAutoApprove(_r) { return false; }

function render() {
  let html = ROWS.map((r, i) => {
    const valid = isValid(r);
    const auto = isAutoApprove(r);
    return `<tr data-i="${i}">
      <td class="mp-check"><input type="checkbox" class="rv-cb"></td>
      <td>${valid ? '<span class="chk-yes">✓</span>' : '<span class="x-no">✕</span>'}</td>
      <td>${auto ? '<span class="chk-yes">✓</span>' : '<span class="x-no">✕</span>'}</td>
      <td>${esc(r[1])}</td>
      <td>${esc(r[2])}</td>
      <td>${esc(r[3])}</td>
      <td>${esc(r[4])}</td>
      <td>${esc(r[5])}</td>
      <td>${esc(r[6])}</td>
      <td>${esc(r[7])}</td>
      <td>${esc(r[8])}</td>
      <td>${esc(r[9])}</td>
      <td>${r[10] === "N/A" ? '<span class="na-pill">N/A</span>' : esc(r[10])}</td>
      <td><span class="pstatus ${statusClass(r[11])}">${esc(r[11])}</span></td>
      <td>${esc(r[12])}</td>
      ${urlCell(r[13])}
      ${urlCell(r[14])}
      ${urlCell(r[15])}
      ${cell(r[16])}
      <td>NATIONAL</td>
      ${cell("N/A")}
    </tr>`;
  }).join("");

  const pad = Math.max(0, MIN_ROWS - ROWS.length);
  for (let i = 0; i < pad; i++) {
    html += `<tr class="mp-empty"><td class="mp-check"></td>` +
            `<td></td>`.repeat(TOTAL_COLS - 1) + `</tr>`;
  }

  body.innerHTML = html;
  wireRows();
  wireUrlValidation();
  updateToolbar();
}

// ---- URL change tracking + validation (AC1–AC4) -----------------
// A URL field is validated ONLY once the user edits it away from its
// original loaded value. Unchanged backend URLs are never validated
// and never block submit. Errors surface as a full-width top banner.

// Accept only http:// or https:// URLs.
function isValidUrl(v) {
  return /^https?:\/\/\S+/i.test(v.trim());
}

function wireUrlValidation() {
  body.querySelectorAll("[data-url-field]").forEach(input => {
    input.addEventListener("input", () => validateUrlField(input));
    input.dataset.changed = "false";
    input.dataset.error = "false";
    input.classList.remove("url-err");
  });
  updateBanner();
}

// Validate one URL field per the ACs.
function validateUrlField(input) {
  const original = input.dataset.original || "";
  const current = input.value;
  const changed = current !== original;
  input.dataset.changed = changed ? "true" : "false";

  if (!changed) {
    // AC1: unchanged -> no validation, no error.
    input.dataset.error = "false";
    input.classList.remove("url-err");
  } else {
    // AC2/AC3: edited -> validate. Empty is allowed (cleared field);
    // a non-empty value must be a valid http(s) URL.
    const val = current.trim();
    if (val !== "" && !isValidUrl(val)) {
      input.dataset.error = "true";
      input.classList.add("url-err");
    } else {
      input.dataset.error = "false";
      input.classList.remove("url-err");
    }
  }
  updateBanner();
  updateToolbar();
}

// AC2–AC4: Submit is blocked only by NEW invalid edits. Unchanged
// fields (even if technically invalid) never block submit.
function hasInvalidEdits() {
  return [...body.querySelectorAll("[data-url-field]")]
    .some(i => i.dataset.error === "true");
}

function updateBanner() {
  const banner = document.getElementById("urlBanner");
  if (banner) banner.classList.toggle("show", hasInvalidEdits());
}

function wireRows() {
  body.querySelectorAll(".rv-cb").forEach(cb =>
    cb.addEventListener("change", e => {
      e.target.closest("tr").classList.toggle("selected", e.target.checked);
      syncSelectAll();
      updateToolbar();
    }));
}
function checkedRows() { return [...body.querySelectorAll(".rv-cb:checked")]; }

function updateToolbar() {
  const n = checkedRows().length;
  const on = n > 0;
  const invalid = hasInvalidEdits();
  setPropBtn.disabled = !on;
  setPropBtn.classList.toggle("enabled", on);
  // AC4: Submit is blocked while any edited URL field is invalid.
  const canSubmit = on && !invalid;
  submitBtn.disabled = !canSubmit;
  submitBtn.classList.toggle("enabled", canSubmit);
  submitBtn.title = invalid
    ? "Correct all invalid URL fields before submitting"
    : "";
}

function syncSelectAll() {
  const boxes = [...body.querySelectorAll(".rv-cb")];
  const checked = boxes.filter(b => b.checked).length;
  selectAll.checked = boxes.length > 0 && checked === boxes.length;
  selectAll.indeterminate = checked > 0 && checked < boxes.length;
}

selectAll.addEventListener("change", e => {
  body.querySelectorAll(".rv-cb").forEach(cb => {
    cb.checked = e.target.checked;
    cb.closest("tr").classList.toggle("selected", e.target.checked);
  });
  updateToolbar();
});

setPropBtn.addEventListener("click", () => {
  if (setPropBtn.disabled) return;
  showToast(`Set property value for ${checkedRows().length} row(s) — demo`, false);
});
submitBtn.addEventListener("click", () => {
  if (submitBtn.disabled || hasInvalidEdits()) return;
  showToast(`Submitted change for ${checkedRows().length} row(s) ✓`, false);
});
document.getElementById("editTableBtn").addEventListener("click", () =>
  showToast("Edit table — demo", false));

// ---- toast ------------------------------------------------------
let toastT;
function showToast(msg, isErr) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.className = "toast show" + (isErr ? " err" : "");
  clearTimeout(toastT);
  toastT = setTimeout(() => (el.className = "toast"), 2600);
}

render();
