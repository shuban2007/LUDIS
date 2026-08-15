// Ludis — Coach Dashboard
// Prioritizes: team readiness distribution, active alerts, athlete summaries.
// Dynamically adjusts by theme using centralized system variables.
// Incorporates premium, staggered Framer Motion entrance fades and slide transitions.

'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { AlertCard } from '@/components/shared/alert-card';
import { useDemo } from '@/lib/demo/demo-context';
import type { StatusSeverity } from '@/lib/types';
import Link from 'next/link';

function getReadinessSeverity(score: number): StatusSeverity {
  if (score >= 75) return 'positive';
  if (score >= 55) return 'warning';
  return 'risk';
}

export default function CoachDashboard() {
  const { athletes } = useDemo();
  const prefersReduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<'high' | 'moderate' | 'attention' | null>(null);

  // Compute team summaries dynamically from centralized athletes store
  const teamSummaries = athletes.map((a) => {
    // Alert flags
    const isHighFatigue = a.fatigue.level === 'High' || a.fatigue.level === 'Very High';
    const isLowRecovery = a.recovery.score < 55;
    const isLowReadiness = a.readiness.score < 55;

    const hasAlert = isHighFatigue || isLowRecovery || isLowReadiness;
    let alertMessage = '';
    if (isHighFatigue) {
      alertMessage = 'Elevated fatigue indicators — workload/recovery pattern warrants attention';
    } else if (isLowRecovery) {
      alertMessage = 'Low recovery score — requires deload or rest session';
    } else if (isLowReadiness) {
      alertMessage = 'Readiness score below target baseline — monitor workout intensity';
    }

    return {
      athleteId: a.id,
      name: `${a.profile.firstName} ${a.profile.lastName}`,
      sport: a.profile.sport,
      readinessScore: a.readiness.score,
      recoveryLevel: a.recovery.status,
      fatigueLevel: a.fatigue.level,
      hasAlert,
      alertMessage,
    };
  });

  const athletesWithAlerts = teamSummaries.filter((a) => a.hasAlert);

  // Readiness distribution counts derived dynamically
  const highCount = teamSummaries.filter((a) => a.readinessScore >= 75).length;
  const moderateCount = teamSummaries.filter((a) => a.readinessScore >= 55 && a.readinessScore < 75).length;
  const attentionCount = teamSummaries.filter((a) => a.readinessScore < 55).length;

  // Filter athlete summaries based on activeFilter
  const filteredSummaries = teamSummaries.filter((a) => {
    if (!activeFilter) return true;
    if (activeFilter === 'high') return a.readinessScore >= 75;
    if (activeFilter === 'moderate') return a.readinessScore >= 55 && a.readinessScore < 75;
    if (activeFilter === 'attention') return a.readinessScore < 55;
    return true;
  });

  // Staggered parent-child animation container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // 80ms stagger
        delayChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div 
      variants={prefersReduced ? {} : containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-8 select-none"
    >
      <motion.div variants={prefersReduced ? {} : itemVariants}>
        <PageHeader
          title="Team Overview"
          subtitle={`${teamSummaries.length} athletes • ${athletesWithAlerts.length} need attention`}
          section="Coach Dashboard"
        />
      </motion.div>

      {/* ── Team Readiness Groups (Neutral cards with semantic indicators) ── */}
      <motion.section variants={prefersReduced ? {} : itemVariants}>
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="ludis-section-title">Team Readiness</h2>
          {activeFilter && (
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className="text-[10px] font-bold text-danger hover:underline cursor-pointer uppercase tracking-wider"
            >
              Clear Filter ×
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* High Readiness card */}
          <button
            type="button"
            onClick={() => setActiveFilter(activeFilter === 'high' ? null : 'high')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl w-full"
          >
            <Card
              interactive
              className={`p-6 border transition-all duration-200 cursor-pointer ${
                activeFilter === 'high'
                  ? 'border-brand bg-brand-soft/20 shadow-sm'
                  : 'card-depth-1 border-transparent'
              }`}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-foreground font-sans tracking-tight">
                  {highCount}
                </span>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                  <span className="text-xs font-semibold text-foreground-secondary">High Readiness</span>
                </div>
              </div>
            </Card>
          </button>

          {/* Moderate card */}
          <button
            type="button"
            onClick={() => setActiveFilter(activeFilter === 'moderate' ? null : 'moderate')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl w-full"
          >
            <Card
              interactive
              className={`p-6 border transition-all duration-200 cursor-pointer ${
                activeFilter === 'moderate'
                  ? 'border-brand bg-brand-soft/20 shadow-sm'
                  : 'card-depth-1 border-transparent'
              }`}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-foreground font-sans tracking-tight">
                  {moderateCount}
                </span>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="h-2 w-2 rounded-full bg-warning" aria-hidden="true" />
                  <span className="text-xs font-semibold text-foreground-secondary">Moderate</span>
                </div>
              </div>
            </Card>
          </button>

          {/* Needs Attention card */}
          <button
            type="button"
            onClick={() => setActiveFilter(activeFilter === 'attention' ? null : 'attention')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl w-full"
          >
            <Card
              interactive
              className={`p-6 border transition-all duration-200 cursor-pointer ${
                activeFilter === 'attention'
                  ? 'border-brand bg-brand-soft/20 shadow-sm'
                  : 'card-depth-1 border-transparent'
              }`}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-foreground font-sans tracking-tight">
                  {attentionCount}
                </span>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="h-2 w-2 rounded-full bg-danger" aria-hidden="true" />
                  <span className="text-xs font-semibold text-foreground-secondary">Needs Attention</span>
                </div>
              </div>
            </Card>
          </button>
        </div>
      </motion.section>

      {/* ── Alerts — WHO needs attention? ── */}
      {athletesWithAlerts.length > 0 && (
        <motion.section variants={prefersReduced ? {} : itemVariants}>
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
        </motion.section>
      )}

      {/* ── Athlete summaries ── */}
      <motion.section variants={prefersReduced ? {} : itemVariants}>
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="ludis-section-title">Athlete Summaries</h2>
          {activeFilter && (
            <span className="text-xs font-semibold text-foreground-secondary">
              Showing: <span className="font-bold text-brand capitalize">{activeFilter === 'attention' ? 'Needs Attention' : activeFilter}</span>
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {filteredSummaries.map((a) => (
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
      </motion.section>
    </motion.div>
  );
}
