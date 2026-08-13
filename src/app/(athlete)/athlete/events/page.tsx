// Ludis — Events Page
// Event list with competition context and environmental data.

import { PageHeader } from '@/components/ui/page-header';
import { EventCard } from '@/components/shared/event-card';
import { getCurrentAthlete, getEvents, getEnvironmentalContext } from '@/lib/services/data-service';

export default function EventsPage() {
  const athlete = getCurrentAthlete();
  const events = getEvents(athlete.id);

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Events & Competitions"
        subtitle="Upcoming events with environmental context"
        section="Events"
      />

      <div className="space-y-4">
        {events.map((event) => {
          const envContext = event.environmentalContextId
            ? getEnvironmentalContext(event.environmentalContextId)
            : undefined;
          return (
            <EventCard key={event.id} event={event} environmentalContext={envContext} />
          );
        })}
      </div>
    </div>
  );
}
