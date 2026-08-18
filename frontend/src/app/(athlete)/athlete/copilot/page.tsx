'use client';

import { DashboardSectionPage } from '@/components/dashboard/dashboard-section-page';
import { useDemo } from '@/lib/demo/demo-context';
import { PhysioCopilot } from '@/components/athlete/physio-copilot';

export default function CopilotPage() {
  const { getCurrentAthlete } = useDemo();
  const currentAthlete = getCurrentAthlete();

  return (
    <DashboardSectionPage
      title="AI Physio Copilot"
      description="Conversational AI interface for personalized recovery and injury advice."
      sectionName="Copilot"
      athlete={currentAthlete}
      lastSynced="Just now"
    >
      <PhysioCopilot />
    </DashboardSectionPage>
  );
}
