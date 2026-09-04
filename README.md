# Lani — superseded

This repo is retired. It was the first Lani: a voice orb with a hardcoded system
prompt and no tools, so it could talk about the business but never look anything
up in it.

**Lani now lives in [AI-OS](https://github.com/jacobmip/AI-OS).**

- `agent.js` — the shared brain. Builds its system prompt from the AIOS context
  files, and holds tools that read and write the live invoicing database.
- `api/chat.js` + `public/index.html` — the voice orb, same as here but calling
  that brain.
- The Telegram bot calls the same `runAgent()`, so both front doors are one
  assistant instead of two that drift apart.

Kept rather than deleted because the orb UI in `public/index.html` is the
original and the AI-OS copy grew from it.

**If this is still deployed on Vercel, take that deployment down.** It carries an
older prompt and will answer as Lani while knowing none of the current context.
