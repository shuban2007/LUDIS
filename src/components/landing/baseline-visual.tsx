// Ludis Landing Components — Personal Baseline Section Component
'use client';

import { ScrollReveal } from './scroll-reveal';

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
  // Chart geometry
  const W = 500;
  const H = 160;
  const padL = 30;
  const padR = 15;
  const padT = 15;
  const padB = 25;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

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
    <section id="baseline" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border-default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Typography & Narrative */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <ScrollReveal delay={0.05} duration={0.5} offset={20}>
            <h2 className="text-4xl sm:text-6xl font-serif tracking-tight leading-[1.1]">
              <span className="text-text-primary font-normal italic block">YOUR BASELINE.</span>
              <span className="text-brand-primary font-bold block mt-1">NOT THE AVERAGE.</span>
            </h2>
          </ScrollReveal>

          
          <ScrollReveal delay={0.15} duration={0.5} offset={20}>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-md">
              We learn what&apos;s normal for you, then detect meaningful changes that actually matter.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25} duration={0.5} offset={20}>
            <a 
              href="#capabilities" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors duration-150 group"
            >
              SEE HOW BASELINE WORKS 
              <span className="transform group-hover:translate-x-1 transition-transform duration-150">→</span>
            </a>
          </ScrollReveal>
        </div>

        {/* Right Column: Single Large Premium Visualizer */}
        <div className="lg:col-span-7">
          <ScrollReveal delay={0.2} duration={0.6} offset={20}>
            <div className="bg-[#050607] border border-white/10 rounded-lg p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] select-none">
              
              {/* Header Info */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] font-bold text-text-muted tracking-wider uppercase">
                    PERSONAL BASELINE
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-brand-primary mt-1 font-sans">
                    76 – 80
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-text-muted tracking-wider uppercase">
                    CURRENT
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mt-1 font-sans">
                    83
                  </div>
                  <span className="text-[10px] text-brand-primary font-semibold uppercase mt-0.5 block">
                    Above baseline
                  </span>
                </div>
              </div>

              {/* Custom SVG Line Chart */}
              <div className="relative w-full">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: '160px' }}>
                  {/* Baseline Band */}
                  <rect
                    x={padL}
                    y={bandTop}
                    width={chartW}
                    height={bandBottom - bandTop}
                    fill="rgba(0, 191, 166, 0.04)"
                  />
                  <line
                    x1={padL}
                    y1={bandTop}
                    x2={W - padR}
                    y2={bandTop}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <line
                    x1={padL}
                    y1={bandBottom}
                    x2={W - padR}
                    y2={bandBottom}
                    stroke="rgba(255, 255, 255, 0.08)"
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
                      stroke="rgba(255, 255, 255, 0.04)"
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
                      className="fill-text-muted text-[9px] font-sans"
                    >
                      {val}
                    </text>
                  ))}

                  {/* Trend Area Gradient */}
                  <polygon
                    points={`${linePoints} ${toX(baselineTrend.length - 1)},${toY(yMin)} ${toX(0)},${toY(yMin)}`}
                    fill="url(#baseline-gradient)"
                  />
                  <defs>
                    <linearGradient id="baseline-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(0, 191, 166, 0.08)" />
                      <stop offset="100%" stopColor="rgba(0, 191, 166, 0)" />
                    </linearGradient>
                  </defs>

                  {/* Trend line */}
                  <polyline
                    points={linePoints}
                    fill="none"
                    stroke="var(--brand-primary)"
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
                      fill={idx === baselineTrend.length - 1 ? 'var(--brand-primary)' : 'rgba(0, 191, 166, 0.3)'}
                    />
                  ))}

                  {/* Accent ring on current peak */}
                  <circle
                    cx={toX(baselineTrend.length - 1)}
                    cy={toY(baselineTrend[baselineTrend.length - 1].value)}
                    r="6"
                    fill="none"
                    stroke="var(--brand-primary)"
                    strokeWidth="0.75"
                    opacity="0.5"
                  />

                  {/* X Axis Labels */}
                  {xLabels.map((lbl) => (
                    <text
                      key={lbl.index}
                      x={toX(lbl.index)}
                      y={H - 5}
                      textAnchor="middle"
                      className="fill-text-muted text-[9px] font-sans"
                    >
                      {lbl.date}
                    </text>
                  ))}
                </svg>
              </div>

            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
