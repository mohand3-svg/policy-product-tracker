/* ============================================================
   Policy Intelligence Stewardship Tool — interactive mockup
   ============================================================ */

// ---- option sets -------------------------------------------------
const MMIT_OPTS = [
  { v: "New", label: "New", cls: "v-val-New" },
  { v: "Correct", label: "Correct", cls: "v-val-Correct" },
  { v: "UnderMMITReview", label: "Under MMIT Review", cls: "v-val-UnderMMITReview" },
  { v: "IncorrectAssessmentError", label: "Incorrect : Assessment Error", cls: "v-val-IncorrectAssessmentError" },
  { v: "IncorrectPolicyLag", label: "Incorrect : Policy Lag", cls: "v-val-IncorrectPolicyLag" },
  { v: "BridgingMDM", label: "Bridging Issue : Under MDM Review", cls: "v-val-BridgingMDM" },
];

const DCR_OPTS = [
  { v: "New", label: "-", cls: "d-val-New" },
  { v: "DCRCreated", label: "DCR Created", cls: "d-val-DCRCreated" },
  { v: "BridgingIssues", label: "Bridging Issues", cls: "d-val-BridgingIssues" },
  { v: "NotRequired", label: "Not Required", cls: "d-val-NotRequired" },
];

const GNE_OPTS = [
  "-",
  "DRUG COVERED WITH NO PA", "NARROWER THAN PI", "TO PI OR BETTER",
  "NO PA", "NOT COVERED", "Unknown", "TO PI WITH CRITERIA",
];

