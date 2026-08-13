// Ludis — Coach Shell Layout
// Desktop/tablet-first layout with team navigation.

'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { TopBar } from '@/components/ui/top-bar';
import {
  DashboardIcon,
  TeamIcon,
  AthletesIcon,
  EventsIcon,
  NotificationsIcon,
  ProfileIcon,
} from '@/components/ui/icons';
import type { NavItem } from '@/components/ui/sidebar';
import { LudisLogo } from '@/components/ui/ludis-logo';

const coachNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/coach', icon: <DashboardIcon /> },
  { label: 'Teams', href: '/coach/teams', icon: <TeamIcon /> },
  { label: 'Athletes', href: '/coach/athletes', icon: <AthletesIcon /> },
  { label: 'Events', href: '/coach/events', icon: <EventsIcon /> },
  { label: 'Notifications', href: '/coach/notifications', icon: <NotificationsIcon /> },
  { label: 'Profile', href: '/coach/profile', icon: <ProfileIcon /> },
];

export function CoachShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar items={coachNavItems} />

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed left-0 top-0 bottom-0 w-60 z-50 bg-surface-base border-r border-border-subtle">
            <div className="flex items-center justify-between px-5 h-14 border-b border-border-subtle">
              <LudisLogo linkToHome variant="compact" size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-md text-text-secondary hover:bg-surface-hover"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="py-3 px-3">
              <ul className="space-y-0.5">
                {coachNavItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-hover"
                    >
                      <span className="[&>svg]:h-[18px] [&>svg]:w-[18px]">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          notificationCount={2}
          notificationHref="/coach/notifications"
          profileHref="/coach/profile"
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
