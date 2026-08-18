'use client';

import { useState } from 'react';
import { useDemo } from '@/lib/demo/demo-context';
import { Card } from '@/components/ui/card';

export function HeadToHeadCompare() {
  const { athletes } = useDemo();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleAthlete = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((a) => a !== id);
      if (prev.length < 3) return [...prev, id];
      return prev;
    });
  };

  const selectedAthletes = athletes.filter(a => selectedIds.includes(a.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="ludis-section-title">Head-to-Head Comparison</h2>
        <span className="text-[10px] text-foreground-muted uppercase tracking-widest font-bold">Select up to 3</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {athletes.map(a => (
          <button
            key={a.id}
            onClick={() => toggleAthlete(a.id)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-colors ${selectedIds.includes(a.id) ? 'bg-brand text-brand-foreground' : 'bg-surface-2 text-foreground hover:bg-surface-3 border border-border-default'}`}
          >
            {a.profile.firstName} {a.profile.lastName}
          </button>
        ))}
      </div>

      {selectedAthletes.length > 0 && (
        <Card className="p-0 overflow-hidden border border-border-default mt-4 card-depth-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2 border-b border-border-subtle text-xs uppercase tracking-wider font-bold text-foreground-secondary">
                <tr>
                  <th className="p-4">Metric</th>
                  {selectedAthletes.map(a => (
                    <th key={a.id} className="p-4">{a.profile.firstName}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-foreground">
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="p-4 font-semibold text-foreground-secondary">Readiness</td>
                  {selectedAthletes.map(a => (
                    <td key={a.id} className="p-4 tabular-nums font-medium">{a.readiness.score}</td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="p-4 font-semibold text-foreground-secondary">ACWR</td>
                  {selectedAthletes.map(a => (
                    <td key={a.id} className="p-4 tabular-nums font-medium">{a.acwr || '1.10'}</td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="p-4 font-semibold text-foreground-secondary">HRV (ms)</td>
                  {selectedAthletes.map(a => (
                    <td key={a.id} className="p-4 tabular-nums font-medium">{a.contributors.hrv.value}</td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="p-4 font-semibold text-foreground-secondary">Cortisol (mcg/dL)</td>
                  {selectedAthletes.map(a => (
                    <td key={a.id} className="p-4 tabular-nums font-medium">{a.biomarkers?.cortisol.current || '14.2'}</td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="p-4 font-semibold text-foreground-secondary">CPK (U/L)</td>
                  {selectedAthletes.map(a => (
                    <td key={a.id} className="p-4 tabular-nums font-medium">{a.biomarkers?.cpk.current || '165'}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

