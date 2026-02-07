import os
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "diabetes_model.h5")
scaler_path = os.path.join(BASE_DIR, "scaler.pkl")

# Load model & scaler
model = load_model(model_path)
scaler = joblib.load(scaler_path)

# Load or initialize CSV
csv_file = os.path.join(BASE_DIR, "patients.csv")
try:
    patients_df = pd.read_csv(csv_file)
except:
    patients_df = pd.DataFrame(columns=["Pregnancies","Glucose","BloodPressure","SkinThickness","Insulin","BMI","DiabetesPedigreeFunction","Age","Outcome"])

# FastAPI setup
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class Patient(BaseModel):
    Pregnancies: float
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: float

@app.post("/predict")
def predict(patient: Patient):
    global patients_df
    data = np.array([[patient.Pregnancies, patient.Glucose, patient.BloodPressure, patient.SkinThickness,
                      patient.Insulin, patient.BMI, patient.DiabetesPedigreeFunction, patient.Age]])
    data_scaled = scaler.transform(data)
    prob = model.predict(data_scaled)[0][0]
    outcome = 1 if prob >= 0.5 else 0
    
    # Append to CSV
    new_row = patient.dict()
    new_row["Outcome"] = outcome
    patients_df = pd.concat([patients_df, pd.DataFrame([new_row])], ignore_index=True)
    patients_df.to_csv(csv_file, index=False)
    
    return {"probability": float(prob), "outcome": outcome}

@app.get("/patients")
def get_patients():
    return patients_df.to_dict(orient="records")
