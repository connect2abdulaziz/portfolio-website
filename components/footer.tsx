"use client";

import React from "react";
import Link from "next/link";
import { 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaTwitter, 
  FaHeart, 
  FaMapMarkerAlt,
  FaFileDownload
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Quick links
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  // Social links
  const socialLinks = [
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com/in/connect2abdulaziz", color: "hover:bg-blue-600" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/connect2abdulaziz", color: "hover:bg-gray-700" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com", color: "hover:bg-blue-400" },
    { name: "Email", icon: <FaEnvelope />, url: "mailto:connect2abdulaziz@gmail.com", color: "hover:bg-red-500" },
  ];

  // Stats
  const stats = [
    { value: "300+", label: "LeetCode Problems" },
    { value: "9+", label: "Projects Delivered" },
    { value: "2+", label: "Years Experience" },
  ];
  
  return (
    <footer className="relative pt-20 pb-6 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#016782] to-transparent"></div>
      
      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - About/Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-[#016782] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">AA</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Abdul Aziz</h3>
                <p className="text-xs text-[#016782]">Tech Lead</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Building scalable backend systems, AI integrations, and real-time applications with modern technologies.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="text-[#016782]" />
              <span>Lahore, Pakistan</span>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#016782] dark:hover:text-[#016782] transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#016782] mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Stats */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Highlights</h4>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-[#016782]/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-[#016782]">{stat.value}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>
            <a
              href="/CV.pdf"
              download
              className="mt-6 inline-flex items-center space-x-2 text-sm text-[#016782] hover:text-[#014d5f] transition-colors duration-200 group"
            >
              <FaFileDownload className="group-hover:translate-y-0.5 transition-transform" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Column 4 - Connect */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Connect</h4>
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:connect2abdulaziz@gmail.com"
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#016782] transition-colors"
              >
                <FaEnvelope className="text-[#016782]" />
                <span>connect2abdulaziz@gmail.com</span>
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className={`p-3 bg-gray-200 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white ${social.color} transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Section - Copyright */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>© {currentYear} Abdul Aziz. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaHeart className="text-red-500" />
            </motion.div>
            <span>using React & Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}