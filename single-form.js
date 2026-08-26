/* ============================================================
   Single Policy update form — landing page mockup.
   Lets the user pick the required search fields; once all are set,
   Search enables. Running Search populates the Payer Details panel
   and enables Submit For Review. This is a front-end mockup: the
   dropdown options and the searched policy are demo data.
   ============================================================ */

// Demo option lists for each searchable field.
const OPTIONS = {
  payer: ["UNITEDHEALTHCARE", "AETNA", "HUMANA", "CIGNA", "WELLCARE", "CVS HEALTH"],
  bob: ["COMMERCIAL", "MEDICAID_MANAGED", "MEDICARE_ADVANTAGE", "MEDICAID_FFS", "GOVERNMENT"],
  product: ["OCREVUS ZUNOVO", "VABYSMO", "ACTEMRA SC", "XOLAIR VIAL", "OCREVUS"],
  indication: ["Multiple Sclerosis", "Rheumatoid Arthritis", "Neovascular AMD", "Food Allergy"],
  benefit: ["PHARMACY BENEFIT", "MEDICAL BENEFIT"],
};

// Required fields that must be chosen before Search is enabled.
const REQUIRED = ["payer", "bob", "product", "indication", "benefit"];

// Current selections.
const selection = { payer: "", bob: "", product: "", indication: "", benefit: "" };

const searchBtn = document.getElementById("searchBtn");
const submitBtn = document.getElementById("submitBtn");
const mdmId = document.getElementById("mdmId");
const formMain = document.querySelector(".form-main");

// ---- dropdowns --------------------------------------------------
// Each .fld-select cycles through its option list on click (simple
// mockup interaction — no real dropdown widget needed).
document.querySelectorAll(".fld-select[data-field]").forEach(el => {
  const field = el.dataset.field;
  const span = el.querySelector("span");
  el.addEventListener("click", () => {
    const opts = OPTIONS[field] || [];
    const cur = selection[field];
    const idx = opts.indexOf(cur);
    const next = opts[(idx + 1) % opts.length];
    selection[field] = next;
    span.textContent = next;
    span.style.color = "#333";
    refreshSearchState();
  });
});

// Enable Search only when every required field is chosen.
function refreshSearchState() {
  const ready = REQUIRED.every(f => selection[f]);
  searchBtn.disabled = !ready;
  searchBtn.classList.toggle("enabled", ready);
}

// ---- search -----------------------------------------------------
searchBtn.addEventListener("click", () => {
  if (searchBtn.disabled) return;
  populatePayerDetails();
  // A searched payer resolves an MDM id (demo value).
  mdmId.textContent = "400000000124";
  mdmId.classList.remove("muted");
  // Enable submit now that the form is populated.
  submitBtn.disabled = false;
  submitBtn.classList.remove("disabled");
  showToast("Policy found — review and edit the Proposed column, then submit", false);
});

// Escape helper for values injected into markup.
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Demo "current policy" values keyed loosely by product; falls back to a
// generic set. Mirrors the screenshot's Current column.
function currentPolicy() {
  const links = {
    site: "*Commercial and medicare coverage: https://static.cigna.com/assets/chcp/resourceLibrary/coveragePolicies/pharmacy_a-z.html#RO\nhttps://static.cigna.com/assets/chcp/pdf/coveragePolicies/pharmacy/ip_0212_coveragepositioncriteria_ocrelizumab.pdf",
    pa: "https://static.cigna.com/assets/chcp/pdf/resourceLibrary/prescription/MultipleSclerosis.pdf",
  };
  return {
    priorAuth: "Yes",
    stepEdit: "No",
    numSteps: "0",
    stepPlacement: "No Step",
    stepProducts: "",
    policyStatus: "TO PI WITH CRITERIA",
    derived: "COVERED - NO STEPS",
    policyLink: "",
    siteLink: links.site,
    paLink: links.pa,
    effDate: "",
    state: "NATIONAL",
    platform: "",
    evidence: "",
    additional: "",
  };
}

