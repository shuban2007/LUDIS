// Ludis — Landing Page
// Communicates: problem, Ludis approach, 4 MVP capabilities, athlete/coach value,
// explainable AI, responsible AI positioning, non-medical positioning.
// No fake claims, no unsupported statistics.

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-ground">
      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-brand-primary flex items-center justify-center">
            <span className="text-sm font-bold text-text-inverse">L</span>
          </div>
          <span className="text-lg font-bold text-text-primary tracking-tight">Ludis</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium">
            Sign in
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-6 pt-16 pb-20 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-elevated px-4 py-1.5 text-xs text-text-secondary mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
          AI-Powered Performance Intelligence
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-[1.1] mb-6">
          Know your body.
          <br />
          <span className="text-brand-primary">Train smarter.</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
          Ludis transforms your training data into personalized performance, recovery, and readiness insights.
          Understand what changed, why it matters, and what to do next — built around your personal baseline,
          not population averages.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/signup">
            <Button size="lg">Start Free</Button>
          </Link>
          <Link href="#capabilities">
            <Button variant="secondary" size="lg">Learn more</Button>
          </Link>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="px-6 py-16 border-t border-border-subtle">
        <div className="max-w-4xl mx-auto">
          <h2 className="ludis-section-title mb-3">The Problem</h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Raw data isn&apos;t insight
          </h3>
          <p className="text-text-secondary leading-relaxed max-w-3xl">
            Athletes and coaches collect more data than ever — heart rate, HRV, training load, sleep, perceived exertion.
            But isolated metrics on a dashboard don&apos;t answer the questions that matter:
            What changed? Is it significant for <em>me</em>? Should I adjust my training? How confident should I be in this signal?
          </p>
          <p className="text-text-secondary leading-relaxed max-w-3xl mt-4">
            Ludis bridges the gap between raw data and actionable decisions by building a personal performance model
            unique to each athlete.
          </p>
        </div>
      </section>

      {/* ── Four MVP Capabilities ── */}
      <section id="capabilities" className="px-6 py-16 bg-surface-base">
        <div className="max-w-5xl mx-auto">
          <h2 className="ludis-section-title mb-3">Capabilities</h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10">
            Four pillars of performance intelligence
          </h3>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* 1. Performance & Baseline */}
            <div className="ludis-card">
              <div className="h-10 w-10 rounded-lg bg-brand-primary-muted flex items-center justify-center mb-4">
                <svg className="h-5 w-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Personalized Performance & Baseline Engine
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Ludis builds a personal baseline for each athlete — what&apos;s normal for <em>you</em>.
                Performance deviations are measured against your own history, not generic population averages.
                Every insight includes significance, direction, and contributing factors.
              </p>
            </div>

            {/* 2. Recovery + Fatigue */}
            <div className="ludis-card">
              <div className="h-10 w-10 rounded-lg bg-status-positive-bg flex items-center justify-center mb-4">
                <svg className="h-5 w-5 text-status-positive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Recovery + Fatigue Analysis
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Recovery and fatigue assessments use multiple signals — never relying on a single metric.
                Each assessment includes contributing factors, trend context, and a confidence indicator
                so athletes and coaches can make informed training decisions.
              </p>
            </div>

            {/* 3. Coach Dashboard */}
            <div className="ludis-card">
              <div className="h-10 w-10 rounded-lg bg-brand-accent-muted flex items-center justify-center mb-4">
                <svg className="h-5 w-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Coach Performance Dashboard
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Coaches get a team-level view of readiness, fatigue alerts, and meaningful athlete changes.
                Drill down from team overview to individual athlete detail — all within the data boundaries
                each athlete has explicitly permitted.
              </p>
            </div>

            {/* 4. Explainable Recommendations */}
            <div className="ludis-card">
              <div className="h-10 w-10 rounded-lg bg-status-warning-bg flex items-center justify-center mb-4">
                <svg className="h-5 w-5 text-status-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Explainable Recommendation Layer
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Every recommendation comes with an explanation: why it was generated, what evidence
                supports it, and how confident the system is. Ludis helps athletes and coaches make
                better decisions — it doesn&apos;t make decisions for them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── For Athletes / For Coaches ── */}
      <section className="px-6 py-16 border-t border-border-subtle">
        <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-3">For Athletes</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Personal baseline — understand what&apos;s normal for you
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Recovery and readiness awareness before training decisions
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Fatigue indicators with multiple contributing signals
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Explainable recommendations with confidence indicators
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Competition-aware performance context
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                You control who sees your data
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-3">For Coaches</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Team readiness overview at a glance
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Fatigue and recovery alerts for athletes who need attention
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Individual athlete performance summaries
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Event-aware readiness context
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Permission-controlled athlete data access
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary shrink-0">✓</span>
                Drill down from team to individual athlete detail
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Responsible AI ── */}
      <section className="px-6 py-16 bg-surface-base">
        <div className="max-w-4xl mx-auto">
          <h2 className="ludis-section-title mb-3">Responsible AI</h2>
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Decision support, not medical diagnosis
          </h3>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>
              Ludis is a performance analysis and injury-risk <em>awareness</em> tool.
              It is not a medical device, does not provide clinical diagnoses, and is not a replacement
              for professional medical or coaching advice.
            </p>
            <p>
              All predictions include confidence indicators and contributing factors.
              Ludis prioritizes reliable, decision-relevant information over impressive-looking but
              unreliable metrics. When data quality is low, the system communicates that clearly.
            </p>
            <p>
              Athlete data is permission-controlled. Coaches see only what athletes explicitly share.
              No data is sold or shared with third parties.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Train with clarity
          </h2>
          <p className="text-text-secondary mb-8">
            Stop guessing. Start understanding your performance data with individualized,
            explainable insights.
          </p>
          <Link href="/signup">
            <Button size="lg">Get Started — Free</Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-8 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-brand-primary flex items-center justify-center">
              <span className="text-xs font-bold text-text-inverse">L</span>
            </div>
            <span className="text-sm font-bold text-text-primary">Ludis</span>
          </div>
          <p className="text-xs text-text-muted">
            Ludis is decision support software. It is not a medical device and does not provide medical diagnoses.
          </p>
        </div>
      </footer>
    </div>
  );
}