// ---- seed data ---------------------------------------------------
const SEED_ROWS = [
  { id:"REQ-1042", steward:"Steward A", parentPayer:"Payer Group 1", payer:"Payer 11", brand:"Brand Alpha", indication:"Indication B", bob:"Commercial", benefit:"Medical", form:"1000000", lives:4500, mmitHpm:"Managed Tier 1", mmit:"IncorrectPolicyLag", dcr:"NotRequired", dcrCode:"DCR-00000", gne:"TO PI OR BETTER", relAccess:"At Par", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1043", steward:"Steward B", parentPayer:"Payer Group 2", payer:"Payer 06", brand:"Brand Charlie", indication:"Indication D", bob:"Commercial", benefit:"Medical", form:"1000111", lives:5000, mmitHpm:"Managed Tier 2", mmit:"Correct", dcr:"NotRequired", dcrCode:"DCR-00001", gne:"Unknown", relAccess:"Disadvantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1044", steward:"Steward C", parentPayer:"Payer Group 3", payer:"Payer 04", brand:"Brand Alpha", indication:"Indication F", bob:"Commercial", benefit:"Medical", form:"1000222", lives:10000, mmitHpm:"Managed Tier 3", mmit:"Correct", dcr:"DCRCreated", dcrCode:"DCR-00002", gne:"Unknown", relAccess:"Advantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1045", steward:"Steward D", parentPayer:"Payer Group 4", payer:"Payer 06", brand:"Brand Delta", indication:"Indication D", bob:"Commercial", benefit:"Medical", form:"1000333", lives:9000, mmitHpm:"Managed Tier 1", mmit:"IncorrectPolicyLag", dcr:"NotRequired", dcrCode:"DCR-00003", gne:"DRUG COVERED WITH NO PA", relAccess:"Advantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1046", steward:"Steward E", parentPayer:"Payer Group 1", payer:"Payer 13", brand:"Brand Alpha", indication:"Indication D", bob:"Commercial", benefit:"Medical", form:"1000444", lives:5500, mmitHpm:"Managed Tier 2", mmit:"BridgingMDM", dcr:"New", dcrCode:"DCR-00004", gne:"NO PA", relAccess:"Disadvantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1047", steward:"Steward F", parentPayer:"Payer Group 2", payer:"Payer 24", brand:"Brand Echo", indication:"Indication F", bob:"Commercial", benefit:"Medical", form:"1000555", lives:9000, mmitHpm:"Managed Tier 3", mmit:"IncorrectPolicyLag", dcr:"BridgingIssues", dcrCode:"DCR-00005", gne:"NARROWER THAN PI", relAccess:"Advantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1048", steward:"Steward G", parentPayer:"Payer Group 3", payer:"Payer 02", brand:"Brand Echo", indication:"Indication F", bob:"Commercial", benefit:"Medical", form:"1000666", lives:10000, mmitHpm:"Managed Tier 1", mmit:"Correct", dcr:"New", dcrCode:"DCR-00006", gne:"DRUG COVERED WITH NO PA", relAccess:"Advantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1049", steward:"", parentPayer:"Payer Group 4", payer:"Payer 19", brand:"Brand Delta", indication:"Indication E", bob:"Commercial", benefit:"Medical", form:"1000777", lives:9500, mmitHpm:"Managed Tier 2", mmit:"IncorrectPolicyLag", dcr:"DCRCreated", dcrCode:"DCR-00007", gne:"NOT COVERED", relAccess:"Advantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1050", steward:"", parentPayer:"Payer Group 1", payer:"Payer 06", brand:"Brand Alpha", indication:"Indication E", bob:"Commercial", benefit:"Medical", form:"1000888", lives:2500, mmitHpm:"Managed Tier 3", mmit:"IncorrectAssessmentError", dcr:"BridgingIssues", dcrCode:"DCR-00008", gne:"NO PA", relAccess:"Advantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1051", steward:"", parentPayer:"Payer Group 2", payer:"Payer 19", brand:"Brand Bravo", indication:"Indication E", bob:"Commercial", benefit:"Medical", form:"1000999", lives:2000, mmitHpm:"Managed Tier 1", mmit:"New", dcr:"DCRCreated", dcrCode:"DCR-00009", gne:"NO PA", relAccess:"Disadvantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
];

// Stewards available for assignment
const STEWARDS = ["Steward A", "Steward B", "Steward C", "Steward D", "Steward E", "Steward F", "Steward G"];
const CURRENT_USER = "Steward C";

// Product-coverage attributes used to pre-populate DCRs on the
// "Multiple Policies update form". Keyed by request id.
const COVERAGE = {
  "REQ-1042": { product:"Product P1", priorAuth:"No", stepEdit:"No", numSteps:1, stepPlacement:"Step Config 1", stepProducts:"Sample list 1" },
  "REQ-1043": { product:"Product P2", priorAuth:"No", stepEdit:"Yes", numSteps:2, stepPlacement:"Step Config 2", stepProducts:"Sample list 2" },
  "REQ-1044": { product:"Product P3", priorAuth:"No", stepEdit:"Yes", numSteps:5, stepPlacement:"Step Config 3", stepProducts:"Sample list 3" },
  "REQ-1045": { product:"Product P4", priorAuth:"No", stepEdit:"No", numSteps:2, stepPlacement:"Step Config 1", stepProducts:"Sample list 4" },
  "REQ-1046": { product:"Product P5", priorAuth:"Yes", stepEdit:"Yes", numSteps:3, stepPlacement:"Step Config 2", stepProducts:"Sample list 5" },
  "REQ-1047": { product:"Product P6", priorAuth:"Yes", stepEdit:"Yes", numSteps:4, stepPlacement:"Step Config 3", stepProducts:"Sample list 6" },
  "REQ-1048": { product:"Product P7", priorAuth:"Yes", stepEdit:"No", numSteps:1, stepPlacement:"Step Config 1", stepProducts:"Sample list 7" },
  "REQ-1049": { product:"Product P8", priorAuth:"No", stepEdit:"Yes", numSteps:1, stepPlacement:"Step Config 2", stepProducts:"Sample list 8" },
  "REQ-1050": { product:"Product P9", priorAuth:"No", stepEdit:"No", numSteps:1, stepPlacement:"Step Config 3", stepProducts:"Sample list 9" },
  "REQ-1051": { product:"Product P10", priorAuth:"No", stepEdit:"No", numSteps:4, stepPlacement:"Step Config 1", stepProducts:"Sample list 10" },
};

// ---- persistence (survive navigation to the form page) ----------
const STORE_KEY = "pist_rows_v5";
function loadRows() {
  try {
    const saved = sessionStorage.getItem(STORE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return JSON.parse(JSON.stringify(SEED_ROWS));
}
function saveRows() {
  try { sessionStorage.setItem(STORE_KEY, JSON.stringify(ROWS)); } catch (e) { /* ignore */ }
}
const ROWS = loadRows();

// ---- helper to format lives -------------------------------------
const fmtLives = n => n.toLocaleString();

// ---- state -------------------------------------------------------
let editMode = false;
const history = {}; // id -> [ {ts, field, old, neu, user} ]
ROWS.forEach(r => history[r.id] = []);

const gridBody = document.getElementById("gridBody");

// ---- build a select element -------------------------------------
function buildSelect(opts, current, kind) {
  const sel = document.createElement("select");
  sel.className = "cell-select";
  opts.forEach(o => {
    const opt = document.createElement("option");
    opt.value = o.v; opt.textContent = o.label;
    if (o.v === current) opt.selected = true;
    // "DCR Created" is auto-populated only; users can't pick it manually
    if (kind === "dcr" && o.v === "DCRCreated" && current !== "DCRCreated") {
      opt.disabled = true;
    }
    sel.appendChild(opt);
  });
  const applyColor = () => {
    const found = opts.find(o => o.v === sel.value);
    sel.className = "cell-select " + (found ? found.cls : "");
  };
  applyColor();
  sel.disabled = !editMode;
  sel.dataset.kind = kind;
  sel.addEventListener("change", () => { applyColor(); });
  return sel;
}

// ---- GNE HPM dropdown (purple chip style) -----------------------
function buildGneSelect(r) {
  const sel = document.createElement("select");
  sel.className = "gne-select";
  // ensure current value is present even if not in option list
  const opts = GNE_OPTS.includes(r.gne) ? GNE_OPTS : [r.gne, ...GNE_OPTS];
  opts.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v; opt.textContent = v;
    if (v === r.gne) opt.selected = true;
    sel.appendChild(opt);
  });
  sel.disabled = !editMode;
  sel.addEventListener("change", () => {
    logHistory(r.id, "GNE HPM Status", r.gne, sel.value);
    r.gne = sel.value;
    markDirty();
  });
  return sel;
}

// ---- render rows -------------------------------------------------
function renderRows() {
  gridBody.innerHTML = "";
  const visible = filterRows();
  visible.forEach(r => {
    const tr = document.createElement("tr");
    tr.dataset.id = r.id;

    // checkbox
    const tdc = document.createElement("td");
    tdc.className = "col-check";
    tdc.innerHTML = `<input type="checkbox" class="row-cb" />`;
    tr.appendChild(tdc);

    // Req-ID cell
    const tdId = document.createElement("td");
    tdId.innerHTML = `<span class="req-id">${r.id}</span>`;
    tr.appendChild(tdId);

    // Steward Assigned cell
    tr.appendChild(buildStewardCell(r));

    // simple text cells
    const textCells = [
      r.parentPayer || "—", r.payer, r.brand, r.indication, r.bob, r.benefit, fmtLives(r.lives),
      `<span class="link-cell">Policy</span>`,
      `<span class="link-cell">PA Form</span>`,
      `<span class="link-cell">Drug List</span>`,
      `<span class="link-cell">PA List</span>`,
      `<span class="freetext">&lt;free text&gt;</span>`,
      `<span class="freetext">&lt;free text&gt;</span>`,
      `<span class="freetext">&lt;free text&gt;</span>`,
      r.relAccess || "—",
      r.mmitHpm,
    ];
    textCells.forEach(html => {
      const td = document.createElement("td");
      td.innerHTML = html;
      tr.appendChild(td);
    });

    // MMIT Verification Status (select)
    const tdMmit = document.createElement("td");
    tdMmit.appendChild(buildSelect(MMIT_OPTS, r.mmit, "mmit"));
    tr.appendChild(tdMmit);

    // DCR Status (select) — locked once a DCR has been created
    const tdDcr = document.createElement("td");
    const dcrSel = buildSelect(DCR_OPTS, r.dcr, "dcr");
    if (r.dcrCode && r.dcr !== "BridgingIssues") {
      dcrSel.disabled = true;
      dcrSel.title = "DCR created — status locked";
    }
    tdDcr.appendChild(dcrSel);
    tr.appendChild(tdDcr);

    // Create DCR (per-row action)
    const tdCreate = document.createElement("td");
    tdCreate.className = "create-dcr-cell";
    if (r.dcrCode && r.dcr !== "BridgingIssues") {
      const url = "dcr-detail.html?id=" + encodeURIComponent(r.dcrCode) + "&req=" + encodeURIComponent(r.id);
      tdCreate.innerHTML = `<a class="dcr-link" href="${url}" target="_blank" rel="noopener">${r.dcrCode}</a>`;
    } else {
      const cbtn = document.createElement("button");
      cbtn.className = "create-dcr-btn";
      cbtn.textContent = "Create DCR";
      cbtn.addEventListener("click", () => createDcrForRow(r));
      tdCreate.appendChild(cbtn);
    }
    tr.appendChild(tdCreate);

    // GNE HPM Status (dropdown)
    const tdGne = document.createElement("td");
    tdGne.appendChild(buildGneSelect(r));
    tr.appendChild(tdGne);

    // PA and PI Summary (editable free text)
    tr.appendChild(buildFreeText(r, "pa"));
    // Comments / Links or Queries
    tr.appendChild(buildFreeText(r, "comments"));

    // Action
    const tdAct = document.createElement("td");
    tdAct.innerHTML = `<button class="icon-btn act-hist" title="History">🕑</button>`;
    tr.appendChild(tdAct);

    gridBody.appendChild(tr);
  });

  wireRowEvents();
  updateCounts();
  updateTabCounts();
}

const FREETEXT_LABELS = { pa: "PA/PI Summary", comments: "Comments" };
function buildFreeText(r, field) {
  const td = document.createElement("td");
  td.className = "freetext";
  td.dataset.field = field;
  td.textContent = r[field] || "<Free Text>";
  if (editMode) {
    td.contentEditable = "true";
    td.addEventListener("blur", () => {
      const val = td.textContent.trim();
      if (val !== (r[field] || "")) {
        logHistory(r.id, FREETEXT_LABELS[field] || field, r[field] || "—", val);
        r[field] = val;
        markDirty();
      }
    });
  }
  return td;
}

// ---- steward cell ------------------------------------------------
function buildStewardCell(r) {
  const td = document.createElement("td");
  td.className = "steward-cell";

  if (r.steward) {
    // assigned: show dropdown preset to the steward name
    const sel = document.createElement("select");
    sel.className = "steward-select";
    STEWARDS.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name; opt.textContent = name;
      if (name === r.steward) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener("change", () => {
      logHistory(r.id, "Steward Assigned", r.steward, sel.value);
      r.steward = sel.value;
      markDirty();
    });
    td.appendChild(sel);
  } else {
    // unassigned: empty dropdown + "Assign to me" button
    const sel = document.createElement("select");
    sel.className = "steward-select unassigned";
    const blank = document.createElement("option");
    blank.value = ""; blank.textContent = "—"; blank.selected = true;
    sel.appendChild(blank);
    STEWARDS.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name; opt.textContent = name;
      sel.appendChild(opt);
    });
    sel.addEventListener("change", () => {
      if (sel.value) { assignSteward(r, sel.value); }
    });
    td.appendChild(sel);

    const btn = document.createElement("button");
    btn.className = "assign-me-btn";
    btn.textContent = "Assign to me";
    btn.addEventListener("click", () => assignSteward(r, CURRENT_USER));
    td.appendChild(btn);
  }
  return td;
}

