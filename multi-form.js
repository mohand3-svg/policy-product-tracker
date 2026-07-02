/* ============================================================
   Multiple Policies update form — receives eligible records from
   the stewardship tool, lets the user review pre-populated DCRs,
   creates one DCR per record, then returns with the results.
   ============================================================ */

const STORE_KEY = "pist_rows_v2";

// Coverage attributes mirrored from the main app so each DCR can be
// pre-populated from its product coverage record.
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

const BOB_LABEL = {
  "Commercial": "COMMERCIAL", "Medicaid Managed": "MEDICAID_MANAGED",
  "Medicare Advantage": "MEDICARE_ADVANTAGE", "Medicaid FFS": "MEDICAID_FFS",
  "Government": "GOVERNMENT",
};

// ---- load handoff data ------------------------------------------
function loadRows() {
  try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || []; }
  catch (e) { return []; }
}
const ALL_ROWS = loadRows();
const selectedIds = JSON.parse(sessionStorage.getItem("pist_multi_ids") || "[]");
const skippedCount = parseInt(sessionStorage.getItem("pist_multi_skipped") || "0", 10);

// records to show = the eligible ones handed off
let records = ALL_ROWS.filter(r => selectedIds.includes(r.id));

const body = document.getElementById("formGridBody");
const foot = document.getElementById("formFoot");
const banner = document.getElementById("banner");

// ---- banner -----------------------------------------------------
function showBanner() {
  if (!records.length) {
    banner.className = "banner warn show";
    banner.textContent = "No eligible records were passed to this form. Return to the Stewardship Tool and select records.";
    return;
  }
  let txt = `${records.length} eligible record(s) loaded from the Stewardship Tool. Each DCR is pre-populated from its product coverage record. Click “Review & Create DCRs” to generate one DCR per record.`;
  if (skippedCount > 0) {
    txt += ` ${skippedCount} record(s) were skipped because they already have a DCR.`;
  }
  banner.className = "banner show";
  banner.textContent = txt;
}

// ---- render -----------------------------------------------------
function render() {
  body.innerHTML = "";
  records.forEach(r => {
    const c = COVERAGE[r.id] || {};
    const tr = document.createElement("tr");
    tr.dataset.id = r.id;
    tr.className = "row-on";
    tr.innerHTML = `
      <td class="fcheck"><input type="checkbox" class="frow-cb" checked /></td>
      <td>${r.payer}</td>
      <td>${BOB_LABEL[r.bob] || r.bob}</td>
      <td class="prod-cell">${c.product || r.brand}</td>
      <td>${r.indication}</td>
      <td>${r.benefit === "Pharmacy" ? "PHARMACY BENEFIT" : "MEDICAL BENEFIT"}</td>
      <td>${c.priorAuth ?? "—"}</td>
      <td>${c.stepEdit ?? "—"}</td>
      <td>${c.numSteps ?? "—"}</td>
      <td>${c.stepPlacement ?? "—"}</td>
      <td>${c.stepProducts ?? "—"}</td>
      <td><span class="req-id">${r.id}</span></td>
      <td class="dcr-status-cell"><span class="dcr-pending">Pending creation</span></td>
    `;
    body.appendChild(tr);
  });
  wireRowEvents();
  updateFoot();
}

function wireRowEvents() {
  body.querySelectorAll(".frow-cb").forEach(cb => {
    cb.addEventListener("change", e => {
      e.target.closest("tr").classList.toggle("row-on", e.target.checked);
      updateFoot();
    });
  });
}

function checkedRows() {
  return [...body.querySelectorAll(".frow-cb:checked")].map(cb => cb.closest("tr"));
}

function updateFoot() {
  foot.textContent = `${records.length} record(s) loaded · ${checkedRows().length} selected for DCR creation`;
}

// ---- select all -------------------------------------------------
document.getElementById("formSelectAll").addEventListener("change", e => {
  body.querySelectorAll(".frow-cb").forEach(cb => {
    cb.checked = e.target.checked;
    cb.closest("tr").classList.toggle("row-on", e.target.checked);
  });
  updateFoot();
});

// ---- create DCRs ------------------------------------------------
document.getElementById("reviewBtn").addEventListener("click", () => {
  const rows = checkedRows();
  if (!rows.length) { showToast("Select at least one record to create a DCR", true); return; }

  const created = [];
  rows.forEach(tr => {
    const id = tr.dataset.id;
    const dcrCode = "DCR-" + Math.floor(10000 + Math.random()*89999);
    created.push({ id, dcrCode });
    const cell = tr.querySelector(".dcr-status-cell");
    const url = "dcr-detail.html?id=" + encodeURIComponent(dcrCode) + "&req=" + encodeURIComponent(id);
    cell.innerHTML = `<a class="dcr-created-link" href="${url}" target="_blank" rel="noopener">${dcrCode}</a>`;
    tr.querySelector(".frow-cb").disabled = true;
  });

  // hand results back to the main tool
  sessionStorage.setItem("pist_multi_result", JSON.stringify({ created, skipped: skippedCount }));
  sessionStorage.removeItem("pist_multi_ids");
  sessionStorage.removeItem("pist_multi_skipped");

  banner.className = "banner show";
  banner.textContent = `Created ${created.length} DCR(s). Email notifications sent per existing rule. Returning to the Stewardship Tool…`;
  showToast(`Created ${created.length} DCR(s)`, false);

  setTimeout(() => { window.location.href = "index.html"; }, 1400);
});

// ---- cancel -----------------------------------------------------
document.getElementById("cancelBtn").addEventListener("click", () => {
  sessionStorage.removeItem("pist_multi_ids");
  sessionStorage.removeItem("pist_multi_skipped");
  window.location.href = "index.html";
});

// ---- toast ------------------------------------------------------
let toastT;
function showToast(msg, isErr) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.className = "toast show" + (isErr ? " err" : "");
  clearTimeout(toastT);
  toastT = setTimeout(() => el.className = "toast", 2600);
}

// ---- init -------------------------------------------------------
showBanner();
render();
