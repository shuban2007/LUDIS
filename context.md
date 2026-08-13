# Ludis — Athlete Performance Engine: Project Context

> **IMPORTANT RULE FOR ALL AI AGENTS & DEVELOPERS:**
> **ALWAYS update this `context.md` file after making ANY changes to the codebase (adding routes, modifying components, changing domain models, updating services, or adjusting design tokens).**

---

## Project Overview

**Ludis — Athlete Performance Engine** is an AI-powered sports performance analysis and injury-risk awareness web application.

### Key Product Principles
- **Decision Support, Not Medical Diagnosis**: Ludis is decision support software, not a medical diagnostic tool or replacement for a coach.
- **Personalized Baselines**: Measures performance and recovery deviations against an athlete's personal baseline history rather than population averages.
- **Explainable Recommendation Layer**: Exposes contributing factors, evidence chains, and confidence indicators for all prediction outputs.
- **Permission-Controlled Access**: Athletes strictly control coach data access and scope permissions.

### Core MVP Capabilities
1. **Personalized Performance & Baseline Engine** (`PPI`, baselines, deviations)
2. **Recovery + Fatigue Analysis** (multi-signal recovery and fatigue indicators)
3. **Coach Performance Dashboard** (team readiness, alert monitoring, athlete drill-down)
4. **Explainable Recommendation Layer** (action suggestions with evidence + confidence)

---

## Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + Semantic CSS variables (`globals.css`)
- **Animation**: `motion` (v12+, `motion/react`) for scroll-reveal and entrance animations. Reusable primitives in `src/components/landing/scroll-reveal.tsx`.
- **Font**: Inter (`next/font/google`)
- **Data Layer**: Service abstraction (`src/lib/services/data-service.ts`) backed by typed mock data (`src/lib/mock/`). Designed for Supabase PostgreSQL & Python ML API integration.
- **Navigation Architecture**: Centralized route-driven navigation module (`src/lib/navigation.tsx`) providing canonical `athleteNavItems` & `coachNavItems` configurations and `isNavItemActive()` matching utility. Enforces exact matching on root dashboards (`/athlete`, `/coach`) and segment-aware prefix matching on child sections (`/athlete/profile`, `/coach/athletes`), ensuring exactly 1 navigation item is active for any route.


---

## Information Architecture & Routes

### Public & Auth
- `/` — **Redesigned Landing Page**: Premium glassmorphic sports performance aesthetic with scroll-reveal animation system (`motion/react`). Features staggered hero entrance, viewport-triggered section reveals, and progressive pipeline animation. Hero includes realistic Ludis application preview, baseline visualizer, raw data → insight translator, 4 MVP pillars, athlete & coach interfaces, 5-step intelligence pipeline, competition context, and responsible AI boundaries. All animations trigger once, use transform/opacity only, and respect `prefers-reduced-motion`.
- `/login` — **Redesigned Sign In Page**: Premium glassmorphic interface with `LudisLogo`, uppercase `SIGN IN` CTA, consistent dark input styling, and demoted isolated `DEMO` section (`[ ATHLETE ] [ COACH ]`) powered by `src/lib/auth/demo-auth.ts`.
- `/signup` — **Redesigned Sign Up Page**: Premium glassmorphic interface with `LudisLogo`, icon-free segmented `I AM A` role selector (`[ ATHLETE ] [ COACH ]`), uppercase typography, keyboard accessible states, and `CREATE ACCOUNT` CTA.
- `/onboarding` — Multi-step decision-relevant onboarding (sport, experience, competition context)
- `src/lib/auth/demo-auth.ts` — Isolated demo authentication module delegating role-based demo logins without exposing credentials or instructions in the UI.


