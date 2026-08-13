// Ludis Landing Components — Glassmorphism Landing Navigation Bar

import Link from 'next/link';
import { LudisLogo } from '@/components/ui/ludis-logo';
import { Button } from '@/components/ui/button';

export function LandingNav() {
  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 max-w-7xl mx-auto mb-6">
      <nav className="glass-subtle rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 group">
          <LudisLogo variant="full" size="md" />
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-text-secondary">
          <a href="#baseline" className="hover:text-brand-primary transition-colors">
            Personal Baseline
          </a>
          <a href="#data-insight" className="hover:text-brand-primary transition-colors">
            Data to Insight
          </a>
          <a href="#capabilities" className="hover:text-brand-primary transition-colors">
            Capabilities
          </a>
          <a href="#audience" className="hover:text-brand-primary transition-colors">
            For Athletes & Coaches
          </a>
          <a href="#responsible-ai" className="hover:text-brand-primary transition-colors">
            Responsible AI
          </a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors font-semibold px-2 py-1">
            Sign in
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(0,200,150,0.3)]">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
