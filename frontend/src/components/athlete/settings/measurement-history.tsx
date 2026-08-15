'use client';

// Ludis — Measurement History Component
import { useState } from 'react';
import type { HealthMeasurement } from '@/lib/types/health-measurement';
import { Card } from '@/components/ui/card';
import { capitalize } from '@/lib/utils';

interface MeasurementHistoryProps {
  healthMeasurements: HealthMeasurement[];
  onSaveEdit: (id: string, metric: string, source: string, value?: number, secondaryValue?: number, unit?: string) => void;
  onDelete: (id: string) => void;
}

export function MeasurementHistory({ healthMeasurements, onSaveEdit, onDelete }: MeasurementHistoryProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [editSecondaryValue, setEditSecondaryValue] = useState<string>('');

  const startEdit = (id: string, val?: number, secVal?: number) => {
    setEditingId(id);
    setEditValue(val !== undefined ? String(val) : '');
    setEditSecondaryValue(secVal !== undefined ? String(secVal) : '');
  };

  const handleSave = (id: string, metric: string, source: string, unit?: string) => {
    const val = editValue === '' ? undefined : Number(editValue);
    const secVal = editSecondaryValue === '' ? undefined : Number(editSecondaryValue);
    onSaveEdit(id, metric, source, val, secVal, unit);
    setEditingId(null);
  };

  const formatMetricLabel = (metric: string) => {
    switch (metric) {
      case 'heartRate':
        return 'Heart Rate';
      case 'restingHeartRate':
        return 'Resting Heart Rate';
      case 'hrv':
        return 'Heart Rate Variability (HRV)';
      case 'bloodPressure':
        return 'Blood Pressure';
      case 'sleep':
        return 'Sleep Duration';
      case 'trainingDuration':
        return 'Training Duration';
      case 'trainingRpe':
        return 'Training Effort / RPE';
      case 'muscleSoreness':
        return 'Muscle Soreness';
      case 'energyLevel':
        return 'Energy Level';
      case 'bodyWeight':
        return 'Body Weight';
      default:
        return capitalize(metric);
    }
  };

  const formatMetricValue = (metric: string, val?: number, secVal?: number, unit?: string) => {
    if (val === undefined) return 'N/A';
    if (metric === 'sleep') {
      return `${Math.floor(val / 60)}h ${val % 60}m`;
    }
    if (metric === 'bloodPressure' && secVal !== undefined) {
      return `${val} / ${secVal} mmHg`;
    }
    if (metric === 'trainingRpe' || metric === 'muscleSoreness' || metric === 'energyLevel') {
      return `${val} / 10`;
    }
    return `${val} ${unit ?? ''}`;
  };

  return (
    <div className="space-y-3 text-left min-w-0">
      <h3 className="text-xs font-bold uppercase tracking-widest text-brand">
        Measurement History
      </h3>

      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1 no-scrollbar min-w-0">
        {healthMeasurements
          .filter((m) => m.userId === 'usr-001')
          .slice()
          .reverse()
          .map((m) => {
            const isEditing = editingId === m.id;

            return (
              <Card
                key={m.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-border-subtle bg-surface-2/40 transition-colors min-w-0 w-full"
              >
                <div className="text-left space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-foreground">
                      {formatMetricLabel(m.metric)}
                    </span>
                    <span className="h-3 border-r border-border-subtle hidden sm:inline-block" />
                    <span className="text-[10px] text-foreground-muted font-mono uppercase truncate">
                      {m.source === 'google_fit' ? 'Google Fit' : m.source === 'wearable' ? 'Wearable' : 'Manual'} · {m.timestamp}
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="flex items-center gap-2 pt-1">
                      {m.metric === 'bloodPressure' ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-16 bg-surface-3 border border-border-default text-xs rounded px-1.5 py-1 text-center font-mono font-bold"
                          />
                          <span className="text-foreground-muted text-xs">/</span>
                          <input
                            type="number"
                            value={editSecondaryValue}
                            onChange={(e) => setEditSecondaryValue(e.target.value)}
                            className="w-16 bg-surface-3 border border-border-default text-xs rounded px-1.5 py-1 text-center font-mono font-bold"
                          />
                          <span className="text-[11px] text-foreground-muted">mmHg</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-20 bg-surface-3 border border-border-default text-xs rounded px-1.5 py-1 font-mono font-bold"
                          />
                          <span className="text-[11px] text-foreground-muted">{m.unit ?? ''}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-brand font-sans font-mono">
                      {formatMetricValue(m.metric, m.value, m.secondaryValue, m.unit)}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  {m.source === 'manual' ? (
                    isEditing ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleSave(m.id, m.metric, m.source, m.unit)}
                          className="text-[10px] font-bold px-2 py-1 bg-brand text-brand-foreground rounded transition-colors uppercase cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="text-[10px] font-bold px-2 py-1 bg-surface-3 text-foreground-secondary rounded transition-colors border border-border-default uppercase cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(m.id, m.value, m.secondaryValue)}
                          className="text-[10px] font-bold px-2.5 py-1 bg-surface-3 hover:bg-surface-4 text-foreground rounded transition-colors border border-border-default uppercase cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(m.id)}
                          className="text-[10px] font-bold px-2.5 py-1 bg-surface-3 hover:bg-danger/10 hover:text-danger text-foreground-muted rounded transition-colors border border-border-default hover:border-danger/30 uppercase cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )
                  ) : (
                    <span className="text-[10px] font-extrabold tracking-wider text-foreground-muted uppercase border border-border-subtle bg-surface-2 px-2 py-1 rounded">
                      Read Only
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
