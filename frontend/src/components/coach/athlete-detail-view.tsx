'use client';

// Ludis — Coach Athlete Detail View Component
import React from 'react';
import type { AthleteData } from '@/data/demo/demo-data';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { MetricCard } from '@/components/shared/metric-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { DashboardTrendChart } from '@/components/athlete/dashboard-trend-chart';
import { capitalize } from '@/lib/utils';
import type { StatusSeverity } from '@/lib/types';
import Link from 'next/link';

function getReadinessSeverity(score: number): StatusSeverity {
  if (score >= 75) return 'positive';
  if (score >= 55) return 'warning';
  return 'risk';
}

interface AthleteDetailViewProps {
  athlete: AthleteData;
}

export function AthleteDetailView({ athlete }: AthleteDetailViewProps) {
  const fullName = `${athlete.profile.firstName} ${athlete.profile.lastName}`;

  return (
    <div className="space-y-6 text-left">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {fullName}
          </h1>
          <p className="text-sm text-foreground-secondary mt-1">
            {capitalize(athlete.profile.sport)} • Age {athlete.profile.age}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge
            status={getReadinessSeverity(athlete.readiness.score)}
            label={`Readiness: ${athlete.readiness.status}`}
          />
          <Link
            href="/coach"
            className="inline-flex items-center justify-center text-xs font-semibold px-3.5 py-1.5 border border-border-default rounded-lg hover:bg-surface-2 transition-colors uppercase cursor-pointer"
          >
            &lt; Back
          </Link>
        </div>
      </div>

      {/* Permission notice */}
      <Card className="border-border-subtle bg-surface-2/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-xs text-foreground-muted">
            You are viewing data that this athlete has permitted you to access.
            Data visibility is controlled by the athlete.
          </p>
          <div className="flex items-center gap-4 text-xs shrink-0 font-mono font-semibold text-foreground">
            <span>Height: {athlete.profile.height ?? 172} cm</span>
            <span>Weight: {athlete.profile.weight ?? 62} kg</span>
          </div>
        </div>
      </Card>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Performance"
          value={athlete.performance.score}
          unit="pts"
          maxValue={100}
          deviation={athlete.performance.score - athlete.performance.baseline.min}
          deviationDirection={athlete.performance.score >= athlete.performance.baseline.min ? 'above' : 'below'}
          trend="improving"
        />
        <MetricCard
          label="Recovery"
          value={athlete.recovery.score}
          unit="pts"
          maxValue={100}
          trend="stable"
        />
        <MetricCard
          label="Fatigue Load"
          value={athlete.contributors.trainingLoad.value}
          unit="AU"
          maxValue={1000}
          trend="stable"
        />
        <MetricCard
          label="Readiness Score"
          value={athlete.readiness.score}
          unit="pts"
          maxValue={100}
        />
      </div>

      {/* Performance trend chart */}
      <Card className="p-6">
        <CardTitle>Performance Trend</CardTitle>
        <div className="mt-4">
          <DashboardTrendChart
            trend={athlete.performance.history}
            baselineMin={athlete.performance.baseline.min}
            baselineMax={athlete.performance.baseline.max}
          />
        </div>
      </Card>

      {/* Health & Recovery Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* HRV */}
        <Card className="p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">HRV Baseline</span>
            <h4 className="text-2xl font-bold font-sans text-foreground mt-2">
              {athlete.contributors.hrv.value} <span className="text-xs text-foreground-muted">{athlete.contributors.hrv.unit}</span>
            </h4>
          </div>
          <span className="text-xs text-brand font-semibold mt-3 capitalize">{athlete.contributors.hrv.status}</span>
        </Card>

        {/* Sleep */}
        <Card className="p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">Sleep Log</span>
            <h4 className="text-2xl font-bold font-sans text-foreground mt-2">
              {athlete.contributors.sleep.value}
            </h4>
          </div>
          <span className="text-xs text-brand font-semibold mt-3 capitalize">{athlete.contributors.sleep.status}</span>
        </Card>

        {/* Training Load */}
        <Card className="p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">Workload Stimulus</span>
            <h4 className="text-2xl font-bold font-sans text-foreground mt-2">
              {athlete.contributors.trainingLoad.value} <span className="text-xs text-foreground-muted">{athlete.contributors.trainingLoad.unit}</span>
            </h4>
          </div>
          <span className="text-xs text-brand font-semibold mt-3 capitalize">{athlete.contributors.trainingLoad.status}</span>
        </Card>
      </div>

      {/* Recent recommendations */}
      <section className="space-y-3">
        <h2 className="ludis-section-title">Today&apos;s Training Recommendation</h2>
        <Card className="p-5 border-l-4 border-l-brand">
          <CardTitle>{athlete.recommendation.title}</CardTitle>
          <CardDescription>
            {athlete.recommendation.description}
          </CardDescription>
          <div className="mt-4 text-xs font-semibold text-brand">
            {athlete.recommendation.confidence}
          </div>
        </Card>
      </section>
    </div>
  );
}
