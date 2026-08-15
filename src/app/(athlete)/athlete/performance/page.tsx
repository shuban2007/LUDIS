'use client';

import { useDemo } from '@/lib/demo/demo-context';
import { DashboardSectionPage } from '@/components/dashboard/dashboard-section-page';
import { DashboardTrendChart } from '@/components/athlete/dashboard-trend-chart';
import { Card, CardTitle } from '@/components/ui/card';

export default function PerformancePage() {
  const { getCurrentAthlete } = useDemo();
  const currentAthlete = getCurrentAthlete();

  return (
    <DashboardSectionPage
      title="Performance Analysis"
      subtitle="Personal baseline trend index and weekly sports metrics."
      sectionName="Performance"
      metricLabel="Performance Score"
      metricValue={currentAthlete.performance.score}
      metricStatus="Improving"
      metricDescription={`Personal baseline: ${currentAthlete.performance.baseline.min} – ${currentAthlete.performance.baseline.max} pts`}
      backHref="/athlete"
    >
      <Card className="p-6">
        <CardTitle>
          Personal Baseline Trend
        </CardTitle>
        <DashboardTrendChart
          trend={currentAthlete.performance.history}
          baselineMin={currentAthlete.performance.baseline.min}
          baselineMax={currentAthlete.performance.baseline.max}
        />
      </Card>
    </DashboardSectionPage>
  );
}
