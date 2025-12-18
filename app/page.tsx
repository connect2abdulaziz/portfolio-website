'use client';

import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import Terminal from "@/components/terminal/Terminal";
import ClientLayout from "@/components/client-layout";
import ChatWidget from "@/components/chat-widget";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, MessageCircle } from "lucide-react";

export default function Home() {
  const [viewMode, setViewMode] = useState('portfolio'); // 'portfolio' | 'terminal'
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [loadedSections, setLoadedSections] = useState({
    intro: false,
    about: false,
    projects: false,
    experience: false,
    skills: false,
    contact: false
  });

  useEffect(() => {
    // Progressive loading of sections with skeleton screens
    const loadSections = async () => {
      // Intro loads first
      setTimeout(() => setLoadedSections(prev => ({ ...prev, intro: true })), 200);
      // Then about
      setTimeout(() => setLoadedSections(prev => ({ ...prev, about: true })), 400);
      // Then projects
      setTimeout(() => setLoadedSections(prev => ({ ...prev, projects: true })), 600);
      // Then experience
      setTimeout(() => setLoadedSections(prev => ({ ...prev, experience: true })), 800);
      // Then skills
      setTimeout(() => setLoadedSections(prev => ({ ...prev, skills: true })), 1000);
      // Then contact
      setTimeout(() => setLoadedSections(prev => ({ ...prev, contact: true })), 1200);
    };

    loadSections();
  }, []);

  // Mode toggle functions
  const handleViewModeChange = (mode: 'portfolio' | 'terminal') => {
    setViewMode(mode);
    if (mode === 'terminal') {
      setShowChatWidget(false);
    }
  };

  const handleChatToggle = () => {
    setShowChatWidget(!showChatWidget);
  };

  return (
    <ClientLayout
      viewMode={viewMode}
      onViewModeChange={handleViewModeChange}
      onChatToggle={handleChatToggle}
      showChatWidget={showChatWidget}
    >
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'terminal' ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-screen"
          >
            <Terminal />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Intro section with skeleton */}
            {loadedSections.intro ? (
              <Intro />
            ) : (
              <SkeletonIntro />
            )}

            <SectionDivider />

            {/* About section with skeleton */}
            {loadedSections.about ? (
              <About />
            ) : (
              <SkeletonAbout />
            )}

            {/* Projects section with skeleton */}
            {loadedSections.projects ? (
              <Projects />
            ) : (
              <SkeletonProjects />
            )}

            {/* Experience section with skeleton */}
            {loadedSections.experience ? (
              <Experience />
            ) : (
              <SkeletonExperience />
            )}

            {/* Skills section with skeleton */}
            {loadedSections.skills ? (
              <Skills />
            ) : (
              <SkeletonSkills />
            )}

            {/* Interactive Terminal Preview Section */}
            {loadedSections.skills && (
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-[95%] lg:max-w-7xl scroll-mt-28 mb-28 px-4"
                id="terminal-preview"
              >
                <h2 className="text-3xl font-bold text-center mb-8">Interactive Experience</h2>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-300 text-sm ml-2">Abdul Aziz - Terminal Portfolio</span>
                    </div>
                  </div>
                  <div className="text-green-400 font-mono text-sm space-y-2 mb-6">
                    <div>abdul@aziz:~$ help</div>
                    <div className="text-green-300 text-xs pl-4">
                      Available commands: about | skills | projects | experience | contact | chat
                    </div>
                    <div>abdul@aziz:~$ chat</div>
                    <div className="text-blue-300 text-xs pl-4">
                      🤖 Hi! Ask me anything about Abdul's background and expertise!
                    </div>
                    <div className="flex items-center">
                      <span>chat@abdul:~$ </span>
                      <div className="w-2 h-4 bg-green-400 ml-1 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <button
                        onClick={() => handleViewModeChange('terminal')}
                        className="bg-[#016782] hover:bg-[#014d5f] text-white hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2 mx-auto mb-2"
                      >
                        <Monitor size={20} />
                        Launch Terminal
                      </button>
                      <p className="text-gray-400 text-xs">Full interactive experience</p>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={handleChatToggle}
                        className="bg-[#016782] hover:bg-[#014d5f] text-white hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2 mx-auto mb-2"
                      >
                        <MessageCircle size={20} />
                        Quick Chat
                      </button>
                      <p className="text-gray-400 text-xs">AI assistant widget</p>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Contact section with skeleton */}
            {loadedSections.contact ? (
              <Contact />
            ) : (
              <SkeletonContact />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Functional Chat Widget */}
      <ChatWidget
        isOpen={showChatWidget && viewMode === 'portfolio'}
        onToggle={handleChatToggle}
      />
    </ClientLayout>
  );
}

// Enhanced Skeleton components
function SkeletonIntro() {
  return (
    <section className="w-full max-w-7xl mx-auto text-center px-4 sm:px-6 mb-16 sm:mb-0 scroll-mt-[100rem] min-h-[80vh] flex items-center justify-center">
      <div className="w-full">
        <div className="flex items-center justify-center mb-8">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-800 animate-pulse border-4 border-gray-100 dark:border-gray-900"></div>
        </div>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="h-14 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl animate-pulse mx-auto"></div>
          <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse mx-auto"></div>
          <div className="h-28 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl animate-pulse"></div>
          <div className="flex gap-4 justify-center pt-4">
            <div className="h-12 w-36 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full animate-pulse"></div>
            <div className="h-12 w-36 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkeletonAbout() {
  return (
    <section className="max-w-7xl mx-auto text-center leading-8 sm:mb-40 scroll-mt-28 px-4 mb-28">
      <div className="h-12 w-64 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl animate-pulse mx-auto mb-12"></div>
      <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse mx-auto mb-16"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg p-6">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded-xl animate-pulse mb-4"></div>
            <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-gray-700">
            <div className="h-10 w-20 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded animate-pulse mx-auto mb-2"></div>
            <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse mx-auto"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkeletonProjects() {
  return (
    <section className="w-full max-w-7xl scroll-mt-28 mb-28 px-4 mx-auto">
      <div className="h-12 w-64 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl animate-pulse mx-auto mb-8"></div>
      <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse mx-auto mb-10"></div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-10 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full animate-pulse"></div>
        ))}
      </div>

      <div className="space-y-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-xl">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <div className="w-full max-w-md mx-auto">
                  <div className="bg-white dark:bg-gray-800 rounded-t-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-3 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <div className="h-4 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse mb-4"></div>
                <div className="h-9 w-3/4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-lg animate-pulse mb-4"></div>
                <div className="space-y-3 mb-6">
                  <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-4/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-7 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse"></div>
                  ))}
                </div>
                <div className="flex gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-800">
                  <div className="h-12 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl animate-pulse"></div>
                  <div className="h-12 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkeletonExperience() {
  return (
    <section className="w-full scroll-mt-28 mb-28 sm:mb-40 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-12 w-64 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl animate-pulse mx-auto mb-8"></div>
        <div className="h-5 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse mx-auto mb-8"></div>

        <div className="flex justify-center gap-3 mb-12">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-10 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full animate-pulse"></div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600"></div>

          <div className="space-y-12">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative pl-20">
                <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 border-4 border-white dark:border-gray-900 shadow-xl animate-pulse"></div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg p-6">
                  <div className="h-7 w-3/4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-lg animate-pulse mb-3"></div>
                  <div className="h-5 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse mb-4"></div>

                  <div className="space-y-2 mb-4">
                    <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkeletonSkills() {
  return (
    <section className="w-full max-w-7xl scroll-mt-28 mb-28 px-4 mx-auto">
      <div className="h-12 w-64 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl animate-pulse mx-auto mb-8"></div>
      <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse mx-auto mb-12"></div>

      <div className="flex justify-center gap-8 mb-12">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="text-center">
            <div className="h-10 w-16 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded animate-pulse mx-auto mb-2"></div>
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse mx-auto"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 px-4 py-2 flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                </div>
                <div className="h-4 w-32 bg-gray-500 rounded ml-2"></div>
              </div>
            </div>

            <div className="bg-gray-800 p-4">
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i}>
                    <div className="flex gap-2 mb-1">
                      <div className="w-6 h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 flex-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="h-1 bg-gray-700 rounded-full ml-8"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 px-4 py-1 flex justify-between animate-pulse">
              <div className="h-3 w-12 bg-gray-500 rounded"></div>
              <div className="h-3 w-16 bg-gray-500 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkeletonContact() {
  return (
    <section className="w-full max-w-[95%] lg:max-w-7xl scroll-mt-28 mb-28 px-4 mx-auto">
      <div className="text-center mb-16">
        <div className="h-12 w-64 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl animate-pulse mx-auto mb-4"></div>
        <div className="h-5 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse mx-auto"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 animate-pulse"></div>
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="mb-10 text-center">
              <div className="h-10 w-48 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl animate-pulse mx-auto mb-4"></div>
              <div className="h-5 w-36 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse mx-auto"></div>
            </div>

            <div className="mb-10 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-5 w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 animate-pulse"></div>
          <div className="p-8 lg:p-10">
            <div className="mb-6">
              <div className="h-9 w-48 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl animate-pulse mb-3"></div>
              <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse"></div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl animate-pulse"></div>
                  </div>
                ))}
              </div>

              <div>
                <div className="h-4 w-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl animate-pulse"></div>
              </div>

              <div className="h-12 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}