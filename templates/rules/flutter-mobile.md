---
paths:
  - "apps/mobile/**/*.dart"
  - "apps/mobile/pubspec.yaml"
---

# Flutter mobile conventions

During setup, locate the actual Flutter app and propose corrected `paths` if needed before relying on this rule. Inspect its package manifest and existing state-management, routing, networking and localization integrations. If a new app has not selected them, keep the choice explicit rather than inventing an established convention.

- Map the approved design tokens into the existing theme and reuse widgets with matching responsibilities.
- Separate server-owned facts from cached/local state. Preserve relevant user intent through login, navigation and interruption without treating stale cache as authorization.
- Handle async cancellation/lifecycle, retries, network errors and safe persistence according to the app's requirements.
- Verify safe areas, keyboard/scroll interactions, supported sizes, large text, theme and locale/script behaviour. Use appropriate semantics and platform interaction expectations.
- Add widget/golden/integration coverage where it protects the affected requirement. Golden matches alone do not prove accessibility or an end-to-end flow.
- Profile performance in a suitable profile/release configuration on representative devices; do not extrapolate low-end behaviour from a desktop simulator alone.
