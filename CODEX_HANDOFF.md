# Ardna — Codex project takeover

## Your assignment
You are continuing an EXISTING Next.js/TypeScript frontend built partly by Antigravity. You are taking over the project at its current filesystem state, not starting a greenfield application.

**Read `ARDNA_REQUIREMENTS.md` in full.** That file contains the user’s ORIGINAL 32-section requirements and acceptance criteria. It is the source of truth for desired product behavior and design. This handoff supplements it with takeover instructions; do not use this handoff as a replacement for the full requirements.

## Non-negotiable scope
- Implement a complete **frontend-only** Ardna demo for the NASA Space Apps 2026 Field Shift challenge, designed for Egyptian farmers and scientific audiences.
- Preserve and reuse everything already working. Do NOT initialize a new app, replace working functionality, erase files, or arbitrarily redesign the current UI.
- No backend, production auth, database, actual NASA API integration, training models, or real agricultural prescriptions. Use internally consistent mock data with prominent, honest illustrative labels.
- Arabic-first and RTL, exceptional desktop experience, shared state and local persistence, functioning navigation, meaningful interactions, beautiful visual presentation, and scientific transparency.
- Keep the original requirements’ **four** priority choices including Balanced; priority changes must recompute illustrated weighted scores and reorder eligible rotations.
- Prioritize the full Farmer Journey before auxiliary pages. The entire original acceptance-criteria journey should ultimately work.

## Step 1 — Audit what exists, without destructive actions
1. Read the full original requirements file and understand the expected pages, interactions, state, styling, sequencing, acceptance tests, and scientific disclaimers.
2. Inspect the actual current project codebase including `package.json`, Next.js routes, shared layouts, components, data, `lib/scoring.ts`, and `store/useAppStore.ts` when present. Do not assume a feature works merely because a file exists.
3. Inspect Git status if this is a Git repository; preserve uncommitted work. Never reset, overwrite, or discard existing changes.
4. Map every important requirement to one of: **working / partially implemented / missing / broken / not yet validated**. Identify dependencies and broken connections.
5. Give me a *brief*, prioritized gap analysis before applying substantial changes. Be explicit about what can and cannot be verified with available tools.

## Step 2 — Continue implementation from the most important gap
Do not stop at writing a plan: **continue to implement the next highest-priority incomplete vertical slice**, reusing existing architecture and design patterns. Work through the implementation order from Section 29 of `ARDNA_REQUIREMENTS.md`:
1. Visual foundation, shared layouts, and functional homepage.
2. Complete core farmer journey: farm location, interactive map with polygon drawing and calculated area, profile, questions, and priorities.
3. Rotation scoring, ranking, plan comparison, explanations, demo save, and dashboard.
4. Saved plan, notebook, calendar, localStorage persistence.
5. Science Lab, charts, NASA-to-Score explainer using clearly marked illustrative data.
6. Egypt Atlas, Crop Encyclopedia, About page, final polish.

When functionality already exists, verify it, repair defects if needed, and move to the next gap. Prefer coherent, testable end-to-end user journeys over many disconnected placeholder pages.

## Step 3 — Validate as you go
- Inspect the project’s package scripts before choosing commands. Use existing dependencies where possible; install only necessary dependencies.
- Run appropriate TypeScript, lint, build, and other available checks; fix errors you introduce and report pre-existing ones honestly.
- Verify important cross-page state flows, area computation, persistence, priority-based scoring, RTL layout, demo behavior, and accessible feedback. Check rendered screens where browser capabilities are available.
- Never invent test results, NASA API outputs, measured soil quality, crop-yield claims, or satellite imagery. A fallback must be clearly labeled.
- If any implementation would require destructive changes or genuine secrets/paid keys, stop for explicit approval on that specific issue and otherwise continue with safe work.

## Progress report at the end of each session
Summarize: (a) what existed, (b) which requirements were implemented, (c) files changed, (d) commands/tests run with results, (e) known incomplete items, and (f) **the next single highest-priority task**. Update `IMPLEMENTATION_STATUS.md` with this checklist so a future Codex session can continue, keeping that file accurate.

## First user message after opening Codex
Read `ARDNA_REQUIREMENTS.md` and `CODEX_HANDOFF.md` in full. Audit the existing repository rather than creating a new project. Briefly identify working, partial, missing, and broken features against the original requirements. Then continue implementation from the highest-priority missing part of the connected farmer journey, preserving existing code and design, using honest mock data, and testing your changes. Do not stop at analysis; finish a coherent vertical slice and report changes and remaining gaps.
