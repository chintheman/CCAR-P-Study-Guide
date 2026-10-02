# CCAR-P Coach as a Claude Project

Use this if you'd rather not install a Skill. It gives you the same coach inside a Claude Project on claude.ai, and the Project keeps your progress file between chats.

## Set up (about 5 minutes)

1. On claude.ai, create a **new Project** called "CCAR-P Coach".
2. Open **Project instructions** and paste the whole of [`project-instructions.md`](project-instructions.md).
3. Add these files to the Project's **knowledge**, all from the `ccar-p-coach/` folder:
   - `SKILL.md`
   - `references/coaching-rules.md`
   - `references/soft-spots.md`
   - `references/exam-card.md`
   - `references/exam-facts.md`
   - `references/item-writing.md`
   - `references/progress-template.md`
   - `items/baseline.json`
   - `items/bank.json`
4. Start a chat in the Project and say: **"Start my CCAR-P prep."**

## Keeping progress between chats

At the end of each session the coach gives you an updated `progress.md`. Add it to the Project's knowledge, replacing the previous version. The next chat picks up from it.

## Prefer the Skill?

Upload `ccar-p-coach.zip` from the `dist/` folder in the Skills section of your claude.ai settings, or copy the `ccar-p-coach/` folder into `~/.claude/skills/` for Claude Code. Then say "start my CCAR-P prep" in any chat.
