/* ============================================================
   Multiple Policies update form — landing page mockup.
   Shows a pre-populated payer-policy table. The user selects one
   or more rows and clicks "Review Policy". The left search panel
   filters the table (front-end mockup with demo data).
   ============================================================ */

// Demo payer-policy rows (mirrors the screenshot).
// Columns: parentPayer, payer, bob, product, indication, benefit, pa,
//          stepEdit, numSteps, placement, stepProducts, status,
//          simplified, policyLink, siteLink, paLink, effDate,
//          displayed PBM, displayed PBM Role
const SITE = "\"Commercial and medicare…";
const PA_URL = "https://static.cigna.com/asset…";
const ITOVEBI_PAYER_ROWS = [
  { payer: "DOMTAR CORPORATION", pbmRole: "NATIONAL FORMULARY" },
  { payer: "KROLL", pbmRole: "NATIONAL FORMULARY" },
  { payer: "REGIS CORPORATION", pbmRole: "NATIONAL FORMULARY" },
  { payer: "VOLKSWAGEN GROUP OF AMERICA", pbmRole: "NATIONAL FORMULARY" },
  { payer: "AMEREN", pbmRole: "NATIONAL FORMULARY" },
  { payer: "MERCEDES-BENZ U.S. INTERNATIONAL", pbmRole: "NATIONAL FORMULARY" },
  { payer: "HEARST CORPORATION", pbmRole: "NATIONAL FORMULARY" },
  { payer: "AMGEN", pbmRole: "NATIONAL FORMULARY" },
  { payer: "SONIC", pbmRole: "NATIONAL FORMULARY" },
  { payer: "NEW JERSEY TRANSIT CORPORATION", pbmRole: "NATIONAL FORMULARY" },
  { payer: "CUYAHOGA COUNTY", pbmRole: "NATIONAL FORMULARY" },
  { payer: "OCCIDENTAL PETROLEUM", pbmRole: "NATIONAL FORMULARY" },
  { payer: "SERCO", pbmRole: "NATIONAL FORMULARY" },
  { payer: "INTEL CORPORATION", pbmRole: "NATIONAL FORMULARY" },
  { payer: "CHIQUITA BRANDS INTERNATIONAL", pbmRole: "NATIONAL FORMULARY" },
  { payer: "RED ROBIN GOURMET BURGERS", pbmRole: "NATIONAL FORMULARY" },
  { payer: "BASF", pbmRole: "NATIONAL FORMULARY" },
  { payer: "MCDONALD'S", pbmRole: "NATIONAL FORMULARY" },
  { payer: "UNITY HEALTH SYSTEM", pbmRole: "NATIONAL FORMULARY" },
  { payer: "J.B. HUNT TRANSPORT SERVICES", pbmRole: "NATIONAL FORMULARY" },
  { payer: "DOMINION ENERGY", pbmRole: "NATIONAL FORMULARY" },
  { payer: "HNI", pbmRole: "NATIONAL FORMULARY" },
  { payer: "AGGREKO", pbmRole: "NATIONAL FORMULARY" },
  { payer: "VF CORPORATION", pbmRole: "NATIONAL FORMULARY" },
  { payer: "SAINT LOUIS UNIVERSITY", pbmRole: "NATIONAL FORMULARY" },
  { payer: "DARTMOUTH-HITCHCOCK", pbmRole: "NATIONAL FORMULARY" },
  { payer: "TEXAS A&M UNIVERSITY SYSTEM", pbmRole: "NATIONAL FORMULARY" },
  { payer: "EMERSON ELECTRIC", pbmRole: "NATIONAL FORMULARY" },
  { payer: "SANDIA NATIONAL LABORATORIES", pbmRole: "NATIONAL FORMULARY" },
  { payer: "ERIE COUNTY", pbmRole: "NATIONAL FORMULARY" },
  { payer: "SNAP-ON", pbmRole: "NATIONAL FORMULARY" },
  { payer: "MCLANE COMPANY", pbmRole: "NATIONAL FORMULARY" },
  { payer: "UNIVERSITY OF LOUISVILLE", pbmRole: "NATIONAL FORMULARY" },
  { payer: "JOHN HANCOCK FINANCIAL", pbmRole: "NATIONAL FORMULARY" },
  { payer: "PG&E", pbmRole: "NATIONAL FORMULARY" },
  { payer: "GENERAL MILLS", pbmRole: "NATIONAL FORMULARY" },
  { payer: "EXXON MOBIL", pbmRole: "NATIONAL FORMULARY" },
  { payer: "AVERITT", pbmRole: "NATIONAL FORMULARY" },
  { payer: "NAVY FEDERAL CREDIT UNION", pbmRole: "NATIONAL FORMULARY" },
  { payer: "BIC CORPORATION", pbmRole: "NATIONAL FORMULARY" },
  { payer: "TEACHERS RETIREMENT SYSTEM (TRS)", pbmRole: "NATIONAL FORMULARY" },
  { payer: "TEXAS CHILDREN'S HEALTH", pbmRole: "NATIONAL FORMULARY" },
  { payer: "COUNTY OF SUMMIT", pbmRole: "NATIONAL FORMULARY" },
  { payer: "JOHNSON & JOHNSON", pbmRole: "NATIONAL FORMULARY" },
  { payer: "CRATE AND BARREL", pbmRole: "NATIONAL FORMULARY" },
  { payer: "MOHAWK INDUSTRIES", pbmRole: "NATIONAL FORMULARY" },
  { payer: "ALBUQUERQUE PUBLIC SCHOOLS", pbmRole: "NATIONAL FORMULARY" },
  { payer: "WENDY'S COMPANY", pbmRole: "NATIONAL FORMULARY" },
  { payer: "COREWELL HEALTH", pbmRole: "NATIONAL FORMULARY" },
  { payer: "AMAZON.COM", pbmRole: "NATIONAL FORMULARY" },
  { payer: "UNITED PARCEL SERVICE", pbmRole: "NATIONAL FORMULARY" },
  { payer: "WILLIAMS LEA", pbmRole: "NATIONAL FORMULARY" },
  { payer: "AKRON PUBLIC SCHOOLS", pbmRole: "NATIONAL FORMULARY" },
  { payer: "SHAW INDUSTRIES GROUP", pbmRole: "NATIONAL FORMULARY" },
  { payer: "NISKAYUNA CENTRAL SCHOOL DISTRICT", pbmRole: "NATIONAL FORMULARY" },
  { payer: "CRACKER BARREL", pbmRole: "NATIONAL FORMULARY" },
  { payer: "DETROIT DIESEL CORPORATION", pbmRole: "NATIONAL FORMULARY" },
  { payer: "L3HARRIS TECHNOLOGIES", pbmRole: "NATIONAL FORMULARY" },
  { payer: "STATE OF MISSOURI", pbmRole: "NATIONAL FORMULARY" },
  { payer: "INTERPUBLIC GROUP", pbmRole: "NATIONAL FORMULARY" },
  { payer: "KAMAN", pbmRole: "NATIONAL FORMULARY" },
  { payer: "TENNESSEE VALLEY AUTHORITY", pbmRole: "NATIONAL FORMULARY" },
  { payer: "STATE OF NEW MEXICO", pbmRole: "NATIONAL FORMULARY" },
  { payer: "KNOLL", pbmRole: "NATIONAL FORMULARY" },
  { payer: "CUMMINS", pbmRole: "NATIONAL FORMULARY" },
  { payer: "RHEEM MANUFACTURING", pbmRole: "NATIONAL FORMULARY" },
  { payer: "ABBOTT LABORATORIES", pbmRole: "NATIONAL FORMULARY" },
  { payer: "LAND O'LAKES", pbmRole: "NATIONAL FORMULARY" },
  { payer: "WEGMANS FOOD MARKETS", pbmRole: "NATIONAL FORMULARY" },
  { payer: "CURATORS OF THE UNIVERSITY OF MISSOURI", pbmRole: "NATIONAL FORMULARY" },
  { payer: "DARTMOUTH COLLEGE", pbmRole: "NATIONAL FORMULARY" },
  { payer: "STATE OF ALABAMA", pbmRole: "NATIONAL FORMULARY" },
  { payer: "ABERCROMBIE AND FITCH", pbmRole: "NATIONAL FORMULARY" },
  { payer: "CHICO'S FAS", pbmRole: "NATIONAL FORMULARY" },
  { payer: "HERSHEY", pbmRole: "NATIONAL FORMULARY" },
  { payer: "H. E. BUTT GROCERY COMPANY", pbmRole: "NATIONAL FORMULARY" },
  { payer: "ST. JOSEPH'S HOSPITAL HEALTH CENTER", pbmRole: "NATIONAL FORMULARY" },
  { payer: "CONCORDIA HEALTH PLAN", pbmRole: "NATIONAL FORMULARY" },
  { payer: "CHEVRON", pbmRole: "NATIONAL FORMULARY" },
  { payer: "DSM HOLDING COMPANY", pbmRole: "NATIONAL FORMULARY" },
];

