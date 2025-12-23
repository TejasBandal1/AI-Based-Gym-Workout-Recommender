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
      setDaysPerWeek(Number(formData.days));

      const res = await api.post("/predict/", formData);
      setPlan(res.data);
    } catch (err) {
      setError("Failed to generate workout plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InputForm onSubmit={generatePlan} />

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Building your personalized workout 💪</p>
        </div>
      )}

      {error && <p className="error center">{error}</p>}

      <WorkoutPlan plan={plan} daysPerWeek={daysPerWeek} />
    </>
  );
}
