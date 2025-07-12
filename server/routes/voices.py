from fastapi import APIRouter
from services.voices import voices_service

router = APIRouter()

@router.post("/voices")
def voices():
    return voices_service() 