export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  images: string[];
  tech: string[];
  category: "fullstack" | "frontend" | "backend";
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  status: "live" | "in-progress" | "archived";
  year: number;
  content?: string;
  problem: string;
  solution: string;
  result: string;
  challenges: string[];
  futurePlans: string[];
  architecture?: string;
  lessons: string[];
  metrics?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: "full-time" | "freelance" | "internship" | "contract";
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  level: "expert" | "advanced" | "intermediate" | "learning";
  category: "frontend" | "backend" | "database" | "devops" | "tools";
  yearsOfExperience?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  tags: string[];
  readingTime: string;
  thumbnail?: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  linkedinUrl?: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  contributionStreak: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  author: {
    name: string;
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
    facebook?: string;
    phone?: string;
    whatsapp?: string;
  };
  availableForWork: boolean;
}
