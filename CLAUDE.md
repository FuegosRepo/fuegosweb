# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fuegos d'Azur — a Next.js 14 full-stack application for an Argentine barbecue catering service on the Côte d'Azur (France). The site is in French. It handles catering quote requests through a 7-step form wizard, with AI-powered budget generation, PDF creation, and email workflows.

## Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm start` — Start production server

## Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui (new-york style, Radix UI primitives)
- **State:** Zustand (`lib/catering-store.ts`)
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend
- **AI:** OpenAI GPT-4 for budget generation (`lib/budgetAIService.ts`)
- **PDF:** jsPDF + jspdf-autotable (`lib/budgetPDFService.ts`)
- **Deployment:** Vercel (primary), Netlify (secondary)
- **Path alias:** `@/*` maps to project root

## Architecture

### Routing (App Router)

Public pages: `/`, `/catering`, `/service-traiteur`, `/notre-histoire`, `/faq`, `/mentions-legales`, `/politique-cookies`, `/politique-de-confidentialite`, `/maintenance`

Key API routes under `app/api/`:
- `generate-budget` — AI budget generation via OpenAI
- `approve-budget`, `approve-and-send-budget` — Admin approval workflow
- `generate-budget-pdf` — PDF creation
- `send-order-emails` — Transactional emails via Resend
- `budgets/[id]` — Budget CRUD
- `google-reviews` — Google Places reviews proxy

### Catering Form Flow

The core feature is a 7-step catering quote wizard in `components/catering/`:
1. `step-contact.tsx` — Contact info
2. `step-menu.tsx` — Menu selection
3. `step-entrees.tsx` — Starters
4. `step-viandes.tsx` — Meats
5. `step-desserts.tsx` — Desserts
6. `step-extras.tsx` — Extras
7. `step-review.tsx` — Review & submit

State is managed by Zustand in `lib/catering-store.ts`. The form orchestrator is `components/catering/catering-form.tsx`.

### Budget Pipeline

1. Client submits catering form → data saved to Supabase `catering_orders`
2. `api/generate-budget` calls OpenAI to create itemized budget → saved to `budgets` table
3. Admin reviews/approves via `api/approve-budget`
4. `api/generate-budget-pdf` creates PDF with jsPDF
5. `api/approve-and-send-budget` sends budget to client via Resend

### Key Services (`lib/`)

- `budgetAIService.ts` — OpenAI integration for budget generation
- `budgetPDFService.ts` — PDF generation
- `emailService.ts` — Resend email service
- `supabaseClient.ts` — Supabase client initialization
- `catering-store.ts` — Zustand store for multi-step form state
- `types/budget.ts` — Budget & order TypeScript interfaces
- `emails/templates/` — HTML email templates

### UI Components

- `components/ui/` — shadcn/ui components (do not edit manually, use `npx shadcn-ui@latest add`)
- `components/catering/` — Catering form wizard components
- `components/modern-navigation.tsx` — Main nav bar
- `components/hero-video.tsx` — Homepage hero with video
- `components/dynamic-components.tsx` — Lazy-loaded components for performance

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase
- `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_FROM_NAME` — Email
- `ADMIN_EMAIL`, `ADMIN_API_SECRET` — Admin config
- `OPENAI_API_KEY`, `OPENAI_MODEL` — AI budget generation
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`, `NEXT_PUBLIC_GOOGLE_PLACE_ID` — Google Reviews
- `NEXT_PUBLIC_SITE_URL` — Site base URL

## Build & Bundle

- Next.js config (`next.config.mjs`) has custom webpack chunk splitting: framework, UI (Radix), libraries, commons
- Image optimization uses `sharp`; prefer WebP format (see `scripts/convert-images-to-webp.js`)
- Performance optimizations documented in `OPTIMIZACION-RENDIMIENTO.md`
- Trailing slashes enabled
