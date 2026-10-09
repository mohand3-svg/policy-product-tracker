/* ============================================================
   Multiple Policies update form — landing page mockup.
   Shows a pre-populated payer-policy table. The user selects one
   or more rows and clicks "Review Policy". The left search panel
   filters the table (front-end mockup with demo data).
   ============================================================ */

// Demo payer-policy rows (mirrors the screenshot).
// Columns: parentPayer, payer, bob, product, indication, benefit, pa,
//          stepEdit, numSteps, placement, stepProducts, status,
//          simplified, policyLink, siteLink, paLink, effDate
const SITE = "\"Commercial and medicare…";
const PA_URL = "https://static.cigna.com/asset…";
const ROWS = [
  ["Cigna", "UNIVERSITY OF ROCHESTER", "COMMERCIAL", "OCREVUS", "Multiple Sclerosis", "MEDICAL BENEFIT", "Yes", "No", 0, "No Step", "N/A", "TO PI WITH CRITERIA", "COVERED – NO STEPS", "N/A", SITE, PA_URL, "N/A"],
  ["Cigna", "COLGATE UNIVERSITY", "COMMERCIAL", "OCREVUS", "Multiple Sclerosis", "PHARMACY BENEFIT", "No", "No", 0, "Not Covered", "N/A", "NOT COVERED", "NOT COVERED", "N/A", "N/A", "N/A", "N/A"],
  ["Cigna", "EVANGELICAL LUTHERAN CHURCH IN AMERICA", "COMMERCIAL", "XELJANZ", "Rheumatoid Arthritis", "PHARMACY BENEFIT", "Yes", "No", 0, "Not Covered", "N/A", "NOT COVERED", "NOT COVERED", "N/A", "N/A", "N/A", "N/A"],
  ["INTERMOUNTAIN HEALTH CARE", "SELECTHEALTH", "MEDICARE_ADVANTAGE", "SIMLANDI(CF) AUTOINJECTOR", "Rheumatoid Arthritis", "PHARMACY BENEFIT", "No", "No", 0, "Not Covered", "N/A", "NOT COVERED", "NOT COVERED", "N/A", "N/A", "N/A", "N/A"],
  ["INTERMOUNTAIN HEALTH CARE", "SELECTHEALTH", "MEDICARE_ADVANTAGE", "REMICADE", "Rheumatoid Arthritis", "MEDICAL BENEFIT", "Yes", "Yes", 3, "ST Multiple Brands", "Renflexis and 1 of [Non …", "BIO MANAGED", "COVERED – WITH STEPS", "N/A", SITE, PA_URL, "N/A"],
  ["BUILDERS FIRSTSOURCE", "BUILDERS FIRSTSOURCE (EMPLOYER)", "COMMERCIAL", "UNKNOWN", "Rheumatoid Arthritis", "PHARMACY BENEFIT", "No", "No", 0, "No Step", "N/A", "UNKNOWN", "UNKNOWN", "N/A", "N/A", "N/A", "N/A"],
  ["CVS HEALTH", "AETNA (VA)", "MEDICAID_MANAGED", "RINVOQ", "Rheumatoid Arthritis", "PHARMACY BENEFIT", "Yes", "Yes", 1, "ST Single Generic", "FOC-QA", "BIO MANAGED", "COVERED – WITH STEPS", "N/A", SITE, PA_URL, "N/A"],
  ["BLUECROSS BLUESHIELD", "BLUECROSS BLUESHIELD (AL)", "MEDICARE_ADVANTAGE", "LUCENTIS", "Diabetic Macular Edema", "MEDICAL BENEFIT", "Yes", "Yes", 1, "ST Single Generic", "1 of [Avastin, Bevacizumab,…", "1 ST (NON-BR)", "COVERED – WITH STEPS", "N/A", SITE, PA_URL, "N/A"],
  ["MAIL HANDLERS BENEFIT", "MAIL HANDLERS BENEFIT", "COMMERCIAL", "YUSIMRY", "Rheumatoid Arthritis", "PHARMACY BENEFIT", "Yes", "Yes", 4, "ST Generic and Brand", "1 of [methotrexat…", "BIO MANAGED", "COVERED – WITH STEPS", "N/A", SITE, PA_URL, "N/A"],
  ["UBS", "UBS (EMPLOYER)", "COMMERCIAL", "YUFLYMA", "Rheumatoid Arthritis", "PHARMACY BENEFIT", "Yes", "Yes", 4, "ST Generic and Brand", "1 of [methotrexat…", "BIO MANAGED", "COVERED – WITH STEPS", "N/A", SITE, PA_URL, "N/A"],
  ["INTERMOUNTAIN HEALTH CARE", "SELECTHEALTH", "MEDICARE_ADVANTAGE", "INFLIXIMAB", "Rheumatoid Arthritis", "MEDICAL BENEFIT", "No", "No", 0, "Not Covered", "N/A", "NOT COVERED", "NOT COVERED", "N/A", "N/A", "N/A", "N/A"],
  ["CENTENE", "SILVERSUMMIT", "COMMERCIAL", "XOLAIR VIAL", "Food Allergy", "MEDICAL BENEFIT", "Yes", "Yes", 1, "ST Single Generic", "FOC-13743 QA Round 2 …", "TO PI WITH CRITERIA", "COVERED – WITH STEPS", "N/A", SITE, PA_URL, "N/A"],
  ["84 LUMBER COMPANY", "84 LUMBER COMPANY (EMPLOYER)", "COMMERCIAL", "HADLIMA", "Rheumatoid Arthritis", "PHARMACY BENEFIT", "No", "Yes", 1, "ST Single Generic", "FOC-QA", "BIO MANAGED", "COVERED – WITH STEPS", "N/A", SITE, PA_URL, "N/A"],
  ["SOUTHEASTERN INDIANA", "SOUTHEASTERN INDIANA", "COMMERCIAL", "HADLIMA", "Rheumatoid Arthritis", "PHARMACY BENEFIT", "Yes", "Yes", 9, "ST Multiple Brands", "1 of [Hydroxychlor…", "BIO MANAGED", "COVERED – WITH STEPS", "N/A", SITE, PA_URL, "N/A"],
  ["CENTENE", "NEW HAMPSHIRE", "COMMERCIAL", "XOLAIR PFS", "Food Allergy", "MEDICAL BENEFIT", "No", "No", 0, "Not Covered", "N/A", "NOT COVERED", "NOT COVERED", "N/A", "N/A", "N/A", "N/A"],
  ["MODA HEALTH", "MODA HEALTH", "MEDICAID_MANAGED", "INFLECTRA", "Rheumatoid Arthritis", "MEDICAL BENEFIT", "Yes", "No", 0, "No Step", "N/A", "PA REQUIRED", "COVERED – NO STEPS", "N/A", SITE, PA_URL, "N/A"],
  ["BLUECROSS BLUESHIELD", "BLUECROSS BLUESHIELD", "COMMERCIAL", "TYENNE IV", "Rheumatoid Arthritis", "MEDICAL BENEFIT", "No", "No", 0, "No Step", "N/A", "UNKNOWN", "UNKNOWN", "N/A", "N/A", "N/A", "N/A"],
  ["GENERAL ELECTRIC", "GENERAL ELECTRIC (EMPLOYER)", "COMMERCIAL", "SIMLANDI(CF) AUTOINJECTOR", "Rheumatoid Arthritis", "PHARMACY BENEFIT", "No", "No", 0, "Not Covered", "N/A", "NOT COVERED", "NOT COVERED", "N/A", "N/A", "N/A", "N/A"],
  ["AMERICAN NATIONAL RE", "AMERICAN NATIONAL RE", "COMMERCIAL", "KEVZARA", "Rheumatoid Arthritis", "PHARMACY BENEFIT", "Yes", "Yes", 3, "ST Multiple Generics", "1 of [Non Biological …", "BIO MANAGED", "COVERED – WITH STEPS", "N/A", SITE, PA_URL, "N/A"],
];

