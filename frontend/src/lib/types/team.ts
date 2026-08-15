export interface Team {
  id: string;
  name: string;
  sport: string;
  description?: string;
  status: 'active' | 'archived';
  coachId: string;
  athleteIds: string[];
  createdAt: string;
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  teamName: string;
  email: string;
  athleteName: string;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  token: string;
  createdAt: string;
  expiresAt: string;
}