const POLICY_SAMPLES = [
  ["No", "No", 0, "No Step", "N/A", "NOT COVERED", "NOT COVERED", "N/A", "N/A", "N/A", "N/A"],
  ["Yes", "No", 0, "No Step", "N/A", "PA REQUIRED", "COVERED - NO STEPS", "N/A", SITE, PA_URL, "2026-11-01"],
  ["Yes", "Yes", 1, "ST Single Brand", "Itovebi", "1 ST (BRANDED)", "COVERED - WITH STEPS", "https://payer.example/itovebi-policy", SITE, PA_URL, "2026-11-15"],
  ["No", "Yes", 2, "ST Multiple Brands", "Truqap and Piqray", "TO PI WITH CRITERIA", "COVERED - WITH STEPS", "N/A", SITE, PA_URL, "2026-12-01"],
  ["Yes", "Yes", 1, "ST Single Generic", "1 of [tamoxifen, anastrozole]", "BIO MANAGED", "COVERED - WITH STEPS", "N/A", SITE, PA_URL, "2027-01-01"],
];

function slugifyPayer(payer, index) {
  return (payer || `pbm-row-${index + 1}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeItovebiRow(row, index) {
  const sample = POLICY_SAMPLES[index % POLICY_SAMPLES.length];
  const policyLink = sample[7] === "N/A"
    ? "N/A"
    : `https://payer.example/itovebi-${slugifyPayer(row.payer, index)}`;
  return [
    "Cigna",
    row.payer,
    "COMMERCIAL",
    "ITOVEBI",
    "BREAST",
    "PHARMACY BENEFIT",
    sample[0],
    sample[1],
    sample[2],
    sample[3],
    sample[4],
    sample[5],
    sample[6],
    policyLink,
    sample[8],
    sample[9],
    sample[10],
    "EXPRESS SCRIPTS",
    row.pbmRole,
  ];
}

const ROWS = ITOVEBI_PAYER_ROWS.map(makeItovebiRow);

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
  pbmRole: ["National"],
};

