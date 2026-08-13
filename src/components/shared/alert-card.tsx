// Ludis — AlertCard
// Displays meaningful alerts with severity. Not for decoration.

import { Card } from '@/components/ui/card';
import type { StatusSeverity } from '@/lib/types';

interface AlertCardProps {
  severity: StatusSeverity;
  title: string;
  message: string;
  actionLabel?: string;
  actionUrl?: string;
}

const iconMap: Record<StatusSeverity, React.ReactNode> = {
  risk: (
    <svg className="h-5 w-5 text-status-risk" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5 text-status-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5 text-status-info" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  positive: (
    <svg className="h-5 w-5 text-status-positive" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function AlertCard({ severity, title, message, actionLabel, actionUrl }: AlertCardProps) {
  return (
    <Card status={severity}>
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">{iconMap[severity]}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-primary">{title}</h4>
          <p className="mt-0.5 text-xs text-text-secondary leading-relaxed">{message}</p>
          {actionLabel && actionUrl && (
            <a
              href={actionUrl}
              className="inline-block mt-2 text-xs font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              {actionLabel} →
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
