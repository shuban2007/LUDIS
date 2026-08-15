'use client';

// Ludis — Coach Edit Team Modal Component
import React, { useState } from 'react';
import type { Team } from '@/lib/types/team';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

interface EditTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
  onSave: (updates: { name: string; sport: string; description?: string }) => void;
  existingTeamNames: string[];
}

export function EditTeamModal({
  isOpen,
  onClose,
  team,
  onSave,
  existingTeamNames,
}: EditTeamModalProps) {
  const [name, setName] = useState(team.name);
  const [sport, setSport] = useState(team.sport);
  const [description, setDescription] = useState(team.description || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const cleanName = name.trim();
    const cleanSport = sport.trim();

    if (!cleanName) {
      newErrors.name = 'Team Name is required.';
    } else if (
      cleanName.toLowerCase() !== team.name.toLowerCase() &&
      existingTeamNames.some((n) => n.toLowerCase() === cleanName.toLowerCase())
    ) {
      newErrors.name = 'A team with this name already exists.';
    }

    if (!cleanSport) {
      newErrors.sport = 'Sport is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      onSave({
        name: cleanName,
        sport: cleanSport,
        description: description.trim() || undefined,
      });
      setIsSaving(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm select-none"
    >
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
        <Card className="p-6 text-left border border-glass-border shadow-lg">
          <CardTitle>Edit Team Details</CardTitle>
          <CardDescription>Update your coaching group configurations.</CardDescription>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="edit-team-name" className="text-xs font-semibold text-foreground-secondary">
                Team Name
              </label>
              <input
                id="edit-team-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSaving}
                className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold disabled:opacity-50"
              />
              {errors.name && (
                <span className="text-[10px] text-danger font-semibold">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="edit-team-sport" className="text-xs font-semibold text-foreground-secondary">
                Sport
              </label>
              <input
                id="edit-team-sport"
                type="text"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                disabled={isSaving}
                className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold disabled:opacity-50"
              />
              {errors.sport && (
                <span className="text-[10px] text-danger font-semibold">{errors.sport}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="edit-team-desc" className="text-xs font-semibold text-foreground-secondary">
                Description
              </label>
              <textarea
                id="edit-team-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSaving}
                rows={3}
                className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold disabled:opacity-50 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border-subtle">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="px-4 py-2 border border-border-default hover:bg-surface-2 text-foreground-secondary text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-5 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider disabled:opacity-50"
              >
                {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
