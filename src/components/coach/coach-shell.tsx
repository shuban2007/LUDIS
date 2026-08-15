// Ludis — Coach Shell Layout
// Desktop/tablet-first layout with team navigation.
// Integrates premium, restrained Framer Motion entrance fades and slide transitions.

'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
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
  const prefersReduced = useReducedMotion();

  return (
    <motion.div 
      initial={prefersReduced ? {} : { opacity: 0 }}
      animate={prefersReduced ? {} : { opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex min-h-screen bg-surface-ground"
    >
      {/* Sidebar - fades in slightly earlier */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, x: -8 }}
        animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
        className="hidden lg:flex"
      >
        <Sidebar items={coachNavItems} />
      </motion.div>

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
              <LudisLogo linkToHome variant="navbar" size="sm" themeStyle="inverted" noBadge={true} showSubtitle={false} />

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
                        className={`nav-item flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                          isActive
                            ? 'bg-brand-soft text-brand font-semibold'
                            : 'border border-transparent text-foreground-secondary hover:bg-surface-2 hover:text-foreground'
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
        {/* Topbar fade */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: -6 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        >
          <TopBar
            notificationCount={notificationCount}
            notificationHref="/coach/notifications"
            profileHref="/coach/profile"
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </motion.div>

        {/* Main Content entrance */}
        <motion.main 
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
          className="flex-1 p-4 lg:p-6"
        >
          {children}
        </motion.main>
      </div>
    </motion.div>
  );
}
