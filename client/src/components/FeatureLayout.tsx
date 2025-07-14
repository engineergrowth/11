
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface FeatureLayoutProps {
  title: string;
  description: string;
  badge?: string;
  icon: ReactNode;
  whatItDoes: string;
  useCase: string;
  demoComponent: ReactNode;
  howItWorks?: string;
  children?: ReactNode;
}

export function FeatureLayout({
  title,
  description,
  badge,
  icon,
  whatItDoes,
  useCase,
  demoComponent,
  howItWorks,
  children
}: FeatureLayoutProps) {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              {badge && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {badge}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-lg">{description}</p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Info Cards */}
        <div className="space-y-6">
          <Card className="neon-border hover-glow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                What This Feature Does
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{whatItDoes}</p>
            </CardContent>
          </Card>

          <Card className="neon-border hover-glow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Use Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{useCase}</p>
            </CardContent>
          </Card>

          {howItWorks && (
            <Card className="neon-border hover-glow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  How The Demo Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{howItWorks}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Demo */}
        <div className="space-y-6">
          <Card className="neon-border hover-glow h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Demo & Simulation
              </CardTitle>
              <CardDescription>
                Interactive preview of this feature
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {demoComponent}
            </CardContent>
          </Card>
          {children}
        </div>
      </div>
    </div>
  );
}
