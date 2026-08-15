'use client';

// Ludis — Coach Archive Team Dialog Component
import React, { useEffect } from 'react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

interface ArchiveTeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  onConfirm: () => void;
}

export function ArchiveTeamDialog({
  isOpen,
  onClose,
  teamName,
  onConfirm,
}: ArchiveTeamDialogProps) {
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
          <CardTitle>Archive {teamName}?</CardTitle>
          <CardDescription>
            This will hide the team from the active Teams Management list. You can restore it later if needed.
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
              className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-5 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider"
            >
              Archive Team
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
