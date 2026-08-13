// Ludis — Premium Glassmorphism Landing Page Redesign

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LandingNav } from '@/components/landing/landing-nav';
import { HeroProductPreview } from '@/components/landing/hero-product-preview';
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
      <section className="pt-12 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Typography Left Column */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full glass-subtle border-border-luminous px-4 py-1.5 text-xs font-mono font-semibold text-brand-primary shadow-lg">
              <span className="h-2 w-2 rounded-full bg-brand-primary animate-ping" />
              SPORTS-PERFORMANCE INTELLIGENCE ENGINE
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight uppercase leading-[0.95] text-text-primary">
              KNOW YOUR BODY.
              <br />
              <span className="bg-gradient-to-r from-brand-primary via-brand-primary-hover to-brand-cyan bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,200,150,0.35)]">
                TRAIN SMARTER.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Ludis transforms your health and training telemetry into individualized performance, recovery, fatigue, and readiness insights built around your personal baseline.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-extrabold text-sm uppercase tracking-wider rounded-xl px-8 py-3.5 shadow-[0_0_25px_rgba(0,200,150,0.35)]">
                  Start Free
                </Button>
              </Link>
              <a href="#baseline" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto glass-subtle border-border-default hover:border-brand-primary/40 text-text-primary font-bold text-sm uppercase tracking-wider rounded-xl px-8 py-3.5">
                  See How It Works
                </Button>
              </a>
            </div>
          </div>

          {/* Hero Product Visualization Right Column */}
          <div className="lg:col-span-6">
            <HeroProductPreview />
          </div>
        </div>
      </section>

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
