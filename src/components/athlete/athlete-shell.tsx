// Ludis — Athlete Shell Layout
// Mobile-first layout with bottom tab nav + desktop sidebar.

'use client';

import type { ReactNode } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { MobileNav } from '@/components/ui/mobile-nav';
import { TopBar } from '@/components/ui/top-bar';
import {
  DashboardIcon,
  PerformanceIcon,
  RecoveryIcon,
  InsightsIcon,
  ProfileIcon,
  FatigueIcon,
  EventsIcon,
  ProgressIcon,
} from '@/components/ui/icons';
import { getUnreadCount } from '@/lib/services/data-service';
import type { NavItem } from '@/components/ui/sidebar';

const athleteNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/athlete', icon: <DashboardIcon /> },
  { label: 'Performance', href: '/athlete/performance', icon: <PerformanceIcon /> },
  { label: 'Recovery', href: '/athlete/recovery', icon: <RecoveryIcon /> },
  { label: 'Fatigue', href: '/athlete/fatigue', icon: <FatigueIcon /> },
  { label: 'Insights', href: '/athlete/insights', icon: <InsightsIcon /> },
  { label: 'Events', href: '/athlete/events', icon: <EventsIcon /> },
  { label: 'Progress', href: '/athlete/progress', icon: <ProgressIcon /> },
  { label: 'Profile', href: '/athlete/profile', icon: <ProfileIcon /> },
];

// Mobile nav shows the 5 most important items
const mobileNavItems: NavItem[] = [
  athleteNavItems[0], // Dashboard
  athleteNavItems[1], // Performance
  athleteNavItems[2], // Recovery
  athleteNavItems[4], // Insights
  athleteNavItems[7], // Profile
];

export function AthleteShell({ children }: { children: ReactNode }) {
  const notificationCount = getUnreadCount('usr-001');

  return (
    <div className="flex min-h-screen">
      <Sidebar items={athleteNavItems} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          notificationCount={notificationCount}
          notificationHref="/athlete/notifications"
          profileHref="/athlete/profile"
        />

        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      <MobileNav items={mobileNavItems} />
    </div>
  );
}
