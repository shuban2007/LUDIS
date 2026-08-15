// Ludis UI — States: Loading, Empty, Error

import type { ReactNode } from 'react';

// ── Loading State ──

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center" role="status" aria-live="polite">
      <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-border-default border-t-brand-primary" />
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  );
}

// ── Empty State ──

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 text-text-muted">{icon}</div>}
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-text-secondary max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ── Error State ──

interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  retry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center" role="alert">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-status-risk-bg">
        <svg
          className="h-6 w-6 text-status-risk"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      <p className="mt-1 text-sm text-text-secondary max-w-sm">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-4 text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
