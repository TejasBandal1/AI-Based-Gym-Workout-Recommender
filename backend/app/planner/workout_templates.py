WORKOUT_TEMPLATES = {

    "PPL": {
        "Push": {
            "Warm-up": [
                "5–7 min treadmill or skipping",
                "Band chest openers – 2×15",
                "Shoulder mobility drills"
            ],
            "Workout": [
                {"name": "Barbell Bench Press", "sets": 4, "reps": "6–8", "base_bw": 0.7},
                {"name": "Incline Dumbbell Press", "sets": 3, "reps": "8–10", "base_bw": 0.3},
                {"name": "Overhead Shoulder Press", "sets": 3, "reps": "8–10", "base_bw": 0.45},
                {"name": "Lateral Raises", "sets": 3, "reps": "12–15", "base_bw": 0.15},
                {"name": "Triceps Pushdown", "sets": 3, "reps": "10–12", "base_bw": 0.25}
            ],
            "Finisher": "Push-ups – 2 sets to failure"
        },

        "Pull": {
            "Warm-up": [
                "5 min rowing machine",
                "Band pull-aparts – 2×20"
            ],
            "Workout": [
                {"name": "Deadlift", "sets": 4, "reps": "5–6", "base_bw": 1.2},
                {"name": "Lat Pulldown", "sets": 3, "reps": "8–10", "base_bw": 0.6},
                {"name": "Seated Cable Row", "sets": 3, "reps": "10–12", "base_bw": 0.6},
                {"name": "Face Pulls", "sets": 3, "reps": "12–15", "base_bw": 0.25},
                {"name": "Barbell Curl", "sets": 3, "reps": "10–12", "base_bw": 0.25}
            ],
            "Finisher": "Hammer curls – 2×15"
        }
    },

    "FullBody": {
        "Full Body": {
            "Warm-up": [
                "5–7 min treadmill walk",
                "Dynamic stretching"
            ],
            "Workout": [
                {"name": "Goblet Squat", "sets": 3, "reps": "10–12", "base_bw": 0.3},
                {"name": "Chest Press Machine", "sets": 3, "reps": "10–12", "base_bw": 0.35},
                {"name": "Lat Pulldown", "sets": 3, "reps": "10–12", "base_bw": 0.4}
            ],
            "Finisher": "Light stretching – 5 min"
        }
    },

    "UpperLower": {
        "Upper": {
            "Warm-up": [
                "5 min rowing machine",
                "Band pull-aparts – 2×20"
            ],
            "Workout": [
                {"name": "Barbell Bench Press", "sets": 4, "reps": "8–10", "base_bw": 0.65},
                {"name": "Lat Pulldown", "sets": 3, "reps": "10–12", "base_bw": 0.5},
                {"name": "Seated Shoulder Press", "sets": 3, "reps": "10–12", "base_bw": 0.4}
            ],
            "Finisher": "Push-ups – 2 sets to failure"
        },

        "Lower": {
            "Warm-up": [
                "8 min cycling"
            ],
            "Workout": [
                {"name": "Barbell Back Squat", "sets": 4, "reps": "8–10", "base_bw": 0.9},
                {"name": "Romanian Deadlift", "sets": 3, "reps": "10–12", "base_bw": 0.8}
            ],
            "Finisher": "Walking lunges – 2×20 steps"
        }
    }
}
