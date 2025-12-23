import { useState } from "react";
import "./WorkoutUI.css";

const WEEK = {
  monday: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  sunday: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};

export default function WorkoutPlan({ plan, daysPerWeek }) {
  const [startDay, setStartDay] = useState("monday");

  if (!plan || !plan.plan || !daysPerWeek) {
    return (
      <div className="card muted">
        <h2>No Workout Generated</h2>
        <p>Fill the form above to get your personalized plan.</p>
      </div>
    );
  }

  const weekDays = WEEK[startDay];
  const workoutEntries = Object.entries(plan.plan);

  // Progression note
  const progressionNote =
    plan.split === "FullBody"
      ? "💡 Focus on form this week. Increase reps before adding weight."
      : "📈 If all reps feel comfortable, increase weight by 2.5–5 kg next week.";

  // Build weekly schedule
  let workoutIndex = 0;
  let renderedWorkoutDays = 0;

  const weeklySchedule = weekDays.map((dayName) => {
    if (renderedWorkoutDays < daysPerWeek) {
      const workout = workoutEntries[workoutIndex % workoutEntries.length];
      workoutIndex++;
      renderedWorkoutDays++;
      return { dayName, workout };
    }
    return { dayName, workout: null }; // rest day
  });

  return (
    <div className="card workout-card">
      {/* Header */}
      <div className="workout-header">
        <h2>{plan.split} Weekly Workout Plan</h2>

        <div className="workout-meta">
          <span>🔥 Intensity: {plan.intensity}</span>
          <span>📊 Volume: {plan.volume}</span>
          <span>✅ Confidence: {(plan.confidence * 100).toFixed(0)}%</span>
        </div>

        {/* Start day selector */}
        <div className="start-day-toggle">
          <span>Week starts on:</span>
          <button
            className={startDay === "monday" ? "active" : ""}
            onClick={() => setStartDay("monday")}
          >
            Monday
          </button>
          <button
            className={startDay === "sunday" ? "active" : ""}
            onClick={() => setStartDay("sunday")}
          >
            Sunday
          </button>
        </div>

        {/* Progression note */}
        <div className="progression-note">
          {progressionNote}
        </div>
      </div>

      {/* Weekly calendar */}
      {weeklySchedule.map(({ dayName, workout }, index) => {
        if (!workout) {
          return (
            <div key={dayName} className="day-block rest-day">
              <h3>{dayName}</h3>
              <p className="rest-text">🧘 Rest / Active Recovery</p>
            </div>
          );
        }

        const [focus, sections] = workout;

        return (
          <div key={dayName} className="day-block">
            <div className="day-header">
              <div className="day-badge">Day {index + 1}</div>
              <h3 className="day-title">{dayName} – {focus}</h3>
            </div>

            {Object.entries(sections).map(([section, items]) => (
              <div key={section} className="section-block">
                <h4 className="section-title">{section}</h4>

                {Array.isArray(items) && (
                  <div className="exercise-list">
                    {items.map((item, idx) =>
                      typeof item === "string" ? (
                        <div key={idx} className="text-item">{item}</div>
                      ) : (
                        <div key={idx} className="exercise-card">
                          <div className="exercise-name">{item.exercise}</div>
                          <div className="exercise-details">
                            {item.sets} × {item.reps}
                            <span className="weight">@ {item.suggested_weight_kg} kg</span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {typeof items === "string" && (
                  <div className="text-item">{items}</div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
