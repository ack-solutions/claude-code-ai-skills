# Project delivery workflow

Adoption status: PROPOSED
Accountable owner: {{name}}
Authoritative backlog: {{tracker or TASKS.md; choose one}}
Accepted rules / date: {{not adopted}}

The canonical definitions live in [delivery](engineering/delivery.md): task and feature states, readiness, completion, scope changes and durable decisions. Do not maintain a second, subtly different lifecycle here.

## Adopt for this project

- Preserve the existing tracker when it works. Record any state mapping and local exceptions below.
- Requirements, design exploration, impact analysis, implementation, tests and documentation review are activities within delivery; they do not each require another tracker status.
- Claim one bounded task with an assignee, integration/review owner, permitted scope and verification approach using the [task template](engineering/templates/task.md).
- Follow [agent collaboration](engineering/agent-collaboration.md) for ownership and handoffs; parallel agents require actual authorization and independent work boundaries.
- Select [quality gates](engineering/quality.md) by risk and record actual results. A task marked done is not proof that a feature has been deployed.

## Exceptions and mappings

| Existing convention / exception | Adopted meaning or mapping | Rationale / owner / review date |
|---|---|---|
| {{none or existing state}} | {{meaning}} | {{decision}} |

For older starter packs, use [migration guidance](engineering/migration.md). Keep resolved decisions and explicitly record remaining scope; do not delete unanswered questions to pass a readiness gate. Approve expanded task scope before implementing changes beyond the existing authorization.
