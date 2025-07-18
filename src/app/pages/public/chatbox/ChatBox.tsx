import React, { useState, useCallback } from 'react';
import ChatBoxArea from './component/ChatBoxArea';
import InputArea from './component/InputArea';
import { getAIResponse, type Message, type ResponseMessage } from './utils/AIResponse';
import { HeaderBox } from './component/HeaderBox';

export const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    // Handle sending a message
    const handleSendMessage = useCallback(async (text: string) => {
        // Add user message first
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        // Add user message to messages
        setMessages(prev => [...prev, userMessage]);

        // Show typing indicator
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(async () => {
            try {
                const aiResponse: ResponseMessage = await getAIResponse(text);

                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: aiResponse.role,
                    content: aiResponse.content,
                    timestamp: new Date()
                };

                // Add AI message to messages
                setMessages(prev => [...prev, aiMessage]);
            } catch (error) {
                console.error('Error getting AI response:', error);
            } finally {
                setIsTyping(false);
            }
        }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <HeaderBox />
                <ChatBoxArea messages={messages} isTyping={isTyping} />
                <InputArea onSendMessage={handleSendMessage} isTyping={isTyping} />
            </div>
        </div>
    );
}