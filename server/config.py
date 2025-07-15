import os
from dotenv import load_dotenv

load_dotenv()

ELEVEN_API_KEY = os.getenv("ELEVENLABS_API_KEY")
if not ELEVEN_API_KEY:
    raise RuntimeError("Missing ElevenLabs API key. Please set ELEVENLABS_API_KEY in your environment.") 