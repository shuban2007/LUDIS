'use client';

// Ludis — Notification Settings Component
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

interface NotificationPreferences {
  performanceAlerts: boolean;
  recoveryAlerts: boolean;
  trainingReminders: boolean;
  competitionReminders: boolean;
}

interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onUpdate: (updates: Partial<NotificationPreferences>) => void;
}

export function NotificationSettings({ preferences, onUpdate }: NotificationSettingsProps) {
  return (
    <Card className="p-5 text-left w-full min-w-0">
      <CardTitle>
        Notifications
      </CardTitle>
      <CardDescription>
        Configure alert notifications for training indicators and competitions.
      </CardDescription>

      <div className="mt-4 space-y-3 min-w-0">
        {/* Performance Alerts */}
        <div className="flex items-center justify-between py-2 border-b border-border-subtle">
          <span className="text-xs font-semibold text-foreground">Performance alerts</span>
          <button
            type="button"
            onClick={() => onUpdate({ performanceAlerts: !preferences.performanceAlerts })}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              preferences.performanceAlerts ? 'bg-brand' : 'bg-surface-3'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                preferences.performanceAlerts ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Recovery Alerts */}
        <div className="flex items-center justify-between py-2 border-b border-border-subtle">
          <span className="text-xs font-semibold text-foreground">Recovery alerts</span>
          <button
            type="button"
            onClick={() => onUpdate({ recoveryAlerts: !preferences.recoveryAlerts })}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              preferences.recoveryAlerts ? 'bg-brand' : 'bg-surface-3'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                preferences.recoveryAlerts ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Training Reminders */}
        <div className="flex items-center justify-between py-2 border-b border-border-subtle">
          <span className="text-xs font-semibold text-foreground">Training reminders</span>
          <button
            type="button"
            onClick={() => onUpdate({ trainingReminders: !preferences.trainingReminders })}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              preferences.trainingReminders ? 'bg-brand' : 'bg-surface-3'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                preferences.trainingReminders ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Competition Reminders */}
        <div className="flex items-center justify-between py-2">
          <span className="text-xs font-semibold text-foreground">Competition reminders</span>
          <button
            type="button"
            onClick={() => onUpdate({ competitionReminders: !preferences.competitionReminders })}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              preferences.competitionReminders ? 'bg-brand' : 'bg-surface-3'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                preferences.competitionReminders ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </Card>
  );
}
