import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Role, Message } from '../types';
import { Bot, User, ExternalLink } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[75%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          ${isUser 
            ? 'bg-slate-800 border border-slate-700 text-slate-300' 
            : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
          }
        `}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          {/* Header Name/Time */}
          <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-sm font-semibold text-slate-200">
              {isUser ? 'You' : 'CRG AI'}
            </span>
            <span className="text-xs text-slate-500">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Bubble */}
          <div className={`
            p-4 md:p-6 rounded-2xl text-sm md:text-base leading-relaxed
            ${isUser
              ? 'bg-slate-800/80 text-slate-200 border border-slate-700 rounded-tr-sm'
              : 'bg-slate-900/40 text-slate-100 border border-slate-700/50 backdrop-blur-sm shadow-xl rounded-tl-sm'
            }
          `}>
            {message.isTyping ? (
               <div className="flex items-center gap-1.5 h-6">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
              </div>
            ) : (
              <div className="prose prose-invert prose-p:my-2 prose-headings:text-indigo-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-ul:list-disc prose-ul:pl-4 max-w-none">
                 <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Sources (Only for AI) */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.sources.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/30 rounded-lg text-xs text-slate-400 hover:text-indigo-300 transition-all group"
                >
                  <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" />
                  <span className="truncate max-w-[150px]">{source.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;