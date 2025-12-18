"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useTheme } from "@/context/theme-context";
import { FaCode } from "react-icons/fa";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";
import { Monitor, User, MessageCircle } from "lucide-react";

interface HeaderProps {
  viewMode?: 'portfolio' | 'terminal';
  onViewModeChange?: (mode: 'portfolio' | 'terminal') => void;
  onChatToggle?: () => void;
  showChatWidget?: boolean;
}

export default function Header({
  viewMode = 'portfolio',
  onViewModeChange,
  onChatToggle,
  showChatWidget = false
}: HeaderProps) {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check for scroll position to add effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[999] flex justify-center pt-4 px-4">
      {/* Modern panel container */}
      <motion.div
        className={`w-full max-w-6xl ${isScrolled
          ? theme === "light"
            ? "py-3 px-6 bg-white/80 backdrop-blur-xl border border-[#016782]/20 shadow-lg rounded-2xl"
            : "py-3 px-6 bg-gray-900/80 backdrop-blur-xl border border-[#016782]/30 shadow-2xl rounded-2xl"
          : theme === "light"
            ? "py-4 px-6 bg-white/60 backdrop-blur-lg border border-[#016782]/10 shadow-md rounded-2xl"
            : "py-4 px-6 bg-gray-900/60 backdrop-blur-lg border border-[#016782]/20 shadow-xl rounded-2xl"
          } transition-all duration-300`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Container content */}
        <div className="flex items-center justify-between relative z-10">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-[#016782] text-white shadow-lg hover:scale-105 transition-transform`}>
              <FaCode className="text-lg" />
            </div>
            <span className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"
              } hidden sm:block`}>
              Abdul Aziz
              {viewMode === 'terminal' && (
                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-green-600 text-white">
                  Terminal
                </span>
              )}
            </span>
          </motion.div>

          {/* Desktop Navigation - Only show in portfolio mode */}
          {viewMode === 'portfolio' && (
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-1">
                {links.map((link, index) => (
                  <NavItem
                    key={link.hash}
                    link={link}
                    index={index}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    setTimeOfLastClick={setTimeOfLastClick}
                    theme={theme}
                  />
                ))}
              </ul>
            </nav>
          )}

          {/* Terminal Mode Navigation */}
          {viewMode === 'terminal' && (
            <nav className="hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Interactive Terminal Experience
                    </span>
                  </div>
                  <div className="hidden lg:flex items-center gap-4 text-xs">
                    <span className={`px-2 py-1 rounded-full ${theme === "light"
                      ? "bg-green-100 text-green-700"
                      : "bg-green-900/50 text-green-400"
                      }`}>
                      AI Powered
                    </span>
                    <span className={`px-2 py-1 rounded-full ${theme === "light"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-blue-900/50 text-blue-400"
                      }`}>
                      Interactive
                    </span>
                  </div>
                </div>
              </div>
            </nav>
          )}

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Portfolio/Terminal Toggle - Professional Design */}
            {onViewModeChange && (
              <motion.div
                className="hidden md:flex relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Glass morphism container with gradient border */}
                <div className={`relative p-1 rounded-xl ${theme === "light"
                  ? "bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-lg"
                  : "bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 shadow-xl"
                  } mr-3`}>

                  {/* Background indicator */}
                  <motion.div
                    className={`absolute inset-1 rounded-lg bg-[#016782] transition-all duration-500 ease-out ${viewMode === 'portfolio'
                      ? 'translate-x-0'
                      : 'translate-x-full'
                      }`}
                    style={{
                      width: 'calc(50% - 2px)'
                    }}
                  />

                  <div className="relative flex gap-1">
                    {/* Portfolio Button */}
                    <button
                      onClick={() => onViewModeChange('portfolio')}
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 z-10 ${viewMode === 'portfolio'
                        ? 'text-white !text-white'
                        : theme === "light"
                          ? "text-gray-600 bg-white hover:text-gray-800"
                          : "text-gray-400 bg-gray-900 hover:text-gray-200"
                        }`}
                    >
                      <motion.div
                        animate={{
                          scale: viewMode === 'portfolio' ? 1.1 : 1,
                          rotate: viewMode === 'portfolio' ? 5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className={viewMode === 'portfolio' ? 'text-white' : ''}
                      >
                        <User size={16} className={viewMode === 'portfolio' ? 'text-white' : ''} />
                      </motion.div>
                      <span className={`hidden lg:inline font-medium ${viewMode === 'portfolio' ? 'text-white' : ''}`}>Portfolio</span>

                      {/* Active indicator dot */}
                      {viewMode === 'portfolio' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 bg-white rounded-full ml-1"
                        />
                      )}
                    </button>

                    {/* Terminal Button */}
                    <button
                      onClick={() => onViewModeChange('terminal')}
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 z-10 ${viewMode === 'terminal'
                        ? 'text-white !text-white'
                        : theme === "light"
                          ? "text-gray-600 bg-white hover:text-gray-800"
                          : "text-gray-400 bg-gray-900 hover:text-gray-200"
                        }`}
                    >
                      <motion.div
                        animate={{
                          scale: viewMode === 'terminal' ? 1.1 : 1,
                          rotate: viewMode === 'terminal' ? -5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className={viewMode === 'terminal' ? 'text-white' : ''}
                      >
                        <Monitor size={16} className={viewMode === 'terminal' ? 'text-white' : ''} />
                      </motion.div>
                      <span className={`hidden lg:inline font-medium ${viewMode === 'terminal' ? 'text-white' : ''}`}>Terminal</span>

                      {/* Active indicator dot */}
                      {viewMode === 'terminal' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 bg-white rounded-full ml-1"
                        />
                      )}
                    </button>
                  </div>

                </div>
              </motion.div>
            )}

            {/* AI Chat Toggle - Premium Design */}
            {viewMode === 'portfolio' && onChatToggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden md:block relative mr-2"
              >
                <motion.button
                  onClick={onChatToggle}
                  className={`relative group flex items-center justify-center p-3 rounded-xl overflow-hidden transition-all duration-500 ${showChatWidget
                    ? 'bg-[#016782] text-white shadow-xl'
                    : theme === "light"
                      ? "bg-white/80 backdrop-blur-sm border border-gray-200/60 text-gray-700 hover:text-[#016782] shadow-lg hover:shadow-xl"
                      : "bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 text-gray-300 hover:text-[#016782] shadow-xl hover:shadow-2xl"
                    }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle AI Chat Assistant"
                >

                  {/* Icon with micro-animations */}
                  <motion.div
                    animate={{
                      rotate: showChatWidget ? [0, -10, 10, 0] : 0,
                      scale: showChatWidget ? 1.1 : 1
                    }}
                    transition={{
                      duration: showChatWidget ? 2 : 0.3,
                      repeat: showChatWidget ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  >
                    <MessageCircle size={20} className={showChatWidget ? '!text-white hover:!text-white' : 'text-black hover:text-white dark:text-white'} />
                  </motion.div>

                  {/* AI indicator dots */}
                  {showChatWidget && (
                    <div className="absolute -top-1 -right-1 flex space-x-0.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-green-400 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Ripple effect on active */}
                  {showChatWidget && (
                    <motion.div
                      className="absolute inset-0 border-2 border-[#016782] rounded-xl"
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  )}

                  {/* Tooltip */}
                  <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${theme === "light"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-900"
                    }`}>
                    {showChatWidget ? 'Close AI Chat' : 'Ask AI Anything'}
                    <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${theme === "light" ? "bg-gray-900" : "bg-white"
                      }`} />
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* Theme toggle */}
            <motion.button
              className={`p-2 rounded-full transition-all duration-300 ${theme === "light"
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-lg"
                }`}
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <RiMoonClearLine className="text-xl" /> : <RiSunLine className="text-xl" />}
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                className="flex flex-col items-center justify-center w-10 h-10 rounded-md bg-[#016782] hover:bg-[#015165] focus:outline-none transition-colors shadow-md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block h-[2.5px] w-6 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : 'mb-1.5'}`}></span>
                <span className={`block h-[2.5px] w-6 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'mb-1.5'}`}></span>
                <span className={`block h-[2.5px] w-6 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu - also in panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[997] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile menu panel */}
            <motion.div
              className={`fixed top-24 left-4 right-4 bottom-6 z-[998] md:hidden flex flex-col ${theme === "light"
                ? "bg-white/95"
                : "bg-gray-900/95"
                } backdrop-blur-xl rounded-2xl border border-[#016782]/20 shadow-2xl p-6 overflow-y-auto`}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Mobile View Mode Toggle */}
              {onViewModeChange && (
                <div className="mb-6">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
                    <button
                      onClick={() => {
                        onViewModeChange('portfolio');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-center gap-2 flex-1 py-3 rounded-md text-sm font-medium transition-all duration-300 ${viewMode === 'portfolio'
                        ? 'bg-[#016782] !text-white shadow-sm'
                        : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400'
                        }`}
                    >
                      <User size={16} className={viewMode === 'portfolio' ? '!text-white' : ''} />
                      <span className={viewMode === 'portfolio' ? '!text-white' : ''}>Portfolio View</span>
                    </button>
                    <button
                      onClick={() => {
                        onViewModeChange('terminal');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-center gap-2 flex-1 py-3 rounded-md text-sm font-medium transition-all duration-300 ${viewMode === 'terminal'
                        ? 'bg-[#016782] !text-white shadow-sm'
                        : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400'
                        }`}
                    >
                      <Monitor size={16} className={viewMode === 'terminal' ? '!text-white' : ''} />
                      <span className={viewMode === 'terminal' ? '!text-white' : ''}>Terminal Mode</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Chat Toggle */}
              {viewMode === 'portfolio' && onChatToggle && (
                <div className="mb-6">
                  <button
                    onClick={() => {
                      onChatToggle();
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium transition-all duration-300 ${showChatWidget
                      ? 'bg-[#016782] !text-white'
                      : theme === "light"
                        ? "bg-white text-gray-700 hover:bg-gray-50"
                        : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                      }`}
                  >
                    <MessageCircle size={16} className={showChatWidget ? '!text-white' : ''} />
                    <span className={showChatWidget ? '!text-white' : ''}>{showChatWidget ? 'Close AI Chat' : 'Open AI Chat'}</span>
                  </button>
                </div>
              )}

              {/* Mobile Navigation - Only show in portfolio mode */}
              {viewMode === 'portfolio' && (
                <nav className="flex flex-col items-center justify-center flex-1 w-full">
                  <ul className="flex flex-col items-center space-y-4 w-full">
                    {links.map((link, index) => (
                      <motion.li
                        key={link.hash}
                        className="w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <Link
                          href={link.hash}
                          className={`block text-center py-3 text-lg font-medium rounded-md transition-all duration-300 ${activeSection === link.name
                            ? theme === "light"
                              ? "text-gray-900 bg-gray-100 border border-gray-200"
                              : "text-white bg-gray-800 border border-gray-700"
                            : theme === "light"
                              ? "text-gray-700 bg-gray-50 border border-gray-100 hover:bg-gray-100"
                              : "text-gray-400 bg-gray-900 border border-gray-800 hover:bg-gray-800 hover:text-white"
                            }`}
                          onClick={() => {
                            setActiveSection(link.name);
                            setTimeOfLastClick(Date.now());
                            setMobileMenuOpen(false);
                          }}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* Terminal mode mobile content */}
              {viewMode === 'terminal' && (
                <div className="flex flex-col items-center justify-center flex-1">
                  <div className="text-center">
                    <Monitor size={48} className="mx-auto mb-4 text-[#016782]" />
                    <h3 className={`text-xl font-bold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      Terminal Mode
                    </h3>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Interactive command-line portfolio experience
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

// Nav Item Component
const NavItem = ({ link, index, activeSection, setActiveSection, setTimeOfLastClick, theme }) => {
  return (
    <motion.li
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
    >
      <Link
        href={link.hash}
        className={`relative px-3 py-2 rounded-full font-medium transition-all duration-300 ${activeSection === link.name
          ? theme === "light" ? "text-gray-900" : "text-white"
          : theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-gray-200"
          }`}
        onClick={() => {
          setActiveSection(link.name);
          setTimeOfLastClick(Date.now());
        }}
      >
        {activeSection === link.name && (
          <motion.span
            className={`absolute inset-0 -z-10 rounded-full ${theme === "light"
              ? "bg-gray-100 border-gray-200/70"
              : "bg-[#016782]/20 border border-[#016782]/30"
              }`}
            layoutId="activeSection"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
          />
        )}
        {link.name}
      </Link>
    </motion.li>
  );
};