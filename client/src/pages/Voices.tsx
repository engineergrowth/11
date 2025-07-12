
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Play, Search, Filter, Star } from "lucide-react";

export function Voices() {
  const voiceLibrary = [
    { name: "Sarah", gender: "Female", accent: "American", age: "Young Adult", rating: 4.9, category: "Professional", premium: false },
    { name: "Marcus", gender: "Male", accent: "British", age: "Middle Age", rating: 4.8, category: "Conversational", premium: true },
    { name: "Elena", gender: "Female", accent: "Spanish", age: "Young Adult", rating: 4.7, category: "Energetic", premium: false },
    { name: "David", gender: "Male", accent: "Australian", age: "Middle Age", rating: 4.9, category: "Narrator", premium: true },
    { name: "Yuki", gender: "Female", accent: "Japanese", age: "Young", rating: 4.6, category: "Friendly", premium: false },
    { name: "Alexander", gender: "Male", accent: "Russian", age: "Mature", rating: 4.8, category: "Deep", premium: true }
  ];

  const demoComponent = (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search voices by name, accent, or style..."
          className="flex-1 neon-border"
        />
        <Button variant="outline" size="icon" className="neon-border hover-glow">
          <Search className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="neon-border hover-glow">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {voiceLibrary.map((voice) => (
          <Card key={voice.name} className="neon-border hover-glow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{voice.name}</h3>
                  {voice.premium && (
                    <Badge variant="secondary" className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
                      PRO
                    </Badge>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-muted-foreground">{voice.rating}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="hover-scale">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  {voice.gender}
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                  {voice.accent}
                </Badge>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                  {voice.age}
                </Badge>
                <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                  {voice.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="neon-border bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-primary/20">
        <CardContent className="p-4 text-center">
          <h3 className="font-medium mb-2">Clone Your Voice</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Upload a sample of your voice to create a personalized AI voice model
          </p>
          <Button className="hover-scale">
            Start Voice Cloning
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FeatureLayout
      title="Voices"
      description="Browse and customize our extensive AI voice library"
      icon={<Users className="w-6 h-6 text-primary" />}
      whatItDoes="Access a comprehensive library of AI-generated voices with different accents, ages, genders, and speaking styles. Each voice is carefully crafted and rated for quality, with options for both standard and premium voice models."
      useCase="Essential for content creators selecting the perfect narrator, businesses choosing brand voices for their applications, audiobook producers matching character voices, developers integrating speech into their apps, or anyone seeking consistent, high-quality voice synthesis across projects."
      demoComponent={demoComponent}
      howItWorks="Voices are created using advanced neural voice synthesis technology, trained on extensive datasets of human speech patterns. Each voice model captures unique characteristics like accent, intonation, and speaking rhythm, allowing for consistent and natural-sounding speech generation across different content types."
    />
  );
}
