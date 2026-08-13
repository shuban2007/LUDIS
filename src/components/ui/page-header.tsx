// Ludis UI — PageHeader
// Consistent page title with optional subtitle, actions, and breadcrumb context

import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  /** Section label above the title */
  section?: string;
}

export function PageHeader({ title, subtitle, actions, section }: PageHeaderProps) {
  return (
    <header className="mb-6">
      {section && (
        <span className="ludis-section-title mb-1 block">{section}</span>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-text-primary sm:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </header>
  );
}
