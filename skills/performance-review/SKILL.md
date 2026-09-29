---
name: performance-review
description: Investigate slowness, resource usage and capacity in APIs, databases, web and mobile apps. Use for profile this endpoint, why is this screen slow, or measure this optimization. Functional failures may also need systematic-debugging; dedicated security reviews belong to security-audit.
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

## Report format

Use the project's performance report or a compact default: workload/environment; method and samples; bottleneck evidence; prioritized actions/tradeoffs; verification and limits. For measured changes, include before/after values with units and correctness/error checks. If no change or measurement was made, say so rather than filling in an invented comparison. Distinguish a capacity estimate from a demonstrated operating limit. Do not replace the architecture merely to make it appear scalable.
