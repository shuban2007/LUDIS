'use client';

import { useDemo } from '@/lib/demo/demo-context';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function NationalBenchmarking() {
  const { getCurrentAthlete } = useDemo();
  const currentAthlete = getCurrentAthlete();
  const benchmarkScores = currentAthlete.benchmarkScores;

  if (!benchmarkScores) return <div className="p-4 bg-danger/10 text-danger rounded-xl">Benchmark data missing for {currentAthlete.id}</div>;

  const radarData = [
    { subject: 'Aerobic Power', A: benchmarkScores.aerobicPower, national: 78, fullMark: 100 },
    { subject: 'Peak Velocity', A: benchmarkScores.peakVelocity, national: 82, fullMark: 100 },
    { subject: 'Symmetry', A: benchmarkScores.kinematicSymmetry, national: 85, fullMark: 100 },
    { subject: 'Recovery', A: benchmarkScores.recoveryRate, national: 75, fullMark: 100 },
    { subject: 'Explosiveness', A: 76, national: 80, fullMark: 100 },
    { subject: 'Agility', A: 84, national: 79, fullMark: 100 },
    { subject: 'Strength', A: 88, national: 85, fullMark: 100 },
    { subject: 'Endurance', A: 81, national: 82, fullMark: 100 },
  ];

  const microCycleData = [
    { day: 'Mon', focus: 'Active Pool Recovery', zone: 'Z1', volume: '20m' },
    { day: 'Tue', focus: 'Lactate Threshold', zone: 'Z4', volume: '60m' },
    { day: 'Wed', focus: 'Aerobic Base', zone: 'Z2', volume: '90m' },
    { day: 'Thu', focus: 'Strength & Conditioning', zone: 'Z3', volume: '45m' },
    { day: 'Fri', focus: 'Speed & Power', zone: 'Z5', volume: '40m' },
    { day: 'Sat', focus: 'Long Run', zone: 'Z2', volume: '120m' },
    { day: 'Sun', focus: 'Complete Rest', zone: 'Off', volume: '0m' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-medium text-foreground">National Benchmarking Engine</h2>
          <p className="text-sm text-foreground-secondary">Comparing individual markers against SAI National Senior standards.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-2xl card-depth-1 p-6">
          <h3 className="text-xs font-bold tracking-widest text-foreground uppercase mb-6">8-AXIS RADAR VISUALIZATION</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="var(--border-subtle)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--foreground-muted)', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Radar name="Athlete" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                <Radar name="National Avg" dataKey="national" stroke="#888888" fill="#888888" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-brand rounded-sm opacity-50" /> {currentAthlete.profile.firstName}
            </div>
            <div className="flex items-center gap-2 text-foreground-secondary">
              <span className="w-3 h-3 bg-gray-500 rounded-sm opacity-30" /> SAI National Avg
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 rounded-2xl card-depth-1 p-6">
          <h3 className="text-xs font-bold tracking-widest text-foreground uppercase mb-4">7-DAY PERIODIZED MICRO-CYCLE</h3>
          <div className="space-y-3">
            {microCycleData.map((day) => (
              <div key={day.day} className="flex items-center justify-between p-3 rounded-lg bg-surface-2 border border-border-subtle">
                <div className="flex items-center gap-4">
                  <div className="w-10 text-xs font-bold text-foreground-secondary uppercase">{day.day}</div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{day.focus}</div>
                    <div className="text-[10px] text-foreground-muted uppercase tracking-wider">Volume Cap: {day.volume}</div>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase ${day.zone === 'Z5' ? 'bg-danger/20 text-danger' : day.zone === 'Off' ? 'bg-surface-3 text-foreground-secondary' : 'bg-brand-soft/20 text-brand'}`}>
                  {day.zone}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

