'use client';

// Ludis — Coach Team Pending Invitations List Component
import type { TeamInvitation } from '@/lib/types/team';
import { Card } from '@/components/ui/card';

interface PendingInvitationsProps {
  invitations: TeamInvitation[];
  onResend: (id: string) => void;
  onRevoke: (id: string) => void;
  lastSimulatedUrl: string | null;
  onClearSimulatedUrl: () => void;
}

export function PendingInvitations({
  invitations,
  onResend,
  onRevoke,
  lastSimulatedUrl,
  onClearSimulatedUrl,
}: PendingInvitationsProps) {
  const activePending = invitations.filter((i) => i.status === 'pending');

  return (
    <div className="space-y-4 text-left">
      <h3 className="text-xs font-bold uppercase tracking-widest text-brand">
        Pending Invitations
      </h3>

      {/* Demo Email Mode Link Alert Banner */}
      {lastSimulatedUrl && (
        <Card className="p-4 border-l-4 border-l-brand bg-brand-soft/10 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-brand uppercase tracking-wider">Demo Link Generated</span>
              <p className="text-xs text-foreground-secondary mt-1">
                An invitation token has been created. Copy this link and open it in your browser to simulate the athlete join flow:
              </p>
            </div>
            <button
              type="button"
              onClick={onClearSimulatedUrl}
              className="text-xs text-foreground-muted hover:text-foreground font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              readOnly
              value={lastSimulatedUrl}
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="flex-1 bg-surface-3 border border-border-default rounded px-2.5 py-1 text-xs font-mono text-foreground font-bold select-all focus:outline-none"
            />
          </div>
        </Card>
      )}

      {activePending.length === 0 ? (
        <p className="text-xs text-foreground-muted">No pending invitations.</p>
      ) : (
        <div className="space-y-2">
          {activePending.map((inv) => (
            <Card
              key={inv.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-border-subtle bg-surface-2/10"
            >
              <div className="text-left">
                <span className="text-sm font-semibold text-foreground">
                  {inv.athleteName}
                </span>
                <p className="text-xs text-foreground-secondary font-mono mt-0.5">{inv.email}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
                  <span className="text-[10px] text-foreground-muted uppercase font-bold tracking-wider">
                    Invitation pending • Sent {inv.createdAt}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => onResend(inv.id)}
                  className="text-[10px] font-bold px-2.5 py-1 bg-surface-3 hover:bg-surface-4 text-foreground rounded border border-border-default uppercase cursor-pointer"
                >
                  Resend
                </button>
                <button
                  type="button"
                  onClick={() => onRevoke(inv.id)}
                  className="text-[10px] font-bold px-2.5 py-1 bg-surface-3 hover:bg-danger/10 hover:text-danger text-foreground-muted rounded border border-border-default hover:border-danger/30 uppercase cursor-pointer"
                >
                  Revoke
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
