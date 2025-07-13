from fastapi import APIRouter

router = APIRouter()

@router.post("/voices")
def voices():
    # TODO: Integrate with ElevenLabs Voices API
    return {"voices": [
        {"id": "voice1", "name": "Demo Voice 1", "description": "A sample voice."},
        {"id": "voice2", "name": "Demo Voice 2", "description": "Another sample voice."}
    ]} 