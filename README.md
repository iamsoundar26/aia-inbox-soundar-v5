# AI Accountant · Inbox (Soundar) — Neo workspace, version 4

> **Status: ideation-stage concept, version 4 (started 9 Oct 2026).** Branched from v3 (tag `v3.0`, commit `96c4b59`): the unified Neo experience (floating chat, expanded view and Neo tab share one sidebar, screens and chat instance).
> Local only so far: no GitHub repo or Pages site yet. Branch `v4`, base path `/aia-inbox-soundar-v4`.
> v1, v2 and v3 are untouched in their own folders.

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

    cd ..                                  # the folder that contains aia-inbox-soundar-v4
    python3 -m http.server 8000
    # open http://localhost:8000/aia-inbox-soundar-v4/inbox/   (app, with Neo in the nav)
    # open http://localhost:8000/aia-inbox-soundar-v4/neo/     (workspace directly)

The build is currently homed at `/aia-inbox-soundar-v4` (see `.basepath`). Use `python3 set-base-path.py <prefix>` to re-home it.

## Prototype interactions that work

Suggested action → chat → structured result · Review exceptions → grouped workspace · Approve 27 invoices → confirmation modal → audit trail updates · Agent card → detail → Run agent → live progress → results · "Why?" on any suggestion · Create agent (name suggested from the description) · Runs tabs and run detail · Chat history: open, rename, pin, archive, delete · Attach files (chips) · Ctrl J focuses the composer · Mobile: Work panel becomes a bottom sheet.

## Known gaps

- Neo's answers are scripted by keyword (review / duplicate / reconcile / GST / AP / month-end / expenses); anything else gets the "needs attention" summary.
- Permissions are display-only; "Edit permissions" shows a note.
- Attached files are listed, not processed. Thumbs feedback only shows a toast.
- State resets on reload (no persistence).
