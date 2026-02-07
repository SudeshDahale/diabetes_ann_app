import React, { useState, useEffect } from "react";
import PatientForm from "./components/PatientForm";
import PatientTable from "./components/PatientTable";
import "./App.css";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [lastPrediction, setLastPrediction] = useState(null);

  const fetchPatients = async () => {
    const res = await fetch("http://127.0.0.1:8000/patients");
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handlePrediction = (result) => {
    setLastPrediction(result);
    fetchPatients();
  };

  return (
    <div className="container">
      <h1>Diabetes Prediction System</h1>
      <PatientForm onPrediction={handlePrediction} />
      {lastPrediction && (
        <div className="prediction-result">
          <strong>Prediction:</strong>{" "}
          {lastPrediction.outcome === 1 ? "Diabetic" : "Non-diabetic"}{" "}
          <span className="probability">
            (Probability: {lastPrediction.probability.toFixed(2)})
          </span>
        </div>
      )}
      <h2>Previous Patients</h2>
      <PatientTable patients={patients} lastPrediction={lastPrediction} />
    </div>
  );
}
