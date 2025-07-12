
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border/40 flex items-center px-6 bg-card/50 backdrop-blur-sm">
          <SidebarTrigger className="hover:bg-accent rounded-lg transition-colors" />
          <div className="ml-4">
            <h1 className="text-xl font-semibold text-foreground">ElevenLabs AI Audio</h1>
            <p className="text-sm text-muted-foreground">Explore next-generation audio AI</p>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
