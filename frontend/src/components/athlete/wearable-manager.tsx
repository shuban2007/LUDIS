'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { BoltIcon } from '@/components/ui/icons';

interface Device {
  id: string;
  name: string;
  connected: boolean;
  lastSync?: string;
  latency?: string;
}

const INITIAL_DEVICES: Device[] = [
  { id: 'whoop', name: 'Whoop Strap 4.0', connected: true, lastSync: '2m ago', latency: '24ms' },
  { id: 'garmin', name: 'Garmin Fenix 7', connected: false },
  { id: 'apple', name: 'Apple Watch Ultra', connected: false },
  { id: 'polar', name: 'Polar H10', connected: false },
  { id: 'oura', name: 'Oura Ring Gen 3', connected: false },
  { id: 'sai_imu', name: 'SAI IMU Sensor Kit', connected: true, lastSync: '12s ago', latency: '8ms' },
];

export function WearableManager() {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  const toggleDevice = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nowConnected = !d.connected;
          return {
            ...d,
            connected: nowConnected,
            lastSync: nowConnected ? 'Just now' : undefined,
            latency: nowConnected ? `${Math.floor(Math.random() * 40 + 10)}ms` : undefined,
          };
        }
        return d;
      })
    );
  };

  const handleSync = (id: string) => {
    setIsSyncing(id);
    setTimeout(() => {
      setDevices((prev) =>
        prev.map((d) => {
          if (d.id === id) {
            return {
              ...d,
              lastSync: 'Just now',
              latency: `${Math.floor(Math.random() * 40 + 10)}ms`,
            };
          }
          return d;
        })
      );
      setIsSyncing(null);
    }, 1500);
  };

  return (
    <div className="rounded-2xl card-depth-1 p-6 transition-transform duration-300 hover:-translate-y-[2px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold tracking-widest text-foreground uppercase">
          DEVICE & WEARABLE INTEGRATION
        </h2>
        <div className="flex items-center gap-2 text-[10px] text-brand uppercase font-bold tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
          </span>
          Live Telemetry
        </div>
      </div>

      <div className="space-y-3">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-2 border border-border-subtle">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleDevice(device.id)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${device.connected ? 'bg-brand' : 'bg-surface-3'}`}
              >
                <span className="sr-only">Toggle {device.name}</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${device.connected ? 'translate-x-1.5' : '-translate-x-1.5'}`}
                />
              </button>
              <div>
                <div className="text-sm font-semibold text-foreground">{device.name}</div>
                {device.connected ? (
                  <div className="text-[10px] text-foreground-muted flex gap-2">
                    <span>Sync: {device.lastSync}</span>
                    <span>Lat: {device.latency}</span>
                  </div>
                ) : (
                  <div className="text-[10px] text-foreground-muted">Disconnected</div>
                )}
              </div>
            </div>
            
            {device.connected && (
              <button
                type="button"
                onClick={() => handleSync(device.id)}
                disabled={isSyncing === device.id}
                className="p-1.5 hover:bg-surface-3 rounded-md text-foreground-secondary transition-colors"
                title="Force Sync"
              >
                <BoltIcon className={`w-4 h-4 ${isSyncing === device.id ? 'animate-spin' : ''}`} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
