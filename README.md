# Claude Code AI Skills

**12 reusable AI skills, project starter documents and an engineering playbook for Claude Code.**

[![Validate skills](https://github.com/ack-solutions/claude-code-ai-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/ack-solutions/claude-code-ai-skills/actions/workflows/validate.yml)

Turn product ideas into scoped requirements, design clear user journeys, implement features, and review code, product quality, accessibility, security and performance. This collection also covers DevOps, release readiness, market research, search engine optimization (SEO) and app store optimization (ASO).

The skills guide Claude to inspect your project's actual stack and conventions. Optional **React, NestJS, Flutter and database rule templates** add file-specific engineering guidance without forcing a framework or architecture.

By [ACK Solutions](https://github.com/ack-solutions) · Version 1.1.1 · [MIT license](LICENSE) · Dependency-free installer

[Quick start](#quick-start) · [Where CLAUDE.md belongs](#where-claudemd-belongs) · [Installed documents](#project-starter-documents) · [Skill catalog](#skill-catalog) · [Framework rules](#optional-framework-rules) · [Troubleshooting](#troubleshooting) · [Validation](#validate-and-evaluate) · [Contributing](CONTRIBUTING.md)

**This is an AI guidance toolkit, not an application boilerplate.** It installs Markdown skills, optional instructions and documentation templates. It does not create a React/NestJS/Flutter application, install application dependencies, configure CI, create an agent team or deploy anything. Those are separate tasks after you agree on the product and implementation plan.

## Why use this skill pack?

- **Focused workflows:** planning, implementation and specialist reviews have distinct responsibilities. Use the skill relevant to your task, not all twelve at once.
- **Evidence over claims:** audits need concrete findings; runtime testing needs actual execution; performance improvements need measurements.
- **Reusable across projects:** no application-specific business rules, hardcoded local paths or account credentials are included.
- **Controlled changes:** review requests produce findings. Fix and implementation requests authorize the corresponding scoped changes.
- **Safe installation:** previews, conflict detection and repeatable installs protect existing project instructions and unrelated skills.

Skills are reusable instructions, not autonomous employees or a guarantee of bug-free software. Their effectiveness depends on project context, available tools, model behaviour and verification.

## Where CLAUDE.md belongs

There are two different repositories:

- **This toolkit:** keep reusable skills and templates here. `templates/CLAUDE.md` is the master template for new applications.
- **Your application:** keep its code, project-specific instructions and completed documents here. The installer copies the master template to your application's root as `CLAUDE.md` when you pass `--starter`.

For example, keep the toolkit and application in separate sibling folders:

```text
projects/
├── claude-code-ai-skills/          Toolkit checkout
│   ├── install.mjs
│   └── templates/
│       └── CLAUDE.md              Reusable source template
└── my-new-app/                    Your application
    ├── CLAUDE.md                  Installed project instructions
    ├── .claude/
    │   ├── skills/                Installed skills
    │   └── rules/                 Only when --rules is selected
    └── docs/                      Only when --docs is selected
```

You do **not** need the toolkit's `templates/` folder inside your application. Customize the installed `CLAUDE.md` and docs for that project; keep the toolkit templates generic. These are independent copies, not automatically synchronized files. Root `CLAUDE.md` is a supported location for Claude Code project instructions. [Claude project memory documentation](https://code.claude.com/docs/en/memory#claudemd-files).

## Quick start

### Prerequisites

- **Claude Code** installed and authenticated to use the skills. Follow the [official Claude Code quickstart](https://code.claude.com/docs/en/quickstart). The installer does not install Claude or sign you in.
- **Node.js 22 or later** to run this repository's installer and validation commands. No `npm install` is needed for the toolkit. Manually copying a skill folder does not require Node.js.
- **Git** if you clone the toolkit. Alternatively, extract a trusted ZIP and use its actual extracted directory name in the commands below.

Your normal Claude Code account/provider access is required to run Claude. The toolkit adds no separate API key, service subscription or account connection.

### Get the toolkit

In a terminal, open the parent folder where you keep development projects, then run:

```bash
git clone https://github.com/ack-solutions/claude-code-ai-skills.git
```

If you already have a checkout, use that checkout instead of cloning over it. **Choose A or B below.** Both examples start from the parent folder containing `claude-code-ai-skills`, not from inside that folder. If your toolkit is elsewhere, use its actual path to `install.mjs`. Keep paths containing spaces in quotes; on Windows use your actual filesystem path in place of a Unix-style example.

### A. New project: skills, instructions and documents

Choose a new folder name. The installer requires the target directory to exist, so create it first:

```bash
mkdir my-new-app
node claude-code-ai-skills/install.mjs ./my-new-app --starter --docs --dry-run
node claude-code-ai-skills/install.mjs ./my-new-app --starter --docs
```

The preview reports what would be copied without creating files. The second installer command copies the 12 skills, root `CLAUDE.md`, project documents and playbook. It does not generate application code or initialize a Git repository.

Start Claude **inside your application**, not inside the toolkit:

```bash
cd my-new-app
claude
```

Sign in if prompted, then use the [first-project prompt](#first-project-prompt) below. If the target folder already contains project instructions or docs, use the existing-project guidance instead of overwriting them.

### B. Existing project: add skills without replacing project documents

Replace `/absolute/path/to/existing-app` with an existing application directory. These commands install skills only:

```bash
node claude-code-ai-skills/install.mjs "/absolute/path/to/existing-app" --dry-run
node claude-code-ai-skills/install.mjs "/absolute/path/to/existing-app"
cd "/absolute/path/to/existing-app"
claude
```

Your existing `CLAUDE.md` and documentation remain unchanged. Existing same-name skills can still conflict; the installer stops before copying rather than merging them automatically. Add `--starter`, `--docs` or framework rules only after reviewing their destinations. See [conflicts and updates](#existing-files-collisions-and-updates).

### Confirm the installation

In the application, check that `.claude/skills/` contains the twelve skill folders. After a full starter installation, also check root `CLAUDE.md` and `docs/README.md`. Start a fresh Claude Code session after installation and type `/` to look for a command such as `/code-quality`. For an existing module, try:

```text
/code-quality Audit this module for duplicated business rules, unclear ownership and unnecessary coupling. Report findings before changing code.
```

Replace "this module" with the actual file or module you want reviewed. Once you have reviewed the installed files, commit the relevant skills, rules, instructions and documents in **your application's** repository to share them with teammates. Do not commit credentials or private local Claude settings.

### Install only one skill

Copy the entire folder, including `references/` if present, from `skills/<name>/` into your application's `.claude/skills/<name>/`. For example, `skills/code-quality/` becomes `.claude/skills/code-quality/`. Compare any existing same-name folder first. Manual copying does not run the installer's conflict checks. A standalone skill does not require installing every sibling mentioned as an alternative workflow.

### Installer options

The installer always includes all 12 skills; optional flags add the following:

| Option | Effect |
|---|---|
| `--starter` | Adds root `CLAUDE.md` if absent, or skips it if identical |
| `--docs` | Adds the project documents and engineering playbook under `docs/` |
| `--rules=name1,name2` | Adds only the named framework rules under `.claude/rules/` |
| `--dry-run` | Validates and previews the selected installation without copying anything |
| `--global` | Installs skills to your personal Claude configuration instead of a project; cannot be combined with a project path, `--starter`, `--docs` or `--rules` |

`--starter` and `--docs` are independent: neither implies the other. A conflicting selected file causes both a preview and an actual install to stop before copying. There is no force-overwrite option. For command help, run `node install.mjs --help` **from the toolkit directory**.

### When not to use this pack

Do not treat it as a guarantee of bug-free software, security certification or a substitute for domain expertise and accountable review. Use a relevant workflow, not all twelve skills for a trivial edit. Installed instructions cannot supply missing product decisions, tool access, runtime evidence or real-user research.

## Project starter documents

Use this one shared repository for reusable guidance; keep each application's code and adopted product decisions in its own application repository. You do not need a new skills repository for every project.

The [new-project setup](#a-new-project-skills-instructions-and-documents) installs the following. `.claude/rules/` is additional and optional; see [framework rules](#optional-framework-rules).

| Installed location | Responsibility |
|---|---|
| `CLAUDE.md` | Concise standing rules, scope and document routing |
| `.claude/skills/` | The twelve focused task workflows |
| `docs/README.md`, `docs/PROJECT_CONTEXT.md` | Document map, actual commands, owners and adopted conventions |
| `docs/REQUIREMENTS.md` | Product-wide rules and cross-feature journeys |
| `docs/DESIGN_SPEC.md` | Shared design foundations, supported states and measurable design acceptance |
| `docs/ARCHITECTURE.md` | System overview, data ownership, interfaces and failure/recovery scenarios |
| `docs/WORKFLOW.md`, `docs/TASKS.md` | Adopted workflow and one authoritative backlog or tracker index |
| `docs/features/_TEMPLATE.md` | Feature behaviour, decisions, acceptance and rollout |
| `docs/engineering/` | Playbook, task/ADR/API/handoff/release templates and pack manifest |

### First-project prompt

After installing the full starter, replace the bracketed text and send this in Claude Code:

> Read CLAUDE.md, docs/README.md and docs/PROJECT_CONTEXT.md. My app idea is [describe the problem, audience and intended platforms]. Inspect what actually exists. Record verified facts and mark unknown stack choices, commands and owners as undecided rather than inventing them. If framework rules are installed, read .claude/rules directly and propose corrections to paths that do not match our folders. Use product-planning to propose the initial requirements, user journeys and scope. Identify the design and architecture decisions I need to make, and propose the first small tasks. Keep proposals distinct from approved requirements. Do not implement application code or deploy anything yet.

Review the proposal and settle decisions that affect the first task. Then, when you are ready to authorize implementation, use a scoped request such as:

> Use feature-delivery to implement [approved task ID or outcome] using the agreed stack and linked acceptance criteria. If the application is empty, scaffold only the foundations this task needs. Run the applicable checks, update the owning documents and report anything not verified. Do not deploy.

`--docs` and `--starter` are independent. Installing documents does not replace root instructions, approve requirements, create agents or configure CI/trackers. The short instructions route to relevant documents on demand; the whole playbook is not automatically imported. Complete only the fields the current work needs.

**Existing project or older ZIP?** Preserve your project-specific documents and follow [migration guidance](playbook/migration.md). Any conflicting selected file stops the entire install before copying. For manual comparison, install the starter into a separate empty directory, then merge intentionally. Omit `--starter` to keep an existing `CLAUDE.md`; omit `--docs` when only skills are wanted. Other selected conflicts still need resolution.

## Skill catalog

Type `/` in Claude Code to inspect available commands. Claude can also select a relevant skill from a normal request. Explicit commands make your choice clear; see the official [Claude Code skills guide](https://code.claude.com/docs/en/skills).

| Skill and command | Responsibility | Typical output |
|---|---|---|
| [`/product-planning`](skills/product-planning/SKILL.md) | Market research, product strategy, requirements and prioritization | Cited research, a scoped brief and acceptance criteria |
| [`/product-design`](skills/product-design/SKILL.md) | UI/UX design, user flows, interaction states and design systems | A flow, screen or component proposal aligned with the product |
| [`/feature-delivery`](skills/feature-delivery/SKILL.md) | Full-stack implementation across affected layers | Working changes, relevant tests and updated documentation |
| [`/product-quality`](skills/product-quality/SKILL.md) | Acceptance, end-to-end journeys, recovery and usability evaluation | Expected-versus-actual results, reproducible defects and coverage gaps |
| [`/design-quality`](skills/design-quality/SKILL.md) | Visual QA, responsiveness, accessibility and localization | Screen/state findings and visual regression evidence |
| [`/code-quality`](skills/code-quality/SKILL.md) | Code organization, reuse, duplication and safe refactoring | Evidence-backed findings or verified, requested refactors |
| [`/systematic-debugging`](skills/systematic-debugging/SKILL.md) | Reproduction, root-cause analysis and regression prevention | A diagnosis or a verified fix, according to the request |
| [`/data-integrity`](skills/data-integrity/SKILL.md) | API contracts, schema, migrations, transactions and concurrency | Invariant analysis and compatibility-safe changes when requested |
| [`/security-audit`](skills/security-audit/SKILL.md) | Authorization, sensitive data, dependencies and abuse paths | Actionable findings with prerequisites, impact and verification |
| [`/performance-review`](skills/performance-review/SKILL.md) | API/database latency, rendering, bundles and capacity | Measurements, bottleneck analysis and scoped optimizations |
| [`/release-engineering`](skills/release-engineering/SKILL.md) | DevOps, CI/CD, observability, deployment and recovery | Delivery configuration or a release/rollback readiness report |
| [`/growth-strategy`](skills/growth-strategy/SKILL.md) | SEO, ASO, launch positioning, analytics and growth experiments | Channel-specific recommendations and measurable experiment plans |

The security skill is named `security-audit` to avoid colliding with Claude Code's bundled [`/security-review` command](https://code.claude.com/docs/en/commands).

## Optional framework rules

Skills describe tasks; path-specific rules describe conventions for matching files. Install only the rules relevant to your project:

| Rule template | Initial file scope | Focus |
|---|---|---|
| [`nestjs-api`](templates/rules/nestjs-api.md) | `apps/api/src` | Domain ownership, DTOs, validation, permissions and persistence |
| [`react-admin`](templates/rules/react-admin.md) | `apps/admin/src`, `libs/react-shared/src` | Shared components, forms, query state and accessible interactions |
| [`flutter-mobile`](templates/rules/flutter-mobile.md) | `apps/mobile` | Widgets, themes, localization, interaction state and platform behaviour |
| [`database-contracts`](templates/rules/database-contracts.md) | Entities, migrations, shared types and data/API docs | Durable invariants, compatibility and authoritative contracts |

If you have chosen React and NestJS, append `--rules=nestjs-api,react-admin,database-contracts` to both installer commands in the new-project setup. If the project is already installed, add just the selected rules with the following commands **from the toolkit directory** (replace the example target path):

```bash
node install.mjs "/absolute/path/to/your-project" --rules=nestjs-api,react-admin,database-contracts --dry-run
node install.mjs "/absolute/path/to/your-project" --rules=nestjs-api,react-admin,database-contracts
```

The installer also checks the skills during this operation: identical files are skipped, and differing installed skills still block the whole installation. Do not add `--starter` again just to add rules to a project whose `CLAUDE.md` you have customized.

Select `flutter-mobile` for a Flutter app. Use only the rules that match your chosen stack. Review their `paths` frontmatter and adapt it to actual folders during an authorized setup task. If the app has not been scaffolded yet, treat those paths as proposed until the folders exist. Existing conflicting instructions are never overwritten.

Read the installed rule files explicitly during setup: a rule with nonmatching paths may never activate, so an instruction inside it cannot reliably repair its own scope. Confirm representative files match the intended rule and unrelated files do not. The installer neither discovers the stack nor rewrites rule paths automatically.

## Make the skills available in all your local projects

For personal use rather than a team-shared project installation, run **from the toolkit directory**:

```bash
node install.mjs --global --dry-run
node install.mjs --global
```

This copies only the skills to `~/.claude/skills/`, or to `CLAUDE_CONFIG_DIR/skills` when that configuration directory is set. Framework rules, `--docs` and project instructions remain project-specific and cannot be combined with `--global`. Choose project or personal installation intentionally: a personal skill with the same name can take precedence over a project's copy. Use project installation for team sharing and reproducibility.

Personal files on your machine are not automatically available in cloud sessions. See the current [Claude Code skill locations and cloud guidance](https://code.claude.com/docs/en/skills).

## Example prompts

```text
/product-planning Define the MVP for my appointment app, including roles, journeys and acceptance criteria.
/product-design Design the appointment selection flow using our existing design system.
/feature-delivery Implement the approved appointment rescheduling feature and verify the affected journeys.
/code-quality Audit the appointments module for repeated rules, coupling and unclear ownership.
/code-quality Refactor the duplicated rescheduling policy and verify compatibility.
/product-quality Test rescheduling, including expired sessions, cancellation and retries.
/design-quality Check that flow on small screens, dark mode and our supported languages.
/systematic-debugging Fix the duplicate appointment created after a network retry.
/data-integrity Review the appointment uniqueness migration and concurrency behaviour.
/security-audit Review account ownership checks on appointment endpoints.
/performance-review Measure and investigate the slow appointment search.
/release-engineering Prepare the staging release and rollback procedure.
/growth-strategy Plan an app-store launch experiment using our positioning and available analytics.
```

Use the relevant skills for the task; this is not a mandatory twelve-step sequence. Tests and documentation remain part of implementation. Product/design quality provide dedicated verification passes when requested or appropriate to the work.

For an empty application, begin with the [first-project prompt](#first-project-prompt) rather than asking for a review of code that does not exist yet.

## Existing files, collisions and updates

The installer validates the pack, checks all destination conflicts before copying, and skips identical files. It never force-overwrites existing skills, rules, project documents or `CLAUDE.md`. A same-name skill with extra files is treated as a conflict, so instructions from two packs do not silently mix. Unrelated skills, documents and settings remain intact.

If a conflict occurs, compare the source and installed version and merge intentionally. If a copy is interrupted by an I/O error, rerun the command; identical files are skipped. Symlink destinations are rejected to avoid copying into an unexpected location.

Keep the kit as your source and reinstall into new projects as needed. After changing a skill, review the differences before updating an existing installation. Installed copies are independent, not auto-updating links.

No `allowed-tools` grants, hooks, model overrides, automatic delegation, external dependencies, analytics or account connections are added. A workflow request does not grant permissions that Claude Code or your project does not already have.

## Troubleshooting

| Symptom | What to check |
|---|---|
| `node` or `claude` is not found | Install the corresponding prerequisite and open a new terminal. Installing this pack does not install those tools. |
| Cannot find `install.mjs` | Check your working directory: use `node claude-code-ai-skills/install.mjs ...` from its parent, or `node install.mjs ...` from inside the toolkit. ZIP extraction may use a different folder name. |
| Target directory does not exist / `ENOENT` | Create the application directory first or correct the path. Keep paths with spaces in quotes. |
| `Nothing copied. Existing content conflicts` | No files were copied by that attempt. Compare and merge deliberately; omit flags for files you do not want installed. A same-name skill conflict still needs resolution. |
| `CLAUDE.md` or docs are missing | A default install adds skills only. Root instructions require `--starter`; project docs require `--docs`. Preview any added options first. |
| A skill command is missing or runs an unexpected copy | Open Claude in the target application, confirm `.claude/skills/<name>/SKILL.md` exists, and start a fresh session. Check same-name personal skills and your environment's customization policy using the [official troubleshooting guidance](https://code.claude.com/docs/en/skills#troubleshooting). |
| A framework rule does not apply | Inspect its `paths` against real source files. The installer does not detect folders or rewrite patterns. |
| Tests or visual checks cannot run | Report the missing prerequisite and mark the affected checks BLOCKED or NOT RUN. Installing skills does not supply a browser, device, database or test account. |

For older documentation ZIPs or a customized installation, follow [migration guidance](playbook/migration.md). Do not delete your existing instructions or weaken permissions just to make an install or check succeed.

## Validate and evaluate

From the pack directory:

```bash
node validate.mjs
node --test test-install.mjs test-package.mjs
```

Validation checks the twelve names/frontmatter, complete skill references, portable content, rule scoping and document links in the installed layout. Installer tests exercise fresh/collision/dry-run/idempotent/relocated/global-in-isolation cases, including document conflicts and symlinks. Archive tests require Git and `unzip`; they check complete committed contents, checksums, independent installation and refusal to package dirty work or overwrite artifacts. These checks establish package/install behaviour, not how well a model performs each workflow.

Use [EVALUATION.md](EVALUATION.md) for realistic Claude trial prompts and expected observable outcomes. Actual quality depends on project context, available tools and verification. The pack does not guarantee bug-free code, user satisfaction or automatic compliance.

The [small synthetic cases](evaluation/smoke-cases.md) support paired routing and behaviour trials without building a full application. These model trials are separate from the automated package checks; see their [execution status](evaluation/status.md) before assuming they have run.

## Engineering playbook: from idea to release

The [AI-assisted product engineering playbook](playbook/README.md) connects the skills through a researched, reusable working model: feature/task management, professional role handoffs, coding and architecture decisions, HTTP/event API contracts, design/product QA and production-readiness evidence.

It includes a staged adoption plan, primary-source references and templates for project context, features, tasks, ADRs, API reviews, handoffs, releases and optional shared agent instructions. Published standards are distinguished from recommended team conventions.

The playbook is a proposal to adapt and adopt, not proof of application quality. The installer copies it only with `--docs`; it does not replace conflicting project instructions or configure application CI, trackers or agent teams.

## Versioned ZIP packages

Use a reviewed commit or an archive built from it, rather than mixing files from older ZIPs. From a clean, committed checkout:

```bash
node package.mjs "/existing/output/directory"
```

This creates `claude-code-ai-skills-<version>-<commit>.zip` and its `.zip.sha256` checksum. The ZIP contains the skills, documents, playbook, installer, tests and license from that same commit. The command rejects uncommitted/untracked work and never overwrites an existing archive. It does not create a tag, upload files or publish a GitHub release. Verify the checksum and run validation after extracting; archive consumers do not need Git just to install the pack.

## Frequently asked questions

### Do I need React, NestJS or Flutter?

No. The twelve skills inspect the actual project and follow its stack. The four framework rules are optional starting points, not required dependencies.

### Can I install just one skill without the installer?

Yes. Follow [single-skill installation](#install-only-one-skill). The supplied installer installs the full catalog and performs conflict checks; manual copying does not.

### Do I need both CLAUDE.md and AGENTS.md?

Not for this Claude-only starter. `--starter` installs `templates/CLAUDE.md` at your application root. The separate [shared-agent template](playbook/templates/AGENTS.template.md) and [Claude adapter](playbook/templates/CLAUDE.template.md) are optional alternatives for a reviewed multi-tool setup, not additional files you must activate. The adapter imports `AGENTS.md` and should not be used without that file. Do not replace the installed working agreement with it blindly.

### Does this work in ordinary Claude chat?

These installation instructions target Claude Code, including its terminal and desktop Code workflows. They do not install skills into an ordinary Claude chat by uploading the repository ZIP.

### Are the skills automatically tested for model quality?

No. The automated checks validate package structure and installer behaviour. [EVALUATION.md](EVALUATION.md) defines realistic model trials; those trials must be executed and reviewed separately. Automated accessibility checks also do not establish full accessibility, and AI walkthroughs are not real-user research.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for focused changes, validation commands and evidence expectations. Please use synthetic examples and do not submit private application code, credentials or customer data.

## Repository structure and sources

- `skills/`: twelve self-contained skill folders; each can be copied individually with its references.
- `templates/`: optional starter instructions, framework rules and product-level document templates. Project-template links target their installed locations under `docs/`.
- `playbook/`: engineering operating model, research sources and optional project-document templates.
- `evaluation/`: small synthetic model-trial fixtures, reviewer criteria and honest execution status; not installed into application projects.
- `manifest.json`: pack version, shipped skill/rule names and project-document source/destination mapping.
- `install.mjs`, `validate.mjs`, `package.mjs`, `test-*.mjs`: dependency-free Node tooling; packaging uses Git, and archive tests also use `unzip`.
- `.github/workflows/validate.yml`: package validation, installer and archive tests on Node.js 22 and 24.

The workflows are written for this pack. Research references that informed the organization include [Claude skills](https://code.claude.com/docs/en/skills), [path-specific rules](https://code.claude.com/docs/en/memory#path-specific-rules), [Vercel skills](https://github.com/vercel-labs/agent-skills), [Superpowers](https://github.com/obra/superpowers), [Trail of Bits](https://github.com/trailofbits/skills), [Supabase skills](https://github.com/supabase/agent-skills) and [Marketing Skills](https://github.com/coreyhaines31/marketingskills). Those packages are not installed as dependencies. Check current official documentation when a task depends on changing framework behaviour, platform policies or tool features.

This is an independent collection for Claude Code, not an official Anthropic product.

## License

[MIT](LICENSE). You may use, modify and redistribute this pack under the license terms. Upstream projects linked as research references retain their own licenses and are not bundled dependencies.
