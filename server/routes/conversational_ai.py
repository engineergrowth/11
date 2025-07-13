from fastapi import APIRouter, Form
from typing import List

router = APIRouter()

@router.post("/conversational-ai")
def conversational_ai(messages: List[str] = Form(...)):
    # TODO: Integrate with ElevenLabs Conversational AI API
    return {"response": "This is a mock conversational AI reply.", "messages": messages} 