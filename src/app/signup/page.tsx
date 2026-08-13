// Ludis — Premium Sign Up Page

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { UserRole } from '@/lib/types';
import { LudisLogo } from '@/components/ui/ludis-logo';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('athlete');
  const { signup, isLoading, error } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signup(email, password, role);
    router.push('/onboarding');
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-surface-ground bg-radial-gradient px-4 py-8 md:py-12 overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="glow-orb-teal top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-40" />
      <div className="glow-orb-blue bottom-1/4 right-1/4 w-80 h-80 opacity-20" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[420px]">
        {/* Brand Header */}
        <div className="flex justify-center mb-6 md:mb-8">
          <LudisLogo linkToHome variant="hero" size="lg" />
        </div>

        {/* Auth Glass Card */}
        <div className="glass-standard rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl border border-border-default">
          <h1 className="text-xl font-bold tracking-tight text-text-primary mb-1 text-center">
            Create your account
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mb-6 text-center">
            Join Ludis to start tracking your performance
          </p>

          {error && (
            <div className="mb-5 rounded-xl bg-status-risk-bg border border-status-risk-border p-3 text-xs text-status-risk font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Segmented Role Selector */}
            <div>
              <label className="block text-[11px] font-bold tracking-widest text-text-secondary uppercase mb-2">
                I AM A
              </label>
              <div
                role="radiogroup"
                aria-label="Select account role"
                className="grid grid-cols-2 gap-2.5 p-1 rounded-xl bg-surface-base/60 border border-border-default"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={role === 'athlete'}
                  onClick={() => setRole('athlete')}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                    role === 'athlete'
                      ? 'bg-brand-primary-muted border border-brand-primary text-brand-primary shadow-[0_0_12px_rgba(0,200,150,0.2)]'
                      : 'bg-transparent border border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-overlay/50'
                  }`}
                >
                  ATHLETE
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={role === 'coach'}
                  onClick={() => setRole('coach')}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                    role === 'coach'
                      ? 'bg-brand-primary-muted border border-brand-primary text-brand-primary shadow-[0_0_12px_rgba(0,200,150,0.2)]'
                      : 'bg-transparent border border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-overlay/50'
                  }`}
                >
                  COACH
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="signup-email" className="block text-xs font-semibold text-text-secondary mb-1.5">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border-default bg-surface-base/80 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:border-brand-primary/80 focus:ring-2 focus:ring-brand-primary/20"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="signup-password" className="block text-xs font-semibold text-text-secondary mb-1.5">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border-default bg-surface-base/80 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:border-brand-primary/80 focus:ring-2 focus:ring-brand-primary/20"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>

            {/* Primary Action Button */}
            <Button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(0,200,150,0.25)] hover:shadow-[0_0_25px_rgba(0,200,150,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'CREATE ACCOUNT'}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-xs sm:text-sm text-text-muted">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-brand-primary hover:text-brand-primary-hover font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
