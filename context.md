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
- **Styling**: Tailwind CSS v4 + Centralized Theme Token System (`globals.css`) utilizing `[data-theme="dark"]`/`[data-theme="light"]` and `html.dark`/`html.light` selectors. Widescreen boundaries scaled to `max-w-[90rem]` (1440px), with vertical section padding set to `py-8 md:py-12` (and compact vertical intervals on CTA/Footer) to keep components stacked closely with minimal blank space.
- **Theme Architecture**: Hydration-safe Theme Provider (`src/lib/theme/theme-provider.tsx`) serving as the single source of truth for dynamic theme states, using localStorage persistence, fallback-to-dark rules, and synchronization to the document `<html>` attribute class list and dataset theme. Executes an inline initialization script inside `layout.tsx` to resolve theme state synchronously before first paint. All visual elements, background gradients, scrolled headers, image filters, and Sun/Moon toggle icons are rendered as unified DOM structures and styled dynamically via CSS variables to fully prevent hydration mismatches and theme flashes.
- **Unified Shell Layouts**: Shared responsive layout shells `AppTopBar` (`src/components/ui/top-bar.tsx`) and `AppSidebar` (`src/components/ui/sidebar.tsx`) that consume CSS variables directly to adapt interfaces on the fly.
- **Scroll & Navigation System**: Centralized scroll target alignment helper [scroll-to-section.ts](file:///c:/Users/shuba/Desktop/Ludis/src/lib/navigation/scroll-to-section.ts) linked to a targets map, utilizing dynamic header height measurements from `ResizeObserver` and section-specific visual margins, while strictly keeping the URL address bar as `/` (no hash fragments).
- **Scroll-Linked Motion**: Section-local immersive animations mapped to scroll progress indicators using `motion/react`, bounded by strict motion budgets (20px y-limits, 3-4% scale-limits) and fully disabled under prefers-reduced-motion constraints.
- **Animation**: `motion` (v12+, `motion/react`) for scroll-reveal and entrance animations. Reusable primitives in `src/components/landing/scroll-reveal.tsx`.
- **Font**: Inter (`next/font/google`)
- **Data Layer**: Service abstraction (`src/lib/services/data-service.ts`) backed by typed mock data (`src/lib/mock/`). Designed for Supabase PostgreSQL & Python ML API integration.
- **Navigation Architecture**: Centralized route-driven navigation module (`src/lib/navigation.tsx`) providing canonical `athleteNavItems` & `coachNavItems` configurations and `isNavItemActive()` matching utility. Enforces exact matching on root dashboards (`/athlete`, `/coach`) and segment-aware prefix matching on child sections (`/athlete/profile`, `/coach/athletes`), ensuring exactly 1 navigation item is active for any route. Includes nav focus isolation (`.nav-item:focus { outline: none; }` and `.nav-item:focus-visible`) preventing persistent mouse focus borders when switching routes while preserving keyboard accessibility.



---

## Information Architecture & Routes

### Public & Auth
- `/` — **Redesigned Landing Page**: Premium dark sports technology visual style featuring high-density material surfaces, hierarchical card-depth tokens, and highly restrained use of brand teal accents. Retains the scroll-reveal animation system (`motion/react`) including staggered hero entrance, viewport-triggered section reveals, and progressive pipeline animation. All landing page Sign In / Get Started CTAs are intercepted by `AuthModal`.
- `/login` — **Legacy Sign In Route**: Server-side redirects to `/` where the premium `AuthModal` handles signing in.
- `/signup` — **Legacy Sign Up Route**: Server-side redirects to `/` where the premium `AuthModal` handles account creation.

- `/onboarding` — Multi-step decision-relevant onboarding (sport, experience, competition context)
- `src/lib/auth/auth-modal-context.tsx` — Reusable authentication modal state manager controlling visibility (`isOpen`), active view switching (`signin` vs `signup`), and document focus restoration state.
- `src/lib/auth/demo-auth.ts` — Isolated demo authentication service hosting credentials, feature flag `DEMO_AUTH_ENABLED`, and auto-login helper wrappers.
- `src/components/auth/auth-modal.tsx` — Premium centered glass overlay dialog featuring top curved specular light highlight, custom SVG fields, Framer Motion entry/exit/crossfade animations, body scroll lock, and keyboard focus trap.
- `src/components/auth/demo-login.tsx` — Secondary conditional component rendering clean separator divider and quick ATHLETE and COACH auto-logins with button busy indicator states.


### Landing Page Component Library (`src/components/landing/`) & UI
- `LudisLogo` (`src/components/ui/ludis-logo.tsx`) — Official brand logo component rendering `public/LudisLogo1.png` with aspect ratio preservation, high-contrast slate glass badge formatting, and responsive variant support (`navbar`, `footer`, `hero`, `compact`, `icon-only`).
- `LandingNav` (`src/components/landing/landing-nav.tsx`) — Floating translucent glass navigation bar styled with Depth 2. Dynamic glass density scrolls from `0.65` opacity at page top to `0.82` opacity once scrolled past `40px` for a premium glassmorphic feel.
- `HeroSection` (`src/components/landing/hero-section.tsx`) — Client component wrapping hero copy + product preview with staggered `HeroReveal` entrance animations (eyebrow → headline → paragraph → CTAs → product preview). Unifies DOM rendering for both themes, presenting the custom light mode runner (`public/runner_light_mode.png`) dynamically alongside a resized and bottom-right aligned glass telemetries dashboard preview (`HeroProductPreview`) in light mode, while preserving default runner visuals in dark mode, both styled cleanly using CSS variables to prevent hydration warnings.
- `HeroProductPreview` (`src/components/landing/hero-product-preview.tsx`) — Highly streamlined, translucent performance HUD card displaying only Readiness (82), Performance (83, baseline 76–80), and the trend graph, removing other supporting metrics to double the photography visibility. Retains desktop mouse-driven 3D perspective tilt and vertical scroll parallax, adapting dynamically to light and dark themes using semantic design tokens.
- `ScrollReveal`, `StaggerContainer`, `StaggerItem`, `HeroReveal` (`src/components/landing/scroll-reveal.tsx`) — Reusable motion primitives using `motion/react`. `ScrollReveal` fades+slides content on viewport entry (trigger once). `StaggerContainer`/`StaggerItem` provide staggered children reveals. `HeroReveal` animates immediately on mount with configurable delay. All disable under `prefers-reduced-motion`.
- `BaselineVisual` (`src/components/landing/baseline-visual.tsx`) — Visual baseline normal range vs. current reading gauge with scroll-reveal animations
- `MvpPillars` (`src/components/landing/mvp-pillars.tsx`) — Glassmorphism cards for the 4 MVP pillars with 80ms staggered entrance, hover card rise, text color transitions, and number/icon vertical translate movements.
- `AudienceSection` & `HowLudisThinks` (`src/components/landing/sections.tsx`) — Athlete/Coach interfaces (staggered cards) featuring mouse pointer glow, 3D card tilt, compact touch targets, and a static overflow-hidden crop boundary with an inset-[-24px] parallax translation wrapper to prevent card background bleeding. Includes direct authentication integrations mapped to Quick Demo logins.
- `CompetitionContext` & `ResponsibleAI` (`src/components/landing/sections.tsx`) — Event weather context & ethical decision support boundaries with minimal scroll reveals


### Athlete Experience (`/athlete/*`)
- `/athlete` — **Athlete Dashboard**: Dynamic, data-driven dashboard. KPI cards (Readiness, Performance, Recovery, Fatigue) are now fully **derived** from the centralized health analysis engine — never entered manually. Features a collapsible **ADD DAILY MEASUREMENTS** inline form that collects raw athlete observations: Heart Rate, Resting HR, HRV (optional), Blood Pressure (optional), Sleep Duration (hours + minutes), Training Duration, Training Effort/RPE (1–10 scale), Muscle Soreness (0–10 scale), Energy Level (1–10 scale), and Body Weight (optional). On save, measurements propagate to the centralized `DemoProvider` state and immediately update all derived scores (Readiness, Recovery, Fatigue, Performance) reactively via `useMemo`. Inline validation (no browser popups) blocks invalid entries. Shows "Measurements logged" confirmation toast on success.
- `src/lib/types/athlete-dashboard.ts` — `AthleteDashboardData` interface contract.
- `src/lib/types/health-measurement.ts` — **NEW**: `HealthMeasurement` interface defining the raw data model (metric, value, secondaryValue, unit, timestamp, source: manual/google_fit/wearable).
- `src/lib/mock/athlete-dashboard.ts` — Mock dashboard dataset (legacy; data now driven from DemoProvider).
- `src/components/athlete/athlete-dashboard-view.tsx` — Core dashboard view component. All derived metrics (Readiness, Performance, Recovery, Fatigue) consumed from `getCurrentAthlete()` context. Contains the ADD DAILY MEASUREMENTS form with 10 measurement inputs, source assignment (`manual`), and form validation.
- `/athlete/performance` — Baseline comparisons, PPI score, deviation significance
- `/athlete/recovery` — Recovery score, multi-signal factors, confidence, history
- `/athlete/fatigue` — Fatigue indicators (primary/supporting), workload context, responsible language actions
- `/athlete/insights` — AI Recommendations with evidence chains and confidence ratings
- `/athlete/events` — Competitions and training events with environmental context
- `/athlete/progress` — Multi-metric trend analysis over time
- `/athlete/notifications` — Notification center
- `/athlete/profile` — **Dedicated Athlete Profile Page**: Strictly personal identity & body information (Avatar, Full Name, Age, Sport, Comp Level, Season Block, Height, Weight) driven by `src/components/athlete/profile/profile-header.tsx`, `personal-info-card.tsx`, `body-information-card.tsx`, `recent-body-updates.tsx`, and `profile-edit-form.tsx`. Form save reactively updates pure in-memory `sessionProfileOverrides` without page reload or `localStorage` calls. Measurable height/weight edits generate `ProfileMeasurementLog` entries rendered in a compact session update list.
- `/athlete/settings` — **Dedicated Athlete Application Settings Page**: Contains application preferences and security controls only (Appearance Light/Dark theme, Notifications toggles, Google Fit & Wearable health data connections, Coach access privacy permissions, Security session status). Contains no profile fields or reset buttons.

### Centralized Ephemeral Session & Profile Architecture

- `src/lib/types/profile.ts` — **NEW**: `ProfileMeasurementLog`, `ProfileOverride`, `SessionProfileOverrides`, and `CoachProfile` interface definitions.
- `src/lib/demo/demo-context.tsx` — Centralized provider managing in-memory `sessionProfileOverrides` and `profileMeasurementLogs` via React `useState`. Implements `resolvedAthletes` and `resolvedCoach` dynamic resolvers. `updateAthleteProfile` and `updateCoachProfile` compare height/weight numerical values to create measurement logs automatically **only** when height or weight change. No `localStorage` or `sessionStorage` is used for profile overrides, and no reset UI buttons are exposed.
- `src/data/demo/demo-data.ts` — Baseline demo data remains strictly immutable. Includes `INITIAL_COACH_PROFILE`.
- `src/lib/demo/health-analysis.ts` — Deterministic health analysis engine for readiness, recovery, fatigue, and performance.


### Coach Experience (`/coach/*`)
- `/coach` — **Coach Dashboard**: Dynamic dashboard fully bound to `useDemo()`. Consumes resolved athlete profiles and metrics reactively.
- `/coach/teams` — **Teams Management**: Displays a responsive grid of active team roster cards showing athlete counts, sports, and readiness averages.
- `/coach/teams/create` — **Create Team Page**: Interactive form allowing coaches to name and initialize teams.
- `/coach/teams/[teamId]` — **Team Details Page**: High-density team management layout resolving rosters by `athleteIds`.
- `/coach/athletes` — Athlete roster list.
- `/coach/athletes/[athleteId]` — **Dynamic Athlete Detail Page**: Dynamic route wrapping `src/components/coach/athlete-detail-view.tsx` to present readiness metrics, performance history graphs, recovery baseline indicators, and current height/weight body metrics.
- `/coach/events` — Team event schedule.
- `/coach/notifications` — Team alerts.
- `/coach/profile` — **Dedicated Coach Profile Page**: Displays coach identity, personal info, height, weight, and edit form (`src/components/coach/profile/`).
- `/coach/settings` — **NEW Dedicated Coach Settings Page**: Route at `/coach/settings` containing Appearance, Notifications, Data & Privacy, and Security cards.

### Public Invitation Acceptance (`/join/team/[token]`)
- `/join/team/[token]` — **Join Team Page**: Validates pending athlete invitations case-insensitively by token. Matches joining athlete emails to existing profiles or creates lightweight placeholder accounts. Prompts athlete to accept or decline the team invitation.

### Team Models & Services Architecture
- `src/lib/types/team.ts` — Data models for `Team` (storing athlete IDs only) and `TeamInvitation`.
- `src/lib/demo/demo-storage.ts` — Hydration-safe local storage helper managing client state overrides.
- `src/lib/email/invitation-email.ts` — Outbound mail dispatcher featuring Resend API endpoints preparation and a terminal-logged Demo Email Mode fallback.
- `src/app/api/team-invitations/send/route.ts` — Secure backend email proxy executing server-side Resend API calls.

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
