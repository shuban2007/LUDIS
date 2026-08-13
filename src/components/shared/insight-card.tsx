// Ludis — InsightCard
// Displays a performance insight: deviation from baseline with interpretation.

import { Card } from '@/components/ui/card';
import { ConfidenceIndicator } from '@/components/shared/confidence-indicator';
import type { PerformanceInsight, StatusSeverity } from '@/lib/types';

interface InsightCardProps {
  insight: PerformanceInsight;
}

function getSignificanceSeverity(significance: string): StatusSeverity {
  switch (significance) {
    case 'significant': return 'risk';
    case 'moderate': return 'warning';
    default: return 'info';
  }
}

export function InsightCard({ insight }: InsightCardProps) {
  const { label, currentValue, baselineValue, unit, deviationPercent, direction, significance, interpretation, confidence } = insight;
  const severity = getSignificanceSeverity(significance);

  return (
    <Card interactive>
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm font-semibold text-text-primary">{label}</span>
        <ConfidenceIndicator confidence={confidence} compact />
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-text-primary">
          {currentValue} <span className="text-sm text-text-muted font-normal">{unit}</span>
        </span>
        <div className="flex items-center gap-1">
          <span
            className={`text-sm font-semibold ${
              direction === 'above' ? 'text-status-positive' : direction === 'below' ? 'text-status-risk' : 'text-text-muted'
            }`}
          >
            {direction === 'above' ? '↑' : direction === 'below' ? '↓' : '→'} {deviationPercent.toFixed(1)}%
          </span>
          <span className="text-[11px] text-text-muted">from baseline</span>
        </div>
      </div>

      {/* Baseline visual comparison */}
      <div className="mt-3 relative">
        <div className="h-2 w-full rounded-full bg-surface-overlay">
          {/* Baseline range indicator */}
          <div className="absolute h-2 rounded-full bg-border-strong opacity-40" style={{ left: '20%', width: '60%' }} />
          {/* Current position */}
          <div
            className="absolute h-2 w-2 rounded-full top-0 -translate-x-1/2"
            style={{
              left: `${Math.min(Math.max((currentValue / (baselineValue * 1.5)) * 100, 5), 95)}%`,
              backgroundColor: severity === 'info' ? 'var(--status-positive)' : severity === 'warning' ? 'var(--status-warning)' : 'var(--status-risk)',
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-text-muted mt-1">
          <span>Below</span>
          <span>Baseline: {baselineValue} {unit}</span>
          <span>Above</span>
        </div>
      </div>

      <p className="mt-3 text-xs text-text-secondary leading-relaxed">{interpretation}</p>
    </Card>
  );
}
