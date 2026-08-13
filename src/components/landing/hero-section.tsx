// Ludis Landing — Hero Section with entrance animations
// Client component boundary for motion. Hero has the strongest entrance.

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroProductPreview } from '@/components/landing/hero-product-preview';
import { HeroReveal } from '@/components/landing/scroll-reveal';

export function HeroSection() {
  return (
    <section className="pt-12 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Typography Left Column */}
        <div className="lg:col-span-6 text-center lg:text-left space-y-6">
          <HeroReveal delay={0.05} duration={0.5} offset={16}>
            <div className="inline-flex items-center gap-2 rounded-full glass-subtle border-border-luminous px-4 py-1.5 text-xs font-mono font-semibold text-brand-primary shadow-lg">
              <span className="h-2 w-2 rounded-full bg-brand-primary animate-ping" />
              SPORTS-PERFORMANCE INTELLIGENCE ENGINE
            </div>
          </HeroReveal>

          <HeroReveal delay={0.15} duration={0.6} offset={24}>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight uppercase leading-[0.95] text-text-primary">
              KNOW YOUR BODY.
              <br />
              <span className="bg-gradient-to-r from-brand-primary via-brand-primary-hover to-brand-cyan bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,200,150,0.35)]">
                TRAIN SMARTER.
              </span>
            </h1>
          </HeroReveal>

          <HeroReveal delay={0.3} duration={0.5} offset={18}>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Ludis transforms your health and training telemetry into individualized performance, recovery, fatigue, and readiness insights built around your personal baseline.
            </p>
          </HeroReveal>

          <HeroReveal delay={0.45} duration={0.5} offset={16}>
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
          </HeroReveal>
        </div>

        {/* Hero Product Visualization Right Column */}
        <HeroReveal className="lg:col-span-6" delay={0.25} duration={0.7} offset={28}>
          <HeroProductPreview />
        </HeroReveal>
      </div>
    </section>
  );
}
