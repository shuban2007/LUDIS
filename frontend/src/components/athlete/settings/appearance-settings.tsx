'use client';

// Ludis — Appearance Settings Component
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { useTheme } from '@/lib/theme/theme-provider';

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <Card className="p-5 text-left w-full min-w-0">
      <CardTitle>
        Appearance
      </CardTitle>
      <CardDescription>
        Select your layout design interface preferences.
      </CardDescription>

      <div className="mt-4 flex items-center justify-between py-2 gap-3 min-w-0">
        <span className="text-xs font-semibold text-foreground">Theme Selection</span>
        <div className="flex gap-2 shrink-0">
          {/* Light Theme Button */}
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border cursor-pointer select-none ${
              theme === 'light'
                ? 'bg-brand text-brand-foreground border-brand shadow-sm'
                : 'bg-surface-3 hover:bg-surface-4 text-foreground-secondary border-border-default'
            }`}
          >
            Light
          </button>
          {/* Dark Theme Button */}
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border cursor-pointer select-none ${
              theme === 'dark'
                ? 'bg-brand text-brand-foreground border-brand shadow-sm'
                : 'bg-surface-3 hover:bg-surface-4 text-foreground-secondary border-border-default'
            }`}
          >
            Dark
          </button>
        </div>
      </div>
    </Card>
  );
}
