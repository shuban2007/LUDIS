// Ludis Landing — Reusable scroll-reveal motion primitives
// Uses motion/react with IntersectionObserver viewport detection.
// All animations trigger once, use transform/opacity only, and
// respect prefers-reduced-motion.

'use client';

import {
  motion,
  type Variants,
  useReducedMotion,
} from 'motion/react';
import type { ReactNode, CSSProperties } from 'react';

/* ─────────────────────────────────────────────
   Shared easing + variants
   ───────────────────────────────────────────── */

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1 },
};

/* ─────────────────────────────────────────────
   ScrollReveal
   Fades + slides content upward when entering viewport.
   ───────────────────────────────────────────── */

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Vertical offset in px (default 20) */
  offset?: number;
  /** Duration in seconds (default 0.5) */
  duration?: number;
  /** Delay in seconds (default 0) */
  delay?: number;
  /** Use scale instead of translate (default false) */
  scale?: boolean;
  /** Use fade-only (no translate) */
  fadeOnly?: boolean;
  /** Viewport trigger amount 0–1 (default 0.15) */
  viewport?: number;
}

export function ScrollReveal({
  children,
  className,
  style,
  offset = 20,
  duration = 0.5,
  delay = 0,
  scale: useScale = false,
  fadeOnly = false,
  viewport = 0.15,
}: ScrollRevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const variants: Variants = useScale
    ? scaleIn
    : fadeOnly
      ? fadeIn
      : {
          hidden: { opacity: 0, y: offset },
          visible: { opacity: 1, y: 0 },
        };

  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewport }}
      transition={{ duration, delay, ease: [...ease] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   StaggerContainer + StaggerItem
   Staggers children when the container enters viewport.
   ───────────────────────────────────────────── */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Stagger delay between children in seconds (default 0.08) */
  stagger?: number;
  /** Initial delay before first child (default 0) */
  delay?: number;
  /** Viewport trigger amount (default 0.1) */
  viewport?: number;
}

export function StaggerContainer({
  children,
  className,
  style,
  stagger = 0.08,
  delay = 0,
  viewport = 0.1,
}: StaggerContainerProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewport }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Duration in seconds (default 0.45) */
  duration?: number;
  /** Vertical offset in px (default 16) */
  offset?: number;
}

export function StaggerItem({
  children,
  className,
  style,
  duration = 0.45,
  offset = 16,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: offset },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration, ease: [...ease] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   HeroReveal
   Stronger entrance for hero elements with stagger.
   ───────────────────────────────────────────── */

interface HeroRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Delay in seconds (default 0) */
  delay?: number;
  /** Duration in seconds (default 0.6) */
  duration?: number;
  /** Vertical offset in px (default 24) */
  offset?: number;
}

export function HeroReveal({
  children,
  className,
  style,
  delay = 0,
  duration = 0.6,
  offset = 24,
}: HeroRevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: offset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [...ease] }}
    >
      {children}
    </motion.div>
  );
}

export { fadeUp, fadeIn, scaleIn };