// Number of empty placeholder rows to render (fills the grid like the screenshot).
const MIN_ROWS = 22;

// Map a status string to a badge CSS class.
function statusClass(s) {
  const t = s.toUpperCase();
  if (t.startsWith("NOT COVERED")) return "ps-notcovered";
  if (t.startsWith("BIO MANAGED")) return "ps-biomanaged";
  if (t.startsWith("UNKNOWN")) return "ps-unknown";
  if (t.startsWith("PA REQUIRED")) return "ps-pareq";
  if (t.startsWith("TO PI")) return "ps-topi";
  if (t.includes("ST (NON")) return "ps-1st";
  return "ps-unknown";
}

const body = document.getElementById("mpBody");
const selectAll = document.getElementById("mpSelectAll");
const reviewBtn = document.getElementById("reviewBtn");
const INLINE_FILTER_STATE = {};

// Current left-panel filter selections (empty = no filter).
const POLICY_FILTERS = ["bob", "product", "indication", "benefit"];
const filter = {
  entityMode: "payer",
  parentPayer: "",
  payer: "",
  pbm: "",
  bob: "",
  product: "",
  indication: "",
  benefit: "",
  pbmRole: "",
};

const STATIC_OPTIONS = {
  pbm: ["Express Scripts", "OptumRX", "CVS"],
  pbmRole: ["Custom", "National", "Formulary Mgt"],
};

