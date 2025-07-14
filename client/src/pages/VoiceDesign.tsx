import { useState } from "react";
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Play, Download, Volume2, Info, Wand2, Palette } from "lucide-react";

export function VoiceDesign() {
  const [voiceDescription, setVoiceDescription] = useState("");
  const [customText, setCustomText] = useState("");
  const [autoGenerateText, setAutoGenerateText] = useState(false);
  const [loudness, setLoudness] = useState([0.5]);
  const [guidanceScale, setGuidanceScale] = useState([5.0]);
  const [quality, setQuality] = useState([0.5]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previews, setPreviews] = useState<any[]>([]);
  const [generatedText, setGeneratedText] = useState("");

  const handleGenerate = async () => {
    if (!voiceDescription.trim()) return;
    
    // Validate custom text length if not auto-generating
    if (!autoGenerateText && customText.trim() && customText.trim().length < 100) {
      alert("Custom text must be at least 100 characters long");
      return;
    }
    
    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append("voice_description", voiceDescription);
      formData.append("auto_generate_text", autoGenerateText.toString());
      formData.append("loudness", loudness[0].toString());
      formData.append("guidance_scale", guidanceScale[0].toString());
      formData.append("quality", quality[0].toString());
      
      if (!autoGenerateText && customText.trim()) {
        formData.append("text", customText);
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/design-voice`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail?.[0]?.msg || "Failed to generate voice previews");
      }
      
      const data = await response.json();
      setPreviews(data.previews || []);
      setGeneratedText(data.text || "");
    } catch (error) {
      console.error("Error generating voice previews:", error);
      alert(error instanceof Error ? error.message : "Failed to generate voice previews");
    } finally {
      setIsGenerating(false);
    }
  };

  const playAudio = (audioBase64: string) => {
    const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
    audio.play();
  };

  const downloadAudio = (audioBase64: string, index: number) => {
    const link = document.createElement('a');
    link.href = `data:audio/mp3;base64,${audioBase64}`;
    link.download = `voice_preview_${index + 1}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const demoComponent = (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Voice Description</label>
        <Textarea
          placeholder="Describe the voice you want to create (e.g., 'A sassy squeaky mouse', 'A deep booming narrator', 'A cheerful young woman')"
          value={voiceDescription}
          onChange={(e) => setVoiceDescription(e.target.value)}
          className="neon-border focus:border-primary/60 min-h-[80px]"
        />
        <p className="text-xs text-muted-foreground">Between 20 and 1000 characters</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="autoGenerateText"
            checked={autoGenerateText}
            onChange={(e) => setAutoGenerateText(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="autoGenerateText" className="text-sm font-medium">
            Auto-generate preview text
          </label>
        </div>

        {!autoGenerateText && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Custom Preview Text</label>
            <Textarea
              placeholder="Enter text to preview the voice (minimum 100 characters, maximum 1000 characters)"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="neon-border focus:border-primary/60 min-h-[80px]"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Between 100 and 1000 characters</span>
              <span className={customText.length > 1000 ? "text-red-500" : ""}>
                {customText.length}/1000
              </span>
            </div>
            {customText.length > 0 && customText.length < 100 && (
              <div className="text-xs text-red-500">
                Text must be at least 100 characters (currently {customText.length})
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Loudness</label>
            <div className="flex items-center gap-4">
              <Slider
                value={loudness}
                onValueChange={setLoudness}
                max={1}
                min={-1}
                step={0.1}
                className="flex-1"
              />
              <span className="text-sm font-mono min-w-[3rem]">{loudness[0]}</span>
            </div>
            <p className="text-xs text-muted-foreground">Controls volume level (-1 = quietest, 1 = loudest)</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Guidance Scale</label>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={guidanceScale}
                onValueChange={setGuidanceScale}
                max={100}
                min={0}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-mono min-w-[3rem]">{guidanceScale[0]}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Controls how closely the AI follows your description. Lower values = more creative, higher values = more accurate but potentially robotic.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quality</label>
            <div className="flex items-center gap-4">
              <Slider
                value={quality}
                onValueChange={setQuality}
                max={1}
                min={-1}
                step={0.1}
                className="flex-1"
              />
              <span className="text-sm font-mono min-w-[3rem]">{quality[0]}</span>
            </div>
            <p className="text-xs text-muted-foreground">Higher quality = better output but less variety</p>
          </div>
        </div>
      </div>

      <Button 
        className="w-full hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors" 
        onClick={handleGenerate}
        disabled={isGenerating || !voiceDescription.trim() || (!autoGenerateText && !customText.trim())}
      >
        <Wand2 className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
        {isGenerating ? 'Generating Voice Previews...' : 'Generate Voice Previews'}
      </Button>

      {generatedText && (
        <Card className="neon-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Preview Text</span>
            </div>
            <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg">
              {generatedText}
            </p>
          </CardContent>
        </Card>
      )}

      {previews.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Voice Previews</h3>
          <div className="grid gap-4">
            {previews.map((preview, index) => (
              <Card key={index} className="neon-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Preview {index + 1}</span>
                      <span className="text-xs text-muted-foreground">
                        Duration: {preview.duration_secs}s
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playAudio(preview.audio_base_64)}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadAudio(preview.audio_base_64, index)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Voice ID: {preview.generated_voice_id}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Card className="neon-border bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">Pro Tip</span>
          </div>
          <p className="text-xs text-purple-100/80">
            Be specific and descriptive! Include details about personality, age, accent, and speaking style for the best results.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FeatureLayout
      title="Voice Design"
      description="Create custom voices just by describing them in plain English"
      icon={<Palette className="w-6 h-6 text-primary" />}
      whatItDoes="Lets you describe the kind of voice you want using natural language. The system generates multiple voice previews you can listen to and use in other features like text to speech."
      useCase="Used by creators who want character voices for animations or storytelling. Game developers use it to bring NPCs to life. Podcasters use it to give their shows a unique tone. It also works well for prototyping branded voices or building custom assistants for apps or devices."
      howItWorks="You write a short description of the voice you want to create. You can let the app generate sample text or enter your own. Then you adjust a few sliders to fine-tune the output. Loudness controls the volume, quality affects the clarity and detail of the voice, and guidance scale changes how strictly the voice follows your description. Once you hit generate, the app sends that to ElevenLabs and returns a few different voice previews. You can listen to each one or download them."
      demoComponent={demoComponent}
    />
  );
} 