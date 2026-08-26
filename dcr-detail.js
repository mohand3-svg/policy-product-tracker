/* DCR detail — shows the data the DCR was pre-populated with,
   resolved from the originating product coverage record. */

const STORE_KEY = "pist_rows_v5";
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

const params = new URLSearchParams(location.search);
const dcrId = params.get("id") || "DCR-XXXXX";
const reqId = params.get("req") || "";

let row = null;
try {
  const rows = JSON.parse(sessionStorage.getItem(STORE_KEY)) || [];
  row = rows.find(r => r.id === reqId);
} catch (e) { /* ignore */ }

const c = COVERAGE[reqId] || {};
const rows = [
  ["DCR ID", `<span class="badge">${dcrId}</span>`],
  ["Status", "DCR Created"],
  ["Source Request", reqId || "—"],
  ["Payer", row ? row.payer : "—"],
  ["Book Of Business", row ? row.bob : "—"],
  ["Product", c.product || (row ? row.brand : "—")],
  ["Indication", row ? row.indication : "—"],
  ["Benefit Type", row ? (row.benefit === "Pharmacy" ? "PHARMACY BENEFIT" : "MEDICAL BENEFIT") : "—"],
  ["Prior Authorization Required", c.priorAuth ?? "—"],
  ["Step Edit", c.stepEdit ?? "—"],
  ["Number Of Steps", c.numSteps ?? "—"],
  ["Step Therapy Placement", c.stepPlacement ?? "—"],
  ["Step Products", c.stepProducts ?? "—"],
  ["Created By", "A. Martinez"],
  ["Created Via", "Multiple Policies update form"],
];

document.getElementById("card").innerHTML =
  `<h1>${dcrId}</h1>` +
  rows.map(([k, v]) => `<div class="dcr-row"><div class="k">${k}</div><div class="v">${v}</div></div>`).join("");
