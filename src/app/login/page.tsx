// Ludis — Login Page

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { LudisLogo } from '@/components/ui/ludis-logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
    // Mock: route based on email
    if (email.toLowerCase().includes('coach')) {
      router.push('/coach');
    } else {
      router.push('/athlete');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-ground px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <LudisLogo linkToHome variant="hero" size="lg" />
        </div>

        <div className="ludis-card">
          <h1 className="text-lg font-bold text-text-primary mb-1">Welcome back</h1>
          <p className="text-sm text-text-secondary mb-6">Sign in to your account</p>

          {error && (
            <div className="mb-4 rounded-md bg-status-risk-bg border border-status-risk-border p-3 text-sm text-status-risk">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border-default bg-surface-overlay px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring-focus"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border-default bg-surface-overlay px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring-focus"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-text-muted">
            {"Don't have an account? "}
            <Link href="/signup" className="text-brand-primary hover:text-brand-primary-hover font-medium">
              Sign up
            </Link>
          </p>

          {/* Demo hint */}
          <div className="mt-6 rounded-md bg-surface-overlay p-3 text-xs text-text-muted">
            <strong>Demo:</strong> Use any email to log in. Include &quot;coach&quot; in the email for a coach account.
          </div>
        </div>
      </div>
    </div>
  );
}
