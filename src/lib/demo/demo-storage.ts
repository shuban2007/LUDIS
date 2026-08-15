import type { Team, TeamInvitation } from '@/lib/types/team';
import type { AthleteData } from '@/data/demo/demo-data';
import type { HealthMeasurement } from '@/lib/types/health-measurement';

interface DemoStorageState {
  teams?: Team[];
  invitations?: TeamInvitation[];
  healthMeasurements?: HealthMeasurement[];
  notificationPreferences?: {
    performanceAlerts: boolean;
    recoveryAlerts: boolean;
    trainingReminders: boolean;
    competitionReminders: boolean;
  };
  googleFitSynced?: boolean;
  googleFitSyncTime?: string;
  newAthletes?: AthleteData[];
}

const STORAGE_KEY = 'ludis-demo-storage';

export function loadDemoState(): DemoStorageState {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as DemoStorageState;
  } catch (err) {
    console.error('Failed to load demo storage state:', err);
    return {};
  }
}

export function saveDemoState(state: DemoStorageState): void {
  if (typeof window === 'undefined') return;
  try {
    // Merge with current state
    const current = loadDemoState();
    const merged = { ...current, ...state };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (err) {
    console.error('Failed to save demo storage state:', err);
  }
}

export function clearDemoState(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear demo storage state:', err);
  }
}
