'use client';

// Ludis — Coach Team Card Component
import type { Team } from '@/lib/types/team';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

interface TeamCardProps {
  team: Team;
  metrics: {
    total: number;
    averageReadiness: number;
  };
}

export function TeamCard({ team, metrics }: TeamCardProps) {
  return (
    <Link href={`/coach/teams/${team.id}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl block">
      <Card
        interactive
        className="p-5 flex flex-col justify-between h-36 border border-glass-border hover:border-border-strong hover:-translate-y-0.5 transition-all duration-200"
      >
        <div className="flex items-start justify-between">
          <div className="text-left">
            <CardTitle>{team.name}</CardTitle>
            <CardDescription>
              {metrics.total} {metrics.total === 1 ? 'athlete' : 'athletes'} active • {team.sport}
            </CardDescription>
          </div>
          <StatusBadge
            status={team.status === 'active' ? 'positive' : 'info'}
            label={team.status === 'active' ? 'Active' : 'Archived'}
            size="sm"
          />
        </div>
        <div className="text-xs text-foreground-muted border-t border-border-subtle pt-3 text-left">
          Team readiness average:{' '}
          <span className="font-semibold text-brand">{metrics.averageReadiness}%</span>
        </div>
      </Card>
    </Link>
  );
}
