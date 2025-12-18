// lib/terminal-commands.ts
import { experiencesData, skillsData, projectsData } from './data';

// Helper function to create progress bars
const createProgressBar = (percentage: number, length: number = 40): string => {
  const filled = Math.round((percentage / 100) * length);
  const empty = length - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
};

// Helper function to format skill categories
const formatSkillsOutput = (category: any): string => {
  if (!category) return 'Category not found.';
  
  let output = `\n${category.category}\n`;
  output += '─'.repeat(50) + '\n';
  
  category.skills.forEach((skill: any) => {
    const progressBar = createProgressBar(skill.proficiency);
    const percentage = `${skill.proficiency}%`.padStart(4);
    output += `${skill.name.padEnd(20)} ${progressBar} ${percentage}\n`;
  });
  
  return output;
};

// Helper function to format experience entries
const formatExperienceOutput = (experience: any): string => {
  let output = `\n${experience.title}\n`;
  output += `Location: ${experience.location}\n`;
  output += `Duration: ${experience.date}\n`;
  output += `Type: ${experience.type.toUpperCase()}\n\n`;
  output += `${experience.description}\n\n`;
  
  if (experience.skills && experience.skills.length > 0) {
    output += `Tech Stack:\n`;
    experience.skills.forEach((skill: string, index: number) => {
      output += `   ${index + 1}. ${skill}\n`;
    });
  }
  
  if (experience.details && experience.details.length > 0) {
    output += `\nKey Responsibilities:\n`;
    experience.details.forEach((detail: string, index: number) => {
      output += `   • ${detail}\n`;
    });
  }
  
  return output + '\n';
};

// Helper function to format project entries
const formatProjectOutput = (project: any): string => {
  let output = `\n${project.title}\n`;
  output += '─'.repeat(50) + '\n';
  output += `${project.description}\n\n`;
  
  output += `Tech Stack: ${project.tags.join(', ')}\n`;
  output += `Type: ${project.type.toUpperCase()}\n`;
  
  if (project.liveUrl) {
    output += `Live: ${project.liveUrl}\n`;
  }
  
  if (project.githubUrl) {
    output += `GitHub: ${project.githubUrl}\n`;
  }
  
  if (project.keyFeatures && project.keyFeatures.length > 0) {
    output += `\nKey Features:\n`;
    project.keyFeatures.forEach((feature: string) => {
      output += `   • ${feature}\n`;
    });
  }
  
  if (project.techDetails) {
    output += `\nTechnical Details:\n   ${project.techDetails}\n`;
  }
  
  return output + '\n';
};

// Main command handlers
export const handleSkillsCommand = (flags: string[]): string => {
  if (flags.includes('--help')) {
    return `Skills Command Usage:
  skills                 - Show all skill categories
  skills --frontend      - Frontend development skills
  skills --backend       - Backend development skills
  skills --ai            - AI & ML development skills
  skills --devops        - DevOps & Cloud skills
  skills --languages     - Programming languages
  skills --tools         - Tools & Technologies
  skills --professional  - Professional skills
  skills --category <name> - Show specific category`;
  }

  // Handle specific category flags
  if (flags.includes('--frontend')) {
    const category = skillsData.find(cat => cat.category === 'Frontend Development');
    return formatSkillsOutput(category);
  }
  
  if (flags.includes('--backend')) {
    const category = skillsData.find(cat => cat.category === 'Backend Development');
    return formatSkillsOutput(category);
  }
  
  if (flags.includes('--ai')) {
    const category = skillsData.find(cat => cat.category === 'AI & ML Development');
    return formatSkillsOutput(category);
  }
  
  if (flags.includes('--devops')) {
    const category = skillsData.find(cat => cat.category === 'DevOps & Cloud');
    return formatSkillsOutput(category);
  }
  
  if (flags.includes('--languages')) {
    const category = skillsData.find(cat => cat.category === 'Programming Languages');
    return formatSkillsOutput(category);
  }
  
  if (flags.includes('--tools')) {
    const category = skillsData.find(cat => cat.category === 'Tools & Technologies');
    return formatSkillsOutput(category);
  }
  
  if (flags.includes('--professional')) {
    const category = skillsData.find(cat => cat.category === 'Professional Skills');
    return formatSkillsOutput(category);
  }

  // Show all categories if no specific flag
  let output = '\nTECHNICAL SKILLS OVERVIEW\n';
  output += '═'.repeat(60) + '\n\n';
  
  skillsData.forEach(category => {
    output += `[${category.category}] (${category.skills.length} skills)\n`;
    
    // Show top 3 skills from each category
    const topSkills = category.skills
      .sort((a, b) => b.proficiency - a.proficiency)
      .slice(0, 3);
    
    topSkills.forEach(skill => {
      const progressBar = createProgressBar(skill.proficiency, 20);
      output += `   ${skill.name.padEnd(15)} ${progressBar} ${skill.proficiency}%\n`;
    });
    output += '\n';
  });
  
  output += `Use flags for detailed view: --frontend, --backend, --ai, --devops\n`;
  
  return output;
};