function assignSteward(r, name) {
  logHistory(r.id, "Steward Assigned", r.steward || "—", name);
  r.steward = name;
  markDirty();
  renderRows();
  showToast(`${r.id} assigned to ${name}`, false);
}

// ---- history -----------------------------------------------------
function logHistory(id, field, oldV, newV) {
  history[id].push({
    ts: new Date().toLocaleString(),
    field, old: oldV, neu: newV,
    user: "Steward C",
  });
}

// ---- filtering ---------------------------------------------------
let currentView = "all";
function filterRows() {
  const payers = [...document.querySelectorAll(".payer-cb:checked")].map(c => c.value);
  const bobs = [...document.querySelectorAll(".bob-cb:checked")].map(c => c.value);
  const brands = [...document.querySelectorAll(".brand-cb:checked")].map(c => c.value);
  return ROWS.filter(r => {
    const payerOk = payers.length === 0 ? true : payers.includes(r.payer);
    const bobOk = bobs.length === 0 ? true : bobs.includes(r.bob);
    const brandOk = brands.length === 0 ? true : brands.includes(r.brand);

    return payerOk && bobOk && brandOk && matchesView(r, currentView);
  });
}

// shared view-matching rule (used by filtering and tab counts)
function matchesView(r, view) {
  if (view === "open") return r.dcr === "BridgingIssues" || r.dcr === "New";
  if (view === "completed") return r.dcr === "DCRCreated" || r.dcr === "NotRequired";
  if (view === "mine") return r.steward === CURRENT_USER;
  return true; // "all"
}

// update the count badge on each subtab
function updateTabCounts() {
  const set = (id, n) => { const el = document.getElementById(id); if (el) el.textContent = n; };
  set("count-all", ROWS.filter(r => matchesView(r, "all")).length);
  set("count-open", ROWS.filter(r => matchesView(r, "open")).length);
  set("count-mine", ROWS.filter(r => matchesView(r, "mine")).length);
  set("count-completed", ROWS.filter(r => matchesView(r, "completed")).length);
}

// ---- counts ------------------------------------------------------
function updateCounts() {
  const shown = gridBody.querySelectorAll("tr").length;
  document.getElementById("rowCount").textContent = shown;
  const sel = gridBody.querySelectorAll(".row-cb:checked").length;
  document.getElementById("selCount").textContent = sel;
  // Create Multiple DCR + Bulk Assign require 2+ selected records
  const multi = sel >= 2;
  document.getElementById("createMultiBtn").disabled = !multi;
  document.getElementById("bulkAssignBtn").disabled = !multi;
}

// ---- row events --------------------------------------------------
function wireRowEvents() {
  gridBody.querySelectorAll(".row-cb").forEach(cb => {
    cb.addEventListener("change", e => {
      e.target.closest("tr").classList.toggle("row-selected", e.target.checked);
      updateCounts();
    });
  });
  gridBody.querySelectorAll(".act-hist").forEach(btn => {
    btn.addEventListener("click", e => openHistory(e.target.closest("tr").dataset.id));
  });
  // capture select changes into history + dirty
  gridBody.querySelectorAll(".cell-select").forEach(sel => {
    sel.addEventListener("change", e => {
      const tr = e.target.closest("tr");
      const r = ROWS.find(x => x.id === tr.dataset.id);
      const kind = e.target.dataset.kind;
      const label = kind === "mmit" ? "MMIT Verification" : "DCR Status";
      const optset = kind === "mmit" ? MMIT_OPTS : DCR_OPTS;
      const oldLabel = optset.find(o => o.v === r[kind])?.label;
      const newLabel = optset.find(o => o.v === e.target.value)?.label;
      logHistory(r.id, label, oldLabel, newLabel);
      r[kind] = e.target.value;
      markDirty();
    });
  });
}

// ---- dirty / save ------------------------------------------------
let dirty = false;
function markDirty() {
  dirty = true;
  saveRows();
  const as = document.getElementById("autosave");
  as.classList.add("saving");
  document.getElementById("autosaveText").textContent = "Saving…";
  clearTimeout(markDirty._t);
  markDirty._t = setTimeout(() => {
    as.classList.remove("saving");
    document.getElementById("autosaveText").textContent = "All changes saved";
    dirty = false;
  }, 1200);
}

// ============ EDIT / SUBMIT (toggle) ============
const editToggleBtn = document.getElementById("editToggleBtn");
const tableWrap = document.querySelector(".table-wrap");

