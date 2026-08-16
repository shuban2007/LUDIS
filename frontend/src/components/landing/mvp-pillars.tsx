// Ludis Landing Components — Four MVP Pillars Component
// Implements staggered scroll-linked reveal motion mapped to target scroll progression.
// Incorporates premium hover elevations, number translation, icon offsets, and text highlight transitions.

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';

interface PillarItem {
  num: string;
  title: string;
  icon: React.ReactNode;
}

export function MvpPillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // local scroll progress target
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Title reveals early
  const titleY = useTransform(scrollYProgress, [0.05, 0.30], [prefersReduced ? 0 : 16, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.30], [0, 1.0]);

  // Mapped staggered variables for each of the 4 items
  const y1 = useTransform(scrollYProgress, [0.10, 0.40], [prefersReduced ? 0 : 20, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.10, 0.40], [0, 1.0]);

  const y2 = useTransform(scrollYProgress, [0.13, 0.43], [prefersReduced ? 0 : 20, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.13, 0.43], [0, 1.0]);

  const y3 = useTransform(scrollYProgress, [0.16, 0.46], [prefersReduced ? 0 : 20, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.16, 0.46], [0, 1.0]);

  const y4 = useTransform(scrollYProgress, [0.19, 0.49], [prefersReduced ? 0 : 20, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.19, 0.49], [0, 1.0]);

  const yTransforms = [y1, y2, y3, y4];
  const opacityTransforms = [opacity1, opacity2, opacity3, opacity4];

  // Motion variants for interactive micro-actions
  const pillarContainerVariants: Variants = {
    hover: {
      y: -2,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  const iconVariants: Variants = {
    hover: {
      y: -2.5,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  const numberVariants: Variants = {
    hover: {
      y: -2.5,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  const titleVariants: Variants = {
    hover: {
      color: 'var(--brand)',
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  const pillars: PillarItem[] = [
    {
      num: '1',
      title: 'Personalized Performance & Baseline Engine',
      icon: (
        <svg className="w-5 h-5 text-foreground-muted shrink-0 transition-colors duration-200 group-hover:text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      num: '2',
      title: 'Recovery + Fatigue Analysis',
      icon: (
        <svg className="w-5 h-5 text-foreground-muted shrink-0 transition-colors duration-200 group-hover:text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      num: '3',
      title: 'Coach Performance Dashboard',
      icon: (
        <svg className="w-5 h-5 text-foreground-muted shrink-0 transition-colors duration-200 group-hover:text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      num: '4',
      title: 'Explainable Recommendation Layer',
      icon: (
        <svg className="w-5 h-5 text-foreground-muted shrink-0 transition-colors duration-200 group-hover:text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      id="capabilities" 
      ref={containerRef}
      className="py-7 sm:py-9 md:py-10 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto border-t border-border-default select-none"
    >
      {/* Static scroll anchor wraps grid */}
      <div data-scroll-anchor="capabilities" className="w-full scroll-mt-16">
        {/* Centered Editorial Title */}
        <motion.div 
          style={{
            y: titleY,
            opacity: titleOpacity
          }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-base font-serif tracking-[0.25em] text-foreground uppercase">
            FOUR PILLARS OF PERFORMANCE INTELLIGENCE
          </h2>
        </motion.div>
 
        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 md:divide-x md:divide-border-default">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={pillar.num} 
              style={{
                y: yTransforms[idx],
                opacity: opacityTransforms[idx]
              }}
              className="px-0 md:px-6 lg:px-8 first:pl-0 last:pr-0"
            >
              <motion.div 
                whileHover={prefersReduced ? {} : 'hover'}
                variants={prefersReduced ? {} : pillarContainerVariants}
                className="flex flex-col gap-6 text-left group cursor-pointer p-4 rounded-lg hover:bg-surface-2 transition-colors duration-200"
              >
                {/* Row with Icon and Number */}
                <div className="flex items-center gap-4">
                  <motion.div variants={prefersReduced ? {} : iconVariants}>
                    {pillar.icon}
                  </motion.div>
                  <motion.span 
                    variants={prefersReduced ? {} : numberVariants}
                    className="text-3xl font-bold font-sans text-brand leading-none"
                  >
                    {pillar.num}
                  </motion.span>
                </div>
                {/* Title of the Pillar */}
                <motion.h3 
                  variants={prefersReduced ? {} : titleVariants}
                  className="text-lg font-semibold text-foreground-secondary leading-snug"
                >
                  {pillar.title}
                </motion.h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
