# Synthetic fixture requirements

These rules exist only for the isolated evaluation. They are not rules for any real product.

- Editing and exporting drafts are independently owned capabilities. Each currently permits the state `draft`; they are expected to evolve independently. Identical current predicates are not evidence that they should share a business policy.
- Quantity validation accepts positive integers. Zero, negatives, fractions and nonnumeric inputs are invalid. Do not introduce an unrequested upper limit or coerce strings into numbers.
- The fixture has no UI, public site, store listing, customer data or analytics. It uses plain JavaScript modules and Node.js, with no package installation required.
