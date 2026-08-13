// Ludis — Signup Page with role selection

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { UserRole } from '@/lib/types';

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
    <div className="flex min-h-screen items-center justify-center bg-surface-ground px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="h-10 w-10 rounded-xl bg-brand-primary flex items-center justify-center">
            <span className="text-lg font-bold text-text-inverse">L</span>
          </div>
          <span className="text-2xl font-bold text-text-primary tracking-tight">Ludis</span>
        </div>

        <div className="ludis-card">
          <h1 className="text-lg font-bold text-text-primary mb-1">Create your account</h1>
          <p className="text-sm text-text-secondary mb-6">Join Ludis to start tracking your performance</p>

          {error && (
            <div className="mb-4 rounded-md bg-status-risk-bg border border-status-risk-border p-3 text-sm text-status-risk">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selection */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">I am a</label>
              <div className="grid grid-cols-2 gap-2">
                {(['athlete', 'coach'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                      role === r
                        ? 'border-brand-primary bg-brand-primary-muted text-brand-primary'
                        : 'border-border-default bg-surface-overlay text-text-secondary hover:bg-surface-hover'
                    }`}
                  >
                    {r === 'athlete' ? '🏃 Athlete' : '📋 Coach'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-text-secondary mb-1">Email</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border-default bg-surface-overlay px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring-focus"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-text-secondary mb-1">Password</label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border-default bg-surface-overlay px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring-focus"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-text-muted">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-primary hover:text-brand-primary-hover font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
