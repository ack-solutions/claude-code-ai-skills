# Small synthetic skill trials

These are evaluation fixtures, not application requirements or executed model results. Keep this rubric outside the agent's test project. Copy only [the fixture source](fixtures/synthetic.mjs) and [its requirements](fixtures/REQUIREMENTS.md) into an empty disposable project, then install the reviewed pack there. Do not use production data or credentials.

## Compare under controlled conditions

Use a fresh fixture for each prompt and each pack version. Record pack commit, Claude version/model, prompt, available tools, permissions, actual skill invocation, actions, result and artifacts. Keep tools and permissions comparable. Do not change model/access settings just to make a trial pass. The skills-disabled control tests whether a skill adds value; old-versus-new tests whether this change helps.

For natural-routing cases, send the prompt without `/skill-name`. Observe actual invocation/tool traces where available. A correct result without loading a skill may still solve the task, but is not evidence of that skill's behaviour. For a workflow-only trial, explicitly invoke the selected skill and record that it was forced. Do not disclose the expected outcome below to the evaluated agent.

| Case | Exact prompt | Reviewer checks, not agent instructions |
|---|---|---|
| Maintainability | Audit synthetic.mjs for duplication and unnecessary coupling. Report findings without changing files. | `code-quality` is the relevant primary workflow. Does not merge independently owned rules just because their bodies match; may report the quantity defect. No edits. |
| Diagnosis | Why does isValidQuantity(0) succeed? Diagnose the cause against REQUIREMENTS.md without fixing it. | `systematic-debugging` fits. Explains the inclusive-zero boundary with evidence; does not rewrite the file or claim an unrun test. |
| Requested fix | Fix isValidQuantity so it satisfies REQUIREMENTS.md, add a regression check and run it. Keep unrelated functions unchanged. | Debugging/focused implementation is appropriate. Corrects the boundary and actually verifies valid, zero, negative and noninteger cases if execution is available; reports missing execution otherwise. Does not merge the two state policies. |
| Missing visual evidence | Review the checkout UI for visual and accessibility issues. No screenshot, rendered application, design reference or browser/device access is available in this fixture. | `design-quality` fits if invoked. Explains missing evidence and records BLOCKED/NOT RUN checks, not imaginary visual defects or a pass. May provide a clearly labeled test plan. |
| Private-product growth | Suggest how to improve activation for an authenticated internal tool. It has no public website or app-store listing, and no usage analytics are supplied. Do not change files. | `growth-strategy` may apply. Skips SEO/ASO while still proposing activation hypotheses and a measurement plan; invents neither analytics nor public-content requirements. |
| Planning only | Propose a small feature brief for helping people correct invalid quantity input. Do not implement it; identify any product choices still needed. | `product-planning` fits. Uses the synthetic validation requirement, keeps new UI choices proposed, and produces no implementation changes. |

Relevant specialist skills can cooperate; do not fail a case solely for a justified additional workflow. Evaluate the requested outcome, scope and evidence, not a rigid one-skill-only sequence. A read-only tool configuration cannot prove that an audit would refrain from editing when write tools are available; disclose that limitation.

## Fixture verification

The source intentionally accepts zero, contrary to its synthetic requirement. After a requested correction, a small Node assertion check can verify that `1` and `2` pass while `0`, `-1`, `1.5` and `'1'` fail. Include that check in the actual trial and retain the output; do not mark it passed because the proposed code looks right.

Inspect the complete diff after every case. Record PASS, FAIL, BLOCKED or NOT RUN for each reviewer criterion and name the missing prerequisite when blocked. Do not turn these six cases into a claim that all twelve skills are behaviourally validated.
