// Ludis — RecommendationCard
// Displays an actionable recommendation with evidence, confidence, and explanation.
// Part of the analysis chain: the "WHAT NOW" answer.

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { ConfidenceIndicator } from '@/components/shared/confidence-indicator';
import type { Recommendation } from '@/lib/types';
import { capitalize } from '@/lib/utils';

interface RecommendationCardProps {
  recommendation: Recommendation;
  expanded?: boolean;
}

export function RecommendationCard({ recommendation, expanded = false }: RecommendationCardProps) {
  const { title, explanation, action, evidence, confidence, priority, severity, category } = recommendation;

  return (
    <Card status={severity === 'positive' ? undefined : severity}>
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <StatusBadge status={severity} label={capitalize(priority)} size="sm" />
            <ConfidenceIndicator
              confidence={{ level: confidence, dataQuality: 'high', explanation: '' }}
              compact
            />
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-text-muted uppercase tracking-wide">{capitalize(category)}</span>
        </div>
      </CardHeader>

      <CardTitle>{title}</CardTitle>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">{explanation}</p>

      {/* Action */}
      <div className="mt-3 rounded-md bg-brand-primary-muted px-3 py-2.5">
        <span className="text-[11px] font-semibold text-brand-primary uppercase tracking-wide">Recommended Action</span>
        <p className="mt-1 text-sm text-text-primary">{action}</p>
      </div>

      {/* Evidence (expanded view) */}
      {expanded && evidence.length > 0 && (
        <div className="mt-4">
          <h4 className="ludis-section-title mb-2">Supporting Evidence</h4>
          <div className="space-y-2">
            {evidence.map((e, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <span className="text-text-muted mt-0.5">•</span>
                <div>
                  <span className="font-medium text-text-primary">{e.label}:</span>{' '}
                  <span className="text-text-secondary">{e.description}</span>
                  <span className="text-text-muted ml-1">({e.source})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
