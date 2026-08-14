// Ludis Mock Data — Athlete Dashboard Data Structure

import type { AthleteDashboardData } from '@/lib/types';

export const mockAthleteDashboardData: AthleteDashboardData = {
  athleteName: 'Alex Morgan',
  athleteRole: 'Athlete',
  avatarUrl: '/athlete_portrait.png',
  greetingDate: 'Today, May 13',

  readiness: {
    score: 82,
    status: 'Good',
    comparison: 'Above your recent baseline',
  },

  performance: {
    current: 83,
    baselineMin: 76,
    baselineMax: 80,
    trendPeriod: '10 days',
    trend: [
      { date: 'May 4', value: 77 },
      { date: 'May 5', value: 79 },
      { date: 'May 6', value: 83 },
      { date: 'May 7', value: 76 },
      { date: 'May 8', value: 81 },
      { date: 'May 9', value: 84 },
      { date: 'May 10', value: 78 },
      { date: 'May 11', value: 88 },
      { date: 'May 12', value: 86 },
      { date: 'May 13', value: 89 },
    ],
  },

  recovery: {
    score: 76,
    status: 'Good',
  },

  fatigue: {
    level: 'Moderate',
    trend: 'Trending slightly higher',
  },

  recommendation: {
    title: 'Maintain your planned intensity.',
    subtitle: 'Focus on recovery after training.',
    confidence: 'High confidence',
  },

  session: {
    name: 'Speed & Conditioning',
    time: '18:00',
    type: 'Field Session',
    duration: '60 min',
    focus: 'Speed · Power · Endurance',
  },

  contributors: {
    hrv: {
      value: 64,
      unit: 'ms',
      status: 'Within normal range',
    },
    sleep: {
      value: '7h 12m',
      status: 'Slightly below target',
    },
    trainingLoad: {
      value: 380,
      unit: 'AU',
      status: 'Within optimal range',
    },
  },

  competition: {
    opponent: 'vs Riverview FC',
    date: 'May 18',
    time: '18:30',
  },
};