// Escape for safe insertion.
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function applyInlineTableFilters(table, afterFilter) {
  const tbody = table.tBodies && table.tBodies[0];
  const filterRow = table.querySelector("thead tr.inline-filter-row");
  if (!tbody || !filterRow) return;
  const queries = [...filterRow.querySelectorAll("input[data-col]")].map(input => ({
    col: Number(input.dataset.col),
    value: input.value.trim().toLowerCase(),
  })).filter(f => f.value);
  [...tbody.querySelectorAll("tr")].forEach(tr => {
    const cells = tr.children;
    const match = queries.every(({ col, value }) =>
      String(cells[col]?.textContent || "").toLowerCase().includes(value));
    tr.hidden = !match;
  });
  if (afterFilter) afterFilter();
}

function ensureInlineTableFilters(tableId, skipLabels = [], afterFilter) {
  const table = document.getElementById(tableId);
  if (!table || !table.tHead) return;
  if (!INLINE_FILTER_STATE[tableId]) INLINE_FILTER_STATE[tableId] = {};
  const headerRow = [...table.tHead.rows].find(row => !row.classList.contains("inline-filter-row"));
  if (!headerRow) return;
  const headerCells = [...headerRow.children];
  let filterRow = table.tHead.querySelector("tr.inline-filter-row");
  if (filterRow && filterRow.children.length !== headerCells.length) {
    filterRow.remove();
    filterRow = null;
  }
  if (!filterRow) {
    filterRow = document.createElement("tr");
    filterRow.className = "inline-filter-row";
    headerCells.forEach((th, index) => {
      const label = th.textContent.trim();
      const skip = th.querySelector('input[type="checkbox"]') ||
        skipLabels.some(s => label.toLowerCase().includes(s.toLowerCase()));
      const cell = document.createElement("th");
      if (!skip) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "inline-table-filter";
        input.dataset.col = String(index);
        input.placeholder = "Filter";
        input.value = INLINE_FILTER_STATE[tableId][index] || "";
        input.addEventListener("input", () => {
          INLINE_FILTER_STATE[tableId][index] = input.value;
          applyInlineTableFilters(table, afterFilter);
        });
        cell.appendChild(input);
      }
      filterRow.appendChild(cell);
    });
    table.tHead.appendChild(filterRow);
  }
  applyInlineTableFilters(table, afterFilter);
}

// Column index per filter key (into a ROW array).
const COL = { parentPayer: 0, payer: 1, bob: 2, product: 3, indication: 4, benefit: 5 };

function rowPbm(r) {
  const text = `${r[0]} ${r[1]}`.toUpperCase();
  if (text.includes("CVS") || text.includes("AETNA")) return "CVS";
  if (text.includes("CIGNA") || text.includes("84 LUMBER")) return "Express Scripts";
  if (text.includes("UNITED") || text.includes("OPTUM")) return "OptumRX";
  return r[5] === "PHARMACY BENEFIT" ? "Express Scripts" : "OptumRX";
}

function rowPbmRole(r) {
  const status = String(r[11] || "").toUpperCase();
  if (r[5] === "MEDICAL BENEFIT") return "Formulary Mgt";
  if (status.includes("NOT COVERED")) return "National";
  if (status.includes("BIO MANAGED") || status.includes("TO PI")) return "Custom";
  return "Formulary Mgt";
}

function displayPbmValue(r, index, field) {
  if (index > 2) return "N/A";
  if (field === "pbmRole") return "FORMULARY MANAGEMENT";
  return field === "pbm" ? rowPbm(r) : rowPbmRole(r);
}

function rowValue(r, field, index = ROWS.indexOf(r)) {
  if (field === "pbm") return displayPbmValue(r, index, "pbm");
  if (field === "pbmRole") return displayPbmValue(r, index, "pbmRole");
  return r[COL[field]];
}

