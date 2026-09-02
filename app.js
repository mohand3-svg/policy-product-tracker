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
  { id:"REQ-1042", steward:"Syed Riyaz", parentPayer:"UNITEDHEALTH GROUP", payer:"UnitedHealthcare", brand:"OCREVUS ZUNOVO", indication:"Rheumatoid Arthritis (RA)", bob:"Commercial", benefit:"Medical", form:"2587123", lives:6580, mmitHpm:"Clinical Criteria Required", mmit:"Correct", dcr:"DCRCreated", dcrCode:"DCR-CFD39", gne:"DRUG COVERED WITH NO PA", relAccess:"Advantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1043", steward:"Syed Riyaz", parentPayer:"CVS HEALTH CORPORATION", payer:"Aetna", brand:"VABYSMO", indication:"Rheumatoid Arthritis (RA)", bob:"Commercial", benefit:"Medical", form:"2587123", lives:6580, mmitHpm:"Bio Managed 2", mmit:"IncorrectAssessmentError", dcr:"DCRCreated", dcrCode:"DCR-CFD39", gne:"NARROWER THAN PI", relAccess:"Disadvantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1044", steward:"Syed Riyaz", parentPayer:"THE CIGNA GROUP", payer:"Cigna", brand:"ACTEMRA SC", indication:"Rheumatoid Arthritis (RA)", bob:"Commercial", benefit:"Medical", form:"2587123", lives:6580, mmitHpm:"Drug Covered with No PA", mmit:"Correct", dcr:"DCRCreated", dcrCode:"DCR-CFD39", gne:"TO PI OR BETTER", relAccess:"At Par", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1045", steward:"Adriana Jazbor", parentPayer:"UNITEDHEALTH GROUP", payer:"UnitedHealthcare", brand:"OCREVUS ZUNOVO", indication:"Rheumatoid Arthritis (RA)", bob:"Commercial", benefit:"Medical", form:"3187225", lives:6580, mmitHpm:"Bio Managed 1", mmit:"IncorrectPolicyLag", dcr:"BridgingIssues", dcrCode:"DCR-CFD39", gne:"NO PA", relAccess:"At Par", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1046", steward:"A. Martinez", parentPayer:"CVS HEALTH CORPORATION", payer:"Aetna", brand:"OCREVUS", indication:"Multiple Sclerosis", bob:"Commercial", benefit:"Medical", form:"3187225", lives:7110, mmitHpm:"Clinical Criteria Required", mmit:"UnderMMITReview", dcr:"New", dcrCode:"", gne:"NOT COVERED", relAccess:"Disadvantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1047", steward:"A. Martinez", parentPayer:"THE CIGNA GROUP", payer:"Cigna", brand:"XOLAIR AUTOINJECTOR", indication:"Psoriasis", bob:"Medicare Advantage", benefit:"Pharmacy", form:"3187225", lives:12450, mmitHpm:"Clinical Criteria Required", mmit:"New", dcr:"New", dcrCode:"", gne:"Unknown", relAccess:"At Par", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1048", steward:"A. Martinez", parentPayer:"CVS HEALTH CORPORATION", payer:"CVS Health", brand:"OCREVUS ZUNOVO", indication:"Crohn's Disease", bob:"Commercial", benefit:"Medical", form:"3287338", lives:9920, mmitHpm:"Clinical Criteria Required", mmit:"BridgingMDM", dcr:"BridgingIssues", dcrCode:"DCR-CFD39", gne:"TO PI WITH CRITERIA", relAccess:"Advantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1049", steward:"", parentPayer:"THE CIGNA GROUP", payer:"Cigna", brand:"ACTEMRA SC", indication:"Plaque Psoriasis", bob:"Medicaid Managed", benefit:"Pharmacy", form:"3287338", lives:4180, mmitHpm:"Clinical Criteria Required", mmit:"Correct", dcr:"DCRCreated", dcrCode:"DCR-CFD39", gne:"NARROWER THAN PI", relAccess:"Disadvantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1050", steward:"", parentPayer:"HUMANA INC", payer:"Humana", brand:"VABYSMO", indication:"Ulcerative Colitis", bob:"Medicare Advantage", benefit:"Medical", form:"3401119", lives:15870, mmitHpm:"Clinical Criteria Required", mmit:"Correct", dcr:"NotRequired", dcrCode:"", gne:"TO PI OR BETTER", relAccess:"Advantaged", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
  { id:"REQ-1051", steward:"", parentPayer:"CVS HEALTH CORPORATION", payer:"Aetna", brand:"ACTEMRA SC", indication:"Atopic Dermatitis", bob:"Commercial", benefit:"Pharmacy", form:"3401119", lives:22340, mmitHpm:"Bio Managed 2", mmit:"New", dcr:"New", dcrCode:"", gne:"NO PA", relAccess:"At Par", pa:"<Free Text>", comments:"<Free Text>", gate:"" },
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

// Opening the Create DCR form modal, prefilled from the request row.
let DCR_MODAL_ROW = null;

function createDcrForRow(r) {
  openDcrModal(r);
}

// Map a request's coverage fields into the Payer Details form.
function openDcrModal(r) {
  DCR_MODAL_ROW = r;
  const modal = document.getElementById("dcrModal");
  if (!modal) return;

  const setTxt = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = (v && String(v).trim()) ? v : "—"; };
  const setVal = (id, v) => { const e = document.getElementById(id); if (e) e.value = (v === undefined || v === null) ? "" : v; };

  // Top summary strip — payer/product context.
  setTxt("pdPayer", r.parentPayer ? `${r.payer} (${r.parentPayer})` : r.payer);
  setTxt("pdProduct", r.brand);
  setTxt("pdBenefit", (r.benefit || "").toUpperCase() + (r.benefit ? " BENEFIT" : ""));
  setTxt("pdBob", (r.bob || "").toUpperCase());
  setTxt("pdIndication", r.indication);
  setTxt("pdState", r.geo || "ALL");

  // Left read-only coverage context.
  setTxt("dcrGneHpm", r.mmitHpm || r.gne);
  setTxt("dcrPaPiSummary", r.comments && r.comments !== "<Free Text>" ? r.comments : (r.gne || "—"));

  // Current column — derived from the row (read-only "as-is" values).
  const paCurrent = /NO PA|WITH NO PA/i.test(r.gne || "") ? "No" : "Yes";
  const simplifiedCurrent = /NOT COVERED/i.test(r.gne || "") ? "NOT COVERED"
    : /TO PI/i.test(r.gne || "") ? "COVERED" : (r.gne || "—");
  setVal("pdCurPa", paCurrent);
  setVal("pdCurStepEdit", "No");
  setVal("pdCurNumSteps", "1");
  setVal("pdCurPlacement", "Not Covered");
  setVal("pdCurStepProducts", "");
  setVal("pdCurSimplified", simplifiedCurrent);
  setVal("pdCurPolicyLink", "");
  setVal("pdCurSocLink", "");
  setVal("pdCurPaFormLink", "");
  setVal("pdCurEffDate", "—");
  setVal("pdCurStateRow", "all");

  // Proposed column — editable, defaulted to the current values as a starting point.
  setVal("dcrPaRequired", paCurrent);
  setVal("dcrStepEdit", "No");
  setVal("dcrStepPlacement", "Not Covered");
  setVal("dcrStepProducts", "");
  setVal("dcrNumSteps", "1");
  setVal("pdPropSimplified", "");
  setVal("pdPropPolicyLink", "");
  setVal("pdPropSocLink", "");
  setVal("pdPropPaFormLink", "");
  setVal("pdPropEffDate", "");
  setVal("pdPropStateRow", "all");

  modal.classList.add("open");
}

function closeDcrModal() {
  const modal = document.getElementById("dcrModal");
  if (modal) modal.classList.remove("open");
  DCR_MODAL_ROW = null;
}

// Confirm — generate the DCR code and apply it to the row (the real save).
function confirmCreateDcr() {
  const r = DCR_MODAL_ROW;
  if (!r) { closeDcrModal(); return; }
  r.dcrCode = "DCR-" + Math.floor(1000 + Math.random() * 9000);
  r.dcr = "DCRCreated";
  const steps = document.getElementById("dcrNumSteps");
  const placement = document.getElementById("dcrStepPlacement");
  logHistory(r.id, "DCR Status", "—", "DCR Created (" + r.dcrCode + ")");
  if (placement && placement.value) logHistory(r.id, "Step Therapy Placement", "—", placement.value);
  renderRows();
  markDirty();
  closeDcrModal();
  showToast(`Created ${r.dcrCode} for ${r.id}`, false);
}

