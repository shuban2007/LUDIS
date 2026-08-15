// Ludis — Athlete Shell Layout
// Mobile-first layout with bottom tab nav + desktop sidebar.
// Integrates premium, restrained Framer Motion entrance fades and slide transitions.

'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
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
  const prefersReduced = useReducedMotion();

  return (
    <motion.div 
      initial={prefersReduced ? {} : { opacity: 0 }}
      animate={prefersReduced ? {} : { opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex min-h-screen bg-background text-text-primary"
    >
      {/* Sidebar - fades in slightly earlier */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, x: -8 }}
        animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
        className="hidden lg:flex"
      >
        <Sidebar items={athleteNavItems} />
      </motion.div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar fade */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: -6 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        >
          <TopBar
            notificationCount={notificationCount}
            notificationHref="/athlete/notifications"
            profileHref="/athlete/profile"
          />
        </motion.div>

        {/* Main Content entrance */}
        <motion.main 
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
          className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8"
        >
          {children}
        </motion.main>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
        animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        className="lg:hidden"
      >
        <MobileNav items={athleteMobileNavItems} />
      </motion.div>
    </motion.div>
  );
}
