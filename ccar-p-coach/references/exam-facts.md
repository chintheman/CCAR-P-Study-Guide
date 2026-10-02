# CCAR-P exam facts

Compiled September 2026 from Anthropic's public exam guide (v1.0), certification pages and documentation. **Facts change. Tell the learner to check the current exam guide and policies before booking.**

## The exam

| | |
|---|---|
| Exam | Claude Certified Architect – Professional (CCAR-P) |
| Questions | 63: multiple choice, multiple response (all-or-nothing) and scenario matching |
| Time | 120 minutes; plan about 135 minutes in the seat |
| Pass mark | 720 scaled, on a 100 to 1,000 scale |
| Delivery | Pearson VUE, online proctored (OnVUE) or test centre |
| Validity | 12 months, with free recertification before it lapses |
| Practice exam | None official. The exam guide's three sample questions are the only official format preview |

## Logistics worth knowing early

- **Partner email.** Registration has required an email on a recognised Claude Partner Network company domain. Fixing an unrecognised domain has taken 7 to 10 days through partner support.
- **Name match.** The name on the Pearson VUE profile must match government ID exactly.
- **Rescheduling** is free at least 24 hours out.
- **Retakes** have followed a 14, 30, 90 day ladder.
- **Online proctoring:** run the OnVUE system test on the exact machine and network first. The Claude desktop app is among the applications that must be closed.
- **Closed book.** No documentation, no notes, no AI assistants.

## Domains and weights

| # | Domain | Weight | About this many of 63 |
|---|---|---|---|
| 3 | Integration | 19% | 12 |
| 1 | Solution Design & Architecture | 17% | 11 |
| 4 | Evaluation, Testing & Optimization | 16% | 10 |
| 5 | Governance, Safety & Risk Management | 14% | 9 |
| 6 | Stakeholder Communication & Lifecycle Management | 14% | 9 |
| 2 | Claude Models, Prompting & Context Engineering | 13% | 8 |
| 7 | Developer Productivity & Operational Enablement | 7% | 4 |

## Objectives by domain

- **D1 Solution Design & Architecture:** translate business problems into Claude solutions; end-to-end architectures with feedback loops; choose between workflow, agentic and augmented-LLM patterns; multi-agent orchestration; decomposition; align to business value (efficiency, transformation, productivity, cost, performance SLAs).
- **D2 Models, Prompting & Context Engineering:** model selection trade-offs; system prompts, templates and guardrails; zero-shot, few-shot and chain-of-thought; context-window and token optimisation; prompt reuse through caching, modular prompts and Skills.
- **D3 Integration:** tool and agent configuration, and capability bloat; authentication and authorisation gaps; accuracy vs latency; observability at scale; RAG design with chunking and indexing; retrieval matched to data shape; connection protocols (MCP, API or CLI, agent-to-agent); progressive discovery vs monolithic context.
- **D4 Evaluation, Testing & Optimization:** metrics (accuracy, latency, cost, safety, security); evaluation datasets and mixed-method test frameworks; A/B testing; diagnosing prompt failure, hallucination and model mismatch; token, latency and cost optimisation; logging and observability.
- **D5 Governance, Safety & Risk:** guardrails and safety controls; risks, limitations and failure modes; human-in-the-loop validation; GDPR, HIPAA and FedRAMP considerations; bias, fairness and transparency.
- **D6 Stakeholder Communication & Lifecycle:** structured discovery and requirements; communicating decisions and trade-offs; feedback loops and SLA alignment; architecture documentation; lifecycle phases (discovery, design, handoff, monitoring, iteration).
- **D7 Developer Productivity:** configure Claude tooling for teams, such as Claude Code; AI-assisted development workflows; debugging and operational issue resolution.

## Anthropic's free prep course (about 12 hours)

| Course | Minutes | Maps mainly to |
|---|---|---|
| 1. Claude Platform & Solution Design | 238 | D1, D2 |
| 2. Enterprise Integration & Production | 158 | D3, D4 |
| 3. Responsible AI, Safety & Risk for Architects | 114 | D5 |
| 4. Stakeholder Engagement, Lifecycle & GTM | 178 | D6 |
| 5. Team Enablement & Operational Productivity | 45 | D7 |

**Courses 3 and 4 matter most.** They are the only substantial source for Governance and Stakeholder, which are 28% of the exam and thinly covered by public docs.

## Documentation by domain

- **D1:** [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (the core document: workflows vs agents, augmented LLM, five patterns); [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system); [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).
- **D2:** [Prompt engineering overview](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) and its sub-pages (multishot, XML tags, long context, system prompts); [Prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching); [Extended thinking](https://docs.claude.com/en/docs/build-with-claude/extended-thinking); [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).
- **D3:** [Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents); [Advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use) (capability bloat, tool search); [Code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) (progressive discovery); [Contextual retrieval](https://www.anthropic.com/news/contextual-retrieval); [MCP specification](https://modelcontextprotocol.io) and its security best practices.
- **D4:** [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) (pass@k vs pass^k, grader types); [Develop test cases](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests); the strengthen-guardrails pages; [Batch processing](https://docs.claude.com/en/docs/build-with-claude/batch-processing).
- **D5:** [Mitigate jailbreaks and prompt injections](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks); [Anthropic Trust Center](https://trust.anthropic.com/); Anthropic's HIPAA, SOC 2 and GDPR support articles.
- **D6:** effectively no vendor documentation. Prep course 4 is the source. Treat all D6 keys as INFERRED.
- **D7:** Claude Code docs: settings, permissions (IAM), memory (CLAUDE.md), hooks, sub-agents, skills, GitHub Actions.

## Where public docs are thin

1. **D6 Stakeholder & Lifecycle:** almost no official coverage.
2. **D1 business value framing:** taught in prep course 1, not in public docs.
3. **D5 human-in-the-loop design and fairness:** guardrail docs exist, but operational guidance comes from course 3.
4. **D3 agent-to-agent protocols:** MCP is well documented; agent-to-agent is not.
5. **D4 A/B testing and sample sizes:** course 2.
