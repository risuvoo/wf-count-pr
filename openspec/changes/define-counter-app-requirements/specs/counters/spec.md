# Spec Delta

## Purpose

Defines the three independent, interactive counters shown on the Counter App homepage: what each counter displays on load, how each responds to activation, and the guarantee that one counter never affects another.

## ADDED Requirements

### Requirement: Counters start at zero

The homepage SHALL display three counters, each showing an initial value of `0` on first load.

#### Scenario: Initial values on first load

- **WHEN** a user first loads the homepage
- **THEN** Counter A, Counter B, and Counter C each display `0`

### Requirement: Counter A increments by one

Counter A SHALL increase its displayed value by exactly `1` each time the user activates Counter A's increment control.

#### Scenario: Single activation of Counter A

- **WHEN** the user activates Counter A's increment control once
- **THEN** Counter A displays `1`

#### Scenario: Repeated activations of Counter A

- **WHEN** the user activates Counter A's increment control three times in total
- **THEN** Counter A displays `3`

### Requirement: Counter B increments by two

Counter B SHALL increase its displayed value by exactly `2` each time the user activates Counter B's increment control.

#### Scenario: Single activation of Counter B

- **WHEN** the user activates Counter B's increment control once
- **THEN** Counter B displays `2`

#### Scenario: Repeated activations of Counter B

- **WHEN** the user activates Counter B's increment control three times in total
- **THEN** Counter B displays `6`

### Requirement: Counter C increments by three

Counter C SHALL increase its displayed value by exactly `3` each time the user activates Counter C's increment control.

#### Scenario: Single activation of Counter C

- **WHEN** the user activates Counter C's increment control once
- **THEN** Counter C displays `3`

#### Scenario: Repeated activations of Counter C

- **WHEN** the user activates Counter C's increment control three times in total
- **THEN** Counter C displays `9`

### Requirement: Counter state is independent

Each counter SHALL maintain its own state, and activating any counter SHALL NOT change the displayed value of the other two counters.

#### Scenario: Incrementing one counter leaves the others unchanged

- **WHEN** the user activates Counter A's increment control while Counter B and Counter C each display `0`
- **THEN** Counter A displays `1`, Counter B still displays `0`, and Counter C still displays `0`

#### Scenario: Interleaved activations stay independent

- **WHEN** the user activates Counter A once, then Counter C once, then Counter A again
- **THEN** Counter A displays `2`, Counter B displays `0`, and Counter C displays `3`

### Requirement: Counters increment on pointer activation

Clicking a counter's increment control with a pointer SHALL increment that counter by its configured step.

#### Scenario: Clicking each counter increments only that counter

- **WHEN** the user clicks Counter A's increment control once, then Counter B's once, then Counter C's once
- **THEN** Counter A displays `1`, Counter B displays `2`, and Counter C displays `3`, and no counter's value changed except its own click

### Requirement: Counters have distinct accessible names

Each counter SHALL have a unique, human-readable accessible name, and its increment control SHALL have an accessible name that identifies both the action and the counter.

#### Scenario: Distinct labels

- **WHEN** the three counters are rendered
- **THEN** each counter has a distinct accessible name (e.g. "Counter A"), and each increment control's accessible name states its action and counter (e.g. "Increment Counter A by 1")

### Requirement: Increment controls are keyboard operable

Each counter's increment control SHALL be reachable and operable using the keyboard alone.

#### Scenario: Keyboard operation

- **WHEN** the user focuses a counter's increment control with the keyboard and activates it (Enter or Space)
- **THEN** that counter increments by its step and the updated value is visible

### Requirement: Value changes are announced

A counter's updated value SHALL be announced to assistive technology when it changes, exposed through a polite live region.

#### Scenario: Updated value is announced

- **WHEN** a counter's value changes as a result of activation
- **THEN** the updated value is exposed through an `aria-live="polite"` region associated with that counter

### Requirement: Counters have no upper bound

Each counter SHALL have no maximum value; it SHALL continue to increase by its configured step on every activation without limit.

#### Scenario: Value keeps increasing past typical values

- **WHEN** a counter is activated repeatedly well beyond its initial value
- **THEN** it continues to increase by its configured step and remains displayed

### Requirement: Layout is responsive

The homepage SHALL show all three counters together, fully visible and readable, without horizontal scrolling, from a 360px-wide viewport up to desktop width.

#### Scenario: Narrow viewport

- **WHEN** the homepage is viewed at a 360px-wide viewport
- **THEN** all three counters are visible and readable, and no horizontal scrolling is required

#### Scenario: Desktop viewport

- **WHEN** the homepage is viewed at desktop width (e.g. 1280px or wider)
- **THEN** all three counters are visible and readable, with no overlapping or clipped content
