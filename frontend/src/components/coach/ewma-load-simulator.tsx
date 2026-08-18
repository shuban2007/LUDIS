'use client';

import { useState } from 'react';
import { useDemo } from '@/lib/demo/demo-context';
import { Card } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from 'recharts';

export function EwmaLoadSimulator() {
  const { athletes } = useDemo();
  const [selectedAthleteId, setSelectedAthleteId] = useState(athletes[0]?.id);
  const [addedLoad, setAddedLoad] = useState<number>(300);

  const athlete = athletes.find(a => a.id === selectedAthleteId);
  
  if (!athlete) return null;

  const currentAcute = athlete.acuteLoad || 400;
  const currentChronic = athlete.chronicLoad || 400;
  
  // Simulate next week
  const simulatedAcute = (currentAcute * 0.5) + addedLoad;
  const simulatedACWR = simulatedAcute / currentChronic;

  const chartData = [
    { day: 'Day -3', acwr: 1.05 },
    { day: 'Day -2', acwr: 1.10 },
    { day: 'Day -1', acwr: athlete.acwr || 1.15 },
    { day: 'Today', acwr: simulatedACWR },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="ludis-section-title">Coach EWMA Load Simulator</h2>
        <select 
          className="bg-surface-2 border border-border-default text-xs rounded-md px-2 py-1 text-foreground"
          value={selectedAthleteId}
          onChange={(e) => setSelectedAthleteId(e.target.value)}
        >
          {athletes.map(a => (
            <option key={a.id} value={a.id}>{a.profile.firstName} {a.profile.lastName}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border border-border-default card-depth-1">
          <h3 className="text-xs font-bold tracking-widest text-foreground uppercase mb-4">Input Projected Load</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-foreground-secondary">Simulated Session Load (AU)</span>
                <span className="font-bold text-foreground">{addedLoad} AU</span>
              </div>
              <input 
                type="range" 
                min="0" max="1000" step="50"
                value={addedLoad}
                onChange={(e) => setAddedLoad(Number(e.target.value))}
                className="w-full accent-brand"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-surface-2 rounded-lg border border-border-subtle">
                <div className="text-[10px] text-foreground-muted uppercase tracking-wider">Current ACWR</div>
                <div className="text-xl font-bold font-sans text-foreground tabular-nums mt-1">{athlete.acwr || '1.15'}</div>
              </div>
              <div className={`p-3 rounded-lg border ${simulatedACWR > 1.5 ? 'bg-danger/10 border-danger text-danger' : simulatedACWR < 0.8 ? 'bg-warning/10 border-warning text-warning' : 'bg-success/10 border-success text-success'}`}>
                <div className="text-[10px] uppercase tracking-wider opacity-80">Projected ACWR</div>
                <div className="text-xl font-bold font-sans tabular-nums mt-1">{simulatedACWR.toFixed(2)}</div>
              </div>
            </div>

            <p className="text-xs text-foreground-secondary leading-relaxed">
              {simulatedACWR > 1.5 
                ? 'Warning: Projected load places athlete in the "Danger Zone" (>1.5). High risk of injury. Consider reducing volume.' 
                : simulatedACWR < 0.8 
                ? 'Notice: Projected load is low (<0.8). Athlete may lose fitness adaptations.' 
                : 'Optimal: Projected load maintains athlete in the "Sweet Spot" (0.8 - 1.5).'}
            </p>
          </div>
        </Card>

        <Card className="p-6 border border-border-default card-depth-1">
          <h3 className="text-xs font-bold tracking-widest text-foreground uppercase mb-4">ACWR Trajectory</h3>
          <div className="h-[200px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -30, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} domain={[0, 2.0]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <ReferenceLine y={1.5} stroke="var(--danger)" strokeDasharray="3 3" />
                <ReferenceLine y={0.8} stroke="var(--warning)" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="acwr" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

