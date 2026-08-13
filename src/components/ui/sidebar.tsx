// Ludis — Sidebar navigation component
// Used by both athlete and coach shells with role-specific items.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { LudisLogo } from '@/components/ui/ludis-logo';

export interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

interface SidebarProps {
  items: NavItem[];
  title?: string;
  footer?: ReactNode;
}

export function Sidebar({ items, footer }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:shrink-0 bg-surface-base border-r border-border-subtle h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center px-5 h-14 border-b border-border-subtle shrink-0">
        <LudisLogo linkToHome variant="compact" size="sm" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3" aria-label="Main navigation">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-brand-primary-muted text-brand-primary'
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

      {/* Footer */}
      {footer && (
        <div className="border-t border-border-subtle p-3 shrink-0">{footer}</div>
      )}
    </aside>
  );
}
