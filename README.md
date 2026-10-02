# CCAR-P Study Guide

A free study guide for the **Claude Certified Architect – Professional (CCAR-P)** exam, built for the ClaudeSg community.

**Find your gaps first, then drill only those.**

| Part | What it is | Size |
|---|---|---|
| **Baseline quiz** | 3 questions per domain, no feedback until the end, sure/guess labelling. Produces a gap map and a drill order. | 21 questions, about 40 min |
| **Domain drills** | Practice by domain. Every answer is marked immediately, with why the key is right, why each other option fails, and a source. | 103 questions |
| **Exam card** | The five option checks and eight rules that decide most scenario questions. Read it on exam morning. | 1 page |

## Get coached, not just quizzed

The web app gives you the questions. The **CCAR-P Coach** gives you the full prep loop the questions came from: a baseline, a gap map, short guided teaching one point at a time, confidence-scored drills, a review of every miss down to its cause, recurrence tracking, and an evidence-based "ready to book" gate. It runs in your own Claude.

| Option | Best for | How |
|---|---|---|
| **Skill** (recommended) | claude.ai, Claude Code, Cowork | Upload `dist/ccar-p-coach.zip` in the Skills section of your claude.ai settings, or copy `ccar-p-coach/` into `~/.claude/skills/`. Then say "start my CCAR-P prep". |
| **Claude Project** | Anyone on claude.ai who prefers Projects | Follow [`project-template/README.md`](project-template/README.md): paste the instructions, upload the files, start a chat. |

The coach keeps a `progress.md` file for you (misses, soft spots, scores, next block) so each session picks up where the last one ended.

## Use the web app

Open `index.html` in a browser, or enable GitHub Pages on this repo (Settings > Pages > Deploy from branch > `main` / root). Nothing to install, no build step, no network calls beyond Google Fonts.

The recommended route through it:

1. **Take the baseline.** Mark every answer *sure* or *guessing*. A wrong answer you were sure of is a **blind spot**, and it counts for more than a wrong guess.
2. **Read the gap map.** Each domain is banded **Strong**, **Borderline** or **Weak**. The drill order is ranked by gap multiplied by exam weight, so a borderline Integration (19%) can outrank a weak Dev Productivity (7%).
3. **Drill in that order.** Aim for 80% or better per domain. Treat anything under 60% as a study target.
4. **Read the exam card** (`exam-card.html`, or the Exam card tab) twice on exam morning, then close it.

Progress is saved in your own browser only. Nothing is sent anywhere.

## The exam at a glance

| | |
|---|---|
| Questions | 63 |
| Time | 120 minutes |
| Pass mark | 720 of 1000 |
| Formats | Multiple choice, multiple response (all-or-nothing), scenario matching |

| Domain | Weight | Baseline | Drill bank |
|---|---|---|---|
| Integration | 19% | 3 | 20 |
| Solution Design & Architecture | 17% | 3 | 18 |
| Evaluation, Testing & Optimization | 16% | 3 | 16 |
| Governance, Safety & Risk Management | 14% | 3 | 15 |
| Stakeholder Communication & Lifecycle Management | 14% | 3 | 14 |
| Claude Models, Prompting & Context Engineering | 13% | 3 | 13 |
| Developer Productivity & Operational Enablement | 7% | 3 | 7 |

Weights and format are from the CCAR-P Exam Guide v1.0. **Check the current exam guide before you book**, because details can change.

## How far to trust the keys

Read this before relying on any single question.

- **Every question is original.** The items were written against the public exam guide and Anthropic's published documentation. None of them are real exam questions, and nothing here is drawn from live exam content.
- **Every question cites a source.** A source marked **INFERRED** means no vendor document covers that point. The key reflects defensible practice, not documented canon.
- **The Stakeholder domain is entirely INFERRED.** Anthropic publishes no documentation for it. Anthropic's prep course is the authoritative source there, and it may disagree with some keys.
- **The items were drafted with Claude and worked through by a candidate who went on to pass CCAR-P**, not reviewed by Anthropic. If you think a key is wrong, open an issue with the question ID and your source.

## Repository layout

```
index.html          The app: baseline, gap map, drills, exam card
exam-card.html      Standalone printable exam card
data/baseline.json  21 baseline questions (source of truth)
data/bank.json      103 drill questions (source of truth)
data/*.js           The same data wrapped for the browser (regenerate after editing the JSON)
CONTRIBUTING.md     Question schema and how to add or fix items
ccar-p-coach/       The coaching Skill: SKILL.md, references/, items/
project-template/   The same coach set up as a Claude Project
dist/               ccar-p-coach.zip, ready to upload as a Skill
```

## Compiling into a larger guide

The question data is plain JSON with a stable schema (see `CONTRIBUTING.md`). Each item carries its domain, the blueprint objective it tests, the key, a rationale, a note on each distractor, and its sources. You can merge, filter or re-render it without touching the app.

## Credit and licence

Written by **Chin Tuan Chuang**, for the ClaudeSg community.

- Code (`index.html`, `exam-card.html`, scripts): **MIT**, see `LICENSE`.
- Questions and written content (`data/`, the exam card text): **CC BY 4.0**, see `LICENSE-CONTENT`. Reuse and adapt freely with attribution.

Not affiliated with or endorsed by Anthropic. "Claude" is a trademark of Anthropic.
