// Ludis — Notifications Page

import { PageHeader } from '@/components/ui/page-header';
import { AlertCard } from '@/components/shared/alert-card';
import { EmptyState } from '@/components/ui/states';
import { getCurrentAthlete, getNotifications } from '@/lib/services/data-service';

export default function NotificationsPage() {
  const athlete = getCurrentAthlete();
  const notifications = getNotifications(athlete.userId);

  return (
    <div className="max-w-4xl">
      <PageHeader title="Notifications" section="Notifications" />

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" description="You're all caught up." />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <AlertCard
              key={n.id}
              severity={n.severity}
              title={n.title}
              message={n.message}
              actionLabel="View"
              actionUrl={n.actionUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
