// Ludis Domain Types — Notifications

import type { ID, ISODateString, StatusSeverity } from './common';

/** Notification type */
export type NotificationType =
  | 'alert'
  | 'recommendation'
  | 'permission_request'
  | 'performance_change'
  | 'event_reminder'
  | 'system';

/** Notification */
export interface Notification {
  id: ID;
  userId: ID;
  type: NotificationType;
  title: string;
  message: string;
  severity: StatusSeverity;
  read: boolean;
  actionUrl?: string;
  createdAt: ISODateString;
}
