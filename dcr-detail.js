/* DCR detail — shows the data the DCR was pre-populated with,
   resolved from the originating product coverage record. */

const STORE_KEY = "pist_rows_v5";
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
  ["Created By", "Steward C"],
  ["Created Via", "Multiple Policies update form"],
];

document.getElementById("card").innerHTML =
  `<h1>${dcrId}</h1>` +
  rows.map(([k, v]) => `<div class="dcr-row"><div class="k">${k}</div><div class="v">${v}</div></div>`).join("");
