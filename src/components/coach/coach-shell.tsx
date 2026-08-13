// Ludis — Coach Shell Layout
// Desktop/tablet-first layout with team navigation.

'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/ui/sidebar';
import { TopBar } from '@/components/ui/top-bar';
import { LudisLogo } from '@/components/ui/ludis-logo';
import { useAuth } from '@/lib/auth';
import { getUnreadCount } from '@/lib/services/data-service';
import { coachNavItems, isNavItemActive } from '@/lib/navigation';

export function CoachShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const userId = user?.id ?? 'usr-006';
  const notificationCount = getUnreadCount(userId);

  return (
    <div className="flex min-h-screen bg-surface-ground">
      <Sidebar items={coachNavItems} />

      {/* Mobile sidebar overlay drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed left-0 top-0 bottom-0 w-60 z-50 bg-surface-base border-r border-border-subtle shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-14 border-b border-border-subtle shrink-0">
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
            <nav className="flex-1 overflow-y-auto py-3 px-3">
              <ul className="space-y-0.5">
                {coachNavItems.map((item) => {
                  const isActive = isNavItemActive(pathname, item);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-brand-primary-muted text-brand-primary border border-brand-primary/30 font-semibold'
                            : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="shrink-0 [&>svg]:h-[18px] [&>svg]:w-[18px]">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          notificationCount={notificationCount}
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
