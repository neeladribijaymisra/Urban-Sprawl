import io
import os
from pathlib import Path
from typing import Dict

import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from PIL import Image

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "UrbanScope ML API")
MODEL_PATH = Path(os.getenv("MODEL_PATH", "model/urban_model.h5"))
CLASSES = [
    "AnnualCrop",
    "Forest",
    "HerbaceousVegetation",
    "Highway",
    "Industrial",
    "Pasture",
    "PermanentCrop",
    "Residential",
    "River",
    "SeaLake",
]
URBAN_CLASSES = {"Residential", "Industrial", "Highway"}

app = FastAPI(title=APP_NAME, version="0.1.0")

model = None


def load_future_model():
    global model
    if not MODEL_PATH.exists():
        return None

    try:
        from tensorflow.keras.models import load_model

        model = load_model(MODEL_PATH)
        return model
    except Exception:
        model = None
        return None


def preprocess_image(file_bytes: bytes) -> np.ndarray:
    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    image = image.resize((64, 64))
    array = np.asarray(image, dtype=np.float32) / 255.0
    return np.expand_dims(array, axis=0)


def build_dummy_prediction() -> Dict[str, float]:
    return {
        "AnnualCrop": 0.01,
        "Forest": 0.02,
        "HerbaceousVegetation": 0.03,
        "Highway": 0.05,
        "Industrial": 0.12,
        "Pasture": 0.02,
        "PermanentCrop": 0.01,
        "Residential": 0.70,
        "River": 0.02,
        "SeaLake": 0.02,
    }


def build_prediction_response(probabilities: Dict[str, float]):
    predicted_class = max(probabilities, key=probabilities.get)
    confidence = probabilities[predicted_class]
    sprawl_score = sum(probabilities.get(name, 0) for name in URBAN_CLASSES)

    return {
        "predictedClass": predicted_class,
        "confidence": round(confidence, 2),
        "sprawlScore": round(sprawl_score, 2),
        "probabilities": probabilities,
    }


@app.on_event("startup")
async def startup_event():
    load_future_model()


@app.get("/")
async def health_check():
    return {
        "service": APP_NAME,
        "status": "ok",
        "modelLoaded": model is not None,
        "modelPath": str(MODEL_PATH),
    }


@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    file_bytes = await image.read()
    input_batch = preprocess_image(file_bytes)

    if model is not None:
        try:
            predictions = model.predict(input_batch, verbose=0)[0]
            probabilities = {
                label: round(float(predictions[index]), 4)
                for index, label in enumerate(CLASSES)
            }
            return build_prediction_response(probabilities)
        except Exception:
            pass

    return build_prediction_response(build_dummy_prediction())
