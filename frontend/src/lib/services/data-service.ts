// Ludis — Data services
// Thin service layer: UI → service → data source
// Currently backed by mock data. Replace with Supabase/API calls later.

import type {
  AthleteProfile,
  AthleteDashboardData,
  PPISummary,

  ReadinessSummary,
  PersonalBaseline,
  PerformanceInsight,
  RecoveryStatus,
  RecoveryHistoryEntry,
  FatigueRisk,
  Recommendation,
  Event,
  EnvironmentalContext,
  TrainingSession,
  Notification,
} from '@/lib/types';
import type { AthleteQuickSummary } from '@/lib/mock/performance';

import {
  mockAthletes,
  getPrimaryAthlete,
  mockPPI,
  mockReadiness,
  mockBaselines,
  mockInsights,
  mockRecovery,
  mockRecoveryHistory,
  mockFatigue,
  mockRecommendations,
  getTodayRecommendation,
  mockEvents,
  mockEnvironments,
  mockTrainingSessions,
  mockNotifications,
  mockTeamSummaries,
  mockAthleteDashboardData,
} from '@/lib/mock';

// ──────────────────────────────────────
// Athlete service
// ──────────────────────────────────────

export function getAthleteProfile(athleteId: string): AthleteProfile | undefined {
  return mockAthletes.find((a) => a.id === athleteId);
}

export function getCurrentAthlete(): AthleteProfile {
  return getPrimaryAthlete();
}

export function getAllAthletes(): AthleteProfile[] {
  return mockAthletes;
}

export function getAthleteDashboardData(athleteId?: string): AthleteDashboardData {
  void athleteId;
  return mockAthleteDashboardData;
}


// ──────────────────────────────────────
// Performance service
// ──────────────────────────────────────

export function getPPI(athleteId: string): PPISummary {
  return { ...mockPPI, athleteId };
}

export function getReadiness(athleteId: string): ReadinessSummary {
  return { ...mockReadiness, athleteId };
}

export function getBaselines(athleteId: string): PersonalBaseline[] {
  return mockBaselines.filter((b) => b.athleteId === athleteId || b.athleteId === 'ath-001');
}

export function getInsights(athleteId: string): PerformanceInsight[] {
  return mockInsights.filter((i) => i.athleteId === athleteId || i.athleteId === 'ath-001');
}

// ──────────────────────────────────────
// Recovery service
// ──────────────────────────────────────

export function getRecoveryStatus(athleteId: string): RecoveryStatus {
  return { ...mockRecovery, athleteId };
}

export function getRecoveryHistory(athleteId: string): RecoveryHistoryEntry[] {
  void athleteId;
  return mockRecoveryHistory;
}

// ──────────────────────────────────────
// Fatigue service
// ──────────────────────────────────────

export function getFatigueRisk(athleteId: string): FatigueRisk {
  return { ...mockFatigue, athleteId };
}

// ──────────────────────────────────────
// Recommendation service
// ──────────────────────────────────────

export function getRecommendations(athleteId: string): Recommendation[] {
  return mockRecommendations.filter(
    (r) => r.athleteId === athleteId || r.athleteId === 'ath-001'
  );
}

export function getTopRecommendation(): Recommendation {
  return getTodayRecommendation();
}

// ──────────────────────────────────────
// Event service
// ──────────────────────────────────────

export function getEvents(athleteId: string): Event[] {
  return mockEvents.filter((e) => e.athleteIds.includes(athleteId) || e.athleteIds.includes('ath-001'));
}

export function getUpcomingEvent(athleteId: string): Event | undefined {
  const events = getEvents(athleteId);
  const now = new Date();
  return events
    .filter((e) => new Date(e.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
}

export function getEnvironmentalContext(eventId: string): EnvironmentalContext | undefined {
  return mockEnvironments.find((e) => e.eventId === eventId);
}

// ──────────────────────────────────────
// Training service
// ──────────────────────────────────────

export function getTrainingSessions(athleteId: string): TrainingSession[] {
  return mockTrainingSessions.filter(
    (s) => s.athleteId === athleteId || s.athleteId === 'ath-001'
  );
}

// ──────────────────────────────────────
// Notification service
// ──────────────────────────────────────

export function getNotifications(userId: string): Notification[] {
  return mockNotifications.filter(
    (n) => n.userId === userId || n.userId === 'usr-001'
  );
}

export function getUnreadCount(userId: string): number {
  return getNotifications(userId).filter((n) => !n.read).length;
}

// ──────────────────────────────────────
// Coach / Team service
// ──────────────────────────────────────

export function getTeamSummaries(): AthleteQuickSummary[] {
  return mockTeamSummaries;
}

export function getAthletesWithAlerts(): AthleteQuickSummary[] {
  return mockTeamSummaries.filter((a) => a.hasAlert);
}
