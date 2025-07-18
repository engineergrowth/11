from fastapi import APIRouter, UploadFile, File, HTTPException
import httpx
from config import ELEVEN_API_KEY

router = APIRouter()

BASE_URL = "https://api.elevenlabs.io"

@router.post("/speech-to-text")
async def speech_to_text(file: UploadFile = File(...)):
    if not ELEVEN_API_KEY:
        raise HTTPException(status_code=500, detail="Missing ElevenLabs API key")

    form_data = {
        "model_id": (None, "scribe_v1"),
        "file": (file.filename, await file.read(), file.content_type)
    }

    headers = {
        "xi-api-key": ELEVEN_API_KEY,
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BASE_URL}/v1/speech-to-text",
                headers=headers,
                files=form_data
            )
            response.raise_for_status()

        result = response.json()
        return {
            "transcription": result.get("text", ""),
            "language": result.get("language_code"),
            "confidence": result.get("language_probability"),
            "words": result.get("words"),
        }
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to transcribe: {str(e)}")
