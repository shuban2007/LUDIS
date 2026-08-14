// Ludis — Performance Trend SVG Line Chart Component
// Renders 10-day trend line with shaded baseline band (76-80), grid lines, and active point indicator.

'use client';

import { useState } from 'react';
import type { DashboardTrendPoint } from '@/lib/types';

interface DashboardTrendChartProps {
  trend: DashboardTrendPoint[];
  baselineMin?: number;
  baselineMax?: number;
}

export function DashboardTrendChart({
  trend,
  baselineMin = 76,
  baselineMax = 80,
}: DashboardTrendChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!trend || trend.length === 0) return null;

  // Chart dimensions & scaling
  const width = 540;
  const height = 200;
  const padding = { top: 20, right: 24, bottom: 30, left: 36 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Fixed Y axis bounds matching reference image: 65 to 90
  const yMin = 65;
  const yMax = 90;
  const yTicks = [90, 85, 80, 75, 70, 65];

  const getX = (index: number) =>
    padding.left + (index / (trend.length - 1)) * innerWidth;

  const getY = (val: number) =>
    padding.top + innerHeight - ((val - yMin) / (yMax - yMin)) * innerHeight;

  // Polyline SVG path
  const linePath = trend
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.value)}`)
    .join(' ');

  // Baseline band coordinates
  const baselineTopY = getY(baselineMax);
  const baselineBottomY = getY(baselineMin);
  const baselineHeight = baselineBottomY - baselineTopY;

  return (
    <div className="relative w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible select-none"
        role="img"
        aria-label="Performance trend chart"
      >
        {/* Y-Axis Grid Lines & Labels */}
        {yTicks.map((tick) => {
          const yPos = getY(tick);
          return (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={yPos}
                x2={width - padding.right}
                y2={yPos}
                stroke="var(--chart-grid)"
                strokeWidth={1}
              />
              <text
                x={padding.left - 10}
                y={yPos + 4}
                textAnchor="end"
                className="text-[10px] font-mono fill-[#777777]"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Shaded Personal Baseline Band (76 - 80) */}
        <rect
          x={padding.left}
          y={baselineTopY}
          width={innerWidth}
          height={baselineHeight}
          fill="var(--chart-band-bg)"
        />
        {/* Top & Bottom Baseline dashed borders */}
        <line
          x1={padding.left}
          y1={baselineTopY}
          x2={width - padding.right}
          y2={baselineTopY}
          stroke="var(--chart-band-border)"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <line
          x1={padding.left}
          y1={baselineBottomY}
          x2={width - padding.right}
          y2={baselineBottomY}
          stroke="var(--chart-band-border)"
          strokeWidth={1}
          strokeDasharray="4 4"
        />


        {/* Teal Performance Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#00BFA6"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {trend.map((pt, i) => {
          const cx = getX(i);
          const cy = getY(pt.value);
          const isLast = i === trend.length - 1;
          const isHovered = hoveredIndex === i;

          return (
            <g
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer group"
            >
              {/* Highlight Outer Ring for current/last point */}
              {isLast && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={8}
                  fill="none"
                  stroke="#00BFA6"
                  strokeWidth={2}
                  className="animate-pulse"
                />
              )}

              {/* Hover ring */}
              {isHovered && !isLast && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={7}
                  fill="none"
                  stroke="#00BFA6"
                  strokeWidth={1.5}
                  opacity={0.8}
                />
              )}

              {/* Center Dot */}
              <circle
                cx={cx}
                cy={cy}
                r={3.5}
                fill="#00BFA6"
              />
            </g>
          );
        })}

        {/* X-Axis Date Labels */}
        {trend.map((pt, i) => {
          const cx = getX(i);
          return (
            <text
              key={i}
              x={cx}
              y={height - 6}
              textAnchor="middle"
              className="text-[10px] font-sans fill-[#777777]"
            >
              {pt.date}
            </text>
          );
        })}
      </svg>

      {/* Hover Tooltip Overlay */}
      {hoveredIndex !== null && (
        <div
          className="absolute z-20 pointer-events-none bg-[#0B0C0F] border border-white/10 px-2.5 py-1 rounded shadow-lg text-[11px] font-mono text-text-primary -translate-x-1/2 -translate-y-full mb-2"
          style={{
            left: `${(getX(hoveredIndex) / width) * 100}%`,
            top: `${(getY(trend[hoveredIndex].value) / height) * 100}%`,
          }}
        >
          <span className="text-brand-primary font-bold">{trend[hoveredIndex].value} pts</span>
          <span className="text-text-muted ml-1">({trend[hoveredIndex].date})</span>
        </div>
      )}
    </div>
  );
}