editToggleBtn.addEventListener("click", () => {
  if (!editMode) {
    // Enter edit mode
    editMode = true;
    tableWrap.classList.add("editable");
    editToggleBtn.textContent = "Submit Changes";
    editToggleBtn.classList.remove("btn-edit");
    editToggleBtn.classList.add("btn-save");
    renderRows();
    showToast("Edit mode enabled — fields are now editable", false);
  } else {
    // Submit changes, back to read-only
    editMode = false;
    tableWrap.classList.remove("editable");
    editToggleBtn.textContent = "Edit";
    editToggleBtn.classList.remove("btn-save");
    editToggleBtn.classList.add("btn-edit");
    renderRows();
    showToast("Changes submitted successfully", false);
  }
});

// ============ CREATE DCR ============
document.getElementById("createMultiBtn").addEventListener("click", () => {
  const selected = getSelectedRows();
  if (selected.length < 2) { showToast("Select 2+ rows for multiple DCRs", true); return; }

  // A row already has a DCR if it has a code and isn't a Bridging Issue
  const eligible = selected.filter(r => !(r.dcrCode && r.dcr !== "BridgingIssues"));
  const skipped = selected.length - eligible.length;

  if (eligible.length === 0) {
    showToast("All selected records already have a DCR — nothing to create", true);
    return;
  }

  // Persist current state, hand off the eligible ids + skip count,
  // then navigate to the Multiple Policies update form.
  saveRows();
  sessionStorage.setItem("pist_multi_ids", JSON.stringify(eligible.map(r => r.id)));
  sessionStorage.setItem("pist_multi_skipped", String(skipped));
  window.location.href = "multi-form.html";
});

function createDcrForRow(r) {
  r.dcrCode = "DCR-" + Math.floor(1000 + Math.random()*9000);
  r.dcr = "DCRCreated";
  logHistory(r.id, "DCR Status", "—", "DCR Created (" + r.dcrCode + ")");
  renderRows();
  markDirty();
  showToast(`Created ${r.dcrCode} for ${r.id}`, false);
}

function getSelectedRows() {
  const ids = [...gridBody.querySelectorAll(".row-cb:checked")]
    .map(cb => cb.closest("tr").dataset.id);
  return ROWS.filter(r => ids.includes(r.id));
}

// ============ SELECT ALL ============
document.getElementById("selectAll").addEventListener("change", e => {
  gridBody.querySelectorAll(".row-cb").forEach(cb => {
    cb.checked = e.target.checked;
    cb.closest("tr").classList.toggle("row-selected", e.target.checked);
  });
  updateCounts();
});

// ============ BULK ASSIGN MODAL ============
const bulkModal = document.getElementById("bulkModal");
document.getElementById("bulkAssignBtn").addEventListener("click", () => {
  const sel = getSelectedRows();
  const hint = document.getElementById("bulkHint");
  hint.textContent = `${sel.length} record(s) will be assigned to the selected reviewer.`;
  hint.classList.remove("warn");
  document.getElementById("reviewerSelect").value = "";
  bulkModal.classList.add("open");
});
document.getElementById("bulkClose").addEventListener("click", () => bulkModal.classList.remove("open"));
document.getElementById("bulkCancel").addEventListener("click", () => bulkModal.classList.remove("open"));
// "Assign to me" — preselect the current user in the reviewer dropdown
document.getElementById("bulkAssignMe").addEventListener("click", () => {
  const select = document.getElementById("reviewerSelect");
  const match = [...select.options].find(o => o.value.startsWith(CURRENT_USER) || o.text.startsWith(CURRENT_USER));
  if (match) select.value = match.value;
});
document.getElementById("bulkAssignConfirm").addEventListener("click", () => {
  const reviewer = document.getElementById("reviewerSelect").value;
  if (!reviewer) { showToast("Please select a reviewer", true); return; }
  const targets = getSelectedRows();
  targets.forEach(r => logHistory(r.id, "Steward Assigned", "—", reviewer));
  bulkModal.classList.remove("open");
  markDirty();
  showToast(`Assigned ${reviewer} to ${targets.length} record(s)`, false);
});

