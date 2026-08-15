// Ludis Landing Components — Premium Editorial Landing Navigation Bar
// Fully responsive, dynamic theme-aware glass navigation.
// Utilizes callback triggers for centering visual panels on navigation clicks.

'use client';

import { useState, useRef, useEffect } from 'react';
import { LudisLogo } from '@/components/ui/ludis-logo';
import { useAuthModal } from '@/lib/auth';
import { useTheme } from '@/lib/theme/theme-provider';
import { scrollToSection, LANDING_NAV_TARGETS } from '@/lib/navigation/scroll-to-section';

interface LandingNavProps {
  onNavigateAthletes: () => void;
  onNavigateCoaches: () => void;
}

export function LandingNav({ onNavigateAthletes, onNavigateCoaches }: LandingNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { openSignIn, openSignUp } = useAuthModal();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 1. Measure Navbar height dynamically to set the CSS variables offset
  useEffect(() => {
    if (!navRef.current) return;

    const observer = new ResizeObserver(() => {
      if (!navRef.current) return;
      const height = navRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        '--landing-nav-height',
        `${height}px`
      );
    });

    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  // 1b. Track scroll position for header glass opacity density transitions
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. IntersectionObserver to dynamically highlight links based on panel visibility
  useEffect(() => {
    const targets = ['baseline', 'athletes', 'coaches'] as const;
    const observers = targets.map((id) => {
      // athletes/coaches use data-landing-section, baseline uses data-scroll-anchor
      let el: Element | null = null;
      if (id === 'athletes' || id === 'coaches') {
        el = document.querySelector(`[data-landing-section="${id}"]`);
      } else {
        el = document.querySelector(`[data-scroll-anchor="${id}"]`);
      }

      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-10% 0px -45% 0px', // Triggers highlight when visual panel is dominant
        }
      );
      observer.observe(el);
      return observer;
    });

    // Reset indicator when scrolling back to hero
    const handleScrollIndicator = () => {
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScrollIndicator);

    return () => {
      observers.forEach((obs) => obs?.disconnect());
      window.removeEventListener('scroll', handleScrollIndicator);
    };
  }, []);

  return (
    <header 
      ref={navRef} 
      className={`sticky top-0 z-50 w-full border-b border-border-subtle backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'nav-scrolled' : 'nav-default'
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between md:grid md:grid-cols-3 select-none">
        {/* Left: Brand Logo */}
        <div className="flex items-center justify-start">
          <LudisLogo linkToHome variant="navbar" size="sm" themeStyle="inverted" noBadge showSubtitle={false} />
        </div>

        {/* Center: Desktop Navigation Links (Pill Selector) */}
        <div className="hidden md:flex items-center justify-center">
          <nav className="flex items-center gap-1 bg-surface-2 dark:bg-surface-3/20 border border-border-subtle p-1 rounded-full shadow-sm backdrop-blur-sm">
            <button
              onClick={() => scrollToSection(LANDING_NAV_TARGETS.howItWorks)}
              className={`transition-all duration-200 cursor-pointer focus:outline-none text-center font-medium text-xs rounded-full px-4 py-1.5 ${
                activeSection === 'baseline' 
                  ? 'bg-brand text-brand-foreground font-semibold shadow-sm' 
                  : 'hover:text-foreground text-foreground-secondary hover:bg-brand-soft/20'
              }`}
            >
              How it works
            </button>
            <button
              onClick={onNavigateAthletes}
              className={`transition-all duration-200 cursor-pointer focus:outline-none text-center font-medium text-xs rounded-full px-4 py-1.5 ${
                activeSection === 'athletes' 
                  ? 'bg-brand text-brand-foreground font-semibold shadow-sm' 
                  : 'hover:text-foreground text-foreground-secondary hover:bg-brand-soft/20'
              }`}
            >
              Athletes
            </button>
            <button
              onClick={onNavigateCoaches}
              className={`transition-all duration-200 cursor-pointer focus:outline-none text-center font-medium text-xs rounded-full px-4 py-1.5 ${
                activeSection === 'coaches' 
                  ? 'bg-brand text-brand-foreground font-semibold shadow-sm' 
                  : 'hover:text-foreground text-foreground-secondary hover:bg-brand-soft/20'
              }`}
            >
              Coaches
            </button>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3 md:gap-6">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggle - 38px rounded-full glass toggle */}
            <button
              onClick={toggleTheme}
              className="w-[38px] h-[38px] rounded-full flex items-center justify-center bg-glass-bg border border-glass-border text-foreground-secondary hover:text-foreground hover:bg-surface-2 transition-all duration-300 shadow-card cursor-pointer focus:outline-none"
              aria-label={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} theme` : 'Toggle theme'}
            >
              <svg className="theme-icon-light w-4.5 h-4.5 transition-transform duration-300 hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg className="theme-icon-dark w-4.5 h-4.5 transition-transform duration-300 hover:rotate-45" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
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
            aria-label={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} theme` : 'Toggle theme'}
          >
            <svg className="theme-icon-light w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg className="theme-icon-dark w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
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
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-1 border-b border-border-subtle px-4 pt-2 pb-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col gap-4 text-base font-medium text-foreground-secondary">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    scrollToSection(LANDING_NAV_TARGETS.howItWorks);
                  });
                });
              }}
              className={`text-left py-1 transition-colors duration-150 cursor-pointer focus:outline-none bg-transparent border-none ${
                activeSection === 'baseline' ? 'text-brand font-semibold' : 'hover:text-brand text-foreground-secondary'
              }`}
            >
              How it works
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    onNavigateAthletes();
                  });
                });
              }}
              className={`text-left py-1 transition-colors duration-150 cursor-pointer focus:outline-none bg-transparent border-none ${
                activeSection === 'athletes' ? 'text-brand font-semibold' : 'hover:text-brand text-foreground-secondary'
              }`}
            >
              Athletes
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    onNavigateCoaches();
                  });
                });
              }}
              className={`text-left py-1 transition-colors duration-150 cursor-pointer focus:outline-none bg-transparent border-none ${
                activeSection === 'coaches' ? 'text-brand font-semibold' : 'hover:text-brand text-foreground-secondary'
              }`}
            >
              Coaches
            </button>
            <hr className="border-border-subtle my-2" />
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                openSignIn();
              }}
              className="hover:text-foreground py-1 transition-colors duration-150 cursor-pointer text-left"
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
