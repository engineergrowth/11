from fastapi import APIRouter, Form, HTTPException
from starlette.responses import StreamingResponse
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

ELEVEN_API_KEY = os.getenv("ELEVENLABS_API_KEY")
BASE_URL = "https://api.elevenlabs.io"

@router.post("/text-to-speech")
async def text_to_speech(text: str = Form(...), voice_id: str = Form(...)):
    if not ELEVEN_API_KEY:
        raise HTTPException(status_code=500, detail="Missing ElevenLabs API key")

    url = f"{BASE_URL}/v1/text-to-speech/{voice_id}/stream?output_format=mp3_44100_128"

    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2"
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            return StreamingResponse(response.aiter_bytes(), media_type="audio/mpeg")
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Error generating speech: {e}")
