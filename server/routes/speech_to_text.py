from fastapi import APIRouter, UploadFile, File
from services.speech_to_text import speech_to_text_service

router = APIRouter()

@router.post("/speech-to-text")
def speech_to_text(file: UploadFile = File(...)):
    return speech_to_text_service(file) 