---
paths:
  - "apps/api/src/migrations/**/*.ts"
  - "apps/api/src/**/*.entity.ts"
  - "libs/types/src/**/*.ts"
  - "docs/database/**/*.md"
  - "docs/api/**/*.md"
---

# Database and contract conventions

Adapt the paths to the actual schema, migration and shared-contract locations. Follow the chosen database and ORM; this template does not authorize replacing them.

- Identify canonical identities, record ownership and units. Preserve distinctions between authentication identities and application/domain records when the project has them.
- Reuse authoritative contract definitions. Keep runtime validation, API schema, client types and storage constraints compatible; do not assume type declarations validate runtime input.
- Review migrations for existing data, locks, rollout compatibility and recovery. A rollback script cannot automatically restore removed data.
- Enforce uniqueness and relationships durably. Test concurrent writes and idempotent retries when they affect the changed invariant.
- Make transaction boundaries, external side effects and derived-data refresh/rebuild rules explicit.
- Avoid competing copies of business facts, while preserving justified caches, projections and historical snapshots with defined lifecycle rules.
