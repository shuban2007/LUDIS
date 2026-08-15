// Ludis Landing — Simplified Hero Product Preview
// Represents a realistic premium sports-telemetry dashboard card.
// Adapts dynamically to light and dark themes using semantic design tokens.

'use client';

import { heroPreviewData } from './hero-preview-data';

export function HeroProductPreview() {
  const { readiness, recovery, fatigue, session, recommendation, performance } = heroPreviewData;
  const { trend, baseline, current } = performance;

  // Chart geometry for internal SVG
  const W = 240;
  const H = 75;
  const padL = 10;
  const padR = 10;
  const padT = 5;
  const padB = 20;
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

  return (
    <div className="w-full max-w-lg mx-auto bg-surface-1 border border-border-default rounded-lg shadow-card overflow-hidden text-left font-sans select-none">
      
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-subtle">
        <span className="text-[10px] font-bold tracking-wider text-foreground uppercase">
          Performance Overview
        </span>
        <div className="flex items-center gap-1.5 text-[10px] text-foreground-muted">
          <span>Today · Thu, Aug 13</span>
          {/* Calendar Icon */}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* ── TOP SECTION (READINESS & PERFORMANCE GRID) ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 border-b border-border-subtle">
        
        {/* Column 1: Readiness */}
        <div className="md:col-span-2 p-5 border-b md:border-b-0 md:border-r border-border-subtle flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-bold text-foreground-muted tracking-wider uppercase">
              Readiness
            </span>
            <div className="text-6xl font-bold text-brand leading-none mt-2 font-sans tracking-tight">
              {readiness.score}
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs font-semibold text-brand block">
              {readiness.status}
            </span>
            <span className="text-[10px] text-foreground-muted mt-0.5 block">
              Above your recent baseline
            </span>
          </div>
        </div>

        {/* Column 2: Performance & Chart */}
        <div className="md:col-span-3 p-5 flex flex-col justify-between">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[9px] font-bold text-foreground-muted tracking-wider uppercase">
                Performance
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-foreground tracking-tight">
                  {current}
                </span>
                <span className="text-[10px] text-foreground-muted">
                  Personal baseline {baseline.min}–{baseline.max}
                </span>
              </div>
            </div>
          </div>

          {/* Restrained SVG Chart */}
          <div className="mt-4">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: '75px' }}>
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
                strokeWidth="1"
              />
              <line
                x1={padL}
                y1={bandBottom}
                x2={W - padR}
                y2={bandBottom}
                stroke="var(--border-default)"
                strokeDasharray="2 2"
                strokeWidth="1"
              />

              {/* Grid line under baseline */}
              <line
                x1={padL}
                y1={toY(70)}
                x2={W - padR}
                y2={toY(70)}
                stroke="var(--border-subtle)"
                strokeWidth="1"
              />

              {/* Trend Area Gradient */}
              <polygon
                points={`${points} ${toX(trend.length - 1)},${toY(yMin)} ${toX(0)},${toY(yMin)}`}
                fill="url(#hero-trend-gradient)"
              />
              <defs>
                <linearGradient id="hero-trend-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Trend Polyline */}
              <polyline
                points={points}
                fill="none"
                stroke="var(--brand)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Small dots on points */}
              {trend.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={toX(idx)}
                  cy={toY(pt.value)}
                  r={idx === trend.length - 1 ? 3 : 1.5}
                  fill="var(--brand)"
                  opacity={idx === trend.length - 1 ? 1 : 0.4}
                />
              ))}

              {/* Outer halo ring around current peak point */}
              <circle
                cx={toX(trend.length - 1)}
                cy={toY(trend[trend.length - 1].value)}
                r="6"
                fill="none"
                stroke="var(--brand)"
                strokeWidth="0.75"
                opacity="0.5"
              />

              {/* X Axis Labels */}
              {xLabels.map((lbl) => (
                <text
                  key={lbl.index}
                  x={toX(lbl.index)}
                  y={H - 4}
                  textAnchor="middle"
                  className="fill-foreground-secondary text-[8px] font-sans"
                >
                  {lbl.label}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* ── MIDDLE SUPPORTING METRICS ── */}
      <div className="grid grid-cols-3 border-b border-border-subtle text-left">
        
        {/* Recovery */}
        <div className="p-4 border-r border-border-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-foreground-muted">
            <span className="text-[9px] font-bold tracking-wider uppercase">Recovery</span>
            {/* Heart Icon */}
            <svg className="w-3 h-3 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-bold text-foreground tracking-tight">
              {recovery.score}
            </div>
            <span className="text-[10px] font-semibold text-brand mt-0.5 block">
              Good
            </span>
          </div>
        </div>

        {/* Fatigue */}
        <div className="p-4 border-r border-border-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-foreground-muted">
            <span className="text-[9px] font-bold tracking-wider uppercase">Fatigue</span>
            {/* Wave / Sine Icon */}
            <svg className="w-3.5 h-3.5 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-bold text-foreground tracking-tight">
              {fatigue.level}
            </div>
            <span className="text-[10px] text-brand mt-0.5 block">
              {fatigue.trend}
            </span>
          </div>
        </div>

        {/* Today's Session */}
        <div className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-foreground-muted">
            <span className="text-[9px] font-bold tracking-wider uppercase">Today&apos;s Session</span>
            {/* Calendar Event Icon */}
            <svg className="w-3 h-3 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="mt-2.5">
            <div className="text-xs font-semibold text-foreground truncate leading-tight">
              {session.name}
            </div>
            <span className="text-[10px] text-foreground-muted mt-1 block">
              {session.time}
            </span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM RECOMMENDATION BANNER ── */}
      <div className="p-4 bg-surface-2 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[9px] font-bold text-brand tracking-wider uppercase">
            Recommended Today
          </div>
          <div className="text-xs font-semibold text-foreground leading-snug">
            {recommendation.primary}
            <br />
            {recommendation.secondary}
          </div>
        </div>
        {/* Right arrow link mark */}
        <div className="text-foreground-muted hover:text-brand transition-colors duration-150 cursor-pointer p-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
