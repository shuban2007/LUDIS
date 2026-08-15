// Ludis Landing Components — Premium Editorial Landing Navigation Bar
// Fully responsive, dynamic theme-aware glass navigation.

'use client';

import { useState } from 'react';
import { LudisLogo } from '@/components/ui/ludis-logo';
import { useAuthModal } from '@/lib/auth';
import { useTheme } from '@/lib/theme/theme-provider';

export function LandingNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openSignIn, openSignUp } = useAuthModal();
  const { theme, toggleTheme } = useTheme();

  // Handle smooth scroll to section without modifying browser URL hashes
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 64; // Offset height of the sticky navbar (h-16)
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-glass-bg border-b border-border-subtle backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between select-none">
        {/* Left: Brand Logo */}
        <LudisLogo linkToHome variant="navbar" size="sm" themeStyle="inverted" noBadge showSubtitle={false} />

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-secondary">
          <a
            href="#baseline"
            onClick={(e) => handleScroll(e, 'baseline')}
            className="hover:text-brand transition-colors duration-150 cursor-pointer"
          >
            Product
          </a>
          <a
            href="#baseline"
            onClick={(e) => handleScroll(e, 'baseline')}
            className="hover:text-brand transition-colors duration-150 cursor-pointer"
          >
            How it works
          </a>
          <a
            href="#audience"
            onClick={(e) => handleScroll(e, 'audience')}
            className="hover:text-brand transition-colors duration-150 cursor-pointer"
          >
            Athletes
          </a>
          <a
            href="#audience"
            onClick={(e) => handleScroll(e, 'audience')}
            className="hover:text-brand transition-colors duration-150 cursor-pointer"
          >
            Coaches
          </a>
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-6">
          {/* Theme Toggle - 36-40px glass toggle */}
          <button
            onClick={toggleTheme}
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center bg-glass-bg border border-glass-border text-foreground-secondary hover:text-foreground hover:bg-surface-2 transition-all duration-300 shadow-card cursor-pointer focus:outline-none"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <svg className="w-4.5 h-4.5 transition-transform duration-300 hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5 transition-transform duration-300 hover:rotate-45" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            )}
          </button>
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              openSignIn();
            }}
            className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors duration-150 cursor-pointer"
          >
            Sign in
          </a>
          <button
            onClick={() => openSignUp()}
            className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-4 rounded-md transition-colors duration-150 select-none cursor-pointer"
          >
            GET STARTED
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center bg-glass-bg border border-glass-border text-foreground-secondary hover:text-foreground hover:bg-surface-2 transition-all duration-300 shadow-card cursor-pointer focus:outline-none"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground-secondary hover:text-foreground focus:outline-none p-2"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-1 border-b border-border-subtle px-4 pt-2 pb-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col gap-4 text-base font-medium text-foreground-secondary">
            <a
              href="#baseline"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleScroll(e, 'baseline');
              }}
              className="hover:text-brand py-1 transition-colors duration-150 cursor-pointer"
            >
              Product
            </a>
            <a
              href="#baseline"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleScroll(e, 'baseline');
              }}
              className="hover:text-brand py-1 transition-colors duration-150 cursor-pointer"
            >
              How it works
            </a>
            <a
              href="#audience"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleScroll(e, 'audience');
              }}
              className="hover:text-brand py-1 transition-colors duration-150 cursor-pointer"
            >
              Athletes
            </a>
            <a
              href="#audience"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleScroll(e, 'audience');
              }}
              className="hover:text-brand py-1 transition-colors duration-150 cursor-pointer"
            >
              Coaches
            </a>
            <hr className="border-border-subtle my-2" />
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                openSignIn();
              }}
              className="hover:text-foreground py-1 transition-colors duration-150 cursor-pointer"
            >
              Sign in
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openSignUp();
              }}
              className="w-full bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-sm py-2.5 px-4 rounded-md transition-colors duration-150 cursor-pointer text-center"
            >
              GET STARTED
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
