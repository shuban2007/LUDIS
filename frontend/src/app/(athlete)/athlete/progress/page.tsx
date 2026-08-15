'use client';

import { useDemo } from '@/lib/demo/demo-context';
import { DashboardSectionPage } from '@/components/dashboard/dashboard-section-page';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProgressPage() {
  const { getCurrentAthlete } = useDemo();
  const currentAthlete = getCurrentAthlete();

  return (
    <DashboardSectionPage
      title="Training Progress"
      subtitle="Track your progress indicators, historical trends, and workout achievements."
      sectionName="Progress"
      metricLabel="Current Progress"
      metricValue={`${currentAthlete.readiness.score}%`}
      metricStatus="Good"
      metricDescription="Consistent target completion verified."
      backHref="/athlete"
    >
      <Card className="p-5">
        <CardTitle>Weekly Goal Targets</CardTitle>
        <CardDescription>
          Completed {currentAthlete.session.title} session successfully today ({currentAthlete.session.duration}). Autonomic recovery telemetry matches target readiness scores of {currentAthlete.readiness.score}%.
        </CardDescription>
      </Card>
    </DashboardSectionPage>
  );
}
