// Ludis — Mobile bottom navigation
// Touch-friendly tab bar for athlete mobile experience.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isNavItemActive, type NavItem } from '@/lib/navigation';

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();
  // Show max 5 items in mobile nav
  const visibleItems = items.slice(0, 5);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-glass-bg border-t border-border-subtle safe-bottom backdrop-blur-lg"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around h-14">
        {visibleItems.map((item) => {
          const isActive = isNavItemActive(pathname, item);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`nav-item flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md ${
                  isActive ? 'text-brand' : 'text-foreground-muted hover:text-foreground-secondary'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >

                <span className="[&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
