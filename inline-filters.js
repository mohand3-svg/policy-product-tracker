(function () {
  const FILTER_STATE = {};
  let openMenu = null;

  const TABLE_CONFIG = {
    grid: { skip: ["Action", "Create DCR"], after: () => callIfPresent(["updateCounts"]) },
    winsTable: { skip: [], after: () => syncCount("winsTable", "winTableCount") },
    winsGrid: { skip: ["Action"], after: () => callIfPresent(["updateWinsSelCount"]) },
    draftGrid: { skip: ["Dcr URL", "Dcr's URL"], after: () => { syncCount("draftGrid", "draftRowCount"); callIfPresent(["updateDraftSelection"]); } },
    wdValuesTable: { skip: [] },
    stGrid: { skip: ["Action"], after: () => callIfPresent(["updateStSelCount"]) },
    historyTable: { skip: [] },
    savedFiltersTable: { skip: ["Actions"] },
    pdDcrTable: { skip: [] },
    mpTable: { skip: [], after: () => callIfPresent(["syncSelectAll", "updateReviewState"]) },
    reviewTable: { skip: [], after: () => callIfPresent(["syncSelectAll", "updateToolbar"]) },
    propTable: { skip: [] },
    dashboardTable: { skip: [] },
    policyWinTable: { skip: [] },
    stewardshipTable: { skip: [] },
  };

  function callIfPresent(names) {
    names.forEach(name => {
      if (typeof window[name] === "function") window[name]();
    });
  }

  function tableKey(table) {
    return table.id || table.className || "table";
  }

  function stateFor(table) {
    const key = tableKey(table);
    if (!FILTER_STATE[key]) FILTER_STATE[key] = {};
    return FILTER_STATE[key];
  }

  function cellText(cell) {
    const text = String(cell?.textContent || "").replace(/\s+/g, " ").trim();
    return text || "(Blank)";
  }

  function isEmptyRow(row) {
    return row.querySelector(".wins-empty, .draft-empty") ||
      row.classList.contains("mp-empty");
  }

  function valuesForColumn(table, col) {
    const values = new Set();
    [...(table.tBodies[0]?.rows || [])].forEach(row => {
      if (!isEmptyRow(row)) values.add(cellText(row.children[col]));
    });
    return [...values].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  }

  function selectedFor(table, col) {
    const selected = stateFor(table)[col];
    return Array.isArray(selected) ? new Set(selected) : null;
  }

  function hasActiveFilters(table) {
    return Object.values(stateFor(table)).some(values => Array.isArray(values));
  }

  function visibleRowsIn(tbody) {
    return [...tbody.querySelectorAll("tr")].filter(row => !row.hidden && !isEmptyRow(row));
  }

  function syncCount(tableId, countId) {
    const table = document.getElementById(tableId);
    const target = document.getElementById(countId);
    if (table?.tBodies[0] && target) target.textContent = String(visibleRowsIn(table.tBodies[0]).length);
  }

  function runAfterFilter(table, afterFilter) {
    const cfg = TABLE_CONFIG[table.id] || {};
    if (typeof afterFilter === "function") afterFilter();
    if (typeof cfg.after === "function") cfg.after();
  }

  function applyInlineTableFilters(tableOrId, afterFilter) {
    const table = typeof tableOrId === "string" ? document.getElementById(tableOrId) : tableOrId;
    if (!table?.tBodies[0]) return;
    const state = stateFor(table);
    [...table.tBodies[0].rows].forEach(row => {
      if (isEmptyRow(row)) {
        row.hidden = false;
        return;
      }
      const match = Object.entries(state).every(([col, selected]) => {
        if (!Array.isArray(selected)) return true;
        if (selected.length === 0) return false;
        return selected.includes(cellText(row.children[Number(col)]));
      });
      row.hidden = !match;
    });
    refreshFilterTriggers(table);
    runAfterFilter(table, afterFilter);
  }

  function clearColumn(table, col, afterFilter) {
    delete stateFor(table)[col];
    applyInlineTableFilters(table, afterFilter);
    refreshOpenMenu(table, col, afterFilter);
  }

  function clearAll(table, afterFilter) {
    FILTER_STATE[tableKey(table)] = {};
    applyInlineTableFilters(table, afterFilter);
    closeMenu();
  }

  function activeLabel(table, col) {
    const selected = selectedFor(table, col);
    if (!selected) return "All";
    return `${selected.size} selected`;
  }

  function refreshFilterTriggers(table) {
    const activeAny = hasActiveFilters(table);
    table.querySelectorAll(".inline-filter-trigger").forEach(button => {
      const col = Number(button.dataset.col);
      const active = !!selectedFor(table, col);
      button.classList.toggle("active", active);
      button.textContent = activeLabel(table, col);
      button.title = active ? "Filtered. Open to change or clear." : "Open column filter";
    });
    table.querySelectorAll(".inline-clear-all").forEach(button => {
      button.disabled = !activeAny;
    });
  }

  function closeMenu() {
    if (openMenu) openMenu.remove();
    openMenu = null;
  }

  function refreshOpenMenu(table, col, afterFilter) {
    const button = table.querySelector(`.inline-filter-trigger[data-col="${col}"]`);
    if (button) openFilterMenu(button, table, col, button.dataset.label || "", afterFilter);
  }

  function setColumnSelection(table, col, values, checkedValues, afterFilter) {
    if (checkedValues.length === values.length) {
      delete stateFor(table)[col];
    } else {
      stateFor(table)[col] = checkedValues;
    }
    applyInlineTableFilters(table, afterFilter);
  }

  function openFilterMenu(button, table, col, label, afterFilter) {
    closeMenu();
    const values = valuesForColumn(table, col);
    const selected = selectedFor(table, col);

    const menu = document.createElement("div");
    menu.className = "inline-filter-popover";
    menu.addEventListener("click", event => event.stopPropagation());

    const title = document.createElement("div");
    title.className = "inline-filter-title";
    title.textContent = label || "Column";

    const search = document.createElement("input");
    search.type = "text";
    search.className = "inline-filter-search";
    search.placeholder = "Search values";

    const allLabel = document.createElement("label");
    allLabel.className = "inline-filter-option inline-filter-all";
    const allCb = document.createElement("input");
    allCb.type = "checkbox";
    allCb.checked = !selected || selected.size === values.length;
    allLabel.append(allCb, document.createTextNode(" Select all"));

    const list = document.createElement("div");
    list.className = "inline-filter-list";
    values.forEach(value => {
      const option = document.createElement("label");
      option.className = "inline-filter-option";
      option.dataset.value = value.toLowerCase();
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = value;
      cb.checked = !selected || selected.has(value);
      option.append(cb, document.createTextNode(` ${value}`));
      list.appendChild(option);
    });

    const footer = document.createElement("div");
    footer.className = "inline-filter-actions";
    const clearCol = document.createElement("button");
    clearCol.type = "button";
    clearCol.textContent = "Clear Column";
    clearCol.addEventListener("click", () => clearColumn(table, col, afterFilter));
    const clearAllBtn = document.createElement("button");
    clearAllBtn.type = "button";
    clearAllBtn.textContent = "Clear All Filters";
    clearAllBtn.addEventListener("click", () => clearAll(table, afterFilter));
    const done = document.createElement("button");
    done.type = "button";
    done.className = "primary";
    done.textContent = "Done";
    done.addEventListener("click", closeMenu);
    footer.append(clearCol, clearAllBtn, done);

    function checkedValues() {
      return [...list.querySelectorAll('input[type="checkbox"]:checked')].map(cb => cb.value);
    }

    function refreshAllState() {
      const checks = [...list.querySelectorAll('input[type="checkbox"]')];
      const checked = checks.filter(cb => cb.checked).length;
      allCb.checked = checks.length > 0 && checked === checks.length;
      allCb.indeterminate = checked > 0 && checked < checks.length;
    }

    allCb.addEventListener("change", () => {
      list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = allCb.checked;
      });
      setColumnSelection(table, col, values, checkedValues(), afterFilter);
      refreshAllState();
    });
    list.addEventListener("change", event => {
      if (!event.target.matches('input[type="checkbox"]')) return;
      setColumnSelection(table, col, values, checkedValues(), afterFilter);
      refreshAllState();
    });
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      list.querySelectorAll(".inline-filter-option").forEach(option => {
        option.hidden = q && !option.dataset.value.includes(q);
      });
    });

    menu.append(title, search, allLabel, list, footer);
    button.closest("th").appendChild(menu);
    openMenu = menu;
    refreshAllState();
    search.focus();
  }

  function ensureInlineTableFilters(tableOrId, skipLabels = [], afterFilter) {
    const table = typeof tableOrId === "string" ? document.getElementById(tableOrId) : tableOrId;
    if (!table?.tHead) return;
    const configSkip = TABLE_CONFIG[table.id]?.skip || [];
    const skips = [...configSkip, ...skipLabels];
    const headerRow = [...table.tHead.rows].find(row => !row.classList.contains("inline-filter-row"));
    if (!headerRow) return;
    const headerCells = [...headerRow.children];
    let filterRow = table.tHead.querySelector("tr.inline-filter-row");
    if (filterRow) filterRow.remove();

    filterRow = document.createElement("tr");
    filterRow.className = "inline-filter-row";
    headerCells.forEach((th, index) => {
      const label = th.textContent.trim();
      const skip = th.querySelector('input[type="checkbox"]') ||
        skips.some(s => label.toLowerCase().includes(String(s).toLowerCase()));
      const cell = document.createElement("th");
      if (!skip) {
        const wrap = document.createElement("div");
        wrap.className = "inline-filter-menu";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "inline-filter-trigger";
        button.dataset.col = String(index);
        button.dataset.label = label;
        button.textContent = activeLabel(table, index);
        button.addEventListener("click", event => {
          event.stopPropagation();
          openFilterMenu(button, table, index, label, afterFilter);
        });
        wrap.appendChild(button);
        cell.appendChild(wrap);
      } else if (index === 0) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "inline-clear-all";
        button.textContent = "Clear All";
        button.addEventListener("click", event => {
          event.stopPropagation();
          clearAll(table, afterFilter);
        });
        cell.appendChild(button);
      }
      filterRow.appendChild(cell);
    });
    table.tHead.appendChild(filterRow);
    applyInlineTableFilters(table, afterFilter);
  }

  function installAllInlineFilters() {
    Object.keys(TABLE_CONFIG).forEach(id => {
      const cfg = TABLE_CONFIG[id];
      ensureInlineTableFilters(id, cfg.skip || [], cfg.after);
    });
  }

  document.addEventListener("click", event => {
    if (!event.target.closest(".inline-filter-popover, .inline-filter-trigger")) closeMenu();
  });

  window.visibleRowsIn = visibleRowsIn;
  window.applyInlineTableFilters = applyInlineTableFilters;
  window.ensureInlineTableFilters = ensureInlineTableFilters;
  window.clearInlineTableFilters = clearAll;
  window.installAllInlineFilters = installAllInlineFilters;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installAllInlineFilters);
  } else {
    installAllInlineFilters();
  }
  setTimeout(installAllInlineFilters, 250);
  setTimeout(installAllInlineFilters, 1000);
})();
