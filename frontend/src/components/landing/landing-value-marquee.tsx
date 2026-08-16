// Ludis Landing Component — Premium Continuous Value Marquee Banner
// Seamless right-to-left marquee featuring core Ludis capabilities and value statements.

'use client';

import React from 'react';

interface MarqueeItem {
  id: string;
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}

const MARQUEE_ITEMS: MarqueeItem[] = [
  {
    id: 'data-quality-aware',
    label: 'DATA QUALITY AWARE',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: 'athlete-controlled',
    label: 'ATHLETE CONTROLLED',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: 'evidence-informed',
    label: 'EVIDENCE-INFORMED',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    id: 'privacy-first',
    label: 'PRIVACY FIRST',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    id: 'performance-insights',
    label: 'PERFORMANCE INSIGHTS',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 005.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
      </svg>
    ),
  },
  {
    id: 'explainable',
    label: 'EXPLAINABLE',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    id: 'coach-collaboration',
    label: 'COACH COLLABORATION',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.009a4.125 4.125 0 017.533-2.493 9.36 9.36 0 013.882 1.62m3.961-3.224a3.375 3.375 0 100-6.75 3.375 3.375 0 000 6.75zm-7.875-1.125a3.375 3.375 0 100-6.75 3.375 3.375 0 000 6.75z" />
      </svg>
    ),
  },
  {
    id: 'adaptive-intelligence',
    label: 'ADAPTIVE INTELLIGENCE',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 2.625h-7.5m7.5 0a6.01 6.01 0 00.375-2.063m-7.875 2.063a6.01 6.01 0 01-.375-2.063m0 0a6.01 6.01 0 012.063-4.563m6.188 4.563a6.01 6.01 0 00-2.063-4.563m-4.125 0a6.01 6.01 0 014.125 0m-4.125 0V3m4.125 0V3" />
      </svg>
    ),
  },
  {
    id: 'training-aware',
    label: 'TRAINING AWARE',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: 'recovery-context',
    label: 'RECOVERY CONTEXT',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    id: 'athlete-first',
    label: 'ATHLETE-FIRST',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.116.485-.41.865-.839.61l-4.722-2.809a.563.563 0 00-.582 0l-4.722 2.809c-.429.255-.955-.125-.839-.61l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: 'decision-support',
    label: 'DECISION SUPPORT',
    icon: (props) => (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// Duplicate items twice to ensure 100% seamless infinite loop across wide screens
const DOUBLE_MARQUEE_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export function LandingValueMarquee() {
  return (
    <div className="w-full border-y border-border-default bg-surface-2/40 backdrop-blur-xs py-3.5 sm:py-4.5 overflow-hidden select-none relative">
      {/* Edge gradient mask for smooth fade in/out */}
      <div className="marquee-edge-mask w-full overflow-hidden">
        <div className="flex items-center w-max animate-marquee-slide">
          {DOUBLE_MARQUEE_ITEMS.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex items-center shrink-0">
              <div className="inline-flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-semibold tracking-widest text-foreground-secondary uppercase whitespace-nowrap">
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
              <span className="text-brand/60 font-bold px-4 sm:px-6 md:px-8 text-xs select-none" aria-hidden="true">
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
