# Proposal

## Why

Project initialization is complete and deployed, but the app has no counter behavior yet — the homepage only renders a read-only `0`. Before writing any code, the team needs an agreed, testable definition of the three independent counters so that implementation and verification are unambiguous. This is also the first exercise of the AI-assisted workflow (OpenCode Go, OpenSpec, GitHub Issues/PRs, Vercel), so the requirements must be explicit enough to drive an issue, a PR, and a deployment check.

## What Changes

- Introduce three independent, interactive counters on the homepage. Each starts at `0`:
  - Counter A increments by exactly `1` per activation.
  - Counter B increments by exactly `2` per activation.
  - Counter C increments by exactly `3` per activation.
- Replace the current read-only "Current count" placeholder section with a responsive grid of three counter cards.
- Add interactive client components using React `useState` and the Next.js App Router `"use client"` convention, written in TypeScript.
- Define acceptance criteria and manual testing expectations for each counter (no test framework is added).
- Counters are unbounded: there is no maximum value.
- Explicitly out of scope: reset/decrement controls, negative values, an upper bound, persistence, database, authentication, and new dependencies.

## Capabilities

### New Capabilities

- `counters`: The behavior of the three independent click-to-increment counters, including initialization, per-counter increment step, and state independence.

### Modified Capabilities

- None. This introduces a new capability; no existing spec-level behavior changes.

## Impact

- `src/app/page.tsx` — replace the placeholder preview section with the counter UI.
- New TypeScript client component at `src/components/counter.tsx` for the counter cards.
- No changes to `package.json` dependencies, build configuration, APIs, or deployment.
- At archive time this creates `openspec/specs/counters/spec.md`.
- Verification remains `npm run lint` and `npm run build`, plus manual browser checks.
