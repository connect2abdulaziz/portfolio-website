// lib/chatbot-handler.ts 

// Your portfolio context for Gemini
const PORTFOLIO_CONTEXT = `
You are an AI assistant representing Abdul Aziz, a Tech Lead & Senior Backend Engineer. 
Answer questions about him in a professional, friendly, and informative way. Keep responses short, concise, and conversational. 
Do not use asterisks, quotation marks, or excessive formatting. Use simple, clean text.

PERSONAL INFO:
- Name: Abdul Aziz
- Title: Tech Lead / Senior Backend Engineer
- Location: Lahore, Punjab, Pakistan
- Education: BS Computer Science from PUCIT (Punjab University College of Information Technology, 2019-2023)
- Social Handle: @connect2abdulaziz (all platforms)
- Languages: Urdu, Pashto, English
- LeetCode: 300+ problems solved

PERSONAL INTERESTS & HOBBIES:
- Sports: Cricket enthusiast, big fan of Babar Azam and Pakistan cricket team
- Beverages: Coffee and tea lover
- Outdoor: Hiking and exploring around Lahore
- Entertainment: Enjoys drama movies and football watching
- Games: Chess player, admires Mikhail Tal's playing style
- Lifestyle: Proud of Lahore heritage and culture

CURRENT ROLE (2025):
- Tech Lead / Senior Backend Engineer at DeveloperTag (December 2024 - Present)
  - Leading a team of 5 engineers
  - Architecting scalable microservices using NestJS, PostgreSQL, and Docker
  - Designing RBAC/ABAC authorization systems using CASL
  - Building AI-powered chatbots and RAG pipelines using LangChain and LangGraph
  - Implementing real-time systems with WebSockets and Redis pub/sub

PREVIOUS EXPERIENCE:
- Backend Engineer at DiveScale (June 2024 - December 2024)
  - Built RESTful and GraphQL APIs using NestJS with TypeScript
  - Implemented real-time chat systems using WebSockets and Redis
  - Achieved 85%+ code coverage with Jest testing
- Associate Software Engineer at Kwanso (June 2023 - June 2024)
  - Built backend services with Node.js, Express, and NestJS
  - Solved 300+ algorithmic problems on LeetCode

TECHNICAL SKILLS:
Languages: TypeScript (95%), JavaScript (95%), SQL (90%), Python (80%), Bash (75%)
Backend Frameworks: NestJS (95%), Node.js (95%), Express.js (90%), Fastify (80%), Next.js API Routes (85%)
Databases: PostgreSQL (95%), MongoDB (85%), Redis (90%), Supabase (85%), Prisma ORM (90%), PostGIS (75%), Pinecone (75%)
AI/ML Integration: LangChain (85%), LangGraph (80%), OpenAI API (90%), RAG Pipelines (85%), Vector Databases (80%), AI Chatbots (85%)
Real-time/Messaging: WebSockets (90%), Socket.io (85%), Redis Pub/Sub (90%), Bull Queues (85%)
Authorization: RBAC (95%), ABAC (90%), CASL (90%), Row Level Security (85%), JWT (95%), OAuth 2.0 (90%)
DevOps/Cloud: Docker (90%), AWS (EC2, ECS, S3, RDS, Lambda, CloudFront) (80%), GCP (70%), GitHub Actions (85%), CI/CD (85%)

MAJOR PROJECTS:
- Terzo.ai (2024): AI chatbot backend with LangChain, RAG pipelines, vector embeddings with Pinecone, real-time chat with WebSockets
- SimplyFlow (2025): Workflow automation engine with n8n integration, LangGraph AI agents, deployed on AWS ECS
- Learning Management System (2024): LMS with course management, video streaming with AWS S3/CloudFront, RBAC with CASL
- QuizApp Competition Platform (2024): Real-time quiz supporting 1000+ concurrent users, live leaderboards with Redis sorted sets
- SafeStreet (2025): Geospatial backend using PostGIS, real-time notifications with WebSockets and Redis pub/sub
- 4Corners (2024): E-commerce backend with Stripe integration, inventory management, AWS S3 file uploads
- AutoPostMD (2023 - Final Year Project): Social media scheduling with Facebook Graph, Instagram Business, LinkedIn APIs, Bull queues
- GuardXP (In Progress): Enterprise security operations platform with multi-tenant architecture, ABAC with CASL
- FitnessAds.ai (In Progress): AI-powered ad generation with LangChain RAG, AI chatbot for fitness consultation

EXPERTISE AREAS:
- Backend architecture with NestJS and microservices
- AI/LLM integration using LangChain, LangGraph, and RAG pipelines
- Real-time systems with WebSockets, Socket.io, and Redis
- Authorization systems with RBAC, ABAC, and CASL
- DevOps and cloud architecture with Docker and AWS
- Database optimization with PostgreSQL, Redis caching
- Team leadership and mentoring

Always respond as if you're representing Abdul Aziz professionally. Be helpful, informative, and encourage contact through @connect2abdulaziz.
Keep responses short (2-4 sentences maximum), conversational, and without special formatting like asterisks or quotes.
`;

