# Coding rules and system architecture

These are proposed engineering rules for adoption. Preserve justified existing choices; record exceptions and their owners. Quality is demonstrated through behaviour and maintainability, not arbitrary file-length limits or a promise of perfect code.

## How a professional developer works

1. Read the assigned outcome and relevant project instructions. Inspect nearby implementation, tests, manifests and the actual supported commands.
2. Trace affected callers, stored data and external consumers. Separate a requirement change from a behaviour-preserving refactor.
3. Plan the smallest complete change that satisfies the task. Surface missing product decisions; do not invent permission, retention, pricing or retry policy.
4. Implement the domain behaviour and its relevant success, rejection, concurrency and recovery paths. Add meaningful verification alongside the code.
5. Run safe, proportionate checks. Inspect the diff and rendered UI when applicable; remove diagnostics introduced by this work.
6. Submit a reviewable change linked to criteria and evidence. Resolve findings, update affected documentation and communicate limitations.

For bugs, reproduce first where practical, investigate the cause, protect the corrected behaviour with a regression test and retest the affected path. A failure that cannot be reproduced remains an uncertainty, not permission to claim a root cause.

## Coding rules and enforcement

| Rule | Expected practice | Evidence / enforcement |
|---|---|---|
| Clear ownership | Each domain rule has an accountable module. Controllers/adapters translate; domain/application code owns decisions | Dependency review and focused domain tests |
| Intentional reuse | Share the same policy or stable component; do not merge different policies merely because code looks similar | Call-site analysis and regression coverage |
| Authoritative data | Name the system of record. Derived views/caches have invalidation, reconciliation or rebuild behaviour | Data-flow review and consistency tests |
| Explicit contracts | Typed internal interfaces where supported; runtime validation at untrusted boundaries | Type checking plus request/message validation tests |
| Predictable dependencies | Follow existing layer direction; avoid unexplained cycles and broad catch-all utility modules | Import/lint rules where available; architecture review |
| Honest naming | Use domain meaning, units and identifiers. Avoid ambiguous account, tenant, time or amount semantics | Review against the domain vocabulary |
| Controlled side effects | Isolate persistence, network and filesystem effects from pure calculations where useful | Unit tests for rules and integration tests for adapters |
| Deliberate failure handling | Preserve error causes safely; no silent catch, fake success or endless retry | Failure-path and recovery tests |
| Safe concurrency | Enforce invariants using the appropriate constraints, transactions and concurrency controls | Duplicate/retry/race tests against the real datastore behaviour |
| Compatibility | Evolve interfaces and data with supported consumers in mind | Contract comparison and mixed-version tests where relevant |
| Reproducible dependencies | Use the existing package manager and lockfile; review new dependencies and generated code | Clean install/build and applicable vulnerability/license checks |
| Maintainable tests | Verify outcomes and boundaries; use mocks deliberately rather than mocking every integration | Tests fail for a meaningful broken behaviour; flaky tests have owners |
| Clear documentation | Explain non-obvious intent, trade-offs and public usage; update changed contracts and commands | Documentation review and link/schema checks |
| Automated style | Use the repository's formatter, lint and type policies; separate mass formatting from functional edits | Deterministic CI, not repeated agent style debates |

Coverage, complexity, bundle size and duplication tools are signals. Choose thresholds for the project and change risk, not universal numbers. Minimize conflicting duplicated logic and data; useful denormalization, caching and independent policies are not automatically defects.

Google's review guidance emphasizes [system health rather than unattainable perfection](https://google.github.io/eng-practices/review/reviewer/standard.html), and checking [design, functionality, complexity, tests and documentation](https://google.github.io/eng-practices/review/reviewer/looking-for.html). The enforcement table above is this playbook's operationalization, not a verbatim company policy.

## How an architect designs the system

Start with user journeys and constraints, not a framework diagram. Establish:

- Actors, external systems, trusted/untrusted boundaries and sensitive data.
- Core domains, their vocabulary, authoritative records and invariants.
- Quality requirements: representative load, latency, availability, recovery, accessibility, maintainability, cost and team capabilities. Name measurement conditions; do not invent production traffic.
- Candidate options and trade-offs, including the simplest adequate option.
- Runtime communication, data consistency, failure behaviour, delivery/operations and an incremental migration path.

For a new small-team application, a modular monolith is a reasonable **default to evaluate**, not a universal requirement. Multiple API route groups do not require multiple deployable services. Extract services when measured scaling needs, independent deployment, security isolation or clear ownership justify distributed-system costs. Do not introduce queues, Kubernetes, CQRS, event sourcing or a gateway solely to appear production-ready.

## Minimum useful architecture artifacts

| Artifact | Must make clear |
|---|---|
| System context | People, system boundary, external dependencies and trust boundaries |
| Container/deployment view | Executable applications, stores, deployment boundaries and communication |
| Domain ownership map | Which module owns each invariant and authoritative data set |
| Runtime scenarios | Important requests, async work and failure/recovery paths |
| Decision records | Alternatives, accepted choice, consequences and conditions for revisiting |
| Quality scenarios | Observable target, workload/environment, measurement and accountable owner |

Use [C4](https://c4model.com/) for appropriately scoped architectural views; its “container” means a deployable/runnable or data-store unit, not necessarily a Docker container. Add component-level detail only when it helps a real decision. [ADRs](https://adr.github.io/) preserve why a consequential choice was made. The [decision template](templates/decision.md) is an original compact form.

An architecture is not finished when a diagram exists. Validate risky assumptions through a time-boxed spike, load measurement, integration proof or recovery exercise before large commitments. Record the evidence and what remains unknown.

## Data ownership and migration rules

- Choose the owning module/service for writes. Other components use its public interface; shared physical infrastructure does not erase ownership boundaries.
- Use datastore constraints to protect persistent invariants, not only pre-insert application checks. Test actual isolation/locking assumptions.
- Use a local transaction for changes that must commit together. A remote HTTP call is not made atomic by putting it inside a database transaction.
- Plan existing-data validation, duplicates, backfill, indexes/locks and application compatibility before rollout. Backfills should be resumable and observable.
- Prefer compatible expansion, consumer migration and later contraction when old/new versions coexist. A rollback of application code is not automatically a safe reversal of stored data.
- Document forward recovery or backup restoration for irreversible changes. Do not invent a destructive `down` migration simply to satisfy a blanket reversibility rule.
- Separate authorization, retention and deletion policy from technical convenience. These require accepted product and, where applicable, qualified compliance decisions.

For multi-service consistency and reliable publication, use the choices and boundaries in [API communication](api-standards.md). For release sequencing, use [quality gates](quality.md).

## Architecture review triggers

Require an explicit technical decision for a new service/store, changed ownership or trust boundary, public breaking contract, authentication model, significant recurring operational dependency or a decision costly to reverse. An ordinary field, component or scoped bug fix usually needs normal review, not a new architecture committee.

Record decisions as PROPOSED, ACCEPTED, REJECTED, DEPRECATED or SUPERSEDED. Unresolved architecture questions can block dependent implementation without blocking unrelated work.
