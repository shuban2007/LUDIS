// Ludis Landing — Hero Product Preview
// A realistic Ludis application surface showing one coherent athlete state.
// Hierarchy: Readiness (primary) → Performance+Baseline (secondary) →
// Recovery/Fatigue (supporting) → Session (context) → Signals → Recommendation

'use client';

import { heroPreviewData } from './hero-preview-data';

/* ─────────────────────────────────────────────
   SVG Performance Trend Chart
   10-day trend with baseline band
   ───────────────────────────────────────────── */

function PerformanceTrend() {
  const { performance } = heroPreviewData;
  const { trend, baseline, current } = performance;

  // Chart geometry
  const W = 380;
  const H = 130;
  const padL = 30;
  const padR = 12;
  const padT = 16;
  const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  // Data range — fixed to 70..90 for stable visual
  const yMin = 70;
  const yMax = 90;
  const yRange = yMax - yMin;

  const toX = (i: number) => padL + (i / (trend.length - 1)) * chartW;
  const toY = (v: number) => padT + (1 - (v - yMin) / yRange) * chartH;

  // Build polyline points
  const linePoints = trend.map((p, i) => `${toX(i)},${toY(p.value)}`).join(' ');

  // Baseline band Y coordinates
  const bandTop = toY(baseline.max);
  const bandBottom = toY(baseline.min);

  // Grid lines at 75, 80, 85
  const gridValues = [75, 80, 85];

  // Only show a few x-axis labels to avoid clutter
  const xLabelIndices = [0, 3, 6, 9];

  return (
    <div className="hero-preview-chart mt-4">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs font-semibold text-text-primary">
          Performance trend
        </span>
        <div className="flex items-center gap-3 text-[10px] text-text-muted">
          <span className="flex items-center gap-1">
            <span
              className="inline-block w-5 h-2 rounded-sm"
              style={{ background: 'rgba(0,200,150,0.15)' }}
            />
            Baseline {baseline.min}–{baseline.max}
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-[2px] rounded-full bg-brand-primary" />
            Current {current}
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 'auto', maxHeight: '130px' }}
        role="img"
        aria-label={`Performance trend over 10 days. Current value ${current}, personal baseline ${baseline.min} to ${baseline.max}.`}
      >
        {/* Subtle horizontal grid */}
        {gridValues.map((v) => (
          <line
            key={v}
            x1={padL}
            y1={toY(v)}
            x2={W - padR}
            y2={toY(v)}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="2 4"
          />
        ))}

        {/* Y-axis labels */}
        {gridValues.map((v) => (
          <text
            key={`y-${v}`}
            x={padL - 6}
            y={toY(v) + 3}
            textAnchor="end"
            className="fill-text-muted"
            style={{ fontSize: '9px' }}
          >
            {v}
          </text>
        ))}

        {/* X-axis date labels */}
        {xLabelIndices.map((i) => (
          <text
            key={`x-${i}`}
            x={toX(i)}
            y={H - 6}
            textAnchor="middle"
            className="fill-text-muted"
            style={{ fontSize: '9px' }}
          >
            {trend[i].date.replace('Aug ', '8/')}
          </text>
        ))}

        {/* Baseline band */}
        <rect
          x={padL}
          y={bandTop}
          width={chartW}
          height={bandBottom - bandTop}
          fill="rgba(0,200,150,0.08)"
          rx="2"
        />
        {/* Baseline band edges */}
        <line
          x1={padL}
          y1={bandTop}
          x2={W - padR}
          y2={bandTop}
          stroke="rgba(0,200,150,0.15)"
          strokeDasharray="3 3"
        />
        <line
          x1={padL}
          y1={bandBottom}
          x2={W - padR}
          y2={bandBottom}
          stroke="rgba(0,200,150,0.15)"
          strokeDasharray="3 3"
        />

        {/* Area fill under the line */}
        <polygon
          points={`${linePoints} ${toX(trend.length - 1)},${padT + chartH} ${toX(0)},${padT + chartH}`}
          fill="url(#hero-trend-fill)"
          className="hero-preview-chart-area"
        />
        <defs>
          <linearGradient id="hero-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,200,150,0.18)" />
            <stop offset="100%" stopColor="rgba(0,200,150,0)" />
          </linearGradient>
        </defs>

        {/* Trend line */}
        <polyline
          points={linePoints}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hero-preview-chart-line"
        />

        {/* Data points — subtle dots */}
        {trend.map((p, i) => (
          <circle
            key={i}
            cx={toX(i)}
            cy={toY(p.value)}
            r={i === trend.length - 1 ? 3.5 : 1.5}
            fill={i === trend.length - 1 ? 'var(--brand-primary)' : 'rgba(0,200,150,0.5)'}
          />
        ))}

        {/* Current value pulse ring */}
        <circle
          cx={toX(trend.length - 1)}
          cy={toY(trend[trend.length - 1].value)}
          r="7"
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="1"
          opacity="0.4"
          className="hero-preview-chart-pulse"
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Hero Product Preview
   ───────────────────────────────────────────── */

