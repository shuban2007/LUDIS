'use client';

import { useState } from 'react';
import { useDemo } from '@/lib/demo/demo-context';
import { Card } from '@/components/ui/card';

export function DossierExporter() {
  const { athletes } = useDemo();
  const [selectedAthleteId, setSelectedAthleteId] = useState(athletes[0]?.id);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setExportComplete(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="ludis-section-title">NCA Dossier Generation</h2>
      </div>

      <Card className="p-6 border border-border-default card-depth-1 flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-bold text-foreground">Generate Medical & Performance Dossier</h3>
          <p className="text-xs text-foreground-secondary">
            Compile all biomarkers, kinematics, load data, and AI prescriptions into a standardized PDF report for National Cricket Academy review.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
          <select 
            className="w-full sm:w-auto bg-surface-2 border border-border-default text-sm rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-brand"
            value={selectedAthleteId}
            onChange={(e) => setSelectedAthleteId(e.target.value)}
          >
            {athletes.map(a => (
              <option key={a.id} value={a.id}>{a.profile.firstName} {a.profile.lastName}</option>
            ))}
          </select>
          
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 ${exportComplete ? 'bg-success text-white' : 'bg-brand hover:bg-brand-hover text-brand-foreground'}`}
          >
            {exportComplete ? 'Dossier Downloaded ✓' : isExporting ? 'Compiling Data...' : 'Export PDF'}
          </button>
        </div>
      </Card>
    </div>
  );
}

