'use client';

// Ludis — Join Team Invitation Acceptance Page
// Validates tokens, handles athlete accepts/declines, and performs team joins.
import React, { useState } from 'react';
import { useDemo } from '@/lib/demo/demo-context';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ token: string }>;
}

export default function JoinTeamPage({ params }: PageProps) {
  const { token } = React.use(params);
  const { teamInvitations, acceptInvitation, declineInvitation } = useDemo();

  const invitation = teamInvitations.find((i) => i.token === token);

  const [joinStatus, setJoinStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [isProcessing, setIsProcessing] = useState(false);

  // Validation checks
  const isInvalid =
    !invitation ||
    invitation.status === 'expired' ||
    invitation.status === 'revoked' ||
    (invitation.status === 'accepted' && joinStatus === 'pending');

  const handleAccept = () => {
    setIsProcessing(true);
    setTimeout(() => {
      acceptInvitation(token);
      setJoinStatus('accepted');
      setIsProcessing(false);
    }, 1000);
  };

  const handleDecline = () => {
    setIsProcessing(true);
    setTimeout(() => {
      declineInvitation(token);
      setJoinStatus('declined');
      setIsProcessing(false);
    }, 600);
  };

  if (isInvalid) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 select-none">
        <Card className="w-full max-w-md p-6 text-center space-y-4 border-border-default shadow-md">
          <h1 className="text-2xl font-black text-brand tracking-widest">LUDIS</h1>
          <CardTitle>Invitation Unavailable</CardTitle>
          <CardDescription>
            This invitation may have expired, been revoked, or already been accepted.
          </CardDescription>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2.5 px-6 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
            >
              Go to Home Page
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 select-none">
      <Card className="w-full max-w-md p-6 text-center space-y-5 border-border-default shadow-lg">
        <h1 className="text-2xl font-black text-brand tracking-widest">LUDIS</h1>

        {joinStatus === 'pending' && (
          <>
            <div className="space-y-2">
              <CardTitle>You&apos;re Invited to Join</CardTitle>
              <h2 className="text-lg font-bold text-foreground">{invitation.teamName}</h2>
              <p className="text-xs text-foreground-secondary">
                Invited by {invitation.invitedBy}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-2 text-left space-y-1">
              <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">Recipient Info</span>
              <p className="text-sm font-semibold text-foreground">{invitation.athleteName}</p>
              <p className="text-xs text-foreground-secondary font-mono">{invitation.email}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleDecline}
                disabled={isProcessing}
                className="flex-1 px-4 py-2.5 border border-border-default hover:bg-surface-2 text-foreground-secondary text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer disabled:opacity-50"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={handleAccept}
                disabled={isProcessing}
                className="flex-1 bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2.5 px-6 rounded-lg transition-colors uppercase tracking-wider cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'JOINING TEAM...' : 'ACCEPT INVITATION'}
              </button>
            </div>
          </>
        )}

        {joinStatus === 'accepted' && (
          <div className="space-y-4 py-2">
            <div className="h-12 w-12 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <CardTitle>Welcome to the Team!</CardTitle>
            <p className="text-sm text-foreground-secondary">
              You are now part of <strong>{invitation.teamName}</strong>.
            </p>
            <div className="pt-2">
              <Link
                href={`/coach/teams/${invitation.teamId}`}
                className="inline-flex bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2.5 px-6 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
              >
                Go to Team Details
              </Link>
            </div>
          </div>
        )}

        {joinStatus === 'declined' && (
          <div className="space-y-4 py-2">
            <CardTitle>Invitation Declined</CardTitle>
            <p className="text-sm text-foreground-secondary">
              You have declined the invitation to join <strong>{invitation.teamName}</strong>.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex bg-surface-3 hover:bg-surface-4 text-foreground font-semibold text-xs py-2.5 px-6 rounded-lg transition-colors border border-border-default uppercase tracking-wider cursor-pointer"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
