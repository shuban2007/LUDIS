// Ludis Landing Components — Personal Baseline Section Component
// HIGH MOTION: Baseline concept is core to Ludis, deserves meaningful reveal.

'use client';

import { ScrollReveal, StaggerContainer, StaggerItem } from './scroll-reveal';

export function BaselineVisual() {
  return (
    <section id="baseline" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative">
      <div className="glow-orb-teal w-96 h-96 -top-10 -left-20" />

      <ScrollReveal className="text-center max-w-3xl mx-auto mb-14" duration={0.5}>
        <span className="ludis-section-title">INDIVIDUALIZED INTELLIGENCE</span>
        <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase mt-2">
          YOUR BASELINE. <span className="text-brand-primary">NOT THE AVERAGE.</span>
        </h2>
        <p className="text-base text-text-secondary mt-4 leading-relaxed">
          Generic fitness trackers compare you to population averages. Ludis measures meaningful physiological and performance deviations against your own historical baseline.
        </p>
      </ScrollReveal>

      {/* Interactive Glass Visualizer */}
      <ScrollReveal className="glass-hero rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto border-border-luminous relative overflow-hidden" duration={0.6} delay={0.1} scale>
        <StaggerContainer className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8" stagger={0.12} delay={0.15}>
          <StaggerItem>
            <span className="text-xs font-mono text-text-muted uppercase">PERSONAL PERFORMANCE RANGE</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold font-mono text-text-primary">74 – 80</span>
              <span className="text-sm font-mono text-text-muted">PTS BASELINE</span>
            </div>
            <p className="text-xs text-text-secondary mt-1">Calculated over 90 days of continuous multi-signal data.</p>
          </StaggerItem>

          <StaggerItem>
            <div className="glass-subtle rounded-2xl p-4 border-border-luminous bg-brand-primary-muted/20 text-right">
              <span className="text-xs font-mono text-brand-primary uppercase font-bold">CURRENT READING</span>
              <div className="flex items-baseline justify-end gap-2 mt-1">
                <span className="text-4xl font-extrabold font-mono text-brand-primary">84</span>
                <span className="text-sm font-mono text-status-positive font-bold">+6.4%</span>
              </div>
              <span className="text-xs font-mono text-status-positive uppercase font-semibold">SIGNIFICANT POSITIVE DEVIATION</span>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Visual Baseline Range Gauge */}
        <ScrollReveal delay={0.3} duration={0.5}>
          <div className="relative py-6">
            <div className="h-4 w-full rounded-full bg-surface-overlay border border-border-default relative overflow-hidden">
              {/* Baseline Normal Zone Highlight */}
              <div
                className="absolute h-full bg-border-strong opacity-50 border-x border-text-muted"
                style={{ left: '35%', width: '30%' }}
              />
              {/* Active Current Value Marker */}
              <div
                className="absolute h-full bg-brand-primary shadow-[0_0_12px_#00c896]"
                style={{ left: '72%', width: '12px' }}
              />
            </div>

            {/* Scale Labels */}
            <div className="flex justify-between text-xs font-mono text-text-muted mt-3">
              <span>60 Low</span>
              <span className="text-text-secondary font-bold">74 Baseline Low</span>
              <span className="text-text-secondary font-bold">80 Baseline High</span>
              <span className="text-brand-primary font-bold">84 Current</span>
              <span>100 Max</span>
            </div>
          </div>
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
}
