// Ludis Domain Types — Coach, Teams, Permissions

import type { ID, ISODateString } from './common';
import type { Sport } from './athlete';

/** Coach profile */
export interface CoachProfile {
  id: ID;
  userId: ID;
  name: string;
  sports: Sport[];
  teamIds: ID[];
  createdAt: ISODateString;
}

/** Permission scope — what data a coach can see for a specific athlete */
export interface AthletePermission {
  id: ID;
  athleteId: ID;
  coachId: ID;
  grantedAt: ISODateString;
  /** Specific data scopes the athlete has granted */
  scopes: PermissionScope[];
  status: 'active' | 'pending' | 'revoked';
}

/** Granular permission scopes */
export type PermissionScope =
  | 'performance'
  | 'recovery'
  | 'fatigue'
  | 'training_sessions'
  | 'events'
  | 'recommendations'
  | 'body_metrics'
  | 'full_profile';

/** Team */
export interface Team {
  id: ID;
  name: string;
  sport: Sport;
  coachId: ID;
  createdAt: ISODateString;
}

/** Team member — athlete's relation to a team */
export interface TeamMember {
  athleteId: ID;
  teamId: ID;
  athleteName: string;
  sport: Sport;
  joinedAt: ISODateString;
}

/** Coach access summary — what a coach can see across their athletes */
export interface CoachAccessSummary {
  coachId: ID;
  athletes: {
    athleteId: ID;
    athleteName: string;
    teamId: ID;
    permissions: PermissionScope[];
  }[];
}
