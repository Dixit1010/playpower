# Plan & Prompt Sequence — Airbnb Listing Page Clone (MERN)

Target: pixel/behavior clone of https://airbnb-clone-umber-two.vercel.app (desktop only), 3 views: Listing Page, Photo Tour, Lightbox. Stack: React (Vite+TS) + Tailwind + Framer Motion + Radix Dialog / Express + Node / MongoDB.

**Note on the reference site**: it sits behind Vercel bot-protection (Kasada challenge) and rate-limits scripted requests (429s observed). Never scrape it or point automated tools at it. All fidelity checks compare against **screenshots you take manually** in a real browser (save them into `docs/reference-screenshots/`), not live automated fetches.

---

## Phase 0 — Manual reference audit (you, not AI)

Before writing prompts, spend 20–30 min in a real browser against the reference:
- Open DevTools, note the exact fonts (family/weight/size), color hex values (background, text, borders, the pink/red brand color), spacing rhythm (8px grid?), border-radius values.
- Screenshot: full listing page, the 5-photo hero grid, the Photo Tour view, and the Lightbox view. Save under `docs/reference-screenshots/`.
- Note the exact photo grid layout (1 large + 4 small tiles), the "Show all photos" button position, hover states on grid tiles, and how Photo Tour groups photos by room (e.g. "Living room 1" caption seen in the task screenshot).
- Note Lightbox behavior: arrow button placement, keyboard arrows, close (Esc/X), any transition/fade between photos.

This audit is what every prompt below points back to — AI can't fetch the reference itself, so it needs you to hand it ground truth (screenshots + notes) at each step.

---

## Phase 1 — Repo & AI workflow scaffolding

Already done in this session:
- `CLAUDE.md` — stack, structure, conventions
- `.claude/agents/pixel-fidelity-reviewer.md`
- `.claude/agents/accessibility-auditor.md`
- `.claude/skills/fidelity-check/SKILL.md`

**Prompt 1.1**
> Scaffold a MERN monorepo: `/client` (Vite + React + TypeScript + Tailwind CSS, ESLint+Prettier) and `/server` (Node + Express + TypeScript, Mongoose). Add a root `package.json` with `dev` script that runs both concurrently. Don't add auth, testing frameworks, or CI yet — keep it minimal per CLAUDE.md.

**Prompt 1.2**
> In `/server`, add a `Listing` Mongoose model matching the fields I'll give you (title, location, rating, reviewCount, host, price, description, amenities[], photos[] grouped by room, coordinates) and a single `GET /api/listings/:id` route. Add a seed script that inserts one fixture listing matching "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10" from `docs/reference-screenshots/`. Use MongoDB Atlas connection string from `.env` (I'll provide it) — fall back to a clear error if `MONGO_URI` is missing, don't silently use an in-memory default.

---

## Phase 2 — Design tokens from the reference audit

**Prompt 2.1**
> Here are the fonts/colors/spacing I measured from the reference (paste your Phase 0 notes: hex values, font family/sizes, spacing scale, border-radius). Set these up as Tailwind theme extensions in `client/tailwind.config.ts` (colors, fontFamily, borderRadius, boxShadow) so every component pulls from tokens instead of hardcoded values.

---

## Phase 3 — Listing page, section by section

Build one section at a time; after each, run the `fidelity-check` skill against that section's reference screenshot before moving to the next. Don't let sections pile up unchecked.

**Prompt 3.1 (layout shell + header)**
> Build `client/src/pages/ListingPage.tsx` and `components/listing/Header.tsx` — the top nav bar (logo, search pill, host/menu on the right) per `docs/reference-screenshots/listing-full.png`. Fetch listing data from `GET /api/listings/:id` via a small `api/listings.ts` client. Match spacing/typography using the tokens from Phase 2.

**Prompt 3.2 (photo grid)**
> Build `components/listing/PhotoGrid.tsx`: 1 large hero photo + 4 smaller tiles in a 2x2 grid to its right, matching `docs/reference-screenshots/photo-grid.png` exactly — gap size, border-radius on the grid corners, hover overlay/darken on tiles, and the "Show all photos" button pinned to the bottom-right corner of the grid. Clicking the hero photo or "Show all photos" should open the Photo Tour overlay (stub the handler for now, we build the overlay in Phase 4).

**Prompt 3.3 (title block + badges + share/save)**
> Build `components/listing/TitleBlock.tsx`: title, location line, rating with star icon and review count, and the Share/Save icon buttons aligned right, matching the reference's exact spacing and icon style.

**Prompt 3.4 (host card, description, amenities)**
> Build `components/listing/HostCard.tsx`, `Description.tsx`, and `Amenities.tsx` per the reference. Amenities should show a limited grid with a "Show all amenities" expansion — match whatever interaction the reference uses (modal vs inline expand; check your Phase 0 notes).

