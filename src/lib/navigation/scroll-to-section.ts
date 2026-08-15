/**
 * Central Scroll Utility & Navigation Targets Map
 * Implements Top-Visual Anchoring for baseline and Center-Visual Centering for panels.
 */

export const LANDING_NAV_TARGETS = {
  howItWorks: 'baseline',
} as const;

export type LandingNavTargetKey = keyof typeof LANDING_NAV_TARGETS;

export interface ScrollOptions {
  spacing?: number;
  offset?: number;
}

/**
 * Smoothly scrolls the window to center the provided visual panel.
 *
 * @param panel The visual panel container element.
 */
export function scrollPanelToViewportCenter(panel: HTMLElement): void {
  const rect = panel.getBoundingClientRect();

  const panelCenterY = rect.top + rect.height / 2;
  const viewportCenterY = window.innerHeight / 2;

  const delta = panelCenterY - viewportCenterY;

  let targetScrollTop = window.scrollY + delta;
  targetScrollTop = Math.max(0, targetScrollTop);

  // Retrieve current navbar height dynamically
  const cssVar = getComputedStyle(document.documentElement).getPropertyValue('--landing-nav-height');
  const parsedNavHeight = Number.parseFloat(cssVar);
  const navHeight = Number.isFinite(parsedNavHeight) ? parsedNavHeight : 64;

  // Project panel's top coordinate post-scroll
  const projectedPanelTop = rect.top - delta;
  const minimumVisibleTop = navHeight + 16;

  // Apply minimal correction only if navbar overlap occurs
  if (projectedPanelTop < minimumVisibleTop) {
    const correction = minimumVisibleTop - projectedPanelTop;
    targetScrollTop -= correction;
  }

  targetScrollTop = Math.max(0, targetScrollTop);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.scrollTo({
    top: targetScrollTop,
    behavior: reducedMotion ? 'auto' : 'smooth',
  });
}

/**
 * Smoothly scrolls the window to the target element or its content anchor.
 * Used for top-visual layout aligned sections like Baseline.
 *
 * @param sectionId The target section key or anchor ID.
 * @param options Custom offsets or breathing room configurations.
 */
export function scrollToSection(sectionId: string, options?: ScrollOptions) {
  if (typeof window === 'undefined') return;

  // Try resolving visual content anchor first
  let anchor = document.querySelector(`[data-scroll-anchor="${sectionId}"]`);

  // Fallback to standard DOM ID container
  if (!anchor) {
    anchor = document.getElementById(sectionId);
  }

  if (!anchor) return;

  const rect = anchor.getBoundingClientRect();
  const elementTop = window.scrollY + rect.top;

  let offset = options?.offset;
  if (offset === undefined) {
    const cssVar = getComputedStyle(document.documentElement).getPropertyValue('--landing-nav-height');
    const parsed = parseFloat(cssVar);
    offset = !isNaN(parsed) ? parsed : 64;
  }

  let spacing = options?.spacing;
  if (spacing === undefined) {
    if (sectionId === 'baseline') {
      spacing = 32;
    } else {
      spacing = 32; // Default
    }
  }

  const targetTop = elementTop - offset - spacing;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth',
  });
}
