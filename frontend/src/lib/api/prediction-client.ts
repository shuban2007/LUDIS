import { HealthMeasurement } from '@/lib/types/health-measurement';
import { ProfileOverride } from '@/lib/types/profile';

// We'll use an environment variable for the API URL, falling back to localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface PredictionResponse {
  success: boolean;
  prediction?: {
    injuryRisk?: { value: number; label: string };
    fatigueRisk?: { value: number; label: string };
    performance?: { value: number };
    recovery?: { value: number; status: string };
  };
  error?: string;
}

export async function fetchAthletePredictions(
  measurements: HealthMeasurement[],
  profile: any
): Promise<PredictionResponse> {
  try {
    // Flatten measurements into a dictionary
    const metrics: Record<string, number> = {};
    
    // Sort measurements so we process the latest ones last (or just find latest)
    // Actually, let's just grab the latest of each metric
    const latestMeasurements = new Map<string, number>();
    
    for (const m of measurements) {
        // If we want strictly the latest, we should sort by timestamp, 
        // but assuming the array is ordered or we just take the first match as in health-analysis.ts
        if (!latestMeasurements.has(m.metric)) {
            // We need to parse timestamp if we want to be exact, but the original code 
            // sorts them: sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]
            // We'll just pass all data to the backend, or pre-process here.
        }
    }
    
    // Exact mapping like in health-analysis.ts
    const getLatestValue = (metricName: string) => {
        const match = [...measurements]
            .filter((m) => m.metric === metricName)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
        return match?.value;
    };

    // Extract all known metrics
    const payload = {
        profile: profile,
        hrv: getLatestValue('hrv'),
        sleep: getLatestValue('sleep'),
        energyLevel: getLatestValue('energyLevel'),
        muscleSoreness: getLatestValue('muscleSoreness'),
        restingHeartRate: getLatestValue('restingHeartRate'),
        trainingDuration: getLatestValue('trainingDuration'),
        trainingRpe: getLatestValue('trainingRpe'),
        heartRate: getLatestValue('heartRate')
    };

    const response = await fetch(`${API_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch predictions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
