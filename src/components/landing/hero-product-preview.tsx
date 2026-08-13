// Ludis Landing Components — Hero Product Preview Interface
// Layered glass console visualization showing real Ludis telemetry

import { StatusBadge } from '@/components/ui/status-badge';

export function HeroProductPreview() {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background glow behind console */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-primary/30 to-brand-accent/20 blur-xl opacity-60 pointer-events-none" />

      {/* Main Glass Hero Console */}
      <div className="relative glass-hero rounded-2xl p-5 sm:p-6 text-left border-border-luminous shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-text-primary uppercase">
              LUDIS TELEMETRY CONSOLE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-text-muted bg-surface-overlay px-2 py-0.5 rounded border border-border-subtle">
              DEMO ATHLETE: MAYA CHEN
            </span>
            <StatusBadge status="positive" label="LIVE" size="sm" />
          </div>
        </div>

        {/* Readiness Hero Metric */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="glass-subtle rounded-xl p-3 border-border-subtle">
            <span className="text-[10px] font-mono text-text-muted uppercase">Readiness</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-brand-primary">82</span>
              <span className="text-[10px] text-text-muted">/100</span>
            </div>
            <span className="text-[10px] text-status-positive font-medium">Optimal state</span>
          </div>

          <div className="glass-subtle rounded-xl p-3 border-border-subtle">
            <span className="text-[10px] font-mono text-text-muted uppercase">Performance</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-text-primary">+6.4%</span>
            </div>
            <span className="text-[10px] text-brand-primary font-medium">Above baseline</span>
          </div>

          <div className="glass-subtle rounded-xl p-3 border-border-subtle">
            <span className="text-[10px] font-mono text-text-muted uppercase">Recovery</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-text-primary">76</span>
              <span className="text-[10px] text-text-muted">/100</span>
            </div>
            <span className="text-[10px] text-status-positive font-medium">Good recovery</span>
          </div>

          <div className="glass-subtle rounded-xl p-3 border-border-subtle">
            <span className="text-[10px] font-mono text-text-muted uppercase">Fatigue</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold font-mono text-status-warning">MODERATE</span>
            </div>
            <span className="text-[10px] text-text-muted">Trend +4%</span>
          </div>
        </div>

        {/* SVG Performance Baseline & Trend Line */}
        <div className="glass-subtle rounded-xl p-4 mb-5 border-border-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-primary font-mono uppercase">
              Performance Index vs Personal Baseline
            </span>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1 text-text-muted">
                <span className="h-0.5 w-3 bg-text-muted inline-block" /> Baseline (78)
              </span>
              <span className="flex items-center gap-1 text-brand-primary">
                <span className="h-0.5 w-3 bg-brand-primary inline-block" /> Current (83)
              </span>
            </div>
          </div>

          <svg viewBox="0 0 400 90" className="w-full h-20">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
            <line x1="0" y1="45" x2="400" y2="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
            <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />

            {/* Baseline Dotted Line */}
            <line x1="10" y1="45" x2="390" y2="45" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Performance Gradient Area */}
            <path
              d="M 10 55 Q 80 48, 150 40 T 290 30 T 390 22 L 390 85 L 10 85 Z"
              fill="url(#trend-fill)"
              opacity="0.25"
            />
            <defs>
              <linearGradient id="trend-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00c896" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Current Performance Trend Polyline */}
            <path
              d="M 10 55 Q 80 48, 150 40 T 290 30 T 390 22"
              fill="none"
              stroke="#00c896"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Highlighted Pulse Marker */}
            <circle cx="390" cy="22" r="4.5" fill="#00c896" />
            <circle cx="390" cy="22" r="9" fill="none" stroke="#00c896" strokeWidth="1.5" opacity="0.6" />
          </svg>
        </div>

        {/* Explainable Recommendation & Factors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass-subtle rounded-xl p-3.5 border-border-subtle">
            <span className="text-[10px] font-mono text-brand-primary uppercase font-bold tracking-wider">
              WHY THIS CHANGED
            </span>
            <div className="mt-2 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-text-secondary">
                <span>Training Load Consistency</span>
                <span className="text-status-positive font-mono font-medium">+High</span>
              </div>
              <div className="flex items-center justify-between text-text-secondary">
                <span>Sleep Quality (7.5h avg)</span>
                <span className="text-status-positive font-mono font-medium">+Mod</span>
              </div>
              <div className="flex items-center justify-between text-text-secondary">
                <span>Resting HR (54 bpm)</span>
                <span className="text-status-warning font-mono font-medium">-Minor</span>
              </div>
            </div>
          </div>

          <div className="glass-subtle rounded-xl p-3.5 border-border-subtle bg-brand-primary-muted/10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-brand-primary uppercase font-bold">
                RECOMMENDED ACTION
              </span>
              <span className="text-[10px] font-mono text-text-muted">CONFIDENCE: HIGH</span>
            </div>
            <p className="text-xs font-semibold text-text-primary leading-tight mt-1">
              Maintain planned intensity for today&apos;s session. Prioritize active recovery protocol after 18:00.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
