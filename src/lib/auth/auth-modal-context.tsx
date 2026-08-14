// Ludis — Auth Modal State Context
// Centralized manager for in-page auth modal overlays.

'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';

type AuthView = 'signin' | 'signup';

interface AuthModalContextValue {
  isOpen: boolean;
  view: AuthView;
  openSignIn: () => void;
  openSignUp: () => void;
  closeModal: () => void;
  switchView: (view: AuthView) => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>('signin');
  const lastActiveElement = useRef<HTMLElement | null>(null);

  const openSignIn = useCallback(() => {
    lastActiveElement.current = document.activeElement as HTMLElement;
    setView('signin');
    setIsOpen(true);
  }, []);

  const openSignUp = useCallback(() => {
    lastActiveElement.current = document.activeElement as HTMLElement;
    setView('signup');
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Asynchronously restore focus to prevent race conditions during modal unmounting
    setTimeout(() => {
      if (lastActiveElement.current) {
        lastActiveElement.current.focus();
        lastActiveElement.current = null;
      }
    }, 0);
  }, []);

  const switchView = useCallback((newView: AuthView) => {
    setView(newView);
  }, []);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        view,
        openSignIn,
        openSignUp,
        closeModal,
        switchView,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}
