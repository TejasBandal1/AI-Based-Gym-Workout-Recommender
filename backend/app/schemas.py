from pydantic import BaseModel, Field
from enum import Enum

# ---------------------------
# ENUM DEFINITIONS
# ---------------------------

class BodyFat(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Goal(str, Enum):
    muscle_gain = "muscle_gain"
    weight_loss = "weight_loss"

class Experience(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"

class Progress(str, Enum):
    new = "new"
    poor = "poor"
    good = "good"
    excellent = "excellent"
    easy = "easy"

class Recovery(str, Enum):
    poor = "poor"
    average = "average"
    good = "good"

class Preference(str, Enum):
    low = "low"
    moderate = "moderate"
    high = "high"

# ---------------------------
# REQUEST SCHEMA
# ---------------------------

class UserInput(BaseModel):
    age: int = Field(..., ge=16, le=60)
    weight: float = Field(..., ge=40, le=150)
    height: float = Field(..., ge=1.4, le=2.1)

    body_fat_category: BodyFat
    goal: Goal
    experience: Experience

    training_age_years: int = Field(..., ge=0, le=20)
    days: int = Field(..., ge=3, le=6)

    progress_feedback: Progress
    recovery_score: Recovery
    cardio_preference: Preference
    core_focus: Preference

# ---------------------------
# RESPONSE SCHEMA
# ---------------------------

class WorkoutResponse(BaseModel):
    split: str
    intensity: str
    volume: str
    confidence: float
    plan: dict
