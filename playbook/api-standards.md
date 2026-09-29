# API standards and communication between systems

Scope: a contract-first working agreement for API producers and consumers. “Contract-first” here means agreeing an observable interface before dependent implementations diverge; it does not require writing YAML by hand before every line of code. Adopt concrete conventions once and preserve existing supported clients.

## Distinguish three kinds of communication

- **People and agents:** task records, accepted decisions, versioned contracts and [evidence handoffs](agent-collaboration.md).
- **Components inside one process:** explicit module/service interfaces; do not add HTTP just to cross an internal folder boundary.
- **Independently running systems:** documented network/message contracts, authentication, failure handling and observability.

## Select the interaction deliberately

| Need | Starting option | Important boundary |
|---|---|---|
| Web/mobile reads and commands | HTTPS JSON API with an OpenAPI contract | Clients never obtain server database credentials or decide authorization |
| Synchronous service call | HTTP or gRPC when the current stack/requirements justify it | Explicit deadline, service identity, compatibility and failure policy |
| Durable work or event notification | Queue/pub-sub with a defined message schema | Delivery, ordering, duplication, retry and reconciliation are designed, not assumed |
| Live updates | WebSocket/SSE or an existing suitable broker protocol | Reconnect/resync from an authoritative source; live delivery is not durable history by itself |
| Third-party callback | Authenticated, verified webhook | Document signature verification, replay protection and provider retry behaviour |
| Several backends serving one client journey | Direct clients or a backend-for-frontend/gateway where useful | Composition is not permission to duplicate business rules or bypass downstream authorization |

For every dependency, keep a small service inventory: owner, purpose, contract location/version, consuming systems, environments, authentication, data classification, timeouts and recovery contact/runbook. Keep environment secrets out of it.

## HTTP baseline

HTTP method and status semantics come from [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), not from a custom JSON success flag. In particular:

- GET/HEAD are safe retrieval operations; PUT and DELETE are idempotent in intended effect. POST is not inherently retry-safe. PATCH safety depends on its defined operation.
- Use statuses that represent the outcome: successful retrieval/update, creation, accepted asynchronous work, no-content success, client rejection and server failure are different outcomes. Do not return `200` for every error.
- `401` concerns authentication and includes the applicable challenge; `403` concerns refusal for an authenticated/identified request. Document when `404` deliberately avoids exposing a resource's existence.
- Use conditional requests, such as a supported `ETag`/`If-Match` policy, when needed to prevent lost updates; distinguish precondition failure from domain conflict.
- `202` means accepted for processing, not completed. Provide the operation's status/recovery contract when clients need it.