// Wire modal controls (close, cancel, confirm, backdrop click).
(function wireDcrModal() {
  const close = document.getElementById("dcrClose");
  const cancel = document.getElementById("dcrCancel");
  const confirm = document.getElementById("dcrCreateConfirm");
  const modal = document.getElementById("dcrModal");
  if (close) close.addEventListener("click", closeDcrModal);
  if (cancel) cancel.addEventListener("click", closeDcrModal);
  if (confirm) confirm.addEventListener("click", confirmCreateDcr);
  if (modal) modal.addEventListener("click", e => { if (e.target === modal) closeDcrModal(); });
})();

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
  ["WIN-01AA8B","2026-06-18","SAMARITAN HEALTH","ACTEMRA SC","MEDICARE_ADVANTAGE","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-037384","2026-06-18","PIH HEALTH (EMPLOYER)","OCREVUS ZUNOVO","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-04EEBE","2026-06-18","WASHOE COUNTY SCHOOL DISTRICT (EMPLOYER)","OCREVUS","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-09061E","2026-06-18","WISCONSIN PHYSICIAN'S SERVICE","XOLAIR VIAL","COMMERCIAL","MEDICAL BENEFIT","Asthma"],
  ["WIN-12698C","2026-06-18","LIBERTY UNIVERSITY (EMPLOYER)","OCREVUS ZUNOVO","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-28DB34","2026-06-18","CARESOURCE WI (COMMON GROUND HEALTHCARE)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-318A79","2026-06-18","RELX GROUP (EMPLOYER)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-4409B2","2026-06-18","WASHOE COUNTY SCHOOL DISTRICT (EMPLOYER)","OCREVUS ZUNOVO","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-4C7F4C","2026-06-18","CITY OF NORFOLK (EMPLOYER)","OCREVUS","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-51F062","2026-06-18","SILGAN (EMPLOYER)","OCREVUS ZUNOVO","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-5AB5FB","2026-06-18","WISCONSIN PHYSICIAN'S SERVICE","XOLAIR PFS","COMMERCIAL","MEDICAL BENEFIT","Asthma"],
  ["WIN-65DFE5","2026-06-18","IOWA TOTAL CARE","ACTEMRA IV","COMMERCIAL","MEDICAL BENEFIT","Rheumatoid Arthritis"],
  ["WIN-67FE19","2026-06-18","CITY OF SAN JOSE (EMPLOYER)","OCREVUS","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-68E8F4","2026-07-01","SAMARITAN HEALTH","XOLAIR AUTOINJECTOR","COMMERCIAL","PHARMACY BENEFIT","Food Allergy"],
  ["WIN-6B35DE","2026-06-18","CITY OF MILWAUKEE (EMPLOYER)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-6D6B89","2026-06-18","CITY OF NORFOLK (EMPLOYER)","OCREVUS ZUNOVO","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-6E7863","2026-06-18","CAPITAL BLUECROSS","GAZYVA","MEDICARE_ADVANTAGE","MEDICAL BENEFIT","Follicular Lymphoma"],
  ["WIN-7E63F3","2026-06-18","STRYKER CORPORATION (EMPLOYER)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-80615C","2026-06-18","CITY OF SAN JOSE (EMPLOYER)","OCREVUS ZUNOVO","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-81472B","2026-06-18","COUNTY OF PALM BEACH (EMPLOYER)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-92E171","2026-06-18","SOUTH COUNTRY HEALTH ALLIANCE","ACTEMRA SC","MEDICAID_MANAGED","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-959B53","2026-06-18","WELLCARE","ACTEMRA IV","COMMERCIAL","MEDICAL BENEFIT","Rheumatoid Arthritis"],
  ["WIN-9D20FD","2026-06-18","PIH HEALTH (EMPLOYER)","OCREVUS","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-9EE949","2026-06-23","SUMMACARE","TECENTRIQ","COMMERCIAL","MEDICAL BENEFIT","Small Cell Lung Cancer"],
  ["WIN-AE1FFB","2026-06-18","ANALOG DEVICES (EMPLOYER)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-B083C6","2026-06-18","NEW HAMPSHIRE HEALTHY FAMILIES","ACTEMRA IV","COMMERCIAL","MEDICAL BENEFIT","Rheumatoid Arthritis"],
  ["WIN-B45D48","2026-06-18","SILGAN (EMPLOYER)","OCREVUS","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-BF26C8","2026-06-18","ACUSHNET (EMPLOYER)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-C251DA","2026-06-18","DELAWARE FIRST HEALTH","ACTEMRA IV","COMMERCIAL","MEDICAL BENEFIT","Rheumatoid Arthritis"],
  ["WIN-C851F3","2026-06-18","LIFEWISE HEALTH (WA)","GAZYVA","COMMERCIAL","MEDICAL BENEFIT","Follicular Lymphoma"],
  ["WIN-D95C0B","2026-06-18","SILVERSUMMIT","ACTEMRA IV","COMMERCIAL","MEDICAL BENEFIT","Rheumatoid Arthritis"],
  ["WIN-DC0817","2026-06-23","COMMONWEALTH CARE ALLIANCE","TECENTRIQ HYBREZA","MEDICARE_ADVANTAGE","MEDICAL BENEFIT","Hepatocellular Carcinoma"],
  ["WIN-DDE05F","2026-06-18","STATE OF NEBRASKA (EMPLOYER)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-DE4D74","2026-06-18","GENENTECH (EMPLOYER)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-EFCDE9","2026-06-18","LIBERTY UNIVERSITY (EMPLOYER)","OCREVUS","COMMERCIAL","PHARMACY BENEFIT","Multiple Sclerosis"],
  ["WIN-F6E072","2026-06-18","PROCTER & GAMBLE (P&G) (EMPLOYER)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
  ["WIN-FD8F06","2026-06-18","AMERICAN GREETINGS (EMPLOYER)","ACTEMRA SC","COMMERCIAL","PHARMACY BENEFIT","Rheumatoid Arthritis"],
].map(a => ({ id:a[0], date:a[1], payer:a[2], brand:a[3], bob:a[4], benefit:a[5], subInd:a[6] }));

/* ------------------------------------------------------------------
   Duplicate scenario records (demo). Each carries an explicit
   policyId (the 6-field key: benefit, bob, brand, subInd, payer, geo),
   a material signature (matSig) controlling exact-vs-potential, an
   optional forced status/steward, and a sourceId for idempotency.
   Statuses use the list vocabulary: APPROVED | IN REVIEW | INVALID | VALID
   ------------------------------------------------------------------ */
const WINS_DUP_SCENARIOS = [
  // G1 — EXACT duplicates (same policyId + same material) -> collapse to ONE
  { id:"WIN-DUP1A", date:"2026-07-04", payer:"MONTEFIORE HEALTH", brand:"VABYSMO", bob:"COMMERCIAL", benefit:"MEDICAL BENEFIT", subInd:"Diabetic Macular Edema", geo:"NATIONAL", policyId:"PG-DME-MONT", matSig:"MS1", sourceId:"SRC-1A", forceStatus:"APPROVED", forceSteward:"Dhivyaa Moh" },
  { id:"WIN-DUP1B", date:"2026-07-05", payer:"MONTEFIORE HEALTH", brand:"VABYSMO", bob:"COMMERCIAL", benefit:"MEDICAL BENEFIT", subInd:"Diabetic Macular Edema", geo:"NATIONAL", policyId:"PG-DME-MONT", matSig:"MS1", sourceId:"SRC-1B", forceStatus:"APPROVED", forceSteward:"Dhivyaa Moh" },
  { id:"WIN-DUP1C", date:"2026-07-06", payer:"MONTEFIORE HEALTH", brand:"VABYSMO", bob:"COMMERCIAL", benefit:"MEDICAL BENEFIT", subInd:"Diabetic Macular Edema", geo:"NATIONAL", policyId:"PG-DME-MONT", matSig:"MS1", sourceId:"SRC-1C", forceStatus:"IN REVIEW", forceSteward:"Dhivyaa Moh" },

  // G2 — POTENTIAL duplicate pair, both open (material differs) -> flag both, unify steward
  { id:"WIN-DUP2A", date:"2026-07-02", payer:"AETNA", brand:"ACTEMRA SC", bob:"COMMERCIAL", benefit:"PHARMACY BENEFIT", subInd:"Rheumatoid Arthritis", geo:"NATIONAL", policyId:"PG-RA-AETNA", matSig:"MS-2A", sourceId:"SRC-2A", forceStatus:"IN REVIEW", forceSteward:"Syed Riyaz" },
  { id:"WIN-DUP2B", date:"2026-07-03", payer:"AETNA", brand:"ACTEMRA SC", bob:"COMMERCIAL", benefit:"PHARMACY BENEFIT", subInd:"Rheumatoid Arthritis", geo:"NATIONAL", policyId:"PG-RA-AETNA", matSig:"MS-2B", sourceId:"SRC-2B", forceStatus:"IN REVIEW", forceSteward:"Adriana Jazbor" },

  // G3 — POTENTIAL where one is actioned (APPROVED) + one still open -> both flagged
  { id:"WIN-DUP3A", date:"2026-07-01", payer:"UNITEDHEALTHCARE", brand:"OCREVUS ZUNOVO", bob:"COMMERCIAL", benefit:"PHARMACY BENEFIT", subInd:"Multiple Sclerosis", geo:"NATIONAL", policyId:"PG-MS-UHC", matSig:"MS-3A", sourceId:"SRC-3A", forceStatus:"APPROVED", forceSteward:"Pradeep Ling" },
  { id:"WIN-DUP3B", date:"2026-07-07", payer:"UNITEDHEALTHCARE", brand:"OCREVUS ZUNOVO", bob:"COMMERCIAL", benefit:"PHARMACY BENEFIT", subInd:"Multiple Sclerosis", geo:"NATIONAL", policyId:"PG-MS-UHC", matSig:"MS-3B", sourceId:"SRC-3B", forceStatus:"IN REVIEW", forceSteward:"Pradeep Ling" },

  // G4 — cluster of 3 distinct (APPROVED, INVALIDATED, open) -> siblings panel shows all
  { id:"WIN-DUP4A", date:"2026-06-28", payer:"CIGNA", brand:"GAZYVA", bob:"MEDICARE_ADVANTAGE", benefit:"MEDICAL BENEFIT", subInd:"Follicular Lymphoma", geo:"NATIONAL", policyId:"PG-FL-CIGNA", matSig:"MS-4A", sourceId:"SRC-4A", forceStatus:"APPROVED", forceSteward:"Uday akumar" },
  { id:"WIN-DUP4B", date:"2026-06-29", payer:"CIGNA", brand:"GAZYVA", bob:"MEDICARE_ADVANTAGE", benefit:"MEDICAL BENEFIT", subInd:"Follicular Lymphoma", geo:"NATIONAL", policyId:"PG-FL-CIGNA", matSig:"MS-4B", sourceId:"SRC-4B", forceStatus:"INVALID", forceSteward:"Uday akumar" },
  { id:"WIN-DUP4C", date:"2026-07-08", payer:"CIGNA", brand:"GAZYVA", bob:"MEDICARE_ADVANTAGE", benefit:"MEDICAL BENEFIT", subInd:"Follicular Lymphoma", geo:"NATIONAL", policyId:"PG-FL-CIGNA", matSig:"MS-4C", sourceId:"SRC-4C", forceStatus:"IN REVIEW", forceSteward:"Uday akumar" },

  // G5 — idempotent redelivery: identical sourceId as 5A -> dropped before dedup runs
  { id:"WIN-DUP5A", date:"2026-07-09", payer:"HUMANA", brand:"XOLAIR VIAL", bob:"COMMERCIAL", benefit:"MEDICAL BENEFIT", subInd:"Asthma", geo:"NATIONAL", policyId:"PG-ASTHMA-HUM", matSig:"MS-5", sourceId:"SRC-5", forceStatus:"IN REVIEW", forceSteward:"Syed Riyaz" },
  { id:"WIN-DUP5B", date:"2026-07-09", payer:"HUMANA", brand:"XOLAIR VIAL", bob:"COMMERCIAL", benefit:"MEDICAL BENEFIT", subInd:"Asthma", geo:"NATIONAL", policyId:"PG-ASTHMA-HUM", matSig:"MS-5", sourceId:"SRC-5", forceStatus:"IN REVIEW", forceSteward:"Syed Riyaz" },
];

