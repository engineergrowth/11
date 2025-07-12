
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlignLeft, Upload, Download, Clock, FileText } from "lucide-react";
import { useState } from "react";

export function ForcedAlignment() {
  const [transcript, setTranscript] = useState(`Hello, welcome to our presentation today. We'll be discussing the latest developments in artificial intelligence and how they impact our daily lives. Thank you for joining us.`);

  const alignmentData = [
    { word: "Hello", start: "0.00", end: "0.45", confidence: 0.98 },
    { word: "welcome", start: "0.67", end: "1.12", confidence: 0.95 },
    { word: "to", start: "1.15", end: "1.23", confidence: 0.97 },
    { word: "our", start: "1.25", end: "1.48", confidence: 0.94 }
  ];

  const demoComponent = (
    <div className="space-y-4">
      <Button variant="outline" className="w-full neon-border hover-glow" size="lg">
        <Upload className="w-4 h-4 mr-2" />
        Upload Audio File
      </Button>

      <div className="space-y-2">
        <label className="text-sm font-medium">Transcript Text</label>
        <Textarea
          placeholder="Paste or type the transcript that matches your audio..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="min-h-[100px] neon-border focus:border-primary/60"
        />
      </div>

      <Card className="neon-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Alignment Progress</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Processing Audio</span>
              <span>Complete</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Word Alignment</span>
              <span>87%</span>
            </div>
            <Progress value={87} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Alignment Results</span>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {alignmentData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/20 text-xs">
                <span className="font-medium">{item.word}</span>
                <div className="flex gap-4 text-muted-foreground">
                  <span>{item.start}s - {item.end}s</span>
                  <span className="text-primary">{Math.round(item.confidence * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button className="hover-scale">
          Start Alignment
        </Button>
        <Button variant="outline" className="neon-border hover-glow">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>
    </div>
  );

  return (
    <FeatureLayout
      title="Forced Alignment"
      description="Precisely align text with corresponding audio segments"
      icon={<AlignLeft className="w-6 h-6 text-primary" />}
      whatItDoes="Automatically synchronizes written text with its corresponding audio segments, providing precise timing information for each word or phoneme. Creates detailed mappings between transcript text and audio timestamps with confidence scores."
      useCase="Critical for creating subtitles and closed captions, developing interactive audio applications, building language learning tools, preparing data for speech research, creating karaoke systems, or any application requiring precise audio-text synchronization."
      demoComponent={demoComponent}
      howItWorks="Uses advanced phonetic recognition algorithms combined with Hidden Markov Models and deep neural networks to match expected pronunciation patterns with actual audio signals. The system analyzes acoustic features and linguistic models to determine the most likely alignment between text and audio segments."
    />
  );
}
