---
name: product-quality
description: Test complete user journeys against requirements, including recovery and cross-role effects. Use for test this user flow, acceptance testing, or can users complete this task. For visual or accessibility-only review prefer design-quality.
---

# Product quality

Evaluate whether the intended audience can complete the agreed task and obtain the correct outcome. Test from requirements, not from assumptions embedded in the implementation.

## Establish the test target

Discover relevant requirements, role rules, feature changes and existing tests. Name the stage: specification, prototype, running feature or release candidate. Identify the build, environment, available accounts/data and supported devices. A prototype review cannot establish runtime or backend correctness.

Use the project test format or [the journey matrix](references/journey-matrix.md). Prioritize changed journeys, critical outcomes and plausible failure boundaries. A dedicated quality pass should look beyond the happy-path checks used during implementation.

## Exercise the experience

- Follow the whole journey from a realistic entry point to a verifiable outcome. Check another actor's view or durable result when the feature crosses roles or systems.
- Cover applicable interruption, cancel/back, draft/resume, login/session expiry, missing permissions, empty data, invalid input and service failure.
- Exercise retries, double submissions, concurrent edits and delayed/reordered responses when they can change the outcome. Confirm that UI feedback matches the actual persisted result.
- Use realistic content and synthetic fixtures with known outcomes. Test the supported role/device/language combinations most exposed to the change.
- Investigate friction, ambiguous choices, misleading labels and dead ends. Record a suspected usability issue as a hypothesis unless observed with actual participants.

Run available behaviour, API, browser and device tests. Inspect reset/seed setup before using it and keep it on disposable data. Avoid real notifications, purchases or messages unless they are explicitly part of the authorized test. Creating a missing test harness is appropriate when the user requested test implementation; otherwise report that coverage gap and use available checks.

## Evaluate product understanding

For requested usability evaluation, use [study guidance](references/usability.md). AI walkthroughs can find likely friction and prepare a study; they cannot supply real participant evidence. Do not invent task-completion rates, interviews, satisfaction or conversion improvements.

## Report and hand off

Use the project's test format or [the journey matrix](references/journey-matrix.md). A compact report can use one row per case with case/steps, expected result, actual result/evidence, environment and status. Record PASS, FAIL, BLOCKED or NOT RUN. BLOCKED identifies a specific missing prerequisite; NOT RUN means no execution was performed. Neither establishes a product defect or a pass. Give severity with user impact for observed defects.

Audit requests return findings. If fixes are also requested, address the cause, add meaningful regression coverage and retest the journey. Feed requirement gaps into the authoritative brief. Link visual/accessibility findings to the design-quality concern without duplicating or inflating the defect list.

Summarize verified outcomes, open defects and untested areas. Do not certify an entire product from one successful flow or build.