// Gemini API integration
async function queryGemini(userMessage: string): Promise<string | null> {
  try {
    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.error('Gemini API key not found');
      return null;
    }

    const prompt = `${PORTFOLIO_CONTEXT}

User Question: ${userMessage}

Please provide a short, concise, and professional response about Abdul Aziz (2-4 sentences maximum). 
Keep it conversational and natural. Do not use asterisks, quotation marks, bullet points, or special formatting. 
Use plain text only. If the question is about contacting Abdul, mention his social handle @connect2abdulaziz.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      return null;
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      let cleanResponse = data.candidates[0].content.parts[0].text;
      
      cleanResponse = cleanResponse
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/"/g, '')
        .replace(/'/g, '')
        .replace(/`/g, '')
        .replace(/#{1,6}\s/g, '')
        .replace(/\n\s*\n/g, '\n')
        .replace(/^\s+|\s+$/g, '')
        .replace(/\s+/g, ' ');
      
      return cleanResponse;
    }
    
    return null;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return null;
  }
}

// Smart fallback responses
const fallbackResponses = {
  skills: `Abdul's core expertise includes:

Backend Development: NestJS (95%), Node.js (95%), Express.js, Fastify, PostgreSQL, MongoDB
AI/LLM Integration: LangChain (85%), LangGraph (80%), OpenAI API (90%), RAG Pipelines, AI Chatbots
Real-time Systems: WebSockets (90%), Socket.io, Redis Pub/Sub (90%), Bull Queues
Authorization: RBAC, ABAC, CASL (90%), Row Level Security, JWT, OAuth 2.0
DevOps: Docker (90%), AWS (EC2, ECS, S3, RDS, Lambda), GitHub Actions, CI/CD
Languages: TypeScript (95%), JavaScript (95%), SQL (90%), Python (80%)

He's solved 300+ LeetCode problems and specializes in scalable backend architecture.`,

  projects: `Abdul has built impressive production applications:

AI/Real-time Projects:
- Terzo.ai - AI chatbot with LangChain RAG and vector embeddings
- SimplyFlow - Workflow automation with LangGraph AI agents
- QuizApp - Real-time competition platform for 1000+ concurrent users

Backend Systems:
- Learning Management System - LMS with video streaming and RBAC
- SafeStreet - Geospatial backend with PostGIS and real-time alerts
- 4Corners - E-commerce with Stripe and inventory management
- AutoPostMD - Social media scheduling with Facebook/Instagram/LinkedIn APIs

In Progress: GuardXP (security platform) and FitnessAds.ai (AI ad generation)`,

  experience: `Abdul's career shows steady growth in backend engineering:

Current (December 2024 - Present):
- Tech Lead / Senior Backend Engineer at DeveloperTag
- Leading a team of 5 engineers building scalable microservices
- Architecting AI chatbots, RAG pipelines, and real-time systems

Previous:
- Backend Engineer at DiveScale (June 2024 - December 2024)
- Associate Software Engineer at Kwanso (June 2023 - June 2024)

His expertise spans from hands-on NestJS development to team leadership and AI integration.`,

  contact: `You can connect with Abdul through:

LinkedIn: linkedin.com/in/connect2abdulaziz
GitHub: github.com/connect2abdulaziz
LeetCode: leetcode.com/connect2abdulaziz (300+ problems solved)
Email: connect2abdulaziz@gmail.com
All platforms: @connect2abdulaziz

He's currently open for backend engineering opportunities, AI/LLM consulting, and collaboration on challenging projects.`,

  hobbies: `Abdul's personal interests include:

Sports: Big cricket fan, loves Babar Azam and Pakistan team
Beverages: Coffee and tea enthusiast
Activities: Hiking around Lahore, exploring local culture
Entertainment: Drama movies and football watching
Games: Chess player, admires Mikhail Tal's attacking style
Languages: Fluent in Urdu, Pashto, and English`,

  ai: `Abdul has strong AI/LLM integration expertise:

Technologies: LangChain (85%), LangGraph (80%), OpenAI API (90%)
Specializations: RAG Pipelines, Vector Databases (Pinecone), AI Chatbots, Prompt Engineering

AI Projects:
- Terzo.ai - AI chatbot with RAG and vector embeddings
- SimplyFlow - LangGraph-based AI agents for workflow automation
- FitnessAds.ai - AI-powered ad generation with LangChain RAG

He builds production-ready AI systems with real-time streaming and conversational interfaces.`,

  backend: `Abdul specializes in backend engineering:

Frameworks: NestJS (95%), Node.js (95%), Express.js, Fastify
Databases: PostgreSQL (95%), MongoDB, Redis (90%), Prisma ORM, PostGIS
Architecture: Microservices, Clean Architecture, DRY, SOLID principles
Authorization: RBAC, ABAC, CASL, Row Level Security, JWT, OAuth 2.0
Real-time: WebSockets, Socket.io, Redis Pub/Sub, Bull Queues
Testing: Jest with 85%+ code coverage

He's particularly strong in scalable API design and database optimization.`,

  default: `I'm Abdul's AI assistant! I can tell you about his:

Backend Skills: NestJS, Node.js, PostgreSQL, Redis, microservices
AI Expertise: LangChain, LangGraph, RAG pipelines, AI chatbots
Projects: Terzo.ai, SimplyFlow, QuizApp, Learning Management System
Experience: Tech Lead at DeveloperTag, 300+ LeetCode problems solved
Personal: Cricket fan, coffee lover, chess player from Lahore
Contact: @connect2abdulaziz on all platforms

What would you like to know about Abdul Aziz?`
};

