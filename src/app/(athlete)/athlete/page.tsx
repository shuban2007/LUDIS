// Ludis — Athlete Dashboard
// Hierarchy: CURRENT STATE → WHY → WHAT NOW
// PPI, Recovery, Fatigue, Readiness → Contributing Factors → Today's Recommendation → Alerts

import { PageHeader } from '@/components/ui/page-header';
import { MetricCard } from '@/components/shared/metric-card';
import { FactorBreakdown } from '@/components/shared/factor-breakdown';
import { ConfidenceIndicator } from '@/components/shared/confidence-indicator';
import { RecommendationCard } from '@/components/shared/recommendation-card';
import { AlertCard } from '@/components/shared/alert-card';
import { TrendChart } from '@/components/shared/trend-chart';
import { EventCard } from '@/components/shared/event-card';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  getCurrentAthlete,
  getPPI,
  getReadiness,
  getRecoveryStatus,
  getFatigueRisk,
  getTopRecommendation,
  getUpcomingEvent,
  getEnvironmentalContext,
  getNotifications,
} from '@/lib/services/data-service';
import { formatRelativeDate } from '@/lib/utils';
import type { StatusSeverity } from '@/lib/types';

function getReadinessSeverity(score: number): StatusSeverity {
  if (score >= 75) return 'positive';
  if (score >= 55) return 'warning';
  return 'risk';
}

function getRecoverySeverity(level: string): StatusSeverity {
  if (level === 'optimal' || level === 'good') return 'positive';
  if (level === 'moderate') return 'warning';
  return 'risk';
}

function getFatigueSeverity(status: string): StatusSeverity {
  if (status === 'low') return 'positive';
  if (status === 'moderate') return 'warning';
  return 'risk';
}

export default function AthleteDashboard() {
  const athlete = getCurrentAthlete();
  const ppi = getPPI(athlete.id);
  const readiness = getReadiness(athlete.id);
  const recovery = getRecoveryStatus(athlete.id);
  const fatigue = getFatigueRisk(athlete.id);
  const recommendation = getTopRecommendation();
  const upcomingEvent = getUpcomingEvent(athlete.id);
  const envContext = upcomingEvent?.environmentalContextId
    ? getEnvironmentalContext(upcomingEvent.environmentalContextId)
    : undefined;
  const alerts = getNotifications(athlete.userId)
    .filter((n) => !n.read && n.severity !== 'info')
    .slice(0, 3);

  return (
    <div className="max-w-4xl">
      {/* ── Greeting & Context ── */}
      <PageHeader
        title={`Welcome back, ${athlete.name.split(' ')[0]}`}
        subtitle={
          upcomingEvent
            ? `${upcomingEvent.title} — ${formatRelativeDate(upcomingEvent.date)}`
            : 'Your performance overview'
        }
        actions={
          <StatusBadge
            status={getReadinessSeverity(readiness.score)}
            label={`Readiness: ${readiness.label}`}
          />
        }
      />

      {/* ── SECTION 1: CURRENT STATE ── */}
      <section aria-label="Current state">
        <h2 className="ludis-section-title mb-3">Current State</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard
            label="PPI"
            value={ppi.score}
            unit="pts"
            maxValue={ppi.maxScore}
            baselineValue={ppi.score - ppi.deviation}
            deviation={ppi.deviation}
            deviationDirection={ppi.direction}
            trend={ppi.trend.direction}
            primary
          />
          <MetricCard
            label="Recovery"
            value={recovery.score}
            unit="pts"
            maxValue={recovery.maxScore}
            trend={recovery.trend.direction}
          />
          <MetricCard
            label="Fatigue"
            value={fatigue.trend.points[fatigue.trend.points.length - 1]?.value ?? 0}
            unit=""
            trend={fatigue.trend.direction}
          />
          <MetricCard
            label="Readiness"
            value={readiness.score}
            unit="pts"
            maxValue={readiness.maxScore}
          />
        </div>

        {/* Status summary row */}
        <div className="mt-3 flex flex-wrap gap-2">
          <StatusBadge
            status={getRecoverySeverity(recovery.level)}
            label={`Recovery: ${recovery.level}`}
            size="sm"
          />
          <StatusBadge
            status={getFatigueSeverity(fatigue.status)}
            label={fatigue.statusLabel}
            size="sm"
          />
        </div>
      </section>

      {/* ── SECTION 2: RECENT TREND ── */}
      <section aria-label="Performance trend" className="mt-8">
        <h2 className="ludis-section-title mb-3">Recent Trend</h2>
        <div className="ludis-card">
          <TrendChart
            trend={ppi.trend}
            baselineValue={ppi.score - ppi.deviation}
            label="Performance Index"
            unit="pts"
          />
        </div>
      </section>

      {/* ── SECTION 3: WHY — Contributing Factors + Confidence ── */}
      <section aria-label="Contributing factors" className="mt-8">
        <h2 className="ludis-section-title mb-3">Why This State</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="ludis-card">
            <FactorBreakdown
              factors={[...ppi.contributingFactors, ...recovery.contributingFactors.slice(0, 2)]}
              title="Key Contributing Factors"
            />
          </div>
          <div className="space-y-3">
            <ConfidenceIndicator confidence={ppi.confidence} />
            <ConfidenceIndicator confidence={recovery.confidence} />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHAT NOW — Recommendation ── */}
      <section aria-label="Today's recommendation" className="mt-8">
        <h2 className="ludis-section-title mb-3">{"Today's Recommendation"}</h2>
        <RecommendationCard recommendation={recommendation} expanded />
      </section>

      {/* ── SECTION 5: Upcoming Event Context ── */}
      {upcomingEvent && (
        <section aria-label="Upcoming event" className="mt-8">
          <h2 className="ludis-section-title mb-3">Upcoming Event</h2>
          <EventCard event={upcomingEvent} environmentalContext={envContext} />
        </section>
      )}

      {/* ── SECTION 6: Alerts (only meaningful ones) ── */}
      {alerts.length > 0 && (
        <section aria-label="Alerts" className="mt-8">
          <h2 className="ludis-section-title mb-3">Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                severity={alert.severity}
                title={alert.title}
                message={alert.message}
                actionLabel="View details"
                actionUrl={alert.actionUrl}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
