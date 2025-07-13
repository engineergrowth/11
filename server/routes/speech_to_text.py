from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/speech-to-text")
def speech_to_text(file: UploadFile = File(...)):
    # TODO: Integrate with ElevenLabs Speech-to-Text API
    return {"transcription": "This is a mock transcription.", "audio_filename": file.filename} 