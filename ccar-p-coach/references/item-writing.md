# Writing fresh items

Use this when the bank for a domain runs out, or when building a full mock from unseen material.

## Non-negotiables

1. **Original only.** Write from the exam guide's objectives and Anthropic's public documentation. Never recreate a real exam question, even from a learner's description.
2. **One objective per item.** Take it from `exam-facts.md`.
3. **A source for the key**, or mark it INFERRED with what it rests on.
4. **Every distractor gets a one-line reason it fails.**

## What makes an item exam-like

- **A scenario, not a definition.** A named kind of organisation, a concrete number or two, a constraint, and a decision to make.
- **Judgement, not recall.** The exam tests which pattern, which trade-off, which control, and why.
- **Plausible distractors.** Each wrong option should be something a competent practitioner might pick: a real technique, applied to the wrong problem, at the wrong layer, or as the only control.
- **Mix the formats.** About two thirds single answer, one third select-two or select-three, and an occasional matching item.

## Distractor archetypes that work

Build distractors from the soft-spot catalogue. The best ones are:

- the instruction-based control (C1)
- the confidence threshold (C2)
- the monitoring-only option (C3)
- the vendor's assurance (C4)
- the escalated failing fix (B2)
- the faster re-index (B1)
- the bigger model
- the more complex architecture (B5)
- the true-but-off-category statement (A3)

## Anti-patterns to avoid

- **Giveaway qualifiers** such as "with no setup steps", "unchecked", or "whichever favours the change". They make items too easy.
- **Absolute language only in wrong options.** Learners learn to spot the word, not the concept. Use it sparingly.
- **The key always being the longest option.** Vary length.
- **Repeating one theme.** Spread items across objectives.
- **The same key letter** throughout a set. Shuffle.

## Schema

Match the format in `items/bank.json`:

```json
{
  "id": "FRESH-D3-001",
  "domain": "Integration",
  "type": "single",
  "stem": "...",
  "options": [{"key": "A", "text": "..."}, {"key": "B", "text": "..."}, {"key": "C", "text": "..."}, {"key": "D", "text": "..."}],
  "correct": ["B"],
  "rationale": "...",
  "distractors": {"A": "...", "C": "...", "D": "..."},
  "objective": "...",
  "src": [{"t": "...", "u": "https://...", "type": "doc"}]
}
```

`type` is `single`, `multi` (all-or-nothing, with as many keys as the item asks for), or `match`. Matching items use `prompts`, `choices`, and a `correct` object mapping prompt ids to choices.

## Before presenting a fresh item, check

- [ ] Exactly one defensible key (or exactly N for select-N)
- [ ] Each distractor is plausible and has a stated reason it fails
- [ ] Source attached or INFERRED stated
- [ ] No version-sensitive fact taught without checking it
- [ ] Not a recreation of any real exam question
