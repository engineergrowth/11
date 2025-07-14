
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Wand2, Download, Volume2, Info } from "lucide-react";
import { useState } from "react";

export function SoundEffects() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState([5]);
  const [influence, setInfluence] = useState([0.3]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append("text", prompt);
      formData.append("duration_seconds", duration[0].toString());
      formData.append("prompt_influence", influence[0].toString());
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sound-effects`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate sound effect");
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error generating sound effect:", error);
      // You could add a toast notification here
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `sound_effect_${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const demoComponent = (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Describe the sound effect</label>
        <Input
          placeholder="e.g., thunderstorm with heavy rain and wind"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="neon-border focus:border-primary/60"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (seconds)</label>
          <div className="flex items-center gap-4">
            <Slider
              value={duration}
              onValueChange={setDuration}
              max={22}
              min={0.5}
              step={0.5}
              className="flex-1"
            />
            <span className="text-sm font-mono min-w-[3rem]">{duration[0]}s</span>
          </div>
          <p className="text-xs text-muted-foreground">Between 0.5 and 22 seconds</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Prompt Influence</label>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-4">
            <Slider
              value={influence}
              onValueChange={setInfluence}
              max={1}
              min={0}
              step={0.1}
              className="flex-1"
            />
            <span className="text-sm font-mono min-w-[3rem]">{influence[0]}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Higher values make the generation follow your prompt more closely but reduce variety. Lower values create more diverse but potentially less accurate results.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          className="hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors" 
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
        >
          <Wand2 className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Generate Sound'}
        </Button>
        <Button 
          variant="outline" 
          className="neon-border hover-glow"
          onClick={handleDownload}
          disabled={!audioUrl}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      {audioUrl && (
        <Card className="neon-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Generated Sound Effect</span>
            </div>
            <audio controls src={audioUrl} className="w-full rounded-lg" />
          </CardContent>
        </Card>
      )}

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
      description="Generate custom sound effects from plain text"
      icon={<Sparkles className="w-6 h-6 text-primary" />}
      whatItDoes="Lets you describe a sound with words and instantly generate a matching audio effect. You can adjust duration and control how closely the sound sticks to your prompt."
      useCase="Used by game developers who need specific in-game sounds. Filmmakers add ambient background noise without hunting through libraries. Podcasters and YouTubers use it to add atmosphere or transitions. It’s also helpful for musicians looking to experiment with unique textures or layers."
      howItWorks="You type a description of the sound you want, like 'glitchy robot startup' or 'calm ocean waves at night.' You can adjust how long the sound is and how strongly it follows your prompt. When you hit generate, the app sends that to ElevenLabs and gets back a sound you can play or download."
      demoComponent={demoComponent}
    />
  );
}