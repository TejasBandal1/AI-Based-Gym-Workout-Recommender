import "./WorkoutUI.css";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WorkoutPlan({ plan, daysPerWeek }) {
  const pdfRef = useRef();

  if (!plan || !plan.plan || !daysPerWeek) {
    return (
      <div className="card muted">
        <h2>No Workout Yet</h2>
        <p>Fill in your details to generate a personalized plan.</p>
      </div>
    );
  }

  const workoutEntries = Object.entries(plan.plan);
  let workoutIndex = 0;
  let renderedWorkoutDays = 0;

  const weeklySchedule = DAYS.map((day) => {
    if (renderedWorkoutDays < daysPerWeek) {
      const workout = workoutEntries[workoutIndex % workoutEntries.length];
      workoutIndex++;
      renderedWorkoutDays++;
      return { day, workout };
    }
    return { day, workout: null };
  });

  /* =========================
     PDF DOWNLOAD HANDLER
     ========================= */
  const downloadPDF = () => {
    const element = pdfRef.current;

    const options = {
      margin: 0.4,
      filename: `Workout_Plan_${plan.split}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="card workout-card">
      {/* HEADER + DOWNLOAD */}
      <div className="workout-header spaced">
        <div>
          <h2>{plan.split} Training Plan</h2>
          <p className="subtitle">
            Train with intent. Prioritize form, consistency, and recovery.
          </p>
        </div>

        <button className="primary-btn" onClick={downloadPDF}>
          ⬇ Download Plan (PDF)
        </button>
      </div>

      {/* THIS PART WILL BE CONVERTED TO PDF */}
      <div ref={pdfRef}>
        <div className="week-grid">
          {weeklySchedule.map(({ day, workout }, idx) => {
            if (!workout) {
              return (
                <div key={day} className="day-card rest">
                  <h3>{day}</h3>
                  <p>🧘 Active recovery & mobility</p>
                </div>
              );
            }

            const [focus, sections] = workout;

            return (
              <div key={day} className="day-card">
                <div className="day-top">
                  <span className="day-pill">Day {idx + 1}</span>
                  <h3>{day}</h3>
                  <p className="day-focus">{focus}</p>
                </div>

                {Object.entries(sections).map(([section, items]) => (
                  <div key={section} className="section">
                    <h4>{section}</h4>

                    {Array.isArray(items) &&
                      items.map((item, i) =>
                        typeof item === "string" ? (
                          <div key={i} className="text-row">
                            {item}
                          </div>
                        ) : (
                          <div key={i} className="exercise-row">
                            <div className="exercise-name">
                              {item.exercise}
                            </div>

                            <div className="exercise-breakdown">
                              <span>
                                <strong>Sets:</strong> {item.sets}
                              </span>

                              <span>
                                <strong>Reps:</strong> {item.reps}
                              </span>

                              {item.weights_per_set_kg ? (
                                <span className="weight-multi">
                                  <strong>Working Weights:</strong>
                                  {item.weights_per_set_kg.map((w, idx) => (
                                    <em key={idx}>
                                      Set {idx + 1}: {w}kg
                                    </em>
                                  ))}
                                </span>
                              ) : (
                                <span>
                                  <strong>Suggested Working Weight:</strong>{" "}
                                  {item.suggested_weight_kg} kg
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      )}

                    {typeof items === "string" && (
                      <div className="text-row">{items}</div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
