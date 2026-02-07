import React from "react";
import "./PatientTable.css";

export default function PatientTable({ patients, lastPrediction }) {
  if (!patients || patients.length === 0)
    return <p>No patient records available.</p>;

  const headers = Object.keys(patients[0]);
  const lastOutcome = lastPrediction ? lastPrediction.outcome : null;

  return (
    <div className="table-wrapper">
      <table className="patient-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, idx) => {
            const isLast =
              lastPrediction &&
              patient.Outcome === lastOutcome &&
              idx === patients.length - 1;
            return (
              <tr key={idx} className={isLast ? "highlight-row" : ""}>
                {headers.map((header) => (
                  <td key={header}>{patient[header]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
