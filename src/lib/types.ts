// Central type definitions for the JSON-based content system.

export interface Social {
  github: string;
  linkedin: string;
}

export interface Seo {
  siteUrl: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
}

export interface Profile {
  name: string;
  roles: string[];
  tagline: string;
  intro: string;
  location: string;
  email: string;
  resumeUrl: string;
  avatar: string;
  social: Social;
  seo: Seo;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
}

export type ProjectCategory =
  | "Web Development"
  | "AI"
  | "Full Stack"
  | "Research";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  thumbnail: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
  images: string[];
  details: {
    overview: string;
    highlights: string[];
  };
}




export interface Research {
  title: string;
  abstract: string;
  technologies: string[];
  status: string;
  publications: string[];
  futureWork: string;
}

export interface Certification {
  title: string;
  organization: string;
  year: string;
  image: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  detail: string;
}

export interface Design {
  title: string;
  category: string;
  image: string;
  tags: string[];
}

export interface WebsiteDesign {
  title: string;
  category: string;
  description: string;
  file: string;
  accent: string;
}
