// Ludis Mock Data — Recommendations

import type { Recommendation } from '@/lib/types';

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-001',
    athleteId: 'ath-001',
    title: 'Schedule a full recovery day',
    explanation:
      'Your training load has been 12% above baseline for the past 5 days, and fatigue indicators are trending upward. A recovery day now will support better performance for your upcoming competition on August 30.',
    action: 'Take a complete rest day or light active recovery (walk, gentle stretching) within the next 48 hours.',
    evidence: [
      {
        label: 'Training load trend',
        description: 'Acute load 380 AU vs. baseline 340 AU (12% above)',
        source: 'Training data',
      },
      {
        label: 'HRV decline',
        description: '8% decrease in HRV over past 5 days',
        source: 'Wearable data',
      },
      {
        label: 'Recovery score trend',
        description: 'Recovery score declined from 78 to 72 over the past week',
        source: 'Recovery analysis',
      },
    ],
    confidence: 'high',
    priority: 'high',
    severity: 'warning',
    category: 'recovery',
    acknowledged: false,
    generatedAt: '2026-08-13T06:00:00Z',
  },
  {
    id: 'rec-002',
    athleteId: 'ath-001',
    title: 'Extend sleep before competition week',
    explanation:
      'Your average sleep has been 7.2 hours, slightly below your 7.5-hour target. Research suggests even small sleep extensions can support recovery during high-load training phases.',
    action: 'Aim for 7.5-8 hours of sleep per night for the next 2 weeks leading into competition.',
    evidence: [
      {
        label: 'Sleep duration',
        description: '7.2h average vs. 7.5h target',
        source: 'Sleep tracking',
      },
      {
        label: 'Recovery correlation',
        description: 'Your recovery scores historically improve with 7.5h+ sleep',
        source: 'Historical analysis',
      },
    ],
    confidence: 'moderate',
    priority: 'medium',
    severity: 'info',
    category: 'recovery',
    acknowledged: false,
    generatedAt: '2026-08-13T06:00:00Z',
  },
  {
    id: 'rec-003',
    athleteId: 'ath-001',
    title: 'Taper planning for August 30 race',
    explanation:
      'Your competition is 17 days away. Based on your training history and current load, beginning a gradual taper in 7-10 days would align with your typical preparation pattern.',
    action: 'Plan to begin reducing training volume by 20-30% starting around August 20-23.',
    evidence: [
      {
        label: 'Competition date',
        description: 'August 30, 2026',
        source: 'Event schedule',
      },
      {
        label: 'Current training load',
        description: '380 AU — above baseline, consistent with build phase',
        source: 'Training data',
      },
    ],
    confidence: 'moderate',
    priority: 'medium',
    severity: 'info',
    category: 'preparation',
    acknowledged: false,
    generatedAt: '2026-08-13T06:00:00Z',
  },
];

/** Get the top recommendation (highest priority unacknowledged) */
export function getTodayRecommendation(): Recommendation {
  return mockRecommendations[0];
}
