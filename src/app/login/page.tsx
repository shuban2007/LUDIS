// Ludis — Premium Sign In Page

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, loginAsDemo } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { UserRole } from '@/lib/types';
import { LudisLogo } from '@/components/ui/ludis-logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [demoLoadingRole, setDemoLoadingRole] = useState<UserRole | null>(null);
  const { login, isLoading, error } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
    if (email.toLowerCase().includes('coach')) {
      router.push('/coach');
    } else {
      router.push('/athlete');
    }
  }

  async function handleDemoLogin(role: UserRole) {
    try {
      setDemoLoadingRole(role);
      await loginAsDemo(role, login);
      if (role === 'coach') {
        router.push('/coach');
      } else {
        router.push('/athlete');
      }
    } finally {
      setDemoLoadingRole(null);
    }
  }

  const isBusy = isLoading || demoLoadingRole !== null;

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
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mb-6 text-center">
            Sign in to your account
          </p>

          {error && (
            <div className="mb-5 rounded-xl bg-status-risk-bg border border-status-risk-border p-3 text-xs text-status-risk font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-text-secondary mb-1.5">
                Email
              </label>
              <input
                id="login-email"
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
              <label htmlFor="login-password" className="block text-xs font-semibold text-text-secondary mb-1.5">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border-default bg-surface-base/80 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:border-brand-primary/80 focus:ring-2 focus:ring-brand-primary/20"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Primary Action Button */}
            <Button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(0,200,150,0.25)] hover:shadow-[0_0_25px_rgba(0,200,150,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              disabled={isBusy}
            >
              {isLoading && !demoLoadingRole ? 'Signing in...' : 'SIGN IN'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-5 text-center text-xs sm:text-sm text-text-muted">
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="text-brand-primary hover:text-brand-primary-hover font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>

          {/* Demoted Compact DEMO Utility Section */}
          <div className="mt-6 pt-5 border-t border-border-default/60">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-extrabold tracking-widest text-text-muted uppercase">
                DEMO
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('athlete')}
                disabled={isBusy}
                className="w-full py-2 px-3 rounded-lg border border-border-default bg-surface-overlay/40 text-xs font-bold tracking-wider uppercase text-text-secondary hover:text-text-primary hover:border-brand-primary/50 hover:bg-brand-primary-muted/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {demoLoadingRole === 'athlete' ? 'LOADING...' : 'ATHLETE'}
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('coach')}
                disabled={isBusy}
                className="w-full py-2 px-3 rounded-lg border border-border-default bg-surface-overlay/40 text-xs font-bold tracking-wider uppercase text-text-secondary hover:text-text-primary hover:border-brand-primary/50 hover:bg-brand-primary-muted/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {demoLoadingRole === 'coach' ? 'LOADING...' : 'COACH'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
