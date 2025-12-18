'use client';

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

export default function Skills() {
  const { ref } = useSectionInView("Skills", 0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Calculate total skills
  const totalSkills = skillsData.reduce((acc, category) => acc + category.skills.length, 0);

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 w-full max-w-7xl scroll-mt-28 px-4 mx-auto"
    >
      <SectionHeading>Skills & Expertise</SectionHeading>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-[42rem] mx-auto">
        Technical proficiency across multiple domains, from backend development to AI integration and cloud infrastructure.
      </p>
      
      {/* Stats */}
      <div className="flex justify-center gap-8 mb-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#016782]">{skillsData.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#016782]">{totalSkills}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
        </div>
      </div>

      {/* Skills grid with Code Editor Mockup */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            onMouseEnter={() => setHoveredCard(categoryIndex)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group"
          >
            {/* Code Editor Mockup Frame */}
            <div className={`bg-gray-900 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
              hoveredCard === categoryIndex ? 'shadow-[#016782]/20 -translate-y-1' : ''
            }`}>
              {/* Editor Header/Title Bar */}
              <div className="bg-[#016782] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-white text-sm font-medium ml-2">{category.category}</span>
                </div>
                <span className="text-white text-xs bg-white/20 px-2 py-0.5 rounded">
                  {category.skills.length} skills
                </span>
              </div>
              
              {/* Editor Content Area */}
              <div className="bg-gray-800 p-4">
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="font-mono text-sm">
                      {/* Code-like skill display */}
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 select-none w-6 text-right">{skillIndex + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-300">
                              <span className="text-[#016782]">const</span>{' '}
                              <span className="text-blue-400">{skill.name.replace(/\s+/g, '')}</span>{' '}
                              <span className="text-gray-500">=</span>
                            </span>
                            <span className="text-[#016782] text-xs font-semibold">
                              {skill.proficiency}%
                            </span>
                          </div>
                          {/* Progress bar */}
                          <div className="relative h-1 bg-gray-700 rounded-full overflow-hidden ml-6">
                            <div
                              className="absolute top-0 left-0 h-full bg-[#016782] rounded-full transition-all duration-500 ease-out"
                              style={{ 
                                width: hoveredCard === categoryIndex ? `${skill.proficiency}%` : '0%',
                                transitionDelay: `${skillIndex * 50}ms`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Editor Footer/Status Bar */}
              <div className="bg-[#015165] px-4 py-1 flex items-center justify-between text-xs">
                <span className="text-gray-300">UTF-8</span>
                <span className="text-gray-300">Skills: {category.skills.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          Continuously learning and adapting to new technologies
        </p>
      </div>
    </section>
  );
}
