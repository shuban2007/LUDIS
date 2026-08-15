'use client';

// Ludis — Health Data Card Component
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

interface HealthDataCardProps {
  googleFitSyncTime: string;
  onSync: () => Promise<void>;
}

export function HealthDataCard({ googleFitSyncTime, onSync }: HealthDataCardProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'complete'>('idle');

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncStatus('syncing');
    setTimeout(async () => {
      await onSync();
      setIsSyncing(false);
      setSyncStatus('complete');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 1500);
  };

  return (
    <div className="space-y-4 text-left min-w-0">
      <h3 className="text-xs font-bold uppercase tracking-widest text-brand">
        Data & Integrations
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
        {/* Google Fit Card */}
        <Card className="p-5 flex flex-col justify-between min-h-[160px] w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div className="space-y-1 min-w-0">
              <h4 className="text-sm font-bold text-foreground">Google Fit Connection</h4>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Syncs Heart Rate, HRV, Sleep duration, and Workout signals.
              </p>
            </div>
            <StatusBadge status="positive" label="Connected" size="sm" className="shrink-0 self-start" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-border-subtle">
            <span className="text-[10px] text-foreground-muted font-mono truncate">
              Last synced: {googleFitSyncTime}
            </span>
            <button
              type="button"
              onClick={handleSync}
              disabled={isSyncing}
              className="text-[11px] font-bold tracking-wider uppercase bg-surface-2 hover:bg-surface-3 text-foreground px-3 py-1.5 border border-border-default rounded-lg transition-colors cursor-pointer disabled:opacity-50 shrink-0"
            >
              {syncStatus === 'syncing'
                ? 'SYNCING...'
                : syncStatus === 'complete'
                ? 'SYNC COMPLETE'
                : 'SYNC NOW'}
            </button>
          </div>
        </Card>

        {/* Wearable Card */}
        <Card className="p-5 flex flex-col justify-between min-h-[160px] w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div className="space-y-1 min-w-0">
              <h4 className="text-sm font-bold text-foreground">Future Wearables Sync</h4>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Connect external smart watches, rings, or bands.
              </p>
            </div>
            <StatusBadge status="info" label="Not Connected" size="sm" className="shrink-0 self-start" />
          </div>
          <div className="flex justify-end mt-4 pt-3 border-t border-border-subtle">
            <button
              type="button"
              className="text-[11px] font-bold tracking-wider uppercase bg-surface-2 hover:bg-surface-3 text-foreground-secondary px-3 py-1.5 border border-border-default rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Connect
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
