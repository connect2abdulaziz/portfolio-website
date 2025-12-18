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

  const handleClearChat = () => {
    setMessages([]);
    const welcomeMessage = initializeChatSession();
    setMessages([{
      type: 'system',
      content: welcomeMessage,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  // Quick suggestion buttons
  const quickSuggestions = [
    "What are Abdul's main skills?",
    "Tell me about his projects",
    "How can I contact him?",
    "What AI technologies does he use?"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          className="fixed  bottom-4 right-4 z-50 w-80 h-[calc(100vh-100px)] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
        >
          {/* Chat Widget Header */}
          <div className="bg-[#016782] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                <p className="text-white/80 text-xs">Ask me about Abdul</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                className="text-white/70 hover:text-white text-xs px-2 py-1 rounded transition-colors"
                title="Clear chat"
              >
                Clear
              </button>
              <button
                onClick={onToggle}
                className="text-white/70 hover:text-white transition-colors"
                title="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800/50">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    message.type === 'user'
                      ? 'bg-[#016782] text-white'
                      : message.type === 'ai'
                      ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-[#016782]/30'
                      : 'bg-[#016782]/10 text-[#016782] dark:text-white border border-[#016782]/30'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-[#016782] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">AI Assistant</span>
                    </div>
                  )}
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    {message.content}
                  </pre>
                  <div className="text-xs opacity-60 mt-1">
                    {message.timestamp}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white dark:bg-gray-700 border border-[#016782]/30 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#016782] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🤖</span>
                  </div>
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 bg-[#016782] rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-[#016782] rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-[#016782] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickSuggestions.slice(0, 2).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(suggestion);
                      setTimeout(handleSendMessage, 100);
                    }}
                    className="text-xs px-2 py-1 bg-[#016782]/10 dark:bg-[#016782]/20 text-[#016782] rounded-full hover:bg-[#016782]/20 dark:hover:bg-[#016782]/30 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Abdul..."
                className="flex-1 px-3 py-2 text-sm border border-[#016782]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016782]/40 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="p-2 bg-[#016782] text-white hover:text-white rounded-lg hover:bg-[#014d5f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Press Enter to send • Powered by AI
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}