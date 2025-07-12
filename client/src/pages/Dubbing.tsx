
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Upload, Download, Globe, Play } from "lucide-react";
import { useState } from "react";

export function Dubbing() {
  const [sourceLanguage, setSourceLanguage] = useState("english");
  const [targetLanguage, setTargetLanguage] = useState("spanish");

  const demoComponent = (
    <div className="space-y-4">
      <Button variant="outline" className="w-full neon-border hover-glow" size="lg">
        <Upload className="w-4 h-4 mr-2" />
        Upload Original Video/Audio
      </Button>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Source Language</label>
          <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
            <SelectTrigger className="neon-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Language</label>
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger className="neon-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="portuguese">Portuguese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Voice Matching</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
              <span className="text-sm">Original Speaker 1</span>
              <select className="text-xs bg-background border rounded px-2 py-1 neon-border">
                <option>Maria - Natural Spanish</option>
                <option>Carlos - Deep Spanish</option>
                <option>Sofia - Energetic Spanish</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
              <span className="text-sm">Original Speaker 2</span>
              <select className="text-xs bg-background border rounded px-2 py-1 neon-border">
                <option>Diego - Professional Spanish</option>
                <option>Antonio - Warm Spanish</option>
                <option>Miguel - Conversational Spanish</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button className="hover-scale">
          <Play className="w-4 h-4 mr-2" />
          Start Dubbing
        </Button>
        <Button variant="outline" className="neon-border hover-glow">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <Card className="neon-border bg-muted/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Languages className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Dubbing Preview</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Original (English)</div>
              <div className="h-16 bg-border rounded-lg flex items-center justify-center">
                <div className="w-12 h-2 bg-gray-400 rounded"></div>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Dubbed (Spanish)</div>
              <div className="h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                <div className="w-12 h-2 bg-primary rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FeatureLayout
      title="Dubbing"
      description="Seamlessly translate and dub content across multiple languages"
      icon={<Languages className="w-6 h-6 text-primary" />}
      whatItDoes="Automatically translates spoken content and replaces original voices with AI-generated speech in the target language. Maintains lip-sync accuracy, voice characteristics, and emotional expression while adapting content for global audiences."
      useCase="Perfect for international content creators expanding their reach, educational institutions creating multilingual courses, businesses localizing marketing videos, entertainment companies distributing content globally, or accessibility services making content available to diverse language communities."
      demoComponent={demoComponent}
      howItWorks="Combines advanced speech recognition, neural machine translation, and voice synthesis. The system first transcribes the original audio, translates the text while preserving context and emotion, then generates new speech using voice cloning technology that matches the original speaker's characteristics in the target language."
    />
  );
}
