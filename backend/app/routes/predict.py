from fastapi import APIRouter
from pydantic import BaseModel
from app.planner.plan_builder import build_workout_plan

router = APIRouter(prefix="/predict", tags=["Workout Prediction"])

class UserInput(BaseModel):
    weight: float
    experience: str
    days: int

class WorkoutResponse(BaseModel):
    split: str
    intensity: str
    volume: str
    confidence: float
    plan: dict

@router.post("/", response_model=WorkoutResponse)
def predict_workout(user: UserInput):

    if user.experience == "beginner":
        split = "FullBody"
    elif user.days >= 4:
        split = "UpperLower"
    else:
        split = "PPL"

    plan = build_workout_plan(split, user.weight)

    return WorkoutResponse(
        split=split,
        intensity="Moderate",
        volume="Medium",
        confidence=0.79,
        plan=plan
    )
