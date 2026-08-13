// Ludis — Official Brand Mark Component
// Uses the official LudisLogo1.png asset exclusively.
// Preserves exact original logo shape, silhouette, and geometry.

import Image from 'next/image';
import Link from 'next/link';

export interface LudisLogoProps {
  variant?: 'navbar' | 'footer' | 'hero' | 'icon-only' | 'compact' | 'marketing';
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  linkToHome?: boolean;
  /** Controls logo color presentation style: 'white-badge' (dark logo on clean light badge) or 'inverted' (white silhouette on dark) */
  themeStyle?: 'white-badge' | 'inverted';
}

const sizeConfig = {
  sm: { badge: 'h-8 w-8 rounded-lg p-1', logo: 24, text: 'text-base', subtext: 'text-[8px]' },
  md: { badge: 'h-10 w-10 rounded-xl p-1.5', logo: 32, text: 'text-lg', subtext: 'text-[9px]' },
  lg: { badge: 'h-14 w-14 rounded-2xl p-2', logo: 48, text: 'text-2xl', subtext: 'text-[10px]' },
  xl: { badge: 'h-24 w-24 rounded-3xl p-3', logo: 80, text: 'text-4xl', subtext: 'text-xs' },
};

export function LudisLogo({
  variant = 'navbar',
  showWordmark = true,
  size = 'md',
  className = '',
  linkToHome = false,
  themeStyle = 'white-badge',
}: LudisLogoProps) {
  const currentSize = variant === 'hero' ? 'xl' : variant === 'footer' ? 'sm' : size;
  const config = sizeConfig[currentSize];

  // Render original LudisLogo1.png with proper contrast & blending
  // 'white-badge' uses mix-blend-mode multiply inside a clean white/slate glass badge for maximum crispness
  // 'inverted' uses brightness-0 invert to render a sharp white silhouette on dark background
  const logoImage = (
    <Image
      src="/LudisLogo1.png"
      alt="Ludis"
      width={config.logo}
      height={config.logo}
      priority={variant === 'navbar' || variant === 'hero'}
      className="object-contain w-full h-full"
      style={{
        objectFit: 'contain',
        mixBlendMode: themeStyle === 'white-badge' ? 'multiply' : 'screen',
        filter: themeStyle === 'inverted' ? 'brightness(0) invert(1)' : 'none',
      }}
    />
  );

  const isIconOnly = variant === 'icon-only' || showWordmark === false;

  const logoBadge = themeStyle === 'white-badge' ? (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${config.badge} bg-gradient-to-br from-white via-slate-100 to-slate-200 border border-brand-primary/40 shadow-[0_0_15px_rgba(0,200,150,0.25)] group-hover:shadow-[0_0_20px_rgba(0,200,150,0.4)] group-hover:scale-[1.02] transition-all duration-200 overflow-hidden`}
    >
      {logoImage}
    </div>
  ) : (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${config.badge} bg-surface-overlay/80 border border-border-luminous/40 shadow-md group-hover:border-brand-primary/60 group-hover:scale-[1.02] transition-all duration-200`}
    >
      {logoImage}
    </div>
  );

  const logoContent = (
    <div className={`inline-flex items-center gap-3 group transition-all duration-150 ${className}`}>
      {logoBadge}

      {!isIconOnly && (
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-wider text-text-primary uppercase font-sans ${config.text}`}>
            LUDIS
          </span>
          <span className={`font-mono font-bold tracking-[0.22em] text-brand-primary uppercase mt-0.5 ${config.subtext}`}>
            PERFORMANCE ENGINE
          </span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        href="/"
        className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-xl"
        aria-label="Ludis Home"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
