'use client';

// Ludis — Coach Access Card Component
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

export function CoachAccessCard() {
  return (
    <Card className="p-5 text-left">
      <CardTitle>
        Privacy & Access
      </CardTitle>
      <CardDescription>
        Control which coaches can access your raw metrics and performance data.
      </CardDescription>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-border-subtle">
          <div className="text-left">
            <span className="text-sm font-semibold text-foreground">Coach Martinez</span>
            <p className="text-xs text-foreground-muted mt-0.5">Performance · Recovery · Training Sessions</p>
          </div>
          <StatusBadge status="positive" label="Active" size="sm" />
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="text-left">
            <span className="text-sm font-semibold text-foreground">Coach Williams</span>
            <p className="text-xs text-foreground-muted mt-0.5">Pending access request</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="text-[10px] font-bold px-2.5 py-1 bg-brand text-brand-foreground hover:bg-brand-hover rounded transition-colors uppercase cursor-pointer"
            >
              Approve
            </button>
            <button
              type="button"
              className="text-[10px] font-bold px-2.5 py-1 bg-surface-2 text-foreground-muted hover:bg-surface-3 rounded transition-colors border border-border-default uppercase cursor-pointer"
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
