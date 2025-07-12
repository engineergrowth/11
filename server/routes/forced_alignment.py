from fastapi import APIRouter, UploadFile, File, Form
from services.forced_alignment import forced_alignment_service

router = APIRouter()

@router.post("/forced-alignment")
def forced_alignment(file: UploadFile = File(...), transcript: str = Form(...)):
    return forced_alignment_service(file, transcript) 