export const handleExperienceCommand = (flags: string[]): string => {
  if (flags.includes('--help')) {
    return `Experience Command Usage:
  experience              - Show all work experience
  experience --current    - Show current positions
  experience --education  - Show education background
  experience --fulltime   - Show full-time positions
  experience --internship - Show internships
  experience --id <num>   - Show specific experience by ID`;
  }

  if (flags.includes('--current')) {
    const currentExperiences = experiencesData.filter(exp => 
      exp.date.toLowerCase().includes('present') || exp.date.toLowerCase().includes('2025')
    );
    
    let output = '\nCURRENT POSITIONS\n';
    output += '═'.repeat(40) + '\n';
    
    currentExperiences.forEach(exp => {
      output += formatExperienceOutput(exp);
    });
    
    return output;
  }
  
  if (flags.includes('--education')) {
    const education = experiencesData.filter(exp => exp.type === 'education');
    
    let output = '\nEDUCATION BACKGROUND\n';
    output += '═'.repeat(40) + '\n';
    
    education.forEach(exp => {
      output += formatExperienceOutput(exp);
    });
    
    return output;
  }
  
  if (flags.includes('--fulltime')) {
    const fulltime = experiencesData.filter(exp => exp.type === 'fulltime');
    
    let output = '\nFULL-TIME EXPERIENCE\n';
    output += '═'.repeat(40) + '\n';
    
    fulltime.forEach(exp => {
      output += formatExperienceOutput(exp);
    });
    
    return output;
  }
  
  if (flags.includes('--internship')) {
    const internships = experiencesData.filter(exp => exp.type === 'internship');
    
    let output = '\nINTERNSHIP EXPERIENCE\n';
    output += '═'.repeat(40) + '\n';
    
    internships.forEach(exp => {
      output += formatExperienceOutput(exp);
    });
    
    return output;
  }

  // Check for specific ID
  const idFlag = flags.find(flag => flag.startsWith('--id'));
  if (idFlag) {
    const id = parseInt(idFlag.split('=')[1] || flags[flags.indexOf(idFlag) + 1]);
    const experience = experiencesData.find(exp => exp.id === id);
    
    if (experience) {
      return formatExperienceOutput(experience);
    } else {
      return `Experience with ID ${id} not found.`;
    }
  }
  
  // Show all experience
  let output = '\nPROFESSIONAL EXPERIENCE\n';
  output += '═'.repeat(50) + '\n';
  
  // Sort by date (most recent first)
  const sortedExperience = [...experiencesData].sort((a, b) => {
    if (a.date.includes('Present')) return -1;
    if (b.date.includes('Present')) return 1;
    return new Date(b.date.split(' - ')[0]).getTime() - new Date(a.date.split(' - ')[0]).getTime();
  });
  
  sortedExperience.forEach((exp, index) => {
    output += `${index + 1}. ${exp.title} - ${exp.location}\n`;
    output += `   ${exp.date} | ${exp.type.toUpperCase()}\n\n`;
  });
  
  output += `Use flags for detailed view: --current, --fulltime, --education\n`;
  output += `View specific experience: experience --id <number>\n`;
  
  return output;
};

