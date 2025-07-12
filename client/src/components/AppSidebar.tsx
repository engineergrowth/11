
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
  Home,
  Zap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Text to Speech", url: "/text-to-speech", icon: AudioLines },
  { title: "Speech to Text", url: "/speech-to-text", icon: Mic },
  { title: "Text to Dialogue", url: "/text-to-dialogue", icon: MessageSquare },
  { title: "Voice Changer", url: "/voice-changer", icon: Volume2 },
  { title: "Voice Isolator", url: "/voice-isolator", icon: Filter },
  { title: "Dubbing", url: "/dubbing", icon: Languages },
  { title: "Sound Effects", url: "/sound-effects", icon: Sparkles },
  { title: "Voices", url: "/voices", icon: Users },
  { title: "Forced Alignment", url: "/forced-alignment", icon: AlignLeft },
  { title: "Conversational AI", url: "/conversational-ai", icon: Bot },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  
  const getNavClass = (path: string) => {
    const baseClass = "w-full justify-start transition-all duration-200 hover:bg-sidebar-accent/80 rounded-lg";
    return isActive(path) 
      ? `${baseClass} bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-medium`
      : `${baseClass} text-sidebar-foreground hover:text-sidebar-accent-foreground`;
  };

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} border-r border-sidebar-border bg-sidebar transition-all duration-300`}>
      <SidebarContent className="p-4">
        <div className="mb-8 flex items-center gap-3">
          {!isCollapsed && (
            <>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sidebar-foreground text-lg">ElevenLabs</h2>
                <p className="text-xs text-sidebar-foreground/60">AI Audio Platform</p>
              </div>
            </>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mx-auto">
              <Zap className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={`text-sidebar-foreground/80 font-medium mb-2 ${isCollapsed ? 'sr-only' : ''}`}>
            Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink 
                      to={item.url} 
                      className={getNavClass(item.url)}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <item.icon className={`${isCollapsed ? 'mx-auto' : 'mr-3'} h-5 w-5 flex-shrink-0`} />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
