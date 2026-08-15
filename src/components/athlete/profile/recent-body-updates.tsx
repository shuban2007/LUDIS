'use client';

// Ludis — Recent Body Updates Component (Compact session measurement history)
import type { ProfileMeasurementLog } from '@/lib/types/profile';
import { Card } from '@/components/ui/card';

interface RecentBodyUpdatesProps {
  logs: ProfileMeasurementLog[];
}

export function RecentBodyUpdates({ logs }: RecentBodyUpdatesProps) {
  if (!logs || logs.length === 0) {
    return null;
  }

  return (
    <Card className="p-5 text-left space-y-3">
      <div className="flex items-center justify-between border-b border-border-subtle pb-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-brand">
          Recent Body Updates
        </h3>
        <span className="text-[10px] text-foreground-muted font-mono uppercase">
          Session History ({logs.length})
        </span>
      </div>

      <div className="space-y-2">
        {logs.map((log) => {
          const isWeight = log.metric === 'weight';
          const title = isWeight ? 'Weight' : 'Height';
          const unit = log.unit;

          return (
            <div
              key={log.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-surface-2 border border-border-subtle text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground capitalize">{title}</span>
                <span className="font-bold font-mono text-brand">
                  {log.value} {unit}
                </span>
                {log.previousValue !== undefined && (
                  <span className="text-[11px] text-foreground-muted">
                    (from {log.previousValue} {unit})
                  </span>
                )}
              </div>

              <span className="text-[10px] text-foreground-muted font-mono">
                {log.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