const PBM_ROLE_OPTIONS = [
  { label: "National", disabled: false },
  { label: "Custom", disabled: true },
  { label: "Formulary Management", disabled: true },
];

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
  if (r[5] === "MEDICAL BENEFIT") return "Formulary Management";
  if (status.includes("NOT COVERED")) return "National";
  if (status.includes("BIO MANAGED") || status.includes("TO PI")) return "Custom";
  return "Formulary Management";
}

function displayPbmValue(r, index, field) {
  const payloadIndex = field === "pbm" ? 17 : 18;
  if (r.length > payloadIndex) return r[payloadIndex] || "";
  if (index > 2) return "N/A";
  if (field === "pbmRole") return "National Formulary";
  return field === "pbm" ? rowPbm(r) : rowPbmRole(r);
}

function hasPbmDetails(r, index) {
  return displayPbmValue(r, index, "pbm") !== "N/A";
}

function rowValue(r, field, index = ROWS.indexOf(r)) {
  if (field === "pbm") return displayPbmValue(r, index, "pbm");
  if (field === "pbmRole") return displayPbmValue(r, index, "pbmRole");
  return r[COL[field]];
}

function optionValues(field) {
  if (field === "benefit" && filter.entityMode === "pbm") return ["PHARMACY BENEFIT"];
  if (STATIC_OPTIONS[field]) return STATIC_OPTIONS[field];
  const candidates = filter.entityMode === "pbm"
    ? ROWS.map((r, index) => ({ r, index })).filter(({ r, index }) => hasPbmDetails(r, index))
    : ROWS.map((r, index) => ({ r, index }));
  return [...new Set(candidates.map(({ r, index }) => rowValue(r, field, index)).filter(Boolean))];
}

