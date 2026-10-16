# Design

## Context

See `proposal.md` — Why, for motivation. Current state that shapes the approach:

- Next.js **16.4.2** (App Router, Turbopack build) with React 19 and TypeScript; `src/` directory and the `@/*` → `./src/*` path alias are configured.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. The homepage is fully static with no uncached data, so neither affects this change.
- `src/app/page.tsx` is a **Server Component** that currently renders a read-only `0` placeholder. Tailwind CSS v4 is used.
- No test runner is installed; the project standard for verification is `npm run lint` and `npm run build` plus manual browser checks. No new dependencies are permitted for this change.

## Goals / Non-Goals

**Goals:**

- Add interactive click-to-increment behavior to exactly three counters (step 1, 2, 3) while keeping the page a Server Component and minimizing shipped client JavaScript.
- Guarantee counter independence structurally, not by convention.
- Keep the components accessible (keyboard, screen reader) and the layout responsive.

**Non-Goals:**

- Reset, decrement, bounds/limits, persistence (localStorage/db), or custom configurable steps.
- Adding a test framework, state manager, or any new dependency.
- Changing build config, routing, or deployment.

## Decisions

### D1. One reusable client `Counter` component, page stays a Server Component

Create a single `"use client"` component that renders one counter (label, value, increment button), and render it three times from `src/app/page.tsx` with different `step` props.

- **Why:** Isolates interactivity to the smallest client boundary, avoids turning the whole homepage into a client component, and keeps one source of truth for behavior (DRY).
- **Alternatives considered:** (a) `"use client"` at the top of `page.tsx` — simplest but ships the entire page as client JS and mixes concerns. (b) Three separate hand-written components — duplicated logic and drift risk.

### D2. State lives inside each `Counter` instance via `useState`

Each `Counter` owns its own `useState(0)`, so independence is guaranteed by construction — there is no shared object that could couple the counters.

- **Why:** Makes "clicking one counter must not change the others" a structural property rather than something to maintain.
- **Alternatives considered:** A single parent-held state object (e.g. `{a,b,c}`) — more coupling, more re-renders, and easier to accidentally share state.

### D3. Increment with a functional updater

Use `setCount((current) => current + step)`.

- **Why:** Correct under React batching and rapid clicks; avoids stale-closure bugs.
- **Alternatives considered:** `setCount(count + step)` — safe here but fragile if the handler is ever reused or batched differently.

### D4. Component location and props

Place the component at `src/components/counter.tsx`, imported via the `@/components/counter` alias. Props: a typed interface `CounterProps { label: string; step: number }`.

- **Why:** A `components/` folder is the conventional App Router home for reusable UI and keeps `src/app/` focused on routes. The alias is already configured.
- **Alternatives considered:** Colocating as `src/app/counter.tsx` — acceptable, but a `components/` directory scales better.

### D5. Accessibility

Render each counter as a labelled `<section>`/card with a heading, the value in a polite live region (`aria-live="polite"`), and a `<button type="button">` whose accessible name is descriptive (e.g. "Increment Counter A by 1"). Three separate spec requirements cover this: distinct accessible names, keyboard-operable controls, and announcement of the updated value.

The current value is exposed through the live region only. The value is **not** programmatically associated with the counter's label (no `aria-labelledby`/`aria-describedby` link between the value and the heading), and the spec does not require that association.

- **Why:** Keyboard and screen-reader users can operate each counter and hear value changes; `type="button"` avoids any implicit submit behavior.
- **Alternatives considered:** Plain `<div>` + click handler — not focusable or operable by keyboard, so rejected.

### D6. Responsive layout

Present the three counters in a Tailwind grid: one column on narrow viewports, three on wider ones (`grid-cols-1 sm:grid-cols-3`), inside the existing `max-w` container. Values use `tabular-nums`. The single-column layout holds at a 360px-wide viewport and the three-column layout holds at desktop width (e.g. 1280px), matching the two scenarios in the spec.

- **Why:** Meets the responsiveness requirement with the existing Tailwind v4 setup and no new code.
- **Alternatives considered:** A custom CSS file — unnecessary given Tailwind is already in place.

### D7. Verification without new dependencies

Verify via `npm run lint`, `npm run build`, and the manual acceptance steps in `tasks.md`, mapped to the spec scenarios.

- **Why:** Honors the "no unnecessary dependencies" constraint while still producing testable, checkable acceptance criteria.
- **Alternatives considered:** Adding Vitest + React Testing Library now — deferred to a separate, explicitly-approved future change.

### D8. Counters are intentionally unbounded

Counters have no maximum value. Each activation adds the configured step, and the value keeps growing with no cap or clamping.

- **Why:** Matches the requested behavior (three counters that simply increment) and keeps the component free of bounds logic that nothing in the requirements needs.
- **Alternatives considered:** Clamping at a fixed maximum or resetting on overflow — adds behavior the requirements do not ask for; rejected as unnecessary complexity.

## Risks / Trade-offs

- **Value resets on reload** (no persistence) → Accepted and documented; persistence is explicitly out of scope.
- **Unbounded values could eventually overflow the card** (behavior is intentionally unbounded per D8) → Mitigate with `tabular-nums` and sensible sizing; treat very large numbers as a known, low-impact limitation for this learning app.
- **Live-region announcements can be noisy on rapid clicking** → Use `aria-live="polite"` and keep only the value text in the live region.
- **No automated regression tests** → Mitigated by precise manual acceptance steps derived from the spec; a follow-up change can add a test runner.
- **Accidentally re-introducing coupling** → Prevented by D2 (per-instance state); the independence scenarios in the spec guard against it.
