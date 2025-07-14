import { useState, useRef } from "react";
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  const MIN_SECONDS = 60;
  const MAX_SECONDS = 180;

  const handleRecording = async () => {
    setAttemptedRecord(true);
    if (isRecording) {
      mediaRecorder?.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (!voiceName.trim()) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
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
      description="Clone your voice and generate speech with it"
      icon={<Mic className="w-6 h-6 text-primary" />}
      whatItDoes="Clones your voice using ElevenLabs, then lets you type and generate speech in your own voice."
      useCase="Perfect for creating personalized content, custom AI characters, or just showing off your AI clone."
      howItWorks="Records your voice, sends it to ElevenLabs for cloning, and returns a new voice_id. Then uses that ID to generate speech."
      demoComponent={demoComponent}
    />
  );
}