// Live state — defaults to the mock, replaced by API data when available.
let WINS = WINS_MOCK.concat(WINS_DUP_SCENARIOS);
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

/* ============================================================
   POLICY WINS — standalone page (Open / My / All / Active tabs)
   Derives the extra columns the detailed grid needs from the base
   win record, deterministically so the demo looks stable.
   ============================================================ */
const WINS_CURRENT_USER = "Dhivyaa Moh"; // "My Policy Wins" owner (mockup)
const WIN_STEWARDS = ["Dhivyaa Moh", "Pradeep Ling", "Uday akumar", "Syed Riyaz", "Adriana Jazbor"];
const POLICY_STATUS_BEFORE = ["COVERED WITH RESTRICTIONS", "NOT COVERED", "COVERED (MEDICAL)", "COVERED (NON-PREFERRED)"];
const POLICY_STATUS_AFTER  = ["COVERED WITH RESTRICTIONS", "COVERED", "COVERED (NON-PREFERRED)", "COVERED (MEDICAL)"];
const SIMPLE_BEFORE = ["NAR ROW ER…", "NOT COVERED", "PA REQ UI…", "NO PA", "BIO MAN AG…"];
const SIMPLE_AFTER  = ["TO PI OR BE…", "COVE RED", "1 ST (BRA ND…", "DRU G CO…", "2+ ST (BRA ND…", "TO PI WITH CR…"];
const WIN_STATUSES = ["INVALID", "VALID", "IN REVIEW", "APPROVED"];

// Simple deterministic hash so derived fields are stable per win id.
function winHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) >>> 0; }
  return h;
}
function pick(arr, n) { return arr[n % arr.length]; }

// Normalize a value for identity/material comparison.
function normVal(v) {
  if (v === undefined || v === null) return "";
  const s = String(v).trim().toUpperCase();
  return (s === "—" || s === "N/A") ? "" : s;
}
// policy_id = the 6 key fields (benefit, bob, brand, subInd, payer, geo).
function winPolicyId(w) {
  return [w.benefit, w.bob, w.brand, w.subInd, w.payer, w.geo || "NATIONAL"]
    .map(normVal).join("|");
}
// Material signature: for legacy rows, derive from stable hash so each has a
// distinct outcome (they won't be exact-equal unless they share policyId+sig).
function winMatSig(w, h) {
  return "MSH-" + (h >>> 4).toString(36);
}

// Enrich a base win record with the full column set used by the page.
function enrichWin(w, idx) {
  const h = winHash(w.id);
  const lives = 500 + (h % 5200);
  const dcrTriggered = (h % 5 === 0);
  const startY = 2025 + (h % 2);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const sM = months[h % 12], eM = months[(h + 5) % 12];
  const link = "https://dctm…";
  const paLink = (h % 3 === 0) ? "FOC-12387 …" : "https://w w…";
  return {
    ...w,
    winId: w.id,
    lives: (h % 11 === 0) ? "N/A" : lives.toLocaleString(),
    simpleBefore: pick(SIMPLE_BEFORE, h),
    simpleAfter: pick(SIMPLE_AFTER, h >>> 2),
    statusBefore: pick(POLICY_STATUS_BEFORE, h >>> 3),
    statusAfter: pick(POLICY_STATUS_AFTER, h >>> 4),
    winStart: `${sM} ${1 + (h % 27)}, ${startY}`,
    winEnd: `${eM} ${1 + ((h >>> 1) % 27)}, ${startY + 1}`,
    steward: w.forceSteward || pick(WIN_STEWARDS, h >>> 5),
    // Weighted toward INVALID to match the screenshot, with a realistic mix.
    status: w.forceStatus || WIN_STATUSES[[0,0,0,1,0,2,0,3,0,1][h % 10]],
    // Dedup identity: explicit policyId when provided, else derived from the
    // 6 key fields; material signature controls exact-vs-potential.
    policyId: w.policyId || winPolicyId(w),
    matSig: w.matSig || winMatSig(w, h),
    sourceId: w.sourceId || ("SRC-" + w.id),
    existsInAg: (h % 4 === 0) ? "YES" : "NO",
    lastUpdate: `Aug ${1 + (h % 27)}, 20…`,
    medLink: (w.benefit === "MEDICAL BENEFIT") ? link : "",
    pharmLink: (w.benefit === "PHARMACY BENEFIT") ? link : "",
    medPharmLink: "",
    paLink: paLink,
    dcrTriggered: dcrTriggered ? "YES" : "N/A",
  };
}

/* ============================================================
   DUPLICATE DETECTION ENGINE
   Rules (per stakeholder decisions):
   - Idempotency: drop redelivered rows sharing a sourceId first.
   - Identity: policy_id (6 key fields) clusters candidates.
   - Exactness FIRST: same policy_id + same material signature =
     EXACT duplicate -> collapse to one survivor, hide the rest,
     count once.
   - Remaining distinct survivors in a cluster (>1) = POTENTIAL
     duplicates -> flag ALL (symmetric, persistent even after one is
     actioned), auto-assign to the group's master steward.
   - Duplicates are never auto-approved.
   ============================================================ */
// Positive-terminal states whose decision could be inherited.
function isPositiveTerminal(s) { return s === "APPROVED" || s === "VALID"; }

// Sort: positive-terminal first, then earliest date, then id.
function survivorSort(a, b) {
  const pa = isPositiveTerminal(a.status) ? 0 : 1;
  const pb = isPositiveTerminal(b.status) ? 0 : 1;
  if (pa !== pb) return pa - pb;
  if (a.date !== b.date) return a.date < b.date ? -1 : 1;
  return a.winId < b.winId ? -1 : 1;
}
// Master (for steward unification) = earliest by date, then id.
function masterSort(a, b) {
  if (a.date !== b.date) return a.date < b.date ? -1 : 1;
  return a.winId < b.winId ? -1 : 1;
}

let _dedupCache = null;
function invalidateDedup() { _dedupCache = null; }

