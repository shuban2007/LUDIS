// Ludis — Athlete Shell Layout
// Mobile-first layout with bottom tab nav + desktop sidebar.

'use client';

import type { ReactNode } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { MobileNav } from '@/components/ui/mobile-nav';
import { TopBar } from '@/components/ui/top-bar';
import { useAuth } from '@/lib/auth';
import { getUnreadCount } from '@/lib/services/data-service';
import { athleteNavItems, athleteMobileNavItems } from '@/lib/navigation';

export function AthleteShell({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? 'usr-001';
  const notificationCount = getUnreadCount(userId);

  return (
    <div className="flex min-h-screen bg-[#000000] text-text-primary">
      <Sidebar items={athleteNavItems} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          notificationCount={notificationCount}
          notificationHref="/athlete/notifications"
          profileHref="/athlete/profile"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      <MobileNav items={athleteMobileNavItems} />
    </div>
  );
}

