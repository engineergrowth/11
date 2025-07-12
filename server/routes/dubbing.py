from fastapi import APIRouter, UploadFile, File, Form
from services.dubbing import dubbing_service

router = APIRouter()

@router.post("/dubbing")
def dubbing(file: UploadFile = File(...), target_language: str = Form(...)):
    return dubbing_service(file, target_language) 