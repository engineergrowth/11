# ElevenLabs Audio Explorer

**A comprehensive showcase of ElevenLabs AI audio features built with modern web technologies.**

🌐 **Live Demo**: [https://elevenlabs-demo.netlify.app/](https://elevenlabs-demo.netlify.app/)

> **Disclaimer:** This project is not affiliated with ElevenLabs, nor is it an official ElevenLabs product. It is an independent demo created for educational and exploratory purposes only.

## 🎯 Project Overview

This project demonstrates the full range of ElevenLabs' AI audio capabilities through an intuitive web interface. It showcases how to integrate ElevenLabs APIs into a modern web application with proper error handling, user feedback, and responsive design.

## ✨ Features

### 🎤 Text-to-Speech
- Convert text to natural-sounding speech using ElevenLabs' premium voices
- Multiple voice options (Sarah, Callum, River, Matilda, Eric)
- Real-time audio generation and playback
- Support for custom text input

### 🎙️ Speech-to-Text
- Transcribe audio files or live recordings to text
- Support for multiple audio formats
- Live recording with microphone permission handling
- Clean, formatted text output with copy functionality

### 🎭 Voice Cloning
- Create custom AI voices from your own recordings
- Record 1-3 minutes of audio for optimal results
- Real-time recording with timer and visual feedback
- Use cloned voices for text-to-speech generation
- Comprehensive error handling for microphone permissions

### 🎨 Voice Design
- Generate custom voices using natural language descriptions
- Adjustable parameters: loudness, guidance scale, quality
- Auto-generate preview text or use custom text
- Multiple voice previews with audio playback
- Download generated voice samples

### 🔊 Sound Effects
- Generate custom sound effects from text descriptions
- Adjustable duration (1-10 seconds)
- Configurable prompt influence for creative control
- Download generated audio files
- Perfect for game development, podcasts, and multimedia projects

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful, accessible components
- **Lucide React** for icons

### Backend
- **FastAPI** for high-performance API
- **Uvicorn** as ASGI server
- **httpx** for async HTTP requests
- **Python-dotenv** for environment management
- **CORS middleware** for cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- ElevenLabs API key ([Get one here](https://elevenlabs.io/))

### Backend Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create environment file:**
   ```bash
   cp .env.example .env  # If .env.example exists
   # Or create .env manually with:
   echo "ELEVENLABS_API_KEY=your_api_key_here" > .env
   ```

5. **Start the development server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at `http://localhost:8000` with interactive docs at `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file with:
   echo "VITE_API_URL=http://localhost:8000" > .env
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
elevenlabs-audio-explorer/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Feature pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── TextToSpeech.tsx
│   │   │   ├── SpeechToText.tsx
│   │   │   ├── VoiceClone.tsx
│   │   │   ├── VoiceDesign.tsx
│   │   │   └── SoundEffects.tsx
│   │   ├── components/    # Reusable UI components
│   │   └── ...
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Backend FastAPI application
│   ├── routes/           # API route handlers
│   │   ├── text_to_speech.py
│   │   ├── speech_to_text.py
│   │   ├── add_voice.py
│   │   ├── voice_design.py
│   │   └── sound_effects.py
│   ├── main.py           # FastAPI application entry
│   └── requirements.txt
└── README.md
```

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/text-to-speech` | POST | Convert text to speech with specified voice |
| `/speech-to-text` | POST | Transcribe audio file to text |
| `/clone-voice` | POST | Create custom voice from audio sample |
| `/design-voice` | POST | Generate custom voice from description |
| `/sound-effects` | POST | Generate sound effects from text |

## 🚀 Deployment

### Backend Deployment (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variable: `ELEVENLABS_API_KEY`
3. Railway will automatically detect the Python app and deploy

### Frontend Deployment (Netlify)
1. Connect your GitHub repository to Netlify
2. Set build command: `cd client && npm install && npm run build`
3. Set publish directory: `client/dist`
4. Set environment variable: `VITE_API_URL` to your Railway backend URL

## 🔒 Environment Variables

### Backend (.env)
```env
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000  # Development
VITE_API_URL=https://your-backend.railway.app  # Production
```

## 🎨 Features in Detail

### Text-to-Speech
- **Purpose**: Convert written text into natural-sounding speech
- **Use Cases**: Content creation, accessibility, audiobooks, podcasts
- **Voices**: Sarah, Callum, River, Matilda, Eric
- **Features**: Real-time generation, audio playback, multiple voice options

### Speech-to-Text
- **Purpose**: Convert spoken audio into written text
- **Use Cases**: Meeting transcripts, content creation, accessibility
- **Features**: File upload, live recording, microphone permission handling
- **Formats**: Supports multiple audio formats (MP3, WAV, M4A, etc.)

### Voice Cloning
- **Purpose**: Create AI versions of your own voice
- **Use Cases**: Content creation, personal AI assistants, voice preservation
- **Requirements**: 1-3 minutes of clear audio recording
- **Features**: Real-time recording, timer, permission error handling

### Voice Design
- **Purpose**: Generate custom voices using natural language descriptions
- **Use Cases**: Creative projects, character voices, unique audio content
- **Parameters**: Loudness, guidance scale, quality settings
- **Features**: Multiple previews, audio playback, download functionality

### Sound Effects
- **Purpose**: Generate custom sound effects from text descriptions
- **Use Cases**: Game development, multimedia projects, audio content
- **Parameters**: Duration, prompt influence
- **Features**: Real-time generation, download functionality

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ElevenLabs](https://elevenlabs.io/) for providing the amazing AI audio APIs
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the fast build tool
- [FastAPI](https://fastapi.tiangolo.com/) for the modern Python web framework


---

**Note**: This is a demonstration project. For production use, ensure proper error handling, rate limiting, and security measures are implemented.

