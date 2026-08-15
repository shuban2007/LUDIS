'use client';

// Ludis — Coach Events Page
import { useDemo } from '@/lib/demo/demo-context';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { EventsIcon } from '@/components/ui/icons';
import Link from 'next/link';

export default function CoachEventsPage() {
  const { athletes } = useDemo();

  return (
    <div className="max-w-5xl space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Competitions & Training Schedules" subtitle="Upcoming team event schedules" section="Events" />
        <Link
          href="/coach"
          className="inline-flex items-center justify-center text-xs font-semibold px-3 py-1.5 border border-border-default rounded-lg hover:bg-surface-2 transition-colors uppercase self-start sm:self-auto cursor-pointer"
        >
          &lt; Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {athletes.map((a) => (
          <Card key={a.id} className="p-5 flex flex-col justify-between">
            <div className="text-left">
              <span className="text-[10px] font-extrabold tracking-widest text-brand uppercase">
                {a.profile.firstName} {a.profile.lastName} · {a.profile.sport}
              </span>
              <h3 className="text-lg font-bold text-foreground mt-2">
                {a.competition.opponent}
              </h3>
              <div className="flex items-center gap-2 text-xs text-foreground-secondary mt-1">
                <EventsIcon className="w-3.5 h-3.5 text-foreground-muted" />
                <span>{a.competition.date} · {a.competition.time}</span>
              </div>
            </div>
            
            <div className="border-t border-border-subtle my-3 pt-3 flex justify-between items-center text-xs">
              <span className="text-foreground-muted">Scheduled Training:</span>
              <span className="font-semibold text-foreground">{a.session.title} ({a.session.duration})</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
