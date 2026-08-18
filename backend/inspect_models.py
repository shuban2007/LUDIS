import joblib
import os

models_dir = 'models'
for model_file in os.listdir(models_dir):
    if not model_file.endswith('.joblib'):
        continue
    
    path = os.path.join(models_dir, model_file)
    print(f"\n--- {model_file} ---")
    try:
        model = joblib.load(path)
        print(f"Type: {type(model)}")
        
        if hasattr(model, 'feature_names_in_'):
            print(f"Features expected: {list(model.feature_names_in_)}")
        elif hasattr(model, 'get_feature_names_out'):
            print("Has get_feature_names_out")
        
        if hasattr(model, 'classes_'):
            print(f"Classes: {list(model.classes_)}")
        
        # If it's a pipeline, inspect steps
        if hasattr(model, 'steps'):
            print("Pipeline steps:")
            for name, step in model.steps:
                print(f"  - {name}: {type(step)}")
                if hasattr(step, 'feature_names_in_'):
                    print(f"    Features in: {list(step.feature_names_in_)}")
                    
    except Exception as e:
        print(f"Error loading {model_file}: {e}")
