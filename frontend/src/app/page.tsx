// Ludis — Premium Dark Editorial Landing Page
// Scroll animation applied via client-boundary motion wrappers.
// Employs private React refs and callback-based navigation hooks for Athlete/Coach cards visual centering.

'use client';

import { useRef } from 'react';
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
import { LandingBackToTop } from '@/components/landing/landing-back-to-top';
import { scrollPanelToViewportCenter } from '@/lib/navigation/scroll-to-section';

export default function LandingPage() {
  // 1. Instantiating refs for visual panels at page container boundary
  const athletePanelRef = useRef<HTMLDivElement | null>(null);
  const coachPanelRef = useRef<HTMLDivElement | null>(null);

  // 2. Center-visual layout alignment navigation handlers
  const handleNavigateAthletes = () => {
    if (!athletePanelRef.current) return;
    scrollPanelToViewportCenter(athletePanelRef.current);
  };

  const handleNavigateCoaches = () => {
    if (!coachPanelRef.current) return;
    scrollPanelToViewportCenter(coachPanelRef.current);
  };

  return (
    <div className="min-h-screen bg-surface-ground text-text-primary selection:bg-brand-primary/30 selection:text-brand-primary relative overflow-hidden">

      {/* Navigation Bar - Receives callback handlers */}
      <LandingNav 
        onNavigateAthletes={handleNavigateAthletes} 
        onNavigateCoaches={handleNavigateCoaches} 
      />

      {/* ── HERO SECTION ── */}
      <HeroSection />

      {/* ── PERSONAL BASELINE SECTION ── */}
      <BaselineVisual />

      {/* ── FOUR MVP CAPABILITIES PILLARS ── */}
      <MvpPillars />

      {/* ── ATHLETE & COACH AUDIENCE SECTION - Receives panel refs directly ── */}
      <AudienceSection 
        athletePanelRef={athletePanelRef} 
        coachPanelRef={coachPanelRef} 
      />

      {/* ── RESPONSIBLE AI & ETHICAL BOUNDARIES ── */}
      <ResponsibleAI />

      {/* ── FINAL CTA ── */}
      <FinalCTA />

      {/* ── FOOTER - Receives callback handlers ── */}
      <LandingFooter 
        onNavigateAthletes={handleNavigateAthletes} 
        onNavigateCoaches={handleNavigateCoaches} 
      />

      {/* ── FLOATING BACK TO TOP BUTTON ── */}
      <LandingBackToTop />
    </div>
  );
}
