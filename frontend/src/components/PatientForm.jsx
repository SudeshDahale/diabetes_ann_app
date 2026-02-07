import React, { useState } from "react";
import "./PatientForm.css";

export default function PatientForm({ onPrediction }) {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, parseFloat(v)])
    );

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      onPrediction(result);

      setFormData({
        Pregnancies: "",
        Glucose: "",
        BloodPressure: "",
        SkinThickness: "",
        Insulin: "",
        BMI: "",
        DiabetesPedigreeFunction: "",
        Age: "",
      });
    } catch (error) {
      console.error(error);
      alert("Backend error. Make sure it is running!");
    }
  };

  return (
    <div className="patient-form-wrapper">
      <form className="patient-form" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key}</label>
            <input
              type="number"
              step="any"
              name={key}
              placeholder={`Enter ${key}`}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="predict-btn">
          Predict
        </button>
      </form>
    </div>
  );
}
