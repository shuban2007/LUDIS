// Ludis Landing — Data To Insight Section
// Orchestrated data-to-decision animation sequence.
// Narrative: Raw signals enter → Ludis interprets → insight appears → action resolves.
//
// Timeline (~2.2s total):
//   0–600ms   Raw telemetry cards stagger in, values reveal
//   600–1100ms Signal dots travel toward engine
//   1000–1400ms Engine briefly responds (ring pulse, glow)
//   1300–1900ms Insight panel reveals progressively
//   1700–2200ms Recommendation resolves, accent flashes once

'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './scroll-reveal';

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Signal card data
const signals = [
  { emoji: '🫀', title: 'Heart Rate Variability (HRV)', sub: 'Morning RMSSD', value: '64 ms' },
  { emoji: '💤', title: 'Sleep Architecture', sub: 'Total & Restorative', value: '7h 12m' },
  { emoji: '⚡', title: 'Training Workload', sub: 'Acute Session Load', value: '380 AU' },
];

// Transition helper
function tr(delay: number, duration = 0.45, instant = false) {
  return instant ? { duration: 0 } : { duration, delay, ease };
}

export function DataInsightSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.2 });
  const shouldReduce = useReducedMotion();

  const instant = !!shouldReduce;
  const active = instant || isInView;

  return (
    <section
      id="data-insight"
      className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle relative"
    >
      <div className="glow-orb-blue w-96 h-96 top-20 right-0" />

      {/* ── Section Heading (own scroll trigger) ── */}
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-14" duration={0.5}>
        <span className="ludis-section-title">TELEMETRY TRANSLATION</span>
        <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase mt-2">
          RAW DATA ISN&apos;T <span className="text-brand-cyan">INSIGHT.</span>
        </h2>
        <p className="text-base text-text-secondary mt-4 leading-relaxed">
          Isolated metrics like HRV or steps on a generic dashboard don&apos;t make
          decisions. The value comes from understanding what changed, why it
          changed, and what to do next.
        </p>
      </ScrollReveal>

      {/* ── Orchestrated Grid (single viewport trigger) ── */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
      >
        {/* ────────────────────────────────────────────
            LEFT: Raw Telemetry Signals  (0–600ms)
            ──────────────────────────────────────────── */}
        <div className="lg:col-span-5 space-y-3">
          <motion.span
            className="text-xs font-mono text-text-muted uppercase tracking-widest font-bold block mb-2"
            initial={instant ? undefined : { opacity: 0 }}
            animate={active ? { opacity: 1 } : undefined}
            transition={tr(0, 0.3, instant)}
          >
            STEP 1: RAW TELEMETRY SIGNALS
          </motion.span>

          {signals.map((s, i) => (
            <motion.div
              key={s.title}
              className="glass-subtle rounded-2xl p-4 border-border-subtle flex items-center justify-between relative overflow-hidden"
              initial={instant ? undefined : { opacity: 0, y: 16 }}
              animate={active ? { opacity: 1, y: 0 } : undefined}
              transition={tr(0.06 + i * 0.1, 0.45, instant)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.emoji}</span>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">
                    {s.title}
                  </h4>
                  <p className="text-xs text-text-muted">{s.sub}</p>
                </div>
              </div>

              {/* Value — reveals slightly after the card */}
              <motion.span
                className="text-lg font-mono font-bold text-text-primary"
                initial={instant ? undefined : { opacity: 0, scale: 0.97 }}
                animate={active ? { opacity: 1, scale: 1 } : undefined}
                transition={tr(0.22 + i * 0.1, 0.3, instant)}
              >
                {s.value}
              </motion.span>

              {/* Micro signal indicator — thin accent line at card bottom */}
              {!instant && (
                <motion.div
                  className="absolute bottom-0 left-0 h-[1.5px] w-full bg-brand-primary/35"
                  style={{ transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  animate={active ? { scaleX: 1 } : undefined}
                  transition={tr(0.32 + i * 0.1, 0.4)}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* ────────────────────────────────────────────
            CENTER: Ludis Engine + Signal Flow  (600–1400ms)
            ──────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 relative">
          {/* Signal flow dots — Desktop (horizontal travel) */}
          {!instant && (
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`sig-d-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-brand-primary"
                  style={{
                    left: '50%',
                    top: `${28 + i * 22}%`,
                    marginLeft: -3,
                    boxShadow: '0 0 6px rgba(0,200,150,0.5)',
                  }}
                  initial={{ opacity: 0, x: -28 }}
                  animate={
                    active
                      ? { opacity: [0, 0.85, 0], x: [-28, 0, 0] }
                      : undefined
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.62 + i * 0.12,
                    ease: ease,
                  }}
                />
              ))}
            </div>
          )}

          {/* Signal flow dots — Mobile (vertical travel) */}
          {!instant && (
            <div className="flex lg:hidden justify-center gap-3 mb-2 pointer-events-none">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`sig-m-${i}`}
                  className="w-1 h-1 rounded-full bg-brand-primary"
                  style={{ boxShadow: '0 0 4px rgba(0,200,150,0.5)' }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={
                    active
                      ? { opacity: [0, 0.7, 0], y: [-8, 0, 4] }
                      : undefined
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.62 + i * 0.08,
                    ease: ease,
                  }}
                />
              ))}
            </div>
          )}

          {/* Engine container */}
          <div className="relative">
            {/* Ambient glow (expands when signals arrive, then settles) */}
            {!instant && (
              <motion.div
                className="absolute -inset-4 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(0,200,150,0.15) 0%, transparent 70%)',
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                  active
                    ? {
                        scale: [0.8, 1.2, 1],
                        opacity: [0, 0.55, 0.2],
                      }
                    : undefined
                }
                transition={{
                  duration: 0.45,
                  delay: 0.95,
                  ease: ease,
                }}
              />
            )}

            {/* Engine circle */}
            <motion.div
              className="relative h-12 w-12 rounded-full glass-hero flex items-center justify-center border-border-luminous shadow-lg"
              initial={instant ? undefined : { opacity: 0, scale: 0.9 }}
              animate={active ? { opacity: 1, scale: 1 } : undefined}
              transition={tr(0.5, 0.4, instant)}
            >
              {/* Ring pulse (fires once when signals arrive) */}
              {!instant && (
                <motion.div
                  className="absolute -inset-1.5 rounded-full border border-brand-primary/30 pointer-events-none"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={
                    active
                      ? {
                          scale: [1, 1.14, 1],
                          opacity: [0, 0.5, 0],
                        }
                      : undefined
                  }
                  transition={{
                    duration: 0.4,
                    delay: 1.0,
                    ease: ease,
                  }}
                />
              )}

              {/* Arrow icon — subtle shift when activated */}
              <motion.svg
                className="h-5 w-5 text-brand-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={instant ? undefined : { x: 0 }}
                animate={
                  active && !instant ? { x: [0, 3, 0] } : undefined
                }
                transition={{
                  duration: 0.35,
                  delay: 1.05,
                  ease: [...ease],
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </motion.div>
          </div>

          {/* Engine label — brightens when activated */}
          <motion.span
            className="text-[10px] font-mono uppercase mt-2 font-bold tracking-widest"
            initial={
              instant
                ? undefined
                : { opacity: 0, color: 'rgba(100,116,139,1)' }
            }
            animate={
              active
                ? { opacity: 1, color: 'rgba(0,200,150,1)' }
                : undefined
            }
            transition={tr(0.6, 0.4, instant)}
          >
            LUDIS ENGINE
          </motion.span>
        </div>

        {/* ────────────────────────────────────────────
            RIGHT: Explainable Insight (1300–2200ms)
            Progressive reveal: status → confidence →
            why → recommendation → accent flash
            ──────────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-5"
          initial={instant ? undefined : { opacity: 0, y: 16, scale: 0.985 }}
          animate={active ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={tr(1.25, 0.5, instant)}
        >
          <div className="glass-hero rounded-3xl p-6 border-border-luminous space-y-4">
            {/* Step 2 label */}
            <motion.span
              className="text-xs font-mono text-brand-primary uppercase tracking-widest font-bold block"
              initial={instant ? undefined : { opacity: 0 }}
              animate={active ? { opacity: 1 } : undefined}
              transition={tr(1.35, 0.3, instant)}
            >
              STEP 2: EXPLAINABLE INSIGHT &amp; ACTION
            </motion.span>

            {/* Recovery Status */}
            <motion.div
              className="border-b border-border-subtle pb-3"
              initial={instant ? undefined : { opacity: 0 }}
              animate={active ? { opacity: 1 } : undefined}
              transition={tr(1.4, 0.35, instant)}
            >
              <span className="text-[10px] font-mono text-text-muted uppercase">
                RECOVERY STATUS
              </span>
              <div className="flex items-center justify-between mt-1">
                <motion.h3
                  className="text-lg font-bold text-text-primary"
                  initial={instant ? undefined : { opacity: 0, x: -6 }}
                  animate={active ? { opacity: 1, x: 0 } : undefined}
                  transition={tr(1.48, 0.35, instant)}
                >
                  Stable Recovery (76 pts)
                </motion.h3>
                <motion.span
                  className="text-xs font-mono text-status-positive font-semibold"
                  initial={instant ? undefined : { opacity: 0, scale: 0.95 }}
                  animate={active ? { opacity: 1, scale: 1 } : undefined}
                  transition={tr(1.55, 0.3, instant)}
                >
                  HIGH CONFIDENCE
                </motion.span>
              </div>
            </motion.div>

            {/* Why it matters */}
            <motion.div
              className="border-b border-border-subtle pb-3"
              initial={instant ? undefined : { opacity: 0 }}
              animate={active ? { opacity: 1 } : undefined}
              transition={tr(1.6, 0.35, instant)}
            >
              <span className="text-[10px] font-mono text-text-muted uppercase">
                WHY IT MATTERS
              </span>
              <motion.p
                className="text-xs text-text-secondary mt-1 leading-relaxed"
                initial={instant ? undefined : { opacity: 0 }}
                animate={active ? { opacity: 1 } : undefined}
                transition={tr(1.7, 0.35, instant)}
              >
                HRV is steady. Sleep duration was 30 mins below baseline
                target, offset by optimal restorative phases.
              </motion.p>
            </motion.div>

            {/* Recommendation — final step of the sequence */}
            <motion.div
              className="bg-brand-primary-muted/20 rounded-xl p-3.5 border border-brand-primary/30 relative overflow-hidden"
              initial={instant ? undefined : { opacity: 0, y: 10 }}
              animate={active ? { opacity: 1, y: 0 } : undefined}
              transition={tr(1.8, 0.45, instant)}
            >
              {/* Accent border flash — fires once then fades */}
              {!instant && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-brand-primary/50 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={
                    active ? { opacity: [0, 0.6, 0] } : undefined
                  }
                  transition={{
                    duration: 0.5,
                    delay: 2.05,
                    ease: ease,
                  }}
                />
              )}

              <motion.span
                className="text-[10px] font-mono text-brand-primary uppercase font-bold"
                initial={instant ? undefined : { opacity: 0 }}
                animate={active ? { opacity: 1 } : undefined}
                transition={tr(1.85, 0.25, instant)}
              >
                RECOMMENDED ACTION
              </motion.span>
              <motion.p
                className="text-xs font-bold text-text-primary mt-1"
                initial={instant ? undefined : { opacity: 0 }}
                animate={active ? { opacity: 1 } : undefined}
                transition={tr(1.95, 0.35, instant)}
              >
                Execute scheduled moderate workout. Prioritize bedtime by
                22:30 tonight.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
