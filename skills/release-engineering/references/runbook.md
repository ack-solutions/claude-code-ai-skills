# Release runbook outline

Adapt the existing runbook rather than creating a competing one.

1. Target environment, artifact/version and responsible owner.
2. Prerequisites: configuration names, access, signing, dependencies and verified quality results. Reference secret storage without including secret values.
3. Preflight: expected current version/state, backups and migration compatibility.
4. Rollout order: data preparation, services/workers, clients and traffic changes as applicable.
5. Verification: health, smoke journeys, metrics/error thresholds and observation period defined for this release.
6. Recovery triggers and actions: rollback versus forward fix, data compatibility and restoring/reconciling writes.
7. Outcome record: deployed artifact, evidence, unresolved incidents and follow-up ownership.

Use commands verified for this project's tools. Do not invent production hostnames, identifiers, access or secrets.
