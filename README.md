# Claude Code AI Skills

**12 reusable AI skills, project starter documents and an engineering playbook for Claude Code.**

[![Validate skills](https://github.com/ack-solutions/claude-code-ai-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/ack-solutions/claude-code-ai-skills/actions/workflows/validate.yml)

Turn product ideas into scoped requirements, design clear user journeys, implement features, and review code, product quality, accessibility, security and performance. This collection also covers DevOps, release readiness, market research, search engine optimization (SEO) and app store optimization (ASO).

The skills discover your project's actual stack and conventions. Optional **React, NestJS, Flutter and database rule templates** add file-specific engineering guidance without forcing a framework or architecture.

By [ACK Solutions](https://github.com/ack-solutions) · Version 1.1.0 · [MIT license](LICENSE) · Dependency-free installer

[Quick start](#quick-start) · [Project starter](#project-starter-documents) · [Skill catalog](#skill-catalog) · [Engineering playbook](playbook/README.md) · [Framework rules](#optional-framework-rules) · [Validation](#validate-and-evaluate) · [Contributing](CONTRIBUTING.md)

## Why use this skill pack?

- **Focused workflows:** planning, implementation and specialist reviews have distinct responsibilities. Use the skill relevant to your task, not all twelve at once.
- **Evidence over claims:** audits need concrete findings; runtime testing needs actual execution; performance improvements need measurements.
- **Reusable across projects:** no application-specific business rules, hardcoded local paths or account credentials are included.
- **Controlled changes:** review requests produce findings. Fix and implementation requests authorize the corresponding scoped changes.
- **Safe installation:** previews, conflict detection and repeatable installs protect existing project instructions and unrelated skills.

Skills are reusable instructions, not autonomous employees or a guarantee of bug-free software. Their effectiveness depends on project context, available tools, model behaviour and verification.

## Quick start

Use **Claude Code** and Node.js 22 or later for the installer. Clone the repository, then preview and install into your project:

```bash
git clone https://github.com/ack-solutions/claude-code-ai-skills.git
cd claude-code-ai-skills
node install.mjs "/absolute/path/to/your-project" --dry-run
node install.mjs "/absolute/path/to/your-project"
```

Replace the example path with an existing project directory. The first command previews the changes; the second installs all twelve skills into that project's `.claude/skills/`. No npm install, additional API key or paid service is required by the pack. Your normal Claude Code access is still required.

Restart Claude Code in the target project, or run `/reload-skills` in an existing session. Try:

```text
/code-quality Audit this module for duplicated business rules, unclear ownership and unnecessary coupling. Report findings before changing code.
```

Commit the installed skill folders in your application repository to share them with teammates. The skills themselves are Markdown and require no Node runtime; only the installer and package tests use Node.

## Project starter documents

Use this one shared repository for reusable guidance; keep each application's code and adopted product decisions in its own application repository. You do not need a new skills repository for every project.

For a new project, install the complete starter explicitly:

```bash
node install.mjs "/absolute/path/to/your-project" --starter --docs --dry-run
node install.mjs "/absolute/path/to/your-project" --starter --docs
```

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

Start Claude Code in the target project and ask:

> Read CLAUDE.md, docs/README.md and docs/PROJECT_CONTEXT.md. Inspect the actual project and fill in verified commands and document locations. Use product-planning to propose the requirements for my idea, identifying decisions I need to make. Keep proposed choices distinct from approved requirements. Do not implement application code or deploy anything yet.

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

For a new project that also needs a starter `CLAUDE.md`:

```bash
node install.mjs "/absolute/path/to/your-project" --starter --rules=nestjs-api,react-admin,database-contracts
```

Add `flutter-mobile` for a Flutter app. Review the installed rules' `paths` frontmatter and retarget it to your actual folders. The starter is a working agreement, not a product specification. Ask Claude to add verified project commands and document locations after inspecting the project. Existing conflicting instructions are never overwritten.

## Make the skills available in all your local projects

```bash
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

For a new project, a useful initial prompt is:

> Inspect this project, discover its actual stack and commands, and adapt the installed framework-rule paths. Keep existing conventions. Use product-planning to turn my idea into a scoped brief, identifying the few decisions you need from me before implementation.

## Existing files, collisions and updates

The installer validates the pack, checks all destination conflicts before copying, and skips identical files. It never force-overwrites existing skills, rules, project documents or `CLAUDE.md`. A same-name skill with extra files is treated as a conflict, so instructions from two packs do not silently mix. Unrelated skills, documents and settings remain intact.

If a conflict occurs, compare the source and installed version and merge intentionally. If a copy is interrupted by an I/O error, rerun the command; identical files are skipped. Symlink destinations are rejected to avoid copying into an unexpected location.

Keep the kit as your source and reinstall into new projects as needed. After changing a skill, review the differences before updating an existing installation. Installed copies are independent, not auto-updating links.

No `allowed-tools` grants, hooks, model overrides, automatic delegation, external dependencies, analytics or account connections are added. A workflow request does not grant permissions that Claude Code or your project does not already have.

## Validate and evaluate

From the pack directory:

```bash
node validate.mjs
node --test test-install.mjs test-package.mjs
```

Validation checks the twelve names/frontmatter, complete skill references, portable content, rule scoping and document links in the installed layout. Installer tests exercise fresh/collision/dry-run/idempotent/relocated/global-in-isolation cases, including document conflicts and symlinks. Archive tests require Git and `unzip`; they check complete committed contents, checksums, independent installation and refusal to package dirty work or overwrite artifacts. These checks establish package/install behaviour, not how well a model performs each workflow.

Use [EVALUATION.md](EVALUATION.md) for realistic Claude trial prompts and expected observable outcomes. Actual quality depends on project context, available tools and verification. The pack does not guarantee bug-free code, user satisfaction or automatic compliance.

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

Yes. Copy its entire folder from `skills/` into your project's `.claude/skills/`, including any `references/` directory. Compare existing same-name content first. The supplied installer installs the full catalog and performs conflict checks for you.

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
- `manifest.json`: pack version, shipped skill/rule names and project-document source/destination mapping.
- `install.mjs`, `validate.mjs`, `package.mjs`, `test-*.mjs`: dependency-free Node tooling; packaging uses Git, and archive tests also use `unzip`.
- `.github/workflows/validate.yml`: package validation, installer and archive tests on Node.js 22 and 24.

The workflows are written for this pack. Research references that informed the organization include [Claude skills](https://code.claude.com/docs/en/skills), [path-specific rules](https://code.claude.com/docs/en/memory#path-specific-rules), [Vercel skills](https://github.com/vercel-labs/agent-skills), [Superpowers](https://github.com/obra/superpowers), [Trail of Bits](https://github.com/trailofbits/skills), [Supabase skills](https://github.com/supabase/agent-skills) and [Marketing Skills](https://github.com/coreyhaines31/marketingskills). Those packages are not installed as dependencies. Check current official documentation when a task depends on changing framework behaviour, platform policies or tool features.

This is an independent collection for Claude Code, not an official Anthropic product.

## License

[MIT](LICENSE). You may use, modify and redistribute this pack under the license terms. Upstream projects linked as research references retain their own licenses and are not bundled dependencies.