### Landing Page Component Library (`src/components/landing/`) & UI
- `LudisLogo` (`src/components/ui/ludis-logo.tsx`) — Official brand logo component rendering `public/LudisLogo1.png` with aspect ratio preservation, high-contrast glass badge formatting, and responsive variant support (`navbar`, `footer`, `hero`, `compact`, `icon-only`).
- `LandingNav` (`src/components/landing/landing-nav.tsx`) — Floating translucent glass navigation bar
- `HeroSection` (`src/components/landing/hero-section.tsx`) — Client component wrapping hero copy + product preview with staggered `HeroReveal` entrance animations (eyebrow → headline → paragraph → CTAs → product preview)
- `HeroProductPreview` (`src/components/landing/hero-product-preview.tsx`) — Realistic Ludis application surface preview showing one coherent athlete state: readiness-dominant hierarchy (82 Good), 10-day SVG performance trend with personal baseline band (76–80), compact recovery/fatigue supporting cards, contributing signals evidence row, human recommendation panel with accent glass, and upcoming session context. Mock data driven via `hero-preview-data.ts`. Uses 4-level glassmorphism hierarchy (`glass-app-frame` → `glass-content` → `glass-elevated` → `glass-accent`) with staggered entrance animations respecting `prefers-reduced-motion`.
- `ScrollReveal`, `StaggerContainer`, `StaggerItem`, `HeroReveal` (`src/components/landing/scroll-reveal.tsx`) — Reusable motion primitives using `motion/react`. `ScrollReveal` fades+slides content on viewport entry (trigger once). `StaggerContainer`/`StaggerItem` provide staggered children reveals. `HeroReveal` animates immediately on mount with configurable delay. All disable under `prefers-reduced-motion`.
- `BaselineVisual` (`src/components/landing/baseline-visual.tsx`) — Visual baseline normal range vs. current reading gauge with scroll-reveal animations
- `DataInsightSection` (`src/components/landing/data-insight-section.tsx`) — Raw signals to Ludis explainable action pipeline with staggered left→center→right reveal
- `MvpPillars` (`src/components/landing/mvp-pillars.tsx`) — Glassmorphism cards for the 4 MVP pillars with 80ms staggered entrance
- `AudienceSection` & `HowLudisThinks` (`src/components/landing/sections.tsx`) — Athlete/Coach interfaces (staggered cards) and 5-step data-to-decision process (progressive 100ms stagger)
- `CompetitionContext` & `ResponsibleAI` (`src/components/landing/sections.tsx`) — Event weather context & ethical decision support boundaries with minimal scroll reveals


### Athlete Experience (`/athlete/*`)
- `/athlete` — **Athlete Dashboard** (Hierarchy: Current State → Trend → Factors + Confidence → Recommendation → Upcoming Event → Alerts)
- `/athlete/performance` — Baseline comparisons, PPI score, deviation significance
- `/athlete/recovery` — Recovery score, multi-signal factors, confidence, history
- `/athlete/fatigue` — Fatigue indicators (primary/supporting), workload context, responsible language actions
- `/athlete/insights` — AI Recommendations with evidence chains and confidence ratings
- `/athlete/events` — Competitions and training events with environmental context
- `/athlete/progress` — Multi-metric trend analysis over time
- `/athlete/notifications` — Notification center
- `/athlete/profile` — Athlete profile & coach access permission management

### Coach Experience (`/coach/*`)
- `/coach` — **Coach Dashboard** (Team readiness distribution, active alerts, athlete cards)
- `/coach/teams` — Team management and average readiness
- `/coach/athletes` — Athlete roster list
- `/coach/athletes/[athleteId]` — **Athlete Detail Drill-Down** (Permission status, baseline metrics, trend, factors, recommendations)
- `/coach/events` — Team event schedule with environmental context
- `/coach/notifications` — Team alerts and athlete permission requests
- `/coach/profile` — Coach profile & data access boundary policy

---

## Analysis Chain UI Model

Every prediction and insight view follows this sequence:
`BASELINE → DEVIATION → CONTRIBUTING FACTORS → CONFIDENCE / DATA QUALITY → RECOMMENDATION`

### Key Shared Components (`src/components/shared/`)
- `MetricCard` — Value, baseline comparison, deviation, trend
- `FactorBreakdown` — Impact level and direction of contributing signals
- `ConfidenceIndicator` — Confidence level, data quality, sample size
- `RecommendationCard` — Actionable guidance, explanation, supporting evidence
- `InsightCard` — Deviation visualizer against normal range
- `TrendChart` — Accessible SVG trend line with baseline reference
- `AlertCard` — Severity-based alerts with action links
- `EventCard` — Events with environmental performance context

---

## Guidelines for Making Changes

When adding or modifying features in this codebase:
1. **Never use hardcoded hex colors** — Use semantic tokens defined in `globals.css` (`var(--status-positive)`, `var(--surface-elevated)`, etc.).
2. **Never present single metrics (like HRV) as definitive fatigue/recovery signals** — Always combine multiple signals with contributing factors.
3. **Never use medical/diagnostic language** — Use responsible terms like *"Elevated fatigue indicators"*, *"Recovery below baseline"*, *"Warrants attention"*.
4. **Preserve the service abstraction (`src/lib/services/data-service.ts`)** — UI components must call service functions, not mock data directly.
5. **UPDATE THIS `context.md` FILE AFTER EVERY CHANGE**.
