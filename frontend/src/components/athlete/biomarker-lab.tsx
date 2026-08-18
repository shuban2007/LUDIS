'use client';

import { useState } from 'react';
import { useDemo } from '@/lib/demo/demo-context';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function BiomarkerLab() {
  const { getCurrentAthlete } = useDemo();
  const currentAthlete = getCurrentAthlete();
  const biomarkers = currentAthlete.biomarkers;

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Mock data for Longitudinal Adaptation Chart
  const trendData = [
    { date: 'W1', cortisol: 12.0, cpk: 160, ferritin: 80 },
    { date: 'W2', cortisol: 13.5, cpk: 175, ferritin: 75 },
    { date: 'W3', cortisol: 15.2, cpk: 190, ferritin: 72 },
    { date: 'W4', cortisol: 14.8, cpk: 185, ferritin: 68 },
    { date: 'W5', cortisol: 17.1, cpk: 205, ferritin: 65 },
    { date: 'W6', cortisol: 18.4, cpk: 210, ferritin: 65 },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsUploading(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsUploading(false);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  if (!biomarkers) return <div className="p-4 bg-danger/10 text-danger rounded-xl">Biomarkers data missing for {currentAthlete.id}</div>;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-medium text-foreground">Biomarker Lab (IARR Engine)</h2>
          <p className="text-sm text-foreground-secondary">Point-of-care biomaterial assays and surveillance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Grid and Upload */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(biomarkers).map(([key, data]) => (
              <div key={key} className="p-4 rounded-xl bg-surface-2 border border-border-subtle">
                <div className="text-[10px] font-bold text-foreground-secondary uppercase tracking-widest mb-2">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-2xl font-bold font-sans text-foreground tabular-nums">
                  {data.current} <span className="text-sm font-normal text-foreground-muted">{'unit' in data ? (data as any).unit : ''}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-semibold uppercase ${data.status === 'optimal' ? 'text-success' : data.status === 'moderate' ? 'text-warning' : 'text-danger'}`}>
                    {data.status}
                  </span>
                  <span className="text-[10px] text-foreground-muted">Base: {data.baseline}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl card-depth-1 p-6">
            <h3 className="text-xs font-bold tracking-widest text-foreground uppercase mb-4">LONGITUDINAL ADAPTATION CHART</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCortisol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Area type="monotone" dataKey="cortisol" stroke="#4f46e5" fillOpacity={1} fill="url(#colorCortisol)" strokeWidth={2} />
                  <Area type="monotone" dataKey="cpk" stroke="#0ea5e9" fill="transparent" strokeDasharray="3 3" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Prescription & Upload */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl card-depth-1 p-6 border-l-4 border-l-brand">
            <h3 className="text-[11px] font-bold tracking-widest text-brand uppercase">CLINICAL PRESCRIPTION</h3>
            <p className="text-sm text-foreground-secondary mt-3">
              Elevated Cortisol/CPK detected. Tissue micro-trauma indicates extended recovery requirements.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-surface-2 border border-border-default text-xs text-foreground">
              <span className="font-semibold text-brand">Nutrition Intervention:</span> Curcumin stack + Tart Cherry extract recommended post-session.
            </div>
          </div>

          <div 
            className={`rounded-2xl card-depth-1 p-6 border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors h-48 ${isUploading ? 'border-brand bg-brand-soft/10' : 'border-border-default bg-surface-2'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadSuccess ? (
              <div className="text-success font-bold text-sm">✓ Lab Data Parsed & Updated</div>
            ) : (
              <>
                <div className="text-foreground-muted mb-2 text-2xl">🧪</div>
                <div className="text-sm font-semibold text-foreground">Lab Parsing Engine</div>
                <div className="text-xs text-foreground-secondary mt-1">Drag and drop point-of-care biomarker CSV/JSON to sync individual baselines.</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

