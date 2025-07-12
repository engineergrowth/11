from fastapi import APIRouter, UploadFile, File, Form
from services.sound_effects import sound_effects_service

router = APIRouter()

@router.post("/sound-effects")
def sound_effects(file: UploadFile = File(...), effect: str = Form(...)):
    return sound_effects_service(file, effect) 