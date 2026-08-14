// Ludis Landing Components — Audience, Process, Competition, Responsible AI, CTA, Footer
'use client';

import { LudisLogo } from '@/components/ui/ludis-logo';
import { ScrollReveal } from './scroll-reveal';
import { useAuthModal } from '@/lib/auth';

/* ─────────────────────────────────────────────
   AudienceSection (Athlete / Coach Split)
   ───────────────────────────────────────────── */

export function AudienceSection() {
  return (
    <section id="audience" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border-default select-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Athlete Panel */}
        <ScrollReveal delay={0.05} duration={0.6} offset={20}>
          <div className="relative h-[480px] sm:h-[560px] rounded-lg overflow-hidden flex flex-col justify-end p-8 sm:p-12 border border-white/10 group cursor-pointer">
            {/* Background Image with cover positioning */}
            <div 
              className="absolute inset-0 bg-[url('/athlete_portrait.png')] bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
              style={{ objectPosition: 'center 20%' }}
            />
            {/* Dark bottom gradient to ensure text readability and seamless black merge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

            {/* Content positioned in negative space */}
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-bold text-brand-primary tracking-widest uppercase">
                FOR ATHLETES
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#F5F5F5] font-semibold leading-tight max-w-xs">
                Your data.
                <br />
                Your baseline.
                <br />
                Your performance.
              </h3>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary group-hover:text-brand-primary-hover transition-colors duration-150">
                  VIEW ATHLETE EXPERIENCE 
                  <span className="transform group-hover:translate-x-1 transition-transform duration-150">→</span>
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Coach Panel */}
        <ScrollReveal delay={0.15} duration={0.6} offset={20}>
          <div className="relative h-[480px] sm:h-[560px] rounded-lg overflow-hidden flex flex-col justify-end p-8 sm:p-12 border border-white/10 group cursor-pointer">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-[url('/coach_portrait.png')] bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
              style={{ objectPosition: 'center 20%' }}
            />
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-bold text-brand-primary tracking-widest uppercase">
                FOR COACHES
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#F5F5F5] font-semibold leading-tight max-w-xs">
                See the full picture.
                <br />
                Protect your team.
              </h3>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary group-hover:text-brand-primary-hover transition-colors duration-150">
                  VIEW COACH DASHBOARD 
                  <span className="transform group-hover:translate-x-1 transition-transform duration-150">→</span>
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ResponsibleAI (Trust Statement)
   ───────────────────────────────────────────── */

export function ResponsibleAI() {
  return (
    <section id="responsible-ai" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-border-default text-center select-none">
      <ScrollReveal duration={0.5} offset={20}>
        <div className="space-y-6">
          <h2 className="text-sm font-serif tracking-[0.25em] text-text-primary uppercase">
            DECISION SUPPORT. NOT MEDICAL DIAGNOSIS.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal">
            Ludis is decision-support software. It does not provide medical diagnoses or replace clinical or coaching expertise.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold text-text-muted tracking-wider uppercase pt-4">
            <span>EXPLAINABLE</span>
            <span className="text-border-default">•</span>
            <span>DATA QUALITY AWARE</span>
            <span className="text-border-default">•</span>
            <span>ATHLETE CONTROLLED</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FinalCTA
   ───────────────────────────────────────────── */

export function FinalCTA() {
  const { openSignUp } = useAuthModal();
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border-default text-center relative overflow-hidden select-none">
      
      {/* Background large Gothic L Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 select-none">
        <div className="opacity-[0.03] scale-[4] filter brightness-0 invert dark:invert-0">
          <LudisLogo variant="icon-only" size="xl" noBadge />
        </div>
      </div>

      <ScrollReveal duration={0.6} offset={16}>
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-serif tracking-tight text-text-primary">
            TRAIN WITH CLARITY.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
            Know what changed. Understand why it matters. Decide what to do next.
          </p>
          <div className="pt-6">
            <button
              onClick={() => openSignUp()}
              className="bg-brand-primary hover:bg-brand-primary-hover text-black font-semibold text-sm rounded-md px-8 py-3.5 transition-colors duration-150 select-none cursor-pointer text-center"
            >
              GET STARTED — FREE
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ─────────────────────────────────────────────
   LandingFooter
   ───────────────────────────────────────────── */

export function LandingFooter() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border-default text-xs text-text-muted select-none">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left column */}
        <div className="space-y-3">
          <LudisLogo linkToHome variant="footer" size="sm" themeStyle="inverted" noBadge showSubtitle={false} />
          <p className="text-[11px] text-text-muted">
            Performance intelligence built around you.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-text-secondary">
          <a href="#baseline" className="hover:text-brand-primary transition-colors duration-150">Product</a>
          <a href="#baseline" className="hover:text-brand-primary transition-colors duration-150">How it works</a>
          <a href="#audience" className="hover:text-brand-primary transition-colors duration-150">Athletes</a>
          <a href="#audience" className="hover:text-brand-primary transition-colors duration-150">Coaches</a>
          <a href="#responsible-ai" className="hover:text-brand-primary transition-colors duration-150">Responsible AI</a>
        </div>

        {/* Right copyright */}
        <div className="text-left md:text-right">
          <span>© 2026 Ludis. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   UNRENDERED PLACEHOLDERS FOR COMPATIBILITY
   (Maintained in file but not actively displayed in the rhythm)
   ───────────────────────────────────────────── */

export function HowLudisThinks() {
  return null;
}

export function CompetitionContext() {
  return null;
}
