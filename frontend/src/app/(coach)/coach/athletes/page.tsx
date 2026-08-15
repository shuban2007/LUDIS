'use client';

// Ludis — Coach Athletes List
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { useDemo } from '@/lib/demo/demo-context';
import type { StatusSeverity } from '@/lib/types';
import Link from 'next/link';

function getReadinessSeverity(score: number): StatusSeverity {
  if (score >= 75) return 'positive';
  if (score >= 55) return 'warning';
  return 'risk';
}

export default function CoachAthletesPage() {
  const { athletes } = useDemo();

  // Compute metrics dynamically from the athletes context
  const teamSummaries = athletes.map((a) => {
    const hasAlert = a.recovery.score < 70 || a.fatigue.level === 'High';
    return {
      athleteId: a.id,
      name: `${a.profile.firstName} ${a.profile.lastName}`,
      sport: a.profile.sport,
      readinessScore: a.readiness.score,
      hasAlert,
    };
  });

  return (
    <div className="max-w-5xl space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Athletes Roster" subtitle={`${teamSummaries.length} athletes enrolled`} section="Athletes" />
        <Link
          href="/coach"
          className="inline-flex items-center justify-center text-xs font-semibold px-3 py-1.5 border border-border-default rounded-lg hover:bg-surface-2 transition-colors uppercase self-start sm:self-auto cursor-pointer"
        >
          &lt; Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {teamSummaries.map((a) => (
          <Link key={a.athleteId} href={`/coach/athletes/${a.athleteId}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl">
            <Card interactive className="card-depth-1 hover:border-border-strong flex items-center justify-between p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-surface-2 flex items-center justify-center text-sm font-semibold text-foreground-secondary shrink-0">
                  {a.name.charAt(0)}
                </div>
                <div className="text-left">
                  <span className="text-sm font-semibold text-foreground">{a.name}</span>
                  <p className="text-xs text-foreground-secondary">{a.sport}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={getReadinessSeverity(a.readinessScore)} label={`${a.readinessScore}%`} size="sm" />
                {a.hasAlert && <div className="h-2.5 w-2.5 rounded-full bg-danger animate-pulse" title="Alert" />}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