// ============ HISTORY MODAL ============
const historyModal = document.getElementById("historyModal");
function openHistory(id) {
  document.getElementById("historyTitle").textContent = `Edit History — ${id}`;
  const tbody = document.querySelector("#historyTable tbody");
  tbody.innerHTML = "";
  const items = history[id];
  if (!items.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#888;padding:18px">No changes recorded yet for this request.</td></tr>`;
  } else {
    items.slice().reverse().forEach(h => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${h.ts}</td><td>${h.field}</td><td>${h.old}</td><td>${h.neu}</td><td>${h.user}</td>`;
      tbody.appendChild(tr);
    });
  }
  historyModal.classList.add("open");
}
document.getElementById("historyClose").addEventListener("click", () => historyModal.classList.remove("open"));

// close modals on overlay click
[bulkModal, historyModal].forEach(m => {
  m.addEventListener("click", e => { if (e.target === m) m.classList.remove("open"); });
});

// ============ FILTERS ============
document.querySelectorAll(".filter-cb").forEach(cb => cb.addEventListener("change", renderRows));
document.getElementById("resetFilters").addEventListener("click", () => {
  document.querySelectorAll(".filter-cb").forEach(c => c.checked = false);
  // Clear wins filter state too, so switching tabs stays consistent
  winFilters.brand.clear(); winFilters.subInd.clear();
  winFilters.bob.clear(); winFilters.benefit.clear();
  document.querySelectorAll("#winsFilters .filter-cb").forEach(c => c.checked = false);
  // Re-render whichever view is currently visible
  if (!winsFilters.hidden) renderWins(); else renderRows();
  showToast("Filters reset", false);
});
document.querySelectorAll("[data-toggle]").forEach(t => {
  t.addEventListener("click", () => {
    t.classList.toggle("collapsed");
    t.nextElementSibling.classList.toggle("hidden");
  });
});
const slider = document.getElementById("livesSlider");
slider.addEventListener("input", () => {
  const min = "1M";
  const maxVals = ["5M","10M","20M","35M","50M+"];
  const idx = Math.min(maxVals.length-1, Math.floor(slider.value / 20));
  document.getElementById("rangeNote").textContent = `Range: ${min} – ${maxVals[idx]}`;
});

// ============ METRICS DASHBOARD ============
const DCR_LABELS = { New: "New", DCRCreated: "DCR Created", BridgingIssues: "Bridging Issues", NotRequired: "Not Required" };
const DCR_COLORS = { New: "", DCRCreated: "c-green", BridgingIssues: "c-orange", NotRequired: "c-red" };
const MMIT_COLORS = {
  New: "", Correct: "c-green", UnderMMITReview: "c-teal",
  IncorrectAssessmentError: "c-orange", IncorrectPolicyLag: "c-red", BridgingMDM: "c-purple",
};

// Count rows by a key-producing function
function countBy(fn) {
  const m = {};
  ROWS.forEach(r => { const k = fn(r); if (k === "" || k == null) return; m[k] = (m[k] || 0) + 1; });
  return m;
}

// Render a horizontal bar chart into a container.
// items: [{ label, value, cls }]
function renderBarChart(el, items) {
  el.innerHTML = "";
  const max = Math.max(1, ...items.map(i => i.value));
  items.forEach(it => {
    const row = document.createElement("div");
    row.className = "bar-row";
    const pct = Math.round((it.value / max) * 100);
    row.innerHTML =
      `<span class="bar-label" title="${it.label}">${it.label}</span>` +
      `<span class="bar-track"><span class="bar-fill ${it.cls || ""}" style="width:${pct}%"></span></span>` +
      `<span class="bar-val">${it.value}</span>`;
    el.appendChild(row);
  });
}

function renderDashboard() {
  const total = ROWS.length;
  const dcrCreated = ROWS.filter(r => r.dcr === "DCRCreated").length;
  const bridging = ROWS.filter(r => r.dcr === "BridgingIssues" || r.mmit === "BridgingMDM").length;
  const unassigned = ROWS.filter(r => !r.steward || r.steward.trim() === "").length;
  const totalLives = ROWS.reduce((s, r) => s + (r.lives || 0), 0);

  // KPI cards
  document.getElementById("kpiTotal").textContent = total;
  document.getElementById("kpiLives").textContent = fmtLives(totalLives) + " lives covered";
  document.getElementById("kpiDcr").textContent = dcrCreated;
  document.getElementById("kpiDcrPct").textContent =
    (total ? Math.round((dcrCreated / total) * 100) : 0) + "% of total";
  document.getElementById("kpiBridging").textContent = bridging;
  document.getElementById("kpiUnassigned").textContent = unassigned;

  // DCR status chart (fixed order)
  const dcrCounts = countBy(r => r.dcr);
  renderBarChart(document.getElementById("chartDcr"),
    DCR_OPTS.map(o => ({ label: DCR_LABELS[o.v] || o.v, value: dcrCounts[o.v] || 0, cls: DCR_COLORS[o.v] })));

  // MMIT verification chart (fixed order)
  const mmitCounts = countBy(r => r.mmit);
  renderBarChart(document.getElementById("chartMmit"),
    MMIT_OPTS.map(o => ({ label: o.label, value: mmitCounts[o.v] || 0, cls: MMIT_COLORS[o.v] })));

  // Brand chart (sorted desc)
  const brandCounts = countBy(r => r.brand);
  renderBarChart(document.getElementById("chartBrand"),
    Object.entries(brandCounts).sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value, cls: "c-purple" })));

  // Steward chart (sorted desc, unassigned bucketed)
  const stewardCounts = countBy(r => (r.steward && r.steward.trim()) ? r.steward : "Unassigned");
  renderBarChart(document.getElementById("chartSteward"),
    Object.entries(stewardCounts).sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value, cls: label === "Unassigned" ? "c-red" : "c-teal" })));
}

// ============ POLICY WINS ============
// Fixed summary figures supplied by the business — used as fallback when the
// backend API is unavailable (e.g. running the static mockup with no server).
const WIN_SUMMARY_MOCK = {
  firstAutoApproved: "2026-06-18",
  totalCreated: 238,
  totalApproved: 37,
  autoApproved: 37,
};

// Detail records: [winId, date, payer, brand, bob, benefit, subIndication]
const WINS_MOCK = [
  ["WIN-000001","2026-06-18","Payer 01","Brand Charlie","COMMERCIAL","PHARMACY BENEFIT","Indication B"],
  ["WIN-000002","2026-06-18","Payer 22","Brand Echo","COMMERCIAL","MEDICAL BENEFIT","Indication A"],
  ["WIN-000003","2026-06-18","Payer 07","Brand Bravo","MEDICAID_MANAGED","PHARMACY BENEFIT","Indication E"],
  ["WIN-000004","2026-06-18","Payer 21","Brand Echo","MEDICARE_ADVANTAGE","PHARMACY BENEFIT","Indication D"],
  ["WIN-000005","2026-06-18","Payer 01","Brand Bravo","MEDICAID_MANAGED","MEDICAL BENEFIT","Indication C"],
  ["WIN-000006","2026-06-18","Payer 07","Brand Charlie","COMMERCIAL","PHARMACY BENEFIT","Indication D"],
  ["WIN-000007","2026-06-18","Payer 12","Brand Echo","MEDICARE_ADVANTAGE","PHARMACY BENEFIT","Indication F"],
  ["WIN-000008","2026-06-18","Payer 04","Brand Delta","COMMERCIAL","MEDICAL BENEFIT","Indication F"],
  ["WIN-000009","2026-06-18","Payer 12","Brand Echo","COMMERCIAL","PHARMACY BENEFIT","Indication A"],
  ["WIN-000010","2026-06-18","Payer 25","Brand Charlie","COMMERCIAL","PHARMACY BENEFIT","Indication A"],
  ["WIN-000011","2026-06-18","Payer 15","Brand Charlie","COMMERCIAL","MEDICAL BENEFIT","Indication C"],
  ["WIN-000012","2026-06-18","Payer 09","Brand Alpha","MEDICAID_MANAGED","PHARMACY BENEFIT","Indication E"],
  ["WIN-000013","2026-06-18","Payer 06","Brand Delta","MEDICARE_ADVANTAGE","MEDICAL BENEFIT","Indication F"],
  ["WIN-000014","2026-06-18","Payer 08","Brand Charlie","COMMERCIAL","PHARMACY BENEFIT","Indication A"],
  ["WIN-000015","2026-07-01","Payer 09","Brand Alpha","COMMERCIAL","MEDICAL BENEFIT","Indication B"],
  ["WIN-000016","2026-06-18","Payer 13","Brand Delta","COMMERCIAL","MEDICAL BENEFIT","Indication B"],
  ["WIN-000017","2026-06-18","Payer 18","Brand Echo","MEDICARE_ADVANTAGE","MEDICAL BENEFIT","Indication E"],
  ["WIN-000018","2026-06-18","Payer 08","Brand Bravo","MEDICAID_MANAGED","MEDICAL BENEFIT","Indication A"],
  ["WIN-000019","2026-06-18","Payer 04","Brand Bravo","MEDICAID_MANAGED","PHARMACY BENEFIT","Indication F"],
  ["WIN-000020","2026-06-18","Payer 03","Brand Delta","MEDICARE_ADVANTAGE","MEDICAL BENEFIT","Indication E"],
  ["WIN-000021","2026-06-18","Payer 18","Brand Alpha","MEDICAID_MANAGED","PHARMACY BENEFIT","Indication F"],
  ["WIN-000022","2026-07-01","Payer 25","Brand Charlie","COMMERCIAL","MEDICAL BENEFIT","Indication D"],
  ["WIN-000023","2026-06-18","Payer 01","Brand Charlie","MEDICAID_MANAGED","PHARMACY BENEFIT","Indication E"],
  ["WIN-000024","2026-07-01","Payer 21","Brand Echo","MEDICAID_MANAGED","PHARMACY BENEFIT","Indication B"],
  ["WIN-000025","2026-06-18","Payer 06","Brand Echo","MEDICAID_MANAGED","PHARMACY BENEFIT","Indication E"],
  ["WIN-000026","2026-06-18","Payer 01","Brand Alpha","MEDICARE_ADVANTAGE","MEDICAL BENEFIT","Indication B"],
  ["WIN-000027","2026-06-18","Payer 19","Brand Alpha","COMMERCIAL","MEDICAL BENEFIT","Indication A"],
  ["WIN-000028","2026-06-23","Payer 05","Brand Delta","MEDICAID_MANAGED","PHARMACY BENEFIT","Indication C"],
  ["WIN-000029","2026-06-18","Payer 20","Brand Delta","COMMERCIAL","PHARMACY BENEFIT","Indication F"],
  ["WIN-000030","2026-06-18","Payer 22","Brand Charlie","MEDICARE_ADVANTAGE","MEDICAL BENEFIT","Indication A"],
  ["WIN-000031","2026-06-18","Payer 03","Brand Charlie","COMMERCIAL","PHARMACY BENEFIT","Indication E"],
  ["WIN-000032","2026-06-18","Payer 03","Brand Alpha","COMMERCIAL","PHARMACY BENEFIT","Indication A"],
  ["WIN-000033","2026-06-23","Payer 17","Brand Bravo","MEDICARE_ADVANTAGE","MEDICAL BENEFIT","Indication B"],
  ["WIN-000034","2026-06-18","Payer 24","Brand Echo","MEDICAID_MANAGED","MEDICAL BENEFIT","Indication B"],
  ["WIN-000035","2026-06-18","Payer 14","Brand Bravo","COMMERCIAL","PHARMACY BENEFIT","Indication F"],
  ["WIN-000036","2026-06-18","Payer 14","Brand Delta","MEDICARE_ADVANTAGE","PHARMACY BENEFIT","Indication F"],
  ["WIN-000037","2026-06-18","Payer 21","Brand Alpha","COMMERCIAL","MEDICAL BENEFIT","Indication F"],
].map(a => ({ id:a[0], date:a[1], payer:a[2], brand:a[3], bob:a[4], benefit:a[5], subInd:a[6] }));

// Live state — defaults to the mock, replaced by API data when available.
let WINS = WINS_MOCK;
let WIN_SUMMARY = WIN_SUMMARY_MOCK;
let winsSource = "mock"; // "mock" | "live"

// Fetch live wins data from the backend. On any failure (no server, 503, 502,
// network error) we keep the mock data so the static mockup still works.
// Returns true if live data was loaded.
async function loadWinsFromApi() {
  try {
    const res = await fetch("/api/wins", { headers: { Accept: "application/json" } });
    if (!res.ok) return false;
    const data = await res.json();
    if (!data || !Array.isArray(data.rows) || data.rows.length === 0) return false;
    WINS = data.rows;
    if (data.summary) {
      const auto = data.summary.autoApproved ?? 0;
      const steward = data.summary.stewardValidated ?? 0;
      WIN_SUMMARY = {
        firstAutoApproved: data.summary.firstAutoApproved ?? WIN_SUMMARY_MOCK.firstAutoApproved,
        totalCreated: data.summary.totalCreated ?? data.rows.length,
        // "Approved" = auto-approved + steward-validated
        totalApproved: (data.summary.totalApproved ?? (auto + steward)),
        autoApproved: auto,
      };
    }
    winsSource = "live";
    return true;
  } catch (e) {
    return false; // stay on mock data
  }
}

// Palette used for the pie chart (cycled).
const PIE_COLORS = ["#4a3b8a","#2f9e6b","#e8732c","#1f8aa0","#6b4fa0","#d6452c","#f4c542","#5b8def","#9c6ade","#3aa17e"];

// Active wins filters: { brand:Set, subInd:Set, bob:Set, benefit:Set }
const winFilters = { brand: new Set(), subInd: new Set(), bob: new Set(), benefit: new Set() };

// Return wins matching the active filters.
function filteredWins() {
  return WINS.filter(w =>
    (winFilters.brand.size === 0 || winFilters.brand.has(w.brand)) &&
    (winFilters.subInd.size === 0 || winFilters.subInd.has(w.subInd)) &&
    (winFilters.bob.size === 0 || winFilters.bob.has(w.bob)) &&
    (winFilters.benefit.size === 0 || winFilters.benefit.has(w.benefit))
  );
}

// Build a checkbox filter group body. `values` is [ [value, count], ... ].
function buildWinFilter(containerId, values, setKey) {
  const el = document.getElementById(containerId);
  el.innerHTML = "";
  values.forEach(([val, cnt]) => {
    const lab = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox"; cb.className = "filter-cb"; cb.value = val;
    cb.addEventListener("change", () => {
      if (cb.checked) winFilters[setKey].add(val); else winFilters[setKey].delete(val);
      renderWins();
    });
    lab.appendChild(cb);
    lab.appendChild(document.createTextNode(" " + val + " "));
    const c = document.createElement("span"); c.className = "count"; c.textContent = cnt;
    lab.appendChild(c);
    el.appendChild(lab);
  });
}

// Tally distinct values (with counts) across all wins for a field.
function winTally(field) {
  const m = {};
  WINS.forEach(w => { m[w[field]] = (m[w[field]] || 0) + 1; });
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
}

// Populate the four wins filter panels (once).
function buildWinFilters() {
  buildWinFilter("winFilterBrand", winTally("brand"), "brand");
  buildWinFilter("winFilterIndication", winTally("subInd"), "subInd");
  buildWinFilter("winFilterBob", winTally("bob"), "bob");
  buildWinFilter("winFilterBenefit", winTally("benefit"), "benefit");
}

// Render an SVG donut/pie from [ [label, value], ... ].
function renderPie(svg, legendEl, entries) {
  svg.innerHTML = "";
  legendEl.innerHTML = "";
  const total = entries.reduce((s, e) => s + e[1], 0);
  const cx = 100, cy = 100, r = 90;
  if (total === 0) {
    legendEl.innerHTML = `<div class="wins-empty">No data for current filters</div>`;
    return;
  }
  let angle = 0;
  entries.forEach((e, i) => {
    const [label, value] = e;
    const frac = value / total;
    const color = PIE_COLORS[i % PIE_COLORS.length];
    // Single full-circle slice needs special handling.
    if (frac >= 0.9999) {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", r);
      c.setAttribute("fill", color); c.setAttribute("class", "pie-slice");
      svg.appendChild(c);
    } else {
      const a0 = angle * 2 * Math.PI;
      const a1 = (angle + frac) * 2 * Math.PI;
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      const large = frac > 0.5 ? 1 : 0;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`);
      path.setAttribute("fill", color);
      path.setAttribute("class", "pie-slice");
      svg.appendChild(path);
    }
    angle += frac;
    // Legend row
    const row = document.createElement("div");
    row.className = "leg-row";
    row.innerHTML =
      `<span class="leg-dot" style="background:${color}"></span>` +
      `<span class="leg-name" title="${label}">${label}</span>` +
      `<span class="leg-val">${value}</span>` +
      `<span class="leg-pct">${Math.round(frac * 100)}%</span>`;
    legendEl.appendChild(row);
  });
}

