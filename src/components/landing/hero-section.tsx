// Ludis Landing — Hero Section with entrance animations
'use client';

import { HeroProductPreview } from '@/components/landing/hero-product-preview';
import { HeroReveal } from '@/components/landing/scroll-reveal';
import { useAuthModal } from '@/lib/auth';

export function HeroSection() {
  const { openSignUp } = useAuthModal();
  return (
    <section className="pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Hero Typography Left Column */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <HeroReveal delay={0.05} duration={0.5} offset={16}>
            <div className="text-xs tracking-[0.15em] uppercase font-bold text-brand-primary">
              AI-POWERED PERFORMANCE INTELLIGENCE
            </div>
          </HeroReveal>

          <HeroReveal delay={0.15} duration={0.6} offset={24}>
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-serif tracking-tight leading-[1.05]">
              <span className="text-text-primary font-normal italic block">KNOW YOUR BODY.</span>
              <span className="text-brand-primary font-bold block mt-2">TRAIN SMARTER.</span>
            </h1>
          </HeroReveal>

          <HeroReveal delay={0.3} duration={0.5} offset={18}>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg font-normal">
              Ludis turns training and health data into personalized performance, recovery, fatigue and readiness insights built around your own baseline.
            </p>
          </HeroReveal>

          <HeroReveal delay={0.45} duration={0.5} offset={16}>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => openSignUp()}
                className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-hover text-black font-semibold text-sm rounded-md px-6 py-3 transition-colors duration-150 select-none cursor-pointer text-center"
              >
                GET STARTED — FREE
              </button>
              <a href="#baseline" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto border border-border-default hover:border-border-strong text-text-primary font-semibold text-sm rounded-md px-6 py-3 transition-colors duration-150 select-none cursor-pointer">
                  SEE HOW IT WORKS
                </button>
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
