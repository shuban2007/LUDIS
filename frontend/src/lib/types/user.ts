// Ludis Domain Types — User, Auth, Roles

import type { ID, ISODateString } from './common';

/** Application roles */
export type UserRole = 'athlete' | 'coach';

/** User — base identity shared by athletes and coaches */
export interface User {
  id: ID;
  email: string;
  role: UserRole;
  displayName: string;
  avatarUrl?: string;
  createdAt: ISODateString;
  onboardingComplete: boolean;
}

/** Auth session — Supabase-compatible session shape */
export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: ISODateString;
}

/** Auth state for the frontend */
export interface AuthState {
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
}
