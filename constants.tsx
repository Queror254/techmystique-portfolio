import React from 'react';
import { Project, SkillCategory } from './types';

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

export const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

export const ControllerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.25 7.5h-6.5a1 1 0 00-1 1v6.5a1 1 0 001 1h6.5a1 1 0 001-1v-6.5a1 1 0 00-1-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 10.5h.01M8.5 13.5h.01M11.5 12h.01M14.5 10.5h.01M14.5 13.5h.01M7.5 17.5l-1-1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.5l1 1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 19a4 4 0 01-7-2.646M6 5a4 4 0 017 2.646" />
    </svg>
);

export const TerminalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
    </svg>
);

export const LayoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12h16" />
    </svg>
);

export const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.78-1.75-1.75S5.53 3.23 6.5 3.23c.97 0 1.75.78 1.75 1.75S7.47 6.73 6.5 6.73zM19 19h-3v-5.6c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94V19h-3V8h2.88v1.34h.04c.4-.76 1.38-1.55 2.84-1.55 3.03 0 3.59 1.99 3.59 4.58V19z"/>
    </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

export const PaletteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402a3.75 3.75 0 00-5.304-5.304L4.098 14.6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.572l-4.5-4.5a2.25 2.25 0 00-3.182 0l-1.262 1.262M19.5 12.572l-4.5 4.5a2.25 2.25 0 01-3.182 0l-1.262-1.262" />
    </svg>
);

export const PROJECTS: Project[] = [
  {
    name: 'Interactive Terminal Portfolio',
    slug: 'interactive-terminal-portfolio',
    description: 'This very website! A portfolio inspired by the VS Code editor, featuring an interactive terminal, themes, AI integration, and even games. Built with React, TypeScript, and Tailwind CSS.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini API'],
    repoUrl: 'https://github.com/Queror254/interactive-terminal-portfolio',
    images: [
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/249798/pexels-photo-249798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
  },
  {
    name: 'QuantumLeap AI',
    slug: 'quantumleap-ai',
    description: 'A cutting-edge machine learning platform for predictive analytics, featuring a serverless architecture for scalability and real-time data processing pipelines.',
    stack: ['React', 'TypeScript', 'Node.js', 'AWS Lambda', 'DynamoDB'],
    liveUrl: 'https://react.dev/',
    repoUrl: '#',
    images: [
        'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
  },
  {
    name: 'Project Nebula',
    slug: 'project-nebula',
    description: 'An interactive data visualization tool for astronomical data, built with D3.js and React. Allows users to explore star clusters and nebulae in a 3D space.',
    stack: ['React', 'D3.js', 'Three.js', 'TailwindCSS'],
    liveUrl: 'https://threejs.org/',
    repoUrl: '#',
    images: [
        'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'Vite']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'NestJS', 'Python', 'Go']
  },
  {
    title: 'Databases & Cloud',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'GCP', 'Docker', 'Kubernetes']
  },
  {
    title: 'Tools & Practices',
    skills: ['Git', 'CI/CD', 'Agile/Scrum', 'TDD', 'System Design']
  }
];

export const THEMES = ['default', 'solarized-light', 'matrix', 'nord', 'gruvbox-dark'];

export const PROFILE_IMAGE_URL = 'https://avatars.githubusercontent.com/u/126842172?v=4';

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/Queror254',
    Icon: GithubIcon,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/your-profile',
    Icon: LinkedinIcon,
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/your-profile',
    Icon: TwitterIcon,
  }
];

export const YOUR_NAME = "Victor Mwenda (TechMystique)";
export const YOUR_HEADLINE = "Full-Stack Developer & AI Enthusiast";
export const YOUR_EMAIL = "mwendavictor@gmail.com";