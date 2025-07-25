
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AudioLines, Mic, ArrowRight, Copy, Sparkles, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Text to Speech",
    description: "Convert written text into natural-sounding speech",
    icon: AudioLines,
    path: "/text-to-speech",
    color: "from-blue-500 to-blue-600",
    badge: "Popular"
  },
  {
    title: "Speech to Text",
    description: "Transcribe audio recordings into accurate text",
    icon: Mic,
    path: "/speech-to-text",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Voice Clone",
    description: "Clone your voice and generate speech with it",
    icon: Copy,
    path: "/voice-clone",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Sound Effects",
    description: "Generate custom sound effects from text descriptions",
    icon: Sparkles,
    path: "/sound-effects",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Voice Design",
    description: "Create custom AI voices from text descriptions",
    icon: Palette,
    path: "/voice-design",
    color: "from-pink-500 to-pink-600"
  }
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="border-b border-border/40 pb-12 mb-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              ElevenLabs API Demo
            </h1>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4 pt-4">
            <p className="text-base text-muted-foreground leading-relaxed">
              Hi, I'm <a href="https://www.linkedin.com/in/blake-geard/" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">Blake</a>, a Solutions Engineer. I built this demo to showcase ElevenLabs' capabilities. 
              This is not an official ElevenLabs product. It's a technical demonstration of their API features.
            </p>
            <p className="text-sm text-muted-foreground/80">
              Currently under development with more features being added regularly.
            </p>
            <div className="pt-2">
              <a 
                href="https://github.com/engineergrowth/11" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span>View source code</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.path} className="group neon-border hover-glow">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.badge && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {feature.badge}
                  </Badge>
                )}
              </div>
              <div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="mt-2 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Link to={feature.path}>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/5 transition-colors">
                  Explore Feature
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
