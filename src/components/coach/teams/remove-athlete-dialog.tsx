'use client';

// Ludis — Coach Remove Athlete Dialog Component
import React, { useEffect } from 'react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

interface RemoveAthleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  athleteName: string;
  onConfirm: () => void;
}

export function RemoveAthleteDialog({
  isOpen,
  onClose,
  athleteName,
  onConfirm,
}: RemoveAthleteDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm animate-in zoom-in-95 duration-200">
        <Card className="p-6 text-left border border-glass-border shadow-lg space-y-4">
          <CardTitle>Remove {athleteName}?</CardTitle>
          <CardDescription>
            They will no longer be part of the team roster. This action will not delete the athlete&apos;s account profile globally.
          </CardDescription>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border-default hover:bg-surface-2 text-foreground-secondary text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="bg-danger hover:bg-danger/95 text-white font-semibold text-xs py-2 px-5 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider"
            >
              Remove Athlete
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