**Prompt 3.5 (booking widget)**
> Build `components/listing/BookingWidget.tsx` — the sticky price/date-picker card that sits alongside the description column on desktop. Match its exact position (sticky offset from top), border, shadow, and button style. Date pickers can be a simple non-functional UI for now unless the reference's date picker behavior is in scope.

**Prompt 3.6 (reviews + location + footer)**
> Build `components/listing/Reviews.tsx`, `LocationMap.tsx`, and `Footer.tsx` to close out the page.

---

## Phase 4 — Photo Tour overlay

**Prompt 4.1**
> Build `components/overlays/PhotoTour.tsx` using Radix `Dialog` (full-screen). It opens from the hero photo or "Show all photos" click. Layout: photos grouped by room with a room-name caption above each group (e.g. "Living room 1"), matching `docs/reference-screenshots/photo-tour.png`. Clicking any photo in this view opens the Lightbox at that photo's index (stub for Phase 5). Wire the close button and Esc to close back to the listing page, returning focus to the trigger element.

---

## Phase 5 — Lightbox overlay

**Prompt 5.1**
> Build `components/overlays/Lightbox.tsx` using Radix `Dialog`: single full-bleed photo, prev/next arrow buttons (positioned per `docs/reference-screenshots/lightbox.png`), a close (X) button, and a photo counter if the reference shows one. Wire ArrowLeft/ArrowRight keys to navigate, Esc to close. Match exactly what happens at the first/last photo (wrap-around vs disabled arrow — check your Phase 0 notes).

**Prompt 5.2**
> Run the `fidelity-check` skill against the Photo Tour and Lightbox now that both exist, using `docs/reference-screenshots/photo-tour.png` and `lightbox.png`. Fix whatever the punch list surfaces before moving to animation polish.

---

## Phase 6 — Animation & motion polish

**Prompt 6.1**
> Add Framer Motion transitions matching the reference: [describe what you observed in Phase 0 — e.g. fade+scale on overlay open, crossfade between lightbox photos, hover scale on photo grid tiles]. Keep durations/easing close to what you measured (most Airbnb-style UI motion is 150–300ms, ease-out on enter, ease-in on exit).

---

## Phase 7 — Accessibility pass

**Prompt 7.1**
> Run the `accessibility-auditor` subagent across the full app: listing page tab order, overlay focus traps, ARIA roles/labels on icon-only buttons, and color contrast. Fix every finding it reports.

---

## Phase 8 — Deployment

**Prompt 8.1**
> Deploy `/server` to Render (free tier) with the MongoDB Atlas URI as an env var, and `/client` to Vercel with `VITE_API_URL` pointing at the deployed server. Add a root `README.md` with setup + run instructions.

---

## Phase 9 — Architecture diagram (production-scale)

This is drawn by hand in Excalidraw/Lucidchart per the assignment, not generated by an agent — but here's the component list to include, reflecting what an Airbnb-scale system needs beyond this take-home's thin backend:

- **Client**: React SPA (or Next.js for SSR/SEO on listing pages) served via CDN edge (CloudFront/Vercel Edge)
- **API layer**: split by domain — Listings service, Search service, Booking service, Media service — behind an API gateway; horizontally scaled, stateless, autoscaling
- **Search**: Elasticsearch/OpenSearch cluster, fed by a change-data-capture pipeline off the primary DB (not queried live against Mongo/Postgres for search)
- **Data**: primary datastore (Postgres for transactional booking data; MongoDB acceptable for listing content) with read replicas; Redis for session/cache/rate-limiting
- **Media**: object storage (S3) + CDN for photos, async image-processing pipeline (resize/optimize) via a queue (SQS/RabbitMQ) on upload
- **Async/events**: message queue for booking confirmations, notifications, search index updates
- **Deployment**: containerized services (ECS/K8s) across multiple AZs, CI/CD pipeline, blue-green or canary rollout
- **Observability**: centralized logging, metrics, tracing, alerting

**Prompt 9.1 (optional — if you want AI help drafting the diagram content, not the drawing itself)**
> Given the component list in docs/PLAN_AND_PROMPTS.md Phase 9, write the diagram as an Excalidraw-compatible or Mermaid `flowchart` description I can paste into excalidraw.com or a Mermaid renderer, grouped into Client / Edge / API / Data / Search / Async / Deployment layers with arrows showing request and data flow.

---

## Phase 10 — Packaging

**Prompt 10.1**
> Zip `/client`, `/server`, `docs/` (including the architecture diagram export and this prompt log), `CLAUDE.md`, and `.claude/` into one archive for submission. Exclude `node_modules`, `.env`, and any secrets.

Before zipping: strip real MongoDB URIs / any credentials from `.env` files (submit `.env.example` instead), and confirm nothing here gets pushed to a public GitHub repo per the assignment's instruction.
