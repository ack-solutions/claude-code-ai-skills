# Product requirements

Status: DRAFT
Accountable product owner: {{name}}
Approved revision / date: {{not approved}}

This file owns product-wide behaviour. Put detailed feature behaviour in feature records and link schemas/designs instead of reproducing them. Scale documentation to the product; remove irrelevant prompts with a reason.

## Problem, audience and outcomes

- Target audiences, market and supported platforms:
- Problem and evidence; distinguish observations, research and hypotheses:
- Product outcome and measurable success signal:
- MVP scope, explicit exclusions and constraints:
- Shared domain vocabulary and identifier meanings:

## Global business rules

| Rule ID | Observable rule / invariant | Rationale or evidence | Owner | Affected features |
|---|---|---|---|---|
| {{RULE-001}} | {{approved behaviour or proposal}} | {{source}} | {{owner}} | {{references}} |

Describe relevant roles, permissions, ownership/tenancy, lifecycle transitions and destructive actions. Define amounts/currencies, dates/time zones, limits and consent only when required; agents must not invent those product choices. Separate a role's intended capability from its technical enforcement.

## Cross-feature journeys

| Journey | Actor / entry | Intended outcome | Alternate / failure / recovery paths | Feature records |
|---|---|---|---|---|
| {{journey}} | {{context}} | {{observable result}} | {{cancellation, interruption, retry, denial}} | {{links}} |

Include cross-role effects and durable results. Identify pending/unknown outcomes after a timeout rather than assuming every failed response means a failed operation.

## Data and compatibility policy

- Authoritative owner for key facts; link the architecture ownership map:
- Sensitive data, retention/deletion and export policy; unresolved obligations need an accountable decision:
- Shared validation and user-facing error/recovery expectations:
- Supported clients and backwards-compatibility/deprecation policy:
- Relevant offline, duplicate submission and concurrent-change expectations:

Technical schemas and transaction mechanisms belong in architecture/contracts, not duplicated here.

## Feature index and acceptance

| Feature | User outcome | Authoritative specification | Success / acceptance evidence |
|---|---|---|---|
| {{feature ID}} | {{outcome}} | {{record}} | {{evidence or NOT RUN}} |

Use the adopted feature lifecycle from [delivery](engineering/delivery.md); keep status in its authoritative record. A sufficiently specified requirement is ready for implementation, not proof that the product works. Deployment requires separate release evidence.

## Quality constraints

Link the agreed accessibility, platform, performance, security and reliability targets in project context, design and architecture. Give each target an owner, measurement conditions and acceptance procedure; do not invent universal thresholds.

## Decisions and changes

| Question / decision | Owner | Affected work | Status / rationale / evidence |
|---|---|---|---|
| {{question}} | {{owner}} | {{dependent work or none}} | {{pending or resolution}} |

Keep resolved decisions or link their durable record. Only material unresolved questions block dependent implementation. Approved requirement changes identify affected features, consumers and verification; do not silently rewrite history or expand an agent's authorization.