export const handleProjectsCommand = (flags: string[]): string => {
  if (flags.includes('--help')) {
    return `Projects Command Usage:
  projects               - Show all projects
  projects --client      - Show client projects (sellrgrid, proteinwriter, etc.)
  projects --personal    - Show personal/portfolio projects
  projects --ai          - Show AI/ML projects
  projects --fullstack   - Show full-stack projects
  projects --mobile      - Show mobile applications
  projects --web         - Show web applications
  projects --id <num>    - Show specific project by ID`;
  }

  // Handle client projects flag
  if (flags.includes('--client')) {
    return `\nCLIENT PROJECTS\n` +
           `═`.repeat(40) + `\n\n` +
           `[1] sellrgrid.com - E-commerce Platform\n` +
           `   • Advanced RBAC & permission systems\n` +
           `   • Payment gateway integration\n` +
           `   • MongoDB aggregation optimization\n\n` +
           `[2] proteinwriter.com - Content Management\n` +
           `   • AI-powered content generation\n` +
           `   • Real-time collaboration features\n` +
           `   • WebSocket implementation\n\n` +
           `[3] nordsecpro.com - Security Platform\n` +
           `   • Advanced security protocols\n` +
           `   • DevOps CI/CD implementation\n` +
           `   • AWS cloud architecture\n\n` +
           `These are live production applications serving real users\n` +
           `Built with MERN stack, Next.js, and modern DevOps practices\n`;
  }

  if (flags.includes('--ai')) {
    const aiProjects = projectsData.filter(project => 
      project.type === 'ai' || 
      project.tags.some(tag => ['AI', 'ML', 'Machine Learning', 'NLP', 'LangChain'].includes(tag))
    );
    
    let output = '\nAI & MACHINE LEARNING PROJECTS\n';
    output += '═'.repeat(45) + '\n';
    
    aiProjects.forEach(project => {
      output += formatProjectOutput(project);
    });
    
    return output;
  }
  
  if (flags.includes('--fullstack')) {
    const fullstackProjects = projectsData.filter(project => 
      project.type === 'fullstack' || project.type === 'web'
    );
    
    let output = '\nFULL-STACK PROJECTS\n';
    output += '═'.repeat(35) + '\n';
    
    fullstackProjects.forEach(project => {
      output += formatProjectOutput(project);
    });
    
    return output;
  }
  
  if (flags.includes('--mobile')) {
    const mobileProjects = projectsData.filter(project => project.type === 'mobile');
    
    let output = '\nMOBILE APPLICATIONS\n';
    output += '═'.repeat(35) + '\n';
    
    mobileProjects.forEach(project => {
      output += formatProjectOutput(project);
    });
    
    return output;
  }

  // Check for specific ID
  const idFlag = flags.find(flag => flag.startsWith('--id'));
  if (idFlag) {
    const id = parseInt(idFlag.split('=')[1] || flags[flags.indexOf(idFlag) + 1]);
    const project = projectsData.find(proj => proj.id === id);
    
    if (project) {
      return formatProjectOutput(project);
    } else {
      return `Project with ID ${id} not found.`;
    }
  }
  
  // Show all projects overview
  let output = '\nPROJECT PORTFOLIO\n';
  output += '═'.repeat(35) + '\n\n';
  
  // Group projects by type
  const projectsByType = projectsData.reduce((acc, project) => {
    if (!acc[project.type]) acc[project.type] = [];
    acc[project.type].push(project);
    return acc;
  }, {} as Record<string, any[]>);
  
  Object.entries(projectsByType).forEach(([type, projects]) => {
    output += `[${type.toUpperCase()}] PROJECTS (${projects.length})\n`;
    projects.forEach(project => {
      output += `   ${project.id}. ${project.title}\n`;
      output += `      ${project.tags.slice(0, 4).join(', ')}\n`;
      if (project.liveUrl) output += `      Live: ${project.liveUrl}\n`;
    });
    output += '\n';
  });
  
  output += `Use flags for detailed view: --ai, --fullstack, --mobile, --client\n`;
  output += `View specific project: projects --id <number>\n`;
  
  return output;
};

