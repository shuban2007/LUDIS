'use client';

// Ludis — Profile Edit Form Component
import { useState } from 'react';
import type { AthleteData } from '@/data/demo/demo-data';
import { Card } from '@/components/ui/card';

interface ProfileEditFormProps {
  athlete: AthleteData;
  onSave: (updates: {
    fullName: string;
    firstName?: string;
    lastName?: string;
    age: number;
    sport: string;
    competitionLevel: string;
    seasonBlock: string;
    height: number;
    weight: number;
  }) => void;
  onCancel: () => void;
}

export function ProfileEditForm({ athlete, onSave, onCancel }: ProfileEditFormProps) {
  const initialFullName = `${athlete.profile.firstName} ${athlete.profile.lastName}`;
  const initialAge = String(athlete.profile.age);
  const initialSport = athlete.profile.sport;
  const initialCompLevel = athlete.profile.competitionLevel || athlete.profile.role || 'National Development';
  const initialSeasonBlock = athlete.profile.seasonBlock || 'Mid-Season Prep';
  const initialHeight = String(athlete.profile.height ?? 172);
  const initialWeight = String(athlete.profile.weight ?? 62);

  const [fullName, setFullName] = useState(initialFullName);
  const [age, setAge] = useState(initialAge);
  const [sport, setSport] = useState(initialSport);
  const [compLevel, setCompLevel] = useState(initialCompLevel);
  const [seasonBlock, setSeasonBlock] = useState(initialSeasonBlock);
  const [height, setHeight] = useState(initialHeight);
  const [weight, setWeight] = useState(initialWeight);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    const ageNum = Number(age);
    if (!age || isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      newErrors.age = 'Age must be a positive integer.';
    }

    if (!sport.trim()) {
      newErrors.sport = 'Sport is required.';
    }

    const hNum = Number(height);
    if (!height || isNaN(hNum) || hNum <= 0) {
      newErrors.height = 'Height must be greater than 0 cm.';
    }

    const wNum = Number(weight);
    if (!weight || isNaN(wNum) || wNum <= 0) {
      newErrors.weight = 'Weight must be greater than 0 kg.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    onSave({
      fullName: fullName.trim(),
      firstName,
      lastName,
      age: ageNum,
      sport: sport.trim(),
      competitionLevel: compLevel,
      seasonBlock,
      height: hNum,
      weight: wNum,
    });
  };

  return (
    <Card className="p-5 text-left">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">
            Edit Athlete Profile
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullname-input" className="text-xs font-semibold text-foreground-secondary">
              Full Name
            </label>
            <input
              id="fullname-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold"
            />
            {errors.fullName && (
              <span className="text-[10px] text-danger font-semibold">{errors.fullName}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="age-input" className="text-xs font-semibold text-foreground-secondary">
              Age
            </label>
            <input
              id="age-input"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
            />
            {errors.age && (
              <span className="text-[10px] text-danger font-semibold">{errors.age}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="sport-input" className="text-xs font-semibold text-foreground-secondary">
              Sport
            </label>
            <input
              id="sport-input"
              type="text"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold"
            />
            {errors.sport && (
              <span className="text-[10px] text-danger font-semibold">{errors.sport}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="level-select" className="text-xs font-semibold text-foreground-secondary">
              Competition Level
            </label>
            <select
              id="level-select"
              value={compLevel}
              onChange={(e) => setCompLevel(e.target.value)}
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold"
            >
              <option value="National Development">National Development</option>
              <option value="Elite Junior">Elite Junior</option>
              <option value="Professional Athlete">Professional Athlete</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="height-input" className="text-xs font-semibold text-foreground-secondary">
              Height (cm)
            </label>
            <input
              id="height-input"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
            />
            {errors.height && (
              <span className="text-[10px] text-danger font-semibold">{errors.height}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="weight-input" className="text-xs font-semibold text-foreground-secondary">
              Weight (kg)
            </label>
            <input
              id="weight-input"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
            />
            {errors.weight && (
              <span className="text-[10px] text-danger font-semibold">{errors.weight}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="season-select" className="text-xs font-semibold text-foreground-secondary">
              Season Block
            </label>
            <select
              id="season-select"
              value={seasonBlock}
              onChange={(e) => setSeasonBlock(e.target.value)}
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold"
            >
              <option value="Off-Season Base">Off-Season Base</option>
              <option value="Mid-Season Prep">Mid-Season Prep</option>
              <option value="Peak Phase">Peak Phase</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-border-subtle">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-border-default hover:bg-surface-2 text-foreground-secondary text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-5 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Card>
  );
}
