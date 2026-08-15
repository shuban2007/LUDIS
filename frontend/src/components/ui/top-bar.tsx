// Ludis — AppTopBar
// Persistent top bar shared by Athlete & Coach shells.
// Sticky glass header with theme toggle, notifications, and profile summary.

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { LudisLogo } from '@/components/ui/ludis-logo';
import { useTheme } from '@/lib/theme/theme-provider';
import { useDemo } from '@/lib/demo/demo-context';

interface TopBarProps {
  notificationCount?: number;
  notificationHref?: string;
  profileHref?: string;
  onMobileMenuToggle?: () => void;
}

export function AppTopBar({
  onMobileMenuToggle,
}: TopBarProps) {
  const { user } = useAuth();
  const { getCurrentAthlete, getCoachProfile } = useDemo();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const currentAthlete = getCurrentAthlete();
  const coachProfile = getCoachProfile();

  // Resolve dynamic display details
  const isAthleteRoute = pathname.startsWith('/athlete');
  const isAthlete = user?.role === 'athlete' || isAthleteRoute;

  const displayName = isAthlete
    ? `${currentAthlete.profile.firstName} ${currentAthlete.profile.lastName}`
    : coachProfile.fullName || 'Coach Martinez';

  const roleLabel = isAthlete ? 'Athlete' : (coachProfile.role || 'Coach');
  const avatarUrl = isAthlete ? currentAthlete.profile.avatar : coachProfile.avatar;
  const firstInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full bg-glass-bg border-b border-border-subtle backdrop-blur-[20px] h-16 px-4 lg:px-8 flex items-center justify-between shrink-0 select-none">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-foreground-secondary hover:bg-surface-2 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Logo */}
        <div className="flex items-center lg:hidden">
          <LudisLogo linkToHome variant="navbar" size="sm" themeStyle="inverted" noBadge={true} showSubtitle={false} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle - 36-40px, rounded-full glass button */}
        <button
          onClick={toggleTheme}
          className="w-[38px] h-[38px] rounded-full flex items-center justify-center bg-glass-bg border border-glass-border text-foreground-secondary hover:text-foreground hover:bg-surface-2 transition-all duration-300 shadow-card cursor-pointer focus:outline-none"
          aria-label={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} theme` : 'Toggle theme'}
        >
          <svg className="theme-icon-light w-[18px] h-[18px] transition-transform duration-300 rotate-0 hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg className="theme-icon-dark w-[18px] h-[18px] transition-transform duration-300 rotate-0 hover:rotate-45" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </button>

        {/* Profile (visually static) */}
        <div className="flex items-center gap-3 py-1.5 px-2.5">
          <div className="relative h-8 w-8 rounded-full overflow-hidden border border-border-default bg-surface-2 flex items-center justify-center shrink-0">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayName}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-xs font-semibold text-foreground">{firstInitial}</span>
            )}
          </div>

          <div className="hidden sm:flex flex-col text-left leading-none">
            <span className="text-xs font-medium text-foreground">
              {displayName}
            </span>
            <span className="text-[10px] text-foreground-muted mt-1">{roleLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Fallback alias export for compatibility
export { AppTopBar as TopBar };
