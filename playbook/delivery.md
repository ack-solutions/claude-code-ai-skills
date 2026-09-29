# Delivery, feature management and documentation

Scope: recommended team conventions. Choose owners and a source of truth before treating these as active project rules.

## One record for each responsibility

| Record | Owns | Does not own |
|---|---|---|
| Product brief / requirements | Target audience, problems, outcomes, constraints and product-wide rules | Every implementation task |
| Feature specification | Observable behaviour, boundaries, acceptance criteria and affected journeys | A duplicate database schema or copied shared policy |
| Task | One bounded deliverable, assignee, dependencies, work status and verification | New unapproved business rules |
| Design reference | Approved screen/interaction states and design tokens | Backend authorization policy |
| Architecture decision record (ADR) | Context, alternatives, chosen trade-off and consequences | All implementation details |
| API/event schema | Machine-readable request, response and message contracts | Product rationale and current work status |
| Pull request / change review | Proposed code/doc changes, checks and review resolution | The only durable feature specification |
| Release record / runbook | Build, environment, rollout, monitoring and recovery evidence | A substitute for acceptance testing |

Store task status in **one** system: GitHub Projects/issues, another tracker, or repository Markdown. If a repository index links to a tracker, it is a navigation aid, not an independently editable copy of every status. Keep durable technical decisions and contracts versioned with code where practical.

## Work hierarchy

Use an optional initiative for a larger outcome; split it into features that deliver recognizable value, then tasks small enough to implement and review coherently. Bugs and investigations are legitimate task types. An investigation's result is evidence or a decision, not necessarily code.

Use stable identifiers from the selected tracker. For file-based work, examples such as `FEAT-001`, `TASK-001` and `ADR-001` are a house convention. Never renumber existing records merely to match these examples.

Traceability should be followable: feature acceptance criterion -> task -> change -> test/evidence -> release. A task can contribute to several criteria. Tests reference a criterion or behaviour rather than mechanically copying the implementation.

## Task lifecycle

| State | Entry condition / next action |
|---|---|
| BACKLOG | Identified work, possibly not yet specified or dependency-ready |
| READY | Bounded goal, testable result, required decisions/dependencies and verification approach are available |
| IN_PROGRESS | One assignee has claimed the task and named the working branch/workspace |
| IN_REVIEW | Deliverable and author checks are available for the required review |
| DONE | Agreed outcome is accepted, applicable checks passed, docs updated and changes integrated into the agreed baseline |
| BLOCKED | A named unmet dependency, missing authority or unavailable resource prevents required progress; record owner and next action |
| CANCELLED | No longer required; record why and account for any partial changes |

Review findings can return work to IN_PROGRESS. A material scope change can return it to BACKLOG/READY for re-planning. BLOCKED is not a euphemism for difficult work; safe independent work may continue. A partial implementation is not DONE. If a required check cannot run, report it and resolve the gap or record an explicit permitted exception.

Keep feature acceptance and deployment separate: a feature may be PROPOSED, READY, IN_PROGRESS, ACCEPTED or RELEASED. ACCEPTED means its agreed product evidence is sufficient in the named environment; RELEASED additionally identifies the production rollout. Task DONE is not a claim that customers have received the feature.

These exact states are a house vocabulary. Map existing states once rather than maintaining two different workflows.

## Definition of Ready

For an implementation task, establish:

- The outcome, scope exclusions, affected feature criteria and owning domain.
- Applicable design states and contract revision, where the change crosses an interface.
- Known dependencies and decisions whose absence would materially change implementation.
- Risk, test data/environment and the checks that establish success.
- The assignee's permitted changes and who resolves product or architecture questions.

Do not require a large feature spec for a spelling correction. An accepted issue description may be enough for a small change. Discovery tasks can be READY specifically to resolve an unanswered question.

## Definition of Done

The task's acceptance criteria are met; appropriate verification results are recorded; required reviews are resolved; relevant docs/contracts reflect the change; compatibility and migration effects are accounted for; unrelated edits are preserved; temporary diagnostics are removed. Identify remaining work honestly. Use the [risk-based quality gates](quality.md) rather than treating every checkbox as applicable to every change.

The [Scrum Guide](https://scrumguides.org/scrum-guide.html) establishes a shared Definition of Done as a quality commitment. The Ready checklist and task states here are our conventions, not additional rules claimed to come from Scrum.

## A professional working cadence

- Pull the highest-priority READY work whose dependencies and available review capacity permit it. Limit concurrent unfinished work; do not maximize the number of running agents.
- Update a task when it is claimed, materially blocked, handed off or completed. A useful update says what changed, the evidence and next action, not a percentage invented by the agent.
- Review the backlog when new evidence or scope changes arrive. Demonstrate a working outcome with each meaningful increment and regularly inspect defects, delays and confusing handoffs.
- If the team chooses Scrum, adopt its actual accountabilities and events. Otherwise a lightweight flow-based process is a reasonable starting point; do not relabel it as certified Scrum.

Explicit workflow, work-in-progress control and inspection of flow come from the [Kanban Guide](https://kanbanguides.org/the-kanban-guide/2025.5/). The chosen meeting cadence and WIP limits are local decisions.

## Change control and documentation

When expected behaviour changes, update its authoritative specification, identify affected consumers/tests, and adjust dependent tasks in the same change or linked coordinated changes. An implementation mismatch does not authorize rewriting the specification to declare it correct.

If a shared rule must change beyond the current task's authorization, document the impact and obtain the expanded scope. Do not silently widen the task, and do not hide a known partial fix.

Record decisions where future work will find them: product choices in the feature/requirements; design choices in the design reference; consequential technical trade-offs in an ADR. Chat can initiate a decision but is not its sole durable record. Supersede ADRs with a link rather than silently erasing their history.

## Measure improvement, not activity

Track a few meaningful measures: task cycle time, blocked/review age, escaped defects and critical-journey completion. Where deployments exist, baseline DORA's change lead time, deployment frequency, failed deployment recovery time, change fail rate and deployment rework rate. Compare a service with its own history; do not rank agents by commits, lines of code or tickets closed. [DORA measurement guidance](https://dora.dev/guides/dora-metrics/).
