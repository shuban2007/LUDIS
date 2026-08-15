'use client';

// Ludis — Athlete Settings Page
// Coordinates health integrations, privacy permissions, alert toggles, theme, and security controls.
import { useDemo } from '@/lib/demo/demo-context';
import { PageHeader } from '@/components/ui/page-header';
import { HealthDataCard } from '@/components/athlete/settings/health-data-card';
import { MeasurementHistory } from '@/components/athlete/settings/measurement-history';
import { CoachAccessCard } from '@/components/athlete/settings/coach-access-card';
import { NotificationSettings } from '@/components/athlete/settings/notification-settings';
import { AppearanceSettings } from '@/components/athlete/settings/appearance-settings';
import { SecurityCard } from '@/components/athlete/settings/security-card';

import { type HealthMeasurement } from '@/lib/types/health-measurement';

export default function SettingsPage() {
  const {
    googleFitSyncTime,
    syncGoogleFitSources,
    healthMeasurements,
    saveDailyMeasurements,
    deleteHealthMeasurement,
    notificationPreferences,
    updateNotificationPreferences,
  } = useDemo();

  // Unified save handler matching callback interface
  const handleSaveEdit = (
    id: string,
    metric: string,
    source: string,
    value?: number,
    secondaryValue?: number,
    unit?: string
  ) => {
    saveDailyMeasurements([{
      metric: metric as HealthMeasurement['metric'],
      value,
      secondaryValue,
      unit,
      source: source as HealthMeasurement['source'],
    }]);
  };

  return (
    <div className="max-w-6xl space-y-6 select-none mx-auto text-left">
      <PageHeader
        title="Settings"
        subtitle="Manage your Ludis preferences, data connections, and privacy."
        section="Settings"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Health integrations & Logs history) */}
        <div className="lg:col-span-7 space-y-6">
          <HealthDataCard
            googleFitSyncTime={googleFitSyncTime}
            onSync={syncGoogleFitSources}
          />
          <MeasurementHistory
            healthMeasurements={healthMeasurements}
            onSaveEdit={handleSaveEdit}
            onDelete={deleteHealthMeasurement}
          />
        </div>

        {/* Right Column (Privacy, alerts, theme, and credentials checks) */}
        <div className="lg:col-span-5 space-y-6">
          <CoachAccessCard />
          <NotificationSettings
            preferences={notificationPreferences}
            onUpdate={updateNotificationPreferences}
          />
          <AppearanceSettings />
          <SecurityCard />
        </div>
      </div>
    </div>
  );
}
