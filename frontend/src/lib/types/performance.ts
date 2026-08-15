// Ludis Domain Types — Performance, Baselines, Insights

import type { ID, ISODateString, ConfidenceIndicator, ContributingFactor, DeviationDirection, DeviationSignificance, Trend } from './common';

/** Performance metric identifier */
export type PerformanceMetricType =
  | 'ppi'           // Personal Performance Index
  | 'readiness'
  | 'training_load'
  | 'speed'
  | 'power'
  | 'endurance'
  | 'heart_rate_variability'
  | 'resting_heart_rate'
  | 'vo2_estimate'
  | 'custom';

/** A single performance metric reading */
export interface PerformanceMetric {
  id: ID;
  athleteId: ID;
  type: PerformanceMetricType;
  label: string;
  value: number;
  unit: string;
  recordedAt: ISODateString;
}

/** Personal baseline — the athlete's normal range for a metric */
export interface PersonalBaseline {
  athleteId: ID;
  metric: PerformanceMetricType;
  label: string;
  baselineValue: number;
  rangeLow: number;
  rangeHigh: number;
  unit: string;
  confidence: ConfidenceIndicator;
  /** How many data points contributed to this baseline */
  sampleSize: number;
  updatedAt: ISODateString;
}

/** Performance insight — deviation from baseline with interpretation */
export interface PerformanceInsight {
  id: ID;
  athleteId: ID;
  metric: PerformanceMetricType;
  label: string;
  currentValue: number;
  baselineValue: number;
  unit: string;
  deviation: number;
  deviationPercent: number;
  direction: DeviationDirection;
  significance: DeviationSignificance;
  contributingFactors: ContributingFactor[];
  confidence: ConfidenceIndicator;
  trend: Trend;
  generatedAt: ISODateString;
  /** Human-readable interpretation */
  interpretation: string;
}

/** PPI — Personal Performance Index summary */
export interface PPISummary {
  athleteId: ID;
  score: number;
  maxScore: number;
  trend: Trend;
  deviation: number;
  direction: DeviationDirection;
  significance: DeviationSignificance;
  contributingFactors: ContributingFactor[];
  confidence: ConfidenceIndicator;
  generatedAt: ISODateString;
}
