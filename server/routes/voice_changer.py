from fastapi import APIRouter, UploadFile, File, Form
from services.voice_changer import voice_changer_service

router = APIRouter()

@router.post("/voice-changer")
def voice_changer(file: UploadFile = File(...), target_voice: str = Form(...)):
    return voice_changer_service(file, target_voice) 