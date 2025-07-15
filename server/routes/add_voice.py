from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import httpx
from config import ELEVEN_API_KEY

router = APIRouter()

BASE_URL = "https://api.elevenlabs.io"

@router.post("/clone-voice")
async def clone_voice(audio: UploadFile = File(...), new_name: str = Form(...)):
    if not ELEVEN_API_KEY:
        raise HTTPException(status_code=500, detail="Missing ElevenLabs API key")

    files = {
        "files": (audio.filename, await audio.read(), audio.content_type)
    }
    data = {
        "name": new_name,
        "description": "Cloned via ElevenLabs API"
    }
    headers = {
        "xi-api-key": ELEVEN_API_KEY,
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BASE_URL}/v1/voices/add",
                headers=headers,
                data=data,
                files=files
            )
            response.raise_for_status()
        result = response.json()
        return {"voice_id": result.get("voice_id")}
    except httpx.HTTPError as e:
        print("Clone voice error:", e, getattr(e, 'response', None))
        if hasattr(e, 'response') and e.response is not None:
            print("Response text:", await e.response.aread())
        raise HTTPException(status_code=500, detail=f"Failed to clone voice: {str(e)}") 