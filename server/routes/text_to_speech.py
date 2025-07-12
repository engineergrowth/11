from fastapi import APIRouter, Form
from services.text_to_speech import text_to_speech_service

router = APIRouter()

@router.post("/text-to-speech")
def text_to_speech(text: str = Form(...)):
    return text_to_speech_service(text) 