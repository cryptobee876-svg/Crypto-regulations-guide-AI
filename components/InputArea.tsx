import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';

interface InputAreaProps {
  onSend: (text: string) => void;
  disabled: boolean;
  placeholder?: string;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, disabled, placeholder }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="sticky bottom-0 w-full p-4 md:p-6 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent z-20">
      <div className="max-w-4xl mx-auto relative group">
        
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur duration-500"></div>
        
        <div className="relative flex items-end gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl">
          
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder || "Ask about global crypto regulations, AML compliance, or risk factors..."}
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 focus:ring-0 resize-none py-3 px-4 max-h-[120px] text-sm md:text-base leading-relaxed scrollbar-thin scrollbar-thumb-slate-700"
            rows={1}
          />

          <div className="flex items-center gap-1 shrink-0 pb-1">
             <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors md:hidden">
              <Mic size={18} />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || disabled}
              className={`
                p-3 rounded-xl flex items-center justify-center transition-all duration-300
                ${input.trim() && !disabled
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.7)]'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }
              `}
            >
              <Send size={18} className={input.trim() && !disabled ? 'translate-x-0.5' : ''} />
            </button>
          </div>
        </div>
        
        <div className="text-center mt-3">
          <p className="text-[10px] text-slate-600 font-medium tracking-wide">
            AI-generated content may be inaccurate. Verify important regulatory information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputArea;