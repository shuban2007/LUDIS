'use client';

// Ludis — Body Information Card Component
import { useState } from 'react';
import type { AthleteData } from '@/data/demo/demo-data';
import { Card } from '@/components/ui/card';

interface BodyInformationCardProps {
  athlete: AthleteData;
  onUpdateBody: (updates: { height?: number; weight?: number }) => void;
}

export function BodyInformationCard({ athlete, onUpdateBody }: BodyInformationCardProps) {
  const currentHeight = athlete.profile.height ?? 172;
  const currentWeight = athlete.profile.weight ?? 62;

  const [isEditing, setIsEditing] = useState(false);
  const [heightInput, setHeightInput] = useState(String(currentHeight));
  const [weightInput, setWeightInput] = useState(String(currentWeight));
  const [errors, setErrors] = useState<{ height?: string; weight?: string }>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { height?: string; weight?: string } = {};

    const hNum = Number(heightInput);
    if (!heightInput || isNaN(hNum) || hNum <= 0) {
      newErrors.height = 'Height must be greater than 0 cm.';
    }

    const wNum = Number(weightInput);
    if (!weightInput || isNaN(wNum) || wNum <= 0) {
      newErrors.weight = 'Weight must be greater than 0 kg.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdateBody({ height: hNum, weight: wNum });
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setHeightInput(String(currentHeight));
    setWeightInput(String(currentWeight));
    setErrors({});
    setIsEditing(false);
  };

  return (
    <Card className="p-5 text-left space-y-4">
      <div className="flex items-center justify-between border-b border-border-subtle pb-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-brand">
          Body Information
        </h3>
        {!isEditing && (
          <button
            type="button"
            onClick={() => {
              setHeightInput(String(currentHeight));
              setWeightInput(String(currentWeight));
              setIsEditing(true);
            }}
            className="text-xs font-bold text-brand hover:text-brand-hover uppercase tracking-wider cursor-pointer"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="body-height-input" className="text-xs font-semibold text-foreground-secondary">
                Height (cm)
              </label>
              <input
                id="body-height-input"
                type="number"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
                className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
              />
              {errors.height && (
                <span className="text-[10px] text-danger font-semibold">{errors.height}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="body-weight-input" className="text-xs font-semibold text-foreground-secondary">
                Weight (kg)
              </label>
              <input
                id="body-weight-input"
                type="number"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
              />
              {errors.weight && (
                <span className="text-[10px] text-danger font-semibold">{errors.weight}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 border border-border-default hover:bg-surface-2 text-foreground-secondary text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-1.5 px-4 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-foreground-muted block text-xs">Height</span>
            <span className="text-foreground font-bold mt-1 block font-mono text-base">
              {currentHeight} cm
            </span>
          </div>
          <div>
            <span className="text-foreground-muted block text-xs">Weight</span>
            <span className="text-foreground font-bold mt-1 block font-mono text-base">
              {currentWeight} kg
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}
