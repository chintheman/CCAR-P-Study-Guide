# Soft-spot catalogue

The miss patterns that recurred in a real CCAR-P prep cycle. Classify every miss against this list. When a learner repeats a pattern, it is a **recurrence**; two recurrences earn a dedicated block and a place in the exam-week sweep.

Each entry gives the **signature** (what the miss looks like), the **rule**, and a **teaching line**.

---

## A. Option discipline (meta-skills, all domains)

Cover these first if the baseline shows multi-select items with one key right and one wrong. That pattern is partial reasoning, not missing knowledge.

### A1. Partial read
- **Signature:** the learner rejects the key because of a word they assumed, or picks a distractor after missing its last clause. Often says "I didn't read it properly."
- **Rule:** you can't eliminate an option until you can point to the exact words that make it wrong. Translate each option into about five plain words first.
- **Teaching line:** "The deciding qualifier is usually at the end of the option."

### A2. Stem verb ignored
- **Signature:** picks a remedy ("should be expanded") when the stem asks for an objection, or an objection when it asks for a recommendation.
- **Rule:** "objection" or "challenge" means say why the proposal is wrong. "Recommend" means say what to do.
- **Teaching line:** "Same scenario, different verb, different answer."

### A3. True but off-category
- **Signature:** picks a valid statement that belongs on a different list (licensing on an ethics checklist; team experience as an architectural factor).
- **Rule:** the option must fit the category the stem names **and** change the decision.

### A4. Contradictory picks
- **Signature:** two selected options that can't both hold ("surface constraints first" plus "defer constraints").
- **Rule:** different is fine. Opposite means one is wrong.

### A5. Count error
- **Signature:** one pick on a select-two item, or stopping at two on a select-all item.
- **Rule:** match the requested count, and judge each statement on its own.

### A6. Own-practice pull
- **Signature:** "My ideal would be...", "I'd do it weekly", "it should be for the whole team". The learner answers what they'd build.
- **Rule:** the exam scores the documented answer. Judge the option as written.

---

## B. Architecture and integration

### B1. Patching a stale source
- **Signature:** answers a live-state problem (order status, balances, stock) with faster re-indexing, a reranker preferring fresh chunks, or a disclaimer.
- **Rule:** documents go through retrieval; live state goes through a tool call at request time.

### B2. Escalating a failing fix
- **Signature:** the stem says the team already raised the timeout or added retries and it got worse; the learner raises it again.
- **Rule:** never do more of what already failed. Resilience is a limit (retry budget, backoff with jitter, one layer, idempotent only) plus a detect (circuit breaker to a degraded path).

### B3. Workaround over elimination
- **Signature:** filters the attack instead of gating the tool, widens the context window instead of reranking, repairs output instead of enforcing the schema.
- **Rule:** prefer the change that makes the failure impossible. Test: after this change, can the failure still happen?

### B4. Pattern confusion
- **Signature:** chaining vs evaluator-optimizer, or orchestrator-workers vs parallelization.
- **Rule:** "until" means evaluator-optimizer. A subtask list that's fixed in advance means parallelization; a list that can't be known until the input is examined means orchestrator-workers.

### B5. Over-engineering
- **Signature:** picks multi-agent or an agent loop where a single augmented call or workflow meets the bar.
- **Rule:** use the simplest thing that meets the measured bar. Multi-agent costs roughly 15 times the tokens.

---

## C. Governance and control strength

### C1. Instruction as a control
- **Signature:** picks a system prompt rule for a must-not-happen requirement, sometimes believing prompts are the strongest layer.
- **Rule:** strength order is code, permissions and approvals, then filters and classifiers, then instructions.

### C2. Confidence routing
- **Signature:** routes human review by model confidence, or raises the confidence threshold.
- **Rule:** route by impact. A model can be confident and wrong.

### C3. Monitoring mistaken for enforcement
- **Signature:** accepts logging, alerting or dashboards as the control.
- **Rule:** a control has to act: block, gate or reject, and record that it did.

### C4. Vendor scope
- **Signature:** cites the vendor's zero-retention commitment or responsible-use policy as the company's own control.
- **Rule:** a vendor's promise covers the vendor. Your own stores need your own control, owner and evidence.

### C5. Layer misplacement
- **Signature:** puts redaction, authorisation or audit logging in the Skill or prompt, or filters output when data must never reach the model.
- **Rule:** who calls it, what goes in and what is recorded belong in the application layer, before the prompt is assembled.

---

## D. Evaluation

### D1. Wrong layer blamed
- **Signature:** blames the judge or the model when an upstream signal moved, or relaxes a signal to quieten it.
- **Rule:** the fault sits in the layer whose signal moved. Layers whose signals held are cleared.

### D2. Post-hoc measurement
- **Signature:** accepts adding or swapping a measure mid-test, or stopping when one arm looks ahead.
- **Rule:** fix the measure, decision rule, sample and stopping rule before the run.

### D3. Contaminated score
- **Signature:** accepts a score from the tuning or selection set, a small set, or a set missing intents.
- **Rule:** quote only held-out scores on data that resembles production.

### D4. Vendor or public metric
- **Signature:** prefers a benchmark rank or vendor figure over the team's own agreed bar or business measures.
- **Rule:** your own measured numbers always win.

---

## E. Stakeholders (all INFERRED)

### E1. Framing by topic, not audience
- **Signature:** gives an executive the technical detail because "it's an architecture decision".
- **Rule:** frame by what the reader decides and owns.

### E2. Dependency mistaken for handover
- **Signature:** retained consultants, retained access or long documents count as handover.
- **Rule:** the client does the work and owns the controls.

---

## F. Claude Code configuration

### F1. Precedence confused with reach
- **Signature:** puts a team-shared setting in managed scope ("highest = most shared"), or in user scope.
- **Rule:** precedence is managed, CLI, local, project, user. Reach: managed is enforced org-wide; project is shared through git; local is me in this repo; user is me in every repo.
