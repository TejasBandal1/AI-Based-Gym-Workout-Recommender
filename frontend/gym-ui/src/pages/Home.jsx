import { useState } from "react";
import InputForm from "../components/InputForm";
import WorkoutPlan from "../components/WorkoutPlan";

export default function Home() {
  const [plan, setPlan] = useState(null);
  const [daysPerWeek, setDaysPerWeek] = useState(0);

  const generatePlan = async (formData) => {
    setDaysPerWeek(Number(formData.days));

    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    setPlan(result);
  };

  return (
    <>
      <InputForm onSubmit={generatePlan} />
      <WorkoutPlan plan={plan} daysPerWeek={daysPerWeek} />
    </>
  );
}
