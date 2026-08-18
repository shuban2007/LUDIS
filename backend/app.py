import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib

# --- MONKEY PATCH FOR SCIKIT-LEARN 1.6.1 COMPATIBILITY ---
import sklearn.compose._column_transformer
if not hasattr(sklearn.compose._column_transformer, '_RemainderColsList'):
    class _RemainderColsList(list):
        pass
    sklearn.compose._column_transformer._RemainderColsList = _RemainderColsList
# ---------------------------------------------------------

app = Flask(__name__)
CORS(app)

MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')

# Load models at startup, but wrap in try-except in case they fail on this OS
models = {}
try:
    models['injury'] = joblib.load(os.path.join(MODELS_DIR, 'injury_risk_model.joblib'))
    models['fatigue'] = joblib.load(os.path.join(MODELS_DIR, 'ludis_fatigue_risk_model.joblib'))
    models['performance'] = joblib.load(os.path.join(MODELS_DIR, 'ludis_performance_model.joblib'))
    models['recovery'] = joblib.load(os.path.join(MODELS_DIR, 'ludis_recovery_model.joblib'))
except Exception as e:
    print(f"Error loading models: {e}")

# Extracted feature lists for each model
FEATURES = {
    'injury': ['heart_rate', 'training_duration', 'training_intensity', 'sleep_quality', 'stress_level', 'body_temperature', 'range_of_motion', 'jump_height', 'cadence', 'hydration_level', 'gender'],
    'fatigue': ['hydration_level', 'lactate_level', 'heartrate_recovery', 'training_hours', 'training_intensity', 'sleep_hours', 'sleep_quality', 'muscle_soreness', 'resting_heartrate', 'gender'],
    'performance': ['skin_temperature_c', 'hrv_dwt_coeff', 'training_experience_years', 'heart_rate_bpm', 'sport_type', 'respiration_bandpower', 'session_duration_min', 'hrv_ms', 'sleep_duration_hrs', 'acceleration_x', 'acceleration_y', 'acceleration_z', 'nutrition_score', 'accel_spectral_energy', 'respiration_rate_bpm', 'oxygen_saturation_pct'],
    'recovery': ['day_of_week', 'workout_completed', 'sleep_performance', 'primary_sport', 'skin_temp_deviation', 'avg_heart_rate', 'deep_sleep_hours', 'activity_calories', 'respiratory_rate', 'height_cm', 'hrv_baseline']
}

def extract_features(data, feature_list):
    # Create a single row dataframe with NaNs
    df = pd.DataFrame(columns=feature_list)
    row = {col: np.nan for col in feature_list}
    
    # Try to map what we can from the frontend data
    # Generic mappings
    if 'trainingDuration' in data:
        row['training_duration'] = data['trainingDuration']
        row['training_hours'] = data['trainingDuration'] / 60.0
        row['session_duration_min'] = data['trainingDuration']
    if 'sleep' in data:
        row['sleep_hours'] = data['sleep'] / 60.0
        row['sleep_duration_hrs'] = data['sleep'] / 60.0
        row['sleep_performance'] = min(100, (data['sleep'] / 480.0) * 100) # guess
    if 'heartRate' in data:
        row['heart_rate'] = data['heartRate']
        row['heart_rate_bpm'] = data['heartRate']
        row['avg_heart_rate'] = data['heartRate']
    if 'restingHeartRate' in data:
        row['resting_heartrate'] = data['restingHeartRate']
    if 'hrv' in data:
        row['hrv_ms'] = data['hrv']
        row['hrv_baseline'] = data['hrv']
    if 'trainingRpe' in data:
        row['training_intensity'] = data['trainingRpe']
    if 'muscleSoreness' in data:
        row['muscle_soreness'] = data['muscleSoreness']
        row['stress_level'] = data['muscleSoreness']
        
    # Profile mappings
    if 'profile' in data:
        profile = data['profile']
        if 'sport' in profile:
            row['primary_sport'] = profile['sport']
            row['sport_type'] = profile['sport']
        if 'gender' in profile:
            row['gender'] = profile['gender']
        if 'height' in profile:
            row['height_cm'] = profile['height']
            
    df = pd.concat([df, pd.DataFrame([row])], ignore_index=True)
    return df

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "models_loaded": list(models.keys())})

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Missing JSON payload"}), 400
            
        results = {}
        
        # Injury Risk
        if 'injury' in models:
            try:
                X_inj = extract_features(data, FEATURES['injury'])
                prob = models['injury'].predict_proba(X_inj)[0][1]
                results['injuryRisk'] = {
                    'value': round(prob * 100),
                    'label': 'High' if prob > 0.5 else 'Medium' if prob > 0.3 else 'Low'
                }
            except Exception as e:
                results['injuryRisk'] = {'error': str(e)}
        else:
            results['injuryRisk'] = {'error': 'Model not loaded'}

        # Fatigue Risk
        if 'fatigue' in models:
            try:
                X_fat = extract_features(data, FEATURES['fatigue'])
                pred = models['fatigue'].predict(X_fat)[0]
                results['fatigueRisk'] = {
                    'label': str(pred),
                    'value': 100 # Default if classification
                }
            except Exception as e:
                results['fatigueRisk'] = {'error': str(e)}

        # Performance 
        if 'performance' in models:
            try:
                X_perf = extract_features(data, FEATURES['performance'])
                pred = models['performance'].predict(X_perf)[0]
                results['performance'] = {
                    'value': round(float(pred), 1)
                }
            except Exception as e:
                results['performance'] = {'error': str(e)}

        # Recovery 
        if 'recovery' in models:
            try:
                X_rec = extract_features(data, FEATURES['recovery'])
                pred = models['recovery'].predict(X_rec)[0]
                results['recovery'] = {
                    'value': round(float(pred), 1),
                    'status': 'Optimal' if pred > 80 else 'Adequate' if pred > 60 else 'Needs Attention'
                }
            except Exception as e:
                results['recovery'] = {'error': str(e)}
                
        return jsonify({"success": True, "prediction": results}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
