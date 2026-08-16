// Ludis Landing Component — Floating Back-To-Top Button
// Minimal, high-performance, landing-page-scoped scroll return button.

'use client';

import { useState, useEffect } from 'react';

export function LandingBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 400;
      setIsVisible((prev) => (prev !== show ? show : prev));
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed z-40 rounded-full flex items-center justify-center transition-all duration-200 ease-out cursor-pointer select-none
        w-10 h-10 md:w-11 md:h-11
        right-4 md:right-6
        [bottom:max(1rem,env(safe-area-inset-bottom,16px))] md:[bottom:max(1.5rem,env(safe-area-inset-bottom,24px))]
        bg-surface-2/85 hover:bg-surface-3 text-foreground-secondary hover:text-foreground
        border border-border-default hover:border-border-strong
        backdrop-blur-md shadow-card hover:shadow-elevated
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
        ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }
      `}
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
