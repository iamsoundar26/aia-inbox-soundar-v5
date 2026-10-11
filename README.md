# AI Accountant · Inbox (Soundar) — Neo workspace, version 5

> **Status: ideation-stage concept, version 5 (started 11 Oct 2026).** Branched from v4 (branch `v4`, commit `0958758`), which is the audited chat-first Neo (floating chat, expanded view and Neo tab share one sidebar, screens and chat instance; agents are created inside the conversation).
> Local only so far: no GitHub repo or Pages site yet. Branch `v5`, base path `/aia-inbox-soundar-v5`.
> v1 to v4 are untouched in their own folders.

## v5: Neo that knows your day (11 Oct 2026)

Same concept and code base as v4, with the experience reworked around what the accountant is actually doing:

| Change | What the user gets |
|---|---|
| **Briefing home** | Opening Neo shows a greeting, "N things need you today" and up to four live rows: bills left in Inbox, decisions waiting (with what kind), agents running (with progress) and runs finished today. Each row is an action. Counts update as you approve, resolve or as runs progress. Quick-action chips sit under the briefing in the panel; the six suggested-action cards stay in the expanded view and on the Neo page. |
| **Page context** | On a document page the composer shows "Looking at Dell India Pvt Ltd · INV-1182", the briefing leads with "Explain this document", and asking about it ("explain", "what is this", "summarise this bill"…) gets an answer built from that document: extracted fields, Neo's checks and the decision it needs (approve / skip, delete duplicate / keep, ask the vendor, split the file…). 21 inbox documents are covered, mirroring the app's data. The chat is titled after the document. |
| **Finish the batch** | The "Work the Inbox with me" card has a footer: "0 of 6 decided · 4 ready to approve" and an **Approve 4 ready bills** button. It confirms inline with the total, approves and posts the four, and offers one Undo for the batch. Single approvals from the review panel update the same footer. |
| **Answers open the work** | Result cards link into the workspace in place: Needs attention, the GST / AP / Month-End agents, the reconciliation run with 12 open lines. On a product page this expands Neo and lands on that screen; on the Neo page it changes the route. |
| **Live strip** | While a chat is open, a one-line strip above the composer shows the running agent and its progress ("GST Agent · 74%") and "7 need your decision". Both are buttons. It updates in place as runs tick and hides on the home screen, where the briefing already says it. |
| **Quick actions while typing** | From two characters the composer offers up to three matching actions ("re" → Review invoices, Reconcile banking, Review AP). Up/Down and Enter run one; Enter with nothing chosen sends the text as typed. Escape closes the list without closing Neo. |

## v5 tools and skills (11 Oct 2026, second pass)

Neo now works through named **tools** and **skills**, and every step in an answer shows which one it used (a small badge, "Used 4 tools · 4.5s").

| Tool / skill | Kind | What happens in chat |
|---|---|---|
| **Create Invoice** | write | "Create an invoice for Theta Hotels, 12 KL furnace oil" → Neo reads the policy, looks up the customer and item with Search Masters, finds the last number with Search Vouchers, and shows a **draft** (customer, item line, subtotal, GST, total). "Create invoice" runs the tool visibly and settles with the voucher number; "Discard" drops it. A customer that is not in the masters is created first. |
| **Create Master** | write | "Create a vendor ledger for Blue Ocean Freight under Sundry Creditors" → draft with name, type, group, GSTIN (pending when the policy requires one) and opening balance; confirm to create. An existing name ("create a ledger for Dell India Pvt Ltd") is reported instead of duplicated. Items and groups work the same way. |
| **Search Masters** | read | "Find the ledger for Nova", "list customers" → a result card with type, group and GSTIN. |
| **Search Vouchers** | read | "Search vouchers for Theta", "show payments to Amazon" → posted vouchers with type, date and amount. |
| **Excel Reader** | read | Attach a `.xlsx`/`.csv` (or say "3-way reconciliation" and pick the sample) → the sheets are read for the skill below. |
| **3-way reconciliation** (skill) | | Matches PO → GRN → invoice lines, applies the policy tolerance, and reports matched / quantity differs / price differs / no GRN with a decision: post the matched bills or hold everything. |
| **Accounting policy** (skill) | | Plain-language rules on the Knowledge page (editable, with reset). Neo reads the relevant rule as a visible step before invoices, new masters and the 3-way match, so a changed rule shows up in the next answer. |

