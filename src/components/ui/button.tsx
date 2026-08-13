// Ludis UI — Button

import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantStyles = {
  primary:
    'bg-brand-primary text-text-inverse hover:bg-brand-primary-hover font-semibold',
  secondary:
    'bg-surface-elevated text-text-primary border border-border-default hover:bg-surface-hover',
  ghost:
    'bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary',
  danger:
    'bg-status-risk-bg text-status-risk border border-status-risk-border hover:bg-status-risk hover:text-white',
};

const sizeStyles = {
  sm: 'text-xs px-3 py-1.5 rounded-md',
  md: 'text-sm px-4 py-2 rounded-lg',
  lg: 'text-base px-6 py-2.5 rounded-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