// Build the dedup model over ALL wins. Returns { info, hiddenIds }.
function computeDedup() {
  if (_dedupCache) return _dedupCache;
  const enriched = WINS.map((w, i) => applyWinOverrides(enrichWin(w, i)));

  // 1) Idempotency — drop later rows that repeat a sourceId.
  const seenSource = new Set();
  const kept = [];
  const info = {};        // winId -> dedup info
  const hiddenIds = new Set();
  enriched.forEach(w => {
    if (seenSource.has(w.sourceId)) {
      // Redelivery of the same source row -> hide it from the list entirely.
      hiddenIds.add(w.winId);
      info[w.winId] = { dupType: "redelivery", sourceId: w.sourceId };
      return;
    }
    seenSource.add(w.sourceId);
    kept.push(w);
  });

  // 2) Cluster by policy_id.
  const byPolicy = {};
  kept.forEach(w => { (byPolicy[w.policyId] = byPolicy[w.policyId] || []).push(w); });

  let groupSeq = 0;

  Object.keys(byPolicy).forEach(pid => {
    const members = byPolicy[pid];
    if (members.length === 1) {
      info[members[0].winId] = { dupType: "none", policyId: pid };
      return;
    }

    // 3) Exactness first — subgroup by material signature.
    const bySig = {};
    members.forEach(w => { (bySig[w.matSig] = bySig[w.matSig] || []).push(w); });

    const survivors = [];
    Object.keys(bySig).forEach(sig => {
      const grp = bySig[sig].slice().sort(survivorSort);
      const survivor = grp[0];
      const merged = grp.slice(1);
      survivor._mergedCount = merged.length;   // exact duplicates folded in
      survivor._mergedIds = merged.map(m => m.winId);
      merged.forEach(m => {
        hiddenIds.add(m.winId);
        // A merged copy, if opened directly, points back to its survivor.
        info[m.winId] = { dupType: "exact-merged", policyId: pid, mergedInto: survivor.winId };
      });
      survivors.push(survivor);
    });

    const groupId = "DG-" + (++groupSeq);
    const isPotential = survivors.length > 1;

    if (!isPotential) {
      // Only exact duplicates existed -> one visible record, counted once.
      const s = survivors[0];
      info[s.winId] = {
        dupType: "exact", policyId: pid, groupId,
        mergedCount: s._mergedCount, mergedIds: s._mergedIds,
      };
      return;
    }

    // 4) Potential duplicates -> flag all, unify steward to master.
    const master = survivors.slice().sort(masterSort)[0];
    const unifiedSteward = master.steward;
    const siblings = survivors.slice().sort(masterSort).map(s => ({
      id: s.winId, status: s.status, steward: unifiedSteward,
      date: s.date, matSig: s.matSig, isMaster: s.winId === master.winId,
    }));
    survivors.forEach(s => {
      info[s.winId] = {
        dupType: "potential", policyId: pid, groupId,
        unifiedSteward,
        mergedCount: s._mergedCount, mergedIds: s._mergedIds,
        siblings: siblings.map(x => ({ ...x, isSelf: x.id === s.winId })),
      };
    });
  });

  _dedupCache = { info, hiddenIds };
  return _dedupCache;
}

// Dedup info for a single win (safe default).
function winDedup(id) {
  const d = computeDedup();
  return d.info[id] || { dupType: "none" };
}

let WINS_PAGE_SUBVIEW = "open";  // open | mine | all | active

// Apply the sidebar wins filters + the active sub-tab.
function winsPageRows() {
  const dedup = computeDedup();
  const base = filteredWins()
    .map((w, i) => applyWinOverrides(enrichWin(w, i)))
    .filter(w => !dedup.hiddenIds.has(w.winId))   // hide collapsed exact duplicates
    .map(w => {
      const di = dedup.info[w.winId] || { dupType: "none" };
      // Potential duplicates auto-assign to the unified steward.
      const steward = (di.dupType === "potential" && !WIN_STEWARD_OVERRIDE[w.winId])
        ? di.unifiedSteward : w.steward;
      return { ...w, steward, _dup: di };
    });
  switch (WINS_PAGE_SUBVIEW) {
    case "mine":   return base.filter(w => w.steward === WINS_CURRENT_USER);
    case "active": return base.filter(w => w.status === "VALID" || w.status === "APPROVED");
    case "all":    return base;
    case "open":
    default:       return base.filter(w => w.status === "INVALID" || w.status === "IN REVIEW");
  }
}

function statusBadgeClass(s) {
  if (s === "VALID") return "wstatus valid";
  if (s === "APPROVED") return "wstatus approved";
  if (s === "IN REVIEW") return "wstatus review";
  return "wstatus invalid";
}

// Small badge shown next to a Win Id in the list.
// - potential duplicate  -> "Duplicate — review" (amber)
// - exact duplicate that folded copies -> "+N merged" (grey)
function dupBadge(di) {
  if (!di) return "";
  if (di.dupType === "potential") {
    const n = (di.siblings ? di.siblings.length : 0);
    return ` <span class="dup-badge review" title="Potential duplicate — ${n} related wins share this policy">⚑ Duplicate — review</span>`;
  }
  if (di.dupType === "exact" && di.mergedCount > 0) {
    return ` <span class="dup-badge merged" title="Exact duplicates collapsed into this record">+${di.mergedCount} merged</span>`;
  }
  return "";
}

function winCell(v, cls) {
  const s = (v === undefined || v === null || v === "") ? "" : String(v);
  if (s === "" ) return `<td class="wc-empty"></td>`;
  if (s === "N/A") return `<td class="wc-na">N/A</td>`;
  return `<td${cls ? ` class="${cls}"` : ""}>${sfEsc(s)}</td>`;
}
function winLinkCell(v) {
  if (!v) return `<td class="wc-empty"></td>`;
  if (v === "N/A") return `<td class="wc-na">N/A</td>`;
  return `<td class="wc-link">${sfEsc(v)}</td>`;
}

function renderWinsPage() {
  const body = document.getElementById("winsGridBody");
  if (!body) return;
  const rows = winsPageRows();
  document.getElementById("winsRowCount").textContent = String(rows.length);

  // Footer dedup summary: exact-collapsed count + potential-flagged count.
  const dd = computeDedup();
  const collapsed = dd.hiddenIds.size;
  const flagged = rows.filter(w => w._dup && w._dup.dupType === "potential").length;
  const note = document.getElementById("winsDedupNote");
  if (note) {
    const parts = [];
    if (collapsed > 0) parts.push(`${collapsed} exact duplicate${collapsed === 1 ? "" : "s"} collapsed`);
    if (flagged > 0) parts.push(`${flagged} flagged for review`);
    note.textContent = parts.length ? " · " + parts.join(" · ") : "";
  }

  if (rows.length === 0) {
    body.innerHTML = `<tr><td colspan="23" class="wins-empty">No policy wins match the current filters</td></tr>`;
    updateWinsSelCount();
    return;
  }

  body.innerHTML = rows.map(w => `
    <tr class="${w._dup && w._dup.dupType === "potential" ? "win-row-dup" : ""}">
      <td class="wcol-check"><input type="checkbox" class="win-row-cb" data-id="${sfEsc(w.winId)}" /></td>
      <td class="win-id"><a class="win-id-link" data-id="${sfEsc(w.winId)}">${sfEsc(w.winId)}</a>${dupBadge(w._dup)}</td>
      ${winCell(w.payer)}
      ${winCell(w.bob)}
      ${winCell(w.brand)}
      ${winCell(w.subInd)}
      ${winCell(w.benefit)}
      ${winCell(w.lives, "wc-lives")}
      ${winCell(w.simpleBefore)}
      ${winCell(w.simpleAfter)}
      ${winCell(w.statusBefore)}
      ${winCell(w.statusAfter)}
      ${winCell(w.winStart)}
      ${winCell(w.winEnd)}
      ${winCell(w.steward, "wc-steward")}
      <td><span class="${statusBadgeClass(w.status)}">${sfEsc(w.status)}</span></td>
      ${winCell(w.existsInAg)}
      ${winCell(w.lastUpdate)}
      ${winLinkCell(w.medLink)}
      ${winLinkCell(w.pharmLink)}
      ${winLinkCell(w.medPharmLink)}
      ${winLinkCell(w.paLink)}
      ${winCell(w.dcrTriggered)}
    </tr>`).join("");

  wireWinRowChecks();
  updateWinsSelCount();
}

function wireWinRowChecks() {
  document.querySelectorAll(".win-row-cb").forEach(cb =>
    cb.addEventListener("change", updateWinsSelCount));
  document.querySelectorAll(".win-id-link").forEach(a =>
    a.addEventListener("click", () => openWinDetail(a.dataset.id)));
}
function updateWinsSelCount() {
  const n = document.querySelectorAll(".win-row-cb:checked").length;
  const el = document.getElementById("winsSelCount");
  if (el) el.textContent = String(n);
}

// ---- wire sub-tabs, select-all, bulk assign ---------------------
document.querySelectorAll(".wtab[data-wview]").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".wtab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    WINS_PAGE_SUBVIEW = tab.dataset.wview;
    const sa = document.getElementById("winsSelectAll");
    if (sa) sa.checked = false;
    renderWinsPage();
  });
});

(function wireWinsSelectAll() {
  const sa = document.getElementById("winsSelectAll");
  if (!sa) return;
  sa.addEventListener("change", () => {
    document.querySelectorAll(".win-row-cb").forEach(cb => { cb.checked = sa.checked; });
    updateWinsSelCount();
  });
})();

(function wireWinsBulkAssign() {
  const btn = document.getElementById("winsBulkAssignBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const n = document.querySelectorAll(".win-row-cb:checked").length;
    if (n === 0) { showToast("Select one or more wins to bulk assign", true); return; }
    showToast(`Bulk assign — ${n} win(s) selected (demo)`, false);
  });
})();

/* ============================================================
   POLICY WIN — detail page (click a Win Id to open)
   Reuses the enriched win record and derives the extra
   before/after and summary fields the detail view shows,
   deterministically so the demo is stable.
   ============================================================ */
// Overrides let Approve / Invalidate / Reject and steward reassignment
// persist so the list reflects changes made on the detail page.
const WIN_STATUS_OVERRIDE = {};   // winId -> status
const WIN_STEWARD_OVERRIDE = {};  // winId -> steward

