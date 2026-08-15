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
  const [theme, setThemeState] = useState<Theme>('dark'); // Match server default

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ludis-theme', newTheme);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    const saved = localStorage.getItem('ludis-theme');
    const targetTheme = (saved === 'light' || saved === 'dark') ? saved : 'dark';
    if (targetTheme !== 'dark') {
      const timer = setTimeout(() => {
        setThemeState(targetTheme);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

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
