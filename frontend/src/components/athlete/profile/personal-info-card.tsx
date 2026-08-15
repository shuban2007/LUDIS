'use client';

// Ludis — Personal Info Card Component
import type { AthleteData } from '@/data/demo/demo-data';
import { Card } from '@/components/ui/card';

interface PersonalInfoCardProps {
  athlete: AthleteData;
}

export function PersonalInfoCard({ athlete }: PersonalInfoCardProps) {
  const fullName = `${athlete.profile.firstName} ${athlete.profile.lastName}`;
  const compLevel = athlete.profile.competitionLevel || athlete.profile.role || 'National Development';
  const seasonBlock = athlete.profile.seasonBlock || 'Mid-Season Prep';

  return (
    <Card className="p-5 text-left space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-brand border-b border-border-subtle pb-2">
        Personal Information
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-foreground-muted block text-xs">Full Name</span>
          <span className="text-foreground font-semibold mt-1 block">{fullName}</span>
        </div>
        <div>
          <span className="text-foreground-muted block text-xs">Age</span>
          <span className="text-foreground font-semibold mt-1 block">{athlete.profile.age}</span>
        </div>
        <div>
          <span className="text-foreground-muted block text-xs">Sport</span>
          <span className="text-foreground font-semibold mt-1 block">{athlete.profile.sport}</span>
        </div>
        <div>
          <span className="text-foreground-muted block text-xs">Competition Level</span>
          <span className="text-foreground font-semibold mt-1 block">{compLevel}</span>
        </div>
        <div>
          <span className="text-foreground-muted block text-xs">Season Block</span>
          <span className="text-foreground font-semibold mt-1 block">{seasonBlock}</span>
        </div>
      </div>
    </Card>
  );
}
