import pickle
import numpy as np
from app.core.config import MODEL_PATH, ENCODER_PATH

model = pickle.load(open(MODEL_PATH, "rb"))
encoders = pickle.load(open(ENCODER_PATH, "rb"))

FEATURE_ORDER = [
    "age", "weight", "height", "bmi",
    "body_fat_category", "goal", "experience",
    "training_age_years", "days",
    "progress_feedback", "recovery_score",
    "cardio_preference", "core_focus"
]

def predict_strategy(user: dict):
    data = []

    for col in FEATURE_ORDER:
        val = user[col]
        if col in encoders:
            val = encoders[col].transform([val])[0]
        data.append(val)

    X = np.array([data])

    preds = model.predict(X)[0]
    probas = model.predict_proba(X)

    confidence = float(
        np.mean([np.max(p[0]) for p in probas])
    )

    return {
        "split": encoders["split_type"].inverse_transform([preds[0]])[0],
        "intensity": encoders["intensity"].inverse_transform([preds[1]])[0],
        "volume": encoders["volume"].inverse_transform([preds[2]])[0],
        "confidence": round(confidence, 2)
    }
