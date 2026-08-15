// TEMPORARY DEMO AUTH
// Remove this module and DEMO_AUTH_ENABLED when demo mode is retired.

import type { UserRole } from '@/lib/types';

export const DEMO_AUTH_ENABLED = true;

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
