'use client';

import { DashboardSectionPage } from '@/components/dashboard/dashboard-section-page';
import { WearableManager } from '@/components/athlete/wearable-manager';

export default function WearablesPage() {
  return (
    <DashboardSectionPage
      title="Wearables"
      subtitle="Manage connected devices and sensors."
      sectionName="Wearables"
      metricLabel="Sensors"
      metricValue="6"
      metricStatus="Optimal"
      metricDescription="Available sources"
      backHref="/athlete"
    >
      <WearableManager />
    </DashboardSectionPage>
  );
}
