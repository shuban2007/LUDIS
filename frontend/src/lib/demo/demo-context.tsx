'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import {
  INITIAL_ATHLETES,
  INITIAL_NOTIFICATIONS,
  INITIAL_HEALTH_MEASUREMENTS,
  type AthleteData,
  type DemoNotification
} from '@/data/demo/demo-data';
import { type HealthMeasurement } from '@/lib/types/health-measurement';
import { type Team, type TeamInvitation } from '@/lib/types/team';
import {
  type ProfileMeasurementLog,
  type ProfileOverride,
  type SessionProfileOverrides,
  type CoachProfileData,
} from '@/lib/types/profile';
import { loadDemoState, saveDemoState } from '@/lib/demo/demo-storage';
import {
  calculateReadiness,
  calculateRecovery,
  calculateFatigue,
  calculatePerformance
} from '@/lib/demo/health-analysis';
import { fetchAthletePredictions, type PredictionResponse } from '@/lib/api/prediction-client';

export const INITIAL_COACH_PROFILE: CoachProfileData = {
  id: 'coach-martinez',
  userId: 'usr-006',
  fullName: 'Coach Martinez',
  role: 'Head Coach',
  sport: 'Running',
  age: 42,
  height: 180,
  weight: 78,
  email: 'coach@ludis.app',
  avatar: '',
};

interface NotificationPreferences {
  performanceAlerts: boolean;
  recoveryAlerts: boolean;
  trainingReminders: boolean;
  competitionReminders: boolean;
}

interface DemoContextValue {
  athletes: AthleteData[];
  notifications: DemoNotification[];
  healthMeasurements: HealthMeasurement[];
  googleFitSynced: boolean;
  googleFitSyncTime: string;
  activeAthleteId: string;
  setActiveAthleteId: (id: string) => void;
  getCurrentAthlete: () => AthleteData;
  getAthleteById: (id: string) => AthleteData | undefined;
  getCoachProfile: () => CoachProfileData;
  saveDailyMeasurements: (
    newEntries: Omit<HealthMeasurement, 'id' | 'userId' | 'timestamp'>[]
  ) => void;
  deleteHealthMeasurement: (id: string) => void;
  syncGoogleFitSources: () => Promise<void>;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  updateAthleteProfile: (
    athleteIdOrUpdates: string | ProfileOverride,
    updates?: ProfileOverride
  ) => void;
  updateCoachProfile: (updates: Partial<CoachProfileData>) => void;
  profileMeasurementLogs: ProfileMeasurementLog[];
  getProfileMeasurementHistory: (userId: string) => ProfileMeasurementLog[];
  notificationPreferences: NotificationPreferences;
  updateNotificationPreferences: (updates: Partial<NotificationPreferences>) => void;
  
