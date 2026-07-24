// Single source of truth for reading content. Everything is JSON so adding
// or editing content never requires touching component code.

import profileData from "@/../content/profile.json";
import skillsData from "@/../content/skills.json";
import experienceData from "@/../content/experience.json";
import projectsData from "@/../content/projects.json";
import researchData from "@/../content/research.json";
import certificationsData from "@/../content/certifications.json";
import educationData from "@/../content/education.json";
import designsData from "@/../content/designs.json";
import websitesData from "@/../content/websites.json";

import type {
  Profile,
  SkillCategory,
  Experience,
  Project,
  Research,
  Certification,
  Education,
  Design,
  WebsiteDesign,
} from "./types";

export const profile = profileData as Profile;
export const skillCategories = skillsData.categories as SkillCategory[];
export const experiences = experienceData.items as Experience[];
export const projects = projectsData.items as Project[];
export const research = researchData.items as Research[];
export const certifications = certificationsData.items as Certification[];
export const education = educationData.items as Education[];
export const designs = designsData.items as Design[];
export const websites = websitesData.items as WebsiteDesign[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
