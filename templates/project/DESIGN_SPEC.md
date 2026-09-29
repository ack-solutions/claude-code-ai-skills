# Shared product design specification

Status: DRAFT
Design owner / accountable reviewer: {{names}}
Approved reference and revision: {{design file or repository reference; not approved}}

This file owns shared visual and interaction rules. Feature records own their journeys and screen-specific behaviour. References may be code, design files or prototypes; do not assume a particular design tool is available.

## Audience and design intent

- Primary tasks, context of use and relevant user research:
- Information hierarchy, navigation model and primary actions:
- Intended visual character and content voice, tied to audience needs:
- Constraints and hypotheses still requiring validation:

Distinguish stakeholder preference, AI inspection and real-user observations. Do not invent studies or trust claims. Avoid hidden choices, misleading prices or decorative effects that obstruct use.

## Authoritative foundations

| Foundation | Canonical token / source | Accepted values and variants | Evidence / open choice |
|---|---|---|---|
| Color / themes / contrast | {{source}} | {{semantic roles and themes}} | {{pending}} |
| Typography | {{source}} | {{font, scale, weight, line height}} | {{pending}} |
| Spacing / layout | {{source}} | {{scale, grids, width rules}} | {{pending}} |
| Shape / elevation | {{source}} | {{radius, border, shadow}} | {{pending}} |
| Icons / imagery | {{source}} | {{library, assets, meaning}} | {{pending}} |
| Motion | {{source}} | {{durations, purpose, reduced-motion behaviour}} | {{pending}} |

For an existing project, link actual token definitions rather than maintaining a second editable copy. For a new project, approve a small foundation before producing many screens. Do not treat example values as accepted brand decisions.

## Components and shared patterns

| Component / pattern | Owner and implementation/reference | Supported variants and states | Reuse / extension rule |
|---|---|---|---|
| {{component}} | {{source}} | {{relevant states}} | {{boundary}} |

Reuse by responsibility. Keep global components product-neutral where practical; feature wrappers own feature behaviour. Prefer meaningful variants over unrelated boolean switches. Record exceptions and revisit conditions instead of silently duplicating global UI.

Define shared rules for forms, labels/help, validation timing, focus, submission feedback, navigation/back/cancel, notifications, permissions and destructive confirmations. Consequences must be understandable and recovery honest. Business permissions remain in requirements, not invented in a component.

## Screen and interaction coverage

For each affected journey, link the approved feature/design reference and identify applicable loading, empty, populated, validation, error, disabled, success and permission-denied states. Include interrupted sessions, slow/offline responses, repeated input and ambiguous write outcomes where relevant.

Specify safe areas, keyboard avoidance, scrolling, text expansion, long content, locale formats, pluralization and RTL when supported. Do not shrink important text or targets to force a screenshot match.

## Supported environments and accessibility target

| Dimension | Adopted scope / target | Test procedure or representative conditions | Owner |
|---|---|---|---|
| Platforms / viewports | {{actual support}} | {{small/large widths and real devices}} | {{owner}} |
| Themes / locales | {{supported combinations}} | {{long text, formatting, RTL if needed}} | {{owner}} |
| Text / input | {{scaling and input methods}} | {{keyboard, focus, touch, large text}} | {{owner}} |
| Accessibility | {{version, level and applicable scope}} | {{contrast, semantic/assistive-tech checks and full applicable criteria}} | {{owner}} |
| Motion / rendering cost | {{accepted limits}} | {{reduced motion and representative hardware}} | {{owner}} |

Select targets using [quality guidance](engineering/quality.md). For web, consider WCAG 2.2 AA with an explicit conformance scope; native applications also need platform-specific and assistive-technology checks. A checklist or automated scan alone does not prove conformance.

## Design acceptance evidence

| Journey / state | Reference revision | Actual build / device / locale | Procedure and evidence | Result / reviewer |
|---|---|---|---|---|
| {{case}} | {{reference}} | {{environment}} | {{screenshot, recording, inspection or user-test record}} | NOT RUN / {{reviewer}} |

Use PASS, FAIL, BLOCKED or NOT RUN and explain relevant coverage exclusions. Review changed screenshot baselines deliberately. Source review is not rendered inspection; a prototype is not a running-product test. Keep product outcome acceptance separate from visual acceptance and link both to the feature criteria.

## Decisions and exceptions

Record unresolved design questions with owner and dependent work. Preserve resolutions, approved departures from the system and remaining limitations. Readiness depends on material decisions for the current work, not every possible future screen being designed.