  // Teams API
  teams: Team[];
  teamInvitations: TeamInvitation[];
  createTeam: (name: string, sport: string, description?: string) => Team;
  updateTeam: (teamId: string, updates: Partial<Omit<Team, 'id' | 'coachId' | 'athleteIds'>>) => void;
  archiveTeam: (teamId: string) => void;
  addAthleteToTeam: (teamId: string, athleteId: string) => void;
  removeAthleteFromTeam: (teamId: string, athleteId: string) => void;
  inviteAthleteToTeam: (teamId: string, name: string, email: string) => TeamInvitation;
  resendInvitation: (invitationId: string) => TeamInvitation | undefined;
  revokeInvitation: (invitationId: string) => void;
  acceptInvitation: (token: string) => TeamInvitation | null;
  declineInvitation: (token: string) => void;
  getTeamById: (teamId: string) => Team | undefined;
  getTeamAthletes: (teamId: string) => AthleteData[];
  getTeamInvitations: (teamId: string) => TeamInvitation[];
  calculateTeamMetrics: (athleteIds: string[]) => {
    total: number;
    highReadiness: number;
    moderateReadiness: number;
    needsAttention: number;
    averageReadiness: number;
    highFatigue: number;
    lowRecovery: number;
  };
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<DemoNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeAthleteId, setActiveAthleteId] = useState<string>('ath-001');
  const [googleFitSynced, setGoogleFitSynced] = useState<boolean>(true);

  // Pure React in-memory profile overrides & measurement logs (Session memory only, NO localStorage!)
  const [sessionProfileOverrides, setSessionProfileOverrides] = useState<SessionProfileOverrides>({});
  const [profileMeasurementLogs, setProfileMeasurementLogs] = useState<ProfileMeasurementLog[]>([]);

  const [googleFitSyncTime, setGoogleFitSyncTime] = useState<string>('Today, 5:42 PM');

  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    performanceAlerts: true,
    recoveryAlerts: true,
    trainingReminders: true,
    competitionReminders: true,
  });

  const [teams, setTeams] = useState<Team[]>([
    {
      id: 'team-distance-runners-elite',
      name: 'Distance Runners Elite',
      sport: 'Running',
      description: 'National development distance running squad',
      status: 'active',
      coachId: 'coach-martinez',
      athleteIds: ['ath-001', 'ath-002', 'ath-003', 'ath-004', 'ath-005'],
      createdAt: new Date().toISOString(),
    },
  ]);

  const [teamInvitations, setTeamInvitations] = useState<TeamInvitation[]>([]);

  const [newAthletes, setNewAthletes] = useState<AthleteData[]>([]);

  const [healthMeasurements, setHealthMeasurements] = useState<HealthMeasurement[]>(INITIAL_HEALTH_MEASUREMENTS);

  useEffect(() => {
    const saved = loadDemoState();
    if (saved.googleFitSyncTime) setGoogleFitSyncTime(saved.googleFitSyncTime);
    if (saved.notificationPreferences) setNotificationPreferences(saved.notificationPreferences);
    if (saved.teams && saved.teams.length > 0) setTeams(saved.teams);
    if (saved.invitations) setTeamInvitations(saved.invitations);
    if (saved.newAthletes) setNewAthletes(saved.newAthletes);
    if (saved.healthMeasurements) setHealthMeasurements(saved.healthMeasurements);
  }, []);

  const [predictions, setPredictions] = useState<Record<string, PredictionResponse>>({});
  const [predictionStatus, setPredictionStatus] = useState<'loading' | 'success' | 'error' | 'missing'>('success');
  const [predictionError, setPredictionError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPredictions() {
      setPredictionStatus('loading');
      setPredictionError(null);
      try {
        const mayaMeasurements = healthMeasurements.filter((m) => m.userId === 'usr-001');
        const profileOverride = sessionProfileOverrides['ath-001'] || sessionProfileOverrides['usr-001'] || {};
        const profile = { ...INITIAL_ATHLETES[0].profile, ...profileOverride };
        
        const res = await fetchAthletePredictions(mayaMeasurements, profile);
        if (res.success && res.prediction) {
            setPredictions(prev => ({ ...prev, 'ath-001': res }));
            setPredictionStatus('success');
        } else {
            setPredictionStatus('error');
            setPredictionError(res.error || 'Failed to fetch predictions');
        }
      } catch (err) {
        setPredictionStatus('error');
        setPredictionError(err instanceof Error ? err.message : 'Unknown error');
      }
    }
    loadPredictions();
  }, [healthMeasurements, sessionProfileOverrides]);

  // State Auto-Persistence for Teams / Notifications / HealthTelemetry only (Profile overrides are strictly in-memory)
  useEffect(() => {
    if (teams.length > 0) {
      saveDemoState({ teams });
    }
  }, [teams]);

  useEffect(() => {
    saveDemoState({ invitations: teamInvitations });
  }, [teamInvitations]);

  useEffect(() => {
    saveDemoState({ newAthletes });
  }, [newAthletes]);

  const updateNotificationPreferences = useCallback((updates: Partial<NotificationPreferences>) => {
    setNotificationPreferences((prev) => {
      const merged = { ...prev, ...updates };
      saveDemoState({ notificationPreferences: merged });
      return merged;
    });
  }, []);

  // Resolved Coach Profile calculation
  const getCoachProfile = useCallback((): CoachProfileData => {
    const override = sessionProfileOverrides['coach-martinez'] || sessionProfileOverrides['usr-006'] || {};
    return {
      ...INITIAL_COACH_PROFILE,
      fullName: override.fullName ?? INITIAL_COACH_PROFILE.fullName,
      role: override.role ?? INITIAL_COACH_PROFILE.role,
      sport: override.sport ?? INITIAL_COACH_PROFILE.sport,
      age: override.age ?? INITIAL_COACH_PROFILE.age,
      height: override.height ?? INITIAL_COACH_PROFILE.height,
      weight: override.weight ?? INITIAL_COACH_PROFILE.weight,
    };
  }, [sessionProfileOverrides]);

  // Unified Athletes calculation combining original data, session overrides, and derived health metrics
  const athletes = useMemo(() => {
    const mayaMeasurements = healthMeasurements.filter((m) => m.userId === 'usr-001');

    const readiness = calculateReadiness(mayaMeasurements);
    const recovery = calculateRecovery(mayaMeasurements);
    const fatigue = calculateFatigue(mayaMeasurements);
    const performance = calculatePerformance(mayaMeasurements);

    const recommendationTitle =
      fatigue.level === 'High' || fatigue.level === 'Very High'
        ? 'Rest & active recovery only.'
        : readiness.score >= 85
        ? 'Optimal threshold day.'
        : 'Maintain your planned intensity.';

    const recommendationDesc =
      fatigue.level === 'High' || fatigue.level === 'Very High'
        ? 'Elevated load parameters warrant complete rest.'
        : readiness.score >= 85
        ? 'Progressively push intensity parameters.'
        : 'Focus on recovery after training.';

    const hrvVal = mayaMeasurements.find((m) => m.metric === 'hrv')?.value ?? 64;
    const sleepMinutes = mayaMeasurements.find((m) => m.metric === 'sleep')?.value ?? 432;
    const durationVal = mayaMeasurements.find((m) => m.metric === 'trainingDuration')?.value ?? 60;
    const rpeVal = mayaMeasurements.find((m) => m.metric === 'trainingRpe')?.value ?? 7;
    const loadVal = durationVal * rpeVal;
    const formattedSleep = `${Math.floor(sleepMinutes / 60)}h ${sleepMinutes % 60}m`;

    const mappedInitials = INITIAL_ATHLETES.map((ath) => {
      let email = `${ath.profile.firstName.toLowerCase()}@ludis.com`;
      if (ath.id === 'ath-001') email = 'maya@ludis.com';

      const override = sessionProfileOverrides[ath.id] || sessionProfileOverrides[ath.userId] || {};

      let firstName = ath.profile.firstName;
      let lastName = ath.profile.lastName;

      if (override.firstName !== undefined) {
        firstName = override.firstName;
      } else if (override.fullName !== undefined) {
        const parts = override.fullName.trim().split(/\s+/);
        firstName = parts[0] || '';
        lastName = parts.slice(1).join(' ') || '';
      }

      if (override.lastName !== undefined && override.fullName === undefined) {
        lastName = override.lastName;
      }

      const mergedProfile = {
        ...ath.profile,
        firstName,
        lastName,
        email: override.email || email,
        age: override.age ?? ath.profile.age,
        sport: override.sport ?? ath.profile.sport,
        role: override.role ?? override.competitionLevel ?? ath.profile.role,
        competitionLevel: override.competitionLevel ?? ath.profile.competitionLevel ?? 'National Development',
        seasonBlock: override.seasonBlock ?? ath.profile.seasonBlock ?? 'Mid-Season Prep',
        height: override.height ?? ath.profile.height ?? 172,
        weight: override.weight ?? ath.profile.weight ?? 62,
      };

      if (ath.id !== 'ath-001') return { ...ath, profile: mergedProfile };

      const athPrediction = predictions[ath.id]?.prediction;

      const newHistory = [...ath.performance.history];
      const todayStr = 'May 13';
      const currentPerfScore = athPrediction?.performance?.value ?? performance.score;

      const lastEntryIndex = newHistory.findIndex((h) => h.date === todayStr);
      if (lastEntryIndex !== -1) {
        newHistory[lastEntryIndex] = { date: todayStr, value: currentPerfScore };
      } else {
        newHistory.push({ date: todayStr, value: currentPerfScore });
      }

      return {
        ...ath,
        profile: mergedProfile,
        predictionStatus,
        predictionError: predictionError ?? undefined,
        readiness: {
          score: readiness.score,
          status: readiness.status,
          description: readiness.description,
        },
        performance: {
          ...ath.performance,
          score: currentPerfScore,
          history: newHistory,
        },
        recovery: {
          score: athPrediction?.recovery?.value ?? recovery.score,
          status: athPrediction?.recovery?.status ?? recovery.status,
        },
        fatigue: {
          level: athPrediction?.fatigueRisk?.label ?? fatigue.level,
          trend: fatigue.trend,
        },
        injuryRisk: athPrediction?.injuryRisk?.value ?? ath.injuryRisk ?? 12,
        recommendation: {
          title: recommendationTitle,
          description: recommendationDesc,
          confidence: 'High confidence',
        },
        contributors: {
          hrv: {
            value: hrvVal,
            unit: 'ms',
            status: hrvVal >= 60 ? 'Optimal' : 'Suppressed',
            description: hrvVal >= 60 ? 'Autonomic balance within normal range' : 'Parasympathetic suppression detected',
          },
          sleep: {
            value: formattedSleep,
            status: sleepMinutes >= 420 ? 'Optimal' : 'Deficit',
            description: sleepMinutes >= 420 ? 'Sleep duration meets target' : 'Elevated sleep debt',
          },
          trainingLoad: {
            value: loadVal,
            unit: 'AU',
            status: loadVal > 500 ? 'High' : loadVal > 200 ? 'Optimal' : 'Low',
            description: loadVal > 500 ? 'High training stimulus' : 'Balanced load',
          },
        },
      };
    });

    const mappedNew = newAthletes.map((ath) => {
      const override = sessionProfileOverrides[ath.id] || sessionProfileOverrides[ath.userId] || {};
      const mergedProfile = {
        ...ath.profile,
        firstName: override.firstName ?? ath.profile.firstName,
        lastName: override.lastName ?? ath.profile.lastName,
        age: override.age ?? ath.profile.age,
        sport: override.sport ?? ath.profile.sport,
        role: override.role ?? ath.profile.role,
        height: override.height ?? ath.profile.height ?? 170,
        weight: override.weight ?? ath.profile.weight ?? 65,
      };

      const athleteMeasurements = healthMeasurements.filter((m) => m.userId === ath.userId);
      const athReadiness = calculateReadiness(athleteMeasurements);
      const athRecovery = calculateRecovery(athleteMeasurements);
      const athFatigue = calculateFatigue(athleteMeasurements);
      const athPerformance = calculatePerformance(athleteMeasurements);

      const isNew = athleteMeasurements.length === 0;

      return {
        ...ath,
        profile: mergedProfile,
        readiness: {
          score: isNew ? 70 : athReadiness.score,
          status: isNew ? 'Moderate' : athReadiness.status,
          description: isNew ? 'Needs measurements' : athReadiness.description,
        },
        performance: {
          ...ath.performance,
          score: isNew ? 70 : athPerformance.score,
        },
        recovery: {
          score: isNew ? 70 : athRecovery.score,
          status: isNew ? 'Moderate' : athRecovery.status,
        },
        fatigue: {
          level: isNew ? 'Low' : athFatigue.level,
          trend: isNew ? 'Stable' : athFatigue.trend,
        },
      };
    });

    return [...mappedInitials, ...mappedNew];
  }, [healthMeasurements, sessionProfileOverrides, predictions, predictionStatus, predictionError, newAthletes]);

  // Update Athlete Profile Handler with Smart Height/Weight Measurement Logging
  const updateAthleteProfile = useCallback(
    (athleteIdOrUpdates: string | ProfileOverride, updates?: ProfileOverride) => {
      let targetId = 'ath-001';
      let payload: ProfileOverride = {};

      if (typeof athleteIdOrUpdates === 'string') {
        targetId = athleteIdOrUpdates;
        payload = updates || {};
      } else {
        payload = athleteIdOrUpdates;
      }

      // Find current resolved athlete to extract previous height & weight
      const currentAthlete = athletes.find((a) => a.id === targetId || a.userId === targetId) || athletes[0];
      const currentHeight = currentAthlete.profile.height ?? 172;
      const currentWeight = currentAthlete.profile.weight ?? 62;
      const userId = currentAthlete.userId || 'usr-001';

      const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fullTimestamp = `Today, ${timestampStr}`;
      const newLogs: ProfileMeasurementLog[] = [];

      // Generate history log ONLY if height numerical value actually changes
      if (payload.height !== undefined && payload.height !== currentHeight) {
        newLogs.push({
          id: `pml-height-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          userId,
          metric: 'height',
          value: payload.height,
          previousValue: currentHeight,
          unit: 'cm',
          timestamp: fullTimestamp,
        });
      }

      // Generate history log ONLY if weight numerical value actually changes
      if (payload.weight !== undefined && payload.weight !== currentWeight) {
        newLogs.push({
          id: `pml-weight-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          userId,
          metric: 'weight',
          value: payload.weight,
          previousValue: currentWeight,
          unit: 'kg',
          timestamp: fullTimestamp,
        });
      }

      if (newLogs.length > 0) {
        setProfileMeasurementLogs((prev) => [...newLogs, ...prev]);
      }

      setSessionProfileOverrides((prev) => ({
        ...prev,
        [targetId]: {
          ...(prev[targetId] || {}),
          ...payload,
        },
      }));
    },
    [athletes]
  );

  // Update Coach Profile Handler with Height/Weight Change Detection
  const updateCoachProfile = useCallback(
    (updates: Partial<CoachProfileData>) => {
      const currentCoach = getCoachProfile();
      const currentHeight = currentCoach.height ?? 180;
      const currentWeight = currentCoach.weight ?? 78;

      const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fullTimestamp = `Today, ${timestampStr}`;
      const newLogs: ProfileMeasurementLog[] = [];

      if (updates.height !== undefined && updates.height !== currentHeight) {
        newLogs.push({
          id: `pml-height-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          userId: currentCoach.userId,
          metric: 'height',
          value: updates.height,
          previousValue: currentHeight,
          unit: 'cm',
          timestamp: fullTimestamp,
        });
      }

      if (updates.weight !== undefined && updates.weight !== currentWeight) {
        newLogs.push({
          id: `pml-weight-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          userId: currentCoach.userId,
          metric: 'weight',
          value: updates.weight,
          previousValue: currentWeight,
          unit: 'kg',
          timestamp: fullTimestamp,
        });
      }

      if (newLogs.length > 0) {
        setProfileMeasurementLogs((prev) => [...newLogs, ...prev]);
      }

      setSessionProfileOverrides((prev) => ({
        ...prev,
        'coach-martinez': {
          ...(prev['coach-martinez'] || {}),
          ...updates,
        },
      }));
    },
    [getCoachProfile]
  );

  const getProfileMeasurementHistory = useCallback(
    (userId: string) => {
      return profileMeasurementLogs.filter((log) => log.userId === userId);
    },
    [profileMeasurementLogs]
  );

  // Fatigue alert check
  const checkFatigueAlert = useCallback((measurements: HealthMeasurement[]) => {
    const mayaMeasurements = measurements.filter((m) => m.userId === 'usr-001');
    const fatigue = calculateFatigue(mayaMeasurements);

    if (fatigue.level === 'High' || fatigue.level === 'Very High') {
      setNotifications((prevNotifs) => {
        const exists = prevNotifs.some(
          (n) => n.athleteId === 'ath-001' && n.title === 'Elevated Fatigue Indicator' && n.timestamp === 'Just now'
        );
        if (!exists) {
          const newAlert: DemoNotification = {
            id: `notif-fatigue-${Date.now()}`,
            title: 'Elevated Fatigue Indicator',
            message: 'Maya Chen is displaying elevated fatigue indicators - workload/recovery pattern warrants attention.',
            timestamp: 'Just now',
            type: 'alert',
            read: false,
            athleteId: 'ath-001',
          };
          return [newAlert, ...prevNotifs];
        }
        return prevNotifs;
      });
    }
  }, []);

  const saveDailyMeasurements = useCallback((
    newEntries: Omit<HealthMeasurement, 'id' | 'userId' | 'timestamp'>[]
  ) => {
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullDateStr = `Today, ${timestampStr}`;

    setHealthMeasurements((prev) => {
      let updated = [...prev];
      const metricKeys = newEntries.map((e) => e.metric);
      updated = updated.filter(
        (m) => !(m.userId === 'usr-001' && m.source === 'manual' && metricKeys.includes(m.metric) && m.timestamp.startsWith('Today'))
      );

      const logged: HealthMeasurement[] = newEntries.map((entry, index) => ({
        id: `hm-manual-${Date.now()}-${index}`,
        userId: 'usr-001',
        metric: entry.metric,
        value: entry.value,
        secondaryValue: entry.secondaryValue,
        unit: entry.unit,
        timestamp: fullDateStr,
        source: 'manual',
        notes: entry.notes,
      }));

      const finalMeasurements = [...updated, ...logged];
      saveDemoState({ healthMeasurements: finalMeasurements });
      checkFatigueAlert(finalMeasurements);
      return finalMeasurements;
    });
  }, [checkFatigueAlert]);

  const deleteHealthMeasurement = useCallback((id: string) => {
    setHealthMeasurements((prev) => {
      const finalMeasurements = prev.filter((m) => m.id !== id);
      saveDemoState({ healthMeasurements: finalMeasurements });
      checkFatigueAlert(finalMeasurements);
      return finalMeasurements;
    });
  }, [checkFatigueAlert]);

  const syncGoogleFitSources = useCallback(async () => {
    setGoogleFitSynced(true);
    const syncTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setGoogleFitSyncTime(`Today, ${syncTimeStr}`);
    saveDemoState({ googleFitSyncTime: `Today, ${syncTimeStr}` });

    setHealthMeasurements((prev) => {
      const updated = prev.filter(
        (m) => !(m.userId === 'usr-001' && m.source === 'google_fit' && m.timestamp.startsWith('Today'))
      );

      const synced: HealthMeasurement[] = [
        {
          id: `hm-gf-${Date.now()}-1`,
          userId: 'usr-001',
          metric: 'hrv',
          value: 68,
          unit: 'ms',
          timestamp: `Today, ${syncTimeStr}`,
          source: 'google_fit',
        },
        {
          id: `hm-gf-${Date.now()}-2`,
          userId: 'usr-001',
          metric: 'sleep',
          value: 465,
          unit: 'min',
          timestamp: 'Today, 8:00 AM',
          source: 'google_fit',
        },
        {
          id: `hm-gf-${Date.now()}-3`,
          userId: 'usr-001',
          metric: 'restingHeartRate',
          value: 57,
          unit: 'bpm',
          timestamp: 'Today, 8:00 AM',
          source: 'google_fit',
        },
        {
          id: `hm-gf-${Date.now()}-4`,
          userId: 'usr-001',
          metric: 'heartRate',
          value: 70,
          unit: 'bpm',
          timestamp: `Today, ${syncTimeStr}`,
          source: 'google_fit',
        },
      ];

      const finalMeasurements = [...updated, ...synced];
      saveDemoState({ healthMeasurements: finalMeasurements });
      checkFatigueAlert(finalMeasurements);
      return finalMeasurements;
    });
  }, [checkFatigueAlert]);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Teams Lifecycle API implementation
  const createTeam = useCallback((name: string, sport: string, description?: string) => {
    const newTeam: Team = {
      id: `team-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString(36)}`,
      name: name.trim(),
      sport: sport.trim(),
      description: description?.trim(),
      status: 'active',
      coachId: 'coach-martinez',
      athleteIds: [],
      createdAt: new Date().toISOString(),
    };
    setTeams((prev) => [...prev, newTeam]);
    return newTeam;
  }, []);

  const updateTeam = useCallback((teamId: string, updates: Partial<Omit<Team, 'id' | 'coachId' | 'athleteIds'>>) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, ...updates } : t))
    );
  }, []);

  const archiveTeam = useCallback((teamId: string) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, status: 'archived' } : t))
    );
  }, []);

  const addAthleteToTeam = useCallback((teamId: string, athleteId: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId && !t.athleteIds.includes(athleteId)
          ? { ...t, athleteIds: [...t.athleteIds, athleteId] }
          : t
      )
    );
  }, []);

  const removeAthleteFromTeam = useCallback((teamId: string, athleteId: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? { ...t, athleteIds: t.athleteIds.filter((id) => id !== athleteId) }
          : t
      )
    );
  }, []);

  const inviteAthleteToTeam = useCallback((teamId: string, name: string, email: string) => {
    const token = `inv_${Math.random().toString(36).substr(2, 9)}`;
    const team = teams.find((t) => t.id === teamId);
    const coach = getCoachProfile();
    
    const newInvite: TeamInvitation = {
      id: `inv-${Date.now()}`,
      teamId,
      teamName: team?.name || 'Distance Runners Elite',
      email: email.toLowerCase().trim(),
      athleteName: name.trim(),
      invitedBy: coach.fullName || 'Coach Martinez',
      status: 'pending',
      token,
      createdAt: new Date().toLocaleDateString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
    };
    
    setTeamInvitations((prev) => [...prev, newInvite]);
    return newInvite;
  }, [teams, getCoachProfile]);

  const resendInvitation = useCallback((invitationId: string) => {
    const token = `inv_${Math.random().toString(36).substr(2, 9)}`;
    setTeamInvitations((prev) =>
      prev.map((inv) =>
        inv.id === invitationId
          ? { ...inv, token, createdAt: new Date().toLocaleDateString() }
          : inv
      )
    );
    return teamInvitations.find((i) => i.id === invitationId);
  }, [teamInvitations]);

  const revokeInvitation = useCallback((invitationId: string) => {
    setTeamInvitations((prev) =>
      prev.map((inv) => (inv.id === invitationId ? { ...inv, status: 'revoked' } : inv))
    );
  }, []);

  const acceptInvitation = useCallback((token: string) => {
    const inv = teamInvitations.find((i) => i.token === token && i.status === 'pending');
    if (!inv) return null;

    const existingAthlete = athletes.find(
      (a) => a.profile.email?.toLowerCase() === inv.email.toLowerCase()
    );

    let athleteId = '';
    if (existingAthlete) {
      athleteId = existingAthlete.id;
    } else {
      athleteId = `ath-new-${Date.now()}`;
      const nameParts = inv.athleteName.split(/\s+/);
      const firstName = nameParts[0] || 'New';
      const lastName = nameParts.slice(1).join(' ') || 'Athlete';
      
      const newAthlete: AthleteData = {
        id: athleteId,
        userId: `usr-${athleteId}`,
        profile: {
          firstName,
          lastName,
          role: 'Athlete',
          avatar: '',
          age: 22,
          sport: 'Running',
          email: inv.email,
        },
        readiness: { score: 70, status: 'Moderate', description: 'Establish baseline' },
        performance: { score: 70, baseline: { min: 65, max: 75 }, history: [] },
        recovery: { score: 70, status: 'Moderate' },
        fatigue: { level: 'Low', trend: 'Stable' },
        recommendation: { title: 'Baseline Workup', description: 'Establish baseline', confidence: 'Low' },
        session: { title: 'Introductory Workup', time: '08:00', type: 'recovery', duration: '45m', focus: 'Mobility' },
        contributors: {
          hrv: { value: 60, unit: 'ms', status: 'Optimal', description: 'Autonomic stability' },
          sleep: { value: '7h 00m', status: 'Optimal', description: 'Normal' },
          trainingLoad: { value: 150, unit: 'AU', status: 'Optimal', description: 'Normal' },
        },
        competition: { opponent: 'TBD', date: 'May 25', time: '10:00' },
      };

      setNewAthletes((prev) => [...prev, newAthlete]);
    }

    setTeams((prev) =>
      prev.map((t) =>
        t.id === inv.teamId && !t.athleteIds.includes(athleteId)
          ? { ...t, athleteIds: [...t.athleteIds, athleteId] }
          : t
      )
    );

    setTeamInvitations((prev) =>
      prev.map((i) => (i.id === inv.id ? { ...i, status: 'accepted' } : i))
    );

    return inv;
  }, [teamInvitations, athletes]);

  const declineInvitation = useCallback((token: string) => {
    setTeamInvitations((prev) =>
      prev.map((i) => (i.token === token ? { ...i, status: 'revoked' } : i))
    );
  }, []);

  const getTeamById = useCallback((teamId: string) => {
    return teams.find((t) => t.id === teamId);
  }, [teams]);

  const getTeamAthletes = useCallback((teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return [];
    return athletes.filter((a) => team.athleteIds.includes(a.id));
  }, [teams, athletes]);

  const getTeamInvitations = useCallback((teamId: string) => {
    return teamInvitations.filter((i) => i.teamId === teamId);
  }, [teamInvitations]);

  const calculateTeamMetrics = useCallback((athleteIds: string[]) => {
    const teamAthletes = athletes.filter((a) => athleteIds.includes(a.id));
    const total = teamAthletes.length;
    if (total === 0) {
      return {
        total: 0,
        highReadiness: 0,
        moderateReadiness: 0,
        needsAttention: 0,
        averageReadiness: 0,
        highFatigue: 0,
        lowRecovery: 0,
      };
    }

    const highCount = teamAthletes.filter((a) => a.readiness.score >= 75).length;
    const moderateCount = teamAthletes.filter((a) => a.readiness.score >= 55 && a.readiness.score < 75).length;
    const attentionCount = teamAthletes.filter((a) => a.readiness.score < 55).length;
    const avgScore = Math.round(
      teamAthletes.reduce((sum, a) => sum + a.readiness.score, 0) / total
    );
    const fatigueCount = teamAthletes.filter((a) => a.fatigue.level === 'High' || a.fatigue.level === 'Very High').length;
    const recoveryCount = teamAthletes.filter((a) => a.recovery.score < 55).length;

    return {
      total,
      highReadiness: highCount,
      moderateReadiness: moderateCount,
      needsAttention: attentionCount,
      averageReadiness: avgScore,
      highFatigue: fatigueCount,
      lowRecovery: recoveryCount,
    };
  }, [athletes]);

  const getCurrentAthlete = useCallback(() => {
    const ath = athletes.find((a) => a.id === 'ath-001');
    return ath || athletes[0];
  }, [athletes]);

  const getAthleteById = useCallback((id: string) => {
    return athletes.find((a) => a.id === id);
  }, [athletes]);

  const contextValue = useMemo(() => ({
    athletes,
    notifications,
    healthMeasurements,
    googleFitSynced,
    googleFitSyncTime,
    activeAthleteId,
    setActiveAthleteId,
    getCurrentAthlete,
    getAthleteById,
    getCoachProfile,
    saveDailyMeasurements,
    deleteHealthMeasurement,
    syncGoogleFitSources,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    updateAthleteProfile,
    updateCoachProfile,
    profileMeasurementLogs,
    getProfileMeasurementHistory,
    notificationPreferences,
    updateNotificationPreferences,
    teams,
    teamInvitations,
    createTeam,
    updateTeam,
    archiveTeam,
    addAthleteToTeam,
    removeAthleteFromTeam,
    inviteAthleteToTeam,
    resendInvitation,
    revokeInvitation,
    acceptInvitation,
    declineInvitation,
    getTeamById,
    getTeamAthletes,
    getTeamInvitations,
    calculateTeamMetrics
  }), [
    athletes,
    notifications,
    healthMeasurements,
    googleFitSynced,
    googleFitSyncTime,
    activeAthleteId,
    setActiveAthleteId,
    getCurrentAthlete,
    getAthleteById,
    getCoachProfile,
    saveDailyMeasurements,
    deleteHealthMeasurement,
    syncGoogleFitSources,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    updateAthleteProfile,
    updateCoachProfile,
    profileMeasurementLogs,
    getProfileMeasurementHistory,
    notificationPreferences,
    updateNotificationPreferences,
    teams,
    teamInvitations,
    createTeam,
    updateTeam,
    archiveTeam,
    addAthleteToTeam,
    removeAthleteFromTeam,
    inviteAthleteToTeam,
    resendInvitation,
    revokeInvitation,
    acceptInvitation,
    declineInvitation,
    getTeamById,
    getTeamAthletes,
    getTeamInvitations,
    calculateTeamMetrics
  ]);

  return <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