const ST_PLACEMENT_AFTER = ["ST Single Generic", "ST Generic and Brand", "No Step", "ST Single Brand"];
const P360_STATUSES = ["IDENTIFIED", "IN PROGRESS", "SUBMITTED", "VALIDATED"];
const WIN_PRODUCTS = ["XOLAIR VIAL", "OCREVUS ZUNOVO", "ACTEMRA SC", "VABYSMO", "OCREVUS", "GAZYVA", "TECENTRIQ"];
const AFTER_SIMPLE = ["COVERED – FIRST LINE BIOLOGIC", "COVERED", "COVERED (NON-PREFERRED)", "TO PI OR BETTER"];
const DETAIL_STATUS_LABEL = { "INVALID": "INVALIDATED", "VALID": "VALIDATED", "IN REVIEW": "IN VALIDATION", "APPROVED": "APPROVED" };

// Apply any stored override to an enriched win record.
function applyWinOverrides(w) {
  if (WIN_STATUS_OVERRIDE[w.winId]) w.status = WIN_STATUS_OVERRIDE[w.winId];
  if (WIN_STEWARD_OVERRIDE[w.winId]) w.steward = WIN_STEWARD_OVERRIDE[w.winId];
  return w;
}

// Build the full detail record for a given win id (or null if not found).
function buildWinDetail(id) {
  const base = WINS.find(w => w.id === id);
  if (!base) return null;
  const w = applyWinOverrides(enrichWin(base, 0));
  const h = winHash(id);
  const isMed = base.benefit === "MEDICAL BENEFIT";
  const medPharmLink = "https://www.superiorhealthplan.com/content/dam/centene/Superior/Provider/pharmacy-policies/CP.PCH.49.pdf";
  return {
    ...w,
    detailStatus: DETAIL_STATUS_LABEL[w.status] || w.status,
    spoc: (h % 3 === 0) ? "—" : pick(WIN_STEWARDS, h >>> 7),
    product: pick(WIN_PRODUCTS, h >>> 6),
    // Before / After value pairs
    vSimpleBefore: "NOT COVERED",
    vSimpleAfter: pick(AFTER_SIMPLE, h >>> 2),
    vPolicyBefore: "NOT COVERED",
    vPolicyAfter: pick(POLICY_STATUS_AFTER, h >>> 4),
    vStepBefore: "Not Covered",
    vStepAfter: pick(ST_PLACEMENT_AFTER, h >>> 3),
    vExpBefore: "—",
    vExpAfter: w.winEnd,
    vEffBefore: "—",
    vEffAfter: w.winStart,
    vMedBefore: "—",
    vMedAfter: isMed ? `FOC-${13000 + (h % 900)} QA scenario ${1 + (h % 40)}` : "—",
    vPharmBefore: "—",
    vPharmAfter: "—",
    vMedPharmBefore: isMed ? "—" : medPharmLink,
    vMedPharmAfter: "—",
    vPaBefore: "—",
    vPaAfter: "—",
    // Summary panel
    dateSubmitted: `${w.winStart}, ${(9 + (h % 3))}:${(h % 6) * 10 || "00"} a.m.`,
    p360Status: pick(P360_STATUSES, h >>> 8),
    stewardRationale: "—",
  };
}

let CURRENT_WIN_DETAIL = null;   // the win id currently open in the detail page

// Row for the Before/After values table.
function detailRow(label, before, after) {
  const cell = v => {
    const s = (v === undefined || v === null || v === "") ? "—" : String(v);
    return `<div class="wd-field">${sfEsc(s)}</div>`;
  };
  return `<tr>
    <td class="wd-vlabel">${sfEsc(label)}</td>
    <td>${cell(before)}</td>
    <td>${cell(after)}</td>
  </tr>`;
}

function detailStatusChip(detailStatus) {
  const s = detailStatus || "";
  const cls = s === "APPROVED" ? "wd-status ok"
    : s === "VALIDATED" ? "wd-status ok"
    : s === "INVALIDATED" ? "wd-status bad"
    : "wd-status pending";
  return `<span class="${cls}">${sfEsc(s)}</span>`;
}

// Populate the Steward reassignment dropdown on the detail page.
function populateWinStewardSelect(current) {
  const sel = document.getElementById("wdSteward");
  if (!sel) return;
  const opts = WIN_STEWARDS.slice();
  if (current && !opts.includes(current)) opts.unshift(current);
  sel.innerHTML = opts.map(s =>
    `<option value="${sfEsc(s)}"${s === current ? " selected" : ""}>${sfEsc(s)}</option>`).join("");
}

function renderWinDetail(id) {
  const d = buildWinDetail(id);
  if (!d) { showToast("Win not found", true); return; }
  CURRENT_WIN_DETAIL = id;
  const set = (elId, val) => { const e = document.getElementById(elId); if (e) e.textContent = val; };

  // Header
  set("wdPayer", d.payer);
  document.getElementById("wdStatusChip").innerHTML = detailStatusChip(d.detailStatus);
  set("wdWinId", d.winId);
  set("wdSpoc", d.spoc && d.spoc !== "—" ? d.spoc : "—");
  populateWinStewardSelect(d.steward);

  // Before / After values table
  const tbody = document.getElementById("wdValuesBody");
  if (tbody) {
    tbody.innerHTML =
      detailRow("Simplified Policy Status", d.vSimpleBefore, d.vSimpleAfter) +
      detailRow("Policy Status", d.vPolicyBefore, d.vPolicyAfter) +
      detailRow("Step Therapy Placement", d.vStepBefore, d.vStepAfter) +
      detailRow("Policy Win Expiration Date", d.vExpBefore, d.vExpAfter) +
      detailRow("Effective Policy Date", d.vEffBefore, d.vEffAfter) +
      detailRow("Medical Policy Link", d.vMedBefore, d.vMedAfter) +
      detailRow("Pharma Policy Link", d.vPharmBefore, d.vPharmAfter) +
      detailRow("Medical and Pharmacy Policy Link", d.vMedPharmBefore, d.vMedPharmAfter) +
      detailRow("PA Policy link", d.vPaBefore, d.vPaAfter);
  }

  // Activity log (single mock entry, matching the screenshot style)
  const log = document.getElementById("wdActivity");
  if (log) {
    log.innerHTML = `
      <div class="wd-log-entry">
        <span class="wd-log-avatar">${sfEsc((d.steward || "?").slice(0,2).toUpperCase())}</span>
        <div class="wd-log-body">
          <div class="wd-log-head"><b>${sfEsc(d.steward)}</b> changed 32 properties using <b>[Qa] BulkAssignSingleStewardToMultipleWin</b></div>
          <div class="wd-log-meta">${sfEsc(d.lastUpdate)}</div>
          <div class="wd-log-meta">Owning Resource: ri.workshop.main.module.b1da0b0d-8614-4496-8216-eac616b75f64</div>
          <div class="wd-log-detail">Current for Review Effective Policy Date … ${sfEsc(d.vEffAfter)}</div>
        </div>
      </div>`;
  }

  // Summary panel — Policy Information
  set("wdSumWinId", d.winId);
  set("wdSumPayer", d.payer);
  set("wdSumBob", d.bob);
  set("wdSumProduct", d.product);
  set("wdSumIndication", d.subInd);
  set("wdSumBenefit", d.benefit);
  // Summary panel — Wins Information
  set("wdSumSubmitted", d.dateSubmitted);
  set("wdSumSpoc", d.spoc);
  set("wdSumSteward", d.steward);
  set("wdSumStatus", d.detailStatus);
  set("wdSumP360", d.p360Status);
  set("wdSumRationale", d.stewardRationale);
  set("wdSumExistsAg", d.existsInAg);
  set("wdSumDcr", d.dcrTriggered);

  // Duplicate siblings panel
  renderDupPanel(id);
}

// Show the duplicate panel for potential duplicates (persistent flag +
// each sibling's current status/steward/date). Exact-collapsed records
// show a lightweight "merged" note instead.
function renderDupPanel(id) {
  const card = document.getElementById("wdDupCard");
  if (!card) return;
  const di = winDedup(id);

  if (di.dupType === "potential") {
    card.hidden = false;
    card.classList.add("review");
    document.getElementById("wdDupHeading").textContent = "⚑ Duplicate — review";
    const others = (di.siblings || []).filter(s => !s.isSelf).length;
    document.getElementById("wdDupDesc").innerHTML =
      `This win shares its policy id with <b>${others}</b> other win${others === 1 ? "" : "s"}. ` +
      `The flag persists even after a related win is actioned. Duplicates are not auto-approved.`;
    const box = document.getElementById("wdDupSiblings");
    box.innerHTML = (di.siblings || []).map(s => `
      <div class="wd-sib ${s.isSelf ? "self" : ""}">
        <div class="wd-sib-top">
          <a class="wd-sib-id ${s.isSelf ? "" : "link"}" data-id="${sfEsc(s.id)}">${sfEsc(s.id)}</a>
          ${s.isMaster ? `<span class="wd-sib-master">master</span>` : ""}
          ${s.isSelf ? `<span class="wd-sib-you">this win</span>` : ""}
          <span class="${statusBadgeClass(s.status)}">${sfEsc(s.status)}</span>
        </div>
        <div class="wd-sib-meta">${sfEsc(s.steward)} · ${sfEsc(s.date)}</div>
      </div>`).join("");
    // Clicking a sibling id navigates to that win's detail page.
    box.querySelectorAll(".wd-sib-id.link").forEach(a =>
      a.addEventListener("click", () => openWinDetail(a.dataset.id)));
    return;
  }

  if (di.dupType === "exact" && di.mergedCount > 0) {
    card.hidden = false;
    card.classList.remove("review");
    document.getElementById("wdDupHeading").textContent = "Exact duplicates merged";
    document.getElementById("wdDupDesc").innerHTML =
      `<b>${di.mergedCount}</b> exact duplicate record${di.mergedCount === 1 ? "" : "s"} ` +
      `were collapsed into this win and counted once: ${sfEsc((di.mergedIds || []).join(", "))}.`;
    document.getElementById("wdDupSiblings").innerHTML = "";
    return;
  }

  card.hidden = true;
}

