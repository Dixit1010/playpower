# The 10-Prompt Build Sequence — Airbnb Listing Clone (MERN)

Run these in order in Claude Code, from the project root (where `CLAUDE.md` lives). Each assumes the previous prompt's output exists. Before Prompt 1, complete the manual reference audit (screenshot the reference site's Listing Page, Photo Grid, Photo Tour, and Lightbox into `docs/reference-screenshots/`, and note fonts/colors/spacing from DevTools) — the reference site is bot-protected, so no prompt should ask an agent to fetch it live.

---

**1. Scaffold the MERN monorepo**
> Scaffold a MERN monorepo: `/client` (Vite + React + TypeScript + Tailwind CSS, ESLint + Prettier) and `/server` (Node + Express + TypeScript + Mongoose). Add a root `package.json` with a `dev` script that runs both concurrently. Follow the structure and conventions in `CLAUDE.md`. Keep it minimal — no auth, no test framework, no CI yet.

**2. Backend: model, seed, API**
> In `/server`, add a `Listing` Mongoose model (title, location, rating, reviewCount, host, price, description, amenities[], photos[] grouped by room name, coordinates) and a single `GET /api/listings/:id` route returning it. Add a seed script that inserts one fixture listing matching "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10" (I'll supply the field values from the reference screenshots). Read `MONGO_URI` from `.env` and fail loudly if it's missing — no silent in-memory fallback.

**3. Design tokens from the reference audit**
> Here are the exact colors, font family/sizes/weights, spacing scale, and border-radius values I measured from the reference via DevTools: [paste your Phase-0 notes]. Encode these as Tailwind theme extensions in `client/tailwind.config.ts` so every component below pulls from tokens instead of hardcoded values.

**4. Listing page shell, header, photo grid**
> Build `client/src/pages/ListingPage.tsx`, `components/listing/Header.tsx` (nav bar), and `components/listing/PhotoGrid.tsx` (1 large hero photo + 4-tile 2x2 grid, hover darken overlay, "Show all photos" button bottom-right) matching `docs/reference-screenshots/listing-full.png` and `photo-grid.png` exactly on spacing, radius, and gap. Fetch data from `GET /api/listings/:id` via a small `api/listings.ts` client. Clicking the hero photo or "Show all photos" should call an `onOpenPhotoTour` prop — stub it, the overlay comes in Prompt 7.

**5. Title block, host card, description, amenities**
> Build `components/listing/TitleBlock.tsx` (title, location, rating/reviews, Share/Save buttons), `HostCard.tsx`, `Description.tsx`, and `Amenities.tsx`, matching the reference's exact spacing, icon style, and the amenities "show all" interaction (check your Phase-0 notes for whether it's a modal or inline expand).

**6. Booking widget, reviews, location, footer**
> Build `components/listing/BookingWidget.tsx` (sticky price/date card, matching its sticky offset, border, and shadow), `Reviews.tsx`, `LocationMap.tsx`, and `Footer.tsx` to complete the Listing Page. Date pickers can be static UI unless the reference's picker behavior is explicitly in scope.

**7. Photo Tour overlay**
> Build `components/overlays/PhotoTour.tsx` using Radix `Dialog` (full-screen), opened from the hero photo or "Show all photos". Group photos by room with a caption above each group (e.g. "Living room 1"), matching `docs/reference-screenshots/photo-tour.png`. Esc and the close button return to the Listing Page and restore focus to the trigger element. Clicking any photo should call an `onOpenLightbox(index)` prop — stub it, the Lightbox comes in Prompt 8.

**8. Lightbox overlay**
> Build `components/overlays/Lightbox.tsx` using Radix `Dialog`: full-bleed single photo, prev/next arrow buttons positioned per `docs/reference-screenshots/lightbox.png`, close (X) button, and photo counter if the reference shows one. Wire ArrowLeft/ArrowRight keys and Esc. Match the reference's exact first/last-photo behavior (wrap-around vs. disabled arrow). Wire it up from both the PhotoGrid and PhotoTour.

**9. Motion polish + accessibility pass**
> Add Framer Motion transitions matching what I observed on the reference: [describe — e.g. fade+scale on overlay open, crossfade between lightbox photos, hover scale on grid tiles], then run the `fidelity-check` skill and the `accessibility-auditor` subagent across the whole app (tab order, focus traps in both overlays, ARIA roles/labels on icon-only buttons, color contrast). Fix every finding both report.

**10. Deploy and package**
> Deploy `/server` to Render (free tier, `MONGO_URI` as an env var pointing at MongoDB Atlas) and `/client` to Vercel (`VITE_API_URL` pointing at the deployed server). Write a root `README.md` with setup/run instructions. Then zip `/client`, `/server`, `docs/` (including the architecture diagram export and this prompt log), `CLAUDE.md`, and `.claude/` for submission — excluding `node_modules` and any real `.env` secrets (ship `.env.example` instead).

---

Architecture diagram (drawn by hand in Excalidraw/Lucidchart, not by a prompt) and its component checklist live in `docs/PLAN_AND_PROMPTS.md` Phase 9 — that stays a separate deliverable outside this 10-prompt sequence.
