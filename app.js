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
  { v: "New", label: "New", cls: "d-val-New" },
  { v: "DCRCreated", label: "DCR Created", cls: "d-val-DCRCreated" },
  { v: "BridgingIssues", label: "Bridging Issues", cls: "d-val-BridgingIssues" },
  { v: "NotRequired", label: "Not Required", cls: "d-val-NotRequired" },
];

const GNE_OPTS = [
  "DRUG COVERED WITH NO PA", "NARROWER THAN PI", "TO PI OR BETTER",
  "NO PA", "NOT COVERED", "Unknown", "TO PI WITH CRITERIA",
];

// ---- seed data ---------------------------------------------------
const SEED_ROWS = [
  { id:"REQ-1042", steward:"Syed Riyaz", parentPayer:"UNITEDHEALTH GROUP", payer:"UnitedHealthcare", brand:"OCREVUS ZUNOVO", indication:"Rheumatoid Arthritis (RA)", bob:"Commercial", benefit:"Medical", form:"2587123", lives:6580, mmitHpm:"Clinical Criteria Required", mmit:"Correct", dcr:"DCRCreated", dcrCode:"DCR-CFD39", gne:"DRUG COVERED WITH NO PA", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1043", steward:"Syed Riyaz", parentPayer:"CVS HEALTH CORPORATION", payer:"Aetna", brand:"VABYSMO", indication:"Rheumatoid Arthritis (RA)", bob:"Commercial", benefit:"Medical", form:"2587123", lives:6580, mmitHpm:"Bio Managed 2", mmit:"IncorrectAssessmentError", dcr:"DCRCreated", dcrCode:"DCR-CFD39", gne:"NARROWER THAN PI", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1044", steward:"Syed Riyaz", parentPayer:"THE CIGNA GROUP", payer:"Cigna", brand:"ACTEMRA SC", indication:"Rheumatoid Arthritis (RA)", bob:"Commercial", benefit:"Medical", form:"2587123", lives:6580, mmitHpm:"Drug Covered with No PA", mmit:"Correct", dcr:"DCRCreated", dcrCode:"DCR-CFD39", gne:"TO PI OR BETTER", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1045", steward:"Adriana Jazbor", parentPayer:"UNITEDHEALTH GROUP", payer:"UnitedHealthcare", brand:"OCREVUS ZUNOVO", indication:"Rheumatoid Arthritis (RA)", bob:"Commercial", benefit:"Medical", form:"3187225", lives:6580, mmitHpm:"Bio Managed 1", mmit:"IncorrectPolicyLag", dcr:"BridgingIssues", dcrCode:"DCR-CFD39", gne:"NO PA", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1046", steward:"A. Martinez", parentPayer:"CVS HEALTH CORPORATION", payer:"Aetna", brand:"OCREVUS", indication:"Multiple Sclerosis", bob:"Commercial", benefit:"Medical", form:"3187225", lives:7110, mmitHpm:"Clinical Criteria Required", mmit:"UnderMMITReview", dcr:"New", dcrCode:"", gne:"NOT COVERED", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1047", steward:"A. Martinez", parentPayer:"THE CIGNA GROUP", payer:"Cigna", brand:"XOLAIR AUTOINJECTOR", indication:"Psoriasis", bob:"Medicare Advantage", benefit:"Pharmacy", form:"3187225", lives:12450, mmitHpm:"Clinical Criteria Required", mmit:"New", dcr:"New", dcrCode:"", gne:"Unknown", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1048", steward:"A. Martinez", parentPayer:"CVS HEALTH CORPORATION", payer:"CVS Health", brand:"OCREVUS ZUNOVO", indication:"Crohn's Disease", bob:"Commercial", benefit:"Medical", form:"3287338", lives:9920, mmitHpm:"Clinical Criteria Required", mmit:"BridgingMDM", dcr:"BridgingIssues", dcrCode:"DCR-CFD39", gne:"TO PI WITH CRITERIA", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1049", steward:"", parentPayer:"THE CIGNA GROUP", payer:"Cigna", brand:"ACTEMRA SC", indication:"Plaque Psoriasis", bob:"Medicaid Managed", benefit:"Pharmacy", form:"3287338", lives:4180, mmitHpm:"Clinical Criteria Required", mmit:"Correct", dcr:"DCRCreated", dcrCode:"DCR-CFD39", gne:"NARROWER THAN PI", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1050", steward:"", parentPayer:"HUMANA INC", payer:"Humana", brand:"VABYSMO", indication:"Ulcerative Colitis", bob:"Medicare Advantage", benefit:"Medical", form:"3401119", lives:15870, mmitHpm:"Clinical Criteria Required", mmit:"Correct", dcr:"NotRequired", dcrCode:"", gne:"TO PI OR BETTER", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1051", steward:"", parentPayer:"CVS HEALTH CORPORATION", payer:"Aetna", brand:"ACTEMRA SC", indication:"Atopic Dermatitis", bob:"Commercial", benefit:"Pharmacy", form:"3401119", lives:22340, mmitHpm:"Bio Managed 2", mmit:"New", dcr:"New", dcrCode:"", gne:"NO PA", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
];

// Stewards available for assignment
const STEWARDS = ["Syed Riyaz", "Adriana Jazbor", "A. Martinez", "J. Chen", "R. Patel", "S. Okafor", "L. Nguyen"];
const CURRENT_USER = "A. Martinez";

// Product-coverage attributes used to pre-populate DCRs on the
// "Multiple Policies update form". Keyed by request id.
const COVERAGE = {
  "REQ-1042": { product:"ENBREL", priorAuth:"Yes", stepEdit:"Yes", numSteps:1, stepPlacement:"ST Single Generic", stepProducts:"1 of [methotrexate]" },
  "REQ-1043": { product:"HUMIRA", priorAuth:"Yes", stepEdit:"Yes", numSteps:2, stepPlacement:"ST Generic and Brand", stepProducts:"2 of [methotrexate, sulfasalazine]" },
  "REQ-1044": { product:"HYRIMOZ", priorAuth:"Yes", stepEdit:"Yes", numSteps:4, stepPlacement:"ST Generic and Brand", stepProducts:"1 of [methotrexate]" },
  "REQ-1045": { product:"OCREVUS ZUNOVO", priorAuth:"Yes", stepEdit:"Yes", numSteps:6, stepPlacement:"No Step", stepProducts:"Past to Future February 27th" },
  "REQ-1046": { product:"COPAXONE", priorAuth:"No", stepEdit:"No", numSteps:0, stepPlacement:"No Step", stepProducts:"N/A" },
  "REQ-1047": { product:"OTEZLA", priorAuth:"Yes", stepEdit:"Yes", numSteps:1, stepPlacement:"ST Single Generic", stepProducts:"1 of [topical corticosteroid]" },
  "REQ-1048": { product:"STELARA", priorAuth:"Yes", stepEdit:"No", numSteps:0, stepPlacement:"No Step", stepProducts:"N/A" },
  "REQ-1049": { product:"CYLTEZO", priorAuth:"Yes", stepEdit:"Yes", numSteps:4, stepPlacement:"ST Generic and Brand", stepProducts:"1 of [methotrexate]" },
  "REQ-1050": { product:"ENTYVIO", priorAuth:"No", stepEdit:"No", numSteps:0, stepPlacement:"No Step", stepProducts:"N/A" },
  "REQ-1051": { product:"DUPIXENT", priorAuth:"Yes", stepEdit:"Yes", numSteps:1, stepPlacement:"ST Single Brand", stepProducts:"1 of [topical]" },
};

// ---- persistence (survive navigation to the form page) ----------
const STORE_KEY = "pist_rows_v4";
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
      r.parentPayer || "—", r.payer, r.brand, r.indication, r.bob, r.benefit, r.form, fmtLives(r.lives),
      `<span class="link-cell">Policy</span>`,
      `<span class="link-cell">PA Form</span>`,
      `<span class="link-cell">Drug List</span>`,
      `<span class="link-cell">PA List</span>`,
      `<span class="link-cell">${r.prLink1 || "23-07-2025 Tecentriq, Tecentriq Hybreza (Commercial, Medicare)"}</span>`,
      `<span class="na-cell">#N/A</span>`,
      `<span class="na-cell">#N/A</span>`,
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
}

