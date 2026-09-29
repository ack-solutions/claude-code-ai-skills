---
paths:
  - "apps/api/src/**/*.ts"
---

# NestJS API conventions

Use this rule only for the NestJS API. During setup, inspect the project's API location and propose corrected `paths` if needed before relying on the rule. Keep existing module boundaries; installation does not approve an architecture change.

- Follow existing modules, dependency injection, transport conventions and domain ownership. Controllers translate/validate requests; business decisions belong in the appropriate service/domain owner.
- Discover the actual authentication, permission and request-context libraries before extending them. Enforce operation and object/tenant ownership on the server.
- Reuse authoritative contracts and validation rules where supported. Check DTO/OpenAPI/runtime validation agreement without duplicating domain policy in transport classes.
- Keep persistence and external side effects explicit. Use transactions for database invariants and a deliberate retry/reconciliation mechanism for effects outside them.
- Follow established error mapping and logging practices; exclude credentials and sensitive request values.
- Cover affected success, failure and permission behaviour with the project's available test infrastructure. Preserve supported API/client compatibility.
