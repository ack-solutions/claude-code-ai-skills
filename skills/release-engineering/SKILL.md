---
name: release-engineering
description: Prepare CI/CD, environments, deployment, observability, backups, recovery, or release readiness. Use for delivery infrastructure changes and operational release checks for web, API, or mobile applications.
---

# Release engineering

Make the requested delivery process reproducible and observable, with a practical recovery path. Discover the project's actual hosting and release tools; do not assume a cloud provider or introduce infrastructure solely because it is available.

## Identify the operation

Distinguish a readiness review, local configuration change, staging deployment or production release. Read relevant runbooks, manifests, CI, environment schema and migration policy. Resolve the target artifact/version and environment from evidence. Respect existing deployment authorization without adding repeated approval gates.

For a review, produce evidence and gaps. For requested setup, implement the configuration and verify it locally or in the authorized environment. Live deployment, store submission, DNS changes, purchases and destructive data operations must be within the user's requested scope.

## Build the delivery path

- Reproducible dependencies, build commands, artifact identification and environment-specific public/secret configuration.
- Relevant quality gates with disposable test data. Preserve product/design acceptance coverage instead of treating successful compilation as acceptance.
- Least-necessary CI/runtime access and deliberate secret handling. Do not print secrets or embed them in client assets.
- Schema/application rollout order and compatibility, with backfill and rollback/forward-fix decisions when applicable.
- Health/readiness checks, graceful termination, dependency failure behaviour and background-worker lifecycle relevant to the app.
- Useful logs, metrics, error reporting and alerts tied to operations and ownership. Keep sensitive data out of telemetry.
- Backup policy and restore verification. A configured backup is not evidence that recovery works.
- Web/API smoke checks or mobile signing, versioning, distribution and staged rollout checks appropriate to the requested target.

Use [the runbook outline](references/runbook.md) only where a new or changed procedure needs documenting.

## Verify and finish

Run applicable configuration/build checks and authorized environment smoke tests. Verify migrations and recovery in a safe environment where possible. Report checks that could not run and specific prerequisites such as absent accounts, signing material or chosen hosting.

Produce a readiness report or implemented setup with target, artifact, checks, operational gaps and rollout/recovery instructions. After an authorized deployment, verify observed health and report the actual state; never claim a planned deployment happened.
