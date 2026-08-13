// Ludis — Progress & Reports Page

import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { TrendChart } from '@/components/shared/trend-chart';
import { ConfidenceIndicator } from '@/components/shared/confidence-indicator';
import { getCurrentAthlete, getPPI, getRecoveryStatus, getFatigueRisk } from '@/lib/services/data-service';

export default function ProgressPage() {
  const athlete = getCurrentAthlete();
  const ppi = getPPI(athlete.id);
  const recovery = getRecoveryStatus(athlete.id);
  const fatigue = getFatigueRisk(athlete.id);

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Progress & Reports"
        subtitle="Track your trends over time"
        section="Progress"
      />

      <div className="space-y-6">
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Performance Trend</h3>
          <TrendChart trend={ppi.trend} baselineValue={ppi.score - ppi.deviation} label="PPI" unit="pts" />
          <div className="mt-3">
            <ConfidenceIndicator confidence={ppi.confidence} compact />
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Recovery Trend</h3>
          <TrendChart trend={recovery.trend} label="Recovery" unit="pts" color="var(--status-positive)" />
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Fatigue Trend</h3>
          <TrendChart trend={fatigue.trend} label="Fatigue" color="var(--status-warning)" />
        </Card>
      </div>
    </div>
  );
}
