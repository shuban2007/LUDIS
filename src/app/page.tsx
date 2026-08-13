// Ludis — Premium Glassmorphism Landing Page
// Scroll animation applied via client-boundary motion wrappers.

import { LandingNav } from '@/components/landing/landing-nav';
import { HeroSection } from '@/components/landing/hero-section';
import { BaselineVisual } from '@/components/landing/baseline-visual';
import { DataInsightSection } from '@/components/landing/data-insight-section';
import { MvpPillars } from '@/components/landing/mvp-pillars';
import {
  AudienceSection,
  HowLudisThinks,
  CompetitionContext,
  ResponsibleAI,
  FinalCTA,
  LandingFooter,
} from '@/components/landing/sections';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-ground bg-tech-grid relative overflow-hidden text-text-primary selection:bg-brand-primary/30 selection:text-brand-primary">
      {/* Background Radial Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-radial-gradient pointer-events-none -z-10" />

      {/* Atmospheric Ambient Glows */}
      <div className="glow-orb-teal w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2" />
      <div className="glow-orb-blue w-[500px] h-[500px] top-[400px] right-[-100px]" />

      {/* Glass Navigation Bar */}
      <LandingNav />

      {/* ── HERO SECTION ── */}
      <HeroSection />

      {/* ── PERSONAL BASELINE SECTION ── */}
      <BaselineVisual />

      {/* ── RAW DATA TO INSIGHT SECTION ── */}
      <DataInsightSection />

      {/* ── FOUR MVP CAPABILITIES PILLARS ── */}
      <MvpPillars />

      {/* ── ATHLETE & COACH AUDIENCE SECTION ── */}
      <AudienceSection />

      {/* ── INTELLIGENCE PIPELINE PROCESS ── */}
      <HowLudisThinks />

      {/* ── COMPETITION & ENVIRONMENT CONTEXT ── */}
      <CompetitionContext />

      {/* ── RESPONSIBLE AI & ETHICAL BOUNDARIES ── */}
      <ResponsibleAI />

      {/* ── FINAL DRAMATIC CTA ── */}
      <FinalCTA />

      {/* ── FOOTER ── */}
      <LandingFooter />
    </div>
  );
}
