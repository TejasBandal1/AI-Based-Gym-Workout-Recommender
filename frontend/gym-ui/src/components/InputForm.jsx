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

    if (Number(form.days) < 1 || Number(form.days) > 7) {
      setError("Workout days must be between 1 and 7.");
      return;
    }

    const payload = {
      age: Number(form.age),
      weight: Number(form.weight),
      height: Number(form.height),
      body_fat_category: form.body_fat_category,
      goal: form.goal,
      experience: form.experience,
      training_age_years: Number(form.training_age_years || 0),
      days: Number(form.days),
      progress_feedback: form.progress_feedback,
      recovery_score: form.recovery_score,
      cardio_preference: form.cardio_preference,
      core_focus: form.core_focus,
    };

    onSubmit(payload);
  };

  return (
    <div className="card">
      <h1 className="title">AI Workout Generator</h1>
      <p className="subtitle">Science-based workouts tailored to your body & goals</p>

      <form className="form-grid" onSubmit={handleSubmit}>

        <div className="form-section">
          <h3>👤 Body Metrics</h3>
          <p className="section-hint">Used to calculate volume and load</p>

          <Field label="Age" name="age" value={form.age} onChange={handleChange} />
          <Field label="Weight (kg)" name="weight" value={form.weight} onChange={handleChange} />
          <Field label="Height (meters)" name="height" value={form.height} onChange={handleChange} />
        </div>

        <div className="form-section">
          <h3>🎯 Goal</h3>

          <Select label="Primary Goal" name="goal" value={form.goal} onChange={handleChange}
            options={["muscle_gain", "weight_loss"]} />

          <Select label="Body Fat Level" name="body_fat_category" value={form.body_fat_category}
            onChange={handleChange} options={["low", "medium", "high"]} />
        </div>

        <div className="form-section">
          <h3>💪 Training Background</h3>

          <Select label="Experience Level" name="experience" value={form.experience}
            onChange={handleChange} options={["beginner", "intermediate", "advanced"]} />

          <Field label="Training Age (years)" name="training_age_years"
            value={form.training_age_years} onChange={handleChange} />

          <Field label="Workout Days / Week" name="days"
            value={form.days} onChange={handleChange} />
        </div>

        <div className="form-section">
          <h3>⚙️ Preferences</h3>

          <Select label="Recovery Quality" name="recovery_score"
            value={form.recovery_score} onChange={handleChange}
            options={["poor", "average", "good"]} />

          <Select label="Cardio Preference" name="cardio_preference"
            value={form.cardio_preference} onChange={handleChange}
            options={["low", "moderate", "high"]} />

          <Select label="Core Focus" name="core_focus"
            value={form.core_focus} onChange={handleChange}
            options={["low", "moderate", "high"]} />
        </div>

        {error && <p className="error">{error}</p>}

        <button className="primary-btn large" type="submit">
          🔥 Generate My AI Workout
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
