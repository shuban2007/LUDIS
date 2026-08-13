// Ludis — Fatigue & Risk Page
// Uses responsible language. Shows status, indicators, factors, confidence, recommendation.

import { PageHeader } from '@/components/ui/page-header';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { FactorBreakdown } from '@/components/shared/factor-breakdown';
import { ConfidenceIndicator } from '@/components/shared/confidence-indicator';
import { TrendChart } from '@/components/shared/trend-chart';
import { getCurrentAthlete, getFatigueRisk } from '@/lib/services/data-service';
import { capitalize, getFatigueColor } from '@/lib/utils';
import type { StatusSeverity, FatigueLevel } from '@/lib/types';

function getFatigueSeverity(status: FatigueLevel): StatusSeverity {
  if (status === 'low') return 'positive';
  if (status === 'moderate') return 'warning';
  return 'risk';
}

export default function FatiguePage() {
  const athlete = getCurrentAthlete();
  const fatigue = getFatigueRisk(athlete.id);

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Fatigue & Risk Indicators"
        subtitle="Assessment based on multiple contributing signals"
        section="Fatigue"
        actions={
          <StatusBadge
            status={getFatigueSeverity(fatigue.status)}
            label={fatigue.statusLabel}
          />
        }
      />

      {/* Status overview */}
      <Card className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <CardTitle>Current Fatigue Assessment</CardTitle>
            <CardDescription>
              This assessment is based on multiple signals. No single metric determines your fatigue status.
            </CardDescription>
          </div>
        </div>

        {/* Recommended action */}
        <div className="mt-4 rounded-md bg-brand-primary-muted px-3 py-2.5">
          <span className="text-[11px] font-semibold text-brand-primary uppercase tracking-wide">
            Recommended Action
          </span>
          <p className="mt-1 text-sm text-text-primary">{fatigue.recommendedAction}</p>
        </div>
      </Card>

      {/* Fatigue trend */}
      <section className="mb-6">
        <div className="ludis-card">
          <TrendChart
            trend={fatigue.trend}
            label="Fatigue Indicators Trend"
            color="var(--status-warning)"
          />
        </div>
      </section>

      {/* Fatigue indicators */}
      <section className="mb-6">
        <h2 className="ludis-section-title mb-3">Individual Indicators</h2>
        <div className="space-y-3">
          {fatigue.indicators.map((indicator, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: getFatigueColor(indicator.status) }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-text-primary">{indicator.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-text-muted capitalize">{indicator.weight}</span>
                  <StatusBadge
                    status={getFatigueSeverity(indicator.status)}
                    label={capitalize(indicator.status)}
                    size="sm"
                  />
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed ml-4">{indicator.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Contributing factors */}
      <section className="mb-6">
        <div className="ludis-card">
          <FactorBreakdown factors={fatigue.contributingFactors} />
        </div>
      </section>

      {/* Confidence */}
      <section>
        <ConfidenceIndicator confidence={fatigue.confidence} />
      </section>
    </div>
  );
}
