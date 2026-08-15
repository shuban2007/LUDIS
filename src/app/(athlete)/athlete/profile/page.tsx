'use client';

// Ludis — Athlete Profile Page
import { useState } from 'react';
import { useDemo } from '@/lib/demo/demo-context';
import { PageHeader } from '@/components/ui/page-header';
import { ProfileHeader } from '@/components/athlete/profile/profile-header';
import { PersonalInfoCard } from '@/components/athlete/profile/personal-info-card';
import { BodyInformationCard } from '@/components/athlete/profile/body-information-card';
import { RecentBodyUpdates } from '@/components/athlete/profile/recent-body-updates';
import { ProfileEditForm } from '@/components/athlete/profile/profile-edit-form';

export default function AthleteProfilePage() {
  const { getCurrentAthlete, updateAthleteProfile, getProfileMeasurementHistory } = useDemo();
  const athlete = getCurrentAthlete();
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const logs = getProfileMeasurementHistory(athlete.userId || 'usr-001');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveFullProfile = (updates: {
    fullName: string;
    firstName?: string;
    lastName?: string;
    age: number;
    sport: string;
    competitionLevel: string;
    seasonBlock: string;
    height: number;
    weight: number;
  }) => {
    updateAthleteProfile(athlete.id, updates);
    setIsEditing(false);
    showToast('Profile updated');
  };

  const handleUpdateBodyInfo = (bodyUpdates: { height?: number; weight?: number }) => {
    updateAthleteProfile(athlete.id, bodyUpdates);
    showToast('Body measurements updated');
  };

  return (
    <div className="max-w-4xl space-y-6 select-none mx-auto text-left">
      <div className="flex items-center justify-between">
        <PageHeader
          title="PROFILE"
          subtitle="Manage your personal information."
          section="Profile"
        />
        {toastMessage && (
          <div className="px-3.5 py-1.5 rounded-lg bg-brand-soft border border-brand/30 text-brand font-semibold text-xs animate-fade-in">
            ✓ {toastMessage}
          </div>
        )}
      </div>

      <ProfileHeader
        athlete={athlete}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(true)}
      />

      {isEditing ? (
        <ProfileEditForm
          athlete={athlete}
          onSave={handleSaveFullProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PersonalInfoCard athlete={athlete} />
            <BodyInformationCard athlete={athlete} onUpdateBody={handleUpdateBodyInfo} />
          </div>

          <RecentBodyUpdates logs={logs} />
        </div>
      )}
    </div>
  );
}
