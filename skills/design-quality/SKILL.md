---
name: design-quality
description: Audit existing designs or UI for visual fidelity, accessibility, responsiveness and localization. Use for design QA, compare these screenshots, or check this layout. For creating a new design prefer product-design; for complete new-feature implementation prefer feature-delivery.
---

# Design quality

Evaluate the interface against the user's brief and established design requirements. Distinguish objective defects from visual preferences and proposals to improve the design itself.

## Select the reference and stage

Discover the relevant design spec, tokens, components, approved screens and platform requirements. Inspect the actual reference and target before claiming differences. Name whether the target is a design file, exported image, prototype or running app.

Separate two comparisons: fidelity to the intended design, and regression against a reviewed implementation baseline. A stable baseline can contain an old design error. If no approved reference exists, perform a disclosed heuristic review rather than inventing one.

## Inspect a relevant screen/state matrix

Use [the review matrix](references/review-matrix.md) to choose coverage for the affected screens. Include relevant success and failure states and realistic long, missing or translated content.

Check hierarchy and primary-action clarity; typography, spacing, alignment, colors and icons; component consistency; form guidance and feedback; and navigation/recovery. Assess whether trust, price, status and consent information is understandable and accurate.

Test applicable layout behaviour across supported widths, themes, locales and text scaling. Check safe areas, keyboard overlap, sticky controls and scrolling. Avoid treating a fixed screenshot width or one enlarged-text sample as universal accessibility evidence.

Check interaction accessibility: keyboard/focus, control names and semantics, reading order, touch targets, contrast and reduced motion. Automated checks assist manual evaluation; passing a scanner is not a complete accessibility finding.

## Gather reliable evidence

Use available browser, design or device tools to render and inspect results. Choose existing test infrastructure before adding tools. For requested automation, web screenshot tests and mobile golden/widget tests are options, not mandatory frameworks.

Keep screenshot environments and fixtures stable: fonts, dimensions, locale, theme, data and motion. Review differences as product/design changes; do not regenerate baselines simply to silence failures. Device-specific rendering, assistive technology and external-app behaviour require appropriate runtime checks.

If tools are unavailable, report what source-level inspection establishes. Mark visual/runtime checks BLOCKED when a named missing prerequisite prevents execution, or NOT RUN when not executed. Never describe unseen screenshots as inspected.

## Report format

Use the project's review format or this compact default per finding: screen/component/state; reference and revision; expected versus actual; reproduction settings; evidence; impact; suggested correction and retest. Attach screenshots/diffs when available. Separate observed defects from preferences and unverified hypotheses; prioritize task-blocking, inaccessible or misleading behaviour ahead of decoration.

An audit returns findings. A requested fix may update the relevant component/token or screen, followed by affected-state retesting. Do not change business rules or the whole visual direction to resolve one layout defect. Summarize coverage and remaining manual checks.
