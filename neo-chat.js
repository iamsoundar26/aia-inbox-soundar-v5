/* Neo chat — compact Ask Neo interaction (ported from the Ask Neo prototype artifact, 8 Oct 2026).
   window.NeoChat.mount(container, { mode: "panel" | "full" }) builds the UI. On app pages (no workspace) it
   self-mounts as a side panel behind the Ask Neo pill, the floating tab and Ctrl J. Chats, decisions and the
   open conversation are kept in sessionStorage so the side panel and the full view continue the same thread. */
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
  var X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var EXPAND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
  var COLLAPSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 10h6V4M10 14H4v6M20 4l-6 6M4 20l6-6"/></svg>';
  var HISTI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>';
  var PEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
  var PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
  var IC = {
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1Z"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 7v6M12 17h.01"/></svg>',
    dup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
  };

  /* ---------- sample data ---------- */
  var BILLS = {
    sharma: { v: "Sharma Traders", no: "SH/2291", date: "3 Oct 2026", due: "2 Nov 2026", sub: "₹40,847", gst: "₹7,353", tot: "₹48,200", gstin: "33ABCPS1234F1Z5", cat: "Packaging materials", file: "Bill_SH-2291.pdf", kind: "ready", tag: ["Ready", "ok"] },
    patel: { v: "Patel Logistics", no: "PL-0877", date: "3 Oct 2026", due: "18 Oct 2026", sub: "₹95,339", gst: "₹17,161", tot: "₹1,12,500", gstin: "27AAHFP5678K1Z2", cat: "Freight and cartage", file: "Bill_PL-0877.pdf", kind: "ready", tag: ["Ready", "ok"] },
    lotus: { v: "Lotus Packaging", no: "LP/554", date: "2 Oct 2026", due: "1 Nov 2026", sub: "₹35,932", gst: "₹6,468", tot: "₹42,400", gstin: "29AABCL4321M1Z8", cat: "Packaging materials", file: "Bill_LP-554.pdf", kind: "ready", tag: ["Ready", "ok"] },
    anand: { v: "Anand Textiles", no: "AT-3310", date: "1 Oct 2026", due: "31 Oct 2026", sub: "₹73,305", gst: "₹13,195", tot: "₹86,500", gstin: "33AAFCA8765D1Z1", cat: "Raw materials", file: "Bill_AT-3310.pdf", kind: "ready", tag: ["Ready", "ok"] },
    meera: { v: "Meera Stationers", no: "MS/19", date: "1 Oct 2026", due: "16 Oct 2026", sub: "₹5,797", gst: "₹1,043", tot: "₹6,840", gstin: "", cat: "Office supplies", file: "Bill_MS-19.jpg", kind: "gst", tag: ["GST number missing", "warn"] },
    sharmaDup: { v: "Sharma Traders", no: "SH/2291", date: "3 Oct 2026", due: "2 Nov 2026", sub: "₹40,847", gst: "₹7,353", tot: "₹48,200", gstin: "33ABCPS1234F1Z5", cat: "Packaging materials", file: "Bill_SH-2291_copy.pdf", kind: "dup", tag: ["Possible duplicate", "bad"] }
  };
  var SC = {
    inbox: { match: /inbox|bill|read|review|invoice/i, q: "Work the Inbox with me",
      steps: ["Reading 6 new documents in Inbox", "Extracting vendor, date and amounts", "Checking GST numbers and matching vendors", "Looking for duplicates"],
      text: "I read **6 new bills**. **4 are ready** to approve, **1 needs a check** because the vendor GST number is missing, and **1 looks like a duplicate**. Select a bill to review the extracted details.",
      card: { title: "New bills", aside: "6 in Inbox", rows: [["Sharma Traders", "Bill SH/2291 · 3 Oct", "₹48,200", "sharma"], ["Patel Logistics", "Bill PL-0877 · 3 Oct", "₹1,12,500", "patel"], ["Lotus Packaging", "Bill LP/554 · 2 Oct", "₹42,400", "lotus"], ["Anand Textiles", "Bill AT-3310 · 1 Oct", "₹86,500", "anand"], ["Meera Stationers", "Bill MS/19 · 1 Oct", "₹6,840", "meera"], ["Sharma Traders", "Bill SH/2291 · 3 Oct", "₹48,200", "sharmaDup"]] },
      follow: ["What needs my attention?", "Find duplicates"] },
    attention: { match: /attention|waiting|blocked/i, q: "What needs my attention?",
      steps: ["Checking documents waiting for review", "Finding blocked documents", "Comparing for duplicates"],
      text: "**9 items** need you: **5 are waiting** for your review, **3 are blocked** by missing vendor details, and **1 is a possible duplicate**.",
      card: { title: "Needs attention", aside: "9 items", rows: [["Waiting for review", "5 documents · oldest 4 days", "5", ["Waiting", "info"]], ["Blocked: no vendor GST number", "Meera Stationers and 2 others", "3", ["Blocked", "warn"]], ["Possible duplicate", "Sharma Traders · SH/2291", "1", ["Check", "bad"]]] },
      follow: ["Work the Inbox with me", "Find duplicates"] },
    dups: { match: /duplicate/i, q: "Find duplicates",
      steps: ["Comparing vendor, bill number and amount", "Matching dates and file contents"],
      text: "I found **2 certain duplicates**. Each pair has the same vendor, bill number and amount. Choose what to do with each.",
      card: { title: "Certain duplicates", aside: "2 pairs", rows: [["Sharma Traders · SH/2291", "Uploaded twice, 3 Oct 10:14 and 10:16", "₹48,200", ["Certain match", "bad"], true], ["Patel Logistics · PL-0871", "Emailed and uploaded, 29 Sep", "₹23,900", ["Certain match", "bad"], true]] },
      follow: ["What needs my attention?", "Work the Inbox with me"] },
    gst: { match: /gst/i, q: "Check GST issues",
      steps: ["Comparing the purchase register with GSTR-2B", "Validating vendor GST numbers", "Checking input credit eligibility"],
      text: "**186 transactions** checked for September. **179 match** GSTR-2B, **6 have amount mismatches** and **1 vendor GST number** differs from your vendor record.",
      card: { title: "GST check · September", aside: "7 issues", rows: [["Amount mismatch", "6 purchase bills differ from GSTR-2B by ₹12 to ₹480", "6", ["Check", "warn"]], ["GSTIN differs from vendor record", "Zoho Corporation", "1", ["Blocked", "warn"]]] },
      follow: ["What needs my attention?", "Work the Inbox with me"] },
    generic: { match: /.*/, q: "",
      steps: ["Looking through your books", "Preparing a draft for you"],
      text: "I can help with that. This is a first look; **nothing has been posted or changed** in your books.",
      follow: ["Work the Inbox with me", "What needs my attention?"] }
  };
  var SEED = [
    { id: 1, title: "Work the Inbox with me", group: "Today", when: "9:12 am", sc: "inbox" },
    { id: 2, title: "Missing GST on Meera Stationers", group: "Today", when: "8:40 am", sc: "attention" },
    { id: 3, title: "Duplicate bills in September", group: "Yesterday", when: "4:05 pm", sc: "dups" },
    { id: 4, title: "What needs my attention?", group: "Yesterday", when: "11:30 am", sc: "attention" },
    { id: 5, title: "Patel Logistics vendor mapping", group: "Previous 7 days", when: "1 Oct", sc: "inbox" },
    { id: 6, title: "Find duplicates", group: "Previous 7 days", when: "30 Sep", sc: "dups" }
  ];

  /* ---------- shared state (sessionStorage) ---------- */
  var ST;
  function load() { try { ST = JSON.parse(sessionStorage.getItem("neoChat") || "null"); } catch (e) { ST = null; } if (!ST || !ST.hs) ST = { hs: SEED.slice(), uid: 100, billState: {}, active: null, open: false }; }
  function save() { try { sessionStorage.setItem("neoChat", JSON.stringify(ST)); } catch (e) {} }
  load();

  function pick(t) { var k = ["dups", "attention", "gst", "inbox"]; for (var i = 0; i < k.length; i++) if (SC[k[i]].match.test(t)) return k[i]; return "generic"; }
  function el(h) { var t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function plain(s) { return s.replace(/\*\*/g, ""); }
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
  function nowLabel() { var d = new Date(), h = d.getHours(), m = d.getMinutes(); return ((h % 12) || 12) + ":" + (m < 10 ? "0" : "") + m + (h < 12 ? " am" : " pm"); }

  /* Neo workspace (nav + screens) is the Neo page's own code, loaded lazily so the expanded view and the Neo tab are literally the same UI. */
  var NEO_V = "14";
  function loadWS(cb) {
    if (window.NeoWorkspace) return cb();
    if (loadWS.q) { loadWS.q.push(cb); return; }
    loadWS.q = [cb];
    var l = document.createElement("link"); l.rel = "stylesheet"; l.href = BASE + "/neo/neo.css?v=" + NEO_V; document.head.appendChild(l);
    var sc = document.createElement("script"); sc.src = BASE + "/neo/neo.js?v=" + NEO_V;
    sc.onload = function () { var q = loadWS.q; loadWS.q = null; q.forEach(function (f) { f(); }); }; document.body.appendChild(sc);
  }

  /* Main product navigation (the host app's own sidebar): collapse it while Neo is expanded, restore it after. */
  var PNAV = "prototype-main-navigation";
  function navBtn() { return document.querySelector('button[aria-controls="' + PNAV + '"]'); }
  function navAside() { var n = document.getElementById(PNAV); return n && n.closest("aside"); }
  function whenNav(fn, tries) { if (navBtn() && navAside()) return fn(); if ((tries || 0) < 40) setTimeout(function () { whenNav(fn, (tries || 0) + 1); }, 100); }

  /* ---------- instance ---------- */
  function mount(container, opts) {
    opts = opts || {};
    var mode = opts.mode || "panel", inst = {};
    var mq = window.matchMedia("(min-width: 861px)");
    var root = container; root.className = "nc " + (mode === "full" ? "nc-full" : "nc-panel");
    root.innerHTML =
      '<aside class="nc-hist" aria-label="Chat history" hidden><div class="nc-hhead"><h2>History</h2><button class="nc-ibtn" type="button" data-hclose aria-label="Close history">' + X + '</button></div>' +
      '<div class="nc-hbar"><button class="nc-newbtn" type="button" data-new>' + PLUS + 'New chat</button><div class="nc-hsearch">' + SEARCH + '<label class="nc-sr" for="nc-hs-' + mode + '">Search chats</label><input id="nc-hs-' + mode + '" type="search" placeholder="Search chats" autocomplete="off"></div></div><div class="nc-hscroll" data-hlist></div><div class="neo-scope nc-wsnav" data-wsnav></div></aside>' +
      '<div class="nc-chat"><header class="nc-head"><span class="nc-mark" aria-hidden="true">' + STAR + '</span><div class="nc-ttl"><b data-ttl>Neo</b></div>' +
      '<button class="nc-ibtn" type="button" data-histbtn aria-label="Chat history" aria-expanded="false">' + HISTI + '</button><button class="nc-ibtn" type="button" data-new aria-label="New chat">' + PEN + '</button>' +
      '<button class="nc-ibtn" type="button" data-expand aria-label="' + (mode === "full" ? "Minimize to floating chat" : "Expand Neo") + '">' + (mode === "full" ? COLLAPSE : EXPAND) + '</button><button class="nc-ibtn" type="button" data-close aria-label="Close Neo">' + X + "</button></header>" +
      '<div class="nc-thread" data-thread role="region" aria-label="Conversation with Neo" tabindex="0"></div>' +
      '<form class="nc-composer" data-form><div class="nc-box"><div class="nc-fchips" data-fchips></div><input type="file" class="nc-sr" data-file tabindex="-1" aria-hidden="true" accept=".pdf,.jpg,.jpeg,.png"><button class="nc-ibtn nc-sm32" type="button" data-attach aria-label="Attach a bill or document">' + PLUS + '</button><label class="nc-sr" for="nc-in-' + mode + '">Message Neo</label><textarea id="nc-in-' + mode + '" rows="1" placeholder="Ask Neo anything"></textarea><button class="nc-send" type="submit" data-send aria-label="Send" disabled>' + ARROW + '</button></div><p class="nc-hint">Neo can make mistakes. Review extracted details before approving.</p></form></div>' +
      '<div class="nc-screen" hidden><div class="nc-shead"><button class="nc-ibtn" type="button" data-sexpand aria-label="Minimize to floating chat">' + COLLAPSE + '</button><button class="nc-ibtn" type="button" data-sclose aria-label="Close Neo">' + X + '</button></div><div class="nc-sbody neo-scope" data-sbody></div></div>' +
      '<aside class="nc-work" aria-label="Review bill" hidden><div class="nc-hhead"><h2 data-wt tabindex="-1">Review bill</h2><button class="nc-ibtn" type="button" data-wclose aria-label="Close review panel">' + X + '</button></div><div class="nc-wbody" data-wbody></div><div class="nc-wfoot" data-wfoot></div></aside>' +
      '<div class="nc-sr" role="status" aria-live="polite" data-status></div>';
    var $ = function (s) { return root.querySelector(s); };
    var thread = $("[data-thread]"), input = $("textarea"), send = $("[data-send]"), form = $("[data-form]"), hist = $(".nc-hist"), histList = $("[data-hlist]"), statusEl = $("[data-status]"), histBtn = $("[data-histbtn]"), search = $(".nc-hsearch input"), fileIn = $("[data-file]"), fchips = $("[data-fchips]"), work = $(".nc-work"), wbody = $("[data-wbody]"), wfoot = $("[data-wfoot]"), ttl = $("[data-ttl]");
    var histOpen = false, workOpen = false, workKey = null, workTrigger = null, running = false, runId = 0, cur = null, t0 = 0, files = [];

    function sleep(ms, id) { return new Promise(function (res, rej) { setTimeout(function () { id === runId ? res() : rej("cancel"); }, ms); }); }
    function down() { requestAnimationFrame(function () { thread.scrollTop = thread.scrollHeight; }); }
    function say(m) { statusEl.textContent = ""; setTimeout(function () { statusEl.textContent = m; }, 60); }
    function setRunning(r) { running = r; send.innerHTML = r ? STOP : ARROW; send.setAttribute("aria-label", r ? "Stop Neo" : "Send"); send.type = r ? "button" : "submit"; send.disabled = !r && !input.value.trim() && !files.length; }
    var side = opts.sidebar !== false;
    var expanded = false, expT = 0;
    function docked() { return mode === "full" && mq.matches; }
    function syncLayout() { root.classList.toggle("nc-docked", docked()); hist.hidden = docked() ? !side : !histOpen; histBtn.hidden = docked(); histBtn.setAttribute("aria-expanded", String(!hist.hidden)); work.hidden = !workOpen; }
    function openHist(o) { histOpen = o; if (o) workOpen = false; syncLayout(); if (o) search.focus(); else histBtn.focus(); }
    function activeItem() { return ST.hs.filter(function (h) { return h.id === ST.active; })[0]; }
    function setTitle() { var a = activeItem(); ttl.textContent = a ? a.title : "Neo"; }
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
    function refreshTags(key) { var t = tagFor(key); root.querySelectorAll('[data-bill="' + key + '"] .nc-tag').forEach(function (n) { n.className = "nc-tag " + t[1]; n.textContent = t[0]; }); }
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

    /* builders */
    function userEl(t) { return el('<div class="nc-user"><span class="nc-sr">You said: </span>' + esc(t) + "</div>"); }
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
      return card;
    }
    function rowActions(d) {
      var box = el('<div class="nc-ra"></div>');
      var del = el('<button class="nc-btn nc-sm nc-danger" type="button" aria-label="Delete duplicate ' + esc(d[0]) + '">Delete duplicate</button>'), keep = el('<button class="nc-btn nc-sm" type="button" aria-label="Keep ' + esc(d[0]) + '">Keep</button>');
      function reset(focus) { box.innerHTML = ""; box.append(del, keep); if (focus) del.focus(); }
      function settle(msg) { box.innerHTML = ""; box.append(el('<span class="nc-settled">' + msg + "</span>")); var u = el('<button class="nc-link" type="button">Undo</button>'); u.onclick = function () { reset(true); say("Undone"); }; box.append(u); u.focus(); say(msg); }
      del.onclick = function () { settle("Duplicate deleted."); }; keep.onclick = function () { settle("Kept. Both bills stay in your books."); };
      reset(false); return box;
    }
    function renderSaved(item) {
      var sc = SC[item.sc]; thread.innerHTML = "";
      thread.append(userEl(sc.q || item.title));
      var r = el('<div class="nc-ai">' + AV + '<div class="nc-body"><span class="nc-sr">Neo says: </span></div></div>'), body = r.querySelector(".nc-body");
      var det = el('<details class="nc-trail"><summary>Checked ' + sc.steps.length + ' sources</summary><ul class="nc-steps"></ul></details>');
      sc.steps.forEach(function (s) { det.querySelector("ul").append(el('<li class="done"><span class="nc-ic">' + TICK + "</span><span>" + esc(s) + "</span></li>")); });
      body.append(det, el('<p class="nc-ans">' + rich(sc.text) + "</p>"));
      if (sc.card) body.append(cardEl(sc.card, false));
      body.append(el('<p class="nc-note">Saved chat from ' + esc(item.when) + ". Ask a follow-up to continue.</p>"));
      thread.append(r); thread.scrollTop = 0;
    }
    function showEmpty() {
      thread.innerHTML = "";
      var e = el('<div class="nc-empty"><span class="nc-mark" aria-hidden="true">' + STAR + "</span><h2>6 bills are waiting. Let's clear them.</h2><p class=\"nc-sub\">Neo prepares the work. You approve before anything posts.</p><div class=\"nc-starters\"></div></div>");
      var st = e.querySelector(".nc-starters");
      var hero = el('<button class="nc-starter nc-hero" type="button"><span class="nc-ic">' + IC.inbox + '</span><span><b>Work the Inbox with me</b><span class="nc-d">Read, check and prepare all 6 new bills</span></span></button>');
      hero.onclick = function () { start("Work the Inbox with me"); }; st.append(hero);
      [["alert", "What needs my attention?", "9 items waiting, blocked or duplicated"], ["dup", "Find duplicates", "2 certain matches ready to clear"]].forEach(function (s2) {
        var b = el('<button class="nc-starter" type="button"><span class="nc-ic">' + IC[s2[0]] + "</span><span><b>" + s2[1] + '</b><span class="nc-d">' + s2[2] + "</span></span></button>");
        b.onclick = function () { start(s2[1]); }; st.append(b);
      });
      var h = new Date().getHours(), hi = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
      var home = el('<div class="nc-home"><h2>' + hi + ', Soundar</h2><p class="nc-sub">What would you like Neo to help with?</p><div class="nc-sgrid"></div></div>');
      [["Review invoices", "Review all invoices uploaded today"], ["Find duplicates", "Find duplicate bills"], ["Reconcile banking", "Reconcile banking"], ["Automate a task", "I want to automate a task"]].forEach(function (c) {
        var b = el('<button class="nc-scard" type="button">' + c[0] + "</button>"); b.onclick = function () { start(c[1]); }; home.querySelector(".nc-sgrid").append(b);
      });
      e.append(home); thread.append(e);
    }
    function newChat() { stop(); ST.active = null; save(); showEmpty(); renderHist(); setTitle(); workOpen = false; if (!docked()) histOpen = false; syncLayout(); input.focus(); }

    /* run */
    function stop() {
      if (!running) return;
      runId++;
      if (cur) {
        cur.root.classList.remove("nc-working"); cur.root.classList.add("nc-stopped");
        if (cur.sk) cur.sk.remove();
        cur.body.querySelectorAll(".nc-ring").forEach(function (r) { r.parentNode.innerHTML = CROSS; });
        cur.body.querySelectorAll(".nc-shim").forEach(function (s) { s.classList.remove("nc-shim"); });
        var th = cur.body.querySelector(".nc-think"); if (th) th.remove();
        cur.body.append(el('<p class="nc-note">Stopped. Nothing was changed in your books.</p>')); down();
      }
      setRunning(false); say("Neo stopped. Nothing was changed.");
    }
    async function start(text, o) {
      o = o || {};
      if (running) stop();
      var key = pick(text), sc = SC[key], id = ++runId, failed = false;
      var first = thread.querySelector(".nc-empty"); if (first) first.remove();
      if (!o.resume && ST.active == null) { var h = { id: ++ST.uid, title: text.length > 34 ? text.slice(0, 32) + "…" : text, group: "Today", when: nowLabel(), sc: key }; ST.hs.unshift(h); ST.active = h.id; save(); renderHist(); setTitle(); }
      else if (!o.resume) { var a = activeItem(); if (a) { a.sc = key; save(); } }
      setRunning(true);
      if (!o.resume) thread.append(userEl(text));
      var r = el('<div class="nc-ai nc-working" aria-busy="true">' + AV + '<div class="nc-body"><span class="nc-sr">Neo says: </span></div></div>'), body = r.querySelector(".nc-body");
      thread.append(r); cur = { root: r, body: body }; down();
      t0 = performance.now();
      try {
        say("Neo is thinking");
        var think = el('<div class="nc-think"><span class="nc-shim">Thinking</span></div>'); body.append(think);
        await sleep(700, id);
        think.remove();
        var ul = el('<ul class="nc-steps"></ul>'); body.append(ul);
        for (var i = 0; i < sc.steps.length; i++) {
          var li = el('<li><span class="nc-ic"><span class="nc-ring"></span></span><span class="nc-shim">' + esc(sc.steps[i]) + "</span></li>"); ul.append(li); say(sc.steps[i]); down();
          await sleep(800 + i * 100, id);
          if (o.fail && i === 1) { li.className = "fail"; li.innerHTML = '<span class="nc-ic">' + CROSS + "</span><span>Could not read INV_scan_0412.pdf</span>"; failed = true; break; }
          li.className = "done"; li.innerHTML = '<span class="nc-ic">' + TICK + "</span><span>" + esc(sc.steps[i]) + "</span>";
        }
        if (failed) {
          r.classList.remove("nc-working"); r.removeAttribute("aria-busy");
          var err = el('<div class="nc-errcard" role="alert"><p><b>One file could not be read.</b> The scan of INV_scan_0412.pdf is too blurry to extract amounts. I stopped before changing anything.</p><div class="nc-btns"><button class="nc-btn nc-pri" type="button">Skip this file and continue</button><button class="nc-btn" type="button">Upload a clearer copy</button></div></div>');
          err.querySelector(".nc-pri").onclick = function () { err.remove(); start(text, { resume: true }); };
          body.append(err); setRunning(false); down(); return;
        }
        var secs = ((performance.now() - t0) / 1000).toFixed(1);
        var det = el('<details class="nc-trail"><summary>Checked ' + sc.steps.length + " sources · " + secs + "s</summary></details>");
        ul.replaceWith(det); det.append(ul);
        var sk = el('<div class="nc-skel" aria-hidden="true"><i></i><i></i></div>'); body.append(sk); cur.sk = sk; down();
        await sleep(380, id); sk.remove(); cur.sk = null;
        var p = el('<p class="nc-ans" aria-hidden="true"></p>'); body.append(p);
        var parts = sc.text.split("**");
        for (var j = 0; j < parts.length; j++) {
          var words = parts[j].split(/(\s+)/);
          for (var k = 0; k < words.length; k++) {
            if (!words[k]) continue;
            var s = document.createElement(j % 2 ? "b" : "span"); s.className = "nc-w"; s.textContent = words[k]; p.append(s);
            if (words[k].trim()) await sleep(22, id);
          }
          down();
        }
        p.removeAttribute("aria-hidden"); say(plain(sc.text));
        if (sc.card) { await sleep(200, id); body.append(cardEl(sc.card, true)); down(); await sleep(sc.card.rows.length * 40 + 300, id); }
        var ch = el('<div class="nc-chips" role="group" aria-label="Suggested follow-ups"></div>');
        sc.follow.forEach(function (t) { var b = el('<button class="nc-chip" type="button">' + esc(t) + "</button>"); b.onclick = function () { start(t); }; ch.append(b); });
        body.append(ch); down();
        r.classList.remove("nc-working"); r.removeAttribute("aria-busy"); setRunning(false);
      } catch (e) { if (e !== "cancel") throw e; }
    }

    /* composer */
    function renderFiles() {
      fchips.innerHTML = "";
      files.forEach(function (f, i) { var c = el('<span class="nc-fchip">' + esc(f) + '<button type="button" aria-label="Remove ' + esc(f) + '"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></span>'); c.querySelector("button").onclick = function () { files.splice(i, 1); renderFiles(); input.focus(); }; fchips.append(c); });
      if (!running) send.disabled = !input.value.trim() && !files.length;
    }
    fileIn.addEventListener("change", function () { Array.prototype.forEach.call(fileIn.files, function (f) { files.push(f.name); }); fileIn.value = ""; renderFiles(); });
    $("[data-attach]").onclick = function () { fileIn.click(); };
    form.addEventListener("submit", function (e) {
      e.preventDefault(); var v = input.value.trim(); if (running || (!v && !files.length)) return;
      var t = v || "Please read the attached file"; if (files.length) t += " (attached: " + files.join(", ") + ")";
      input.value = ""; input.style.height = "32px"; files = []; renderFiles(); start(t);
    });
    send.addEventListener("click", function () { if (running) stop(); });
    input.addEventListener("input", function () { input.style.height = "32px"; input.style.height = Math.min(input.scrollHeight, 104) + "px"; if (!running) send.disabled = !input.value.trim() && !files.length; });
    input.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } });
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
    var expBtn = $("[data-expand]");
    var navRO = null;
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
    /* In-place expand (side panel host): the same instance grows into the full layout, so the thread, a running answer,
       drafts, review state and history carry over untouched. Otherwise onExpand navigates (Neo page -> back to the app). */
    function setFull(on) { mode = on ? "full" : "panel"; root.classList.toggle("nc-full", on); syncLayout(); renderHist(); }
    inst.setExpanded = function (on, instant) {
      if (!opts.inPlace || on === expanded) return;
      expanded = on; ST.expanded = on; save(); clearTimeout(expT);
      document.body.classList.toggle("nc-neo-full", on); expBtn.innerHTML = on ? COLLAPSE : EXPAND; expBtn.setAttribute("aria-label", on ? "Minimize to floating chat" : "Expand Neo");
      var quick = instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (instant) { root.classList.add("nc-notrans"); requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove("nc-notrans"); }); }); }
      /* Sidebar and panel width animate together (one 240ms move) instead of one after the other. */
      if (on) {
        trackNav(); inst.ensureWS(); setFull(true); root.classList.add("nc-pre"); void root.offsetWidth;
        root.classList.add("nc-expanded"); root.classList.remove("nc-pre");
      } else {
        releaseNav(); inst.resetWS(); root.classList.add("nc-pre"); root.classList.remove("nc-expanded");
        var settle = function () { setFull(false); root.classList.remove("nc-pre"); };
        if (quick) settle(); else expT = setTimeout(settle, 250);
      }
    };
    inst.expanded = function () { return expanded; };
    var screenEl = $(".nc-screen");
    function screenOn(on) { screenEl.hidden = !on; root.classList.toggle("nc-onscreen", on); }
    inst.screenOn = screenOn;
    inst.routeChat = function (id, q) {
      screenOn(false);
      if (q) { inst.start(q); return; }
      if (id === "new" || id == null) { if (ST.active != null) newChat(); }
      else { var n = +id; if (!isNaN(n) && n !== ST.active) inst.open(n); }
    };
    var wsAttached = false;
    function chatHash() { return "/chat/" + (ST.active != null ? ST.active : "new"); }
    inst.ensureWS = function () {
      loadWS(function () {
        if (!wsAttached) { wsAttached = true; NeoWorkspace.attach({ nav: $("[data-wsnav]"), screen: $("[data-sbody]"), hash: chatHash(), onScreen: screenOn, onChat: inst.routeChat }); }
        else NeoWorkspace.setRoute(chatHash());
      });
    };
    inst.resetWS = function () { screenOn(false); if (window.NeoWorkspace && wsAttached) NeoWorkspace.setRoute(chatHash()); };
    if (opts.inPlace) { $("[data-sexpand]").onclick = function () { inst.setExpanded(false); }; $("[data-sclose]").onclick = function () { if (opts.onClose) opts.onClose(); }; }
    expBtn.onclick = function () { if (opts.inPlace) inst.setExpanded(!expanded); else if (opts.onExpand) opts.onExpand(ST.active); };
    $("[data-close]").onclick = function () { if (opts.onClose) opts.onClose(); };
    (mq.addEventListener ? mq.addEventListener("change", syncLayout) : mq.addListener(syncLayout));

    /* public */
    inst.start = function (t) { if (ST.active != null) { ST.active = null; save(); showEmpty(); } start(t); };
    inst.open = function (id) { if (id != null && ST.hs.some(function (h) { return h.id === id; })) openSaved(id); };
    inst.newChat = newChat; inst.focus = function () { input.focus(); }; inst.stop = stop; inst.refresh = function () { renderHist(); setTitle(); };
    inst.root = root;

    renderHist(); setTitle(); setRunning(false); syncLayout();
    var a0 = activeItem(); if (a0 && opts.restore !== false) renderSaved(a0); else showEmpty();
    return inst;
  }

  /* ---------- side panel on app pages ---------- */
  function hostPanel() {
    document.body.classList.add("nc-host");
    var tab = el('<button class="nc-tab" type="button" title="Ask Neo (Ctrl J)"><span class="nc-mark" aria-hidden="true">' + STAR + '</span><span class="nc-lbl">Ask Neo</span></button>');
    var panel = document.createElement("aside"); panel.setAttribute("aria-label", "Neo chat");
    document.body.append(tab, panel);
    var inst = mount(panel, { mode: "panel", inPlace: true,
      onHistory: function () { if (window.NeoWorkspace) NeoWorkspace.refreshNav(); },
      onClose: function () { setOpen(false); } });
    /* warm up the Neo workspace code so the sidebar is ready the moment Neo expands */
    function warm() { setTimeout(function () { loadWS(function () {}); }, 400); }
    if (document.readyState === "complete") warm(); else window.addEventListener("load", warm);
    function setOpen(o) { ST.open = o; save(); if (!o && inst.expanded()) setTimeout(function () { if (!ST.open) inst.setExpanded(false, true); }, 260); panel.classList.toggle("nc-open", o); tab.hidden = o; panel.setAttribute("aria-hidden", String(!o)); var pill = document.querySelector('header button[aria-label="Ask Neo"]'); if (pill) pill.setAttribute("aria-pressed", String(o)); if (o) inst.focus(); }
    tab.onclick = function () { setOpen(true); };
    /* The Neo item in the main nav is another entry point into the same expanded state, not a separate page. */
    document.addEventListener("click", function (e) {
      var n = e.target.closest && e.target.closest("#nav-neo"); if (!n || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault(); e.stopPropagation(); setOpen(true); inst.setExpanded(true); }, true);
    document.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest('header button[aria-label="Ask Neo"]'); if (b) { e.preventDefault(); e.stopPropagation(); setOpen(!ST.open); } }, true);
    document.addEventListener("keydown", function (e) { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") { e.preventDefault(); e.stopPropagation(); setOpen(!ST.open); } }, true);
    new MutationObserver(function () { var pill = document.querySelector('header button[aria-label="Ask Neo"]'); if (pill && pill.getAttribute("aria-pressed") !== String(ST.open)) pill.setAttribute("aria-pressed", String(ST.open)); }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-pressed"] });
    setOpen(!!ST.open);
    if (ST.open && ST.expanded) inst.setExpanded(true, true);
    window.NeoChat.panel = inst;
  }

  window.NeoChat = { mount: mount, history: function () { return ST.hs; }, active: function () { return ST.active; }, setActive: function (id) { ST.active = id; save(); }, state: function () { return ST; } };
  if (!document.getElementById("app")) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hostPanel); else hostPanel(); }
})();