The Knowledge page also lists the tools with Read / Write badges (write tools always show a draft first). Drafts and decisions are kept in the transcript, so a saved chat replays with its created or discarded state.

Files changed: `neo-chat.js` (document table, briefing, live strip, suggestions, bulk approve, card links, decision elements), `neo-chat.css` (home, strip, suggestions, footers), `neo/neo.js` (`NeoWorkspace.summary()` and a `NeoChat.live()` notification on run progress and decisions). Asset version `?v=31`.

Known limits (on top of v4's): the document context is a static mirror of the app's inbox data, so it does not follow edits made on the page; "Explain this document" on a page without a known document falls back to the generic answer; bulk approve covers the bills in the chat card, not the Inbox list behind it.

## What v2 adds

A dedicated **Neo workspace** at `/neo/` — an AI accounting workspace rather than a chat box:

| Area | Route | What it shows |
|---|---|---|
| Home | `neo/#/` | Greeting, large "Ask Neo anything" composer (attach, agent picker, "Explain why" toggle), six suggested actions, "Your work" stats, "Needs your attention" list, agent cards |
| Chat | `neo/#/chat/<id>` | Three columns: history · conversation · Work panel. Scripted Neo responses produce structured result cards (Ready / Needs review / Blocked), AI suggestion with confidence and "Why this suggestion?", bulk approve with confirmation, audit trail |
| Needs attention | `neo/#/attention` | Exceptions grouped by problem (4 × missing cost centre with "Apply to all"), duplicate / GSTIN / unusual-amount cases with evidence and explicit actions |
| Agents | `neo/#/agents`, `#/agents/<id>` | Agent cards, agent detail (capabilities, data sources, trust model, recent runs, current run), permissions page (Read → Suggest → Execute → Approve), automation page (trigger + workflow), create-agent form in plain language |
| Work / Runs | `neo/#/runs`, `#/runs/<id>` | Running / Needs attention / Completed tabs, progress bars, run detail with activity timeline |
| Knowledge | `neo/#/knowledge` | Company, Accounting, Data and Historical context with connection status |
| Settings | `neo/#/settings` | Explanation and approval preferences |

Entry points: outside the workspace (Inbox, documents, other modules) the top-nav **Ask Neo** pill, the floating right-edge tab and Ctrl J open the v1 **side panel**, exactly as in v1. The **Neo · NEW** item in the module navigation opens the full-screen workspace. Inside the workspace there is no floating widget; the Ask Neo pill and Ctrl J focus the composer.

## Chat design (8 Oct 2026)

The chat itself follows the compact "Ask Neo" prototype: one module, `neo-chat.js` + `neo-chat.css`, rendered as a
**side panel** on app pages (replacing the v1 React panel behind the same Ask Neo pill, floating tab and Ctrl J) and as
the **full view** at `neo/#/chat` (history docked left, conversation centre, review panel docked right). Neo acknowledges
("Thinking"), shows named check steps with ticks that fold into "Checked N sources", streams the answer with bold figures,
then lists result rows. Selecting a bill row opens the review panel with extracted fields, Neo's checks, Approve / Skip
(or Delete duplicate / Keep) and Undo. Follow-up chips, a stop button, searchable history grouped by day, and a 14/13/12
type scale with 32px controls. Chats and decisions are kept in sessionStorage so the panel and the full view continue the
same thread; the expand button in the panel opens the current chat full-screen and the collapse button returns to the app.

## Unified Neo: one sidebar, one set of screens (8 Oct 2026)

The floating chat, its expanded state and the Neo tab run the same code. `neo/neo.js` exposes `NeoWorkspace`: its sidebar
(`NavHTML`) and its screens (agents, runs, needs attention, knowledge, settings, agent detail) render either into the Neo page or, when
Neo is expanded on an app page, into the panel itself (`.nc-wsnav` sidebar, `.nc-screen` main area). Neo code and `neo.css` are loaded
lazily on app pages; `neo.css` is scoped under `.neo-scope` so it cannot affect the product. Clicking My agents, Running, an agent
and so on swaps the main area in place (no page load, product page and URL untouched); the chat stays the same instance, so clicking a
recent chat or New chat returns to it with the transcript, draft and running answer intact. Minimize returns to the floating chat from
any screen. Expanding grows the panel and the sidebar in one 240ms move beside the collapsed product nav. The Neo tab's home is the chat
workspace (greeting, suggested actions, composer). `neo.css` is now the scoped file and the source of truth.

## v4: chat-first automations and the audited build (9 Oct 2026)

**Files that matter now**
- `neo-chat.js` / `neo-chat.css`: the chat. Floating panel on product pages, expands in place into the full Neo view, and the full view on `neo/`. Every conversation is a transcript in sessionStorage (`neoChat`), so reopening a chat shows what was actually said; a half-finished automation setup resumes with its choices.
- `neo/neo.js` / `neo/neo.css`: the workspace (sidebar, Agents, agent detail, Activity, Needs attention, Knowledge, Settings). Runs standalone on `neo/` and embedded in the expanded chat via `window.NeoWorkspace`. `neo.css` is scoped under `.neo-scope` so it cannot touch the product pages.
- `neo-simple.js`: adds the Neo item to the product navigation and renames the pill to "Ask Neo". `neo-light.css`: pill and nav alignment only.

**What works (simulated, no backend)**
- Chat: scripted answers for the six suggested actions (invoices, duplicates, banking, GST, AP, month-end) plus attention; bill review panel with approve / skip / delete / keep and undo; stop mid-answer; an attached image triggers the unreadable-scan error with "Skip this file and continue".
- Automation in chat: "Every Monday check GST mismatches" or "New agent" / "automate a task" starts the flow; Neo asks only for what is missing (what, when, how much on its own) with tappable choices, shows a draft card, creates the agent on confirm. The agent appears under Agents and the chat is renamed after it.
- Agents: list, detail (latest run as a message on the left; prompt, frequency, time, end repeat, last run and permissions on the right; Save enables only after a change; pause/resume), Run now with a confirmation dialog, live progress in place, per-agent completion narrative, toast. Seeded "in progress" runs finish shortly after the page opens.
- Activity: Running / Needs attention / Completed, run detail with results and audit timeline. Needs attention: apply / skip / apply-all / resolve decisions persist for the session. Settings: "why" preference persists.
- Entry and exit: floating tab, Ask Neo pill, Ctrl J, Neo nav item; Expand / Minimize / Esc / product nav click; inside the expanded Neo the pill and Ctrl J focus the composer.

**Known limits**: all data is in-memory prototype data, persisted only per browser tab (sessionStorage). Language understanding is keyword matching (five task kinds, four schedules). Below 861px the expanded view shows chat only (no Neo sidebar). Permissions are read-only. "Open document" goes to the Inbox page, not a specific document.

## Files added or changed in v2

- `neo/index.html`, `neo/neo.css`, `neo/neo.js` — the workspace. Plain HTML/CSS/JS, hash router, no build step. Sample data and scripted Neo responses live at the top of `neo.js`.
- `neo-chat.js`, `neo-chat.css` — the shared chat module (side panel on app pages, full view in the workspace).
- `neo-simple.js` — appended block that injects the module-nav link.
- All pages: asset version bumped to `?v=5`.

The workspace uses relative paths (`../_next/…`, `../images/logo.png`, `../inbox/`) so it works under any base path without running `set-base-path.py`.

## Run locally

    cd ..                                  # the folder that contains aia-inbox-soundar-v5
    python3 -m http.server 8000
    # open http://localhost:8000/aia-inbox-soundar-v5/inbox/   (app, with Neo in the nav)
    # open http://localhost:8000/aia-inbox-soundar-v5/neo/     (workspace directly)

The build is currently homed at `/aia-inbox-soundar-v5` (see `.basepath`). Use `python3 set-base-path.py <prefix>` to re-home it.

## Prototype interactions that work

Suggested action → chat → structured result · Review exceptions → grouped workspace · Approve 27 invoices → confirmation modal → audit trail updates · Agent card → detail → Run agent → live progress → results · "Why?" on any suggestion · Create agent (name suggested from the description) · Runs tabs and run detail · Chat history: open, rename, pin, archive, delete · Attach files (chips) · Ctrl J focuses the composer · Mobile: Work panel becomes a bottom sheet.

## Known gaps

- Neo's answers are scripted by keyword (review / duplicate / reconcile / GST / AP / month-end / expenses); anything else gets the "needs attention" summary.
- Permissions are display-only; "Edit permissions" shows a note.
- Attached files are listed, not processed. Thumbs feedback only shows a toast.
- State resets on reload (no persistence).