// Field rows for the three-column grid.
// type: text | select | textarea | date | dash | state | evidence
const PROP_FIELDS = [
  { k: "priorAuth",     label: "Prior Authorization Required", type: "select", opts: ["Yes", "No"] },
  { k: "stepEdit",      label: "Step Edit",                    type: "select", opts: ["Yes", "No"] },
  { k: "numSteps",      label: "Number of Steps",              type: "dashNum" },
  { k: "stepPlacement", label: "Step Therapy Placement",       type: "select", opts: ["No Step", "ST Single Generic", "ST Generic and Brand", "ST Single Brand"] },
  { k: "stepProducts",  label: "Step Products",                type: "dash" },
  { k: "policyStatus",  label: "Policy Status",                type: "select", opts: ["TO PI WITH CRITERIA", "TO PI OR BETTER", "PA REQUIRED NO CRITERIA", "BIO MANAGED 1", "NO ST"] },
  { k: "derived",       label: "Derived Simplified Policy Status", type: "textReadonly" },
  { k: "policyLink",    label: "Policy Link",                  type: "text", url: true },
  { k: "siteLink",      label: "Site of Care Link",            type: "textareaLink", url: true },
  { k: "paLink",        label: "PA Form Link",                 type: "text", url: true },
  { k: "effDate",       label: "Effective Policy Date",        type: "date" },
  { k: "state",         label: "State",                        type: "state" },
  { k: "platform",      label: "Platform/Tool Used to Access Data", type: "text" },
  { k: "evidence",      label: "Evidence For Policy Change",    type: "evidence" },
  { k: "additional",    label: "Additional Information",        type: "additional" },
];

// Build the Current cell (read-only mirror of the current policy).
function currentCell(f, cur) {
  const v = cur[f.k];
  switch (f.type) {
    case "dash":
    case "dashNum":
      return v ? `<input class="pin" readonly value="${esc(v)}">`
               : `<span class="pin-dash">—</span>`;
    case "textareaLink":
      return `<textarea class="pin" rows="2" readonly>${esc(v)}</textarea>`;
    case "date":
      return v ? `<input class="pin" readonly value="${esc(v)}">`
               : `<span class="pin-dash">—</span>`;
    case "evidence":
    case "additional":
    case "platform":
      return v ? `<input class="pin" readonly value="${esc(v)}">`
               : `<span class="pin-dash">—</span>`;
    default:
      return `<input class="pin" readonly value="${esc(v)}">`;
  }
}

// Build the Proposed cell (editable; pre-filled from current where sensible).
function proposedCell(f, cur) {
  const v = cur[f.k];
  const clearSel = (val, opts) =>
    `<div class="sel-wrap"><select class="pin sel">` +
    opts.map(o => `<option${o === val ? " selected" : ""}>${esc(o)}</option>`).join("") +
    `</select><span class="clear-x" title="Clear">✕</span></div>`;

  switch (f.type) {
    case "select":
      return clearSel(v, f.opts);
    case "dashNum":
      return `<span class="pin-dash">—</span>`;
    case "dash":
      return `<span class="pin-dash">—</span>`;
    case "textReadonly":
      return `<input class="pin" readonly value="${esc(v)}">`;
    case "textareaLink": {
      const attrs = f.url ? ` data-url-field="${f.k}" data-original="${esc(v)}"` : "";
      return `<textarea class="pin" rows="2"${attrs}>${esc(v)}</textarea>`;
    }
    case "text": {
      const attrs = f.url ? ` data-url-field="${f.k}" data-original="${esc(v)}"` : "";
      return `<input class="pin" value="${esc(v)}"${attrs}>`;
    }
    case "date":
      return `<input class="pin" placeholder="Date">`;
    case "state":
      return `<div class="chip-box"><span class="chip">NATIONAL <span class="x">✕</span></span></div>`;
    case "evidence":
      return `<textarea class="pin" rows="2" placeholder="I am requesting this policy change because…"></textarea>` +
             `<button class="add-attach" type="button">➕ Add Attachments</button>`;
    case "additional":
      return `<textarea class="pin" rows="2" placeholder="Any additional information…"></textarea>`;
    default:
      return `<input class="pin" value="${esc(v)}">`;
  }
}

