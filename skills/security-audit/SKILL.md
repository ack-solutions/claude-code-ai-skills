---
name: security-audit
description: Review application changes or flows for security and privacy risks involving authentication, authorization, sensitive data, uploads, dependencies, or abuse. Use for requested security audits and sensitive feature reviews.
---

# Application security audit

Produce evidence-backed, application-specific findings. Follow the requested review/remediation scope; a review alone does not authorize changes to accounts, credentials, production or external systems.

## Bound the review

Identify the affected assets, actors, entry points, trust boundaries and deployment assumptions from project instructions, requirements and code. Read the actual authentication/permission implementation and installed dependency versions. Use primary advisories and official documentation for current vulnerabilities or uncertain platform behaviour.

## Follow plausible abuse paths

- Authentication/session lifecycle: token verification, audiences, expiry, refresh/revocation, recovery, account linking and enumeration where relevant.
- Authorization: enforce operation, object ownership, tenant/account boundaries and protected fields on the trusted server. Inspect alternate routes and background paths, not only UI visibility.
- Inputs and outputs: injection, unsafe rendering, redirects, deserialization and unbounded resource consumption. Validate at the appropriate trust boundary.
- Files/media: content checks, names/paths, access controls, signed-link exposure and processing limits.
- Secrets/personal data: client bundles, logs, errors, analytics, exports, retention and deletion across derived stores. Use sanitized evidence.
- Abuse: duplicate/replayed requests, expensive endpoints, messaging/contact leakage and moderation bypass where the product exposes them.
- Dependencies/configuration: known applicable advisories, unsafe defaults, excessive permissions and environment differences. Verify reachability and prerequisites before declaring a package advisory exploitable here.

Map a finding to a concrete reachable path and expected protection. Check for controls that refute it and related occurrences. Distinguish confirmed findings, plausible risks needing validation and untested assumptions. Avoid generic checklist findings with no project evidence.

## Verify safely and remediate when asked

Use authorized local/staging accounts and synthetic data. Build minimal tests for the access or validation invariant where useful. Avoid destructive probes or exporting sensitive records. Use remediation requests to fix the correct boundary and retest allowed as well as denied behaviour.

Privacy/legal implications depend on jurisdiction and facts. Identify engineering evidence and open compliance questions using current authoritative sources; do not certify legal compliance from a code review.

## Deliver

For each finding give severity with rationale, location, prerequisites, impact, evidence, correction and test. Include coverage and limitations. If no actionable issue is found, state the bounded scope checked rather than asserting that the whole application is secure.
