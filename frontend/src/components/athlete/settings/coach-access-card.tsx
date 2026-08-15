'use client';

// Ludis — Coach Access Card Component
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

export function CoachAccessCard() {
  return (
    <Card className="p-5 text-left w-full min-w-0">
      <CardTitle>
        Privacy & Access
      </CardTitle>
      <CardDescription>
        Control which coaches can access your raw metrics and performance data.
      </CardDescription>

      <div className="mt-4 space-y-3 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-border-subtle">
          <div className="text-left min-w-0">
            <span className="text-sm font-semibold text-foreground">Coach Martinez</span>
            <p className="text-xs text-foreground-muted mt-0.5">Performance · Recovery · Training Sessions</p>
          </div>
          <StatusBadge status="positive" label="Active" size="sm" className="shrink-0 self-start sm:self-auto" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
          <div className="text-left min-w-0">
            <span className="text-sm font-semibold text-foreground">Coach Williams</span>
            <p className="text-xs text-foreground-muted mt-0.5">Pending access request</p>
          </div>
          <div className="flex gap-2 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              className="text-[10px] font-bold px-2.5 py-1 bg-brand text-brand-foreground hover:bg-brand-hover rounded transition-colors uppercase cursor-pointer shrink-0"
            >
              Approve
            </button>
            <button
              type="button"
              className="text-[10px] font-bold px-2.5 py-1 bg-surface-2 text-foreground-muted hover:bg-surface-3 rounded transition-colors border border-border-default uppercase cursor-pointer shrink-0"
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
