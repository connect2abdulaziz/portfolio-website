'use client';

import { projectsData } from "@/lib/data";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// In the App Router, `params` contains dynamic route parameters
export default function ProjectDetail({ params }: { params: { id: string } }) {
  const { id } = params; // The dynamic `id` from the URL

  // Find the project by its ID from the data source
  const project = projectsData.find((p) => p.id.toString() === id);

  if (!project) {
    return <div>Project not found</div>; // Handle 404 if the project doesn't exist
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">{project.title}</h1>
      <Image
        src={project.imageUrl}
        alt={project.title}
        width={800}
        height={400}
        className="rounded-lg shadow-lg mt-4"
      />
      <p className="mt-4">{project.description}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        <ul className="flex flex-wrap gap-3 mt-2">
          {project.tags.map((tag, index) => (
            <li
              key={index}
              className="bg-[#016782]/10 text-[#016782] dark:bg-[#016782]/20 dark:text-white border border-[#016782]/30 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-white hover:text-white bg-[#016782] hover:bg-[#014d5f] px-4 py-2 rounded-md transition-colors"
          >
            <FaGithub className="mr-2" />
            View Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-white hover:text-white bg-[#016782] hover:bg-[#014d5f] px-4 py-2 rounded-md transition-colors"
          >
            <FaExternalLinkAlt className="mr-2" />
            View Live
          </a>
        )}
      </div>
    </div>
  );
}
