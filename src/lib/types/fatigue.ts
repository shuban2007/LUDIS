// Ludis Domain Types — Fatigue & Risk

import type { ID, ISODateString, ConfidenceIndicator, ContributingFactor, Trend } from './common';

/** Fatigue status level */
export type FatigueLevel = 'low' | 'moderate' | 'elevated' | 'high';

/** Individual fatigue indicator — a single contributing signal */
export interface FatigueIndicator {
  label: string;
  description: string;
  status: FatigueLevel;
  /** How much this indicator contributes to overall fatigue assessment */
  weight: 'primary' | 'supporting';
}

/** Fatigue risk assessment */
export interface FatigueRisk {
  athleteId: ID;
  status: FatigueLevel;
  /** Human-readable status summary using responsible language */
  statusLabel: string;
  indicators: FatigueIndicator[];
  contributingFactors: ContributingFactor[];
  confidence: ConfidenceIndicator;
  trend: Trend;
  /** Appropriate next action */
  recommendedAction: string;
  generatedAt: ISODateString;
}

/** Readiness summary — composite of recovery + fatigue + performance */
export interface ReadinessSummary {
  athleteId: ID;
  score: number;
  maxScore: number;
  label: string;
  /** e.g., "Ready to train", "Consider lighter session", "Rest recommended" */
  recommendation: string;
  components: {
    performance: number;
    recovery: number;
    fatigue: number;
  };
  confidence: ConfidenceIndicator;
  generatedAt: ISODateString;
}
