// Ludis — Premium Client Theme Provider
// Manages light/dark theme toggle, system preferences, localStorage persistence, and DOM attribute synchronization.

'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ludis-theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Dark fallback
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
      // Keep legacy class list synchronization in case it's used elsewhere
      if (newTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      localStorage.setItem('ludis-theme', newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const saved = localStorage.getItem('ludis-theme');
    if (saved === 'light' || saved === 'dark') {
      if (theme !== saved) {
        // Asynchronously update to prevent synchronous setState warnings in effect
        const timer = setTimeout(() => {
          setTheme(saved as Theme);
        }, 0);
        return () => clearTimeout(timer);
      }
    } else {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('ludis-theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };

      const sysTheme = mediaQuery.matches ? 'dark' : 'light';
      if (theme !== sysTheme) {
        const timer = setTimeout(() => {
          setTheme(sysTheme);
        }, 0);
        mediaQuery.addEventListener('change', handleSystemChange);
        return () => {
          clearTimeout(timer);
          mediaQuery.removeEventListener('change', handleSystemChange);
        };
      }

      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
