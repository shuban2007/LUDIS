// Ludis — Sidebar navigation component
// Used by both athlete and coach shells with role-specific items.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { LudisLogo } from '@/components/ui/ludis-logo';
import { SettingsIcon, HelpIcon } from '@/components/ui/icons';
import { isNavItemActive, type NavItem } from '@/lib/navigation';

export type { NavItem };

interface SidebarProps {
  items: NavItem[];
  title?: string;
  footer?: ReactNode;
}

export function Sidebar({ items, footer }: SidebarProps) {
  const pathname = usePathname();

  // Dynamic Settings/Help paths based on the role context
  const isCoach = pathname.startsWith('/coach');
  const settingsHref = isCoach ? '/coach/profile' : '/athlete/profile';
  const helpHref = isCoach ? '/coach/profile' : '/athlete/insights';

  const isSettingsActive = isNavItemActive(pathname, { href: settingsHref, match: 'section' });

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:shrink-0 bg-[#000000] border-r border-white/[0.08] h-screen sticky top-0 overflow-hidden">
      {/* Logo */}
      <div className="flex items-center px-6 h-16 border-b border-white/[0.08] shrink-0">
        <LudisLogo linkToHome variant="navbar" size="sm" themeStyle="inverted" noBadge={true} showSubtitle={false} />
      </div>


      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto no-scrollbar py-6 px-3" aria-label="Main navigation">
        <ul className="space-y-1.5">
          {items.map((item) => {
            const isActive = isNavItemActive(pathname, item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-item flex items-center gap-3.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-[rgba(0,191,166,0.45)] focus-visible:outline-offset-2 ${
                    isActive
                      ? 'bg-[#08090B] border border-white/[0.08] text-text-primary shadow-sm font-semibold'
                      : 'border border-transparent text-[#B8B8B8] hover:bg-white/[0.03] hover:text-text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={`shrink-0 [&>svg]:h-5 [&>svg]:w-5 ${isActive ? 'text-brand-primary' : 'text-[#B8B8B8]'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* Divider line before settings/help */}
          <li className="h-[1px] bg-white/[0.08] my-4" aria-hidden="true" />

          {/* Settings */}
          <li>
            <Link
              href={settingsHref}
              className={`nav-item flex items-center gap-3.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-[rgba(0,191,166,0.45)] focus-visible:outline-offset-2 ${
                isSettingsActive
                  ? 'bg-[#08090B] border border-white/[0.08] text-text-primary shadow-sm font-semibold'
                  : 'border border-transparent text-[#B8B8B8] hover:bg-white/[0.03] hover:text-text-primary'
              }`}
              aria-current={isSettingsActive ? 'page' : undefined}
            >
              <span className={`shrink-0 [&>svg]:h-5 [&>svg]:w-5 ${isSettingsActive ? 'text-brand-primary' : 'text-[#B8B8B8]'}`}>
                <SettingsIcon />
              </span>
              Settings
            </Link>
          </li>

          {/* Help */}
          <li>
            <Link
              href={helpHref}
              className="nav-item flex items-center gap-3.5 rounded-lg px-3.5 py-2.5 text-sm font-medium border border-transparent text-[#B8B8B8] hover:bg-white/[0.03] hover:text-text-primary transition-all duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-[rgba(0,191,166,0.45)] focus-visible:outline-offset-2"
            >
              <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5 text-[#B8B8B8]">
                <HelpIcon />
              </span>
              Help
            </Link>
          </li>
        </ul>
      </nav>

      {/* Custom Ludis Footer & Sync Status */}
      <div className="border-t border-white/[0.08] p-4 shrink-0">
        {footer ? (
          footer
        ) : (
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <div className="text-[11px] leading-tight">
              <div className="text-text-muted text-[10px] uppercase font-bold tracking-wider">Sync status</div>
              <div className="text-text-secondary font-medium mt-0.5">All systems synced</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
