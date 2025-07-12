
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Upload, FileAudio, Copy } from "lucide-react";
import { useState } from "react";

export function SpeechToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription] = useState("Hello, this is a sample transcription of the uploaded audio file. The AI has accurately converted the speech into text with proper punctuation and formatting.");

  const demoComponent = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="lg"
          className="hover-scale"
          onClick={() => setIsRecording(!isRecording)}
        >
          <Mic className={`w-4 h-4 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
        <Button variant="outline" size="lg" className="neon-border hover-glow">
          <Upload className="w-4 h-4 mr-2" />
          Upload Audio
        </Button>
      </div>

      {isRecording && (
        <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-medium">Recording in progress...</span>
            <div className="ml-auto text-red-400 font-mono">00:23</div>
          </div>
        </div>
      )}

      <Card className="neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileAudio className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Transcription Result</span>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-xl">
            {transcription}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2">
          <div className="text-lg font-bold text-primary">99.2%</div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </div>
        <div className="p-2">
          <div className="text-lg font-bold text-primary">1.2s</div>
          <div className="text-xs text-muted-foreground">Processing</div>
        </div>
        <div className="p-2">
          <div className="text-lg font-bold text-primary">EN</div>
          <div className="text-xs text-muted-foreground">Language</div>
        </div>
      </div>
    </div>
  );

  return (
    <FeatureLayout
      title="Speech to Text"
      description="Convert audio recordings into accurate, formatted text"
      icon={<Mic className="w-6 h-6 text-primary" />}
      whatItDoes="Automatically transcribes spoken words from audio files or live recordings into accurate text. Handles multiple languages, accents, and speaking styles with industry-leading accuracy and proper punctuation."
      useCase="Essential for journalists transcribing interviews, students converting lecture recordings to notes, businesses creating meeting summaries, podcasters generating episode transcripts, and accessibility applications for hearing-impaired users."
      demoComponent={demoComponent}
      howItWorks="Utilizes advanced automatic speech recognition (ASR) technology powered by transformer neural networks. The system processes audio waveforms, identifies phonetic patterns, applies language models for context understanding, and outputs formatted text with punctuation and speaker detection."
    />
  );
}
