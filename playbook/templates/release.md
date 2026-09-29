# Release evidence: {{release identifier}}

Status: PREPARING / READY_FOR_APPROVAL / RELEASED / ROLLED_BACK
Accountable release owner: {{name}}
Artifact / commit / configuration revision: {{identifiers}}
Target environment and intended audience: {{scope}}
Included features/tasks: {{references}}

## Gates and evidence

| Gate | Actual result | Build/environment and evidence | Verifier |
|---|---|---|---|
| Product acceptance and critical journeys | NOT RUN | {{evidence}} | {{owner}} |
| Code/integration/contract verification | NOT RUN | {{evidence}} | {{owner}} |
| Relevant design/accessibility/device checks | NOT RUN | {{evidence}} | {{owner}} |
| Security/data/compatibility review | NOT RUN | {{evidence}} | {{owner}} |
| Configuration and migration rehearsal | NOT RUN | {{evidence}} | {{owner}} |
| Rollback/forward recovery and restore needs | NOT RUN | {{evidence}} | {{owner}} |
| Monitoring, alerts and escalation readiness | NOT RUN | {{evidence}} | {{owner}} |

Mark a gate not applicable only with a reason accepted by the release owner. Do not change NOT RUN to PASS merely because the build succeeded.

## Rollout and recovery

- Deployment/migration/activation order and responsible operator:
- Supported old/new clients and compatibility window:
- Smoke tests and observable success criteria:
- Stop/rollback thresholds and decision owner:
- Recovery procedure and implications for already-written data or external effects:
- Recovery time/data-loss objectives and demonstrated evidence:
- Post-release observation window and on-call contact:

## Risk acceptance and authorization

| Exception | Impact and mitigation | Accountable approver | Expiry / remediation task |
|---|---|---|---|
| {{none or explicit issue}} | {{assessment}} | {{approval}} | {{follow-up}} |

Release authorization: {{not granted or explicit approved scope/date}}
Actual deployment outcome/time: {{not deployed or evidence}}
Post-release checks/incidents/follow-up: {{record}}
