'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

interface DashboardSectionPageProps {
  title: string;
  subtitle: string;
  sectionName: string;
  metricLabel?: string;
  metricValue?: string | number;
  metricStatus?: string;
  metricDescription?: string;
  backHref?: string;
  children?: React.ReactNode;
}

export function DashboardSectionPage({
  title,
  subtitle,
  sectionName,
  metricLabel,
  metricValue,
  metricStatus,
  metricDescription,
  backHref,
  children,
}: DashboardSectionPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="max-w-4xl mx-auto space-y-6 select-none"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title={title}
          subtitle={subtitle}
          section={sectionName}
          actions={
            metricStatus ? (
              <StatusBadge
                status={
                  metricStatus.toLowerCase().includes('good') ||
                  metricStatus.toLowerCase().includes('excellent') ||
                  metricStatus.toLowerCase().includes('optimal')
                    ? 'positive'
                    : metricStatus.toLowerCase().includes('attention') ||
                      metricStatus.toLowerCase().includes('low') ||
                      metricStatus.toLowerCase().includes('deficit')
                    ? 'risk'
                    : 'warning'
                }
                label={metricStatus}
              />
            ) : undefined
          }
        />
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center justify-center text-xs font-semibold px-3 py-1.5 border border-border-default rounded-lg hover:bg-surface-2 transition-colors uppercase self-start sm:self-auto cursor-pointer"
          >
            &lt; Back
          </Link>
        )}
      </div>

      {metricLabel && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 md:col-span-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-foreground-muted uppercase">
                {metricLabel}
              </span>
              <div className="text-4xl font-bold font-sans text-brand tracking-tight mt-3">
                {metricValue}
              </div>
            </div>
            {metricDescription && (
              <p className="text-xs text-foreground-muted mt-4">
                {metricDescription}
              </p>
            )}
          </Card>

          <Card className="p-6 md:col-span-2 space-y-3">
            <CardTitle>
              Overview & Analysis
            </CardTitle>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              Continuous monitoring of your {metricLabel.toLowerCase()} allows the Ludis Performance Engine to detect minor anomalies before they develop into training setbacks.
            </p>
            <div className="text-[11px] text-foreground-muted bg-surface-2 p-2.5 rounded-lg border border-border-subtle">
              Status: <span className="font-semibold text-foreground">{metricStatus || 'Stable'}</span>
            </div>
          </Card>
        </div>
      )}

      {children}
    </motion.div>
  );
}
