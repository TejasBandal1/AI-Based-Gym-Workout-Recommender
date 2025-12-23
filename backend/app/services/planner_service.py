def calculate_weight(bodyweight, base_bw, intensity):
    factors = {"Low": 0.6, "Moderate": 0.75, "High": 0.85}
    weight = bodyweight * base_bw * factors[intensity]
    return round(weight / 2.5) * 2.5


WORKOUT_TEMPLATES = {
    "PPL": {
        "Push": {
            "Workout": [
                {"name": "Bench Press", "sets": 4, "reps": "6–8", "base_bw": 0.7},
                {"name": "Incline DB Press", "sets": 3, "reps": "8–10", "base_bw": 0.3},
            ]
        },
        "Pull": {
            "Workout": [
                {"name": "Deadlift", "sets": 4, "reps": "5–6", "base_bw": 1.2},
                {"name": "Lat Pulldown", "sets": 3, "reps": "8–10", "base_bw": 0.6},
            ]
        },
        "Legs": {
            "Workout": [
                {"name": "Back Squat", "sets": 4, "reps": "6–8", "base_bw": 1.0},
                {"name": "Leg Press", "sets": 3, "reps": "10–12", "base_bw": 1.5},
            ]
        }
    }
}

def generate_plan(strategy: dict, user: dict):
    split = strategy["split"]
    intensity = strategy["intensity"]

    base_plan = WORKOUT_TEMPLATES.get(split, {})
    final_plan = {}

    for day, sections in base_plan.items():
        final_plan[day] = {}
        for sec, exercises in sections.items():
            final_plan[day][sec] = []
            for ex in exercises:
                final_plan[day][sec].append({
                    "exercise": ex["name"],
                    "sets": ex["sets"],
                    "reps": ex["reps"],
                    "suggested_weight_kg": calculate_weight(
                        user["weight"], ex["base_bw"], intensity
                    )
                })

    return final_plan
