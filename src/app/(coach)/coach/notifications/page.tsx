'use client';

// Ludis — Coach Notifications Page
import { useDemo } from '@/lib/demo/demo-context';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/states';
import Link from 'next/link';

export default function CoachNotificationsPage() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
  } = useDemo();

  return (
    <div className="max-w-5xl space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Notifications"
          subtitle={`${notifications.filter((n) => !n.read).length} unread alerts`}
          section="Alerts & Logs"
        />
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {notifications.some((n) => !n.read) && (
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="text-xs font-semibold px-3 py-1.5 bg-brand hover:bg-brand-hover text-brand-foreground rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
            >
              Mark All Read
            </button>
          )}
          <Link
            href="/coach"
            className="inline-flex items-center justify-center text-xs font-semibold px-3 py-1.5 border border-border-default rounded-lg hover:bg-surface-2 transition-colors uppercase cursor-pointer"
          >
            &lt; Dashboard
          </Link>
        </div>
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" description="You're all caught up." />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card
              key={n.id}
              className={`p-5 border-l-4 transition-all duration-200 ${
                n.read ? 'border-l-border-subtle opacity-70' : 'border-l-brand'
              } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
            >
              <div className="text-left space-y-1">
                <div className="flex items-center gap-2">
                  {!n.read && (
                    <span className="h-2 w-2 rounded-full bg-brand shrink-0 animate-pulse" title="Unread" />
                  )}
                  <span className="text-[10px] font-extrabold tracking-widest text-foreground-muted uppercase">
                    {n.type} · {n.timestamp}
                  </span>
                </div>
                <CardTitle>{n.title}</CardTitle>
                <CardDescription>
                  {n.message}
                </CardDescription>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                {n.athleteId && (
                  <Link
                    href={`/coach/athletes/${n.athleteId}`}
                    className="text-[10px] font-bold px-2.5 py-1.5 bg-brand text-brand-foreground rounded-lg transition-colors uppercase cursor-pointer"
                  >
                    View Athlete
                  </Link>
                )}
                {!n.read && (
                  <button
                    type="button"
                    onClick={() => markNotificationRead(n.id)}
                    className="text-[10px] font-bold px-2.5 py-1.5 bg-surface-2 hover:bg-surface-3 text-foreground rounded-lg border border-border-default transition-colors uppercase cursor-pointer"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => deleteNotification(n.id)}
                  className="text-[10px] font-bold px-2.5 py-1.5 bg-surface-2 hover:bg-danger/10 hover:text-danger text-foreground-muted rounded-lg border border-border-default hover:border-danger/30 transition-colors uppercase cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
