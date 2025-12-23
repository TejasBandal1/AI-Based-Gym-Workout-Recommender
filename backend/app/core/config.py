import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

MODEL_PATH = os.path.join(BASE_DIR, "model", "workout_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "model", "encoders.pkl")
