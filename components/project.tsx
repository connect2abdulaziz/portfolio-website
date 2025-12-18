'use client';

import { projectsData } from "@/lib/data";
import Image from "next/image";
import { FaGithub, FaArrowRight } from "react-icons/fa";

type ProjectProps = (typeof projectsData)[number] & {
  index: number;
};

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  githubUrl,
  liveUrl,
  index,
}: ProjectProps) {
  return (
    <article className="mb-8 last:mb-0">
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-[#016782]/20 rounded-3xl overflow-hidden shadow-xl">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#016782]/5 rounded-bl-full"></div>
        
        {/* Project Number Badge */}
        <div className="absolute top-6 left-6 z-10">
          <div className="w-12 h-12 rounded-xl bg-[#016782] text-white flex items-center justify-center font-bold text-lg shadow-lg">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            {/* Laptop Mockup Frame */}
            <div className="relative w-full max-w-md">
              {/* Laptop Screen */}
              <div className="relative bg-[#016782] rounded-t-lg p-2 shadow-2xl">
                {/* Screen Bezel */}
                <div className="bg-gray-800 rounded-t-sm p-1">
                  {/* Top Bar (Camera dot and status bar) */}
                  <div className="flex justify-center items-center mb-1 py-0.5">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                  </div>
                  {/* Screen Content */}
                  <div className="relative bg-white rounded-sm overflow-hidden aspect-video">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      quality={95}
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
              {/* Laptop Base */}
              <div className="relative h-2 bg-gradient-to-b from-[#016782] to-[#015165] rounded-b-lg shadow-lg">
                <div className="absolute inset-x-0 top-0 h-px bg-[#016782]"></div>
              </div>
              {/* Laptop Bottom */}
              <div className="h-1 bg-[#015165] rounded-b-sm mx-auto" style={{ width: '90%' }}></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-between relative">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-16 h-1 bg-[#016782] rounded-br-full"></div>
            
            <div className="flex-1">
              {/* Category/Type Badge */}
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#016782]"></div>
                <span className="text-xs font-semibold text-[#016782] uppercase tracking-wider">Featured Project</span>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base mb-6">
                {description}
              </p>

              {/* Tech Stack Tags */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 mb-3 uppercase tracking-wider">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1.5 bg-gradient-to-r from-[#016782]/10 to-[#016782]/5 dark:from-[#016782]/20 dark:to-[#016782]/10 text-[#016782] text-xs font-medium rounded-lg border border-[#016782]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-800">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-[#016782] dark:hover:bg-[#016782] text-gray-900 dark:text-white hover:text-white rounded-xl font-medium transition-colors duration-200"
                  aria-label="View source code"
                >
                  <FaGithub className="text-lg" />
                  <span>View Code</span>
                </a>
              )}
              
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-[#016782] hover:bg-[#014d5f] text-white hover:text-white rounded-xl font-medium transition-colors duration-200"
                  aria-label="View live demo"
                >
                  <span>Live Demo</span>
                  <FaArrowRight className="text-sm" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
