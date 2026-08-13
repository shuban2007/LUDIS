// Ludis Domain Types — Athlete

import type { ID, ISODateString } from './common';

/** Sport enum — expandable list of supported sports */
export type Sport =
  | 'running'
  | 'cycling'
  | 'swimming'
  | 'basketball'
  | 'soccer'
  | 'tennis'
  | 'weightlifting'
  | 'triathlon'
  | 'rowing'
  | 'track_field'
  | 'other';

/** Experience level for training context */
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'elite';

/** Body metrics — minimal required for baseline calculation */
export interface BodyMetrics {
  heightCm?: number;
  weightKg?: number;
  restingHeartRate?: number;
  maxHeartRate?: number;
}

/** Competition level */
export type CompetitionLevel = 'recreational' | 'club' | 'collegiate' | 'national' | 'international';

/** Competition context — affects interpretation of readiness */
export interface CompetitionContext {
  level: CompetitionLevel;
  currentSeason: 'pre_season' | 'in_season' | 'off_season' | 'post_season';
  nextCompetitionDate?: ISODateString;
  peakTargetDate?: ISODateString;
}

/** Athlete profile — the core athlete identity */
export interface AthleteProfile {
  id: ID;
  userId: ID;
  name: string;
  sport: Sport;
  age: number;
  bodyMetrics: BodyMetrics;
  experienceLevel: ExperienceLevel;
  competitionContext: CompetitionContext;
  teamIds: ID[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
