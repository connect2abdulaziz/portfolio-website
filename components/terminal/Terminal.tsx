import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/theme-context';
import {
  handleSkillsCommand,
  handleExperienceCommand,
  handleProjectsCommand,
  handleContactCommand,
  handleResumeCommand
} from '@/lib/terminal-commands';
import { handleChatCommand, handleChatCommandSync, initializeChatSession } from '@/lib/chatbot-handler';

const Terminal = () => {
  const { theme } = useTheme();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // ASCII Art for header - Desktop version
  const asciiArt = `
  ░█████╗░██████╗░██████╗░██╗░░░██╗██╗░░░░░  ░█████╗░███████╗██╗███████╗
  ██╔══██╗██╔══██╗██╔══██╗██║░░░██║██║░░░░░  ██╔══██╗╚════██║██║╚════██║
  ███████║██████╦╝██║░░██║██║░░░██║██║░░░░░  ███████║░░███╔═╝██║░███╔═╝░
  ██╔══██║██╔══██╗██║░░██║██║░░░██║██║░░░░░  ██╔══██║██╔══╝░░██║██╔══╝░░
  ██║░░██║██████╦╝██████╔╝╚██████╔╝███████╗  ██║░░██║███████╗██║███████╗
  ╚═╝░░╚═╝╚═════╝░╚═════╝░░╚═════╝░╚══════╝  ╚═╝░░╚═╝╚══════╝╚═╝╚══════╝`;

  // Mobile-friendly ASCII Art
  const mobileAsciiArt = `
   █████╗ ██████╗ ██████╗ ██╗   ██╗██╗     
  ██╔══██╗██╔══██╗██╔══██╗██║   ██║██║     
  ███████║██████╔╝██║  ██║██║   ██║██║     
  ██╔══██║██╔══██╗██║  ██║██║   ██║██║     
  ██║  ██║██████╔╝██████╔╝╚██████╔╝███████╗
  ╚═╝  ╚═╝╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝
         █████╗ ███████╗██╗███████╗        
        ██╔══██╗╚════██║██║╚════██║        
        ███████║  ███╔═╝██║  ███╔═╝        
        ██╔══██║ ██╔══╝ ██║ ██╔══╝         
        ██║  ██║ ███████╗██║ ███████╗       
        ╚═╝  ╚═╝ ╚══════╝╚═╝ ╚══════╝       `;

  const welcomeMessage = [
    "",
    "Welcome to Abdul Aziz's Interactive Terminal Portfolio",
    "Senior Software Engineer & Team Lead | Full Stack & AI Developer",
    "",
    "Type 'help' to see available commands",
    "Type 'chat' to start AI conversation",
    "Type 'about' to learn more about me",
    ""
  ];

  // Theme-aware colors
  const getThemeColors = () => {
    if (theme === 'light') {
      return {
        background: 'bg-gray-50',
        terminalBg: 'bg-white',
        border: 'border-gray-300',
        headerBg: 'bg-gray-100',
        text: 'text-gray-800',
        accent: 'text-[#016782]',
        secondary: 'text-gray-600',
        success: 'text-green-600',
        info: 'text-[#016782]',
        warning: 'text-orange-500',
        prompt: 'text-[#016782]',
        chatPrompt: 'text-[#016782]',
        cursor: 'text-[#016782]',
        ascii: 'text-gray-700'
      };
    } else {
      return {
        background: 'bg-black',
        terminalBg: 'bg-black',
        border: 'border-gray-600',
        headerBg: 'bg-gray-800',
        text: 'text-green-400',
        accent: 'text-green-300',
        secondary: 'text-cyan-400',
        success: 'text-green-400',
        info: 'text-[#016782]',
        warning: 'text-yellow-400',
        prompt: 'text-green-400',
        chatPrompt: 'text-[#016782]',
        cursor: 'text-green-400',
        ascii: 'text-green-300'
      };
    }
  };

  const colors = getThemeColors();

  useEffect(() => {
    // Detect mobile screen size
    const isMobile = window.innerWidth < 768;
    const artToUse = isMobile ? mobileAsciiArt : asciiArt;

    // Initialize with welcome message
    setHistory([
      {
        type: 'ascii',
        content: artToUse,
        timestamp: new Date().toLocaleTimeString()
      },
      ...welcomeMessage.map(line => ({
        type: 'system',
        content: line,
        timestamp: new Date().toLocaleTimeString()
      }))
    ]);

    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const parseCommand = (commandStr: string) => {
    const parts = commandStr.trim().split(' ');
    const command = parts[0].toLowerCase();
    const flags = parts.slice(1);
    return { command, flags };
  };

  const addToHistory = (type: string, content: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setHistory(prev => [...prev, { type, content, timestamp }]);
  };

  const handleCommand = (commandStr: string) => {
    // Add command to history
    addToHistory('command', commandStr);

    // Add to command history for arrow key navigation
    setCommandHistory(prev => [...prev, commandStr]);
    setHistoryIndex(-1);

    // Handle chat mode
    // Handle chat mode
    if (isChatMode) {
      if (commandStr.toLowerCase().trim() === 'exit' || commandStr.toLowerCase().trim() === 'quit') {
        setIsChatMode(false);

        // Handle exit with async function and thinking delay
        setIsTyping(true);
        const minThinkingTime = 1000; // 1 second for exit
        const startTime = Date.now();

        handleChatCommand(commandStr).then(response => {
          const elapsed = Date.now() - startTime;
          const remainingDelay = Math.max(0, minThinkingTime - elapsed);

          setTimeout(() => {
            addToHistory('chat', response);
            setIsTyping(false);
          }, remainingDelay);
        }).catch(() => {
          const elapsed = Date.now() - startTime;
          const remainingDelay = Math.max(0, minThinkingTime - elapsed);

          // Fallback to sync version
          setTimeout(() => {
            const response = handleChatCommandSync(commandStr);
            addToHistory('chat', response);
            setIsTyping(false);
          }, remainingDelay);
        });
        return;
      }

      // Process chat message with Gemini API
      setIsTyping(true);

      // Add minimum delay to show thinking animation
      const minThinkingTime = 1500; // 1.5 seconds minimum thinking time
      const startTime = Date.now();

      handleChatCommand(commandStr)
        .then(response => {
          const elapsed = Date.now() - startTime;
          const remainingDelay = Math.max(0, minThinkingTime - elapsed);

          // Wait for remaining time before showing response
          setTimeout(() => {
            addToHistory('chat', response);
            setIsTyping(false);
          }, remainingDelay);
        })
        .catch(error => {
          console.error('Chat error:', error);
          const elapsed = Date.now() - startTime;
          const remainingDelay = Math.max(0, minThinkingTime - elapsed);

          // Fallback to sync version with same delay
          setTimeout(() => {
            const response = handleChatCommandSync(commandStr);
            addToHistory('chat', response);
            setIsTyping(false);
          }, remainingDelay);
        });
      return;
    }

    const { command, flags } = parseCommand(commandStr);

    // Handle different commands
    let response = '';

    try {
      switch (command) {
        case 'help':
          response = `Available commands:
  about              - Learn about Abdul Aziz
  skills [flags]     - View technical skills and expertise
  experience [flags] - Professional experience and career journey
  projects [flags]   - Portfolio projects and client work
  contact            - Get in touch and social links
  resume [flags]     - Resume and CV options
  chat               - Start AI conversation with Abdul's assistant
  clear              - Clear terminal screen
  
Advanced Usage:
  skills --backend       - Backend technologies and proficiency
  skills --frontend      - Frontend development skills
  skills --ai            - AI/ML technologies and tools
  skills --devops        - DevOps & Cloud expertise
  
  experience --current   - Current positions and roles
  experience --fulltime  - Full-time work experience
  experience --education - Educational background
  
  projects --client      - Client projects (sellrgrid, proteinwriter, etc.)
  projects --ai          - AI/Machine Learning projects
  projects --fullstack   - Full-stack web applications
  projects --mobile      - Mobile applications
  
  resume --download      - Download PDF resume
  resume --view          - View resume in browser
  resume --stats         - Resume statistics
  resume --help          - Resume command help
  
AI Chat Assistant:
  chat                   - Start interactive conversation
  (In chat mode, ask natural questions about Abdul's background)
  
Pro Tips:
  • Use arrow keys to navigate command history
  • Add --help to any command for detailed usage
  • Commands are case-insensitive
  
Try: skills --backend, projects --client, resume --download, or chat`;
          break;

        case 'clear':
          setHistory([]);
          return;

        case 'chat':
          setIsChatMode(true);
          response = initializeChatSession();
          break;

        case 'about':
          response = `Abdul Aziz - Senior Software Engineer & Team Lead

Education: BS Computer Science from PUCIT (Punjab University Lahore)
Location: Lahore, Punjab, Pakistan
Currently: Leading development teams at Developer Tag & DiveScale

EXPERTISE OVERVIEW:
─────────────────────────────────────────────────────────────
Full Stack Development       AI/LLM Integration
   • MERN Stack (Expert)        • LangChain & LangGraph
   • Next.js (Advanced)         • OpenAI API Integration
   • TypeScript/JavaScript      • RAGs & Vector Databases
   • State Management           • Prompt Engineering

DevOps & Cloud               Backend Architecture
   • AWS & Railway              • WebSockets & Real-time
   • Docker Containerization    • MongoDB Aggregation
   • CI/CD Pipelines            • Query Optimization
   • Payment Integrations       • RBAC & Permissions

NOTABLE ACHIEVEMENTS:
• Built production apps: sellrgrid.com, proteinwriter.com, nordsecpro.com
• Strong problem-solving skills with n+ client projects delivered
• Team leadership experience with mentoring capabilities
• Advanced MongoDB pipeline optimization and lookup queries

CONNECT WITH ME:
All social platforms: @connect2abdulaziz (GitHub, LinkedIn, LeetCode, etc.)

Use 'skills', 'experience', 'projects' commands or 'chat' for AI conversation!`;
          break;

        case 'skills':
          response = handleSkillsCommand(flags);
          break;

        case 'experience':
          response = handleExperienceCommand(flags);
          break;

        case 'projects':
          response = handleProjectsCommand(flags);
          break;

        case 'contact':
          response = handleContactCommand();
          break;

        case 'resume':
          response = handleResumeCommand(flags);
          break;

        // Easter eggs and fun commands
        case 'whoami':
          response = `abdul@aziz:~$ Abdul Aziz - The problem solver who turns coffee into code ☕➡️💻`;
          break;

        case 'pwd':
          response = `/home/abdul/projects/portfolio-terminal`;
          break;

        case 'ls':
          response = `drwxr-xr-x  skills/
drwxr-xr-x  projects/
drwxr-xr-x  experience/
drwxr-xr-x  chat-ai/
-rw-r--r--  about.txt
-rw-r--r--  contact.json
-rw-r--r--  resume.pdf`;
          break;

        case 'date':
          response = new Date().toString();
          break;

        case 'echo':
          response = flags.join(' ') || '';
          break;

        case 'theme':
          response = `Current theme: ${theme}
Available themes: light, dark
Use the theme toggle button to switch themes.`;
          break;

        case '':
          return; // Empty command, do nothing

        default:
          // Check if it's a command with typo
          const suggestions = ['help', 'about', 'skills', 'experience', 'projects', 'contact', 'resume', 'chat', 'clear'];
          const suggestion = suggestions.find(cmd =>
            cmd.includes(command) || command.includes(cmd) ||
            levenshteinDistance(command, cmd) <= 2
          );

          response = `Command not found: ${command}`;
          if (suggestion) {
            response += `\n\nDid you mean: ${suggestion}?`;
          }
          response += `\nType 'help' to see available commands.`;
      }
    } catch (error) {
      response = `Error executing command: ${error.message}`;
    }

    // Add response to history with typing effect
    setIsTyping(true);
    setTimeout(() => {
      addToHistory('response', response);
      setIsTyping(false);
    }, Math.min(response.length * 2, 1500)); // Dynamic typing delay
  };

  // Simple Levenshtein distance for command suggestions
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        handleCommand(input);
        setInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const commands = ['help', 'about', 'skills', 'experience', 'projects', 'contact', 'resume', 'chat', 'clear'];
      const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Click anywhere to focus input
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getPrompt = () => {
    if (isChatMode) {
      return "chat@abdul:~$";
    }
    return "abdul@aziz:~$";
  };

  const getPlaceholder = () => {
    const isMobile = window.innerWidth < 640;
    if (isChatMode) {
      return isMobile ? "Ask anything..." : "Ask me anything about Abdul... (type 'exit' to leave chat)";
    }
    return isMobile ? "Type command..." : "Type a command...";
  };

  return (
    <div className={`min-h-screen pt-24 ${colors.background} ${colors.text} font-mono overflow-hidden`}>
      {/* Terminal Window Header */}
      <div className={`${colors.headerBg} ${colors.border} border-b p-2 flex items-center justify-between ${theme === 'light' ? 'shadow-sm' : ''
        }`}>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className={`text-xs sm:text-sm ml-2 sm:ml-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} truncate`}>
            Abdul Aziz {isChatMode && "[CHAT]"}
          </span>
        </div>
        <div className={`text-[0.6rem] sm:text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} hidden sm:block`}>
          connect2abdulaziz@terminal:~
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className={`h-screen overflow-y-auto p-2 sm:p-4 cursor-text ${colors.terminalBg} ${theme === 'light' ? 'shadow-inner' : ''
          }`}
        style={{ height: 'calc(100vh - 40px)' }}
      >
        {/* Command History */}
        {history.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-1"
          >
            {entry.type === 'ascii' && (
              <pre className={`${colors.ascii} text-[0.5rem] sm:text-xs md:text-sm leading-tight mb-4 overflow-x-auto whitespace-pre ${theme === 'light' ? 'font-bold' : ''
                }`}>
                {entry.content}
              </pre>
            )}

            {entry.type === 'system' && (
              <div className={`${colors.secondary} text-xs sm:text-sm md:text-base`}>
                {entry.content}
              </div>
            )}

            {entry.type === 'command' && (
              <div className="flex items-center">
                <span className={`mr-1 sm:mr-2 text-xs sm:text-base ${isChatMode ? colors.chatPrompt : colors.prompt}`}>
                  {getPrompt()}
                </span>
                <span className={`text-xs sm:text-base ${theme === 'light' ? 'text-gray-900 font-medium' : 'text-white'}`}>
                  {entry.content}
                </span>
              </div>
            )}

            {entry.type === 'response' && (
              <pre className={`${colors.accent} whitespace-pre-wrap ml-0 mt-1 mb-2 text-xs sm:text-sm md:text-base ${theme === 'light' ? 'font-medium' : ''
                }`}>
                {entry.content}
              </pre>
            )}

            {entry.type === 'chat' && (
              <div className="ml-0 mt-1 mb-2">
                <div className="flex items-start space-x-1 sm:space-x-2">
                  <span className={`${colors.info} text-xs sm:text-base font-bold`}>[AI]</span>
                  <pre className={`${colors.info} whitespace-pre-wrap flex-1 text-xs sm:text-sm md:text-base ${theme === 'light' ? 'font-medium' : ''
                    }`}>
                    {entry.content}
                  </pre>
                </div>
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center ${colors.warning} text-xs sm:text-sm`}
          >
            <span className="mr-2">
              {isChatMode ? "Thinking..." : "Processing..."}
            </span>
            <div className="flex space-x-1">
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-yellow-400'}`}
              />
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-yellow-400'}`}
              />
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-yellow-400'}`}
              />
            </div>
          </motion.div>
        )}

        {/* Current Input Line */}
        <div className="flex items-center">
          <span className={`mr-1 sm:mr-2 font-bold text-xs sm:text-base ${isChatMode ? colors.chatPrompt : colors.prompt}`}>
            {getPrompt()}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className={`bg-transparent border-none outline-none flex-1 font-mono text-xs sm:text-base ${theme === 'light' ? 'text-gray-900 placeholder-gray-500' : 'text-white placeholder-gray-400'
              }`}
            placeholder={getPlaceholder()}
            autoComplete="off"
            spellCheck="false"
          />
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className={`ml-1 text-xs sm:text-base ${isChatMode ? colors.chatPrompt : colors.cursor}`}
          >
            ▓
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;