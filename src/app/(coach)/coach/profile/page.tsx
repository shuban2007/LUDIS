import { PageHeader } from '@/components/ui/page-header';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export default function CoachProfilePage() {
  return (
    <div className="max-w-4xl">
      <PageHeader title="Coach Profile" section="Profile" />
      <Card className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-surface-overlay flex items-center justify-center text-xl font-bold text-text-secondary">C</div>
          <div>
            <h2 className="text-lg font-bold text-text-primary">Coach Martinez</h2>
            <p className="text-sm text-text-secondary">Running • 5 athletes</p>
          </div>
        </div>
      </Card>
      <Card>
        <CardTitle>Data Access</CardTitle>
        <CardDescription>
          You can only view athlete data that each athlete has explicitly permitted.
          Athletes control their own data sharing preferences.
        </CardDescription>
      </Card>
    </div>
  );
}
