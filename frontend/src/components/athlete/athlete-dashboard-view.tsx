// Ludis — Athlete Dashboard View Component
// Premium sports-telemetry dashboard view styled with centralized CSS tokens.
// Dynamic state-bound elements driven by central DemoProvider.

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useDemo } from '@/lib/demo/demo-context';
import { type HealthMeasurement } from '@/lib/types/health-measurement';
import { DashboardTrendChart } from './dashboard-trend-chart';
import {
  EventsIcon,
  HeartIcon,
  MoonIcon,
  BoltIcon,
  ClockIcon,
} from '@/components/ui/icons';

export function AthleteDashboardView() {
  const {
    getCurrentAthlete,
    saveDailyMeasurements,
  } = useDemo();

  const currentAthlete = getCurrentAthlete();
  const isLoading = currentAthlete.predictionStatus === 'loading';
  const isError = currentAthlete.predictionStatus === 'error';
  const [trendRange, setTrendRange] = useState('10 days');

  // Expandable Daily Measurements Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [heartRate, setHeartRate] = useState<string>('72');
  const [restingHeartRate, setRestingHeartRate] = useState<string>('58');
  const [hrv, setHrv] = useState<string>('64');
  const [bpSystolic, setBpSystolic] = useState<string>('120');
  const [bpDiastolic, setBpDiastolic] = useState<string>('80');
  const [sleepHours, setSleepHours] = useState<string>('7');
  const [sleepMinutes, setSleepMinutes] = useState<string>('12');
  const [trainingDuration, setTrainingDuration] = useState<string>('60');
  const [trainingRpe, setTrainingRpe] = useState<string>('7');
  const [muscleSoreness, setMuscleSoreness] = useState<string>('3');
  const [energyLevel, setEnergyLevel] = useState<string>('8');
  const [bodyWeight, setBodyWeight] = useState<string>('66');

  // Local validation and feedback indicators
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const athleteFirstName = currentAthlete.profile.firstName;
  const greetingDate = 'Today, May 13';

  // Manual values validation check
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const hrNum = Number(heartRate);
    if (!heartRate || isNaN(hrNum) || hrNum <= 0) {
      newErrors.heartRate = 'Enter a valid heart rate.';
    }

    const rhrNum = Number(restingHeartRate);
    if (!restingHeartRate || isNaN(rhrNum) || rhrNum <= 0) {
      newErrors.restingHeartRate = 'Enter a valid resting heart rate.';
    }

    if (hrv) {
      const hrvNum = Number(hrv);
      if (isNaN(hrvNum) || hrvNum < 0) {
        newErrors.hrv = 'HRV must be greater than or equal to zero.';
      }
    }

    const sHrs = Number(sleepHours);
    const sMins = Number(sleepMinutes);
    if (
      isNaN(sHrs) ||
      sHrs < 0 ||
      sHrs > 24 ||
      isNaN(sMins) ||
      sMins < 0 ||
      sMins > 59 ||
      (sHrs === 24 && sMins > 0)
    ) {
      newErrors.sleep = 'Sleep duration must be between 0 and 24 hours.';
    }

    const tdNum = Number(trainingDuration);
    if (!trainingDuration || isNaN(tdNum) || tdNum < 0) {
      newErrors.trainingDuration = 'Training duration must be greater than or equal to zero.';
    }

    if (bpSystolic || bpDiastolic) {
      const sys = Number(bpSystolic);
      const dia = Number(bpDiastolic);
      if (isNaN(sys) || sys <= 0 || isNaN(dia) || dia <= 0) {
        newErrors.bloodPressure = 'Blood pressure values must be greater than zero.';
      }
    }

    if (bodyWeight) {
      const bw = Number(bodyWeight);
      if (isNaN(bw) || bw <= 0) {
        newErrors.bodyWeight = 'Body weight must be greater than zero.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Convert variables into type-safe raw measurements payload
    const entries: Omit<HealthMeasurement, 'id' | 'userId' | 'timestamp'>[] = [
      { metric: 'heartRate', value: Number(heartRate), unit: 'bpm', source: 'manual' },
      { metric: 'restingHeartRate', value: Number(restingHeartRate), unit: 'bpm', source: 'manual' },
      { metric: 'sleep', value: Number(sleepHours) * 60 + Number(sleepMinutes), unit: 'min', source: 'manual' },
      { metric: 'trainingDuration', value: Number(trainingDuration), unit: 'min', source: 'manual' },
      { metric: 'trainingRpe', value: Number(trainingRpe), source: 'manual' },
      { metric: 'muscleSoreness', value: Number(muscleSoreness), source: 'manual' },
      { metric: 'energyLevel', value: Number(energyLevel), source: 'manual' },
    ];

    if (hrv) {
      entries.push({ metric: 'hrv', value: Number(hrv), unit: 'ms', source: 'manual' });
    }

    if (bpSystolic && bpDiastolic) {
      entries.push({
        metric: 'bloodPressure',
        value: Number(bpSystolic),
        secondaryValue: Number(bpDiastolic),
        unit: 'mmHg',
        source: 'manual',
      });
    }

    if (bodyWeight) {
      entries.push({ metric: 'bodyWeight', value: Number(bodyWeight), unit: 'kg', source: 'manual' });
    }

    saveDailyMeasurements(entries);
    setShowFeedback(true);
    setErrors({});
    setTimeout(() => {
      setShowFeedback(false);
      setIsFormOpen(false);
    }, 2000);
  };

  const handleClear = () => {
    setHeartRate('');
    setRestingHeartRate('');
    setHrv('');
    setBpSystolic('');
    setBpDiastolic('');
    setSleepHours('');
    setSleepMinutes('');
    setTrainingDuration('');
    setTrainingRpe('5');
    setMuscleSoreness('0');
    setEnergyLevel('5');
    setBodyWeight('');
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="max-w-[1340px] mx-auto space-y-6 select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. PAGE HEADER & DAILY MEASUREMENTS LOGGING
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-medium text-foreground tracking-tight">
              Good morning, {athleteFirstName}.
            </h1>
            <p className="text-sm text-foreground-secondary mt-1.5 font-sans">
              Here&apos;s your performance overview for today.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* ADD DAILY MEASUREMENTS Trigger Button */}
            <button
              type="button"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="inline-flex items-center justify-center bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider"
            >
              {isFormOpen ? 'Cancel' : 'Add Daily Measurements'}
            </button>

            {/* Date Selector */}
            <div className="inline-flex items-center gap-3 bg-surface-2 border border-border-default px-3.5 py-2.5 rounded-lg text-xs font-medium text-foreground-secondary shadow-sm">
              {isError && (
                 <span className="text-danger font-bold uppercase tracking-wider mr-2" title={currentAthlete.predictionError}>ML Offline</span>
              )}
              <EventsIcon className="w-4 h-4 text-foreground-muted shrink-0" />
              <span className="text-foreground">{greetingDate}</span>
            </div>
          </div>
        </div>

        {/* Expandable Health & Training Measurements Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <form
                onSubmit={handleLogSubmit}
                className="rounded-xl bg-glass-bg border border-glass-border p-5 shadow-sm backdrop-blur-md space-y-4 text-left"
              >
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold tracking-widest text-brand uppercase">
                      ADD DAILY MEASUREMENTS
                    </span>
                    <span className="text-[10px] text-foreground-muted mt-0.5">
                      Log the data that helps Ludis understand your body and training.
                    </span>
                  </div>
                  {showFeedback && (
                    <span className="text-xs font-bold text-success animate-pulse">
                      ✓ Measurements logged
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* ROW 1: Heart Rates & HRV */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hr-input" className="text-xs font-semibold text-foreground-secondary">
                      Heart Rate (bpm)
                    </label>
                    <input
                      id="hr-input"
                      type="number"
                      value={heartRate}
                      onChange={(e) => setHeartRate(e.target.value)}
                      placeholder="e.g. 72"
                      className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
                    />
                    <span className="text-[10px] text-foreground-muted">Your current heart rate.</span>
                    {errors.heartRate && (
                      <span className="text-[10px] text-danger font-semibold">{errors.heartRate}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="resting-hr-input" className="text-xs font-semibold text-foreground-secondary">
                      Resting Heart Rate (bpm)
                    </label>
                    <input
                      id="resting-hr-input"
                      type="number"
                      value={restingHeartRate}
                      onChange={(e) => setRestingHeartRate(e.target.value)}
                      placeholder="e.g. 58"
                      className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
                    />
                    <span className="text-[10px] text-foreground-muted">Resting rate, measured after waking.</span>
                    {errors.restingHeartRate && (
                      <span className="text-[10px] text-danger font-semibold">{errors.restingHeartRate}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hrv-input" className="text-xs font-semibold text-foreground-secondary">
                      HRV (ms, optional)
                    </label>
                    <input
                      id="hrv-input"
                      type="number"
                      value={hrv}
                      onChange={(e) => setHrv(e.target.value)}
                      placeholder="e.g. 64"
                      className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
                    />
                    <span className="text-[10px] text-foreground-muted">Heart rate variability (millisecond index).</span>
                    {errors.hrv && (
                      <span className="text-[10px] text-danger font-semibold">{errors.hrv}</span>
                    )}
                  </div>

                  {/* ROW 2: Sleep & Training Duration/Effort */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground-secondary">
                      Sleep Duration
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center bg-surface-2 border border-border-default rounded-lg px-3 py-2">
                        <input
                          type="number"
                          value={sleepHours}
                          onChange={(e) => setSleepHours(e.target.value)}
                          placeholder="h"
                          className="w-full bg-transparent text-sm text-foreground focus:outline-none font-mono font-bold text-center"
                        />
                        <span className="text-[10px] font-bold text-foreground-muted ml-1">h</span>
                      </div>
                      <div className="flex-1 flex items-center bg-surface-2 border border-border-default rounded-lg px-3 py-2">
                        <input
                          type="number"
                          value={sleepMinutes}
                          onChange={(e) => setSleepMinutes(e.target.value)}
                          placeholder="m"
                          className="w-full bg-transparent text-sm text-foreground focus:outline-none font-mono font-bold text-center"
                        />
                        <span className="text-[10px] font-bold text-foreground-muted ml-1">m</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-foreground-muted">Total hours and minutes slept.</span>
                    {errors.sleep && (
                      <span className="text-[10px] text-danger font-semibold">{errors.sleep}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="duration-input" className="text-xs font-semibold text-foreground-secondary">
                      Training Duration (minutes)
                    </label>
                    <input
                      id="duration-input"
                      type="number"
                      value={trainingDuration}
                      onChange={(e) => setTrainingDuration(e.target.value)}
                      placeholder="e.g. 60"
                      className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
                    />
                    <span className="text-[10px] text-foreground-muted">Duration of physical workout.</span>
                    {errors.trainingDuration && (
                      <span className="text-[10px] text-danger font-semibold">{errors.trainingDuration}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rpe-select" className="text-xs font-semibold text-foreground-secondary">
                      Training Effort / RPE
                    </label>
                    <select
                      id="rpe-select"
                      value={trainingRpe}
                      onChange={(e) => setTrainingRpe(e.target.value)}
                      className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold"
                    >
                      <option value="1">1 — Very easy</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5 — Moderate</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10 — Maximum effort</option>
                    </select>
                    <span className="text-[10px] text-foreground-muted">Rate of perceived physical exertion.</span>
                  </div>

                  {/* ROW 3: Soreness, Energy & Weight */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="soreness-select" className="text-xs font-semibold text-foreground-secondary">
                      Muscle Soreness
                    </label>
                    <select
                      id="soreness-select"
                      value={muscleSoreness}
                      onChange={(e) => setMuscleSoreness(e.target.value)}
                      className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold"
                    >
                      <option value="0">0 — None</option>
                      <option value="1">1</option>
                      <option value="2">2 — Very mild</option>
                      <option value="3">3</option>
                      <option value="4">4 — Mild</option>
                      <option value="5">5</option>
                      <option value="6">6 — Moderate</option>
                      <option value="7">7</option>
                      <option value="8">8 — High</option>
                      <option value="9">9</option>
                      <option value="10">10 — Severe</option>
                    </select>
                    <span className="text-[10px] text-foreground-muted">Level of physical soreness.</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="energy-select" className="text-xs font-semibold text-foreground-secondary">
                      Energy Level
                    </label>
                    <select
                      id="energy-select"
                      value={energyLevel}
                      onChange={(e) => setEnergyLevel(e.target.value)}
                      className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold"
                    >
                      <option value="1">1 — Very low</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10 — Excellent</option>
                    </select>
                    <span className="text-[10px] text-foreground-muted">Overall physical energy index.</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="weight-input" className="text-xs font-semibold text-foreground-secondary">
                      Body Weight (kg, optional)
                    </label>
                    <input
                      id="weight-input"
                      type="number"
                      value={bodyWeight}
                      onChange={(e) => setBodyWeight(e.target.value)}
                      placeholder="e.g. 66"
                      className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
                    />
                    <span className="text-[10px] text-foreground-muted">Your current weight scale.</span>
                    {errors.bodyWeight && (
                      <span className="text-[10px] text-danger font-semibold">{errors.bodyWeight}</span>
                    )}
                  </div>
                </div>

                {/* ROW 4: Blood Pressures */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-foreground-secondary">
                      Blood Pressure (mmHg, optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 flex items-center bg-surface-2 border border-border-default rounded-lg px-3 py-2">
                        <input
                          type="number"
                          value={bpSystolic}
                          onChange={(e) => setBpSystolic(e.target.value)}
                          placeholder="Systolic"
                          className="w-full bg-transparent text-sm text-foreground focus:outline-none font-mono font-bold text-center"
                        />
                        <span className="text-[10px] font-bold text-foreground-muted ml-1">SYS</span>
                      </div>
                      <span className="text-foreground-muted font-bold text-base">/</span>
                      <div className="flex-1 flex items-center bg-surface-2 border border-border-default rounded-lg px-3 py-2">
                        <input
                          type="number"
                          value={bpDiastolic}
                          onChange={(e) => setBpDiastolic(e.target.value)}
                          placeholder="Diastolic"
                          className="w-full bg-transparent text-sm text-foreground focus:outline-none font-mono font-bold text-center"
                        />
                        <span className="text-[10px] font-bold text-foreground-muted ml-1">DIA</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-foreground-muted">Optional blood pressure measurement.</span>
                    {errors.bloodPressure && (
                      <span className="text-[10px] text-danger font-semibold">{errors.bloodPressure}</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-border-subtle">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-2 border border-border-default hover:bg-surface-2 text-foreground text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer"
                  >
                    Clear
                  </button>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-4 py-2 border border-border-default hover:bg-surface-2 text-foreground-secondary text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-5 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider"
                    >
                      Save Measurements
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : isError ? (
                <span className="text-danger text-3xl">ERR</span>
              ) : (
                currentAthlete.readiness.score
              )}
            </div>
            <div className="text-lg font-medium text-foreground mt-1.5">
              {currentAthlete.readiness.status}
            </div>
            <div className="text-xs text-foreground-muted mt-1">
              {currentAthlete.readiness.description}
            </div>
          </div>

          {/* PERFORMANCE */}
          <div className="lg:px-6">
            <div className="text-[11px] font-bold tracking-widest text-foreground-muted uppercase">
              PERFORMANCE
            </div>
            <div className="text-4xl sm:text-5xl font-bold font-sans text-foreground tabular-nums mt-3">
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : isError ? (
                <span className="text-danger text-3xl">ERR</span>
              ) : (
                currentAthlete.performance.score
              )}
            </div>
            <div className="text-xs text-foreground-muted mt-2">Personal baseline</div>
            <div className="text-xs text-foreground-secondary mt-0.5 font-mono">
              {currentAthlete.performance.baseline.min} – {currentAthlete.performance.baseline.max}
            </div>
          </div>

          {/* RECOVERY */}
          <div className="lg:px-6">
            <div className="text-[11px] font-bold tracking-widest text-foreground-muted uppercase">
              RECOVERY
            </div>
            <div className="text-4xl sm:text-5xl font-bold font-sans text-foreground tabular-nums mt-3">
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : isError ? (
                <span className="text-danger text-3xl">ERR</span>
              ) : (
                currentAthlete.recovery.score
              )}
            </div>
            <div className="text-lg font-medium text-brand mt-1.5">
              {currentAthlete.recovery.status}
            </div>
          </div>

          {/* FATIGUE */}
          <div className="lg:pl-6">
            <div className="text-[11px] font-bold tracking-widest text-foreground-muted uppercase">
              FATIGUE
            </div>
            <div className="text-2xl sm:text-3xl font-medium text-foreground mt-4">
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : isError ? (
                <span className="text-danger text-xl">ERR</span>
              ) : (
                currentAthlete.fatigue.level
              )}
            </div>
            <div className="text-xs text-foreground-muted mt-1.5">
              {currentAthlete.fatigue.trend}
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
                  Personal baseline ({currentAthlete.performance.baseline.min} – {currentAthlete.performance.baseline.max})
                </span>
              </div>
            </div>

            {/* SVG Trend Chart */}
            <DashboardTrendChart
              trend={currentAthlete.performance.history}
              baselineMin={currentAthlete.performance.baseline.min}
              baselineMax={currentAthlete.performance.baseline.max}
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
                  {currentAthlete.contributors.hrv.value}{' '}
                  <span className="text-sm font-normal text-foreground-muted">
                    {currentAthlete.contributors.hrv.unit}
                  </span>
                </div>
                <div className="text-xs text-foreground-muted mt-1">
                  {currentAthlete.contributors.hrv.status}
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
                  {currentAthlete.contributors.sleep.value}
                </div>
                <div className="text-xs text-foreground-muted mt-1">
                  {currentAthlete.contributors.sleep.status}
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
                  {currentAthlete.contributors.trainingLoad.value}{' '}
                  <span className="text-sm font-normal text-foreground-muted">
                    {currentAthlete.contributors.trainingLoad.unit}
                  </span>
                </div>
                <div className="text-xs text-foreground-muted mt-1">
                  {currentAthlete.contributors.trainingLoad.status}
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
              {currentAthlete.recommendation.title}
            </h3>

            <p className="text-sm text-foreground-secondary mt-3 leading-relaxed">
              {currentAthlete.recommendation.description}
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-brand mt-6">
              <ClockIcon className="w-4 h-4" />
              <span>{currentAthlete.recommendation.confidence}</span>
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
              {currentAthlete.session.title}
            </h3>

            <div className="flex items-center gap-2 text-xs text-foreground-secondary mt-1">
              <ClockIcon className="w-3.5 h-3.5 text-foreground-muted" />
              <span>{currentAthlete.session.time}</span>
            </div>

            <div className="border-t border-border-subtle my-4" />

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-foreground-muted">Type</span>
                <span className="text-foreground font-medium">{currentAthlete.session.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground-muted">Duration</span>
                <span className="text-foreground font-medium">{currentAthlete.session.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground-muted">Focus</span>
                <span className="text-foreground font-medium">{currentAthlete.session.focus}</span>
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
                  {currentAthlete.competition.opponent}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-foreground-muted mt-1">
                  <span>{currentAthlete.competition.date} · {currentAthlete.competition.time}</span>
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
