import { useState } from "react";
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Upload, FileAudio, Copy } from "lucide-react";

export function SpeechToText() {
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
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Upload an audio file</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            setAudioFile(e.target.files?.[0] || null);
            setRecordedBlob(null); // clear recorded if switching to upload
          }}
          className="block w-full text-sm text-muted-foreground"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleRecording}
          size="lg"
          variant={isRecording ? "destructive" : "default"}
        >
          <Mic className={`w-4 h-4 mr-2 ${isRecording ? "animate-pulse" : ""}`} />
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>

        {audioFile && (
          <Button
            size="lg"
            onClick={() => handleTranscribe(audioFile)}
            className="hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Transcribe Upload
          </Button>
        )}

        {recordedBlob && !isRecording && (
          <Button
            size="lg"
            onClick={() => handleTranscribe(recordedBlob)}
            className="hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Transcribe Recording
          </Button>
        )}
      </div>

      {isRecording && (
        <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-medium">Recording in progress...</span>
          </div>
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
      description="Convert audio recordings into accurate, formatted text"
      icon={<Mic className="w-6 h-6 text-primary" />}
      whatItDoes="Automatically transcribes spoken words from audio files or live recordings into accurate text. Handles multiple languages, accents, and speaking styles with industry-leading accuracy and proper punctuation."
      useCase="Essential for journalists transcribing interviews, students converting lecture recordings to notes, businesses creating meeting summaries, podcasters generating episode transcripts, and accessibility applications for hearing-impaired users."
      howItWorks="Utilizes advanced automatic speech recognition (ASR) powered by neural networks. It processes waveforms, identifies patterns, and outputs formatted text with punctuation and speaker detection."
      demoComponent={demoComponent}
    />
  );
}
