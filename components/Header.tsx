import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-slate-300 tracking-wide">
            LIVE COMPLIANCE ENGINE
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
         {/* Right side area empty for now */}
      </div>
    </header>
  );
};

export default Header;