// Ludis Mock Data — Performance, Baselines, Insights, PPI

import type {
  PPISummary,
  PersonalBaseline,
  PerformanceInsight,
  ReadinessSummary,
} from '@/lib/types';

// ──────────────────────────────────────
// PPI — Maya Chen (stable, performing well)
// ──────────────────────────────────────

export const mockPPI: PPISummary = {
  athleteId: 'ath-001',
  score: 82,
  maxScore: 100,
  trend: {
    points: [
      { date: '2026-08-07', value: 78 },
      { date: '2026-08-08', value: 79 },
      { date: '2026-08-09', value: 80 },
      { date: '2026-08-10', value: 81 },
      { date: '2026-08-11', value: 80 },
      { date: '2026-08-12', value: 83 },
      { date: '2026-08-13', value: 82 },
    ],
    direction: 'improving',
    periodLabel: 'Past 7 days',
  },
  deviation: 4,
  direction: 'above',
  significance: 'minor',
  contributingFactors: [
    {
      label: 'Training consistency',
      description: 'Consistent training load over the past 2 weeks',
      impact: 'high',
      direction: 'positive',
    },
    {
      label: 'Sleep quality',
      description: 'Average 7.5h sleep with good recovery patterns',
      impact: 'moderate',
      direction: 'positive',
    },
  ],
  confidence: {
    level: 'high',
    dataQuality: 'high',
    sampleSize: 42,
    explanation: 'Based on 42 days of continuous data with consistent input quality.',
  },
  generatedAt: '2026-08-13T06:00:00Z',
};

// ──────────────────────────────────────
// Readiness — Maya Chen
// ──────────────────────────────────────

export const mockReadiness: ReadinessSummary = {
  athleteId: 'ath-001',
  score: 78,
  maxScore: 100,
  label: 'Good',
  recommendation: 'Ready for planned training. Consider moderate intensity given upcoming competition.',
  components: {
    performance: 82,
    recovery: 76,
    fatigue: 74,
  },
  confidence: {
    level: 'high',
    dataQuality: 'high',
    explanation: 'Readiness calculated from performance, recovery, and fatigue signals with high data quality.',
  },
  generatedAt: '2026-08-13T06:00:00Z',
};

// ──────────────────────────────────────
// Baselines — Maya Chen
// ──────────────────────────────────────

export const mockBaselines: PersonalBaseline[] = [
  {
    athleteId: 'ath-001',
    metric: 'ppi',
    label: 'Personal Performance Index',
    baselineValue: 78,
    rangeLow: 72,
    rangeHigh: 84,
    unit: 'pts',
    confidence: {
      level: 'high',
      dataQuality: 'high',
      sampleSize: 90,
      explanation: 'Established from 90 days of training data.',
    },
    sampleSize: 90,
    updatedAt: '2026-08-13T06:00:00Z',
  },
  {
    athleteId: 'ath-001',
    metric: 'resting_heart_rate',
    label: 'Resting Heart Rate',
    baselineValue: 52,
    rangeLow: 48,
    rangeHigh: 56,
    unit: 'bpm',
    confidence: {
      level: 'high',
      dataQuality: 'high',
      sampleSize: 180,
      explanation: 'Established from 6 months of daily measurements.',
    },
    sampleSize: 180,
    updatedAt: '2026-08-13T06:00:00Z',
  },
  {
    athleteId: 'ath-001',
    metric: 'heart_rate_variability',
    label: 'Heart Rate Variability',
    baselineValue: 62,
    rangeLow: 52,
    rangeHigh: 72,
    unit: 'ms',
    confidence: {
      level: 'moderate',
      dataQuality: 'moderate',
      sampleSize: 45,
      explanation: 'HRV varies day-to-day. Moderate sample provides a reasonable range.',
    },
    sampleSize: 45,
    updatedAt: '2026-08-13T06:00:00Z',
  },
  {
    athleteId: 'ath-001',
    metric: 'training_load',
    label: 'Training Load',
    baselineValue: 340,
    rangeLow: 280,
    rangeHigh: 400,
    unit: 'AU',
    confidence: {
      level: 'high',
      dataQuality: 'high',
      sampleSize: 60,
      explanation: 'Based on 60 training sessions with RPE and duration data.',
    },
    sampleSize: 60,
    updatedAt: '2026-08-13T06:00:00Z',
  },
];

// ──────────────────────────────────────
// Insights — Maya Chen
// ──────────────────────────────────────