export function HeroProductPreview() {
  const {
    date,
    readiness,
    recovery,
    fatigue,
    session,
    signals,
    recommendation,
    performance,
  } = heroPreviewData;

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Soft ambient glow behind frame */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-primary/15 via-transparent to-brand-accent/10 blur-2xl opacity-50 pointer-events-none" />

      {/* ── APPLICATION FRAME ── */}
      <div className="hero-preview-frame relative glass-app-frame rounded-2xl overflow-hidden shadow-2xl">

        {/* ── App Header ── */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-text-primary tracking-tight">
              Ludis
            </span>
            <span className="hidden sm:inline text-xs text-text-muted">
              Performance Overview
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-text-muted">
            <span className="hidden sm:inline">{date.label}</span>
            <span className="sm:hidden">Thu, Aug 13</span>
            <span className="text-text-muted/60">·</span>
            <span>{date.lastSynced}</span>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="p-4 sm:p-5">

          {/* Desktop: 2 columns (60/40). Mobile: stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5">

            {/* ── LEFT / DOMINANT COLUMN ── */}
            <div className="lg:col-span-3 space-y-1">

              {/* Readiness — PRIMARY */}
              <div className="glass-elevated rounded-xl p-4 sm:p-5 hero-preview-readiness">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-text-muted mb-1">
                      Readiness
                    </p>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-5xl font-bold text-text-primary tracking-tight leading-none">
                        {readiness.score}
                      </span>
                      <span className="text-sm font-semibold text-status-positive">
                        {readiness.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1.5">
                      {readiness.context}
                    </p>
                  </div>
                  <span className="text-[11px] text-brand-primary font-medium bg-brand-primary-muted px-2 py-0.5 rounded-md whitespace-nowrap">
                    {readiness.delta}
                  </span>
                </div>

                {/* Baseline context */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.05] text-xs text-text-muted">
                  <span>
                    Personal baseline{' '}
                    <span className="text-text-secondary font-medium">
                      {performance.baseline.min}–{performance.baseline.max}
                    </span>
                  </span>
                  <span>
                    Current{' '}
                    <span className="text-brand-primary font-medium">
                      {performance.current}
                    </span>
                  </span>
                </div>
              </div>

              {/* Performance Trend — SECONDARY (largest visual area) */}
              <div className="glass-content rounded-xl p-4 hero-preview-supporting">
                <PerformanceTrend />
              </div>
            </div>

            {/* ── RIGHT / SUPPORTING COLUMN ── */}
            <div className="lg:col-span-2 space-y-3 hero-preview-supporting">

              {/* Recovery — compact */}
              <div className="glass-content rounded-xl p-3.5">
                <p className="text-xs font-medium text-text-muted mb-2">
                  Recovery
                </p>
                <div className="flex items-baseline gap-2 mb-2.5">
                  <span className="text-2xl font-bold text-text-primary leading-none">
                    {recovery.score}
                  </span>
                  <span className="text-xs font-semibold text-status-positive">
                    {recovery.status}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-text-secondary">
                    <span>Sleep</span>
                    <span className="text-text-primary font-medium">{recovery.sleep}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Training load</span>
                    <span className="text-text-primary font-medium">{recovery.trainingLoad}</span>
                  </div>
                </div>
              </div>

              {/* Fatigue — compact */}
              <div className="glass-content rounded-xl p-3.5">
                <p className="text-xs font-medium text-text-muted mb-2">
                  Fatigue
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-bold text-status-warning leading-none">
                    {fatigue.level}
                  </span>
                </div>
                <p className="text-[11px] text-text-muted">
                  {fatigue.trend}
                </p>
              </div>

              {/* Today's Session — compact */}
              <div className="glass-content rounded-xl p-3.5">
                <p className="text-xs font-medium text-text-muted mb-2">
                  Today&apos;s session
                </p>
                <p className="text-sm font-semibold text-text-primary leading-snug">
                  {session.name}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
                  <span>{session.time}</span>
                  <span className="text-text-muted/40">·</span>
                  <span>{session.intensity} intensity</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM SECTION (full width) ── */}
          <div className="mt-4 space-y-3 hero-preview-action">

            {/* Contributing Signals */}
            <div className="glass-content rounded-xl p-3.5">
              <p className="text-xs font-medium text-text-muted mb-2.5">
                Contributing signals
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                {signals.map((signal) => (
                  <div key={signal.label} className="flex items-baseline justify-between sm:flex-col sm:items-start gap-1">
                    <span className="text-xs text-text-secondary">
                      {signal.label}
                    </span>
                    <span className="text-xs text-text-primary font-medium">
                      {signal.status}
                      {signal.detail && (
                        <span className="text-text-muted font-normal"> · {signal.detail}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation — accent glass */}
            <div className="glass-accent rounded-xl p-4 border-l-2 border-l-brand-primary/40">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-brand-primary">
                    Recommended today
                  </p>
                  <p className="text-sm font-semibold text-text-primary leading-snug">
                    {recommendation.primary}
                    <br />
                    {recommendation.secondary}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1">
                    {recommendation.explanation}
                  </p>
                </div>
                <span className="text-[10px] text-text-muted whitespace-nowrap pt-0.5">
                  Confidence{' '}
                  <span className="text-status-positive font-medium">
                    {recommendation.confidence}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tiny illustrative data disclaimer — outside core hierarchy */}
        <div className="px-5 pb-2.5 text-right">
          <span className="text-[9px] text-text-muted/40 tracking-wide">
            Illustrative data
          </span>
        </div>
      </div>
    </div>
  );
}
