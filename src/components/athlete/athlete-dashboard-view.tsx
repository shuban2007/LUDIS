// Ludis — Athlete Dashboard View Component
// Premium sports-telemetry dashboard view styled with centralized CSS tokens.

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useAuth } from '@/lib/auth';
import { getAthleteDashboardData } from '@/lib/services/data-service';
import { DashboardTrendChart } from './dashboard-trend-chart';
import {
  EventsIcon,
  HeartIcon,
  MoonIcon,
  BoltIcon,
  ClockIcon,
} from '@/components/ui/icons';

export function AthleteDashboardView() {
  const { user } = useAuth();
  const data = getAthleteDashboardData();

  // Resolve dynamic athlete name
  const athleteFirstName =
    user?.role === 'athlete' && user?.displayName
      ? user.displayName.split(' ')[0]
      : 'Alex';

  const [trendRange, setTrendRange] = useState('10 days');

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="max-w-[1340px] mx-auto space-y-6 select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. PAGE HEADER
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-foreground tracking-tight">
            Good morning, {athleteFirstName}.
          </h1>
          <p className="text-sm text-foreground-secondary mt-1.5 font-sans">
            Here&apos;s your performance overview for today.
          </p>
        </div>

        {/* Date Selector */}
        <div className="inline-flex items-center gap-3 bg-surface-2 border border-border-default px-3.5 py-2 rounded-lg text-xs font-medium text-foreground-secondary self-start sm:self-auto shadow-sm">
          <EventsIcon className="w-4 h-4 text-foreground-muted shrink-0" />
          <span className="text-foreground">{data.greetingDate}</span>
          <div className="flex items-center gap-1.5 ml-2 text-foreground-muted">
            <button
              type="button"
              className="hover:text-foreground transition-colors cursor-pointer"
              aria-label="Previous day"
            >
              &lt;
            </button>
            <button
              type="button"
              className="hover:text-foreground transition-colors cursor-pointer"
              aria-label="Next day"
            >
              &gt;
            </button>
          </div>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          2. KPI SUMMARY CARD (4 Columns, Glass surface)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.08 }}
        className="rounded-2xl glass-elevated p-6"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-border-subtle">
          {/* READINESS */}
          <div className="lg:pr-6">
            <div className="text-[11px] font-bold tracking-widest text-foreground-muted uppercase">
              READINESS
            </div>
            <div className="text-4xl sm:text-5xl font-bold font-sans text-brand tabular-nums mt-3">
              {data.readiness.score}
            </div>
            <div className="text-lg font-medium text-foreground mt-1.5">
              {data.readiness.status}
            </div>
            <div className="text-xs text-foreground-muted mt-1">
              {data.readiness.comparison}
            </div>
          </div>

          {/* PERFORMANCE */}
          <div className="lg:px-6">
            <div className="text-[11px] font-bold tracking-widest text-foreground-muted uppercase">
              PERFORMANCE
            </div>
            <div className="text-4xl sm:text-5xl font-bold font-sans text-foreground tabular-nums mt-3">
              {data.performance.current}
            </div>
            <div className="text-xs text-foreground-muted mt-2">Personal baseline</div>
            <div className="text-xs text-foreground-secondary mt-0.5 font-mono">
              {data.performance.baselineMin} – {data.performance.baselineMax}
            </div>
          </div>

          {/* RECOVERY */}
          <div className="lg:px-6">
            <div className="text-[11px] font-bold tracking-widest text-foreground-muted uppercase">
              RECOVERY
            </div>
            <div className="text-4xl sm:text-5xl font-bold font-sans text-foreground tabular-nums mt-3">
              {data.recovery.score}
            </div>
            <div className="text-lg font-medium text-brand mt-1.5">
              {data.recovery.status}
            </div>
          </div>

          {/* FATIGUE */}
          <div className="lg:pl-6">
            <div className="text-[11px] font-bold tracking-widest text-foreground-muted uppercase">
              FATIGUE
            </div>
            <div className="text-2xl sm:text-3xl font-medium text-foreground mt-4">
              {data.fatigue.level}
            </div>
            <div className="text-xs text-foreground-muted mt-1.5">
              {data.fatigue.trend}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CONTENT GRID (70% Left / 30% Right Desktop)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── LEFT COLUMN (70% = 8 cols) ── */}
        <div className="lg:col-span-8 space-y-6">
          {/* Performance Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.14 }}
            className="rounded-2xl card-depth-1 p-6 transition-transform duration-300 hover:-translate-y-[2px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold tracking-widest text-foreground uppercase">
                PERFORMANCE TREND
              </h2>

              <div className="relative">
                <select
                  value={trendRange}
                  onChange={(e) => setTrendRange(e.target.value)}
                  className="bg-surface-2 border border-border-default text-xs text-foreground-secondary rounded-lg px-3 py-1.5 pr-7 font-medium appearance-none cursor-pointer focus:outline-none focus:border-brand"
                >
                  <option value="10 days">10 days</option>
                  <option value="30 days">30 days</option>
                  <option value="90 days">90 days</option>
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none text-xs">
                  ▾
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 text-xs text-foreground-secondary mb-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-brand rounded-full" />
                <span>Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 border-t border-dashed border-foreground-muted" />
                <span className="text-foreground-muted">
                  Personal baseline ({data.performance.baselineMin} – {data.performance.baselineMax})
                </span>
              </div>
            </div>

            {/* SVG Trend Chart */}
            <DashboardTrendChart
              trend={data.performance.trend}
              baselineMin={data.performance.baselineMin}
              baselineMax={data.performance.baselineMax}
            />
          </motion.div>

          {/* Key Contributors Card */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.22 }}
            className="rounded-2xl card-depth-1 p-6"
          >
            <h2 className="text-xs font-bold tracking-widest text-foreground uppercase mb-4">
              KEY CONTRIBUTORS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* HRV */}
              <div className="p-4 rounded-xl bg-surface-2 border border-border-subtle transition-transform duration-200 hover:-translate-y-[2px]">
                <div className="flex items-center gap-2.5">
                  <HeartIcon className="w-5 h-5 text-foreground-muted" />
                  <span className="text-xs font-bold text-foreground-secondary uppercase">
                    HRV
                  </span>
                </div>
                <div className="text-2xl font-bold font-sans text-foreground tabular-nums mt-3">
                  {data.contributors.hrv.value}{' '}
                  <span className="text-sm font-normal text-foreground-muted">
                    {data.contributors.hrv.unit}
                  </span>
                </div>
                <div className="text-xs text-foreground-muted mt-1">
                  {data.contributors.hrv.status}
                </div>
              </div>

              {/* Sleep */}
              <div className="p-4 rounded-xl bg-surface-2 border border-border-subtle transition-transform duration-200 hover:-translate-y-[2px]">
                <div className="flex items-center gap-2.5">
                  <MoonIcon className="w-5 h-5 text-foreground-muted" />
                  <span className="text-xs font-bold text-foreground-secondary uppercase">
                    Sleep
                  </span>
                </div>
                <div className="text-2xl font-bold font-sans text-foreground tabular-nums mt-3">
                  {data.contributors.sleep.value}
                </div>
                <div className="text-xs text-foreground-muted mt-1">
                  {data.contributors.sleep.status}
                </div>
              </div>

              {/* Training Load */}
              <div className="p-4 rounded-xl bg-surface-2 border border-border-subtle transition-transform duration-200 hover:-translate-y-[2px]">
                <div className="flex items-center gap-2.5">
                  <BoltIcon className="w-5 h-5 text-foreground-muted" />
                  <span className="text-xs font-bold text-foreground-secondary uppercase">
                    Training Load
                  </span>
                </div>
                <div className="text-2xl font-bold font-sans text-foreground tabular-nums mt-3">
                  {data.contributors.trainingLoad.value}{' '}
                  <span className="text-sm font-normal text-foreground-muted">
                    {data.contributors.trainingLoad.unit}
                  </span>
                </div>
                <div className="text-xs text-foreground-muted mt-1">
                  {data.contributors.trainingLoad.status}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN (30% = 4 cols) ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recommendation Card */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.18 }}
            className="rounded-2xl card-depth-1 border-l-4 border-l-brand p-6 transition-transform duration-300 hover:-translate-y-[2px]"
          >
            <div className="flex items-center justify-between text-brand">
              <span className="text-[11px] font-bold tracking-widest uppercase">
                RECOMMENDED TODAY
              </span>
              <span className="text-sm cursor-pointer hover:translate-x-0.5 transition-transform">&gt;</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-normal text-foreground leading-tight mt-4">
              {data.recommendation.title}
            </h3>

            <p className="text-sm text-foreground-secondary mt-3 leading-relaxed">
              {data.recommendation.subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-brand mt-6">
              <ClockIcon className="w-4 h-4" />
              <span>{data.recommendation.confidence}</span>
            </div>
          </motion.div>

          {/* Today's Session Card */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.26 }}
            className="rounded-2xl card-depth-1 p-6 transition-transform duration-300 hover:-translate-y-[2px]"
          >
            <div className="text-[11px] font-bold tracking-widest text-brand uppercase">
              TODAY&apos;S SESSION
            </div>

            <h3 className="text-xl font-medium text-foreground mt-2">
              {data.session.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-foreground-secondary mt-1">
              <ClockIcon className="w-3.5 h-3.5 text-foreground-muted" />
              <span>{data.session.time}</span>
            </div>

            <div className="border-t border-border-subtle my-4" />

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-foreground-muted">Type</span>
                <span className="text-foreground font-medium">{data.session.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground-muted">Duration</span>
                <span className="text-foreground font-medium">{data.session.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground-muted">Focus</span>
                <span className="text-foreground font-medium">{data.session.focus}</span>
              </div>
            </div>

            <Link
              href="/athlete/events"
              className="mt-6 w-full py-2.5 rounded-lg border border-border-default bg-surface-2 text-xs font-bold tracking-wider text-foreground hover:bg-surface-3 transition-colors uppercase flex items-center justify-center cursor-pointer"
            >
              VIEW SESSION DETAILS
            </Link>
          </motion.div>

          {/* Upcoming Competition Card */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.30 }}
            className="rounded-2xl card-depth-1 p-5 transition-transform duration-300 hover:-translate-y-[2px]"
          >
            <div className="text-[11px] font-bold tracking-widest text-brand uppercase">
              UPCOMING COMPETITION
            </div>

            <div className="flex items-center justify-between gap-2 mt-2">
              <div>
                <h4 className="text-base font-medium text-foreground">
                  {data.competition.opponent}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-foreground-muted mt-1">
                  <span>{data.competition.date} · {data.competition.time}</span>
                  <EventsIcon className="w-3.5 h-3.5 text-foreground-muted" />
                </div>
              </div>

              <Link
                href="/athlete/events"
                className="px-3 py-2 rounded-lg border border-border-default bg-surface-2 text-[11px] font-bold tracking-wider text-foreground hover:bg-surface-3 transition-colors uppercase shrink-0 cursor-pointer"
              >
                VIEW DETAILS
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