// Render the populated Payer Details panel from the current selection.
function populatePayerDetails() {
  const emptyEl = document.getElementById("formEmpty");
  if (emptyEl) emptyEl.remove();
  formMain.classList.add("populated");

  const cur = currentPolicy();

  // Summary strip (two columns of key/value).
  const summary = [
    ["ⓘ", "Payer", selection.payer],
    ["▤", "Book of Business", selection.bob],
    ["◉", "Product", selection.product],
    ["▤", "Indication", selection.indication],
    ["▤", "Benefit Type", selection.benefit],
    ["◷", "State", "NATIONAL"],
  ];
  const summaryHtml =
    `<div class="payer-summary">` +
    summary.map(([ico, k, v]) =>
      `<div class="psum-item"><span class="psum-ico">${ico}</span>` +
      `<div><div class="psum-k">${esc(k)}</div><div class="psum-v">${esc(v)}</div></div></div>`
    ).join("") +
    `</div>`;

  // Three-column proposed grid.
  const rowsHtml = PROP_FIELDS.map(f =>
    `<tr>` +
      `<td><div class="prop-label"><span class="ico">ⓘ</span>${esc(f.label)}</div></td>` +
      `<td>${currentCell(f, cur)}</td>` +
      `<td>${proposedCell(f, cur)}</td>` +
    `</tr>`
  ).join("");

  const tableHtml =
    `<p class="assess-hint">Please provide as much information as possible in the ‘Proposed’ column to help the stewardship team conduct their assessment.</p>` +
    `<table class="prop-table">` +
      `<colgroup><col class="c-values"><col class="c-current"><col class="c-proposed"></colgroup>` +
      `<thead><tr><th>Values</th><th>Current</th><th>Proposed</th></tr></thead>` +
      `<tbody>${rowsHtml}</tbody>` +
    `</table>`;

  let panel = document.getElementById("payerPanel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "payerPanel";
    formMain.appendChild(panel);
  }
  panel.innerHTML = summaryHtml + tableHtml;

  // Wire the clear (✕) affordance on selects to blank the value.
  panel.querySelectorAll(".sel-wrap .clear-x").forEach(x => {
    x.addEventListener("click", () => {
      const sel = x.parentElement.querySelector("select");
      if (sel) sel.selectedIndex = -1;
    });
  });
  // Chip remove
  panel.querySelectorAll(".chip .x").forEach(x =>
    x.addEventListener("click", () => x.closest(".chip").remove()));
  // Add attachments (mock)
  panel.querySelectorAll(".add-attach").forEach(b =>
    b.addEventListener("click", () => showToast("Attachment picker — demo", false)));

  // Wire URL change-tracking + validation (AC1–AC4).
  wireUrlValidation(panel);
}

// ---- URL change tracking + validation (AC1–AC4) -----------------
// A field is validated ONLY once the user edits it away from its
// original loaded value. Unchanged backend URLs are never validated
// and never block submit (backend owns validating those).

// Accept only http:// or https:// URLs.
function isValidUrl(v) {
  return /^https?:\/\/\S+/i.test(v.trim());
}

function wireUrlValidation(panel) {
  panel.querySelectorAll("[data-url-field]").forEach(input => {
    input.addEventListener("input", () => validateUrlField(input));
    // Establish the initial (unchanged, no-error) state.
    input.dataset.changed = "false";
    clearFieldError(input);
  });
  updateSubmitState();
}

// Validate one URL field per the ACs.
function validateUrlField(input) {
  const original = input.dataset.original || "";
  const current = input.value;
  const changed = current !== original;
  input.dataset.changed = changed ? "true" : "false";

  if (!changed) {
    // AC1: unchanged -> no validation, no error.
    clearFieldError(input);
  } else {
    // AC2/AC3: edited -> validate. Empty is allowed (cleared field);
    // a non-empty value must be a valid http(s) URL.
    const val = current.trim();
    if (val !== "" && !isValidUrl(val)) {
      setFieldError(input, "Invalid URL format. Must start with http:// or https://");
    } else {
      clearFieldError(input);
    }
  }
  updateSubmitState();
}

function setFieldError(input, msg) {
  input.classList.add("pin-err");
  input.dataset.error = "true";
  let err = input.parentElement.querySelector(".field-err");
  if (!err) {
    err = document.createElement("div");
    err.className = "field-err";
    input.insertAdjacentElement("afterend", err);
  }
  err.textContent = "⊗ " + msg;
}

function clearFieldError(input) {
  input.classList.remove("pin-err");
  input.dataset.error = "false";
  const err = input.parentElement.querySelector(".field-err");
  if (err) err.remove();
}

// AC2–AC4: Submit is blocked only by NEW invalid edits. Unchanged
// fields (even if technically invalid) never block submit.
function hasInvalidEdits() {
  const panel = document.getElementById("payerPanel");
  if (!panel) return false;
  return [...panel.querySelectorAll("[data-url-field]")]
    .some(i => i.dataset.error === "true");
}

function updateSubmitState() {
  const invalid = hasInvalidEdits();
  submitBtn.disabled = invalid;
  submitBtn.classList.toggle("disabled", invalid);
  // Hover-over guidance when blocked (AC2/AC3).
  submitBtn.title = invalid ? "Please correct all invalid edits before submitting" : "";
}

