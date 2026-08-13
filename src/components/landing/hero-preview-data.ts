// Ludis Hero Preview — Typed mock data driving the hero product preview
// All values are internally consistent and tell one coherent athlete story.

export interface HeroTrendPoint {
  date: string;    // Short label e.g. "Aug 4"
  value: number;
}

export interface HeroPreviewData {
  athlete: {
    name: string;
    sport: string;
  };
  date: {
    label: string;       // "Today · Thu, Aug 13"
    lastSynced: string;  // "Updated 8 min ago"
  };
  readiness: {
    score: number;
    status: string;      // "Good"
    context: string;     // "Above your recent baseline"
    delta: string;       // "+4 vs 7-day avg"
  };
  performance: {
    current: number;
    baseline: {
      min: number;
      max: number;
    };
    trend: HeroTrendPoint[];
  };
  recovery: {
    score: number;
    status: string;
    sleep: string;
    trainingLoad: string;
  };
  fatigue: {
    level: string;
    trend: string;
  };
  session: {
    name: string;
    time: string;
    intensity: string;
  };
  signals: Array<{
    label: string;
    status: string;
    detail?: string;
  }>;
  recommendation: {
    primary: string;
    secondary: string;
    explanation: string;
    confidence: string;
  };
}

export const heroPreviewData: HeroPreviewData = {
  athlete: {
    name: "Maya",
    sport: "Football",
  },
  date: {
    label: "Today · Thu, Aug 13",
    lastSynced: "Updated 8 min ago",
  },
  readiness: {
    score: 82,
    status: "Good",
    context: "Above your recent baseline",
    delta: "+4 vs 7-day avg",
  },
  performance: {
    current: 83,
    baseline: {
      min: 76,
      max: 80,
    },
    trend: [
      { date: "Aug 4",  value: 76 },
      { date: "Aug 5",  value: 77 },
      { date: "Aug 6",  value: 75 },
      { date: "Aug 7",  value: 78 },
      { date: "Aug 8",  value: 77 },
      { date: "Aug 9",  value: 79 },
      { date: "Aug 10", value: 80 },
      { date: "Aug 11", value: 79 },
      { date: "Aug 12", value: 82 },
      { date: "Aug 13", value: 83 },
    ],
  },
  recovery: {
    score: 76,
    status: "Good",
    sleep: "7h 32m",
    trainingLoad: "Moderate",
  },
  fatigue: {
    level: "Moderate",
    trend: "Trending slightly higher",
  },
  session: {
    name: "Speed & conditioning",
    time: "18:00",
    intensity: "Moderate",
  },
  signals: [
    { label: "Sleep",        status: "Good",               detail: "7h 32m" },
    { label: "Training load", status: "Stable" },
    { label: "Resting HR",   status: "Slightly elevated" },
  ],
  recommendation: {
    primary: "Maintain your planned intensity.",
    secondary: "Focus on recovery after training.",
    explanation: "Performance is above your recent baseline while recovery remains stable.",
    confidence: "High",
  },
};