function openWinDetail(id) {
  renderWinDetail(id);
  // Swap views: hide the wins list, show the detail page.
  if (winsView) winsView.hidden = true;
  const dv = document.getElementById("winDetailView");
  if (dv) dv.hidden = false;
  // Keep wins sidebar filters visible/consistent.
  window.scrollTo && window.scrollTo(0, 0);
}

function closeWinDetail() {
  const dv = document.getElementById("winDetailView");
  if (dv) dv.hidden = true;
  if (winsView) winsView.hidden = false;
  renderWinsPage();   // reflect any status/steward changes
}

// Set a new status on the current win, persist it, and refresh the header.
function setWinDetailStatus(newStatus) {
  if (!CURRENT_WIN_DETAIL) return;
  WIN_STATUS_OVERRIDE[CURRENT_WIN_DETAIL] = newStatus;
  invalidateDedup();   // status change can shift survivor/master ordering
  renderWinDetail(CURRENT_WIN_DETAIL);
  showToast(`Win ${CURRENT_WIN_DETAIL} → ${DETAIL_STATUS_LABEL[newStatus] || newStatus}`, false);
}

// ---- wire detail page actions -----------------------------------
(function wireWinDetailActions() {
  const back = document.getElementById("wdBack");
  if (back) back.addEventListener("click", closeWinDetail);

  const approve = document.getElementById("wdApprove");
  if (approve) approve.addEventListener("click", () => setWinDetailStatus("APPROVED"));
  const invalidate = document.getElementById("wdInvalidate");
  if (invalidate) invalidate.addEventListener("click", () => setWinDetailStatus("INVALID"));
  const reject = document.getElementById("wdReject");
  if (reject) reject.addEventListener("click", () => setWinDetailStatus("INVALID"));

  const sel = document.getElementById("wdSteward");
  if (sel) sel.addEventListener("change", () => {
    if (!CURRENT_WIN_DETAIL) return;
    WIN_STEWARD_OVERRIDE[CURRENT_WIN_DETAIL] = sel.value;
    invalidateDedup();
    renderWinDetail(CURRENT_WIN_DETAIL);
    showToast(`Steward reassigned to ${sel.value}`, false);
  });
})();

/* ============================================================
   STEWARDSHIP TOOL — standalone page (Assignment Queue / My
   Workload / All Requests). Reuses SEED_ROWS: lets a lead see
   workload distribution and (mock-)assign requests to stewards.
   ============================================================ */
const ST_CURRENT_USER = "A. Martinez";   // "My Workload" owner (matches CURRENT_USER)
const ST_STEWARDS = ["Syed Riyaz", "Adriana Jazbor", "A. Martinez", "J. Chen", "R. Patel", "S. Okafor", "L. Nguyen"];

// Working copy so mock re-assignment doesn't mutate the tracker's ROWS.
let ST_ROWS = SEED_ROWS.map(r => ({ ...r }));

const stFilters = { status: new Set(), steward: new Set(), payer: new Set(), brand: new Set(), bob: new Set() };
let ST_SUBVIEW = "queue";   // queue | mine | all
let stBuilt = false;

function stStewardLabel(v) { return v && v.trim() ? v : "Unassigned"; }

// Tally distinct values (with counts) across ST_ROWS for a field.
function stTally(field, transform) {
  const m = {};
  ST_ROWS.forEach(r => {
    const val = transform ? transform(r[field]) : r[field];
    m[val] = (m[val] || 0) + 1;
  });
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
}

// Build one checkbox filter group. `values` is [ [value, count], ... ].
function buildStFilter(containerId, values, setKey, labelFn) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  values.forEach(([val, cnt]) => {
    const lab = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox"; cb.className = "filter-cb"; cb.value = val;
    cb.addEventListener("change", () => {
      if (cb.checked) stFilters[setKey].add(val); else stFilters[setKey].delete(val);
      renderStTool();
    });
    lab.appendChild(cb);
    lab.appendChild(document.createTextNode(" " + (labelFn ? labelFn(val) : val) + " "));
    const c = document.createElement("span"); c.className = "count"; c.textContent = cnt;
    lab.appendChild(c);
    el.appendChild(lab);
  });
}

function buildStFilters() {
  buildStFilter("stFilterStatus", stTally("dcr"), "status", v => DCR_LABELS[v] || v);
  buildStFilter("stFilterSteward", stTally("steward", stStewardLabel), "steward");
  buildStFilter("stFilterPayer", stTally("payer"), "payer");
  buildStFilter("stFilterBrand", stTally("brand"), "brand");
  buildStFilter("stFilterBob", stTally("bob"), "bob");
}

// Apply sidebar filters + free-text search + active sub-tab.
function stFilteredRows() {
  const q = (document.getElementById("stSearch")?.value || "").trim().toLowerCase();
  let rows = ST_ROWS.filter(r =>
    (stFilters.status.size === 0 || stFilters.status.has(r.dcr)) &&
    (stFilters.steward.size === 0 || stFilters.steward.has(stStewardLabel(r.steward))) &&
    (stFilters.payer.size === 0 || stFilters.payer.has(r.payer)) &&
    (stFilters.brand.size === 0 || stFilters.brand.has(r.brand)) &&
    (stFilters.bob.size === 0 || stFilters.bob.has(r.bob))
  );
  if (q) {
    rows = rows.filter(r =>
      [r.id, r.payer, r.brand, r.indication, r.steward].join(" ").toLowerCase().includes(q));
  }
  switch (ST_SUBVIEW) {
    case "mine":  return rows.filter(r => r.steward === ST_CURRENT_USER);
    case "all":   return rows;
    case "queue":
    default:      return rows.filter(r => !r.steward || !r.steward.trim());  // unassigned
  }
}

function stStatusBadge(dcr) {
  const label = DCR_LABELS[dcr] || dcr || "-";
  const cls = dcr === "DCRCreated" ? "st-badge ok"
    : dcr === "BridgingIssues" ? "st-badge warn"
    : dcr === "NotRequired" ? "st-badge muted"
    : "st-badge new";
  return `<span class="${cls}">${sfEsc(label)}</span>`;
}
function stMmitBadge(mmit) {
  const opt = MMIT_OPTS.find(o => o.v === mmit);
  const label = opt ? opt.label : (mmit || "-");
  const cls = mmit === "Correct" ? "st-badge ok"
    : mmit === "UnderMMITReview" ? "st-badge info"
    : (mmit === "IncorrectAssessmentError" || mmit === "IncorrectPolicyLag") ? "st-badge warn"
    : mmit === "BridgingMDM" ? "st-badge purple"
    : "st-badge new";
  return `<span class="${cls}">${sfEsc(label)}</span>`;
}

function renderStKpis() {
  const el = document.getElementById("stKpis");
  if (!el) return;
  const total = ST_ROWS.length;
  const unassigned = ST_ROWS.filter(r => !r.steward || !r.steward.trim()).length;
  const mine = ST_ROWS.filter(r => r.steward === ST_CURRENT_USER).length;
  const bridging = ST_ROWS.filter(r => r.dcr === "BridgingIssues").length;
  const cards = [
    { label: "Total Requests", value: total, sub: "in stewardship scope", cls: "" },
    { label: "Unassigned", value: unassigned, sub: "awaiting a steward", cls: "warn" },
    { label: "My Workload", value: mine, sub: ST_CURRENT_USER, cls: "info" },
    { label: "Bridging Issues", value: bridging, sub: "need attention", cls: "danger" },
  ];
  el.innerHTML = cards.map(c => `
    <div class="st-kpi ${c.cls}">
      <div class="st-kpi-val">${c.value}</div>
      <div class="st-kpi-label">${c.label}</div>
      <div class="st-kpi-sub">${sfEsc(c.sub)}</div>
    </div>`).join("");
}

function renderStTool() {
  const body = document.getElementById("stGridBody");
  if (!body) return;
  renderStKpis();
  const rows = stFilteredRows();
  const cnt = document.getElementById("stRowCount");
  if (cnt) cnt.textContent = String(rows.length);

  if (rows.length === 0) {
    body.innerHTML = `<tr><td colspan="12" class="wins-empty">No requests match the current filters</td></tr>`;
    updateStSelCount();
    return;
  }

  body.innerHTML = rows.map(r => `
    <tr>
      <td class="stcol-check"><input type="checkbox" class="st-row-cb" data-id="${sfEsc(r.id)}" /></td>
      <td class="st-id">${sfEsc(r.id)}</td>
      <td class="${(!r.steward || !r.steward.trim()) ? "st-unassigned" : "st-steward"}">${sfEsc(stStewardLabel(r.steward))}</td>
      <td>${sfEsc(r.payer)}</td>
      <td>${sfEsc(r.brand)}</td>
      <td>${sfEsc(r.indication)}</td>
      <td>${sfEsc(r.bob)}</td>
      <td>${sfEsc(r.benefit)}</td>
      <td class="st-lives">${Number(r.lives).toLocaleString()}</td>
      <td>${stMmitBadge(r.mmit)}</td>
      <td>${stStatusBadge(r.dcr)}</td>
      <td><button class="link-btn st-assign-one" data-id="${sfEsc(r.id)}">Assign</button></td>
    </tr>`).join("");

  wireStRowChecks();
  updateStSelCount();
}

