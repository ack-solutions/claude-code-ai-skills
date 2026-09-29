# System architecture

Status: DRAFT
Technical owner: {{name}}
Reviewed revision / date: {{not reviewed}}

Describe this system, not an idealized stack. The overview records the current or explicitly proposed architecture; ADRs preserve decision history, and schemas own field-level contracts.

## Context and constraints

- Actors, critical journeys, system boundary and external dependencies:
- Product scale, team capabilities, constraints and evidence versus estimates:
- Trusted/untrusted boundaries, sensitive information and isolation requirements:
- Diagram or equivalent concise description of applications, stores and deployment boundaries:

Do not add services, queues or infrastructure simply to fill this template. Evaluate the simplest architecture that satisfies measured or accepted needs.

## Domain and data ownership

| Domain / module | Responsibilities and invariants | Authoritative records / write owner | Public interfaces | Dependencies |
|---|---|---|---|---|
| {{domain}} | {{rules}} | {{source of truth}} | {{interfaces}} | {{allowed direction}} |

Explain shared libraries, allowed dependency directions and frontend/server state ownership. Derived caches, search indexes and read models have refresh/reconciliation or rebuild policies; they are not competing authorities. Similar-looking policies are shared only when their meaning and owner match.

## Runtime and API communication

| Producer -> consumer | In-process / HTTP / event / other | Schema source and revision | Trust / authorization | Failure / recovery owner |
|---|---|---|---|---|
| {{boundary}} | {{mechanism and reason}} | {{contract}} | {{identity and checks}} | {{owner}} |

Use [API standards](engineering/api-standards.md) to record adopted error, pagination, versioning, validation, retry, idempotency, webhook and event policies. Link actual machine-readable schemas; do not create another editable schema in prose.

Describe representative critical scenarios from entry to durable outcome, including partial failure, duplicate delivery, cancellation, concurrency and old/new client compatibility. A timeout after a write can leave an unknown outcome.

## Persistence, jobs and consistency

- Datastores, schema/migration locations and constraints protecting invariants:
- Local transaction boundaries and tested isolation/concurrency assumptions:
- Cross-service intermediate states, outbox/deduplication/reconciliation where needed:
- Background job scheduling, durable acceptance, retries and replay/dead-letter ownership:
- Compatible migration/backfill order, resumability, monitoring and recovery:
- Retention/deletion/backup policy references and safe synthetic test data:

A local database transaction cannot make remote calls or real-world effects atomic. Use an explicit durable workflow and recovery policy for distributed effects. An application rollback does not automatically undo stored data; document forward recovery or verified restoration for irreversible changes.

## Quality scenarios and operations

| Property / critical journey | Accepted target and measurement window | Load / environment | Evidence and owner |
|---|---|---|---|
| {{latency, capacity, reliability, recovery or cost}} | {{target or undecided}} | {{conditions}} | {{measurement or NOT RUN}} |

Link environment/configuration ownership, secrets management, CI/build artifacts, rollout/runbooks, health checks, trace/log/metric conventions, alerts and incident escalation. State recovery-time and acceptable data-loss objectives where relevant and link restore evidence. Do not invent an uptime or performance guarantee.

## Decisions and review

| Decision / open question | ADR or durable record | Owner | Dependent work / revisit trigger |
|---|---|---|---|
| {{choice}} | {{reference}} | {{owner}} | {{impact}} |

Use the [decision template](engineering/templates/decision.md) for consequential trade-offs. Keep accepted, rejected and superseded rationale. Review changed boundaries, contracts, security/data effects and quality assumptions with the affected consumers; validate risky assumptions through a focused spike, integration test, load measurement or recovery exercise.
