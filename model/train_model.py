import os
import pickle
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

# -------------------------------------------------
# ABSOLUTE PATH RESOLUTION (100% CORRECT)
# -------------------------------------------------

THIS_FILE = os.path.abspath(__file__)
MODEL_DIR = os.path.dirname(THIS_FILE)              # .../model
PROJECT_ROOT = os.path.dirname(MODEL_DIR)           # .../ML project FAstapi
BACKEND_DIR = os.path.join(PROJECT_ROOT, "backend") # .../backend

DATA_PATH = os.path.join(BACKEND_DIR, "data", "workout_dataset.csv")
MODEL_PATH = os.path.join(BACKEND_DIR, "model", "workout_model.pkl")
ENCODER_PATH = os.path.join(BACKEND_DIR, "model", "encoders.pkl")

print("\n🔍 DEBUG PATH CHECK")
print("THIS_FILE   :", THIS_FILE)
print("PROJECT_ROOT:", PROJECT_ROOT)
print("DATA_PATH   :", DATA_PATH)

# -------------------------------------------------
# HARD FAIL IF FILE DOES NOT EXIST
# -------------------------------------------------
if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"❌ Dataset not found at: {DATA_PATH}")

# -------------------------------------------------
# Load dataset
# -------------------------------------------------
df = pd.read_csv(DATA_PATH)

# -------------------------------------------------
# Columns
# -------------------------------------------------
TARGET_COLS = ["split_type", "intensity", "volume"]

INPUT_CAT_COLS = [
    "body_fat_category",
    "goal",
    "experience",
    "progress_feedback",
    "recovery_score",
    "cardio_preference",
    "core_focus"
]

X = df.drop(columns=TARGET_COLS).copy()
y = df[TARGET_COLS].copy()

# -------------------------------------------------
# Encode categorical inputs
# -------------------------------------------------
encoders = {}

for col in INPUT_CAT_COLS:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col].astype(str))
    encoders[col] = le

# -------------------------------------------------
# Encode targets
# -------------------------------------------------
for col in TARGET_COLS:
    le = LabelEncoder()
    y[col] = le.fit_transform(y[col].astype(str))
    encoders[col] = le

# -------------------------------------------------
# Train / Test split
# -------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -------------------------------------------------
# Model
# -------------------------------------------------
model = MultiOutputClassifier(
    RandomForestClassifier(
        n_estimators=200,
        max_depth=12,
        min_samples_split=5,
        random_state=42,
        n_jobs=-1
    )
)

model.fit(X_train, y_train)

# -------------------------------------------------
# Save artifacts
# -------------------------------------------------
os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)

with open(MODEL_PATH, "wb") as f:
    pickle.dump(model, f)

with open(ENCODER_PATH, "wb") as f:
    pickle.dump(encoders, f)

print("\n✅ MODEL TRAINED SUCCESSFULLY")
print("📦 Model saved at   :", MODEL_PATH)
print("📦 Encoders saved at:", ENCODER_PATH)
