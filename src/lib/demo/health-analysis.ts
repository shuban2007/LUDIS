import type { HealthMeasurement } from '@/lib/types/health-measurement';

// Helper to get latest value for a specific metric
export function getLatestValue(measurements: HealthMeasurement[], metricName: string): number | undefined {
  const match = measurements
    .filter((m) => m.metric === metricName)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  return match?.value;
}

export function getLatestSecondaryValue(measurements: HealthMeasurement[], metricName: string): number | undefined {
  const match = measurements
    .filter((m) => m.metric === metricName)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  return match?.secondaryValue;
}

// 1. CALCULATE READINESS
export function calculateReadiness(measurements: HealthMeasurement[]): {
  score: number;
  status: string;
  description: string;
} {
  // Baselines / defaults
  const hrv = getLatestValue(measurements, 'hrv') ?? 64;
  const sleep = getLatestValue(measurements, 'sleep') ?? 432; // 7.2 hours in minutes
  const energy = getLatestValue(measurements, 'energyLevel') ?? 8;
  const soreness = getLatestValue(measurements, 'muscleSoreness') ?? 3;

  const sleepHours = sleep / 60;

  // Calibrated scoring contributions
  const sleepScore = Math.min(35, Math.max(10, 25 + (sleepHours - 7.2) * 5));
  const hrvScore = Math.min(45, Math.max(15, 35 + (hrv - 64) * 0.5));
  const energyScore = Math.min(20, Math.max(5, 15 + (energy - 8) * 1.5));
  const sorenessScore = Math.min(10, Math.max(0, 7 - (soreness - 3) * 1.0));

  const total = Math.min(100, Math.max(0, Math.round(sleepScore + hrvScore + energyScore + sorenessScore)));

  // Resolve status and description
  let status = 'Good';
  let description = 'Above your recent baseline';

  if (total >= 85) {
    status = 'Excellent';
    description = 'Optimal recovery and nervous system balance';
  } else if (total >= 70) {
    status = 'Good';
    description = 'Above your recent baseline';
  } else if (total >= 55) {
    status = 'Moderate';
    description = 'Within baseline limits';
  } else {
    status = 'Attention Required';
    description = 'Elevated fatigue / low recovery indicators';
  }

  return { score: total, status, description };
}

// 2. CALCULATE RECOVERY
export function calculateRecovery(measurements: HealthMeasurement[]): {
  score: number;
  status: string;
} {
  const sleep = getLatestValue(measurements, 'sleep') ?? 432;
  const restingHr = getLatestValue(measurements, 'restingHeartRate') ?? 58;
  const soreness = getLatestValue(measurements, 'muscleSoreness') ?? 3;
  const energy = getLatestValue(measurements, 'energyLevel') ?? 8;

  const sleepHours = sleep / 60;

  const sleepScore = Math.min(35, Math.max(15, 28 + (sleepHours - 7.2) * 5));
  const hrScore = Math.min(25, Math.max(10, 20 + (58 - restingHr) * 0.8));
  const sorenessScore = Math.min(20, Math.max(5, 14 + (3 - soreness) * 1.5));
  const energyScore = Math.min(20, Math.max(5, 14 + (energy - 8) * 1.5));

  const total = Math.min(100, Math.max(0, Math.round(sleepScore + hrScore + sorenessScore + energyScore)));

  let status = 'Good';
  if (total >= 85) {
    status = 'Excellent';
  } else if (total >= 70) {
    status = 'Good';
  } else if (total >= 55) {
    status = 'Moderate';
  } else {
    status = 'Low';
  }

  return { score: total, status };
}

// 3. CALCULATE FATIGUE
export function calculateFatigue(measurements: HealthMeasurement[]): {
  score: number;
  level: string;
  trend: string;
} {
  const duration = getLatestValue(measurements, 'trainingDuration') ?? 60;
  const rpe = getLatestValue(measurements, 'trainingRpe') ?? 7;
  const soreness = getLatestValue(measurements, 'muscleSoreness') ?? 3;
  const sleep = getLatestValue(measurements, 'sleep') ?? 432;
  const energy = getLatestValue(measurements, 'energyLevel') ?? 8;

  const sleepHours = sleep / 60;
  const trainingLoad = duration * rpe;

  const loadScore = Math.min(60, Math.max(20, 45 + (trainingLoad - 420) * 0.08));
  const sorenessScore = Math.min(25, Math.max(5, 15 + (soreness - 3) * 2.0));
  const sleepDeficitScore = Math.min(20, Math.max(0, 15 + (7.5 - sleepHours) * 3.0));
  const energyScore = Math.min(15, Math.max(0, 10 + (8 - energy) * 1.0));

  const score = Math.min(100, Math.max(0, Math.round(loadScore + sorenessScore + sleepDeficitScore + energyScore)));

  let level = 'Moderate';
  let trend = 'Trending slightly higher';

  if (score >= 80) {
    level = 'Very High';
    trend = 'Critical training overload threshold';
  } else if (score >= 65) {
    level = 'High';
    trend = 'Workload/recovery imbalance';
  } else if (score >= 45) {
    level = 'Moderate';
    trend = 'Trending slightly higher';
  } else {
    level = 'Low';
    trend = 'Stable and decreasing';
  }

  return { score, level, trend };
}

// 4. CALCULATE PERFORMANCE
export function calculatePerformance(measurements: HealthMeasurement[]): {
  score: number;
} {
  const duration = getLatestValue(measurements, 'trainingDuration') ?? 60;
  const rpe = getLatestValue(measurements, 'trainingRpe') ?? 7;

  // Base performance baseline is 83
  const score = Math.min(
    99,
    Math.max(60, Math.round(83 + (duration - 60) * 0.08 + (rpe - 7) * 1.5))
  );

  return { score };
}
