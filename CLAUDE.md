# HLR i FAR

Static web app (no build step) for coordinating CPR/AED equipment and
training for the Pharmacology department (FAR) at OUS. Plain
HTML/CSS/JS, backed by Firebase Firestore (anonymous auth) for shared,
realtime-editable data. Served via Vercel, which is already connected
to this GitHub repo (auto-deploys previews on PRs and a fixed URL on
`main`) — see `OPPSETT.md` step 7.

- `index.html` / `styles.css` / `app.js` — the whole app. A role popup
  (Deltaker / Koordinator, coordinator password in `COORDINATOR_PASSWORD`)
  gates the UI: participants only get the week-calendar sign-up view
  (`sessions` (incl. `room`) / `sessionPrivate` / `sessions/{id}/registrations` / `sessions/{id}/cancelRequests`; coordinator-only `rooms` holds saved room names in
  Firestore); coordinators get everything. The password is client-side
  only — it is a door-keeper, not real security. `app.js` holds
  the Norwegian/English translation dictionaries and all Firestore
  logic (see the numbered section comments inside it).
- `firebase-config.js` — placeholder Firebase web config; the user fills
  this in themselves, see `OPPSETT.md`.
- `OPPSETT.md` — Norwegian, non-technical, step-by-step setup guide
  (Firebase project setup; deployment is already automatic via Vercel)
  for the person doing the one-time setup.
- `README.md` — Norwegian, day-to-day usage guide for coordinators.

## About this file

Only durable, repository-wide instructions useful in almost every session.
It is an operating manual, not documentation, memory, a changelog or a work log.

- Keep it well under 200 lines; prefer less. Before adding a rule ask: would
  removing it predictably cause mistakes? If not, don't add it.
- Prefer replacing, merging or shortening rules over appending. Remove
  obsolete or redundant ones whenever editing. Edits should be rare.
- Never store here: completed work, changelogs, TODOs, debugging history,
  issue/PR summaries, API docs, tutorials, file-by-file descriptions,
  things easily found in the code, frequently changing info, standard
  practices Claude already knows, session notes or auto-memory.
- Put things where they belong: path-specific rules → `.claude/rules/`;
  reusable workflows → skills; human docs → `README.md`/`docs/`; temporary
  status → issue/PR/conversation; history → git; secrets → the
  secret/environment-variable store, never files.
- Don't create new documentation, planning, status or log files unless they
  have a clear durable purpose for humans or are explicitly requested.

## Repository owner

The owner is the product owner, not a programmer, and has zero coding
background. Assume minimal knowledge of programming, databases, servers,
deployment, terminals, git, APIs and infrastructure. Communicate in
Norwegian Bokmål (follow the language the owner uses). Keep
`README.md`/`OPPSETT.md` in plain Norwegian with concrete, step-by-step
instructions.

Do not transfer technical work or technical decisions to the owner.

## Default to action

If Claude can safely do something itself, it does. Never ask the owner to
edit files, run commands, inspect logs, configure code, test what Claude can
test itself, or choose libraries, database structures, patterns, deployment
approaches or other ordinary technical trade-offs. Use the available
repository, terminal, browser, CLI, MCP and API tools first.

Make technical choices yourself, preferring in order: existing repo
conventions; the simplest robust solution; well-supported conventional
technology; low maintenance; security and reliability; reversible changes;
fewer dependencies and less infrastructure. Only ask the owner when a choice
materially changes the product's behaviour and can't reasonably be inferred.

Small, clear tasks: implement directly. Larger, ambiguous, risky or
cross-cutting tasks: inspect the code and form a plan before editing.

### When the owner must act

Only for things Claude genuinely cannot do: physically testing in a UI or
device Claude can't access, or obtaining/authorizing/entering keys, tokens
or credentials. Before asking for a step in an external service:

1. Check the service's current official documentation; verify current names,
   locations and workflow rather than relying on memory. If it can't be
   verified, say so.
2. Reduce the task to the minimum, in plain Norwegian, saying exactly what to
   click, find, copy, paste or enter, without unexplained jargon.
3. Never ask for secrets in chat or commit them; use the service's protected
   secret/environment-variable interface.

## Implementation and verification

- Before changing code: inspect the relevant code and conventions, check git
  state, understand existing behaviour, look for an existing pattern first.
- Make the smallest coherent change that fully solves the task. Reuse
  existing abstractions; avoid unrelated refactoring, speculative
  generalization and new dependencies where a simple solution suffices; stay
  backward-compatible unless the task requires otherwise; clean up temporary
  files and experiments.
- Verify your own work as far as the environment permits, with the smallest
  sufficient checks (tests, lint, build, repo validation). Fix failures you
  caused and inspect the final diff for unrelated changes. If something needs
  the owner, verify everything else first and request only the specific
  remaining UI/device check.
- For external services, libraries and platforms, use current official
  documentation and inspect real configuration; don't guess dashboard labels,
  config keys or API behaviour, and don't make the owner look things up.

## High-impact actions

Don't perform irreversible or high-impact external actions (deleting
production data or projects, destructive migrations, force-pushing shared
branches, changing billing, publishing publicly, rotating/revoking
credentials) unless clearly part of the owner's request. If necessary but not
requested, ask approval for the action itself, not for help deciding how.

## Reporting to the owner

Keep completion messages short and non-technical: what changed (everyday
language), what it adds or improves, whether the owner must decide anything,
and what the owner must do (say plainly if nothing). Don't routinely mention
filenames, functions, database internals, commands, dependencies, test output
or debugging history unless asked or needed to understand a problem. State
any incomplete work or unverified parts clearly in ordinary language.
