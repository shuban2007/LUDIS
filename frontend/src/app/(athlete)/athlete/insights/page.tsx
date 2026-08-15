'use client';

import { useDemo } from '@/lib/demo/demo-context';
import { DashboardSectionPage } from '@/components/dashboard/dashboard-section-page';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export default function InsightsPage() {
  const { getCurrentAthlete } = useDemo();
  const currentAthlete = getCurrentAthlete();

  return (
    <DashboardSectionPage
      title="Performance Insights"
      subtitle="AI-generated recommendations and observations derived from your training signals."
      sectionName="Insights"
      metricLabel="Engine Status"
      metricValue="Active"
      metricStatus="Excellent"
      metricDescription="Insights engine is fully synchronized."
      backHref="/athlete"
    >
      <section className="space-y-4">
        <h3 className="ludis-section-title">Today&apos;s Core Insights</h3>
        
        <Card className="p-5 border-l-4 border-l-brand">
          <CardTitle>{currentAthlete.recommendation.title}</CardTitle>
          <CardDescription>
            {currentAthlete.recommendation.description}
          </CardDescription>
          <div className="mt-3 text-xs font-semibold text-brand">
            {currentAthlete.recommendation.confidence}
          </div>
        </Card>

        <Card className="p-5">
          <CardTitle>Training Load Balance</CardTitle>
          <CardDescription>
            Your current training load of {currentAthlete.contributors.trainingLoad.value} AU is {currentAthlete.contributors.trainingLoad.status}. Autonomic signals suggest sleep patterns are {currentAthlete.contributors.sleep.status}.
          </CardDescription>
        </Card>
      </section>
    </DashboardSectionPage>
  );
}
