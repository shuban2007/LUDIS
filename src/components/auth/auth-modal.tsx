// Ludis — Premium Centered Sign-In & Sign-Up Modal
// Integrates Framer Motion, accessibility focus trapping, scroll locking,
// and conditional temporary demo login capabilities.
// Refactored to dynamically adjust by theme using centralized system variables.

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, useAuthModal, DEMO_AUTH_ENABLED } from '@/lib/auth';
import { DemoLogin } from './demo-login';
import { Button } from '@/components/ui/button';
import type { UserRole } from '@/lib/types';
import { useTheme } from '@/lib/theme/theme-provider';

// ─────────────────────────────────────────────
// Reusable SVG Icons (No third-party dependency)
// ─────────────────────────────────────────────

function EnvelopeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function EyeSlashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
      />
    </svg>
  );
}

function XMarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#EA4335"
        d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.9 3C17.782 1.145 15.055 0 12 0 7.336 0 3.336 2.69 1.355 6.609l3.91 3.156z"
      />
      <path
        fill="#4285F4"
        d="M23.491 12.273c0-.818-.073-1.609-.209-2.373H12v4.509h6.445a5.518 5.518 0 01-2.391 3.627l3.736 2.9c2.182-2.009 3.445-4.964 3.445-8.663z"
      />
      <path
        fill="#FBBC05"
        d="M5.266 14.235a7.054 7.054 0 01-.382-2.235c0-.782.136-1.536.382-2.235l-3.91-3.156A11.964 11.964 0 000 12c0 1.92.455 3.736 1.255 5.355l4.01-3.12z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.245 0 5.973-1.082 7.964-2.927l-3.736-2.9c-1.036.691-2.364 1.109-4.227 1.109-3.264 0-6.027-2.209-7.018-5.182l-4.01 3.12C3.336 21.31 7.336 24 12 24z"
      />
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.98 1.12.09 2.27-.56 2.98-1.42z" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Content Card Component (Unmounted when closed)
// ─────────────────────────────────────────────

