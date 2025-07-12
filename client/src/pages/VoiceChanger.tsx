
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Volume2, Upload, Download, AudioLines } from "lucide-react";
import { useState } from "react";

export function VoiceChanger() {
  const [pitch, setPitch] = useState([0]);
  const [speed, setSpeed] = useState([100]);
  const [tone, setTone] = useState([50]);

  const demoComponent = (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 neon-border hover-glow">
          <Upload className="w-4 h-4 mr-2" />
          Upload Audio
        </Button>
        <Button variant="outline" className="flex-1 neon-border hover-glow">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      <Card className="neon-border">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Pitch Adjustment</label>
              <span className="text-xs text-muted-foreground">{pitch[0] > 0 ? '+' : ''}{pitch[0]} semitones</span>
            </div>
            <Slider
              value={pitch}
              onValueChange={setPitch}
              min={-12}
              max={12}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Speaking Speed</label>
              <span className="text-xs text-muted-foreground">{speed[0]}%</span>
            </div>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              min={50}
              max={200}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Voice Character</label>
              <span className="text-xs text-muted-foreground">{tone[0]}% depth</span>
            </div>
            <Slider
              value={tone}
              onValueChange={setTone}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button className="hover-scale">
          <AudioLines className="w-4 h-4 mr-2" />
          Preview Changes
        </Button>
        <Button variant="outline" className="neon-border hover-glow">
          Reset All
        </Button>
      </div>

      <Card className="neon-border bg-muted/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Voice Preview</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Original</span>
              <span>Modified</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 h-8 bg-border rounded-lg flex items-center justify-center">
                <div className="w-16 h-1 bg-gray-400 rounded"></div>
              </div>
              <div className="flex-1 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <div className="w-16 h-1 bg-primary rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FeatureLayout
      title="Voice Changer"
      description="Transform and modify voices while preserving natural speech patterns"
      icon={<Volume2 className="w-6 h-6 text-primary" />}
      whatItDoes="Modifies existing voice recordings by adjusting pitch, tone, speed, and character while maintaining the natural flow and intelligibility of speech. Preserves emotional context and linguistic nuances during transformation."
      useCase="Perfect for content creators wanting voice variety, gamers creating character voices, privacy protection in recordings, voice actors exploring different characters, or accessibility applications helping people with voice impairments communicate more effectively."
      demoComponent={demoComponent}
      howItWorks="Uses advanced digital signal processing combined with AI-driven voice modeling to separate speech components (pitch, formants, timing) and reconstruct them with desired modifications. Maintains phonetic accuracy while applying transformations that sound natural and believable."
    />
  );
}
