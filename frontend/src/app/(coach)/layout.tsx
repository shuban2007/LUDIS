// Coach route group layout — wraps all /coach/* routes in the CoachShell

import { CoachShell } from '@/components/coach/coach-shell';

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return <CoachShell>{children}</CoachShell>;
}
