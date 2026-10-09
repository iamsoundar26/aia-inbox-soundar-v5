/* Neo workspace v2 — data, hash router, views and scripted interactions. No build step. */
(function () {
  "use strict";
  var USER = "Soundar";
  var COMPANY = "Shakunthalam Oil & Refineries";

  /* ---------- Icons (lucide-style paths) ---------- */
  var P = {
    sparkle: "M12 3l1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9zM19 3v4M17 5h4M5 17v4M3 19h4",
    check: "M20 6L9 17l-5-5", x: "M18 6L6 18M6 6l12 12", alert: "M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z",
    block: "M12 22a10 10 0 100-20 10 10 0 000 20zM4.9 4.9l14.2 14.2", clock: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2",
    plus: "M12 5v14M5 12h14", send: "M12 19V5M5 12l7-7 7 7", paperclip: "M21.4 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 1118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48",
    chevD: "M6 9l6 6 6-6", chevR: "M9 18l6-6-6-6", arrowL: "M19 12H5M12 19l-7-7 7-7", arrowR: "M5 12h14M12 5l7 7-7 7",
    search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35", copy: "M8 4h10a2 2 0 012 2v10M16 8H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V10a2 2 0 00-2-2z",
    receipt: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1zM8 7h8M8 11h8M8 15h5",
    bank: "M3 22h18M5 22V11M19 22V11M3 11h18L12 4zM9 22v-7M15 22v-7", gst: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M9 15l2 2 4-4",
    cal: "M3 6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2zM3 10h18M8 2v4M16 2v4", bot: "M12 8V4H8M4 8h16v12H4zM2 14h2M20 14h2M9 13v2M15 13v2",
    play: "M6 4l14 8-14 8z", pause: "M6 4h4v16H6zM14 4h4v16h-4z", book: "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5V4.5A2.5 2.5 0 016.5 2H20v15M4 19.5A2.5 2.5 0 006.5 22H20",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z", inbox: "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
    cart: "M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6", tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01",
    layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", box: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
    refresh: "M21 12a9 9 0 00-9-9 9.75 9.75 0 00-6.74 2.74L3 8M3 3v5h5M3 12a9 9 0 009 9 9.75 9.75 0 006.74-2.74L21 16M16 16h5v5",
    more: "M12 13a1 1 0 100-2 1 1 0 000 2zM19 13a1 1 0 100-2 1 1 0 000 2zM5 13a1 1 0 100-2 1 1 0 000 2z", pin: "M12 17v5M9 10.76a2 2 0 01-1.11 1.79l-1.78.9A2 2 0 005 15.24V16a1 1 0 001 1h12a1 1 0 001-1v-.76a2 2 0 00-1.11-1.79l-1.78-.9A2 2 0 0115 10.76V7a1 1 0 011-1 2 2 0 000-4H8a2 2 0 000 4 1 1 0 011 1z",
    thumbU: "M7 10v12M15 5.88L14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H4a2 2 0 01-2-2v-8a2 2 0 012-2h2.76a2 2 0 001.79-1.11L12 2a3.13 3.13 0 013 3.88z", thumbD: "M17 14V2M9 18.12L10 14H4.17a2 2 0 01-1.92-2.56l2.33-8A2 2 0 016.5 2H20a2 2 0 012 2v8a2 2 0 01-2 2h-2.76a2 2 0 00-1.79 1.11L12 22a3.13 3.13 0 01-3-3.88z",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z", shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z",
    menu: "M3 12h18M3 6h18M3 18h18", info: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 16v-4M12 8h.01", zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", trend: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
    file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6", link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71", edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z", archive: "M21 8v13H3V8M1 3h22v5H1zM10 12h4", monitor: "M10 7.75a.75.75 0 011.14-.64l3.67 2.25a.75.75 0 010 1.28l-3.67 2.25a.75.75 0 01-1.14-.64zM12 17v4M8 21h8M2 3h20v14H2z", bookOpen: "M12 7v14M3 18a1 1 0 01-1-1V4a1 1 0 011-1h5a4 4 0 014 4 4 4 0 014-4h5a1 1 0 011 1v13a1 1 0 01-1 1h-6a3 3 0 00-3 3 3 3 0 00-3-3z", collapse: "M3 3h18v18H3zM9 3v18M16 15l-3-3 3-3", expand: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7", clip: "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z", trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
  };
  function icon(n, cls) { return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + P[n] + '"/></svg>'; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pill(kind, text) { var ic = { ok: "check", warn: "alert", bad: "block", run: "clock", neutral: "clock", ai: "sparkle" }[kind]; return '<span class="pill ' + kind + '">' + icon(ic) + esc(text) + "</span>"; }
  function inr(n) { var s = Math.round(n).toString(), last = s.slice(-3), rest = s.slice(0, -3); if (rest) last = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last; var dec = (n % 1) ? "." + (n % 1).toFixed(2).slice(2) : ""; return "₹" + last + dec; }
  function greet() { var h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; }
  function conf(v) { var k = v >= 85 ? "high" : v >= 60 ? "mid" : "low", t = v >= 85 ? "High confidence" : v >= 60 ? "Needs confirmation" : "Low confidence"; return '<span class="conf ' + k + '" title="' + t + '"><span class="bar"><i style="width:' + v + '%"></i></span>' + v + "% · " + t + "</span>"; }

  /* ---------- Data ---------- */
  var EXC = [
    { id: "e1", vendor: "Amazon Web Services India", kind: "duplicate", issue: "Possible duplicate invoice", amount: 215995.50, detail: "Invoice AWS-IN-88214 matches AWS-IN-88102 on amount, date and GSTIN. Only the invoice number differs.", suggest: "Keep one, mark the other as duplicate", conf: 94, why: ["Same amount ₹2,15,995.50 on both invoices", "Same invoice date (3 Oct 2026) and billing period", "Same vendor GSTIN 29AAICA4396L1ZH", "Invoice numbers differ by only 112"] },
    { id: "e2", vendor: "Zoho Corporation", kind: "gst", issue: "GSTIN doesn't match vendor record", amount: 48500, detail: "Invoice shows GSTIN 33AAACZ4322M1Z8. Vendor master has 33AAACZ4322M2Z7.", suggest: "Update vendor record to the GSTIN on the invoice", conf: 71, why: ["GSTIN on the invoice is valid on the GST portal", "Vendor master GSTIN was last edited 14 months ago", "The last 6 Zoho invoices carried the new GSTIN"] },
    { id: "e3", vendor: "Google Cloud India", kind: "unusual", issue: "Unusual invoice amount", amount: 182450, detail: "This invoice is 3.1× the vendor's 6-month average of ₹58,900.", suggest: "Confirm with the IT team before posting", conf: 58, why: ["6-month average for this vendor is ₹58,900", "No purchase order covers this amount", "Line items include a new 'Committed use' charge"] },
    { id: "e4", vendor: "ABC Technologies", kind: "costcentre", issue: "Missing cost centre", amount: 76200, suggest: "Operations", conf: 88, why: ["3 of the 4 vendors in this group were previously assigned to Operations", "Same account (IT Services) used by Operations 11 times"] },
    { id: "e5", vendor: "Orion Tech Pvt Ltd", kind: "costcentre", issue: "Missing cost centre", amount: 28400, suggest: "Operations", conf: 90, why: ["Orion Tech bills were coded to Operations 7 times", "Amount is within historical range"] },
    { id: "e6", vendor: "Nova Logistics", kind: "costcentre", issue: "Missing cost centre", amount: 54860, suggest: "Operations", conf: 86, why: ["Logistics vendors default to Operations under your rules", "Previous 4 Nova bills were coded to Operations"] },
    { id: "e7", vendor: "Pulse Media", kind: "costcentre", issue: "Missing cost centre", amount: 123999.99, suggest: "Marketing", conf: 64, why: ["Pulse Media has been coded to Marketing twice and Operations once", "Description mentions 'Q3 campaign'"] }
  ];
  var AGENTS = [
    { id: "invoice-review", name: "Invoice Review Agent", short: "Reviews incoming invoices before posting.", long: "Reviews invoices and identifies anything that needs accountant attention.", caps: ["Extract invoice information", "Validate GST", "Check duplicates", "Suggest account coding", "Compare vendor history", "Identify anomalies"], sources: ["Purchases", "Vendors", "GST", "Accounting", "Historical invoices"], status: "ready", icon: "receipt",
      runs: [{ when: "Today", n: 24, ok: 21, exc: 3 }, { when: "Today", n: 18, ok: 17, exc: 1 }, { when: "Yesterday", n: 42, ok: 39, exc: 3 }],
      perms: { read: ["Invoices", "Vendors", "GST", "Chart of Accounts"], suggest: ["Account coding", "Cost centre", "GST treatment"], execute: [["Create voucher", false], ["Modify invoice", false]], approve: ["Post accounting entry", "Delete document"] }, schedule: "arrives" },
    { id: "ap", name: "AP Agent", short: "Prepares pending accounts payable for payment runs.", long: "Groups due bills, checks approvals and prepares payment batches.", caps: ["List bills due", "Check approvals", "Group by vendor", "Prepare payment batch"], sources: ["Purchases", "Vendors", "Banking"], status: "ready", icon: "cart",
      runs: [{ when: "Yesterday", n: 31, ok: 29, exc: 2 }], perms: { read: ["Invoices", "Vendors", "Bank accounts"], suggest: ["Payment batch", "Due date"], execute: [["Create payment voucher", false]], approve: ["Release payment"] }, schedule: "manual" },
    { id: "reconciliation", name: "Reconciliation Agent", short: "Finds and resolves unmatched bank transactions.", long: "Matches bank transactions to vouchers and explains the ones that do not match.", caps: ["Match transactions", "Identify exceptions", "Suggest corrections"], sources: ["Banking", "Purchases", "Sales"], status: "ready", icon: "bank",
      runs: [{ when: "10 min ago", n: 142, ok: 130, exc: 12 }, { when: "Yesterday", n: 96, ok: 94, exc: 2 }], perms: { read: ["Bank statements", "Vouchers", "Vendors", "Customers"], suggest: ["Match", "Split", "Bank charge entry"], execute: [["Mark as matched", true], ["Create bank charge entry", false]], approve: ["Post adjustment entry"] }, schedule: "morning" },
    { id: "gst", name: "GST Agent", short: "Checks GST records and identifies mismatches.", long: "Validates GSTINs, tax rates and input credit eligibility across purchases.", caps: ["Validate GSTIN", "Check tax rates", "Flag ineligible ITC", "Compare with GSTR-2B"], sources: ["GST", "Purchases", "Vendors"], status: "running", icon: "gst",
      runs: [{ when: "Running", n: 186, ok: 0, exc: 0 }, { when: "Yesterday", n: 210, ok: 204, exc: 6 }], perms: { read: ["GST", "Invoices", "Vendors"], suggest: ["GST treatment", "ITC eligibility"], execute: [["Update vendor GSTIN", false]], approve: ["Reverse ITC"] }, schedule: "monday" },
    { id: "month-end", name: "Month-End Agent", short: "Checks whether your books are ready for month-end closing.", long: "Runs the close checklist and tells you what is still incomplete.", caps: ["Check unposted documents", "Check unreconciled items", "Check pending GST", "Prepare close summary"], sources: ["Accounting", "Banking", "GST", "Purchases", "Sales"], status: "ready", icon: "cal",
      runs: [{ when: "30 Sep", n: 12, ok: 9, exc: 3 }], perms: { read: ["All modules"], suggest: ["Close checklist", "Accrual entries"], execute: [["Lock period", false]], approve: ["Post accrual entry", "Lock period"] }, schedule: "manual" }
  ];
  var RUNS = [
    { id: "r1", agent: "invoice-review", name: "Invoice Review Agent", status: "running", desc: "Processing 24 invoices", total: 24, done: 18, started: "4:32 PM", pct: 82,
      timeline: [["ok", "Invoice uploaded", "4:32 PM"], ["ok", "Vendor identified", "4:33 PM"], ["ok", "GST verified", "4:33 PM"], ["ok", "Duplicate check completed", "4:33 PM"], ["ok", "Account suggested", "4:34 PM"], ["run", "Waiting for review", ""]] },
    { id: "r2", agent: "gst", name: "GST Agent", status: "running", desc: "Checking 186 transactions", total: 186, done: 101, started: "4:10 PM", pct: 54,
      timeline: [["ok", "GSTR-2B fetched", "4:10 PM"], ["ok", "Vendors matched", "4:12 PM"], ["run", "Comparing tax amounts", ""], ["todo", "Flag ineligible ITC", ""], ["todo", "Prepare summary", ""]] },
    { id: "r3", agent: "reconciliation", name: "Bank Reconciliation", status: "attention", desc: "Completed 10 minutes ago", total: 142, done: 142, started: "3:48 PM", pct: 100, reviewed: 142, exc: 12,
      timeline: [["ok", "Statement imported", "3:48 PM"], ["ok", "130 transactions matched", "3:52 PM"], ["warn", "12 exceptions found", "3:55 PM"], ["user", "Waiting for your decision", ""]] },
    { id: "r4", agent: "invoice-review", name: "Invoice Review Agent", status: "completed", desc: "Completed at 2:15 PM", total: 18, done: 18, started: "2:02 PM", pct: 100, reviewed: 18, exc: 1,
      timeline: [["ok", "18 invoices reviewed", "2:10 PM"], ["ok", "17 approved by you", "2:15 PM"], ["ok", "1 exception resolved", "2:15 PM"]] },
    { id: "r5", agent: "ap", name: "AP Agent", status: "completed", desc: "Completed yesterday, 6:40 PM", total: 31, done: 31, started: "6:20 PM", pct: 100, reviewed: 31, exc: 2,
      timeline: [["ok", "31 bills due listed", "6:22 PM"], ["ok", "Payment batch prepared", "6:35 PM"], ["ok", "Batch released by you", "6:40 PM"]] }
  ];
  var CHATS = [
    { id: "c1", em: "🧾", title: "Review AWS invoices — 24 invoices", when: "Today", pinned: true, script: "review" },
    { id: "c2", em: "🔍", title: "Find duplicate bills — 3 found", when: "Today", script: "duplicates" },
    { id: "c3", em: "🧾", title: "GST reconciliation — Sept", when: "Today", script: "gst" },
    { id: "c4", em: "🏦", title: "Bank reconciliation — July", when: "Yesterday", script: "reconcile" },
    { id: "c5", em: "📊", title: "Explain increase in expenses", when: "Yesterday", script: "expenses" },
    { id: "c6", em: "🧾", title: "Review pending AP invoices", when: "Yesterday", script: "ap" },
    { id: "c7", em: "📅", title: "Month-end closing — Sept", when: "Last week", script: "monthend" }
  ];
  var KNOW = {
    Company: [["Company profile", COMPANY, "ok"], ["Accounting period", "FY 2026-27 · Apr–Mar", "ok"], ["Currency", "INR (₹)", "ok"], ["Tax configuration", "GST regular · Karnataka HQ", "ok"]],
    Accounting: [["Chart of Accounts", "142 ledgers", "ok"], ["Accounting rules", "18 rules", "ok"], ["Cost centres", "6 centres", "ok"], ["Vendor rules", "24 rules", "ok"]],
    Data: [["Purchases", "connected · synced 4 min ago", "ok"], ["Sales", "connected · synced 4 min ago", "ok"], ["Banking", "connected · 2 accounts", "ok"], ["GST", "connected · GSTR-2B Sept", "ok"], ["Inventory", "not connected", "off"]],
    "Historical context": [["Previous invoices", "3,412 documents", "ok"], ["Previous coding decisions", "2,980 decisions", "ok"], ["Vendor history", "96 vendors", "ok"]]
  };

  /* ---------- Scripted Neo responses ---------- */
  function readyCount() { return 27; }
  var SCRIPTS = {
    review: { match: /review|invoice|today/i, steps: [
      { say: "Looking at the invoices uploaded today…", wait: 900 },
      { say: "I found 32 invoices. Running GST, duplicate and coding checks.", wait: 1400 },
      { result: "invoice", say: "I've completed the initial checks and grouped the exceptions for you. 27 are ready to post. 4 need your review and 1 looks like a duplicate." } ] },
    duplicates: { match: /duplicate/i, steps: [
      { say: "Checking all open bills for duplicates…", wait: 1200 },
      { result: "duplicates", say: "I compared 86 open bills by amount, date, GSTIN and invoice number. 3 pairs are near-certain duplicates." } ] },
    reconcile: { match: /reconcil|bank|unmatched/i, steps: [
      { say: "Matching bank transactions to vouchers…", wait: 1300 },
      { result: "reconcile", say: "142 transactions reviewed. 130 matched automatically. 12 need a decision, mostly bank charges and partial payments." } ] },
    gst: { match: /gst/i, steps: [
      { say: "Comparing your purchase register with GSTR-2B for September…", wait: 1300 },
      { result: "gst", say: "186 transactions checked. 6 have mismatches, 1 vendor GSTIN differs from your vendor record." } ] },
    ap: { match: /\bap\b|payable|pending bills|due/i, steps: [
      { say: "Pulling bills due in the next 7 days…", wait: 1000 },
      { result: "ap", say: "31 bills worth ₹14,82,300 are due this week. 29 are approved. 2 are waiting for approval from Priya R." } ] },
    monthend: { match: /month.?end|clos/i, steps: [
      { say: "Running the September close checklist…", wait: 1200 },
      { result: "monthend", say: "9 of 12 checks pass. 3 are still open: 12 unreconciled bank lines, 5 unposted invoices and GST ITC reversal for 2 vendors." } ] },
    expenses: { match: /expense|increase|why/i, steps: [
      { say: "Comparing September expenses with August…", wait: 1200 },
      { result: "expenses", say: "Expenses rose by ₹6,42,000 (18%). Almost all of it is in two accounts: Cloud Infrastructure and Marketing." } ] },
    attention: { match: /attention|need/i, steps: [
      { say: "Gathering everything that needs your decision…", wait: 900 },
      { result: "attention", say: "7 items need your decision. 4 are the same problem, a missing cost centre, so you can fix them together." } ] },
    fallback: { steps: [
      { say: "I can help with that. Let me check your books…", wait: 1000 },
      { result: "attention", say: "Here is what needs your attention right now. Tell me which one to start with, or pick a task from the home screen." } ] }
  };
  function pickScript(q) { for (var k in SCRIPTS) if (SCRIPTS[k].match && SCRIPTS[k].match.test(q)) return k; return "fallback"; }
  var RESULTS = {
    invoice: { title: "Invoice Review", status: ["ok", "Completed"], sum: "32 invoices reviewed", tally: [["ok", 27, "Ready to post"], ["warn", 4, "Need your review"], ["bad", 1, "Possible duplicate"]], actions: [["primary", "Review 4 exceptions", "#/attention"], ["", "Approve 27 invoices", "approve"]], why: { account: "Cloud Infrastructure", conf: 92, lines: ["Same vendor used this account 18 times", "Similar invoices used the same account", "Amount is within historical range"] } },
    duplicates: { title: "Duplicate check", status: ["ok", "Completed"], sum: "86 bills compared", tally: [["bad", 3, "Certain duplicates"], ["warn", 2, "Possible duplicates"], ["ok", 81, "Unique"]], actions: [["primary", "Review 3 duplicates", "#/attention"], ["", "Keep all", "toast:Nothing was changed."]] },
    reconcile: { title: "Bank Reconciliation", status: ["ok", "Completed"], sum: "142 transactions reviewed", tally: [["ok", 130, "Matched"], ["warn", 12, "Need a decision"], ["run", 0, "Processing"]], actions: [["primary", "Review 12 exceptions", "#/runs/r3"], ["", "Confirm 130 matches", "approve130"]] },
    gst: { title: "GST check — September", status: ["ok", "Completed"], sum: "186 transactions checked", tally: [["ok", 179, "Matched GSTR-2B"], ["warn", 6, "Amount mismatch"], ["bad", 1, "GSTIN mismatch"]], actions: [["primary", "Review 7 GST issues", "#/attention"], ["", "Open GST module", "../inbox/"]] },
    ap: { title: "Accounts payable — this week", status: ["ok", "Prepared"], sum: "31 bills due · ₹14,82,300", tally: [["ok", 29, "Approved"], ["warn", 2, "Awaiting approval"], ["run", 0, "Paid"]], actions: [["primary", "Prepare payment batch (29)", "toast:Payment batch prepared. Release it from Banking."], ["", "Remind Priya R.", "toast:Reminder sent to Priya R."]] },
    monthend: { title: "September close", status: ["warn", "3 items open"], sum: "12 checks run", tally: [["ok", 9, "Passed"], ["warn", 3, "Open"], ["bad", 0, "Blocked"]], actions: [["primary", "Work through 3 open items", "#/attention"], ["", "Run Month-End Agent", "#/agents/month-end"]] },
    expenses: { title: "Expense change — Sept vs Aug", status: ["ok", "Explained"], sum: "+₹6,42,000 (18%)", tally: [["warn", "₹4.1L", "Cloud Infrastructure"], ["warn", "₹2.0L", "Marketing"], ["ok", "₹0.3L", "All other accounts"]], actions: [["primary", "See the 6 invoices behind it", "#/attention"], ["", "Ask a follow-up", "focus"]] },
    attention: { title: "Needs your attention", status: ["warn", "7 items"], sum: "4 issue types", tally: [["bad", 1, "Duplicate"], ["warn", 5, "Need review"], ["warn", 1, "GST mismatch"]], actions: [["primary", "Review all 7", "#/attention"], ["", "Fix 4 cost centres together", "#/attention"]] }
  };

  /* ---------- State ---------- */
  var S = {
    chats: CHATS.map(function (c) { return Object.assign({ messages: [], work: null }, c); }),
    agents: AGENTS, runs: RUNS, exc: EXC.slice(), resolved: {}, approved: false,
    explain: true, agentPick: "Auto", files: [], navOpen: false, workSheet: false, hiMenu: null
  };
  var E = null; /* embedded context when run inside the app (expanded floating Neo): {nav, screen, hash, onChat, onScreen} */
  function chat(id) { return S.chats.filter(function (c) { return c.id === id; })[0]; }
  function agent(id) { return S.agents.filter(function (a) { return a.id === id; })[0]; }
  function run(id) { return S.runs.filter(function (r) { return r.id === id; })[0]; }
  function openExc() { return S.exc.filter(function (e) { return !S.resolved[e.id]; }); }

  /* ---------- Router ---------- */
  var app = document.getElementById("app");
  function route() {
    var h = (E ? E.hash : location.hash).replace(/^#/, "") || "/", q = {};
    var qi = h.indexOf("?"); if (qi > -1) { h.slice(qi + 1).split("&").forEach(function (p) { var kv = p.split("="); q[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || ""); }); h = h.slice(0, qi); }
    return { path: h, parts: h.split("/").filter(Boolean), q: q };
  }
  function go(h) { if (E) { E.hash = h.replace(/^#/, ""); render(); } else location.hash = h; }
  function viewFor(r) {
    var p = r.parts;
    if (!p.length) return Home();
    if (p[0] === "chat") return Chat(p[1], r.q);
    if (p[0] === "attention") return Attention();
    if (p[0] === "agents" && p[1] === "new") return CreateAgent();
    if (p[0] === "agents" && p[1] && p[2] === "permissions") return Permissions(p[1]);
    if (p[0] === "agents" && p[1] && p[2] === "automation") return Automation(p[1]);
    if (p[0] === "agents" && p[1]) return AgentDetail(p[1]);
    if (p[0] === "agents") return Agents();
    if (p[0] === "runs" && p[1]) return RunDetail(p[1]);
    if (p[0] === "runs") return Runs(r.q.tab || "running");
    if (p[0] === "knowledge") return Knowledge();
    if (p[0] === "settings") return Settings();
    return Home();
  }
  function render() {
    if (E) return renderEmbedded();
    /* The Neo home is the chat workspace (same screen as the expanded floating Neo): resume the open chat, else a new one. */
    if (!route().parts.length) { var act = NeoChat.active(); history.replaceState(null, "", "#/chat/" + (act != null ? act : "new")); }
    var r = route(); S.navOpen = false; closeMenus();
    var p = r.parts, view = viewFor(r);
    var isChat = p[0] === "chat";
    app.innerHTML = Shell(view, r, isChat);
    bind(r);
    if (isChat) afterChat(p[1], r.q);
    document.title = "Neo · AI Accountant";
    var sc = app.querySelector(".main .scroll"); if (sc) sc.scrollTop = 0;
  }

  /* Embedded in the app: same nav and screens, rendered in place. Chat is not a screen here: the floating chat instance shows it. */
  function renderEmbedded() {
    var r = route(), p = r.parts; S.navOpen = false; closeMenus();
    if (!p.length) { E.hash = "/chat/" + (NeoChat.active() != null ? NeoChat.active() : "new"); r = route(); p = r.parts; }
    E.nav.innerHTML = NavHTML(r);
    if (p[0] === "chat") { E.onScreen(false); E.onChat(p[1] || "new", r.q.q); return; }
    E.screen.innerHTML = '<main class="main" id="main"><div class="scroll">' + viewFor(r) + "</div></main>";
    E.onScreen(true); bind(r);
    var sc = E.screen.querySelector(".scroll"); if (sc) sc.scrollTop = 0;
  }

  /* ---------- Shell ---------- */
  function NavHTML(r) {
    var p = r.parts[0] || "";
    function act(k) { return p === k ? " active" : ""; }
    var excN = openExc().length, runN = S.runs.filter(function (x) { return x.status === "running"; }).length;
    var item = function (href, ic, label, on, badge) { return '<li><a href="' + href + '" class="' + (on ? "active" : "") + '"' + (on ? ' aria-current="page"' : "") + ">" + icon(ic, "sm") + '<span class="txt">' + label + "</span>" + (badge || "") + "</a></li>"; };
    return '<nav class="neonav" id="neonav" aria-label="Neo">' +
      '<button class="new" data-go="#/chat/new">' + icon("plus") + "New chat</button>" +
      '<div class="group"><ul>' +
      item("#/agents", "bot", "Agents", p === "agents") +
      item("#/runs?tab=running", "clock", "Activity", p === "runs" || p === "attention", excN ? '<span class="count warn">' + excN + "</span>" : "") +
      item("#/knowledge", "book", "Knowledge", p === "knowledge") +
      "</ul></div>" + RecentGroup(r) +
      '<div class="foot"><a href="#/settings" class="' + act("settings") + '">' + icon("settings", "sm") + "Settings</a></div></nav>";
  }
  function Shell(view, r, isChat) {
    var nav = NavHTML(r);
    var modules = [["Dashboard", "grid", "../inbox/"], ["Inbox", "inbox", "../inbox/", '<span class="tag">NEW</span>'], ["Purchases", "cart", "../inbox/"], ["Sales", "tag", "../inbox/"], ["Banking", "bank", "../inbox/"], ["Accounting", "layers", "../inbox/", '<span class="chev">' + icon("chevR") + "</span>"], ["Inventory", "box", "../inbox/"], null, ["GST", "gst", "../inbox/"], ["Sync Management", "refresh", "../inbox/"]];
    var modnav = '<nav class="modnav" aria-label="Modules"><div class="items">' + modules.map(function (m) { return m ? '<a href="' + m[2] + '" data-label="' + m[0] + '">' + icon(m[1]) + "<span>" + m[0] + "</span>" + (m[3] || "") + "</a>" : "<hr>"; }).join("") + '<hr><a href="#/" class="active" aria-current="page" data-label="Neo">' + icon("sparkle") + '<span>Neo</span><span class="tag">NEW</span></a></div><button class="collapse" id="modCollapse" title="Collapse sidebar" aria-label="Collapse sidebar">' + icon("collapse") + "</button></nav>";
    return '<div class="app">' + TopNav() + '<div class="frame">' + modnav + nav + '<main class="main" id="main">' + (isChat ? view : '<div class="scroll">' + view + "</div>") + "</main></div></div>" + '<div id="overlay"></div>';
  }
  function RecentGroup(r) {
    return '<div class="group recent" id="recentGroup"><h2>Recent</h2><ul>' +
      NeoChat.history().slice(0, 8).map(function (c) { return '<li><a href="#/chat/' + c.id + '" class="' + (r.parts[0] === "chat" && String(NeoChat.active()) === String(c.id) ? "active" : "") + '"><span class="txt">' + esc(c.title) + "</span></a></li>"; }).join("") + "</ul></div>";
  }
  function TopNav() {
    return '<header class="topnav"><div class="brand"><button class="menu-btn tn-link" id="menuBtn" aria-label="Open Neo navigation">' + icon("menu") + '</button><a href="../inbox/" aria-label="AI Accountant home"><img src="../images/logo.png" alt="AI Accountant" width="121" height="24"></a></div>' +
      '<div class="right"><button class="tn-btn hide-sm" aria-label="Switch company" title="' + COMPANY + '"><span class="co">S</span>' + COMPANY + icon("chevD", "sm") + '</button><button class="tn-btn hide-sm" aria-label="Sync to Tally">' + icon("refresh", "sm") + 'Sync<span class="dot"></span></button><span class="tn-sep hide-sm"></span>' +
      '<button class="tn-link tn-neo" id="askNeo" aria-label="Ask Neo" aria-current="page" title="You are in Neo. Ctrl J focuses the composer."><span class="mark">' + icon("sparkle", "sm") + '</span>Ask Neo<kbd>Ctrl J</kbd></button>' +
      '<button class="tn-link hide-sm">' + icon("bookOpen") + 'Guide</button><button class="tn-link hide-sm" style="width:32px;padding:0;justify-content:center;border-radius:50%" title="What\'s new" aria-label="What\'s new">' + icon("monitor") + '</button><button class="tn-avatar" aria-label="Profile menu" title="soundar.r@aiaccountant.com">SR</button></div></header>';
  }

  /* ---------- HOME ---------- */
  var SUGGEST = [["Review invoices", "Find invoices that need your attention", "receipt", "Review all invoices uploaded today"], ["Find duplicates", "Identify possible duplicate bills", "copy", "Find duplicate bills"], ["Reconcile banking", "Find unmatched transactions", "bank", "Reconcile unmatched bank transactions"], ["Check GST", "Find GST mismatches and missing information", "gst", "Check GST issues for September"], ["Review AP", "See pending accounts payable work", "cart", "Review pending AP bills due this week"], ["Month-end closing", "Check what is still incomplete", "cal", "What is still open for month-end closing?"]];
  function Composer(opts) {
    var ph = opts.placeholder || "Ask Neo anything…";
    return '<form class="composer" id="composer" data-chat="' + (opts.chat || "") + '">' +
      '<div class="attach-chips" id="chips" style="display:none"></div>' +
      '<div class="field">' + icon("sparkle") + '<label class="sr-only" for="prompt">Ask Neo</label><textarea id="prompt" rows="1" placeholder="' + esc(ph) + '">' + esc(opts.value || "") + "</textarea></div>" +
      '<div class="bar"><input type="file" id="fileIn" multiple accept=".pdf,.jpg,.jpeg,.png" hidden><button type="button" class="chip-btn" id="attachBtn">' + icon("paperclip", "sm") + 'Attach</button>' +
      '<div style="position:relative"><button type="button" class="chip-btn" id="agentBtn" aria-haspopup="menu" aria-expanded="false">' + icon("bot", "sm") + '<span id="agentName">' + esc(S.agentPick === "Auto" ? "Agent: Auto" : S.agentPick) + "</span>" + icon("chevD", "sm") + "</button></div>" +
      '<span class="spacer"></span><label class="toggle"><input type="checkbox" id="explainTg"' + (S.explain ? " checked" : "") + '><span class="track"></span>Explain why</label>' +
      '<button type="submit" class="send" id="sendBtn" aria-label="Send to Neo" disabled>' + icon("send") + "</button></div></form>";
  }
  function Home() {
    var ex = openExc(), top = ex.slice(0, 4), running = S.runs.filter(function (r) { return r.status === "running"; }).length;
    var html = '<div class="page">' +
      '<div class="hero"><div class="orb">' + icon("sparkle", "lg") + '</div><h1>' + greet() + ", " + USER + ' 👋</h1><p>What would you like <em>Neo</em> to help with?</p><p class="sub">Your AI accounting workspace for ' + esc(COMPANY) + "</p>" + Composer({ placeholder: "Ask Neo anything…" }) + "</div>" +
      '<section class="suggest"><p class="kicker" style="text-align:center">Suggested actions</p><div class="grid">' + SUGGEST.map(function (s) { return '<button class="sugg" data-ask="' + esc(s[3]) + '"><span><b>' + s[0] + "</b><span>" + s[1] + "</span></span>" + icon(s[2]) + "</button>"; }).join("") + "</div></section>" +
      '<section class="section"><div class="section-head"><h2>Your work</h2><a href="#/runs">See all activity</a></div><div class="stats">' +
      '<a class="card click stat" href="#/attention"><span class="ico warn">' + icon("alert") + '</span><span><span class="num">' + ex.length + ' items</span><br><span class="lbl">Need your attention</span></span></a>' +
      '<a class="card click stat" href="#/runs?tab=completed"><span class="ico ok">' + icon("check") + '</span><span><span class="num">42</span><br><span class="lbl">Invoices processed today</span></span></a>' +
      '<a class="card click stat" href="#/runs?tab=running"><span class="ico run">' + icon("clock") + '</span><span><span class="num">' + running + ' agents</span><br><span class="lbl">Running now</span></span></a>' +
      '<a class="card click stat" href="#/runs?tab=completed"><span class="ico ai">' + icon("trend") + '</span><span><span class="num">₹18.4L</span><br><span class="lbl">Processed today</span></span></a></div></section>' +
      '<section class="section"><div class="section-head"><div><h2>Needs your attention</h2><p>Neo found a few things that require your decision.</p></div>' + (ex.length ? '<a href="#/attention">Review all ' + ex.length + "</a>" : "") + "</div>" +
      (ex.length ? '<div class="card exc-list">' + top.map(ExcRow).join("") + "</div>" : EmptyState("check", "You're all caught up.", "Neo hasn't found anything that needs your attention.", "")) + "</section>" +
      '<section class="section"><div class="section-head"><div><h2>AI Agents</h2><p>Delegate accounting work to Neo.</p></div><a class="btn sm" href="#/agents/new">' + icon("plus", "sm") + 'Create agent</a></div><div class="agents-grid">' + S.agents.slice(0, 4).map(AgentCard).join("") + "</div></section></div>";
    return html;
  }
  function ExcRow(e) {
    var k = e.kind === "duplicate" ? "bad" : "warn";
    return '<div class="exc"><span class="av">' + esc(e.vendor.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase()) + '</span><div><div class="who">' + esc(e.vendor) + '</div><div class="what">' + pill(k, e.issue) + "</div></div>" + '<span class="amt">' + inr(e.amount) + '</span><a class="btn sm" href="#/attention?focus=' + e.id + '">Review ' + esc(e.vendor.split(" ")[0]) + " issue</a></div>";
  }
  function AgentCard(a) {
    return '<div class="card agent-card"><div class="top"><span class="ico">' + icon(a.icon) + '</span><div><h3><a href="#/agents/' + a.id + '">' + esc(a.name) + '</a></h3><p class="desc">' + esc(a.short) + "</p></div></div>" +
      '<ul class="caps">' + a.caps.slice(0, 4).map(function (c) { return "<li>" + icon("check") + esc(c) + "</li>"; }).join("") + (a.caps.length > 4 ? "<li>+" + (a.caps.length - 4) + " more</li>" : "") + "</ul>" +
      '<div class="foot">' + (a.status === "running" ? pill("run", "Running") : pill("ok", "Ready")) + '<div class="btn-row"><a class="btn sm" href="#/agents/' + a.id + '">Open agent</a><button class="btn sm primary" data-run="' + a.id + '">' + icon("play", "sm") + "Run " + esc(a.name) + "</button></div></div></div>";
  }
  function EmptyState(ic, h, p, cta) { return '<div class="card empty-state"><div class="ico">' + icon(ic) + "</div><h3>" + h + "</h3><p>" + p + "</p>" + cta + "</div>"; }

  /* ---------- CHAT (shared Neo chat module, full view) ---------- */
  var chatInst = null;
  function Chat() { return '<div id="ncMount" style="display:flex;flex:1;min-height:0"></div>'; }
  function afterChat(id, q) {
    var host = document.getElementById("ncMount"); if (!host) return;
    if (chatInst) { try { chatInst.stop(); } catch (e) {} }
    var restore = id && id !== "new";
    if (id === "new" && !q.q) NeoChat.setActive(null);
    chatInst = NeoChat.mount(host, { mode: "full", sidebar: false, restore: !!restore,
      onHistory: function () { var g = document.getElementById("recentGroup"); if (g) g.outerHTML = RecentGroup(route()); },
      onExpand: function () { var st = NeoChat.state(); st.open = true; st.expanded = false; st.navHeld = false; try { sessionStorage.setItem("neoChat", JSON.stringify(st)); } catch (e) {} location.href = "../inbox/"; },
      onClose: function () { go("#/"); } });
    if (restore) { var n = +id; if (!isNaN(n)) chatInst.open(n); }
    if (q.q) chatInst.start(q.q);
    var want = NeoChat.active(); if (want != null && location.hash !== "#/chat/" + want && !q.q) history.replaceState(null, "", "#/chat/" + want);
  }
  function ask(q) { go("#/chat/new?q=" + encodeURIComponent(q)); }
  function titleFor(q) { return ["💬", q]; }

  /* ---------- ATTENTION / EXCEPTIONS ---------- */
  function Attention() {
    var ex = openExc(), cc = ex.filter(function (e) { return e.kind === "costcentre"; }), others = ex.filter(function (e) { return e.kind !== "costcentre"; });
    var html = '<div class="page wide"><div class="crumb"><a href="#/">Neo</a>' + icon("chevR", "sm") + '<span>Needs your attention</span></div><div class="page-head"><div><h1>Needs your attention</h1><p class="sub">' + (ex.length ? ex.length + " items need your decision. Neo grouped similar problems so you can resolve them together." : "Nothing is waiting on you.") + '</p></div><div class="actions"><a class="btn" href="#/runs?tab=completed">' + icon("clock", "sm") + "See resolved items</a></div></div>";
    if (!ex.length) return html + EmptyState("check", "You're all caught up.", "Neo hasn't found anything that needs your attention.", '<a class="btn primary" href="#/">Back to Neo home</a>') + "</div>";
    if (cc.length) {
      html += '<div class="card group-card"><div class="gh"><h3>' + pill("warn", cc.length + " invoices missing cost centre") + "</h3>" + pill("ai", "Grouped by Neo") + '</div><div class="gb"><p>' + cc.length + " invoices are missing a cost centre. Neo suggests a cost centre for each one based on vendor history.</p>" +
        '<div class="ai-box"><div class="lbl">' + icon("sparkle", "sm") + "AI suggestion</div><div style=\"display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap\"><span>Suggested for 3 of " + cc.length + ": <b>Operations</b></span>" + conf(88) + '</div><p style="margin-top:4px;color:var(--ink-2)">3 of these vendors were previously assigned to Operations. Pulse Media is less certain, so it is marked for your confirmation.</p></div>' +
        '<table class="table"><thead><tr><th>Vendor</th><th class="num">Amount</th><th>Suggested cost centre</th><th>Confidence</th><th></th></tr></thead><tbody>' + cc.map(function (e) { return '<tr id="' + e.id + '"><td><b>' + esc(e.vendor) + '</b></td><td class="num">' + inr(e.amount) + "</td><td>" + esc(e.suggest) + "</td><td>" + conf(e.conf) + ' <button class="why" data-whyex="' + e.id + '" aria-expanded="false">Why?</button><div class="pop" id="pop-' + e.id + '" hidden><b>Why ' + esc(e.suggest) + '?</b><ul style="padding-left:16px;list-style:disc;margin-top:6px">' + e.why.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + '</ul></div></td><td><div class="btn-row"><button class="btn sm" data-apply="' + e.id + '">Apply ' + esc(e.suggest) + '</button><button class="btn sm ghost" data-skip="' + e.id + '">Skip</button></div></td></tr>'; }).join("") + "</tbody></table>" +
        '<div class="btn-row"><button class="btn primary" data-applyall="cc">Apply suggested cost centre to all ' + cc.length + '</button><button class="btn" data-go="#/attention">Review individually</button></div></div></div>';
    }
    others.forEach(function (e) {
      var k = e.kind === "duplicate" ? "bad" : "warn";
      html += '<div class="card group-card" id="' + e.id + '"><div class="gh"><h3>' + pill(k, e.issue) + "<span>" + esc(e.vendor) + "</span></h3><span class=\"amt\"><b>" + inr(e.amount) + '</b></span></div><div class="gb"><p>' + esc(e.detail || "") + "</p>" +
        '<div class="ai-box"><div class="lbl">' + icon("sparkle", "sm") + 'AI suggestion</div><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><span><b>' + esc(e.suggest) + "</b></span>" + conf(e.conf) + '</div><button class="why" data-why="' + e.id + '" aria-expanded="false">Why this suggestion? ' + icon("chevD", "sm") + '</button><ul id="why-' + e.id + '" hidden>' + e.why.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ul></div>" +
        '<div class="btn-row">' + (e.kind === "duplicate" ? '<button class="btn primary" data-resolve="' + e.id + '" data-msg="AWS-IN-88214 marked as duplicate. AWS-IN-88102 kept.">Mark AWS-IN-88214 as duplicate</button><button class="btn" data-resolve="' + e.id + '" data-msg="Both AWS invoices kept.">Keep both</button>' : e.kind === "gst" ? '<button class="btn primary" data-resolve="' + e.id + '" data-msg="Vendor GSTIN updated for Zoho Corporation.">Update vendor GSTIN</button><button class="btn" data-resolve="' + e.id + '" data-msg="Invoice sent back to Arjun M. for correction.">Send back for correction</button>' : '<button class="btn primary" data-resolve="' + e.id + '" data-msg="Google Cloud invoice approved for posting.">Approve this amount</button><button class="btn" data-resolve="' + e.id + '" data-msg="Query sent to the IT team.">Ask IT team to confirm</button>') + '<a class="btn ghost" href="../inbox/">Open document</a></div></div></div>';
    });
    return html + "</div>";
  }

  /* ---------- AGENTS ---------- */
  function Agents() {
    return '<div class="page"><div class="page-head"><div><h1>Agents</h1><p class="sub">Neo agents do accounting work for you. Anything that changes your books waits for your approval.</p></div><div class="actions"><a class="btn primary" href="#/agents/new">' + icon("plus", "sm") + 'New agent</a></div></div>' +
      '<div class="card list">' + S.agents.map(function (a) {
        return '<div class="arow"><a class="ainfo" href="#/agents/' + a.id + '"><span class="ico">' + icon(a.icon) + "</span><span><b>" + esc(a.name) + "</b><small>" + esc(a.short) + '</small></span></a><span class="ast">' + (a.status === "running" ? "Running" : "Ready") + '</span><button class="btn sm" data-run="' + a.id + '">Run</button></div>';
      }).join("") + "</div></div>";
  }
  function AgentDetail(id) {
    var a = agent(id); if (!a) return Agents();
    var running = S.runs.filter(function (r) { return r.agent === id && r.status === "running"; })[0];
    return '<div class="page"><div class="crumb"><a href="#/agents">' + icon("arrowL", "sm") + ' Agents</a></div><div class="page-head"><div><h1>' + esc(a.name) + '</h1><p class="sub">' + esc(a.short) + '</p><div style="margin-top:8px;display:flex;gap:8px;align-items:center">' + (a.status === "running" ? pill("run", "Running") : pill("ok", "Ready")) + '<span style="font-size:12px;color:var(--ink-3)">Runs ' + schedLabel(a.schedule) + '</span></div></div><div class="actions"><a class="btn" href="#/agents/' + id + '/permissions">' + icon("shield", "sm") + 'Permissions</a><button class="btn primary" data-run="' + id + '">' + icon("play", "sm") + "Run now</button></div></div>" +
      (running ? '<div class="card pad" id="runbox" style="margin-bottom:14px"><div class="section-head" style="margin-bottom:8px"><h2>Current run</h2><a href="#/runs/' + running.id + '">Open run</a></div><p style="color:var(--ink-2);font-size:13px">' + esc(running.desc) + '</p><div class="progress" style="margin:10px 0 6px"><i style="width:' + running.pct + '%"></i></div><p style="font-size:12px;color:var(--ink-2)">' + running.done + " / " + running.total + " · " + running.pct + "%</p></div>" : "") +
      '<div class="card pad" style="margin-bottom:14px"><div class="section-head"><h2>What it does</h2></div><ul class="list-check">' + a.caps.map(function (c) { return "<li>" + icon("check") + esc(c) + "</li>"; }).join("") + '</ul><p style="font-size:13px;color:var(--ink-2);margin-top:12px">Anything that changes your books waits for your approval. To change what this agent does, ask Neo in chat.</p></div>' +
      '<div class="card pad"><div class="section-head"><h2>Recent runs</h2><a href="#/runs">All activity</a></div><ul class="runs-mini">' + (a.runs.length ? "" : '<li style="display:block;color:var(--ink-2)">No runs yet.</li>') + a.runs.map(function (r) { return '<li><span class="when">' + esc(r.when) + "</span><span><b>" + r.n + '</b> invoices</span><span class="pills">' + (r.ok ? pill("ok", r.ok + " approved") : "") + (r.exc ? pill("warn", r.exc + " exception" + (r.exc > 1 ? "s" : "")) : r.ok ? "" : pill("run", "In progress")) + "</span></li>"; }).join("") + "</ul></div></div>";
  }
  function suggestName(goal) {
    var g = goal.toLowerCase(); if (!g.trim()) return "";
    var topic = /gst/.test(g) ? "GST" : /bank|reconcil/.test(g) ? "Reconciliation" : /vendor|supplier/.test(g) ? "Vendor" : /invoice|bill/.test(g) ? "Invoice" : /expense/.test(g) ? "Expense" : /month.?end|clos/.test(g) ? "Month-End" : /payable|\bap\b/.test(g) ? "AP" : goal.replace(/^(review|check|find|reconcile|identify|watch)\s+/i, "").split(/\s+/)[0] || "Custom";
    var task = /duplicate/.test(g) ? "Duplicate" : /unusual|anomal|variance/.test(g) ? "Anomaly" : /review/.test(g) ? "Review" : /reconcil|match/.test(g) ? "Match" : /check|validate|verify/.test(g) ? "Check" : "";
    var scope = /\bit\b/.test(g) ? "IT " : /marketing/.test(g) ? "Marketing " : /logistic/.test(g) ? "Logistics " : "";
    return (scope + topic + (task ? " " + task : "") + " Agent").replace(/\s+/g, " ");
  }
  function schedLabel(s) { return { manual: "manually", arrives: "when a new invoice arrives", morning: "every morning", monday: "every Monday", monthend: "on the last working day of the month" }[s]; }
  function Trust() { return '<div class="trust"><span class="step read">READ</span><span class="arr">' + icon("arrowR", "sm") + '</span><span class="step suggest">SUGGEST</span><span class="arr">' + icon("arrowR", "sm") + '</span><span class="step execute">EXECUTE</span><span class="arr">' + icon("arrowR", "sm") + '</span><span class="step approve">APPROVE</span></div>'; }
  function Permissions(id) {
    var a = agent(id); if (!a) return Agents(); var p = a.perms;
    function li(items, kind) { return items.map(function (x) { var on = Array.isArray(x) ? x[1] : true, label = Array.isArray(x) ? x[0] : x; return '<li class="' + (kind === "appr" ? "appr" : on ? "on" : "off") + '">' + icon(kind === "appr" ? "user" : on ? "check" : "x") + esc(label) + (kind === "appr" ? ' <span class="pill ai" style="margin-left:auto">' + icon("shield") + "You approve</span>" : kind === "exec" && !on ? ' <span style="margin-left:auto;font-size:12px;color:var(--ink-3)">Not allowed</span>' : "") + "</li>"; }).join(""); }
    return '<div class="page wide"><div class="crumb"><a href="#/">Neo</a>' + icon("chevR", "sm") + '<a href="#/agents">Agents</a>' + icon("chevR", "sm") + '<a href="#/agents/' + id + '">' + esc(a.name) + "</a>" + icon("chevR", "sm") + '<span>Permissions</span></div><div class="page-head"><div><h1>What can this agent do?</h1><p class="sub">' + esc(a.name) + " · Nothing with a high impact on your books happens without your explicit confirmation.</p></div></div>" +
      '<div class="card pad" style="margin-bottom:14px"><div class="section-head"><h2>Trust model</h2></div>' + Trust() + "</div>" +
      '<div class="perm-grid"><div class="card perm"><h3>' + icon("eye", "sm") + "Can read</h3><ul>" + li(p.read) + '</ul></div><div class="card perm"><h3>' + icon("sparkle", "sm") + "Can suggest</h3><ul>" + li(p.suggest) + '</ul></div><div class="card perm"><h3>' + icon("zap", "sm") + "Can execute</h3><ul>" + li(p.execute, "exec") + '</ul></div><div class="card perm"><h3>' + icon("shield", "sm") + "Requires your approval</h3><ul>" + li(p.approve, "appr") + "</ul></div></div>" +
      '<div class="note" style="margin-top:14px">' + icon("alert", "sm") + '<span>Destructive actions such as deleting documents or posting entries can never be executed by an agent on its own. Every one of them goes through Preview → Confirm → Execute → Audit.</span></div>' +
      '<div class="btn-row" style="margin-top:18px"><button class="btn" data-toast="Permission changes are not part of this prototype.">' + icon("edit", "sm") + 'Edit permissions</button><a class="btn ghost" href="#/agents/' + id + '">Back to ' + esc(a.name) + "</a></div></div>";
  }
  function CreateAgent() {
    return '<div class="page"><div class="crumb"><a href="#/">Neo</a>' + icon("chevR", "sm") + '<a href="#/agents">Agents</a>' + icon("chevR", "sm") + '<span>Create agent</span></div><div class="page-head"><div><h1>Create an AI Agent</h1><p class="sub">Describe the job in plain language. Neo turns it into an agent you control.</p></div></div>' +
      '<form class="form" id="agentForm"><div><label class="lbl" for="agentGoal">What should this agent do?</label><textarea id="agentGoal" placeholder="Example: Review invoices from IT vendors and identify unusual charges." required></textarea><p class="help">Neo fills in the instructions below from this description. You can change any of them.</p></div>' +
      '<div><label class="lbl" for="agentName2">Agent name</label><input type="text" id="agentName2" placeholder="Neo suggests a name from your description" maxlength="48"><p class="help">Shown in the Agents list and in every run and audit entry.</p></div>' +
      '<div><span class="lbl">Agent instructions</span><p class="help" style="margin:0 0 8px">When reviewing invoices:</p><div class="checks">' + ["Check vendor history", "Check duplicate invoices", "Check GST", "Check amount variance", "Suggest account coding", "Suggest cost centre"].map(function (c, i) { return '<label><input type="checkbox" name="instr"' + (i < 4 ? " checked" : "") + ">" + c + "</label>"; }).join("") + "</div></div>" +
      '<div><label class="lbl" for="confRange">If confidence is below</label><div class="range-row"><input type="range" id="confRange" min="50" max="99" value="90"><output for="confRange" id="confOut">90%</output></div><p class="help">Then: <b>“Ask me before making changes.”</b> Above this level the agent may act within the permissions you grant below.</p></div>' +
      '<div><span class="lbl">Data access</span><div class="checks">' + [["Purchases", true], ["Vendors", true], ["GST", true], ["Banking", false], ["Sales", false], ["Inventory", false]].map(function (c) { return '<label><input type="checkbox" name="data"' + (c[1] ? " checked" : "") + ">" + c[0] + "</label>"; }).join("") + "</div></div>" +
      '<div><span class="lbl">Permissions</span>' + Trust() + '<div class="checks" style="margin-top:10px">' + [["Read", true, true], ["Suggest", true, true], ["Execute low-risk actions", false, false], ["Approve on my behalf", false, true]].map(function (c) { return '<label><input type="checkbox" name="perm"' + (c[1] ? " checked" : "") + (c[2] ? " disabled" : "") + ">" + c[0] + (c[2] && !c[1] ? ' <span style="margin-left:auto;font-size:12px;color:var(--ink-3)">Never</span>' : c[2] ? ' <span style="margin-left:auto;font-size:12px;color:var(--ink-3)">Always</span>' : "") + "</label>"; }).join("") + "</div></div>" +
      '<div><span class="lbl">Run when</span><div class="radios">' + [["manual", "Manually", true], ["arrives", "When a new invoice arrives"], ["morning", "Every morning"], ["monday", "Every Monday"]].map(function (r) { return '<label><input type="radio" name="when" value="' + r[0] + '"' + (r[2] ? " checked" : "") + ">" + r[1] + "</label>"; }).join("") + "</div></div>" +
      '<div class="sticky-foot"><a class="btn" href="#/agents">Cancel</a><button class="btn primary" type="submit">' + icon("plus", "sm") + "Create agent</button></div></form></div>";
  }
  function Automation(id) {
    var a = agent(id); if (!a) return Agents();
    var steps = { "invoice-review": ["New invoice", "Review invoice", "Validate GST", "Check duplicate", "Suggest account", "Send exceptions to accountant"], reconciliation: ["Bank statement imported", "Match transactions", "Identify exceptions", "Suggest corrections", "Send exceptions to accountant"], gst: ["GSTR-2B available", "Validate GSTINs", "Compare tax amounts", "Flag ineligible ITC", "Send summary to accountant"], ap: ["Bill due in 7 days", "Check approval", "Group by vendor", "Prepare payment batch", "Ask accountant to release"], "month-end": ["Month ends", "Check unposted documents", "Check unreconciled items", "Check pending GST", "Send close checklist to accountant"] }[id];
    return '<div class="page"><div class="crumb"><a href="#/">Neo</a>' + icon("chevR", "sm") + '<a href="#/agents">Agents</a>' + icon("chevR", "sm") + '<a href="#/agents/' + id + '">' + esc(a.name) + "</a>" + icon("chevR", "sm") + '<span>Automation</span></div><div class="page-head"><div><h1>Automate ' + esc(a.name) + '</h1><p class="sub">Let this agent run on its own. Exceptions always come back to you.</p></div></div>' +
      '<form class="form" id="autoForm"><div class="card pad"><span class="lbl">Run when</span><div class="radios">' + [["manual", "Manually"], ["arrives", "When a new invoice arrives"], ["morning", "Every morning at 8:00"], ["monday", "Every Monday at 8:00"]].map(function (r) { return '<label><input type="radio" name="when" value="' + r[0] + '"' + (a.schedule === r[0] ? " checked" : "") + ">" + r[1] + "</label>"; }).join("") + "</div></div>" +
      '<div class="card pad"><span class="lbl">Workflow</span><div class="flow">' + steps.map(function (s, i) { return (i ? '<span class="arr">' + icon("arrowR", "sm") + "</span>" : "") + '<span class="node ' + (i === 0 ? "" : i === steps.length - 1 ? "end" : "ai") + '">' + esc(s) + "</span>"; }).join("") + '</div><p class="help" style="margin-top:10px">Steps in blue are done by Neo. The last step always hands control back to you.</p></div>' +
      '<div class="note">' + icon("info", "sm") + "<span>Automated runs follow the same permissions as manual runs. Posting, deleting and GSTIN changes still wait for your approval.</span></div>" +
      '<div class="sticky-foot"><a class="btn" href="#/agents/' + id + '">Cancel</a><button class="btn primary" type="submit">Save automation</button></div></form></div>';
  }

  /* ---------- RUNS ---------- */
  function Runs(tab) {
    var tabs = [["running", "Running"], ["attention", "Needs attention"], ["completed", "Completed"]];
    var list = S.runs.filter(function (r) { return tab === "completed" ? r.status !== "running" : r.status === tab; });
    return '<div class="page wide"><div class="page-head"><div><h1>Activity</h1><p class="sub">What your agents did and what is waiting on you.</p></div></div>' +
      '<div class="btn-row" style="margin-bottom:14px" role="tablist">' + tabs.map(function (t) { return '<a class="btn sm ' + (t[0] === tab ? "primary" : "") + '" role="tab" aria-selected="' + (t[0] === tab) + '" href="#/runs?tab=' + t[0] + '">' + t[1] + "</a>"; }).join("") + "</div>" +
      (list.length ? '<div class="card">' + list.map(function (r) {
        var k = r.status === "running" ? "run" : r.status === "attention" ? "warn" : "ok";
        return '<button class="run-row" data-go="#/runs/' + r.id + '"><span class="ico ' + k + '">' + icon(k === "run" ? "clock" : k === "warn" ? "alert" : "check") + "</span><span><b>" + esc(r.name) + "</b><small>" + esc(r.desc) + (r.reviewed ? " · " + r.reviewed + " reviewed · " + r.exc + " exceptions" : "") + '</small></span><span>' + (r.status === "running" ? '<span class="progress"><i style="width:' + r.pct + '%"></i></span><span class="pct">' + r.done + " / " + r.total + " · " + r.pct + "%</span>" : pill(k, r.status === "attention" ? r.exc + " need your decision" : "Completed")) + "</span>" + icon("chevR") + "</button>";
      }).join("") + "</div>" : EmptyState("clock", tab === "running" ? "No agents are currently running." : "Nothing here yet.", tab === "running" ? "Start one from the Agents page or ask Neo for a task." : "Completed runs will show up here.", '<a class="btn primary" href="#/agents">Explore agents</a>')) + "</div>";
  }
  function RunDetail(id) {
    var r = run(id); if (!r) return Runs("running");
    var k = r.status === "running" ? "run" : r.status === "attention" ? "warn" : "ok";
    return '<div class="page wide"><div class="crumb"><a href="#/">Neo</a>' + icon("chevR", "sm") + '<a href="#/runs">Neo activity</a>' + icon("chevR", "sm") + "<span>" + esc(r.name) + '</span></div><div class="page-head"><div><h1>' + esc(r.name) + '</h1><p class="sub">Started ' + r.started + " · " + esc(r.desc) + '</p></div><div class="actions">' + (r.status === "running" ? '<button class="btn" data-toast="Run paused. Resume it any time from Neo activity.">' + icon("pause", "sm") + "Pause run</button>" : "") + '<a class="btn primary" href="' + (r.status === "running" ? "#/chat/c1" : "#/attention") + '">View results</a></div></div>' +
      '<div class="detail-grid"><div style="display:flex;flex-direction:column;gap:14px"><div class="card pad"><div class="kv" style="grid-template-columns:repeat(3,1fr)"><div><dt>Status</dt><dd style="text-align:left;margin-top:4px">' + pill(k, r.status === "running" ? "Processing" : r.status === "attention" ? "Needs your decision" : "Completed") + "</dd></div><div><dt>Progress</dt><dd style=\"text-align:left\">" + r.done + " / " + r.total + "</dd></div><div><dt>Agent</dt><dd style=\"text-align:left\"><a href=\"#/agents/" + r.agent + '" style="color:var(--primary)">' + esc(agent(r.agent).name) + '</a></dd></div></div><div class="progress" style="margin-top:14px"><i style="width:' + r.pct + '%"></i></div></div>' +
      (r.exc ? '<div class="card pad"><div class="section-head"><h2>Results</h2></div><div class="tally"><div><span class="n">' + (r.reviewed - r.exc) + "</span>" + pill("ok", "Matched / approved") + '</div><div><span class="n">' + r.exc + "</span>" + pill("warn", "Exceptions") + '</div><div><span class="n">0</span>' + pill("bad", "Blocked") + '</div></div><div class="btn-row" style="margin-top:12px"><a class="btn primary" href="#/attention">Review ' + r.exc + ' exceptions</a></div></div>' : "") +
      '</div><div class="card pad"><div class="section-head"><h2>Activity timeline</h2><span class="pill neutral">' + icon("clock") + 'Audit trail</span></div><ul class="timeline">' + r.timeline.map(TL).join("") + "</ul></div></div></div>";
  }

  /* ---------- KNOWLEDGE / SETTINGS ---------- */
  function Knowledge() {
    return '<div class="page wide"><div class="page-head"><div><h1>Knowledge</h1><p class="sub">What Neo can read when it works on your books.</p></div><div class="actions"><button class="btn" data-toast="Sources refreshed 4 minutes ago.">' + icon("refresh", "sm") + 'Refresh connections</button></div></div><div class="know-grid">' + Object.keys(KNOW).map(function (g) { return '<div class="card pad know"><div class="section-head"><h2>' + g + "</h2></div><ul>" + KNOW[g].map(function (k) { return "<li><span><b>" + k[0] + '</b><br><span class="meta">' + esc(k[1]) + "</span></span>" + (k[2] === "ok" ? pill("ok", "Connected") : pill("neutral", "Not connected")) + "</li>"; }).join("") + "</ul></div>"; }).join("") + "</div></div>";
  }
  function Settings() {
    return '<div class="page"><div class="page-head"><div><h1>Settings</h1><p class="sub">How Neo works for you.</p></div></div><div class="card pad" style="display:flex;flex-direction:column;gap:14px">' +
      '<label class="toggle" style="justify-content:space-between"><span>Show “why” explanations with every suggestion</span><input type="checkbox" id="setExplain"' + (S.explain ? " checked" : "") + '><span class="track"></span></label>' +
      '<label class="toggle" style="justify-content:space-between"><span>Ask before any bulk action, even at high confidence</span><input type="checkbox" checked disabled><span class="track"></span></label>' +
      '<div class="note">' + icon("shield", "sm") + "<span>Approval for posting, deleting and GSTIN changes cannot be switched off.</span></div></div></div>";
  }

  /* ---------- Overlays ---------- */
  function ov() { var o = document.getElementById("overlay"); if (!o) { o = document.createElement("div"); o.id = "overlay"; o.className = "neo-scope"; document.body.appendChild(o); } return o; }
  function toast(msg) { var o = ov(); var t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.innerHTML = icon("check") + esc(msg); o.appendChild(t); setTimeout(function () { t.remove(); }, 3200); }
  function modal(html) { var o = ov(); o.innerHTML = '<div class="modal-bg" id="modalBg"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle">' + html + "</div></div>"; var f = o.querySelector(".modal button, .modal a"); if (f) f.focus(); }
  function closeModal() { var m = document.getElementById("modalBg"); if (m) m.remove(); }
  function closeMenus() { document.querySelectorAll(".menu").forEach(function (m) { m.remove(); }); document.querySelectorAll(".pop").forEach(function (p) { p.hidden = true; }); }
  function approveModal(n, total, exc) {
    modal('<div class="mh"><h2 id="mTitle">Neo is ready to post ' + n + ' invoices</h2><p>Review the summary. Nothing posts until you confirm.</p></div><div class="mb"><dl class="kv"><dt>Total</dt><dd class="big">' + total + "</dd><dt>Invoices</dt><dd>" + n + "</dd><dt>Exceptions (left out)</dt><dd>" + exc + '</dd><dt>Posting to</dt><dd>Purchases · Karnataka HQ</dd></dl></div><div class="mf"><button class="btn" id="mCancel">Cancel</button><button class="btn primary" id="mOk">Approve &amp; post ' + n + " invoices</button></div>");
    document.getElementById("mCancel").onclick = closeModal;
    document.getElementById("mOk").onclick = function () { closeModal(); S.approved = true; toast(n + " invoices posted. Audit trail updated."); var r = route(); if (r.parts[0] === "chat" && chat(r.parts[1])) paint(chat(r.parts[1])); };
  }
  function runAgent(id) {
    var a = agent(id);
    modal('<div class="mh"><h2 id="mTitle">Run ' + esc(a.name) + '</h2><p>' + esc(a.long) + '</p></div><div class="mb"><dl class="kv"><dt>Will read</dt><dd>' + a.sources.join(", ") + "</dd><dt>Will execute on its own</dt><dd>" + (a.perms.execute.filter(function (x) { return x[1]; }).map(function (x) { return x[0]; }).join(", ") || "Nothing") + '</dd><dt>Will ask you first</dt><dd>' + a.perms.approve.join(", ") + '</dd></dl></div><div class="mf"><button class="btn" id="mCancel">Cancel</button><button class="btn primary" id="mOk">' + icon("play", "sm") + "Start run</button></div>");
    document.getElementById("mCancel").onclick = closeModal;
    document.getElementById("mOk").onclick = function () {
      closeModal();
      var nr = { id: "r" + Date.now(), agent: id, name: a.name, status: "running", desc: "Starting…", total: 24, done: 0, started: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), pct: 0, timeline: [["ok", "Run started by " + USER, "now"], ["run", "Reading " + a.sources[0], ""], ["todo", "Analysing", ""], ["todo", "Preparing results", ""]] };
      S.runs.unshift(nr); a.status = "running"; go("#/runs/" + nr.id);
      var ticks = 0, iv = setInterval(function () {
        ticks++; nr.pct = Math.min(100, ticks * 20); nr.done = Math.round(nr.total * nr.pct / 100); nr.desc = "Processing " + nr.total + " invoices";
        if (ticks === 2) nr.timeline = [["ok", "Run started by " + USER, "now"], ["ok", "Read " + a.sources.join(", "), ""], ["run", "Analysing", ""], ["todo", "Preparing results", ""]];
        if (ticks >= 5) { clearInterval(iv); nr.status = "attention"; nr.desc = "Completed just now"; nr.reviewed = nr.total; nr.exc = 3; nr.timeline = [["ok", "Run started by " + USER, "now"], ["ok", "Read " + a.sources.join(", "), ""], ["ok", "21 ready to post", ""], ["warn", "3 exceptions found", ""], ["user", "Waiting for your decision", ""]]; a.status = "ready"; toast(a.name + " finished: 21 ready, 3 need your review."); }
        if (route().parts[1] === nr.id || route().parts[1] === id) render();
      }, 900);
    };
  }


  function focusComposer() { var p = document.getElementById("prompt"); if (p) { p.focus(); p.scrollIntoView({ block: "center" }); } else if (chatInst) chatInst.focus(); else go("#/chat/new"); }
  /* ---------- Side panel module (not rendered inside the workspace; the v1 panel lives on the app pages) ---------- */
  var PANEL = { open: false, chat: null, files: [] }; /* legacy, unused: the shared neo-chat.js module renders chat now */
  var PTASKS = [["Work the Inbox with me", "Read, check and prepare every new bill", "inbox", "Review all invoices uploaded today."], ["What needs my attention?", "Waiting, blocked and duplicate documents", "alert", "What needs my attention?"], ["Find duplicates", "Certain matches, with Delete or Keep", "copy", "Find duplicate bills."]];
  function openPanel(o) { PANEL.open = o; var p = document.getElementById("neoPanel"), t = document.getElementById("neoTab"), b = document.getElementById("askNeo"); if (!p) return; p.classList.toggle("open", o); p.setAttribute("aria-hidden", String(!o)); if (t) t.hidden = o; if (b) b.setAttribute("aria-pressed", String(o)); paintPanel(); if (o) { var ta = p.querySelector("textarea"); if (ta) ta.focus(); } }
  function paintPanel() {
    var p = document.getElementById("neoPanel"); if (!p) return;
    var c = PANEL.chat, title = c ? c.title : "Neo";
    var thread = c ? c.messages.map(Msg).join("") : '<div class="welcome"><div class="orb">' + icon("sparkle", "lg") + "</div><h3>" + greet() + ", " + USER + ".</h3><p>" + openExc().length + " items are waiting for you. Pick a task below or ask me anything.</p></div>" + '<div class="tasks">' + PTASKS.map(function (t) { return '<button class="task" data-pask="' + esc(t[3]) + '"><span class="ti">' + icon(t[2]) + "</span><span><b>" + t[0] + "</b><span>" + t[1] + "</span></span></button>"; }).join("") + "</div>";
    var oldTa = p.querySelector("textarea"), keep = oldTa ? oldTa.value : "";
    p.innerHTML = "<header><span class=\"nmark\">" + icon("sparkle", "sm") + "</span><h2>" + esc(title) + '</h2><span class="beta">Beta</span>' + (c ? '<a class="ib" href="#/chat/' + c.id + '" title="Open in full-screen workspace" aria-label="Open in workspace" data-pexpand>' + icon("expand", "sm") + "</a>" : "") + '<button class="ib" data-pnew title="New chat" aria-label="New chat">' + icon("plus", "sm") + '</button><button class="ib" data-pclose title="Close Neo" aria-label="Close Neo">' + icon("x", "sm") + "</button></header>" +
      '<div class="pthread" id="pthread"><p class="disclaimer">Neo prepares the work and shows you exactly what will post. Nothing is approved or sent until you say so.</p>' + thread + "</div>" +
      '<div class="pfoot"><form class="pcomposer" id="pcomposer"><div class="attach-chips" id="pchips" style="display:none"></div><label class="sr-only" for="pprompt">Ask Neo</label><textarea id="pprompt" rows="1" placeholder="Ask Neo anything">' + esc(keep) + '</textarea><div class="tools"><input type="file" id="pfile" multiple accept=".pdf,.jpg,.jpeg,.png" hidden><button type="button" class="tb" data-pattach title="Attach invoices or bills" aria-label="Attach files">' + icon("paperclip", "sm") + '</button><button type="button" class="tb" data-ppaste title="Paste from clipboard" aria-label="Paste from clipboard">' + icon("clip", "sm") + '</button><button type="submit" class="psend" id="psend" aria-label="Send" disabled>' + icon("send", "sm") + '</button></div></form><p class="pnote">Neo can make mistakes. Review extracted details before approving.</p></div>';
    var th = document.getElementById("pthread"); th.scrollTop = th.scrollHeight;
    var ta = document.getElementById("pprompt"), send = document.getElementById("psend"), chips = document.getElementById("pchips"), fi = document.getElementById("pfile");
    function sync() { send.disabled = !ta.value.trim() && !PANEL.files.length; ta.style.height = "auto"; ta.style.height = Math.min(140, ta.scrollHeight) + "px"; }
    function renderChips() { chips.innerHTML = PANEL.files.map(function (f, i) { return '<span class="attach-chip"><b>' + esc(f.name) + "</b><small>" + (f.size < 1048576 ? Math.max(1, Math.round(f.size / 1024)) + " KB" : (f.size / 1048576).toFixed(1) + " MB") + '</small><button type="button" data-prm="' + i + '" aria-label="Remove ' + esc(f.name) + '">' + icon("x", "sm") + "</button></span>"; }).join(""); chips.style.display = PANEL.files.length ? "flex" : "none"; if (PANEL.files.length && !ta.value) ta.value = "Process " + (PANEL.files.length === 1 ? "this file" : "these " + PANEL.files.length + " files") + ": " + PANEL.files.map(function (f) { return f.name; }).join(", "); sync(); }
    ta.addEventListener("input", sync); sync(); if (PANEL.files.length) renderChips();
    ta.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); document.getElementById("pcomposer").requestSubmit(); } });
    document.getElementById("pcomposer").onsubmit = function (e) { e.preventDefault(); var q = ta.value.trim(); if (!q) return; PANEL.files = []; panelAsk(q); };
    p.querySelector("[data-pattach]").onclick = function () { fi.value = ""; fi.click(); };
    fi.onchange = function () { Array.prototype.forEach.call(fi.files, function (f) { PANEL.files.push({ name: f.name, size: f.size }); }); renderChips(); };
    chips.onclick = function (e) { var b = e.target.closest("[data-prm]"); if (b) { PANEL.files.splice(+b.dataset.prm, 1); ta.value = ""; renderChips(); } };
    p.querySelector("[data-ppaste]").onclick = function () { if (navigator.clipboard && navigator.clipboard.readText) navigator.clipboard.readText().then(function (t) { if (t) { ta.value = (ta.value ? ta.value + " " : "") + t.trim(); sync(); } ta.focus(); }).catch(function () { ta.focus(); }); else ta.focus(); };
  }
  function panelAsk(q) {
    var c = PANEL.chat;
    if (!c) { var t = titleFor(q); c = { id: "c" + Date.now(), em: t[0], title: t[1], when: "Today", script: pickScript(q), messages: [], work: null }; S.chats.unshift(c); PANEL.chat = c; }
    c.messages.push({ role: "user", text: q }); if (c.messages.length > 2) c.script = pickScript(q);
    replay(c);
  }
  /* ---------- Events ---------- */
  function bind(r) {
    if (!E && !window.__modInit) { window.__modInit = 1; document.body.classList.add("mod-collapsed"); }
    var mc = document.getElementById("modCollapse"); if (mc) mc.onclick = function () { document.body.classList.toggle("mod-collapsed"); };
    var mb = document.getElementById("menuBtn"); if (mb) mb.onclick = function () { var n = document.getElementById("neonav"); if (n) n.classList.toggle("open"); };
    var ta = document.getElementById("prompt"), form = document.getElementById("composer"), send = document.getElementById("sendBtn");
    if (form) {
      function sync() { send.disabled = !ta.value.trim() && !S.files.length; ta.style.height = "auto"; ta.style.height = Math.min(160, ta.scrollHeight) + "px"; }
      ta.addEventListener("input", sync); sync();
      ta.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } });
      form.onsubmit = function (e) { e.preventDefault(); var q = ta.value.trim(); if (S.files.length) q = (q ? q + " " : "") + "(" + S.files.length + " file" + (S.files.length > 1 ? "s" : "") + " attached: " + S.files.map(function (f) { return f.name; }).join(", ") + ")"; if (!q) return; S.files = []; ta.value = ""; sync(); ask(q); };
      var fi = document.getElementById("fileIn"), chips = document.getElementById("chips");
      document.getElementById("attachBtn").onclick = function () { fi.value = ""; fi.click(); };
      fi.onchange = function () { Array.prototype.forEach.call(fi.files, function (f) { S.files.push({ name: f.name, size: f.size }); }); renderChips(); };
      function renderChips() { chips.innerHTML = S.files.map(function (f, i) { return '<span class="attach-chip"><b>' + esc(f.name) + "</b><small>" + (f.size < 1048576 ? Math.max(1, Math.round(f.size / 1024)) + " KB" : (f.size / 1048576).toFixed(1) + " MB") + '</small><button type="button" data-rm="' + i + '" aria-label="Remove ' + esc(f.name) + '">' + icon("x", "sm") + "</button></span>"; }).join(""); chips.style.display = S.files.length ? "flex" : "none"; if (S.files.length && !ta.value) ta.placeholder = "Tell Neo what to do with " + (S.files.length === 1 ? "this file" : "these files") + "…"; sync(); }
      chips.onclick = function (e) { var b = e.target.closest("[data-rm]"); if (b) { S.files.splice(+b.dataset.rm, 1); renderChips(); } };
      document.getElementById("explainTg").onchange = function (e) { S.explain = e.target.checked; };
      document.getElementById("agentBtn").onclick = function (e) {
        e.stopPropagation(); if (document.querySelector(".menu")) { closeMenus(); return; }
        var m = document.createElement("div"); m.className = "menu"; m.style.top = "36px"; m.style.left = "0"; m.setAttribute("role", "menu");
        m.innerHTML = ["Auto"].concat(S.agents.map(function (a) { return a.name; })).map(function (n) { return '<button role="menuitem" class="' + (S.agentPick === n ? "on" : "") + '">' + (n === "Auto" ? icon("sparkle", "sm") + "Auto (Neo picks the agent)" : icon("bot", "sm") + esc(n)) + "</button>"; }).join("");
        m.onclick = function (ev) { var b = ev.target.closest("button"); if (!b) return; S.agentPick = b.textContent.indexOf("Auto") === 0 ? "Auto" : b.textContent.trim(); document.getElementById("agentName").textContent = S.agentPick === "Auto" ? "Agent: Auto" : S.agentPick; closeMenus(); };
        e.currentTarget.parentElement.appendChild(m); e.currentTarget.setAttribute("aria-expanded", "true");
      };
    }
    var goalEl = document.getElementById("agentGoal"), nameEl = document.getElementById("agentName2");
    if (goalEl && nameEl) { goalEl.addEventListener("input", function () { if (!nameEl.dataset.touched) nameEl.value = suggestName(goalEl.value); }); nameEl.addEventListener("input", function () { nameEl.dataset.touched = "1"; }); }
    var rg = document.getElementById("confRange"); if (rg) rg.oninput = function () { document.getElementById("confOut").textContent = rg.value + "%"; };
    var af = document.getElementById("agentForm"); if (af) af.onsubmit = function (e) { e.preventDefault(); var goal = document.getElementById("agentGoal").value.trim(); if (!goal) { document.getElementById("agentGoal").focus(); return; } var name = (document.getElementById("agentName2").value.trim() || suggestName(goal)); var data = Array.prototype.map.call(af.querySelectorAll("input[name=data]:checked"), function (i) { return i.parentElement.textContent.trim(); }); S.agents.push({ id: "custom-" + Date.now(), name: name, short: goal, long: goal, caps: Array.prototype.map.call(af.querySelectorAll("input[name=instr]:checked"), function (i) { return i.parentElement.textContent.trim(); }), sources: data, status: "ready", icon: "bot", runs: [], perms: { read: data, suggest: ["Account coding", "Cost centre"], execute: [["Create voucher", false]], approve: ["Post accounting entry", "Delete document"] }, schedule: af.querySelector("input[name=when]:checked").value }); toast(name + " created. It will ask you before making changes below " + rg.value + "% confidence."); go("#/agents/" + S.agents[S.agents.length - 1].id); };
    var auf = document.getElementById("autoForm"); if (auf) auf.onsubmit = function (e) { e.preventDefault(); var a = agent(r.parts[1]); a.schedule = auf.querySelector("input[name=when]:checked").value; toast("Automation saved. " + a.name + " runs " + schedLabel(a.schedule) + "."); go("#/agents/" + a.id); };
    var se = document.getElementById("setExplain"); if (se) se.onchange = function (e) { S.explain = e.target.checked; toast(S.explain ? "Neo will explain every suggestion." : "Explanations hidden. You can still open “Why?” on any suggestion."); };
    var wt = document.getElementById("workToggle"), wc = document.getElementById("workClose"); if (wt) wt.onclick = function () { S.workSheet = true; document.getElementById("work").classList.add("sheet"); }; if (wc) wc.onclick = function () { S.workSheet = false; document.getElementById("work").classList.remove("sheet"); };
  }
  document.addEventListener("click", function (e) {
    var t = e.target;
    var ln = E && t.closest("a[href^='#/']"); if (ln && (E.nav.contains(ln) || E.screen.contains(ln))) { e.preventDefault(); go(ln.getAttribute("href")); return; }
    if (t.closest("#askNeo")) { focusComposer(); return; }
    if (t.closest("[data-pclose]")) { openPanel(false); return; }
    if (t.closest("[data-pnew]")) { PANEL.chat = null; PANEL.files = []; paintPanel(); return; }
    if (t.closest("[data-pexpand]")) { openPanel(false); return; }
    var pa = t.closest("[data-pask]"); if (pa) { panelAsk(pa.dataset.pask); return; }
    var g = t.closest("[data-go]"); if (g) { go(g.dataset.go); return; }
    var a = t.closest("[data-ask]"); if (a) { ask(a.dataset.ask); return; }
    var ru = t.closest("[data-run]"); if (ru) { runAgent(ru.dataset.run); return; }
    var ts = t.closest("[data-toast]"); if (ts) { toast(ts.dataset.toast); return; }
    var w = t.closest("[data-why]"); if (w) { var ul = document.getElementById("why-" + w.dataset.why); if (ul) { ul.hidden = !ul.hidden; w.setAttribute("aria-expanded", String(!ul.hidden)); } return; }
    var wx = t.closest("[data-whyex]"); if (wx) { var pop = document.getElementById("pop-" + wx.dataset.whyex); var was = pop.hidden; closeMenus(); pop.hidden = !was; wx.setAttribute("aria-expanded", String(was)); return; }
    var act = t.closest("[data-act]"); if (act) { var v = act.dataset.act; if (v === "approve") approveModal(27, "₹18,42,650", 5); else if (v === "approve130") { toast("130 matches confirmed and posted to Banking."); } else if (v.indexOf("toast:") === 0) toast(v.slice(6)); else if (v === "focus") { var p = document.getElementById("prompt"); if (p) p.focus(); } else if (v.indexOf("#") === 0) { if (act.closest("#neoPanel")) openPanel(false); go(v); } else location.href = v; return; }
    var ap = t.closest("[data-apply]"); if (ap) { var ex = S.exc.filter(function (x) { return x.id === ap.dataset.apply; })[0]; S.resolved[ex.id] = true; toast(ex.suggest + " applied to " + ex.vendor + "."); render(); return; }
    var sk = t.closest("[data-skip]"); if (sk) { S.resolved[sk.dataset.skip] = true; toast("Skipped. You can find it later under Completed."); render(); return; }
    var aa = t.closest("[data-applyall]"); if (aa) { var n = 0; S.exc.forEach(function (x) { if (x.kind === "costcentre" && !S.resolved[x.id]) { S.resolved[x.id] = true; n++; } }); toast("Cost centre applied to " + n + " invoices. Pulse Media was set to Marketing as suggested."); render(); return; }
    var rs = t.closest("[data-resolve]"); if (rs) { S.resolved[rs.dataset.resolve] = true; toast(rs.dataset.msg); render(); return; }
    var fb = t.closest("[data-fb]"); if (fb) { fb.parentElement.querySelectorAll("button").forEach(function (b) { b.classList.remove("on"); }); fb.classList.add("on"); toast(fb.dataset.fb === "up" ? "Thanks. Neo will keep doing this." : "Thanks. Neo will ask more before acting next time."); return; }
    var op = t.closest("[data-open]"); if (op && !t.closest("[data-more]")) { go("#/chat/" + op.dataset.open); return; }
    var mo = t.closest("[data-more]"); if (mo) { e.stopPropagation(); closeMenus(); var c = chat(mo.dataset.more); var m = document.createElement("div"); m.className = "menu"; m.style.right = "8px"; m.style.top = "30px"; m.setAttribute("role", "menu"); m.innerHTML = '<button data-cm="continue">' + icon("arrowR", "sm") + 'Continue conversation</button><button data-cm="rename">' + icon("edit", "sm") + 'Rename</button><button data-cm="pin">' + icon("pin", "sm") + (c.pinned ? "Unpin" : "Pin") + '</button><button data-cm="archive">' + icon("archive", "sm") + 'Archive</button><button data-cm="delete" style="color:var(--bad)">' + icon("trash", "sm") + "Delete</button>";
      m.onclick = function (ev) { var b = ev.target.closest("[data-cm]"); if (!b) return; var k = b.dataset.cm; closeMenus(); if (k === "continue") go("#/chat/" + c.id); else if (k === "pin") { c.pinned = !c.pinned; render(); } else if (k === "rename") { var nn = prompt("Rename conversation", c.title); if (nn) { c.title = nn.trim(); render(); } } else if (k === "archive") { S.chats = S.chats.filter(function (x) { return x !== c; }); toast("Conversation archived."); if (route().parts[1] === c.id) go("#/chat/new"); else render(); } else if (k === "delete") { if (confirm("Delete “" + c.title + "”? This cannot be undone.")) { S.chats = S.chats.filter(function (x) { return x !== c; }); toast("Conversation deleted."); if (route().parts[1] === c.id) go("#/chat/new"); else render(); } } };
      mo.parentElement.appendChild(m); return; }
    if (!t.closest(".menu") && !t.closest(".pop")) closeMenus();
    if (t.id === "modalBg") closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeModal(); closeMenus(); }
    if (!E && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") { e.preventDefault(); focusComposer(); }
    var op = e.target.closest && e.target.closest("[data-open]"); if (op && e.key === "Enter") go("#/chat/" + op.dataset.open);
  });
  window.addEventListener("hashchange", function () { if (!E && app) render(); });
  (NeoChat.state().newAgents || []).forEach(function (a) { if (!S.agents.some(function (x) { return x.id === a.id; })) S.agents.push(a); });
  window.NeoWorkspace = {
    attach: function (o) { E = o; E.hash = E.hash || "/chat/new"; render(); },
    detach: function () { E = null; },
    addAgent: function (spec) { if (!S.agents.some(function (a) { return a.id === spec.id; })) S.agents.push(spec); if (E) render(); return spec.id; },
    navigate: function (h) { if (E) go(h); },
    refreshNav: function () { if (E) E.nav.innerHTML = NavHTML(route()); },
    setRoute: function (h) { if (E) { E.hash = h; E.nav.innerHTML = NavHTML(route()); } },
    route: function () { return E ? route() : null }
  };
  if (app) render();
})();
