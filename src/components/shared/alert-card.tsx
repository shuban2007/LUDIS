// Ludis — AlertCard
// Displays meaningful alerts using a premium glass alert surface.

'use client';

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
    <svg className="h-5 w-5 text-danger shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5 text-warning shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5 text-info shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  positive: (
    <svg className="h-5 w-5 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const borderClassMap: Record<StatusSeverity, string> = {
  risk: 'border-l-danger',
  warning: 'border-l-warning',
  info: 'border-l-info',
  positive: 'border-l-success',
};

export function AlertCard({ severity, title, message, actionLabel, actionUrl }: AlertCardProps) {
  return (
    <Card className={`glass-subtle border-l-4 ${borderClassMap[severity]} p-4 rounded-xl`}>
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">{iconMap[severity]}</div>
        <div className="flex-1 min-w-0 text-left">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <p className="mt-0.5 text-xs text-foreground-secondary leading-relaxed">{message}</p>
          {actionLabel && actionUrl && (
            <a
              href={actionUrl}
              className="inline-block mt-2 text-xs font-semibold text-brand hover:text-brand-hover transition-colors"
            >
              {actionLabel} →
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
