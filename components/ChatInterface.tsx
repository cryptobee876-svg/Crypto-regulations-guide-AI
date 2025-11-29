import React, { useState, useEffect, useRef } from 'react';
import { Message, Role } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import CountrySelector from './CountrySelector';
import { ShieldCheck, MapPin, X } from 'lucide-react';

interface ChatInterfaceProps {
  activeTab: 'global' | 'country';
  selectedCountry: string | null;
  onSelectCountry: (country: string) => void;
  onClearCountry: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  activeTab, 
  selectedCountry, 
  onSelectCountry, 
  onClearCountry 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTab, selectedCountry]);

  // Reset/Init messages when tab or country changes
  useEffect(() => {
    if (activeTab === 'global') {
      setMessages([{
        id: 'welcome-global',
        role: Role.MODEL,
        text: "**Global Intelligence Mode Active.**\n\nI am analyzing worldwide regulatory frameworks (MiCA, SEC, IOSCO). Ask me about global AML trends, cross-border compliance, or international licensing standards.",
        timestamp: new Date(),
      }]);
    } else if (activeTab === 'country' && selectedCountry) {
      setMessages([{
        id: `welcome-${selectedCountry}`,
        role: Role.MODEL,
        text: `**Jurisdiction Protocol: ${selectedCountry}**\n\nI have switched context to **${selectedCountry}**. Ask me about local licensing requirements, specific tax treatments, or registration with local authorities (e.g., Central Bank or Securities Commission).`,
        timestamp: new Date(),
      }]);
    } else if (activeTab === 'country' && !selectedCountry) {
      // Clear messages if we are back to selector
      setMessages([]);
    }
  }, [activeTab, selectedCountry]);

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Add temp typing indicator
    const typingId = 'typing-' + Date.now();
    setMessages(prev => [...prev, {
      id: typingId,
      role: Role.MODEL,
      text: '',
      timestamp: new Date(),
      isTyping: true
    }]);

    try {
      // Build history for context
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Pass selectedCountry if activeTab is 'country'
      const countryContext = (activeTab === 'country' && selectedCountry) ? selectedCountry : undefined;

      const response = await sendMessageToGemini(text, history, countryContext);

      // Remove typing indicator and add real message
      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: response.text,
        timestamp: new Date(),
        sources: response.sources
      }));

    } catch (error) {
      console.error(error);
      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
         id: 'error-' + Date.now(),
         role: Role.MODEL,
         text: "An error occurred while connecting to the regulatory database.",
         timestamp: new Date()
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Render Country Selector if mode is 'country' and no country selected
  if (activeTab === 'country' && !selectedCountry) {
    return <CountrySelector onSelectCountry={onSelectCountry} />;
  }

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Country Context Header Banner */}
      {activeTab === 'country' && selectedCountry && (
        <div className="relative z-20 flex items-center justify-between px-6 py-3 bg-indigo-900/20 border-b border-indigo-500/20 backdrop-blur-md">
           <div className="flex items-center gap-2 text-indigo-200">
              <MapPin size={16} />
              <span className="text-sm font-medium">Jurisdiction Context: <span className="text-white font-bold">{selectedCountry}</span></span>
           </div>
           <button 
             onClick={onClearCountry}
             className="flex items-center gap-1 text-xs text-indigo-300 hover:text-white transition-colors"
           >
             <span>Change</span>
             <X size={14} />
           </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-8 pt-8 z-10 scroll-smooth">
         <div className="max-w-4xl mx-auto min-h-full flex flex-col justify-end">
            
            {/* Disclaimer at top of chat stream */}
             <div className="flex justify-center mb-8 opacity-60">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-xs text-slate-400">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span>Encrypted Session • Enterprise Grade Security</span>
                </div>
             </div>

            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} className="h-4" />
         </div>
      </div>

      <InputArea 
        onSend={handleSendMessage} 
        disabled={isLoading} 
        placeholder={activeTab === 'country' ? `Ask about ${selectedCountry} regulations...` : undefined}
      />
    </div>
  );
};

export default ChatInterface;