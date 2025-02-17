from fastapi import FastAPI, HTTPException, Request, Response
from pydantic import HttpUrl
import pandas as pd
from server.dto import Request, Response
import logging
from contextlib import asynccontextmanager
import joblib

class FeatureExtractor:
    def extract():
        return pd.DataFrame()


# Настройка логирования
logging.basicConfig(
    filename="server.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up the server...")
    try:
        app.state.model = joblib.load("model.pkl")
        app.state.feature_extractor = FeatureExtractor()
        logger.info("Model loaded")
    except Exception as e:
        logger.error(f"Failed to load the model: {e}", exc_info=True)
        app.state.model = None
    yield
    logger.info("Shutting down the server...")

app = FastAPI(lifespan=lifespan)



@app.post("/predict", response_model=Response)
async def predict(data: Request):
    model = app.state.model
    if model is None:
        logger.error("Model is not loaded")
        raise HTTPException(status_code=500, detail="Model is not loaded")
    
    try:
        logger.info(f"Received data: {data}")

        data_df = pd.DataFrame(data.model_dump())

        features = app.state.feature_extractor.extract(data_df)
        prediction = model.predict(features)

        response = Response(
            at_least_one=prediction['at_least_one'],
            at_least_two=prediction['at_least_two'],
            at_least_three=prediction['at_least_three']
        )
        logger.info(f"Sending response: {response}")

        return response
    
    except Exception as e:
        logger.error(f"Internal server error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
