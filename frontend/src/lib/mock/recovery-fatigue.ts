// Ludis Mock Data — Recovery & Fatigue

import type { RecoveryStatus, RecoveryHistoryEntry, FatigueRisk } from '@/lib/types';

// ──────────────────────────────────────
// Recovery — Maya Chen (good but slightly below peak)
// ──────────────────────────────────────

export const mockRecovery: RecoveryStatus = {
  athleteId: 'ath-001',
  score: 72,
  maxScore: 100,
  level: 'good',
  interpretation:
    'Your recovery is in a good range but slightly below your recent best. This is consistent with the increased training load this week. No immediate concerns.',
  contributingFactors: [
    {
      label: 'Sleep duration',
      description: 'Averaging 7.2h — slightly below your 7.5h target',
      impact: 'moderate',
      direction: 'negative',
    },
    {
      label: 'Training load increase',
      description: 'Weekly load is 12% above your baseline average',
      impact: 'moderate',
      direction: 'negative',
    },
    {
      label: 'Hydration & nutrition',
      description: 'Consistent intake patterns maintained',
      impact: 'moderate',
      direction: 'positive',
    },
    {
      label: 'Active recovery sessions',
      description: 'Two light recovery sessions this week',
      impact: 'low',
      direction: 'positive',
    },
  ],
  confidence: {
    level: 'high',
    dataQuality: 'high',
    sampleSize: 30,
    explanation:
      'Recovery assessment based on sleep data, HRV trends, training load, and subjective wellness inputs.',
  },
  trend: {
    points: [
      { date: '2026-08-07', value: 78 },
      { date: '2026-08-08', value: 76 },
      { date: '2026-08-09', value: 74 },
      { date: '2026-08-10', value: 75 },
      { date: '2026-08-11', value: 72 },
      { date: '2026-08-12', value: 70 },
      { date: '2026-08-13', value: 72 },
    ],
    direction: 'declining',
    periodLabel: 'Past 7 days',
  },
  recommendedAction:
    'Maintain current recovery practices. Consider extending sleep by 20-30 minutes if feasible before competition.',
  generatedAt: '2026-08-13T06:00:00Z',
};

export const mockRecoveryHistory: RecoveryHistoryEntry[] = [
  { date: '2026-08-01', score: 82, level: 'optimal' },
  { date: '2026-08-02', score: 80, level: 'good' },
  { date: '2026-08-03', score: 78, level: 'good' },
  { date: '2026-08-04', score: 80, level: 'good' },
  { date: '2026-08-05', score: 79, level: 'good' },
  { date: '2026-08-06', score: 81, level: 'optimal' },
  { date: '2026-08-07', score: 78, level: 'good' },
  { date: '2026-08-08', score: 76, level: 'good' },
  { date: '2026-08-09', score: 74, level: 'good' },
  { date: '2026-08-10', score: 75, level: 'good' },
  { date: '2026-08-11', score: 72, level: 'good' },
  { date: '2026-08-12', score: 70, level: 'moderate' },
  { date: '2026-08-13', score: 72, level: 'good' },
];

// ──────────────────────────────────────
// Fatigue — Maya Chen (moderate, attention warranted)
// ──────────────────────────────────────

export const mockFatigue: FatigueRisk = {
  athleteId: 'ath-001',
  status: 'moderate',
  statusLabel: 'Moderate fatigue indicators',
  indicators: [
    {
      label: 'Training load ratio',
      description: 'Acute:chronic workload ratio is 1.18 — within acceptable range but trending upward',
      status: 'moderate',
      weight: 'primary',
    },
    {
      label: 'HRV trend',
      description: 'HRV has decreased 8% over the past 5 days',
      status: 'moderate',
      weight: 'supporting',
    },
    {
      label: 'Perceived exertion trend',
      description: 'Average RPE increased from 6.2 to 7.1 over the past week',
      status: 'moderate',
      weight: 'supporting',
    },
    {
      label: 'Sleep quality',
      description: 'Sleep efficiency remains above 85%',
      status: 'low',
      weight: 'supporting',
    },
  ],
  contributingFactors: [
    {
      label: 'Competition preparation phase',
      description: 'Increased training intensity ahead of upcoming race on Aug 30',
      impact: 'high',
      direction: 'negative',
    },
    {
      label: 'Consecutive high-intensity sessions',
      description: 'Three high-intensity sessions in the past 5 days without full recovery day',
      impact: 'moderate',
      direction: 'negative',
    },
  ],
  confidence: {
    level: 'moderate',
    dataQuality: 'high',
    explanation:
      'Fatigue assessment uses multiple signals. No single metric determines this status. The moderate confidence reflects the inherent complexity of fatigue assessment.',
  },
  trend: {
    points: [
      { date: '2026-08-07', value: 30 },
      { date: '2026-08-08', value: 35 },
      { date: '2026-08-09', value: 40 },
      { date: '2026-08-10', value: 38 },
      { date: '2026-08-11', value: 45 },
      { date: '2026-08-12', value: 50 },
      { date: '2026-08-13', value: 48 },
    ],
    direction: 'declining',
    periodLabel: 'Past 7 days',
  },
  recommendedAction:
    'Include a full recovery day in the next 48 hours. Consider reducing intensity of the next planned session.',
  generatedAt: '2026-08-13T06:00:00Z',
};
