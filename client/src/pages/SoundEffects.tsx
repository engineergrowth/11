
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Play, Download, Wand2, Volume2 } from "lucide-react";
import { useState } from "react";

export function SoundEffects() {
  const [prompt, setPrompt] = useState("thunderstorm with heavy rain and wind");
  
  const presetEffects = [
    { name: "Ocean waves", category: "Nature" },
    { name: "City traffic", category: "Urban" },
    { name: "Campfire crackling", category: "Nature" },
    { name: "Spaceship engine", category: "Sci-Fi" },
    { name: "Medieval battle", category: "Fantasy" },
    { name: "Coffee shop ambience", category: "Indoor" }
  ];

  const demoComponent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Describe the sound effect</label>
        <Input
          placeholder="e.g., thunderstorm with heavy rain and wind"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="neon-border focus:border-primary/60"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Quick Presets</label>
        <div className="flex flex-wrap gap-2">
          {presetEffects.map((effect) => (
            <Badge
              key={effect.name}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-colors"
              onClick={() => setPrompt(effect.name)}
            >
              {effect.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button className="hover-scale">
          <Wand2 className="w-4 h-4 mr-2" />
          Generate Sound
        </Button>
        <Button variant="outline" className="neon-border hover-glow">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      <Card className="neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Volume2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Generated Sound Effect</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Thunderstorm.wav</span>
                <Button variant="ghost" size="sm">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Duration: 30s</span>
                <span>•</span>
                <span>Quality: High</span>
                <span>•</span>
                <span>Format: WAV</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="text-primary font-medium">8.2/10</div>
                <div className="text-muted-foreground">Realism</div>
              </div>
              <div>
                <div className="text-primary font-medium">44.1kHz</div>
                <div className="text-muted-foreground">Sample Rate</div>
              </div>
              <div>
                <div className="text-primary font-medium">Stereo</div>
                <div className="text-muted-foreground">Channels</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="neon-border bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">Pro Tip</span>
          </div>
          <p className="text-xs text-purple-100/80">
            Be specific in your descriptions! Include details about intensity, environment, and mood for better results.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FeatureLayout
      title="Sound Effects"
      description="Generate custom sound effects from text descriptions"
      badge="BETA"
      icon={<Sparkles className="w-6 h-6 text-primary" />}
      whatItDoes="Creates realistic sound effects from simple text descriptions using advanced AI audio synthesis. Generate everything from natural environmental sounds to complex mechanical noises, all customized to your specific requirements and creative vision."
      useCase="Perfect for game developers needing custom audio assets, filmmakers creating atmospheric soundscapes, podcasters adding ambient effects, content creators enhancing their videos, musicians seeking unique sound layers, or anyone needing copyright-free audio effects."
      demoComponent={demoComponent}
      howItWorks="Uses cutting-edge generative AI models trained on vast libraries of real-world sounds. The system interprets text descriptions, understands acoustic properties and environmental contexts, then synthesizes audio that matches the specified characteristics using advanced diffusion models and spectral synthesis techniques."
    />
  );
}
