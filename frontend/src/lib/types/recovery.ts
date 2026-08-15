// Ludis Domain Types — Recovery

import type { ID, ISODateString, ConfidenceIndicator, ContributingFactor, Trend } from './common';

/** Recovery status level */
export type RecoveryLevel = 'optimal' | 'good' | 'moderate' | 'low' | 'poor';

/** Recovery status — current recovery state with interpretation */
export interface RecoveryStatus {
  athleteId: ID;
  score: number;
  maxScore: number;
  level: RecoveryLevel;
  /** What this level means for the athlete */
  interpretation: string;
  contributingFactors: ContributingFactor[];
  confidence: ConfidenceIndicator;
  trend: Trend;
  /** Recommended action based on recovery state */
  recommendedAction: string;
  generatedAt: ISODateString;
}

/** Recovery history entry */
export interface RecoveryHistoryEntry {
  date: ISODateString;
  score: number;
  level: RecoveryLevel;
}
