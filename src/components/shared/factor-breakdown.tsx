// Ludis — FactorBreakdown
// Displays contributing factors for a model output.
// Part of the analysis chain: answers "WHY" this status/prediction.

import type { ContributingFactor } from '@/lib/types';

interface FactorBreakdownProps {
  factors: ContributingFactor[];
  title?: string;
}

function getImpactWidth(impact: 'high' | 'moderate' | 'low'): string {
  switch (impact) {
    case 'high': return 'w-full';
    case 'moderate': return 'w-2/3';
    case 'low': return 'w-1/3';
  }
}

function getDirectionColor(direction: 'positive' | 'negative' | 'neutral'): string {
  switch (direction) {
    case 'positive': return 'bg-status-positive';
    case 'negative': return 'bg-status-risk';
    case 'neutral': return 'bg-status-info';
  }
}

function getDirectionIcon(direction: 'positive' | 'negative' | 'neutral') {
  if (direction === 'positive') {
    return (
      <svg className="h-3.5 w-3.5 text-status-positive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (direction === 'negative') {
    return (
      <svg className="h-3.5 w-3.5 text-status-risk shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01" />
      </svg>
    );
  }
  return (
    <svg className="h-3.5 w-3.5 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  );
}

export function FactorBreakdown({ factors, title = 'Contributing Factors' }: FactorBreakdownProps) {
  if (factors.length === 0) return null;

  return (
    <div>
      <h4 className="ludis-section-title mb-3">{title}</h4>
      <div className="space-y-3">
        {factors.map((factor, i) => (
          <div key={i} className="flex gap-2.5">
            {getDirectionIcon(factor.direction)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-text-primary truncate">
                  {factor.label}
                </span>
                <span className="text-[11px] text-text-muted capitalize shrink-0">
                  {factor.impact} impact
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                {factor.description}
              </p>
              <div className="mt-1.5 h-1 w-full rounded-full bg-surface-overlay">
                <div
                  className={`h-full rounded-full ${getDirectionColor(factor.direction)} opacity-60 ${getImpactWidth(factor.impact)}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
