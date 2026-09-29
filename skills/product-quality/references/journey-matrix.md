# Journey matrix

Use the relevant requirements as the test oracle. For each case record:

| Field | Content |
|---|---|
| Requirement | Identifier or precise expected outcome |
| Actor and entry | Role, starting state and how the journey begins |
| Preconditions | Fixture, account, permissions and dependencies |
| Action | Steps including the particular failure/interruption being exercised |
| Expected | Visible result and important downstream/persisted effect |
| Actual and evidence | Observed result, trace, screenshot or test output |
| Context | Build/environment, device/browser, language and relevant settings |
| Status | PASS, FAIL, BLOCKED or NOT TESTED |

Use only useful scenario combinations. A risk-based sample must describe its coverage; do not imply every device or state was exercised.

Distinguish blockers from severity: an unavailable test environment blocks evaluation but does not prove a product defect. A failure's severity follows user impact, frequency/exposure and recovery options.

For cross-role actions, verify both sides. For asynchronous work, use an observable completion condition with a bounded timeout, and inspect failure/retry behaviour where relevant.
