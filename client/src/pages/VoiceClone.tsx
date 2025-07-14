import { useState, useRef } from "react";
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Upload, FileAudio, Copy } from "lucide-react";

export function VoiceClone() {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceName, setVoiceName] = useState("");
  const [text, setText] = useState("");
  const [voiceId, setVoiceId] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [step, setStep] = useState<'record' | 'cloned'>('record');
  const [attemptedRecord, setAttemptedRecord] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const MIN_SECONDS = 60;
  const MAX_SECONDS = 180;

  const handleRecording = async () => {
    setAttemptedRecord(true);
    if (isRecording) {
      mediaRecorder?.stop();
      setIsRecording(false);
      setPermissionError(null);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (!voiceName.trim()) return;
      try {
        setPermissionError(null);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/webm" });
          setRecordedBlob(blob);
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          // Stop all tracks to release the microphone
          stream.getTracks().forEach(track => track.stop());
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
        setTimer(0);
        timerRef.current = setInterval(() => {
          setTimer((t) => {
            if (t + 1 >= MAX_SECONDS) {
              recorder.stop();
              setIsRecording(false);
              if (timerRef.current) clearInterval(timerRef.current);
              return MAX_SECONDS;
            }
            return t + 1;
          });
        }, 1000);
      } catch (error) {
        console.error("Microphone access error:", error);
        if (error instanceof Error) {
          if (error.name === 'NotAllowedError') {
            setPermissionError("Microphone access was denied. Please allow microphone permissions in your browser and try again.");
          } else if (error.name === 'NotFoundError') {
            setPermissionError("No microphone found. Please connect a microphone and try again.");
          } else if (error.name === 'NotReadableError') {
            setPermissionError("Microphone is already in use by another application. Please close other apps using the microphone.");
          } else {
            setPermissionError(`Microphone error: ${error.message}`);
          }
        } else {
          setPermissionError("An unexpected error occurred while accessing the microphone.");
        }
      }
    }
  };

  const handleClone = async () => {
    if (!recordedBlob || !voiceName || timer < 30) return;
    const formData = new FormData();
    formData.append("audio", recordedBlob, "voice.webm");
    formData.append("new_name", voiceName);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/clone-voice`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setVoiceId(data.voice_id);
    setStep('cloned');
  };

  const handleGenerateSpeech = async () => {
    if (!voiceId || !text) return;
    const formData = new FormData();
    formData.append("text", text);
    formData.append("voice_id", voiceId);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/text-to-speech`, {
      method: "POST",
      body: formData,
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  const handleReset = () => {
    setIsRecording(false);
    setVoiceName("");
    setText("");
    setVoiceId("");
    setMediaRecorder(null);
    setRecordedBlob(null);
    setAudioUrl(null);
    setTimer(0);
    setStep('record');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const demoComponent = (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Voice Name</label>
        <Input
          value={voiceName}
          onChange={(e) => setVoiceName(e.target.value)}
          placeholder="Enter a name for your voice"
          disabled={!!recordedBlob || !!voiceId}
        />
      </div>

      {step === 'record' && (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground mb-2">
            Please record at least <b>1 minute</b> and up to <b>3 minutes</b> of your voice for best results.
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleRecording} 
              variant={isRecording ? "destructive" : "default"}
              disabled={!voiceName.trim()}
            >
              <Mic className={`w-4 h-4 mr-2 ${isRecording ? "animate-pulse" : ""}`} />
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
            {isRecording && <span className="text-sm font-mono">{timer}s</span>}
            {!isRecording && timer > 0 && (
              <span className="text-xs text-muted-foreground">{Math.floor(timer/60)}:{(timer%60).toString().padStart(2, '0')} (min 1 min, max 3 min)</span>
            )}
            {timer > 0 && (
              <Button variant="outline" size="sm" onClick={handleReset}>
                Start Over
              </Button>
            )}
          </div>
          {permissionError && (
            <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="space-y-2">
                  <span className="text-red-400 font-medium">Microphone Permission Error</span>
                  <p className="text-red-300 text-sm leading-relaxed">{permissionError}</p>
                  <div className="text-xs text-red-300/80 space-y-1">
                    <p><strong>How to fix:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Click the microphone icon in your browser's address bar</li>
                      <li>Select "Allow" for microphone access</li>
                      <li>Refresh the page and try again</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!voiceName.trim() && attemptedRecord && (
            <div className="text-xs text-red-500">Please enter a voice name before recording.</div>
          )}
          {recordedBlob && (
            <div className="space-y-2">
              <audio controls src={audioUrl!} className="w-full" />
              <Button onClick={handleClone} disabled={timer < MIN_SECONDS || !voiceName}>
                <Upload className="w-4 h-4 mr-2" />
                Clone Voice (min 1 min, max 3 min)
              </Button>
              {timer < MIN_SECONDS && <div className="text-xs text-red-500">Please record at least 1 minute.</div>}
              {timer >= MAX_SECONDS && <div className="text-xs text-yellow-500">Recording stopped at 3 minutes (max allowed).</div>}
            </div>
          )}
        </div>
      )}

      {voiceId && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Start Over
            </Button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Enter your text</label>
            <textarea
              placeholder="Type the text you want to convert to speech..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px] neon-border focus:border-primary/60 w-full rounded-md p-2 bg-background text-foreground"
            />
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1 hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors"
              size="lg"
              onClick={handleGenerateSpeech}
              disabled={!text}
            >
              <FileAudio className="w-4 h-4 mr-2" />
              Generate Speech
            </Button>
          </div>
          {audioUrl && (
            <div className="p-4 bg-muted/20 rounded-2xl border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <FileAudio className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Generated Audio</span>
              </div>
              <audio controls src={audioUrl} className="w-full rounded-lg" />
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <FeatureLayout
      title="Voice Cloning"
      description="Clone your voice and use it to speak any text"
      icon={<Mic className="w-6 h-6 text-primary" />}
      whatItDoes="Lets you record your voice and create a custom AI version of it. Once your voice is cloned, you can type anything and hear it read back in your own voice."
      useCase="Great for creators who want their own voice in content without always recording. You can build custom AI avatars, voice your blog posts, narrate videos, or create characters for games and storytelling. Some people even use it for accessibility tools or to preserve a loved one’s voice."
      howItWorks="You give your voice a name then record between one and three minutes of audio. The app sends the sample to ElevenLabs, which returns a new voice based on your recording. You can then use that cloned voice to generate speech from any text you type using the Text to Speech feature."
      demoComponent={demoComponent}
    />

  );
}