# Airbnb Listing Page Clone (MERN)

Pixel-and-behavior clone of https://airbnb-clone-umber-two.vercel.app (desktop only). Three views: Listing Page, Photo Tour (full-screen gallery), Lightbox (single-photo viewer with prev/next).

## Stack
- **Frontend**: React 19 + Vite + TypeScript, React Router, Tailwind CSS, Framer Motion. Overlays (Photo Tour, Lightbox) are query-param driven (`?tour=1&photo=0`) via `useOverlayParams` — deep-linkable, browser back closes them.
- **API**: single `GET /api/listing` endpoint (no id — there's only ever one listing), implemented twice:
  - `client/api/listing.ts` — Vercel serverless function (native `mongodb` driver, cached connection), used in production. Auto-seeds from `client/api/_lib/fixture.json` if the collection is empty.
  - `server/` — standalone Express + Mongoose app, used only for local dev (`npm run dev:local` spins up an in-memory Mongo, zero setup).
- **Database**: MongoDB. Atlas free tier in production — Vercel has no MongoDB hosting of its own, so this is the one non-Vercel piece.
- Radix UI primitives (`Dialog`) for Photo Tour + Lightbox — gives focus trap, ESC-to-close, and ARIA roles for free. Framer Motion `forceMount` + `AnimatePresence` for enter/exit animation on top of Radix.
- Deploy target: everything on one Vercel project — Root Directory set to `client`, which makes Vercel build the Vite static site AND deploy `client/api/*.ts` as serverless functions together, same origin, no CORS.

## Structure
```
/client
  api/listing.ts             Vercel serverless function — the production API
  api/_lib/mongo.ts          cached MongoClient (serverless connection reuse)
  api/_lib/fixture.json      seed data (kept in sync with server/src/seed/fixture.json)
  vercel.json                build config + SPA rewrite (must exclude /api)
  vite.config.ts             dev-only proxy: /api -> localhost:4000 (the Express app below)
  src/pages/ListingPage.tsx
  src/components/listing/    Header, PhotoGrid, TitleBlock, BadgeRow, HostRow, Highlights, Description,
                              SleepingArrangements, Amenities, BookingWidget, DatesCalendar, RatingSummary,
                              RatingBreakdown, CategoryTags, ReviewsGrid, LocationMap, HostProfile,
                              ThingsToKnow, NearbyListings, Footer
  src/components/overlays/   PhotoTour.tsx, Lightbox.tsx
  src/hooks/                 useOverlayParams, useArrowKeys
  src/api/                   listings.ts (typed fetch wrapper, calls same-origin /api/listing)
/server
  src/models/Listing.ts
  src/routes/listing.ts
  src/dev-local.ts           local-dev entrypoint, in-memory Mongo, no MONGO_URI needed
  src/seed/seed.ts           seeds a real MONGO_URI from fixture.json
```

## Fidelity workflow (important)
The reference site has Vercel bot-protection and will hard-block scripted/automated fetch tools (429/403, Kasada challenge). Do NOT try to scrape or bypass it. Fidelity checks happen by:
1. A human opens the reference in a real browser, DevTools open, and reads computed styles/spacing directly (or shares screenshots).
2. Screenshots go in `docs/reference-screenshots/` and get compared against local dev screenshots (Playwright MCP against `localhost:5173`, never the reference).
3. Use the `pixel-fidelity-reviewer` subagent to diff a local screenshot against a reference screenshot placed side by side.

## Conventions
- Desktop viewport only (1280px+ design target); do not spend effort on mobile breakpoints.
- Keep components small and section-scoped — one file per listing-page section.
- No premature abstraction: three views, build each concretely before extracting shared pieces.
- Accessibility is graded: every interactive element needs visible focus states, correct roles, and keyboard operability (Tab, Esc, Arrow keys in overlays). Radix gives most of this for free, but focus *restoration* on close needs explicit handling here since overlays are query-param controlled, not `Dialog.Trigger`-controlled (see `tourTriggerRef`/`photoTriggerRef` in ListingPage.tsx).
- Backend is intentionally thin (single read endpoint) — this is a UI-fidelity assignment, not a backend exercise. Don't add auth, pagination, or write endpoints that nothing in the UI uses.
- When changing `server/src/seed/fixture.json`, mirror the change in `client/api/_lib/fixture.json` — they're deliberately duplicated (different deploy targets, can't share an import across the two npm packages) rather than abstracted into a shared module.
- Framer Motion's `animate`/`initial`/`exit` own the whole `transform` CSS property once used on an element — don't mix Tailwind `translate-x/y` utility classes with an animated `scale`/`x`/`y` on the same element (Framer's inline style silently wins and drops the Tailwind transform). Put positioning offsets like `x: '-50%'` into the motion values instead.
