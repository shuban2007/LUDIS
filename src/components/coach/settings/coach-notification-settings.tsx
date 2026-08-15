'use client';

// Ludis — Coach Notification Settings Component
import { useState } from 'react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export function CoachNotificationSettings() {
  const [prefs, setPrefs] = useState({
    athleteAlerts: true,
    teamReadinessAlerts: true,
    fatigueAlerts: true,
    competitionReminders: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card className="p-5 text-left space-y-4">
      <div>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Configure real-time notifications for team readiness and athlete workload alerts.
        </CardDescription>
      </div>

      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-xs font-semibold text-foreground">Athlete Alerts</div>
            <div className="text-[11px] text-foreground-muted">Receive alerts when athlete metrics fall below baseline</div>
          </div>
          <button
            type="button"
            onClick={() => toggle('athleteAlerts')}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
              prefs.athleteAlerts ? 'bg-brand justify-end' : 'bg-surface-3 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-border-subtle">
          <div>
            <div className="text-xs font-semibold text-foreground">Team Readiness Alerts</div>
            <div className="text-[11px] text-foreground-muted">Get daily team readiness status summaries</div>
          </div>
          <button
            type="button"
            onClick={() => toggle('teamReadinessAlerts')}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
              prefs.teamReadinessAlerts ? 'bg-brand justify-end' : 'bg-surface-3 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-border-subtle">
          <div>
            <div className="text-xs font-semibold text-foreground">Fatigue Alerts</div>
            <div className="text-[11px] text-foreground-muted">High fatigue warnings for roster members</div>
          </div>
          <button
            type="button"
            onClick={() => toggle('fatigueAlerts')}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
              prefs.fatigueAlerts ? 'bg-brand justify-end' : 'bg-surface-3 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-border-subtle">
          <div>
            <div className="text-xs font-semibold text-foreground">Competition Reminders</div>
            <div className="text-[11px] text-foreground-muted">Schedule and weather notifications prior to events</div>
          </div>
          <button
            type="button"
            onClick={() => toggle('competitionReminders')}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
              prefs.competitionReminders ? 'bg-brand justify-end' : 'bg-surface-3 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>
      </div>
    </Card>
  );
}
