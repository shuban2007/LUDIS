'use client';

// Ludis — Coach Profile Edit Form Component
import { useState } from 'react';
import type { CoachProfileData } from '@/lib/types/profile';
import { Card } from '@/components/ui/card';

interface CoachProfileEditFormProps {
  coach: CoachProfileData;
  onSave: (updates: Partial<CoachProfileData>) => void;
  onCancel: () => void;
}

export function CoachProfileEditForm({ coach, onSave, onCancel }: CoachProfileEditFormProps) {
  const [fullName, setFullName] = useState(coach.fullName);
  const [age, setAge] = useState(String(coach.age));
  const [sport, setSport] = useState(coach.sport);
  const [role, setRole] = useState(coach.role);
  const [height, setHeight] = useState(String(coach.height ?? 180));
  const [weight, setWeight] = useState(String(coach.weight ?? 78));

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    const ageNum = Number(age);
    if (!age || isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      newErrors.age = 'Age must be a valid positive integer.';
    }

    if (!sport.trim()) {
      newErrors.sport = 'Sport is required.';
    }

    if (!role.trim()) {
      newErrors.role = 'Role / Title is required.';
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

    onSave({
      fullName: fullName.trim(),
      age: ageNum,
      sport: sport.trim(),
      role: role.trim(),
      height: hNum,
      weight: wNum,
    });
  };

  return (
    <Card className="p-5 text-left">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">
            Edit Coach Profile
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="coach-fullname-input" className="text-xs font-semibold text-foreground-secondary">
              Full Name
            </label>
            <input
              id="coach-fullname-input"
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
            <label htmlFor="coach-age-input" className="text-xs font-semibold text-foreground-secondary">
              Age
            </label>
            <input
              id="coach-age-input"
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
            <label htmlFor="coach-sport-input" className="text-xs font-semibold text-foreground-secondary">
              Sport
            </label>
            <input
              id="coach-sport-input"
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
            <label htmlFor="coach-role-input" className="text-xs font-semibold text-foreground-secondary">
              Role / Title
            </label>
            <input
              id="coach-role-input"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold"
            />
            {errors.role && (
              <span className="text-[10px] text-danger font-semibold">{errors.role}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="coach-form-height" className="text-xs font-semibold text-foreground-secondary">
              Height (cm)
            </label>
            <input
              id="coach-form-height"
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
            <label htmlFor="coach-form-weight" className="text-xs font-semibold text-foreground-secondary">
              Weight (kg)
            </label>
            <input
              id="coach-form-weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-mono font-bold"
            />
            {errors.weight && (
              <span className="text-[10px] text-danger font-semibold">{errors.weight}</span>
            )}
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
