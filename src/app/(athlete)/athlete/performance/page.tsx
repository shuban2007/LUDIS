// Ludis — Performance Analysis Page
// Shows personal baseline, current values, historical trends, deviations, significance.

import { PageHeader } from '@/components/ui/page-header';
import { InsightCard } from '@/components/shared/insight-card';
import { TrendChart } from '@/components/shared/trend-chart';
import { ConfidenceIndicator } from '@/components/shared/confidence-indicator';
import { Card } from '@/components/ui/card';
import {
  getCurrentAthlete,
  getBaselines,
  getInsights,
  getPPI,
} from '@/lib/services/data-service';

export default function PerformancePage() {
  const athlete = getCurrentAthlete();
  const baselines = getBaselines(athlete.id);
  const insights = getInsights(athlete.id);
  const ppi = getPPI(athlete.id);

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Performance Analysis"
        subtitle="Your metrics compared to your personal baseline"
        section="Performance"
      />

      {/* PPI Overview */}
      <section aria-label="Performance Index">
        <div className="ludis-card mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-text-primary mb-1">Personal Performance Index</h2>
              <p className="text-xs text-text-secondary mb-4">
                Composite score derived from your training, recovery, and physiological data.
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-bold text-text-primary">{ppi.score}</span>
                <span className="text-lg text-text-muted">/ {ppi.maxScore}</span>
              </div>
              <ConfidenceIndicator confidence={ppi.confidence} compact />
            </div>
            <div className="flex-1">
              <TrendChart
                trend={ppi.trend}
                baselineValue={ppi.score - ppi.deviation}
                label="PPI Trend"
                unit="pts"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Personal Baselines */}
      <section aria-label="Personal baselines" className="mb-8">
        <h2 className="ludis-section-title mb-3">Your Personal Baselines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {baselines.map((baseline) => (
            <Card key={baseline.metric}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-semibold text-text-primary">{baseline.label}</span>
                <ConfidenceIndicator confidence={baseline.confidence} compact />
              </div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-2xl font-bold text-text-primary">{baseline.baselineValue}</span>
                <span className="text-sm text-text-muted">{baseline.unit}</span>
              </div>
              <div className="text-xs text-text-secondary">
                Normal range: {baseline.rangeLow}–{baseline.rangeHigh} {baseline.unit}
              </div>
              <div className="mt-2 text-[11px] text-text-muted">
                Based on {baseline.sampleSize} data points
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Performance Insights — deviations from baseline */}
      <section aria-label="Performance insights">
        <h2 className="ludis-section-title mb-3">Current Insights</h2>
        <p className="text-xs text-text-secondary mb-4">
          How your current metrics compare to what is normal for you.
        </p>
        <div className="space-y-4">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>
    </div>
  );
}