For rate limiting, `429` is defined in [RFC 6585](https://www.rfc-editor.org/rfc/rfc6585.html). Document actual limits, scope, client behaviour and any `Retry-After` handling; agents must not invent business usage limits.

## Contract requirements

Use [OpenAPI](https://spec.openapis.org/oas/v3.2.1.html) to describe HTTP operations and schemas. Pin a version supported by the chosen server, validators, documentation and client generators; the existence of a newer specification is not a reason to break the toolchain. Record whether the schema is authored directly or generated from typed code and how drift is checked.

Each operation needs an owner, stable operation identifier, path/method, authentication and object/field access rules, request/response schema, examples, failure responses and relevant pagination, concurrency and retry behaviour. Generated client types improve consistency but do not enforce runtime permissions or validate arbitrary input.

Our recommended **house conventions**, to accept or replace explicitly:

| Area | Proposed convention |
|---|---|
| Resource paths | Predictable domain resource names; document actions where CRUD would hide the real business operation |
| Versioning | Keep the existing policy. For new long-lived public/mobile APIs, a URI major version is a reasonable option; versioning alone is not a migration plan |
| Identifiers | Treat identifiers as opaque; choose wire types and names that do not confuse accounts, tenants or domain objects |
| Time | Explicit-offset timestamps for instants; model date-only values and business time zones separately |
| Money/precision | Agree currency, scale and representation; do not rely on binary floating-point amounts for financial invariants |
| Lists | Bounded page sizes, deterministic ordering with a tie-breaker and documented cursor/offset semantics; select per use case |
| Nullability | Specify absent, null, empty and default meanings; define PATCH omission versus explicit clearing |
| Input validation | Constrain format, size and allowed fields at the boundary; reject unknown writable fields by default unless the contract permits extensions |
| Consumer evolution | Consumers tolerate permitted additive fields; review enum expansion, nullability and new required fields for real client compatibility |
| Errors | Prefer Problem Details for a new HTTP API; do not silently replace an established error contract |
| Documentation | Version schema, examples and behavioural changes together; examples use synthetic data |

## Errors that clients can use

[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) defines Problem Details and the `application/problem+json` representation. For an adopted Problem Details API, define stable problem types and document any extensions. HTTP status and body status must agree when both are present. Do not expose stack traces, credentials or sensitive record details.

This synthetic response illustrates a house validation extension, not a claim that RFC 9457 defines an `errors` field:

```http
HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json

{
  "type": "https://api.example.com/problems/validation",
  "title": "Request validation failed",
  "status": 422,
  "detail": "One or more fields need correction.",
  "errors": [{"field": "startAt", "code": "must_be_future"}]
}
```

The domain and values are illustrative. Publish meaningful documentation at a real problem-type URI when using this pattern. Clients act on documented machine identifiers, not localized `title` or `detail` text.

## Authentication and authorization

Use established authentication libraries/providers. Document issuer, audience, credential lifetime, session/revocation policy and service identity. A valid token for API A is not automatically valid for API B. Do not forward end-user credentials across trust boundaries without a designed delegation mechanism.

Check operation, object, tenant and writable-field permissions at the trusted owner on every relevant route. UI visibility and gateway authentication are not substitutes. Select applicable requirements from [OWASP ASVS](https://owasp.org/projects/asvs), including negative cases. For OAuth integrations, apply the relevant [OAuth security BCP](https://www.rfc-editor.org/rfc/rfc9700.html); do not invent an authentication protocol.

## Retry, idempotency and partial failure

Give outbound calls a timeout/deadline and define which failures are retryable. Use bounded retry with backoff/jitter and a total request budget; avoid multiplying retries at every layer. A timeout after a write is an unknown outcome, not evidence that nothing happened.

For retryable commands, document the chosen idempotency protocol: key scope, request fingerprint, retention window, concurrent requests, changed-payload rejection and result replay. Couple the deduplication decision with the authoritative effect where possible. Authorization still applies to repeated requests. Idempotency is not a promise of exactly-once execution across arbitrary external systems.

If a database commit must eventually cause a message, avoid an unprotected commit-then-publish gap. A transactional outbox can commit the intent with local data; its relay may publish repeatedly, so consumers need deduplication or naturally idempotent handling. Document ordering needs and reconciliation. This pattern is described in [AWS's transactional outbox guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html); adopting the pattern does not require AWS.

For cross-service workflows, name the owner, intermediate states, timeout/recovery and any compensating actions. A compensation may not undo a real-world effect. Distinguish durable acceptance, successful processing and delivery to a person.

## Event and webhook contracts

Where asynchronous interfaces are used, [AsyncAPI](https://www.asyncapi.com/docs/reference/specification/v3.1.0) can describe channels, operations and message schemas. Pin a supported version. Define event identity, producer, type/schema version, occurrence time, correlation/causation and payload classification as explicit project fields or an adopted envelope specification.

Specify duplicates, ordering scope, replay, incompatible schema changes, poison messages, dead-letter ownership and safe redrive. Alert on oldest unprocessed age and failures where meaningful. Acknowledgment must match the chosen broker's durable-processing semantics; do not acknowledge before the recoverable acceptance point.

Verify webhooks according to the provider's contract, often against the unmodified body and signed metadata. Apply the designed replay window and event identity policy. Return success only after the required durable acceptance point; process expensive work asynchronously when appropriate.

## Cross-service observability

Propagate supported [W3C Trace Context](https://www.w3.org/TR/trace-context/) with the selected instrumentation. [OpenTelemetry context propagation](https://opentelemetry.io/docs/concepts/context-propagation/) supports correlating traces and logs across boundaries. A correlation ID is not an authorization credential; validate untrusted propagation input and never place secrets or personal data in baggage.

Record safe operation identifiers, status, latency, dependency errors and relevant queue lag. Choose bounded metric dimensions. Link production alerts to a runbook and owner.

## Producer-consumer change procedure

1. Identify every affected consumer, including old mobile versions, workers and integrations.
2. Review the schema plus behavioural changes, permission effects and rollout order. Use [the contract review record](templates/api-contract.md).
3. Update producer validation/tests and generated clients where appropriate; review generated diffs.
4. Check schema compatibility and important consumer expectations. Provider tests, contract tests and real integration tests cover different risks; none replaces all the others.
5. Deploy compatible support before dependent consumers when required. Measure adoption and announce deprecation through the agreed channel before removal.

API standards are established when this agreement is implemented in schemas, tests and review—not simply when the Markdown has been written.
