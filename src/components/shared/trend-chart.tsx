// Ludis — TrendChart
// Lightweight SVG-based trend line chart for performance/recovery/fatigue data.
// No external charting library — clean, accessible, communicates decisions.

import type { Trend } from '@/lib/types';
import { formatShortDate } from '@/lib/utils';

interface TrendChartProps {
  trend: Trend;
  baselineValue?: number;
  height?: number;
  color?: string;
  baselineColor?: string;
  label: string;
  unit?: string;
}

export function TrendChart({
  trend,
  baselineValue,
  height = 120,
  color = 'var(--chart-primary)',
  baselineColor = 'var(--chart-baseline)',
  label,
  unit = '',
}: TrendChartProps) {
  const { points } = trend;
  if (points.length === 0) return null;

  const values = points.map((p) => p.value);
  const min = Math.min(...values, baselineValue ?? Infinity) * 0.9;
  const max = Math.max(...values, baselineValue ?? -Infinity) * 1.1;
  const range = max - min || 1;

  const padding = { top: 8, right: 8, bottom: 24, left: 8 };
  const chartWidth = 320;
  const chartHeight = height;
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const getX = (i: number) => padding.left + (i / (points.length - 1)) * innerWidth;
  const getY = (v: number) => padding.top + innerHeight - ((v - min) / range) * innerHeight;

  // Build polyline path
  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.value)}`)
    .join(' ');

  // Build area path
  const areaPath = `${linePath} L ${getX(points.length - 1)} ${getY(min)} L ${getX(0)} ${getY(min)} Z`;

  // Baseline Y position
  const baselineY = baselineValue !== undefined ? getY(baselineValue) : undefined;

  // Textual summary for screen readers
  const summary = `${label} trend: ${trend.direction} over ${trend.periodLabel}. Values from ${Math.min(...values)}${unit} to ${Math.max(...values)}${unit}.${
    baselineValue !== undefined ? ` Baseline: ${baselineValue}${unit}.` : ''
  }`;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="ludis-section-title">{trend.periodLabel}</span>
        <span className="text-[11px] text-text-muted capitalize">{trend.direction}</span>
      </div>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full"
        role="img"
        aria-label={summary}
      >
        <title>{summary}</title>

        {/* Area fill */}
        <path d={areaPath} fill={color} opacity={0.08} />

        {/* Baseline */}
        {baselineY !== undefined && (
          <>
            <line
              x1={padding.left}
              y1={baselineY}
              x2={chartWidth - padding.right}
              y2={baselineY}
              stroke={baselineColor}
              strokeWidth={1}
              strokeDasharray="4 3"
            />
            <text
              x={chartWidth - padding.right}
              y={baselineY - 4}
              textAnchor="end"
              className="text-[9px]"
              fill={baselineColor}
            >
              baseline
            </text>
          </>
        )}

        {/* Trend line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={getX(i)}
            cy={getY(p.value)}
            r={3}
            fill="var(--surface-elevated)"
            stroke={color}
            strokeWidth={1.5}
          />
        ))}

        {/* X-axis labels (first and last) */}
        <text
          x={getX(0)}
          y={chartHeight - 4}
          textAnchor="start"
          className="text-[9px]"
          fill="var(--text-muted)"
        >
          {formatShortDate(points[0].date)}
        </text>
        <text
          x={getX(points.length - 1)}
          y={chartHeight - 4}
          textAnchor="end"
          className="text-[9px]"
          fill="var(--text-muted)"
        >
          {formatShortDate(points[points.length - 1].date)}
        </text>
      </svg>
    </div>
  );
}
