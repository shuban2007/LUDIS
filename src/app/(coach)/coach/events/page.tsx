import { PageHeader } from '@/components/ui/page-header';
import { EventCard } from '@/components/shared/event-card';
import { mockEvents, mockEnvironments } from '@/lib/mock';

export default function CoachEventsPage() {
  return (
    <div className="max-w-5xl">
      <PageHeader title="Events" subtitle="Team events and competitions" section="Events" />
      <div className="space-y-4">
        {mockEvents.map((event) => {
          const env = mockEnvironments.find((e) => e.eventId === event.id);
          return <EventCard key={event.id} event={event} environmentalContext={env} />;
        })}
      </div>
    </div>
  );
}
