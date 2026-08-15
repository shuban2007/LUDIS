// Centralized Mock Demo Data for Ludis Application
import { type HealthMeasurement } from '@/lib/types/health-measurement';

export interface AthleteData {
  id: string;
  userId: string;
  profile: {
    firstName: string;
    lastName: string;
    role: string;
    avatar: string;
    age: number;
    sport: string;
    email?: string;
    competitionLevel?: string;
    seasonBlock?: string;
    height?: number;
    weight?: number;
  };
  readiness: {
    score: number;
    status: string;
    description: string;
  };
  performance: {
    score: number;
    baseline: {
      min: number;
      max: number;
    };
    history: { date: string; value: number }[];
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
    description: string;
    confidence: string;
  };
  session: {
    title: string;
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
      description: string;
    };
    sleep: {
      value: string;
      status: string;
      description: string;
    };
    trainingLoad: {
      value: number;
      unit: string;
      status: string;
      description: string;
    };
  };
  competition: {
    opponent: string;
    date: string;
    time: string;
  };
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'alert' | 'session' | 'system';
  read: boolean;
  athleteId?: string;
}

export const INITIAL_ATHLETES: AthleteData[] = [
  {
    id: 'ath-001',
    userId: 'usr-001', // Matches Maya Chen athlete session in auth-context.tsx
    profile: {
      firstName: 'Maya',
      lastName: 'Chen',
      role: 'Athlete',
      avatar: '/athlete_portrait.png',
      age: 24,
      sport: 'Running',
    },
    readiness: {
      score: 82,
      status: 'Good',
      description: 'Above your recent baseline',
    },
    performance: {
      score: 83,
      baseline: {
        min: 76,
        max: 80,
      },
      history: [
        { date: 'May 4', value: 77 },
        { date: 'May 5', value: 79 },
        { date: 'May 6', value: 83 },
        { date: 'May 7', value: 76 },
        { date: 'May 8', value: 81 },
        { date: 'May 9', value: 84 },
        { date: 'May 10', value: 78 },
        { date: 'May 11', value: 88 },
        { date: 'May 12', value: 86 },
        { date: 'May 13', value: 83 },
      ],
    },
    recovery: {
      score: 76,
      status: 'Good',
    },
    fatigue: {
      level: 'Moderate',
      trend: 'Trending slightly higher',
    },
    recommendation: {
      title: 'Maintain your planned intensity.',
      description: 'Focus on recovery after training.',
      confidence: 'High confidence',
    },
    session: {
      title: 'Speed & Conditioning',
      time: '18:00',
      type: 'Field Session',
      duration: '60 min',
      focus: 'Speed · Power · Endurance',
    },
    contributors: {
      hrv: {
        value: 64,
        unit: 'ms',
        status: 'Within normal range',
        description: 'Autonomic balance is stabilized.',
      },
      sleep: {
        value: '7h 12m',
        status: 'Slightly below target',
        description: 'REM cycles stable, deep sleep normal.',
      },
      trainingLoad: {
        value: 380,
        unit: 'AU',
        status: 'Within optimal range',
        description: 'Workload aligns with training block targets.',
      },
    },
    competition: {
      opponent: 'vs Riverview FC',
      date: 'May 18',
      time: '18:30',
    },
  },
  {
    id: 'ath-002',
    userId: 'usr-002',
    profile: {
      firstName: 'Alex',
      lastName: 'Morgan',
      role: 'Athlete',
      avatar: '/athlete_portrait.png',
      age: 27,
      sport: 'Running',
    },
    readiness: {
      score: 91,
      status: 'Excellent',
      description: 'Significantly above your baseline',
    },
    performance: {
      score: 89,
      baseline: {
        min: 80,
        max: 85,
      },
      history: [
        { date: 'May 4', value: 82 },
        { date: 'May 5', value: 85 },
        { date: 'May 6', value: 86 },
        { date: 'May 7', value: 84 },
        { date: 'May 8', value: 88 },
        { date: 'May 9', value: 91 },
        { date: 'May 10', value: 89 },
        { date: 'May 11', value: 92 },
        { date: 'May 12', value: 93 },
        { date: 'May 13', value: 89 },
      ],
    },
    recovery: {
      score: 88,
      status: 'Excellent',
    },
    fatigue: {
      level: 'Low',
      trend: 'Stable and decreasing',
    },
    recommendation: {
      title: 'Optimal threshold day.',
      description: 'Progressively push intensity parameters.',
      confidence: 'High confidence',
    },
    session: {
      title: 'Tempo Intervals',
      time: '09:00',
      type: 'Track Session',
      duration: '75 min',
      focus: 'Lactate Threshold · Aerobic Power',
    },
    contributors: {
      hrv: {
        value: 78,
        unit: 'ms',
        status: 'Optimal',
        description: 'Excellent recovery index.',
      },
      sleep: {
        value: '8h 24m',
        status: 'Optimal',
        description: 'Completed 5 full sleep cycles.',
      },
      trainingLoad: {
        value: 410,
        unit: 'AU',
        status: 'Within optimal range',
        description: 'Ready for progressive workload step-up.',
      },
    },
    competition: {
      opponent: 'at East Valley Open',
      date: 'May 20',
      time: '10:00',
    },
  },
  {
    id: 'ath-003',
    userId: 'usr-003',
    profile: {
      firstName: 'James',
      lastName: 'Okafor',
      role: 'Athlete',
      avatar: '/athlete_portrait.png',
      age: 22,
      sport: 'Running',
    },
    readiness: {
      score: 52,
      status: 'Attention Required',
      description: 'Elevated fatigue / low recovery indicators',
    },
    performance: {
      score: 72,
      baseline: {
        min: 76,
        max: 80,
      },
      history: [
        { date: 'May 4', value: 79 },
        { date: 'May 5', value: 78 },
        { date: 'May 6', value: 76 },
        { date: 'May 7', value: 74 },
        { date: 'May 8', value: 72 },
        { date: 'May 9', value: 70 },
        { date: 'May 10', value: 68 },
        { date: 'May 11', value: 72 },
        { date: 'May 12', value: 75 },
        { date: 'May 13', value: 72 },
      ],
    },
    recovery: {
      score: 58,
      status: 'Low',
    },
    fatigue: {
      level: 'High',
      trend: 'Workload/recovery imbalance',
    },
    recommendation: {
      title: 'Rest & active recovery only.',
      description: 'Elevated load parameters warrant complete rest.',
      confidence: 'High confidence',
    },
    session: {
      title: 'Mobility & Stretching',
      time: '11:00',
      type: 'Recovery Session',
      duration: '30 min',
      focus: 'Flexibility · Muscle Decompression',
    },
    contributors: {
      hrv: {
        value: 45,
        unit: 'ms',
        status: 'Below normal range',
        description: 'Imbalance detected in autonomic recovery.',
      },
      sleep: {
        value: '5h 45m',
        status: 'Significant deficit',
        description: 'Restless intervals with high wake-count.',
      },
      trainingLoad: {
        value: 510,
        unit: 'AU',
        status: 'Excessive overload',
        description: 'Accumulated fatigue index exceeds safety baseline.',
      },
    },
    competition: {
      opponent: 'vs Titans Club',
      date: 'May 24',
      time: '15:30',
    },
  },
  {
    id: 'ath-004',
    userId: 'usr-004',
    profile: {
      firstName: 'Sofia',
      lastName: 'Rivera',
      role: 'Athlete',
      avatar: '/athlete_portrait.png',
      age: 20,
      sport: 'Running',
    },
    readiness: {
      score: 79,
      status: 'Good',
      description: 'Stabilized within normal baseline range',
    },
    performance: {
      score: 81,
      baseline: {
        min: 78,
        max: 82,
      },
      history: [
        { date: 'May 4', value: 78 },
        { date: 'May 5', value: 77 },
        { date: 'May 6', value: 79 },
        { date: 'May 7', value: 80 },
        { date: 'May 8', value: 82 },
        { date: 'May 9', value: 81 },
        { date: 'May 10', value: 80 },
        { date: 'May 11', value: 82 },
        { date: 'May 12', value: 83 },
        { date: 'May 13', value: 81 },
      ],
    },
    recovery: {
      score: 74,
      status: 'Good',
    },
    fatigue: {
      level: 'Low',
      trend: 'Stable and controlled',
    },
    recommendation: {
      title: 'Maintain baseline training.',
      description: 'Maintain cardiovascular base parameters.',
      confidence: 'High confidence',
    },
    session: {
      title: 'Base Aerobic Run',
      time: '07:30',
      type: 'Field Run',
      duration: '45 min',
      focus: 'Aerobic Base · Zone 2 Control',
    },
    contributors: {
      hrv: {
        value: 68,
        unit: 'ms',
        status: 'Optimal',
        description: 'Autonomic stability established.',
      },
      sleep: {
        value: '7h 48m',
        status: 'Within target range',
        description: 'Excellent sleep efficiency index.',
      },
      trainingLoad: {
        value: 290,
        unit: 'AU',
        status: 'Within optimal range',
        description: 'Workload parameters are balanced.',
      },
    },
    competition: {
      opponent: 'vs Metro Athletic Group',
      date: 'May 28',
      time: '09:00',
    },
  },
  {
    id: 'ath-005',
    userId: 'usr-005',
    profile: {
      firstName: 'Liam',
      lastName: 'Torres',
      role: 'Athlete',
      avatar: '/athlete_portrait.png',
      age: 28,
      sport: 'Running',
    },
    readiness: {
      score: 61,
      status: 'Moderate',
      description: 'Slightly below optimal baseline range',
    },
    performance: {
      score: 75,
      baseline: {
        min: 78,
        max: 82,
      },
      history: [
        { date: 'May 4', value: 81 },
        { date: 'May 5', value: 80 },
        { date: 'May 6', value: 78 },
        { date: 'May 7', value: 77 },
        { date: 'May 8', value: 76 },
        { date: 'May 9', value: 75 },
        { date: 'May 10', value: 74 },
        { date: 'May 11', value: 73 },
        { date: 'May 12', value: 75 },
        { date: 'May 13', value: 75 },
      ],
    },
    recovery: {
      score: 63,
      status: 'Moderate',
    },
    fatigue: {
      level: 'High',
      trend: 'Accumulated training loads',
    },
    recommendation: {
      title: 'Deload day suggested.',
      description: 'Reduce intensity parameters by 30%.',
      confidence: 'High confidence',
    },
    session: {
      title: 'Deload Recovery Jog',
      time: '16:00',
      type: 'Recovery Jog',
      duration: '40 min',
      focus: 'Cardiovascular Flush · Low Impact',
    },
    contributors: {
      hrv: {
        value: 54,
        unit: 'ms',
        status: 'Moderate',
        description: 'Vagal tone represents minor fatigue.',
      },
      sleep: {
        value: '6h 30m',
        status: 'Slight deficit',
        description: 'Elevated waking counts during the night.',
      },
      trainingLoad: {
        value: 460,
        unit: 'AU',
        status: 'High load',
        description: 'Fatigue levels are high, deload suggested.',
      },
    },
    competition: {
      opponent: 'at Cascade Invitational',
      date: 'June 02',
      time: '08:00',
    },
  },
];

