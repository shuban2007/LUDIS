'use client';

import { useDemo } from '@/lib/demo/demo-context';
import { DashboardSectionPage } from '@/components/dashboard/dashboard-section-page';
import { Card, CardTitle } from '@/components/ui/card';
import { HeartIcon, MoonIcon } from '@/components/ui/icons';

export default function RecoveryPage() {
  const { getCurrentAthlete } = useDemo();
  const currentAthlete = getCurrentAthlete();

  return (
    <DashboardSectionPage
      title="Recovery Analysis"
      subtitle="Sleep cycle metrics, HRV telemetry, and cardiac load index."
      sectionName="Recovery"
      metricLabel="Recovery Score"
      metricValue={currentAthlete.recovery.score}
      metricStatus={currentAthlete.recovery.status}
      metricDescription="Autonomic index matches your baseline targets."
      backHref="/athlete"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 flex items-start gap-4">
          <HeartIcon className="w-8 h-8 text-brand shrink-0" />
          <div className="text-left">
            <CardTitle>HRV Status</CardTitle>
            <p className="text-2xl font-bold font-sans mt-2">
              {currentAthlete.contributors.hrv.value} {currentAthlete.contributors.hrv.unit}
            </p>
            <p className="text-xs text-foreground-muted mt-1">
              {currentAthlete.contributors.hrv.status} • {currentAthlete.contributors.hrv.description}
            </p>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <MoonIcon className="w-8 h-8 text-brand shrink-0" />
          <div className="text-left">
            <CardTitle>Sleep Indicators</CardTitle>
            <p className="text-2xl font-bold font-sans mt-2">
              {currentAthlete.contributors.sleep.value}
            </p>
            <p className="text-xs text-foreground-muted mt-1">
              {currentAthlete.contributors.sleep.status} • {currentAthlete.contributors.sleep.description}
            </p>
          </div>
        </Card>
      </div>
    </DashboardSectionPage>
  );
}
