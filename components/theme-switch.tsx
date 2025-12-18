"use client";

import { useTheme } from "@/context/theme-context";
import React, { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { motion } from "framer-motion";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="fixed bottom-5 right-5 w-[3rem] h-[3rem] rounded-full flex items-center justify-center transition-all z-50 hover:scale-110"
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Button background with glass effect */}
      <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-[0.5rem] border border-[#016782]/30 rounded-full shadow-lg"></div>
      
      {/* Decorative ring */}
      <div 
        className={`absolute inset-0 rounded-full border-2 border-[#016782] transition-all duration-300 ${
          isHovered ? 'opacity-60 scale-110' : 'opacity-0 scale-100'
        }`}
      />

      {/* Icon container with animation */}
      <div
        className="relative z-10 transition-transform duration-500"
        style={{ 
          transform: `rotate(${theme === "light" ? 0 : 180}deg) scale(${isHovered ? 1.2 : 1})`
        }}
      >
        {/* Sun icon (visible in light mode) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#016782] transition-all duration-300"
          style={{ 
            opacity: theme === "light" ? 1 : 0,
            transform: `scale(${theme === "light" ? 1 : 0.5})`
          }}
        >
          <BsSun className="text-xl" />
        </div>
        
        {/* Moon icon (visible in dark mode) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#016782] transition-all duration-300"
          style={{ 
            opacity: theme === "dark" ? 1 : 0,
            transform: `scale(${theme === "dark" ? 1 : 0.5})`
          }}
        >
          <BsMoon className="text-xl" />
        </div>
      </div>
    </button>
  );
}