function AuthModalCard() {
  const { view, closeModal, switchView } = useAuthModal();
  const { login, signup, isLoading } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const isSignIn = view === 'signin';

  // Local Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<UserRole>('athlete');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Field validation error states
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Live password validation checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  // Auto-focus first input field on mount
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Keyboard focus trap inside the card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (!cardRef.current) return;
        const focusable = cardRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Reset errors
  const clearValidationErrors = () => {
    setError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setTermsError(null);
  };

  // Submit Handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setTermsError(null);

    let hasError = false;

    if (view === 'signup') {
      if (!firstName.trim()) {
        setFirstNameError('First name is required.');
        hasError = true;
      }
      if (!lastName.trim()) {
        setLastNameError('Last name is required.');
        hasError = true;
      }
      if (!termsAccepted) {
        setTermsError('You must agree to the Terms of Service.');
        hasError = true;
      }
    }

    if (!email) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Enter a valid email address.');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    } else if (view === 'signup') {
      if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecialChar) {
        setPasswordError('Password does not meet the requirements.');
        hasError = true;
      }
    }

    if (hasError) return;

    setSubmitting(true);

    try {
      if (email.toLowerCase() === 'error@ludis.app') {
        await new Promise((r) => setTimeout(r, 600));
        setError('Invalid email or password.');
        setSubmitting(false);
        return;
      }

      if (view === 'signin') {
        await login(email, password);
        closeModal();
        if (email.toLowerCase().includes('coach')) {
          router.push('/coach');
        } else {
          router.push('/athlete');
        }
      } else {
        await signup(email, password, role);
        closeModal();
        router.push('/onboarding');
      }
    } catch (err) {
      console.error(err);
      setError('An authentication error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const isBusy = isLoading || submitting;

  return (
    <motion.div
      ref={cardRef}
      layout
      transition={{
        layout: { type: 'spring', stiffness: 350, damping: 32 },
        duration: 0.25,
      }}
      className={`relative z-10 w-full max-w-[calc(100vw-24px)] transition-all duration-300 ${
        isSignIn
          ? 'sm:max-w-[580px] p-5 sm:p-8'
          : 'sm:max-w-[680px] p-5 sm:p-12'
      } bg-glass-bg border border-border-default rounded-[20px] shadow-elevated backdrop-blur-[20px] overflow-hidden max-h-[calc(100vh-32px)] flex flex-col`}
    >
      {/* Subtle Specular Top Arc Light Glow */}
      <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-brand/15 to-transparent pointer-events-none" />
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-16 bg-brand/6 blur-xl rounded-full pointer-events-none" />

      {/* Close Button - Fixed relative to card, outside scroll container */}
      <button
        onClick={closeModal}
        className="absolute top-[18px] right-[18px] z-10 w-9 h-9 flex items-center justify-center rounded-full bg-glass-bg border border-glass-border text-foreground-secondary hover:bg-surface-3 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-brand transition-all duration-150 cursor-pointer"
        aria-label="Close authentication modal"
      >
        <XMarkIcon className="h-[18px] w-[18px]" />
      </button>

      {/* Inner Container: Scrollable ONLY on small screens */}
      <div className="overflow-y-auto custom-scrollbar flex-1 pr-1.5 -mr-1.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {/* Brand Header: LUDIS Wordmark and Gothic Silhouette Badge */}
            <div className="flex items-center gap-3">
              <Image
                src="/LudisLogo1.png"
                alt="Ludis Logo"
                width={56}
                height={56}
                priority
                className="object-contain h-11 w-11 sm:h-[56px] sm:w-[56px] logo-img-inverted"
                style={{
                  mixBlendMode: theme === 'light' ? 'multiply' : 'screen',
                  filter: theme === 'light' ? 'none' : 'invert(1)',
                }}
              />
              <div className="h-6 sm:h-8 border-r border-border-subtle" />
              <span className="text-xl sm:text-2xl font-semibold tracking-[0.1em] text-foreground uppercase font-sans">
                LUDIS
              </span>
            </div>

            {/* Main Header & Subheading */}
            <div className="text-left mt-[28px]">
              <h1 className="text-[34px] sm:text-[56px] font-serif font-light text-foreground leading-[1.1] tracking-tight">
                {isSignIn ? (
                  <>
                    Welcome <span className="text-brand font-normal">Back</span>
                    <span className="text-brand">.</span>
                  </>
                ) : (
                  <>
                    Create your <br />
                    <span className="text-brand font-normal">Ludis</span> account
                    <span className="text-brand">.</span>
                  </>
                )}
              </h1>
              <p className="mt-[12px] text-[14px] sm:text-[18px] text-foreground-secondary leading-relaxed max-w-[520px]">
                {isSignIn
                  ? 'Sign in to continue your performance journey.'
                  : 'Join athletes and coaches using data to train smarter and perform better.'}
              </p>
            </div>

            {/* Inline Global Error */}
            {error && (
              <div className="mt-4 rounded-lg bg-danger/10 border border-danger/30 p-3 text-xs text-danger text-center font-medium">
                {error}
              </div>
            )}

            {/* Form fields */}
            <form onSubmit={handleSubmit} noValidate className="mt-[32px]">
              {/* Role Segment Selector (Sign Up Only) */}
              {!isSignIn && (
                <div className="mb-[20px]">
                  <label className="block text-[11px] font-extrabold tracking-widest text-foreground-secondary uppercase mb-[8px]">
                    I AM A
                  </label>
                  <div
                    role="radiogroup"
                    aria-label="Select account role"
                    className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-surface-2 border border-border-default"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={role === 'athlete'}
                      onClick={() => setRole('athlete')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand ${
                        role === 'athlete'
                          ? 'bg-brand-soft border border-brand/40 text-brand'
                          : 'bg-transparent border border-transparent text-foreground-secondary hover:text-foreground'
                      }`}
                    >
                      ATHLETE
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={role === 'coach'}
                      onClick={() => setRole('coach')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand ${
                        role === 'coach'
                          ? 'bg-brand-soft border border-brand/40 text-brand'
                          : 'bg-transparent border border-transparent text-foreground-secondary hover:text-foreground'
                      }`}
                    >
                      COACH
                    </button>
                  </div>
                </div>
              )}

              {/* First Name & Last Name (Sign Up Only) */}
              {!isSignIn && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[20px]">
                  {/* First Name */}
                  <div>
                    <label htmlFor="modal-firstname" className="block text-[11px] font-bold tracking-wider text-foreground-secondary uppercase mb-[8px]">
                      FIRST NAME
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-foreground-muted" />
                      </div>
                      <input
                        ref={firstInputRef}
                        id="modal-firstname"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        className="w-full h-[52px] sm:h-[54px] pl-12 pr-4 bg-surface-2 border border-border-default rounded-[10px] text-sm text-foreground placeholder:text-foreground-muted transition-all duration-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/18"
                      />
                    </div>
                    {firstNameError && (
                      <p className="mt-1.5 text-xs text-danger font-medium text-left">
                        {firstNameError}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="modal-lastname" className="block text-[11px] font-bold tracking-wider text-foreground-secondary uppercase mb-[8px]">
                      LAST NAME
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-foreground-muted" />
                      </div>
                      <input
                        id="modal-lastname"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="w-full h-[52px] sm:h-[54px] pl-12 pr-4 bg-surface-2 border border-border-default rounded-[10px] text-sm text-foreground placeholder:text-foreground-muted transition-all duration-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/18"
                      />
                    </div>
                    {lastNameError && (
                      <p className="mt-1.5 text-xs text-danger font-medium text-left">
                        {lastNameError}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="modal-email" className="block text-[11px] font-bold tracking-wider text-foreground-secondary uppercase mb-[8px]">
                  EMAIL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-foreground-muted" />
                  </div>
                  <input
                    ref={isSignIn ? firstInputRef : undefined}
                    id="modal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-[52px] sm:h-[54px] pl-12 pr-4 bg-surface-2 border border-border-default rounded-[10px] text-sm text-foreground placeholder:text-foreground-muted transition-all duration-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/18"
                  />
                </div>
                {emailError && (
                  <p className="mt-1.5 text-xs text-danger font-medium text-left">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="mt-[20px]">
                <label htmlFor="modal-password" className="block text-[11px] font-bold tracking-wider text-foreground-secondary uppercase mb-[8px]">
                  PASSWORD
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-foreground-muted" />
                  </div>
                  <input
                    id="modal-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignIn ? 'Enter your password' : 'Create a password'}
                    className="w-full h-[52px] sm:h-[54px] pl-12 pr-12 bg-surface-2 border border-border-default rounded-[10px] text-sm text-foreground placeholder:text-foreground-muted transition-all duration-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/18"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-transparent hover:bg-surface-3 text-foreground-secondary hover:text-foreground focus:outline-none cursor-pointer transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {passwordError && (
                  <p className="mt-1.5 text-xs text-danger font-medium text-left">
                    {passwordError}
                  </p>
                )}

                {/* Password Live Validation Checkmarks (Sign Up Only) */}
                {!isSignIn && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] mt-2">
                    <span
                      className={`flex items-center gap-1.5 transition-colors ${
                        hasMinLength ? 'text-foreground' : 'text-foreground-muted'
                      }`}
                    >
                      <span className={hasMinLength ? 'text-brand' : 'text-foreground-muted'}>•</span> 8+ characters
                    </span>
                    <span
                      className={`flex items-center gap-1.5 transition-colors ${
                        hasUppercase ? 'text-foreground' : 'text-foreground-muted'
                      }`}
                    >
                      <span className={hasUppercase ? 'text-brand' : 'text-foreground-muted'}>•</span> 1 uppercase
                    </span>
                    <span
                      className={`flex items-center gap-1.5 transition-colors ${
                        hasNumber ? 'text-foreground' : 'text-foreground-muted'
                      }`}
                    >
                      <span className={hasNumber ? 'text-brand' : 'text-foreground-muted'}>•</span> 1 number
                    </span>
                    <span
                      className={`flex items-center gap-1.5 transition-colors ${
                        hasSpecialChar ? 'text-foreground' : 'text-foreground-muted'
                      }`}
                    >
                      <span className={hasSpecialChar ? 'text-brand' : 'text-foreground-muted'}>•</span> 1 special character
                    </span>
                  </div>
                )}
              </div>

              {/* Options (Remember Me / Forgot Password - Sign In Only) */}
              {isSignIn && (
                <div className="mt-[16px] flex flex-wrap gap-y-2 items-center justify-between text-[12px] sm:text-[13px] text-foreground-secondary">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors">
                    <input
                      type="checkbox"
                      className="h-4.5 w-4.5 rounded border-border-default bg-surface-2 text-brand focus:ring-0 focus:ring-offset-0 focus:outline-none accent-brand"
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-brand font-medium transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Terms Checkbox (Sign Up Only) */}
              {!isSignIn && (
                <div className="mt-[16px]">
                  <label className="flex items-start gap-2.5 cursor-pointer text-[13px] text-foreground-secondary hover:text-foreground transition-colors">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-border-default bg-surface-2 text-brand focus:ring-0 focus:ring-offset-0 focus:outline-none accent-brand mt-0.5"
                    />
                    <span className="leading-tight">
                      I agree to the{' '}
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-brand hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-brand hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {termsError && (
                    <p className="mt-1.5 text-xs text-danger font-medium text-left">
                      {termsError}
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-[24px]">
                <Button
                  type="submit"
                  disabled={isBusy}
                  className="w-full h-[52px] sm:h-[54px] text-sm font-bold tracking-widest uppercase transition-all duration-200 select-none hover:-translate-y-[1px] active:translate-y-[1px] bg-brand text-brand-foreground hover:bg-brand-hover rounded-[10px] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isBusy ? (
                    isSignIn ? 'SIGNING IN...' : 'CREATING ACCOUNT...'
                  ) : (
                    <>
                      {isSignIn ? 'SIGN IN' : 'SIGN UP'} <span className="ml-1">→</span>
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Divider (Sign Up Only) */}
            {!isSignIn && (
              <div>
                <div className="relative flex items-center justify-center my-[24px]">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-border-subtle" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-surface-1 px-3 text-[10px] font-extrabold tracking-widest text-foreground-muted">
                      OR
                    </span>
                  </div>
                </div>

                {/* Social Sign-up Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled
                    className="h-[46px] sm:h-[48px] w-full flex items-center justify-center gap-2 rounded-[10px] bg-surface-2 border border-border-default text-foreground-secondary opacity-40 cursor-not-allowed text-[13px] sm:text-[14px] font-medium"
                    aria-label="Google sign up unavailable"
                  >
                    <GoogleIcon className="h-4 w-4" /> Sign up with Google
                  </button>
                  <button
                    type="button"
                    disabled
                    className="h-[46px] sm:h-[48px] w-full flex items-center justify-center gap-2 rounded-[10px] bg-surface-2 border border-border-default text-foreground-secondary opacity-40 cursor-not-allowed text-[13px] sm:text-[14px] font-medium"
                    aria-label="Apple sign up unavailable"
                  >
                    <AppleIcon className="h-4 w-4" /> Sign up with Apple
                  </button>
                </div>
              </div>
            )}

            {/* Temporary Demo Section (Sign In Only) */}
            {isSignIn && DEMO_AUTH_ENABLED && <DemoLogin />}

            {/* Toggle Bottom Link */}
            <div className="text-center text-xs text-foreground-muted mt-[22px]">
              {isSignIn ? (
                <>
                  {"Don't have an account? "}
                  <button
                    onClick={() => {
                      clearValidationErrors();
                      switchView('signup');
                    }}
                    className="text-brand hover:text-brand-hover font-semibold hover:underline transition-colors cursor-pointer"
                  >
                    Create one →
                  </button>
                </>
              ) : (
                <>
                  {"Already have an account? "}
                  <button
                    onClick={() => {
                      clearValidationErrors();
                      switchView('signin');
                    }}
                    className="text-brand hover:text-brand-hover font-semibold hover:underline transition-colors cursor-pointer"
                  >
                    Sign in →
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Global Shell Component
// ─────────────────────────────────────────────

export function AuthModal() {
  const { isOpen, closeModal } = useAuthModal();

  // Scroll Lock & ESC Key Listener
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6 md:p-10 select-none">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[var(--backdrop-bg)] backdrop-blur-[10px]"
            aria-hidden="true"
          />

          <AuthModalCard />
        </div>
      )}
    </AnimatePresence>
  );
}
