'use client';

import { useDemo } from '@/lib/demo/demo-context';
import { DashboardSectionPage } from '@/components/dashboard/dashboard-section-page';
import { Card, CardTitle } from '@/components/ui/card';
import { BoltIcon } from '@/components/ui/icons';

export default function FatiguePage() {
  const { getCurrentAthlete } = useDemo();
  const currentAthlete = getCurrentAthlete();

  return (
    <DashboardSectionPage
      title="Fatigue Indicators"
      subtitle="Chronic training load index, overload indicators, and mechanical stress."
      sectionName="Fatigue"
      metricLabel="Fatigue Level"
      metricValue={currentAthlete.fatigue.level}
      metricStatus={currentAthlete.fatigue.level === 'Low' ? 'Good' : currentAthlete.fatigue.level === 'Moderate' ? 'Moderate' : 'Attention Required'}
      metricDescription={currentAthlete.fatigue.trend}
      backHref="/athlete"
    >
      <Card className="p-5 flex items-start gap-4">
        <BoltIcon className="w-8 h-8 text-brand shrink-0" />
        <div className="text-left">
          <CardTitle>Training Workload</CardTitle>
          <p className="text-2xl font-bold font-sans mt-2">
            {currentAthlete.contributors.trainingLoad.value} {currentAthlete.contributors.trainingLoad.unit}
          </p>
          <p className="text-xs text-foreground-muted mt-1">
            {currentAthlete.contributors.trainingLoad.status} • {currentAthlete.contributors.trainingLoad.description}
          </p>
        </div>
      </Card>
    </DashboardSectionPage>
  );
}
