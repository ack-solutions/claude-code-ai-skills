# Project working agreement

Follow the user's explicit request and existing project decisions. Use the relevant project skills when their workflows fit the task; do not load every skill for routine edits.

## Learn this project

- Read the README, relevant manifests and existing tests to discover setup, stack and commands. Record verified project-specific commands here when asked to configure the project.
- Use existing product requirements for behaviour, architecture notes for module boundaries, and design tokens/components for UI work. If they do not exist, establish only the context the requested task needs.
- If the project starter docs are installed, begin with `docs/README.md` and `docs/PROJECT_CONTEXT.md`; read the relevant requirements, design, architecture and feature records on demand. Templates and proposed playbook rules are not automatically approved decisions.
- State material assumptions. Resolve missing product choices that change the outcome, while proceeding on safe independent work.

## Implementation

- Trace affected consumers before changing shared behaviour. Preserve unrelated work.
- If the complete fix needs changes beyond the authorized task, report the full impact and obtain expanded scope before those changes. Do not hide an incomplete fix or silently widen the task.
- Keep one clear owner for each business rule and authoritative fact. Reuse existing contracts/components when the responsibilities match.
- Enforce permissions and ownership at the trusted boundary. Consider failure, retries, concurrency and compatibility relevant to the change.
- Keep schema changes deliberate and review generated migrations. Inspect test setup before commands that reset data.
- Local transactions do not make remote effects atomic. Identify intermediate states and recovery for distributed operations.
- Update affected requirements, contracts and documentation when intended behaviour changes.

## Verification and scope

- Test meaningful behaviour against requirements and use the project's relevant lint/type/build commands. Report exactly what ran and what remains untested.
- Inspect rendered UI and real journeys where tools permit. Source review and a passing build do not establish visual or product acceptance.
- A review or diagnosis produces evidence and recommendations. A request to fix/refactor includes scoped implementation and verification.
- Publishing, production changes and external communications follow the user's actual authorization. Do not invent deployment targets or credentials.
- Never claim unperformed tests, studies, research, measurements or deployments. Distinguish facts, hypotheses and proposals.
- Use one authoritative backlog and its adopted lifecycle. Record partial progress and unresolved decisions without inventing completion states or deleting decision history. Task completion is separate from deployment.
