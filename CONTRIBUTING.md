# Contributing

Corrections are the most valuable contribution. If a key looks wrong, open an issue with the **question ID**, what you think the key should be, and the **source** that supports it.

## Ground rules

1. **Original questions only.** Never add real exam content, recalled exam questions, or anything from braindump sites. Anthropic's exam policy treats use of real exam content as grounds for revoking a credential.
2. **Every question needs a source.** Link a vendor document where one exists. If none does, mark the source `inferred` and say what the key is based on.
3. **No absolute-language giveaways.** Distractors should be plausible, not obviously wrong.
4. **Explain every distractor.** A key without a reason for each wrong option doesn't teach anything.

## Question schema

Both `data/baseline.json` and `data/bank.json` are arrays of items.

```json
{
  "id": "BL-D3-01",
  "domain": "Integration",
  "type": "single",
  "stem": "The scenario and the question.",
  "options": [
    {"key": "A", "text": "..."},
    {"key": "B", "text": "..."}
  ],
  "correct": ["A"],
  "rationale": "Why the key is right.",
  "distractors": {"B": "Why B fails."},
  "objective": "The blueprint objective this tests",
  "src": [
    {"t": "Source title", "u": "https://...", "type": "doc"},
    {"t": "What the key is based on", "type": "inferred"}
  ]
}
```

| Field | Values |
|---|---|
| `domain` | Must match one of the seven exam domain names exactly (see README) |
| `type` | `single`, `multi` (select N, all-or-nothing, N = length of `correct`), or `match` |
| `src[].type` | `doc` (vendor source with URL), `guide` (exam guide section), `inferred` (no vendor source) |

**Matching items** use `prompts` (`[{"id":"p1","text":"..."}]`), `choices` (list of strings) and `correct` as an object mapping each prompt id to a choice, in place of `options`.

## After editing the JSON

Regenerate the browser files so the app picks up your change:

```bash
node -e "const fs=require('fs');for(const [n,v] of [['baseline','CCARP_BASELINE'],['bank','CCARP_BANK']]){fs.writeFileSync('data/'+n+'.js','window.'+v+' = '+fs.readFileSync('data/'+n+'.json','utf8')+';\n')}"
```

Then open `index.html` and run through the question you changed.

## Baseline balance

The baseline must keep **exactly 3 questions per domain**. The gap map bands (Strong, Borderline, Weak) assume 3. If you add a baseline question, swap one out of the same domain.
