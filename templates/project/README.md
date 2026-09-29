# Project documentation

Status: starter awaiting project-specific decisions. Copying these documents does not approve requirements, prove quality or authorize implementation/deployment.

## Start here

Complete [project context](PROJECT_CONTEXT.md) with the actual stack, commands, owners, document locations and adopted conventions. Preserve existing project decisions; replace placeholders only with verified facts or explicitly labeled proposals. Do not load every document for a routine edit.

| Source of truth | Responsibility |
|---|---|
| [Requirements](REQUIREMENTS.md) | Product outcomes, audience, global business rules and cross-feature journeys |
| [Design specification](DESIGN_SPEC.md) | Shared design foundations, interaction patterns and design acceptance targets |
| [Architecture](ARCHITECTURE.md) | System boundaries, domain/data ownership, dependencies and runtime scenarios |
| [Workflow](WORKFLOW.md) | Adopted delivery process and local exceptions |
| [Tasks](TASKS.md) | One authoritative backlog, or links to the selected tracker |
| [Feature template](features/_TEMPLATE.md) | Feature-specific behaviour, contracts and acceptance evidence |
| [Engineering playbook](engineering/README.md) | Shared working practices and reusable task, ADR, API-review, handoff and release templates |

## Use without duplication

Keep product-wide rules here, feature-specific behaviour in the feature record, API fields in the authoritative schema, and work status in one backlog. Link rather than copy shared rules into each task. Architecture decisions explain why; the architecture overview explains the current system.

Read root instructions first, then the assigned requirement/feature and relevant code. Consult design, architecture and workflow when the task touches their responsibilities. Update the owning document when approved behaviour changes, not merely to match an accidental implementation.

## Adoption and provenance

The installer records its source pack in `engineering/pack-manifest.json`. Installed files are independent reviewed copies, not auto-updating subscriptions. Keep project-specific changes in this repository and review later upstream differences before merging.

Use [migration guidance](engineering/migration.md) when starting from an older documentation pack. Follow [quality evidence](engineering/quality.md) and the release template for actual acceptance; unfilled templates are not completed gates.
