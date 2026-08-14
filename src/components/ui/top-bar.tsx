// Ludis — TopBar
// Persistent top bar with notifications bell, profile identity, and mobile navigation toggle.

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { LudisLogo } from '@/components/ui/ludis-logo';
import { NotificationsIcon, ChevronDownIcon } from '@/components/ui/icons';
import { useTheme } from '@/lib/theme-context';

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
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();


  // Dynamic user display details aligned with current route context
  const isAthleteRoute = pathname.startsWith('/athlete');
  const displayName = isAthleteRoute
    ? user?.role === 'athlete'
      ? user.displayName
      : 'Alex Morgan'
    : user?.displayName ?? 'Coach Martinez';

  const roleLabel = isAthleteRoute ? 'Athlete' : user?.role === 'athlete' ? 'Athlete' : 'Coach';
  const firstInitial = displayName.charAt(0).toUpperCase();


  return (
    <header className="flex items-center justify-between h-16 px-4 lg:px-8 border-b border-white/[0.08] bg-[#000000] shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-white/[0.04]"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center">
          <LudisLogo linkToHome variant="navbar" size="sm" themeStyle="inverted" noBadge={true} showSubtitle={false} />
        </div>

      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-[#B8B8B8] hover:bg-white/[0.04] hover:text-text-primary transition-colors cursor-pointer"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          )}
        </button>

        {/* Notifications */}
        <Link
          href={notificationHref}
          className="relative p-2 rounded-full text-[#B8B8B8] hover:bg-white/[0.04] hover:text-text-primary transition-colors cursor-pointer"
          aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ''}`}
        >
          <NotificationsIcon className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-brand-primary text-[9px] font-bold text-black flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </Link>


        {/* Vertical divider */}
        <div className="h-5 border-r border-white/[0.12]" />

        {/* Profile */}
        <Link
          href={profileHref}
          className="flex items-center gap-3 py-1 px-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer group"
          aria-label="Profile"
        >
          <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white/10 bg-white/[0.04] flex items-center justify-center shrink-0">
            {user?.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={displayName}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-xs font-semibold text-text-primary">{firstInitial}</span>
            )}
          </div>

          <div className="hidden sm:flex flex-col text-left leading-none">
            <span className="text-xs font-medium text-text-primary group-hover:text-brand-primary transition-colors">
              {displayName}
            </span>
            <span className="text-[10px] text-text-muted mt-1">{roleLabel}</span>
          </div>

          <ChevronDownIcon className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors hidden sm:block" />
        </Link>
      </div>
    </header>
  );
}
