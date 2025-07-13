from fastapi import APIRouter, Form, Response
import requests
from starlette.responses import StreamingResponse
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

ELEVEN_API_KEY = os.getenv("ELEVENLABS_API_KEY")
BASE_URL = "https://api.elevenlabs.io"

@router.post("/text-to-speech")
def text_to_speech(text: str = Form(...), voice_id: str = Form(...)):
    url = f"{BASE_URL}/v1/text-to-speech/{voice_id}/stream?output_format=mp3_44100_128"

    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2"
    }

    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, headers=headers, json=payload, stream=True)
        response.raise_for_status()
        return StreamingResponse(response.raw, media_type="audio/mpeg")
    except requests.exceptions.RequestException as e:
        return Response(content=f"Error generating speech: {str(e)}", status_code=500)
