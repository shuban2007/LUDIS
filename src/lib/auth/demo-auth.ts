// Ludis — Isolated Demo Authentication Service
// Dedicated layer for quick demo access during development/previews.
// Can be safely removed or disabled without touching production auth.

import type { UserRole } from '@/lib/types';

/**
 * Internal demo credentials configuration.
 * Kept isolated in this file so zero passwords/credentials are exposed in UI or DOM.
 */
const DEMO_ACCOUNTS: Record<UserRole, { email: string; secret: string }> = {
  athlete: { email: 'athlete@ludis.app', secret: 'demo-athlete-session' },
  coach: { email: 'coach@ludis.app', secret: 'demo-coach-session' },
};

/**
 * Authenticates as a demo user for testing/preview purposes.
 * Accepts the standard login function from AuthContext.
 */
export async function loginAsDemo(
  role: UserRole,
  loginFn: (email: string, password: string) => Promise<void>
): Promise<void> {
  const account = DEMO_ACCOUNTS[role];
  await loginFn(account.email, account.secret);
}
