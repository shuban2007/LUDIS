'use client';

// Ludis — Coach Teams Page
// Lists all active coaching groups, calculates team readiness average dynamically, and links to details.
import { useDemo } from '@/lib/demo/demo-context';
import { PageHeader } from '@/components/ui/page-header';
import { TeamCard } from '@/components/coach/teams/team-card';
import Link from 'next/link';

export default function TeamsPage() {
  const { teams, calculateTeamMetrics } = useDemo();

  // Active teams filter
  const activeTeams = teams.filter((t) => t.status === 'active');

  return (
    <div className="max-w-5xl space-y-6 select-none mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Teams Management"
          subtitle="Manage coaching groups"
          section="Teams"
        />
        <div className="flex gap-2.5 self-start sm:self-auto shrink-0">
          <Link
            href="/coach/teams/create"
            className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider flex items-center gap-1.5"
          >
            + Create Team
          </Link>
          <Link
            href="/coach"
            className="inline-flex items-center justify-center text-xs font-semibold px-3 py-1.5 border border-border-default rounded-lg hover:bg-surface-2 transition-colors uppercase cursor-pointer text-foreground"
          >
            &lt; Dashboard
          </Link>
        </div>
      </div>

      {activeTeams.length === 0 ? (
        <div className="p-8 border border-dashed border-border-default rounded-2xl text-center space-y-3 max-w-md mx-auto">
          <h3 className="text-sm font-bold text-foreground">No teams yet</h3>
          <p className="text-xs text-foreground-secondary">
            Create your first coaching group to start managing athletes.
          </p>
          <Link
            href="/coach/teams/create"
            className="inline-flex bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-5 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider mt-2"
          >
            Create Team
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTeams.map((team) => {
            const metrics = calculateTeamMetrics(team.athleteIds);
            return (
              <TeamCard
                key={team.id}
                team={team}
                metrics={metrics}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
