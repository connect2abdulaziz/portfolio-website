"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { 
  FaBriefcase, 
  FaCode, 
  FaTrophy, 
  FaRocket,
  FaGraduationCap,
  FaUserTie
} from "react-icons/fa";

export default function About() {
  const { ref } = useSectionInView("About");

  const cards = [
    {
      icon: <FaUserTie />,
      title: "Current Role",
      content: "Tech Lead / Senior Backend Engineer @ DeveloperTag, leading a team of 5 engineers in architecting scalable microservices with NestJS, PostgreSQL, and Docker.",
      color: "bg-[#016782]"
    },
    {
      icon: <FaBriefcase />,
      title: "Experience",
      content: "2+ years of professional experience building multi-tenant SaaS platforms, AI-powered chatbots with LangChain/LangGraph, and real-time communication systems.",
      color: "bg-[#016782]"
    },
    {
      icon: <FaCode />,
      title: "Expertise",
      content: "Backend Development (NestJS, Node.js, PostgreSQL, Redis), AI/ML Integration (LangChain, RAG Pipelines), Real-time Systems (WebSockets, Redis Pub/Sub), and Authorization (RBAC, ABAC).",
      color: "bg-[#016782]"
    },
    {
      icon: <FaTrophy />,
      title: "Achievements",
      content: "Led 9+ production projects, achieved 60% query optimization, built systems for 1000+ concurrent users, and solved 300+ LeetCode problems.",
      color: "bg-[#016782]"
    },
    {
      icon: <FaRocket />,
      title: "Specialization",
      content: "Specialized in building scalable backend architecture, AI-powered applications, real-time systems, and enterprise security platforms with clean architecture principles.",
      color: "bg-[#016782]"
    },
    {
      icon: <FaGraduationCap />,
      title: "Education",
      content: "BS Computer Science from Punjab University College of Information Technology (PUCIT) with strong foundation in algorithms, data structures, and software engineering.",
      color: "bg-[#016782]"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative mb-28 w-full max-w-7xl mx-auto text-center sm:mb-40 scroll-mt-28 px-4"
      id="about"
    >
      {/* Header */}
      <div className="mb-16">
        <SectionHeading>About Me</SectionHeading>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Tech Lead / Senior Backend Engineer specializing in scalable backend architecture, AI integration, and real-time systems. 
          Passionate about building robust, efficient, and innovative solutions.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-2 border-[#016782]/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
          >
            {/* Accent Bar */}
            <div className="h-1.5 bg-[#016782]"></div>
            
            {/* Card Content */}
            <div className="p-6">
              {/* Icon */}
              <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#016782]/10 dark:bg-[#016782]/20 text-[#016782] text-2xl group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                {card.title}
              </h3>
              
              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-left">
                {card.content}
              </p>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#016782]/5 rounded-bl-full -z-10"></div>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: "2+", label: "Years Experience" },
          { value: "9+", label: "Projects Delivered" },
          { value: "300+", label: "Problems Solved" },
          { value: "1000+", label: "Users Supported" }
        ].map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border-2 border-[#016782]/30 hover:border-[#016782]/50 transition-all duration-300"
          >
            <div className="text-3xl font-bold text-[#016782] mb-2">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}