function wireStRowChecks() {
  document.querySelectorAll(".st-row-cb").forEach(cb =>
    cb.addEventListener("change", updateStSelCount));
  document.querySelectorAll(".st-assign-one").forEach(btn =>
    btn.addEventListener("click", () => stAssign([btn.dataset.id])));
}
function updateStSelCount() {
  const n = document.querySelectorAll(".st-row-cb:checked").length;
  const el = document.getElementById("stSelCount");
  if (el) el.textContent = String(n);
  const btn = document.getElementById("stBulkAssignBtn");
  if (btn) btn.disabled = n === 0;
}

// Mock-assign the given request ids to the steward chosen in the dropdown.
function stAssign(ids) {
  const sel = document.getElementById("stAssignee");
  const steward = sel ? sel.value : "";
  if (!steward) { showToast("Pick a steward first", true); return; }
  let n = 0;
  ids.forEach(id => {
    const r = ST_ROWS.find(x => x.id === id);
    if (r) { r.steward = steward; n++; }
  });
  buildStFilters();          // steward counts changed
  renderStTool();
  const sa = document.getElementById("stSelectAll");
  if (sa) sa.checked = false;
  showToast(`Assigned ${n} request${n === 1 ? "" : "s"} to ${steward}`, false);
}

function populateStAssignee() {
  const sel = document.getElementById("stAssignee");
  if (!sel) return;
  sel.innerHTML = `<option value="">Assign to…</option>` +
    ST_STEWARDS.map(s => `<option value="${sfEsc(s)}">${sfEsc(s)}</option>`).join("");
}

// ---- wire sub-tabs, search, select-all, bulk assign -------------
document.querySelectorAll(".sttab[data-stview]").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".sttab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    ST_SUBVIEW = tab.dataset.stview;
    const sa = document.getElementById("stSelectAll");
    if (sa) sa.checked = false;
    renderStTool();
  });
});

(function wireStSearch() {
  const s = document.getElementById("stSearch");
  if (s) s.addEventListener("input", renderStTool);
})();

(function wireStSelectAll() {
  const sa = document.getElementById("stSelectAll");
  if (!sa) return;
  sa.addEventListener("change", () => {
    document.querySelectorAll(".st-row-cb").forEach(cb => { cb.checked = sa.checked; });
    updateStSelCount();
  });
})();

(function wireStBulkAssign() {
  const btn = document.getElementById("stBulkAssignBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const ids = [...document.querySelectorAll(".st-row-cb:checked")].map(cb => cb.dataset.id);
    if (ids.length === 0) { showToast("Select at least one request", true); return; }
    stAssign(ids);
  });
})();

// ============ NAV TABS ============
const stewardshipView = document.getElementById("stewardshipView");
const metricView = document.getElementById("metricView");
const metricDcrs = document.getElementById("metricDcrs");
const metricUtil = document.getElementById("metricUtil");
const metricWins = document.getElementById("metricWins");
const stewardshipFilters = document.getElementById("stewardshipFilters");
const winsFilters = document.getElementById("winsFilters");
const stToolFilters = document.getElementById("stToolFilters");
const stewardshipToolView = document.getElementById("stewardshipToolView");
let winsBuilt = false;

// ============ DCR UTILIZATION ============
// Fallback mock (used when the backend/Foundry is unavailable). Shape mirrors
// the /api/dcr-utilization response so render code is identical either way.
const DCR_UTIL_MOCK = {
  summary: { total: 1496, automated: 433, manual: 126, decided: 559, pending: 937, automationRate: 77 },
  monthly: [
    { month: "2026-06", automated: 43, manual: 126, total: 749 },
    { month: "2026-07", automated: 390, manual: 0, total: 747 },
  ],
  assignment: [
    { label: "UNASSIGNED", value: 1025 },
    { label: "BULK", value: 276 },
    { label: "SINGLE", value: 195 },
  ],
  brands: [
    { label: "ACTEMRA SC", value: 101 }, { label: "XOLAIR VIAL", value: 48 },
    { label: "ACTEMRA IV", value: 34 }, { label: "XOLAIR AUTOINJECTOR", value: 28 },
    { label: "VABYSMO", value: 28 }, { label: "YUFLYMA", value: 27 },
    { label: "XOLAIR PFS", value: 27 }, { label: "OCREVUS", value: 23 },
  ],
};

let DCR_UTIL = DCR_UTIL_MOCK;
let dcrUtilSource = "demo"; // "demo" | "live"

