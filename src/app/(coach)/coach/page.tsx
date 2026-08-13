// Ludis — Coach Dashboard
// Answers: WHO needs attention? WHY? WHAT changed? HOW confident? WHAT to do?
// Prioritizes: readiness distribution, alerts, meaningful changes, athlete summaries.

import { PageHeader } from '@/components/ui/page-header';
import { Card, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { AlertCard } from '@/components/shared/alert-card';
import { ConfidenceIndicator } from '@/components/shared/confidence-indicator';
import { getTeamSummaries, getAthletesWithAlerts } from '@/lib/services/data-service';
import { capitalize } from '@/lib/utils';
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
    <div className="max-w-5xl">
      <PageHeader
        title="Team Overview"
        subtitle={`${teamSummaries.length} athletes • ${athletesWithAlerts.length} need attention`}
        section="Coach Dashboard"
      />

      {/* ── Readiness distribution ── */}
      <section className="mb-8">
        <h2 className="ludis-section-title mb-3">Team Readiness</h2>
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <div className="text-center">
              <span className="text-2xl font-bold text-status-positive">{readinessGroups.high}</span>
              <p className="text-xs text-text-muted mt-1">High Readiness</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <span className="text-2xl font-bold text-status-warning">{readinessGroups.moderate}</span>
              <p className="text-xs text-text-muted mt-1">Moderate</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <span className="text-2xl font-bold text-status-risk">{readinessGroups.low}</span>
              <p className="text-xs text-text-muted mt-1">Needs Attention</p>
            </div>
          </Card>
        </div>
      </section>

      {/* ── Alerts — WHO needs attention? ── */}
      {athletesWithAlerts.length > 0 && (
        <section className="mb-8">
          <h2 className="ludis-section-title mb-3">Alerts</h2>
          <div className="space-y-3">
            {athletesWithAlerts.map((a) => (
              <AlertCard
                key={a.athleteId}
                severity="warning"
                title={a.name}
                message={a.alertMessage ?? ''}
                actionLabel="View athlete"
                actionUrl={`/coach/athletes/${a.athleteId}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Athlete summaries ── */}
      <section>
        <h2 className="ludis-section-title mb-3">Athlete Summaries</h2>
        <div className="space-y-2">
          {teamSummaries.map((a) => (
            <Link key={a.athleteId} href={`/coach/athletes/${a.athleteId}`}>
              <Card interactive className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-surface-overlay flex items-center justify-center text-sm font-semibold text-text-secondary shrink-0">
                    {a.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-text-primary">{a.name}</span>
                    <p className="text-xs text-text-muted">{a.sport}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge
                    status={getReadinessSeverity(a.readinessScore)}
                    label={`${a.readinessScore}%`}
                    size="sm"
                  />
                  <div className="hidden sm:flex gap-2">
                    <span className="text-[11px] text-text-muted">
                      Recovery: <span className="capitalize">{a.recoveryLevel}</span>
                    </span>
                    <span className="text-[11px] text-text-muted">
                      Fatigue: <span className="capitalize">{a.fatigueLevel}</span>
                    </span>
                  </div>
                  {a.hasAlert && (
                    <div className="h-2 w-2 rounded-full bg-status-risk" title="Has alert" />
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
