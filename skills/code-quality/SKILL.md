---
name: code-quality
description: Audit code organization, coupling, repeated business logic, reuse, or complexity, and perform scoped refactoring when requested. Use for maintainability reviews and code cleanup, not diagnosis of a specific runtime failure.
---

# Code quality

Improve maintainability with evidence from real responsibilities and callers. Follow existing project conventions and the user's scope.

## Select the requested mode

- **Audit/review:** inspect and report; do not change application behaviour or files merely because a finding exists.
- **Refactor/fix quality issues:** make the requested scoped improvements and verify preservation of intended behaviour. Do not ask again for authorization already present in the request.

If the user has reported a failure, prioritize reproducing and understanding that failure before structural cleanup. Keep feature changes distinct from refactors.

## Investigate

Discover relevant project rules, package boundaries, contracts and tests. Trace entry points, consumers and data ownership in the requested area. Widen inspection only when shared behaviour crosses that boundary.

Assess:

- Business-rule duplication: do repeated conditions represent the same policy and need to evolve together?
- Responsibilities and coupling: misplaced decisions, cycles, leaky abstractions, oversized public APIs and unrelated concerns in one component/service.
- Reuse: existing domain helpers and UI components, copy-pasted logic, speculative generic wrappers and components overloaded by unrelated flags.
- Contracts and state: conflicting type definitions, duplicate sources of truth, derived state that can become stale, and client/server disagreement.
- Failure handling and testability: swallowed errors, misleading success states, hidden side effects and dependencies that prevent meaningful tests.
- Dead code: verify exports, configuration, reflection/dynamic use and other consumers before removing apparently unused symbols.

Similar syntax is not sufficient evidence for abstraction. Separate business concepts may correctly have similar implementations. Caches, snapshots and denormalized summaries are valid when their authoritative source and update/rebuild rules are clear.

## Refactor when requested

Use [the refactor checklist](references/refactor.md) for changes across callers or shared state. Keep changes reviewable, move a rule to its correct owner, and update all affected in-scope consumers. Preserve external contracts, permissions and intended observable behaviour. Identify any required functional change explicitly.

## Deliver

For each material finding, include the file/symbol, affected callers, concrete impact, proposed change and verification approach. Distinguish correctness defects, maintenance costs and optional preferences. Prioritize by impact and confidence; do not invent a quality score or enforce arbitrary file-length targets.

For implemented refactors, report the changed responsibility/reuse and checks actually run. Do not equate fewer lines or a passing linter with a correct refactor.
