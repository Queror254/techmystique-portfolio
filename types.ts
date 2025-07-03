export interface Project {
  name: string;
  slug: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  images: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}