export const INITIAL_NOTIFICATIONS: DemoNotification[] = [
  {
    id: 'notif-001',
    title: 'Elevated Fatigue Indicator',
    message: 'James Okafor is displaying low recovery values (58) and high fatigue indicators.',
    timestamp: 'Today, 10:15 AM',
    type: 'alert',
    read: false,
    athleteId: 'ath-003',
  },
  {
    id: 'notif-002',
    title: 'Training Plan Adjusted',
    message: 'Your training recommendations have been updated due to active performance history.',
    timestamp: 'Today, 08:30 AM',
    type: 'system',
    read: false,
    athleteId: 'ath-001',
  },
  {
    id: 'notif-003',
    title: 'Upcoming Competition Reminder',
    message: 'Your next competition vs Riverview FC is scheduled in 3 days.',
    timestamp: 'Yesterday, 02:00 PM',
    type: 'session',
    read: false,
    athleteId: 'ath-001',
  },
  {
    id: 'notif-004',
    title: 'Weekly Report Released',
    message: 'Your weekly performance and recovery report has been compiled and is ready for download.',
    timestamp: '2 days ago',
    type: 'system',
    read: true,
    athleteId: 'ath-001',
  },
];

export const INITIAL_HEALTH_MEASUREMENTS: HealthMeasurement[] = [
  {
    id: 'hm-001',
    userId: 'usr-001',
    metric: 'heartRate',
    value: 72,
    unit: 'bpm',
    timestamp: 'Today, 5:42 PM',
    source: 'manual',
  },
  {
    id: 'hm-002',
    userId: 'usr-001',
    metric: 'restingHeartRate',
    value: 58,
    unit: 'bpm',
    timestamp: 'Today, 5:42 PM',
    source: 'manual',
  },
  {
    id: 'hm-003',
    userId: 'usr-001',
    metric: 'hrv',
    value: 64,
    unit: 'ms',
    timestamp: 'Today, 5:40 PM',
    source: 'google_fit',
  },
  {
    id: 'hm-004',
    userId: 'usr-001',
    metric: 'bloodPressure',
    value: 120,
    secondaryValue: 80,
    unit: 'mmHg',
    timestamp: 'Today, 8:15 AM',
    source: 'manual',
  },
  {
    id: 'hm-005',
    userId: 'usr-001',
    metric: 'sleep',
    value: 432, // 7h 12m
    unit: 'min',
    timestamp: 'Today, 8:00 AM',
    source: 'google_fit',
  },
  {
    id: 'hm-006',
    userId: 'usr-001',
    metric: 'trainingDuration',
    value: 60,
    unit: 'min',
    timestamp: 'Today, 6:00 PM',
    source: 'manual',
  },
  {
    id: 'hm-007',
    userId: 'usr-001',
    metric: 'trainingRpe',
    value: 7,
    timestamp: 'Today, 6:00 PM',
    source: 'manual',
  },
  {
    id: 'hm-008',
    userId: 'usr-001',
    metric: 'muscleSoreness',
    value: 3,
    timestamp: 'Today, 8:00 AM',
    source: 'manual',
  },
  {
    id: 'hm-009',
    userId: 'usr-001',
    metric: 'energyLevel',
    value: 8,
    timestamp: 'Today, 8:00 AM',
    source: 'manual',
  },
  {
    id: 'hm-010',
    userId: 'usr-001',
    metric: 'bodyWeight',
    value: 66,
    unit: 'kg',
    timestamp: 'Today, 8:00 AM',
    source: 'manual',
  },
];

