// Ludis UI — StatusBadge
// Displays status with semantic color. Not color-alone — always includes text label.

import type { StatusSeverity } from '@/lib/types';

interface StatusBadgeProps {
  status: StatusSeverity;
  label: string;
  size?: 'sm' | 'md';
  className?: string;
}

const statusStyles: Record<StatusSeverity, string> = {
  positive:
    'bg-status-positive-bg text-status-positive border-status-positive-border',
  warning:
    'bg-status-warning-bg text-status-warning border-status-warning-border',
  risk: 'bg-status-risk-bg text-status-risk border-status-risk-border',
  info: 'bg-status-info-bg text-status-info border-status-info-border',
};

const sizeStyles = {
  sm: 'text-[11px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export function StatusBadge({ status, label, size = 'md', className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${statusStyles[status]} ${sizeStyles[size]} ${className}`}
      role="status"
      aria-label={label}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: 'currentColor' }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
