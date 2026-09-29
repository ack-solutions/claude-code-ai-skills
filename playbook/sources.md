# Research and standards register

Reviewed on 2026-09-29 using primary documentation. This is a targeted synthesis, not an exhaustive literature review, legal opinion or certification. The playbook is original guidance; linked standards retain their own terms and should be consulted for exact normative requirements.

## Delivery and engineering practice

| Source | Classification | What informs this playbook |
|---|---|---|
| [Scrum Guide, November 2020](https://scrumguides.org/scrum-guide.html) | Framework definition | Product accountability, inspectable increments and a shared Definition of Done; not the exact task states used here |
| [Kanban Guide, May 2025](https://kanbanguides.org/the-kanban-guide/2025.5/) | Workflow/flow-management guidance | Explicit workflow, WIP control and inspection of flow; the team chooses its actual states and limits |
| [DORA delivery metrics](https://dora.dev/guides/dora-metrics/) | Research-backed delivery guidance | Track throughput and instability over time, not individual activity rankings; the inspected guide describes five metrics |
| [Google review standard](https://google.github.io/eng-practices/review/reviewer/standard.html) and [review concerns](https://google.github.io/eng-practices/review/reviewer/looking-for.html) | Published organizational practice | Review overall health, correctness, complexity and evidence; distinguish material findings from preferences |
| [C4 model](https://c4model.com/) | Architecture communication model | Start with useful context and container views; deeper views are conditional |
| [Architecture decision records](https://adr.github.io/) | Decision-recording practice | Preserve decision context and consequences; an ADR is not a substitute for runtime validation |

## API and distributed-system references

| Source | Classification | Adoption boundary |
|---|---|---|
| [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) | HTTP standard | Method, status, representation and conditional request semantics |
| [RFC 6585](https://www.rfc-editor.org/rfc/rfc6585.html) | Additional HTTP status standard | Rate-limit response semantics; actual limits remain product/operational decisions |
| [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) | HTTP Problem Details standard | Structured errors when selected; extension fields remain documented project choices |
| [OpenAPI 3.2.1](https://spec.openapis.org/oas/v3.2.1.html) | HTTP API description specification | Machine-readable contracts; pin a version supported by the actual toolchain rather than mandating the newest |
| [AsyncAPI 3.1.0](https://www.asyncapi.com/docs/reference/specification/v3.1.0) | Asynchronous API description specification | Describe message interfaces where needed; does not guarantee delivery or processing correctness |
| [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html) | OAuth 2.0 security best current practice | Apply to the chosen OAuth integration, not as a reason to replace all existing authentication |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/) | Trace propagation specification | Interoperable tracing metadata, not authorization |
| [OpenTelemetry context propagation](https://opentelemetry.io/docs/concepts/context-propagation/) | Instrumentation guidance | Correlation across boundaries and safe propagation |
| [AWS transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) | Distributed-system design pattern | Reliable local intent recording plus duplicate-aware processing; not an exactly-once promise |

## Product quality, safety and operation

| Source | Classification | Adoption boundary |
|---|---|---|
| [GOV.UK user-needs research](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) | Service-design practice | Evidence about real needs; AI-generated personas do not establish observed needs |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | W3C Recommendation | Web accessibility criteria and scoped conformance; choose the applicable target and evaluate it |
| [OWASP ASVS](https://owasp.org/projects/asvs) | Application security verification standard | Select applicable controls and cite versioned identifiers; the inspected page points to version 5.0.0 |
| [NIST SP 800-218, SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final) | Secure-development recommendations | Lifecycle security practices; confirm applicable revisions/obligations when adopting |
| [Google SRE: implementing SLOs](https://sre.google/workbook/implementing-slos/) | Reliability practice | User-oriented indicators/objectives and evidence for reliability decisions |
| [GitHub protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) | Product documentation | Enforcing agreed checks/reviews; must actually be configured in the target repository |

## Agent-specific product documentation

| Source | What was checked |
|---|---|
| [Claude Code memory and rules](https://code.claude.com/docs/en/memory) | Instruction files, imports and path-scoped rules |
| [Claude Code subagents](https://code.claude.com/docs/en/sub-agents) | Separate task contexts and tool configuration; deployment of such agents is not part of this plan |
| [Codex AGENTS.md instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | How to provide shared project guidance and verify discovery |

## Recommendations that are not external standards

The proposed task/feature states, document layout, one-integration-owner rule, pilot sequence, role-to-skill mapping and default evaluation of a modular monolith are this playbook's synthesis. They are intended to reduce coordination errors for a small AI-assisted team; they are not universally mandatory industry rules.

Review changing specifications, tool support and platform behaviour before implementation. Save the adopted version and review date in the target project's decision record. Researching these sources does not mean their controls have been implemented or independently evaluated.
