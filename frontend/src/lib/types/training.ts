// Ludis Domain Types — Training, Events, Competitions

import type { ID, ISODateString } from './common';
import type { Sport } from './athlete';

/** Training session type */
export type SessionType = 'training' | 'competition' | 'recovery' | 'rest';

/** Training session */
export interface TrainingSession {
  id: ID;
  athleteId: ID;
  type: SessionType;
  title: string;
  sport: Sport;
  startTime: ISODateString;
  endTime: ISODateString;
  durationMinutes: number;
  /** Perceived exertion (RPE) 1-10 */
  perceivedExertion?: number;
  notes?: string;
}

/** Event — scheduled competition, training camp, etc. */
export interface Event {
  id: ID;
  title: string;
  type: 'competition' | 'training_camp' | 'friendly' | 'assessment';
  sport: Sport;
  date: ISODateString;
  location?: string;
  description?: string;
  /** Links to environmental context */
  environmentalContextId?: ID;
  /** Athletes involved */
  athleteIds: ID[];
  teamId?: ID;
}

/** Environmental context for an event location/date */
export interface EnvironmentalContext {
  id: ID;
  eventId: ID;
  location: string;
  date: ISODateString;
  temperature?: number;
  temperatureUnit: 'celsius' | 'fahrenheit';
  humidity?: number;
  weather?: string;
  aqi?: number;
  /** How this context might affect performance */
  performanceNote?: string;
}
