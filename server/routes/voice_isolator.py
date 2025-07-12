from fastapi import APIRouter, UploadFile, File
from services.voice_isolator import voice_isolator_service

router = APIRouter()

@router.post("/voice-isolator")
def voice_isolator(file: UploadFile = File(...)):
    return voice_isolator_service(file) 