function activeFilterKeys() {
  const entityKeys = filter.entityMode === "pbm" ? ["pbm", "pbmRole"] : ["parentPayer", "payer"];
  return [...entityKeys, ...POLICY_FILTERS];
}

function filterMatches(field, rowDisplayValue, selectedValue) {
  if (!selectedValue) return true;
  const display = String(rowDisplayValue || "").toUpperCase();
  const selected = String(selectedValue || "").toUpperCase();
  if (field === "pbmRole" && selected === "NATIONAL") return display.includes("NATIONAL");
  if (field === "pbmRole" && selectedValue === "Formulary Management") {
    return display === "FORMULARY MANAGEMENT";
  }
  return display === selected;
}

function visibleRows() {
  return ROWS.filter((r, index) => {
    if (filter.entityMode === "pbm" && !hasPbmDetails(r, index)) return false;
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
    filter.pbmRole = "National";
    filter.benefit = "PHARMACY BENEFIT";
    ["bob", "product", "indication"].forEach(field => {
      if (filter[field] && !optionValues(field).includes(filter[field])) filter[field] = "";
    });
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
  const countBadge = document.getElementById("recordCountBadge");
  if (countBadge) countBadge.textContent = `${rows.length} record${rows.length === 1 ? "" : "s"}`;

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
    el.replaceChildren();
    if (val) {
      const chip = document.createElement("span");
      chip.className = "fld-chip";
      chip.textContent = val;
      const clear = document.createElement("span");
      clear.className = "x";
      clear.title = "Clear";
      clear.textContent = "✕";
      chip.appendChild(clear);
      el.appendChild(chip);
    } else {
      const span = document.createElement("span");
      span.textContent = "Search…";
      el.appendChild(span);
    }
    const caret = document.createElement("i");
    caret.textContent = "▾";
    el.appendChild(caret);
  });
}

function closePbmRoleMenus() {
  document.querySelectorAll(".pbm-role-menu").forEach(menu => menu.remove());
}

function openPbmRoleMenu(el) {
  const existing = el.querySelector(".pbm-role-menu");
  closePbmRoleMenus();
  if (existing) return;

  const menu = document.createElement("div");
  menu.className = "pbm-role-menu";
  PBM_ROLE_OPTIONS.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pbm-role-option";
    btn.textContent = opt.label;
    btn.disabled = opt.disabled;
    btn.setAttribute("aria-disabled", opt.disabled ? "true" : "false");
    btn.classList.toggle("active", filter.pbmRole === opt.label);
    btn.addEventListener("click", ev => {
      ev.stopPropagation();
      if (opt.disabled) return;
      filter.pbmRole = opt.label;
      closePbmRoleMenus();
      render();
    });
    menu.appendChild(btn);
  });
  el.appendChild(menu);
}

document.addEventListener("click", closePbmRoleMenus);

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
    ev.stopPropagation();
    if (ev.target.classList.contains("x")) {
      filter[field] = "";
      render();
      return;
    }
    if (field === "pbmRole") {
      openPbmRoleMenu(el);
      return;
    }
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
