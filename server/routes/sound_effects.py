from fastapi import APIRouter, Form, HTTPException
from starlette.responses import StreamingResponse
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

ELEVEN_API_KEY = os.getenv("ELEVENLABS_API_KEY")
BASE_URL = "https://api.elevenlabs.io"

@router.post("/sound-effects")
async def sound_effects(text: str = Form(...), duration_seconds: float = Form(None), prompt_influence: float = Form(0.3)):
    if not ELEVEN_API_KEY:
        raise HTTPException(status_code=500, detail="Missing ElevenLabs API key")

    url = f"{BASE_URL}/v1/sound-generation"

    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "text": text,
        "prompt_influence": prompt_influence
    }
    
    if duration_seconds:
        payload["duration_seconds"] = duration_seconds

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            return StreamingResponse(response.aiter_bytes(), media_type="audio/mpeg")
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Error generating sound effect: {e}") 