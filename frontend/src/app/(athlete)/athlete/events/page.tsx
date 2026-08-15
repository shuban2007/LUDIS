'use client';

import { useDemo } from '@/lib/demo/demo-context';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { EventsIcon, ClockIcon } from '@/components/ui/icons';
import Link from 'next/link';

export default function EventsPage() {
  const { getCurrentAthlete } = useDemo();
  const currentAthlete = getCurrentAthlete();

  return (
    <div className="max-w-4xl space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Events & Competitions"
          subtitle="Your scheduled training sessions and competitions"
          section="Events"
        />
        <Link
          href="/athlete"
          className="inline-flex items-center justify-center text-xs font-semibold px-3 py-1.5 border border-border-default rounded-lg hover:bg-surface-2 transition-colors uppercase self-start sm:self-auto cursor-pointer"
        >
          &lt; Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Today's Training Event */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-extrabold tracking-widest text-brand uppercase">
              TODAY&apos;S WORKOUT
            </div>
            <h3 className="text-xl font-medium text-foreground mt-2">
              {currentAthlete.session.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-foreground-secondary mt-1">
              <ClockIcon className="w-3.5 h-3.5 text-foreground-muted" />
              <span>{currentAthlete.session.time} · {currentAthlete.session.duration}</span>
            </div>
            <p className="text-xs text-foreground-muted mt-3">
              Focus: {currentAthlete.session.focus}
            </p>
          </div>
          <div className="text-xs font-semibold text-brand bg-brand-soft/20 px-2.5 py-1.5 rounded-lg border border-border-subtle mt-4 text-center">
            {currentAthlete.session.type}
          </div>
        </Card>

        {/* Competition Event */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-extrabold tracking-widest text-brand uppercase">
              UPCOMING COMPETITION
            </div>
            <h3 className="text-xl font-medium text-foreground mt-2">
              {currentAthlete.competition.opponent}
            </h3>
            <div className="flex items-center gap-2 text-xs text-foreground-secondary mt-1">
              <EventsIcon className="w-3.5 h-3.5 text-foreground-muted" />
              <span>{currentAthlete.competition.date} · {currentAthlete.competition.time}</span>
            </div>
          </div>
          <div className="text-xs font-semibold text-foreground-secondary bg-surface-2 px-2.5 py-1.5 rounded-lg border border-border-subtle mt-4 text-center">
            National Level Competition
          </div>
        </Card>
      </div>
    </div>
  );
}
