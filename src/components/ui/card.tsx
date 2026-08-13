// Ludis UI — Card
// Base card with consistent surface styling. Supports header, body, footer.

import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  /** Status border (left accent) */
  status?: 'positive' | 'warning' | 'risk' | 'info';
}

export function Card({ children, className = '', interactive, status }: CardProps) {
  const base = interactive ? 'ludis-card-interactive' : 'ludis-card';
  const statusClass = status ? `ludis-status-${status}` : '';

  return (
    <div className={`${base} ${statusClass} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  action?: ReactNode;
}

export function CardHeader({ children, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">{children}</div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-semibold text-text-primary">{children}</h3>;
}

export function CardDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm text-text-secondary leading-relaxed">{children}</p>;
}
