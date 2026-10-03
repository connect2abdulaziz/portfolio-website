import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact, FaMobileAlt, FaCode } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { SiNestjs, SiNextdotjs } from "react-icons/si";
import { MdSupervisorAccount } from "react-icons/md";
import { BsCodeSquare } from "react-icons/bs";




export const experiencesData = [
  {
    id: 1,
    title: "Tech Lead / Senior Backend Engineer",
    location: "DeveloperTag, Lahore, Pakistan",
    description: "Leading a team of 5 engineers architecting scalable microservices using NestJS, PostgreSQL, and Docker. Specializing in RBAC/ABAC authorization systems, multi-tenant SaaS platforms, AI-powered chatbots with LangChain/LangGraph, and real-time communication systems.",
    icon: React.createElement(MdSupervisorAccount),
    date: "Dec 2024 - Present",
    type: "fulltime",
    skills: [
      "NestJS",
      "PostgreSQL",
      "Docker",
      "CASL",
      "RBAC/ABAC",
      "LangChain",
      "LangGraph",
      "WebSockets",
      "Redis",
      "AWS ECS",
      "CI/CD",
      "GitHub Actions",
      "Team Leadership",
      "Microservices Architecture",
      "Multi-tenant SaaS"
    ],
    details: [
      "Lead a team of 5 engineers architecting scalable microservices",
      "Design and implement RBAC/ABAC authorization systems using CASL library",
      "Architect multi-tenant SaaS platforms with Row Level Security (RLS)",
      "Build AI-powered chatbots and RAG pipelines using LangChain and LangGraph",
      "Implement real-time communication systems using WebSockets and Redis pub/sub",
      "Establish CI/CD pipelines with GitHub Actions, Docker, and AWS ECS",
      "Optimize PostgreSQL query performance achieving 60% reduction in response times",
      "Design tenant isolation strategies for multi-tenant applications",
      "Build vector database integrations for AI features",
      "Mentor team members on best practices and architecture decisions"
    ]
  },
  {
    id: 2,
    title: "Backend Engineer",
    location: "DiveScale, Lahore, Pakistan",
    description: "Developed RESTful and GraphQL APIs using NestJS with TypeScript following clean architecture principles. Implemented authentication systems with OAuth 2.0, JWT refresh tokens, real-time chat systems, and comprehensive testing achieving 85%+ code coverage.",
    icon: React.createElement(BsCodeSquare),
    date: "June 2024 - Dec 2024",
    type: "fulltime",
    skills: [
      "NestJS",
      "TypeScript",
      "GraphQL",
      "RESTful APIs",
      "OAuth 2.0",
      "JWT",
      "WebSockets",
      "Redis",
      "Prisma ORM",
      "PostgreSQL",
      "Jest",
      "Clean Architecture"
    ],
    details: [
      "Developed RESTful and GraphQL APIs using NestJS with TypeScript",
      "Implemented authentication systems with OAuth 2.0 and JWT refresh tokens",
      "Built real-time chat systems using WebSockets and Redis for message persistence",
      "Designed database schemas with Prisma ORM and optimized PostgreSQL queries",
      "Wrote comprehensive unit and integration tests achieving 85%+ code coverage with Jest",
      "Followed clean architecture principles and SOLID design patterns",
      "Implemented session management and secure authentication flows",
      "Built pub/sub messaging systems using Redis",
      "Optimized database queries for improved performance",
      "Participated in code reviews ensuring high code quality"
    ]
  },
  {
    id: 3,
    title: "Associate Software Engineer",
    location: "Kwanso, Lahore, Pakistan",
    description: "Built backend services with Node.js, Express, and NestJS following DRY and SOLID principles. Developed RESTful APIs with proper error handling, validation, and comprehensive documentation. Solved 300+ algorithmic problems on LeetCode strengthening DSA skills.",
    icon: React.createElement(CgWorkAlt),
    date: "June 2023 - June 2024",
    type: "fulltime",
    skills: [
      "Node.js",
      "Express",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "RESTful APIs",
      "Zod Validation",
      "Swagger",
      "Git",
      "SOLID Principles",
      "LeetCode"
    ],
    details: [
      "Built backend services with Node.js, Express, and NestJS",
      "Developed RESTful APIs with proper error handling and validation using Zod",
      "Created comprehensive API documentation with Swagger/OpenAPI",
      "Implemented database migrations and designed normalized schemas",
      "Worked with both PostgreSQL and MongoDB databases",
      "Solved 300+ algorithmic problems on LeetCode strengthening DSA skills",
      "Participated in code reviews ensuring code quality and security",
      "Followed DRY and SOLID principles in all implementations",
      "Collaborated with team members on feature development",
      "Contributed to establishing best practices and coding standards"
    ]
  },
  {
    id: 4,
    title: "Bachelor of Science in Computer Science",
    location: "Punjab University College of Information Technology (PUCIT), Lahore, Pakistan",
    description: "Completed Bachelor's degree in Computer Science with strong foundation in Data Structures, Algorithms, Database Systems, Operating Systems, Computer Networks, and Software Engineering. Final Year Project: AutoPostMD – A scalable social media scheduling backend with Node.js, PostgreSQL, and Redis.",
    icon: React.createElement(LuGraduationCap),
    date: "Aug 2019 - May 2023",
    type: "education",
    skills: [
      "Data Structures",
      "Algorithms",
      "Database Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Node.js",
      "PostgreSQL",
      "Redis"
    ],
    details: [
      "Studied Data Structures, Algorithms, and Database Systems",
      "Completed coursework in Operating Systems and Computer Networks",
      "Specialized in Software Engineering principles and practices",
      "Built AutoPostMD for Final Year Project - a scalable backend system",
      "Implemented queue-based job processing with Redis and Bull",
      "Designed RESTful API architecture with Node.js and PostgreSQL",
      "Integrated social media APIs (Facebook, Instagram, LinkedIn)",
      "Developed OAuth 2.0 authentication flows",
      "Gained hands-on experience with backend development and cloud services"
    ]
  }
] as const;

