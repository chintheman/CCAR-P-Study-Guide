/* Domain drill bank: 103 items. Source of truth: bank.json */
window.CCARP_BANK = [
 {
  "id": "D1-01",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "A grocery delivery company handles 40,000 inbound customer messages a day across five categories: refunds, delivery status, item substitutions, account changes, and complaints needing escalation. Each category has its own policy document and its own required response format, and the single prompt carrying all five policy sets now runs at 31,000 input tokens with rising confusion between refunds and substitutions. No message needs more than one category's policy, and the category set has been stable for two years. Which architecture best fits?",
  "options": [
   {
    "key": "A",
    "text": "Keep the single prompt but move the five policy documents into a cached prefix, cutting cost per message and leaving accuracy to be tuned later."
   },
   {
    "key": "B",
    "text": "Add a lightweight classification call that routes each message to one of five specialised prompts, each carrying only its own policy set and output format."
   },
   {
    "key": "C",
    "text": "Run all five specialised prompts on every message in parallel and have a sixth call vote on which response to send."
   },
   {
    "key": "D",
    "text": "Expose the five policy documents to an agent as retrievable tools and let it decide per message which policies to consult and in what order."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "This is the textbook routing case: inputs fall into distinct categories that are known, stable and mutually exclusive, and separating them lets each prompt be specialised without interference from the other four policy sets. Routing fixes both symptoms at once, since each call now sees only the policy that applies and the token count collapses.",
  "distractors": {
   "A": "Caching lowers cost but changes nothing about the policy interference that is causing refunds and substitutions to be confused.",
   "C": "Parallelization by voting multiplies cost roughly fivefold to solve a classification problem that a single cheap classifier already solves.",
   "D": "Agency buys flexibility the problem does not need, and adds latency and nondeterminism to a task whose decision tree is fully known in advance."
  },
  "objective": "Select appropriate architectural patterns (workflow, agentic, augmented LLM)",
  "src": [
   {
    "t": "Building effective agents: workflows vs agents, the five patterns",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   },
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D1: Select appropriate architectural patterns",
    "u": "",
    "type": "guide"
   }
  ]
 },
 {
  "id": "D1-02",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "A telecom's order status assistant answers from a vector index rebuilt nightly from the order management database. Customers report the assistant stating an order is in transit hours after it was delivered, and the contact centre attributes 62 percent of its escalations to stale status. The platform team proposes re-indexing every 15 minutes and adding a reranker that prefers the most recent chunk. What should the architect recommend instead?",
  "options": [
   {
    "key": "A",
    "text": "Read order state from the order management system through a tool call at request time, and keep retrieval for policy, FAQ and troubleshooting content."
   },
   {
    "key": "B",
    "text": "Stamp every chunk with an indexed-at timestamp and instruct Claude to disregard any status chunk older than one hour."
   },
   {
    "key": "C",
    "text": "Adopt the 15-minute re-index with the recency reranker, and add a nightly reconciliation job that repairs chunks which drifted from the source."
   },
   {
    "key": "D",
    "text": "Move to an agentic loop that retrieves, inspects the timestamp, and re-retrieves until it finds a chunk newer than the customer's most recent event."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "Live transactional state belongs to the system of record, not to a retrieval index, which is a cache of a snapshot and will always lag. The principle under test is recognising when retrieval is doing a job that live system state should own, and splitting the architecture so each source answers what it is authoritative for.",
  "distractors": {
   "B": "It makes the model the arbiter of freshness and leaves it with nothing to answer from once it discards the stale chunk.",
   "C": "It narrows the staleness window at real cost while preserving the failure mode, and a 15-minute-old delivery status still misleads a customer.",
   "D": "Repeated retrieval cannot produce data the index does not hold, so this pays agent loop cost to rediscover the same stale record."
  },
  "objective": "Design end-to-end architectures (input, processing, output, feedback loops)",
  "src": [
   {
    "t": "Building effective agents: workflows vs agents, the five patterns",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   },
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D1: Design end-to-end architectures",
    "u": "",
    "type": "guide"
   }
  ]
 },
 {
  "id": "D1-03",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "A biotech investor has 48 hours to decide on an acquisition and needs a synthesis across five strands: patent estate, clinical trial pipeline, litigation history, key-person risk, and contract manufacturing exposure. Each strand requires open-ended search whose next source depends on what the previous one turned up, and the strands do not inform one another. Analysts currently take nine days; the deal team states that analyst hours, not token spend, are the binding constraint. Which architecture fits?",
  "options": [
   {
    "key": "A",
    "text": "A single extended-thinking call over a large pre-retrieved corpus spanning all five strands, returning a structured synthesis against a fixed schema."
   },
   {
    "key": "B",
    "text": "A prompt chain that works the five strands in a fixed order, carrying a running summary forward so later strands can build on earlier findings."
   },
   {
    "key": "C",
    "text": "A lead agent that decomposes the brief into five subagent investigations with explicit scope boundaries and effort budgets, then synthesises their reports."
   },
   {
    "key": "D",
    "text": "A routing workflow that classifies the brief and dispatches it to whichever of five specialised diligence prompts scores highest."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Multi-agent earns its roughly fifteenfold token premium exactly here: breadth-first work with independent strands, an unpredictable number of steps, and sources that are discovered during the search rather than known upfront. The stakeholder has also stated that the scarce resource is analyst time, which is what parallel subagents buy.",
  "distractors": {
   "A": "Pre-retrieval assumes the relevant sources are known before the search starts, which is precisely what open-ended diligence violates.",
   "B": "Serialising five independent strands adds no accuracy and compounds summarisation loss across hand-offs while blowing the 48-hour window.",
   "D": "Routing selects one strand when the deliverable requires all five."
  },
  "objective": "Design multi-agent systems and orchestration strategies",
  "src": [
   {
    "t": "Multi-agent research system: lead/subagent decomposition, ~15x token cost",
    "u": "https://www.anthropic.com/engineering/multi-agent-research-system",
    "type": "doc"
   },
   {
    "t": "Building effective agents: workflows vs agents, the five patterns",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D1-04",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "A retail bank wants its credit risk analysts, who are not engineers, to draft internal memos with Claude. The material includes customer account data classified as restricted. Bank policy states that restricted data must not leave the bank's own tenancy, and that every prompt and completion must be retained in the bank's own log store under its seven-year records schedule. Which delivery route satisfies the constraints?",
  "options": [
   {
    "key": "A",
    "text": "Claude.ai Enterprise with SSO and admin controls, so analysts get a managed chat surface and the bank gets centrally administered workspaces and usage reporting."
   },
   {
    "key": "B",
    "text": "Claude Code on analyst workstations with an MCP server fronting the risk data warehouse, so analysts query and draft in one place."
   },
   {
    "key": "C",
    "text": "A shared Claude.ai Team workspace holding the restricted documents as project knowledge, governed by a written policy forbidding entry of account identifiers."
   },
   {
    "key": "D",
    "text": "An internally hosted chat application in the bank's own environment calling the API, writing every request and response to the bank's log store before returning."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "The constraints are about custody of data and ownership of the record, not about model capability, so they narrow the entry point before any design discussion. Building the surface inside the bank's environment is the only route that keeps restricted data in tenancy and puts the retained record in a store the bank controls for its own schedule.",
  "distractors": {
   "A": "Administrative visibility is not the same as tenancy custody or ownership of a seven-year records store, which is what the policy demands.",
   "B": "Claude Code suits engineers working in a repository, not analysts drafting memos, and it resolves neither the tenancy nor the retention requirement.",
   "C": "It substitutes a written instruction for a control, so the restriction holds only as long as every analyst complies."
  },
  "objective": "Translate business problems into Claude-based AI solutions",
  "src": [
   {
    "t": "Agent SDK overview",
    "u": "https://platform.claude.com/docs/en/agent-sdk/overview",
    "type": "doc"
   },
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D1: Translate business problems into Claude-based AI solutions",
    "u": "",
    "type": "guide"
   }
  ]
 },
 {
  "id": "D1-05",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "A health insurer runs prior-authorisation triage. Claude drafts an approve, deny or refer recommendation with a citation to the governing policy clause, and a nurse reviews every draft before it is issued. Six months in, nurses change 19 percent of drafts, and those changes are captured only as free text in the case note, so nobody can say which prompt, which policy area or which document type is driving them. The architect is asked to close the feedback loop. What is the highest-value change?",
  "options": [
   {
    "key": "A",
    "text": "Inject the most recent 200 nurse corrections into the system prompt as few-shot examples, refreshed weekly by an automated job."
   },
   {
    "key": "B",
    "text": "Accumulate the corrected recommendations until there are enough to fine-tune a model on nurse-approved outputs, then cut over."
   },
   {
    "key": "C",
    "text": "Capture each change as a structured override with a reason code and the corrected clause, and promote recurring patterns into a versioned eval set that gates every prompt and model change."
   },
   {
    "key": "D",
    "text": "Add a second call that scores each draft's confidence and auto-issues drafts above a threshold, so nurses spend their review time on the uncertain cases."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "A feedback loop is only a loop when the signal is structured enough to be measured and wired to a gate that changes behaviour. Turning overrides into reason-coded data and then into a versioned eval set converts an unusable free-text trail into the mechanism that tells the team whether any future change actually helped.",
  "distractors": {
   "A": "It pushes unvetted corrections into every call with no evidence the pattern generalises, and grows the prompt without bound.",
   "B": "It trains on a correction corpus nobody has characterised, and leaves no way to tell whether the result improved anything.",
   "D": "It removes human review before the team understands why 19 percent of drafts are wrong, raising exposure on exactly the cases the model is confidently wrong about."
  },
  "objective": "Design end-to-end architectures (input, processing, output, feedback loops)",
  "src": [
   {
    "t": "Demystifying evals for AI agents: pass@k vs pass^k, grader types, building from real failures",
    "u": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "type": "doc"
   },
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D1: Design end-to-end architectures, feedback loops",
    "u": "",
    "type": "guide"
   }
  ]
 },
 {
  "id": "D1-06",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "A games publisher localises in-game dialogue into 12 languages. Linguists reject roughly 35 percent of machine drafts, almost always for register drift or inconsistent character voice rather than mistranslation. The publisher maintains a written voice guide per character and a per-language terminology glossary, and reviewers confirm that nearly every rejection can be pointed at a specific line in one of those two artefacts. Throughput must roughly triple without raising the rejection rate. Which pattern fits?",
  "options": [
   {
    "key": "A",
    "text": "Parallelization by voting: generate three independent translations per line and have a fourth call select the strongest."
   },
   {
    "key": "B",
    "text": "A prompt chain that translates, then applies glossary substitution, then runs a final tone pass over the result."
   },
   {
    "key": "C",
    "text": "An orchestrator that spawns one subagent per language, each managing its own translation, glossary lookup and self-review."
   },
   {
    "key": "D",
    "text": "An evaluator-optimizer loop where a critic call scores each draft against the character voice guide and glossary and returns targeted revisions, capped at three rounds before human review."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "Evaluator-optimizer is the right call when explicit evaluation criteria exist in writable form and iterative revision measurably improves the output, which is exactly what the voice guide and glossary provide. The iteration cap keeps cost bounded and preserves the human as the final gate rather than removing it.",
  "distractors": {
   "A": "Three drafts produced by the same model on the same prompt tend to drift the same way, so voting triples cost without a criterion that detects the fault.",
   "B": "Fixed passes apply corrections blindly with nothing measuring whether drift remains after the tone pass.",
   "C": "It parallelises across languages, which was never the bottleneck, and adds orchestration cost to a per-line quality problem."
  },
  "objective": "Select appropriate architectural patterns (workflow, agentic, augmented LLM)",
  "src": [
   {
    "t": "Building effective agents: workflows vs agents, the five patterns",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D1-07",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "A payments processor wants Claude to explain declined transactions. In the merchant dashboard the explanation panel has a p95 budget of 900 ms and needs only the decline code, the merchant's risk profile and the last three attempts, all returned by one existing service call. Separately, account managers want a weekly decline pattern review that reads across 90 days of transactions, dispute records and processor bulletins, where the questions worth asking are not known in advance. What should the architect propose?",
  "options": [
   {
    "key": "A",
    "text": "A single augmented call with the three inputs prefetched for the dashboard panel, and a separate asynchronous orchestrator-workers job for the weekly review."
   },
   {
    "key": "B",
    "text": "One agentic service for both use cases, constrained to at most two tool calls when invoked from the dashboard so the latency budget holds."
   },
   {
    "key": "C",
    "text": "A shared orchestrator-workers pipeline for both, with dashboard explanations cached by decline code so repeat lookups return inside the budget."
   },
   {
    "key": "D",
    "text": "A prompt chain for both, configured with a two-step chain for the dashboard and a longer chain for the weekly review."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "The two workloads have opposite shapes: one is a bounded, fully specified, latency-bound request, the other is open-ended and latency-insensitive, so they deserve different patterns rather than one compromise. Matching each pattern to its own service level is the business-value judgement being tested, and the simplest thing that meets the 900 ms path is one well-prompted call over prefetched context.",
  "distractors": {
   "B": "Even a capped agent loop carries planning overhead and tail variance, which is what a p95 budget is most sensitive to.",
   "C": "Caching helps only repeat decline codes, so the first request for any merchant context still misses the budget.",
   "D": "A chain forces serial calls on a request that needs one, and forces a fixed step count on work whose steps are unknown in advance."
  },
  "objective": "Align solutions to business value pillars (efficiency, transformation, productivity, cost, performance SLAs)",
  "src": [
   {
    "t": "Building effective agents: workflows vs agents, the five patterns",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   },
   {
    "t": "'Business value pillars' appears in the exam guide objective but in no Anthropic doc. Source of record is CCAR-P Prep Course 1.",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D1-08",
  "domain": "Solution Design & Architecture",
  "type": "multi",
  "stem": "A logistics firm is choosing between a workflow of predefined code paths and an agentic design for freight exception handling. The team is capable of building either and has budget for either. Which two characteristics of the work most strongly justify choosing the agentic design? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Volume is a steady 8,000 exceptions a day and finance has asked for a predictable per-case cost to put in next year's budget."
   },
   {
    "key": "B",
    "text": "The number of steps to resolve an exception cannot be known in advance, because each carrier lookup can open or close whole branches of the investigation."
   },
   {
    "key": "C",
    "text": "Five exception types account for 94 percent of cases and each has a documented remediation procedure the operations team already follows."
   },
   {
    "key": "D",
    "text": "Resolution depends on tool results that change the plan, and the system can observe whether each action succeeded and feed that back into the next decision."
   },
   {
    "key": "E",
    "text": "The audit committee wants every resolution reproducible step by step from the recorded inputs."
   }
  ],
  "correct": [
   "B",
   "D"
  ],
  "rationale": "Agents earn their cost where the path cannot be enumerated ahead of time and where the environment gives usable feedback the model can act on. Those two conditions together, open-ended trajectory plus an observable signal per action, are the standard justification for handing control of the process to the model.",
  "distractors": {
   "A": "Predictable per-case cost is an argument for a workflow, since agent runs vary with the trajectory taken.",
   "C": "A small set of documented procedures is a routing problem, not a reason to give the model control of the process.",
   "E": "Step-by-step reproducibility is easiest with predefined code paths and is weakened by letting the model choose its own route."
  },
  "objective": "Select appropriate architectural patterns (workflow, agentic, augmented LLM)",
  "src": [
   {
    "t": "Building effective agents: workflows vs agents, the five patterns",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D1-09",
  "domain": "Solution Design & Architecture",
  "type": "multi",
  "stem": "A hospital group asks for an AI that clears our referral backlog. Discovery establishes that referrals arrive as faxed PDFs and portal submissions, each must be matched to an existing patient record, clinical urgency must be graded from the referring narrative, grade-1 cases carry a 24-hour booking guarantee, and declining a referral is a clinician's decision under the group's clinical governance policy. The architect is splitting the request into model work, deterministic system work and human work. Which three assignments are correct? (Select THREE.)",
  "options": [
   {
    "key": "A",
    "text": "Declining a referral becomes model work once held-out accuracy exceeds the measured clinician baseline, with clinicians sampling a percentage for audit."
   },
   {
    "key": "B",
    "text": "Matching to a patient record is a deterministic lookup against the master patient index, with Claude used only to extract the identifiers from the document."
   },
   {
    "key": "C",
    "text": "Detecting that a fax is a repeat of a referral already in the queue is model work, since judging whether two documents describe the same case requires reading them."
   },
   {
    "key": "D",
    "text": "Grading urgency from the referring narrative is model work, with low-confidence and borderline cases routed to a clinician for grading."
   },
   {
    "key": "E",
    "text": "The 24-hour booking guarantee is enforced by the scheduling service with its own timers, alerts and escalation, not by anything the model outputs."
   }
  ],
  "correct": [
   "B",
   "D",
   "E"
  ],
  "rationale": "Good decomposition assigns each piece to the mechanism that is actually authoritative for it: identity resolution and time guarantees are deterministic system responsibilities, unstructured clinical judgement is model work with a confidence-based route to a human, and an irreversible adverse decision stays human. The test is resisting the pull to hand the whole stakeholder sentence to the model.",
  "distractors": {
   "A": "An irreversible adverse clinical decision stays with the clinician regardless of measured accuracy, because governance turns on reversibility and accountability rather than benchmark scores.",
   "C": "Duplicate detection is primarily deterministic through identifiers, hashes and near-duplicate matching, with a model useful only at the margin."
  },
  "objective": "Apply decomposition techniques for complex problem solving",
  "src": [
   {
    "t": "Building effective agents: workflows vs agents, the five patterns",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   },
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D1: Apply decomposition techniques",
    "u": "",
    "type": "guide"
   }
  ]
 },
 {
  "id": "D1-10",
  "domain": "Solution Design & Architecture",
  "type": "multi",
  "stem": "A consultancy has moved a working single-agent research assistant to a lead-agent and subagent design, because each engagement needs five independent strands investigated. The first build shows subagents repeating one another's searches, returning 30 to 40 pages of raw material each to the lead, and consuming roughly 15 times the tokens of the old single-agent run for a quality gain the partners call marginal. Which two changes most directly address the failure? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Raise the lead agent's context allocation so it can hold all five raw dumps at once and reason across them without truncation."
   },
   {
    "key": "B",
    "text": "Have the lead issue each subagent an explicit objective, source boundary, output format and effort budget, rather than forwarding a restatement of the client question."
   },
   {
    "key": "C",
    "text": "Wrap an evaluator-optimizer loop around the lead's final synthesis so quality gaps are caught before the partners see the report."
   },
   {
    "key": "D",
    "text": "Require each subagent to return a bounded structured summary with citations, leaving the raw material in a store the lead can reference on demand instead of ingesting."
   },
   {
    "key": "E",
    "text": "Replace the subagents with parallel calls to one fixed prompt, removing agency from the layer where the duplication is appearing."
   }
  ],
  "correct": [
   "B",
   "D"
  ],
  "rationale": "Both symptoms trace to delegation, not to the multi-agent choice itself: vague task descriptions cause overlapping work, and unbounded returns push the coordination cost into the lead's context. Precise task boundaries plus compact, referenceable subagent outputs are the standard orchestration fixes, and they are what make the token premium buy real parallelism.",
  "distractors": {
   "A": "More context pays for the symptom and makes synthesis worse by burying the signal in raw material.",
   "C": "A final-stage critic improves the last mile but leaves the duplicated searching and wasted tokens entirely in place.",
   "E": "Fixed parallel prompts cannot run searches whose next source depends on what the last one returned, which is the reason the design moved to subagents."
  },
  "objective": "Design multi-agent systems and orchestration strategies",
  "src": [
   {
    "t": "Multi-agent research system: lead/subagent decomposition, ~15x token cost",
    "u": "https://www.anthropic.com/engineering/multi-agent-research-system",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D1-11",
  "domain": "Solution Design & Architecture",
  "type": "match",
  "stem": "A national newspaper is rebuilding its editorial production pipeline on Claude and has put four requirements on the table, each with different characteristics of volume, determinism and open-endedness. Match each requirement to the architectural pattern that fits it best. A pattern may be used more than once, or not at all.",
  "prompts": [
   {
    "id": "p1",
    "text": "Every filed story must pass fact-flagging, legal risk review and house-style checking. The three checks are independent of one another, all three must run on every story, and their findings are merged into a single note for the editor."
   },
   {
    "id": "p2",
    "text": "Incoming wire copy must be rewritten to one of nine desk house styles, each with its own tone, length and standfirst rules. A given story belongs to exactly one desk, and the desk list changes about once a year."
   },
   {
    "id": "p3",
    "text": "Headline candidates must be scored against the paper's written headline standard, covering clarity, accuracy against the body text and character length, then revised and rescored until they pass or three attempts are exhausted."
   },
   {
    "id": "p4",
    "text": "For a long investigation, an editor asks for background on whatever people, companies and jurisdictions the piece names. The entity list is not known before the piece is read, and each entity needs a differently scoped search across different archives."
   }
  ],
  "choices": [
   "Prompt chaining",
   "Routing",
   "Parallelization",
   "Orchestrator-workers",
   "Evaluator-optimizer"
  ],
  "correct": {
   "p1": "Parallelization",
   "p2": "Routing",
   "p3": "Evaluator-optimizer",
   "p4": "Orchestrator-workers"
  },
  "rationale": "p1 is parallelization by sectioning: independent subtasks that all run and whose outputs are aggregated. p2 is routing, because the categories are known, stable and mutually exclusive. p3 is evaluator-optimizer, because an explicit written standard makes the critic's judgement actionable and iteration measurably improves the candidate. p4 is orchestrator-workers, because the subtasks are determined at run time by what the piece contains rather than fixed in advance, which is the line that separates it from parallelization. Prompt chaining fits none of the four, since no requirement here decomposes into fixed sequential steps where each step's output is the next step's input.",
  "objective": "Select appropriate architectural patterns (workflow, agentic, augmented LLM)",
  "src": [
   {
    "t": "Building effective agents: workflows vs agents, the five patterns",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D2-01",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "single",
  "stem": "A motor insurance claims triage service sends a 19,000 token system prompt containing the underwriting policy manual, the output schema and six worked examples. Cache read hit rate held at 94 percent for months. After a release that inserts a short block with the claim reference, the adjuster's name and today's date at the very top of the system prompt, hit rate fell to under 3 percent and input cost roughly tripled. Token counts per request are otherwise unchanged. What is the correct fix?",
  "options": [
   {
    "key": "A",
    "text": "Extend the cache lifetime to the one hour option so entries survive longer between claims and stop being evicted during quiet overnight periods."
   },
   {
    "key": "B",
    "text": "Strip the six worked examples from the system prompt, since a 19,000 token prefix is too large to cache economically at this request volume."
   },
   {
    "key": "C",
    "text": "Move the per-claim block to the end of the prompt, after the policy manual and examples, and set the cache breakpoint at the close of that stable content."
   },
   {
    "key": "D",
    "text": "Split the policy manual into four separately cached segments so that a change near the top only invalidates the segment that actually changed."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Caching matches on an exact prefix from the start of the prompt, so any content that varies per request must sit after everything stable. Putting a unique claim reference and date first changes byte zero on every call, which invalidates the whole prefix regardless of size or lifetime. Ordering stable content before dynamic content restores a cacheable prefix.",
  "distractors": {
   "A": "Lifetime is irrelevant when every request produces a different prefix; nothing is being evicted, it is never matching.",
   "B": "The prefix was cacheable and economic before the change; removing examples sacrifices quality without addressing the invalidation.",
   "D": "Segments still match left to right, so a varying block at position zero defeats every downstream breakpoint."
  },
  "objective": "Implement prompt reuse strategies (caching, modular prompts, Skills)",
  "src": [
   {
    "t": "Prompt caching: cacheable prefixes and breakpoints",
    "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D2-02",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "single",
  "stem": "A legal research assistant previously held a 12,000 token privacy policy document in a fixed system prompt. To improve grounding, the team moved that document into the few-shot block, where it is now re-emitted inside each of three examples that are selected per query from a library of forty. Answer quality improved slightly; cost per query rose 4.1 times and time to first token rose from 0.8 to 2.6 seconds. What is the most accurate diagnosis?",
  "options": [
   {
    "key": "A",
    "text": "Repeating the same policy three times inside one request teaches conflicting patterns, so the duplication should be collapsed to one example and grounding accepted as weaker."
   },
   {
    "key": "B",
    "text": "Forty examples is beyond the point where multishot prompting helps, so the library should be pruned to the six highest scoring examples and the policy left where it is."
   },
   {
    "key": "C",
    "text": "Example selection is being computed at request time, so the retrieval step, not the prompt layout, accounts for both the added latency and the added input tokens."
   },
   {
    "key": "D",
    "text": "The three selected examples now vary per query, so the policy text sits inside variable content and no stable cacheable prefix remains; the document should return to the static prefix and be cited by the examples."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "Anything placed inside a per-request selected block cannot be part of a reusable prefix, so relocating a large static document there converts cached reads into full priced input on every call. The fix is to keep the invariant document in the stable prefix and have the dynamic examples reference it rather than restate it.",
  "distractors": {
   "A": "Duplication is wasteful but the quality result was positive; the dominant effect is loss of cacheability, not pattern conflict.",
   "B": "Library size is not the cost driver; the same three examples would still be selected per query and still break the prefix.",
   "C": "A selection step adds milliseconds, not a 4.1 times input token increase; the tokens come from re-sending 12,000 words three times uncached."
  },
  "objective": "Optimize context windows and manage token usage",
  "src": [
   {
    "t": "Prompt caching: cacheable prefixes and breakpoints",
    "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
    "type": "doc"
   },
   {
    "t": "Multishot prompting: when examples beat instructions",
    "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D2-03",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "single",
  "stem": "A payments company moved all merchant dispute summarisation from a frontier model to the smallest available model to cut inference spend by 70 percent. Aggregate accuracy on the regression set fell only from 93 to 90 percent, which leadership accepted. Three weeks later the disputes team reports that chargeback cases involving multi-currency settlement, about 6 percent of volume, are now wrong roughly a third of the time. What should the architect do?",
  "options": [
   {
    "key": "A",
    "text": "Return all dispute traffic to the frontier model and absorb the cost, treating the accuracy regression as evidence the downsizing was unsound."
   },
   {
    "key": "B",
    "text": "Classify incoming disputes by complexity and route the multi-currency slice to the larger model, validating the split against a stratified eval set."
   },
   {
    "key": "C",
    "text": "Raise the few-shot example count for the small model until multi-currency cases reach parity, keeping one model and one prompt across all traffic."
   },
   {
    "key": "D",
    "text": "Enable extended thinking on the small model for every dispute so the harder currency reasoning has room to be worked through step by step."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "Aggregate accuracy hid a concentrated failure in a small, identifiable segment, which is the classic risk of blind downsizing. Tiered routing keeps the cost benefit on the 94 percent of simple traffic while restoring capability where it is actually needed, and a stratified eval set stops the same blind spot recurring.",
  "distractors": {
   "A": "Reverting discards a large, real saving on traffic where the small model was measurably adequate.",
   "C": "More examples cannot supply reasoning capability the model lacks, and they inflate every request including the simple majority.",
   "D": "Extended thinking on all traffic adds latency and output tokens across the whole volume to help 6 percent of it."
  },
  "objective": "Select appropriate Claude models based on trade-offs",
  "src": [
   {
    "t": "Models overview: capability, latency and cost trade-offs",
    "u": "https://platform.claude.com/docs/en/models/overview",
    "type": "doc"
   },
   {
    "t": "Demystifying evals for AI agents: pass@k vs pass^k, grader types, building from real failures",
    "u": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D2-04",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "single",
  "stem": "A drive-through voice ordering system has a p95 response budget of 900 milliseconds. After extended thinking was enabled to fix errors in computing combo pricing and tax, arithmetic accuracy rose from 88 to 99 percent but p95 latency reached 3.4 seconds and customers began talking over the assistant. The nightly reconciliation job that recomputes the same totals has no latency constraint. What is the best response?",
  "options": [
   {
    "key": "A",
    "text": "Stream the response so the customer hears speech immediately while the pricing reasoning continues to run behind the spoken opening."
   },
   {
    "key": "B",
    "text": "Remove extended thinking from the live path and expose pricing as a deterministic calculator tool, retaining thinking only in the nightly reconciliation job."
   },
   {
    "key": "C",
    "text": "Keep extended thinking live but cap the thinking budget to the smallest value that still cleared the arithmetic tests during offline evaluation."
   },
   {
    "key": "D",
    "text": "Move pricing to a second model call that runs in parallel with the conversational reply and merge the two outputs before speaking."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "Extended thinking buys reasoning at a direct cost in latency and output tokens, and arithmetic is exactly the class of work a deterministic tool does faster and more reliably than any amount of reasoning. Keeping thinking on the offline path preserves its value where the budget allows it.",
  "distractors": {
   "A": "Streaming hides some latency but the priced total still cannot be spoken until reasoning finishes, which is the part customers wait on.",
   "C": "A smaller budget reduces but does not remove the latency tax, and it trades away the accuracy gain that justified enabling it.",
   "D": "A parallel call keeps the slow reasoning on the critical path because the merge cannot complete before it does."
  },
  "objective": "Apply prompt engineering techniques (zero-shot, few-shot, chain-of-thought)",
  "src": [
   {
    "t": "Extended thinking: latency and token trade-offs",
    "u": "https://platform.claude.com/docs/en/build-with-claude/extended-thinking",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D2-05",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "single",
  "stem": "An agent performing a multi-day COBOL to Java migration runs for five to eight hours per session across hundreds of files. Around hour three it reliably begins contradicting naming and error-handling conventions it established in the first hour, and reviewers find files written after that point need rework. Tool output from build logs dominates the transcript. What is the most effective architectural change?",
  "options": [
   {
    "key": "A",
    "text": "Summarise the conversation after every tool call so the running transcript never grows large enough to approach the context limit."
   },
   {
    "key": "B",
    "text": "Split the migration across ten parallel agents, each given one subdirectory so that no single agent accumulates a long transcript."
   },
   {
    "key": "C",
    "text": "Index the full transcript into a vector store after each file and retrieve the five most similar prior turns before writing each new file."
   },
   {
    "key": "D",
    "text": "Write conventions and open decisions to a durable notes file as they are made, then compact the transcript on a threshold and re-read the notes after each compaction."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "The failure is loss of earlier decisions once the window fills with low-value build output, which is solved by moving durable state outside the context and reloading it deliberately after compaction. Structured note-taking plus compaction keeps the working set small while making the conventions survivable across the whole run.",
  "distractors": {
   "A": "Summarising every turn is lossy and expensive, and it degrades exactly the decision detail that needs to persist.",
   "B": "Parallel agents shorten each transcript but give ten agents no shared conventions, which multiplies the inconsistency rather than fixing it.",
   "C": "Similarity retrieval over transcript turns surfaces related code, not the governing conventions, which are rarely the nearest neighbours."
  },
  "objective": "Optimize context windows and manage token usage",
  "src": [
   {
    "t": "Effective context engineering for AI agents: compaction, structured note-taking",
    "u": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
    "type": "doc"
   },
   {
    "t": "Context windows",
    "u": "https://platform.claude.com/docs/en/build-with-claude/context-windows",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D2-06",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "multi",
  "stem": "A radiology reporting assistant currently uses a 400 word instruction describing the house reporting style. A team member proposes replacing part of that instruction with eight full worked report examples, adding about 5,000 tokens per request. Which two conditions would justify spending that context on examples rather than instructions? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "The reporting rules are published, numbered and unambiguous, and the failures are cases where the model skipped a rule it clearly had access to."
   },
   {
    "key": "B",
    "text": "The desired style involves tacit conventions about hedging and ordering of findings that reviewers recognise on sight but cannot state as rules."
   },
   {
    "key": "C",
    "text": "The team wants the model to explain which rule drove each phrasing decision so auditors can trace the report back to policy."
   },
   {
    "key": "D",
    "text": "Outputs must conform to an unusual sectioned layout that the instruction describes correctly yet the model reproduces inconsistently across runs."
   },
   {
    "key": "E",
    "text": "Examples would be placed in the stable prefix, so the additional tokens would be served as cache reads on the great majority of requests."
   }
  ],
  "correct": [
   "B",
   "D"
  ],
  "rationale": "Few-shot earns its context when the target behaviour is easier to demonstrate than to state, either because it is tacit or because a stated rule is not being followed reliably in form. Both conditions describe a demonstration gap that no amount of additional instruction text closes.",
  "distractors": {
   "A": "Clear, explicit rules that are being skipped point to an instruction adherence or prompt structure problem, not a shortage of examples.",
   "C": "Traceable rule citation is a reasoning and output-format requirement that instructions and a schema handle directly.",
   "E": "Cacheability makes examples cheaper but is a cost argument, not evidence that examples improve the output."
  },
  "objective": "Apply prompt engineering techniques (zero-shot, few-shot, chain-of-thought)",
  "src": [
   {
    "t": "Multishot prompting: when examples beat instructions",
    "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D2-07",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "multi",
  "stem": "A logistics firm has four internal agents that each carry a near-identical 3,000 word block covering customs paperwork rules, pasted into four separate system prompts. The rules changed twice last quarter and one agent was updated late, producing incorrect declarations for nine days. An architect proposes packaging the customs guidance as an Agent Skill. Which three statements correctly describe what this buys and what it does not? (Select THREE.)",
  "options": [
   {
    "key": "A",
    "text": "The guidance becomes a single versioned artefact, so a rules change is made once and every consuming agent picks up the same revision."
   },
   {
    "key": "B",
    "text": "Packaging as a Skill guarantees the guidance is consulted, since Skills are injected ahead of the system prompt and cannot be overridden by it."
   },
   {
    "key": "C",
    "text": "Skill content can be loaded when the task calls for it rather than occupying every system prompt permanently, which frees context on unrelated requests."
   },
   {
    "key": "D",
    "text": "Because Skills are loaded per invocation, the four agents can no longer benefit from prompt caching on any part of their prompts."
   },
   {
    "key": "E",
    "text": "The Skill still needs its own review, testing and rollback path, because a bad revision now propagates to all four agents at once."
   }
  ],
  "correct": [
   "A",
   "C",
   "E"
  ],
  "rationale": "Skills package instructions as modular, reusable and versioned units that are brought in when relevant, which removes the copy-paste drift that caused the nine-day defect and keeps unrelated requests lean. Centralisation also concentrates blast radius, so the Skill inherits the release discipline the four copies used to spread out.",
  "distractors": {
   "B": "A Skill supplies content; it does not override the system prompt or guarantee the model acts on it, so guardrails and evals are still needed.",
   "D": "Skill content that is stable across requests can sit in a cacheable prefix like any other static block."
  },
  "objective": "Implement prompt reuse strategies (caching, modular prompts, Skills)",
  "src": [
   {
    "t": "Agent Skills overview: modular, versioned instruction packaging",
    "u": "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D2-08",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "multi",
  "stem": "An energy trading research agent performs well for roughly twenty tool calls, then starts re-fetching data it already has and citing a price curve that was superseded forty turns earlier. The team has spent two weeks rewording the system prompt with no improvement. An architect states that this is a context engineering problem rather than a prompt engineering one. Which two changes follow from that diagnosis? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Add a firmly worded instruction near the top of the system prompt telling the agent never to re-fetch an instrument it has already retrieved."
   },
   {
    "key": "B",
    "text": "Add three worked examples showing correct curve selection so the model can pattern match the right version at each decision point."
   },
   {
    "key": "C",
    "text": "Maintain an explicit working state record of fetched instruments and current curve versions, refreshed into the window and pruned as the run proceeds."
   },
   {
    "key": "D",
    "text": "Lower temperature and constrain the output schema so the agent's citations become more deterministic and easier to validate."
   },
   {
    "key": "E",
    "text": "Return compact structured summaries from the market data tools instead of full payloads, and keep raw responses in an external store addressed by reference."
   }
  ],
  "correct": [
   "C",
   "E"
  ],
  "rationale": "Prompt engineering shapes the instruction; context engineering curates what occupies the window across a long run, which is where a twenty-turn cliff and stale references originate. Externalising bulky tool payloads and maintaining an explicit, pruned state record attack the actual cause, namely that the relevant facts have been crowded out or superseded in place.",
  "distractors": {
   "A": "Stronger wording is more of the intervention that already failed for two weeks, and it cannot help once the relevant facts have left the usable window.",
   "B": "Examples consume more of the window that is already the constraint and do not track which curve is current at turn sixty.",
   "D": "Decoding settings and schemas affect output form, not which facts remain available to reason over."
  },
  "objective": "Optimize context windows and manage token usage",
  "src": [
   {
    "t": "Effective context engineering for AI agents: compaction, structured note-taking",
    "u": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-01",
  "domain": "Integration",
  "type": "single",
  "stem": "A reconciliation agent at a payments firm exposes 214 tools drawn from nine MCP servers. Tool definitions occupy roughly 61,000 tokens of every request, the cached prefix invalidates whenever any server edits a description, and evaluation shows the agent selects the wrong settlement tool in 18 percent of runs where several tools have similar names. Six tools account for 80 percent of all calls. What should the architect change first?",
  "options": [
   {
    "key": "A",
    "text": "Compress every tool description to a single line and strip the examples from the input schemas, cutting the definition block to roughly 18,000 tokens."
   },
   {
    "key": "B",
    "text": "Replace the nine servers with nine subagents, one per server, and have an orchestrator route each task to the subagent that owns the relevant server."
   },
   {
    "key": "C",
    "text": "Keep the six high-traffic tools loaded and mark the remaining tools defer_loading, letting the Tool Search Tool pull definitions into context only when a task needs them."
   },
   {
    "key": "D",
    "text": "Move the workload to a model with a larger context window and add tool use examples to all 214 definitions to improve selection accuracy."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Deferred loading with the Tool Search Tool removes the definitions from the default request instead of paying for them, and keeping the hot six resident preserves a stable cache prefix for the common path. It also improves selection, because the model chooses among a handful of searched candidates rather than 214 near-duplicates.",
  "distractors": {
   "A": "Stripping schema detail deletes exactly the disambiguating information the 18 percent selection errors depend on, and the prefix still churns on every description edit.",
   "B": "Subagent-per-server routes by system ownership rather than by task, adds orchestration hops and latency, and each subagent still loads a full server of definitions.",
   "D": "A bigger window pays for the bloat rather than removing it, and adding examples to all 214 tools increases the token load and worsens prefix instability."
  },
  "objective": "Evaluate tool/agent configuration for capability bloat",
  "src": [
   {
    "t": "Advanced tool use: Tool Search Tool, defer_loading, programmatic tool calling",
    "u": "https://www.anthropic.com/engineering/advanced-tool-use",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-02",
  "domain": "Integration",
  "type": "single",
  "stem": "A hospital network runs a clinical summarisation agent over an MCP server fronting the EHR. The server authenticates with one service account that can read all 2.3 million patient records, and the treating clinician is identified only in the system prompt, which names their caseload. An internal audit found 61 retrievals of records outside the clinician caseload, all triggered by clinicians pasting medical record numbers received by email. What is the correct remediation?",
  "options": [
   {
    "key": "A",
    "text": "Add a system prompt rule forbidding retrieval outside the caseload and a pre-call validation step that compares the requested record number against the caseload list."
   },
   {
    "key": "B",
    "text": "Propagate the clinician identity to the MCP server through OAuth token exchange so the EHR enforces that clinician's existing record-level permissions on every call."
   },
   {
    "key": "C",
    "text": "Require the clinician to confirm each retrieval in the interface before the tool executes, and store the confirmation with the record number and timestamp."
   },
   {
    "key": "D",
    "text": "Rotate the service account credential weekly, restrict the MCP server to a private subnet, and retain all query logs for seven years."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "The gap is that the agent holds more authority than any of its users, so authorisation must be evaluated by the system of record against the end user identity rather than reconstructed in the agent layer. Identity propagation makes the over-broad access structurally impossible instead of conditionally discouraged.",
  "distractors": {
   "A": "Prompt rules are not an access control, and a caseload check inside the agent layer still leaves the agent holding a credential that can read every record.",
   "C": "Confirmation dialogs record intent but grant no less access; a clinician who pasted the number will confirm it, and the retrieval still succeeds.",
   "D": "Rotation, network isolation and retention are hygiene and detection; none of them prevents an over-scoped credential from reading records the clinician may not see."
  },
  "objective": "Analyze authentication and authorization requirements to identify security gaps",
  "src": [
   {
    "t": "MCP security best practices: audience validation, least-privilege scopes",
    "u": "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices",
    "type": "doc"
   },
   {
    "t": "MCP connector",
    "u": "https://platform.claude.com/docs/en/agents-and-tools/mcp-connector",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-03",
  "domain": "Integration",
  "type": "single",
  "stem": "A motor insurer runs an agent that settles claims end to end with a median cycle of 40 seconds. Evaluation on 9,000 historical claims shows 96.2 percent correct settlements below 2,000 in value, but 78 percent above 25,000, where policy exclusions require interpreting prior-damage history. High-value claims are 3 percent of volume and 61 percent of the money paid. The COO wants cycle time reduced further. Which configuration should the architect defend?",
  "options": [
   {
    "key": "A",
    "text": "Extend full autonomy across all value bands and add a nightly review of a 2 percent random sample of settled claims to catch systematic errors early."
   },
   {
    "key": "B",
    "text": "Route every claim through the largest model with extended thinking enabled, keeping full autonomy and accepting the higher median cycle time across all bands."
   },
   {
    "key": "C",
    "text": "Preserve the current autonomy bands and cut cycle time further by trimming retrieved policy context to the three highest-scoring clauses per claim file."
   },
   {
    "key": "D",
    "text": "Keep autonomy below 2,000 and require adjuster approval above 25,000, with the cited exclusions shown for confirmation, accepting slower handling on 3 percent of volume."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "The accuracy requirement is not uniform across the workload, so latency should be spent where the cost of an error concentrates rather than spread evenly. Tiering autonomy by exposure keeps the fast path for 97 percent of volume while putting a human on the decisions that carry 61 percent of the money.",
  "distractors": {
   "A": "Sampled post-hoc review finds errors after the money has left, and a 2 percent sample of a 3 percent band will rarely see a high-value mistake at all.",
   "B": "A larger model slows the 96 percent that is already correct and does not resolve exclusion interpretation, which is a policy judgement rather than a reasoning-depth problem.",
   "C": "Trimming policy context attacks latency by reducing the evidence available on exactly the claims that are already failing on exclusion detail."
  },
  "objective": "Evaluate accuracy-latency trade-offs and justify configuration decisions",
  "src": [
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D3: Evaluate accuracy-latency trade-offs",
    "u": "",
    "type": "guide"
   },
   {
    "t": "No vendor doc prescribes human-in-the-loop routing design. Principle is derived from control-placement and reversibility reasoning; source of record is CCAR-P Prep Course 3, Responsible AI, Safety & Risk (114 min).",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D3-04",
  "domain": "Integration",
  "type": "single",
  "stem": "A travel retailer runs 4.1 million agent sessions a month, averaging 14 tool calls per session. Full trace capture now accounts for 31 percent of platform spend. Failures are rare at 0.4 percent of sessions but always multi-step: the agent loops between two availability tools, refetches stale inventory, then returns an itinerary with an invalid connection. The platform team proposes cutting capture to a uniform 1 percent head sample. How should the architect respond?",
  "options": [
   {
    "key": "A",
    "text": "Accept the 1 percent head sample and compensate with aggregate metrics for tool error rate, step count and token spend, charted per route and per model version."
   },
   {
    "key": "B",
    "text": "Buffer spans per session and retain the full trace whenever a session errors, escalates, exceeds a step or latency threshold or draws negative feedback, plus a baseline sample."
   },
   {
    "key": "C",
    "text": "Retain 100 percent coverage but store only the first and last model turn of each session, discarding the intermediate tool spans and their arguments to cut storage volume."
   },
   {
    "key": "D",
    "text": "Raise the head sample to 10 percent, extend retention from 14 days to 90 days, and index stored traces by outcome so that rare failures accumulate for later analysis."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "Head sampling decides what to keep before the session is known to be interesting, so a uniform rate discards almost every one of the rare failures that justify tracing at all. Deciding at the end of the session keeps full multi-step traces for anomalies at a fraction of the cost, with a baseline sample preserved for comparison against healthy runs.",
  "distractors": {
   "A": "A 1 percent head sample captures roughly one in 250 failing sessions, and aggregate counters cannot reconstruct the loop-and-refetch sequence that causes the bad itinerary.",
   "C": "The intermediate tool spans are precisely where the loop happens; first and last turn coverage shows the wrong answer but never how it was produced.",
   "D": "Ten percent still misses 90 percent of failures and triples the cost the team is trying to reduce; longer retention keeps more of the wrong data."
  },
  "objective": "Analyze observability challenges and select monitoring strategies at scale",
  "src": [
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D3: Analyze observability challenges at scale",
    "u": "",
    "type": "guide"
   },
   {
    "t": "Demystifying evals for AI agents: pass@k vs pass^k, grader types, building from real failures",
    "u": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-05",
  "domain": "Integration",
  "type": "single",
  "stem": "An energy company indexes 900 regulatory filings, each 30 to 80 pages, as 512-token chunks with 50-token overlap, retrieving the top 10 by embedding similarity. Answers frequently attribute an obligation to the wrong entity: a retrieved chunk states that the Operator must notify the Authority within 30 days of such an event, while the operator, the authority and the triggering event are defined many pages earlier. Adding a keyword index alone did not help. Which pipeline change addresses the failure?",
  "options": [
   {
    "key": "A",
    "text": "Generate a passage situating each chunk in its filing, naming the entity, section and triggering event, prepend it before embedding, index the same text for BM25, and rerank."
   },
   {
    "key": "B",
    "text": "Increase chunk size to 4,000 tokens with 800-token overlap so that each chunk is likely to carry the definitions, parties and cross-references its obligations depend on."
   },
   {
    "key": "C",
    "text": "Store the parent document and section identifier with each chunk and expand every retrieved chunk to its full parent section before passing the result to the model."
   },
   {
    "key": "D",
    "text": "Fine-tune the embedding model on the filing corpus so that it learns the regulatory vocabulary, the entity naming conventions and the house drafting style."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "The chunks are individually well-formed but semantically orphaned, so both the vector and the keyword representation lack the entity and event terms the query uses. Contextual retrieval repairs the representation itself, which is why the contextualised text must go into both the embedding and the BM25 index, with reranking to order the fused candidates.",
  "distractors": {
   "B": "Larger chunks dilute the embedding and reduce precision, and definitions sitting 40 pages away still fall outside a 4,000-token window.",
   "C": "Parent expansion pushes 30-page sections into context, crowding out other evidence, and the defined terms often live in a different section entirely.",
   "D": "Fine-tuning teaches vocabulary, not which operator this chunk refers to; the missing information is absent from the chunk rather than poorly encoded."
  },
  "objective": "Design a RAG pipeline with appropriate chunking and indexing strategies",
  "src": [
   {
    "t": "Contextual retrieval: contextual embeddings plus contextual BM25, reranking",
    "u": "https://www.anthropic.com/engineering/contextual-retrieval",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-06",
  "domain": "Integration",
  "type": "single",
  "stem": "A SaaS vendor indexed 4.2 million support ticket rows into a vector store, one embedding per row serialised as text containing ticket id, region, product, priority, timestamps and the customer description. Narrative questions such as what customers report about sync failures work well. Questions such as how many priority-one tickets EMEA opened in Q3 compared with Q2 return confident counts that are wrong, because the model summarises the 20 retrieved rows as though they were the full set. What is the correct fix?",
  "options": [
   {
    "key": "A",
    "text": "Raise top_k from 20 to 500 and instruct the model to count only the rows actually returned and to state explicitly that the resulting count may be partial."
   },
   {
    "key": "B",
    "text": "Add a cross-encoder reranker so that the 20 rows surfaced for each question are the most relevant ones for the region and period being aggregated."
   },
   {
    "key": "C",
    "text": "Route by query shape: send aggregation and filter queries to a parameterised SQL tool over the ticket table, and keep vector search for the free-text description field."
   },
   {
    "key": "D",
    "text": "Re-chunk the corpus so that each vector holds one month of tickets for one region, giving the model pre-grouped totals to read from instead of raw rows."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Similarity search returns a ranked subset by design, which can never answer a question whose correct answer depends on completeness. Matching the retrieval mechanism to the data shape means aggregations go to the structured store that can compute them exactly, while unstructured narrative stays in the vector path.",
  "distractors": {
   "A": "Five hundred rows is still a subset, so the count remains wrong; it merely becomes expensive and hedged.",
   "B": "Reranking improves relevance ordering, which is irrelevant when the defect is that the result set is incomplete rather than badly ordered.",
   "D": "Pre-grouped chunks freeze one grouping; the next question asks by product, by severity or by month and the index cannot answer it."
  },
  "objective": "Apply retrieval strategies matched to data shape and query pattern",
  "src": [
   {
    "t": "Embeddings",
    "u": "https://platform.claude.com/docs/en/build-with-claude/embeddings",
    "type": "doc"
   },
   {
    "t": "Contextual retrieval: contextual embeddings plus contextual BM25, reranking",
    "u": "https://www.anthropic.com/engineering/contextual-retrieval",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-07",
  "domain": "Integration",
  "type": "single",
  "stem": "A logistics provider has six product teams that each built a separate HTTP wrapper over the same warehouse inventory service. The wrappers have drifted, three cache stale quantities, and the inventory tool surface changes roughly monthly. Two needs must be served: interactive agents inside six applications, each call carrying the warehouse operator identity, and one nightly job that re-prices 8.4 million SKUs with no interactivity and a 24-hour tolerance. What should the architect propose?",
  "options": [
   {
    "key": "A",
    "text": "Publish an internal Python SDK that all six teams import for inventory access, and leave the nightly re-pricing job running on its current path."
   },
   {
    "key": "B",
    "text": "Put every inventory interaction, including the nightly re-pricing job, behind a single MCP server so that there is one integration surface to maintain and version."
   },
   {
    "key": "C",
    "text": "Have each team's agent call the other teams' agents over an agent-to-agent protocol whenever it needs inventory, so that ownership stays with each product team."
   },
   {
    "key": "D",
    "text": "Expose the inventory service once as an MCP server with scoped tools for the six interactive agents, and keep the nightly re-pricing on the existing bulk batch API."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "MCP earns its cost where many clients need dynamic discovery of a changing tool surface with per-user authorisation, which describes the six interactive agents exactly. The nightly job has no discovery requirement and is throughput-bound, so routing 8.4 million records through per-call tool invocation adds overhead with no benefit.",
  "distractors": {
   "A": "A shared SDK fixes duplication but not discovery: every tool change means a version bump and six coordinated releases, and identity handling stays per team.",
   "B": "Forcing a bulk workload through an interactive protocol multiplies per-call overhead and abandons the cost advantage of batch processing.",
   "C": "Agent-to-agent is for autonomous parties with private state negotiating; here all six teams want the same deterministic inventory data from one system."
  },
  "objective": "Evaluate connection protocols and select the appropriate integration mechanism (MCP, API/CLI, agent-to-agent)",
  "src": [
   {
    "t": "MCP connector",
    "u": "https://platform.claude.com/docs/en/agents-and-tools/mcp-connector",
    "type": "doc"
   },
   {
    "t": "Batch processing: asynchronous workloads at roughly half cost",
    "u": "https://platform.claude.com/docs/en/build-with-claude/batch-processing",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-08",
  "domain": "Integration",
  "type": "single",
  "stem": "A biotech analytics agent connects to a LIMS through MCP. A typical run calls list_samples, which returns about 12,000 JSON rows, filters them by assay and collection date, joins the survivors to a 3,000-row plate map, and summarises 40 results. Context fills before the second query completes, cost is about 6 USD per run, and the connected servers publish 1,100 tool definitions that all load upfront. Which change addresses the dominant cost?",
  "options": [
   {
    "key": "A",
    "text": "Enable the Tool Search Tool so that only the LIMS tool definitions a run actually needs are loaded into context, keeping the current call-and-return loop for the data itself."
   },
   {
    "key": "B",
    "text": "Put the MCP servers behind a code execution tool so the model writes code that imports only the tools it needs and filters and joins in the sandbox, returning only the 40 rows."
   },
   {
    "key": "C",
    "text": "Paginate list_samples at 100 rows per call and have the agent accumulate matching rows across pages until the requested assay and date range is exhausted."
   },
   {
    "key": "D",
    "text": "Pass every intermediate tool result through a cheaper model that summarises it down to a few hundred tokens before the result re-enters the agent context."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "Two kinds of bloat are present, definition bloat and intermediate result bloat, and here the 15,000 rows of intermediate data dominate. Progressive disclosure through code execution addresses both: tool definitions are discovered as files and imported on demand, and the large intermediates stay in the sandbox so only the final 40 rows are tokenised.",
  "distractors": {
   "A": "Tool search removes definition overhead but every one of the 12,000 rows still passes through context, which is the larger cost.",
   "C": "Pagination turns one large payload into 120 turns, increasing latency and total tokens because each page still enters context.",
   "D": "Summarising intermediates is lossy on data that must be joined exactly, and adds a model call and latency to every step."
  },
  "objective": "Evaluate progressive discovery vs. monolithic context strategy",
  "src": [
   {
    "t": "Code execution with MCP: progressive disclosure vs loading all definitions",
    "u": "https://www.anthropic.com/engineering/code-execution-with-mcp",
    "type": "doc"
   },
   {
    "t": "Advanced tool use: Tool Search Tool, defer_loading, programmatic tool calling",
    "u": "https://www.anthropic.com/engineering/advanced-tool-use",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-09",
  "domain": "Integration",
  "type": "multi",
  "stem": "A vendor ships a remote MCP server that enterprise customers connect to their own Claude deployments. A penetration test reports three findings: the server accepts any well-formed bearer token and forwards it unchanged to the customer CRM API, all tools execute under one workspace-wide CRM credential, and issued tokens never expire. Which TWO changes close the authorization gaps rather than the surrounding hygiene issues? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Issue each customer a long-lived API key held in their MCP client configuration and scope that key to the customer workspace and its CRM objects."
   },
   {
    "key": "B",
    "text": "Validate that each incoming access token names this MCP server as its audience and reject tokens minted for other services instead of passing them through."
   },
   {
    "key": "C",
    "text": "Mint downstream credentials per end user with the narrowest scope each tool requires, so a read-only tool cannot obtain write access to the CRM."
   },
   {
    "key": "D",
    "text": "Terminate all client traffic over mutual TLS and pin each customer certificate at the edge gateway that fronts the MCP server endpoints."
   },
   {
    "key": "E",
    "text": "Record every tool invocation with caller, arguments and a result hash, and alert on per-tenant volume anomalies outside business hours."
   }
  ],
  "correct": [
   "B",
   "C"
  ],
  "rationale": "Token passthrough lets a token obtained for any other service act on this server, and a single workspace credential means every tool inherits the union of all permissions. Audience validation fixes who may call, and per-user least-privilege scopes fix what each call may do; together they remove the confused-deputy position the server currently occupies.",
  "distractors": {
   "A": "A long-lived shared key reproduces the same over-broad, non-expiring credential the test already flagged, just one per tenant.",
   "D": "Mutual TLS authenticates the transport and the client machine, not the acting user, and does nothing about scope.",
   "E": "Audit logging and anomaly alerting are valuable detection, but they observe misuse rather than prevent it."
  },
  "objective": "Analyze authentication and authorization requirements to identify security gaps",
  "src": [
   {
    "t": "MCP security best practices: audience validation, least-privilege scopes",
    "u": "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-10",
  "domain": "Integration",
  "type": "multi",
  "stem": "A media archive migrated a 14 million chunk index from a 768-dimension embedding model to a 1024-dimension successor over a weekend, writing new vectors into the same collection as old ones were deleted in batches. The query path kept using the old encoder for six hours before anyone noticed. Recall at 10 on the golden set fell from 0.91 to 0.34, and the support assistant returned vague answers without a single error being raised. Which THREE actions should the architect require before the next re-index? (Select THREE.)",
  "options": [
   {
    "key": "A",
    "text": "Record the embedding model and version in index metadata and reject or reroute any query whose encoder version does not match the collection."
   },
   {
    "key": "B",
    "text": "Build the new index in a separate collection, shadow-evaluate it on the golden set, and cut over behind a version flag with the previous collection kept for rollback."
   },
   {
    "key": "C",
    "text": "Emit per-query retrieval telemetry such as top-score distribution and citation rate, with drift alerting, so a silent recall collapse pages someone within minutes."
   },
   {
    "key": "D",
    "text": "Raise top_k from 10 to 50 for the duration of any migration window so that a partially degraded index still surfaces some relevant chunks to the model."
   },
   {
    "key": "E",
    "text": "Add a cross-encoder reranker over the candidate set so that result ordering is corrected regardless of which encoder version produced the stored vectors."
   }
  ],
  "correct": [
   "A",
   "B",
   "C"
  ],
  "rationale": "Query and document embeddings must come from the same model, so version identity belongs in the index contract rather than in deployment discipline. Blue-green indexing with a golden-set gate prevents a half-migrated collection from ever serving traffic, and retrieval telemetry is required because embedding mismatch degrades silently: nothing throws, answers merely get worse.",
  "distractors": {
   "D": "Fifty mismatched neighbours are still mismatched; widening k raises cost and dilutes context without recovering recall.",
   "E": "A reranker can only reorder the candidates retrieval supplied, and with an encoder mismatch the right chunks are not in the candidate set."
  },
  "objective": "Design a RAG pipeline with appropriate chunking and indexing strategies",
  "src": [
   {
    "t": "Embeddings",
    "u": "https://platform.claude.com/docs/en/build-with-claude/embeddings",
    "type": "doc"
   },
   {
    "t": "Contextual retrieval: contextual embeddings plus contextual BM25, reranking",
    "u": "https://www.anthropic.com/engineering/contextual-retrieval",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-11",
  "domain": "Integration",
  "type": "multi",
  "stem": "An insurer triage agent calls a third-party fraud-score API through MCP. The API times out on about 4 percent of calls at peak. After an incident the team raised maximum retries from 3 to 8 and the timeout from 10 to 60 seconds, and the API gateway in front of it also retries twice. Since the change, p99 session latency has gone from 22 seconds to just over 4 minutes and the peak timeout rate has risen to 11 percent. Which TWO changes should the architect make? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Enforce a per-request retry budget with exponential backoff and jitter, applied at one layer only and restricted to calls that are safely idempotent."
   },
   {
    "key": "B",
    "text": "Open a circuit breaker when the rolling error rate crosses a threshold, failing fast to a degraded path that triages without the score and flags the claim for review."
   },
   {
    "key": "C",
    "text": "Raise the timeout again to 120 seconds so that slow upstream responses have time to complete instead of being abandoned and retried at peak."
   },
   {
    "key": "D",
    "text": "Have the model estimate a fraud score from the claim narrative whenever the scoring API is slow, so that the pipeline always produces a score for triage."
   },
   {
    "key": "E",
    "text": "Place a queue in front of the fraud API and process every claim asynchronously, notifying all customers of the triage outcome later by email."
   }
  ],
  "correct": [
   "A",
   "B"
  ],
  "rationale": "Multiplied retries across two layers turned a 4 percent failure into self-inflicted load, which is why the timeout rate rose after the change: the system is now generating its own congestion. Budgeted retries with jitter stop the amplification and a circuit breaker converts a slow failure into a fast, explicit one with a defined degraded outcome.",
  "distractors": {
   "C": "A longer timeout holds connections and agent turns open, pushing p99 further out while the upstream is already saturated.",
   "D": "Substituting an unvalidated model estimate for a fraud score fabricates a risk signal and hides the outage from downstream controls.",
   "E": "Making 100 percent of claims asynchronous changes the product for every customer to accommodate a 4 percent failure path."
  },
  "objective": "Evaluate accuracy-latency trade-offs and justify configuration decisions",
  "src": [
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D3: Evaluate accuracy-latency trade-offs",
    "u": "",
    "type": "guide"
   },
   {
    "t": "Reduce latency",
    "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D3-12",
  "domain": "Integration",
  "type": "match",
  "stem": "A logistics operator is planning four integrations for the coming quarter, each with a different interaction pattern, and wants one mechanism chosen per requirement rather than a single standard imposed everywhere. Match each requirement to the connection mechanism that best fits it. A mechanism may be used more than once or not at all.",
  "prompts": [
   {
    "id": "p1",
    "text": "Thirty internal agents across five applications must call warehouse operations tools whose set changes every few weeks, with every call carrying the individual operator identity and permissions."
   },
   {
    "id": "p2",
    "text": "Every night, 8.4 million shipment records must be re-scored for delay risk; nothing is interactive, and results are needed within 24 hours at the lowest possible cost per record."
   },
   {
    "id": "p3",
    "text": "A partner carrier's autonomous planning agent must negotiate dock slot allocations with the operator's own agent, with each side keeping its internal tools, pricing rules and customer data private."
   },
   {
    "id": "p4",
    "text": "A public currency conversion endpoint with two parameters and a stable published contract is called at most once per conversation and requires no discovery."
   }
  ],
  "choices": [
   "Expose it through an MCP server with scoped tools",
   "Call it directly as a REST API from the application layer",
   "Submit the work through the Message Batches API",
   "Use an agent-to-agent protocol between the two autonomous agents"
  ],
  "correct": {
   "p1": "Expose it through an MCP server with scoped tools",
   "p2": "Submit the work through the Message Batches API",
   "p3": "Use an agent-to-agent protocol between the two autonomous agents",
   "p4": "Call it directly as a REST API from the application layer"
  },
  "rationale": "The discriminators are discovery need, interactivity and trust boundary. MCP pays for itself when many clients must discover a changing tool surface under per-user authorisation; batch processing suits high-volume latency-tolerant work; agent-to-agent fits autonomous parties negotiating across an organisational boundary with private state; and a stable two-parameter endpoint called once needs nothing more than a direct REST call, since wrapping it in a protocol adds maintenance without adding capability.",
  "objective": "Evaluate connection protocols and select the appropriate integration mechanism (MCP, API/CLI, agent-to-agent)",
  "src": [
   {
    "t": "MCP connector",
    "u": "https://platform.claude.com/docs/en/agents-and-tools/mcp-connector",
    "type": "doc"
   },
   {
    "t": "Batch processing: asynchronous workloads at roughly half cost",
    "u": "https://platform.claude.com/docs/en/build-with-claude/batch-processing",
    "type": "doc"
   },
   {
    "t": "MCP security best practices: audience validation, least-privilege scopes",
    "u": "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D4-01",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "A freight forwarder runs an agent that files customs declarations unattended, roughly 400 filings per night, and a single malformed filing triggers a manual clearance review. The team reports the agent at 96% pass@5 and argues it is production ready. An architect reviewing the eval design objects that the reported metric does not describe the risk the business actually carries. Which metric should the gate be built on?",
  "options": [
   {
    "key": "A",
    "text": "pass@5, because it shows a correct declaration is reachable within five attempts and retries cost little"
   },
   {
    "key": "B",
    "text": "pass^5, because it measures the share of cases that succeed on every one of five independent runs, matching a task that must be right unattended"
   },
   {
    "key": "C",
    "text": "Mean per-run accuracy across the 400 nightly cases, weighted by the declared value of each shipment"
   },
   {
    "key": "D",
    "text": "A single greedy run at temperature zero, because deterministic sampling removes the need for any repeated-trial metric"
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "pass^k is the reliability metric: it asks how often the system succeeds on all k independent attempts, which is what an unattended repeated production task requires. pass@k is a capability or reachability metric, appropriate when a human or a verifier can select the good attempt from several. The distinction is which failure the business pays for, and here nobody is present to pick the winning sample.",
  "distractors": {
   "A": "pass@k assumes something can select the correct attempt; unattended filing has no selector, so a lucky run in five is not a pass.",
   "C": "Value weighting reports commercial exposure but still averages away the consistency question the unattended workflow depends on.",
   "D": "Temperature zero reduces variance but does not eliminate it, and it discards the repeated-trial evidence the reliability claim needs."
  },
  "objective": "Define evaluation metrics (accuracy, latency, cost, safety, security)",
  "src": [
   {
    "t": "Demystifying evals for AI agents: pass@k vs pass^k, grader types, building from real failures",
    "u": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D4-02",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "A payments firm uses Claude to extract IBAN, amount and value date from scanned remittance advice into a fixed JSON schema. The eval harness sends each output to an LLM judge that scores extraction quality from 1 to 5 against a rubric; the suite reports a 94% pass rate. Meanwhile the payment rail rejects about 3% of files for invalid IBAN checksums and transposed digits. What is the correct change to the eval framework?",
  "options": [
   {
    "key": "A",
    "text": "Replace the judge on these fields with code-based assertions: exact field match against labelled ground truth plus IBAN checksum and date-format validation"
   },
   {
    "key": "B",
    "text": "Move the judge to a larger model and lower its temperature, so scoring of the extracted fields becomes more discriminating"
   },
   {
    "key": "C",
    "text": "Expand the judge rubric with worked examples of transposed digits and require it to cite the source span for each field"
   },
   {
    "key": "D",
    "text": "Route 10% of outputs to human reviewers and treat their agreement with the judge as the accuracy figure"
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "Model-based grading is for outputs with no single verifiable answer, such as tone, summary faithfulness or helpfulness. These fields have exactly one correct value and a machine-checkable structure, so a deterministic code-based grader is both cheaper and strictly more accurate; an LLM judge scoring digits will rate a transposed IBAN as looking correct. The principle is to match grader type to whether ground truth is verifiable, not to grader sophistication.",
  "distractors": {
   "B": "A better judge model still approximates a check that arithmetic can perform exactly; the failure mode is the grader class, not its capacity.",
   "C": "Rubric engineering adds cost and latency to reach, at best, what a checksum already guarantees for free.",
   "D": "Human review is the right grader for subjective disputes, but here it audits a judge that should not be scoring these fields at all."
  },
  "objective": "Design evaluation datasets and test frameworks using mixed methodologies",
  "src": [
   {
    "t": "Demystifying evals for AI agents: pass@k vs pass^k, grader types, building from real failures",
    "u": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "type": "doc"
   },
   {
    "t": "Define success criteria and build evaluations",
    "u": "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D4-03",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "A legal research assistant answers questions over 90,000 indexed contracts. On Tuesday the corpus was re-ingested with a revised chunking strategy. From Wednesday, answers cite clauses from the wrong agreements while remaining fluent and confidently worded. The model version, system prompt, temperature and p95 latency are all unchanged from Monday. What should the team do first?",
  "options": [
   {
    "key": "A",
    "text": "Measure retrieval directly on the failing questions: check whether the gold chunk appears in the top k results before changing any prompt or model"
   },
   {
    "key": "B",
    "text": "Add a stronger grounding instruction telling the model to answer only from supplied context and to abstain when the clause is absent"
   },
   {
    "key": "C",
    "text": "Promote the workload to a more capable model, since confident citation of the wrong clause indicates a reasoning limitation"
   },
   {
    "key": "D",
    "text": "Enable extended thinking so the model can reconcile competing clauses before committing to a citation"
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "Quality fell immediately after a change to the data layer while model, prompt and latency held constant, so the retrieval or indexing layer is the first suspect and recall@k on the failing queries is the cheapest decisive measurement. The general rule is to measure before optimising and to suspect the component that actually changed. Wrong-clause citation with correct fluency is a retrieval symptom, not a hallucination of the model's own making.",
  "distractors": {
   "B": "Abstention instructions cannot help when the retrieved context genuinely contains the wrong contract; the model is faithfully grounding on bad evidence.",
   "C": "A model swap changes a variable that was never implicated and hides the regression behind extra capability and cost.",
   "D": "Extended thinking spends tokens and latency reasoning over the same incorrect chunks."
  },
  "objective": "Diagnose system issues (prompt failure, hallucinations, model mismatch)",
  "src": [
   {
    "t": "Contextual retrieval: contextual embeddings plus contextual BM25, reranking",
    "u": "https://www.anthropic.com/engineering/contextual-retrieval",
    "type": "doc"
   },
   {
    "t": "Reduce hallucinations",
    "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D4-04",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "A health insurer's prior-authorisation assistant passes 99.2% of a 4,000-case eval suite that was generated synthetically from policy documents. Clinical operations still escalates roughly 40 incorrect determinations a week, and none of the escalated patterns resemble anything in the suite. The eval lead proposes generating 16,000 more synthetic cases with wider diversity. What should the architect recommend instead?",
  "options": [
   {
    "key": "A",
    "text": "Triage the escalated determinations and build a focused eval set of 20 to 50 real production failures, each with a labelled correct outcome"
   },
   {
    "key": "B",
    "text": "Generate the additional synthetic cases but sample them from a wider set of policy documents and rarer diagnosis codes"
   },
   {
    "key": "C",
    "text": "Raise the suite's pass threshold from 95% to 99.5% so that marginal regressions are caught before release"
   },
   {
    "key": "D",
    "text": "Hold out 20% of the existing synthetic suite as an unseen test split to detect overfitting to the eval set"
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "More eval data is the wrong answer when the existing data has the wrong distribution: 4,000 synthetic cases at 99.2% are measuring a problem the system does not have. A small set of 20 to 50 real production failures, curated and labelled, gives far more diagnostic signal per case and turns the suite into a genuine gate. Eval sets should be seeded from observed failures, then grown, not generated to scale first.",
  "distractors": {
   "B": "Widening a synthetic generator still samples from the team's assumptions, which are precisely what the escalations disprove.",
   "C": "A higher bar on an unrepresentative suite tightens a measurement that does not correlate with the production defect.",
   "D": "A held-out split detects overfitting to the suite, but both halves share the same synthetic distribution and the same blind spot."
  },
  "objective": "Design evaluation datasets and test frameworks using mixed methodologies",
  "src": [
   {
    "t": "Demystifying evals for AI agents: pass@k vs pass^k, grader types, building from real failures",
    "u": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "type": "doc"
   },
   {
    "t": "Define success criteria and build evaluations",
    "u": "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D4-05",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "A retailer A/B tests a rewritten support prompt against the incumbent at a 50/50 split. Forty hours in, 340 conversations have accumulated: the variant deflects 61% versus the control's 57%, and the product manager wants to ship on Monday. Cost per conversation and p95 latency are within noise. What is the methodologically correct response?",
  "options": [
   {
    "key": "A",
    "text": "Continue to the sample size estimated in advance from the 57% baseline and the minimum detectable effect the business cares about, then decide"
   },
   {
    "key": "B",
    "text": "Keep the test running and ship as soon as the difference first reaches p below 0.05, since that is the standard significance bar"
   },
   {
    "key": "C",
    "text": "Shift the split to 90% variant and 10% control, which accumulates variant observations faster and shortens the test"
   },
   {
    "key": "D",
    "text": "Ship now, because the direction is positive, cost and latency are unchanged, and a rollback is available if deflection drops"
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "A four-point difference on 340 conversations is well inside the noise band for rates near 60%, and required sample size follows from the baseline rate, the minimum detectable effect and the tolerated error rates, all of which should be fixed before the test starts. Calling a winner early is the classic A/B failure, and it is why the stopping rule must be pre-registered rather than negotiated once the numbers look good.",
  "distractors": {
   "B": "Checking repeatedly and stopping at the first significant reading inflates the false positive rate well beyond the nominal 5%.",
   "C": "An unbalanced split reduces total power for a fixed volume and starves the control arm of observations.",
   "D": "Shipping on direction alone treats an underpowered reading as evidence and makes the rollback the actual detector."
  },
  "objective": "Conduct A/B testing and iterative improvements",
  "src": [
   {
    "t": "Evaluation tool in the Console",
    "u": "https://docs.claude.com/en/docs/test-and-evaluate/eval-tool",
    "type": "doc"
   },
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D4: Conduct A/B testing and iterative improvements",
    "u": "",
    "type": "guide"
   }
  ]
 },
 {
  "id": "D4-06",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "An insurer triages first-notice-of-loss claims in real time at roughly 1.2 million calls per month. Each request carries an 18,000-token block of policy manual, adjudication rules and output schema that is identical across calls, followed by a 600-token claim narrative. The current prompt template places the claim narrative first, then the static block, and no caching is configured. Which change gives the largest joint cost and latency improvement?",
  "options": [
   {
    "key": "A",
    "text": "Reorder the template so the static policy block forms the prompt prefix and the claim narrative trails it, then enable prompt caching on that prefix"
   },
   {
    "key": "B",
    "text": "Move the workload to the batch API, which processes the same prompts asynchronously at roughly half the token cost"
   },
   {
    "key": "C",
    "text": "Have a smaller model compress the 18,000-token block into a 3,000-token summary that is regenerated nightly"
   },
   {
    "key": "D",
    "text": "Route the whole workload to a smaller, faster model and accept the accuracy loss on the minority of ambiguous claims"
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "Prompt caching only applies to a stable prefix, so ordering is the enabling condition: with the variable narrative first, every request produces a different prefix and nothing can be reused. Putting the invariant 18,000 tokens first and the variable 600 tokens last makes the bulk of each request a cache read, cutting both input cost and time to first token at once.",
  "distractors": {
   "B": "Batch processing is roughly half cost but asynchronous, which real-time claim triage cannot absorb.",
   "C": "Summarising adjudication rules silently discards edge-case coverage and optimises before the cheap structural fix is tried.",
   "D": "A model downgrade trades accuracy on exactly the claims that justify the system, and leaves the uncached prefix untouched."
  },
  "objective": "Optimize token usage, latency, and cost-performance trade-offs",
  "src": [
   {
    "t": "Prompt caching: cacheable prefixes and breakpoints",
    "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
    "type": "doc"
   },
   {
    "t": "Batch processing: asynchronous workloads at roughly half cost",
    "u": "https://platform.claude.com/docs/en/build-with-claude/batch-processing",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D4-07",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "Analysts at an asset manager complain that the research assistant feels sluggish, though the SLA on total response time is being met. Telemetry shows p50 total latency of 9.4 seconds with p50 time to first token at 7.8 seconds, because every request is issued with a 4,000-token extended thinking budget. Roughly 70% of queries are single-fact lookups against an indexed filings store. What is the strongest first change?",
  "options": [
   {
    "key": "A",
    "text": "Reduce max output tokens so responses finish sooner and the total latency figure improves"
   },
   {
    "key": "B",
    "text": "Classify queries and grant an extended thinking budget only to the multi-step analytical minority, and stream responses for the rest"
   },
   {
    "key": "C",
    "text": "Cache the system prompt, since prefix caching lowers time to first token across every request in the workload"
   },
   {
    "key": "D",
    "text": "Move the assistant to the batch API overnight so cost halves and daytime queue pressure on latency eases"
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "Perceived responsiveness is governed by time to first token, and here 7.8 of 9.4 seconds is spent producing thinking tokens before any text is emitted, so extended thinking is the dominant term. Routing by query complexity removes that cost for the 70% that never needed it, and streaming surfaces the first token immediately for those requests.",
  "distractors": {
   "A": "Trimming output length shortens the tail after first token and leaves the 7.8-second silence untouched.",
   "C": "Caching helps time to first token, but the delay here comes from generated thinking tokens, not from processing the prefix.",
   "D": "Batch is an asynchronous cost lever and cannot serve an interactive assistant."
  },
  "objective": "Optimize token usage, latency, and cost-performance trade-offs",
  "src": [
   {
    "t": "Extended thinking: latency and token trade-offs",
    "u": "https://platform.claude.com/docs/en/build-with-claude/extended-thinking",
    "type": "doc"
   },
   {
    "t": "Reduce latency",
    "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D4-08",
  "domain": "Evaluation, Testing & Optimization",
  "type": "multi",
  "stem": "A media monitoring company plans to move its summarisation and entity-tagging pipeline to a newer Claude model. The team has a frozen eval set of 45 labelled cases built from real production failures, plus six months of token and latency telemetry. Leadership wants the swap treated as a gated change rather than a routine deployment. Which two actions belong in the gate before promotion? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Rewrite the prompts for the new model first, then run the eval set, so each model is compared at its best"
   },
   {
    "key": "B",
    "text": "Run the frozen eval set against both models and compare results per failure category, not only on the aggregate pass rate"
   },
   {
    "key": "C",
    "text": "Re-measure cost per request and p95 latency on the production token mix, since price per token and typical output length both shift"
   },
   {
    "key": "D",
    "text": "Accept the published benchmark scores for the new model as the accuracy component of the gate"
   },
   {
    "key": "E",
    "text": "Promote to 100% of traffic with a rollback plan, since any regression will surface in the support queue within a day"
   }
  ],
  "correct": [
   "B",
   "C"
  ],
  "rationale": "Evals are the gate before any model swap or prompt change, and the comparison is only valid when exactly one variable moves, which means the prompt stays frozen and results are read per category so a gain in one class cannot mask a regression in another. The gate covers cost and latency as well as accuracy, and both change with the model.",
  "distractors": {
   "A": "Changing prompt and model together confounds the comparison and makes any difference unattributable.",
   "D": "Public benchmarks do not measure this pipeline's task, data or failure modes and cannot serve as an acceptance gate.",
   "E": "Using production as the detector inverts the purpose of a gate and exposes customers to the regression first."
  },
  "objective": "Conduct A/B testing and iterative improvements",
  "src": [
   {
    "t": "Demystifying evals for AI agents: pass@k vs pass^k, grader types, building from real failures",
    "u": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "type": "doc"
   },
   {
    "t": "Define success criteria and build evaluations",
    "u": "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D4-09",
  "domain": "Evaluation, Testing & Optimization",
  "type": "multi",
  "stem": "An agentic accounts-payable system chains eight to fifteen model and tool calls per invoice across OCR, vendor lookup, GL coding and approval routing. Roughly one run in thirty ends in a wrong GL code or an unexplained stall, and engineers cannot reproduce the failures locally. The team is rebuilding its logging before attempting any prompt or model change. Which three logging practices most directly enable diagnosis here? (Select THREE.)",
  "options": [
   {
    "key": "A",
    "text": "Propagate a single trace identifier across every model call and tool call in a run so a failed invoice can be reconstructed end to end"
   },
   {
    "key": "B",
    "text": "Record per call the model version, input and output token counts, and whether input tokens were cache reads or writes"
   },
   {
    "key": "C",
    "text": "Record the stop reason, tool call arguments and results, and every retry attempt with its HTTP status and timing"
   },
   {
    "key": "D",
    "text": "Persist full raw prompt and response bodies including vendor bank details indefinitely, to guarantee maximum forensic fidelity"
   },
   {
    "key": "E",
    "text": "Sample 1% of runs for full tracing and log only aggregate success counts for the rest, to keep storage predictable"
   }
  ],
  "correct": [
   "A",
   "B",
   "C"
  ],
  "rationale": "Agentic failures are failures of a sequence, so correlation by trace identifier is what turns scattered call logs into a reproducible run, and step-level records of stop reason, tool arguments and retries are what separate genuine model error from infrastructure noise such as timeouts and rate limiting. Per-call token and model-version accounting supports both the cost forecast and the detection of silent version or cache-behaviour drift.",
  "distractors": {
   "D": "Indefinite retention of raw bank details is a governance and security failure, and fidelity is achievable with redaction and retention limits.",
   "E": "One percent sampling will almost never capture a one-in-thirty failure with enough instances to find the pattern."
  },
  "objective": "Monitor system performance using logging and observability tools",
  "src": [
   {
    "t": "Demystifying evals for AI agents: pass@k vs pass^k, grader types, building from real failures",
    "u": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "type": "doc"
   },
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D4: Monitor system performance using logging and observability tools",
    "u": "",
    "type": "guide"
   }
  ]
 },
 {
  "id": "D4-10",
  "domain": "Evaluation, Testing & Optimization",
  "type": "match",
  "stem": "A retailer runs a customer-service assistant over a product catalogue with retrieval, a fixed system prompt and a JSON contract consumed by the order system. Over one week the on-call log records four distinct symptoms. Match each symptom to its most likely root cause. A cause may be used more than once or not at all.",
  "prompts": [
   {
    "id": "p1",
    "text": "The day after the catalogue was re-indexed with a new embedding model, answers began confidently recommending discontinued SKUs; model version, system prompt and p95 latency are unchanged."
   },
   {
    "id": "p2",
    "text": "Facts in the responses are correct, but roughly 8% of outputs break the required JSON contract, and those failures cluster on customer messages that themselves contain brace and bracket characters."
   },
   {
    "id": "p3",
    "text": "Outputs are well formed and grounded, yet refund decisions that depend on tracking four interacting policy conditions are consistently wrong, even when the full policy text is verifiably present in the context window."
   },
   {
    "id": "p4",
    "text": "One fixed regression case fails about one run in twenty with a truncated response and a 529 in the logs, then passes unchanged on re-run."
   }
  ],
  "choices": [
   "Retrieval or indexing failure",
   "Prompt failure in instruction or output-format specification",
   "Model mismatch, the task exceeds the capability of the selected model",
   "Infrastructure noise rather than a model quality defect",
   "Context window exhaustion causing truncation of supplied evidence"
  ],
  "correct": {
   "p1": "Retrieval or indexing failure",
   "p2": "Prompt failure in instruction or output-format specification",
   "p3": "Model mismatch, the task exceeds the capability of the selected model",
   "p4": "Infrastructure noise rather than a model quality defect"
  },
  "rationale": "Each symptom points at the layer that actually changed or that the evidence exonerates: a quality drop immediately after a data-layer change with model and latency constant implicates retrieval, while format breakage correlated with a specific input character class is a prompt and delimiting problem. Consistent failure on multi-condition reasoning with the evidence demonstrably in context is the signature of model mismatch, and an intermittent overload status on a fixed case is infrastructure noise that must be excluded before it is scored as a quality regression. Context window exhaustion is unused, because p3 confirms the policy text was present and p4 fails non-deterministically on identical input.",
  "objective": "Diagnose system issues (prompt failure, hallucinations, model mismatch)",
  "src": [
   {
    "t": "Reduce hallucinations",
    "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations",
    "type": "doc"
   },
   {
    "t": "Demystifying evals for AI agents: pass@k vs pass^k, grader types, building from real failures",
    "u": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D5-01",
  "domain": "Governance, Safety & Risk Management",
  "type": "single",
  "stem": "A retail bank deploys a Claude agent that answers customer servicing questions. The agent is provisioned with four tools: account_lookup, transaction_history, dispute_open, and wire_transfer_execute. Review of six months of production traffic shows wire_transfer_execute has never been invoked and is not part of any supported servicing journey, but it was included because the same service account was reused from a payments pilot. The risk committee asks the architect to bring the agent into line with least privilege before the next audit cycle.",
  "options": [
   {
    "key": "A",
    "text": "Remove wire_transfer_execute from the agent's tool definitions and from the service account's permission grant."
   },
   {
    "key": "B",
    "text": "Keep the tool available but require a typed customer confirmation phrase before any wire is executed."
   },
   {
    "key": "C",
    "text": "Keep the tool available and add an alert that pages the fraud desk whenever wire_transfer_execute is invoked."
   },
   {
    "key": "D",
    "text": "Keep the tool available and add a system prompt instruction stating that the agent must never initiate wire transfers."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "Least privilege is satisfied by removing a capability the workload does not need, at both the tool schema and the underlying credential. The other options leave the capability present and reachable, and substitute detective or compensating controls for the removal itself.",
  "distractors": {
   "B": "Confirmation is a compensating control; a compromised or injected session can still reach a capability that should not exist.",
   "C": "Alerting is detective, not preventive, so the unauthorised wire has already left before anyone reviews it.",
   "D": "Prompt instructions are probabilistic guidance to the model, not an enforced permission boundary."
  },
  "objective": "Implement guardrails and safety controls",
  "src": [
   {
    "t": "Claude Code IAM: permission rules, allow and deny lists",
    "u": "https://code.claude.com/docs/en/iam",
    "type": "doc"
   },
   {
    "t": "Mitigate jailbreaks and prompt injection",
    "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D5-02",
  "domain": "Governance, Safety & Risk Management",
  "type": "single",
  "stem": "A hospital network runs a Claude assistant that answers clinician questions over a retrieval index built from the full electronic health record. During validation, a clinician asks a broad question and the assistant returns a passage from a patient who is not on that clinician's care team, a minimum necessary access failure under HIPAA. The engineering team proposes a stronger system prompt plus a fine-tuned refusal behaviour so the model learns not to surface records outside the requesting clinician's panel. What should the architect direct instead?",
  "options": [
   {
    "key": "A",
    "text": "Keep the full index and add an output screening classifier that detects patient identifiers belonging to other care teams."
   },
   {
    "key": "B",
    "text": "Keep the full index and add an input screening step that rejects questions phrased broadly enough to match multiple patients."
   },
   {
    "key": "C",
    "text": "Keep the full index and log every retrieved passage so the privacy office can review out-of-scope disclosures weekly."
   },
   {
    "key": "D",
    "text": "Enforce the clinician's access scope as a deterministic filter in the retrieval query so out-of-scope records are never returned as context."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "Authorisation belongs at the data access layer, not in the model's behaviour: if out-of-scope records never enter the context window, no model decision can leak them. Training and prompting shape tendencies, while access control is an obligation the application layer must enforce deterministically.",
  "distractors": {
   "A": "A model-based output check is probabilistic and runs after the protected data has already been retrieved and processed.",
   "B": "Query phrasing is a poor proxy for authorisation and blocks legitimate broad clinical questions.",
   "C": "Logging creates evidence of a breach rather than preventing the impermissible disclosure."
  },
  "objective": "Implement guardrails and safety controls",
  "src": [
   {
    "t": "SOC 2 and HIPAA certification status",
    "u": "https://privacy.anthropic.com/en/articles/10015870-do-you-have-a-soc-2-or-hipaa-certifications",
    "type": "doc"
   },
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D5: Ensure compliance with regulations",
    "u": "",
    "type": "guide"
   }
  ]
 },
 {
  "id": "D5-03",
  "domain": "Governance, Safety & Risk Management",
  "type": "single",
  "stem": "An EU insurance provider runs a customer-facing Claude assistant. Every generated response passes through an output screening service that redacts personal data belonging to third parties before the text is shown. During a regional incident the screening service becomes unreachable and its client library begins timing out. The architect must define the behaviour of the assistant for the duration of the outage.",
  "options": [
   {
    "key": "A",
    "text": "Serve responses without screening and queue the unscreened transcripts for retrospective redaction once the service recovers."
   },
   {
    "key": "B",
    "text": "Suppress the generated response, return a service-unavailable message, and record the suppression as a control availability event."
   },
   {
    "key": "C",
    "text": "Serve responses without screening only when the model reports high confidence that no third-party personal data is present."
   },
   {
    "key": "D",
    "text": "Serve responses without screening but shorten the retention period for transcripts produced during the outage."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "A system handling regulated personal data must fail closed: when a required control cannot run, the protected path is stopped rather than allowed through unchecked. Suppression plus an availability event also produces the evidence a regulator or auditor will ask for about how the gap was handled.",
  "distractors": {
   "A": "Retrospective redaction cannot undo a disclosure that has already been shown to a customer.",
   "C": "Substituting the model's self-assessment for the missing control is the fail-open path in disguise.",
   "D": "Retention settings govern stored copies and do nothing about the unredacted text already released."
  },
  "objective": "Identify risks, limitations, and failure modes of LLM systems",
  "src": [
   {
    "t": "How we contain Claude: containment and control placement",
    "u": "https://www.anthropic.com/engineering/how-we-contain-claude",
    "type": "doc"
   },
   {
    "t": "Anthropic's approach to GDPR",
    "u": "https://support.anthropic.com/en/articles/7996881-what-is-your-approach-to-gdpr-or-related-issues",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D5-04",
  "domain": "Governance, Safety & Risk Management",
  "type": "single",
  "stem": "A commercial lender uses a Claude workflow to triage hardship requests. Two actions sit at the end of the workflow: attach an explanatory note to the case file, which any agent can later edit, and file a default notice with the credit bureau, which the lender cannot retract once submitted and which materially damages the borrower. The team proposes a single routing rule: send anything below 0.85 model confidence to a human reviewer and auto-execute everything above it. Evaluate the proposal.",
  "options": [
   {
    "key": "A",
    "text": "Accept it, and tighten the threshold to 0.95 so that fewer borderline cases are auto-executed."
   },
   {
    "key": "B",
    "text": "Accept it, and add a second model that scores the first model's output to raise effective confidence."
   },
   {
    "key": "C",
    "text": "Reject it, and route the bureau filing to human review on every occasion while allowing confidence routing for the case note."
   },
   {
    "key": "D",
    "text": "Reject it, and route both actions to human review so that the same standard applies across the workflow."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Human-in-the-loop routing is driven by reversibility and the cost of a wrong answer, not by confidence alone: an irreversible, high-harm action warrants review at any confidence level. The editable case note is low cost and reversible, so confidence-based routing remains an appropriate use of reviewer capacity there.",
  "distractors": {
   "A": "A higher threshold still permits unreviewed irreversible filings whenever the model is confidently wrong.",
   "B": "Model confidence scored by another model is still a model estimate and does not change the action's irreversibility.",
   "D": "Reviewing everything wastes scarce reviewer capacity on a cheaply reversible action and slows the queue."
  },
  "objective": "Apply human-in-the-loop validation strategies",
  "src": [
   {
    "t": "No vendor doc prescribes human-in-the-loop routing design. Principle is derived from control-placement and reversibility reasoning; source of record is CCAR-P Prep Course 3, Responsible AI, Safety & Risk (114 min).",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D5-05",
  "domain": "Governance, Safety & Risk Management",
  "type": "single",
  "stem": "A systems integrator is building a Claude-based case summarisation tool for a US federal civilian agency. The contract requires the system to operate within a FedRAMP authorisation boundary at the Moderate impact level, and the agency's authorising official will need an authorisation package covering every service in scope. The integrator asks how to obtain FedRAMP coverage for the model inference component.",
  "options": [
   {
    "key": "A",
    "text": "Submit the integrator's own application for a FedRAMP authorisation that names the model vendor as an included subsystem."
   },
   {
    "key": "B",
    "text": "Consume the model through a FedRAMP authorised cloud provider offering and inherit the applicable controls from that provider's authorisation."
   },
   {
    "key": "C",
    "text": "Deploy the commercial model endpoint inside the agency's virtual private cloud and document the deployment as an equivalent boundary."
   },
   {
    "key": "D",
    "text": "Rely on the model vendor's SOC 2 Type II report and enterprise security addendum as the basis for the authorisation package."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "FedRAMP coverage for inference is normally reached by consuming the model through an authorised cloud service provider route, so the agency inherits that provider's authorised controls and the integrator documents only the residual application controls it owns. Authorisation attaches to a named service offering, not to a deployment topology or a commercial audit report.",
  "distractors": {
   "A": "An integrator cannot bring an unauthorised third-party service inside its own boundary by naming it in the package.",
   "C": "Network placement does not confer authorisation; the boundary is defined by authorised services, not by where traffic flows.",
   "D": "SOC 2 is a different assurance regime and does not satisfy a FedRAMP authorisation requirement."
  },
  "objective": "Ensure compliance with regulations (GDPR, HIPAA, FedRAMP)",
  "src": [
   {
    "t": "FedRAMP High via Amazon Bedrock",
    "u": "https://www.anthropic.com/news/claude-in-amazon-bedrock-fedramp-high",
    "type": "doc"
   },
   {
    "t": "Anthropic Trust Center",
    "u": "https://trust.anthropic.com/",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D5-06",
  "domain": "Governance, Safety & Risk Management",
  "type": "single",
  "stem": "A staffing firm uses Claude to rank applicants against a role profile. A regulator opens an inquiry and asks the firm to show, for a sample of rejected candidates, what information the system considered and on what basis each candidate was placed below the cut line. The team's plan is to re-run each sampled candidate and ask the model to explain the ranking it produced, then submit those explanations as the regulator's record. What is the architect's correct objection?",
  "options": [
   {
    "key": "A",
    "text": "The explanations must be produced by a separate auditor model so that no single model both decides and explains."
   },
   {
    "key": "B",
    "text": "The regulator requires a plain-language explanation for the candidate, so the generated text should be rewritten at a lower reading level first."
   },
   {
    "key": "C",
    "text": "A regenerated explanation is not a record of the original decision; the application must log the inputs, retrieved evidence, model version, and scores at decision time."
   },
   {
    "key": "D",
    "text": "Re-running the sampled candidates reprocesses their personal data without a lawful basis, so the sample must be anonymised before it is submitted."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Transparency obligations differ by audience: the regulator needs an immutable record of what the system actually did, which only decision-time logging at the application layer can supply. A post-hoc model explanation is newly generated text that may not correspond to the original computation, so it is a debugging aid rather than evidence.",
  "distractors": {
   "A": "A second model produces another plausible narrative and still fails to record the original decision.",
   "B": "Reading level addresses the candidate-facing notice, not the evidentiary record the regulator asked for.",
   "D": "Processing for a regulatory response is not the defect here, and anonymising a per-candidate sample would defeat its purpose."
  },
  "objective": "Address ethical AI considerations (bias, fairness, transparency)",
  "src": [
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D5: Address ethical AI considerations (bias, fairness, transparency)",
    "u": "",
    "type": "guide"
   },
   {
    "t": "No vendor doc covers evidentiary logging for regulatory inquiry. Principle derived from transparency-by-audience reasoning; source of record is CCAR-P Prep Course 3.",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D5-07",
  "domain": "Governance, Safety & Risk Management",
  "type": "multi",
  "stem": "An asset manager deploys a Claude agent that reads inbound client emails and attachments, then uses send_email and update_client_record tools to respond and file notes. A red team demonstrates that text hidden in an attachment can induce the agent to email a client's portfolio summary to an address supplied inside that attachment. The architect must reduce the risk that a successful injection produces a damaging action. Which two measures address the failure at the right layer? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Add a system prompt section instructing the agent to ignore any instruction that appears inside retrieved documents or attachments."
   },
   {
    "key": "B",
    "text": "Constrain send_email at the tool boundary so recipients must resolve to addresses already on the authenticated client's record."
   },
   {
    "key": "C",
    "text": "Treat attachment text as untrusted data and route any agent action derived from it through a deterministic authorisation check before execution."
   },
   {
    "key": "D",
    "text": "Run a model-based injection classifier over attachments and rely on it as the sole gate for whether the agent may use its tools."
   },
   {
    "key": "E",
    "text": "Fine-tune the model on examples of injected attachments so it learns to recognise and refuse the pattern."
   }
  ],
  "correct": [
   "B",
   "C"
  ],
  "rationale": "Injection cannot be reliably eliminated at the language layer, so the durable controls sit at the action boundary: constrain what the tool can do and authorise the derived action deterministically against session-owned data. Both measures hold even when the model is fully persuaded by the injected text.",
  "distractors": {
   "A": "Prompt instructions are advisory and are exactly what a well-crafted injection is designed to override.",
   "D": "A model-based detector is a useful defence in depth, but making it the sole gate leaves a probabilistic control on a high-impact path.",
   "E": "Training shifts tendencies against known patterns and does not bound what the agent is permitted to do."
  },
  "objective": "Implement guardrails and safety controls",
  "src": [
   {
    "t": "Mitigate jailbreaks and prompt injection",
    "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks",
    "type": "doc"
   },
   {
    "t": "Writing tools for agents: agent-centric tool design",
    "u": "https://www.anthropic.com/engineering/writing-tools-for-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D5-08",
  "domain": "Governance, Safety & Risk Management",
  "type": "multi",
  "stem": "A German e-commerce company launches a Claude support assistant for EU consumers. Its data protection officer requires that every GDPR obligation in scope be mapped to a named control, a named accountable owner, and an evidence artifact that an auditor can inspect. The programme currently has a policy document and a launch checklist. Which three additions satisfy the mapping requirement? (Select THREE.)",
  "options": [
   {
    "key": "A",
    "text": "A regional inference configuration pinning processing to the agreed region, owned by the platform team, evidenced by the deployment configuration and change records."
   },
   {
    "key": "B",
    "text": "A scheduled deletion job enforcing the conversation retention period, owned by the data platform lead, evidenced by dated deletion run logs."
   },
   {
    "key": "C",
    "text": "A data protection impact assessment for the assistant, owned by the data protection officer, evidenced by the signed assessment and its review date."
   },
   {
    "key": "D",
    "text": "A statement in the system prompt directing the assistant not to store or repeat personal data it receives from consumers."
   },
   {
    "key": "E",
    "text": "A vendor assurance that the model provider does not retain prompts, cited as the company's retention control for its own conversation stores."
   }
  ],
  "correct": [
   "A",
   "B",
   "C"
  ],
  "rationale": "Each correct option names a concrete control, an accountable owner, and an artifact an auditor can pull, which is what turns a policy statement into a demonstrable compliance position. Residency, retention, and impact assessment are the obligations most often left as intentions in this kind of deployment.",
  "distractors": {
   "D": "A prompt instruction has no owner, no artifact, and no enforcement over what the application persists.",
   "E": "A provider's retention posture does not govern the logs, transcripts, and analytics the company stores itself."
  },
  "objective": "Ensure compliance with regulations (GDPR, HIPAA, FedRAMP)",
  "src": [
   {
    "t": "Anthropic's approach to GDPR",
    "u": "https://support.anthropic.com/en/articles/7996881-what-is-your-approach-to-gdpr-or-related-issues",
    "type": "doc"
   },
   {
    "t": "Anthropic Trust Center",
    "u": "https://trust.anthropic.com/",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D5-09",
  "domain": "Governance, Safety & Risk Management",
  "type": "match",
  "stem": "A health insurer runs a Claude agent that handles member correspondence. The agent retrieves plan documents and member files, drafts letters that are sent to members without further editing, and can call tools to update coverage records and to cancel a policy. A pre-launch risk review lists four findings. Match each finding to the control layer or review strategy that best addresses it. A choice may be used more than once or not at all.",
  "prompts": [
   {
    "id": "p1",
    "text": "The agent's database role can read member files across every employer group, although each conversation only ever concerns the authenticated member."
   },
   {
    "id": "p2",
    "text": "Drafted letters occasionally cite a plan provision that does not appear in any current plan document, and the letters are mailed unedited."
   },
   {
    "id": "p3",
    "text": "A member-uploaded PDF contains hidden text instructing the agent to update the coverage record for a different member identifier."
   },
   {
    "id": "p4",
    "text": "The agent can call the policy cancellation tool, and a cancellation cannot be reversed once the termination file is transmitted to the exchange."
   }
  ],
  "choices": [
   "Input screening applied to the request before the model sees it",
   "Output screening applied to the generated response before release",
   "Tool-call authorisation enforced deterministically at the action boundary",
   "Human review required before the action is committed"
  ],
  "correct": {
   "p1": "Tool-call authorisation enforced deterministically at the action boundary",
   "p2": "Output screening applied to the generated response before release",
   "p3": "Tool-call authorisation enforced deterministically at the action boundary",
   "p4": "Human review required before the action is committed"
  },
  "rationale": "Over-broad data access and injected instructions both end in an action or a read that a deterministic check at the tool boundary can refuse, scoping the credential to the authenticated member in the first case and rejecting the mismatched identifier in the second. Fabricated citations are caught by verifying the generated text against the plan document source before the letter leaves the system, while an irreversible cancellation warrants a human decision regardless of how confident the model is. Input screening is not the right fit for any of these findings, since none of them turn on filtering the member's own request text.",
  "objective": "Implement guardrails and safety controls",
  "src": [
   {
    "t": "How we contain Claude: containment and control placement",
    "u": "https://www.anthropic.com/engineering/how-we-contain-claude",
    "type": "doc"
   },
   {
    "t": "Mitigate jailbreaks and prompt injection",
    "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks",
    "type": "doc"
   },
   {
    "t": "No vendor doc prescribes human-in-the-loop routing design. Principle is derived from control-placement and reversibility reasoning; source of record is CCAR-P Prep Course 3, Responsible AI, Safety & Risk (114 min).",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D6-01",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "single",
  "stem": "A VP of Customer Support opens a discovery workshop by asking for a Claude assistant that writes a summary of every support ticket and posts it to a Slack channel. Her team has already chosen the channel and drafted the summary template. The CFO funding the work has set a 10-week window and wants a defensible hours-saved figure. The architect has 45 minutes with both stakeholders and no second session is scheduled. Which opening line of questioning best serves the engagement?",
  "options": [
   {
    "key": "A",
    "text": "Ask which Claude model, context window and volume assumptions the summaries require, so a credible cost model fits inside the 10-week window."
   },
   {
    "key": "B",
    "text": "Ask what decision a person makes after reading the summary, who makes that decision, and what it costs the business when that decision is wrong."
   },
   {
    "key": "C",
    "text": "Ask the VP to sign off the summary template and the Slack channel in this session, so scope is locked before design work begins."
   },
   {
    "key": "D",
    "text": "Ask the CFO to state the target hours saved now, so success criteria can be written against the funding case before design begins."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "A ticket summary in Slack is a stated solution, not a requirement; the requirement is whatever decision the summary is meant to improve. Anchoring on the decision and its cost of error tells you the precision needed, where a human must stay in the loop, and what success actually measures.",
  "distractors": {
   "A": "Starts with technology before the problem is known, and a cost model built on the wrong unit of work is precise but useless.",
   "C": "Locks in the stated solution as scope, which is exactly the assumption discovery exists to test.",
   "D": "Success criteria before build is right in principle, but an hours-saved target attached to an unvalidated solution measures the wrong thing."
  },
  "objective": "Conduct structured discovery and requirement gathering",
  "src": [
   {
    "t": "No vendor documentation exists for this objective. Anthropic publishes nothing on discovery method, SLA design for probabilistic systems, handoff standards or lifecycle phases. Source of record is CCAR-P Prep Course 4, Stakeholder Engagement, Lifecycle & GTM (178 min). Treat this item's key as the defensible consulting answer, not a vendor-canonical one.",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D6-02",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "single",
  "stem": "A Head of Compliance at an insurer wants a contractual SLA of 99% accuracy on the classification of inbound customer complaints, and her legal team will not sign a statement of work without a numeric quality clause. Go-live is in five weeks. The current eval over 400 labelled cases returns 94.6% with a wide confidence interval, and the existing human baseline is roughly 91%. The architect is asked in the contract review to state the number. Which response is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Commit to 95% in the contract, since the measured 94.6% plus five weeks of prompt and retrieval tuning should comfortably close the remaining gap."
   },
   {
    "key": "B",
    "text": "Decline any quality figure and contract only on availability and latency, since those are the sole guarantees a probabilistic system can honestly make."
   },
   {
    "key": "C",
    "text": "Contract on availability, latency and coverage, and add a jointly governed quality target measured monthly on a versioned eval set with a defined remediation path."
   },
   {
    "key": "D",
    "text": "Defer the quality clause for six months of production data, then reopen the contract once the true operating accuracy is known from real volume."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "A hard accuracy SLA on a probabilistic system contracts a point estimate from one dataset as though it were a deterministic guarantee, and the input distribution will move. The defensible structure separates what is engineering-deterministic and contractable from quality, which is governed as a monitored target on a named eval set with agreed remediation.",
  "distractors": {
   "A": "Absorbs unbounded risk on an unfinished improvement, and 95% sits inside the confidence interval of the current measurement.",
   "B": "Over-corrects: refusing all quality accountability leaves compliance unprotected and is not a commercially credible position.",
   "D": "Leaves the compliance owner with no quality protection at the exact moment risk is highest, and postpones a decision that can be structured now."
  },
  "objective": "Manage stakeholder feedback loops and expectation alignment, including SLAs",
  "src": [
   {
    "t": "No vendor documentation exists for this objective. Anthropic publishes nothing on discovery method, SLA design for probabilistic systems, handoff standards or lifecycle phases. Source of record is CCAR-P Prep Course 4, Stakeholder Engagement, Lifecycle & GTM (178 min). Treat this item's key as the defensible consulting answer, not a vendor-canonical one.",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D6-03",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "single",
  "stem": "A COO saw a three-week prototype that drafts vendor contract clauses and now wants it live for 200 procurement users by quarter end, six weeks away. The prototype ran on 40 hand-picked documents with no retrieval evaluation, no logging, and no human review step on the clauses that carry legal exposure; the client's own counsel has not seen it. The architect's firm is bidding for the follow-on managed service and the COO is the economic buyer. What should the architect do?",
  "options": [
   {
    "key": "A",
    "text": "Commit to the quarter-end date and schedule logging, evaluation and human review as a fast follow in the first sprint after launch."
   },
   {
    "key": "B",
    "text": "Raise the gaps with the client's general counsel and ask legal to hold the date, so the delivery team is not positioned as the obstacle to the quarter."
   },
   {
    "key": "C",
    "text": "Accept the date and add written language stating that clause accuracy is not warranted and that the client accepts the residual legal risk."
   },
   {
    "key": "D",
    "text": "Decline the quarter-end scope, set out what the demo evidenced against what production requires, and offer a bounded rollout with review on exposure-bearing clauses."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "A demo evidences feasibility on curated inputs; it evidences nothing about production distribution, failure handling or exposure control. Saying no to the scope while offering a bounded alternative keeps the decision with the accountable executive instead of transferring unmeasured legal risk to the client.",
  "distractors": {
   "A": "Puts the controls that exist to prevent the harm behind the launch that creates it, and fast-follow work reliably slips once users are live.",
   "B": "Routes an architectural judgement through a third party to avoid owning it, which damages credibility with the buyer and with counsel.",
   "C": "A disclaimer reassigns liability on paper without reducing the probability or the impact of a bad clause reaching a signed contract."
  },
  "objective": "Support lifecycle phases: discovery, design, handoff, monitoring, iteration",
  "src": [
   {
    "t": "No vendor documentation exists for this objective. Anthropic publishes nothing on discovery method, SLA design for probabilistic systems, handoff standards or lifecycle phases. Source of record is CCAR-P Prep Course 4, Stakeholder Engagement, Lifecycle & GTM (178 min). Treat this item's key as the defensible consulting answer, not a vendor-canonical one.",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D6-04",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "single",
  "stem": "A Head of Claims agreed at kickoff that success meant 85% of claims processed straight through at a defined precision threshold. The completed eval returns 61% straight through overall, but 92% on the two claim types that account for most volume. The steering committee meets tomorrow and the delivery lead proposes leading with the 92%. The client has already communicated the 85% target internally. How should the architect present the result?",
  "options": [
   {
    "key": "A",
    "text": "Present the 61% against the agreed criterion alongside the human baseline and volume-weighted economics, then ask the committee to choose scope or timeline."
   },
   {
    "key": "B",
    "text": "Lead with the 92% on the highest-volume claim types, since that reflects most transactions, and place the 61% overall figure in the technical appendix."
   },
   {
    "key": "C",
    "text": "Postpone the readout by two weeks to tune prompts and retrieval, so the committee is shown a number materially closer to the 85% they expected."
   },
   {
    "key": "D",
    "text": "Present the 61% and recommend moving to a multi-agent decomposition, which should raise straight-through processing past the agreed target."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "The pre-agreed success criterion is the only fair yardstick, and the committee needs the volume-weighted view to see that a narrower scope may still clear the business case. Framing it as a choice between narrowing scope and extending timeline puts the decision with the people accountable for both.",
  "distractors": {
   "B": "Selecting the flattering slice and burying the agreed metric is a credibility loss the client will discover in production.",
   "C": "Silently absorbing the gap hides a decision the sponsor is entitled to make now, and two weeks of tuning rarely moves 61% to 85%.",
   "D": "Proposes a costly re-architecture before any failure taxonomy explains why the other claim types fail."
  },
  "objective": "Manage stakeholder feedback loops and expectation alignment, including SLAs",
  "src": [
   {
    "t": "No vendor documentation exists for this objective. Anthropic publishes nothing on discovery method, SLA design for probabilistic systems, handoff standards or lifecycle phases. Source of record is CCAR-P Prep Course 4, Stakeholder Engagement, Lifecycle & GTM (178 min). Treat this item's key as the defensible consulting answer, not a vendor-canonical one.",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D6-05",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "single",
  "stem": "The agreed SLA states that 95% of triage responses return under four seconds at p95, with notification to the client within one hour of a confirmed breach. At 09:40 on a Tuesday, p95 latency is 11 seconds and climbing following an upstream provider degradation. A smaller fallback model is wired in but has never been exercised at full production load. Root cause is not yet established and the client engineering lead is already asking what caused it. What is the correct first move?",
  "options": [
   {
    "key": "A",
    "text": "Hold notification until root cause is confirmed, since announcing an unconfirmed cause creates contractual exposure and may later prove to be wrong."
   },
   {
    "key": "B",
    "text": "Move all traffic to the fallback model immediately and notify once latency is back inside the SLA, so the message can carry a resolution rather than an alarm."
   },
   {
    "key": "C",
    "text": "Notify now and offer the contractual service credit in the same message, to protect the relationship before the client's commercial team raises it."
   },
   {
    "key": "D",
    "text": "Notify now with scope, impact, current mitigation and the next update time, shift a controlled share of traffic to the fallback, and state root cause is unknown."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "Breach notification is triggered by observed impact, not by diagnosis, and a client operations team needs scope, mitigation and a next-update commitment to run their own response. Naming root cause as unknown is accurate and keeps the communication honest, while a partial traffic shift tests an unexercised fallback without betting the whole load on it.",
  "distractors": {
   "A": "Conflates notification with explanation and risks blowing the contractual window while the client discovers the impact themselves.",
   "B": "Bets the full production load on an untested path and delays a notification the contract already requires.",
   "C": "Concedes a commercial remedy before the facts are known, and the credit decision is not the architect's to make."
  },
  "objective": "Manage stakeholder feedback loops and expectation alignment, including SLAs",
  "src": [
   {
    "t": "No vendor documentation exists for this objective. Anthropic publishes nothing on discovery method, SLA design for probabilistic systems, handoff standards or lifecycle phases. Source of record is CCAR-P Prep Course 4, Stakeholder Engagement, Lifecycle & GTM (178 min). Treat this item's key as the defensible consulting answer, not a vendor-canonical one.",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D6-06",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "single",
  "stem": "A 12-week engagement to build a claims-triage system started three days ago. The client's legal team has blocked release of the historical claims corpus pending a data protection impact assessment that will take six weeks, and the corpus is the intended retrieval source. The CIO is asking whether to stand the delivery team down and restart in Q3. Nothing else about the engagement has changed. What should the architect do?",
  "options": [
   {
    "key": "A",
    "text": "Pause design until the corpus is released, since retrieval design built without sight of the real documents is likely to need substantial rework."
   },
   {
    "key": "B",
    "text": "Proceed on the full design using a synthetic corpus generated from the client's public policy wordings, then substitute the real corpus at week six."
   },
   {
    "key": "C",
    "text": "Proceed on the decisions that do not depend on the corpus, name the ones that do, and record each deferred assumption with its reversal cost for review at release."
   },
   {
    "key": "D",
    "text": "Reduce scope to a use case the currently available data supports, and put claims triage into a later phase once the assessment has completed."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Much of the architecture is invariant to the corpus: interfaces, orchestration, evaluation harness, human-in-the-loop design, guardrails and observability. The discipline is to proceed where the unknown does not bind, mark the decisions it does bind, and carry each deferred assumption with an explicit reversal cost so the review at week six is a decision rather than a discovery.",
  "distractors": {
   "A": "Treats one blocked input as blocking every decision and burns half the engagement on work that could have proceeded.",
   "B": "Synthetic documents will not reproduce the real distribution, so a retrieval design validated against them carries false confidence into week six.",
   "D": "Solves the schedule by abandoning the requirement the client actually funded."
  },
  "objective": "Support lifecycle phases: discovery, design, handoff, monitoring, iteration",
  "src": [
   {
    "t": "No vendor documentation exists for this objective. Anthropic publishes nothing on discovery method, SLA design for probabilistic systems, handoff standards or lifecycle phases. Source of record is CCAR-P Prep Course 4, Stakeholder Engagement, Lifecycle & GTM (178 min). Treat this item's key as the defensible consulting answer, not a vendor-canonical one.",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D6-07",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "multi",
  "stem": "An architect rolls off a delivery in three weeks. The receiving client team is two platform engineers and a support operations manager, none with machine learning experience, and the contract makes the client fully responsible for operations from the day after handoff. The client engineering lead has asked for the architecture diagram and the prompt files and considers that sufficient. Which THREE handoff artifacts most reduce the client team's dependence on the architect? (Select THREE.)",
  "options": [
   {
    "key": "A",
    "text": "A runbook mapping each observed failure mode to its diagnostic signal, its remediation, and the threshold at which the team escalates and to whom."
   },
   {
    "key": "B",
    "text": "A component-level model of the deployed system, which the client platform engineers keep synchronised with the codebase after the architect leaves."
   },
   {
    "key": "C",
    "text": "The versioned eval suite with its golden dataset, pass thresholds, and the procedure for re-running it before any prompt, model or retrieval change ships."
   },
   {
    "key": "D",
    "text": "A recorded ninety-minute system walkthrough by the architect plus a shared channel where the client can ask the architect questions for six months."
   },
   {
    "key": "E",
    "text": "A decision record covering the architectural choices made, the options rejected and what reversing each choice would now cost the client."
   }
  ],
  "correct": [
   "A",
   "C",
   "E"
  ],
  "rationale": "Operability rests on knowing what breaks and what to do about it, on being able to prove a change is safe before shipping it, and on understanding why the system is shaped the way it is when the team is asked to change it. Those three artifacts let a non-specialist team run, diagnose and evolve the system without the architect.",
  "distractors": {
   "B": "Structural detail is not operational knowledge, and a diagram the team must keep in sync becomes stale maintenance rather than support.",
   "D": "A recording plus an open question channel preserves the dependence that handoff is meant to end, and the channel expires with the goodwill."
  },
  "objective": "Document architectures and provide implementation guidance",
  "src": [
   {
    "t": "No vendor documentation exists for this objective. Anthropic publishes nothing on discovery method, SLA design for probabilistic systems, handoff standards or lifecycle phases. Source of record is CCAR-P Prep Course 4, Stakeholder Engagement, Lifecycle & GTM (178 min). Treat this item's key as the defensible consulting answer, not a vendor-canonical one.",
    "type": "inferred"
   },
   {
    "t": "Claude Code best practices: explore, plan, code, commit; CLAUDE.md",
    "u": "https://www.anthropic.com/engineering/claude-code-best-practices",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D6-08",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "multi",
  "stem": "A single-agent retrieval-backed support system has run in production for nine months. Over the last quarter its escalation-to-human rate has drifted from 7% to 21%. The client engineering lead argues the pattern has hit its ceiling and proposes a multi-agent re-architecture at roughly 300,000 dollars over a quarter. The Head of Customer Operations, who owns both the escalation metric and the budget, wants the existing system fixed within six weeks. No failure taxonomy has ever been built. Which TWO actions should the architect take first? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Endorse the re-architecture, since a threefold rise in escalations within a single quarter is strong evidence the single-agent pattern has reached its limit."
   },
   {
    "key": "B",
    "text": "Classify a sample of recent escalations into a failure taxonomy to establish whether the causes are retrieval, prompt, routing, data drift or genuinely architectural."
   },
   {
    "key": "C",
    "text": "Restore the metric quickly by tightening the escalation routing threshold, which buys time for a fuller diagnosis to run in the background."
   },
   {
    "key": "D",
    "text": "Set out both paths to the Head of Customer Operations with the cost, the risk and the reversal cost of each, and let her make the call as the accountable owner."
   },
   {
    "key": "E",
    "text": "Refer the disagreement to the client CIO for a ruling, since the engineering lead and the operations head hold incompatible positions on the same system."
   }
  ],
  "correct": [
   "B",
   "D"
  ],
  "rationale": "Iterate-versus-re-architect is not answerable from a metric alone; the taxonomy tells you whether the failures live inside the current architecture or outside it, and it costs days rather than a quarter. Once evidence exists, the architect frames both options with cost, risk and reversal cost and leaves the choice with the person accountable for the metric and the money.",
  "distractors": {
   "A": "Commits a quarter and a large budget on a symptom, when drift of this shape is at least as often retrieval staleness or changed input mix.",
   "C": "Suppresses the signal rather than the fault, and the escalations it removes are the ones that were being caught correctly.",
   "E": "Escalation substitutes for the analysis that would settle the disagreement, and the CIO has less context than either party."
  },
  "objective": "Communicate architectural decisions and trade-offs",
  "src": [
   {
    "t": "No vendor documentation exists for this objective. Anthropic publishes nothing on discovery method, SLA design for probabilistic systems, handoff standards or lifecycle phases. Source of record is CCAR-P Prep Course 4, Stakeholder Engagement, Lifecycle & GTM (178 min). Treat this item's key as the defensible consulting answer, not a vendor-canonical one.",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D6-09",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "match",
  "stem": "A six-month engagement with a retail bank is building a Claude-based complaints handling system. Four situations arise at different points in the delivery, each with a different accountable stakeholder and a different amount of work already committed. Match each situation to the single most appropriate action. A choice may be used more than once, or not at all.",
  "prompts": [
   {
    "id": "p1",
    "text": "In week 2, the Head of Compliance asks for a dashboard that flags risky complaints; no one in the room can say what action a flag triggers or who is accountable for taking it."
   },
   {
    "id": "p2",
    "text": "The client engineering lead wants Bedrock for procurement reasons while the architect prefers the direct API for earlier model access; the CFO asks which is cheaper, and switching later would cost about three weeks."
   },
   {
    "id": "p3",
    "text": "In week 14, with build well underway, the VP of Customer Support says the real problem is not drafting complaint responses but identifying which complaints must reach a human within 24 hours."
   },
   {
    "id": "p4",
    "text": "Two weeks before the architect rolls off, the bank's support operations manager asks the architect to keep running the monthly eval and to remain on the incident channel."
   }
  ],
  "choices": [
   "Reopen requirements with the accountable business owner before further build work continues",
   "Document the decision with its cost, its risk and what a reversal would take, then let the accountable sponsor choose",
   "Transfer operational ownership with runbooks, eval thresholds and escalation paths before the architect rolls off",
   "Treat the signal as production evidence and route the change through the agreed change control checkpoint"
  ],
  "correct": {
   "p1": "Reopen requirements with the accountable business owner before further build work continues",
   "p2": "Document the decision with its cost, its risk and what a reversal would take, then let the accountable sponsor choose",
   "p3": "Reopen requirements with the accountable business owner before further build work continues",
   "p4": "Transfer operational ownership with runbooks, eval thresholds and escalation paths before the architect rolls off"
  },
  "rationale": "p1 and p3 are both requirement failures rather than design or delivery failures: a flag with no owning action and a misidentified decision are the same defect found at different costs, and continuing to build past either multiplies the waste. p2 is a genuine trade-off with a quantifiable reversal cost, so it is documented and decided by the sponsor who carries the money. p4 is a handoff request that would leave the bank operationally dependent on a departing architect. The change control choice applies to none of these, since none is a post-launch production signal.",
  "objective": "Support lifecycle phases: discovery, design, handoff, monitoring, iteration",
  "src": [
   {
    "t": "No vendor documentation exists for this objective. Anthropic publishes nothing on discovery method, SLA design for probabilistic systems, handoff standards or lifecycle phases. Source of record is CCAR-P Prep Course 4, Stakeholder Engagement, Lifecycle & GTM (178 min). Treat this item's key as the defensible consulting answer, not a vendor-canonical one.",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "D7-01",
  "domain": "Developer Productivity & Operational Enablement",
  "type": "single",
  "stem": "A 40 engineer platform team adopted Claude Code six weeks ago. Output quality varies sharply by developer: some get code that matches the repository's module boundaries and test conventions, others get plausible code that ignores both. Interviews show the effective developers paste the same 300 word context blurb into every session, while the rest start cold. What is the highest leverage fix?",
  "options": [
   {
    "key": "A",
    "text": "Run a half day workshop where the effective developers demonstrate their prompting approach to the rest of the team."
   },
   {
    "key": "B",
    "text": "Commit a project instruction file at the repository root covering module boundaries, test conventions and build commands, and treat it as reviewed code."
   },
   {
    "key": "C",
    "text": "Standardise on a single model and a shared set of tool permissions so every developer's sessions behave identically."
   },
   {
    "key": "D",
    "text": "Circulate the 300 word blurb in the team wiki with a short guide on pasting it at the start of each session."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "The working practice is project context that every session needs, so it belongs in a checked-in instruction file that loads automatically and evolves through normal review rather than in each developer's habits. Putting it under version control also makes the guidance auditable and keeps it correct as conventions change.",
  "distractors": {
   "A": "Training transfers technique but not the durable project facts, and it decays as conventions and staff change.",
   "C": "Model and permission uniformity addresses consistency of capability, not the missing repository knowledge.",
   "D": "A wiki page still depends on every developer remembering to paste it, which is the failure being observed."
  },
  "objective": "Configure Claude tools and environments for teams, for example Claude Code",
  "src": [
   {
    "t": "Claude Code memory and CLAUDE.md",
    "u": "https://code.claude.com/docs/en/memory",
    "type": "doc"
   },
   {
    "t": "Claude Code best practices: explore, plan, code, commit; CLAUDE.md",
    "u": "https://www.anthropic.com/engineering/claude-code-best-practices",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D7-02",
  "domain": "Developer Productivity & Operational Enablement",
  "type": "single",
  "stem": "At a healthtech company, developers using an agentic coding tool face 30 to 50 permission prompts per session, mostly for file reads, test runs and local git commands. Telemetry shows 96 percent are approved within two seconds, and one developer approved a command that pushed to a shared branch without reading it. Security will not accept blanket approval. What configuration best resolves this?",
  "options": [
   {
    "key": "A",
    "text": "Keep prompts on every action but add a five second minimum display time and a typed confirmation phrase, so approvals cannot be dismissed reflexively."
   },
   {
    "key": "B",
    "text": "Route all agent activity through a dedicated CI runner so nothing executes on developer machines and every action lands in the pipeline audit log."
   },
   {
    "key": "C",
    "text": "Sandbox the agent with no network egress and no writes outside the workspace, allow-list routine read, test and local git operations, and prompt only on irreversible actions."
   },
   {
    "key": "D",
    "text": "Add a deny list covering remote pushes, production credentials and package publication, and auto-approve every other action the agent proposes to take."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Prompt fatigue is a design failure, and the cure is to make the common case safe by construction so that the remaining prompts are rare enough to be read. Sandboxing bounds the blast radius of routine work while permission rules reserve human attention for the irreversible boundary.",
  "distractors": {
   "A": "Friction on all 50 prompts raises cost for every developer and habituation reasserts itself within days.",
   "B": "Moving execution to CI removes the interactive loop developers are adopting the tool for and does not decide what the agent may do.",
   "D": "Deny-by-exception fails open on anything not yet imagined, which security will not and should not accept."
  },
  "objective": "Configure Claude tools and environments for teams, for example Claude Code",
  "src": [
   {
    "t": "Claude Code sandboxing: bounding blast radius vs permission prompts",
    "u": "https://www.anthropic.com/engineering/claude-code-sandboxing",
    "type": "doc"
   },
   {
    "t": "Claude Code IAM: permission rules, allow and deny lists",
    "u": "https://code.claude.com/docs/en/iam",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D7-03",
  "domain": "Developer Productivity & Operational Enablement",
  "type": "single",
  "stem": "A retail bank's support agent began quoting superseded overdraft fees about 4 percent of the time, always for customers whose product terms changed in the previous 48 hours. A developer patched it by adding the line always call the entitlements tool before quoting a fee to the system prompt; the rate dropped to 1.5 percent and the ticket was closed. It has since drifted back to 3 percent. What is the correct next step?",
  "options": [
   {
    "key": "A",
    "text": "Raise the retrieval top-k and lower the similarity threshold so recently amended product terms are more likely to surface in the retrieved set."
   },
   {
    "key": "B",
    "text": "Add an output guardrail that compares every quoted fee against the entitlements tool and blocks the response on mismatch."
   },
   {
    "key": "C",
    "text": "Strengthen the instruction with an explicit refusal rule that forbids stating any fee when the tool has not been called in the current turn."
   },
   {
    "key": "D",
    "text": "Trace one failing case end to end to establish whether the retrieval index lags the product terms source, and fix the freshness contract there."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "A defect that correlates exactly with a 48 hour window is a data freshness signature, and a prompt change that moves the rate without eliminating the pattern is surface patching that drifts back. The architect's job is to trace the symptom to the architectural cause before choosing a control.",
  "distractors": {
   "A": "Tuning retrieval parameters cannot surface a document the index has not yet ingested.",
   "B": "A guardrail is worth having but it compares the answer against the same possibly stale source, so it can pass a wrong fee.",
   "C": "More forceful wording is the same class of fix that already regressed, and it cannot make stale data current."
  },
  "objective": "Support debugging and operational issue resolution",
  "src": [
   {
    "t": "CCAR-P Exam Guide v1.0, §6 — D7: Support debugging and operational issue resolution",
    "u": "",
    "type": "guide"
   },
   {
    "t": "Claude Code best practices: explore, plan, code, commit; CLAUDE.md",
    "u": "https://www.anthropic.com/engineering/claude-code-best-practices",
    "type": "doc"
   }
  ]
 },
 {
  "id": "D7-04",
  "domain": "Developer Productivity & Operational Enablement",
  "type": "multi",
  "stem": "A consultancy is completing a nine month build and hands the system to the client's six person engineering team next month. The client team has no prior LLM production experience, and the consultancy's two architects leave the account entirely at handover. Which three enablement measures most reduce the risk that the client cannot operate the system? (Select THREE.)",
  "options": [
   {
    "key": "A",
    "text": "Deliver a comprehensive architecture document covering every component, decision and integration, signed off by both parties at handover."
   },
   {
    "key": "B",
    "text": "Have the client team run the next two production incidents themselves, with the consultancy observing silently and debriefing afterwards."
   },
   {
    "key": "C",
    "text": "Transfer the eval suite together with the failure cases it was built from, and require the client to extend it before the architects leave."
   },
   {
    "key": "D",
    "text": "Retain the consultancy's architects on a six month advisory contract so the client can escalate issues they cannot resolve alone."
   },
   {
    "key": "E",
    "text": "Set per-project spend limits and usage dashboards owned by the client, with alert thresholds the client team configures and tests."
   }
  ],
  "correct": [
   "B",
   "C",
   "E"
  ],
  "rationale": "Operational capability transfers through supervised practice, a living test asset the client can extend, and cost visibility the client actually controls. All three leave the client able to diagnose, verify and constrain the system once the builders are gone.",
  "distractors": {
   "A": "Documentation is necessary but static; a signed-off document does not create the diagnostic skill the team lacks.",
   "D": "The scenario states the architects leave the account, and an escalation path also postpones rather than builds client capability."
  },
  "objective": "Improve developer workflows using AI-assisted tooling",
  "src": [
   {
    "t": "Claude Code overview",
    "u": "https://code.claude.com/docs/en/overview",
    "type": "doc"
   },
   {
    "t": "Demystifying evals for AI agents: pass@k vs pass^k, grader types, building from real failures",
    "u": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D1-01",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "An insurer processes 3,000 motor claim forms a day. Every form goes through the same steps: extract 14 fields, check them against the policy record, then draft an acknowledgement letter. About 6% of forms fail the policy check because a field was misread, and those need the extraction redone before a letter can be drafted. Which design fits best?",
  "options": [
   {
    "key": "A",
    "text": "A prompt chain of extraction, policy check and drafting, with a programmatic gate after the check that sends failed forms back to extraction."
   },
   {
    "key": "B",
    "text": "An evaluator-optimizer loop around every step, so each step is scored and revised until a judge passes it."
   },
   {
    "key": "C",
    "text": "An autonomous agent given the three steps as tools, deciding for each form which steps to run and in what order."
   },
   {
    "key": "D",
    "text": "An orchestrator that spawns one worker per field, with a synthesiser assembling the 14 results before the policy check."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "The steps are fixed and known, which makes this prompt chaining. The only variable is a retry on one known failure, and a code gate handles that deterministically. Nothing about the work needs the model to choose its own path.",
  "distractors": {
   "B": "A judge loop on every step triples the calls to fix a 6% failure that a deterministic check already catches.",
   "C": "The path is known in advance, so model-directed control adds cost and variance without a benefit.",
   "D": "The fields don't need separate decomposition. One extraction call handles 14 fields, and per-field workers multiply calls for no gain."
  },
  "objective": "Select appropriate architectural patterns (workflow, agentic, augmented LLM)",
  "src": [
   {
    "t": "Anthropic, Building effective agents: prompt chaining with programmatic gates",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D1-02",
  "domain": "Solution Design & Architecture",
  "type": "multi",
  "stem": "A security team wants Claude to review pull requests. The checks needed depend on what each PR touches: a Terraform change needs IAM review, a payments change needs PCI checks, and a front-end change needs neither. Which two characteristics justify an orchestrator-workers design over parallelization? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "The subtasks cannot be listed until the specific PR has been examined."
   },
   {
    "key": "B",
    "text": "The same three security checks must run on every PR regardless of what it changes."
   },
   {
    "key": "C",
    "text": "A central model has to decide how to split each PR and then synthesise whatever the workers return."
   },
   {
    "key": "D",
    "text": "Cost per PR must stay flat, so every review uses the same number of calls."
   },
   {
    "key": "E",
    "text": "Running subtasks at the same time lowers latency compared with running them one after another."
   }
  ],
  "correct": [
   "A",
   "C"
  ],
  "rationale": "Orchestrator-workers fits when the subtasks aren't known ahead of time and a model must decompose the input, then synthesise the results. Parallelization fits a fixed, known set of subtasks.",
  "distractors": {
   "B": "A fixed set of checks on every input is the parallelization case.",
   "D": "Flat, predictable cost favours a fixed workflow. Orchestrator-workers varies its call count per input.",
   "E": "Both patterns can run workers concurrently, so latency doesn't separate them."
  },
  "objective": "Select appropriate architectural patterns (workflow, agentic, augmented LLM)",
  "src": [
   {
    "t": "Anthropic, Building effective agents: orchestrator-workers vs parallelization",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D1-03",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "A team proposes a planner, researcher and writer multi-agent system to answer staff questions about a 300-page HR handbook. A prototype built as a single call with retrieval over the handbook scores 93% on the agreed evaluation set against a 90% bar, at about one fifteenth of the multi-agent token cost. What should the architect recommend?",
  "options": [
   {
    "key": "A",
    "text": "Run both designs on every question and return the answer that the two agree on, falling back to the single call."
   },
   {
    "key": "B",
    "text": "Ship the multi-agent system, since it will scale to future question types the handbook does not yet cover."
   },
   {
    "key": "C",
    "text": "Ship the single call with retrieval, and revisit the design only if new requirements push the evaluation below the bar."
   },
   {
    "key": "D",
    "text": "Ship the multi-agent system on a smaller model tier so that its token cost comes closer to the single call."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Start with the simplest solution that meets the bar. The augmented LLM clears 90% at a fraction of the cost, and complexity should be added only when a measured gap demands it.",
  "distractors": {
   "A": "Running both roughly doubles cost and latency to solve a problem the evaluation doesn't show.",
   "B": "Building for hypothetical future needs is the over-engineering trap. The requirement is met today.",
   "D": "A cheaper tier cuts cost but keeps the added complexity and coordination failure modes, for no measured gain."
  },
  "objective": "Balance complexity, cost and capability in solution design",
  "src": [
   {
    "t": "Anthropic, Building effective agents: find the simplest solution possible",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   },
   {
    "t": "Anthropic, How we built our multi-agent research system: token cost of multi-agent",
    "u": "https://www.anthropic.com/engineering/multi-agent-research-system",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D1-04",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "A due-diligence agent runs for about three hours per target company. Late in a run its context is dominated by old tool outputs, and it re-investigates questions it already answered because the earlier findings have been pushed out. Which change addresses this most directly?",
  "options": [
   {
    "key": "A",
    "text": "Have the agent write findings to a persistent notes file as it goes, and read the notes back when it resumes or plans its next step."
   },
   {
    "key": "B",
    "text": "Truncate tool outputs older than one hour from the context, keeping only the most recent results in view."
   },
   {
    "key": "C",
    "text": "Move to a model with a larger context window so that the earlier findings stay in context for the whole run."
   },
   {
    "key": "D",
    "text": "Add a system prompt instruction telling the agent to keep track of what it has already investigated."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "Structured note-taking keeps durable findings outside the context window. The agent can drop bulky raw outputs and still hold on to what it learned, which is the failure described.",
  "distractors": {
   "B": "Clearing old outputs without keeping the findings loses exactly the information the agent is re-deriving.",
   "C": "A larger window delays the problem and raises cost, and long contexts still degrade recall of early material.",
   "D": "The agent can't track what is no longer in its context. An instruction doesn't create memory."
  },
  "objective": "Design context management for long-running agents",
  "src": [
   {
    "t": "Anthropic, Effective context engineering for AI agents: structured note-taking",
    "u": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D1-05",
  "domain": "Solution Design & Architecture",
  "type": "multi",
  "stem": "A coding agent delegates exploration of a large unfamiliar codebase to subagents, and each returns a condensed summary to the main agent. Which two benefits does this design deliver? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "The subagents share the main agent's context, so nothing they find is lost in the handoff."
   },
   {
    "key": "B",
    "text": "The findings become deterministic, because each subagent follows the same exploration steps."
   },
   {
    "key": "C",
    "text": "Separate areas of the codebase can be explored at the same time by different subagents."
   },
   {
    "key": "D",
    "text": "Total token consumption across the task falls, because each subagent works on a smaller slice."
   },
   {
    "key": "E",
    "text": "The main agent's context stays focused, because the raw exploration output never enters it."
   }
  ],
  "correct": [
   "C",
   "E"
  ],
  "rationale": "Subagents give context isolation, so only the distilled summary returns, and they allow parallel exploration.",
  "distractors": {
   "A": "Subagents have their own contexts. Only what they return reaches the main agent, which is the point.",
   "B": "Model-directed exploration isn't deterministic, and splitting it across subagents doesn't change that.",
   "D": "Multi-agent designs usually consume more tokens in total. The benefit is focus and parallelism, not a smaller bill."
  },
  "objective": "Design multi-agent systems and context isolation",
  "src": [
   {
    "t": "Anthropic, Effective context engineering for AI agents: sub-agent architectures",
    "u": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D1-06",
  "domain": "Solution Design & Architecture",
  "type": "match",
  "stem": "A travel company is planning four Claude-based capabilities. Match each requirement to the pattern that fits it best. A pattern may be used more than once, or not at all.",
  "prompts": [
   {
    "id": "p1",
    "text": "Marketing copy is translated into seven languages. Each translation must follow a brand glossary, and it is revised and rechecked against the glossary until it passes or three attempts are used."
   },
   {
    "id": "p2",
    "text": "Inbound emails fall into six stable categories (booking change, refund, visa query, complaint, loyalty, other), each handled by a different prompt and policy."
   },
   {
    "id": "p3",
    "text": "Every supplier contract must be reviewed for legal, tax and data-privacy issues. The three reviews are independent and their findings are merged into one memo."
   },
   {
    "id": "p4",
    "text": "An engineer asks Claude to fix a failing deployment pipeline in a repository it has not seen, where the cause and the number of steps are unknown until it investigates."
   }
  ],
  "choices": [
   "Prompt chaining",
   "Routing",
   "Parallelization",
   "Orchestrator-workers",
   "Evaluator-optimizer",
   "Autonomous agent"
  ],
  "correct": {
   "p1": "Evaluator-optimizer",
   "p2": "Routing",
   "p3": "Parallelization",
   "p4": "Autonomous agent"
  },
  "rationale": "Clear criteria with iterative revision is evaluator-optimizer. Distinct, stable categories is routing. Fixed, independent subtasks merged afterwards is parallelization. An unknown path that needs environment feedback is an agent.",
  "objective": "Select appropriate architectural patterns (workflow, agentic, augmented LLM)",
  "src": [
   {
    "t": "Anthropic, Building effective agents: workflow patterns and agents",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D1-07",
  "domain": "Solution Design & Architecture",
  "type": "single",
  "stem": "An infrastructure agent can list resources, read metrics, resize instances, delete storage buckets and change IAM policies in production. The platform lead wants engineers to stop approving every action, which currently takes about 60 approvals per session. Where should human approval sit?",
  "options": [
   {
    "key": "A",
    "text": "Before actions that are irreversible or broaden access, such as deleting buckets and changing IAM, while read-only and easily reversed actions run without approval."
   },
   {
    "key": "B",
    "text": "At the end of each session, where an engineer reviews a summary of all actions taken and flags any concerns."
   },
   {
    "key": "C",
    "text": "Before every action that touches production, since any production change can have unforeseen consequences."
   },
   {
    "key": "D",
    "text": "Nowhere in the loop, relying instead on infrastructure snapshots so any harmful change can be rolled back afterwards."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "Put checkpoints where the impact is high and the action can't be undone. Low-risk, reversible operations run freely, which removes the approval fatigue while keeping control where it matters.",
  "distractors": {
   "B": "Reviewing afterwards can't stop an irreversible deletion or an access grant.",
   "C": "This is the status quo that causes approval fatigue. People rubber-stamp 60 prompts, which weakens the control.",
   "D": "Snapshots don't reverse a deleted bucket's data loss outside snapshot scope, or an IAM change that has already been exploited."
  },
  "objective": "Define autonomy boundaries and human checkpoints for agents",
  "src": [
   {
    "t": "Anthropic, Building effective agents: human checkpoints and guardrails",
    "u": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D3-01",
  "domain": "Integration",
  "type": "single",
  "stem": "A support agent answers 'Where is my order?' by calling get_customer, then list_orders, then get_order once for each of up to five orders, and passing IDs between calls. Median latency is 11 seconds, and 4% of runs fail because an ID was passed wrongly between calls. Which change best fits how tools should be designed for agents?",
  "options": [
   {
    "key": "A",
    "text": "Instruct the agent in the system prompt to double-check each ID before passing it to the next tool."
   },
   {
    "key": "B",
    "text": "Replace the chain with one tool that takes the customer's identifier and returns their recent orders with status, shaped for this task."
   },
   {
    "key": "C",
    "text": "Split get_order into smaller tools for status, items and shipping so that each call returns less data."
   },
   {
    "key": "D",
    "text": "Move to a larger model that tracks identifiers across chained tool calls more reliably."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "Tools for agents should match the task and consolidate multi-step chains that are always called together. That removes both the latency of several round trips and the ID-passing errors.",
  "distractors": {
   "A": "An instruction reduces errors probabilistically but leaves every round trip in place.",
   "C": "More granular tools mean more calls and more places to pass IDs wrongly, which is the opposite direction.",
   "D": "A larger model may lower the error rate, but it adds cost and doesn't address the latency of five sequential calls."
  },
  "objective": "Design tool interfaces for agents",
  "src": [
   {
    "t": "Anthropic, Writing effective tools for agents: consolidate functionality",
    "u": "https://www.anthropic.com/engineering/writing-tools-for-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D3-02",
  "domain": "Integration",
  "type": "single",
  "stem": "An agent has two tools, search_kb (\"Search the knowledge base\") and search_tickets (\"Search tickets\"). For questions like 'has anyone reported this bug before?' it calls search_kb 40% of the time and gets no useful results. Which change most directly fixes the tool choice?",
  "options": [
   {
    "key": "A",
    "text": "Rewrite each description to say what the tool searches, what it returns, when to use it and when to use the other tool instead, with parameter formats."
   },
   {
    "key": "B",
    "text": "Lower the temperature so that the agent's tool choice becomes more consistent between runs."
   },
   {
    "key": "C",
    "text": "Add a system prompt rule stating that questions mentioning bugs must always go to search_tickets first."
   },
   {
    "key": "D",
    "text": "Merge the two tools into one search tool that queries both sources and returns the combined results."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "The model chooses tools from their descriptions. Two one-line descriptions give it nothing to separate them by. Clear descriptions with when-to-use guidance are the primary lever.",
  "distractors": {
   "B": "Consistency at a lower temperature would make the agent consistently pick from two descriptions that are still ambiguous.",
   "C": "A keyword rule covers one phrasing and misses the rest, and it leaves the real cause, vague descriptions, in place.",
   "D": "Merging can work sometimes, but it doubles retrieval noise and cost here without fixing why the model can't tell the sources apart."
  },
  "objective": "Design tool interfaces for agents",
  "src": [
   {
    "t": "Anthropic, Writing effective tools for agents: prompt-engineer tool descriptions",
    "u": "https://www.anthropic.com/engineering/writing-tools-for-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D3-03",
  "domain": "Integration",
  "type": "multi",
  "stem": "An HR platform team is building one MCP server so that five internal AI clients can read and update employee records. Access must follow each employee's existing HR permissions. Which two design choices should the architect require? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Describe the access rules in each tool description, so the calling model knows which records to request."
   },
   {
    "key": "B",
    "text": "Return complete employee records from every read, so each client's model can filter out what the user may not see."
   },
   {
    "key": "C",
    "text": "Separate read tools from write tools, with the server enforcing authorisation on every write regardless of which client calls it."
   },
   {
    "key": "D",
    "text": "Propagate the end user's identity to the server so it applies that person's HR permissions to each request."
   },
   {
    "key": "E",
    "text": "Connect the server with one service account that has full HR rights, so every client works the same way."
   }
  ],
  "correct": [
   "C",
   "D"
  ],
  "rationale": "Authorisation has to be enforced by the server, using the real user's identity. A model reading a description or filtering a result is a probabilistic control, not an access boundary.",
  "distractors": {
   "A": "Tool descriptions guide the model's choices. They don't enforce anything.",
   "B": "Once the full record reaches the model, the data has already crossed the boundary. Controls sit where data enters.",
   "E": "A shared admin account removes per-user permissions entirely. Every caller can see everything."
  },
  "objective": "Design MCP integrations with secure identity and authorisation",
  "src": [
   {
    "t": "Model Context Protocol specification: authorization",
    "u": "https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D3-04",
  "domain": "Integration",
  "type": "single",
  "stem": "A contract Q&A system splits agreements into 500-token chunks. Many chunks read like 'The Supplier shall indemnify the Buyer within 30 days', with no indication of which agreement, which parties or which section they come from, so retrieval often returns the right clause from the wrong contract. Which change addresses this?",
  "options": [
   {
    "key": "A",
    "text": "Switch to a larger generation model that can tell from the wording which contract a clause belongs to."
   },
   {
    "key": "B",
    "text": "Retrieve the top 30 chunks instead of the top 5 so that the correct contract's clause is more likely to be included."
   },
   {
    "key": "C",
    "text": "Before embedding, prepend each chunk with a short generated description that places it in its document, naming the agreement, parties and section."
   },
   {
    "key": "D",
    "text": "Cut chunks to 150 tokens so that each one holds a single clause and matches queries more precisely."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "This is the problem contextual retrieval solves. Chunks that lose their document context are indistinguishable, and adding chunk-specific context before embedding and indexing restores it.",
  "distractors": {
   "A": "The generator can't recover information that isn't in the retrieved text.",
   "B": "More candidates adds noise and cost, and the chunks still can't be told apart.",
   "D": "Smaller chunks carry even less context, which makes the wrong-contract problem worse."
  },
  "objective": "Design retrieval pipelines (chunking, indexing, contextual retrieval)",
  "src": [
   {
    "t": "Anthropic, Introducing Contextual Retrieval",
    "u": "https://www.anthropic.com/news/contextual-retrieval",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D3-05",
  "domain": "Integration",
  "type": "single",
  "stem": "In a policy assistant, the gold passage appears somewhere in the top 20 retrieved results 95% of the time, but in the top 5 only 61% of the time. Only the top 5 are passed to Claude, and wrong answers track cases where the gold passage ranked 6th to 20th. Which change targets this?",
  "options": [
   {
    "key": "A",
    "text": "Increase chunk size so that each chunk covers more of the policy and fewer are needed."
   },
   {
    "key": "B",
    "text": "Pass all 20 candidates to Claude so that the gold passage is almost always in context."
   },
   {
    "key": "C",
    "text": "Fine-tune the embedding model on the policy corpus so that first-stage similarity scores improve."
   },
   {
    "key": "D",
    "text": "Add a reranking step that scores the top 20 or more candidates against the query and passes the best five to Claude."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "Recall at 20 is fine. Ordering is the failure. A reranker is built for exactly this: reordering a recalled candidate set so the best passages rise into the context budget.",
  "distractors": {
   "A": "Larger chunks change the recall and noise trade-off without fixing the ranking.",
   "B": "This works partially, but it quadruples retrieved tokens and adds distracting passages that dilute answer quality.",
   "C": "Fine-tuning is a heavy, slow intervention aimed at recall, which is already adequate."
  },
  "objective": "Design retrieval pipelines (chunking, indexing, contextual retrieval)",
  "src": [
   {
    "t": "Anthropic, Introducing Contextual Retrieval: reranking",
    "u": "https://www.anthropic.com/news/contextual-retrieval",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D3-06",
  "domain": "Integration",
  "type": "multi",
  "stem": "A nightly job classifies 200,000 documents with the same 4,000-token instruction block. Results are needed by 8am, the job hits rate limits, and finance wants lower cost. Which two changes fit? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Raise client concurrency so that the job finishes before the rate limit window resets."
   },
   {
    "key": "B",
    "text": "Retry immediately on each rate-limit error so that throughput stays as high as possible."
   },
   {
    "key": "C",
    "text": "Switch every request to streaming so that each classification returns sooner."
   },
   {
    "key": "D",
    "text": "Submit the documents through the Message Batches API, since results are not needed in real time."
   },
   {
    "key": "E",
    "text": "Cache the shared instruction block so that repeated requests read it from cache."
   }
  ],
  "correct": [
   "D",
   "E"
  ],
  "rationale": "Asynchronous batch processing costs less and suits a deadline measured in hours. Caching a large shared prefix cuts input cost and processing on every call.",
  "distractors": {
   "A": "More concurrency hits the rate limits harder.",
   "B": "Immediate retries amplify load and turn rate limiting into a retry storm.",
   "C": "Streaming improves perceived latency for interactive users. It doesn't lower cost or help a batch job."
  },
  "objective": "Optimise integration cost and throughput",
  "src": [
   {
    "t": "Claude docs: Batch processing",
    "u": "https://docs.claude.com/en/docs/build-with-claude/batch-processing",
    "type": "doc"
   },
   {
    "t": "Claude docs: Prompt caching",
    "u": "https://docs.claude.com/en/docs/build-with-claude/prompt-caching",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D3-07",
  "domain": "Integration",
  "type": "single",
  "stem": "An internal assistant reads SharePoint through a connector that uses a single service account with access to every site. An intern asked about pay bands and received text from an executive compensation file the intern cannot open in SharePoint. Which change closes the gap?",
  "options": [
   {
    "key": "A",
    "text": "Add a system prompt rule telling the assistant not to disclose compensation information to junior staff."
   },
   {
    "key": "B",
    "text": "Remove the executive compensation site from the connector while keeping the service account for all other sites."
   },
   {
    "key": "C",
    "text": "Have the connector call SharePoint with the signed-in user's delegated identity, so SharePoint applies that user's own permissions."
   },
   {
    "key": "D",
    "text": "Scan responses for salary figures and block any response containing them before it is displayed."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "The assistant must see only what the user could see. Propagating the user's identity makes the source system enforce its existing permissions, for every site and every document.",
  "distractors": {
   "A": "The data has already reached the model. An instruction is a probabilistic filter on the way out.",
   "B": "This patches one site. Every other restricted document is still exposed through the over-privileged account.",
   "D": "Output filtering acts too late and too narrowly. It catches one data type and misses other restricted content."
  },
  "objective": "Implement identity propagation and least privilege in integrations",
  "src": [
   {
    "t": "INFERRED: identity propagation and least privilege (standard enterprise integration practice)",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D3-08",
  "domain": "Integration",
  "type": "single",
  "stem": "A downstream service parses Claude's JSON output into an invoice schema. About 3% of responses fail to parse because of a missing field or a stray comment. The prompt already says 'Return valid JSON only.' Which change most reliably fixes this?",
  "options": [
   {
    "key": "A",
    "text": "Add a regex repair step that strips comments and fills missing fields with nulls before parsing."
   },
   {
    "key": "B",
    "text": "Set the temperature to zero so that the model produces the same well-formed structure every time."
   },
   {
    "key": "C",
    "text": "Strengthen the instruction with capitals and an example, stating that any deviation from valid JSON breaks production."
   },
   {
    "key": "D",
    "text": "Constrain the output to the invoice schema using structured outputs or a tool definition with that schema, so responses conform by construction."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "When a program consumes the output, enforce the schema at the API level rather than asking for it in prose. Schema-constrained output removes the failure class.",
  "distractors": {
   "A": "Repair hides the errors, and filling nulls can silently corrupt invoices.",
   "B": "Temperature zero reduces variation but doesn't guarantee valid, complete JSON.",
   "C": "Stronger wording lowers the rate but can't guarantee conformance."
  },
  "objective": "Integrate model output with downstream systems",
  "src": [
   {
    "t": "Claude docs: Structured outputs",
    "u": "https://docs.claude.com/en/docs/build-with-claude/structured-outputs",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D4-01",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "A field-service agent gained 12 new tools last sprint. Since then, tool execution success (a called tool returns without error) is flat at 99%, tool-selection accuracy on the evaluation set has fallen from 94% to 81%, and final answer quality has fallen. The model version and prompts are unchanged. Where does the evidence place the fault?",
  "options": [
   {
    "key": "A",
    "text": "In the model, which has drifted since the last sprint and now reasons less reliably over tool results."
   },
   {
    "key": "B",
    "text": "In the tool servers, which are returning degraded data that lowers the final answer quality."
   },
   {
    "key": "C",
    "text": "In the answer-quality judge, which is scoring more strictly now that responses cite more tools."
   },
   {
    "key": "D",
    "text": "In tool selection over the expanded catalogue, where new tools likely overlap in purpose or description with existing ones."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "The signal that moved is selection accuracy, and the only change is the tool catalogue. Execution is flat, so the servers are fine. The model and prompts are unchanged.",
  "distractors": {
   "A": "The model version didn't change, and a hosted model doesn't drift between sprints without a version change.",
   "B": "Flat execution success and an unchanged server side point away from the servers.",
   "C": "The drop in quality is explained by the upstream selection drop, and nothing points to the judge."
  },
  "objective": "Diagnose quality regressions using layered evaluation signals",
  "src": [
   {
    "t": "INFERRED: layer localisation from observability signals",
    "type": "inferred"
   },
   {
    "t": "Anthropic, Writing effective tools for agents: overlapping tools confuse agents",
    "u": "https://www.anthropic.com/engineering/writing-tools-for-agents",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D4-02",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "A team wants a model-based judge as the release gate for a claims-letter assistant. On a 100-letter audit, the judge's pass or fail verdict matches senior reviewers on 62 letters. What should happen before the judge gates releases?",
  "options": [
   {
    "key": "A",
    "text": "Refine the judge's rubric and examples against human-labelled letters until agreement reaches an agreed level, then use it as the gate."
   },
   {
    "key": "B",
    "text": "Retire the human audit and rely on the judge, since it is cheaper and its verdicts are applied consistently."
   },
   {
    "key": "C",
    "text": "Run the judge three times per letter and gate on the majority verdict, which removes its run-to-run noise."
   },
   {
    "key": "D",
    "text": "Switch the judge to the largest available model and begin gating immediately, since larger judges track human views more closely."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "A judge is a measuring instrument and has to be calibrated against humans before its verdicts can gate anything. 62% agreement is barely above chance for a pass or fail call.",
  "distractors": {
   "B": "Consistency isn't validity. An uncalibrated judge is consistently wrong 38% of the time.",
   "C": "Majority voting reduces noise, but a judge applying the wrong standard stays wrong, just more consistently.",
   "D": "A larger judge might agree more, or might not. It has to be measured, not assumed."
  },
  "objective": "Design and validate automated evaluation (LLM-as-judge)",
  "src": [
   {
    "t": "Claude docs: Develop test cases (grading methods and rubric design)",
    "u": "https://docs.claude.com/en/docs/test-and-evaluate/develop-tests",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D4-03",
  "domain": "Evaluation, Testing & Optimization",
  "type": "multi",
  "stem": "A claims assistant serves five intents. Two of them, fraud disputes and bereavement claims, make up 3% of traffic but carry most of the regulatory risk. Which two choices should shape its evaluation set? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Sample cases strictly in proportion to production traffic, so the overall score reflects what users experience."
   },
   {
    "key": "B",
    "text": "Stratify the set so the two high-risk intents have enough cases to measure their accuracy on their own."
   },
   {
    "key": "C",
    "text": "Include edge and adversarial cases drawn from real production failures and complaints."
   },
   {
    "key": "D",
    "text": "Reuse the cases the prompt was tuned on, so that each new release is compared on familiar ground."
   },
   {
    "key": "E",
    "text": "Keep only cases the current release passes, so that any failure in a new release signals a regression."
   }
  ],
  "correct": [
   "B",
   "C"
  ],
  "rationale": "Risk-weighted coverage and hard real-world cases make the set measure what matters. Proportional sampling would leave the high-risk intents with a handful of cases.",
  "distractors": {
   "A": "At 3% of traffic, a proportional set gives the riskiest intents too few cases to say anything about them.",
   "D": "Tuning cases measure fit to themselves, not performance.",
   "E": "A set of cases you already pass hides known weaknesses and can't show improvement."
  },
  "objective": "Design representative, risk-weighted evaluation datasets",
  "src": [
   {
    "t": "Claude docs: Develop test cases (edge cases, representative data)",
    "u": "https://docs.claude.com/en/docs/test-and-evaluate/develop-tests",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D4-04",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "A new prompt scores 88% and the current prompt scores 85% on the same 200 cases, with both prompts scored on every case. The product lead asks whether to ship the new prompt. Which response is most defensible?",
  "options": [
   {
    "key": "A",
    "text": "Rescore a 20-case subset by hand, and ship if the new prompt leads there too."
   },
   {
    "key": "B",
    "text": "Re-run both prompts at temperature zero, then ship if the new prompt still leads."
   },
   {
    "key": "C",
    "text": "Analyse the per-case differences between the two prompts, with an interval on the gain, before deciding whether the 3 points is real."
   },
   {
    "key": "D",
    "text": "Ship it, because a 3-point gain on 200 cases is large enough to be meaningful in practice."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Both prompts ran on the same cases, so a paired comparison of per-case wins and losses, with an interval, shows whether the gain exceeds noise. Three points on 200 cases may or may not.",
  "distractors": {
   "A": "A 20-case subset has even less statistical power than the full set.",
   "B": "Removing sampling variation doesn't test whether the gain generalises beyond these 200 cases.",
   "D": "Judging by gut feel isn't analysis. The gain could sit within noise."
  },
  "objective": "Apply statistical rigour to evaluation comparisons",
  "src": [
   {
    "t": "Anthropic, A statistical approach to model evaluations",
    "u": "https://www.anthropic.com/research/statistical-approach-to-model-evals",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D4-05",
  "domain": "Evaluation, Testing & Optimization",
  "type": "single",
  "stem": "An unattended billing-correction agent runs each case once and must get it right, since there is no human to pick a best attempt. The offline evaluation reports pass@5 of 96%. What is wrong with using that figure to approve deployment?",
  "options": [
   {
    "key": "A",
    "text": "The figure needs a confidence interval attached, after which it can be used to approve deployment."
   },
   {
    "key": "B",
    "text": "Nothing is wrong, since 96% across five attempts demonstrates that the agent can solve the cases."
   },
   {
    "key": "C",
    "text": "Five attempts is too few, and the team should report pass@10 so that the figure is statistically stable."
   },
   {
    "key": "D",
    "text": "pass@5 counts a case as solved if any of five attempts succeeds, while this deployment needs every single run to succeed, so per-attempt consistency must be measured."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "pass@k answers whether the agent can solve a case at least once in k tries, which suits settings where a human picks the best attempt. Unattended, single-shot execution needs reliability every time: the per-attempt success rate, or pass^k.",
  "distractors": {
   "A": "An interval on the wrong metric is still the wrong metric.",
   "B": "Being able to succeed isn't the same as reliably succeeding on the one run that counts.",
   "C": "pass@10 inflates the figure further and is even further from how the deployment runs."
  },
  "objective": "Select evaluation metrics that match deployment conditions",
  "src": [
   {
    "t": "INFERRED: pass@k vs pass^k (agent reliability metrics, e.g. tau-bench)",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D4-06",
  "domain": "Evaluation, Testing & Optimization",
  "type": "multi",
  "stem": "A contract-summary assistant has been live for two months. Most production requests have no ground-truth label. Which two practices detect quality drift in production? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Sample production traffic on a regular cycle and score it against the rubric with reviewers or a calibrated judge."
   },
   {
    "key": "B",
    "text": "Monitor latency and API error rates, since a quality problem will surface as a change in them."
   },
   {
    "key": "C",
    "text": "Re-run the original offline evaluation set monthly, since unchanged results show production is unchanged."
   },
   {
    "key": "D",
    "text": "Track user-behaviour proxies such as edits, regenerations and escalations, with thresholds that raise alerts."
   },
   {
    "key": "E",
    "text": "Ask the model to attach a self-assessed quality score to each summary and alert when it falls."
   }
  ],
  "correct": [
   "A",
   "D"
  ],
  "rationale": "Label-free monitoring combines sampled scoring of real traffic with behavioural proxies. Both see what users actually send, including drift in the inputs.",
  "distractors": {
   "B": "Operational health signals miss semantic quality problems entirely.",
   "C": "A fixed offline set can't see changes in what users send. It stays green while production drifts.",
   "E": "Self-reported quality isn't a calibrated measure, and the model can be wrong and confident."
  },
  "objective": "Design production monitoring for model quality",
  "src": [
   {
    "t": "INFERRED: production quality monitoring (sampled review plus behavioural proxies)",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D5-01",
  "domain": "Governance, Safety & Risk Management",
  "type": "single",
  "stem": "A research agent browses the open web and also has a send_email tool so it can deliver reports to clients. In testing, a web page containing hidden text caused the agent to email a client's draft report to an outside address. Which control is most effective?",
  "options": [
   {
    "key": "A",
    "text": "Run an input classifier over each fetched page and drop pages flagged as containing injections."
   },
   {
    "key": "B",
    "text": "Fine-tune the model on a corpus of known injection strings so that it learns to resist them."
   },
   {
    "key": "C",
    "text": "Require human confirmation for outbound email, and limit recipients to an allow-list, so untrusted content cannot trigger a high-impact action alone."
   },
   {
    "key": "D",
    "text": "Add a system prompt instruction telling the agent to ignore any instructions that appear inside web pages."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Prompt injection can't be reliably filtered out of untrusted content, so limit what untrusted content can trigger. Gate and scope the high-impact capability.",
  "distractors": {
   "A": "Classifiers help as one layer but miss novel injections. As the only control they leave email exfiltration open.",
   "B": "This teaches known patterns, and new wordings get through.",
   "D": "Instructions are a probabilistic defence, and injections are designed to override them."
  },
  "objective": "Mitigate prompt injection and tool misuse",
  "src": [
   {
    "t": "Claude docs: Mitigate jailbreaks and prompt injections",
    "u": "https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks",
    "type": "doc"
   },
   {
    "t": "INFERRED: least privilege for untrusted-input agents",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D5-02",
  "domain": "Governance, Safety & Risk Management",
  "type": "multi",
  "stem": "An audit finds that a support assistant's conversation logs contain full payment card numbers that customers typed, and that the logs have no deletion schedule. The vendor has confirmed zero data retention on its side. Which two controls should be added? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Set a retention period on the conversation logs, enforced by automated deletion with evidence of each deletion run."
   },
   {
    "key": "B",
    "text": "Instruct the model in the system prompt never to repeat a card number back to the customer."
   },
   {
    "key": "C",
    "text": "Cite the vendor's zero-retention commitment as the retention control for the conversation logs."
   },
   {
    "key": "D",
    "text": "Detect and mask card numbers in the application layer before the text is sent to the model and before it is written to the logs."
   },
   {
    "key": "E",
    "text": "Encrypt the log store at rest and keep the logs indefinitely for future quality analysis."
   }
  ],
  "correct": [
   "A",
   "D"
  ],
  "rationale": "Sensitive data is removed where it enters, deterministically and in your own code, and your own stores get your own retention control with evidence.",
  "distractors": {
   "B": "This controls what the model outputs, but the number has already been logged and sent to the model.",
   "C": "The vendor's commitment covers the vendor's side, not the company's own log store.",
   "E": "Encryption protects data at rest but doesn't limit how long card data is held, and keeping it indefinitely is the finding."
  },
  "objective": "Implement data protection and retention controls",
  "src": [
   {
    "t": "INFERRED: data minimisation at ingress; own-store retention",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D5-03",
  "domain": "Governance, Safety & Risk Management",
  "type": "single",
  "stem": "A lender's assistant drafts explanation letters for credit decisions, including approvals, requests for more information and denials. The team proposes auto-sending any draft the model scores above 0.9 confidence, and routing the rest to staff. What should the architect specify instead?",
  "options": [
   {
    "key": "A",
    "text": "Raise the auto-send threshold to 0.97 so that fewer uncertain drafts reach customers without review."
   },
   {
    "key": "B",
    "text": "Send each draft to a second model, and auto-send only when both models agree on the content."
   },
   {
    "key": "C",
    "text": "Route by consequence: denials and other adverse decisions always go to a named reviewer, while routine letters are sampled for quality review."
   },
   {
    "key": "D",
    "text": "Auto-send as proposed, and have compliance audit a sample of sent letters each month."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "Review should be routed by impact, not by the model's confidence. Adverse credit decisions carry regulatory and customer harm, and a model can be confident and wrong.",
  "distractors": {
   "A": "A higher threshold is still confidence-based, and confident errors pass straight through.",
   "B": "Agreement between models isn't human accountability, and correlated errors pass both.",
   "D": "Auditing after sending can't prevent a wrongful adverse letter from reaching a customer."
  },
  "objective": "Design risk-stratified human oversight",
  "src": [
   {
    "t": "INFERRED: risk-stratified human-in-the-loop (impact over confidence)",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D5-04",
  "domain": "Governance, Safety & Risk Management",
  "type": "single",
  "stem": "A candidate-screening assistant passed a pre-launch fairness evaluation and has now been in production for six months. The hiring team has since added two new job families, and the applicant mix has shifted. What ongoing control does governance require?",
  "options": [
   {
    "key": "A",
    "text": "Rely on the pre-launch fairness evaluation, since the model and the prompts have not changed since then."
   },
   {
    "key": "B",
    "text": "Periodic outcome-disparity analysis across protected groups on production decisions, with thresholds and a named owner who acts on breaches."
   },
   {
    "key": "C",
    "text": "Rely on the model vendor's responsible-use policy, which covers bias in the underlying model."
   },
   {
    "key": "D",
    "text": "Remove demographic fields from the inputs, which removes the need for further fairness measurement."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "Fairness has to be monitored in production because the inputs, the use cases and the populations change. A control needs a measure, a threshold and an owner who acts.",
  "distractors": {
   "A": "The job families and applicant mix have changed, so the pre-launch result no longer describes production.",
   "C": "The vendor policy covers the vendor's model, not this deployment's outcomes.",
   "D": "Proxies such as postcode, school and employment gaps can reintroduce disparity, and removing the fields also removes the ability to measure it."
  },
  "objective": "Monitor fairness and bias in production",
  "src": [
   {
    "t": "INFERRED: ongoing fairness monitoring (no operational vendor doc)",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D5-05",
  "domain": "Governance, Safety & Risk Management",
  "type": "single",
  "stem": "After mitigations, a patient-information assistant retains a residual risk: it may occasionally give dosage information that is correct but incomplete. The launch review asks who accepts this residual risk. Which answer is correct?",
  "options": [
   {
    "key": "A",
    "text": "A named business owner with the authority to accept that risk, whose decision and rationale are recorded in the risk register."
   },
   {
    "key": "B",
    "text": "The engineering team that built the mitigations, since it understands the residual risk best."
   },
   {
    "key": "C",
    "text": "The model vendor, since the residual behaviour originates in the model itself."
   },
   {
    "key": "D",
    "text": "No one: launch must wait until the residual risk has been reduced to zero."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "Risk acceptance is an accountable business decision. It is made by an owner with authority and documented so it can be reviewed and revisited.",
  "distractors": {
   "B": "Engineers inform the decision, but accepting business risk isn't theirs to do.",
   "C": "Accountability for a deployment can't be outsourced to the model provider.",
   "D": "No system has zero risk. The governance question is whether the residual risk is accepted by the right person, on record."
  },
  "objective": "Apply risk management and accountability",
  "src": [
   {
    "t": "INFERRED: risk acceptance by an accountable owner",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D5-06",
  "domain": "Governance, Safety & Risk Management",
  "type": "multi",
  "stem": "A telco's customer-facing support assistant can resolve billing disputes of up to $200. Which two practices meet transparency and accountability expectations toward customers? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Publish the full system prompt, so customers can see exactly how the assistant is instructed."
   },
   {
    "key": "B",
    "text": "Tell customers clearly that they are interacting with an AI assistant."
   },
   {
    "key": "C",
    "text": "State that every answer is reviewed by a human, to build customer confidence in the assistant."
   },
   {
    "key": "D",
    "text": "Offer a clear route to a human agent, especially for disputes and consequential outcomes."
   },
   {
    "key": "E",
    "text": "Present the assistant as a named human agent, to keep conversations feeling natural."
   }
  ],
  "correct": [
   "B",
   "D"
  ],
  "rationale": "Disclosure plus access to a human is the baseline for customer-facing AI that makes consequential decisions.",
  "distractors": {
   "A": "Transparency is about AI use and recourse. Publishing the system prompt exposes internals and invites manipulation.",
   "C": "This is false, which makes it a misrepresentation.",
   "E": "Impersonating a human is deceptive and the opposite of transparency."
  },
  "objective": "Apply transparency and user-protection principles",
  "src": [
   {
    "t": "INFERRED: AI disclosure and human recourse",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D6-01",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "single",
  "stem": "An executive sponsor wants a firm go-live date for a claims assistant announced at next week's town hall. The evaluation against the agreed 92% quality gate finishes in three weeks, and the latest interim reading is 89%. What should the architect give the sponsor?",
  "options": [
   {
    "key": "A",
    "text": "A target date stated as conditional on passing the 92% gate, with the interim reading and the plan to close the gap."
   },
   {
    "key": "B",
    "text": "No date at all until the evaluation completes, so that nothing is announced prematurely."
   },
   {
    "key": "C",
    "text": "A firm date to announce, since the interim reading is already close to the gate."
   },
   {
    "key": "D",
    "text": "A firm date, with the gate lowered to 89% if the evaluation has not reached 92% by then."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "Give the sponsor something they can use, a date, while keeping the quality gate intact and the risk visible. The dependency is stated, not hidden.",
  "distractors": {
   "B": "This is unhelpful to the sponsor. A conditional date is honest and usable.",
   "C": "This commits publicly to a date the evidence doesn't yet support.",
   "D": "Lowering an agreed gate to protect a date undermines the whole quality commitment."
  },
  "objective": "Communicate status and risk to executive stakeholders",
  "src": [
   {
    "t": "INFERRED: D6 has no vendor documentation; defensible consulting practice",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D6-02",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "single",
  "stem": "A law firm's litigation partners are sceptical of a Claude drafting assistant after hearing about hallucinated citations elsewhere. Leadership wants firm-wide adoption within two quarters. Which rollout approach is most likely to achieve it?",
  "options": [
   {
    "key": "A",
    "text": "Pilot with a small group of willing practitioners, measure accuracy and time saved on their real matters, and expand with that evidence and their advocacy."
   },
   {
    "key": "B",
    "text": "Hold the rollout until the assistant is shown never to produce a wrong citation."
   },
   {
    "key": "C",
    "text": "Train only the partners, and have them direct associates to use the assistant as they see fit."
   },
   {
    "key": "D",
    "text": "Mandate use across all practice groups from day one, so that adoption targets are met on schedule."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "Evidence gathered on the users' own work, together with peer champions, addresses scepticism directly and builds adoption that lasts.",
  "distractors": {
   "B": "An absolute standard that no system meets blocks value indefinitely. Controls such as citation verification manage the risk instead.",
   "C": "A top-down cascade skips the people doing the drafting and their concerns.",
   "D": "Mandates without evidence breed workarounds and entrench the scepticism."
  },
  "objective": "Drive adoption and change management",
  "src": [
   {
    "t": "INFERRED: pilot, measure, expand (change management)",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D6-03",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "multi",
  "stem": "A contact-centre director asks for a business case for a Claude-based agent assist tool, to be reviewed again at six months. Which three measures belong in it? (Select THREE.)",
  "options": [
   {
    "key": "A",
    "text": "Cost per resolved contact, including model usage and the cost of human review."
   },
   {
    "key": "B",
    "text": "A baseline and a target for a business outcome such as average handle time or first-contact resolution."
   },
   {
    "key": "C",
    "text": "The candidate model's rank on a public reasoning benchmark."
   },
   {
    "key": "D",
    "text": "The total number of tokens the tool processes each day."
   },
   {
    "key": "E",
    "text": "Adoption among the target agents, measured as the share of eligible contacts where the tool is used."
   }
  ],
  "correct": [
   "A",
   "B",
   "E"
  ],
  "rationale": "A business case ties to outcomes against a baseline, to full unit cost, and to adoption, because value that isn't used isn't realised.",
  "distractors": {
   "C": "Benchmark rank says nothing about this contact centre's outcomes.",
   "D": "Token volume is an input cost driver, not a measure of value. It belongs inside the cost measure."
  },
  "objective": "Define business value and success metrics",
  "src": [
   {
    "t": "INFERRED: business value framing (Prep Course 1 'business value pillars')",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D6-04",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "single",
  "stem": "Two weeks before launch, the sponsor asks for Bahasa Indonesia and Thai support to be added to an English-only assistant. The evaluation set covers English only. How should the architect respond?",
  "options": [
   {
    "key": "A",
    "text": "Assess the impact on evaluation coverage, timeline and risk, then give the sponsor options, such as launching in English now and adding the languages after evaluation."
   },
   {
    "key": "B",
    "text": "Add both languages quietly, since Claude handles them well and the sponsor has asked for them."
   },
   {
    "key": "C",
    "text": "Decline the request outright, since the scope was fixed at kick-off and cannot change."
   },
   {
    "key": "D",
    "text": "Add both languages for launch and extend the evaluation to cover them in the quarter after go-live."
   }
  ],
  "correct": [
   "A"
  ],
  "rationale": "A scope change goes through impact assessment and a decision by the sponsor, with the trade-offs visible. Unevaluated languages shouldn't launch silently.",
  "distractors": {
   "B": "Nothing has been measured in those languages. Claude's general multilingual ability isn't evidence for this task.",
   "C": "Refusing outright ignores a legitimate business need. The right move is structured change control.",
   "D": "This ships untested behaviour to customers and evaluates after the harm could already have happened."
  },
  "objective": "Manage scope change and lifecycle decisions",
  "src": [
   {
    "t": "INFERRED: change control with explicit trade-offs",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D6-05",
  "domain": "Stakeholder Communication & Lifecycle Management",
  "type": "single",
  "stem": "A support assistant quoted an outdated refund policy to about 300 customers over two days before the issue was caught. The COO asks for an update by end of day. What should the update contain?",
  "options": [
   {
    "key": "A",
    "text": "A holding note saying the team is investigating, with the full update to follow once root cause is fully confirmed."
   },
   {
    "key": "B",
    "text": "An explanation focused on the model vendor's role, since the error came from the model's output."
   },
   {
    "key": "C",
    "text": "A full technical post-mortem with the prompts, retrieval traces and token-level logs behind each affected answer."
   },
   {
    "key": "D",
    "text": "What happened, how many customers were affected, the cause as currently known, the fix in place, the remediation for affected customers and the prevention steps, in business terms."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "Executive incident communication is prompt, in business terms, and covers impact, cause, fix, customer remediation and prevention. Unknowns can be stated as unknown.",
  "distractors": {
   "A": "Waiting for complete certainty delays remediation decisions the COO needs to make today.",
   "B": "The deployment belongs to the team, and so does the accountability. The likely cause, a stale source, is in the pipeline anyway.",
   "C": "This is the engineering audience's document, not the COO's."
  },
  "objective": "Communicate incidents to stakeholders",
  "src": [
   {
    "t": "INFERRED: executive incident communication",
    "type": "inferred"
   }
  ]
 },
 {
  "id": "M3-D2-01",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "single",
  "stem": "A prompt contains instructions, three source documents and two worked examples, all as running prose. The model sometimes quotes text from the worked examples as if it came from the source documents. Which change addresses this most directly?",
  "options": [
   {
    "key": "A",
    "text": "Lengthen the instructions to explain in more detail the difference between the examples and the documents."
   },
   {
    "key": "B",
    "text": "Move to a larger model that separates the parts of a long prompt more reliably."
   },
   {
    "key": "C",
    "text": "Wrap the instructions, each document and each example in distinct XML tags, and refer to them by tag name in the instructions."
   },
   {
    "key": "D",
    "text": "Remove the worked examples entirely, so that there is nothing to confuse with the source documents."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "XML tags give the model unambiguous boundaries between parts of the prompt, which directly prevents cross-contamination between examples and sources.",
  "distractors": {
   "A": "More prose on top of unstructured prose leaves the boundary problem in place.",
   "B": "This costs more and doesn't remove the ambiguity the structure creates.",
   "D": "This throws away the examples' value when structure would solve the problem."
  },
  "objective": "Apply prompt structuring techniques",
  "src": [
   {
    "t": "Claude docs: Use XML tags to structure your prompts",
    "u": "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D2-02",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "single",
  "stem": "An analyst pastes an 80,000-token audit report and asks a question at the top of the prompt, before the report. Answers often miss specific findings buried mid-report. Which prompt change is best supported by long-context guidance?",
  "options": [
   {
    "key": "A",
    "text": "Summarise the report to 5,000 tokens first, then ask the question over the summary."
   },
   {
    "key": "B",
    "text": "Place the report first and the question at the end, and ask the model to extract the relevant quotes before answering."
   },
   {
    "key": "C",
    "text": "Keep the question first so that the model knows what to look for, and repeat it in capitals."
   },
   {
    "key": "D",
    "text": "Split the report into ten parts and send ten separate requests, then concatenate the answers."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "Put long documents at the top and the query at the end, and ask the model to ground its answer in extracted quotes first. Both improve recall of buried details.",
  "distractors": {
   "A": "Summarising first discards exactly the buried specifics the questions need.",
   "C": "Emphasis doesn't fix placement. The guidance puts queries after long documents.",
   "D": "Splitting breaks findings that span sections, and concatenated answers conflict."
  },
  "objective": "Apply long-context prompting techniques",
  "src": [
   {
    "t": "Claude docs: Long context prompting tips",
    "u": "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D2-03",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "single",
  "stem": "A platform supports four workloads, and extended thinking adds latency and output tokens. Which workload is the strongest candidate for enabling extended thinking?",
  "options": [
   {
    "key": "A",
    "text": "Classifying 50,000 tweets an hour into five sentiment labels for a live dashboard."
   },
   {
    "key": "B",
    "text": "Reconciling conflicting clauses across three linked agreements and calculating the resulting liability caps, with a latency budget of minutes."
   },
   {
    "key": "C",
    "text": "Translating short interface strings into twelve languages during each build."
   },
   {
    "key": "D",
    "text": "Extracting the invoice number, date and total from scanned invoices in a nightly batch."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "Extended thinking pays off on multi-step reasoning with dependencies and calculation, where latency is tolerable. The others are simple, high-volume or latency-bound.",
  "distractors": {
   "A": "High-volume, latency-sensitive and simple. Thinking adds cost and delay for no gain.",
   "C": "Short translations don't need step-by-step reasoning.",
   "D": "Field extraction is a lookup task, and thinking tokens would be wasted."
  },
  "objective": "Select model features to match task requirements",
  "src": [
   {
    "t": "Claude docs: Extended thinking",
    "u": "https://docs.claude.com/en/docs/build-with-claude/extended-thinking",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D2-04",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "multi",
  "stem": "A team enables prompt caching, but the cache hit rate stays near zero. Every request carries a system prompt, 20 tool definitions, a 10,000-token policy reference and the user's question. Which two changes raise cache hits? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "Place the user's question at the start of the prompt, so that the model reads the task before the reference material."
   },
   {
    "key": "B",
    "text": "Order the request so the tools, system prompt and policy reference come first, before any content that varies."
   },
   {
    "key": "C",
    "text": "Keep everything before the cache breakpoint byte-identical across requests, removing timestamps and request IDs from it."
   },
   {
    "key": "D",
    "text": "Insert the current date and time at the top of the system prompt, so that the cached content stays fresh."
   },
   {
    "key": "E",
    "text": "Reorder the tool definitions per request by predicted relevance, so that the most likely tool appears first."
   }
  ],
  "correct": [
   "B",
   "C"
  ],
  "rationale": "The cache matches an exact prefix, so stable content has to come first and stay identical between requests.",
  "distractors": {
   "A": "Variable content first means nothing after it can be cached.",
   "D": "A changing timestamp at the top breaks the prefix on every request.",
   "E": "Per-request reordering makes the prefix different each time."
  },
  "objective": "Optimise cost and latency with prompt caching",
  "src": [
   {
    "t": "Claude docs: Prompt caching",
    "u": "https://docs.claude.com/en/docs/build-with-claude/prompt-caching",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D2-05",
  "domain": "Claude Models, Prompting & Context Engineering",
  "type": "single",
  "stem": "A summary prompt specifies the required format correctly: four headings in a fixed order, with bullets of 20 words or fewer beneath each. In practice about 15% of summaries reorder the headings or write paragraphs instead of bullets. The instruction has been reviewed and is clear. Which change fits?",
  "options": [
   {
    "key": "A",
    "text": "Move to the largest model tier so that the instructions are followed more reliably."
   },
   {
    "key": "B",
    "text": "Split the task into a pipeline of three calls: draft, reformat and validate."
   },
   {
    "key": "C",
    "text": "Add three or four varied examples of correctly formatted summaries to the prompt."
   },
   {
    "key": "D",
    "text": "Restate the format rule in capitals at both the start and the end of the prompt."
   }
  ],
  "correct": [
   "C"
  ],
  "rationale": "When a correct instruction produces inconsistent output, the gap is demonstration. A few diverse examples anchor the format.",
  "distractors": {
   "A": "A bigger model costs more on every request, for a problem examples solve cheaply.",
   "B": "A three-call pipeline triples cost to fix what a few examples usually fix.",
   "D": "Repeating the same rule louder gives the model no more to go on than it already has."
  },
  "objective": "Apply few-shot prompting",
  "src": [
   {
    "t": "Claude docs: Use examples (multishot prompting)",
    "u": "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D7-01",
  "domain": "Developer Productivity & Operational Enablement",
  "type": "single",
  "stem": "Engineers on a 15-person team start each Claude Code session by re-explaining the build and test commands, the branching convention and two known gotchas in the monorepo. Which change removes this repeated setup for the whole team?",
  "options": [
   {
    "key": "A",
    "text": "Write the notes on the team wiki and ask engineers to paste them in at the start of each session."
   },
   {
    "key": "B",
    "text": "Create a local settings file in each engineer's checkout holding the commands and conventions."
   },
   {
    "key": "C",
    "text": "Have each engineer add the same notes to their own user-level memory file on their machine."
   },
   {
    "key": "D",
    "text": "Commit a project CLAUDE.md to the repository that records the commands, conventions and gotchas."
   }
  ],
  "correct": [
   "D"
  ],
  "rationale": "A project-level CLAUDE.md is loaded automatically for everyone working in the repo, and it is versioned alongside the code it describes.",
  "distractors": {
   "A": "Manual pasting is the problem being solved.",
   "B": "Local files are personal and git-ignored, so nothing is shared.",
   "C": "User-level memory is personal and manual, so it drifts between people and doesn't travel with the repo."
  },
  "objective": "Configure Claude Code for team productivity",
  "src": [
   {
    "t": "Claude Code docs: Manage Claude's memory (CLAUDE.md)",
    "u": "https://docs.claude.com/en/docs/claude-code/memory",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D7-02",
  "domain": "Developer Productivity & Operational Enablement",
  "type": "multi",
  "stem": "A team wants every file Claude Code edits to be auto-formatted, and wants Claude Code to be unable to modify anything under /migrations. Both must hold every time, not most of the time. Which two mechanisms deliver this? (Select TWO.)",
  "options": [
   {
    "key": "A",
    "text": "A custom slash command that formats files, for developers to run when they remember."
   },
   {
    "key": "B",
    "text": "A PreToolUse hook that blocks edit and write calls targeting paths under /migrations."
   },
   {
    "key": "C",
    "text": "A reminder in the pull request template asking developers to run the formatter before committing."
   },
   {
    "key": "D",
    "text": "A PostToolUse hook that runs the formatter on each file after an edit or write."
   },
   {
    "key": "E",
    "text": "A CLAUDE.md instruction stating that files under /migrations must never be edited."
   }
  ],
  "correct": [
   "B",
   "D"
  ],
  "rationale": "Hooks are deterministic. They run every time at defined lifecycle points, unlike instructions the model may not follow.",
  "distractors": {
   "A": "An optional command fails the 'every time' requirement.",
   "C": "This relies on people remembering, so it doesn't hold every time.",
   "E": "CLAUDE.md is guidance the model reads. It's probabilistic, not enforced."
  },
  "objective": "Enforce team standards with Claude Code hooks",
  "src": [
   {
    "t": "Claude Code docs: Hooks",
    "u": "https://docs.claude.com/en/docs/claude-code/hooks",
    "type": "doc"
   }
  ]
 },
 {
  "id": "M3-D7-03",
  "domain": "Developer Productivity & Operational Enablement",
  "type": "single",
  "stem": "A team wants Claude Code to run in CI on every pull request, diagnosing failing tests and posting a comment with the likely cause. The CI runner has access to deploy credentials. How should it be configured?",
  "options": [
   {
    "key": "A",
    "text": "Run it interactively, and have the on-call engineer approve each prompt as pull requests arrive."
   },
   {
    "key": "B",
    "text": "Run it headless, with an explicit allow-list scoped to reading files and running the test commands, and no access to deploy credentials or push."
   },
   {
    "key": "C",
    "text": "Give it the deploy credentials as well, so that it can push fixes for the failures it diagnoses."
   },
   {
    "key": "D",
    "text": "Run it headless with all permission checks disabled, since CI has no human available to answer prompts."
   }
  ],
  "correct": [
   "B"
  ],
  "rationale": "Unattended automation gets least privilege: non-interactive mode, pre-approved scoped tools for the task, and the dangerous credentials kept out of reach.",
  "distractors": {
   "A": "This doesn't scale and defeats the point of automation.",
   "C": "The task is diagnosis. Granting push and deploy exceeds it and creates a path to production from any pull request.",
   "D": "Disabling all checks, with deploy credentials present, gives an unattended agent the blast radius of production."
  },
  "objective": "Operationalise Claude Code in automation safely",
  "src": [
   {
    "t": "Claude Code docs: Headless mode / GitHub Actions",
    "u": "https://docs.claude.com/en/docs/claude-code/github-actions",
    "type": "doc"
   }
  ]
 }
];
