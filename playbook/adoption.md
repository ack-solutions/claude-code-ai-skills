# Adoption plan

Status: proposed rollout of documentation and engineering controls. No task tracker, agent configuration, application CI, API implementation or production environment is changed by this plan.

## Decisions to make once

Use [project context](templates/project-context.md) to record:

- Product/technical/release accountability; these may be one person in a small team.
- Authoritative backlog location and the mapping from existing states to the agreed lifecycle.
- Supported clients/platforms, critical journeys and relevant data/security obligations.
- Actual setup/test/build commands and safe test environments.
- API schema ownership, authentication boundaries, version/error/pagination conventions and consumer compatibility policy.
- Design system source, accessibility target and supported locale/device/theme matrix.
- Deployment environments, operational budgets and recovery expectations.
- Which agent tools are available, when delegation is permitted and which actions require approval.

Do not block an initial documentation pilot on choosing every future vendor. Mark unresolved decisions with the dependent work they actually block.

## Phased rollout and exit criteria

| Phase | Work | Exit evidence |
|---|---|---|
| 1. Agree the operating model | Inventory current docs; choose one backlog; assign owners; map states; record adopted rules and exceptions | No competing status source; one real feature/task can be located and understood |
| 2. Prepare the pilot | Select a bounded cross-layer feature; complete only relevant design/architecture/contract decisions; create testable tasks | An implementer can explain scope, dependencies, permission boundaries and required checks without guessing product policy |
| 3. Deliver and verify | Use existing skills; implement the pilot; review code, product and design evidence; update docs | Criteria trace to real checks; gaps are explicit; reviewers can reproduce material results |
| 4. Enforce repeatable controls | Add target-project CI, contract checks, safe fixtures and branch/release policies that the pilot demonstrated are useful | Controls run on a representative change and catch an intentionally demonstrated failure in a disposable fixture |
| 5. Scale and operate | Introduce bounded parallel work when useful; establish release/recovery evidence; measure delays and escaped defects | Integrated work remains coherent; recovery is demonstrated; measured problems drive the next improvement |

Sequence the phases by dependencies, not by a promised number of days. Team capacity, available test infrastructure and application risk determine timing.

## A concrete pilot, not a blanket rewrite

Illustrative example: reschedule an appointment. This is a fictional walkthrough, not a completed test or a required feature for your application.

1. Product defines who may reschedule, allowed conditions, conflicts and the intended user outcome. Unchosen limits remain decisions, not agent-generated policy.
2. Design specifies selecting a slot, confirming, conflicts, expired sessions and preserving context after recovery.
3. Architecture identifies the scheduling owner, authoritative record and concurrency invariant. A new service is unnecessary unless justified by the system's needs.
4. Producer and consumers agree the HTTP operation, schema, authorization, conflict response and retry/concurrency contract.
5. Tasks cover a complete vertical slice, with shared-contract work coordinated before dependent clients diverge.
6. Developer verifies the allowed/denied cases and concurrent/repeated submissions. QA checks that both affected views show the intended result. Design QA inspects the specified rendered states.
7. Release owner checks compatible rollout, monitoring and recovery. Until deployed and observed, the feature is not labeled RELEASED.

## Agent-instruction rollout

Keep the current project instructions. Merge applicable guidance rather than installing a second contradictory policy. For a new shared setup, adapt the [AGENTS template](templates/AGENTS.template.md) into a root `AGENTS.md` and complete the document/command routing. The [CLAUDE adapter](templates/CLAUDE.template.md) is useful when Claude should import that same short agreement. Their `.template.md` filenames intentionally prevent them from becoming active instructions in this repository.

Do not auto-import the full playbook or install these adapter templates into an existing project's root without review. The installer leaves these adapters inert. With `--docs`, it installs a reviewed-copy starting point under `docs/engineering` and project documents under `docs`; `--starter` separately adds the Claude-only working agreement if absent or identical. Neither option approves the proposed practices. For existing projects, follow [migration guidance](migration.md) and merge intentionally; do not silently follow changing remote instructions.

Verify discovery in a fresh session by asking the agent to identify the instructions it loaded and the task-specific references it needs. Then run a small task with observable outputs. This is an adoption test, not a reason to grant broader permissions.

## Behavioural evaluation before broader use

Use the repository's [skill evaluation cases](https://github.com/ack-solutions/claude-code-ai-skills/blob/main/EVALUATION.md) plus these process trials in a disposable project:

- A review-only request produces findings without changing implementation.
- A request to fix a bounded defect continues through an actual regression check.
- A missing product policy is surfaced; unrelated authorized work continues.
- Two writers identify a shared-contract conflict before overwriting each other.
- A simulated API timeout after a committed write does not lead the workflow to assume the write never occurred.
- Missing runtime/device access is reported as NOT RUN/BLOCKED, not passed quality testing.
- A migration's irreversible effect is called out even if a syntactically valid rollback command exists.

Record what actually happened, including task/model/tool context. Refine instructions based on demonstrated failures. Do not add more roles, templates or mandatory ceremonies merely because the current set exists.

## Definition of successful adoption

The team can trace one feature from need to measured result, explain each decision's owner, reproduce its verification, and recover from a realistic failure. Documentation remains current with normal changes. These outcomes matter more than the number of files, prompts or agents.
