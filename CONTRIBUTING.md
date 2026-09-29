# Contributing to Claude Code AI Skills

Prefer a focused improvement backed by a concrete use case over a larger prompt or an additional overlapping skill.

## Propose a change

Describe the request the skill should handle, what happened, and what observable result would be better. For installer problems, include the operating system, Node.js version, exact command with private paths removed, and sanitized error output.

Do not include access tokens, private project code, production logs or customer data. Use a small synthetic reproduction. For a suspected security issue, ask the maintainers for a private reporting channel before posting sensitive details publicly.

## Work locally

No package installation is required. Use Node.js 22 or later:

```bash
node validate.mjs
node --test test-install.mjs test-package.mjs
```

Installer tests create isolated temporary directories. They must not write to a contributor's real Claude configuration, reset application databases or contact external services. Add behaviour-focused tests when changing the installer.

Archive tests also use Git and `unzip` in isolated fixtures. Documentation links are checked against the installed layout, not only the source tree. Project-document templates intentionally contain fields awaiting real decisions; preserve their distinction from approved requirements. Keep lifecycle definitions in `playbook/delivery.md`, and link them from templates instead of maintaining competing state lists.

After reviewing and committing a version change, run `node package.mjs /existing/output/directory` to produce a version-and-commit-named ZIP and SHA-256 checksum. The command rejects dirty/untracked work and existing artifacts. It packages committed files only; it does not tag, upload or publish a release. Inspect the archive and test a fresh install before distribution.

## Improve a skill

- Keep each skill's YAML `name` identical to its folder and manifest entry.
- Make the description explain when the skill applies, with boundaries that prevent likely misrouting.
- Preserve the difference between review, diagnosis and authorized implementation.
- Keep project-specific business rules, private paths and tool credentials out of the instructions.
- Put substantial conditional detail in skill-local references and link it from the workflow that needs it.
- Do not add automatic delegation, permission grants, external uploads or deployment actions to ordinary review requests.
- Preserve intended behaviour when refactoring; do not merge similar-looking rules that have different owners or meanings.

Use [EVALUATION.md](EVALUATION.md) for model trials. Include the prompt, supplied artifacts, selected workflow, observed output and limitations. Clearly label tests that were not run. A valid Markdown file or passing installer test does not prove that a model follows a skill correctly.

## Submit a pull request

Explain the problem, the smallest useful change, the checks performed and any remaining limitations. Update affected usage examples and reference links. Do not change unrelated skills just to make their wording uniform.
