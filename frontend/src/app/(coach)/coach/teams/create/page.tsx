'use client';

// Ludis — Coach Create Team Page
// Form handling and state dispatch to create a new coaching group.
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demo/demo-context';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function CreateTeamPage() {
  const { teams, createTeam } = useDemo();
  const router = useRouter();

  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const cleanName = name.trim();
    const cleanSport = sport.trim();

    if (!cleanName) {
      newErrors.name = 'Team Name is required.';
    } else if (
      teams.some((t) => t.name.toLowerCase() === cleanName.toLowerCase() && t.status === 'active')
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
    setFeedbackMessage('');

    setTimeout(() => {
      const newTeam = createTeam(cleanName, cleanSport, description.trim() || undefined);
      setFeedbackMessage('Team created successfully!');
      
      setTimeout(() => {
        router.push(`/coach/teams/${newTeam.id}`);
      }, 500);
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 select-none text-left">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Create Team"
          subtitle="Set up a new coaching group"
          section="Teams"
        />
        <Link
          href="/coach/teams"
          className="inline-flex items-center justify-center text-xs font-semibold px-3 py-1.5 border border-border-default rounded-lg hover:bg-surface-2 transition-colors uppercase cursor-pointer text-foreground"
        >
          &lt; Cancel
        </Link>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {feedbackMessage && (
            <div className="text-xs font-bold text-success animate-pulse mb-2">
              ✓ {feedbackMessage}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="create-team-name" className="text-xs font-semibold text-foreground-secondary">
              Team Name
            </label>
            <input
              id="create-team-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSaving}
              placeholder="e.g. Distance Runners Elite"
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold disabled:opacity-50"
            />
            {errors.name && (
              <span className="text-[10px] text-danger font-semibold">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="create-team-sport" className="text-xs font-semibold text-foreground-secondary">
              Sport
            </label>
            <input
              id="create-team-sport"
              type="text"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              disabled={isSaving}
              placeholder="e.g. Running"
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold disabled:opacity-50"
            />
            {errors.sport && (
              <span className="text-[10px] text-danger font-semibold">{errors.sport}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="create-team-desc" className="text-xs font-semibold text-foreground-secondary">
              Description (Optional)
            </label>
            <textarea
              id="create-team-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSaving}
              rows={3}
              placeholder="Brief summary of coaching goals..."
              className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold disabled:opacity-50 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-border-subtle">
            <Link
              href="/coach/teams"
              className="px-4 py-2 border border-border-default hover:bg-surface-2 text-foreground-secondary text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-5 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider disabled:opacity-50"
            >
              {isSaving ? 'CREATING...' : 'CREATE TEAM'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
