// Ludis Domain Types — Progress & Reports

import type { ID, ISODateString, Trend, ConfidenceIndicator, DateRange } from './common';

/** Progress report summary */
export interface ProgressReport {
  id: ID;
  athleteId: ID;
  period: DateRange;
  title: string;
  summary: string;
  performanceTrend: Trend;
  recoveryTrend: Trend;
  fatigueTrend: Trend;
  keyInsights: string[];
  confidence: ConfidenceIndicator;
  generatedAt: ISODateString;
}
