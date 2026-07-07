# Airbnb Listing Page Clone (MERN)

Pixel-and-behavior clone of https://airbnb-clone-umber-two.vercel.app (desktop only). Three views: Listing Page, Photo Tour (full-screen gallery), Lightbox (single-photo viewer with prev/next).

## Stack
- **Frontend**: React 18 + Vite + TypeScript, React Router (single listing route + `?photo=`/`?tour=` query-driven overlays), Tailwind CSS for layout/spacing/typography, Framer Motion for animations
- **Backend**: Node.js + Express REST API (`GET /api/listings/:id`) — thin, serves the listing document
- **Database**: MongoDB (Mongoose) — single `Listing` collection (title, photos, host, amenities, description, reviews, location, price). MongoDB Atlas free tier for hosting.
- Radix UI primitives (`Dialog`) for Photo Tour + Lightbox — gives focus trap, ESC-to-close, and ARIA roles for free
- Deploy target: client on Vercel (static), server on Render/Railway free tier, DB on MongoDB Atlas

## Structure
```
/client
  src/pages/ListingPage.tsx
  src/components/listing/   Header, PhotoGrid, TitleBlock, HostCard, Amenities, BookingWidget, Reviews, LocationMap, Footer
  src/components/overlays/  PhotoTour.tsx, Lightbox.tsx
  src/hooks/                useLightbox, useKeyboardNav
  src/api/                  listings.ts (fetch wrapper)
/server
  src/models/Listing.ts
  src/routes/listings.ts
  src/seed/seed.ts          seeds Mongo from a JSON fixture matching the reference listing
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
- Accessibility is graded: every interactive element needs visible focus states, correct roles, and keyboard operability (Tab, Esc, Arrow keys in overlays).
- Backend is intentionally thin (single read endpoint) — this is a UI-fidelity assignment, not a backend exercise. Don't add auth, pagination, or write endpoints that nothing in the UI uses.
