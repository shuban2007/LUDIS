// TEMPORARY DEMO AUTH
// Refactored to dynamically adjust by theme using centralized system variables.

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, loginAsDemo, useAuthModal } from '@/lib/auth';
import type { UserRole } from '@/lib/types';

export function DemoLogin() {
  const { login } = useAuth();
  const { closeModal } = useAuthModal();
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<UserRole | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDemoLogin(role: UserRole) {
    if (loadingRole) return;
    try {
      setLoadingRole(role);
      setError(null);
      await loginAsDemo(role, login);
      closeModal();
      if (role === 'coach') {
        router.push('/coach');
      } else {
        router.push('/athlete');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to open demo account. Please try again.');
    } finally {
      setLoadingRole(null);
    }
  }

  const isBusy = loadingRole !== null;

  return (
    <div className="mt-5 select-none">
      {/* Subtle Separator */}
      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border-subtle" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface-2 px-3 py-0.5 rounded text-[10px] font-extrabold tracking-widest text-foreground-muted">
            DEMO
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-3 rounded-lg bg-danger/10 border border-danger/30 p-2.5 text-xs text-danger text-center font-medium">
          {error}
        </div>
      )}

      {/* Secondary Demo Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleDemoLogin('athlete')}
          disabled={isBusy}
          className="h-10 w-full rounded-lg border border-border-default bg-surface-2 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-foreground-secondary hover:text-foreground hover:border-brand/50 hover:bg-brand-soft transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {loadingRole === 'athlete' ? 'SIGNING IN...' : 'ATHLETE'}
        </button>
        <button
          type="button"
          onClick={() => handleDemoLogin('coach')}
          disabled={isBusy}
          className="h-10 w-full rounded-lg border border-border-default bg-surface-2 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-foreground-secondary hover:text-foreground hover:border-brand/50 hover:bg-brand-soft transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {loadingRole === 'coach' ? 'SIGNING IN...' : 'COACH'}
        </button>
      </div>
    </div>
  );
}
