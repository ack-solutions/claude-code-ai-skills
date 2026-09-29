# Design review matrix

Use supported product targets and requirements, not a universal list of devices or an assumed locale. Concentrate on changed components and critical journeys.

| Dimension | Useful checks |
|---|---|
| Layout | Smallest supported width, typical and larger layouts, safe areas, keyboard, overflow, sticky controls and scroll reachability |
| Content | Long names, missing media, large counts/amounts, empty lists and meaningful error text |
| Theme | Supported light/dark/high-contrast modes, disabled/focus states and imagery backgrounds |
| Language | Target translations, script glyph/line-height fit, wrapping, pluralization, date/currency formatting and RTL if supported |
| Text size | Product/platform-supported scaling, reflow and visibility of important actions; document any exceptions |
| Interaction | Primary/secondary actions, back/cancel, loading, validation, errors, success, disabled and permission states |
| Accessibility | Keyboard order and focus visibility, semantics/names, reading order, contrast, targets and motion preferences |
| Fidelity | Token/component use and deliberate differences from approved references |

Record screen, state, environment/settings, expected, actual, evidence and status. Explain impact: for example, a translated error clipped below a field prevents recovery; a minor radius preference may not affect usability.

Do not interpret pixel differences alone as defects. Rendering variation and intended design changes need review. Conversely, a screenshot match says nothing about whether a button is operable or correctly labeled to assistive technology.
