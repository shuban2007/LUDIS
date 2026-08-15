// Ludis Domain Types — Athlete Dashboard Data Structure

export interface DashboardTrendPoint {
  date: string;
  value: number;
}

export interface AthleteDashboardData {
  athleteName: string;
  athleteRole: string;
  avatarUrl?: string;
  greetingDate: string;

  readiness: {
    score: number;
    status: string;
    comparison: string;
  };

  performance: {
    current: number;
    baselineMin: number;
    baselineMax: number;
    trendPeriod: string;
    trend: DashboardTrendPoint[];
  };

  recovery: {
    score: number;
    status: string;
  };

  fatigue: {
    level: string;
    trend: string;
  };

  recommendation: {
    title: string;
    subtitle: string;
    confidence: string;
  };

  session: {
    name: string;
    time: string;
    type: string;
    duration: string;
    focus: string;
  };

  contributors: {
    hrv: {
      value: number;
      unit: string;
      status: string;
    };
    sleep: {
      value: string;
      status: string;
    };
    trainingLoad: {
      value: number;
      unit: string;
      status: string;
    };
  };

  competition: {
    opponent: string;
    date: string;
    time: string;
  };
}
