import { useState } from "react";
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Upload, FileAudio, Copy } from "lucide-react";

export function SpeechToText() {
  const [mode, setMode] = useState<"upload" | "record" | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const handleRecording = async () => {
    if (isRecording) {
      mediaRecorder?.stop();
      setIsRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setRecordedBlob(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    }
  };

  const handleTranscribe = async (blobToSend: Blob) => {
    const formData = new FormData();
    formData.append("file", blobToSend, "audio.webm");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/speech-to-text`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Transcription failed");

      const data = await response.json();
      setTranscription(data.transcription || "No text returned.");
    } catch (error) {
      console.error("Error:", error);
      setTranscription("An error occurred during transcription.");
    }
  };

  const demoComponent = (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button
          variant={mode === "upload" ? "default" : "outline"}
          onClick={() => {
            setMode("upload");
            setAudioFile(null);
            setRecordedBlob(null);
          }}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Audio File
        </Button>
        <Button
          variant={mode === "record" ? "default" : "outline"}
          onClick={() => {
            setMode("record");
            setAudioFile(null);
            setRecordedBlob(null);
          }}
        >
          <Mic className="w-4 h-4 mr-2" />
          Record Audio
        </Button>
      </div>

      {!mode && (
        <p className="text-sm text-muted-foreground italic">Choose an option above to get started.</p>
      )}

      {mode === "upload" && (
        <div className="space-y-4">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-muted-foreground"
          />

          <Button
            size="lg"
            onClick={() => audioFile && handleTranscribe(audioFile)}
            disabled={!audioFile}
            className="hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Transcribe Upload
          </Button>
        </div>
      )}

      {mode === "record" && (
        <div className="space-y-4">
          <Button
            onClick={handleRecording}
            size="lg"
            variant={isRecording ? "destructive" : "default"}
          >
            <Mic className={`w-4 h-4 mr-2 ${isRecording ? "animate-pulse" : ""}`} />
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>

          {isRecording && (
            <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-medium">Recording in progress...</span>
              </div>
            </div>
          )}

          {recordedBlob && !isRecording && (
            <Button
              size="lg"
              onClick={() => handleTranscribe(recordedBlob)}
              className="hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors ml-4"
            >
              <Upload className="w-4 h-4 mr-2" />
              Transcribe Recording
            </Button>
          )}
        </div>
      )}

      <Card className="neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileAudio className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Transcription Result</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={() => navigator.clipboard.writeText(transcription)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-xl whitespace-pre-line">
            {transcription || "Upload or record an audio clip and transcribe it to see results."}
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FeatureLayout
      title="Speech to Text"
      description="Turn audio into clean, readable text"
      icon={<Mic className="w-6 h-6 text-primary" />}
      whatItDoes="Transcribes audio from files or live recordings into accurate text with proper formatting. Great for different languages, speaking styles, and clear punctuation."
      useCase="People use this to turn interviews, meetings, lectures, and podcasts into clean, readable transcripts. Journalists save hours writing up quotes, students use it to turn classes into notes, and businesses rely on it for meeting summaries. It's also a big help for accessibility, giving hearing-impaired users a way to follow spoken content in real time."
      howItWorks="You upload a file or record live audio. We send it to ElevenLabs’ Speech to Text API, and it returns polished text with punctuation. It can handle speaker changes and different speaking styles, so the results are easy to read and ready to use."
      demoComponent={demoComponent}
    />
  );
}