export const mockInsights: PerformanceInsight[] = [
  {
    id: 'ins-001',
    athleteId: 'ath-001',
    metric: 'ppi',
    label: 'Performance Index',
    currentValue: 82,
    baselineValue: 78,
    unit: 'pts',
    deviation: 4,
    deviationPercent: 5.1,
    direction: 'above',
    significance: 'minor',
    contributingFactors: [
      {
        label: 'Training consistency',
        description: 'Regular interval sessions with adequate recovery',
        impact: 'high',
        direction: 'positive',
      },
    ],
    confidence: {
      level: 'high',
      dataQuality: 'high',
      explanation: 'Strong data input from wearable and training logs.',
    },
    trend: {
      points: [
        { date: '2026-08-07', value: 78 },
        { date: '2026-08-08', value: 79 },
        { date: '2026-08-09', value: 80 },
        { date: '2026-08-10', value: 81 },
        { date: '2026-08-11', value: 80 },
        { date: '2026-08-12', value: 83 },
        { date: '2026-08-13', value: 82 },
      ],
      direction: 'improving',
      periodLabel: 'Past 7 days',
    },
    generatedAt: '2026-08-13T06:00:00Z',
    interpretation: 'Your performance index is slightly above your personal baseline, indicating a positive training adaptation.',
  },
  {
    id: 'ins-002',
    athleteId: 'ath-001',
    metric: 'resting_heart_rate',
    label: 'Resting Heart Rate',
    currentValue: 54,
    baselineValue: 52,
    unit: 'bpm',
    deviation: 2,
    deviationPercent: 3.8,
    direction: 'above',
    significance: 'minor',
    contributingFactors: [
      {
        label: 'Increased training volume',
        description: 'Training volume increased 12% this week',
        impact: 'moderate',
        direction: 'negative',
      },
      {
        label: 'Mild sleep disruption',
        description: 'Average sleep decreased by 30 minutes over 3 days',
        impact: 'low',
        direction: 'negative',
      },
    ],
    confidence: {
      level: 'high',
      dataQuality: 'high',
      explanation: 'Daily morning measurement with minimal variability.',
    },
    trend: {
      points: [
        { date: '2026-08-07', value: 51 },
        { date: '2026-08-08', value: 52 },
        { date: '2026-08-09', value: 53 },
        { date: '2026-08-10', value: 52 },
        { date: '2026-08-11', value: 53 },
        { date: '2026-08-12', value: 55 },
        { date: '2026-08-13', value: 54 },
      ],
      direction: 'stable',
      periodLabel: 'Past 7 days',
    },
    generatedAt: '2026-08-13T06:00:00Z',
    interpretation: 'Resting heart rate is slightly elevated but within your normal range. This may reflect recent training load increase.',
  },
  {
    id: 'ins-003',
    athleteId: 'ath-001',
    metric: 'training_load',
    label: 'Training Load',
    currentValue: 380,
    baselineValue: 340,
    unit: 'AU',
    deviation: 40,
    deviationPercent: 11.8,
    direction: 'above',
    significance: 'moderate',
    contributingFactors: [
      {
        label: 'Competition preparation',
        description: 'Increased intensity sessions ahead of upcoming race',
        impact: 'high',
        direction: 'neutral',
      },
    ],
    confidence: {
      level: 'high',
      dataQuality: 'high',
      explanation: 'Training load tracked from session RPE and duration.',
    },
    trend: {
      points: [
        { date: '2026-08-07', value: 320 },
        { date: '2026-08-08', value: 350 },
        { date: '2026-08-09', value: 360 },
        { date: '2026-08-10', value: 340 },
        { date: '2026-08-11', value: 370 },
        { date: '2026-08-12', value: 390 },
        { date: '2026-08-13', value: 380 },
      ],
      direction: 'improving',
      periodLabel: 'Past 7 days',
    },
    generatedAt: '2026-08-13T06:00:00Z',
    interpretation: 'Training load is moderately above your baseline. This is expected during competition preparation, but monitor recovery closely.',
  },
];

// ──────────────────────────────────────
// Coach view — Athlete summaries for team overview
// ──────────────────────────────────────

export interface AthleteQuickSummary {
  athleteId: string;
  name: string;
  sport: string;
  readinessScore: number;
  readinessLabel: string;
  recoveryLevel: string;
  fatigueLevel: string;
  hasAlert: boolean;
  alertMessage?: string;
  lastUpdated: string;
}

export const mockTeamSummaries: AthleteQuickSummary[] = [
  {
    athleteId: 'ath-001',
    name: 'Maya Chen',
    sport: 'Running',
    readinessScore: 78,
    readinessLabel: 'Good',
    recoveryLevel: 'good',
    fatigueLevel: 'moderate',
    hasAlert: false,
    lastUpdated: '2026-08-13T06:00:00Z',
  },
  {
    athleteId: 'ath-002',
    name: 'James Okafor',
    sport: 'Basketball',
    readinessScore: 58,
    readinessLabel: 'Fair',
    recoveryLevel: 'moderate',
    fatigueLevel: 'elevated',
    hasAlert: true,
    alertMessage: 'Elevated fatigue indicators — workload/recovery pattern warrants attention',
    lastUpdated: '2026-08-12T18:00:00Z',
  },
  {
    athleteId: 'ath-003',
    name: 'Sofia Rivera',
    sport: 'Swimming',
    readinessScore: 85,
    readinessLabel: 'Excellent',
    recoveryLevel: 'optimal',
    fatigueLevel: 'low',
    hasAlert: false,
    lastUpdated: '2026-08-13T04:00:00Z',
  },
  {
    athleteId: 'ath-004',
    name: 'Liam Torres',
    sport: 'Cycling',
    readinessScore: 45,
    readinessLabel: 'Low',
    recoveryLevel: 'low',
    fatigueLevel: 'high',
    hasAlert: true,
    alertMessage: 'Recovery is below recent baseline — rest recommended',
    lastUpdated: '2026-08-11T18:00:00Z',
  },
  {
    athleteId: 'ath-005',
    name: 'Aisha Patel',
    sport: 'Tennis',
    readinessScore: 72,
    readinessLabel: 'Good',
    recoveryLevel: 'good',
    fatigueLevel: 'low',
    hasAlert: false,
    lastUpdated: '2026-08-13T05:00:00Z',
  },
];
