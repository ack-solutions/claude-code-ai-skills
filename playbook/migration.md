# Consolidating and updating a project starter

Use the existing `ack-solutions/claude-code-ai-skills` repository as the shared upstream. Application repositories own their adopted copies and product-specific decisions. A separate skills repository per app would create competing upstreams; a genuinely different product still gets its own application repository.

## Older documentation pack -> consolidated starter

Preserve the original files and their useful project-specific content. Preview the installer in the real project, then install into a disposable empty directory to compare when conflicts exist. No force-overwrite or automatic semantic merge is provided.

| Older file / rule | Consolidated treatment |
|---|---|
| Root `CLAUDE.md` | Merge the concise working agreement and routing; move detailed shared process to the playbook instead of loading it on every request |
| `docs/REQUIREMENTS.md` | Keep product-wide rules, cross-feature journeys and feature index; add owners and evidence where missing |
| `docs/DESIGN_SPEC.md` | Keep tokens, reusable patterns and responsive/localization guidance; add approved revisions, measurable targets and actual QA evidence |
| `docs/ARCHITECTURE.md` | Keep the full-system overview; add trust/data ownership, runtime failure paths and operational targets; ADRs supplement rather than replace it |
| `docs/WORKFLOW.md` | Record adoption and local exceptions; link the single lifecycle in delivery |
| `docs/TASKS.md` | Use as authoritative backlog or tracker index, never a competing status copy |
| Feature template | Retain relevant detailed behaviour; keep decision history and distinguish readiness from implementation, acceptance and release |
| Global changes regardless of task size | Always assess global impact; obtain scope expansion before edits outside the authorized task |
| Transactions for all multi-step work | Use local transactions within their actual boundary; model distributed intermediate states, idempotency and recovery separately |

## Status migration

The definitions and transition conditions are authoritative in [delivery](delivery.md). This table is a migration aid, not another lifecycle.

| Old label | Mapping / review needed |
|---|---|
| BACKLOG | BACKLOG |
| SPEC | BACKLOG for an unresolved implementation task; active specification work can be its own IN_PROGRESS task |
| READY | READY after checking its actual readiness criteria |
| DEV | IN_PROGRESS |
| QA | IN_REVIEW only when implementation/author checks are complete; ongoing QA execution can be its own IN_PROGRESS task |
| BLOCKED | BLOCKED with a named dependency, owner and next action |
| DONE | Retain only if the adopted completion conditions are met; do not infer deployment |
| PARTIAL / TODO | Progress notes or remaining work, not canonical statuses; select the real state from the evidence |
| DISCOVERY / REQUIREMENT / IMPACT ANALYSIS / TEST / DOC REVIEW | Activities or bounded tasks; not mandatory additional status columns |

For old feature labels, DRAFT normally maps to PROPOSED; old DONE needs evidence review before mapping to ACCEPTED or RELEASED. Preserve identifiers, decisions and history. Do not bulk relabel records without inspecting what each status meant.

## Safe installation and updates

1. Choose a reviewed upstream version/commit and preserve the project's current baseline.
2. Run the installer with `--dry-run` and only the options needed. `--docs` is project-only; global installation stays skills-only.
3. If any selected file differs, the installer stops before copying anything. Existing `CLAUDE.md` commonly conflicts with `--starter`; omit that flag to install skills only, or stage a full starter in an empty disposable directory for manual comparison. Other selected conflicts still need resolution.
4. Merge into the authoritative documents; keep application rules, real command paths and accepted exceptions. Do not replace them with blank starter fields. Update references when using a custom layout.
5. Validate links, instruction discovery, the status mapping and a bounded representative task. Record actual checks and remaining gaps. An installer test is not a model-quality or application test.
6. Commit the reviewed application changes through its normal process. Treat `docs/engineering/pack-manifest.json` as installation provenance, not proof that locally modified files still match upstream; record the reviewed upstream commit and local deviations in project context.

Do not periodically reinstall `--docs` as a way to reset a configured project. Adapted files are intentionally different and should cause conflicts. Review future upstream changes as ordinary changes with an owner and evidence.

## Versioned archives

Use an archive built from a clean committed revision of the shared repository, not an old manually assembled ZIP. The repository packaging command records the pack version and commit and produces a SHA-256 checksum alongside the ZIP. It does not create a GitHub release, publish a tag or upload anything.

Do not overwrite historical ZIPs to make their contents appear current. Name new archives by version and revision; users should be able to tell which documents, skills and installer shipped together.
