// Ludis — Premium Dark Editorial Landing Page
// Scroll animation applied via client-boundary motion wrappers.

import { LandingNav } from '@/components/landing/landing-nav';
import { HeroSection } from '@/components/landing/hero-section';
import { BaselineVisual } from '@/components/landing/baseline-visual';
import { MvpPillars } from '@/components/landing/mvp-pillars';
import {
  AudienceSection,
  ResponsibleAI,
  FinalCTA,
  LandingFooter,
} from '@/components/landing/sections';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-ground text-text-primary selection:bg-brand-primary/30 selection:text-brand-primary relative overflow-hidden">

      {/* Navigation Bar */}
      <LandingNav />

      {/* ── HERO SECTION ── */}
      <HeroSection />

      {/* ── PERSONAL BASELINE SECTION ── */}
      <BaselineVisual />

      {/* ── FOUR MVP CAPABILITIES PILLARS ── */}
      <MvpPillars />

      {/* ── ATHLETE & COACH AUDIENCE SECTION ── */}
      <AudienceSection />

      {/* ── RESPONSIBLE AI & ETHICAL BOUNDARIES ── */}
      <ResponsibleAI />

      {/* ── FINAL CTA ── */}
      <FinalCTA />

      {/* ── FOOTER ── */}
      <LandingFooter />
    </div>
  );
}