// Render the wins table body.
function renderWinsTable(rows) {
  const body = document.getElementById("winsBody");
  body.innerHTML = "";
  if (rows.length === 0) {
    body.innerHTML = `<tr><td colspan="7" class="wins-empty">No WINs match the current filters</td></tr>`;
    return;
  }
  rows.forEach(w => {
    const tr = document.createElement("tr");
    tr.innerHTML =
      `<td class="win-id">${w.id}</td>` +
      `<td>${w.date}</td>` +
      `<td>${w.payer}</td>` +
      `<td>${w.brand}</td>` +
      `<td>${w.bob}</td>` +
      `<td>${w.benefit}</td>` +
      `<td>${w.subInd}</td>`;
    body.appendChild(tr);
  });
}

// Main wins render: summary cards + pie + table, honoring filters.
function renderWins() {
  const rows = filteredWins();

  // Summary cards (fixed business figures; "shown" reflects filtered detail rows)
  document.getElementById("winTotal").textContent = WIN_SUMMARY.totalCreated;
  document.getElementById("winShown").textContent =
    rows.length + " of " + WINS.length + " rows" + (winsSource === "live" ? " · live" : " · demo data");
  document.getElementById("winApproved").textContent = WIN_SUMMARY.totalApproved;
  document.getElementById("winApprovedPct").textContent =
    Math.round((WIN_SUMMARY.totalApproved / WIN_SUMMARY.totalCreated) * 100) + "% of created";
  document.getElementById("winAuto").textContent = WIN_SUMMARY.autoApproved;
  document.getElementById("winFirstDate").textContent = WIN_SUMMARY.firstAutoApproved;

  // Pie: WINs by brand (from filtered rows)
  const brandTally = {};
  rows.forEach(w => { brandTally[w.brand] = (brandTally[w.brand] || 0) + 1; });
  const entries = Object.entries(brandTally).sort((a, b) => b[1] - a[1]);
  renderPie(document.getElementById("winPie"), document.getElementById("winPieLegend"), entries);

  // Table
  document.getElementById("winTableCount").textContent = rows.length;
  renderWinsTable(rows);
}

