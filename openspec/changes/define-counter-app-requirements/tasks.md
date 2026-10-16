# Tasks

## 1. Counter Client Component

- [ ] 1.1 Create `src/components/counter.tsx` as a Client Component (`"use client"`) exporting a typed `Counter` with props `{ label: string; step: number }`, holding its own `useState(0)` and incrementing with a functional updater `setCount((current) => current + step)`. Verify: the file exists at the stated path and `npm run lint` reports no errors for it.
- [ ] 1.2 Render an accessible counter card in that component: a labelled heading, the numeric value inside an `aria-live="polite"` region, and a `<button type="button">` whose accessible name is descriptive (e.g. `Increment ${label} by ${step}`). Verify: in the browser the button is reachable by Tab, its accessible name is announced, and a value change is exposed through the live region; satisfies the "Counters have distinct accessible names", "Increment controls are keyboard operable", and "Value changes are announced" requirements.

## 2. Homepage Integration

- [ ] 2.1 Update `src/app/page.tsx` to replace the read-only "Current count" placeholder with three `Counter` instances — Counter A (`step={1}`), Counter B (`step={2}`), Counter C (`step={3}`) — imported via `@/components/counter`. Verify: `npm run build` succeeds and the homepage renders three counters each showing `0`.
- [ ] 2.2 Arrange the three counters in a responsive Tailwind grid (`grid-cols-1 sm:grid-cols-3`) within the existing container, using `tabular-nums` for values. Verify: at a 360px-wide viewport the counters stack in one column, and at desktop width (e.g. 1280px) they sit in three columns, in both cases visible and readable with no horizontal scroll; satisfies the "Layout is responsive" scenarios.

## 3. Acceptance Verification

- [ ] 3.1 Verify initialization and one-click steps in the browser: after loading, all three show `0`; one activation each yields A=`1`, B=`2`, C=`3`. Verifies the initialization and single-activation scenarios.
- [ ] 3.2 Verify repeated activations: three activations each yield A=`3`, B=`6`, C=`9`. Verifies the repeated-activation scenarios.
- [ ] 3.3 Verify independence: activate A once, then C once, then A again → A=`2`, B=`0`, C=`3`. Verifies the "Counter state is independent" scenarios.
- [ ] 3.4 Verify pointer clicks: click each counter's button once → A=`1`, B=`2`, C=`3`, and confirm no counter changed from a click on a different counter. Verifies the "Counters increment on pointer activation" scenario.
- [ ] 3.5 Verify keyboard operation: Tab to each increment control and activate it with Enter/Space; the matching counter increments by its step. Verifies the "Increment controls are keyboard operable" requirement.
- [ ] 3.6 Verify counters are unbounded: activate a counter many times (e.g. 100 clicks) and confirm it keeps increasing by its step with no cap. Verifies the "Counters have no upper bound" requirement.
- [ ] 3.7 Run `npm run lint` and `npm run build`; both complete with no errors or warnings.

## Workflow follow-up

- After review approval, open a GitHub issue and PR for this change and verify the Vercel preview/production deployment.
- Archive the change with OpenSpec once implementation is merged and verified, then confirm the resulting `openspec/specs/counters/spec.md`.
