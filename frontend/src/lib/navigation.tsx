// Ludis — Centralized Navigation Architecture & Route Matching Utility

import type { ReactNode } from 'react';
import {
  DashboardIcon,
  PerformanceIcon,
  RecoveryIcon,
  FatigueIcon,
  InsightsIcon,
  EventsIcon,
  ProgressIcon,
  NotificationsIcon,
  ProfileIcon,
  TeamIcon,
  AthletesIcon,
} from '@/components/ui/icons';

export type NavMatchMode = 'exact' | 'section';

export interface NavItem {
  label: string;
  href: string;
  match: NavMatchMode;
  icon: ReactNode;
}

/** Canonical Athlete Navigation Configuration */
export const athleteNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/athlete', match: 'exact', icon: <DashboardIcon /> },
  { label: 'Performance', href: '/athlete/performance', match: 'section', icon: <PerformanceIcon /> },
  { label: 'Recovery', href: '/athlete/recovery', match: 'section', icon: <RecoveryIcon /> },
  { label: 'Fatigue', href: '/athlete/fatigue', match: 'section', icon: <FatigueIcon /> },
  { label: 'Biomarkers', href: '/athlete/biomarkers', match: 'section', icon: <RecoveryIcon /> },
  { label: 'Benchmarks', href: '/athlete/benchmarks', match: 'section', icon: <PerformanceIcon /> },
  { label: 'Wearables', href: '/athlete/wearables', match: 'section', icon: <DashboardIcon /> },
  { label: 'Copilot', href: '/athlete/copilot', match: 'section', icon: <TeamIcon /> },
  { label: 'Insights', href: '/athlete/insights', match: 'section', icon: <InsightsIcon /> },
  { label: 'Events', href: '/athlete/events', match: 'section', icon: <EventsIcon /> },
  { label: 'Progress', href: '/athlete/progress', match: 'section', icon: <ProgressIcon /> },
  { label: 'Notifications', href: '/athlete/notifications', match: 'section', icon: <NotificationsIcon /> },
  { label: 'Profile', href: '/athlete/profile', match: 'section', icon: <ProfileIcon /> },
];

/** Mobile-optimized subset for bottom tab bar (5 key destinations) */
export const athleteMobileNavItems: NavItem[] = [
  athleteNavItems[0], // Dashboard
  athleteNavItems[1], // Performance
  athleteNavItems[2], // Recovery
  athleteNavItems[8], // Insights
  athleteNavItems[12], // Profile
];

/** Canonical Coach Navigation Configuration */
export const coachNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/coach', match: 'exact', icon: <DashboardIcon /> },
  { label: 'Teams', href: '/coach/teams', match: 'section', icon: <TeamIcon /> },
  { label: 'Athletes', href: '/coach/athletes', match: 'section', icon: <AthletesIcon /> },
  { label: 'Events', href: '/coach/events', match: 'section', icon: <EventsIcon /> },
  { label: 'Notifications', href: '/coach/notifications', match: 'section', icon: <NotificationsIcon /> },
  { label: 'Profile', href: '/coach/profile', match: 'section', icon: <ProfileIcon /> },
];

/**
 * Determines whether a navigation item is active for the given current pathname.
 * Enforces:
 * 1. Exact match (`pathname === item.href`) for Dashboard / root items.
 * 2. Segment-aware prefix match (`pathname === item.href || pathname.startsWith(item.href + '/')`) for section items.
 * Guaranteed invariant: Exactly ONE primary navigation item is active for any valid route.
 */
export function isNavItemActive(
  pathname: string,
  item: { href: string; match?: NavMatchMode }
): boolean {
  const mode = item.match ?? (item.href === '/athlete' || item.href === '/coach' ? 'exact' : 'section');

  if (mode === 'exact') {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/**
 * Development-time validation to verify that exactly ONE primary navigation item is active.
 */
export function validateActiveNavItemCount(pathname: string, items: NavItem[]): number {
  const activeCount = items.filter((item) => isNavItemActive(pathname, item)).length;
  if (process.env.NODE_ENV !== 'production' && activeCount > 1) {
    console.warn(`[Navigation Warning] Multiple navigation items (${activeCount}) active for route: ${pathname}`);
  }
  return activeCount;
}
