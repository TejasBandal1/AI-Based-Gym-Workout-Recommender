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

      // ✅ CORRECT API CALL (uses Render backend)
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

      {loading && <p style={{ textAlign: "center" }}>Generating workout...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <WorkoutPlan plan={plan} daysPerWeek={daysPerWeek} />
    </>
  );
}
