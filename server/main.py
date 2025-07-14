import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes import text_to_speech, speech_to_text, sound_effects, add_voice, voice_design

load_dotenv()

app = FastAPI(title="ElevenLabs Feature Showcase API")

# Enable CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register only implemented routers
app.include_router(text_to_speech.router)
app.include_router(speech_to_text.router)
app.include_router(sound_effects.router)
app.include_router(add_voice.router)
app.include_router(voice_design.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to the ElevenLabs Feature Showcase API!",
        "info": "See /docs for interactive API documentation.",
        "features": [
            "text-to-speech", "speech-to-text", "sound-effects", "voice-clone", "design-voice"
        ]
    } 