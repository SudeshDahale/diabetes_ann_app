# Diabetes Prediction System

A full-stack web application leveraging Artificial Neural Networks (ANN) to predict diabetes risk based on patient health metrics. The system provides real-time predictions with probability scores and maintains a comprehensive patient history database.

## 🔬 Overview

This application utilizes a trained deep learning model to assess diabetes risk using eight key health indicators. Built with a FastAPI backend and React frontend, the system offers healthcare professionals and researchers a practical tool for preliminary diabetes screening and data collection.

## ✨ Features

- **Real-time Predictions**: Instant diabetes risk assessment using a pre-trained ANN model
- **Probability Scoring**: Detailed confidence metrics for each prediction
- **Patient History Tracking**: Automatic storage and retrieval of all patient assessments
- **Interactive Dashboard**: Clean, intuitive interface for data entry and results visualization
- **RESTful API**: Well-documented endpoints for seamless integration

## 🏗️ Architecture

### Backend
- **Framework**: FastAPI
- **ML Model**: TensorFlow/Keras ANN (diabetes_model.h5)
- **Data Processing**: NumPy, Pandas, scikit-learn (StandardScaler)
- **Storage**: CSV-based patient database
- **API**: CORS-enabled REST endpoints

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Custom CSS
- **Components**: Modular design with PatientForm and PatientTable

## 📊 Input Parameters

The model evaluates the following health metrics:

| Parameter | Description |
|-----------|-------------|
| **Pregnancies** | Number of pregnancies |
| **Glucose** | Plasma glucose concentration (mg/dL) |
| **Blood Pressure** | Diastolic blood pressure (mm Hg) |
| **Skin Thickness** | Triceps skin fold thickness (mm) |
| **Insulin** | 2-Hour serum insulin (mu U/ml) |
| **BMI** | Body Mass Index (weight in kg/(height in m)²) |
| **Diabetes Pedigree Function** | Genetic predisposition score |
| **Age** | Patient age (years) |

## 🚀 Installation

### Prerequisites

- **Python**: 3.8 or higher
- **Node.js**: 16.x or higher
- **npm**: 8.x or higher

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`

## 📡 API Endpoints

### POST `/predict`
Predict diabetes risk for a patient.

**Request Body:**
```json
{
  "Pregnancies": 6,
  "Glucose": 148,
  "BloodPressure": 72,
  "SkinThickness": 35,
  "Insulin": 0,
  "BMI": 33.6,
  "DiabetesPedigreeFunction": 0.627,
  "Age": 50
}
```

**Response:**
```json
{
  "probability": 0.7456,
  "outcome": 1
}
```

### GET `/patients`
Retrieve all patient records.

**Response:**
```json
[
  {
    "Pregnancies": 6,
    "Glucose": 148,
    "BloodPressure": 72,
    "SkinThickness": 35,
    "Insulin": 0,
    "BMI": 33.6,
    "DiabetesPedigreeFunction": 0.627,
    "Age": 50,
    "Outcome": 1
  }
]
```

## 📁 Project Structure

```
diabetes_ann_app/
│
├── backend/
│   ├── main.py                    # FastAPI application
│   ├── diabetes_model.h5          # Trained ANN model
│   ├── scaler.pkl                 # StandardScaler for preprocessing
│   ├── patients.csv               # Patient history database
│   └── requirements.txt           # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                # Main application component
│   │   ├── components/
│   │   │   ├── PatientForm.jsx    # Input form component
│   │   │   └── PatientTable.jsx   # Results display component
│   │   └── main.jsx               # Application entry point
│   ├── package.json               # Node.js dependencies
│   └── vite.config.js             # Vite configuration
│
└── README.md
```

## 🔍 Model Information

The application uses a pre-trained Artificial Neural Network model (`diabetes_model.h5`) designed for binary classification. Key characteristics:

- **Input Features**: 8 normalized health metrics
- **Output**: Binary classification (diabetic/non-diabetic)
- **Threshold**: 0.5 probability cutoff
- **Preprocessing**: StandardScaler normalization

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Backend Framework** | FastAPI |
| **Machine Learning** | TensorFlow, Keras |
| **Data Processing** | NumPy, Pandas, scikit-learn |
| **Frontend Framework** | React 19 |
| **Build Tool** | Vite |
| **API Communication** | Fetch API |
| **Data Storage** | CSV |

## 🔐 CORS Configuration

The backend is configured to accept requests from all origins for development purposes:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)
```

⚠️ **Note**: Restrict `allow_origins` to specific domains in production environments.

## 📈 Future Enhancements

- [ ] Database migration (PostgreSQL/MongoDB)
- [ ] User authentication and authorization
- [ ] Advanced data visualization and analytics
- [ ] Model retraining capabilities
- [ ] Export functionality (PDF reports)
- [ ] Multi-language support
- [ ] Mobile application

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available for educational and research purposes.

## 👤 Author

**Sudesh Dahale**

## 🙏 Acknowledgments

- Dataset source: Pima Indians Diabetes Database
- TensorFlow and Keras communities
- FastAPI and React development teams

## ⚠️ Disclaimer

This application is designed for educational and research purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

---

**Version**: 1.0.0  
**Last Updated**: 2024
