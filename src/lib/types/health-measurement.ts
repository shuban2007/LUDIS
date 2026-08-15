export interface HealthMeasurement {
  id: string;
  userId: string;
  metric:
    | "heartRate"
    | "restingHeartRate"
    | "hrv"
    | "bloodPressure"
    | "sleep"
    | "trainingDuration"
    | "trainingRpe"
    | "muscleSoreness"
    | "energyLevel"
    | "bodyWeight";
  value?: number;
  secondaryValue?: number;
  unit?: string;
  timestamp: string;
  source: "manual" | "google_fit" | "wearable";
  notes?: string;
}
