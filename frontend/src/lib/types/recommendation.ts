// Ludis Domain Types — Recommendations

import type { ID, ISODateString, ConfidenceLevel, StatusSeverity } from './common';

/** Evidence supporting a recommendation */
export interface Evidence {
  label: string;
  description: string;
  source: string;
}

/** Recommendation — explainable action suggestion */
export interface Recommendation {
  id: ID;
  athleteId: ID;
  title: string;
  /** Clear explanation of WHY this recommendation exists */
  explanation: string;
  /** Specific actionable guidance */
  action: string;
  evidence: Evidence[];
  confidence: ConfidenceLevel;
  priority: 'high' | 'medium' | 'low';
  severity: StatusSeverity;
  category: RecommendationCategory;
  /** Whether the athlete has acknowledged/actioned this */
  acknowledged: boolean;
  generatedAt: ISODateString;
}

/** Recommendation categories */
export type RecommendationCategory =
  | 'training'
  | 'recovery'
  | 'fatigue'
  | 'performance'
  | 'preparation'
  | 'general';