export const skillsData = [
  {
    category: "Programming Languages",
    skills: [
      { name: "TypeScript", proficiency: 95 },
      { name: "JavaScript", proficiency: 95 },
      { name: "SQL", proficiency: 90 },
      { name: "Python", proficiency: 80 },
      { name: "C#", proficiency: 75 },
      { name: "C++", proficiency: 70 },
      { name: "Bash", proficiency: 75 },
    ],
  },
  {
    category: "Backend Frameworks",
    skills: [
      { name: "NestJS", proficiency: 95 },
      { name: "Node.js", proficiency: 95 },
      { name: "Express.js", proficiency: 90 },
      { name: "Next.js API Routes", proficiency: 85 },
      { name: "Fastify", proficiency: 80 },
      { name: "FastAPI", proficiency: 80 },
      { name: "Django REST Framework", proficiency: 75 },
    ],
  },
  {
    category: "Databases & ORMs",
    skills: [
      { name: "PostgreSQL", proficiency: 95 },
      { name: "MongoDB", proficiency: 85 },
      { name: "Redis", proficiency: 90 },
      { name: "Supabase", proficiency: 80 },
      { name: "Prisma ORM", proficiency: 90 },
      { name: "TypeORM", proficiency: 85 },
      { name: "PostGIS", proficiency: 80 },
      { name: "Pinecone", proficiency: 75 },
    ],
  },
  {
    category: "AI/ML Integration",
    skills: [
      { name: "LangChain", proficiency: 90 },
      { name: "LangGraph", proficiency: 85 },
      { name: "OpenAI API", proficiency: 90 },
      { name: "RAG Pipelines", proficiency: 85 },
      { name: "Vector Databases", proficiency: 80 },
      { name: "AI Chatbots", proficiency: 90 },
      { name: "Prompt Engineering", proficiency: 85 },
    ],
  },
  {
    category: "Authorization & Security",
    skills: [
      { name: "RBAC", proficiency: 90 },
      { name: "ABAC", proficiency: 85 },
      { name: "CASL", proficiency: 90 },
      { name: "Row Level Security", proficiency: 85 },
      { name: "JWT", proficiency: 90 },
      { name: "OAuth 2.0", proficiency: 85 },
      { name: "Session Management", proficiency: 90 },
    ],
  },
  {
    category: "DevOps & Cloud",
    skills: [
      { name: "Docker", proficiency: 90 },
      { name: "AWS EC2", proficiency: 80 },
      { name: "AWS S3", proficiency: 85 },
      { name: "AWS RDS", proficiency: 80 },
      { name: "GCP", proficiency: 70 },
      { name: "GitHub Actions", proficiency: 85 },
      { name: "CI/CD", proficiency: 85 },
      { name: "Nginx", proficiency: 75 },
    ],
  },
  {
    category: "Real-time & Messaging",
    skills: [
      { name: "WebSockets", proficiency: 90 },
      { name: "Socket.io", proficiency: 85 },
      { name: "Redis Pub/Sub", proficiency: 90 },
      { name: "Bull Queues", proficiency: 85 },
      { name: "Server-Sent Events", proficiency: 75 },
    ],
  },
  {
    category: "Tools & Practices",
    skills: [
      { name: "Git", proficiency: 95 },
      { name: "Clean Architecture", proficiency: 90 },
      { name: "DRY Principles", proficiency: 90 },
      { name: "SOLID Principles", proficiency: 90 },
      { name: "TDD", proficiency: 80 },
      { name: "LeetCode (300+)", proficiency: 85 },
    ],
  },
  {
    category: "Professional Skills",
    skills: [
      { name: "Team Leadership", proficiency: 90 },
      { name: "Backend Architecture", proficiency: 95 },
      { name: "System Design", proficiency: 85 },
      { name: "Code Review", proficiency: 90 },
      { name: "Problem Solving", proficiency: 90 },
      { name: "Project Management", proficiency: 85 },
    ],
  },
] as const;

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;


