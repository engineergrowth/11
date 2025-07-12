
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Mic, MicOff, MessageCircle, Settings, Zap } from "lucide-react";
import { useState } from "react";

export function ConversationalAI() {
  const [isListening, setIsListening] = useState(false);
  const [messages] = useState([
    { type: "ai", content: "Hello! I'm your AI assistant. How can I help you today?" },
    { type: "user", content: "Can you help me understand quantum computing?" },
    { type: "ai", content: "Absolutely! Quantum computing is a revolutionary technology that uses quantum mechanical phenomena..." }
  ]);

  const demoComponent = (
    <div className="space-y-4">
      <Card className="neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Conversation</span>
            <Badge variant="secondary" className="ml-auto bg-green-500/20 text-green-400 border-green-500/30">
              Active
            </Badge>
          </div>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/40 text-foreground'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          className="flex-1 neon-border"
        />
        <Button
          variant={isListening ? "destructive" : "default"}
          size="icon"
          className="hover-scale"
          onClick={() => setIsListening(!isListening)}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </Button>
      </div>

      {isListening && (
        <Card className="neon-border bg-red-500/10 border-red-500/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-400">Listening...</span>
              <div className="ml-auto flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-1 bg-red-400 rounded animate-pulse" style={{
                    height: `${Math.random() * 16 + 8}px`,
                    animationDelay: `${i * 0.1}s`
                  }}></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Configuration</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Response Style</span>
              <select className="text-xs bg-background border rounded px-2 py-1 neon-border">
                <option>Conversational</option>
                <option>Professional</option>
                <option>Friendly</option>
                <option>Technical</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Voice Model</span>
              <select className="text-xs bg-background border rounded px-2 py-1 neon-border">
                <option>Sarah - Natural</option>
                <option>Alex - Professional</option>
                <option>Emma - Friendly</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Language</span>
              <select className="text-xs bg-background border rounded px-2 py-1 neon-border">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="neon-border bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-primary/20">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Real-time Processing</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Low-latency voice conversations with contextual understanding
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FeatureLayout
      title="Conversational AI"
      description="Build intelligent voice-enabled applications and assistants"
      badge="Enterprise"
      icon={<Bot className="w-6 h-6 text-primary" />}
      whatItDoes="Creates sophisticated voice-based AI assistants capable of natural, contextual conversations. Combines speech recognition, natural language understanding, intelligent response generation, and text-to-speech synthesis into seamless real-time interactions."
      useCase="Perfect for building customer service chatbots, virtual assistants for smart devices, interactive educational tutors, voice-controlled applications, accessibility tools for hands-free computing, or any application requiring natural human-AI voice interaction."
      demoComponent={demoComponent}
      howItWorks="Integrates multiple AI systems including automatic speech recognition (ASR), large language models (LLMs) for understanding and response generation, and neural text-to-speech synthesis. The system maintains conversation context, handles interruptions, and provides low-latency responses for natural dialogue flow."
    />
  );
}
