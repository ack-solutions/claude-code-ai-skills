# Migration review

Inspect the generated SQL and the actual database/ORM version. Use current official documentation when lock behaviour or syntax is uncertain.

- Existing rows: duplicates, nulls, invalid references and values outside new constraints. Discover with read-only checks before choosing a repair policy.
- Compatibility: can old and new application versions run during rollout? Consider additive change, backfill, consumer switch and later removal when necessary.
- Backfill: bounded batches, resumability, progress and verification. Do not invent a canonical value for conflicting business records.
- Operational effect: locks, index creation, table rewrite, transaction duration, disk growth and expected data volume.
- Recovery: distinguish reverting schema from restoring lost data. A down migration is not automatically a valid rollback after new writes.
- Test: apply against representative disposable data; exercise both new and old contracts when required; validate expected constraints and failure paths.

Document the rollout order and verification query/test for the changed invariant. Production execution remains within the user's actual deployment authorization.
