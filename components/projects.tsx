'use client';

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// PaginationButton Component - Simplified
const PaginationButton = ({ index, currentPage, onClick }) => {
  const isActive = currentPage === index;
  
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 mx-1 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-[#016782] text-white' 
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {index + 1}
    </button>
  );
};

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  // Get unique tags from all projects
  const allTags = ["All", ...Array.from(new Set(projectsData.flatMap(project => project.tags)))];
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(project => project.tags.includes(activeFilter));
  
  // Calculate total pages
  const projectsPerPage = 3;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  // Get current page's projects
  const currentProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  // Handle pagination
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      // Scroll back to projects section top
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 w-full px-4 max-w-7xl mx-auto">
      <div className="relative">
        <SectionHeading>My Projects</SectionHeading>
        
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
          Explore my recent work and personal projects. Each project showcases my technical skills and 
          approach to problem-solving. Click on any project to learn more about the design process, 
          technologies used, and outcomes.
        </p>
        
        {/* Filter tabs - Simplified */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2 self-center">Filter:</span>
          {allTags.map((tag, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${activeFilter === tag 
                  ? 'bg-[#016782] text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => {
                setActiveFilter(tag);
                setCurrentPage(0);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="space-y-12 mt-4">
          {currentProjects.length > 0 ? (
            currentProjects.map((project, index) => (
              <React.Fragment key={index}>
                <Project {...project} index={currentPage * projectsPerPage + index} />
              </React.Fragment>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🔍</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">No projects match the selected filter.</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try selecting a different technology</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Pagination controls - Simplified */}
        {filteredProjects.length > projectsPerPage && (
          <div className="flex flex-col items-center gap-4 mt-16">
            {/* Page indicator text */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Page {currentPage + 1} of {totalPages}
            </div>
            
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md border border-[#016782]/20">
              {/* Previous button */}
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                  ${currentPage === 0 
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#016782] hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <FaArrowLeft />
              </button>
              
              {/* Page number buttons */}
              <div className="flex items-center">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  // Show ellipsis for many pages
                  if (totalPages > 5) {
                    // Always show first, last, current, and adjacent pages
                    if (
                      idx === 0 || 
                      idx === totalPages - 1 || 
                      idx === currentPage || 
                      idx === currentPage - 1 || 
                      idx === currentPage + 1
                    ) {
                      return (
                        <PaginationButton 
                          key={idx}
                          index={idx}
                          currentPage={currentPage}
                          onClick={() => {
                            setCurrentPage(idx);
                            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        />
                      );
                    } else if (
                      (idx === currentPage - 2 && currentPage > 1) || 
                      (idx === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      // Show ellipsis
                      return (
                        <div key={idx} className="w-8 text-center">
                          <span className="text-gray-500 dark:text-gray-400">...</span>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  }
                  
                  // Show all pages if 5 or fewer
                  return (
                    <PaginationButton 
                      key={idx}
                      index={idx}
                      currentPage={currentPage}
                      onClick={() => {
                        setCurrentPage(idx);
                        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    />
                  );
                })}
              </div>
              
              {/* Next button */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                  ${currentPage === totalPages - 1 
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#016782] hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}