# Airbnb Listing Page Clone (MERN)

Pixel-and-behavior clone of a single Airbnb listing page — desktop only (1280px+). Three views: the Listing Page, a full-screen Photo Tour gallery, and a single-photo Lightbox viewer.

See [CLAUDE.md](CLAUDE.md) for stack/structure/conventions and [docs/PLAN_AND_PROMPTS.md](docs/PLAN_AND_PROMPTS.md) for the build plan and rationale behind each decision.

## Stack

- **Client**: React 19 + Vite + TypeScript, React Router, Tailwind CSS, Framer Motion, Radix UI (`Dialog`)
- **Server**: Node.js + Express + TypeScript, Mongoose
- **Database**: MongoDB (Atlas free tier)

## Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string (MongoDB Atlas free tier, or a local `mongod` instance) — **not needed** for `npm run dev:local` below.

## Setup

```bash
npm run install:all
```

Installs the root, `client`, and `server` dependencies in one step.

### Quickest path: no MongoDB account needed

```bash
npm run dev:local
```

Spins up an in-memory MongoDB via `mongodb-memory-server`, seeds it from `server/src/seed/fixture.json`, and starts client (`:5173`) + server (`:4000`) together. First run downloads a MongoDB binary (~780MB, one-time, cached afterward). Skip the environment variables and seeding steps below entirely for this path.

### Environment variables (for the real-MongoDB path)

Copy each `.env.example` to `.env` and fill in real values — `.env` is git-ignored and must never be committed.

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

**`server/.env`**

| Variable    | Description                                                            |
| ----------- | ------------------------------------------------------------------------ |
| `MONGO_URI` | MongoDB connection string. The server refuses to start without it (see [server/src/db.ts](server/src/db.ts)) rather than silently falling back to a default. |
| `PORT`      | Port the Express server listens on. Defaults to `4000`.                |

**`client/.env`**

| Variable       | Description                                                        |
| -------------- | -------------------------------------------------------------------- |
| `VITE_API_URL` | Base URL of the API. Defaults to `http://localhost:4000` if unset. |

### Seed the database

Insert the fixture listing document (run once, after `.env` is configured):

```bash
npm run seed
```

## Running locally

```bash
npm run dev
```

Runs the client (Vite, `http://localhost:5173`) and server (`http://localhost:4000`) concurrently. Use `npm run dev:local` instead if the server's local-dev script differs from its deployed start command (e.g. pointing at a local Mongo instance).

To run either side on its own:

```bash
npm run dev --prefix client   # client only
npm run dev --prefix server   # server only
```

## Building for production

```bash
npm run build
```

Builds `client` (type-checks then `vite build`, output in `client/dist`) and `server` (`tsc`, output in `server/dist`).

## Project structure

```
/client
  src/pages/ListingPage.tsx
  src/components/listing/     Header, PhotoGrid, TitleBlock, BadgeRow, HostRow, Highlights, Description,
                              SleepingArrangements, Amenities, BookingWidget, DatesCalendar, RatingSummary,
                              RatingBreakdown, CategoryTags, ReviewsGrid, LocationMap, HostProfile,
                              ThingsToKnow, NearbyListings, Footer
  src/components/overlays/    PhotoTour.tsx, Lightbox.tsx (query-param driven — see useOverlayParams)
  src/components/ui/          Button, Avatar, Photo, StarRating, IconButton, SectionDivider
  src/hooks/                  useOverlayParams (tour/photo URL state), useArrowKeys
  src/api/                    listings.ts (typed fetch wrapper + Listing/Review/NearbyListing types)
/server
  src/models/Listing.ts
  src/routes/listing.ts       GET /api/listing — single document, no id param (only one listing exists)
  src/app.ts / index.ts       Express app factory + production entrypoint (needs MONGO_URI)
  src/dev-local.ts            entrypoint using an in-memory Mongo — no MONGO_URI needed
  src/seed/seed.ts            seeds a real MONGO_URI from fixture.json
/docs
  10_PROMPTS.md               the canonical 10-prompt build sequence
  PLAN_AND_PROMPTS.md         phased build plan and rationale
  INTERVIEW_QA.md             project Q&A / design-decision writeup
  reference-notes.md          section-by-section content transcribed from the reference screenshot
  reference-screenshots/      manually captured screenshots used for fidelity checks
```

## Fidelity & accessibility workflow

The reference site sits behind bot-protection and rate-limits scripted requests — it is never scraped or fetched by automated tooling. Fidelity checks instead compare local dev screenshots (`localhost:5173`, via Playwright) against screenshots captured manually from the reference and stored in `docs/reference-screenshots/`. See the `pixel-fidelity-reviewer` and `accessibility-auditor` subagents under `.claude/agents/`, and the `fidelity-check` skill under `.claude/skills/`, for how each section/overlay is checked before moving to the next.

## Deployment

- **Client** → Vercel (static build). Config in [client/vercel.json](client/vercel.json). Set `VITE_API_URL` in the Vercel project to the deployed server's URL.
- **Server** → Render free tier. Config in [render.yaml](render.yaml) (Render "Blueprint" — point Render at this repo and it reads it). Set `MONGO_URI` in the Render dashboard (not committed).
- **Database** → MongoDB Atlas free tier.

None of this has been deployed yet — the configs are ready to go, but creating the Vercel/Render/Atlas accounts and pointing them at a repo is an action with its own credentials, so it's left for whoever owns those accounts to run.

## Submission notes

- `node_modules`, `dist`, and `.env` files are git-ignored — only `.env.example` files are included.
- No real MongoDB credentials or secrets are committed anywhere in this repo.
