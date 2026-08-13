// Ludis — Coach Athlete Detail Page
// Drill-down from team overview → athlete summary → athlete detail.
// Shows permitted data only (architecture supports permission-controlled access).

import { PageHeader } from '@/components/ui/page-header';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { MetricCard } from '@/components/shared/metric-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { TrendChart } from '@/components/shared/trend-chart';
import { FactorBreakdown } from '@/components/shared/factor-breakdown';
import { ConfidenceIndicator } from '@/components/shared/confidence-indicator';
import {
  getAthleteProfile,
  getPPI,
  getReadiness,
  getRecoveryStatus,
  getFatigueRisk,
  getRecommendations,
} from '@/lib/services/data-service';
import { capitalize } from '@/lib/utils';
import type { StatusSeverity } from '@/lib/types';

function getReadinessSeverity(score: number): StatusSeverity {
  if (score >= 75) return 'positive';
  if (score >= 55) return 'warning';
  return 'risk';
}

export default async function AthleteDetailPage({
  params,
}: {
  params: Promise<{ athleteId: string }>;
}) {
  const { athleteId } = await params;
  const athlete = getAthleteProfile(athleteId);

  if (!athlete) {
    return (
      <div className="max-w-4xl">
        <PageHeader title="Athlete Not Found" section="Athletes" />
        <p className="text-text-secondary">This athlete does not exist or you do not have permission to view their data.</p>
      </div>
    );
  }

  const ppi = getPPI(athlete.id);
  const readiness = getReadiness(athlete.id);
  const recovery = getRecoveryStatus(athlete.id);
  const fatigue = getFatigueRisk(athlete.id);
  const recommendations = getRecommendations(athlete.id).slice(0, 2);

  return (
    <div className="max-w-4xl">
      <PageHeader
        title={athlete.name}
        subtitle={`${capitalize(athlete.sport)} • ${capitalize(athlete.experienceLevel)} • Age ${athlete.age}`}
        section="Athlete Detail"
        actions={
          <StatusBadge
            status={getReadinessSeverity(readiness.score)}
            label={`Readiness: ${readiness.label}`}
          />
        }
      />

      {/* Permission notice */}
      <Card className="mb-6 border-border-subtle">
        <p className="text-xs text-text-muted">
          You are viewing data that this athlete has permitted you to access.
          Data visibility is controlled by the athlete.
        </p>
      </Card>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="PPI"
          value={ppi.score}
          unit="pts"
          maxValue={ppi.maxScore}
          deviation={ppi.deviation}
          deviationDirection={ppi.direction}
          trend={ppi.trend.direction}
        />
        <MetricCard
          label="Recovery"
          value={recovery.score}
          unit="pts"
          maxValue={recovery.maxScore}
          trend={recovery.trend.direction}
        />
        <MetricCard
          label="Fatigue"
          value={fatigue.trend.points[fatigue.trend.points.length - 1]?.value ?? 0}
          unit=""
          trend={fatigue.trend.direction}
        />
        <MetricCard
          label="Readiness"
          value={readiness.score}
          unit="pts"
          maxValue={readiness.maxScore}
        />
      </div>

      {/* Performance trend */}
      <Card className="mb-6">
        <CardTitle>Performance Trend</CardTitle>
        <div className="mt-3">
          <TrendChart trend={ppi.trend} baselineValue={ppi.score - ppi.deviation} label="PPI" unit="pts" />
        </div>
        <div className="mt-3">
          <ConfidenceIndicator confidence={ppi.confidence} compact />
        </div>
      </Card>

      {/* Contributing factors */}
      <Card className="mb-6">
        <FactorBreakdown
          factors={[...ppi.contributingFactors, ...recovery.contributingFactors.slice(0, 2)]}
        />
      </Card>

      {/* Recent recommendations */}
      {recommendations.length > 0 && (
        <section>
          <h2 className="ludis-section-title mb-3">Recent Recommendations</h2>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <Card key={rec.id}>
                <CardTitle>{rec.title}</CardTitle>
                <CardDescription>{rec.explanation}</CardDescription>
                <div className="mt-2">
                  <ConfidenceIndicator
                    confidence={{ level: rec.confidence, dataQuality: 'high', explanation: '' }}
                    compact
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
