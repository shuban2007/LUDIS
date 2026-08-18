'use client';

import { DashboardSectionPage } from '@/components/dashboard/dashboard-section-page';
import { NationalBenchmarking } from '@/components/athlete/national-benchmarking';

export default function BenchmarksPage() {
  return (
    <DashboardSectionPage
      title="National Benchmarking"
      subtitle="Compare metrics against national standards."
      sectionName="Benchmarks"
      metricLabel="Status"
      metricValue="Active"
      metricStatus="Optimal"
      metricDescription="Radar data loaded"
      backHref="/athlete"
    >
      <NationalBenchmarking />
    </DashboardSectionPage>
  );
}
