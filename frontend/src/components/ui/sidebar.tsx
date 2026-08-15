// Ludis — AppSidebar
// Sidebar navigation component shared by both Athlete & Coach shells.
// Consumes theme tokens dynamically with data-theme support.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { LudisLogo } from '@/components/ui/ludis-logo';
import { SettingsIcon, HelpIcon } from '@/components/ui/icons';
import { isNavItemActive, type NavItem } from '@/lib/navigation';
import { useDemo } from '@/lib/demo/demo-context';

export type { NavItem };

interface SidebarProps {
  items: NavItem[];
  footer?: ReactNode;
}

export function AppSidebar({ items, footer }: SidebarProps) {
  const pathname = usePathname();

  // Determine paths based on role context
  const isCoach = pathname.startsWith('/coach');
  const settingsHref = isCoach ? '/coach/settings' : '/athlete/settings';
  const helpHref = isCoach ? '/coach/settings' : '/athlete/insights';

  const isSettingsActive = isNavItemActive(pathname, { href: settingsHref, match: 'exact' });

  const { notifications } = useDemo();
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:shrink-0 bg-glass-bg border-r border-border-subtle h-screen sticky top-0 overflow-hidden select-none">
      {/* Logo */}
      <div className="flex items-center px-6 h-16 border-b border-border-subtle shrink-0">
        <LudisLogo linkToHome variant="navbar" size="sm" themeStyle="inverted" noBadge={true} showSubtitle={false} />
      </div>

      {/* Navigation list */}
      <nav className="flex-1 overflow-y-auto no-scrollbar py-6 px-3" aria-label="Main navigation">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = isNavItemActive(pathname, item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-item relative flex items-center gap-3.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-brand-soft text-brand font-semibold shadow-sm'
                      : 'border border-transparent text-foreground-secondary hover:bg-surface-2 hover:text-foreground'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Subtle active state left indicator */}
                  {isActive && (
                    <span className="absolute left-1 w-1 h-5 rounded-full bg-brand" aria-hidden="true" />
                  )}
                  <span className={`shrink-0 [&>svg]:h-5 [&>svg]:w-5 ${isActive ? 'text-brand' : 'text-foreground-secondary'}`}>
                    {item.icon}
                  </span>
                  
                  <span className="flex-grow flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.label === 'Notifications' && unreadNotificationsCount > 0 && (
                      <span className="bg-brand text-brand-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}

          {/* Divider */}
          <li className="h-[1px] bg-border-subtle my-4" aria-hidden="true" />

          {/* Settings */}
          <li>
            <Link
              href={settingsHref}
              className={`nav-item relative flex items-center gap-3.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                isSettingsActive
                  ? 'bg-brand-soft text-brand font-semibold shadow-sm'
                  : 'border border-transparent text-foreground-secondary hover:bg-surface-2 hover:text-foreground'
              }`}
              aria-current={isSettingsActive ? 'page' : undefined}
            >
              {isSettingsActive && (
                <span className="absolute left-1 w-1 h-5 rounded-full bg-brand" aria-hidden="true" />
              )}
              <span className={`shrink-0 [&>svg]:h-5 [&>svg]:w-5 ${isSettingsActive ? 'text-brand' : 'text-foreground-secondary'}`}>
                <SettingsIcon />
              </span>
              Settings
            </Link>
          </li>

          {/* Help */}
          <li>
            <Link
              href={helpHref}
              className="nav-item flex items-center gap-3.5 rounded-lg px-3.5 py-2.5 text-sm font-medium border border-transparent text-foreground-secondary hover:bg-surface-2 hover:text-foreground transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5 text-foreground-secondary">
                <HelpIcon />
              </span>
              Help
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sync Status Footer */}
      <div className="border-t border-border-subtle p-4 shrink-0">
        {footer ? (
          footer
        ) : (
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <div className="text-[11px] leading-tight">
              <div className="text-foreground-muted text-[10px] uppercase font-bold tracking-wider">Sync status</div>
              <div className="text-foreground-secondary font-medium mt-0.5">All systems synced</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

// Fallback alias export for compatibility
export { AppSidebar as Sidebar };
