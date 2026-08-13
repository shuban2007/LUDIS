// Ludis — Coach Athletes List
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { getTeamSummaries } from '@/lib/services/data-service';
import type { StatusSeverity } from '@/lib/types';
import Link from 'next/link';

function getReadinessSeverity(score: number): StatusSeverity {
  if (score >= 75) return 'positive';
  if (score >= 55) return 'warning';
  return 'risk';
}

export default function CoachAthletesPage() {
  const athletes = getTeamSummaries();

  return (
    <div className="max-w-5xl">
      <PageHeader title="Athletes" subtitle={`${athletes.length} athletes`} section="Athletes" />
      <div className="space-y-2">
        {athletes.map((a) => (
          <Link key={a.athleteId} href={`/coach/athletes/${a.athleteId}`}>
            <Card interactive className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-surface-overlay flex items-center justify-center text-sm font-semibold text-text-secondary">{a.name.charAt(0)}</div>
                <div>
                  <span className="text-sm font-medium text-text-primary">{a.name}</span>
                  <p className="text-xs text-text-muted">{a.sport}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={getReadinessSeverity(a.readinessScore)} label={`${a.readinessScore}%`} size="sm" />
                {a.hasAlert && <div className="h-2 w-2 rounded-full bg-status-risk" title="Alert" />}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
