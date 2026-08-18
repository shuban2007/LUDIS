'use client';

import { useDemo } from '@/lib/demo/demo-context';
import { Card } from '@/components/ui/card';

export function SquadBiomarkerMatrix() {
  const { athletes } = useDemo();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="ludis-section-title">Squad Biomarker Surveillance Matrix</h2>
      </div>

      <Card className="p-0 overflow-hidden border border-border-default card-depth-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-2 border-b border-border-subtle text-xs uppercase tracking-wider font-bold text-foreground-secondary">
              <tr>
                <th className="p-4">Athlete</th>
                <th className="p-4">Cortisol</th>
                <th className="p-4">CPK</th>
                <th className="p-4">hsCRP</th>
                <th className="p-4">Ferritin</th>
                <th className="p-4">Vit D</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-foreground">
              {athletes.map((a) => {
                const bio = a.biomarkers;
                if (!bio) return null;
                
                const getStatusColor = (status: string) => {
                  if (status === 'optimal') return 'text-success bg-success/10';
                  if (status === 'moderate') return 'text-warning bg-warning/10';
                  return 'text-danger bg-danger/10';
                };

                return (
                  <tr key={a.id} className="hover:bg-surface-2/50 transition-colors">
                    <td className="p-4 font-semibold text-foreground">{a.profile.firstName} {a.profile.lastName}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-bold tabular-nums ${getStatusColor(bio.cortisol.status)}`}>
                        {bio.cortisol.current}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-bold tabular-nums ${getStatusColor(bio.cpk.status)}`}>
                        {bio.cpk.current}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-bold tabular-nums ${getStatusColor(bio.hsCRP.status)}`}>
                        {bio.hsCRP.current}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-bold tabular-nums ${getStatusColor(bio.ferritin.status)}`}>
                        {bio.ferritin.current}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-bold tabular-nums ${getStatusColor(bio.vitaminD.status)}`}>
                        {bio.vitaminD.current}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

