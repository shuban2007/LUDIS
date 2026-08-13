// Ludis — ConfidenceIndicator
// Displays data quality and confidence level for model outputs.
// First-class UI concept — always visible on prediction outputs.

import type { ConfidenceIndicator as ConfidenceIndicatorType } from '@/lib/types';
import { getConfidenceColor } from '@/lib/utils';

interface ConfidenceIndicatorProps {
  confidence: ConfidenceIndicatorType;
  compact?: boolean;
}

export function ConfidenceIndicator({ confidence, compact }: ConfidenceIndicatorProps) {
  const color = getConfidenceColor(confidence.level);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5" title={confidence.explanation}>
        <div className="flex gap-0.5" aria-label={`Confidence: ${confidence.level}`} role="img">
          {['high', 'moderate', 'low'].map((level, i) => (
            <div
              key={level}
              className="h-2 w-1 rounded-sm"
              style={{
                backgroundColor:
                  i === 0 || (i === 1 && confidence.level !== 'low') || (i === 2 && confidence.level === 'high')
                    ? color
                    : 'var(--border-default)',
              }}
            />
          ))}
        </div>
        <span className="text-[11px] text-text-muted capitalize">{confidence.level}</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-surface-overlay p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="ludis-section-title">Confidence</span>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5" aria-label={`Confidence: ${confidence.level}`} role="img">
            {['high', 'moderate', 'low'].map((level, i) => (
              <div
                key={level}
                className="h-3 w-1.5 rounded-sm"
                style={{
                  backgroundColor:
                    i === 0 || (i === 1 && confidence.level !== 'low') || (i === 2 && confidence.level === 'high')
                      ? color
                      : 'var(--border-default)',
                }}
              />
            ))}
          </div>
          <span className="text-xs font-medium capitalize" style={{ color }}>
            {confidence.level}
          </span>
        </div>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{confidence.explanation}</p>
      {confidence.dataQuality && (
        <div className="mt-2 flex items-center gap-2 text-[11px] text-text-muted">
          <span>Data quality: <span className="capitalize font-medium">{confidence.dataQuality}</span></span>
          {confidence.sampleSize && <span>• {confidence.sampleSize} data points</span>}
        </div>
      )}
    </div>
  );
}
