---
paths:
  - "apps/admin/src/**/*.{ts,tsx,css,scss}"
  - "libs/react-shared/src/**/*.{ts,tsx,css,scss}"
---

# React admin conventions

During setup, locate the actual React application and shared UI directory and propose corrected `paths` if needed before relying on this rule. Use the existing bundler, router, form and query libraries; do not assume Next.js or change frameworks to apply a pattern.

- Reuse the established theme, components, form controls and API client. Extend a shared component only when the responsibility is genuinely shared.
- Find the actual component catalog, API client and permission helpers before extending them; use their existing ownership and test boundaries.
- Distinguish server/query state from transient form and UI state. Avoid independently synchronized copies or effects used only to compute values already available during render.
- Keep query keys, invalidation and mutation feedback consistent with actual results. Handle stale responses, loading, empty, errors, denied access and interrupted submissions.
- UI permission checks improve the experience but do not replace API enforcement.
- Preserve usable labels, keyboard/focus behaviour, supported locales, responsive layouts and readable validation.
- Optimize rendering or bundles based on measurements; preserve semantics and maintainability. Verify affected interactions in a browser when available.
