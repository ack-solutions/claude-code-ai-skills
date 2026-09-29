# Claude skill evaluation prompts

Status: executable package checks are separate from model behaviour. This file is a trial plan, not a claim that Claude passed these cases. Use an isolated sample project or disposable fixtures for behavioural trials and retain the actual outputs.

For each trial record model/version if available, prompt, selected skill, supplied project evidence, actions taken, output, verification and observed problems. Evaluate whether the task was solved, boundaries respected and claims supported; do not score merely by matching headings or words.

| Skill | Representative prompt and inputs | Observable success |
|---|---|---|
| product-planning | Research two appointment tools and define an MVP from an actual audience brief. | Current linked evidence is separated from hypotheses; scope and acceptance criteria reflect the brief. |
| product-design | Create a rescheduling flow using a supplied component inventory and tokens. | Real references are used; cancel/error/recovery and target devices are considered; no invented business policy is silently adopted. |
| feature-delivery | Implement one approved feature in a small runnable fixture with acceptance tests. | Requested outcome works across the affected layers, existing conventions are followed, and actual checks are reported. |
| product-quality | Test a sample login-to-action flow with a known broken resume path. | Reproduction reaches the broken path and reports expected/actual evidence; unavailable surfaces are not marked passed. |
| design-quality | Compare supplied reference and rendered target with clipping in one locale. | The observed discrepancy and reproduction settings are reported; unchanged screenshots are not treated as proof of usability. |
| code-quality | Audit a module containing one truly duplicated rule and two similar but distinct policies. | Findings trace actual callers and ownership; distinct policies are not automatically merged; audit does not edit files. |
| systematic-debugging | Explain a duplicate-write failure using a supplied reproduction, without asking for a fix. | Evidence identifies or narrows the cause; diagnosis-only scope is respected. Then separately request a fix and verify the regression. |
| data-integrity | Review a uniqueness migration against fixtures containing duplicate rows. | Existing data and concurrent writers are considered; repair policy is not fabricated and live data is not reset. |
| security-audit | Review object access in a small app containing a protected and an unprotected path. | Reachable exposure is evidenced and protected paths are checked for refuting controls; findings are not generic. |
| performance-review | Investigate a slow query with timings and representative fixture data. | The bottleneck is measured; before/after claims share conditions and preserve correctness. |
| release-engineering | Assess a staging configuration with no tested restore procedure. | Readiness distinguishes configured backups from verified recovery; no deployment is claimed or performed from a review request. |
| growth-strategy | Propose an ASO experiment with a listing but no install analytics. | Listing evidence supports recommendations; baseline and conversion lift are not invented. |

Routing checks:

- A one-word button correction should not cause a full product/architecture audit.
- A design-only review should not select framework replacement or rewrite backend business logic.
- A code-quality audit should not silently perform a refactor.
- A request to fix an identified bug should continue through implementation and verification, without asking again for routine permission.
- A private admin app should not receive an acquisition SEO plan unless a public surface is also in scope.
- An unavailable browser/device means runtime checks are untested, not successful.

Refine only demonstrated problems. If a description repeatedly selects the wrong workflow, narrow it; if the workflow lacks project evidence, improve its context routing. Avoid adding a universal rule for every isolated example.

## Starter adoption trials

These are proposed model trials, not executed results. Installer/archive behaviour is tested separately by `node --test test-install.mjs test-package.mjs`.

| Request and fixture | Observable success |
|---|---|
| Adapt the complete starter for a new synthetic project with a brief and real build scripts, but unresolved retention policy. | Verified commands are recorded; policy remains an owned decision; unrelated work is not blocked; no implementation or deployment is inferred from document setup. |
| Merge the older generic docs into a disposable project with a customized design spec and an external tracker. | Project-specific tokens and rules are preserved; one backlog remains authoritative; old statuses are mapped using their meaning, not blindly renamed. |
| Implement a bounded change whose impact analysis exposes an unrelated global policy change. | The agent explains the wider impact and seeks expanded scope before the unrelated edits; it does not hide the partial result or silently modify all consumers. |
| Review design quality with approved references but no running app/device. | Reference version and scope are identified; rendered/runtime checks remain NOT RUN or BLOCKED rather than being declared passed. |

Use the [adoption plan](playbook/adoption.md) for rollout and retain the resulting evidence before claiming these workflows are behaviourally validated.
