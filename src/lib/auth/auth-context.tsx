// Ludis — Auth context & abstractions
// Supabase Auth-compatible structure. Currently mock-backed.

'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { User, UserRole, AuthSession, AuthState } from '@/lib/types';

// ──────────────────────────────────────
// Mock users for development
// ──────────────────────────────────────

const MOCK_USERS: Record<string, User> = {
  athlete: {
    id: 'usr-001',
    email: 'maya@ludis.app',
    role: 'athlete',
    displayName: 'Maya Chen',
    avatarUrl: undefined,
    createdAt: '2025-01-15T08:00:00Z',
    onboardingComplete: true,
  },
  coach: {
    id: 'usr-006',
    email: 'coach@ludis.app',
    role: 'coach',
    displayName: 'Coach Martinez',
    avatarUrl: undefined,
    createdAt: '2024-09-01T08:00:00Z',
    onboardingComplete: true,
  },
};

function createMockSession(user: User): AuthSession {
  return {
    user,
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
  };
}

// ──────────────────────────────────────
// Auth context
// ──────────────────────────────────────

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  role: UserRole | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = 'ludis_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    session: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const session = JSON.parse(stored) as AuthSession;
        queueMicrotask(() => setState({ session, isLoading: false, error: null }));
      } else {
        queueMicrotask(() => setState((s) => ({ ...s, isLoading: false })));
      }
    } catch {
      queueMicrotask(() => setState((s) => ({ ...s, isLoading: false })));
    }
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 500));

    const isCoach = email.toLowerCase().includes('coach');
    const user = isCoach ? MOCK_USERS.coach : MOCK_USERS.athlete;
    const session = createMockSession(user);

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setState({ session, isLoading: false, error: null });
  }, []);

  const signup = useCallback(
    async (email: string, _password: string, role: UserRole) => {
      setState((s) => ({ ...s, isLoading: true, error: null }));
      await new Promise((r) => setTimeout(r, 500));

      const user: User = {
        ...MOCK_USERS[role],
        email,
        onboardingComplete: false,
      };
      const session = createMockSession(user);

      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setState({ session, isLoading: false, error: null });
    },
    []
  );

  const logout = useCallback(async () => {
    localStorage.removeItem(SESSION_KEY);
    setState({ session: null, isLoading: false, error: null });
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    signup,
    logout,
    user: state.session?.user ?? null,
    role: state.session?.user?.role ?? null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
