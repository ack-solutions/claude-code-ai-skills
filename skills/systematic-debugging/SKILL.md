---
name: systematic-debugging
description: Investigate bugs, regressions, flaky tests, and unexpected behaviour using reproduction and root-cause evidence. Apply and verify a fix when requested; diagnosis-only requests return findings.
---

# Systematic debugging

Find the cause of the reported failure and verify the requested correction. Use a process proportionate to the defect, not a mandatory ritual for every small edit.

## Establish the failure

Read relevant project instructions and expected behaviour. Capture reproduction steps, inputs, environment, expected/actual result and useful error evidence. Inspect recent related changes if history exists. If the failure cannot be reproduced, distinguish observations from hypotheses and pursue the narrowest safe diagnostic step.

## Trace the cause

- Follow the failing value or action across its actual boundaries: UI state, request, authorization, domain logic, persistence and asynchronous work as applicable.
- Compare with a working case and inspect assumptions at the first divergence.
- Form a specific hypothesis, test one meaningful variable, and use the result to narrow the next step. Avoid accumulating speculative patches.
- Add scoped diagnostics only when necessary. Redact credentials and personal data; do not dump the environment, tokens, request bodies or database rows indiscriminately.
- Search for other consumers of the faulty shared rule. Report broader exposure without assuming permission for unrelated rewrites.

When attempts do not explain the observations, revisit the hypothesis, reproduction or boundary assumptions. State what evidence is missing; never claim certainty from a plausible-looking patch.

## Correct and verify within scope

A request to explain or diagnose ends with the evidenced cause and proposed correction. A request to fix includes implementation and verification without an extra routine approval step.

Use the smallest coherent fix at the correct owner. Preserve relevant compatibility and avoid unrelated cleanup. Add a meaningful regression test where practical: it should fail for the original defect and pass with the correction, using a disposable environment. For timing/retry issues, exercise the relevant ordering or concurrent requests rather than only a sequential happy path.

Run the reproduction again and relevant checks. For UI failures, inspect the actual interaction when tools permit. Distinguish passed, failed and untested checks. A test that never reaches the faulty path is not verification.

## Deliver

Explain the failure, root cause, affected scope, correction if made, and evidence. Link relevant files/tests and identify unresolved conditions. Remove temporary diagnostics introduced during the investigation.
