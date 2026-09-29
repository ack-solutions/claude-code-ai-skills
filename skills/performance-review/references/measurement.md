# Measurement discipline

- Choose a user-visible operation and metric before changing implementation.
- Record build/configuration, hardware, runtime/database versions, data volume, cache state, load and test duration as relevant.
- Use the same conditions before and after. Warm-up and cold-start measurements answer different questions.
- Record distributions where useful, not only the fastest run. Explain sample size and variance.
- Check result correctness and error rates alongside latency/throughput.
- Prefer existing profilers/traces/query tools. Inspect whether a diagnostic command executes or modifies data before running it.
- Keep external-service costs and side effects bounded to the requested environment.

An observation such as "the query plan scans all rows" supports a hypothesis. It does not establish the user-visible improvement until the proposed change is measured under relevant conditions.
