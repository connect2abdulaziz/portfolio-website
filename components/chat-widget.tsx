import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { handleChatCommand, initializeChatSession } from '@/lib/chatbot-handler';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface ChatMessage {
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: string;
}

export default function ChatWidget({ isOpen, onToggle }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chat session when widget opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = initializeChatSession();
      setMessages([{
        type: 'system',
        content: welcomeMessage,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  }, [isOpen]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when widget opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    const newUserMessage: ChatMessage = {
      type: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    // Simulate typing delay for more realistic feel
    setTimeout(() => {
      try {
        // Get AI response
        const aiResponse = handleChatCommand(userMessage);
        
        const newAiMessage: ChatMessage = {
          type: 'ai',
          content: aiResponse,
          timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, newAiMessage]);
      } catch (error) {
        const errorMessage: ChatMessage = {
          type: 'ai',
          content: 'Sorry, I encountered an error. Please try asking something else!',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 800 + Math.random() * 1000); // Random delay between 0.8-1.8s
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-[6px] right-4 z-50 w-80 sm:w-96 h-[500px] sm:h-[600px] max-h-[calc(100vh-120px)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden flex flex-col backdrop-blur-xl"
        >
          {/* Minimal Header */}
          <div className="bg-gradient-to-r from-[#016782] to-[#015165] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-medium text-sm">AI Assistant</span>
            </div>
            <button
              onClick={onToggle}
              className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Messages Area - Simplified */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    message.type === 'user'
                      ? 'bg-[#016782] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {message.content}
                  </pre>
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator - Simplified */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-[#016782] rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      className="w-2 h-2 bg-[#016782] rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      className="w-2 h-2 bg-[#016782] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area - Minimal */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="p-2 bg-[#016782] text-white hover:text-white rounded-lg hover:bg-[#015165] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}