'use client';

// Ludis — Dedicated Coach Settings Page
import { PageHeader } from '@/components/ui/page-header';
import { AppearanceSettings } from '@/components/athlete/settings/appearance-settings';
import { CoachNotificationSettings } from '@/components/coach/settings/coach-notification-settings';
import { CoachPrivacyCard } from '@/components/coach/settings/coach-privacy-card';
import { SecurityCard } from '@/components/athlete/settings/security-card';

export default function CoachSettingsPage() {
  return (
    <div className="max-w-[1340px] w-full mx-auto space-y-6 text-left min-w-0">
      <PageHeader
        title="SETTINGS"
        subtitle="Manage coach application preferences, team alert boundaries, and privacy."
        section="Settings"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full min-w-0">
        {/* Left Column: Notifications & Privacy */}
        <div className="lg:col-span-7 space-y-6 min-w-0">
          <CoachNotificationSettings />
          <CoachPrivacyCard />
        </div>

        {/* Right Column: Appearance & Security */}
        <div className="lg:col-span-5 space-y-6 min-w-0">
          <AppearanceSettings />
          <SecurityCard />
        </div>
      </div>
    </div>
  );
}
