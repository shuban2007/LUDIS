// Ludis — Custom SVG Gothic L Monogram & Wordmark Logo

import type { SVGProps } from 'react';

interface LudisLogoProps {
  variant?: 'icon-only' | 'full' | 'compact' | 'hero';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Custom sharp geometric Gothic L SVG icon
 * Sharp cut-out blackletter athletic monogram
 */
export function GothicLIcon({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="gothic-l-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00c896" />
          <stop offset="100%" stopColor="#00e0a8" />
        </linearGradient>
        <linearGradient id="gothic-l-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9ba4b5" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Outer Sharp Geometric Frame / Cutout Shield */}
      <path
        d="M20 12 H72 L86 26 V74 L72 88 H20 L14 74 V26 Z"
        fill="#111520"
        stroke="#252c40"
        strokeWidth="3"
      />

      {/* Inner Metallic Accent Border */}
      <path
        d="M23 16 H69 L81 28 V72 L69 84 H23 L18 72 V28 Z"
        stroke="url(#gothic-l-grad)"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />

      {/* Custom Sharp Gothic L Mark */}
      {/* Vertical Spine with Angular Notches */}
      <path
        d="M32 24 H48 L48 64 H72 L66 76 H32 V24 Z"
        fill="url(#gothic-l-grad)"
      />
      {/* Gothic Sharp Serif Accent Cut */}
      <path
        d="M48 24 L58 34 H48 Z"
        fill="#00c896"
        opacity="0.8"
      />
      <path
        d="M32 24 L24 32 V40 L32 32 Z"
        fill="#00e0a8"
      />
      <path
        d="M72 64 L80 72 V76 H66 Z"
        fill="#3b82f6"
        opacity="0.9"
      />
    </svg>
  );
}

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-16 w-16',
};

export function LudisLogo({
  variant = 'full',
  size = 'md',
  className = '',
}: LudisLogoProps) {
  const iconSizeClass = sizeMap[size];

  if (variant === 'icon-only') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <GothicLIcon className={`${iconSizeClass} drop-shadow-[0_0_12px_rgba(0,200,150,0.35)]`} />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center shrink-0">
        <GothicLIcon className={`${iconSizeClass} drop-shadow-[0_0_14px_rgba(0,200,150,0.4)]`} />
      </div>
      {(variant === 'full' || variant === 'compact' || variant === 'hero') && (
        <div className="flex flex-col">
          <span className="font-extrabold tracking-wider text-text-primary uppercase text-lg sm:text-xl font-mono leading-none">
            LUDIS
          </span>
          <span className="text-[9px] font-semibold tracking-[0.22em] text-brand-primary uppercase mt-0.5">
            PERFORMANCE ENGINE
          </span>
        </div>
      )}
    </div>
  );
}
