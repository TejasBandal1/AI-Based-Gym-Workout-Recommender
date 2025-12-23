from . import workout_templates

def build_workout_plan(split, user_weight):
    template = workout_templates.WORKOUT_TEMPLATES.get(split)

    if not template:
        return {}

    final_plan = {}

    for day, sections in template.items():
        final_plan[day] = {}

        for section, items in sections.items():
            if isinstance(items, list):
                processed = []

                for item in items:
                    if isinstance(item, dict):
                        processed.append({
                            "exercise": item["name"],
                            "sets": item["sets"],
                            "reps": item["reps"],
                            "suggested_weight_kg": round(item["base_bw"] * user_weight, 1)
                        })
                    else:
                        processed.append(item)

                final_plan[day][section] = processed
            else:
                final_plan[day][section] = items

    return final_plan
