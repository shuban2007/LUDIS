'use client';

// Ludis — Coach Privacy & Data Settings Component
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export function CoachPrivacyCard() {
  return (
    <Card className="p-5 text-left space-y-4">
      <div>
        <CardTitle>Data & Privacy</CardTitle>
        <CardDescription>
          Information regarding athlete data permissions and coach visibility scope.
        </CardDescription>
      </div>

      <div className="space-y-3 text-xs text-foreground-secondary">
        <div className="p-3 rounded-lg bg-surface-2 border border-border-subtle">
          <div className="font-semibold text-foreground mb-1">Athlete Permission Architecture</div>
          <p className="leading-relaxed text-foreground-muted">
            You can only access telemetry and baseline intelligence for athletes who have explicitly granted coach visibility permissions in their account settings.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-surface-2 border border-border-subtle">
          <div className="font-semibold text-foreground mb-1">Data Boundary & Protection</div>
          <p className="leading-relaxed text-foreground-muted">
            All athlete telemetry is used exclusively for training guidance and baseline performance analysis. No medical diagnostic processing is performed.
          </p>
        </div>
      </div>
    </Card>
  );
}
