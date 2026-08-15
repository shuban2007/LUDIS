'use client';

// Ludis — Coach Team Details Page
// Interactive dashboard for a single team. Coordinates rosters, invitations, edits, and archives.
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demo/demo-context';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { AthleteRosterRow } from '@/components/coach/teams/athlete-roster-row';
import { PendingInvitations } from '@/components/coach/teams/pending-invitations';
import { InviteAthleteModal } from '@/components/coach/teams/invite-athlete-modal';
import { EditTeamModal } from '@/components/coach/teams/edit-team-modal';
import { RemoveAthleteDialog } from '@/components/coach/teams/remove-athlete-dialog';
import { ArchiveTeamDialog } from '@/components/coach/teams/archive-team-dialog';
import { sendTeamInvitationEmail } from '@/lib/email/invitation-email';
import type { Team } from '@/lib/types/team';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ teamId: string }>;
}

export default function TeamDetailPage({ params }: PageProps) {
  const { teamId } = React.use(params);
  const router = useRouter();
  
  const {
    getTeamById,
    getTeamAthletes,
    getTeamInvitations,
    calculateTeamMetrics,
    updateTeam,
    archiveTeam,
    removeAthleteFromTeam,
    inviteAthleteToTeam,
    resendInvitation,
    revokeInvitation,
    teams,
  } = useDemo();

  const team = getTeamById(teamId);

  // Modals state
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  
  // Roster remove state
  const [removeTarget, setRemoveTarget] = useState<{ id: string; name: string } | null>(null);

  // Toast feedback message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Storage for the last generated joining link (for easy simulation)
  const [simulatedJoinUrl, setSimulatedJoinUrl] = useState<string | null>(null);

  if (!team) {
    return (
      <div className="max-w-4xl space-y-4 text-left mx-auto">
        <PageHeader title="Team Not Found" section="Teams" />
        <p className="text-foreground-secondary">
          This coaching group does not exist or has been archived.
        </p>
        <Link
          href="/coach/teams"
          className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 border border-border-default rounded-lg hover:bg-surface-2 transition-colors uppercase cursor-pointer"
        >
          &lt; Back to Teams
        </Link>
      </div>
    );
  }

  const athletes = getTeamAthletes(team.id);
  const invitations = getTeamInvitations(team.id);
  const metrics = calculateTeamMetrics(team.athleteIds);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Invitation submit handler
  const handleInvite = async (name: string, email: string) => {
    const invite = inviteAthleteToTeam(team.id, name, email);
    
    // Generate simulated invitation url
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const joinUrl = `${origin}/join/team/${invite.token}`;

    const res = await sendTeamInvitationEmail({
      recipientName: name,
      recipientEmail: email,
      teamName: team.name,
      coachName: 'Coach Martinez',
      invitationUrl: joinUrl,
    });

    if (res.mode === 'demo') {
      setSimulatedJoinUrl(joinUrl);
      showToast('Invitation created. Demo join link generated.');
    } else {
      showToast('Invitation email successfully sent.');
    }
  };

  const handleResend = async (id: string) => {
    const invite = resendInvitation(id);
    if (!invite) return;

    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const joinUrl = `${origin}/join/team/${invite.token}`;

    await sendTeamInvitationEmail({
      recipientName: invite.athleteName,
      recipientEmail: invite.email,
      teamName: team.name,
      coachName: 'Coach Martinez',
      invitationUrl: joinUrl,
    });

    setSimulatedJoinUrl(joinUrl);
    showToast('Demo invitation link regenerated.');
  };

  const handleRevoke = (id: string) => {
    revokeInvitation(id);
    showToast('Invitation revoked.');
  };

  const handleSaveTeamDetails = (updates: Partial<Omit<Team, 'id' | 'coachId' | 'athleteIds'>>) => {
    updateTeam(team.id, updates);
    showToast('Team details updated.');
  };

  const handleArchiveTeam = () => {
    archiveTeam(team.id);
    router.push('/coach/teams');
  };

  const handleRemoveAthlete = () => {
    if (!removeTarget) return;
    removeAthleteFromTeam(team.id, removeTarget.id);
    showToast(`${removeTarget.name} removed from team.`);
    setRemoveTarget(null);
  };

  // Roster email maps
  const activeEmails = athletes.map((a) => a.profile.email?.toLowerCase() || '');
  const pendingEmails = invitations.filter((i) => i.status === 'pending').map((i) => i.email.toLowerCase());

  const otherTeamNames = teams.filter((t) => t.id !== team.id).map((t) => t.name);

  return (
    <div className="max-w-6xl mx-auto space-y-6 select-none text-left">
      {/* Toast Alert Feedback Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-brand text-brand-foreground text-xs font-bold px-4 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{team.name}</h1>
          <p className="text-sm text-foreground-secondary mt-1">
            {team.sport} • {metrics.total} {metrics.total === 1 ? 'athlete' : 'athletes'} active
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsInviteOpen(true)}
            className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider"
          >
            + Add Athlete
          </button>
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="px-3.5 py-1.5 border border-border-default hover:bg-surface-2 text-foreground text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer"
          >
            Edit Team
          </button>
          <button
            type="button"
            onClick={() => setIsArchiveOpen(true)}
            className="px-3.5 py-1.5 border border-border-default hover:bg-danger/10 hover:text-danger text-foreground-muted hover:border-danger/30 text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer"
          >
            Archive Team
          </button>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">Athletes</span>
          <h2 className="text-3xl font-bold text-foreground mt-1.5 font-mono">{metrics.total}</h2>
        </Card>
        <Card className="p-4 text-center">
          <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">High Readiness</span>
          <h2 className="text-3xl font-bold text-foreground mt-1.5 font-mono">{metrics.highReadiness}</h2>
        </Card>
        <Card className="p-4 text-center">
          <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">Needs Attention</span>
          <h2 className="text-3xl font-bold text-foreground mt-1.5 font-mono">{metrics.needsAttention}</h2>
        </Card>
        <Card className="p-4 text-center">
          <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">Team Readiness</span>
          <h2 className="text-3xl font-bold text-brand mt-1.5 font-mono">{metrics.averageReadiness}%</h2>
        </Card>
      </div>

      {/* Grid: Athletes Roster & Invitations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Athlete Roster list */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand">
            Team Athletes
          </h3>

          {athletes.length === 0 ? (
            <Card className="p-8 border border-dashed border-border-default rounded-2xl text-center space-y-3">
              <h4 className="text-xs font-bold text-foreground">No athletes yet</h4>
              <p className="text-xs text-foreground-secondary">
                Invite your first athlete to this team.
              </p>
              <button
                type="button"
                onClick={() => setIsInviteOpen(true)}
                className="inline-flex bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider"
              >
                Invite Athlete
              </button>
            </Card>
          ) : (
            <div className="space-y-2">
              {athletes.map((ath) => (
                <AthleteRosterRow
                  key={ath.id}
                  athlete={ath}
                  onRemoveClick={(id, name) => setRemoveTarget({ id, name })}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Pending Invitations list */}
        <div className="lg:col-span-4">
          <PendingInvitations
            invitations={invitations}
            onResend={handleResend}
            onRevoke={handleRevoke}
            lastSimulatedUrl={simulatedJoinUrl}
            onClearSimulatedUrl={() => setSimulatedJoinUrl(null)}
          />
        </div>
      </div>

      {/* Invitation Modals & Confirmation Dialogs */}
      {isInviteOpen && (
        <InviteAthleteModal
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
          onSend={handleInvite}
          activeEmails={activeEmails}
          pendingEmails={pendingEmails}
        />
      )}

      {isEditOpen && (
        <EditTeamModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          team={team}
          onSave={handleSaveTeamDetails}
          existingTeamNames={otherTeamNames}
        />
      )}

      <ArchiveTeamDialog
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        teamName={team.name}
        onConfirm={handleArchiveTeam}
      />

      <RemoveAthleteDialog
        isOpen={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        athleteName={removeTarget?.name || ''}
        onConfirm={handleRemoveAthlete}
      />
    </div>
  );
}
