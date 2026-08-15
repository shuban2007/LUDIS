'use client';

// Ludis — Dedicated Coach Profile Page
import { useState } from 'react';
import { useDemo } from '@/lib/demo/demo-context';
import { PageHeader } from '@/components/ui/page-header';
import { CoachProfileHeader } from '@/components/coach/profile/coach-profile-header';
import { CoachPersonalInfo } from '@/components/coach/profile/coach-personal-info';
import { CoachBodyInfo } from '@/components/coach/profile/coach-body-info';
import { RecentBodyUpdates } from '@/components/athlete/profile/recent-body-updates';
import { CoachProfileEditForm } from '@/components/coach/profile/coach-profile-edit-form';
import type { CoachProfileData } from '@/lib/types/profile';

export default function CoachProfilePage() {
  const { getCoachProfile, updateCoachProfile, getProfileMeasurementHistory } = useDemo();
  const coach = getCoachProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const logs = getProfileMeasurementHistory(coach.userId || 'usr-006');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (updates: Partial<CoachProfileData>) => {
    updateCoachProfile(updates);
    setIsEditing(false);
    showToast('Coach profile updated');
  };

  const handleUpdateBody = (bodyUpdates: { height?: number; weight?: number }) => {
    updateCoachProfile(bodyUpdates);
    showToast('Body measurements updated');
  };

  return (
    <div className="max-w-4xl space-y-6 select-none mx-auto text-left">
      <div className="flex items-center justify-between">
        <PageHeader
          title="PROFILE"
          subtitle="Manage your personal coaching information."
          section="Profile"
        />
        {toastMessage && (
          <div className="px-3.5 py-1.5 rounded-lg bg-brand-soft border border-brand/30 text-brand font-semibold text-xs animate-fade-in">
            ✓ {toastMessage}
          </div>
        )}
      </div>

      <CoachProfileHeader
        coach={coach}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(true)}
      />

      {isEditing ? (
        <CoachProfileEditForm
          coach={coach}
          onSave={handleSaveProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CoachPersonalInfo coach={coach} />
            <CoachBodyInfo coach={coach} onUpdateBody={handleUpdateBody} />
          </div>

          <RecentBodyUpdates logs={logs} />
        </div>
      )}
    </div>
  );
}
