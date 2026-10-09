/* App-page glue for Neo (v4).
   1. The top-nav pill reads "Ask Neo" (the exported app says "Neo").
   2. A "Neo" item is added to the main product navigation. neo-chat.js intercepts clicks on it and opens the
      expanded Neo in place; the href is a plain fallback (and the Cmd/Ctrl-click target) to the Neo page. */
(function () {
  var src = (document.currentScript && document.currentScript.src) || "";
  var base = src.replace(/\/neo-simple\.js.*$/, "");
  var NEO = base + "/neo/";
  var SPARK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 flex-none text-secondary-foreground"><path d="M12 3l1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9z"/><path d="M19 3v4M17 5h4M5 17v4M3 19h4"/></svg>';
  function apply() {
    document.querySelectorAll('header button[aria-label="Ask Neo"] > span.sm\\:inline').forEach(function (sp) {
      if (sp.textContent === "Neo") sp.textContent = "Ask Neo";
    });
    var sync = document.querySelector('a[data-guide-id="nav-configuration"]');
    if (!sync) return;
    var neo = document.getElementById("nav-neo");
    if (!neo) {
      neo = document.createElement("a");
      neo.id = "nav-neo"; neo.setAttribute("data-label", "Neo"); neo.href = NEO; neo.title = "Neo";
      var hr = sync.parentElement.querySelector("div.h-px");
      if (hr) { hr = hr.cloneNode(true); hr.id = "nav-neo-hr"; sync.insertAdjacentElement("afterend", hr); hr.insertAdjacentElement("afterend", neo); }
      else sync.insertAdjacentElement("afterend", neo);
    }
    if (neo.className !== sync.className) {
      neo.className = sync.className;
      var collapsed = /w-8/.test(sync.className);
      neo.innerHTML = SPARK + (collapsed ? "" : '<span class="flex-1 truncate">Neo</span><span class="inline-flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-[14px] tracking-[0.08em] text-primary ring-1 ring-inset ring-primary/15">New</span>');
      neo.setAttribute("aria-label", "Neo");
    }
  }
  new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
  apply();
})();
