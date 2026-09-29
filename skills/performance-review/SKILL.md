---
name: performance-review
description: Investigate measured slowness, resource usage, or capacity in APIs, databases, web interfaces, and mobile apps. Use for performance profiling, optimization review, or workload-based scaling decisions.
---

# Performance review

Identify the bottleneck with measurements and verify the requested optimization. Respect existing architecture and product correctness.

## Establish the workload

Read the relevant requirements and implementation. Define the user operation, environment, representative data volume/device/network, expected concurrency and current target. If no baseline exists, measure one or report the missing measurement capability; do not invent throughput or percentage improvements.

Separate cold/warm behaviour, averages/tails, development/release builds and synthetic/production observations. Consult [measurement guidance](references/measurement.md) for experiments.

## Trace the critical path

- API: spans, external calls, serialization, blocking work, fan-out, pagination and response size.
- Database: representative query plans, indexes, rows scanned, N+1 access, locks, connections and transaction duration.
- Web: network waterfalls, bundle/loading cost, render frequency, layout work, images and interaction latency.
- Mobile: release/profile startup, frame timing, memory, images, expensive effects and supported low-end devices.
- Background work: queue delay, retries, resource contention and backlog under the stated workload.

Investigate only relevant layers. Prioritize the dominant measured cost over micro-optimizations. Before adding caching, queues, replicas or services, consider simpler changes and document the invalidation, consistency, failure and operational costs of the proposal.

## Change and retest when requested

Use controlled before/after measurements with equivalent workload and environment, sufficient repeated samples and correctness checks. A faster response that leaks data, drops work or serves invalid state is not an acceptable improvement.

Use local/staging synthetic workloads unless another target and load level are authorized. Do not stress production as a side effect of an audit. Report limits when hardware, realistic data or profiling tools are unavailable.

## Deliver

Give workload and method, observed bottleneck/evidence, prioritized actions and tradeoffs. For changes, report before/after values with units, sample limitations and regression checks. Distinguish a capacity estimate from a demonstrated operating limit. Do not replace the architecture merely to make it appear scalable.
