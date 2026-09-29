# AI-assisted product engineering playbook

Research reviewed: 2026-09-29. Status: proposed operating model for adoption, not a certification or an assessment that any application is production-ready.

Use this playbook to coordinate humans and AI agents from product discovery through operation. The existing twelve skills describe how to perform particular tasks; this playbook defines ownership, handoffs, contracts and evidence across those tasks. It does not create agents, configure a tracker or deploy software.

## Recommended starting point

For a small team, use one prioritized backlog, small reviewable changes and one accountable human product/technical owner. The same person can hold several responsibilities. Start with one implementation agent; introduce parallel agents only when the work separates cleanly and the chosen environment permits it. Preserve an existing team's effective workflow instead of imposing new terminology.

The working sequence is: understand the problem, agree observable behaviour, resolve relevant design/architecture decisions, define contracts and tasks, implement, verify, review, release when authorized, and observe the outcome. Discovery and testing feed back into earlier decisions; this is not a requirement to finish all designs before delivering anything.

The process draws on [Kanban's explicit workflow and work-in-progress controls](https://kanbanguides.org/the-kanban-guide/2025.5/) and [Scrum's product accountability and Definition of Done](https://scrumguides.org/scrum-guide.html). It is a recommended house workflow, not a claim to implement either framework in full.

## Read only what the task needs

| Document | Questions it answers |
|---|---|
| [Delivery and documentation](delivery.md) | How do ideas, features and tasks relate? Who updates them? What makes work ready or done? |
| [Roles and agent collaboration](agent-collaboration.md) | What does each expert produce? How do agents receive work, share changes and hand off evidence? |
| [Engineering and architecture](engineering.md) | How do developers organize code and architects choose boundaries, data ownership and operational trade-offs? |
| [API and service communication](api-standards.md) | How do clients, multiple APIs, workers and external services communicate without contract drift? |
| [Design, testing and release quality](quality.md) | How are usability, visual quality, correctness, security and operational readiness verified? |
| [Adoption plan](adoption.md) | What should be introduced first, what needs a decision, and how do we know the process works? |
| [Migration and package updates](migration.md) | How do older starter documents, installed skills and this playbook become one reviewed setup? |
| [Research and standards register](sources.md) | Which sources support the practices, and which choices are local conventions? |

## Standards versus conventions

- **Protocol/specification:** HTTP semantics, OpenAPI, Problem Details, trace context and applicable accessibility criteria have published definitions. Name the version and scope being adopted.
- **Engineering guidance:** OWASP ASVS, NIST SSDF, C4, architecture decision records, review practices and reliability guidance help select controls; citing them does not establish conformance.
- **House rule:** task states, folder names, reviewers, branch conventions, API pagination shape and thresholds are choices for the team to approve and automate where possible.

Within this playbook, a required gate becomes a project requirement only after adoption. Existing project rules and explicit user instructions continue to govern. Record a conflict rather than silently replacing an established contract.

## Reusable templates

Copy only a template needed for real work, complete its fields, and store it in the chosen source of truth. Template placeholders are deliberate; they are not completed project decisions.

The repository also ships product-wide requirements, design specification, architecture, workflow and task-index starters. Install these together with this playbook using `--docs`; this table covers the additional templates included inside the playbook. See the [installation guide](https://github.com/ack-solutions/claude-code-ai-skills#project-starter-documents).

| Template | Destination in a new project |
|---|---|
| [Project context](templates/project-context.md) | A short project index with owners, commands, links and quality budgets |
| [Feature](templates/feature.md) | A feature specification linked to its backlog item |
| [Task](templates/task.md) | One task in the tracker or repository, not a second competing backlog |
| [Architecture decision](templates/decision.md) | A numbered decision record for a consequential trade-off |
| [API contract review](templates/api-contract.md) | A review record linking the actual OpenAPI/event schemas |
| [Agent handoff](templates/handoff.md) | A task comment or artifact at a meaningful handoff |
| [Release evidence](templates/release.md) | A release-specific verification and recovery record |
| [Shared agent instructions](templates/AGENTS.template.md) | A short root `AGENTS.md`, merged with existing instructions |
| [Claude adapter](templates/CLAUDE.template.md) | A root `CLAUDE.md` importing that shared file when using both tools |

The last two templates are optional adapters, not instructions to replace an application's existing `CLAUDE.md`. Claude-only teams can put the concise shared instructions directly in `CLAUDE.md`. The [Claude import mechanism](https://code.claude.com/docs/en/memory) and [Codex instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md) are different; ordinary linked documents are not automatically imported by both tools.

## How to use this with the skill pack

1. Install the relevant [skills and optional project documents](https://github.com/ack-solutions/claude-code-ai-skills#quick-start).
2. Select a real, bounded feature and complete project context plus its feature/task records.
3. Tell the agent which project decisions are accepted, which files it may change and what evidence is required. Link only the applicable playbook sections.
4. Use the role's existing skill, such as `product-planning`, `product-design`, `feature-delivery` or `product-quality`.
5. Review the result against requirements. A claimed role, task status or successful model response is not verification.

Example first request:

> Inspect this project's instructions, commands and documentation. Use the engineering playbook to propose a single source of truth and a small pilot feature. Identify unresolved product/API decisions and the checks we can actually run. Produce the plan and task records; do not change application code, infrastructure, tracker configuration or remote repositories yet.

The installer always installs skills. `--docs` additionally copies project documents and this playbook; `--starter` separately adds the short root `CLAUDE.md`, and `--rules` selects framework rules. All conflicts are checked before copying. It does **not** configure branch policies, application CI, trackers or agent teams. Adopt the proposed practices deliberately using [the staged plan](adoption.md).
