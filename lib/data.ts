import type { Skill, Experience as ExperienceType, Testimonial } from "@/types";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
];

export const skills: Skill[] = [
  // Frontend
  { name: "Next.js", category: "frontend", level: "expert", yearsOfExperience: 2 },
  { name: "React", category: "frontend", level: "expert", yearsOfExperience: 3 },
  { name: "TypeScript", category: "frontend", level: "advanced", yearsOfExperience: 2 },
  { name: "Tailwind CSS", category: "frontend", level: "expert", yearsOfExperience: 2 },
  { name: "Framer Motion", category: "frontend", level: "advanced", yearsOfExperience: 1 },
  // Backend
  { name: "Node.js", category: "backend", level: "expert", yearsOfExperience: 3 },
  { name: "Express.js", category: "backend", level: "expert", yearsOfExperience: 3 },
  { name: "REST API", category: "backend", level: "expert", yearsOfExperience: 3 },
  { name: "Socket.io", category: "backend", level: "advanced", yearsOfExperience: 1 },
  { name: "JWT Auth", category: "backend", level: "advanced", yearsOfExperience: 2 },
  // Database
  { name: "MongoDB", category: "database", level: "advanced", yearsOfExperience: 2 },
  { name: "PostgreSQL", category: "database", level: "intermediate", yearsOfExperience: 1 },
  { name: "Prisma", category: "database", level: "intermediate", yearsOfExperience: 1 },
  { name: "Redis", category: "database", level: "learning" },
  // DevOps
  { name: "Vercel", category: "devops", level: "advanced", yearsOfExperience: 2 },
  { name: "Docker", category: "devops", level: "intermediate", yearsOfExperience: 1 },
  { name: "Git / GitHub", category: "devops", level: "expert", yearsOfExperience: 3 },
  // Tools
  { name: "Cloudinary", category: "tools", level: "advanced", yearsOfExperience: 1 },
  { name: "Resend", category: "tools", level: "advanced", yearsOfExperience: 1 },
  { name: "Figma", category: "tools", level: "intermediate", yearsOfExperience: 1 },
];

// ← তোমার real experience add করো
export const experiences: ExperienceType[] = [
  {
    id: "exp-1",
    company: "Staric IT",
    role: "Database & Application Support Developer",
    type: "full-time",
    startDate: "2024-06",
    current: true,
    location: "Dhaka, Bangladesh",
    description: "Building and maintaining full-stack web applications using Next.js and Node.js.",
    achievements: [
      "Designed and developed interactive web application interfaces (forms, dashboards, reports) on Oracle APEX, serving 1,500+ internal users",
      "Wrote PL/SQL procedures, functions, and triggers to implement backend business logic, data validation, andautomated workflows",
      "Wrote and optimized SQL queries for analytics and reporting, ensuring accurate, real-time data access for 1,500+ users",
    ],
    tech: ["Oracle Apex", "Sql", "Node.js", "MongoDB", "Tailwind CSS"],
  },
];

// ← real testimonials add করো অথবা খালি রাখো
export const testimonials: Testimonial[] = [];