function optionValues(field) {
  if (STATIC_OPTIONS[field]) return STATIC_OPTIONS[field];
  return [...new Set(ROWS.map(r => rowValue(r, field)).filter(Boolean))];
}

function activeFilterKeys() {
  const entityKeys = filter.entityMode === "pbm" ? ["pbm", "pbmRole"] : ["parentPayer", "payer"];
  return [...entityKeys, ...POLICY_FILTERS];
}

function filterMatches(field, rowDisplayValue, selectedValue) {
  if (!selectedValue) return true;
  if (field === "pbmRole" && selectedValue === "Formulary Mgt") {
    return rowDisplayValue === "FORMULARY MANAGEMENT";
  }
  return rowDisplayValue === selectedValue;
}

function visibleRows() {
  return ROWS.filter((r, index) => {
    if (filter.entityMode === "pbm" && displayPbmValue(r, index, "pbm") === "N/A") return false;
    return activeFilterKeys().every(k => filterMatches(k, rowValue(r, k, index), filter[k]));
  });
}

function syncEntityMode() {
  document.querySelectorAll("[data-mode-field]").forEach(el => {
    el.hidden = el.dataset.modeField !== filter.entityMode;
  });
  document.querySelectorAll('input[name="entityMode"]').forEach(input => {
    input.checked = input.value === filter.entityMode;
  });
  const detailsTitle = document.getElementById("detailsTitle");
  if (detailsTitle) detailsTitle.textContent = filter.entityMode === "pbm" ? "PBM Details" : "Payer Details";
}

function setEntityMode(mode) {
  filter.entityMode = mode === "pbm" ? "pbm" : "payer";
  if (filter.entityMode === "payer") {
    filter.pbm = "";
    filter.pbmRole = "";
  } else {
    filter.parentPayer = "";
    filter.payer = "";
  }
  selectAll.checked = false;
  selectAll.indeterminate = false;
  syncEntityMode();
  render();
}

// Total column count (checkbox + 19 data columns).
const TOTAL_COLS = 20;

// Cell helper: render "N/A" (and empty) as muted italic.
function cell(v) {
  const s = v === undefined || v === null ? "" : String(v);
  return s === "N/A" ? `<td class="na">N/A</td>` : `<td>${esc(s)}</td>`;
}

// ---- render -----------------------------------------------------
function render() {
  renderChips();
  const rows = visibleRows();

  let html = rows.map((r, i) => {
    const originalIndex = ROWS.indexOf(r);
    const [parent, payer, bob, product, indication, benefit, pa, stepEdit,
           numSteps, placement, stepProducts, status,
           simplified, policyLink, siteLink, paLink, effDate] = r;
    return `<tr data-i="${i}">
      <td class="mp-check"><input type="checkbox" class="mp-row-cb"></td>
      <td>${esc(parent)}</td>
      <td>${esc(payer)}</td>
      ${cell(displayPbmValue(r, originalIndex, "pbm"))}
      ${cell(displayPbmValue(r, originalIndex, "pbmRole"))}
      <td>${esc(bob)}</td>
      <td>${esc(product)}</td>
      <td>${esc(indication)}</td>
      <td>${esc(benefit)}</td>
      <td>${esc(pa)}</td>
      <td>${esc(stepEdit)}</td>
      <td>${esc(numSteps)}</td>
      <td>${esc(placement)}</td>
      ${cell(stepProducts)}
      <td><span class="pstatus ${statusClass(status)}">${esc(status)}</span></td>
      <td>${esc(simplified)}</td>
      ${cell(policyLink)}
      ${cell(siteLink)}
      ${cell(paLink)}
      ${cell(effDate)}
    </tr>`;
  }).join("");

  // Pad with empty rows so the grid fills the panel (matches screenshot).
  const pad = Math.max(0, MIN_ROWS - rows.length);
  for (let i = 0; i < pad; i++) {
    html += `<tr class="mp-empty"><td class="mp-check"></td>` +
            `<td></td>`.repeat(TOTAL_COLS - 1) + `</tr>`;
  }

  body.innerHTML = html;
  wireRows();
  updateReviewState();
}

