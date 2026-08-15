// Ludis Landing Components — Personal Baseline Section Component
// Dynamic theme-aware SVG line chart with immersive scroll-linked reveals and clip-mask rendering.
// Employs visual content anchors to resolve header offset alignment correctly.

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './scroll-reveal';
import { scrollToSection } from '@/lib/navigation/scroll-to-section';

interface TrendPoint {
  date: string;
  value: number;
}

const baselineTrend: TrendPoint[] = [
  { date: 'Jul 24', value: 72 },
  { date: 'Jul 26', value: 75 },
  { date: 'Jul 28', value: 78 },
  { date: 'Jul 30', value: 73 },
  { date: 'Aug 1',  value: 70 },
  { date: 'Aug 3',  value: 74 },
  { date: 'Aug 5',  value: 76 },
  { date: 'Aug 7',  value: 73 },
  { date: 'Aug 9',  value: 79 },
  { date: 'Aug 11', value: 81 },
  { date: 'Aug 13', value: 83 },
];

export function BaselineVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Local scroll target tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Section card container animations (motion budget limits)
  const cardY = useTransform(scrollYProgress, [0.05, 0.35], [prefersReduced ? 0 : 20, 0]);
  const cardScale = useTransform(scrollYProgress, [0.05, 0.35], [prefersReduced ? 1.0 : 0.985, 1.0]);
  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0.7, 1.0]);

  // Chart geometry
  const W = 600;
  const H = 180;
  const padL = 32;
  const padR = 16;
  const padT = 16;
  const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  // Chart line clip reveal (complete at scroll progress 0.35)
  const clipWidth = useTransform(scrollYProgress, [0.15, 0.35], [0, W]);
  const activeClipWidth = prefersReduced ? W : clipWidth;

  // Y range: 60 to 90
  const yMin = 60;
  const yMax = 90;
  const yRange = yMax - yMin;

  const toX = (i: number) => padL + (i / (baselineTrend.length - 1)) * chartW;
  const toY = (v: number) => padT + (1 - (v - yMin) / yRange) * chartH;

  const linePoints = baselineTrend.map((pt, i) => `${toX(i)},${toY(pt.value)}`).join(' ');

  const bandTop = toY(80);
  const bandBottom = toY(76);

  // Filter X axis labels to show only specific dates
  const xLabels = [
    { index: 0, date: 'Jul 24' },
    { index: 2, date: 'Jul 28' },
    { index: 4, date: 'Aug 1' },
    { index: 6, date: 'Aug 5' },
    { index: 8, date: 'Aug 9' },
    { index: 10, date: 'Aug 13' },
  ];

  return (
    <section 
      id="baseline" 
      ref={containerRef}
      className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto border-t border-border-default select-none"
    >
      {/* Visual content anchor wraps the actual grid visual container */}
      <div data-scroll-anchor="baseline" className="w-full scroll-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Typography & Narrative */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <ScrollReveal delay={0.05} duration={0.5} offset={20}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1]">
                <span className="text-foreground font-normal italic block">YOUR BASELINE.</span>
                <span className="text-brand font-bold block mt-1">NOT THE AVERAGE.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15} duration={0.5} offset={20}>
              <p className="text-lg sm:text-xl text-foreground-secondary leading-relaxed max-w-xl">
                We learn what&apos;s normal for you, then detect meaningful changes that actually matter.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25} duration={0.5} offset={20}>
              <button
                onClick={() => scrollToSection('capabilities')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover transition-colors duration-150 group bg-transparent border-none cursor-pointer focus:outline-none"
              >
                SEE HOW BASELINE WORKS 
                <span className="transform group-hover:translate-x-1 transition-transform duration-150">→</span>
              </button>
            </ScrollReveal>
          </div>

          {/* Right Column: Single Large Premium Visualizer */}
          <div className="lg:col-span-7">
            <motion.div
              style={{
                y: cardY,
                scale: cardScale,
                opacity: cardOpacity,
              }}
              className="bg-surface-1 border border-border-default rounded-lg p-6 sm:p-8 shadow-card"
            >
              
              {/* Header Info */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] font-bold text-foreground-muted tracking-wider uppercase">
                    PERSONAL BASELINE
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-brand mt-1 font-sans">
                    76 – 80
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-foreground-muted tracking-wider uppercase">
                    CURRENT
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mt-1 font-sans">
                    83
                  </div>
                  <span className="text-[10px] text-brand font-semibold uppercase mt-0.5 block">
                    Above baseline
                  </span>
                </div>
              </div>

              {/* Custom SVG Line Chart */}
              <div className="relative w-full">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: '180px' }}>
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
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <line
                    x1={padL}
                    y1={bandBottom}
                    x2={W - padR}
                    y2={bandBottom}
                    stroke="var(--border-default)"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />

                  {/* Horizontal Grid lines */}
                  {[60, 70, 90].map((val) => (
                    <line
                      key={val}
                      x1={padL}
                      y1={toY(val)}
                      x2={W - padR}
                      y2={toY(val)}
                      stroke="var(--border-subtle)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y Axis Labels */}
                  {[60, 70, 80, 90].map((val) => (
                    <text
                      key={val}
                      x={padL - 8}
                      y={toY(val) + 3}
                      textAnchor="end"
                      className="fill-foreground-secondary text-[9px] font-sans"
                    >
                      {val}
                    </text>
                  ))}

                  {/* Scroll progress clip-mask SVG Reveal */}
                  <g clipPath="url(#baseline-chart-clip)">
                    {/* Trend Area Gradient */}
                    <polygon
                      points={`${linePoints} ${toX(baselineTrend.length - 1)},${toY(yMin)} ${toX(0)},${toY(yMin)}`}
                      fill="url(#baseline-visual-gradient)"
                    />

                    {/* Trend line */}
                    <polyline
                      points={linePoints}
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Minor dots */}
                    {baselineTrend.map((pt, idx) => (
                      <circle
                        key={idx}
                        cx={toX(idx)}
                        cy={toY(pt.value)}
                        r={idx === baselineTrend.length - 1 ? 3 : 1.5}
                        fill="var(--brand)"
                        opacity={idx === baselineTrend.length - 1 ? 1 : 0.3}
                      />
                    ))}

                    {/* Accent ring on current peak */}
                    <circle
                      cx={toX(baselineTrend.length - 1)}
                      cy={toY(baselineTrend[baselineTrend.length - 1].value)}
                      r="6"
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth="0.75"
                      opacity="0.5"
                    />
                  </g>

                  <defs>
                    <linearGradient id="baseline-visual-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                    </linearGradient>
                    
                    {/* SVG clipPath controlled dynamically by scroll progress */}
                    <clipPath id="baseline-chart-clip">
                      <motion.rect
                        x="0"
                        y="0"
                        width={activeClipWidth}
                        height={H}
                      />
                    </clipPath>
                  </defs>

                  {/* X Axis Labels */}
                  {xLabels.map((lbl) => (
                    <text
                      key={lbl.index}
                      x={toX(lbl.index)}
                      y={H - 5}
                      textAnchor="middle"
                      className="fill-foreground-secondary text-[9px] font-sans"
                    >
                      {lbl.date}
                    </text>
                  ))}
                </svg>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