export const projectsData = [
  {
    id: 1,
    title: "Terzo.ai",
    description:
      "Architected AI chatbot backend with LangChain for RAG pipelines and conversational AI agents. Implemented vector embeddings with Pinecone for semantic search and context retrieval. Built real-time chat interface using WebSockets with Redis pub/sub for message broadcasting.",
    tags: ["NestJS", "PostgreSQL", "LangChain", "OpenAI API", "Redis", "Docker", "Pinecone", "WebSockets"],
    imageUrl: "/mockup/terzo.ai.png",
    liveUrl: "https://terzo.ai",
    githubUrl: "",
    type: "ai",
    icon: React.createElement(SiNestjs),
    keyFeatures: [
      "AI chatbot with LangChain RAG pipelines",
      "Vector embeddings using Pinecone for semantic search",
      "Real-time chat with WebSockets and Redis pub/sub",
      "Queue-based architecture with Bull and Redis",
      "Async AI job processing with progress tracking"
    ],
    techDetails: "Built with NestJS backend architecture and PostgreSQL database. Implements LangChain for conversational AI and RAG pipelines. Uses Pinecone vector database for semantic search. Real-time communication through WebSockets and Redis pub/sub. Queue-based async processing with Bull."
  },
 
  {
    id: 4,
    title: "QuizApp Competition Platform",
    description:
      "Architected real-time quiz competition backend supporting 1000+ concurrent users. Implemented live leaderboard updates using WebSockets and Redis sorted sets. Built anti-cheating mechanisms with session validation and answer submission timeouts.",
    tags: ["NestJS", "PostgreSQL", "WebSockets", "Redis", "Bull", "Real-time"],
    imageUrl: "/mockup/quizapp.webp",
    liveUrl: "",
    githubUrl: "",
    type: "backend",
    icon: React.createElement(SiNestjs),
    keyFeatures: [
      "Real-time quiz platform for 1000+ concurrent users",
      "Live leaderboard with Redis sorted sets",
      "Anti-cheating mechanisms and session validation",
      "Answer submission timeouts",
      "Question bank with randomization and difficulty selection"
    ],
    techDetails: "Built with NestJS and PostgreSQL for robust backend. Real-time updates via WebSockets. Redis sorted sets for efficient leaderboard ranking. Bull queue for job processing. Implements security features like session validation and timeouts to prevent cheating."
  }
] as const;

