# Project working agreement

Follow the current user's scope and accepted project decisions. This agreement does not grant external access or override the host's permissions.

## Find the relevant context

- Read `docs/PROJECT_CONTEXT.md` for actual commands, owners and authoritative document locations. Adapt this path when configuring the project.
- Read the assigned task, acceptance criteria and relevant feature/design/contract records. Do not load every project document or skill.
- Inspect applicable local instructions and existing implementation before choosing patterns. Raise material conflicts; proceed on safe independent work.
- When configuring Claude rules, inspect `.claude/rules/` directly and compare `paths` with actual folders before relying on them. Propose necessary corrections within the setup task; do not assume nonmatching rules will load or edit configuration during an ordinary review.

## Deliver scoped work

- Reviews and diagnoses report findings; implementation/refactor requests include the requested changes and verification.
- Trace affected consumers before changing shared behaviour. Preserve unrelated work and coordinate overlapping edits.
- Report broader impact, but obtain expanded scope before edits beyond the authorized task. Do not hide a partial fix.
- Keep business rules and authoritative data owned in one place; reuse by responsibility, not superficial similarity.
- Enforce permissions and runtime validation at trusted boundaries. Account for relevant failures, retries, concurrency and compatibility.
- A local transaction does not make remote effects atomic; define intermediate states and recovery for distributed operations.
- Update the authoritative requirements, contracts and decisions when accepted behaviour changes; do not duplicate them into task notes.

## Verify and hand off

- Use the verified project commands and safe fixtures. Inspect destructive test setup before running it.
- Record actual checks, environment/revision, results and gaps. A build pass is not product, design, security or release acceptance.
- Use the authoritative task system for progress and ownership; include evidence, blockers and next action at handoff.
- Follow its adopted lifecycle; partial progress is not a completion state. Retain decision history and distinguish completion from deployment.
- Use parallel agents only when permitted and bounded. Shared contracts and integration have named owners.
- Publication, production operations, paid resources and risk exceptions follow the explicit authorization process.
