"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  // Calculate years of experience (from 2023 to current year)
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const startYear = 2023;
  const startMonth = 6; // June

  let yearsExperience = currentYear - startYear;
  if (currentMonth < startMonth) {
    yearsExperience -= 1;
  }

  const experienceText = yearsExperience >= 1
    ? `${yearsExperience}+ years`
    : `${(currentMonth - startMonth) + (currentYear - startYear) * 12}+ months`;

  // Typing animation state
  const beforeExperience = "Specializing in scalable backend architecture, AI integration, and real-time systems with ";
  const afterExperience = " of experience";
  const fullText = `${beforeExperience}${experienceText}${afterExperience}`;

  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Calculate positions for colored text
  const experienceStartIndex = beforeExperience.length;
  const experienceEndIndex = experienceStartIndex + experienceText.length;

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Speed of typing (30ms per character)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Blink every 500ms

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[80vh] flex flex-col items-center justify-center w-full max-w-7xl mx-auto text-center px-4 sm:px-6 mb-16 sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Profile image - Simplified */}
        <motion.div
          className="relative mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="p-1 rounded-full bg-[#016782] shadow-xl">
              <div className="p-1 rounded-full bg-white dark:bg-gray-900">
                <Image
                  src="/dp.jpg"
                  alt="Abdul Aziz"
                  width="192"
                  height="192"
                  quality="95"
                  priority={true}
                  className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Name and headline - Simplified */}
        <div className="w-full max-w-4xl px-4">
          <motion.h1
            className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Abdul Aziz
          </motion.h1>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-[#016782] mb-5 leading-normal">
              Tech Lead / Senior Engineer
            </h2>

            <div className="relative w-full max-w-3xl mx-auto px-2">
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                {displayedText.slice(0, experienceStartIndex)}
                {displayedText.length > experienceStartIndex && (
                  <span className="text-[#016782] font-semibold">
                    {displayedText.slice(experienceStartIndex, Math.min(displayedText.length, experienceEndIndex))}
                  </span>
                )}
                {displayedText.length > experienceEndIndex && displayedText.slice(experienceEndIndex)}
                <span
                  className={`inline-block w-0.5 h-6 ml-1 bg-[#016782] ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity align-middle`}
                ></span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Action buttons - Simplified */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="#contact"
            className="px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 bg-[#016782] text-white text-sm sm:text-base rounded-lg hover:bg-[#015165] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
            }}
          >
            Contact me
            <BsArrowRight />
          </Link>

          <a
            className="px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm sm:text-base rounded-lg border border-[#016782]/30 hover:border-[#016782] hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
            href="/CV.pdf"
            download
          >
            Download CV
            <HiDownload />
          </a>

          {/* Social links */}
          <div className="flex gap-2 sm:gap-3">
            <a
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#016782] text-white rounded-lg hover:bg-[#015165] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg"
              href="https://linkedin.com/in/connect2abdulaziz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <BsLinkedin className="text-lg sm:text-xl" />
            </a>

            <a
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-[#016782]/30 hover:bg-[#016782] hover:text-white hover:border-[#016782] transition-all duration-200 shadow-md hover:shadow-lg"
              href="https://github.com/connect2abdulaziz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <FaGithubSquare className="text-lg sm:text-xl" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}