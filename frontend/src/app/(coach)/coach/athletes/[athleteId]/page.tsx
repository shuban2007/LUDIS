// Ludis — Coach Athlete Detail Page
// Dynamic route resolving details from state provider.

'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/demo-context';
import { PageHeader } from '@/components/ui/page-header';
import { AthleteDetailView } from '@/components/coach/athlete-detail-view';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ athleteId: string }>;
}

export default function AthleteDetailPage({ params }: PageProps) {
  const { athleteId } = React.use(params);
  const { getAthleteById } = useDemo();
  const athlete = getAthleteById(athleteId);

  if (!athlete) {
    return (
      <div className="max-w-4xl space-y-4 text-left">
        <PageHeader title="Athlete Not Found" section="Athletes" />
        <p className="text-foreground-secondary">
          This athlete does not exist or you do not have permission to view their data.
        </p>
        <Link
          href="/coach"
          className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 border border-border-default rounded-lg hover:bg-surface-2 transition-colors uppercase cursor-pointer"
        >
          &lt; Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AthleteDetailView athlete={athlete} />
    </div>
  );
}
