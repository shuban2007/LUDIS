// Ludis — MetricCard
// Displays a key metric with its value, baseline comparison, and trend direction.
// Part of the analysis chain: BASELINE → DEVIATION → FACTORS → CONFIDENCE → RECOMMENDATION

import { Card } from '@/components/ui/card';
import type { DeviationDirection, TrendDirection } from '@/lib/types';

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  maxValue?: number;
  baselineValue?: number;
  deviation?: number;
  deviationDirection?: DeviationDirection;
  trend?: TrendDirection;
  /** Render as primary/hero metric */
  primary?: boolean;
}

function TrendIcon({ direction }: { direction: TrendDirection }) {
  if (direction === 'improving') {
    return (
      <svg className="h-4 w-4 text-status-positive" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 3 3 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 7h4v4" />
      </svg>
    );
  }
  if (direction === 'declining') {
    return (
      <svg className="h-4 w-4 text-status-risk" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-5 5-3-3-4 4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 17H6v-4" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  );
}

function getDeviationColor(direction?: DeviationDirection): string {
  if (direction === 'above') return 'text-status-positive';
  if (direction === 'below') return 'text-status-risk';
  return 'text-text-muted';
}

export function MetricCard({
  label,
  value,
  unit,
  maxValue,
  baselineValue,
  deviation,
  deviationDirection,
  trend,
  primary,
}: MetricCardProps) {
  const progressPercent = maxValue ? (value / maxValue) * 100 : undefined;

  return (
    <Card className={primary ? 'border-brand-primary/30' : ''}>
      <div className="flex items-start justify-between">
        <span className="ludis-section-title">{label}</span>
        {trend && (
          <span className="flex items-center gap-1" aria-label={`Trend: ${trend}`}>
            <TrendIcon direction={trend} />
            <span className="text-[11px] text-text-muted capitalize">{trend}</span>
          </span>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className={`font-bold ${primary ? 'text-3xl' : 'text-2xl'} text-text-primary`}>
          {value}
        </span>
        {maxValue && (
          <span className="text-sm text-text-muted">/ {maxValue}</span>
        )}
        <span className="text-sm text-text-muted">{unit}</span>
      </div>

      {/* Progress bar */}
      {progressPercent !== undefined && (
        <div className="mt-3 h-1.5 w-full rounded-full bg-surface-overlay" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={maxValue}>
          <div
            className="h-full rounded-full bg-brand-primary transition-all duration-500"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      )}

      {/* Baseline comparison */}
      {baselineValue !== undefined && deviation !== undefined && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="text-text-muted">Baseline: {baselineValue} {unit}</span>
          <span className={`font-medium ${getDeviationColor(deviationDirection)}`}>
            {deviation > 0 ? '+' : ''}{deviation} {unit}
          </span>
        </div>
      )}
    </Card>
  );
}
