// Ludis — Utility functions

/**
 * Format a date relative to now (e.g., "2 days ago", "in 17 days")
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0) return `in ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
}

/**
 * Format a date as short string (e.g., "Aug 13")
 */
export function formatShortDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date as full string (e.g., "August 13, 2026")
 */
export function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format a score as percentage
 */
export function formatScore(score: number, max: number): number {
  return Math.round((score / max) * 100);
}

/**
 * Get CSS class for status severity
 */
export function getStatusClass(
  status: 'positive' | 'warning' | 'risk' | 'info'
): string {
  const map = {
    positive: 'ludis-status-positive',
    warning: 'ludis-status-warning',
    risk: 'ludis-status-risk',
    info: 'ludis-status-info',
  };
  return map[status];
}

/**
 * Get color token for recovery level
 */
export function getRecoveryColor(level: string): string {
  switch (level) {
    case 'optimal':
    case 'good':
      return 'var(--status-positive)';
    case 'moderate':
      return 'var(--status-warning)';
    case 'low':
    case 'poor':
      return 'var(--status-risk)';
    default:
      return 'var(--text-muted)';
  }
}

/**
 * Get color token for fatigue level
 */
export function getFatigueColor(level: string): string {
  switch (level) {
    case 'low':
      return 'var(--status-positive)';
    case 'moderate':
      return 'var(--status-warning)';
    case 'elevated':
    case 'high':
      return 'var(--status-risk)';
    default:
      return 'var(--text-muted)';
  }
}

/**
 * Get color token for confidence level
 */
export function getConfidenceColor(level: string): string {
  switch (level) {
    case 'high':
      return 'var(--confidence-high)';
    case 'moderate':
      return 'var(--confidence-moderate)';
    case 'low':
      return 'var(--confidence-low)';
    default:
      return 'var(--text-muted)';
  }
}
