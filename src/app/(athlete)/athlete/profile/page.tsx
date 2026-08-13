// Ludis — Athlete Profile Page
// Includes coach access management (permissions are product logic, not decoration).

import { PageHeader } from '@/components/ui/page-header';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { getCurrentAthlete } from '@/lib/services/data-service';
import { capitalize } from '@/lib/utils';

export default function ProfilePage() {
  const athlete = getCurrentAthlete();

  return (
    <div className="max-w-4xl">
      <PageHeader title="Profile & Settings" section="Profile" />

      {/* Profile info */}
      <Card className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-surface-overlay flex items-center justify-center text-xl font-bold text-text-secondary">
            {athlete.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-primary">{athlete.name}</h2>
            <p className="text-sm text-text-secondary">
              {capitalize(athlete.sport)} • {capitalize(athlete.experienceLevel)} • Age {athlete.age}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-muted">Competition Level</span>
            <p className="text-text-primary font-medium mt-0.5">{capitalize(athlete.competitionContext.level)}</p>
          </div>
          <div>
            <span className="text-text-muted">Season</span>
            <p className="text-text-primary font-medium mt-0.5">{athlete.competitionContext.currentSeason.replace('_', ' ')}</p>
          </div>
          {athlete.bodyMetrics.heightCm && (
            <div>
              <span className="text-text-muted">Height</span>
              <p className="text-text-primary font-medium mt-0.5">{athlete.bodyMetrics.heightCm} cm</p>
            </div>
          )}
          {athlete.bodyMetrics.weightKg && (
            <div>
              <span className="text-text-muted">Weight</span>
              <p className="text-text-primary font-medium mt-0.5">{athlete.bodyMetrics.weightKg} kg</p>
            </div>
          )}
        </div>
      </Card>

      {/* Coach Access Management */}
      <Card className="mb-6">
        <CardTitle>Coach Access</CardTitle>
        <CardDescription>
          You control which coaches can view your data. Coaches only see data you explicitly permit.
        </CardDescription>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border-subtle">
            <div>
              <span className="text-sm font-medium text-text-primary">Coach Martinez</span>
              <p className="text-xs text-text-secondary">Performance, Recovery, Training Sessions</p>
            </div>
            <StatusBadge status="positive" label="Active" size="sm" />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <span className="text-sm font-medium text-text-primary">Coach Williams</span>
              <p className="text-xs text-text-secondary">Pending access request</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="primary">Approve</Button>
              <Button size="sm" variant="ghost">Deny</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Privacy notice */}
      <Card>
        <CardTitle>Data Privacy</CardTitle>
        <CardDescription>
          Your health and performance data is permission-controlled. Only coaches you explicitly approve
          can access your data, and only within the scopes you grant. Ludis does not share your data
          with third parties.
        </CardDescription>
      </Card>
    </div>
  );
}
