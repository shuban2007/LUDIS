// Ludis Landing Components — Four MVP Pillars Component

export function MvpPillars() {
  return (
    <section id="capabilities" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="ludis-section-title">SYSTEM ARCHITECTURE</span>
        <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase mt-2">
          FOUR PILLARS OF <span className="text-brand-primary">PERFORMANCE INTELLIGENCE</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Baseline Engine */}
        <div className="glass-standard glass-interactive rounded-3xl p-6 sm:p-8 border-border-default relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-brand-primary-muted flex items-center justify-center mb-6 text-brand-primary font-mono text-xl font-bold border border-brand-primary/30">
              01
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">
              Personalized Performance & Baseline Engine
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Continuous baseline calculation adapted to changing training phases. Deviations are evaluated for statistical significance against the athlete&apos;s own history.
            </p>
          </div>

          <div className="glass-subtle rounded-2xl p-4 border-border-subtle font-mono text-xs">
            <div className="flex justify-between mb-1 text-text-muted">
              <span>PPI Baseline</span>
              <span>78 pts</span>
            </div>
            <div className="flex justify-between font-bold text-brand-primary">
              <span>Current PPI</span>
              <span>82 pts (+5.1%)</span>
            </div>
          </div>
        </div>

        {/* Pillar 2: Recovery + Fatigue */}
        <div className="glass-standard glass-interactive rounded-3xl p-6 sm:p-8 border-border-default relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-status-positive-bg flex items-center justify-center mb-6 text-status-positive font-mono text-xl font-bold border border-status-positive-border">
              02
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">
              Recovery + Fatigue Multi-Signal Analysis
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Never relies on a single metric. Combines acute:chronic workload ratios, HRV trends, sleep architecture, and perceived exertion to assess readiness.
            </p>
          </div>

          <div className="glass-subtle rounded-2xl p-4 border-border-subtle font-mono text-xs flex justify-between items-center">
            <div>
              <span className="text-text-muted block">Recovery Level</span>
              <span className="text-status-positive font-bold">Good (76 pts)</span>
            </div>
            <div className="text-right">
              <span className="text-text-muted block">Fatigue Status</span>
              <span className="text-status-warning font-bold">Moderate</span>
            </div>
          </div>
        </div>

        {/* Pillar 3: Coach Dashboard */}
        <div className="glass-standard glass-interactive rounded-3xl p-6 sm:p-8 border-border-default relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-status-info-bg flex items-center justify-center mb-6 text-status-info font-mono text-xl font-bold border border-status-info-border">
              03
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">
              Coach Performance Dashboard & Roster Intelligence
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Team-level readiness distribution, fatigue alerts, and athlete summaries. Seamless drill-down from team overview to individual detail within athlete-permitted scopes.
            </p>
          </div>

          <div className="glass-subtle rounded-2xl p-4 border-border-subtle font-mono text-xs flex items-center justify-between">
            <span className="text-text-secondary">Team Readiness Summary</span>
            <span className="text-status-warning font-bold">2 Alerts Need Attention</span>
          </div>
        </div>

        {/* Pillar 4: Explainable Recommendation Layer */}
        <div className="glass-standard glass-interactive rounded-3xl p-6 sm:p-8 border-border-default relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-status-warning-bg flex items-center justify-center mb-6 text-status-warning font-mono text-xl font-bold border border-status-warning-border">
              04
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">
              Explainable Recommendation Layer
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Clear actionable advice supported by evidence chains and explicit confidence metrics. Decision support built for athlete and coach decision-making.
            </p>
          </div>

          <div className="glass-subtle rounded-2xl p-4 border-border-subtle font-mono text-xs flex items-center justify-between">
            <span className="text-brand-primary font-bold">Evidence-Backed</span>
            <span className="text-text-muted">High Confidence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