// ============ UTILIZATION TABS (2026 YTD) ============
// Illustrative 2026 figures (rounded, representative). No production
// identifiers or record-level data.
const UTIL_2026 = {
  dcr: {
    submit: { user: 120, steward: 12900 },
    auto:   { total: 7500, approved: 6250, rejected: 1230 },
    manual: { total: 5500, approved: 5480, rejected: 25 },
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul"],
    trendAuto:   [380, 110, 290, 425, 1050, 3050, 2210],
    trendManual: [255,  25, 455, 730,  580, 2100, 1375],
    matrix: {
      user:    { auto: 60,   manual: 45 },
      steward: { auto: 7450, manual: 5470 },
    },
  },
  wins: {
    auto:   { total: 870, payers: 380, brands: 13 },
    manual: { total: 30,  payers: 29,  brands: 12 },
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul"],
    trendAuto:   [470, 5, 11, 31, 353, 0, 2],
    trendManual: [  8, 1,  1,  2,  20, 0, 0],
  },
};

function pct(n, d) { return d ? Math.round((n / d) * 1000) / 10 : 0; }

function renderDcrUtil() {
  const d = UTIL_2026.dcr;
  const totalSubmit = d.submit.user + d.submit.steward;
  const decided = d.auto.total + d.manual.total;
  const autoShare = Math.round((d.auto.total / decided) * 100);
  const autoRate = pct(d.auto.approved, d.auto.approved + d.auto.rejected);
  const manualRate = pct(d.manual.approved, d.manual.approved + d.manual.rejected);

  document.getElementById("duTotal").textContent = totalSubmit.toLocaleString();
  document.getElementById("duSubmitSplit").textContent =
    `User ${d.submit.user.toLocaleString()} · Steward ${d.submit.steward.toLocaleString()}`;
  document.getElementById("duAutoShare").textContent = autoShare + "%";
  document.getElementById("duAutoCount").textContent =
    `${d.auto.total.toLocaleString()} of ${decided.toLocaleString()} decided`;
  document.getElementById("duAutoRate").textContent = autoRate + "%";
  document.getElementById("duManualRate").textContent = "Manual " + manualRate + "%";
  document.getElementById("duAvoided").textContent = d.auto.total.toLocaleString();

  renderBarChart(document.getElementById("duChartSource"), [
    { label: "User Submitted",    value: d.submit.user,    cls: "c-orange" },
    { label: "Steward Submitted", value: d.submit.steward, cls: "c-teal" },
  ]);
  renderBarChart(document.getElementById("duChartApproval"), [
    { label: "Auto-Approved",    value: d.auto.total,   cls: "c-purple" },
    { label: "Manual (steward)", value: d.manual.total, cls: "c-orange" },
  ]);
  const trend = [];
  d.months.forEach((m, i) => {
    trend.push({ label: m + " · Auto",   value: d.trendAuto[i],   cls: "c-purple" });
    trend.push({ label: m + " · Manual", value: d.trendManual[i], cls: "c-orange" });
  });
  renderBarChart(document.getElementById("duChartTrend"), trend);
  renderBarChart(document.getElementById("duChartRate"), [
    { label: "Auto",   value: autoRate,   cls: "c-green" },
    { label: "Manual", value: manualRate, cls: "c-yellow" },
  ]);
  renderBarChart(document.getElementById("duChartFunnel"), [
    { label: "Auto · Decided",    value: d.auto.total,      cls: "c-purple" },
    { label: "Auto · Approved",   value: d.auto.approved,   cls: "c-green" },
    { label: "Auto · Rejected",   value: d.auto.rejected,   cls: "c-red" },
    { label: "Manual · Decided",  value: d.manual.total,    cls: "c-orange" },
    { label: "Manual · Approved", value: d.manual.approved, cls: "c-green" },
    { label: "Manual · Rejected", value: d.manual.rejected, cls: "c-red" },
  ]);
  renderBarChart(document.getElementById("duChartMatrix"), [
    { label: "User · Auto",      value: d.matrix.user.auto,      cls: "c-purple" },
    { label: "User · Manual",    value: d.matrix.user.manual,    cls: "c-orange" },
    { label: "Steward · Auto",   value: d.matrix.steward.auto,   cls: "c-purple" },
    { label: "Steward · Manual", value: d.matrix.steward.manual, cls: "c-orange" },
  ]);
}

