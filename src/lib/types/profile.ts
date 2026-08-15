// Ludis — Profile & Ephemeral Session Measurement Types

export interface ProfileMeasurementLog {
  id: string;
  userId: string;
  metric: 'height' | 'weight';
  value: number;
  previousValue?: number;
  unit: 'cm' | 'kg';
  timestamp: string;
}

export interface ProfileOverride {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  sport?: string;
  competitionLevel?: string;
  seasonBlock?: string;
  role?: string;
  height?: number;
  weight?: number;
  avatar?: string;
  email?: string;
}

export type SessionProfileOverrides = Record<string, ProfileOverride>;

export interface CoachProfileData {
  id: string;
  userId: string;
  fullName: string;
  role: string;
  sport: string;
  age: number;
  height?: number;
  weight?: number;
  email?: string;
  avatar?: string;
}
