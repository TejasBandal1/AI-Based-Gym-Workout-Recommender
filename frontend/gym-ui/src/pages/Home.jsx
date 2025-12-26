import { useState } from "react";
import InputForm from "../components/InputForm";
import WorkoutPlan from "../components/WorkoutPlan";
import { api } from "../services/api";

export default function Home() {
  const [plan, setPlan] = useState(null);
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePlan = async (formData) => {
    try {
      setLoading(true);
      setError("");
      setPlan(null); // reset previous plan
      setDaysPerWeek(Number(formData.days));

      const res = await api.post("/predict/", formData);
      setPlan(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate workout plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InputForm onSubmit={generatePlan} />

      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="loader-spinner"></div>
            <p className="loader-text">
              Building your personalized workout… 💪
            </p>
            <span className="loader-sub">
              Analyzing fitness profile, recovery & training level
            </span>
          </div>
        </div>
      )}

      {error && <p className="error center">{error}</p>}

      <WorkoutPlan plan={plan} daysPerWeek={daysPerWeek} />
    </>
  );
}