// Fetch live utilization data; fall back to mock on any error.
async function loadDcrUtilFromApi() {
  try {
    const res = await fetch("/api/dcr-utilization", { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (data && data.summary) {
      DCR_UTIL = data;
      dcrUtilSource = "live";
    }
  } catch (e) {
    DCR_UTIL = DCR_UTIL_MOCK;
    dcrUtilSource = "demo";
  }
}

// Render the DCR Utilization subtab: KPIs, decision-mix pie, and bar charts.
function renderDcrUtil() {
  const d = DCR_UTIL;
  const s = d.summary || {};

  document.getElementById("utilRate").textContent = (s.automationRate ?? 0) + "%";
  document.getElementById("utilAuto").textContent = s.automated ?? 0;
  document.getElementById("utilManual").textContent = s.manual ?? 0;
  document.getElementById("utilPending").textContent = s.pending ?? 0;
  document.getElementById("utilTotalFoot").textContent = (s.total ?? 0) + " created";
  document.getElementById("utilSub").textContent =
    "How much DCR decisioning is automated vs. manual" +
    (dcrUtilSource === "live" ? " · live" : " · demo data");

  // Decision-mix pie (Automated / Manual / Pending)
  const mix = [
    ["Automated", s.automated ?? 0],
    ["Manual", s.manual ?? 0],
    ["Pending", s.pending ?? 0],
  ].filter(e => e[1] > 0);
  renderPie(document.getElementById("utilPie"), document.getElementById("utilPieLegend"), mix);

  // Monthly automated vs manual (two bars per month)
  const monthlyItems = [];
  (d.monthly || []).forEach(m => {
    monthlyItems.push({ label: m.month + " · Auto", value: m.automated, cls: "c-green" });
    monthlyItems.push({ label: m.month + " · Manual", value: m.manual, cls: "c-teal" });
  });
  renderBarChart(document.getElementById("utilMonthly"), monthlyItems);

  // Assignment type
  renderBarChart(document.getElementById("utilAssign"),
    (d.assignment || []).map(a => ({
      label: a.label, value: a.value,
      cls: a.label === "UNASSIGNED" ? "c-red" : a.label === "BULK" ? "c-purple" : "c-teal",
    })));

  // Top brands by automated decisions
  renderBarChart(document.getElementById("utilBrand"),
    (d.brands || []).map(b => ({ label: b.label, value: b.value, cls: "c-purple" })));
}

// Switch the active subtab within the Metric Dashboard.
// which = "dcrs" | "util" | "wins"
function showMetricSubtab(which) {
  const isWins = which === "wins";
  const isUtil = which === "util";
  // Panels
  metricDcrs.hidden = which !== "dcrs";
  metricUtil.hidden = !isUtil;
  metricWins.hidden = !isWins;
  // Subtab highlight
  document.querySelectorAll(".metric-subtab").forEach(s =>
    s.classList.toggle("active", s.dataset.metric === which));
  // Sidebar filters: Wins uses wins filters; DCRs/Utilization use stewardship filters
  stewardshipFilters.hidden = isWins;
  winsFilters.hidden = !isWins;

  if (isWins) {
    // Try live data on each open (real-time), then (re)build filters + render.
    loadWinsFromApi().then(() => {
      buildWinFilters();
      winsBuilt = true;
      renderWins();
    });
    // Render immediately with whatever we have so the UI isn't blank while fetching.
    if (!winsBuilt) { buildWinFilters(); winsBuilt = true; }
    renderWins();
  } else if (isUtil) {
    renderDcrUtil();               // paint with current data (mock on first open)
    loadDcrUtilFromApi().then(renderDcrUtil);  // then refresh with live data
  } else {
    renderDashboard();
  }
}

const winsView = document.getElementById("winsView");
document.querySelectorAll(".nav-tab[data-tab]").forEach(t => {
  t.addEventListener("click", () => {
    document.querySelectorAll(".nav-tab").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    const tab = t.dataset.tab;
    const showMetrics = tab === "metric";
    const showStewardship = tab === "stewardship";
    const showWins = tab === "wins";
    const showStTool = tab === "sttool";

    stewardshipView.hidden = !showStewardship;
    metricView.hidden = !showMetrics;
    if (winsView) winsView.hidden = !showWins;
    if (stewardshipToolView) stewardshipToolView.hidden = !showStTool;
    // Leaving any tab closes the win detail page.
    const dv = document.getElementById("winDetailView");
    if (dv) dv.hidden = true;

    if (showMetrics) {
      stewardshipFilters.hidden = false;
      winsFilters.hidden = true;
      if (stToolFilters) stToolFilters.hidden = true;
      showMetricSubtab("dcrs");
    } else if (showWins) {
      // Standalone Policy Wins page uses the wins sidebar filters.
      stewardshipFilters.hidden = true;
      winsFilters.hidden = false;
      if (stToolFilters) stToolFilters.hidden = true;
      if (!winsBuilt) { buildWinFilters(); winsBuilt = true; }
      loadWinsFromApi().then(() => { buildWinFilters(); renderWinsPage(); });
      renderWinsPage();
    } else if (showStTool) {
      // Stewardship Tool page uses its own sidebar filters.
      stewardshipFilters.hidden = true;
      winsFilters.hidden = true;
      if (stToolFilters) stToolFilters.hidden = false;
      if (!stBuilt) { buildStFilters(); populateStAssignee(); stBuilt = true; }
      renderStTool();
    } else if (showStewardship) {
      // Restore stewardship sidebar filters
      stewardshipFilters.hidden = false;
      winsFilters.hidden = true;
      if (stToolFilters) stToolFilters.hidden = true;
    } else {
      showToast(t.textContent.trim() + " — demo placeholder", false);
    }
  });
});

// Metric subtab clicks (DCRs | DCR Utilization | Policy Wins)
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

/* ============================================================
   Saved Filters — a steward saves the current sidebar filter
   selection (checkboxes + lives slider) so they can resume it on a
   later day. Persisted in localStorage. Save / apply / rename / delete.
   Mirrors the DCR Single Policy form's Saved Filters feature.
   ============================================================ */
const SF_KEY = "dsaSavedFilters.tracker";
const SF_USER = "mohand3";  // mockup — a real app resolves the signed-in user

// Small HTML escape for values rendered into the table.
function sfEsc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Storage helpers (tolerant of storage being unavailable / sandboxed).
function sfLoad() {
  try {
    const raw = localStorage.getItem(SF_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (_) { return []; }
}
function sfPersist(list) {
  try { localStorage.setItem(SF_KEY, JSON.stringify(list)); } catch (_) {}
}

// The stewardship checkboxes, in stable document order.
function sfCheckboxes() {
  return [...document.querySelectorAll("#stewardshipFilters .filter-cb")];
}
// Readable label for a checkbox (the text node before the count/bar spans).
function sfLabel(cb) {
  const label = cb.closest("label");
  if (!label) return cb.value || "";
  let t = "";
  label.childNodes.forEach(n => { if (n.nodeType === 3) t += n.textContent; });
  t = t.trim().replace(/\s+/g, " ");
  return t || cb.value || "";
}

// Capture the current sidebar selection into a plain object.
function sfCapture() {
  const cbs = sfCheckboxes();
  const checkedIdx = [];
  const labels = [];
  cbs.forEach((cb, i) => { if (cb.checked) { checkedIdx.push(i); labels.push(sfLabel(cb)); } });
  const slider = document.getElementById("livesSlider");
  return { checkedIdx, labels, slider: slider ? +slider.value : null };
}

// Apply a stored selection back onto the sidebar and re-render.
function sfApply(sel) {
  const cbs = sfCheckboxes();
  const set = new Set(sel.checkedIdx || []);
  cbs.forEach((cb, i) => { cb.checked = set.has(i); });
  const slider = document.getElementById("livesSlider");
  if (slider && sel.slider != null) {
    slider.value = sel.slider;
    try { slider.dispatchEvent(new Event("input")); } catch (_) {}
  }
  // Re-render whichever view is visible (stewardship uses these filters).
  if (typeof renderRows === "function") renderRows();
}

// One-line human summary of a saved selection.
function sfSummary(sel) {
  const parts = (sel.labels || []).slice();
  if (sel.slider != null && sel.slider !== 50) parts.push(`Lives≈${sel.slider}`);
  return parts.length ? parts.join(" · ") : "(no filters)";
}
function sfHasSelection() {
  const c = sfCapture();
  return c.checkedIdx.length > 0;
}
function sfFmtDate(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  if (isNaN(d)) return "—";
  return d.toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ---- render the saved-filters popup table -----------------------
let sfSearchTerm = "";
function sfRender() {
  const all = sfLoad();
  const countEl = document.getElementById("savedCount");
  if (countEl) countEl.textContent = String(all.length);

  const body = document.getElementById("savedTableBody");
  const wrap = document.getElementById("savedTableWrap");
  const empty = document.getElementById("savedTableEmpty");
  const noMatch = document.getElementById("savedNoMatch");
  if (!body) return;

  const q = sfSearchTerm.trim().toLowerCase();
  const rows = all.map((it, i) => ({ it, i })).filter(({ it }) => {
    if (!q) return true;
    const hay = `${it.name} ${sfSummary(it.sel)} ${it.createdBy || SF_USER}`.toLowerCase();
    return hay.includes(q);
  });

  const hasAny = all.length > 0;
  const hasMatch = rows.length > 0;
  if (empty) empty.style.display = hasAny ? "none" : "";
  if (wrap) wrap.style.display = hasAny && hasMatch ? "" : "none";
  if (noMatch) noMatch.style.display = hasAny && !hasMatch ? "" : "none";

  body.innerHTML = rows.map(({ it, i }) => `
    <tr class="sf-row" data-i="${i}" title="Click to load this filter">
      <td class="sf-name">${sfEsc(it.name)}</td>
      <td class="sf-criteria">${sfEsc(sfSummary(it.sel))}</td>
      <td>${sfEsc(it.createdBy || SF_USER)}</td>
      <td class="sf-date">${sfEsc(sfFmtDate(it.savedAt))}</td>
      <td class="col-actions">
        <button class="sf-icon" data-act="edit" data-i="${i}" title="Rename">✎</button>
        <button class="sf-icon danger" data-act="delete" data-i="${i}" title="Delete">🗑</button>
      </td>
    </tr>`).join("");
}

// ---- save / rename modal ----------------------------------------
let sfEditIndex = -1;
const sfModal = document.getElementById("filterModal");
const sfNameInput = document.getElementById("filterNameInput");
const sfPreview = document.getElementById("filterPreview");
const sfModalTitle = document.getElementById("filterModalTitle");

function sfOpenModal(mode, index) {
  sfEditIndex = mode === "edit" ? index : -1;
  if (mode === "edit") {
    const it = sfLoad()[index];
    sfModalTitle.textContent = "Rename Filter";
    sfNameInput.value = it ? it.name : "";
    sfPreview.textContent = it ? sfSummary(it.sel) : "";
  } else {
    sfModalTitle.textContent = "Save Filter";
    sfNameInput.value = "";
    sfPreview.textContent = sfHasSelection()
      ? sfSummary(sfCapture())
      : "No filters ticked yet — select at least one filter to save.";
  }
  sfModal.classList.add("show");
  sfNameInput.focus();
}
function sfCloseModal() { sfModal.classList.remove("show"); sfEditIndex = -1; }

function sfCommit() {
  const name = sfNameInput.value.trim();
  if (!name) { showToast("Please enter a filter name", true); sfNameInput.focus(); return; }
  if (sfEditIndex < 0 && !sfHasSelection()) {
    showToast("Select at least one filter before saving", true);
    return;
  }
  const list = sfLoad();
  if (sfEditIndex >= 0) {
    if (list[sfEditIndex]) list[sfEditIndex].name = name;
    showToast("Filter renamed", false);
  } else {
    list.push({ name, sel: sfCapture(), createdBy: SF_USER, savedAt: Date.now() });
    showToast("Filter saved", false);
  }
  sfPersist(list);
  sfRender();
  sfCloseModal();
}

// ---- saved-filters table modal (open/close + row actions) -------
const sfTableModal = document.getElementById("savedModal");
const sfSearchInput = document.getElementById("savedSearch");
function sfOpenTable() {
  sfSearchTerm = "";
  if (sfSearchInput) sfSearchInput.value = "";
  sfRender();
  sfTableModal.classList.add("show");
  if (sfSearchInput) sfSearchInput.focus();
}
function sfCloseTable() { sfTableModal.classList.remove("show"); }

document.getElementById("saveFilterBtn").addEventListener("click", () => sfOpenModal("new"));
document.getElementById("openSavedBtn").addEventListener("click", sfOpenTable);
document.getElementById("savedCloseBtn").addEventListener("click", sfCloseTable);
sfTableModal.addEventListener("click", (e) => { if (e.target === sfTableModal) sfCloseTable(); });
if (sfSearchInput) {
  sfSearchInput.addEventListener("input", () => { sfSearchTerm = sfSearchInput.value; sfRender(); });
}
document.getElementById("filterCancelBtn").addEventListener("click", sfCloseModal);
document.getElementById("filterSaveBtn").addEventListener("click", sfCommit);
sfModal.addEventListener("click", (e) => { if (e.target === sfModal) sfCloseModal(); });
sfNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sfCommit();
  if (e.key === "Escape") sfCloseModal();
});

document.getElementById("savedTableBody").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-act]");
  if (btn) {
    e.stopPropagation();
    const i = +btn.dataset.i;
    const list = sfLoad();
    if (btn.dataset.act === "edit") {
      sfOpenModal("edit", i);
    } else if (btn.dataset.act === "delete") {
      if (list[i]) {
        const name = list[i].name;
        list.splice(i, 1);
        sfPersist(list);
        sfRender();
        showToast(`Deleted "${name}"`, false);
      }
    }
    return;
  }
  const row = e.target.closest(".sf-row");
  if (!row) return;
  const i = +row.dataset.i;
  const list = sfLoad();
  if (list[i]) {
    sfApply(list[i].sel);
    showToast(`Loaded "${list[i].name}"`, false);
    sfCloseTable();
  }
});

// ============ INIT ============
renderRows();
applyMultiResult();
sfRender();
