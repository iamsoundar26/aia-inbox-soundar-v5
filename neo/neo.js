/* Neo workspace (v5): sidebar + screens (agents, activity, needs attention, knowledge, settings).
   Runs standalone on neo/ (hash router inside #app) and embedded inside the expanded floating chat on product
   pages (window.NeoWorkspace.attach). The chat itself is neo-chat.js; this file never renders chat messages.
   All data is prototype data held in memory; agent edits, created agents, completed runs and decisions are kept
   in sessionStorage (shared with the chat module) so they survive moving between pages in the same tab. */
(function () {
  "use strict";
  var USER = "Soundar";
  var COMPANY = "Shakunthalam Oil & Refineries";
  var SCRIPT = document.currentScript, BASE = (SCRIPT && SCRIPT.src ? SCRIPT.src.replace(/\/neo\/neo\.js.*$/, "") : "..");
  var APP = BASE + "/inbox/";

  /* ---------- icons (lucide-style paths) ---------- */
  var P = {
    sparkle: "M12 3l1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9zM19 3v4M17 5h4M5 17v4M3 19h4",
    check: "M20 6L9 17l-5-5", x: "M18 6L6 18M6 6l12 12", alert: "M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z",
    block: "M12 22a10 10 0 100-20 10 10 0 000 20zM4.9 4.9l14.2 14.2", clock: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2",
    plus: "M12 5v14M5 12h14", send: "M12 19V5M5 12l7-7 7 7",
    chevD: "M6 9l6 6 6-6", chevR: "M9 18l6-6-6-6", arrowL: "M19 12H5M12 19l-7-7 7-7", arrowR: "M5 12h14M12 5l7 7-7 7",
    copy: "M8 4h10a2 2 0 012 2v10M16 8H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V10a2 2 0 00-2-2z",
    receipt: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1zM8 7h8M8 11h8M8 15h5",
    bank: "M3 22h18M5 22V11M19 22V11M3 11h18L12 4zM9 22v-7M15 22v-7", gst: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M9 15l2 2 4-4",
    cal: "M3 6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2zM3 10h18M8 2v4M16 2v4", bot: "M12 8V4H8M4 8h16v12H4zM2 14h2M20 14h2M9 13v2M15 13v2",
    play: "M6 4l14 8-14 8z", pause: "M6 4h4v16H6zM14 4h4v16h-4z", book: "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5V4.5A2.5 2.5 0 016.5 2H20v15M4 19.5A2.5 2.5 0 006.5 22H20",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z", inbox: "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
    cart: "M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6", tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01",
    layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", box: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
    refresh: "M21 12a9 9 0 00-9-9 9.75 9.75 0 00-6.74 2.74L3 8M3 3v5h5M3 12a9 9 0 009 9 9.75 9.75 0 006.74-2.74L21 16M16 16h5v5",
    thumbU: "M7 10v12M15 5.88L14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H4a2 2 0 01-2-2v-8a2 2 0 012-2h2.76a2 2 0 001.79-1.11L12 2a3.13 3.13 0 013 3.88z", thumbD: "M17 14V2M9 18.12L10 14H4.17a2 2 0 01-1.92-2.56l2.33-8A2 2 0 016.5 2H20a2 2 0 012 2v8a2 2 0 01-2 2h-2.76a2 2 0 00-1.79 1.11L12 22a3.13 3.13 0 01-3-3.88z",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z", shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z",
    menu: "M3 12h18M3 6h18M3 18h18", zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", bookOpen: "M12 7v14M3 18a1 1 0 01-1-1V4a1 1 0 011-1h5a4 4 0 014 4 4 4 0 014-4h5a1 1 0 011 1v13a1 1 0 01-1 1h-6a3 3 0 00-3 3 3 3 0 00-3-3z",
    collapse: "M3 3h18v18H3zM9 3v18M16 15l-3-3 3-3", monitor: "M10 7.75a.75.75 0 011.14-.64l3.67 2.25a.75.75 0 010 1.28l-3.67 2.25a.75.75 0 01-1.14-.64zM12 17v4M8 21h8M2 3h20v14H2z"
  };
  function icon(n, cls) { return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + P[n] + '"/></svg>'; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pill(kind, text) { var ic = { ok: "check", warn: "alert", bad: "block", run: "clock", neutral: "clock", ai: "sparkle" }[kind]; return '<span class="pill ' + kind + '">' + icon(ic) + esc(text) + "</span>"; }
  function inr(n) { var s = Math.round(n).toString(), last = s.slice(-3), rest = s.slice(0, -3); if (rest) last = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last; var dec = (n % 1) ? "." + (n % 1).toFixed(2).slice(2) : ""; return "₹" + last + dec; }
  function conf(v) { var k = v >= 85 ? "high" : v >= 60 ? "mid" : "low", t = v >= 85 ? "High confidence" : v >= 60 ? "Needs confirmation" : "Low confidence"; return '<span class="conf ' + k + '" title="' + t + '"><span class="bar"><i style="width:' + v + '%"></i></span>' + v + "% · " + t + "</span>"; }
  function fmtTime(d) { return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }); }
  function timeNow() { return fmtTime(new Date()); }
  function ago(min) { return fmtTime(new Date(Date.now() - min * 60000)); }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function dayLabel(d) { return d.getDate() + " " + MONTHS[d.getMonth()]; }

  /* ---------- prototype data ---------- */
  var EXC = [
    { id: "e1", vendor: "Amazon Web Services India", kind: "duplicate", issue: "Possible duplicate invoice", amount: 215995.50, detail: "Invoice AWS-IN-88214 matches AWS-IN-88102 on amount, date and GSTIN. Only the invoice number differs.", suggest: "Keep one, mark the other as duplicate", conf: 94, why: ["Same amount ₹2,15,995.50 on both invoices", "Same invoice date (3 Oct 2026) and billing period", "Same vendor GSTIN 29AAICA4396L1ZH", "Invoice numbers differ by only 112"] },
    { id: "e2", vendor: "Zoho Corporation", kind: "gst", issue: "GSTIN doesn't match vendor record", amount: 48500, detail: "Invoice shows GSTIN 33AAACZ4322M1Z8. Vendor master has 33AAACZ4322M2Z7.", suggest: "Update vendor record to the GSTIN on the invoice", conf: 71, why: ["GSTIN on the invoice is valid on the GST portal", "Vendor master GSTIN was last edited 14 months ago", "The last 6 Zoho invoices carried the new GSTIN"] },
    { id: "e3", vendor: "Google Cloud India", kind: "unusual", issue: "Unusual invoice amount", amount: 182450, detail: "This invoice is 3.1× the vendor's 6-month average of ₹58,900.", suggest: "Confirm with the IT team before posting", conf: 58, why: ["6-month average for this vendor is ₹58,900", "No purchase order covers this amount", "Line items include a new 'Committed use' charge"] },
    { id: "e4", vendor: "ABC Technologies", kind: "costcentre", issue: "Missing cost centre", amount: 76200, suggest: "Operations", conf: 88, why: ["3 of the 4 vendors in this group were previously assigned to Operations", "Same account (IT Services) used by Operations 11 times"] },
    { id: "e5", vendor: "Orion Tech Pvt Ltd", kind: "costcentre", issue: "Missing cost centre", amount: 28400, suggest: "Operations", conf: 90, why: ["Orion Tech bills were coded to Operations 7 times", "Amount is within historical range"] },
    { id: "e6", vendor: "Nova Logistics", kind: "costcentre", issue: "Missing cost centre", amount: 54860, suggest: "Operations", conf: 86, why: ["Logistics vendors default to Operations under your rules", "Previous 4 Nova bills were coded to Operations"] },
    { id: "e7", vendor: "Pulse Media", kind: "costcentre", issue: "Missing cost centre", amount: 123999.99, suggest: "Marketing", conf: 64, why: ["Pulse Media has been coded to Marketing twice and Operations once", "Description mentions 'Q3 campaign'"] }
  ];
  /* What each kind of agent works on. Drives run narratives and the simulated run. */
  var KINDS = {
    inv: { unit: "invoices", total: 24, exc: 3, verb: "reviewed" },
    ap: { unit: "bills", total: 31, exc: 2, verb: "prepared" },
    bank: { unit: "bank transactions", total: 142, exc: 12, verb: "matched" },
    gst: { unit: "transactions", total: 186, exc: 7, verb: "checked" },
    month: { unit: "close checks", total: 12, exc: 3, verb: "ran" },
    dups: { unit: "bills", total: 86, exc: 3, verb: "compared" }
  };
  var AGENTS = [
    { id: "invoice-review", kind: "inv", name: "Invoice Review Agent", short: "Reviews incoming invoices before posting.", long: "Review every new invoice: extract the vendor, dates and amounts, validate the GST number, check for duplicates and suggest the account coding. Flag anything unusual for the accountant.", caps: ["Extract invoice information", "Validate GST", "Check duplicates", "Suggest account coding", "Compare vendor history", "Identify anomalies"], sources: ["Purchases", "Vendors", "GST", "Accounting"], icon: "receipt", schedule: "arrives", time: "morning",
      runs: [{ when: "Today", atMin: 95, n: 18, ok: 17, exc: 1 }, { when: "Yesterday", at: "5:40 PM", n: 42, ok: 39, exc: 3 }],
      perms: { read: ["Invoices", "Vendors", "GST", "Chart of Accounts"], suggest: ["Account coding", "Cost centre", "GST treatment"], execute: [["Create voucher", false], ["Modify invoice", false]], approve: ["Post accounting entry", "Delete document"] } },
    { id: "ap", kind: "ap", name: "AP Agent", short: "Prepares pending accounts payable for payment runs.", long: "List the bills due in the next 7 days, check that each one is approved, group them by vendor and prepare a payment batch. Never release a payment without the accountant's confirmation.", caps: ["List bills due", "Check approvals", "Group by vendor", "Prepare payment batch"], sources: ["Purchases", "Vendors", "Banking"], icon: "cart", schedule: "manual", time: "morning",
      runs: [{ when: "Yesterday", at: "6:40 PM", n: 31, ok: 29, exc: 2 }],
      perms: { read: ["Invoices", "Vendors", "Bank accounts"], suggest: ["Payment batch", "Due date"], execute: [["Create payment voucher", false]], approve: ["Release payment"] } },
    { id: "reconciliation", kind: "bank", name: "Reconciliation Agent", short: "Finds and resolves unmatched bank transactions.", long: "Match every bank statement line to a voucher by amount, date and reference. Explain each line that does not match and suggest a correction. Post nothing until the accountant decides.", caps: ["Match transactions", "Identify exceptions", "Suggest corrections"], sources: ["Banking", "Purchases", "Sales"], icon: "bank", schedule: "morning", time: "morning",
      runs: [{ when: "Today", atMin: 10, n: 142, ok: 130, exc: 12 }, { when: "Yesterday", at: "9:05 AM", n: 96, ok: 94, exc: 2 }],
      perms: { read: ["Bank statements", "Vouchers", "Vendors", "Customers"], suggest: ["Match", "Split", "Bank charge entry"], execute: [["Mark as matched", true], ["Create bank charge entry", false]], approve: ["Post adjustment entry"] } },
    { id: "gst", kind: "gst", name: "GST Agent", short: "Checks GST records and identifies mismatches.", long: "Compare the purchase register with GSTR-2B for the period. Validate every vendor GSTIN, check tax rates and flag ineligible input credit. Reverse credit only after the accountant approves.", caps: ["Validate GSTIN", "Check tax rates", "Flag ineligible ITC", "Compare with GSTR-2B"], sources: ["GST", "Purchases", "Vendors"], icon: "gst", schedule: "monday", time: "morning",
      runs: [{ when: "Yesterday", at: "9:20 AM", n: 210, ok: 204, exc: 6 }],
      perms: { read: ["GST", "Invoices", "Vendors"], suggest: ["GST treatment", "ITC eligibility"], execute: [["Update vendor GSTIN", false]], approve: ["Reverse ITC"] } },
    { id: "month-end", kind: "month", name: "Month-End Agent", short: "Checks whether your books are ready for month-end closing.", long: "Run the close checklist: unposted documents, unreconciled bank lines, pending GST and missing accruals. Prepare the close summary and list what is still open. Lock the period only when the accountant confirms.", caps: ["Check unposted documents", "Check unreconciled items", "Check pending GST", "Prepare close summary"], sources: ["Accounting", "Banking", "GST", "Purchases", "Sales"], icon: "cal", schedule: "monthend", time: "evening",
      runs: [{ when: "30 Sep", at: "6:10 PM", n: 12, ok: 9, exc: 3 }],
      perms: { read: ["All modules"], suggest: ["Close checklist", "Accrual entries"], execute: [["Lock period", false]], approve: ["Post accrual entry", "Lock period"] } }
  ];
  var RUNS = [
    { id: "r1", agent: "invoice-review", status: "running", total: 24, done: 18, startMin: 6, pct: 75,
      timeline: [["ok", "24 invoices picked up from Inbox", 6], ["ok", "Vendors identified", 5], ["ok", "GST numbers verified", 5], ["ok", "Duplicate check completed", 4], ["run", "Suggesting account coding", ""], ["todo", "Preparing results", ""]] },
    { id: "r2", agent: "gst", status: "running", total: 186, done: 101, startMin: 28, pct: 54,
      timeline: [["ok", "GSTR-2B fetched", 28], ["ok", "Vendors matched", 26], ["run", "Comparing tax amounts", ""], ["todo", "Flag ineligible ITC", ""], ["todo", "Prepare summary", ""]] },
    { id: "r3", agent: "reconciliation", status: "attention", total: 142, done: 142, startMin: 17, finishMin: 10, pct: 100, exc: 12,
      timeline: [["ok", "Statement imported", 17], ["ok", "130 transactions matched", 13], ["warn", "12 exceptions found", 10], ["user", "Waiting for your decision", ""]] },
    { id: "r4", agent: "invoice-review", status: "completed", total: 18, done: 18, startMin: 108, finishMin: 95, pct: 100, exc: 1,
      timeline: [["ok", "18 invoices reviewed", 100], ["ok", "17 approved by you", 95], ["ok", "1 exception resolved", 95]] },
    { id: "r5", agent: "ap", status: "completed", total: 31, done: 31, started: "6:20 PM", finished: "6:40 PM", day: "Yesterday", pct: 100, exc: 2,
      timeline: [["ok", "31 bills due listed", "6:22 PM"], ["ok", "Payment batch prepared", "6:35 PM"], ["ok", "Batch released by you", "6:40 PM"]] }
  ];
  /* Seeded "today" times are offsets from the real clock so the prototype never shows a completion in the future. */
  RUNS.forEach(function (r) { if (r.startMin != null) r.started = ago(r.startMin); if (r.finishMin != null) r.finished = ago(r.finishMin); r.timeline = r.timeline.map(function (t) { return [t[0], t[1], typeof t[2] === "number" ? ago(t[2]) : t[2]]; }); });
  AGENTS.forEach(function (a) { a.runs.forEach(function (r) { if (r.atMin != null) r.at = ago(r.atMin); }); });
  var KNOW = {
    Company: [["Company profile", COMPANY, "ok"], ["Accounting period", "FY 2026-27 · Apr–Mar", "ok"], ["Currency", "INR (₹)", "ok"], ["Tax configuration", "GST regular · Karnataka HQ", "ok"]],
    Accounting: [["Chart of Accounts", "142 ledgers", "ok"], ["Accounting rules", "18 rules", "ok"], ["Cost centres", "6 centres", "ok"], ["Vendor rules", "24 rules", "ok"]],
    Data: [["Purchases", "connected · synced 4 min ago", "ok"], ["Sales", "connected · synced 4 min ago", "ok"], ["Banking", "connected · 2 accounts", "ok"], ["GST", "connected · GSTR-2B Sept", "ok"], ["Inventory", "not connected", "off"]],
    "Historical context": [["Previous invoices", "3,412 documents", "ok"], ["Previous coding decisions", "2,980 decisions", "ok"], ["Vendor history", "96 vendors", "ok"]]
  };

  /* ---------- state + persistence (sessionStorage, shared with neo-chat.js) ---------- */
  var S = { agents: AGENTS.map(function (a) { return Object.assign({}, a, { runs: a.runs.slice() }); }), runs: RUNS.slice(), exc: EXC.slice(), resolved: {}, prefs: { explain: true } };
  var E = null; /* embedded context: { nav, screen, hash, navigated, onScreen(on), onChat(id, q, about), onLeave() } */
  function ST() { return window.NeoChat ? NeoChat.state() : {}; }
  function persist() { if (window.NeoChat) NeoChat.save(); }
  function hydrate() {
    var st = ST();
    (st.newAgents || []).forEach(function (a) { if (!S.agents.some(function (x) { return x.id === a.id; })) S.agents.push(Object.assign({}, a, { runs: (a.runs || []).slice() })); });
    var ov = st.agentState || {};
    S.agents.forEach(function (a) { var o = ov[a.id]; if (o) { ["prompt", "schedule", "time", "end", "endDate", "paused"].forEach(function (k) { if (o[k] !== undefined) a[k] = o[k]; }); if (o.runs) a.runs = o.runs.slice(); } });
    (st.runs || []).forEach(function (r) { var i = S.runs.findIndex(function (x) { return x.id === r.id; }); if (i > -1) S.runs[i] = r; else S.runs.unshift(r); });
    S.resolved = Object.assign({}, st.resolved || {});
    if (st.prefs) S.prefs = Object.assign(S.prefs, st.prefs);
  }
  function saveAgent(a) {
    var st = ST(); st.agentState = st.agentState || {};
    st.agentState[a.id] = { prompt: a.prompt, schedule: a.schedule, time: a.time, end: a.end, endDate: a.endDate, paused: !!a.paused, runs: a.runs };
    if (st.newAgents) st.newAgents.forEach(function (x) { if (x.id === a.id) Object.assign(x, { name: a.name, schedule: a.schedule, time: a.time, paused: !!a.paused }); });
    persist();
  }
  function saveRun(r) { var st = ST(); st.runs = (st.runs || []).filter(function (x) { return x.id !== r.id; }); st.runs.unshift(r); persist(); }
  function saveResolved() { var st = ST(); st.resolved = S.resolved; persist(); notify(); }
  function savePrefs() { var st = ST(); st.prefs = S.prefs; persist(); }
  function agent(id) { return S.agents.filter(function (a) { return a.id === id; })[0]; }
  function run(id) { return S.runs.filter(function (r) { return r.id === id; })[0]; }
  function runningFor(id) { return S.runs.filter(function (r) { return r.agent === id && r.status === "running"; })[0]; }
  function openExc() { return S.exc.filter(function (e) { return !S.resolved[e.id]; }); }
  /* What the chat shows on its home briefing and live strip. */
  function summary() {
    var running = S.runs.filter(function (r) { return r.status === "running"; }).map(function (r) { var a = agent(r.agent), K = KINDS[(a || {}).kind] || KINDS.inv; return { id: r.id, name: a ? a.name : "Agent", pct: r.pct, done: r.done, total: r.total, unit: K.unit }; });
    var ex = openExc(), kinds = {}; ex.forEach(function (e) { kinds[e.kind] = (kinds[e.kind] || 0) + 1; });
    var parts = []; if (kinds.costcentre) parts.push(kinds.costcentre + " missing cost centre" + (kinds.costcentre > 1 ? "s" : "")); if (kinds.duplicate) parts.push("a possible duplicate"); if (kinds.gst) parts.push("a GST mismatch"); if (kinds.unusual) parts.push("an unusual amount");
    var fin = S.runs.filter(function (r) { return r.status !== "running" && r.day !== "Yesterday"; });
    return { running: running, attention: ex.length, attentionDetail: parts.join(", "), finished: fin.length, finishedDetail: fin.slice(0, 2).map(runName).join(", ") + (fin.length > 2 ? " and " + (fin.length - 2) + " more" : "") };
  }
  function notify() { if (window.NeoChat && NeoChat.live) NeoChat.live(summary()); }

  /* ---------- schedule helpers ---------- */
  var TIME_H = { morning: 9, afternoon: 14, evening: 18 }, TIME_LBL = { morning: "9:00 AM", afternoon: "2:00 PM", evening: "6:00 PM" };
  var REPEAT = [["arrives", "When a bill arrives"], ["morning", "Daily"], ["monday", "Weekly, on Monday"], ["monthend", "Monthly, last working day"], ["manual", "Only when I run it"]];
  var TIMES = [["morning", "Morning"], ["afternoon", "Afternoon"], ["evening", "Evening"]];
  var ENDS = [["never", "Never"], ["10", "After 10 runs"], ["date", "On a date"]];
  function lastWorkingDay(y, m) { var d = new Date(y, m + 1, 0); while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1); return d; }
  function nextRunText(a) {
    if (a.paused) return "Paused";
    var now = new Date(), h = TIME_H[a.time || "morning"], at = TIME_LBL[a.time || "morning"];
    if (a.schedule === "manual" || !a.schedule) return "Runs only when you start it";
    if (a.schedule === "arrives") return "Runs as new bills arrive";
    if (a.schedule === "morning") return "Daily · Next run " + (now.getHours() < h ? "today" : "tomorrow") + " at " + at;
    if (a.schedule === "monday") { var d = (8 - now.getDay()) % 7; if (d === 0 && now.getHours() >= h) d = 7; return "Weekly · Next run " + (d === 0 ? "today" : d === 1 ? "tomorrow" : "in " + d + " days") + " at " + at; }
    if (a.schedule === "monthend") { var l = lastWorkingDay(now.getFullYear(), now.getMonth()); if (l < now) l = lastWorkingDay(now.getFullYear(), now.getMonth() + 1); return "Monthly · Next run on " + dayLabel(l) + " at " + at; }
    return "";
  }
  function schedLabel(a) { var at = TIME_LBL[a.time || "morning"]; return { manual: "only when you start it", arrives: "when a new bill arrives", morning: "every day at " + at, monday: "every Monday at " + at, monthend: "on the last working day of each month at " + at }[a.schedule || "manual"]; }

  /* ---------- router ---------- */
  var app = document.getElementById("app");
  function route() {
    var h = (E ? E.hash : location.hash).replace(/^#/, "") || "/", q = {};
    var qi = h.indexOf("?"); if (qi > -1) { h.slice(qi + 1).split("&").forEach(function (p) { var kv = p.split("="); q[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || ""); }); h = h.slice(0, qi); }
    return { path: h, parts: h.split("/").filter(Boolean), q: q };
  }
  function go(h) { if (E) { E.hash = h.replace(/^#/, ""); E.navigated = true; render(); } else location.hash = h; }
  function viewFor(r) {
    var p = r.parts;
    if (p[0] === "attention") return Attention();
    if (p[0] === "agents" && p[1] && p[2] === "permissions") return Permissions(p[1]);
    if (p[0] === "agents" && p[1]) return AgentDetail(p[1]);
    if (p[0] === "agents") return Agents();
    if (p[0] === "runs" && p[1]) return RunDetail(p[1]);
    if (p[0] === "runs") return Runs(r.q.tab || "running");
    if (p[0] === "knowledge") return Knowledge();
    if (p[0] === "settings") return Settings();
    return Agents();
  }
  function render() {
    if (E) return renderEmbedded();
    /* The Neo page home is the chat: resume the open chat, else start a new one. */
    if (!route().parts.length) { var act = NeoChat.active(); history.replaceState(null, "", "#/chat/" + (act != null ? act : "new")); }
    var r = route(); closeMenus();
    var isChat = r.parts[0] === "chat", view = isChat ? Chat() : viewFor(r);
    app.innerHTML = Shell(view, r, isChat);
    bind(r);
    if (isChat) afterChat(r.parts[1], r.q);
    document.title = "Neo · AI Accountant";
    var sc = app.querySelector(".main .scroll"); if (sc) sc.scrollTop = 0;
  }
  /* Embedded: the floating chat instance shows chat routes; everything else renders into E.screen. */
  function renderEmbedded() {
    var r = route(), p = r.parts; closeMenus();
    if (!p.length) { E.hash = "/chat/" + (NeoChat.active() != null ? NeoChat.active() : "new"); r = route(); p = r.parts; }
    E.nav.innerHTML = NavHTML(r);
    if (p[0] === "chat") { E.onScreen(false); if (E.navigated) E.onChat(p[1] || "new", r.q.q, r.q.about); E.navigated = false; return; }
    E.navigated = false;
    E.screen.innerHTML = '<main class="main"><div class="scroll">' + viewFor(r) + "</div></main>";
    E.onScreen(true); bind(r);
    var h1 = E.screen.querySelector("h1, h2"); if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  }

  /* ---------- shell ---------- */
  function NavHTML(r) {
    var p = r.parts[0] || "", excN = openExc().length;
    var item = function (href, ic, label, on, badge) { return '<li><a href="' + href + '" class="' + (on ? "active" : "") + '"' + (on ? ' aria-current="page"' : "") + ">" + icon(ic, "sm") + '<span class="txt">' + label + "</span>" + (badge || "") + "</a></li>"; };
    var recent = NeoChat.history().slice(0, 8);
    return '<nav class="neonav" id="neonav" aria-label="Neo">' +
      '<button class="new" type="button" data-go="#/chat/new">' + icon("plus") + "New chat</button>" +
      '<div class="group"><ul>' +
      item("#/agents", "bot", "Agents", p === "agents") +
      item("#/runs?tab=running", "clock", "Activity", p === "runs" || p === "attention", excN ? '<span class="count warn" aria-label="' + excN + ' items need your attention">' + excN + "</span>" : "") +
      item("#/knowledge", "book", "Knowledge", p === "knowledge") +
      "</ul></div>" +
      '<div class="group recent"><h2>Recent</h2><ul>' + (recent.length ? recent.map(function (c) { var on = p === "chat" && String(NeoChat.active()) === String(c.id); return '<li><a href="#/chat/' + c.id + '" class="' + (on ? "active" : "") + '"' + (on ? ' aria-current="page"' : "") + '><span class="txt">' + esc(c.title) + "</span></a></li>"; }).join("") : '<li class="empty">No chats yet</li>') + "</ul></div>" +
      '<div class="foot"><a href="#/settings" class="' + (p === "settings" ? "active" : "") + '"' + (p === "settings" ? ' aria-current="page"' : "") + ">" + icon("settings", "sm") + "Settings</a></div></nav>";
  }
  function Shell(view, r, isChat) {
    var modules = [["Dashboard", "grid"], ["Inbox", "inbox", '<span class="tag">NEW</span>'], ["Purchases", "cart"], ["Sales", "tag"], ["Banking", "bank"], ["Accounting", "layers", '<span class="chev">' + icon("chevR") + "</span>"], ["Inventory", "box"], null, ["GST", "gst"], ["Sync Management", "refresh"]];
    var modnav = '<nav class="modnav" aria-label="Modules"><div class="items">' + modules.map(function (m) { return m ? '<a href="' + APP + '" data-label="' + m[0] + '">' + icon(m[1]) + "<span>" + m[0] + "</span>" + (m[2] || "") + "</a>" : "<hr>"; }).join("") + '<hr><a href="#/" class="active" aria-current="page" data-label="Neo">' + icon("sparkle") + '<span>Neo</span><span class="tag">NEW</span></a></div><button class="collapse" type="button" id="modCollapse" title="Collapse sidebar" aria-label="Collapse sidebar">' + icon("collapse") + "</button></nav>";
    return '<div class="app">' + TopNav() + '<div class="frame">' + modnav + NavHTML(r) + '<main class="main" id="main">' + (isChat ? view : '<div class="scroll">' + view + "</div>") + "</main></div></div>";
  }
  function TopNav() {
    return '<header class="topnav"><div class="brand"><button class="menu-btn tn-link" type="button" id="menuBtn" aria-label="Open Neo navigation">' + icon("menu") + '</button><a href="' + APP + '" aria-label="AI Accountant home"><img src="' + BASE + '/images/logo.png" alt="AI Accountant" width="121" height="24"></a></div>' +
      '<div class="right"><button class="tn-btn hide-sm" type="button" aria-label="Switch company" title="' + COMPANY + '"><span class="co">S</span>' + COMPANY + icon("chevD", "sm") + '</button><button class="tn-btn hide-sm" type="button" aria-label="Sync to Tally">' + icon("refresh", "sm") + 'Sync<span class="dot"></span></button><span class="tn-sep hide-sm"></span>' +
      '<button class="tn-link tn-neo" type="button" id="askNeo" aria-label="Ask Neo" title="Ctrl J focuses the composer"><span class="mark">' + icon("sparkle", "sm") + '</span>Ask Neo<kbd>Ctrl J</kbd></button>' +
      '<button class="tn-link hide-sm" type="button">' + icon("bookOpen") + 'Guide</button><button class="tn-link hide-sm" type="button" style="width:32px;padding:0;justify-content:center;border-radius:50%" title="What\'s new" aria-label="What\'s new">' + icon("monitor") + '</button><button class="tn-avatar" type="button" aria-label="Profile menu" title="soundar.r@aiaccountant.com">SR</button></div></header>';
  }

  /* ---------- chat (standalone page only; the module renders it) ---------- */
  var chatInst = null;
  function Chat() { return '<div id="ncMount" style="display:flex;flex:1;min-height:0"></div>'; }
  function afterChat(id, q) {
    var host = document.getElementById("ncMount"); if (!host) return;
    if (chatInst) { try { chatInst.stop(); } catch (e) {} }
    var restore = id && id !== "new";
    if (id === "new" && !q.q) NeoChat.setActive(null);
    chatInst = NeoChat.mount(host, { mode: "full", sidebar: false, restore: !!restore,
      onHistory: function () { var n = document.getElementById("neonav"); if (n) n.outerHTML = NavHTML(route()); },
      onExpand: function () { var st = ST(); st.open = true; st.expanded = false; st.navHeld = false; persist(); location.href = APP; },
      onClose: function () { var st = ST(); st.open = false; st.expanded = false; persist(); location.href = APP; } });
    if (restore) { var n = +id; if (!isNaN(n)) chatInst.open(n); }
    if (q.q) chatInst.start(q.q, { kind: q.about || null });
    var want = NeoChat.active(); if (want != null && location.hash !== "#/chat/" + want && !q.q) history.replaceState(null, "", "#/chat/" + want);
  }
  function ask(q, about) { go("#/chat/new?q=" + encodeURIComponent(q) + (about ? "&about=" + encodeURIComponent(about) : "")); }

  /* ---------- needs attention ---------- */
  function Attention() {
    var ex = openExc(), cc = ex.filter(function (e) { return e.kind === "costcentre"; }), others = ex.filter(function (e) { return e.kind !== "costcentre"; });
    var html = '<div class="page wide"><div class="crumb"><a href="#/runs?tab=attention">' + icon("arrowL", "sm") + 'Activity</a></div><div class="page-head"><div><h1>Needs your attention</h1><p class="sub">' + (ex.length ? ex.length + " items need your decision. Similar problems are grouped so you can resolve them together." : "Nothing is waiting on you.") + '</p></div><div class="actions"><a class="btn" href="#/runs?tab=completed">' + icon("clock", "sm") + "Resolved items</a></div></div>";
    if (!ex.length) return html + EmptyState("check", "You're all caught up.", "Neo hasn't found anything that needs your attention.", '<a class="btn primary" href="#/agents">Go to Agents</a>') + "</div>";
    if (cc.length) {
      html += '<div class="card group-card"><div class="gh"><h3>' + pill("warn", cc.length + " invoices missing cost centre") + "</h3>" + pill("ai", "Grouped by Neo") + '</div><div class="gb"><p>' + cc.length + " invoices are missing a cost centre. Neo suggests one for each based on vendor history.</p>" +
        '<div class="ai-box"><div class="lbl">' + icon("sparkle", "sm") + 'AI suggestion</div><div class="row"><span>Suggested for 3 of ' + cc.length + ": <b>Operations</b></span>" + conf(88) + '</div><p style="margin-top:4px;color:var(--ink-2)">3 of these vendors were previously assigned to Operations. Pulse Media is less certain, so it is marked for your confirmation.</p></div>' +
        '<table class="table"><thead><tr><th scope="col">Vendor</th><th scope="col" class="num">Amount</th><th scope="col">Suggested cost centre</th><th scope="col">Confidence</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead><tbody>' + cc.map(function (e) { return '<tr><td><b>' + esc(e.vendor) + '</b></td><td class="num">' + inr(e.amount) + "</td><td>" + esc(e.suggest) + "</td><td><span style=\"position:relative;display:inline-flex;align-items:center;gap:6px\">" + conf(e.conf) + ' <button class="why" type="button" data-whyex="' + e.id + '" aria-expanded="false" aria-controls="pop-' + e.id + '">Why?</button><div class="pop" id="pop-' + e.id + '" hidden><b>Why ' + esc(e.suggest) + '?</b><ul>' + e.why.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + '</ul></div></span></td><td><div class="btn-row"><button class="btn sm" type="button" data-apply="' + e.id + '">Apply ' + esc(e.suggest) + '</button><button class="btn sm ghost" type="button" data-skip="' + e.id + '">Skip</button></div></td></tr>'; }).join("") + "</tbody></table>" +
        '<div class="btn-row"><button class="btn primary" type="button" data-applyall="cc">Apply suggested cost centre to all ' + cc.length + '</button></div></div></div>';
    }
    others.forEach(function (e) {
      var k = e.kind === "duplicate" ? "bad" : "warn";
      html += '<div class="card group-card" id="' + e.id + '"><div class="gh"><h3>' + pill(k, e.issue) + "<span>" + esc(e.vendor) + '</span></h3><span class="amt">' + inr(e.amount) + '</span></div><div class="gb"><p>' + esc(e.detail || "") + "</p>" +
        '<div class="ai-box"><div class="lbl">' + icon("sparkle", "sm") + 'AI suggestion</div><div class="row"><span><b>' + esc(e.suggest) + "</b></span>" + conf(e.conf) + '</div><button class="why" type="button" data-why="' + e.id + '" aria-expanded="false" aria-controls="why-' + e.id + '">Why this suggestion? ' + icon("chevD", "sm") + '</button><ul id="why-' + e.id + '" hidden>' + e.why.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ul></div>" +
        '<div class="btn-row">' + (e.kind === "duplicate" ? '<button class="btn primary" type="button" data-resolve="' + e.id + '" data-msg="AWS-IN-88214 marked as duplicate. AWS-IN-88102 kept.">Mark AWS-IN-88214 as duplicate</button><button class="btn" type="button" data-resolve="' + e.id + '" data-msg="Both AWS invoices kept.">Keep both</button>' : e.kind === "gst" ? '<button class="btn primary" type="button" data-resolve="' + e.id + '" data-msg="Vendor GSTIN updated for Zoho Corporation.">Update vendor GSTIN</button><button class="btn" type="button" data-resolve="' + e.id + '" data-msg="Invoice sent back to Arjun M. for correction.">Send back for correction</button>' : '<button class="btn primary" type="button" data-resolve="' + e.id + '" data-msg="Google Cloud invoice approved for posting.">Approve this amount</button><button class="btn" type="button" data-resolve="' + e.id + '" data-msg="Query sent to the IT team.">Ask IT team to confirm</button>') + '<a class="btn ghost" href="' + APP + '" data-app>Open document</a></div></div></div>';
    });
    return html + "</div>";
  }
  function EmptyState(ic, h, p, cta) { return '<div class="card empty-state"><div class="ico">' + icon(ic) + "</div><h3>" + h + "</h3><p>" + p + "</p>" + cta + "</div>"; }

  /* ---------- agents ---------- */
  function Agents() {
    return '<div class="page"><div class="page-head"><div><h1>Agents</h1><p class="sub">Neo agents do accounting work for you. Anything that changes your books waits for your approval.</p></div><div class="actions"><button class="btn primary" type="button" data-newagent>' + icon("plus", "sm") + 'New agent</button></div></div>' +
      '<div class="card">' + S.agents.map(function (a) {
        var rr = runningFor(a.id), st = rr ? ["run", "Running"] : a.paused ? ["paused", "Paused"] : ["", "Ready"];
        return '<div class="arow" data-arow="' + a.id + '"><a class="ainfo" href="#/agents/' + a.id + '"><span class="ico">' + icon(a.icon) + "</span><span><b>" + esc(a.name) + "</b><small>" + esc(a.short) + '</small></span></a><span class="ast ' + st[0] + '">' + st[1] + '</span><button class="btn sm" type="button" data-run="' + a.id + '"' + (rr ? " disabled" : "") + ">Run</button></div>";
      }).join("") + "</div></div>";
  }
  function runSummary(a, r) {
    var K = KINDS[a.kind] || KINDS.inv, lead, items;
    switch (a.kind) {
      case "ap": lead = "I prepared <b>" + r.n + " bills</b> due this week. <b>" + r.ok + " are approved</b> and <b>" + r.exc + " " + (r.exc === 1 ? "is" : "are") + " waiting for approval</b>."; items = [["Payment batch", r.ok + " approved bills are grouped by vendor and ready to release."], ["Waiting", r.exc + " bills still need approval from Priya R. before they can be paid."], ["Release", "nothing is paid until you release the batch from Banking."]]; break;
      case "bank": lead = "I matched <b>" + r.n + " bank transactions</b>. <b>" + r.ok + " matched</b> your books and <b>" + r.exc + " need a decision</b>."; items = [["Matched", "by amount, date and reference against your vouchers."], ["Exceptions", "mostly bank charges and partial payments. Each one has a suggested correction."], ["Approval", "no adjustment entry is posted until you confirm it."]]; break;
      case "gst": lead = "I checked <b>" + r.n + " transactions</b> against GSTR-2B. <b>" + r.ok + " match</b> and <b>" + r.exc + " have mismatches</b>."; items = [["Amount mismatches", "purchase bills that differ from GSTR-2B by small amounts."], ["GST numbers", "any vendor GSTIN that differs from your vendor record is listed separately."], ["Approval", "input credit is reversed only after you approve it."]]; break;
      case "month": lead = "I ran <b>" + r.n + " close checks</b>. <b>" + r.ok + " passed</b> and <b>" + r.exc + " are still open</b>."; items = [["Passed", "posted documents, reconciled accounts and filed GST returns."], ["Open", "unreconciled bank lines, unposted invoices and pending ITC reversals."], ["Approval", "the period is locked only when you confirm the close."]]; break;
      case "dups": lead = "I compared <b>" + r.n + " bills</b>. <b>" + r.ok + " are unique</b> and <b>" + r.exc + " look like duplicates</b>."; items = [["Certain matches", "same vendor, bill number and amount."], ["Your call", "each pair can be kept or marked as a duplicate."], ["Approval", "nothing is deleted until you decide."]]; break;
      default: lead = "I " + K.verb + " <b>" + r.n + " invoices</b>. <b>" + r.ok + " are ready to post</b> and <b>" + r.exc + " need" + (r.exc === 1 ? "s" : "") + " your attention</b>."; items = [["Ready", "passed the GST, duplicate and vendor checks with a suggested account."], ["Needs a check", "a missing vendor GST number, an unusual amount or a possible duplicate."], ["Approval", "nothing is posted or deleted until you approve it."]];
    }
    return '<p class="overline">Latest run · ' + esc(r.when) + (r.at ? ", " + esc(r.at) : "") + "</p><p>" + lead + '</p><ul class="as-list">' + items.map(function (i) { return "<li><b>" + i[0] + ":</b> " + i[1] + "</li>"; }).join("") + "</ul><p>" + (r.exc ? 'The ' + r.exc + ' open item' + (r.exc > 1 ? "s are" : " is") + ' listed under <a href="#/attention" style="color:var(--primary);font-weight:600">Needs attention</a>.' : "No other items met the threshold for an alert.") + "</p>";
  }
  function agentLeft(a) {
    var rr = runningFor(a.id), r = a.runs[0], K = KINDS[a.kind] || KINDS.inv, html = "";
    if (rr) html += '<div class="card pad as-run" data-runbox="' + rr.id + '"><b>Running now</b><div class="progress"><i style="width:' + rr.pct + '%"></i></div><small data-runpct>' + rr.done + " / " + rr.total + " " + K.unit + " · " + rr.pct + "%</small></div>";
    if (r) {
      html += runSummary(a, r) +
        '<div class="as-acts" role="group" aria-label="Message actions"><button class="ib" type="button" data-copy aria-label="Copy summary" title="Copy">' + icon("copy", "sm") + '</button><button class="ib" type="button" data-fb="up" aria-label="Good result" title="Good result">' + icon("thumbU", "sm") + '</button><button class="ib" type="button" data-fb="down" aria-label="Needs improvement" title="Needs improvement">' + icon("thumbD", "sm") + '</button><button class="ib" type="button" data-run="' + a.id + '" aria-label="Run again" title="Run again"' + (rr ? " disabled" : "") + ">" + icon("refresh", "sm") + "</button></div>" +
        (a.runs.length > 1 ? '<p class="as-prev">' + (a.runs.length - 1) + " earlier run" + (a.runs.length > 2 ? "s" : "") + ' · <a href="#/runs?tab=completed">See all activity</a></p>' : "");
    } else if (!rr) {
      html += '<div class="as-empty"><h3>No runs yet</h3><p>Run this agent to see its first result here.</p><button class="btn primary" type="button" data-run="' + a.id + '">' + icon("play", "sm") + "Run now</button></div>";
    }
    return html;
  }
  function opt(list, cur) { return list.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === cur ? " selected" : "") + ">" + o[1] + "</option>"; }).join(""); }
  function AgentDetail(id) {
    var a = agent(id); if (!a) return Agents();
    var rr = runningFor(id), r = a.runs[0], sub = nextRunText(a);
    var lastRun = r ? esc(r.when) + (r.at ? " at " + esc(r.at) : "") : "Never";
    return '<div class="agent-split"><section class="as-left" aria-label="' + esc(a.name) + ' results"><div class="as-top"><a href="#/agents" class="as-back">' + icon("arrowL", "sm") + "Agents</a></div>" +
      '<div class="as-msgs" data-asleft>' + agentLeft(a) + "</div>" +
      '<form class="as-ask" data-agent-ask="' + id + '"><label class="sr-only" for="asAsk">Ask Neo about ' + esc(a.name) + '</label><input id="asAsk" type="text" placeholder="Ask Neo about ' + esc(a.name) + '" autocomplete="off"><button class="send" type="submit" aria-label="Send" disabled>' + icon("send") + "</button></form></section>" +
      '<aside class="as-right" aria-label="Agent settings"><div class="as-head"><div><h2>' + esc(a.name) + '</h2><p class="' + (a.paused ? "paused" : "") + '">' + esc(sub) + '</p></div><button class="ib" type="button" data-run="' + id + '" title="Run now" aria-label="Run now"' + (rr ? " disabled" : "") + ">" + icon("play", "sm") + '</button><button class="ib" type="button" data-agent-pause="' + id + '" title="' + (a.paused ? "Resume schedule" : "Pause schedule") + '" aria-label="' + (a.paused ? "Resume schedule" : "Pause schedule") + '" aria-pressed="' + (!!a.paused) + '">' + icon(a.paused ? "play" : "pause", "sm") + '</button><a class="ib" href="#/agents" aria-label="Close agent settings" title="Close">' + icon("x", "sm") + "</a></div>" +
      '<form class="as-body" data-agent-form="' + id + '"><label class="overline" for="asPrompt">Prompt</label><textarea class="as-prompt" id="asPrompt" name="prompt">' + esc(a.prompt || a.long) + "</textarea>" +
      '<p class="overline" id="asFreq">Frequency</p><div class="as-group" role="group" aria-labelledby="asFreq"><label class="as-row"><span>Repeat</span><select name="schedule">' + opt(REPEAT, a.schedule || "manual") + "</select></label>" +
      '<label class="as-row"><span>Time</span><select name="time">' + opt(TIMES, a.time || "morning") + "</select></label></div>" +
      '<div class="as-group"><label class="as-row"><span>End repeat</span><select name="end">' + opt(ENDS, a.end || "never") + '</select></label><label class="as-row" data-endrow' + (a.end === "date" ? "" : " hidden") + '><span>End date</span><input type="date" name="endDate" value="' + esc(a.endDate || "") + '"></label></div>' +
      '<div class="as-group"><div class="as-row"><span>Last run</span><span class="as-val">' + lastRun + '</span></div><div class="as-row"><span>Permissions</span><a class="as-val" href="#/agents/' + id + '/permissions" style="color:var(--primary);font-weight:600">View</a></div></div>' +
      '<div class="as-foot"><a class="btn" href="#/agents">Cancel</a><button class="btn primary" type="submit" disabled>Save</button></div></form></aside></div>';
  }
  function refreshAgentLeft(id) {
    var a = agent(id), host = document.querySelector('[data-asleft]'); if (!a || !host) return;
    var form = document.querySelector('[data-agent-form="' + id + '"]'); if (!form) return;
    host.innerHTML = agentLeft(a);
    var head = document.querySelector(".as-head"); if (head) { var p = head.querySelector("p"); p.textContent = nextRunText(a); p.className = a.paused ? "paused" : ""; head.querySelectorAll("[data-run]").forEach(function (b) { b.disabled = !!runningFor(id); }); }
    var lr = a.runs[0]; var cells = form.querySelectorAll(".as-val"); if (cells[0]) cells[0].textContent = lr ? lr.when + (lr.at ? " at " + lr.at : "") : "Never";
  }
  function Trust() { return '<div class="trust"><span class="step read">READ</span><span class="arr">' + icon("arrowR", "sm") + '</span><span class="step suggest">SUGGEST</span><span class="arr">' + icon("arrowR", "sm") + '</span><span class="step execute">EXECUTE</span><span class="arr">' + icon("arrowR", "sm") + '</span><span class="step approve">APPROVE</span></div>'; }
  function Permissions(id) {
    var a = agent(id); if (!a) return Agents(); var p = a.perms;
    function li(items, kind) { return items.map(function (x) { var on = Array.isArray(x) ? x[1] : true, label = Array.isArray(x) ? x[0] : x; return '<li class="' + (kind === "appr" ? "appr" : on ? "on" : "off") + '">' + icon(kind === "appr" ? "user" : on ? "check" : "x") + esc(label) + (kind === "appr" ? '<span class="tail">You approve</span>' : kind === "exec" && !on ? '<span class="tail">Not allowed</span>' : "") + "</li>"; }).join(""); }
    return '<div class="page wide"><div class="crumb"><a href="#/agents/' + id + '">' + icon("arrowL", "sm") + esc(a.name) + '</a></div><div class="page-head"><div><h1>What this agent can do</h1><p class="sub">Nothing with a high impact on your books happens without your explicit confirmation.</p></div></div>' +
      '<div class="card pad"><div class="section-head"><h2>Trust model</h2></div>' + Trust() + "</div>" +
      '<div class="perm-grid" style="margin-top:14px"><div class="card perm"><h3>' + icon("eye", "sm") + "Can read</h3><ul>" + li(p.read) + '</ul></div><div class="card perm"><h3>' + icon("sparkle", "sm") + "Can suggest</h3><ul>" + li(p.suggest) + '</ul></div><div class="card perm"><h3>' + icon("zap", "sm") + "Can execute</h3><ul>" + (p.execute.length ? li(p.execute, "exec") : '<li class="off">' + icon("x") + "Nothing on its own</li>") + '</ul></div><div class="card perm"><h3>' + icon("shield", "sm") + "Requires your approval</h3><ul>" + li(p.approve, "appr") + "</ul></div></div>" +
      '<div class="note" style="margin-top:14px">' + icon("alert", "sm") + "<span>Deleting documents and posting entries can never be executed by an agent on its own. Permission editing is not part of this prototype; to change what an agent does, edit its prompt or ask Neo in chat.</span></div></div>";
  }

  /* Simulated run: a run record progresses over ~3.5s, then lands as the agent's latest run. */
  function startRun(id, opener) {
    var a = agent(id); if (!a || runningFor(id)) return;
    var K = KINDS[a.kind] || KINDS.inv;
    modal('<div class="mh"><h2 id="mTitle">Run ' + esc(a.name) + ' now?</h2><p>' + esc(a.short) + '</p></div><div class="mb"><dl class="kv"><dt>Will read</dt><dd>' + esc(a.sources.join(", ")) + "</dd><dt>Will do on its own</dt><dd>" + esc(a.perms.execute.filter(function (x) { return x[1]; }).map(function (x) { return x[0]; }).join(", ") || "Nothing") + "</dd><dt>Will ask you first</dt><dd>" + esc(a.perms.approve.join(", ")) + '</dd></dl></div><div class="mf"><button class="btn" type="button" data-mcancel>Cancel</button><button class="btn primary" type="button" data-mok>' + icon("play", "sm") + "Start run</button></div>", opener);
    document.querySelector("[data-mok]").onclick = function () {
      closeModal();
      var nr = { id: "r" + Date.now(), agent: id, status: "running", total: K.total, done: 0, pct: 0, started: timeNow(), timeline: [["ok", "Run started by " + USER, timeNow()], ["run", "Reading " + a.sources[0], ""], ["todo", "Analysing", ""], ["todo", "Preparing results", ""]] };
      S.runs.unshift(nr);
      refreshRunUI(nr, false); notify();
      if (route().parts[0] !== "agents" || route().parts[1] !== id) toast(a.name + " started. Watch it under Activity.");
      tickRun(nr, 700);
    };
  }
  /* Progress a running run to completion (new runs and the seeded ones that were "in progress" when the page opened). */
  var ticking = {};
  function tickRun(nr, every) {
    if (ticking[nr.id]) return; ticking[nr.id] = true;
    var a = agent(nr.agent), K = KINDS[(a || {}).kind] || KINDS.inv;
    var iv = setInterval(function () {
      nr.pct = Math.min(100, nr.pct + 20); nr.done = Math.round(nr.total * nr.pct / 100);
      if (nr.pct >= 40 && nr.pct < 100) nr.timeline = [["ok", "Run started by " + USER, nr.started], ["ok", "Read " + a.sources.join(", "), ""], ["run", "Analysing", ""], ["todo", "Preparing results", ""]];
      var done = nr.pct >= 100;
      if (done) {
        clearInterval(iv); delete ticking[nr.id];
        var exc = K.exc; nr.status = exc ? "attention" : "completed"; nr.exc = exc; nr.finished = timeNow();
        nr.timeline = [["ok", "Run started by " + USER, nr.started], ["ok", "Read " + a.sources.join(", "), ""], ["ok", (nr.total - exc) + " " + K.unit + " ready", ""], exc ? ["warn", exc + " need your decision", nr.finished] : ["ok", "Nothing needs your attention", nr.finished], ["user", exc ? "Waiting for your decision" : "Completed", ""]];
        a.runs.unshift({ when: "Today", at: nr.finished, n: nr.total, ok: nr.total - exc, exc: exc });
        saveAgent(a); saveRun(nr);
        toast(a.name + " finished: " + (nr.total - exc) + " ready, " + exc + " need your review.");
      }
      refreshRunUI(nr, done); notify();
    }, every);
  }
  /* Update only what the current screen needs: progress moves in place, and a full re-render happens only when a
     run finishes on a list screen (rows change tabs), never while the user may be editing or has a dialog open. */
  function refreshRunUI(nr, finished) {
    var r = route(), p = r.parts, K = KINDS[(agent(nr.agent) || {}).kind] || KINDS.inv;
    if (p[0] === "agents" && p[1] === nr.agent && !p[2]) {
      var box = document.querySelector('[data-runbox="' + nr.id + '"]');
      if (box && !finished) { box.querySelector(".progress i").style.width = nr.pct + "%"; box.querySelector("[data-runpct]").textContent = nr.done + " / " + nr.total + " " + K.unit + " · " + nr.pct + "%"; }
      else refreshAgentLeft(nr.agent);
    } else if (p[0] === "agents" && !p[1]) {
      var row = document.querySelector('[data-arow="' + nr.agent + '"]');
      if (row) { var st = row.querySelector(".ast"), b = row.querySelector("[data-run]"); if (finished) { st.textContent = "Ready"; st.className = "ast"; b.disabled = false; } else { st.textContent = "Running · " + nr.pct + "%"; st.className = "ast run"; b.disabled = true; } }
    } else if (p[0] === "runs" && p[1] === nr.id) {
      var prog = document.querySelector("[data-runprog] i");
      if (finished || !prog || document.getElementById("modalBg")) { if (!document.getElementById("modalBg")) render(); }
      else { prog.style.width = nr.pct + "%"; var dd = document.querySelector(".kv.cols div:nth-child(2) dd"); if (dd) dd.textContent = nr.done + " / " + nr.total + " " + K.unit; var tl = document.querySelector(".timeline"); if (tl) tl.innerHTML = nr.timeline.map(TL).join(""); }
    } else if (p[0] === "runs" && !p[1]) {
      var rr = document.querySelector('[data-runrow="' + nr.id + '"]');
      if (finished) { if (!document.getElementById("modalBg")) render(); }
      else if (rr) { var pi = rr.querySelector(".progress i"), pc = rr.querySelector(".pct"); if (pi) pi.style.width = nr.pct + "%"; if (pc) pc.textContent = nr.done + " / " + nr.total + " · " + nr.pct + "%"; }
    }
    if (finished && E) E.nav.innerHTML = NavHTML(r);
  }

  /* ---------- activity ---------- */
  function runName(r) { var a = agent(r.agent); return a ? a.name : "Agent"; }
  function runDesc(r) {
    var K = KINDS[(agent(r.agent) || {}).kind] || KINDS.inv;
    if (r.status === "running") return "Processing " + r.total + " " + K.unit;
    return "Completed " + (r.finished ? "at " + r.finished : "") + " · " + r.total + " " + K.unit + (r.exc ? " · " + r.exc + " exception" + (r.exc > 1 ? "s" : "") : "");
  }
  function TL(t) { var ic = { ok: "check", run: "clock", warn: "alert", todo: "clock", user: "user" }[t[0]] || "clock"; return '<li><span class="dot ' + t[0] + '">' + icon(ic) + "</span><span>" + esc(t[1]) + "</span>" + (t[2] ? "<time>" + esc(t[2]) + "</time>" : "<span></span>") + "</li>"; }
  function Runs(tab) {
    var tabs = [["running", "Running"], ["attention", "Needs attention"], ["completed", "Completed"]];
    var list = S.runs.filter(function (r) { return tab === "completed" ? r.status !== "running" : r.status === tab; });
    return '<div class="page wide"><div class="page-head"><div><h1>Activity</h1><p class="sub">What your agents did and what is waiting on you.</p></div>' + (openExc().length ? '<div class="actions"><a class="btn" href="#/attention">' + icon("alert", "sm") + 'Needs attention (' + openExc().length + ")</a></div>" : "") + "</div>" +
      '<nav class="tabs" aria-label="Activity filter">' + tabs.map(function (t) { return '<a href="#/runs?tab=' + t[0] + '"' + (t[0] === tab ? ' aria-current="page"' : "") + ">" + t[1] + "</a>"; }).join("") + "</nav>" +
      (list.length ? '<div class="card">' + list.map(function (r) {
        var k = r.status === "running" ? "run" : r.status === "attention" ? "warn" : "ok";
        return '<a class="run-row" href="#/runs/' + r.id + '" data-runrow="' + r.id + '"><span class="ico ' + k + '">' + icon(k === "run" ? "clock" : k === "warn" ? "alert" : "check") + "</span><span><b>" + esc(runName(r)) + "</b><small>" + esc(runDesc(r)) + "</small></span><span>" + (r.status === "running" ? '<span class="progress"><i style="width:' + r.pct + '%"></i></span><span class="pct">' + r.done + " / " + r.total + " · " + r.pct + "%</span>" : pill(k, r.status === "attention" ? r.exc + " need your decision" : "Completed")) + "</span>" + icon("chevR") + "</a>";
      }).join("") + "</div>" : EmptyState("clock", tab === "running" ? "No agents are running right now." : tab === "attention" ? "Nothing is waiting on you." : "No completed runs yet.", tab === "running" ? "Start one from Agents, or ask Neo for a task." : "Runs show up here as agents finish.", '<a class="btn primary" href="#/agents">Go to Agents</a>')) + "</div>";
  }
  function RunDetail(id) {
    var r = run(id); if (!r) return Runs("running");
    var a = agent(r.agent), K = KINDS[(a || {}).kind] || KINDS.inv, k = r.status === "running" ? "run" : r.status === "attention" ? "warn" : "ok";
    return '<div class="page wide"><div class="crumb"><a href="#/runs?tab=' + (r.status === "running" ? "running" : r.status === "attention" ? "attention" : "completed") + '">' + icon("arrowL", "sm") + 'Activity</a></div><div class="page-head"><div><h1>' + esc(runName(r)) + '</h1><p class="sub">Started ' + esc(r.started) + " · " + esc(runDesc(r)) + '</p></div><div class="actions">' + (r.status === "attention" ? '<a class="btn primary" href="#/attention">Review ' + r.exc + " exception" + (r.exc > 1 ? "s" : "") + "</a>" : "") + '<a class="btn' + (r.status === "attention" ? "" : " primary") + '" href="#/agents/' + r.agent + '">Open agent</a></div></div>' +
      '<div class="card pad"><dl class="kv cols"><div><dt>Status</dt><dd>' + pill(k, r.status === "running" ? "Processing" : r.status === "attention" ? "Needs your decision" : "Completed") + "</dd></div><div><dt>Progress</dt><dd>" + r.done + " / " + r.total + " " + K.unit + "</dd></div><div><dt>Agent</dt><dd><a href=\"#/agents/" + r.agent + '" style="color:var(--primary)">' + esc(runName(r)) + '</a></dd></div></dl><div class="progress" style="margin-top:14px" data-runprog><i style="width:' + r.pct + '%"></i></div></div>' +
      (r.status !== "running" ? '<div class="card pad"><div class="section-head"><h2>Results</h2></div><div class="tally"><div><span class="n">' + (r.total - (r.exc || 0)) + "</span>" + pill("ok", "Ready") + '</div><div><span class="n">' + (r.exc || 0) + "</span>" + pill("warn", "Need your decision") + "</div></div></div>" : "") +
      '<div class="card pad"><div class="section-head"><h2>Activity timeline</h2><span class="pill neutral">' + icon("clock") + 'Audit trail</span></div><ul class="timeline">' + r.timeline.map(TL).join("") + "</ul></div></div>";
  }

  /* ---------- knowledge / settings ---------- */
  function Knowledge() {
    return '<div class="page wide"><div class="page-head"><div><h1>Knowledge</h1><p class="sub">What Neo can read when it works on your books.</p></div><div class="actions"><button class="btn" type="button" data-toast="Sources are up to date (synced 4 minutes ago).">' + icon("refresh", "sm") + 'Refresh connections</button></div></div><div class="know-grid">' + Object.keys(KNOW).map(function (g) { return '<div class="card pad know"><div class="section-head"><h2>' + g + "</h2></div><ul>" + KNOW[g].map(function (k) { return "<li><span><b>" + k[0] + '</b><br><span class="meta">' + esc(k[1]) + "</span></span>" + (k[2] === "ok" ? pill("ok", "Connected") : pill("neutral", "Not connected")) + "</li>"; }).join("") + "</ul></div>"; }).join("") + "</div></div>";
  }
  function Settings() {
    return '<div class="page"><div class="page-head"><div><h1>Settings</h1><p class="sub">How Neo works for you.</p></div></div><div class="card pad settings-list">' +
      '<label class="toggle"><span>Show “why” with every suggestion<small>Each suggestion comes with the evidence Neo used.</small></span><input type="checkbox" id="setExplain"' + (S.prefs.explain ? " checked" : "") + '><span class="track"></span></label>' +
      '<label class="toggle"><span>Ask before any bulk action<small>Required. Neo never approves more than one item at once on its own.</small></span><input type="checkbox" checked disabled><span class="track"></span></label>' +
      '<div class="note">' + icon("shield", "sm") + "<span>Approval for posting, deleting and GSTIN changes cannot be switched off.</span></div></div></div>";
  }

  /* ---------- overlays ---------- */
  function ov() { var o = document.getElementById("neo-overlay"); if (!o) { o = document.createElement("div"); o.id = "neo-overlay"; o.className = "neo-scope"; o.style.cssText = "display:contents"; document.body.appendChild(o); } return o; }
  function toast(msg) { var o = ov(); o.querySelectorAll(".toast").forEach(function (t) { t.remove(); }); var t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.innerHTML = icon("check") + esc(msg); o.appendChild(t); setTimeout(function () { t.remove(); }, 3600); }
  var modalOpener = null;
  function modal(html, opener) {
    closeModal(); modalOpener = opener || document.activeElement;
    var o = ov(); var bg = document.createElement("div"); bg.className = "modal-bg"; bg.id = "modalBg"; bg.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle">' + html + "</div>"; o.appendChild(bg);
    var f = bg.querySelectorAll("button, a, input, select, textarea"); if (f.length) f[f.length - 1].focus();
    bg.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return; var items = bg.querySelectorAll("button, a, input, select, textarea"), first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  function closeModal() { var m = document.getElementById("modalBg"); if (!m) return; m.remove(); if (modalOpener && document.body.contains(modalOpener)) modalOpener.focus(); modalOpener = null; }
  function closeMenus() { document.querySelectorAll(".neo-scope .pop").forEach(function (p) { p.hidden = true; }); document.querySelectorAll(".neo-scope [data-whyex][aria-expanded='true']").forEach(function (b) { b.setAttribute("aria-expanded", "false"); }); }
  function focusComposer() { if (chatInst) chatInst.focus(); else go("#/chat/new"); }

  /* ---------- per-render bindings ---------- */
  function bind(r) {
    var mc = document.getElementById("modCollapse"); if (mc) mc.onclick = function () { document.body.classList.toggle("mod-collapsed"); };
    var mb = document.getElementById("menuBtn"); if (mb) mb.onclick = function () { var n = document.getElementById("neonav"); if (n) n.classList.toggle("open"); };
    var se = document.getElementById("setExplain"); if (se) se.onchange = function (e) { S.prefs.explain = e.target.checked; savePrefs(); toast(S.prefs.explain ? "Neo will explain every suggestion." : "Explanations hidden. You can still open “Why?” on any suggestion."); };
    var af = document.querySelector("[data-agent-form]");
    if (af) {
      var save = af.querySelector('button[type=submit]'), endSel = af.querySelector("select[name=end]"), endRow = af.querySelector("[data-endrow]");
      af.addEventListener("input", function () { save.disabled = false; });
      af.addEventListener("change", function () { save.disabled = false; endRow.hidden = endSel.value !== "date"; });
      af.onsubmit = function (e) {
        e.preventDefault(); var a = agent(af.dataset.agentForm);
        a.prompt = af.prompt.value.trim() || a.long; a.schedule = af.schedule.value; a.time = af.time.value; a.end = af.end.value; a.endDate = a.end === "date" ? af.endDate.value : "";
        if (a.end === "date" && !a.endDate) { af.endDate.focus(); toast("Pick an end date, or choose Never."); return; }
        saveAgent(a); save.disabled = true; toast("Saved. " + a.name + " runs " + schedLabel(a) + ".");
        var p = document.querySelector(".as-head p"); if (p) { p.textContent = nextRunText(a); p.className = a.paused ? "paused" : ""; }
      };
    }
    var aq = document.querySelector("[data-agent-ask]");
    if (aq) {
      var inp = aq.querySelector("input"), sb = aq.querySelector("button");
      inp.addEventListener("input", function () { sb.disabled = !inp.value.trim(); });
      aq.onsubmit = function (e) { e.preventDefault(); var v = inp.value.trim(); if (!v) return; var a = agent(aq.dataset.agentAsk); ask(v, a ? a.kind : null); };
    }
  }

  /* ---------- global events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : e.target.parentElement; if (!t) return;
    if (E) {
      var ln = t.closest("a[href^='#/']"); if (ln && (E.nav.contains(ln) || E.screen.contains(ln))) { e.preventDefault(); go(ln.getAttribute("href")); return; }
      var ap = t.closest("a[data-app]"); if (ap && E.screen.contains(ap) && E.onLeave) E.onLeave();
    }
    if (t.closest("#askNeo")) { focusComposer(); return; }
    var g = t.closest("[data-go]"); if (g) { go(g.dataset.go); return; }
    if (t.closest("[data-newagent]")) { ask("I want to automate a task"); return; }
    var ru = t.closest("[data-run]"); if (ru) { startRun(ru.dataset.run, ru); return; }
    var pz = t.closest("[data-agent-pause]"); if (pz) { var pa = agent(pz.dataset.agentPause); pa.paused = !pa.paused; saveAgent(pa); toast(pa.paused ? pa.name + " paused. It will not run on its schedule until you resume it." : pa.name + " resumed. It runs " + schedLabel(pa) + "."); render(); return; }
    if (t.closest("[data-copy]")) { var txt = (t.closest(".as-msgs") || document).innerText.trim(); if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast("Summary copied."); }, function () { toast("Couldn't copy. Select the text to copy it."); }); else toast("Couldn't copy. Select the text to copy it."); return; }
    var fb = t.closest("[data-fb]"); if (fb) { var was = fb.classList.contains("on"); fb.parentElement.querySelectorAll("[data-fb]").forEach(function (b) { b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); }); if (!was) { fb.classList.add("on"); fb.setAttribute("aria-pressed", "true"); toast(fb.dataset.fb === "up" ? "Thanks. Neo will keep doing this." : "Thanks. Neo will ask more before acting next time."); } return; }
    var ts = t.closest("[data-toast]"); if (ts) { toast(ts.dataset.toast); return; }
    var w = t.closest("[data-why]"); if (w) { var ul = document.getElementById("why-" + w.dataset.why); if (ul) { ul.hidden = !ul.hidden; w.setAttribute("aria-expanded", String(!ul.hidden)); } return; }
    var wx = t.closest("[data-whyex]"); if (wx) { var pop = document.getElementById("pop-" + wx.dataset.whyex); var open = !pop.hidden; closeMenus(); pop.hidden = open; wx.setAttribute("aria-expanded", String(!open)); return; }
    var apl = t.closest("[data-apply]"); if (apl) { var ex = S.exc.filter(function (x) { return x.id === apl.dataset.apply; })[0]; S.resolved[ex.id] = true; saveResolved(); toast(ex.suggest + " applied to " + ex.vendor + "."); render(); return; }
    var sk = t.closest("[data-skip]"); if (sk) { S.resolved[sk.dataset.skip] = true; saveResolved(); toast("Skipped. It stays in the Inbox for later."); render(); return; }
    var aa = t.closest("[data-applyall]"); if (aa) { var n = 0; S.exc.forEach(function (x) { if (x.kind === "costcentre" && !S.resolved[x.id]) { S.resolved[x.id] = true; n++; } }); saveResolved(); toast("Cost centre applied to " + n + " invoices."); render(); return; }
    var rs = t.closest("[data-resolve]"); if (rs) { S.resolved[rs.dataset.resolve] = true; saveResolved(); toast(rs.dataset.msg); render(); return; }
    if (t.closest("[data-mcancel]")) { closeModal(); return; }
    if (t.id === "modalBg") { closeModal(); return; }
    if (!t.closest(".pop") && !t.closest("[data-whyex]")) closeMenus();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (document.getElementById("modalBg")) { e.stopPropagation(); closeModal(); } else if (document.querySelector(".neo-scope .pop:not([hidden])")) { e.stopPropagation(); closeMenus(); } }
    if (!E && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") { e.preventDefault(); focusComposer(); }
  }, true);
  window.addEventListener("hashchange", function () { if (!E && app) render(); });

  hydrate();
  S.runs.filter(function (r) { return r.status === "running"; }).forEach(function (r) { tickRun(r, 2500); });
  window.NeoWorkspace = {
    attach: function (o) { E = o; E.hash = E.hash || "/chat/new"; E.navigated = false; render(); },
    detach: function () { E = null; },
    addAgent: function (spec) { if (!S.agents.some(function (a) { return a.id === spec.id; })) S.agents.push(Object.assign({}, spec, { runs: [] })); if (E && route().parts[0] === "agents" && !route().parts[1]) render(); return spec.id; },
    navigate: function (h) { if (E) go(h); },
    refreshNav: function () { if (!E) return; if (route().parts[0] === "chat" && NeoChat.active() != null) E.hash = "/chat/" + NeoChat.active(); E.nav.innerHTML = NavHTML(route()); },
    setRoute: function (h) { if (E) { E.hash = h; E.navigated = false; E.nav.innerHTML = NavHTML(route()); } },
    route: function () { return E ? route() : null; },
    agentKind: function (id) { var a = agent(id); return a ? a.kind : null; },
    summary: summary
  };
  if (app) render();
})();
