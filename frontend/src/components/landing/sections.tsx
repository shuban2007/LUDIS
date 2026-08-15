// Ludis Landing Components — Audience, Process, Competition, Responsible AI, CTA, Footer
// Dynamically styles all sections to align with global design system tokens.
// Integrates subtle cinematic scroll-linked motion for images, typography, and watermarks.
// Employs private React refs and callback triggers to center Athlete/Coach panels.
// Implements premium mouse tilt, pointer lights, hover micro-movements, and mobile touch targets.

'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { useRouter } from 'next/navigation';
import { LudisLogo } from '@/components/ui/ludis-logo';
import { ScrollReveal } from './scroll-reveal';
import { useAuth, loginAsDemo, useAuthModal } from '@/lib/auth';
import { scrollToSection, LANDING_NAV_TARGETS } from '@/lib/navigation/scroll-to-section';

/* ─────────────────────────────────────────────
   AudienceSection (Athlete / Coach Split)
   ───────────────────────────────────────────── */

interface AudienceSectionProps {
  athletePanelRef: React.RefObject<HTMLDivElement | null>;
  coachPanelRef: React.RefObject<HTMLDivElement | null>;
}

export function AudienceSection({ athletePanelRef, coachPanelRef }: AudienceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();
  const router = useRouter();
  const prefersReduced = useReducedMotion();

  // Loading and Error States for direct auth
  const [loadingRole, setLoadingRole] = useState<'athlete' | 'coach' | null>(null);
  const [athleteError, setAthleteError] = useState<string | null>(null);
  const [coachError, setCoachError] = useState<string | null>(null);

  // 1. Scroll-linked cinematic parallax constraints
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollYParallaxAthlete = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [-12, 12]);
  const scrollYParallaxCoach = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [-12, 12]);

  // 2. Mouse move interactive spring coordinates
  const mouseXAthlete = useMotionValue(0);
  const mouseYAthlete = useMotionValue(0);
  const mouseXCoach = useMotionValue(0);
  const mouseYCoach = useMotionValue(0);

  const springXAthlete = useSpring(mouseXAthlete, { stiffness: 150, damping: 25 });
  const springYAthlete = useSpring(mouseYAthlete, { stiffness: 150, damping: 25 });
  const springXCoach = useSpring(mouseXCoach, { stiffness: 150, damping: 25 });
  const springYCoach = useSpring(mouseYCoach, { stiffness: 150, damping: 25 });

  // Map springs to subtle card tilt (max 1.2 degrees) and image offset (max X: 8px, Y: 6px)
  const rotateXAthlete = useTransform(springYAthlete, [-100, 100], [1.2, -1.2]);
  const rotateYAthlete = useTransform(springXAthlete, [-100, 100], [-1.2, 1.2]);
  const imageXAthlete = useTransform(springXAthlete, [-100, 100], [-8, 8]);
  const imageYAthlete = useTransform(springYAthlete, [-100, 100], [-6, 6]);

  const rotateXCoach = useTransform(springYCoach, [-100, 100], [1.2, -1.2]);
  const rotateYCoach = useTransform(springXCoach, [-100, 100], [-1.2, 1.2]);
  const imageXCoach = useTransform(springXCoach, [-100, 100], [-8, 8]);
  const imageYCoach = useTransform(springYCoach, [-100, 100], [-6, 6]);

  // Mouse coordinate updates for Pointer Light Glow & Image Parallax
  const handleMouseMoveAthlete = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);

    mouseXAthlete.set((x / rect.width - 0.5) * 200);
    mouseYAthlete.set((y / rect.height - 0.5) * 200);
  };

  const handleMouseLeaveAthlete = () => {
    mouseXAthlete.set(0);
    mouseYAthlete.set(0);
  };

  const handleMouseMoveCoach = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);

    mouseXCoach.set((x / rect.width - 0.5) * 200);
    mouseYCoach.set((y / rect.height - 0.5) * 200);
  };

  const handleMouseLeaveCoach = () => {
    mouseXCoach.set(0);
    mouseYCoach.set(0);
  };

  // Cohesive entrance animations
  const cardEntranceAthlete: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.985 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    hover: {
      y: -4,
      scale: 1.005,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const cardEntranceCoach: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.985 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 } // 100ms stagger
    },
    hover: {
      y: -4,
      scale: 1.005,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const imageHover: Variants = {
    initial: { scale: 1.06 }, // Zoomed slightly to prevent edge reveal during mouse translation
    hover: { 
      scale: 1.10, // Subtly extra zoom on hover
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const labelHover: Variants = {
    initial: { y: 0 },
    hover: { y: -4, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  const headlineHover: Variants = {
    initial: { y: 0 },
    hover: { y: -5, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  const ctaHover: Variants = {
    initial: { y: 0 },
    hover: { y: -3, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  const arrowHover: Variants = {
    initial: { x: 0 },
    hover: { x: 4, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  // Direct login pathways
  const handleCardClick = async (role: 'athlete' | 'coach') => {
    if (loadingRole) return;
    
    // Tap delay for mobile scaling feedback
    await new Promise((resolve) => setTimeout(resolve, 150));

    try {
      setLoadingRole(role);
      setAthleteError(null);
      setCoachError(null);

      await loginAsDemo(role, login);
      
      // Navigate to the respective dashboard
      router.push(role === 'coach' ? '/coach' : '/athlete');
    } catch (err) {
      console.error(err);
      if (role === 'athlete') {
        setAthleteError('Unable to open demo account. Please try again.');
      } else {
        setCoachError('Unable to open demo account. Please try again.');
      }
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <section id="audience" className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto border-t border-border-default select-none">
      <div className="w-full scroll-mt-16">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Athlete Panel Container - Stable Reference */}
          <div 
            ref={athletePanelRef}
            data-landing-section="athletes"
            className="w-full relative h-[520px] sm:h-[640px] perspective-1000"
          >
            {/* Interactive Card Body */}
            <motion.div
              variants={prefersReduced ? {} : cardEntranceAthlete}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              whileHover={prefersReduced ? {} : 'hover'}
              whileTap={{ scale: 0.995 }}
              onMouseMove={handleMouseMoveAthlete}
              onMouseLeave={handleMouseLeaveAthlete}
              onClick={() => handleCardClick('athlete')}
              style={{
                rotateX: prefersReduced ? 0 : rotateXAthlete,
                rotateY: prefersReduced ? 0 : rotateYAthlete,
                transformStyle: 'preserve-3d',
                cursor: loadingRole ? 'not-allowed' : 'pointer',
              }}
              animate={prefersReduced ? {} : undefined}
              className="relative w-full h-full rounded-lg overflow-hidden flex flex-col justify-end p-8 sm:p-12 border border-border-default hover:border-border-strong transition-colors duration-350 group select-none shadow-card hover:shadow-elevated border-t-white/10 dark:border-t-white/10"
            >
              {/* Radial Pointer Light Glow */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 select-none"
                style={{
                  background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--radial-glow-color), transparent 40%)`
                }}
              />

              {/* Static crop box container to prevent card background bleed */}
              <div className="absolute inset-0 overflow-hidden -z-10 rounded-lg">
                {/* Parallax wrapper with safety bleed margin */}
                <motion.div 
                  className="absolute inset-[-24px]"
                  style={{ y: scrollYParallaxAthlete }}
                >
                  {/* Background Image with mouse parallax & hover zoom */}
                  <motion.div 
                    variants={imageHover}
                    initial="initial"
                    style={{ 
                      x: imageXAthlete, 
                      y: imageYAthlete,
                      backgroundImage: `url('/athlete_portrait.png')`
                    }}
                    className="absolute inset-0 bg-cover bg-center"
                  />
                </motion.div>
              </div>

              {/* Dark bottom gradient to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none -z-10" />

              {/* Content - remains light on dark overlay for maximum contrast */}
              <div className="relative z-10 space-y-4">
                <motion.span 
                  variants={labelHover}
                  initial="initial"
                  className="text-[10px] font-bold text-brand tracking-widest uppercase block"
                >
                  FOR ATHLETES
                </motion.span>
                <motion.h3 
                  variants={headlineHover}
                  initial="initial"
                  className="text-3xl sm:text-4xl font-serif text-[#F5F5F5] font-semibold leading-tight max-w-xs block"
                >
                  Your data.
                  <br />
                  Your baseline.
                  <br />
                  Your performance.
                </motion.h3>
                <motion.div 
                  variants={ctaHover}
                  initial="initial"
                  className="pt-2 min-h-[44px] flex items-center"
                >
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-brand group-hover:text-[#08C8AF] transition-colors duration-150">
                    {loadingRole === 'athlete' ? 'OPENING ATHLETE EXPERIENCE...' : 'VIEW ATHLETE EXPERIENCE'} 
                    <motion.span 
                      variants={arrowHover}
                      initial="initial"
                      className="inline-block transform"
                    >
                      →
                    </motion.span>
                  </span>
                </motion.div>

                {athleteError && (
                  <div className="text-xs text-danger font-semibold mt-2 animate-fadeIn bg-danger/10 border border-danger/20 rounded px-2.5 py-1 text-center">
                    {athleteError}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Coach Panel Container - Stable Reference */}
          <div 
            ref={coachPanelRef}
            data-landing-section="coaches"
            className="w-full relative h-[520px] sm:h-[640px] perspective-1000"
          >
            {/* Interactive Card Body */}
            <motion.div
              variants={prefersReduced ? {} : cardEntranceCoach}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              whileHover={prefersReduced ? {} : 'hover'}
              whileTap={{ scale: 0.995 }}
              onMouseMove={handleMouseMoveCoach}
              onMouseLeave={handleMouseLeaveCoach}
              onClick={() => handleCardClick('coach')}
              style={{
                rotateX: prefersReduced ? 0 : rotateXCoach,
                rotateY: prefersReduced ? 0 : rotateYCoach,
                transformStyle: 'preserve-3d',
                cursor: loadingRole ? 'not-allowed' : 'pointer',
              }}
              animate={prefersReduced ? {} : undefined}
              className="relative w-full h-full rounded-lg overflow-hidden flex flex-col justify-end p-8 sm:p-12 border border-border-default hover:border-border-strong transition-colors duration-350 group select-none shadow-card hover:shadow-elevated border-t-white/10 dark:border-t-white/10"
            >
              {/* Radial Pointer Light Glow */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 select-none"
                style={{
                  background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--radial-glow-color), transparent 40%)`
                }}
              />

              {/* Static crop box container to prevent card background bleed */}
              <div className="absolute inset-0 overflow-hidden -z-10 rounded-lg">
                {/* Parallax wrapper with safety bleed margin */}
                <motion.div 
                  className="absolute inset-[-24px]"
                  style={{ y: scrollYParallaxCoach }}
                >
                  {/* Background Image with mouse parallax & hover zoom */}
                  <motion.div 
                    variants={imageHover}
                    initial="initial"
                    style={{ 
                      x: imageXCoach, 
                      y: imageYCoach,
                      backgroundImage: `url('/coach_portrait.png')`
                    }}
                    className="absolute inset-0 bg-cover bg-center"
                  />
                </motion.div>
              </div>

              {/* Dark bottom gradient to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none -z-10" />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                <motion.span 
                  variants={labelHover}
                  initial="initial"
                  className="text-[10px] font-bold text-brand tracking-widest uppercase block"
                >
                  FOR COACHES
                </motion.span>
                <motion.h3 
                  variants={headlineHover}
                  initial="initial"
                  className="text-3xl sm:text-4xl font-serif text-[#F5F5F5] font-semibold leading-tight max-w-xs block"
                >
                  See the full picture.
                  <br />
                  Protect your team.
                </motion.h3>
                <motion.div 
                  variants={ctaHover}
                  initial="initial"
                  className="pt-2 min-h-[44px] flex items-center"
                >
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-brand group-hover:text-[#08C8AF] transition-colors duration-150">
                    {loadingRole === 'coach' ? 'OPENING COACH DASHBOARD...' : 'VIEW COACH DASHBOARD'} 
                    <motion.span 
                      variants={arrowHover}
                      initial="initial"
                      className="inline-block transform"
                    >
                      →
                    </motion.span>
                  </span>
                </motion.div>

                {coachError && (
                  <div className="text-xs text-danger font-semibold mt-2 animate-fadeIn bg-danger/10 border border-danger/20 rounded px-2.5 py-1 text-center">
                    {coachError}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ResponsibleAI (Trust Statement)
   ───────────────────────────────────────────── */

export function ResponsibleAI() {
  return (
    <section id="responsible-ai" className="py-10 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto border-t border-border-default text-center select-none">
      {/* Static scroll anchor for orientation observations */}
      <div data-scroll-anchor="responsible-ai" className="w-full scroll-mt-16 max-w-5xl mx-auto">
        <ScrollReveal duration={0.5} offset={20}>
          <div className="space-y-8">
            <h2 className="text-base font-serif tracking-[0.25em] text-foreground uppercase">
              DECISION SUPPORT. NOT MEDICAL DIAGNOSIS.
            </h2>
            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed max-w-3xl mx-auto font-normal">
              Ludis is decision-support software. It does not provide medical diagnoses or replace clinical or coaching expertise.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold text-foreground-muted tracking-wider uppercase pt-4">
              <span>EXPLAINABLE</span>
              <span className="text-border-subtle">•</span>
              <span>DATA QUALITY AWARE</span>
              <span className="text-border-subtle">•</span>
              <span>ATHLETE CONTROLLED</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FinalCTA
   ───────────────────────────────────────────── */

export function FinalCTA() {
  const { openSignUp } = useAuthModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const prefersReduced = useReducedMotion();

  // Watermark opacity matches the motion budget
  const watermarkOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0.02, 0.06]);
  const headlineY = useTransform(scrollYProgress, [0.15, 0.45], [prefersReduced ? 0 : 20, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0.6, 1.0]);

  return (
    <section ref={containerRef} className="py-16 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto border-t border-border-default text-center relative overflow-hidden select-none">
      
      {/* Background large Gothic L Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 select-none">
        <motion.div 
          className="scale-[4]"
          style={{ opacity: watermarkOpacity }}
        >
          <LudisLogo variant="icon-only" size="xl" noBadge themeStyle="inverted" />
        </motion.div>
      </div>

      <motion.div 
        className="max-w-3xl mx-auto space-y-8"
        style={{
          y: headlineY,
          opacity: headlineOpacity
        }}
      >
        <h2 className="text-5xl sm:text-7xl font-serif tracking-tight text-foreground">
          TRAIN WITH CLARITY.
        </h2>
        <p className="text-lg sm:text-xl text-foreground-secondary max-w-xl mx-auto leading-relaxed">
          Know what changed. Understand why it matters. Decide what to do next.
        </p>
        <div className="pt-6">
          <motion.button
            whileHover={prefersReduced ? {} : { scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => openSignUp()}
            className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-sm rounded-md px-8 py-3.5 transition-colors duration-150 select-none cursor-pointer text-center animate-none"
          >
            GET STARTED — FREE
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   LandingFooter
   ───────────────────────────────────────────── */

interface LandingFooterProps {
  onNavigateAthletes: () => void;
  onNavigateCoaches: () => void;
}

export function LandingFooter({ onNavigateAthletes, onNavigateCoaches }: LandingFooterProps) {
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto border-t border-border-default text-xs text-foreground-muted select-none">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left column */}
        <div className="space-y-3">
          <LudisLogo linkToHome variant="footer" size="sm" themeStyle="inverted" noBadge showSubtitle={false} />
          <p className="text-[11px] text-foreground-muted">
            Performance intelligence built around you.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-foreground-secondary">
          <button
            onClick={() => scrollToSection(LANDING_NAV_TARGETS.howItWorks)}
            className="hover:text-brand transition-colors duration-150 cursor-pointer focus:outline-none text-[11px] font-medium bg-transparent border-none"
          >
            How it works
          </button>
          <button
            onClick={onNavigateAthletes}
            className="hover:text-brand transition-colors duration-150 cursor-pointer focus:outline-none text-[11px] font-medium bg-transparent border-none"
          >
            Athletes
          </button>
          <button
            onClick={onNavigateCoaches}
            className="hover:text-brand transition-colors duration-150 cursor-pointer focus:outline-none text-[11px] font-medium bg-transparent border-none"
          >
            Coaches
          </button>
          <button
            onClick={() => scrollToSection('responsible-ai')}
            className="hover:text-brand transition-colors duration-150 cursor-pointer focus:outline-none text-[11px] font-medium bg-transparent border-none"
          >
            Responsible AI
          </button>
        </div>

        {/* Right copyright */}
        <div className="text-left md:text-right">
          <span>© 2026 Ludis. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}

export function HowLudisThinks() {
  return null;
}

export function CompetitionContext() {
  return null;
}