// Smart fallback function
function getSmartFallback(userInput: string): string {
  const input = userInput.toLowerCase();
  
  if (input.includes('skill') || input.includes('technology') || input.includes('programming') || input.includes('tech stack') || input.includes('proficiency')) {
    return fallbackResponses.skills;
  }
  
  if (input.includes('project') || input.includes('work') || input.includes('built') || input.includes('portfolio') || input.includes('terzo') || input.includes('simplyflow') || input.includes('guardx')) {
    return fallbackResponses.projects;
  }
  
  if (input.includes('experience') || input.includes('career') || input.includes('job') || input.includes('company') || input.includes('role') || input.includes('developertag') || input.includes('divescale') || input.includes('kwanso')) {
    return fallbackResponses.experience;
  }
  
  if (input.includes('contact') || input.includes('reach') || input.includes('hire') || input.includes('linkedin') || input.includes('email') || input.includes('github')) {
    return fallbackResponses.contact;
  }

  if (input.includes('hobby') || input.includes('hobbies') || input.includes('cricket') || input.includes('chess') || input.includes('coffee') || input.includes('personal') || input.includes('interest') || input.includes('babar')) {
    return fallbackResponses.hobbies;
  }

  if (input.includes('ai') || input.includes('langchain') || input.includes('langgraph') || input.includes('openai') || input.includes('llm') || input.includes('rag') || input.includes('chatbot') || input.includes('vector')) {
    return fallbackResponses.ai;
  }

  if (input.includes('backend') || input.includes('nestjs') || input.includes('node') || input.includes('api') || input.includes('database') || input.includes('postgresql') || input.includes('redis') || input.includes('websocket')) {
    return fallbackResponses.backend;
  }

  if (input.includes('leetcode') || input.includes('algorithm') || input.includes('dsa') || input.includes('problem solving')) {
    return `Abdul has solved 300+ problems on LeetCode, demonstrating strong algorithmic and problem-solving skills. He practices Data Structures and Algorithms regularly to stay sharp. His problem-solving abilities translate directly into writing efficient, optimized backend code. You can check his LeetCode profile at leetcode.com/connect2abdulaziz.`;
  }

  if (input.includes('authorization') || input.includes('rbac') || input.includes('abac') || input.includes('casl') || input.includes('permission') || input.includes('security')) {
    return `Abdul specializes in authorization systems including RBAC (Role-Based Access Control), ABAC (Attribute-Based Access Control), and fine-grained permissions using CASL library. He implements Row Level Security (RLS) for multi-tenant data isolation, JWT authentication, and OAuth 2.0 flows. His projects like GuardXP and Learning Management System showcase these security implementations.`;
  }

  if (input.includes('devops') || input.includes('docker') || input.includes('aws') || input.includes('deploy') || input.includes('ci/cd') || input.includes('cloud')) {
    return `Abdul has strong DevOps expertise including Docker (90%), AWS services (EC2, ECS, S3, RDS, Lambda, CloudFront), and CI/CD pipelines with GitHub Actions. He deploys containerized microservices on AWS ECS with auto-scaling and load balancing. His projects like SimplyFlow demonstrate production-grade cloud deployments.`;
  }

  return fallbackResponses.default;
}

