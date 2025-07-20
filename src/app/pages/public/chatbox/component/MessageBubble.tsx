import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../utils/AIResponse';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <Bot size={16} className="text-white" />
        </div>
      )}
      
      <div className={`max-w-3xl ${isUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
              : 'bg-white text-gray-800 border-2 border-orange-200'
          }`}
        >
          <p className="text-md leading-relaxed break-words whitespace-pre-wrap word-break overflow-wrap-anywhere">{message.content}</p>
        </div>
        {/* <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div> */}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center order-2">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;