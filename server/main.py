import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

from routes import text_to_speech, speech_to_text, voice_changer, voice_isolator, dubbing, sound_effects, voices, forced_alignment, conversational_ai, add_voice

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

# Mount static files for demo audio
app.mount("/static", StaticFiles(directory="static"), name="static")

# Register all routers
app.include_router(text_to_speech.router)
app.include_router(speech_to_text.router)
app.include_router(voice_changer.router)
app.include_router(voice_isolator.router)
app.include_router(dubbing.router)
app.include_router(sound_effects.router)
app.include_router(voices.router)
app.include_router(forced_alignment.router)
app.include_router(conversational_ai.router)
app.include_router(add_voice.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to the ElevenLabs Feature Showcase API!",
        "info": "See /docs for interactive API documentation.",
        "features": [
            "text-to-speech", "speech-to-text", "voice-changer", "voice-isolator", "dubbing", "sound-effects", "voices", "forced-alignment", "conversational-ai"
        ]
    } 