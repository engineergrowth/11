from fastapi import APIRouter, Form
from typing import List
from services.conversational_ai import conversational_ai_service

router = APIRouter()

@router.post("/conversational-ai")
def conversational_ai(messages: List[str] = Form(...)):
    return conversational_ai_service(messages) 