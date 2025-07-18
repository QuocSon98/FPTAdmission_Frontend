import React, { useState, useCallback, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, BotMessageSquare } from 'lucide-react';
import { getAIResponse, type Message, type ResponseMessage } from '../utils/AIResponse';

const ChatWidget: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Handle widget toggle
    const toggleWidget = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    // Handle sending a message
    const handleSendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: text.trim(),
            role: 'user',
            timestamp: new Date()
        };

        // Add user message immediately
        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Show typing indicator
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(async () => {
            const response: ResponseMessage = await getAIResponse(text);

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: response.content,
                role: response.role,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1500);
    }, []);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() && !isTyping) {
            handleSendMessage(inputText);
        }
    };

    // Message bubble component
    const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
        const isUser = message.role === 'user';

        return (
            <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
                {!isUser && (
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Bot size={12} className="text-white" />
                    </div>
                )}

                <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
                    <div
                        className={`px-3 py-2 rounded-lg text-sm ${isUser
                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-sm'
                                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                            }`}
                    >
                        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>

                {isUser && (
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center order-2">
                        <User size={12} className="text-white" />
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Chat Widget Container */}
            <div className="fixed bottom-5 right-5 z-50">
                {/* Minimized State - Bot Icon */}
                {!isExpanded && (
                    <button
                        onClick={toggleWidget}
                        className="p-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                        aria-label="Open chat"
                    >
                        <BotMessageSquare size={35} className="group-hover:scale-110 transition-transform duration-200" />

                        {/* Notification dot (optional) */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </button>
                )}

                {/* Expanded State - Chat Box */}
                {isExpanded && (
                    <div className="w-80 h-96 md:w-96 md:h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <Bot size={16} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">AI Admissions Assistant</h3>
                                    <p className="text-xs text-orange-100">Online • Ready to help</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleWidget}
                                className="w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-200"
                                aria-label="Minimize chat"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                            {messages.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Bot size={20} className="text-orange-500" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Welcome!</h4>
                                    <p className="text-sm text-gray-600">
                                        I'm here to help with college admissions. Ask me about deadlines, requirements, or anything else!
                                    </p>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <MessageBubble key={message.id} message={message} />
                                ))
                            )}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex gap-2 justify-start mb-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                        <Bot size={12} className="text-white" />
                                    </div>
                                    <div className="bg-gray-100 rounded-lg rounded-bl-sm px-3 py-2">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-gray-200 bg-white p-4">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Ask about admissions..."
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all"
                                    disabled={isTyping}
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim() || isTyping}
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-lg transition-all flex items-center justify-center min-w-[40px]"
                                >
                                    <Send size={14} />
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Responsive Overlay */}
            {isExpanded && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleWidget}></div>
            )}

            {/* Mobile Full Screen Chat */}
            {isExpanded && (
                <div className="md:hidden fixed inset-4 z-50 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <Bot size={16} />
                            </div>
                            <div>
                                <h3 className="font-semibold">AI Admissions Assistant</h3>
                                <p className="text-sm text-orange-100">Online • Ready to help</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleWidget}
                            className="w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-200"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bot size={24} className="text-orange-500" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Welcome!</h4>
                                <p className="text-gray-600">
                                    I'm here to help with college admissions. Ask me about deadlines, requirements, or anything else!
                                </p>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <MessageBubble key={message.id} message={message} />
                            ))
                        )}

                        {isTyping && (
                            <div className="flex gap-3 justify-start mb-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div className="bg-gray-100 rounded-lg px-4 py-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-200 bg-white p-4">
                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Ask about admissions..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                disabled={isTyping}
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim() || isTyping}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-lg transition-all flex items-center justify-center"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;