function renderWinsUtil() {
  const w = UTIL_2026.wins;
  const total = w.auto.total + w.manual.total;
  const autoShare = Math.round((w.auto.total / total) * 100);

  document.getElementById("wuTotal").textContent = total.toLocaleString();
  document.getElementById("wuSplit").textContent =
    `Auto ${w.auto.total.toLocaleString()} · Manual ${w.manual.total}`;
  document.getElementById("wuAutoShare").textContent = autoShare + "%";
  document.getElementById("wuPayers").textContent = w.auto.payers.toLocaleString();
  document.getElementById("wuBrands").textContent = w.auto.brands + " brands";
  document.getElementById("wuAvoided").textContent = w.auto.total.toLocaleString();

  renderBarChart(document.getElementById("wuChartChannel"), [
    { label: "Auto (P360)",      value: w.auto.total,   cls: "c-purple" },
    { label: "Manual (steward)", value: w.manual.total, cls: "c-orange" },
  ]);
  const wtrend = [];
  w.months.forEach((m, i) => {
    wtrend.push({ label: m + " · Auto",   value: w.trendAuto[i],   cls: "c-purple" });
    wtrend.push({ label: m + " · Manual", value: w.trendManual[i], cls: "c-orange" });
  });
  renderBarChart(document.getElementById("wuChartTrend"), wtrend);
  renderBarChart(document.getElementById("wuChartPayers"), [
    { label: "Auto",   value: w.auto.payers,   cls: "c-purple" },
    { label: "Manual", value: w.manual.payers, cls: "c-orange" },
  ]);
  renderBarChart(document.getElementById("wuChartBrands"), [
    { label: "Auto",   value: w.auto.brands,   cls: "c-purple" },
    { label: "Manual", value: w.manual.brands, cls: "c-orange" },
  ]);
}

// ============ NAV TABS ============
const stewardshipView = document.getElementById("stewardshipView");
const metricView = document.getElementById("metricView");
const metricDcrs = document.getElementById("metricDcrs");
const metricWins = document.getElementById("metricWins");
const metricDcrUtil = document.getElementById("metricDcrUtil");
const metricWinsUtil = document.getElementById("metricWinsUtil");
const stewardshipFilters = document.getElementById("stewardshipFilters");
const winsFilters = document.getElementById("winsFilters");
let winsBuilt = false;

// Switch the active subtab within the Metric Dashboard.
// which = "dcrs" | "wins" | "dcrutil" | "winsutil"
function showMetricSubtab(which) {
  // Panels
  metricDcrs.hidden = which !== "dcrs";
  metricWins.hidden = which !== "wins";
  metricDcrUtil.hidden = which !== "dcrutil";
  metricWinsUtil.hidden = which !== "winsutil";
  // Subtab highlight
  document.querySelectorAll(".metric-subtab").forEach(s =>
    s.classList.toggle("active", s.dataset.metric === which));
  // Sidebar filters: only the live Wins subtab uses wins filters.
  const isWins = which === "wins";
  stewardshipFilters.hidden = isWins;
  winsFilters.hidden = !isWins;

  if (which === "wins") {
    // Try live data on each open (real-time), then (re)build filters + render.
    loadWinsFromApi().then(() => {
      buildWinFilters();
      winsBuilt = true;
      renderWins();
    });
    // Render immediately with whatever we have so the UI isn't blank while fetching.
    if (!winsBuilt) { buildWinFilters(); winsBuilt = true; }
    renderWins();
  } else if (which === "dcrutil") {
    renderDcrUtil();
  } else if (which === "winsutil") {
    renderWinsUtil();
  } else {
    renderDashboard();
  }
}

document.querySelectorAll(".nav-tab[data-tab]").forEach(t => {
  t.addEventListener("click", () => {
    document.querySelectorAll(".nav-tab").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    const tab = t.dataset.tab;
    // "metric" and "wins" both open the Metric Dashboard, on different subtabs
    const showMetrics = tab === "metric" || tab === "wins";
    const showStewardship = tab === "stewardship";

    stewardshipView.hidden = !showStewardship;
    metricView.hidden = !showMetrics;

    if (showMetrics) {
      showMetricSubtab(tab === "wins" ? "wins" : "dcrs");
    } else if (showStewardship) {
      // Restore stewardship sidebar filters
      stewardshipFilters.hidden = false;
      winsFilters.hidden = true;
    } else {
      showToast(t.textContent.trim() + " — demo placeholder", false);
    }
  });
});

// Metric subtab clicks (DCRs | Policy Wins)
document.querySelectorAll(".metric-subtab").forEach(s => {
  s.addEventListener("click", () => showMetricSubtab(s.dataset.metric));
});
document.querySelectorAll(".subtab").forEach(t => {
  t.addEventListener("click", () => {
    document.querySelectorAll(".subtab").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    currentView = t.dataset.view || "all";
    renderRows();
  });
});

// ============ TOAST ============
let toastT;
function showToast(msg, isErr) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.className = "toast show" + (isErr ? " err" : "");
  clearTimeout(toastT);
  toastT = setTimeout(() => el.className = "toast", 2600);
}

// ============ RETURN FROM FORM ============
// The form page sets pist_multi_result with the created DCRs, then
// navigates back here. Apply the DCR-IDs and notify.
function applyMultiResult() {
  const raw = sessionStorage.getItem("pist_multi_result");
  if (!raw) return;
  sessionStorage.removeItem("pist_multi_result");
  let result;
  try { result = JSON.parse(raw); } catch (e) { return; }
  const created = result.created || [];
  const skipped = result.skipped || 0;
  created.forEach(({ id, dcrCode }) => {
    const r = ROWS.find(x => x.id === id);
    if (!r) return;
    r.dcrCode = dcrCode;
    r.dcr = "DCRCreated";
    logHistory(r.id, "DCR Status", "—", "Multi-DCR (" + dcrCode + ")");
  });
  saveRows();
  renderRows();
  if (created.length) {
    const msg = skipped > 0
      ? `Created ${created.length} DCR(s) from Multiple Policies form; ${skipped} skipped (already have a DCR)`
      : `Created ${created.length} DCR(s) from Multiple Policies form`;
    showToast(msg, false);
  }
}

// ============ INIT ============
renderRows();
applyMultiResult();
