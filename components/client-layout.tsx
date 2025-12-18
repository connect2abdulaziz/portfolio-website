"use client";

import Header from "@/components/header";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ClientLayoutProps {
  children: React.ReactNode;
  viewMode?: 'portfolio' | 'terminal';
  onViewModeChange?: (mode: 'portfolio' | 'terminal') => void;
  onChatToggle?: () => void;
  showChatWidget?: boolean;
}

export default function ClientLayout({
  children,
  viewMode = 'portfolio',
  onViewModeChange,
  onChatToggle,
  showChatWidget = false
}: ClientLayoutProps) {

  return (
    <>
      
      {/* Main content with glass morphism */}
      <div className="relative flex flex-col min-h-screen">
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            {/* Modern panel header */}
            <Header 
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
              onChatToggle={onChatToggle}
              showChatWidget={showChatWidget}
            />
            
            {/* Main content area - Conditional padding for terminal mode */}
            <main className={`flex-grow w-full max-w-7xl mx-auto ${
              viewMode === 'portfolio' ? 'pt-20 pb-20 px-4 sm:px-6' : 'pt-0 pb-0 px-0'
            }`}>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
            
            {/* Footer - Only show in portfolio mode */}
            {viewMode === 'portfolio' && <Footer />}

            {/* Toast notifications with theme-aware galaxy styling */}
            <Toaster 
              position="top-right" 
              toastOptions={{
                className: '',
                style: {
                  background: 'var(--toaster-bg, rgba(255, 255, 255, 0.9))',
                  color: 'var(--toaster-color, #333)',
                  border: '1px solid var(--toaster-border, rgba(226, 232, 240, 0.7))',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.875rem',
                  borderRadius: '0.5rem',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#ECFDF5',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#FEF2F2',
                  },
                }
              }}
            />
            
            {/* Theme toggle button - Only show in portfolio mode */}
            {viewMode === 'portfolio' && (
              <div className="fixed bottom-5 right-5 z-40">
                <ThemeSwitch />
              </div>
            )}
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </div>
      
      {/* CSS Variables */}
      <style jsx global>{`
        /* Override variables for theme integration */
        :root {
          --toaster-bg: rgba(255, 255, 255, 0.85);
          --toaster-color: #333;
          --toaster-border: rgba(226, 232, 240, 0.7);
        }
        
        .dark {
          --toaster-bg: rgba(23, 25, 35, 0.85);
          --toaster-color: #fff;
          --toaster-border: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  );
}