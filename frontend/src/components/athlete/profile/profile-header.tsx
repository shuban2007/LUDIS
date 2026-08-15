'use client';

// Ludis — Profile Header Component
import type { AthleteData } from '@/data/demo/demo-data';

interface ProfileHeaderProps {
  athlete: AthleteData;
  isEditing: boolean;
  onEditToggle: () => void;
}

export function ProfileHeader({ athlete, isEditing, onEditToggle }: ProfileHeaderProps) {
  const initial = athlete.profile.firstName.charAt(0);
  const fullName = `${athlete.profile.firstName} ${athlete.profile.lastName}`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 rounded-2xl bg-glass-bg border border-glass-border shadow-sm backdrop-blur-md">
      <div className="flex items-center gap-4 text-left">
        <div className="h-16 w-16 rounded-full bg-brand-soft border border-border-default flex items-center justify-center text-xl font-bold text-brand shrink-0">
          {initial}
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {fullName}
          </h2>
          <p className="text-sm text-foreground-secondary mt-0.5">
            {athlete.profile.sport} • Age {athlete.profile.age}
          </p>
        </div>
      </div>

      {!isEditing && (
        <button
          type="button"
          onClick={onEditToggle}
          className="self-start sm:self-auto px-4 py-2 border border-border-default hover:bg-surface-2 text-foreground text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}
