import { useState } from "react";
import "./WorkoutUI.css";

const initialForm = {
  age: "",
  weight: "",
  height: "",
  body_fat_category: "medium",
  goal: "muscle_gain",
  experience: "beginner",
  training_age_years: "",
  days: "",
  progress_feedback: "new",
  recovery_score: "average",
  cardio_preference: "moderate",
  core_focus: "moderate",
};

export default function InputForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.age || !form.weight || !form.height || !form.days) {
      setError("Please fill all required fields.");
      return;
    }

    if (form.days < 1 || form.days > 7) {
      setError("Workout days must be between 1 and 7.");
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="card">
      <h1 className="title">Personalized Workout Generator</h1>
      <p className="subtitle">
        Fill your fitness details and get a smart AI-based workout plan
      </p>

      <form className="form-grid" onSubmit={handleSubmit}>
        <Field label="Age" name="age" value={form.age} onChange={handleChange} />
        <Field label="Weight (kg)" name="weight" value={form.weight} onChange={handleChange} />
        <Field label="Height (meters)" name="height" value={form.height} onChange={handleChange} />

        <Select label="Body Fat Level" name="body_fat_category" value={form.body_fat_category}
          onChange={handleChange} options={["low", "medium", "high"]} />

        <Select label="Goal" name="goal" value={form.goal}
          onChange={handleChange} options={["muscle_gain", "weight_loss"]} />

        <Select label="Experience Level" name="experience" value={form.experience}
          onChange={handleChange} options={["beginner", "intermediate", "advanced"]} />

        <Field label="Training Age (years)" name="training_age_years"
          value={form.training_age_years} onChange={handleChange} />

        <Field label="Workout Days / Week" name="days"
          value={form.days} onChange={handleChange} />

        <Select label="Progress Feedback" name="progress_feedback"
          value={form.progress_feedback} onChange={handleChange}
          options={["new", "poor", "good", "excellent", "easy"]} />

        <Select label="Recovery Quality" name="recovery_score"
          value={form.recovery_score} onChange={handleChange}
          options={["poor", "average", "good"]} />

        <Select label="Cardio Preference" name="cardio_preference"
          value={form.cardio_preference} onChange={handleChange}
          options={["low", "moderate", "high"]} />

        <Select label="Core Focus" name="core_focus"
          value={form.core_focus} onChange={handleChange}
          options={["low", "moderate", "high"]} />

        {error && <p className="error">{error}</p>}

        <button className="primary-btn" type="submit">
          Generate Workout Plan
        </button>
      </form>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type="number" {...props} />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o.replace("_", " ").toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