// Conversation context tracking
let conversationContext: string[] = [];

// Main chat handler with Gemini integration
export const handleChatCommand = async (userMessage: string): Promise<string> => {
  conversationContext.push(userMessage.toLowerCase());
  
  if (conversationContext.length > 5) {
    conversationContext = conversationContext.slice(-5);
  }

  if (userMessage.toLowerCase().includes('exit') || userMessage.toLowerCase().includes('quit') || userMessage.toLowerCase().includes('bye')) {
    conversationContext = [];
    return "Thanks for chatting with me! Feel free to use other terminal commands like skills, projects, or experience to explore Abdul's portfolio. Type chat again anytime to continue our conversation!";
  }
  
  if (userMessage.toLowerCase().includes('help') || userMessage === '?') {
    return `I'm Abdul's AI assistant! I can help you learn about:

Try asking me:
- What are Abdul's backend skills?
- Tell me about his AI and LangChain experience
- What projects has he built with NestJS?
- How experienced is he with WebSockets and real-time systems?
- What authorization systems does he know (RBAC, ABAC, CASL)?
- What's his DevOps and AWS experience?
- How many LeetCode problems has he solved?
- What companies has he worked for?
- What are his hobbies?
- How can I contact him?

I understand natural questions!
Just ask me anything about Abdul's backend expertise, AI integration skills, projects, or how to get in touch.

Type exit when you're done chatting.`;
  }

  try {
    const geminiResponse = await queryGemini(userMessage);
    
    if (geminiResponse && geminiResponse.length > 20) {
      return geminiResponse;
    }
  } catch (error) {
    console.log('Gemini API failed, using fallback response');
  }
  
  return getSmartFallback(userMessage);
};

// Synchronous version for immediate fallback
export const handleChatCommandSync = (userMessage: string): string => {
  if (userMessage.toLowerCase().includes('exit') || userMessage.toLowerCase().includes('quit')) {
    conversationContext = [];
    return "Thanks for chatting! Feel free to use other commands like skills, projects, or experience to explore Abdul's portfolio. Type chat again anytime!";
  }
  
  if (userMessage.toLowerCase().includes('help')) {
    return `I'm Abdul's AI assistant! Ask me about:

Try asking:
- What are Abdul's backend skills?
- Tell me about his AI projects
- What's his NestJS experience?
- How can I contact him?
- What are his hobbies?

I'll do my best to give you detailed, helpful answers!`;
  }

  return getSmartFallback(userMessage);
};

// Initialize chat session
export const initializeChatSession = (): string => {
  conversationContext = [];
  return `Hi! I'm Abdul's AI assistant!

I can tell you about:
- His backend expertise (NestJS, Node.js, PostgreSQL, Redis, microservices)
- AI/LLM integration skills (LangChain, LangGraph, RAG pipelines, chatbots)
- Real-time systems (WebSockets, Socket.io, Redis Pub/Sub)
- Authorization systems (RBAC, ABAC, CASL, Row Level Security)
- DevOps experience (Docker, AWS, CI/CD)
- Projects like Terzo.ai, SimplyFlow, QuizApp, and more
- Career journey from CS student to Tech Lead (300+ LeetCode solved)
- Personal interests like cricket, chess, coffee, and hiking in Lahore

Just ask me naturally:
- What are his main backend skills?
- Tell me about his AI projects
- How experienced is he with NestJS?
- Does he know WebSockets and real-time systems?
- What authorization systems does he use?
- Does he like cricket?

What would you like to know about Abdul Aziz?

Type help for more guidance or exit to end our chat.`;
};