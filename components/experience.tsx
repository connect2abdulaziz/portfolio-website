"use client";

import React, { useState, useRef } from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { motion } from "framer-motion";
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaClock, 
  FaExternalLinkAlt,
  FaUserTie,
} from "react-icons/fa";
import { MdWork, MdSchool } from "react-icons/md";

export default function Experience() {
  const { ref } = useSectionInView("Experience", 0);
  const { theme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Toggle expanded state for timeline items
  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => 
      prev.includes(index) 
        ? prev.filter(item => item !== index) 
        : [...prev, index]
    );
  };
  
  // Check if an item is expanded
  const isExpanded = (index: number) => expandedItems.includes(index);

  // Get icon based on job type - Simplified to theme color
  const getTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'internship':
        return <FaGraduationCap className="text-[#016782]" />;
      case 'education':
        return <MdSchool className="text-[#016782]" />;
      case 'fulltime':
        return <MdWork className="text-[#016782]" />;
      case 'parttime':
        return <FaUserTie className="text-[#016782]" />;
      default:
        return <FaBriefcase className="text-[#016782]" />;
    }
  };

  // Filter experiences based on active filter
  const filteredExperiences = activeFilter === "All" 
    ? experiencesData 
    : experiencesData.filter(exp => exp.type?.toLowerCase() === activeFilter.toLowerCase());

  // Get all unique experience types for filter tabs
  const expTypes = ["All", ...Array.from(new Set(experiencesData.map(exp => 
    exp.type ? exp.type.charAt(0).toUpperCase() + exp.type.slice(1).toLowerCase() : "Other"
  )))];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Simplified color scheme - Single theme color
  const getGradientColors = () => {
    return { 
      light: "bg-white", 
      dark: "bg-gray-800", 
      accent: "bg-[#016782]" 
    };
  };

  // Helper to check if a description should be truncated
  const shouldTruncate = (description: string) => {
    return description && description.length > 150;
  };

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40 w-full px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading>My Experience</SectionHeading>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            My professional journey and career milestones that have shaped my expertise across full-stack development, AI & ML, and leadership roles.
          </p>
          
          {/* Filter tabs - Simplified */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {expTypes.map((type, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeFilter === type 
                    ? 'bg-[#016782] text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Decorative timeline - Simplified */}
          <div className="absolute md:left-1/2 left-4 top-0 bottom-0 w-0.5 bg-[#016782]/30 transform md:-translate-x-1/2 -z-10 rounded-full"></div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {filteredExperiences.map((item, index) => {
              const gradientColors = getGradientColors();
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex ${index % 2 === 0 ? 'md:flex-row flex-row' : 'md:flex-row-reverse flex-row'}`}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Mobile timeline connector */}
                  <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 h-full transform -translate-x-1/2 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                  
                  {/* Desktop timeline connector with animation */}
                  <div className="hidden md:block absolute left-1/2 top-8 w-10 h-0.5 transform -translate-x-1/2 bg-gray-300 dark:bg-gray-700">
                    <motion.div 
                      className={`h-full ${gradientColors.accent}`}
                      initial={{ width: 0 }}
                      animate={{ width: hoveredItem === index ? "100%" : "30%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* Date bubble - repositioned for mobile */}
                  <div className={`absolute md:left-1/2 left-4 top-8 transform md:-translate-x-1/2 -translate-x-1/2 -translate-y-1/2 ${gradientColors.accent} w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-xs font-semibold z-10 shadow-xl border-4 border-white dark:border-gray-900`}>
                    {item.date?.split(' ')[0] || '2023'}
                  </div>
                  
                  {/* Content card - Simplified */}
                  <div 
                    className={`relative mt-16 ml-8 md:ml-0 md:mt-4 w-full md:w-[calc(50%-3rem)] ${
                      theme === "light" 
                        ? gradientColors.light 
                        : gradientColors.dark
                    } border-2 border-[#016782]/40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {/* Colored top bar */}
                    <div className={`h-1.5 w-full ${gradientColors.accent}`}></div>
                    
                    <div className="p-6">
                      {/* Title and location */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {item.title}
                          </h3>
                          <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                            <FaMapMarkerAlt className="mr-1 text-sm" />
                            <span className="text-sm">{item.location}</span>
                          </div>
                          
                          {/* Job type tag - Simplified */}
                          {item.type && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#016782]/10 text-[#016782] border border-[#016782]/20">
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={`p-3 rounded-lg ${theme === "light" ? "bg-white/70" : "bg-gray-800/70"} backdrop-blur-sm shadow-sm`}>
                          {typeof item.icon === 'string' 
                            ? getTypeIcon(item.icon) 
                            : item.icon}
                        </div>
                      </div>
                      
                      {/* Date range */}
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                        <FaClock className="mr-2" />
                        <span>{item.date}</span>
                      </div>
                      
                      {/* Description with expand/collapse */}
                      <div className="relative">
                        <p className={`text-gray-700 dark:text-gray-300 ${
                          !isExpanded(index) && shouldTruncate(item.description) 
                            ? "line-clamp-3" 
                            : ""
                        }`}>
                          {item.description}
                        </p>
                      </div>
                      {/* Detailed bullet points - shown when expanded */}
                      {isExpanded(index) && item.details && (
                        <motion.div 
                          className="mt-4 pt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                        >
                          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <span className="text-[#016782] mr-2 mt-1">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                      
                      {/* Skills or technologies used - Simplified */}
                      {item.skills && (
                        <div className="mt-4 pt-4 border-t border-[#016782]/20">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Skills & Technologies:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, skillIndex) => (
                              <span 
                                key={skillIndex}
                                className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#016782]/10 text-[#016782] border border-[#016782]/20"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Link if available - Simplified */}
                      {item.link && (
                        <a 
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center text-sm font-medium text-[#016782] hover:text-[#015165] transition-colors"
                        >
                          Visit project <FaExternalLinkAlt className="ml-1 text-xs" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}