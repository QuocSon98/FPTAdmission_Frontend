import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isTyping }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isTyping) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {isTyping && (
        <div className="mb-2 text-sm text-gray-500 italic">
          AI Assistant is typing...
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask me about admissions, requirements, deadlines..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-all flex items-center gap-2"
        >
          <Send size={16} />
          Send
        </button>
      </form>
    </div>
  );
};

export default InputArea;