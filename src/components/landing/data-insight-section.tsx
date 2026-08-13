// Ludis Landing Components — Data To Insight Section Component

export function DataInsightSection() {
  return (
    <section id="data-insight" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle relative">
      <div className="glow-orb-blue w-96 h-96 top-20 right-0" />

      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="ludis-section-title">TELEMETRY TRANSLATION</span>
        <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase mt-2">
          RAW DATA ISN&apos;T <span className="text-brand-cyan">INSIGHT.</span>
        </h2>
        <p className="text-base text-text-secondary mt-4 leading-relaxed">
          Isolated metrics like HRV or steps on a generic dashboard don&apos;t make decisions. The value comes from understanding what changed, why it changed, and what to do next.
        </p>
      </div>

      {/* Split Interactive Glass Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Raw Telemetry Signals */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-mono text-text-muted uppercase tracking-widest font-bold block mb-2">
            STEP 1: RAW TELEMETRY SIGNALS
          </span>
          <div className="glass-subtle rounded-2xl p-4 border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🫀</span>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">Heart Rate Variability (HRV)</h4>
                <p className="text-xs text-text-muted">Morning RMSSD</p>
              </div>
            </div>
            <span className="text-lg font-mono font-bold text-text-primary">64 ms</span>
          </div>

          <div className="glass-subtle rounded-2xl p-4 border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">💤</span>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">Sleep Architecture</h4>
                <p className="text-xs text-text-muted">Total & Restorative</p>
              </div>
            </div>
            <span className="text-lg font-mono font-bold text-text-primary">7h 12m</span>
          </div>

          <div className="glass-subtle rounded-2xl p-4 border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">Training Workload</h4>
                <p className="text-xs text-text-muted">Acute Session Load</p>
              </div>
            </div>
            <span className="text-lg font-mono font-bold text-text-primary">380 AU</span>
          </div>
        </div>

        {/* Center: Logic Pipeline Arrow */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-4">
          <div className="h-12 w-12 rounded-full glass-hero flex items-center justify-center border-border-luminous shadow-lg">
            <svg className="h-6 w-6 text-brand-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-brand-primary uppercase mt-2 font-bold tracking-widest">
            LUDIS ENGINE
          </span>
        </div>

        {/* Right: Ludis Explainable Insight */}
        <div className="lg:col-span-5 glass-hero rounded-3xl p-6 border-border-luminous space-y-4">
          <span className="text-xs font-mono text-brand-primary uppercase tracking-widest font-bold block">
            STEP 2: EXPLAINABLE INSIGHT & ACTION
          </span>

          <div className="border-b border-border-subtle pb-3">
            <span className="text-[10px] font-mono text-text-muted uppercase">RECOVERY STATUS</span>
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-lg font-bold text-text-primary">Stable Recovery (76 pts)</h3>
              <span className="text-xs font-mono text-status-positive font-semibold">HIGH CONFIDENCE</span>
            </div>
          </div>

          <div className="border-b border-border-subtle pb-3">
            <span className="text-[10px] font-mono text-text-muted uppercase">WHY IT MATTERS</span>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              HRV is steady. Sleep duration was 30 mins below baseline target, offset by optimal restorative phases.
            </p>
          </div>

          <div className="bg-brand-primary-muted/20 rounded-xl p-3.5 border border-brand-primary/30">
            <span className="text-[10px] font-mono text-brand-primary uppercase font-bold">RECOMMENDED ACTION</span>
            <p className="text-xs font-bold text-text-primary mt-1">
              Execute scheduled moderate workout. Prioritize bedtime by 22:30 tonight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
