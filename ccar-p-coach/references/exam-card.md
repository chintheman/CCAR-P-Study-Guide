# Exam card

The one page for exam morning. Teach from it during study, and have the learner read it twice the day before and once on the morning.

## Five checks before each answer

0. **Full read.** Translate each option into about five plain words. Don't rule one out until you can point to the words that make it wrong. The deciding qualifier is usually at the end.
1. **Stem verb.** "Objection" or "challenge" means say why it's wrong. "Recommend" or "should" means say what to do.
2. **Category.** Does the option fit the list the stem names, and does it change the choice? A true statement on the wrong list is still wrong.
3. **Contradiction.** Can both picks be true at once? If they're opposites, one is wrong.
4. **Count.** "Select two" means exactly two. On yes or no statements, judge every option on its own.

## Eight rules

1. **Must-not-happen means code, permission or approval.** Strength order: code and approvals, then filters and classifiers, then prompt instructions.
2. **Route human review by impact, not confidence.** A model can be confident and wrong.
3. **A control has to act.** Logging, alerting and dashboards are monitoring. Enforcement blocks, gates or rejects, and records that it did.
4. **Your own measured numbers beat vendor or public scores.** Agreed bar over benchmark rank.
5. **Documents go through retrieval, live state through a tool call** at request time.
6. **Never escalate a fix that already failed.** Resilience is a limit plus a fail-fast detect.
7. **Prefer the change that makes the failure impossible.** Gate the tool rather than filter the attack; fix the ranking rather than widen the window; enforce the schema rather than repair the output.
8. **Use the simplest thing that meets the bar.** Augmented LLM, then workflow, then agent, then multi-agent.

## Pattern tells

Could you draw the whole flowchart before it runs? Yes means a workflow; no means an agent.

| Pattern | Tell |
|---|---|
| Augmented LLM | One call with retrieval or tools |
| Prompt chaining | Fixed steps, each runs once, each feeds the next |
| Routing | Distinct, stable categories, one per input |
| Parallelization | A fixed, known set of independent subtasks, merged afterwards |
| Orchestrator-workers | Subtasks can't be listed until the input has been examined |
| Evaluator-optimizer | "Until": scored against criteria, revised, rescored |
| Agent | Unknown path, environment feedback; needs a stopping condition and guardrails |

## Layers and scopes

- **Who may call it, what's logged, what data goes in:** the application layer, in code, before the prompt is assembled.
- **What the output says and how it's formatted:** the Skill, system prompt and examples.
- **A vendor's promise covers the vendor only.**
- **Propagate the user's identity** to source systems, never a shared service account.
- **Claude Code precedence:** managed, CLI args, local, project, user. Managed is enforced; project is shared through git; local is me in this repo; user is me in every repo. Hooks and permission rules enforce; CLAUDE.md guides.

## Evaluation

- The fault sits in the layer whose signal moved.
- Pre-register the measure, decision rule, sample and stopping rule.
- Never quote a score from the set you tuned or selected on. Small sets mean wide margins; cover every intent you claim.
- pass@k means "can it"; pass^k means "will it, every time". Unattended work needs the second.
- Calibrate a judge against human labels before it gates a release.

## Stakeholders (INFERRED)

| Audience | Give them |
|---|---|
| Executive sponsor | Outcomes, trade-offs, high-level risks |
| CFO | Cost, ROI, payback |
| General counsel | Liability, confidentiality, human accountability |
| CIO | Integration, operations, lock-in |
| CISO | Threat model, controls, residual risk |
| Product | Capabilities, scope, roadmap |
| Engineering | Alternatives, components, implementation |

- Committee: the decision first, then a section per stakeholder.
- Handover: the client does the work and owns the controls.
- Discovery: constraints, then success criteria, then scope, then design.
- Bad news: the measured number against the commitment, with a plan. Never soften the bar.

## Prompting and models

- Correct instruction but inconsistent output: add a few examples. Not a pipeline, not a bigger model.
- Caching: static content first and byte-identical; variable content last.
- Long context: documents at the top, the question at the end, quotes extracted first.
- XML tags separate instructions, documents and examples.
- Leading questions get agreement. Ask for a neutral comparison against named criteria.
- Absolute wording (always, never, regardless, guaranteed) in a claim about how something behaves: rule it out.

## Pace

- About 1.9 minutes per question. At question 32, about 60 minutes should be left; at 48, about 30.
- Flag real doubt and move on.
- Being ahead of the clock is permission to read fully, not a reason to speed up. Rushing costs more marks than any single knowledge gap.
