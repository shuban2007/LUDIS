// Ludis Landing Components — Audience, Process, Competition, Responsible AI, CTA, Footer
// Motion levels: Audience (MEDIUM), HowLudisThinks (HIGH), Competition (MEDIUM),
// ResponsibleAI (LOW), FinalCTA (MEDIUM), Footer (none).

'use client';

import Link from 'next/link';
import { LudisLogo } from '@/components/ui/ludis-logo';
import { Button } from '@/components/ui/button';
import { ScrollReveal, StaggerContainer, StaggerItem } from './scroll-reveal';

export function AudienceSection() {
  return (
    <section id="audience" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle">
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-16" duration={0.5}>
        <span className="ludis-section-title">ROLE-SPECIFIC INTERFACES</span>
        <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase mt-2">
          BUILT FOR THE ATHLETE. <span className="text-brand-primary">POWERFUL FOR THE COACH.</span>
        </h2>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8" stagger={0.12}>
        {/* Athlete Console */}
        <StaggerItem offset={20} duration={0.55}>
          <div className="glass-hero rounded-3xl p-6 sm:p-8 border-border-luminous h-full">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-brand-primary uppercase font-bold tracking-widest">
                ATHLETE EXPERIENCE
              </span>
              <span className="text-xs font-mono text-text-muted">MOBILE-FIRST DESIGN</span>
            </div>

            <div className="glass-subtle rounded-2xl p-4 mb-6 border-border-subtle space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
                <span className="text-text-secondary">Readiness Score</span>
                <span className="text-brand-primary font-bold text-sm">82%</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
                <span className="text-text-secondary">Performance Trend</span>
                <span className="text-status-positive font-bold">+6.4% vs baseline</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Today&apos;s Recommendation</span>
                <span className="text-text-primary font-medium">Maintain planned load</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-brand-primary font-bold">✓</span> Personalized Baseline Engine
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-primary font-bold">✓</span> Multi-Signal Recovery &amp; Fatigue Status
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-primary font-bold">✓</span> Competition-Aware Event Context
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-primary font-bold">✓</span> Full Control Over Coach Permissions
              </li>
            </ul>
          </div>
        </StaggerItem>

        {/* Coach Console */}
        <StaggerItem offset={20} duration={0.55}>
          <div className="glass-hero rounded-3xl p-6 sm:p-8 border-border-luminous h-full">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-brand-accent uppercase font-bold tracking-widest">
                COACH EXPERIENCE
              </span>
              <span className="text-xs font-mono text-text-muted">DESKTOP MONITORING CONSOLE</span>
            </div>

            <div className="glass-subtle rounded-2xl p-4 mb-6 border-border-subtle space-y-2 font-mono text-xs">
              <div className="flex justify-between text-text-muted pb-1 border-b border-border-subtle">
                <span>Athlete Roster</span>
                <span>Readiness</span>
              </div>
              <div className="flex justify-between text-text-primary">
                <span>Maya Chen (Running)</span>
                <span className="text-status-positive font-bold">78%</span>
              </div>
              <div className="flex justify-between text-text-primary">
                <span>James Okafor (Basketball)</span>
                <span className="text-status-warning font-bold">58% (Alert)</span>
              </div>
              <div className="flex justify-between text-text-primary">
                <span>Liam Torres (Cycling)</span>
                <span className="text-status-risk font-bold">45% (Rest Req)</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-brand-accent font-bold">✓</span> Team Readiness Distribution &amp; Alerts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-accent font-bold">✓</span> Individual Athlete Detail Drill-Down
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-accent font-bold">✓</span> Event &amp; Environmental Race Readiness
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-accent font-bold">✓</span> Permission-Scoped Access Boundaries
              </li>
            </ul>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}

export function HowLudisThinks() {
  const steps = [
    { num: '01', title: 'CONNECT SIGNALS', desc: 'Health, training logs, perceived exertion, and competition schedule.' },
    { num: '02', title: 'ESTABLISH BASELINE', desc: 'Statistical range of what is normal for this individual athlete.' },
    { num: '03', title: 'DETECT DEVIATIONS', desc: 'Flag meaningful spikes, drops, and fatigue trends.' },
    { num: '04', title: 'EXPLAIN & VERIFY', desc: 'Attach contributing factors and data quality confidence levels.' },
    { num: '05', title: 'RECOMMEND ACTION', desc: 'Clear, decision-support guidance for training and recovery.' },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle relative">
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-16" duration={0.5}>
        <span className="ludis-section-title">INTELLIGENCE PIPELINE</span>
        <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase mt-2">
          FROM DATA TO <span className="text-brand-primary">DECISION</span>
        </h2>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-4 relative" stagger={0.1}>
        {steps.map((s, i) => (
          <StaggerItem key={s.num} offset={18} duration={0.5}>
            <div className="glass-subtle glass-interactive rounded-2xl p-5 border-border-subtle relative h-full">
              <span className="font-mono text-2xl font-black text-brand-primary block mb-2">{s.num}</span>
              <h4 className="text-xs font-bold text-text-primary uppercase font-mono mb-2">{s.title}</h4>
              <p className="text-xs text-text-muted leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-brand-primary">
                  →
                </div>
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function CompetitionContext() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle">
      <ScrollReveal duration={0.55} offset={20}>
        <div className="glass-hero rounded-3xl p-6 sm:p-10 border-border-luminous max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="ludis-section-title">COMPETITION CONTEXT</span>
            <h3 className="text-2xl font-extrabold text-text-primary uppercase mt-1">
              ENVIRONMENT &amp; EVENT-AWARE READINESS
            </h3>
            <p className="text-xs text-text-secondary mt-2 leading-relaxed max-w-md">
              Upcoming race or match dates automatically adjust performance interpretation. Environmental factors like temperature and humidity modulate recovery guidance.
            </p>
          </div>

          <div className="glass-subtle rounded-2xl p-4 border-border-subtle font-mono text-xs w-full md:w-auto shrink-0 space-y-2">
            <div className="text-brand-primary font-bold">UPCOMING COMPETITION</div>
            <div className="text-text-primary font-semibold">Regional 10K Championship</div>
            <div className="text-text-muted">Aug 30 • Portland, OR</div>
            <div className="text-status-warning pt-1 border-t border-border-subtle">
              Temp: 22°C | Humidity: 55% | AQI: 42
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

export function ResponsibleAI() {
  return (
    <section id="responsible-ai" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle">
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-14" duration={0.5}>
        <span className="ludis-section-title">ETHICAL BOUNDARIES</span>
        <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase mt-2">
          INTELLIGENT ENOUGH TO <span className="text-brand-cyan">EXPLAIN ITSELF</span>
        </h2>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" stagger={0.08}>
        <StaggerItem offset={12} duration={0.4}>
          <div className="glass-subtle rounded-2xl p-6 border-border-subtle h-full">
            <h4 className="text-sm font-bold text-text-primary font-mono uppercase mb-2">
              DECISION SUPPORT
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Ludis is decision-support software. It does not provide medical diagnoses or replace clinical/coaching expertise.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem offset={12} duration={0.4}>
          <div className="glass-subtle rounded-2xl p-6 border-border-subtle h-full">
            <h4 className="text-sm font-bold text-text-primary font-mono uppercase mb-2">
              EXPLAINABLE REASONING
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              No black box predictions. Every recommendation exposes underlying evidence, deviation values, and contributing factors.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem offset={12} duration={0.4}>
          <div className="glass-subtle rounded-2xl p-6 border-border-subtle h-full">
            <h4 className="text-sm font-bold text-text-primary font-mono uppercase mb-2">
              DATA QUALITY AWARE
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              When telemetry data quality or sample size is limited, confidence indicators explicitly reflect lower certainty.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle text-center relative">
      <div className="glow-orb-teal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <ScrollReveal scale duration={0.6}>
        <div className="glass-hero rounded-3xl p-10 sm:p-16 max-w-4xl mx-auto border-border-luminous relative">
          <LudisLogo variant="icon-only" size="xl" className="mb-6" />
          <h2 className="text-4xl sm:text-6xl font-black text-text-primary tracking-tight uppercase mb-4">
            TRAIN WITH <span className="text-brand-primary">CLARITY.</span>
          </h2>
          <p className="text-base text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
            Know what changed. Understand why it matters. Decide what to do next.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-extrabold text-sm uppercase tracking-widest rounded-2xl px-10 py-4 shadow-[0_0_30px_rgba(0,200,150,0.4)]">
              Get Started — Free
            </Button>
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle text-xs text-text-muted">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <LudisLogo linkToHome variant="footer" size="sm" />
        <div className="flex flex-wrap items-center gap-6">
          <a href="#baseline" className="hover:text-text-primary transition-colors">Baseline</a>
          <a href="#capabilities" className="hover:text-text-primary transition-colors">Capabilities</a>
          <a href="#audience" className="hover:text-text-primary transition-colors">Athletes &amp; Coaches</a>
          <a href="#responsible-ai" className="hover:text-text-primary transition-colors">Responsible AI</a>
          <Link href="/login" className="hover:text-text-primary transition-colors">Login</Link>
        </div>
      </div>
      <div className="mt-8 text-center md:text-left border-t border-border-subtle pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} Ludis Performance Engine. Decision-support software. Not a medical device.</span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-primary">
          HIGH-END PERFORMANCE TELEMETRY
        </span>
      </div>
    </footer>
  );
}
