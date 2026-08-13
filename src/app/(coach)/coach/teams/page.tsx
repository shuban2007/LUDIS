// Ludis — Coach Teams Page
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

export default function TeamsPage() {
  return (
    <div className="max-w-5xl">
      <PageHeader title="Teams" subtitle="Manage your teams" section="Teams" />
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Distance Runners</CardTitle>
            <CardDescription>5 athletes • Running</CardDescription>
          </div>
          <StatusBadge status="positive" label="Active" size="sm" />
        </div>
        <div className="mt-3 text-xs text-text-muted">
          Team readiness average: 68%
        </div>
      </Card>
    </div>
  );
}
