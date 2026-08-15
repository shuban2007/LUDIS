// Ludis Landing — Premium Hero Product Preview Card (Redesigned HUD)
// Represents a highly readable, minimalist sports-performance HUD card.
// Visually prioritizes: Readiness (82), Performance (83, baseline 76-80), and the Weekly Trend graph.
// Incorporates Framer Motion animations for initial load, path drawing, and scroll-linked depth.
// Automatically adjusts to light/dark themes using semantic tokens.

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { heroPreviewData } from './hero-preview-data';

export function HeroProductPreview() {
  const { readiness, performance } = heroPreviewData;
  const { trend, baseline, current } = performance;

  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // 1. Scroll-linked parallax (settles backward / rises slightly relative to scroll)
  const { scrollY } = useScroll();
  const cardScrollY = useTransform(scrollY, [0, 600], [0, -16]);

  // 2. Mouse move interactive tilt values (max 1 degree)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(springY, [-100, 100], [1.0, -1.0]);
  const rotateY = useTransform(springX, [-100, 100], [-1.0, 1.0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = (x / rect.width - 0.5) * 200;
    const relY = (y / rect.height - 0.5) * 200;
    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Chart geometry for internal SVG (fully responsive)
  const W = 320;
  const H = 90;
  const padL = 12;
  const padR = 12;
  const padT = 8;
  const padB = 22;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const yMin = 65;
  const yMax = 90;
  const yRange = yMax - yMin;

  const toX = (i: number) => padL + (i / (trend.length - 1)) * chartW;
  const toY = (v: number) => padT + (1 - (v - yMin) / yRange) * chartH;

  // Polyline points
  const points = trend.map((p, i) => `${toX(i)},${toY(p.value)}`).join(' ');

  // Baseline band coordinates
  const bandTop = toY(baseline.max);
  const bandBottom = toY(baseline.min);

  // X labels
  const xLabels = [
    { index: 0, label: 'Aug 4' },
    { index: 2, label: 'Aug 6' },
    { index: 4, label: 'Aug 8' },
    { index: 6, label: 'Aug 10' },
    { index: 9, label: 'Aug 13' },
  ];

  // SVG Line Animations
  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.4, ease: 'easeOut' }
    }
  };

  const endpointVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 1.3, duration: 0.3, ease: 'easeOut' }
    }
  };

  const haloVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.5,
      transition: { delay: 1.3, duration: 0.4, ease: 'easeOut' }
    }
  };

  const activePathVariants: Variants = prefersReduced ? {
    hidden: { pathLength: 1, opacity: 1 },
    visible: { pathLength: 1, opacity: 1 }
  } : pathVariants;

  const activeEndpointVariants: Variants = prefersReduced ? {
    hidden: { scale: 1, opacity: 1 },
    visible: { scale: 1, opacity: 1 }
  } : endpointVariants;

  const activeHaloVariants: Variants = prefersReduced ? {
    hidden: { scale: 1, opacity: 0.5 },
    visible: { scale: 1, opacity: 0.5 }
  } : haloVariants;

  return (
    <div 
      className="perspective-1000 w-full mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        ref={cardRef}
        style={{
          y: prefersReduced ? 0 : cardScrollY,
          rotateX: prefersReduced ? 0 : rotateX,
          rotateY: prefersReduced ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={prefersReduced ? {} : {
          y: -3,
          scale: 1.005,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full hero-glass-card text-left font-sans select-none p-8 sm:p-10 border border-border-subtle"
      >
        {/* Top Section: Metrics Grid */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          
          {/* Readiness Block */}
          <div className="flex flex-col">
            <span className="text-[12px] sm:text-[14px] font-bold text-foreground-muted tracking-widest uppercase">
              Readiness
            </span>
            <div className="text-6xl sm:text-[72px] lg:text-[80px] font-bold text-brand leading-none mt-2 font-sans tracking-tight">
              {readiness.score}
            </div>
            <span className="text-[16px] sm:text-[18px] font-semibold text-brand mt-2 block">
              {readiness.status}
            </span>
            <span className="text-[12px] sm:text-[14px] text-foreground-muted mt-1 block">
              Above your recent baseline
            </span>
          </div>

          {/* Performance Block */}
          <div className="flex flex-col">
            <span className="text-[12px] sm:text-[14px] font-bold text-foreground-muted tracking-widest uppercase">
              Performance
            </span>
            <div className="flex items-baseline gap-3 mt-2 font-sans tracking-tight">
              <span className="text-6xl sm:text-[72px] lg:text-[80px] font-bold text-foreground leading-none">
                {current}
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-brand leading-none px-2.5 py-1 rounded bg-brand-soft shrink-0">
                ↑ +12%
              </span>
            </div>
            <span className="text-[16px] sm:text-[18px] font-semibold text-foreground-secondary mt-2 block">
              Improving ↗
            </span>
            <span className="text-[12px] sm:text-[14px] text-foreground-muted mt-1 block">
              Baseline {baseline.min}–{baseline.max}
            </span>
          </div>

        </div>

        {/* Bottom Section: Trend Graph */}
        <div className="relative w-full pt-6 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] sm:text-[14px] font-bold text-foreground-muted tracking-widest uppercase">
              Weekly Trend
            </span>
            <span className="text-[12px] sm:text-[13px] font-semibold text-brand uppercase tracking-wider">
              Stable Progress
            </span>
          </div>
          
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: '90px' }}>
            {/* Baseline Band */}
            <rect
              x={padL}
              y={bandTop}
              width={chartW}
              height={bandBottom - bandTop}
              fill="var(--brand-soft)"
            />
            <line
              x1={padL}
              y1={bandTop}
              x2={W - padR}
              y2={bandTop}
              stroke="var(--border-default)"
              strokeDasharray="2 2"
              strokeWidth="0.75"
            />
            <line
              x1={padL}
              y1={bandBottom}
              x2={W - padR}
              y2={bandBottom}
              stroke="var(--border-default)"
              strokeDasharray="2 2"
              strokeWidth="0.75"
            />

            {/* Trend Area Gradient */}
            <polygon
              points={`${points} ${toX(trend.length - 1)},${toY(yMin)} ${toX(0)},${toY(yMin)}`}
              fill="url(#hero-trend-gradient)"
            />
            <defs>
              <linearGradient id="hero-trend-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Trend Polyline */}
            <motion.polyline
              points={points}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={activePathVariants}
              initial="hidden"
              animate="visible"
            />

            {/* Small dots on points */}
            {trend.slice(0, -1).map((pt, idx) => (
              <circle
                key={idx}
                cx={toX(idx)}
                cy={toY(pt.value)}
                r="1.5"
                fill="var(--brand)"
                opacity="0.35"
              />
            ))}

            {/* Final point highlighted with a scale ring */}
            <motion.circle
              cx={toX(trend.length - 1)}
              cy={toY(trend[trend.length - 1].value)}
              r="3.5"
              fill="var(--brand)"
              variants={activeEndpointVariants}
              initial="hidden"
              animate="visible"
            />

            {/* Outer halo ring around current peak point */}
            <motion.circle
              cx={toX(trend.length - 1)}
              cy={toY(trend[trend.length - 1].value)}
              r="7.5"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1.0"
              variants={activeHaloVariants}
              initial="hidden"
              animate="visible"
            />

            {/* X Axis Labels */}
            {xLabels.map((lbl) => (
              <text
                key={lbl.index}
                x={toX(lbl.index)}
                y={H - 2}
                textAnchor="middle"
                className="fill-foreground-secondary text-[12px] sm:text-[13px] font-sans font-medium"
              >
                {lbl.label}
              </text>
            ))}
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
