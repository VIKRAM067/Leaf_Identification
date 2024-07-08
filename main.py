from fastapi import FastAPI, File, UploadFile, HTTPException, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from starlette.responses import FileResponse
import os

app = FastAPI()

# Allow CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:8000",
    "http://localhost:5173",
    "https://finalproject0-60526.web.app/"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





# Serve HTML templates


MODEL_PATH = os.getenv("MODEL_PATH")
MODEL = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = ["Apta", "Karanj", "Nilgiri", "SitaAshok", "peepal"]





def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict/")
async def predict( file: UploadFile):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    predictions = MODEL.predict(img_batch)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])

    return {"class": predicted_class, "confidence": float(confidence)}


"""
@app.post('/uploadfile/')
async def create_upload_file(file_upload:UploadFile):
    return {"filename": file_upload.filename}   """

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=443, ssl_keyfile="path/to/ssl/private/key.pem", ssl_certfile="path/to/ssl/certificate.pem")
