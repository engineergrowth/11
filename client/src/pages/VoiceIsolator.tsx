
import { FeatureLayout } from "@/components/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Filter, Upload, Download, Users, Volume1 } from "lucide-react";

export function VoiceIsolator() {
  const demoComponent = (
    <div className="space-y-4">
      <Button variant="outline" className="w-full neon-border hover-glow" size="lg">
        <Upload className="w-4 h-4 mr-2" />
        Upload Multi-Voice Audio
      </Button>

      <Card className="neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Detected Speakers</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm flex-1">Speaker 1 - Female Voice</span>
              <Button variant="ghost" size="sm">
                <Volume1 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm flex-1">Speaker 2 - Male Voice</span>
              <Button variant="ghost" size="sm">
                <Volume1 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm flex-1">Background Audio</span>
              <Button variant="ghost" size="sm">
                <Volume1 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="neon-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Isolation Progress</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Voice Separation</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Noise Reduction</span>
              <span>92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button className="hover-scale">
          Process Audio
        </Button>
        <Button variant="outline" className="neon-border hover-glow">
          Download All
        </Button>
      </div>
    </div>
  );

  return (
    <FeatureLayout
      title="Voice Isolator"
      description="Extract and separate individual voices from multi-speaker audio"
      icon={<Filter className="w-6 h-6 text-primary" />}
      whatItDoes="Intelligently separates individual speakers from audio recordings containing multiple voices, background noise, or music. Each voice is extracted as a clean, isolated audio track while removing unwanted audio elements."
      useCase="Essential for cleaning up podcast recordings with multiple hosts, extracting specific speakers from meeting recordings, isolating dialogue from movies or shows, creating clean voice samples from noisy environments, or preparing audio for further processing and analysis."
      demoComponent={demoComponent}
      howItWorks="Employs advanced source separation algorithms using deep neural networks trained to recognize different voice characteristics, spatial audio cues, and frequency patterns. The AI distinguishes between speakers based on vocal timbre, pitch patterns, and speaking rhythms to create clean, isolated audio tracks."
    />
  );
}
