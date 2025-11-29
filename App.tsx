import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import CryptoMarketWidget from './components/CryptoMarketWidget';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMarketWidgetOpen, setIsMarketWidgetOpen] = useState(false);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'global' | 'country'>('global');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleNavigate = (tab: 'global' | 'country') => {
    setActiveTab(tab);
    if (tab === 'global') {
      setSelectedCountry(null);
    }
  };

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
  };

  const handleClearCountry = () => {
    setSelectedCountry(null);
    // Don't switch tab, just clear selection to show selector again
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onOpenMarketData={() => setIsMarketWidgetOpen(true)}
        activeTab={activeTab}
        onNavigate={handleNavigate}
      />
      
      <div className="flex-1 flex flex-col h-full w-full max-w-[100vw]">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-hidden relative flex flex-col">
          <ChatInterface 
            activeTab={activeTab}
            selectedCountry={selectedCountry}
            onSelectCountry={handleSelectCountry}
            onClearCountry={handleClearCountry}
          />
        </main>
      </div>
      
      <CryptoMarketWidget 
        isOpen={isMarketWidgetOpen} 
        onClose={() => setIsMarketWidgetOpen(false)} 
      />
      
    </div>
  );
};

export default App;