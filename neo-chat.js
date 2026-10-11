/* Neo chat (v5). One module, two presentations: the floating side panel on product pages (which can expand in
   place into the full Neo workspace) and the full view on the Neo page. Every conversation is stored as a
   transcript in sessionStorage ("neoChat"), so reopening a chat shows exactly what was said, and a half-finished
   automation setup can be resumed. Neo's answers are scripted prototype data keyed by topic (SC below). */
(function () {
  "use strict";
  var SCRIPT = document.currentScript, BASE = (SCRIPT && SCRIPT.src ? SCRIPT.src.replace(/\/neo-chat\.js.*$/, "") : "");
  var STAR = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c.6 4.9 2.9 8.4 10 10-7.1 1.6-9.4 5.1-10 10-.6-4.9-2.9-8.4-10-10 7.1-1.6 9.4-5.1 10-10Z"/></svg>';
  var AV = '<span class="nc-av" aria-hidden="true">' + STAR + "</span>";
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  var STOP = '<svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor" aria-hidden="true"><rect width="12" height="12" rx="2"/></svg>';
  var TICK = '<svg class="nc-tick" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5 10 17.5 19 7"/></svg>';
  var CROSS = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  var WARN = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 6v8M12 18h.01"/></svg>';
  var X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var EXPAND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
  var COLLAPSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 10h6V4M10 14H4v6M20 4l-6 6M4 20l6-6"/></svg>';
  var HISTI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>';
  var PEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
  var PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
  var IC = {
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1Z"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 7v6M12 17h.01"/></svg>',
    dup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
    run: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>'
  };
  var CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';

  /* ---------- prototype data: bills Neo can open in the review panel ---------- */
  var BILLS = {
    sharma: { v: "Sharma Traders", no: "SH/2291", date: "3 Oct 2026", due: "2 Nov 2026", sub: "₹40,847", gst: "₹7,353", tot: "₹48,200", gstin: "33ABCPS1234F1Z5", cat: "Packaging materials", file: "Bill_SH-2291.pdf", kind: "ready", tag: ["Ready", "ok"] },
    patel: { v: "Patel Logistics", no: "PL-0877", date: "3 Oct 2026", due: "18 Oct 2026", sub: "₹95,339", gst: "₹17,161", tot: "₹1,12,500", gstin: "27AAHFP5678K1Z2", cat: "Freight and cartage", file: "Bill_PL-0877.pdf", kind: "ready", tag: ["Ready", "ok"] },
    lotus: { v: "Lotus Packaging", no: "LP/554", date: "2 Oct 2026", due: "1 Nov 2026", sub: "₹35,932", gst: "₹6,468", tot: "₹42,400", gstin: "29AABCL4321M1Z8", cat: "Packaging materials", file: "Bill_LP-554.pdf", kind: "ready", tag: ["Ready", "ok"] },
    anand: { v: "Anand Textiles", no: "AT-3310", date: "1 Oct 2026", due: "31 Oct 2026", sub: "₹73,305", gst: "₹13,195", tot: "₹86,500", gstin: "33AAFCA8765D1Z1", cat: "Raw materials", file: "Bill_AT-3310.pdf", kind: "ready", tag: ["Ready", "ok"] },
    meera: { v: "Meera Stationers", no: "MS/19", date: "1 Oct 2026", due: "16 Oct 2026", sub: "₹5,797", gst: "₹1,043", tot: "₹6,840", gstin: "", cat: "Office supplies", file: "Bill_MS-19.jpg", kind: "gst", tag: ["GST number missing", "warn"] },
    sharmaDup: { v: "Sharma Traders", no: "SH/2291", date: "3 Oct 2026", due: "2 Nov 2026", sub: "₹40,847", gst: "₹7,353", tot: "₹48,200", gstin: "33ABCPS1234F1Z5", cat: "Packaging materials", file: "Bill_SH-2291_copy.pdf", kind: "dup", tag: ["Possible duplicate", "bad"] }
  };
  /* Scripted answers. `match` picks the script from the user's words; `q` is the canonical prompt for seeded chats. */
  var SC = {
    inbox: { match: /inbox|bill|read|review|invoice|attached/i, q: "Work the Inbox with me",
      steps: ["Reading 6 new documents in Inbox", "Extracting vendor, date and amounts", "Checking GST numbers and matching vendors", "Looking for duplicates"],
      text: "I read **6 new bills**. **4 are ready** to approve, **1 needs a check** because the vendor GST number is missing, and **1 looks like a duplicate**. Select a bill to review the extracted details.",
      card: { title: "New bills", aside: "6 in Inbox", bulk: true, rows: [["Sharma Traders", "Bill SH/2291 · 3 Oct", "₹48,200", "sharma"], ["Patel Logistics", "Bill PL-0877 · 3 Oct", "₹1,12,500", "patel"], ["Lotus Packaging", "Bill LP/554 · 2 Oct", "₹42,400", "lotus"], ["Anand Textiles", "Bill AT-3310 · 1 Oct", "₹86,500", "anand"], ["Meera Stationers", "Bill MS/19 · 1 Oct", "₹6,840", "meera"], ["Sharma Traders", "Bill SH/2291 · 3 Oct", "₹48,200", "sharmaDup"]] },
      follow: ["What needs my attention?", "Find duplicates"] },
    attention: { match: /attention|waiting|blocked/i, q: "What needs my attention?",
      steps: ["Checking documents waiting for review", "Finding blocked documents", "Comparing for duplicates"],
      text: "**9 items** need you: **5 are waiting** for your review, **3 are blocked** by missing vendor details, and **1 is a possible duplicate**.",
      card: { title: "Needs attention", aside: "9 items", link: ["Resolve them in Needs attention", "/attention"], rows: [["Waiting for review", "5 documents · oldest 4 days", "5", ["Waiting", "info"]], ["Blocked: no vendor GST number", "Meera Stationers and 2 others", "3", ["Blocked", "warn"]], ["Possible duplicate", "Sharma Traders · SH/2291", "1", ["Check", "bad"]]] },
      follow: ["Work the Inbox with me", "Find duplicates"] },
    dups: { match: /duplicate/i, q: "Find duplicates",
      steps: ["Comparing vendor, bill number and amount", "Matching dates and file contents"],
      text: "I found **2 certain duplicates**. Each pair has the same vendor, bill number and amount. Choose what to do with each.",
      card: { title: "Certain duplicates", aside: "2 pairs", rows: [["Sharma Traders · SH/2291", "Uploaded twice, 3 Oct 10:14 and 10:16", "₹48,200", ["Certain match", "bad"], true], ["Patel Logistics · PL-0871", "Emailed and uploaded, 29 Sep", "₹23,900", ["Certain match", "bad"], true]] },
      follow: ["What needs my attention?", "Work the Inbox with me"] },
    gst: { match: /gst|gstr|\bitc\b/i, q: "Check GST",
      steps: ["Comparing the purchase register with GSTR-2B", "Validating vendor GST numbers", "Checking input credit eligibility"],
      text: "**186 transactions** checked for September. **179 match** GSTR-2B, **6 have amount mismatches** and **1 vendor GST number** differs from your vendor record.",
      card: { title: "GST check · September", aside: "7 issues", link: ["Open the GST Agent", "/agents/gst"], rows: [["Amount mismatch", "6 purchase bills differ from GSTR-2B by ₹12 to ₹480", "6", ["Check", "warn"]], ["GSTIN differs from vendor record", "Zoho Corporation", "1", ["Blocked", "warn"]]] },
      follow: ["What needs my attention?", "Work the Inbox with me"] },
    bank: { match: /reconcil|bank|statement|unmatched/i, q: "Reconcile banking",
      steps: ["Importing the latest bank statement", "Matching transactions to vouchers", "Explaining the ones that did not match"],
      text: "**142 bank transactions** reviewed. **130 matched** your books automatically and **12 need a decision**, mostly bank charges and partial payments.",
      card: { title: "Bank reconciliation · HDFC current account", aside: "12 open", link: ["Decide the 12 open lines", "/runs/r3"], rows: [["Bank charges", "5 lines · no voucher · ₹240 to ₹1,180", "5", ["Suggest entry", "info"]], ["Partial payments", "4 receipts smaller than the invoice", "4", ["Match and split", "warn"]], ["Unknown payee", "3 debits with no matching bill", "3", ["Check", "bad"]]] },
      follow: ["What needs my attention?", "Check GST"] },
    month: { match: /month.?end|clos(e|ing)/i, q: "Month-end closing",
      steps: ["Checking unposted documents", "Checking unreconciled bank lines", "Checking pending GST returns"],
      text: "**9 of 12 close checks** pass for September. **3 are still open**: 12 unreconciled bank lines, 5 unposted invoices and an ITC reversal for 2 vendors.",
      card: { title: "September close", aside: "3 open", link: ["Open the Month-End Agent", "/agents/month-end"], rows: [["Unreconciled bank lines", "12 lines · Reconciliation Agent can clear 9", "12", ["Open", "warn"]], ["Unposted invoices", "5 invoices waiting for your approval", "5", ["Open", "warn"]], ["ITC reversal", "Zoho Corporation and Nova Logistics", "2", ["Needs approval", "info"]]] },
      follow: ["Reconcile banking", "What needs my attention?"] },
    ap: { match: /\bap\b|payable|payment|due/i, q: "Review AP",
      steps: ["Listing bills due in the next 7 days", "Checking approvals", "Grouping by vendor"],
      text: "**31 bills** worth **₹14,82,300** are due this week. **29 are approved** and grouped into a payment batch. **2 are waiting** for approval from Priya R.",
      card: { title: "Accounts payable · this week", aside: "31 bills", link: ["Open the AP Agent", "/agents/ap"], rows: [["Approved and batched", "29 bills · 11 vendors", "₹13,96,800", ["Ready", "ok"]], ["Waiting for approval", "Pulse Media · Orion Tech", "₹85,500", ["Waiting", "info"]]] },
      follow: ["Month-end closing", "What needs my attention?"] },
    generic: { match: /.*/, q: "",
      steps: ["Looking through your books"],
      text: "I'm not sure what to do with that yet. Here is what I can take on right now, or describe a task you'd like me to automate.",
      follow: ["Work the Inbox with me", "What needs my attention?", "Automate a task"] }
  };
  var PICK_ORDER = ["dups", "attention", "gst", "bank", "month", "ap", "inbox"];
  var KIND2SC = { inv: "inbox", ap: "ap", bank: "bank", gst: "gst", month: "month", dups: "dups" };
  var HOME = [["Review invoices", "Find invoices that need your attention", "inbox"], ["Find duplicates", "Identify possible duplicate bills", "dups"], ["Reconcile banking", "Find unmatched transactions", "bank"], ["Check GST", "Find GST mismatches and missing information", "gst"], ["Review AP", "See pending accounts payable work", "ap"], ["Month-end closing", "Check what is still incomplete", "month"]];
  var EXACT = {}; Object.keys(SC).forEach(function (k) { if (SC[k].q) EXACT[SC[k].q] = k; }); HOME.forEach(function (h) { EXACT[h[0]] = h[2]; });
  EXACT["Explain this document"] = "doc"; EXACT["Automate a task"] = "auto";

  /* ---------- page context: the document the user has open (prototype data mirrored from the app's inbox) ---------- */
  var DOCS = {
    "INB-2041": { v: "Dell India Pvt Ltd", f: "Dell India Pvt Ltd · INV-1182.pdf", no: "INV-1182", amt: "₹76,450", due: "11 Jun 2026", cc: "Engineering", type: "Purchase", st: "ready", lines: ["i7 Workstation, 32GB RAM, 1TB SSD (x2) · Fixed Assets - Hardware · ₹64,790", "Onsite warranty extension, 24 months · Repairs & Maintenance · ₹11,660"] },
    "INB-2042": { v: "Amazon Web Services India", f: "AWS-services-may-2026.pdf", no: "AWS-INV-MAY26-0042", amt: "₹2,18,904", due: "6 Jun 2026", type: "Purchase", st: "flag", flags: ["Vendor is not in your vendor master yet", "Cost centre is missing", "Invoice number could not be confirmed"], lines: ["Compute (EC2) · Cloud Services · ₹1,42,300", "Storage (S3, EBS) · Cloud Services · ₹38,450", "Data transfer and misc · Cloud Services · ₹24,960"] },
    "INB-2043": { v: "HDFC Bank", f: "HDFC-50100123456-Apr2026.pdf", type: "Bank statement", st: "bank", amt: "47 transactions", note: "47 transactions from 1 Apr to 30 Apr 2026, opening ₹4,82,310 and closing ₹6,12,482" },
    "INB-2044": { v: "Theta Hotels Pvt Ltd", f: "Theta-Hotels — INV-2214.pdf", no: "INV-2214", amt: "₹4,86,832", due: "11 Jun 2026", type: "Sales", st: "ready", lines: ["Furnace oil, 12 KL · Sales — Petroleum Products · ₹4,10,400", "Delivery and handling · Sales — Freight Recovered · ₹2,200"] },
    "INB-2045": { v: "Nandini Foods LLP", f: "Nandini-Foods — INV-2215.pdf", no: "INV-2215", amt: "₹1,54,816", due: "13 Jun 2026", type: "Sales", st: "flag", flags: ["Customer is not in your customer master yet"], lines: ["Refined sunflower oil, 400 cases · Sales — Edible Oils · ₹1,31,200"] },
    "INB-2046": { v: "Depreciation entry, Q1", f: "Depreciation-adjustment-Q1.pdf", amt: "₹1,84,500", type: "Journal", st: "ready", lines: ["Dr Depreciation — Hardware · ₹1,84,500", "Cr Accumulated Depreciation — Hw · ₹1,84,500"], note: "Quarterly straight-line depreciation on the hardware pool." },
    "INB-2047": { v: "Petty cash reconciliation", f: "Petty-cash-recon-Apr.pdf", amt: "₹18,420", type: "Mixed", st: "ambig", note: "Page 1 has 4 small vendor receipts (fuel, courier, stationery, snacks). Page 2 is a typed adjustment table that balances the petty-cash float." },
    "INB-2048": { v: "Acme Corp Pvt Ltd", f: "Acme-Corp — May-bill.pdf", type: "Purchase", st: "extracting" },
    "INB-2049": { v: "Kappa Technologies", f: "Vendor-Quote-Scan.pdf", type: "Purchase", st: "failed", note: "It is a phone-camera scan: I could read some text but not the line items, GST or total." },
    "INB-2050": { v: "Iota Solutions", f: "Iota-Solutions-Apr.pdf", type: "Purchase", st: "failed", note: "The PDF is password-protected, so I could not open it." },
    "INB-2051": { v: "Dell India Pvt Ltd", f: "Dell India Pvt Ltd · INV-1182 (1).pdf", no: "INV-1182", amt: "₹76,425", type: "Purchase", st: "dup", note: "Same vendor, invoice number and amount as the copy already in Inbox." },
    "INB-2052": { v: "Sigma Packaging Co", f: "Sigma-Pkg-Mar26.pdf", no: "SIG/26/0421", amt: "₹42,100", due: "21 Apr 2026", cc: "Operations", type: "Purchase", st: "dupsoft", note: "It looks like an older bill uploaded again: the due date has passed and the amount matches a bill you already posted." },
    "INB-2053": { v: "Lambda Innovations", f: "Lambda-Innov-Apr.pdf", type: "Purchase", st: "extracting", note: "Extraction is on its second of three tries." },
    "INB-2030": { v: "Zeta Services LLP", f: "Zeta-Services-Apr.pdf", amt: "₹12,600", type: "Purchase", st: "done", note: "Posted as PUR/25-26/030 by Soundar R on 8 Sep." },
    "INB-2031": { v: "Theta Hotels Pvt Ltd", f: "Theta-Hotels — INV-2208.pdf", no: "INV-2208", amt: "₹2,98,628", type: "Sales", st: "done", note: "Posted as SAL/25-26/0208 by Soundar R on 6 Sep." },
    "INB-2020": { v: "Wrong attachment", f: "Wrong-attachment.pdf", type: "", st: "deleted", note: "Deleted by Soundar R on 7 Sep. Nothing was posted." },
    "CONV-001": { v: "Pegasus Logistics Pvt Ltd", f: "Pegasus-Logistics — INV-7702.pdf", no: "PL-7702", amt: "₹88,500", due: "10 Jun 2026", cc: "Operations", type: "Purchase", st: "ready", note: "This looks like a cost you re-charge to a customer, so you can convert it to a sales invoice after posting." },
    "CONV-002": { v: "Re-bill to Rentyx Stores", f: "Rebill-Rentyx-Mar.pdf", amt: "₹41,200", type: "Journal", st: "ready", note: "Warehouse rent paid on behalf of Rentyx Stores Pvt Ltd for March 2026; it should also be raised as a sales invoice on Rentyx." },
    "CONV-003": { v: "Internal adjustment", f: "Adjustment-rebill-Mar.pdf", amt: "₹41,200", type: "Purchase", st: "dup", note: "The same ₹41,200 was already posted as journal voucher JV/25-26/074 on 12 May." },
    "CONV-004": { v: "Theta Hotels Pvt Ltd", f: "Theta-Hotels — INV-2208 (re-send).pdf", no: "INV-2208", amt: "₹2,98,628", type: "Sales", st: "dup", note: "INV-2208 is already posted as SAL/25-26/0208; this is the customer's re-send." },
    "CONV-005": { v: "Crescent Foods Pvt Ltd", f: "Crescent-Foods — INV-5510.pdf", no: "CF-5510", amt: "₹33,420", due: "11 Jun 2026", cc: "Pantry", type: "Purchase", st: "ready", note: "A similar Crescent Foods bill was posted last month, but the invoice number differs, so this is not a duplicate." }
  };
  function pageCtx() {
    var m = location.pathname.match(/\/inbox\/([A-Z]+-\d+)\/?(index\.html)?$/);
    if (m && DOCS[m[1]]) return { kind: "doc", id: m[1], doc: DOCS[m[1]] };
    return null;
  }
  var CTX = pageCtx();
  var DOC_RE = /explain|summar|what('s| is) (this|it)|this (document|bill|invoice|file|statement|entry)|read (this|it)\b/i;
  /* Neo's answer about the open document, built from DOCS so it replays identically from a saved chat. */
  function docScript(id) {
    var d = DOCS[id]; if (!d) return SC.generic;
    var who = d.type === "Sales" ? "Customer" : "Vendor", name = "**" + d.v + "**" + (d.no ? " · " + d.no : ""), amt = d.amt && d.st !== "bank" ? " for **" + d.amt + "**" : "";
    var s = { steps: ["Reading " + d.f], follow: ["What needs my attention?", "Work the Inbox with me"], fields: [], checks: [], decide: null };
    if (d.type) s.fields.push(["Type", d.type]); if (d.no) s.fields.push(["Invoice number", d.no]); if (d.amt && d.st !== "bank") s.fields.push(["Amount", d.amt]); if (d.due) s.fields.push(["Due date", d.due]); if (d.cc) s.fields.push(["Cost centre", d.cc]);
    (d.lines || []).forEach(function (l, i) { s.fields.push(["Line " + (i + 1), l]); });
    var key = "doc:" + id;
    switch (d.st) {
      case "ready":
        s.steps.push(d.type === "Journal" ? "Checking that debits equal credits" : "Checking the " + who.toLowerCase() + " and GST", "Comparing with earlier documents");
        s.text = name + amt + (d.due ? ", due " + d.due : "") + ". " + (d.type === "Journal" ? "The entry balances and both ledgers exist." : who + " matched, GST is correct and there is no duplicate.") + (d.note ? " " + d.note : "") + " It is **ready to post**.";
        s.checks = d.type === "Journal" ? [["ok", "Debits equal credits"], ["ok", "Both ledgers exist in your chart of accounts"]] : [["ok", who + " matched to an existing record"], ["ok", "GST rate matches the items"], ["ok", "No duplicate found"]];
        s.decide = { key: key, btns: [["Approve and post", "approved", "nc-pri"], ["Skip for now", "skipped", ""]], msgs: { approved: "Approved and posted.", skipped: "Skipped. It stays in Inbox." } };
        break;
      case "flag":
        s.steps.push("Checking the " + who.toLowerCase() + " and GST", "Listing what is missing");
        s.text = name + amt + " needs **" + d.flags.length + " thing" + (d.flags.length > 1 ? "s" : "") + " fixed** before it can post. I have not changed anything.";
        s.checks = d.flags.map(function (f) { return ["warn", f]; });
        s.decide = { key: key, btns: [["Ask the " + who.toLowerCase() + " for details", "queried", "nc-pri"], ["Skip for now", "skipped", ""]], msgs: { queried: "Request sent. I'll flag this document when a reply comes in.", skipped: "Skipped. It stays in Inbox." } };
        break;
      case "dup": case "dupsoft":
        s.steps.push("Comparing vendor, number and amount with your books");
        s.text = name + amt + " looks like a **" + (d.st === "dup" ? "duplicate" : "possible duplicate") + "**. " + d.note + " Nothing is deleted until you decide.";
        s.checks = [[d.st === "dup" ? "bad" : "warn", d.note]];
        s.decide = { key: key, btns: [[d.st === "dup" ? "Delete duplicate" : "Mark as duplicate", "deleted", "nc-danger"], ["Keep it", "kept", ""]], msgs: { deleted: "Marked as duplicate and removed from Inbox.", kept: "Kept. It stays in Inbox for review." } };
        break;
      case "bank":
        s.steps.push("Counting transactions and checking the balances");
        s.text = "**" + d.v + " statement**: " + d.note + ". I can match all 47 transactions to your vouchers and show you only the ones that need a decision.";
        s.fields = [["Period", "1 Apr to 30 Apr 2026"], ["Transactions", "47"], ["Opening balance", "₹4,82,310"], ["Closing balance", "₹6,12,482"]];
        s.follow = ["Reconcile banking", "What needs my attention?"];
        break;
      case "ambig":
        s.steps.push("Looking at both pages");
        s.text = "**" + d.f + "** holds two kinds of content. " + d.note + " Tell me how you want it handled.";
        s.decide = { key: key, btns: [["Split into 4 receipts and a journal entry", "split", "nc-pri"], ["Treat it as one journal entry", "jv", ""]], msgs: { split: "Split into 4 vendor receipts and 1 journal entry. Each is in Inbox for review.", jv: "Treated as one journal entry. It is in Inbox for review." } };
        break;
      case "extracting":
        s.text = "I'm still reading **" + d.f + "**." + (d.note ? " " + d.note : "") + " It usually takes under a minute, and the details will be here when you come back.";
        break;
      case "failed":
        s.steps.push("Trying to extract the text");
        s.text = "I couldn't read **" + d.f + "** from " + d.v + ". " + d.note + " Nothing was changed.";
        s.decide = { key: key, btns: [["Ask the vendor for a clean copy", "queried", "nc-pri"], ["Skip for now", "skipped", ""]], msgs: { queried: "Request sent to " + d.v + ".", skipped: "Skipped. It stays in Inbox." } };
        break;
      case "done":
        s.text = name + amt + " is **already posted**. " + d.note;
        break;
      default:
        s.text = "**" + d.f + "** was **deleted**. " + d.note;
    }
    return s;
  }
  /* Quick actions offered while typing in the composer. */
  var ALIAS = { "Reconcile banking": "bank statement unmatched transactions", "Check GST": "gstr itc mismatch tax", "Review AP": "payable payments due vendors pay", "Month-end closing": "close checklist period", "Find duplicates": "duplicate bills copies", "Review invoices": "invoice bills new", "Work the Inbox with me": "inbox bills read clear", "What needs my attention?": "attention waiting blocked exceptions pending", "Automate a task": "agent schedule every workflow automation remind daily weekly", "Explain this document": "explain document file summarise summarize what is this" };
  function quickList() { var q = HOME.map(function (c) { return c[0]; }); q.push("Work the Inbox with me", "What needs my attention?", "Automate a task"); if (CTX) q.unshift("Explain this document"); return q; }
  function inr(n) { var t = String(n), last = t.slice(-3), rest = t.slice(0, -3); return "₹" + (rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," : "") + last; }
  var SEED = [
    { id: 1, title: "Work the Inbox with me", group: "Today", when: "9:12 am", key: "inbox" },
    { id: 2, title: "Missing GST on Meera Stationers", group: "Today", when: "8:40 am", key: "attention" },
    { id: 3, title: "Duplicate bills in September", group: "Yesterday", when: "4:05 pm", key: "dups" },
    { id: 4, title: "What needs my attention?", group: "Yesterday", when: "11:30 am", key: "attention" },
    { id: 5, title: "Patel Logistics vendor mapping", group: "Previous 7 days", when: "1 Oct", key: "inbox" },
    { id: 6, title: "Find duplicates", group: "Previous 7 days", when: "30 Sep", key: "dups" }
  ];

  /* ---------- automation flow data ---------- */
  var AUTO_RE = /\bautomat|\bschedule\b|every (day|morning|evening|week|month|mon|tue|wed|thu|fri|sat|sun)|\bdaily\b|\bweekly\b|\bmonthly\b|\bwhenever\b|\bworkflow\b|\b(create|make|build|set ?up|new)\b.{0,14}\b(agent|workflow|automation)|\bremind me\b/i;
  var WHAT_OPTS = [["inv", "Review new invoices"], ["gst", "Check GST mismatches"], ["dups", "Find duplicate bills"], ["bank", "Reconcile banking"], ["month", "Prepare the month-end close"]];
  var WHEN_OPTS = [["arrives", "When a new bill arrives"], ["morning", "Every morning at 9:00"], ["monday", "Every Monday at 9:00"], ["monthend", "On the last working day of the month"]];
  var MODE_OPTS = [["approve", "Prepare it, then ask me before anything is posted"], ["suggest", "Only suggest, never act"], ["auto", "Handle clear cases, ask me on the rest"]];
  var WHAT_INFO = {
    inv: { short: "review new invoices", name: "Invoice Review", icon: "receipt", does: "read new invoices, check GST and duplicates, and suggest account coding", caps: ["Extract invoice information", "Validate GST", "Check duplicates", "Suggest account coding"], sources: ["Purchases", "Vendors", "GST"] },
    gst: { short: "check GST mismatches", name: "GST Check", icon: "gst", does: "compare purchase bills with GSTR-2B and flag mismatches and missing GST numbers", caps: ["Validate GSTIN", "Compare with GSTR-2B", "Flag ineligible ITC"], sources: ["Purchases", "GST", "Vendors"] },
    dups: { short: "find duplicate bills", name: "Duplicate Finder", icon: "copy", does: "compare vendor, bill number and amount to catch duplicate bills", caps: ["Compare vendor and bill number", "Match amounts and dates", "Flag certain duplicates"], sources: ["Purchases", "Vendors"] },
    bank: { short: "reconcile your bank", name: "Bank Reconciliation", icon: "bank", does: "match bank transactions to your books and list what is left unmatched", caps: ["Match transactions", "Identify exceptions", "Suggest corrections"], sources: ["Banking", "Accounting"] },
    month: { short: "prepare the month-end close", name: "Month-End Close", icon: "cal", does: "check unposted documents, unreconciled items and pending GST, then prepare a close summary", caps: ["Check unposted documents", "Check unreconciled items", "Prepare close summary"], sources: ["Purchases", "Banking", "GST", "Accounting"] }
  };
  var WHEN_LBL = { arrives: "when a new bill arrives", morning: "every morning at 9:00", monday: "every Monday at 9:00", monthend: "on the last working day of the month" };
  var MODE_LBL = { approve: "It prepares the work and asks you before anything is posted", suggest: "It only suggests and never changes your books", auto: "It handles clear cases and asks you on the rest" };

  /* ---------- shared state (sessionStorage) ---------- */
  var ST;
  function load() {
    try { ST = JSON.parse(sessionStorage.getItem("neoChat") || "null"); } catch (e) { ST = null; }
    if (!ST || !ST.hs) ST = { v: 2, hs: SEED.map(function (s) { return { id: s.id, title: s.title, group: s.group, when: s.when, msgs: [{ u: SC[s.key].q }, { a: { k: "answer", key: s.key } }] }; }), uid: 100, billState: {}, active: null, open: false };
    ST.hs.forEach(function (h) { /* migrate chats saved before transcripts existed */
      if (h.msgs) return;
      var key = h.sc && SC[h.sc] ? h.sc : "generic";
      h.msgs = h.sc === "automation" ? [{ u: h.title }, { a: { k: "say", text: "We set this up together in chat. The agent is under Agents." } }] : [{ u: SC[key].q || h.title }, { a: { k: "answer", key: key } }];
      delete h.sc;
    });
    ST.v = 2;
  }
  function save() { try { sessionStorage.setItem("neoChat", JSON.stringify(ST)); } catch (e) {} }
  load();

  function pick(t) { for (var i = 0; i < PICK_ORDER.length; i++) if (SC[PICK_ORDER[i]].match.test(t)) return PICK_ORDER[i]; return "generic"; }
  function el(h) { var t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function plain(s) { return s.replace(/\*\*/g, ""); }
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
  function nowLabel() { var d = new Date(), h = d.getHours(), m = d.getMinutes(); return ((h % 12) || 12) + ":" + (m < 10 ? "0" : "") + m + (h < 12 ? " am" : " pm"); }
  function titleOf(text) { return text.length > 34 ? text.slice(0, 32) + "…" : text; }

  /* The Neo workspace (sidebar + screens) is the Neo page's own code, loaded on demand on product pages. */
  var NEO_V = "30";
  function loadWS(cb) {
    if (window.NeoWorkspace) return cb(null);
    if (loadWS.failed) return cb(loadWS.failed);
    if (loadWS.q) { loadWS.q.push(cb); return; }
    loadWS.q = [cb];
    var l = document.createElement("link"); l.rel = "stylesheet"; l.href = BASE + "/neo/neo.css?v=" + NEO_V; document.head.appendChild(l);
    var sc = document.createElement("script"); sc.src = BASE + "/neo/neo.js?v=" + NEO_V;
    function flush(err) { var q = loadWS.q || []; loadWS.q = null; q.forEach(function (f) { f(err); }); }
    sc.onload = function () { flush(window.NeoWorkspace ? null : new Error("Neo workspace did not initialise")); };
    sc.onerror = function () { loadWS.failed = new Error("Neo workspace script failed to load"); flush(loadWS.failed); };
    document.body.appendChild(sc);
  }

  /* Main product navigation (host app sidebar): collapsed to its rail while Neo is expanded, restored after. */
  var PNAV = "prototype-main-navigation";
  function navBtn() { return document.querySelector('button[aria-controls="' + PNAV + '"]'); }
  function navAside() { var n = document.getElementById(PNAV); return n && n.closest("aside"); }
  function whenNav(fn, tries) { if (navBtn() && navAside()) return fn(); if ((tries || 0) < 40) setTimeout(function () { whenNav(fn, (tries || 0) + 1); }, 100); }

  /* ---------- instance ---------- */
  var INSTANCES = [];
  function mount(container, opts) {
    opts = opts || {};
    var mode = opts.mode || "panel", inst = {}; INSTANCES.push(inst);
    var mq = window.matchMedia("(min-width: 861px)");
    var root = container; root.className = "nc " + (mode === "full" ? "nc-full" : "nc-panel");
    root.innerHTML =
      '<aside class="nc-hist" aria-label="Chat history" hidden><div class="nc-hhead"><h2>History</h2><button class="nc-ibtn" type="button" data-hclose aria-label="Close history">' + X + '</button></div>' +
      '<div class="nc-hbar"><button class="nc-newbtn" type="button" data-new>' + PLUS + 'New chat</button><div class="nc-hsearch">' + SEARCH + '<label class="nc-sr" for="nc-hs-' + mode + '">Search chats</label><input id="nc-hs-' + mode + '" type="search" placeholder="Search chats" autocomplete="off"></div></div><div class="nc-hscroll" data-hlist></div><div class="neo-scope nc-wsnav" data-wsnav></div></aside>' +
      '<div class="nc-chat"><header class="nc-head"><span class="nc-mark" aria-hidden="true">' + STAR + '</span><h1 class="nc-ttl" data-ttl>Neo</h1>' +
      '<button class="nc-ibtn" type="button" data-histbtn aria-label="Chat history" aria-expanded="false">' + HISTI + '</button><button class="nc-ibtn" type="button" data-new aria-label="New chat" title="New chat">' + PEN + '</button>' +
      '<button class="nc-ibtn" type="button" data-expand aria-label="' + (mode === "full" ? "Minimize to floating chat" : "Expand Neo") + '" title="' + (mode === "full" ? "Minimize" : "Expand") + '">' + (mode === "full" ? COLLAPSE : EXPAND) + '</button><button class="nc-ibtn" type="button" data-close aria-label="Close Neo" title="Close">' + X + "</button></header>" +
      '<div class="nc-thread" data-thread role="region" aria-label="Conversation with Neo" tabindex="0"></div>' +
      '<div class="nc-live" data-live role="status" hidden></div>' +
      '<form class="nc-composer" data-form><p class="nc-ctx" data-ctx hidden></p><div class="nc-sugg" data-sugg role="listbox" aria-label="Quick actions" hidden></div><div class="nc-box"><div class="nc-fchips" data-fchips></div><input type="file" class="nc-sr" data-file tabindex="-1" aria-hidden="true" accept=".pdf,.jpg,.jpeg,.png" multiple><button class="nc-ibtn nc-sm32" type="button" data-attach aria-label="Attach a bill or document" title="Attach">' + PLUS + '</button><label class="nc-sr" for="nc-in-' + mode + '">Message Neo</label><textarea id="nc-in-' + mode + '" rows="1" placeholder="Ask Neo anything" aria-autocomplete="list" aria-controls="nc-sugg-' + mode + '" aria-expanded="false"></textarea><button class="nc-send" type="submit" data-send aria-label="Send" disabled>' + ARROW + '</button></div><p class="nc-hint">Neo can make mistakes. Review extracted details before approving.</p></form></div>' +
      '<div class="nc-screen" hidden><div class="nc-shead"><button class="nc-ibtn" type="button" data-sexpand aria-label="Minimize to floating chat" title="Minimize">' + COLLAPSE + '</button><button class="nc-ibtn" type="button" data-sclose aria-label="Close Neo" title="Close">' + X + '</button></div><div class="nc-sbody neo-scope" data-sbody></div></div>' +
      '<aside class="nc-work" aria-label="Review bill" hidden><div class="nc-hhead"><h2 data-wt tabindex="-1">Review bill</h2><button class="nc-ibtn" type="button" data-wclose aria-label="Close review panel">' + X + '</button></div><div class="nc-wbody" data-wbody></div><div class="nc-wfoot" data-wfoot></div></aside>' +
      '<div class="nc-sr" role="status" aria-live="polite" data-status></div>';
    var $ = function (s) { return root.querySelector(s); };
    var thread = $("[data-thread]"), input = $("textarea"), send = $("[data-send]"), form = $("[data-form]"), hist = $(".nc-hist"), histList = $("[data-hlist]"), statusEl = $("[data-status]"), histBtn = $("[data-histbtn]"), search = $(".nc-hsearch input"), fileIn = $("[data-file]"), fchips = $("[data-fchips]"), work = $(".nc-work"), wbody = $("[data-wbody]"), wfoot = $("[data-wfoot]"), ttl = $("[data-ttl]"), expBtn = $("[data-expand]"), screenEl = $(".nc-screen");
    var histOpen = false, workOpen = false, workKey = null, workTrigger = null, running = false, runId = 0, cur = null, t0 = 0, files = [];
    var liveEl = $("[data-live]"), sugg = $("[data-sugg]"), sIdx = -1, live = null; sugg.id = "nc-sugg-" + mode;
    if (CTX && mode !== "full") { var cx = $("[data-ctx]"); cx.innerHTML = IC.doc + "<span>Looking at <b>" + esc(CTX.doc.v + (CTX.doc.no ? " · " + CTX.doc.no : "")) + "</b></span>"; cx.hidden = false; input.placeholder = "Ask about this document, or anything else"; }
    var side = opts.sidebar !== false, expanded = false, expT = 0, flow = null, navRO = null, wsAttached = false;

    function sleep(ms, id) { return new Promise(function (res, rej) { setTimeout(function () { id === runId ? res() : rej("cancel"); }, ms); }); }
    function down() { requestAnimationFrame(function () { thread.scrollTop = thread.scrollHeight; }); }
    function say(m) { statusEl.textContent = ""; setTimeout(function () { statusEl.textContent = m; }, 60); }
    function setRunning(r) { running = r; send.innerHTML = r ? STOP : ARROW; send.setAttribute("aria-label", r ? "Stop Neo" : "Send"); send.type = r ? "button" : "submit"; send.disabled = !r && !input.value.trim() && !files.length; }
    function docked() { return mode === "full" && mq.matches; }
    function syncLayout() { root.classList.toggle("nc-docked", docked()); hist.hidden = docked() ? !side : !histOpen; histBtn.hidden = docked(); histBtn.setAttribute("aria-expanded", String(!hist.hidden)); work.hidden = !workOpen; }
    function openHist(o) { histOpen = o; if (o) workOpen = false; syncLayout(); if (o) search.focus(); else histBtn.focus(); }
    function activeItem() { return ST.hs.filter(function (h) { return h.id === ST.active; })[0]; }
    function setTitle() { var a = activeItem(); ttl.textContent = a ? a.title : "Neo"; }
    function record(msg) { var a = activeItem(); if (!a) return; a.msgs = a.msgs || []; a.msgs.push(msg); save(); }
    function persistFlow() { var a = activeItem(); if (!a) return; a.flow = flow ? { slots: Object.assign({}, flow.slots), stage: flow.stage } : null; save(); }
    function ensureItem(text) {
      var first = thread.querySelector(".nc-empty"); if (first) { first.remove(); drawLive(); }
      if (ST.active == null) { var h = { id: ++ST.uid, title: text === "Explain this document" && CTX ? CTX.doc.v + (CTX.doc.no ? " · " + CTX.doc.no : "") : titleOf(text), group: "Today", when: nowLabel(), msgs: [] }; ST.hs.unshift(h); ST.active = h.id; save(); renderHist(); setTitle(); }
    }

    /* history */
    function renderHist() {
      var q = search.value.trim().toLowerCase(), groups = ["Today", "Yesterday", "Previous 7 days"], out = "", any = false;
      groups.forEach(function (g) {
        var items = ST.hs.filter(function (h) { return h.group === g && (!q || h.title.toLowerCase().indexOf(q) > -1); });
        if (!items.length) return; any = true;
        out += '<section class="nc-hgroup"><h3>' + g + "</h3>" + items.map(function (h) { return '<button class="nc-hitem" type="button" data-id="' + h.id + '"' + (h.id === ST.active ? ' aria-current="true"' : "") + "><span>" + esc(h.title) + "</span><small>" + esc(h.when) + "</small></button>"; }).join("") + "</section>";
      });
      histList.innerHTML = any ? out : '<p class="nc-hnone">No chats match "' + esc(search.value) + '".</p>';
      if (opts.onHistory) opts.onHistory(ST.hs, ST.active);
    }
    histList.addEventListener("click", function (e) {
      var b = e.target.closest(".nc-hitem"); if (!b) return;
      openSaved(+b.dataset.id); if (!docked()) { histOpen = false; syncLayout(); } thread.focus();
    });
    search.addEventListener("input", renderHist);
    function openSaved(id) { var item = ST.hs.filter(function (h) { return h.id === id; })[0]; if (!item) return; stop(); ST.active = item.id; save(); renderSaved(item); renderHist(); setTitle(); workOpen = false; syncLayout(); }

    /* review panel */
    function tagFor(key, fallback) { var st = ST.billState[key]; if (st === "approved") return ["Approved", "ok"]; if (st === "skipped") return ["Skipped", "info"]; if (st === "deleted") return ["Deleted", "info"]; if (st === "kept") return ["Kept", "info"]; return BILLS[key] ? BILLS[key].tag : fallback; }
    function refreshTags(key) { var t = tagFor(key); root.querySelectorAll('[data-bill="' + key + '"] .nc-tag').forEach(function (n) { n.className = "nc-tag " + t[1]; n.textContent = t[0]; }); root.querySelectorAll("[data-bulk]").forEach(function (b) { if (b._draw) b._draw(); }); if (thread.querySelector("[data-brief]")) drawBrief(); }
    function openWork(key, trigger) { workKey = key; workTrigger = trigger || null; workOpen = true; histOpen = false; renderWork(); syncLayout(); $("[data-wt]").focus(); say("Review panel opened for " + BILLS[key].v + ", bill " + BILLS[key].no); }
    function closeWork() { workOpen = false; syncLayout(); if (workTrigger && document.body.contains(workTrigger)) workTrigger.focus(); }
    function renderWork() {
      var b = BILLS[workKey], st = ST.billState[workKey], t = tagFor(workKey);
      var f = [["Vendor", esc(b.v)], ["Bill number", esc(b.no)], ["Bill date", b.date], ["Due date", b.due], ["Subtotal", b.sub], ["GST 18%", b.gst], ["Total", b.tot], ["Vendor GSTIN", b.gstin ? esc(b.gstin) : '<input data-gstin type="text" maxlength="15" autocomplete="off" aria-label="Vendor GSTIN, 15 characters" placeholder="15-character GSTIN">'], ["Category", esc(b.cat)]];
      var checks = b.kind === "gst" ? [["warn", "Vendor GSTIN is missing. Add it to continue."], ["ok", "Vendor matched to an existing vendor"]] : b.kind === "dup" ? [["bad", "Same vendor, bill number and amount as SH/2291 uploaded at 10:14"], ["ok", "GST rate matches the category"]] : [["ok", "Vendor matched to an existing vendor"], ["ok", "GST rate matches the category"], ["ok", "No duplicate found"]];
      wbody.innerHTML = '<div class="nc-wtop"><div><b>' + esc(b.v) + '</b><span class="nc-m">Bill ' + esc(b.no) + " · " + esc(b.date) + '</span></div><span class="nc-tag ' + t[1] + '">' + esc(t[0]) + "</span></div>" +
        '<p class="nc-wamt">' + esc(b.tot) + "</p>" +
        '<div><h4>Extracted details</h4><dl class="nc-fields">' + f.map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + r[1] + "</dd>"; }).join("") + "</dl></div>" +
        "<div><h4>Neo's checks</h4><ul class=\"nc-checks\">" + checks.map(function (c) { return '<li><span class="nc-ic ' + c[0] + '">' + (c[0] === "ok" ? TICK.replace('class="nc-tick"', "") : c[0] === "warn" ? WARN : CROSS) + "</span><span>" + esc(c[1]) + "</span></li>"; }).join("") + "</ul></div>" +
        '<p class="nc-m">Source: ' + esc(b.file) + " · read by Neo at 9:12 am</p>";
      wfoot.innerHTML = "";
      if (st) {
        var msg = { approved: "Approved and posted to Bills.", skipped: "Skipped. It stays in Inbox.", deleted: "Duplicate deleted.", kept: "Kept. Both bills stay in your books." }[st];
        wfoot.append(el('<span class="nc-okline">' + TICK.replace('class="nc-tick"', 'class="nc-tick-big"') + msg + "</span>"));
        var u = el('<button class="nc-link" type="button">Undo</button>'); u.onclick = function () { ST.billState[workKey] = null; save(); refreshTags(workKey); renderWork(); say("Undone"); }; wfoot.append(u); return;
      }
      function act(state) { ST.billState[workKey] = state; save(); refreshTags(workKey); renderWork(); say(wfoot.querySelector(".nc-okline").textContent); }
      if (b.kind === "dup") {
        var d = el('<button class="nc-btn nc-danger" type="button">Delete duplicate</button>'), k = el('<button class="nc-btn" type="button">Keep both</button>');
        d.onclick = function () { act("deleted"); }; k.onclick = function () { act("kept"); }; wfoot.append(d, k);
      } else {
        var ap = el('<button class="nc-btn nc-pri" type="button">' + (b.kind === "gst" ? "Save GSTIN and approve" : "Approve and post") + "</button>"), sk = el('<button class="nc-btn" type="button">Skip for now</button>');
        if (b.kind === "gst") { ap.disabled = true; var gi = wbody.querySelector("[data-gstin]"); gi.addEventListener("input", function () { ap.disabled = gi.value.trim().length !== 15; }); }
        ap.onclick = function () { if (b.kind === "gst") b.gstin = wbody.querySelector("[data-gstin]").value.trim().toUpperCase(); act("approved"); };
        sk.onclick = function () { act("skipped"); }; wfoot.append(ap, sk);
      }
    }
    $("[data-wclose]").onclick = closeWork;

    /* ---------- message builders (used live and on replay) ---------- */
    function userEl(t) { return el('<div class="nc-user"><span class="nc-sr">You said: </span>' + esc(t) + "</div>"); }
    function aiEl() { var r = el('<div class="nc-ai">' + AV + '<div class="nc-body"><span class="nc-sr">Neo says: </span></div></div>'); return { root: r, body: r.querySelector(".nc-body") }; }
    function trailEl(steps, secs) {
      var det = el('<details class="nc-trail"><summary>Checked ' + steps.length + " source" + (steps.length > 1 ? "s" : "") + (secs ? " · " + secs + "s" : "") + '</summary><ul class="nc-steps"></ul></details>');
      steps.forEach(function (s) { det.querySelector("ul").append(el('<li class="done"><span class="nc-ic">' + TICK + "</span><span>" + esc(s) + "</span></li>")); });
      return det;
    }
    function cardEl(c, animate) {
      var card = el('<div class="nc-card"><h3><span>' + esc(c.title) + "</span><span>" + esc(c.aside) + "</span></h3></div>");
      c.rows.forEach(function (d, i) {
        var key = BILLS[d[3]] ? d[3] : null, tag = key ? tagFor(key) : d[3], style = animate ? ' style="animation-delay:' + (i * 40) + 'ms"' : ' style="animation:none"';
        var inner = '<div class="nc-n">' + esc(d[0]) + '<span class="nc-tag ' + tag[1] + '">' + esc(tag[0]) + '</span></div><div class="nc-v">' + esc(d[2]) + '</div><div class="nc-m">' + esc(d[1]) + "</div>";
        var row;
        if (key) { row = el('<button class="nc-row nc-rbtn" type="button" data-bill="' + key + '" aria-label="Review ' + esc(d[0]) + ", bill " + esc(BILLS[key].no) + ", " + esc(d[2]) + '"' + style + ">" + inner + "</button>"); row.onclick = function () { openWork(key, row); }; }
        else { row = el('<div class="nc-row"' + style + ">" + inner + "</div>"); if (d[4]) row.append(rowActions(d)); }
        card.append(row);
      });
      if (c.bulk) card.append(bulkEl(c));
      if (c.link) { var lk = el('<button class="nc-cfoot nc-clink" type="button"><span>' + esc(c.link[0]) + "</span>" + CHEV + "</button>"); lk.onclick = function () { openScreen(c.link[1]); }; card.append(lk); }
      return card;
    }
    /* Approve every "ready" bill in a card at once: confirm inline, then one Undo for the batch. */
    function bulkEl(c) {
      var box = el('<div class="nc-cfoot" data-bulk></div>'), last = null;
      var keys = c.rows.map(function (d) { return d[3]; }).filter(function (k) { return BILLS[k]; });
      function ready() { return keys.filter(function (k) { return BILLS[k].kind === "ready" && !ST.billState[k]; }); }
      function sum(ks) { return inr(ks.reduce(function (n, k) { return n + parseInt(BILLS[k].tot.replace(/[^\d]/g, ""), 10); }, 0)); }
      function draw() {
        var r = ready(), n = keys.filter(function (k) { return ST.billState[k]; }).length; box.innerHTML = "";
        if (last && last.every(function (k) { return ST.billState[k] === "approved"; })) {
          box.append(el('<span class="nc-okline">' + TICK.replace('class="nc-tick"', 'class="nc-tick-big"') + last.length + " bill" + (last.length > 1 ? "s" : "") + " approved and posted.</span>"));
          var u = el('<button class="nc-link" type="button">Undo</button>'); u.onclick = function () { var ks = last; last = null; ks.forEach(function (k) { ST.billState[k] = null; }); save(); ks.forEach(refreshTags); say("Undone. " + ks.length + " bills are back in Inbox."); u.blur(); }; box.append(u); return;
        }
        last = null;
        box.append(el('<span class="nc-m">' + (n === keys.length ? "All " + keys.length + " bills decided." : n + " of " + keys.length + " decided" + (r.length ? " · " + r.length + " ready to approve" : "")) + "</span>"));
        if (r.length) { var b = el('<button class="nc-btn nc-sm nc-pri" type="button">Approve ' + r.length + " ready bill" + (r.length > 1 ? "s" : "") + "</button>"); b.onclick = function () { confirmAll(r); }; box.append(b); }
      }
      function confirmAll(r) {
        box.innerHTML = ""; box.append(el('<span class="nc-m">Approve and post <b>' + r.length + " bills</b> totalling <b>" + sum(r) + "</b>? The other " + (keys.length - r.length) + " stay in Inbox.</span>"));
        var ok = el('<button class="nc-btn nc-sm nc-pri" type="button">Approve ' + r.length + "</button>"), no = el('<button class="nc-btn nc-sm" type="button">Cancel</button>');
        ok.onclick = function () { r.forEach(function (k) { ST.billState[k] = "approved"; }); save(); last = r; r.forEach(refreshTags); say(r.length + " bills approved and posted."); };
        no.onclick = function () { draw(); }; box.append(ok, no); ok.focus();
      }
      box._draw = draw; draw(); return box;
    }
    function fieldsEl(rows) { var dl = el('<dl class="nc-fields nc-dfields"></dl>'); rows.forEach(function (r) { dl.append(el("<dt>" + esc(r[0]) + "</dt>"), el("<dd>" + esc(r[1]) + "</dd>")); }); return dl; }
    function checksEl(list) { var ul = el('<ul class="nc-checks"></ul>'); list.forEach(function (c) { ul.append(el('<li><span class="nc-ic ' + c[0] + '">' + (c[0] === "ok" ? TICK.replace('class="nc-tick"', "") : c[0] === "warn" ? WARN : CROSS) + "</span><span>" + esc(c[1]) + "</span></li>")); }); return ul; }
    /* A decision Neo asks for in the thread (approve, skip, delete...). The choice is kept in billState so a saved chat shows it. */
    function decideEl(sp) {
      var box = el('<div class="nc-btns" data-decide></div>');
      function draw() {
        box.innerHTML = ""; var st = ST.billState[sp.key];
        if (st) { box.append(el('<span class="nc-okline">' + TICK.replace('class="nc-tick"', 'class="nc-tick-big"') + esc(sp.msgs[st]) + "</span>")); var u = el('<button class="nc-link" type="button">Undo</button>'); u.onclick = function () { ST.billState[sp.key] = null; save(); draw(); say("Undone"); }; box.append(u); return; }
        sp.btns.forEach(function (b) { var btn = el('<button class="nc-btn nc-sm ' + b[2] + '" type="button">' + esc(b[0]) + "</button>"); btn.onclick = function () { ST.billState[sp.key] = b[1]; save(); draw(); say(sp.msgs[b[1]]); }; box.append(btn); });
      }
      draw(); return box;
    }
    function answerExtras(body, sc, animate) {
      if (sc.card) body.append(cardEl(sc.card, animate));
      if (sc.fields && sc.fields.length) body.append(fieldsEl(sc.fields));
      if (sc.checks && sc.checks.length) body.append(checksEl(sc.checks));
      if (sc.decide) body.append(decideEl(sc.decide));
    }
    function rowActions(d) {
      var box = el('<div class="nc-ra"></div>');
      var del = el('<button class="nc-btn nc-sm nc-danger" type="button" aria-label="Delete duplicate ' + esc(d[0]) + '">Delete duplicate</button>'), keep = el('<button class="nc-btn nc-sm" type="button" aria-label="Keep ' + esc(d[0]) + '">Keep</button>');
      function reset(focus) { box.innerHTML = ""; box.append(del, keep); if (focus) del.focus(); }
      function settle(msg) { box.innerHTML = ""; box.append(el('<span class="nc-settled">' + msg + "</span>")); var u = el('<button class="nc-link" type="button">Undo</button>'); u.onclick = function () { reset(true); say("Undone"); }; box.append(u); u.focus(); say(msg); }
      del.onclick = function () { settle("Duplicate deleted."); }; keep.onclick = function () { settle("Kept. Both bills stay in your books."); };
      reset(false); return box;
    }
    function chipsEl(labels, onPick, label) {
      var ch = el('<div class="nc-chips" role="group" aria-label="' + esc(label || "Suggested follow-ups") + '"></div>');
      labels.forEach(function (t) { var b = el('<button class="nc-chip" type="button">' + esc(t) + "</button>"); b.onclick = function () { onPick(t, ch); }; ch.append(b); });
      return ch;
    }
    function followChips(sc) { return chipsEl(sc.follow, function (t) { start(t); }); }
    function choiceEl(optsList, pick) { return chipsEl(optsList.map(function (o) { return o[1]; }), function (label, ch) { var o = optsList.filter(function (x) { return x[1] === label; })[0]; ch.remove(); thread.append(userEl(label)); record({ u: label }); pick(o[0]); down(); }, "Choose one"); }
    function planEl(name, rows) {
      var card = el('<div class="nc-card nc-plan"><h3><span>' + esc(name) + "</span><span>Draft</span></h3></div>");
      rows.forEach(function (d) { card.append(el('<div class="nc-row" style="animation:none"><div class="nc-n">' + esc(d[0]) + '</div><div class="nc-m">' + esc(d[1]) + "</div></div>")); });
      return card;
    }
    function planBtns() {
      var btns = el('<div class="nc-btns"></div>'), ok = el('<button class="nc-btn nc-pri" type="button">Create agent</button>'), ed = el('<button class="nc-btn" type="button">Change something</button>');
      ok.onclick = function () { btns.remove(); thread.append(userEl("Create agent")); record({ u: "Create agent" }); createFlowAgent(); };
      ed.onclick = function () { btns.remove(); thread.append(userEl("Change something")); record({ u: "Change something" }); flow.stage = "edit"; persistFlow(); neoSay("What would you like to change?", function (b2) { b2.append(editChips()); }, { k: "say", text: "What would you like to change?" }); };
      btns.append(ok, ed); return btns;
    }
    function editChips() { return choiceEl([["what", "What it does"], ["when", "When it runs"], ["mode", "How much it does on its own"]], function (k) { flow.slots[k] = null; persistFlow(); advance(); }); }
    function createdBtns(id) {
      var btns = el('<div class="nc-btns"></div>'), v = el('<button class="nc-btn nc-pri" type="button">View agent</button>'), n = el('<button class="nc-btn" type="button">Automate something else</button>');
      v.onclick = function () { openAgent(id); }; n.onclick = function () { start("I want to automate a task"); };
      btns.append(v, n); return btns;
    }
    function errorEl(file, text, key) {
      var err = el('<div class="nc-errcard" role="alert"><p><b>One file could not be read.</b> ' + esc(file) + ' is too blurry to extract amounts from. I stopped before changing anything.</p><div class="nc-btns"><button class="nc-btn nc-pri" type="button">Skip this file and continue</button><button class="nc-btn" type="button">Upload a clearer copy</button></div></div>');
      var b = err.querySelectorAll("button");
      b[0].onclick = function () { err.remove(); start(text, { resume: true, key: key }); };
      b[1].onclick = function () { fileIn.click(); };
      return err;
    }
    function stageChips() {
      var s = flow.slots, st = flow.stage;
      if (st === "what") return choiceEl(WHAT_OPTS, function (k) { s.what = k; persistFlow(); advance(); });
      if (st === "when") return choiceEl(WHEN_OPTS, function (k) { s.when = k; persistFlow(); advance(); });
      if (st === "mode") return choiceEl(MODE_OPTS, function (k) { s.mode = k; persistFlow(); advance(); });
      if (st === "edit") return editChips();
      if (st === "confirm") return planBtns();
      return null;
    }
    /* Open a workspace screen from the chat: in place on product pages, by hash on the Neo page. */
    function openScreen(h) {
      if (opts.inPlace) { if (!expanded) inst.setExpanded(true); loadWS(function (err) { if (err) say("The Neo workspace could not load."); else NeoWorkspace.navigate(h); }); }
      else if (window.NeoWorkspace) location.hash = "#" + h;
      else location.href = BASE + "/neo/#" + h;
    }
    function openAgent(id) { openScreen("/agents/" + id); }

    /* replay a saved transcript */
    function renderSaved(item) {
      thread.innerHTML = ""; flow = item.flow ? { slots: Object.assign({}, item.flow.slots), stage: item.flow.stage } : null;
      var msgs = item.msgs || [], lastBody = null, lastAnswer = null, lastCreated = null, lastUser = "";
      msgs.forEach(function (m, i) {
        if (m.u) { thread.append(userEl(m.u)); lastUser = m.u; return; }
        var a = m.a, ai = aiEl(); lastBody = ai.body; lastAnswer = null; lastCreated = null;
        if (a.k === "answer") { var sc = a.key === "doc" ? docScript(a.doc) : (SC[a.key] || SC.generic); ai.body.append(trailEl(sc.steps, a.secs)); ai.body.append(el('<p class="nc-ans">' + rich(sc.text) + "</p>")); answerExtras(ai.body, sc, false); lastAnswer = sc; }
        else if (a.k === "say") ai.body.append(el('<p class="nc-ans">' + rich(a.text) + "</p>"));
        else if (a.k === "plan") { ai.body.append(el('<p class="nc-ans">' + rich(a.text) + "</p>"), planEl(a.name, a.rows)); }
        else if (a.k === "created") { ai.body.append(el('<p class="nc-ans">' + rich(a.text) + "</p>")); lastCreated = a.id; }
        else if (a.k === "error") { ai.body.append(errorEl(a.file, lastUser, a.key)); }
        else if (a.k === "stopped") { ai.root.classList.add("nc-stopped"); ai.body.append(el('<p class="nc-note">Stopped. Nothing was changed in your books.</p>')); }
        thread.append(ai.root);
      });
      if (flow && lastBody) { var c = stageChips(); if (c) lastBody.append(c); }
      else if (lastCreated != null && lastBody) lastBody.append(createdBtns(lastCreated));
      else if (lastAnswer && lastBody) lastBody.append(followChips(lastAnswer));
      if (!msgs.length) showEmpty(); else { thread.scrollTop = thread.scrollHeight; drawLive(); }
    }
    /* Home: a briefing built from live prototype state (bills left, decisions waiting, agents running), then quick actions. */
    function briefRows() {
      var rows = [];
      if (CTX) rows.push({ ic: "doc", t: "Explain this document", d: CTX.doc.v + (CTX.doc.amt ? " · " + CTX.doc.amt : "") + (CTX.doc.no ? " · " + CTX.doc.no : ""), info: true, go: function () { start("Explain this document"); } });
      var keys = Object.keys(BILLS).filter(function (k) { return ST.billState[k]; }).length, left = Object.keys(BILLS).length - keys;
      if (left > 0) rows.push({ ic: "inbox", t: left + " new bill" + (left > 1 ? "s" : "") + " in Inbox", d: keys ? keys + " decided, " + left + " to go" : "4 ready to approve, 2 need a check", go: function () { start("Work the Inbox with me"); } });
      var w = live || (window.NeoWorkspace ? NeoWorkspace.summary() : null);
      if (w) {
        if (w.attention) rows.push({ ic: "alert", t: w.attention + " decision" + (w.attention > 1 ? "s" : "") + " waiting", d: w.attentionDetail, go: function () { openScreen("/attention"); } });
        w.running.forEach(function (r) { rows.push({ ic: "run", t: r.name + " is running", d: r.done + " of " + r.total + " " + r.unit + " · " + r.pct + "%", info: true, go: function () { openScreen("/runs/" + r.id); } }); });
        if (w.finished) rows.push({ ic: "ok", t: w.finished + " agent run" + (w.finished > 1 ? "s" : "") + " finished today", d: w.finishedDetail, info: true, go: function () { openScreen("/runs?tab=completed"); } });
      }
      return rows.slice(0, 4);
    }
    function drawBrief() {
      var host = thread.querySelector("[data-brief]"), sum = thread.querySelector("[data-sum]"); if (!host) return;
      var rows = briefRows(), fi = -1; Array.prototype.forEach.call(host.children, function (c, i) { if (c === document.activeElement) fi = i; });
      host.innerHTML = "";
      rows.forEach(function (r) { var b = el('<button class="nc-brow" type="button"><span class="nc-ic ' + r.ic + '">' + IC[r.ic] + '</span><span class="nc-bt"><b>' + esc(r.t) + '</b><span class="nc-d">' + esc(r.d) + '</span></span><span class="nc-chev" aria-hidden="true">' + CHEV + "</span></button>"); b.onclick = r.go; host.append(b); });
      if (!rows.length) host.append(el('<p class="nc-sub nc-none">Nothing is waiting on you.</p>'));
      if (fi > -1 && host.children[fi]) host.children[fi].focus();
      var n = rows.filter(function (r) { return !r.info; }).length;
      sum.textContent = n ? n + " thing" + (n > 1 ? "s" : "") + " need" + (n > 1 ? "" : "s") + " you today." : "You're all caught up.";
    }
    function showEmpty() {
      thread.innerHTML = "";
      var h = new Date().getHours(), hi = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
      var e = el('<div class="nc-empty"><h2 class="nc-hi">' + hi + ', Soundar <span aria-hidden="true">👋</span></h2><p class="nc-sub" data-sum></p><p class="nc-cap" id="nc-capt-' + mode + '">Today</p><div class="nc-brief" data-brief role="group" aria-labelledby="nc-capt-' + mode + '"></div><p class="nc-cap" id="nc-cap-' + mode + '">Ask Neo to</p><div class="nc-chips nc-hchips" role="group" aria-labelledby="nc-cap-' + mode + '"></div><div class="nc-sgrid" role="group" aria-labelledby="nc-cap-' + mode + '"></div><button class="nc-homelink" type="button">Or ask Neo to automate a task</button></div>');
      HOME.forEach(function (c) { var b = el('<button class="nc-scard" type="button"><b>' + c[0] + "</b><span>" + c[1] + "</span></button>"); b.onclick = function () { start(c[0]); }; e.querySelector(".nc-sgrid").append(b); });
      HOME.filter(function (c) { return c[2] !== "inbox"; }).map(function (c) { return c[0]; }).concat(["Automate a task"]).forEach(function (t) { var b = el('<button class="nc-chip" type="button">' + esc(t) + "</button>"); b.onclick = function () { start(t); }; e.querySelector(".nc-hchips").append(b); });
      e.querySelector(".nc-homelink").onclick = function () { start("Automate a task"); };
      thread.append(e); drawBrief(); drawLive();
      if (!window.NeoWorkspace) loadWS(function (err) { if (!err && thread.querySelector("[data-brief]")) drawBrief(); });
    }
    /* Live strip above the composer: what agents are doing and what waits on you, while a chat is open. */
    function drawLive() {
      var w = live || (window.NeoWorkspace ? NeoWorkspace.summary() : null), onHome = !!thread.querySelector(".nc-empty");
      liveEl.innerHTML = "";
      if (!w || onHome || (!w.running.length && !w.attention)) { liveEl.hidden = true; return; }
      if (w.running.length) { var r = w.running[0], b = el('<button class="nc-livebtn" type="button"><span class="nc-ring" aria-hidden="true"></span><span>' + esc(w.running.length > 1 ? w.running.length + " agents running" : r.name + " · " + r.pct + "%") + "</span></button>"); b.onclick = function () { openScreen(w.running.length > 1 ? "/runs?tab=running" : "/runs/" + r.id); }; liveEl.append(b); }
      if (w.attention) { var a = el('<button class="nc-livebtn nc-warn" type="button">' + WARN + "<span>" + w.attention + " need your decision</span></button>"); a.onclick = function () { openScreen("/attention"); }; liveEl.append(a); }
      liveEl.hidden = false;
    }
    inst.refreshLive = function (w) { if (w) live = w; drawLive(); drawBrief(); };
    function newChat() { stop(); flow = null; ST.active = null; save(); showEmpty(); renderHist(); setTitle(); workOpen = false; if (!docked()) histOpen = false; syncLayout(); input.focus(); }

    /* ---------- live answers ---------- */
    function stop() {
      if (!running) return;
      runId++;
      if (cur) {
        cur.root.classList.remove("nc-working"); cur.root.classList.add("nc-stopped"); cur.root.removeAttribute("aria-busy");
        if (cur.sk) cur.sk.remove();
        cur.body.querySelectorAll(".nc-ring").forEach(function (r) { r.parentNode.innerHTML = CROSS; });
        cur.body.querySelectorAll(".nc-shim").forEach(function (s) { s.classList.remove("nc-shim"); });
        var th = cur.body.querySelector(".nc-think"); if (th) th.remove();
        cur.body.append(el('<p class="nc-note">Stopped. Nothing was changed in your books.</p>')); down();
        if (cur.pending) record({ a: { k: "stopped" } });
        cur = null;
      }
      setRunning(false); say("Neo stopped. Nothing was changed.");
    }
    async function stream(p, text, id, perWord) {
      var parts = text.split("**");
      for (var j = 0; j < parts.length; j++) {
        var words = parts[j].split(/(\s+)/);
        for (var k = 0; k < words.length; k++) {
          if (!words[k]) continue;
          var s = document.createElement(j % 2 ? "b" : "span"); s.className = "nc-w"; s.textContent = words[k]; p.append(s);
          if (words[k].trim()) await sleep(perWord, id);
        }
        down();
      }
    }
    async function start(text, o) {
      o = o || {};
      if (running) stop();
      var exact = EXACT[text];
      if (!o.resume && flow && !exact) return flowReply(text);
      if (!o.resume && (exact === "auto" || (AUTO_RE.test(text) && !exact))) return flowStart(text);
      if (flow) { flow = null; persistFlow(); }
      var key = o.key || (o.kind && SC[o.kind] ? o.kind : null) || exact || (CTX && DOC_RE.test(text) ? "doc" : null) || pick(text);
      if (key === "doc" && !CTX) key = "generic";
      var docId = key === "doc" ? CTX.id : null, sc = key === "doc" ? docScript(docId) : SC[key], id = ++runId, failed = false;
      ensureItem(text);
      if (!o.resume) { thread.append(userEl(text)); record({ u: text }); }
      var badFile = !o.resume && o.files ? o.files.filter(function (f) { return /\.(jpe?g|png)$/i.test(f); })[0] : null;
      setRunning(true);
      var ai = aiEl(); ai.root.classList.add("nc-working"); ai.root.setAttribute("aria-busy", "true");
      thread.append(ai.root); cur = { root: ai.root, body: ai.body, pending: true }; down();
      t0 = performance.now();
      try {
        say("Neo is thinking");
        var think = el('<div class="nc-think"><span class="nc-shim">Thinking</span></div>'); ai.body.append(think);
        await sleep(700, id);
        think.remove();
        var ul = el('<ul class="nc-steps"></ul>'); ai.body.append(ul);
        for (var i = 0; i < sc.steps.length; i++) {
          var li = el('<li><span class="nc-ic"><span class="nc-ring"></span></span><span class="nc-shim">' + esc(sc.steps[i]) + "</span></li>"); ul.append(li); say(sc.steps[i]); down();
          await sleep(800 + i * 100, id);
          if (badFile && i === Math.min(1, sc.steps.length - 1)) { li.className = "fail"; li.innerHTML = '<span class="nc-ic">' + CROSS + "</span><span>Could not read " + esc(badFile) + "</span>"; failed = true; break; }
          li.className = "done"; li.innerHTML = '<span class="nc-ic">' + TICK + "</span><span>" + esc(sc.steps[i]) + "</span>";
        }
        if (failed) {
          ai.root.classList.remove("nc-working"); ai.root.removeAttribute("aria-busy");
          ai.body.append(errorEl(badFile, text, key)); record({ a: { k: "error", file: badFile, key: key } }); cur.pending = false;
          setRunning(false); say("One file could not be read."); down(); return;
        }
        var secs = ((performance.now() - t0) / 1000).toFixed(1);
        var det = el('<details class="nc-trail"><summary>Checked ' + sc.steps.length + " source" + (sc.steps.length > 1 ? "s" : "") + " · " + secs + "s</summary></details>");
        ul.replaceWith(det); det.append(ul);
        var sk = el('<div class="nc-skel" aria-hidden="true"><i></i><i></i></div>'); ai.body.append(sk); cur.sk = sk; down();
        await sleep(380, id); sk.remove(); cur.sk = null;
        var p = el('<p class="nc-ans" aria-hidden="true"></p>'); ai.body.append(p);
        await stream(p, sc.text, id, 22);
        p.removeAttribute("aria-hidden"); say(plain(sc.text));
        if (sc.card || (sc.fields && sc.fields.length) || sc.decide) { await sleep(200, id); answerExtras(ai.body, sc, true); down(); await sleep((sc.card ? sc.card.rows.length * 40 : 0) + 300, id); }
        ai.body.append(followChips(sc)); down();
        ai.root.classList.remove("nc-working"); ai.root.removeAttribute("aria-busy");
        record({ a: { k: "answer", key: key, doc: docId, secs: secs } }); cur.pending = false; setRunning(false);
      } catch (e) { if (e !== "cancel") throw e; }
    }
    /* A short Neo message (used by the automation flow). `after` may append chips/cards; `store` is what the transcript keeps. */
    async function neoSay(text, after, store) {
      var id = ++runId; setRunning(true);
      var ai = aiEl(); ai.root.classList.add("nc-working"); ai.root.setAttribute("aria-busy", "true");
      thread.append(ai.root); cur = { root: ai.root, body: ai.body, pending: true }; down();
      try {
        var think = el('<div class="nc-think"><span class="nc-shim">Thinking</span></div>'); ai.body.append(think); await sleep(450, id); think.remove();
        var p = el('<p class="nc-ans" aria-hidden="true"></p>'); ai.body.append(p);
        await stream(p, text, id, 16);
        p.removeAttribute("aria-hidden"); say(plain(text));
        if (after) await after(ai.body, id);
        ai.root.classList.remove("nc-working"); ai.root.removeAttribute("aria-busy");
        if (store) record({ a: store }); cur.pending = false; setRunning(false); down();
      } catch (e) { if (e !== "cancel") throw e; }
    }

    /* ---------- conversational automation: chat first, clarify when needed, confirm before creating ---------- */
    function parseSlots(t) {
      var o = {};
      o.what = /gst|gstr|\bitc\b/i.test(t) ? "gst" : /duplicate/i.test(t) ? "dups" : /reconcil|bank|statement/i.test(t) ? "bank" : /month.?end|clos(e|ing)/i.test(t) ? "month" : /invoice|bill|receipt|expense/i.test(t) ? "inv" : null;
      o.when = /new (bill|invoice|document)|(bill|invoice|document)s? (arrive|come in|is uploaded|are uploaded|upload)|whenever|as soon as|when .{0,20}(arrive|upload|receiv)/i.test(t) ? "arrives" : /month.?end|last (working )?day|every month|monthly/i.test(t) ? "monthend" : /monday|weekly|every week/i.test(t) ? "monday" : /morning|daily|every day|each day|every (evening|night)/i.test(t) ? "morning" : null;
      o.mode = /only suggest|never act|don'?t (act|post)/i.test(t) ? "suggest" : /handle clear|automatically|on its own|handle (it|them)/i.test(t) ? "auto" : /ask me|approv|confirm/i.test(t) ? "approve" : null;
      return o;
    }
    function nextStage() { var s = flow.slots; return !s.what ? "what" : !s.when ? "when" : !s.mode ? "mode" : "confirm"; }
    function flowSpec() {
      var s = flow.slots, w = WHAT_INFO[s.what];
      return { id: "auto-" + Date.now(), kind: s.what, name: w.name + " Automation", short: "Neo will " + w.short + " " + WHEN_LBL[s.when] + ".", long: "Neo will " + w.does + ", " + WHEN_LBL[s.when] + ". " + MODE_LBL[s.mode] + ".", caps: w.caps, sources: w.sources, icon: w.icon, runs: [], schedule: s.when, time: "morning", mode: s.mode,
        perms: { read: w.sources, suggest: ["Account coding", "GST treatment"], execute: s.mode === "suggest" ? [] : [["Prepare voucher", s.mode === "auto"]], approve: ["Post accounting entry", "Delete document", "Change a GST number"] } };
    }
    async function advance(first) {
      var st = flow.stage = nextStage(), s = flow.slots, w = WHAT_INFO[s.what]; persistFlow();
      var known = s.what ? "Neo will **" + w.short + "**" + (s.when ? " " + WHEN_LBL[s.when] : "") + ". " : "";
      var lead = first ? "I can set that up with you. " : "Got it. ";
      if (st === "what") { var t1 = (first ? "I can set that up with you. " : "") + "What should it take care of?"; return neoSay(t1, function (body) { body.append(stageChips()); }, { k: "say", text: t1 }); }
      if (st === "when") { var t2 = lead + known + "When should it run?"; return neoSay(t2, function (body) { body.append(stageChips()); }, { k: "say", text: t2 }); }
      if (st === "mode") { var t3 = lead + known + "How much should it do on its own? **Posting, deleting and GST number changes always wait for your approval.**"; return neoSay(t3, function (body) { body.append(stageChips()); }, { k: "say", text: t3 }); }
      var name = w.name + " Automation", rows = [["Does", "Neo will " + w.does], ["Runs", WHEN_LBL[s.when].charAt(0).toUpperCase() + WHEN_LBL[s.when].slice(1)], ["On its own", MODE_LBL[s.mode].replace(/^It /, "").replace(/^./, function (c) { return c.toUpperCase(); })], ["Always needs your approval", "Posting entries, deleting documents, changing GST numbers"]];
      var t4 = "Here is what I will create. Check it over, or tell me what to change.";
      return neoSay(t4, function (body) { body.append(planEl(name, rows), planBtns()); }, { k: "plan", text: t4, name: name, rows: rows });
    }
    async function createFlowAgent() {
      var spec = flowSpec(), s = flow.slots;
      await neoSay("Creating it now.", async function (body, id) {
        var ul = el('<ul class="nc-steps"></ul>'); body.append(ul);
        for (var i = 0, st = ["Setting up the agent", "Applying your approval rules"]; i < st.length; i++) {
          var li = el('<li><span class="nc-ic"><span class="nc-ring"></span></span><span class="nc-shim">' + st[i] + "</span></li>"); ul.append(li); await sleep(650, id);
          li.className = "done"; li.innerHTML = '<span class="nc-ic">' + TICK + "</span><span>" + st[i] + "</span>";
        }
      }, { k: "say", text: "Creating it now." });
      ST.newAgents = (ST.newAgents || []).concat([spec]);
      var a = activeItem(); if (a) { a.title = spec.name; a.agentId = spec.id; } flow = null; persistFlow(); renderHist(); setTitle();
      if (window.NeoWorkspace) NeoWorkspace.addAgent(spec); else loadWS(function (err) { if (!err) NeoWorkspace.addAgent(spec); });
      var t = "**" + spec.name + "** is live. It will run " + WHEN_LBL[s.when] + ". " + MODE_LBL[s.mode] + ". You can find it under Agents.";
      await neoSay(t, function (body) { body.append(createdBtns(spec.id)); }, { k: "created", id: spec.id, name: spec.name, text: t });
    }
    async function flowStart(text) {
      stop(); ensureItem(text); thread.append(userEl(text)); record({ u: text });
      flow = { slots: parseSlots(text), stage: null }; await advance(true);
    }
    async function flowReply(text) {
      stop(); thread.append(userEl(text)); record({ u: text });
      var got = parseSlots(text), st = flow.stage, s = flow.slots, any = ["what", "when", "mode"].some(function (k) { return got[k]; });
      if (st === "confirm" || st === "edit") {
        if (!any) { var t0 = "I did not catch a change. Pick what to change, or say it in a few words."; return neoSay(t0, function (body) { flow.stage = "edit"; persistFlow(); body.append(stageChips()); }, { k: "say", text: t0 }); }
        ["what", "when", "mode"].forEach(function (k) { if (got[k]) s[k] = got[k]; });
      } else if (got[st]) s[st] = got[st];
      else if (any) ["what", "when", "mode"].forEach(function (k) { if (got[k] && !s[k]) s[k] = got[k]; });
      else { var t1 = "I did not catch that. Pick one below, or say it in a few words."; return neoSay(t1, function (body) { body.append(stageChips()); }, { k: "say", text: t1 }); }
      persistFlow(); await advance();
    }

    /* ---------- composer ---------- */
    function renderFiles() {
      fchips.innerHTML = "";
      files.forEach(function (f, i) { var c = el('<span class="nc-fchip">' + esc(f) + '<button type="button" aria-label="Remove ' + esc(f) + '"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></span>'); c.querySelector("button").onclick = function () { files.splice(i, 1); renderFiles(); input.focus(); }; fchips.append(c); });
      if (!running) send.disabled = !input.value.trim() && !files.length;
    }
    fileIn.addEventListener("change", function () { Array.prototype.forEach.call(fileIn.files, function (f) { files.push(f.name); }); fileIn.value = ""; renderFiles(); input.focus(); });
    $("[data-attach]").onclick = function () { fileIn.click(); };
    form.addEventListener("submit", function (e) {
      e.preventDefault(); var v = input.value.trim(); if (running || (!v && !files.length)) return;
      var t = v || "Please read the attached file" + (files.length > 1 ? "s" : ""); if (files.length) t += " (attached: " + files.join(", ") + ")";
      var sent = files.slice(); input.value = ""; input.style.height = "32px"; files = []; renderFiles(); drawSugg(); start(t, { files: sent });
    });
    send.addEventListener("click", function () { if (running) stop(); });
    input.addEventListener("input", function () { input.style.height = "32px"; input.style.height = Math.min(input.scrollHeight, 104) + "px"; if (!running) send.disabled = !input.value.trim() && !files.length; drawSugg(); });
    /* Quick actions while typing: Up/Down to choose, Enter to run it; Enter with nothing chosen sends the text as typed. */
    function drawSugg() {
      var v = input.value.trim().toLowerCase(), toks = v.split(/\s+/).filter(Boolean); sugg.innerHTML = ""; sIdx = -1; input.removeAttribute("aria-activedescendant");
      var hits = v.length < 2 || running ? [] : quickList().filter(function (l) { var words = (l + " " + (ALIAS[l] || "")).toLowerCase().split(/[^a-z?-]+/); return toks.every(function (t) { return words.some(function (w) { return w.indexOf(t) === 0; }); }); }).slice(0, 3);
      hits.forEach(function (l, i) { var b = el('<button class="nc-sitem" type="button" role="option" id="' + sugg.id + "-" + i + '" aria-selected="false" data-q="' + esc(l) + '">' + SEARCH + "<span>" + esc(l) + "</span></button>"); b.onmousedown = function (e) { e.preventDefault(); }; b.onclick = function () { pickSugg(l); }; sugg.append(b); });
      sugg.hidden = !hits.length; input.setAttribute("aria-expanded", String(!!hits.length));
    }
    function pickSugg(l) { input.value = ""; input.style.height = "32px"; drawSugg(); start(l); }
    function moveSugg(d) { var items = sugg.querySelectorAll(".nc-sitem"); if (!items.length) return; sIdx = (sIdx + d + items.length) % items.length; items.forEach(function (it, i) { it.setAttribute("aria-selected", String(i === sIdx)); }); input.setAttribute("aria-activedescendant", items[sIdx].id); }
    input.addEventListener("blur", function () { setTimeout(function () { if (document.activeElement !== input) { sugg.hidden = true; input.setAttribute("aria-expanded", "false"); } }, 120); });
    input.addEventListener("keydown", function (e) {
      var open = !sugg.hidden;
      if (open && (e.key === "ArrowDown" || e.key === "ArrowUp")) { e.preventDefault(); moveSugg(e.key === "ArrowDown" ? 1 : -1); return; }
      if (open && e.key === "Escape") { e.preventDefault(); e.stopPropagation(); sugg.hidden = true; sIdx = -1; input.setAttribute("aria-expanded", "false"); return; }
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (open && sIdx > -1) { pickSugg(sugg.querySelectorAll(".nc-sitem")[sIdx].dataset.q); return; } form.requestSubmit(); }
    });
    root.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (workOpen) { closeWork(); e.stopPropagation(); return; }
      if (!hist.hidden && !docked()) { openHist(false); e.stopPropagation(); return; }
      if (running) { stop(); e.stopPropagation(); return; }
      if (expanded) { inst.setExpanded(false); e.stopPropagation(); return; }
      if (opts.onClose) { opts.onClose(); e.stopPropagation(); }
    });
    histBtn.onclick = function () { openHist(hist.hidden); };
    $("[data-hclose]").onclick = function () { openHist(false); };
    root.querySelectorAll("[data-new]").forEach(function (b) { b.onclick = newChat; });

    /* ---------- expand in place (product pages) ---------- */
    function trackNav() {
      whenNav(function () {
        var a = navAside(), set = function () { root.style.setProperty("--nc-left", a.getBoundingClientRect().right + "px"); };
        set(); if (window.ResizeObserver) { navRO = new ResizeObserver(set); navRO.observe(a); }
        var b = navBtn();
        if (b.getAttribute("aria-expanded") === "true") { b.click(); ST.navHeld = true; save(); }
      });
    }
    function releaseNav() {
      if (navRO) { navRO.disconnect(); navRO = null; }
      if (ST.navHeld) { ST.navHeld = false; save(); var b = navBtn(); if (b && b.getAttribute("aria-expanded") === "false") b.click(); }
      root.style.removeProperty("--nc-left");
    }
    if (opts.inPlace) document.addEventListener("click", function (e) {
      var l = expanded && e.target.closest && e.target.closest("#" + PNAV + " a:not(#nav-neo)"); if (l) inst.setExpanded(false, true);
    }, true);
    function setFull(on) { mode = on ? "full" : "panel"; root.classList.toggle("nc-full", on); syncLayout(); }
    function screenOn(on) { screenEl.hidden = !on; root.classList.toggle("nc-onscreen", on); }
    function chatHash() { return "/chat/" + (ST.active != null ? ST.active : "new"); }
    function wsNote(text) { var n = $("[data-wsnav]"); n.innerHTML = '<p class="nc-wsnote">' + esc(text) + "</p>"; }
    inst.setExpanded = function (on, instant) {
      if (!opts.inPlace || on === expanded) return;
      expanded = on; ST.expanded = on; save(); clearTimeout(expT);
      document.body.classList.toggle("nc-neo-full", on); expBtn.innerHTML = on ? COLLAPSE : EXPAND; expBtn.setAttribute("aria-label", on ? "Minimize to floating chat" : "Expand Neo"); expBtn.title = on ? "Minimize" : "Expand";
      var nn = document.getElementById("nav-neo"); if (nn) { if (on) nn.setAttribute("aria-current", "page"); else nn.removeAttribute("aria-current"); }
      var quick = instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (instant) { root.classList.add("nc-notrans"); requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove("nc-notrans"); }); }); }
      if (on) {
        trackNav(); inst.ensureWS(); setFull(true); root.classList.add("nc-pre"); void root.offsetWidth;
        root.classList.add("nc-expanded"); root.classList.remove("nc-pre");
      } else {
        releaseNav(); screenOn(false); if (window.NeoWorkspace && wsAttached) NeoWorkspace.setRoute(chatHash());
        root.classList.add("nc-pre"); root.classList.remove("nc-expanded");
        var settle = function () { setFull(false); root.classList.remove("nc-pre"); };
        if (quick) settle(); else expT = setTimeout(settle, 250);
      }
    };
    inst.expanded = function () { return expanded; };
    inst.routeChat = function (id, q, about) {
      screenOn(false);
      if (q) { inst.start(q, { kind: KIND2SC[about] || null }); return; }
      if (id === "new" || id == null) { if (ST.active != null) newChat(); }
      else { var n = +id; if (!isNaN(n) && n !== ST.active) inst.open(n); }
      input.focus();
    };
    inst.ensureWS = function () {
      if (!wsAttached && !window.NeoWorkspace) wsNote("Loading Neo…");
      loadWS(function (err) {
        if (err) { wsNote("The Neo workspace could not load. Chat still works; reload the page to try again."); return; }
        if (!wsAttached) { wsAttached = true; NeoWorkspace.attach({ nav: $("[data-wsnav]"), screen: $("[data-sbody]"), hash: chatHash(), onScreen: screenOn, onChat: inst.routeChat, onLeave: function () { ST.expanded = false; ST.navHeld = false; save(); } }); }
        else NeoWorkspace.setRoute(chatHash());
      });
    };
    inst.focusChat = function () {
      if (root.classList.contains("nc-onscreen") && window.NeoWorkspace) NeoWorkspace.navigate("/chat/" + (ST.active != null ? ST.active : "new"));
      input.focus();
    };
    if (opts.inPlace) { $("[data-sexpand]").onclick = function () { inst.setExpanded(false); }; $("[data-sclose]").onclick = function () { if (opts.onClose) opts.onClose(); }; }
    expBtn.onclick = function () { if (opts.inPlace) inst.setExpanded(!expanded); else if (opts.onExpand) opts.onExpand(ST.active); };
    $("[data-close]").onclick = function () { if (opts.onClose) opts.onClose(); };
    (mq.addEventListener ? mq.addEventListener("change", syncLayout) : mq.addListener(syncLayout));

    /* public */
    inst.start = function (t, o) { if (ST.active != null) { ST.active = null; flow = null; save(); showEmpty(); } start(t, o); };
    inst.open = function (id) { if (id != null && ST.hs.some(function (h) { return h.id === id; })) openSaved(id); };
    inst.newChat = newChat; inst.focus = function () { input.focus(); }; inst.stop = stop; inst.refresh = function () { renderHist(); setTitle(); };
    inst.root = root;

    renderHist(); setTitle(); setRunning(false); syncLayout();
    var a0 = activeItem(); if (a0 && opts.restore !== false) renderSaved(a0); else showEmpty();
    return inst;
  }

  /* ---------- floating panel on product pages ---------- */
  function hostPanel() {
    document.body.classList.add("nc-host");
    var tab = el('<button class="nc-tab" type="button" title="Ask Neo (Ctrl J)"><span class="nc-mark" aria-hidden="true">' + STAR + '</span><span class="nc-lbl">Ask Neo</span></button>');
    var panel = document.createElement("aside"); panel.setAttribute("aria-label", "Neo chat");
    document.body.append(tab, panel);
    var inst = mount(panel, { mode: "panel", inPlace: true,
      onHistory: function () { if (window.NeoWorkspace) NeoWorkspace.refreshNav(); },
      onClose: function () { setOpen(false); } });
    function warm() { setTimeout(function () { loadWS(function () {}); }, 400); }
    if (document.readyState === "complete") warm(); else window.addEventListener("load", warm);
    function setOpen(o) { ST.open = o; save(); if (!o && inst.expanded()) setTimeout(function () { if (!ST.open) inst.setExpanded(false, true); }, 260); panel.classList.toggle("nc-open", o); tab.hidden = o; panel.setAttribute("aria-hidden", String(!o)); var pill = document.querySelector('header button[aria-label="Ask Neo"]'); if (pill) pill.setAttribute("aria-pressed", String(o)); if (o) inst.focus(); }
    /* Inside the expanded Neo the pill and Ctrl J focus the composer; outside they open/close the floating panel. */
    function toggle() { if (ST.open && inst.expanded()) inst.focusChat(); else setOpen(!ST.open); }
    tab.onclick = function () { setOpen(true); };
    document.addEventListener("click", function (e) {
      var n = e.target.closest && e.target.closest("#nav-neo"); if (!n || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault(); e.stopPropagation(); if (ST.open && inst.expanded()) inst.focusChat(); else { setOpen(true); inst.setExpanded(true); } }, true);
    document.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest('header button[aria-label="Ask Neo"]'); if (b) { e.preventDefault(); e.stopPropagation(); toggle(); } }, true);
    document.addEventListener("keydown", function (e) { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") { e.preventDefault(); e.stopPropagation(); toggle(); } }, true);
    new MutationObserver(function () { var pill = document.querySelector('header button[aria-label="Ask Neo"]'); if (pill && pill.getAttribute("aria-pressed") !== String(ST.open)) pill.setAttribute("aria-pressed", String(ST.open)); }).observe(document.body, { childList: true, subtree: true });
    setOpen(!!ST.open);
    if (ST.open && ST.expanded) inst.setExpanded(true, true);
    window.NeoChat.panel = inst;
  }

  window.NeoChat = { save: save, mount: mount, history: function () { return ST.hs; }, active: function () { return ST.active; }, setActive: function (id) { ST.active = id; save(); }, state: function () { return ST; },
    live: function (w) { INSTANCES.forEach(function (i) { if (i.refreshLive) i.refreshLive(w); }); }, context: function () { return CTX; } };
  if (!document.getElementById("app")) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hostPanel); else hostPanel(); }
})();
