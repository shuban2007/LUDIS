'use client';

// Ludis — Coach Team Athlete Roster Row Component
import type { AthleteData } from '@/data/demo/demo-data';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import type { StatusSeverity } from '@/lib/types';
import Link from 'next/link';

function getReadinessSeverity(score: number): StatusSeverity {
  if (score >= 75) return 'positive';
  if (score >= 55) return 'warning';
  return 'risk';
}

interface AthleteRosterRowProps {
  athlete: AthleteData;
  onRemoveClick: (athleteId: string, name: string) => void;
}

export function AthleteRosterRow({ athlete, onRemoveClick }: AthleteRosterRowProps) {
  const fullName = `${athlete.profile.firstName} ${athlete.profile.lastName}`;
  const initial = athlete.profile.firstName.charAt(0);

  return (
    <Card className="card-depth-1 border border-glass-border hover:border-border-strong flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 text-left transition-all">
      <Link
        href={`/coach/athletes/${athlete.id}`}
        className="flex items-center gap-3 flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg cursor-pointer"
      >
        <div className="h-9 w-9 rounded-full bg-surface-2 border border-border-subtle flex items-center justify-center text-sm font-semibold text-foreground-secondary shrink-0">
          {initial}
        </div>
        <div>
          <span className="text-sm font-semibold text-foreground hover:text-brand transition-colors">
            {fullName}
          </span>
          <p className="text-xs text-foreground-secondary mt-0.5">{athlete.profile.sport}</p>
        </div>
      </Link>

      <div className="flex items-center justify-between sm:justify-end gap-5">
        {/* Dynamic metrics */}
        <div className="flex items-center gap-4 text-xs">
          <span className="text-foreground-secondary">
            Recovery: <span className="font-semibold text-foreground capitalize">{athlete.recovery.status}</span>
          </span>
          <span className="text-foreground-secondary">
            Fatigue: <span className="font-semibold text-foreground capitalize">{athlete.fatigue.level}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <StatusBadge
            status={getReadinessSeverity(athlete.readiness.score)}
            label={`${athlete.readiness.score}%`}
            size="sm"
          />

          <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded border border-success/20 uppercase tracking-wider">
            Active
          </span>

          <button
            type="button"
            onClick={() => onRemoveClick(athlete.id, fullName)}
            className="text-[10px] font-bold px-2 py-1 bg-surface-3 hover:bg-danger/10 hover:text-danger text-foreground-muted rounded transition-colors border border-border-default hover:border-danger/30 uppercase cursor-pointer"
            title="Remove from team"
          >
            Remove
          </button>
        </div>
      </div>
    </Card>
  );
}
