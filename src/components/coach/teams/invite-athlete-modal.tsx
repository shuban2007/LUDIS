'use client';

// Ludis — Coach Team Invite Athlete Modal Component
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

interface InviteAthleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (name: string, email: string) => void;
  activeEmails: string[];
  pendingEmails: string[];
}

export function InviteAthleteModal({
  isOpen,
  onClose,
  onSend,
  activeEmails,
  pendingEmails,
}: InviteAthleteModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Esc key closure
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      newErrors.name = 'Full Name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(cleanEmail)) {
      newErrors.email = 'Enter a valid email address.';
    } else if (activeEmails.includes(cleanEmail)) {
      newErrors.email = 'This athlete is already an active member of this team.';
    } else if (pendingEmails.includes(cleanEmail)) {
      newErrors.email = 'An invitation is already pending for this email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onSend(cleanName, cleanEmail);
      setIsProcessing(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm select-none"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        <Card className="p-6 text-left border border-glass-border shadow-lg">
          <CardTitle>Invite Athlete</CardTitle>
          <CardDescription>Invite an athlete to join this team.</CardDescription>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="invite-name" className="text-xs font-semibold text-foreground-secondary">
                Full Name
              </label>
              <input
                id="invite-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isProcessing}
                className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold disabled:opacity-50"
                placeholder="Enter athlete's name"
              />
              {errors.name && (
                <span className="text-[10px] text-danger font-semibold">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="invite-email" className="text-xs font-semibold text-foreground-secondary">
                Email Address
              </label>
              <input
                id="invite-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isProcessing}
                className="bg-surface-2 border border-border-default rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand font-semibold disabled:opacity-50"
                placeholder="athlete@example.com"
              />
              {errors.email && (
                <span className="text-[10px] text-danger font-semibold">{errors.email}</span>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border-subtle">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="px-4 py-2 border border-border-default hover:bg-surface-2 text-foreground-secondary text-xs font-bold tracking-wider rounded-lg transition-colors uppercase cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="bg-brand hover:bg-brand-hover text-brand-foreground font-semibold text-xs py-2 px-5 rounded-lg transition-colors cursor-pointer select-none shadow-sm uppercase tracking-wider disabled:opacity-50"
              >
                {isProcessing ? 'SENDING...' : 'SEND INVITATION'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