function buildFreeText(r, field) {
  const td = document.createElement("td");
  td.className = "freetext";
  td.dataset.field = field;
  td.textContent = r[field];
  if (editMode) {
    td.contentEditable = "true";
    td.addEventListener("blur", () => {
      const val = td.textContent.trim();
      if (val !== r[field]) {
        logHistory(r.id, field === "pa" ? "PA/PI Summary" : "Comments", r[field], val);
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
    user: "A. Martinez",
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

    // subtab view filter
    let viewOk = true;
    if (currentView === "open") {
      // open = work still to do: DCR Status is Bridging Issues or New
      viewOk = r.dcr === "BridgingIssues" || r.dcr === "New";
    } else if (currentView === "completed") {
      // completed = DCR created or not required
      viewOk = r.dcr === "DCRCreated" || r.dcr === "NotRequired";
    } else if (currentView === "mine") {
      viewOk = r.steward === CURRENT_USER;
    }

    return payerOk && bobOk && brandOk && viewOk;
  });
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

// ============ EDIT / SAVE ============
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const tableWrap = document.querySelector(".table-wrap");

editBtn.addEventListener("click", () => {
  editMode = true;
  tableWrap.classList.add("editable");
  editBtn.disabled = true;
  saveBtn.disabled = false;
  renderRows();
  showToast("Edit mode enabled — fields are now editable", false);
});

saveBtn.addEventListener("click", () => {
  editMode = false;
  tableWrap.classList.remove("editable");
  editBtn.disabled = false;
  saveBtn.disabled = true;
  renderRows();
  showToast("Changes saved successfully", false);
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
  hint.textContent = `${sel.length} DCR(s) will be assigned to the selected reviewer.`;
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
  showToast(`Assigned ${reviewer} to ${targets.length} DCR(s)`, false);
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
  renderRows();
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

// ============ NAV TABS ============
document.querySelectorAll(".nav-tab[data-tab]").forEach(t => {
  t.addEventListener("click", () => {
    document.querySelectorAll(".nav-tab").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    if (t.dataset.tab !== "stewardship") showToast(t.textContent.trim() + " — demo placeholder", false);
  });
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
