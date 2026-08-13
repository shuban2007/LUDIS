// Athlete route group layout — wraps all /athlete/* routes in the AthleteShell

import { AthleteShell } from '@/components/athlete/athlete-shell';

export default function AthleteLayout({ children }: { children: React.ReactNode }) {
  return <AthleteShell>{children}</AthleteShell>;
}
