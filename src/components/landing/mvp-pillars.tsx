// Ludis Landing Components — Four MVP Pillars Component
'use client';

import { ScrollReveal, StaggerContainer, StaggerItem } from './scroll-reveal';

interface PillarItem {
  num: string;
  title: string;
  icon: React.ReactNode;
}

export function MvpPillars() {
  const pillars: PillarItem[] = [
    {
      num: '1',
      title: 'Personalized Performance & Baseline Engine',
      icon: (
        <svg className="w-5 h-5 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      num: '2',
      title: 'Recovery + Fatigue Analysis',
      icon: (
        <svg className="w-5 h-5 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      num: '3',
      title: 'Coach Performance Dashboard',
      icon: (
        <svg className="w-5 h-5 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      num: '4',
      title: 'Explainable Recommendation Layer',
      icon: (
        <svg className="w-5 h-5 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="capabilities" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border-default select-none">
      
      {/* Centered Editorial Title */}
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-20" duration={0.5}>
        <h2 className="text-sm font-serif tracking-[0.25em] text-text-primary uppercase">
          FOUR PILLARS OF PERFORMANCE INTELLIGENCE
        </h2>
      </ScrollReveal>

      {/* Columns Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-border-default" stagger={0.08}>

        {pillars.map((pillar) => (
          <StaggerItem key={pillar.num} className="px-0 md:px-6 lg:px-8 first:pl-0 last:pr-0">
            <div className="flex flex-col gap-6 text-left">
              {/* Row with Icon and Number */}
              <div className="flex items-center gap-4">
                {pillar.icon}
                <span className="text-3xl font-bold font-sans text-brand-primary leading-none">
                  {pillar.num}
                </span>
              </div>
              {/* Title of the Pillar */}
              <h3 className="text-base font-semibold text-text-primary leading-snug">
                {pillar.title}
              </h3>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

    </section>
  );
}
