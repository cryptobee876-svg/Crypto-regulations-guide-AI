import React from 'react';
import { Globe, BookOpen, Activity, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMarketData: () => void;
  activeTab: 'global' | 'country';
  onNavigate: (tab: 'global' | 'country') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpenMarketData, activeTab, onNavigate }) => {
  const navItems = [
    { id: 'global', label: "Global Regulations", icon: <Globe size={18} />, active: activeTab === 'global', action: 'global' },
    { id: 'country', label: "Country Search", icon: <BookOpen size={18} />, active: activeTab === 'country', action: 'country' },
    { id: 'market', label: "Live Market Data", icon: <Activity size={18} />, active: false, action: 'market' },
  ];

  const handleItemClick = (action: string) => {
    if (action === 'market') {
      onOpenMarketData();
      // On mobile, we might want to close the sidebar so the user sees the widget
      if (window.innerWidth < 768) {
        onClose();
      }
    } else if (action === 'global' || action === 'country') {
      onNavigate(action as 'global' | 'country');
      if (window.innerWidth < 768) {
        onClose();
      }
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-72 bg-slate-950/90 border-r border-slate-800/50 backdrop-blur-xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="p-6 border-b border-slate-800/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <span className="font-bold text-white text-lg">A</span>
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
            Automind's CRG
          </span>
        </div>

        <div className="p-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
            Intelligence
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleItemClick(item.action)}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${item.active 
                    ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }
                `}
              >
                <span className={`${item.active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`}>
                  {item.icon}
                </span>
                {item.label}
                {item.active && <ChevronRight size={14} className="ml-auto text-indigo-500/50" />}
                {!item.active && item.action === 'market' && (
                  <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">LIVE</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;