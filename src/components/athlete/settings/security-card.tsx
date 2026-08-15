'use client';

// Ludis — Security Card Component
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

export function SecurityCard() {
  return (
    <Card className="p-5 text-left">
      <CardTitle>
        Security
      </CardTitle>
      <CardDescription>
        Monitor your active sessions and credentials security.
      </CardDescription>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between py-2 border-b border-border-subtle">
          <span className="font-semibold text-foreground">Current Session</span>
          <StatusBadge status="positive" label="Active" size="sm" />
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="font-semibold text-foreground">Demo Account</span>
          <span className="text-foreground-secondary font-mono">Connected</span>
        </div>
      </div>
    </Card>
  );
}
