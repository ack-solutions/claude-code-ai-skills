# Contract review: {{API / operation / event}}

Status: PROPOSED
Producer / domain owner: {{owner}}
Consumers and contact/owners: {{list}}
Feature/task: {{references}}
Authoritative schema: {{OpenAPI / AsyncAPI / other file and revision}}
Specification/toolchain version: {{supported versions}}

This record explains decisions and review evidence; it does not replace the machine-readable schema or create a second editable copy of every field.

## Interaction and semantics

- HTTP method/path/operation, RPC or channel/message identity:
- Synchronous outcome versus durable acceptance versus eventual completion:
- Authoritative state and observable transitions:
- Authentication, issuer/audience, operation/object/field permissions:
- Validation, null/absence semantics and relevant units/time zones:
- Success/error, conflict, pagination and concurrency policy:

## Failure and safety contract

- Timeout/deadline and retryable failures:
- Idempotency/deduplication scope, retention and concurrent handling:
- Partial failure, compensation/reconciliation and recovery owner:
- Event ordering, replay and dead-letter handling where relevant:
- Rate/size limits with the source of each decision:
- Sensitive fields, logging/redaction and trace propagation:

## Change and rollout

- Compatible addition or breaking change, with rationale:
- Affected supported client versions and generated-code impact:
- Producer/consumer deployment order:
- Deprecation/communication plan and removal condition:
- Schema, validation, contract and integration checks:

## Review evidence

| Reviewer / consumer | Reviewed revision | Concern / decision | Evidence / unresolved work |
|---|---|---|---|
| {{owner}} | {{revision}} | {{result}} | {{artifact or pending}} |
