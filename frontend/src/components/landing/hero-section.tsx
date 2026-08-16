// Ludis Landing — Hero Section with dynamic scroll-linked motion
// Light Mode: New scenic runner composite (runner_light_mode.png) with edge-blended environment.
// Dark Mode: Preserves classic layered hero with darkened background + foreground athlete.
// Implements clear depth hierarchy, mouse parallax, scroll parallax, and responsive composition.

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'motion/react';
import type { Variants } from 'motion/react';
import Image from 'next/image';
import { HeroProductPreview } from '@/components/landing/hero-product-preview';
import { HeroReveal } from '@/components/landing/scroll-reveal';
import { useAuthModal } from '@/lib/auth';
import { scrollToSection, LANDING_NAV_TARGETS } from '@/lib/navigation/scroll-to-section';

export function HeroSection() {
  const { openSignUp } = useAuthModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll target tracks container leaving viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 1. Scroll-linked Parallax translations (reversible, tuned to spec)
  const runnerScrollY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -20]);
  const dashboardScrollY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -12]);
  const dashboardScrollScale = useTransform(scrollYProgress, [0, 1], [1.0, prefersReduced ? 1.0 : 0.98]);

  const textY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -16]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.90]);

  // 2. Mouse-linked Interactive Parallax Springs (Desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const runnerMouseX = useTransform(springX, [-300, 300], prefersReduced ? [0, 0] : [-5, 5]);
  const runnerMouseY = useTransform(springY, [-300, 300], prefersReduced ? [0, 0] : [-5, 5]);

  const dashboardMouseX = useTransform(springX, [-300, 300], prefersReduced ? [0, 0] : [-8, 8]);
  const dashboardMouseY = useTransform(springY, [-300, 300], prefersReduced ? [0, 0] : [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced || typeof window === 'undefined' || window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.5);
    mouseY.set(y * 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Entrance Variants for layered reveals
  const runnerEntranceVariants: Variants = {
    hidden: { opacity: 0, scale: 1.04 },
    visible: { 
      opacity: 1, 
      scale: 1.0, 
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.20 }
    }
  };

  const dashboardEntranceVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1.0, 
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.35 }
    }
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex items-center overflow-hidden select-none"
    >
      {/* Solid Background Color Layer at the bottom of the stack to resolve stacking context bleed */}
      <div className="absolute inset-0 bg-surface-ground -z-30 pointer-events-none" />



      {/* Soft fading overlay gradient to preserve text legibility (both themes) */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              var(--background) 0%,
              color-mix(in srgb, var(--background) 92%, transparent) 28%,
              transparent 60%
            ),
            linear-gradient(
              -90deg,
              var(--background) 0%,
              transparent 35%
            ),
            linear-gradient(
              to bottom,
              transparent 65%,
              var(--background) 100%
            )
          `
        }}
      />

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* ═══════════════════════════════════════════════════════════
              Typography Left Column
              ═══════════════════════════════════════════════════════════ */}
          <motion.div 
            className="lg:col-span-5 space-y-6 md:space-y-8 text-left z-20"
            style={{
              y: textY,
              opacity: textOpacity,
            }}
          >
            <HeroReveal delay={0.05} duration={0.5} offset={16}>
              <div className="text-sm tracking-[0.14em] uppercase font-bold text-brand">
                AI-POWERED PERFORMANCE INTELLIGENCE
              </div>
            </HeroReveal>

            <HeroReveal delay={0.15} duration={0.6} offset={24}>
              <h1 className="text-4xl sm:text-[clamp(3.5rem,5.5vw,6rem)] font-serif tracking-normal sm:tracking-[0.01em] leading-[1.08] text-foreground antialiased">
                <span className="font-semibold italic block">KNOW YOUR</span>
                <span className="font-semibold italic block">BODY.</span>
                <span className="text-brand font-extrabold block mt-2 tracking-normal">TRAIN</span>
                <span className="text-brand font-extrabold block tracking-normal">SMARTER.</span>
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.3} duration={0.5} offset={18}>
              <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed max-w-[540px] md:max-w-[600px] font-normal">
                Turn training and health data into personalized performance, recovery, fatigue and readiness insights so you can perform at your best, every day.
              </p>
            </HeroReveal>

            <HeroReveal delay={0.45} duration={0.5} offset={16}>
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                <button
                  onClick={() => openSignUp()}
                  className="w-full sm:w-auto bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-sm rounded-md px-6 py-3.5 transition-all duration-200 select-none cursor-pointer text-center flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                >
                  GET STARTED <span className="inline-block transform translate-y-[0.5px]">→</span>
                </button>
                <button 
                  onClick={() => scrollToSection(LANDING_NAV_TARGETS.howItWorks)}
                  className="w-full sm:w-auto text-foreground hover:text-brand font-bold text-sm transition-all duration-200 select-none cursor-pointer text-center bg-transparent border-none flex items-center justify-center gap-2 group hover:-translate-y-0.5"
                >
                  SEE HOW IT WORKS <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </HeroReveal>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════
              Composed Visual Right Column
              ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 relative h-[460px] sm:h-[520px] md:h-[620px] lg:h-[680px] flex items-center justify-center">
            
            {/* ─── LIGHT MODE: Scenic Runner (Layer 1) ─── */}
            <motion.div
              variants={prefersReduced ? {} : runnerEntranceVariants}
              initial="hidden"
              animate="visible"
              style={{ y: runnerScrollY }}
              className="absolute inset-0 z-[1] hero-light-only"
            >
              <motion.div
                style={{ x: runnerMouseX, y: runnerMouseY }}
                className="relative w-full h-full"
              >
                {/* Edge-blend mask: radial fade so image merges into ivory background */}
                <div
                  className="absolute inset-0"
                  style={{
                    maskImage: 'radial-gradient(ellipse 85% 80% at 55% 45%, black 40%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 55% 45%, black 40%, transparent 90%)',
                  }}
                >
                  <Image
                    src="/runner_light_mode.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                    className="object-contain object-center pointer-events-none select-none"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* ─── DARK MODE: Scenic Swimmer (Layer 1) ─── */}
            <motion.div
              variants={prefersReduced ? {} : runnerEntranceVariants}
              initial="hidden"
              animate="visible"
              style={{ y: runnerScrollY }}
              className="absolute inset-0 z-[1] hero-dark-only"
            >
              <motion.div
                style={{ x: runnerMouseX, y: runnerMouseY }}
                className="relative w-full h-full"
              >
                {/* Edge-blend mask: radial fade so image merges into obsidian background */}
                <div
                  className="absolute inset-0"
                  style={{
                    maskImage: 'radial-gradient(ellipse 85% 80% at 55% 45%, black 40%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 55% 45%, black 40%, transparent 90%)',
                  }}
                >
                  <Image
                    src="/swimmer_dark_mode.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                    className="object-contain object-center pointer-events-none select-none"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* ─── Dashboard Glass Card (Layer 2) ─── */}
            <motion.div
              variants={prefersReduced ? {} : dashboardEntranceVariants}
              initial="hidden"
              animate="visible"
              className="absolute right-[2%] sm:right-[3%] md:right-[4%] bottom-[5%] sm:bottom-[8%] z-[2] w-full max-w-[92vw] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[min(720px,58vw)] xl:max-w-[min(720px,64vw)] origin-bottom-right scale-[0.5]"
            >
              {/* Scroll Parallax and Scale wrapper */}
              <motion.div
                style={{ 
                  y: dashboardScrollY,
                  scale: dashboardScrollScale
                }}
              >
                {/* Mouse Parallax and Idle float wrapper */}
                <motion.div
                  style={{
                    x: dashboardMouseX,
                    y: dashboardMouseY
                  }}
                  animate={prefersReduced ? {} : {
                    y: [0, -4, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <HeroProductPreview />
                </motion.div>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
