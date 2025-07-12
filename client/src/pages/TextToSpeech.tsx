
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AudioLines, Play, Download } from "lucide-react";
import { useState } from "react";

export function TextToSpeech() {
  const [text, setText] = useState("Hello! This is a sample text that will be converted to speech using ElevenLabs AI.");
  const [voice, setVoice] = useState("sarah");

  const demoComponent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Enter your text</label>
        <Textarea
          placeholder="Type the text you want to convert to speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px] neon-border focus:border-primary/60"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Voice</label>
        <Select value={voice} onValueChange={setVoice}>
          <SelectTrigger className="neon-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sarah">Sarah - Professional</SelectItem>
            <SelectItem value="daniel">Daniel - Conversational</SelectItem>
            <SelectItem value="rachel">Rachel - Energetic</SelectItem>
            <SelectItem value="adam">Adam - Deep & Warm</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1 hover-scale" size="lg">
          <Play className="w-4 h-4 mr-2" />
          Generate Speech
        </Button>
        <Button variant="outline" size="lg" className="neon-border hover-glow">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 bg-muted/20 rounded-2xl border border-border/40">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Audio Preview</span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-neon-blue to-neon-purple w-3/4 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <FeatureLayout
      title="Text to Speech"
      description="Transform written text into natural, human-like speech"
      badge="Most Popular"
      icon={<AudioLines className="w-6 h-6 text-primary" />}
      whatItDoes="Converts any written text into high-quality, natural-sounding speech using advanced AI voice synthesis. Choose from dozens of unique voices with different accents, tones, and speaking styles."
      useCase="Perfect for content creators making audiobooks, podcasters creating intros, educators developing accessible learning materials, or businesses adding voice to their applications and customer experiences."
      demoComponent={demoComponent}
      howItWorks="Uses deep neural networks trained on massive datasets of human speech to understand linguistic patterns, emotional context, and pronunciation nuances. The AI analyzes text structure and generates audio that matches natural human speech rhythms and intonation."
    />
  );
}