export const handleContactCommand = (): string => {
  return `\nCONTACT INFORMATION\n` +
         `═`.repeat(35) + `\n\n` +
         `Name: Abdul Aziz\n` +
         `Title: Senior Software Engineer & Team Lead\n` +
         `Location: Lahore, Punjab, Pakistan\n\n` +
         `SOCIAL LINKS:\n` +
         `   LinkedIn: linkedin.com/in/connect2abdulaziz\n` +
         `   GitHub: github.com/connect2abdulaziz\n` +
         `   Email: Available on request\n` +
         `   Facebook: facebook.com/connect2abdulaziz\n` +
         `   Instagram: instagram.com/connect2abdulaziz\n` +
         `   LeetCode: leetcode.com/connect2abdulaziz\n\n` +
         `CURRENT STATUS:\n` +
         `   [x] Open for new opportunities\n` +
         `   [x] Available for consulting\n` +
         `   [x] Open to collaboration\n\n` +
         `EXPERTISE:\n` +
         `   • Full Stack Development (MERN, Next.js)\n` +
         `   • AI/LLM Integration & Development\n` +
         `   • DevOps & Cloud Architecture\n` +
         `   • Team Leadership & Mentoring\n\n` +
         `Feel free to reach out for any opportunities or collaborations!\n`;
};

// Helper function to trigger file download
const downloadResume = () => {
  try {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return false;
    }
    
    const link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'Abdul_Aziz_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Download failed:', error);
    return false;
  }
};