// ---- reset ------------------------------------------------------
document.getElementById("resetBtn").addEventListener("click", () => {
  REQUIRED.forEach(f => (selection[f] = ""));
  document.querySelectorAll(".fld-select[data-field] span").forEach(s => {
    s.textContent = "Select…";
    s.style.color = "";
  });
  mdmId.textContent = "—";
  mdmId.classList.add("muted");
  submitBtn.disabled = true;
  submitBtn.classList.add("disabled");
  refreshSearchState();
  // Restore empty state.
  const panel = document.getElementById("payerPanel");
  if (panel) panel.remove();
  formMain.classList.remove("populated");
  if (!document.getElementById("formEmpty")) {
    const p = document.createElement("div");
    p.id = "formEmpty";
    p.className = "form-empty";
    p.textContent = "Search for a payer in the left sidebar to populate the request form.";
    formMain.appendChild(p);
  }
  showToast("Form reset", false);
});

// ---- top actions ------------------------------------------------
document.getElementById("cancelBtn").addEventListener("click", () =>
  document.getElementById("resetBtn").click());

submitBtn.addEventListener("click", () => {
  if (submitBtn.disabled || hasInvalidEdits()) return;
  showToast("Submitted for review ✓", false);
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

/* ============================================================
   Saved Filters — a steward saves the current field selection so
   they can resume it on a later day. Persisted in localStorage.
   Supports save / apply / edit (rename) / delete.
   ============================================================ */
const SAVED_KEY = "dsaSavedFilters.single";

// Load/persist helpers (tolerant of storage being unavailable).
function loadSavedFilters() {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (_) { return []; }
}
function persistSavedFilters(list) {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch (_) {}
}

// Apply a stored selection object back onto the sidebar dropdowns.
function applySelection(sel) {
  REQUIRED.forEach(f => {
    selection[f] = sel[f] || "";
    const el = document.querySelector(`.fld-select[data-field="${f}"] span`);
    if (el) {
      el.textContent = selection[f] || "Select…";
      el.style.color = selection[f] ? "#333" : "";
    }
  });
  refreshSearchState();
}

// Human-readable one-line summary of a saved selection.
function summarize(sel) {
  return REQUIRED.map(f => sel[f]).filter(Boolean).join(" · ") || "(empty)";
}

// Current steward (mockup — a real app would resolve the signed-in user).
const CURRENT_USER = "mohand3";

// Format a timestamp as a short, readable date (e.g. 26 Aug 2026, 14:32).
function fmtDate(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  if (isNaN(d)) return "—";
  return d.toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// Current search term for the saved-filters popup.
let savedSearchTerm = "";

// ---- render the saved-filters table (popup) ---------------------
function renderSavedFilters() {
  // Keep the sidebar count badge in sync (full, unfiltered count).
  const all = loadSavedFilters();
  const countEl = document.getElementById("savedCount");
  if (countEl) countEl.textContent = String(all.length);

  const body = document.getElementById("savedTableBody");
  const wrap = document.getElementById("savedTableWrap");
  const empty = document.getElementById("savedTableEmpty");
  const noMatch = document.getElementById("savedNoMatch");
  if (!body) return;

  // Filter by the search term across name, criteria and creator.
  const q = savedSearchTerm.trim().toLowerCase();
  const rows = all
    .map((it, i) => ({ it, i }))
    .filter(({ it }) => {
      if (!q) return true;
      const hay = `${it.name} ${summarize(it.sel)} ${it.createdBy || CURRENT_USER}`.toLowerCase();
      return hay.includes(q);
    });

  const hasAny = all.length > 0;
  const hasMatch = rows.length > 0;
  if (empty) empty.style.display = hasAny ? "none" : "";
  if (wrap) wrap.style.display = hasAny && hasMatch ? "" : "none";
  if (noMatch) noMatch.style.display = hasAny && !hasMatch ? "" : "none";

  body.innerHTML = rows.map(({ it, i }) => `
    <tr class="sf-row" data-i="${i}" title="Click to load this filter">
      <td class="sf-name">${esc(it.name)}</td>
      <td class="sf-criteria">${esc(summarize(it.sel))}</td>
      <td>${esc(it.createdBy || CURRENT_USER)}</td>
      <td class="sf-date">${esc(fmtDate(it.savedAt))}</td>
      <td class="col-actions">
        <button class="sf-icon" data-act="edit" data-i="${i}" title="Rename">✎</button>
        <button class="sf-icon danger" data-act="delete" data-i="${i}" title="Delete">🗑</button>
      </td>
    </tr>`).join("");
}

// ---- modal (save new / rename existing) -------------------------
let editIndex = -1;   // -1 = creating a new filter; >=0 = renaming
const filterModal   = document.getElementById("filterModal");
const filterName    = document.getElementById("filterNameInput");
const filterPreview = document.getElementById("filterPreview");
const modalTitle    = document.getElementById("filterModalTitle");

function openFilterModal(mode, index) {
  editIndex = mode === "edit" ? index : -1;
  if (mode === "edit") {
    const it = loadSavedFilters()[index];
    modalTitle.textContent = "Rename Filter";
    filterName.value = it ? it.name : "";
    filterPreview.textContent = it ? summarize(it.sel) : "";
  } else {
    modalTitle.textContent = "Save Filter";
    filterName.value = "";
    const hasAny = REQUIRED.some(f => selection[f]);
    filterPreview.textContent = hasAny
      ? summarize(selection)
      : "No fields selected yet — pick at least one field to save.";
  }
  filterModal.classList.add("show");
  filterName.focus();
}
function closeFilterModal() {
  filterModal.classList.remove("show");
  editIndex = -1;
}

function commitFilterModal() {
  const name = filterName.value.trim();
  if (!name) { showToast("Please enter a filter name", true); filterName.focus(); return; }
  // When creating, require at least one field selected.
  if (editIndex < 0 && !REQUIRED.some(f => selection[f])) {
    showToast("Select at least one field before saving", true);
    return;
  }
  const list = loadSavedFilters();
  if (editIndex >= 0) {
    // Rename an existing saved filter (selection preserved).
    if (list[editIndex]) list[editIndex].name = name;
    showToast("Filter renamed", false);
  } else {
    // Save the current selection as a new filter.
    list.push({ name, sel: { ...selection }, createdBy: CURRENT_USER, savedAt: Date.now() });
    showToast("Filter saved", false);
  }
  persistSavedFilters(list);
  renderSavedFilters();
  closeFilterModal();
}

// ---- wire the Save Filter button + list actions -----------------
document.getElementById("saveFilterBtn").addEventListener("click", () => {
  // Always open the modal; the empty-selection case is handled inside
  // (Save is disabled with a hint) so the button always gives feedback.
  openFilterModal("new");
});

// ---- saved-filters table modal (open/close + row actions) -------
const savedModal = document.getElementById("savedModal");
const savedSearchInput = document.getElementById("savedSearch");
function openSavedModal() {
  savedSearchTerm = "";
  if (savedSearchInput) savedSearchInput.value = "";
  renderSavedFilters();
  savedModal.classList.add("show");
  if (savedSearchInput) savedSearchInput.focus();
}
function closeSavedModal() {
  savedModal.classList.remove("show");
}
document.getElementById("openSavedBtn").addEventListener("click", openSavedModal);
document.getElementById("savedCloseBtn").addEventListener("click", closeSavedModal);
savedModal.addEventListener("click", (e) => { if (e.target === savedModal) closeSavedModal(); });

// Live search over the saved filters.
if (savedSearchInput) {
  savedSearchInput.addEventListener("input", () => {
    savedSearchTerm = savedSearchInput.value;
    renderSavedFilters();
  });
}

document.getElementById("savedTableBody").addEventListener("click", (e) => {
  // Edit / Delete take priority and must not trigger the row's apply.
  const btn = e.target.closest("[data-act]");
  if (btn) {
    e.stopPropagation();
    const i = +btn.dataset.i;
    const list = loadSavedFilters();
    if (btn.dataset.act === "edit") {
      openFilterModal("edit", i);
    } else if (btn.dataset.act === "delete") {
      if (list[i]) {
        const name = list[i].name;
        list.splice(i, 1);
        persistSavedFilters(list);
        renderSavedFilters();
        showToast(`Deleted "${name}"`, false);
      }
    }
    return;
  }
  // Clicking anywhere else on a row loads (applies) that filter.
  const row = e.target.closest(".sf-row");
  if (!row) return;
  const i = +row.dataset.i;
  const list = loadSavedFilters();
  if (list[i]) {
    applySelection(list[i].sel);
    showToast(`Loaded "${list[i].name}"`, false);
    closeSavedModal();
  }
});

document.getElementById("filterCancelBtn").addEventListener("click", closeFilterModal);
document.getElementById("filterSaveBtn").addEventListener("click", commitFilterModal);
filterModal.addEventListener("click", (e) => { if (e.target === filterModal) closeFilterModal(); });
filterName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") commitFilterModal();
  if (e.key === "Escape") closeFilterModal();
});

// Initial paint of the saved-filters list.
renderSavedFilters();
