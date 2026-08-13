// Ludis — Onboarding Page (Foundation)
// Collects: role, sport, basic info, competition context.
// Does NOT ask for every health metric — only decision-relevant information.

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { Sport, ExperienceLevel, CompetitionLevel } from '@/lib/types';

type Step = 'sport' | 'profile' | 'competition' | 'complete';

const sports: { value: Sport; label: string }[] = [
  { value: 'running', label: '🏃 Running' },
  { value: 'cycling', label: '🚴 Cycling' },
  { value: 'swimming', label: '🏊 Swimming' },
  { value: 'basketball', label: '🏀 Basketball' },
  { value: 'soccer', label: '⚽ Soccer' },
  { value: 'tennis', label: '🎾 Tennis' },
  { value: 'weightlifting', label: '🏋️ Weightlifting' },
  { value: 'triathlon', label: '🏊‍♂️ Triathlon' },
  { value: 'rowing', label: '🚣 Rowing' },
  { value: 'track_field', label: '🏟️ Track & Field' },
  { value: 'other', label: '🏅 Other' },
];

const levels: { value: ExperienceLevel; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'elite', label: 'Elite' },
];

const competitionLevels: { value: CompetitionLevel; label: string }[] = [
  { value: 'recreational', label: 'Recreational' },
  { value: 'club', label: 'Club' },
  { value: 'collegiate', label: 'Collegiate' },
  { value: 'national', label: 'National' },
  { value: 'international', label: 'International' },
];

import { LudisLogo } from '@/components/ui/ludis-logo';

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('sport');
  const [sport, setSport] = useState<Sport | ''>('');
  const [experience, setExperience] = useState<ExperienceLevel | ''>('');
  const [competitionLevel, setCompetitionLevel] = useState<CompetitionLevel | ''>('');
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-ground px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <LudisLogo linkToHome variant="hero" size="lg" />
        </div>

        {/* Progress indicator */}
        <div className="flex gap-2 mb-6">
          {['sport', 'profile', 'competition', 'complete'].map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${
                ['sport', 'profile', 'competition', 'complete'].indexOf(step) >= i
                  ? 'bg-brand-primary'
                  : 'bg-border-default'
              }`}
            />
          ))}
        </div>

        <div className="ludis-card">
          {step === 'sport' && (
            <>
              <h1 className="text-lg font-bold text-text-primary mb-1">What sport do you play?</h1>
              <p className="text-sm text-text-secondary mb-4">This helps us build your personal baseline.</p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {sports.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSport(s.value)}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium text-left transition-colors ${
                      sport === s.value
                        ? 'border-brand-primary bg-brand-primary-muted text-brand-primary'
                        : 'border-border-default bg-surface-overlay text-text-secondary hover:bg-surface-hover'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep('profile')} disabled={!sport} className="w-full">
                Continue
              </Button>
            </>
          )}

          {step === 'profile' && (
            <>
              <h1 className="text-lg font-bold text-text-primary mb-1">Your experience level</h1>
              <p className="text-sm text-text-secondary mb-4">This calibrates your baseline expectations.</p>
              <div className="space-y-2 mb-6">
                {levels.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setExperience(l.value)}
                    className={`w-full rounded-lg border px-4 py-3 text-sm font-medium text-left transition-colors ${
                      experience === l.value
                        ? 'border-brand-primary bg-brand-primary-muted text-brand-primary'
                        : 'border-border-default bg-surface-overlay text-text-secondary hover:bg-surface-hover'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setStep('sport')} className="flex-1">Back</Button>
                <Button onClick={() => setStep('competition')} disabled={!experience} className="flex-1">Continue</Button>
              </div>
            </>
          )}

          {step === 'competition' && (
            <>
              <h1 className="text-lg font-bold text-text-primary mb-1">Competition context</h1>
              <p className="text-sm text-text-secondary mb-4">Helps contextualize your readiness and recovery recommendations.</p>
              <div className="space-y-2 mb-6">
                {competitionLevels.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCompetitionLevel(c.value)}
                    className={`w-full rounded-lg border px-4 py-3 text-sm font-medium text-left transition-colors ${
                      competitionLevel === c.value
                        ? 'border-brand-primary bg-brand-primary-muted text-brand-primary'
                        : 'border-border-default bg-surface-overlay text-text-secondary hover:bg-surface-hover'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setStep('profile')} className="flex-1">Back</Button>
                <Button onClick={() => setStep('complete')} disabled={!competitionLevel} className="flex-1">Complete</Button>
              </div>
            </>
          )}

          {step === 'complete' && (
            <div className="text-center py-4">
              <div className="h-16 w-16 rounded-full bg-status-positive-bg flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-status-positive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-lg font-bold text-text-primary mb-1">{"You're all set!"}</h1>
              <p className="text-sm text-text-secondary mb-6">
                Ludis will begin building your personal baseline as you log training data.
                Insights will become more accurate over time.
              </p>
              <Button onClick={() => router.push('/athlete')} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
