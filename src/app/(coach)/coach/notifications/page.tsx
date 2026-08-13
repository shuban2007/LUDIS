import { PageHeader } from '@/components/ui/page-header';
import { AlertCard } from '@/components/shared/alert-card';

export default function CoachNotificationsPage() {
  return (
    <div className="max-w-5xl">
      <PageHeader title="Notifications" section="Notifications" />
      <div className="space-y-3">
        <AlertCard severity="warning" title="James Okafor" message="Elevated fatigue indicators — workload/recovery pattern warrants attention" actionLabel="View athlete" actionUrl="/coach/athletes/ath-002" />
        <AlertCard severity="risk" title="Liam Torres" message="Recovery is below recent baseline — rest recommended" actionLabel="View athlete" actionUrl="/coach/athletes/ath-004" />
        <AlertCard severity="info" title="New Permission Request" message="Aisha Patel has accepted your coaching invitation." />
      </div>
    </div>
  );
}
