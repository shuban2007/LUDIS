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
- **Font**: Inter (`next/font/google`)
- **Data Layer**: Service abstraction (`src/lib/services/data-service.ts`) backed by typed mock data (`src/lib/mock/`). Designed for Supabase PostgreSQL & Python ML API integration.

---

## Information Architecture & Routes

### Public & Auth
- `/` — **Redesigned Landing Page**: High-end glassmorphic sports performance telemetry console aesthetic featuring the custom Gothic L logo, interactive baseline visualizer, raw data → explainable insight translator, 4 MVP capabilities pillars, athlete & coach role interfaces, 5-step intelligence pipeline, competition/environment context, and responsible AI ethical boundaries.
- `/login` — Login flow (supports athlete and coach account simulation)
- `/signup` — Account creation with role selection (`athlete` | `coach`)
- `/onboarding` — Multi-step decision-relevant onboarding (sport, experience, competition context)

### Landing Page Component Library (`src/components/landing/`) & UI
- `LudisLogo` (`src/components/ui/ludis-logo.tsx`) — Custom sharp geometric SVG Gothic L monogram & wordmark
- `LandingNav` (`src/components/landing/landing-nav.tsx`) — Floating translucent glass navigation bar
- `HeroProductPreview` (`src/components/landing/hero-product-preview.tsx`) — Layered glass telemetry console preview with baseline SVG curve & recommendation block
- `BaselineVisual` (`src/components/landing/baseline-visual.tsx`) — Visual baseline normal range vs. current reading gauge
- `DataInsightSection` (`src/components/landing/data-insight-section.tsx`) — Raw signals to Ludis explainable action pipeline
- `MvpPillars` (`src/components/landing/mvp-pillars.tsx`) — Glassmorphism cards for the 4 MVP pillars
- `AudienceSection` & `HowLudisThinks` (`src/components/landing/sections.tsx`) — Athlete/Coach interfaces and 5-step data-to-decision process
- `CompetitionContext` & `ResponsibleAI` (`src/components/landing/sections.tsx`) — Event weather context & ethical decision support boundaries


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
