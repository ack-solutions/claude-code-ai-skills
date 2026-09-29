# {{feature ID}}: {{user-visible outcome}}

Status: PROPOSED
Accountable owner: {{name}}
Authoritative backlog item: {{link or record}}
Last approved revision: {{revision or not approved}}

## Problem and evidence

Who needs this, what are they trying to do, and what supports the need? Label observations, research sources and hypotheses separately.

## Scope

- In scope:
- Out of scope:
- Product success signal and how it can be measured:
- Constraints and authoritative shared policies:

## Journeys and behaviour

Describe the normal path, relevant alternate/recovery paths and cross-role effects. Identify entry/exit points, state transitions, permissions and irreversible actions. Link the design reference and its revision rather than pasting every screen here.

For substantial features, make the behaviour explicit: entry/exit conditions, role/ownership checks, business rules, valid and invalid state transitions, validation, loading/empty/error/success states, cancellation, repeated submissions and interruption/recovery. Cover only applicable cases; link shared rules rather than copying them. A short feature need not fill every category.

## Data, contracts and operational impact

- Owning domains and authoritative data:
- HTTP/event contract references and affected consumers:
- Concurrency, duplicate submission and partial-failure expectations:
- Existing data/client compatibility and migration effects:
- Sensitive data, retention and access constraints:
- Relevant performance, accessibility and reliability targets:

## Acceptance criteria and traceability

| Criterion | Observable expectation | Task(s) | Verification / result |
|---|---|---|---|
| AC-01 | Given {{context}}, when {{action}}, then {{outcome}} | {{IDs}} | NOT RUN |
| AC-02 | {{important denial/failure/recovery expectation}} | {{IDs}} | NOT RUN |

Replace generic checklists with feature-specific expectations. Do not describe an assumed implementation as the requirement.

## Decisions and readiness

| Unresolved question | Decision owner | Affected work | Resolution / evidence |
|---|---|---|---|
| {{question}} | {{owner}} | {{scope}} | {{pending}} |

Keep questions and their resolutions, or link a durable decision record. Do not erase them to mark work ready. Only unresolved decisions that materially affect the current implementation block its readiness; unrelated future choices remain tracked. Use the adopted delivery lifecycle rather than inventing extra statuses.

## Rollout and acceptance

- Rollout/flag/deprecation needs and recovery reference:
- Acceptance evidence and accountable reviewer:
- Remaining limitations or permitted exceptions:
- Release/build/environment when actually deployed:
