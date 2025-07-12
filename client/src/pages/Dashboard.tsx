
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AudioLines, 
  Mic, 
  MessageSquare, 
  Volume2, 
  Filter, 
  Languages, 
  Sparkles, 
  Users, 
  AlignLeft, 
  Bot,
  ArrowRight,
  Zap
} from "lucide-react";
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
    title: "Text to Dialogue",
    description: "Generate realistic conversations between multiple speakers",
    icon: MessageSquare,
    path: "/text-to-dialogue", 
    color: "from-purple-500 to-purple-600",
    badge: "New"
  },
  {
    title: "Voice Changer",
    description: "Transform voices while preserving speech patterns",
    icon: Volume2,
    path: "/voice-changer",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Voice Isolator",
    description: "Extract and isolate individual voices from audio",
    icon: Filter,
    path: "/voice-isolator",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    title: "Dubbing",
    description: "Seamlessly dub content in multiple languages",
    icon: Languages,
    path: "/dubbing",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    title: "Sound Effects",
    description: "Generate custom sound effects from text descriptions",
    icon: Sparkles,
    path: "/sound-effects",
    color: "from-pink-500 to-pink-600",
    badge: "Beta"
  },
  {
    title: "Voices",
    description: "Browse and customize AI voice models",
    icon: Users,
    path: "/voices",
    color: "from-teal-500 to-teal-600"
  },
  {
    title: "Forced Alignment",
    description: "Precisely align text with corresponding audio segments",
    icon: AlignLeft,
    path: "/forced-alignment",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Conversational AI",
    description: "Build intelligent voice-enabled applications",
    icon: Bot,
    path: "/conversational-ai",
    color: "from-violet-500 to-violet-600",
    badge: "Pro"
  }
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-6">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          ElevenLabs AI Audio Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore cutting-edge AI audio features that transform how we create, process, and interact with sound
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.path} className="group neon-border hover-glow hover-scale cursor-pointer">
            <Link to={feature.path}>
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
                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/5 transition-colors">
                  Explore Feature
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 pt-8">
        <Card className="text-center neon-border">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <p className="text-muted-foreground">AI Audio Features</p>
          </CardContent>
        </Card>
        <Card className="text-center neon-border">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <p className="text-muted-foreground">Accuracy Rate</p>
          </CardContent>
        </Card>
        <Card className="text-center neon-border">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <p className="text-muted-foreground">Supported Languages</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
