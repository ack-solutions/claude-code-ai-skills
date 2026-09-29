# Design quality, verification and production readiness

Quality is a set of observable properties, not a single “premium” score. Agree supported audiences, environments, critical journeys and measurable operational targets. Select checks according to the change's risk; record evidence and limitations.

## How a professional designer works

1. Understand the audience, task, context and constraints. Separate direct observations, reliable secondary research and hypotheses. Do not invent interview participants or findings. [GOV.UK's research guidance](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) starts with understanding people and their needs.
2. Define the information structure and journey before polishing individual screens. Identify entry/exit points, decisions, cancellations and recovery.
3. Explore enough alternatives to resolve the meaningful uncertainty. Use the established components, tokens and content style; justify a new shared pattern when needed.
4. Specify states, content, responsive behaviour, keyboard/focus interaction, assistive-technology meaning, localization and motion preferences relevant to the target platforms.
5. Test the interaction using prototypes and, where available, actual users. Record what was observed and revise. A visual preference or AI walkthrough is not user research.
6. Hand off a versioned design reference, state inventory, interaction rules, asset requirements, acceptance criteria and unresolved questions. Review the implemented journey with the developer.

Product and design acceptance are related but different: a beautiful screen may fail its task; a functioning journey may still be inaccessible or misleading.

## Required design evidence for UI changes

Use a risk-based screen/state matrix rather than claiming every combination was checked:

- Reference version and actual implementation/build.
- Loading, empty, populated, validation, error and success states that apply.
- Small and large supported viewports, text expansion and representative locales/themes.
- Focus, keyboard navigation, screen-reader labels/announcements, contrast and reduced motion where applicable.
- Network failure, slow responses, repeated input and clear recovery.
- Deliberately approved visual-baseline changes, not blindly accepted screenshot updates.

For web projects, propose [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/) as an accessibility target and verify the full applicable success criteria and conformance scope before making a claim. This is not a claim that a few checks establish compliance. For native apps, additionally use platform accessibility APIs and representative assistive-technology/device testing; a web checklist alone is insufficient.

## Risk-based verification

| Change | Minimum evidence to select and apply |
|---|---|
| Documentation or isolated copy | Accuracy, links and relevant rendering; no artificial full application test requirement |
| Internal behaviour-preserving refactor | Affected callers, meaningful regression tests, lint/types/build as applicable |
| User-facing feature | Acceptance and integration evidence, relevant UI states, permissions and failure/recovery |
| API/schema/shared contract | Producer/consumer compatibility, runtime validation, relevant migrations and concurrency |
| Authentication, sensitive data, money, deletion or other high-impact operation | Threat/invariant analysis, negative tests, specialist review and explicit recovery/risk decisions |
| Production release | Accepted build plus environment, rollout, monitoring and recovery readiness |

The table defines a recommended selection process, not a fixed toolchain. For example, a frontend mock test cannot prove database uniqueness and a unit test cannot prove a screen renders correctly on a device.

Use unit tests for rules, integration tests for real boundaries, contract tests for important producer-consumer expectations, and a focused set of end-to-end tests for critical journeys. Include exploratory testing for unexpected combinations. Prefer stable synthetic fixtures; inspect reset/setup commands before using any database.

## Review and CI plan

Proposed pull-request gates, enabled where relevant in the target application:

- Formatting/lint, type checks, focused tests and build.
- Schema validity and compatibility checks; generated-client drift checks where code generation is adopted.
- Secret detection, dependency review/scanning and applicable security tests.
- Migration checks against empty and representative existing data when schema changes occur.
- UI regression/accessibility checks for affected screens, supplemented by manual evidence.
- A review of requirements, change scope, compatibility, test adequacy and rollout impact.

Use a [protected branch or ruleset](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) to enforce the agreed checks and approvals. Do not silently bypass failures, weaken assertions, grant workflow permissions or enable external actions merely to make CI green. A different check set may apply to a documentation-only change.

The skill repository's existing CI validates its package and installer. It does **not** implement these application gates. Configuring them is a later adoption task, requiring the real stack and authorization.

Security requirements should be selected and traced to versioned [OWASP ASVS](https://owasp.org/projects/asvs) controls. [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) provides secure-development lifecycle guidance, including preparation, protection, secure production and vulnerability response. Neither an automated scan nor an AI review establishes comprehensive security certification.

## Evidence format and exceptions

For each applicable gate, record the requirement/risk, build or commit, environment/fixture, command or procedure, PASS/FAIL/BLOCKED/NOT RUN, artifact and verifier. A screenshot supports visual findings; a trace supports a particular runtime execution; neither proves all paths work.

Block acceptance for unmet agreed criteria, exploitable high-impact vulnerabilities, data-corruption risks or unknown required checks. Where the project's policy allows an exception, record its accountable approver, impact, mitigation, expiry and remediation task. An agent cannot grant itself an exception. Mandatory external obligations cannot be waived by this workflow.

## Release readiness beyond a green build

Use [the release evidence record](templates/release.md) and verify:

1. The exact deployable artifact, configuration, compatibility window and completed relevant reviews are known.
2. Environments and secrets are isolated; production debug/dev providers and unsafe test fixtures cannot be enabled accidentally.
3. Migration/backfill order, feature activation and old/new consumer compatibility are explicit.
4. Safe rollout and rollback/forward recovery have owners, triggers and executable steps. A feature flag does not reverse a destructive migration or external side effect.
5. Health checks and critical-journey smoke tests exercise the actual deployment, not only a mocked build.
6. Dashboards, actionable alerts, escalation contact and incident runbook exist for the agreed risks.
7. Backup recovery is demonstrated where needed, with an agreed recovery time objective (time to restore) and recovery point objective (acceptable data-loss window). “Backups configured” is not “restore tested.”
8. A human with release authority accepts remaining risks and the rollout is explicitly authorized.

Define service-level indicators and objectives from user-visible behaviour, with a measurement window, workload and owner. Use error-budget and incident evidence to guide reliability work, following [Google SRE's SLO guidance](https://sre.google/workbook/implementing-slos/); do not declare an arbitrary uptime target or interpret it as a contractual SLA.

After release, inspect crashes/errors, latency, failed jobs and the critical product outcome. Record incidents and corrective actions without blame. Feed failures and usability evidence back into feature and design decisions.

“Production-ready” means the agreed requirements and operational gates have evidence for the named release. It never means no future bugs, outages or security findings are possible.