export const handleResumeCommand = (flags: string[] = []): string => {
  // Handle download flag
  if (flags.includes('--download') || flags.includes('-d')) {
    const downloadSuccess = downloadResume();
    
    if (downloadSuccess) {
      return `\nRESUME DOWNLOAD INITIATED\n` +
             `═`.repeat(35) + `\n\n` +
             `[OK] Your download should start shortly!\n` +
             `File: Abdul_Aziz_Resume.pdf\n` +
             `Location: Your default downloads folder\n\n` +
             `If download doesn't start automatically:\n` +
             `   • Check your browser's download settings\n` +
             `   • Try: resume --view to open in browser\n` +
             `   • Contact me directly for alternative formats\n\n` +
             `Also available at: linkedin.com/in/connect2abdulaziz\n`;
    } else {
      return `\nDOWNLOAD FAILED\n` +
             `═`.repeat(20) + `\n\n` +
             `Sorry, there was an issue downloading the resume.\n` +
             `Please try one of these alternatives:\n\n` +
             `View online: resume --view\n` +
             `Request via email: Use 'contact' command\n` +
             `LinkedIn: linkedin.com/in/connect2abdulaziz\n`;
    }
  }

  // Handle view flag
  if (flags.includes('--view') || flags.includes('-v')) {
    // Open PDF in new tab
    window.open('/CV.pdf', '_blank');
    
    return `\nRESUME VIEWER\n` +
           `═`.repeat(20) + `\n\n` +
           `Opening resume in new browser tab...\n\n` +
           `Quick Stats:\n` +
           `   • ${experiencesData.length} Professional Experiences\n` +
           `   • ${projectsData.length} Portfolio Projects\n` +
           `   • ${skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)} Technical Skills\n\n` +
           `Use 'resume --download' to save a copy\n`;
  }

  // Handle help flag
  if (flags.includes('--help') || flags.includes('-h')) {
    return `\nRESUME COMMAND USAGE\n` +
           `═`.repeat(25) + `\n\n` +
           `Available Options:\n` +
           `   resume                 - Show resume information\n` +
           `   resume --download      - Download PDF resume\n` +
           `   resume --view          - View resume in browser\n` +
           `   resume --stats         - Show detailed statistics\n` +
           `   resume --help          - Show this help message\n\n` +
           `Quick Commands:\n` +
           `   resume -d              - Quick download\n` +
           `   resume -v              - Quick view\n` +
           `   resume -s              - Quick stats\n`;
  }

  // Handle stats flag
  if (flags.includes('--stats') || flags.includes('-s')) {
    return `\nRESUME STATISTICS\n` +
           `═`.repeat(25) + `\n\n` +
           `PROFESSIONAL OVERVIEW:\n` +
           `   • ${experiencesData.length} Total Work Experiences\n` +
           `   • ${experiencesData.filter(exp => exp.type === 'fulltime').length} Full-time Positions\n` +
           `   • ${experiencesData.filter(exp => exp.type === 'internship').length} Internships\n` +
           `   • ${experiencesData.filter(exp => exp.type === 'education').length} Educational Background\n\n` +
           `PROJECT PORTFOLIO:\n` +
           `   • ${projectsData.length} Total Projects\n` +
           `   • ${projectsData.filter(p => p.liveUrl).length} Live Deployments\n` +
           `   • ${projectsData.filter(p => p.githubUrl).length} Open Source Projects\n` +
           `   • 3+ Major Client Projects (sellrgrid, proteinwriter, nordsecpro)\n\n` +
           `TECHNICAL EXPERTISE:\n` +
           `   • ${skillsData.length} Skill Categories\n` +
           `   • ${skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)} Total Technical Skills\n` +
           `   • ${skillsData.reduce((acc, cat) => acc + cat.skills.filter(s => s.proficiency >= 90).length, 0)} Expert-level Skills (90%+)\n` +
           `   • ${skillsData.reduce((acc, cat) => acc + cat.skills.filter(s => s.proficiency >= 80).length, 0)} Advanced Skills (80%+)\n\n` +
           `Use 'resume --download' to get the complete PDF!\n`;
  }

  // Default resume information
  return `\nABDUL AZIZ - RESUME & CV\n` +
         `═`.repeat(35) + `\n\n` +
         `Professional Resume Available:\n` +
         `   [x] PDF Format (Latest Version)\n` +
         `   [x] Comprehensive work history\n` +
         `   [x] Skills and certifications\n` +
         `   [x] Complete contact information\n\n` +
         `QUICK ACTIONS:\n` +
         `   resume --download    → Download PDF resume\n` +
         `   resume --view        → View in browser\n` +
         `   resume --stats       → Detailed statistics\n\n` +
         `RESUME HIGHLIGHTS:\n` +
         `   • Senior Software Engineer & Team Lead\n` +
         `   • ${experiencesData.length} Professional Experiences\n` +
         `   • ${projectsData.length} Portfolio Projects\n` +
         `   • ${skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)} Technical Skills\n` +
         `   • Major Client Projects: sellrgrid.com, proteinwriter.com, nordsecpro.com\n` +
         `   • BS Computer Science from PUCIT\n\n` +
         `ADDITIONAL RESOURCES:\n` +
         `   LinkedIn: linkedin.com/in/connect2abdulaziz\n` +
         `   GitHub: github.com/connect2abdulaziz\n` +
         `   Interactive Portfolio: This terminal experience you're using!\n` +
         `   Traditional Portfolio: Switch to portfolio view (top toggle)\n\n` +
         `Pro tip: Use 'resume -d' for quick download or 'contact' for direct communication!\n`;
};