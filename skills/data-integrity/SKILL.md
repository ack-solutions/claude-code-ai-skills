---
name: data-integrity
description: Review or change data contracts, schema, migrations, uniqueness, transactions, or retry/concurrency behaviour. Use when inconsistent data, duplicate records, contract drift, or persistence changes are the task.
---

# Data integrity

Keep authoritative data, contracts and state transitions consistent across writers and consumers. Discover the actual database, ORM and migration practices before recommending changes.

## Map the invariant

Read the relevant requirements, schema/migrations, shared types, API schemas and writers/readers. Identify the fact that must remain true, its authoritative owner, allowed states and identity relationships. Distinguish persisted data, cache, derived summaries, audit history and client presentation.

Check:

- Type/shape agreement between API, clients and storage, including nullability, missing versus empty, time zones, decimal/currency units and enums.
- Uniqueness and referential integrity at the durable enforcement layer. Application prechecks alone do not prevent races.
- Transaction boundaries and isolation assumptions for multi-step changes. External side effects do not become atomic merely because a database transaction exists.
- Idempotency ownership, key scope, payload mismatch, result replay, expiry and concurrent duplicate requests.
- State transitions under retries, reordered events and partial failure; recovery or reconciliation when systems cannot change atomically.
- Compatibility with old clients and existing rows, including historical data that violates a proposed constraint.
- Cache invalidation and rebuildability of derived data. Avoid independent copies of a rule or fact; preserve deliberate history/snapshots.

For schema rollout, use [migration review](references/migrations.md). Use generated client types only if the project has selected and can maintain that toolchain; do not introduce generation or replace the ORM by default.

## Validate

For an audit, report invariant violations and evidence without executing migrations. For requested changes, test on disposable fixtures and verify meaningful duplicate, concurrent, failure and upgrade cases. Inspect the target before running any operation that resets data.

Prefer the existing constraints and transaction mechanisms that express the invariant. Base infrastructure changes on demonstrated needs. Do not run a destructive production migration or repair user records merely because a review identified a problem.

## Deliver

State the invariant, affected contracts/writers, actual issue or change, migration/recovery implications and verification. Flag decisions requiring product clarification separately from technical defects.
