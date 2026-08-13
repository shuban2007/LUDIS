// Ludis Domain Types — Common primitives used across the domain model

/** ISO 8601 date string */
export type ISODateString = string;

/** Unique identifier */
export type ID = string;

/** Data quality assessment for model inputs */
export type DataQuality = 'high' | 'moderate' | 'low' | 'insufficient';

/** Confidence level for model outputs */
export type ConfidenceLevel = 'high' | 'moderate' | 'low';

/** Trend direction */
export type TrendDirection = 'improving' | 'stable' | 'declining';

/** Deviation direction from baseline */
export type DeviationDirection = 'above' | 'at' | 'below';

/** Deviation significance */
export type DeviationSignificance = 'significant' | 'moderate' | 'minor' | 'none';

/** Status severity */
export type StatusSeverity = 'positive' | 'warning' | 'risk' | 'info';

/** Date range for queries */
export interface DateRange {
  start: ISODateString;
  end: ISODateString;
}

/** Contributing factor to a model output */
export interface ContributingFactor {
  label: string;
  description: string;
  impact: 'high' | 'moderate' | 'low';
  direction: 'positive' | 'negative' | 'neutral';
}

/** Confidence indicator attached to model outputs */
export interface ConfidenceIndicator {
  level: ConfidenceLevel;
  dataQuality: DataQuality;
  sampleSize?: number;
  /** Human-readable explanation of confidence assessment */
  explanation: string;
}

/** Trend data point for charts */
export interface TrendPoint {
  date: ISODateString;
  value: number;
}

/** Trend with metadata */
export interface Trend {
  points: TrendPoint[];
  direction: TrendDirection;
  periodLabel: string;
}
