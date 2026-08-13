// Ludis — AI Insights Page
// Recommendations with evidence, confidence, and explainability.

import { PageHeader } from '@/components/ui/page-header';
import { RecommendationCard } from '@/components/shared/recommendation-card';
import { getCurrentAthlete, getRecommendations } from '@/lib/services/data-service';

export default function InsightsPage() {
  const athlete = getCurrentAthlete();
  const recommendations = getRecommendations(athlete.id);

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="AI Insights & Recommendations"
        subtitle="Explainable recommendations based on your performance data"
        section="Insights"
      />

      <p className="text-xs text-text-muted mb-6 max-w-2xl">
        These recommendations are generated from your training data, recovery signals, and performance patterns.
        Each recommendation includes supporting evidence and confidence indicators.
        They are decision support — not medical advice.
      </p>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} expanded />
        ))}
      </div>
    </div>
  );
}
