from fastapi import APIRouter, Form, HTTPException
import httpx
import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

router = APIRouter()

ELEVEN_API_KEY = os.getenv("ELEVENLABS_API_KEY")
BASE_URL = "https://api.elevenlabs.io"

@router.post("/design-voice")
async def design_voice(
    voice_description: str = Form(...),
    model_id: str = Form("eleven_multilingual_ttv_v2"),
    text: Optional[str] = Form(None),
    auto_generate_text: str = Form("false"),
    loudness: float = Form(0.5),
    guidance_scale: float = Form(5.0),
    quality: Optional[float] = Form(None)
):
    if not ELEVEN_API_KEY:
        raise HTTPException(status_code=500, detail="Missing ElevenLabs API key")

    url = f"{BASE_URL}/v1/text-to-voice/design"

    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }

    # Convert string to boolean
    auto_generate = auto_generate_text.lower() == "true"

    payload = {
        "voice_description": voice_description,
        "model_id": model_id,
        "auto_generate_text": auto_generate,
        "loudness": loudness,
        "guidance_scale": guidance_scale
    }
    
    if text and text.strip():
        payload["text"] = text
    if quality is not None:
        payload["quality"] = quality

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Error designing voice: {e}") 