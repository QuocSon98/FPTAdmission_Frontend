import React, { useEffect, useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import MessageBubble from './MessageBubble';
import type { Message } from '../utils/AIResponse';

interface ChatBoxProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatBoxArea: React.FC<ChatBoxProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 bg-white overflow-y-auto">

      {/* Messages */}
      <div className="p-6 ">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={24} className="text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Welcome to AI Admissions Assistant!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              I'm here to help you navigate the college admissions process. Ask me about
              application deadlines, requirements, essays, or anything else you'd like to know!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble message={message} />
          ))
        )}

        {isTyping && (
          <div className="flex gap-3 justify-start mb-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <div className="bg-white border-2 border-orange-200 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBoxArea;