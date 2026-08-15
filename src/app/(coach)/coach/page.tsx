// Ludis — Coach Dashboard
// Prioritizes: team readiness distribution, active alerts, athlete summaries.
// Dynamically adjusts by theme using centralized system variables.

import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { AlertCard } from '@/components/shared/alert-card';
import { getTeamSummaries, getAthletesWithAlerts } from '@/lib/services/data-service';
import type { StatusSeverity } from '@/lib/types';
import Link from 'next/link';

function getReadinessSeverity(score: number): StatusSeverity {
  if (score >= 75) return 'positive';
  if (score >= 55) return 'warning';
  return 'risk';
}

export default function CoachDashboard() {
  const teamSummaries = getTeamSummaries();
  const athletesWithAlerts = getAthletesWithAlerts();

  // Readiness distribution
  const readinessGroups = {
    high: teamSummaries.filter((a) => a.readinessScore >= 75).length,
    moderate: teamSummaries.filter((a) => a.readinessScore >= 55 && a.readinessScore < 75).length,
    low: teamSummaries.filter((a) => a.readinessScore < 55).length,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 select-none">
      <PageHeader
        title="Team Overview"
        subtitle={`${teamSummaries.length} athletes • ${athletesWithAlerts.length} need attention`}
        section="Coach Dashboard"
      />

      {/* ── Team Readiness Groups (Neutral cards with semantic indicators) ── */}
      <section>
        <h2 className="ludis-section-title mb-4">Team Readiness</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="card-depth-1 p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-foreground font-sans tracking-tight">
                {readinessGroups.high}
              </span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                <span className="text-xs font-medium text-foreground-secondary">High Readiness</span>
              </div>
            </div>
          </Card>

          <Card className="card-depth-1 p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-foreground font-sans tracking-tight">
                {readinessGroups.moderate}
              </span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="h-2 w-2 rounded-full bg-warning" aria-hidden="true" />
                <span className="text-xs font-medium text-foreground-secondary">Moderate</span>
              </div>
            </div>
          </Card>

          <Card className="card-depth-1 p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-foreground font-sans tracking-tight">
                {readinessGroups.low}
              </span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="h-2 w-2 rounded-full bg-danger" aria-hidden="true" />
                <span className="text-xs font-medium text-foreground-secondary">Needs Attention</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ── Alerts — WHO needs attention? ── */}
      {athletesWithAlerts.length > 0 && (
        <section>
          <h2 className="ludis-section-title mb-4">Active Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {athletesWithAlerts.map((a) => (
              <AlertCard
                key={a.athleteId}
                severity="warning"
                title={a.name}
                message={a.alertMessage ?? ''}
                actionLabel="View details"
                actionUrl={`/coach/athletes/${a.athleteId}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Athlete summaries ── */}
      <section>
        <h2 className="ludis-section-title mb-4">Athlete Summaries</h2>
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
                  <div className="hidden sm:flex gap-4">
                    <span className="text-xs text-foreground-secondary">
                      Recovery: <span className="font-semibold text-foreground capitalize">{a.recoveryLevel}</span>
                    </span>
                    <span className="text-xs text-foreground-secondary">
                      Fatigue: <span className="font-semibold text-foreground capitalize">{a.fatigueLevel}</span>
                    </span>
                  </div>
                  <StatusBadge
                    status={getReadinessSeverity(a.readinessScore)}
                    label={`${a.readinessScore}%`}
                    size="sm"
                  />
                  {a.hasAlert && (
                    <div className="h-2.5 w-2.5 rounded-full bg-danger" title="Active Alert" />
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
