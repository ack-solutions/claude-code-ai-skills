---
name: feature-delivery
description: Implement a defined feature across the affected UI, API, data, and tests. Use for feature implementation or a scoped end-to-end change, including integration and documentation.
---

# Feature delivery

Deliver the requested user outcome through the relevant layers of the existing project. Explicit user instructions take precedence over this workflow's defaults.

## Scope and evidence

Read applicable project instructions and the relevant acceptance criteria. Inspect the manifests, nearby implementation, contracts and tests to learn the actual stack and supported commands. Preserve unrelated changes. In a new project, establish only the foundations needed for the requested feature.

Trace affected consumers before changing shared behaviour. For substantial work, make a short implementation plan covering dependencies, data impact and verification. Resolve material requirement conflicts; use disclosed reasonable defaults for reversible implementation details. Do not invoke every skill or demand a new specification for a small edit.

If the full fix requires edits outside the authorized task, explain the impact and obtain expanded scope before those edits. Keep unresolved decisions and their owners in the project's existing records; only material dependencies block the affected work. Use its adopted task lifecycle rather than adding parallel statuses.

## Implement

- Put business rules in their existing domain owner. Keep transport, persistence and presentation responsibilities clear without inventing layers solely to fit a pattern.
- Reuse authoritative contracts, utilities, design tokens and components. Extend them when the requirement warrants it; avoid parallel copies that drift.
- Handle relevant validation, ownership, permissions, partial failures, retries, concurrency and recovery. A hidden UI control is not authorization.
- Preserve compatibility with existing stored data and supported clients. Schema changes follow the project's migration process; inspect generated migrations.
- Connect UI actions to real outcomes within scope. Loading, empty, error and success states must reflect the actual operation, including failures.
- Keep technical and product documentation aligned when behaviour changes. Do not rewrite unrelated documents or broaden the product scope.

## Verify the outcome

Select checks from requirements and risk. Use focused behaviour/regression tests, relevant lint/type/build commands, and the actual browser/device journey when available. For cross-layer work, confirm the result at the other end rather than only mocking every boundary.

Inspect test setup before execution: verify that destructive fixtures/reset commands target disposable data. Never point a test reset at a shared or production database. Use existing fake adapters for external side effects where possible.

Fix issues caused by the change, rerun the affected checks, and report unrelated failures separately. Do not remove assertions or update expected results just to match accidental implementation behaviour. Record checks that could not run.

## Finish

Summarize delivered behaviour, changed surfaces, verification evidence and remaining limitations. Remove temporary diagnostics introduced by this work. A passing build does not establish product, design, security or performance acceptance; make claims only within the scope verified.
