# Refactoring shared behaviour

Before changing it:

- Identify the authoritative requirement and every affected caller within the change's scope.
- Record observables to preserve: return shape, errors, ordering, permissions, persisted values, events and side effects.
- Check whether similar code represents one policy or distinct concepts. Prefer a domain-specific function over a catch-all utility when ownership matters.
- Add or use behavioural coverage where a meaningful regression could otherwise be missed. Characterization tests can expose current behaviour but do not make it the correct requirement.

While changing it:

- Move one coherent responsibility at a time. Preserve transaction and async error boundaries.
- Keep pure transformation separate from side effects when that improves clarity.
- Update affected consumers and remove obsolete implementations only after confirming they are no longer used.
- Do not combine opportunistic dependency upgrades, architecture replacement or unrelated formatting with the refactor.

Afterward:

- Compare relevant success, failure and permission cases against the intended contract.
- Run applicable checks and inspect the diff for scope and leftover diagnostics.
- Explain any remaining duplication that is intentional and why.

## When not to introduce an abstraction

- Similar code expresses different policies or belongs to owners who must evolve independently.
- No current caller needs the proposed extension points; a speculative generic layer adds complexity without demonstrated reuse.
- The shared helper requires unrelated flags or callbacks that obscure the domain meaning instead of clarifying it.
- Contract/side-effect differences are unresolved or behaviour cannot be verified sufficiently for the change's risk. Clarify or add focused coverage before combining them.

These conditions stop the proposed abstraction, not unrelated authorized work. Retain justified duplication and explain the ownership boundary.
