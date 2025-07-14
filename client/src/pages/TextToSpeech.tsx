import { useState } from "react";
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AudioLines, Play } from "lucide-react";

export function TextToSpeech() {
  const [text, setText] = useState("Hello! This is a sample text for ElevenLabs.");
  const [voice, setVoice] = useState("EXAVITQu4vr4xnSDxMaL"); // default to Sarah
  const [audioUrl, setAudioUrl] = useState("");

  const handleGenerateSpeech = async () => {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("voice_id", voice);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/text-to-speech`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate speech");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            <SelectItem value="EXAVITQu4vr4xnSDxMaL">Sarah</SelectItem>
            <SelectItem value="N2lVS1w4EtoT3dr4eOWO">Callum</SelectItem>
            <SelectItem value="SAz9YHcvj6GT2YYXdXww">River</SelectItem>
            <SelectItem value="XrExE9yKIg1WjnnlVkGX">Matilda</SelectItem>
            <SelectItem value="cjVigY5qzO86Huf0OWal">Eric</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
      <Button
        className="flex-1 hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors"
        size="lg"
        onClick={handleGenerateSpeech}
      >
          <Play className="w-4 h-4 mr-2" />
          Generate Speech
        </Button>
      </div>

      <div className="p-4 bg-muted/20 rounded-2xl border border-border/40">
        <div className="flex items-center gap-2 mb-2">
          <AudioLines className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Generated Audio</span>
        </div>
        {audioUrl ? (
          <audio controls src={audioUrl} className="w-full rounded-lg" />
        ) : (
          <div className="w-full h-16 bg-muted/40 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
            <span className="text-sm text-muted-foreground">Click "Generate Speech" to create audio</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <FeatureLayout
      title="Text to Speech"
      description="Transform written text into natural, human-like speech"
      badge="Most Popular"
      icon={<AudioLines className="w-6 h-6 text-primary" />}
      whatItDoes="Takes any text and turns it into natural-sounding speech using realistic voice models."
      useCase="People use this to create audiobooks without hiring voice actors. Publishers speed up production. It’s great for narrating social posts, turning blog articles into audio, and adding voice to videos, marketing, or training. Teachers make lessons more engaging, and it helps blind or low-vision users with more natural playback than most screen readers. Basically, if it needs a voice, this can handle it."
      howItWorks="You type in some text, we send it to the ElevenLabs API, and it gives us back the voice. Then we just play the audio right in the app."
      demoComponent={demoComponent}
    />
  );
}
