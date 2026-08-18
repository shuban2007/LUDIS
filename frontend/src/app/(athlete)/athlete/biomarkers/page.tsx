'use client';

import { DashboardSectionPage } from '@/components/dashboard/dashboard-section-page';
import { BiomarkerLab } from '@/components/athlete/biomarker-lab';

export default function BiomarkersPage() {
  return (
    <DashboardSectionPage
      title="Biomarker Lab"
      subtitle="Detailed point-of-care biomaterial assays and surveillance."
      sectionName="Biomarkers"
      metricLabel="Lab Status"
      metricValue="Ready"
      metricStatus="Optimal"
      metricDescription="System connected"
      backHref="/athlete"
    >
      <BiomarkerLab />
    </DashboardSectionPage>
  );
}
