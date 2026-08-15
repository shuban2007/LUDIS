'use client';

// Ludis — Coach Personal Info Component
import type { CoachProfileData } from '@/lib/types/profile';
import { Card } from '@/components/ui/card';

interface CoachPersonalInfoProps {
  coach: CoachProfileData;
}

export function CoachPersonalInfo({ coach }: CoachPersonalInfoProps) {
  return (
    <Card className="p-5 text-left space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-brand border-b border-border-subtle pb-2">
        Personal & Coaching Information
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-foreground-muted block text-xs">Full Name</span>
          <span className="text-foreground font-semibold mt-1 block">{coach.fullName}</span>
        </div>
        <div>
          <span className="text-foreground-muted block text-xs">Age</span>
          <span className="text-foreground font-semibold mt-1 block">{coach.age}</span>
        </div>
        <div>
          <span className="text-foreground-muted block text-xs">Sport</span>
          <span className="text-foreground font-semibold mt-1 block">{coach.sport}</span>
        </div>
        <div>
          <span className="text-foreground-muted block text-xs">Role / Title</span>
          <span className="text-foreground font-semibold mt-1 block">{coach.role}</span>
        </div>
      </div>
    </Card>
  );
}
