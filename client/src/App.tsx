
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppLayout } from "@/components/AppLayout";
import { Dashboard } from "@/pages/Dashboard";
import { TextToSpeech } from "@/pages/TextToSpeech";
import { SpeechToText } from "@/pages/SpeechToText";
import { VoiceChanger } from "@/pages/VoiceChanger";
import { VoiceIsolator } from "@/pages/VoiceIsolator";
import { Dubbing } from "@/pages/Dubbing";
import { SoundEffects } from "@/pages/SoundEffects";
import { ForcedAlignment } from "@/pages/ForcedAlignment";
import { ConversationalAI } from "@/pages/ConversationalAI";
import { VoiceClone } from "@/pages/VoiceClone";
import { VoiceDesign } from "@/pages/VoiceDesign";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/text-to-speech" element={<TextToSpeech />} />
              <Route path="/speech-to-text" element={<SpeechToText />} />
              <Route path="/voice-changer" element={<VoiceChanger />} />
              <Route path="/voice-isolator" element={<VoiceIsolator />} />
              <Route path="/dubbing" element={<Dubbing />} />
              <Route path="/sound-effects" element={<SoundEffects />} />
              <Route path="/forced-alignment" element={<ForcedAlignment />} />
              <Route path="/conversational-ai" element={<ConversationalAI />} />
              <Route path="/voice-clone" element={<VoiceClone />} />
              <Route path="/voice-design" element={<VoiceDesign />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
