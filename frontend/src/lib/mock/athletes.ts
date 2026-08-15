// Ludis Mock Data — Athlete Profiles
// Scenarios: stable baseline, performance deviation, recovery concern, elevated fatigue, upcoming competition

import type { AthleteProfile } from '@/lib/types';

export const mockAthletes: AthleteProfile[] = [
  {
    id: 'ath-001',
    userId: 'usr-001',
    name: 'Maya Chen',
    sport: 'running',
    age: 24,
    bodyMetrics: {
      heightCm: 168,
      weightKg: 58,
      restingHeartRate: 52,
      maxHeartRate: 192,
    },
    experienceLevel: 'advanced',
    competitionContext: {
      level: 'national',
      currentSeason: 'in_season',
      nextCompetitionDate: '2026-08-30T09:00:00Z',
      peakTargetDate: '2026-09-15T00:00:00Z',
    },
    teamIds: ['team-001'],
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2026-08-13T06:00:00Z',
  },
  {
    id: 'ath-002',
    userId: 'usr-002',
    name: 'James Okafor',
    sport: 'basketball',
    age: 22,
    bodyMetrics: {
      heightCm: 196,
      weightKg: 95,
      restingHeartRate: 58,
      maxHeartRate: 198,
    },
    experienceLevel: 'advanced',
    competitionContext: {
      level: 'collegiate',
      currentSeason: 'pre_season',
    },
    teamIds: ['team-002'],
    createdAt: '2025-03-01T08:00:00Z',
    updatedAt: '2026-08-12T10:00:00Z',
  },
  {
    id: 'ath-003',
    userId: 'usr-003',
    name: 'Sofia Rivera',
    sport: 'swimming',
    age: 20,
    bodyMetrics: {
      heightCm: 175,
      weightKg: 65,
      restingHeartRate: 48,
      maxHeartRate: 188,
    },
    experienceLevel: 'elite',
    competitionContext: {
      level: 'international',
      currentSeason: 'in_season',
      nextCompetitionDate: '2026-08-20T14:00:00Z',
      peakTargetDate: '2026-08-20T00:00:00Z',
    },
    teamIds: ['team-003'],
    createdAt: '2024-09-01T08:00:00Z',
    updatedAt: '2026-08-13T04:00:00Z',
  },
  {
    id: 'ath-004',
    userId: 'usr-004',
    name: 'Liam Torres',
    sport: 'cycling',
    age: 28,
    bodyMetrics: {
      heightCm: 182,
      weightKg: 73,
      restingHeartRate: 45,
      maxHeartRate: 186,
    },
    experienceLevel: 'elite',
    competitionContext: {
      level: 'national',
      currentSeason: 'in_season',
      nextCompetitionDate: '2026-09-05T07:00:00Z',
    },
    teamIds: ['team-004'],
    createdAt: '2024-06-15T08:00:00Z',
    updatedAt: '2026-08-11T18:00:00Z',
  },
  {
    id: 'ath-005',
    userId: 'usr-005',
    name: 'Aisha Patel',
    sport: 'tennis',
    age: 26,
    bodyMetrics: {
      heightCm: 170,
      weightKg: 62,
      restingHeartRate: 55,
      maxHeartRate: 190,
    },
    experienceLevel: 'intermediate',
    competitionContext: {
      level: 'club',
      currentSeason: 'in_season',
    },
    teamIds: [],
    createdAt: '2025-06-01T08:00:00Z',
    updatedAt: '2026-08-13T05:00:00Z',
  },
];

/** Get the primary demo athlete (Maya Chen — stable with upcoming competition) */
export function getPrimaryAthlete(): AthleteProfile {
  return mockAthletes[0];
}
