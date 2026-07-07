---
name: fidelity-check
description: Run a full visual + accessibility fidelity pass on the current state of the Airbnb clone (Listing Page, Photo Tour, or Lightbox) against the reference screenshots in docs/reference-screenshots/, and against keyboard/ARIA requirements. Use after finishing a section or overlay, before moving on to the next one.
---

1. Confirm the dev server is running at http://localhost:5173 (start it with `npm run dev` in `client/` if not).
2. Ask the user which view to check if not obvious from context: Listing Page, Photo Tour, or Lightbox — and which reference screenshot(s) in `docs/reference-screenshots/` apply.
3. Dispatch `pixel-fidelity-reviewer` for the visual diff and `accessibility-auditor` for the keyboard/ARIA pass. Run them in parallel — they don't depend on each other.
4. Merge both reports into one punch list, ordered by severity (layout/broken interaction first, then spacing/color, then polish).
5. Do not fix anything yourself in this skill — hand the punch list back to the user/main loop to decide what to act on next.
