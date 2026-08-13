// Ludis — TopBar
// Persistent top bar with notifications bell, profile, and optional mobile hamburger.

'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { LudisLogo } from '@/components/ui/ludis-logo';

interface TopBarProps {
  notificationCount?: number;
  notificationHref?: string;
  profileHref?: string;
  /** Show mobile menu toggle */
  onMobileMenuToggle?: () => void;
}

export function TopBar({
  notificationCount = 0,
  notificationHref = '/athlete/notifications',
  profileHref = '/athlete/profile',
  onMobileMenuToggle,
}: TopBarProps) {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between h-14 px-4 lg:px-6 border-b border-border-subtle bg-surface-base shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-1.5 rounded-md text-text-secondary hover:bg-surface-hover"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center">
          <LudisLogo linkToHome variant="compact" size="sm" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link
          href={notificationHref}
          className="relative p-2 rounded-lg text-text-secondary hover:bg-surface-hover transition-colors"
          aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ''}`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-status-risk text-[10px] font-bold text-white flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </Link>

        {/* Profile */}
        <Link
          href={profileHref}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-hover transition-colors"
          aria-label="Profile"
        >
          <div className="h-7 w-7 rounded-full bg-surface-overlay flex items-center justify-center text-xs font-semibold text-text-secondary">
            {user?.displayName?.charAt(0) ?? 'U'}
          </div>
          <span className="hidden sm:block text-sm text-text-secondary">{user?.displayName ?? 'User'}</span>
        </Link>
      </div>
    </header>
  );
}
