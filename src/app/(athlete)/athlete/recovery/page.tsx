// Ludis — Recovery Analysis Page
// Current state, trend, contributing factors, history, recommendation.
// Never implies one signal determines recovery.

import { PageHeader } from '@/components/ui/page-header';
import { MetricCard } from '@/components/shared/metric-card';
import { FactorBreakdown } from '@/components/shared/factor-breakdown';
import { ConfidenceIndicator } from '@/components/shared/confidence-indicator';
import { TrendChart } from '@/components/shared/trend-chart';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  getCurrentAthlete,
  getRecoveryStatus,
  getRecoveryHistory,
} from '@/lib/services/data-service';
import { capitalize } from '@/lib/utils';
import type { StatusSeverity } from '@/lib/types';

function getLevelSeverity(level: string): StatusSeverity {
  if (level === 'optimal' || level === 'good') return 'positive';
  if (level === 'moderate') return 'warning';
  return 'risk';
}

export default function RecoveryPage() {
  const athlete = getCurrentAthlete();
  const recovery = getRecoveryStatus(athlete.id);
  const history = getRecoveryHistory(athlete.id);

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Recovery Analysis"
        subtitle="Your recovery state based on multiple signals"
        section="Recovery"
        actions={
          <StatusBadge
            status={getLevelSeverity(recovery.level)}
            label={capitalize(recovery.level)}
          />
        }
      />

      {/* Recovery Score + Trend */}
      <div className="grid gap-4 lg:grid-cols-2 mb-8">
        <MetricCard
          label="Recovery Score"
          value={recovery.score}
          unit="pts"
          maxValue={recovery.maxScore}
          trend={recovery.trend.direction}
          primary
        />
        <div className="ludis-card">
          <TrendChart
            trend={recovery.trend}
            label="Recovery Trend"
            unit="pts"
            color="var(--status-positive)"
          />
        </div>
      </div>

      {/* Interpretation */}
      <Card className="mb-8">
        <CardTitle>Recovery Interpretation</CardTitle>
        <CardDescription>{recovery.interpretation}</CardDescription>
        <div className="mt-3 rounded-md bg-brand-primary-muted px-3 py-2.5">
          <span className="text-[11px] font-semibold text-brand-primary uppercase tracking-wide">
            Recommended Action
          </span>
          <p className="mt-1 text-sm text-text-primary">{recovery.recommendedAction}</p>
        </div>
      </Card>

      {/* Contributing Factors */}
      <section className="mb-8">
        <div className="ludis-card">
          <FactorBreakdown factors={recovery.contributingFactors} />
        </div>
      </section>

      {/* Confidence */}
      <section className="mb-8">
        <ConfidenceIndicator confidence={recovery.confidence} />
      </section>

      {/* Recovery History */}
      <section>
        <h2 className="ludis-section-title mb-3">Recent History</h2>
        <div className="ludis-card overflow-x-auto">
          <table className="w-full text-sm" aria-label="Recovery history">
            <thead>
              <tr className="text-text-muted text-xs text-left">
                <th className="pb-2 pr-4 font-medium">Date</th>
                <th className="pb-2 pr-4 font-medium">Score</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(-7).reverse().map((entry) => (
                <tr key={entry.date} className="border-t border-border-subtle">
                  <td className="py-2 pr-4 text-text-secondary">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-2 pr-4 text-text-primary font-medium">{entry.score}</td>
                  <td className="py-2">
                    <StatusBadge
                      status={getLevelSeverity(entry.level)}
                      label={capitalize(entry.level)}
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