// Render the active filters as removable chips inside each field box.
function renderChips() {
  document.querySelectorAll(".fld-select[data-field]").forEach(el => {
    const field = el.dataset.field;
    const val = filter[field];
    const span = el.querySelector("span");
    // remove any existing chip
    const old = el.querySelector(".fld-chip");
    if (old) old.remove();
    if (val) {
      span.style.display = "none";
      const chip = document.createElement("span");
      chip.className = "fld-chip";
      chip.innerHTML = `${esc(val)} <span class="x" title="Clear">✕</span>`;
      chip.querySelector(".x").addEventListener("click", ev => {
        ev.stopPropagation();
        filter[field] = "";
        render();
      });
      el.insertBefore(chip, span);
    } else {
      span.style.display = "";
      span.textContent = "Search…";
      span.style.color = "";
    }
  });
}

function wireRows() {
  body.querySelectorAll(".mp-row-cb").forEach(cb =>
    cb.addEventListener("change", e => {
      e.target.closest("tr").classList.toggle("selected", e.target.checked);
      syncSelectAll();
      updateReviewState();
    }));
}

function checkedRows() {
  return [...body.querySelectorAll(".mp-row-cb:checked")]
    .filter(cb => !cb.closest("tr").hidden);
}

function updateReviewState() {
  const n = checkedRows().length;
  reviewBtn.disabled = n === 0;
  reviewBtn.classList.toggle("disabled", n === 0);
}

function syncSelectAll() {
  const boxes = [...body.querySelectorAll(".mp-row-cb")]
    .filter(cb => !cb.closest("tr").hidden);
  const checked = boxes.filter(b => b.checked).length;
  selectAll.checked = boxes.length > 0 && checked === boxes.length;
  selectAll.indeterminate = checked > 0 && checked < boxes.length;
}

// ---- select all -------------------------------------------------
selectAll.addEventListener("change", e => {
  [...body.querySelectorAll(".mp-row-cb")]
    .filter(cb => !cb.closest("tr").hidden)
    .forEach(cb => {
    cb.checked = e.target.checked;
    cb.closest("tr").classList.toggle("selected", e.target.checked);
  });
  updateReviewState();
});

// ---- left panel filters (cycle through distinct values on click) -
document.querySelectorAll(".fld-select[data-field]").forEach(el => {
  const field = el.dataset.field;
  el.addEventListener("click", ev => {
    // Ignore clicks on the chip's clear (✕); that's handled separately.
    if (ev.target.closest(".fld-chip")) return;
    const values = optionValues(field);
    const cur = filter[field];
    const idx = values.indexOf(cur);
    // cycle: (none) -> v0 -> v1 -> ... -> (none)
    filter[field] = idx + 1 >= values.length ? "" : values[idx + 1];
    render();
  });
});

document.querySelectorAll('input[name="entityMode"]').forEach(input => {
  input.addEventListener("change", () => setEntityMode(input.value));
});

// ---- reset ------------------------------------------------------
document.getElementById("resetBtn").addEventListener("click", () => {
  Object.keys(filter).forEach(k => {
    filter[k] = k === "entityMode" ? "payer" : "";
  });
  selectAll.checked = false; selectAll.indeterminate = false;
  syncEntityMode();
  render();
  showToast("Filters reset", false);
});

// ---- review / cancel --------------------------------------------
reviewBtn.addEventListener("click", () => {
  if (reviewBtn.disabled) return;
  // Collect the selected rows and hand them to the Review Policy page.
  // PBM display values are carried with the row so Review Policy mirrors
  // exactly what was shown here, including N/A rows.
  const vis = visibleRows();
  const selected = checkedRows().map(cb => {
    const i = +cb.closest("tr").dataset.i;
    const row = vis[i];
    const originalIndex = ROWS.indexOf(row);
    return row ? [...row, displayPbmValue(row, originalIndex, "pbm"), displayPbmValue(row, originalIndex, "pbmRole")] : null;
  }).filter(Boolean);
  // Storage can throw in a sandboxed preview iframe; never let it block navigation.
  try {
    sessionStorage.setItem("reviewRows", JSON.stringify(selected));
  } catch (_) { /* review-policy.html falls back to demo rows */ }
  window.location.href = "review-policy.html";
});
document.getElementById("cancelBtn").addEventListener("click", () => {
  document.getElementById("resetBtn").click();
});

// ---- toast ------------------------------------------------------
let toastT;
function showToast(msg, isErr) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.className = "toast show" + (isErr ? " err" : "");
  clearTimeout(toastT);
  toastT = setTimeout(() => (el.className = "toast"), 2600);
}

// ---- init -------------------------------------------------------
syncEntityMode();
render();
