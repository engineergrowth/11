
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Users, Play, Download } from "lucide-react";
import { useState } from "react";

export function TextToDialogue() {
  const [script, setScript] = useState(`SARAH: Good morning! How was your weekend?
JAMES: It was fantastic! I went hiking in the mountains.
SARAH: That sounds amazing. Did you see any wildlife?
JAMES: Actually, yes! We spotted a family of deer near the trail.`);

  const demoComponent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Dialogue Script</label>
        <Textarea
          placeholder="Enter your dialogue script with speaker names..."
          value={script}
          onChange={(e) => setScript(e.target.value)}
          className="min-h-[120px] neon-border focus:border-primary/60 font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">SARAH's Voice</label>
          <select className="w-full p-2 rounded-lg bg-background border neon-border">
            <option>Rachel - Professional</option>
            <option>Emma - Friendly</option>
            <option>Sophie - Energetic</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">JAMES's Voice</label>
          <select className="w-full p-2 rounded-lg bg-background border neon-border">
            <option>Adam - Conversational</option>
            <option>Daniel - Deep</option>
            <option>Michael - Warm</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1 hover-scale" size="lg">
          <Play className="w-4 h-4 mr-2" />
          Generate Dialogue
        </Button>
        <Button variant="outline" size="lg" className="neon-border hover-glow">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      <Card className="neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Generated Dialogue Preview</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">SARAH (Rachel)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">JAMES (Adam)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FeatureLayout
      title="Text to Dialogue"
      description="Create realistic conversations between multiple AI speakers"
      badge="New Feature"
      icon={<MessageSquare className="w-6 h-6 text-primary" />}
      whatItDoes="Transforms written dialogue scripts into natural-sounding conversations between multiple distinct AI voices. Each speaker maintains consistent vocal characteristics and emotional expression throughout the conversation."
      useCase="Ideal for creating audiobooks with multiple characters, developing interactive voice applications, producing educational content with different speakers, creating podcast intros with multiple hosts, or generating realistic dialogue for games and media."
      demoComponent={demoComponent}
      howItWorks="Analyzes dialogue scripts to identify different speakers, assigns unique voice profiles to each character, and uses contextual understanding to apply appropriate emotions and speaking styles. The system maintains speaker consistency and natural conversation flow throughout the entire dialogue."
    />
  );
}
