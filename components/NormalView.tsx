import React from 'react';
import AboutOutput from './output/AboutOutput';
import ProjectsOutput from './output/ProjectsOutput';
import SkillsOutput from './output/SkillsOutput';
import ContactOutput from './output/ContactOutput';
import { Project } from '../types';

interface NormalViewProps {
  refs: {
    about: React.RefObject<HTMLDivElement>;
    projects: React.RefObject<HTMLDivElement>;
    skills: React.RefObject<HTMLDivElement>;
    contact: React.RefObject<HTMLDivElement>;
  };
  onRunProject: (project: Project) => void;
}

const SectionWrapper: React.FC<{ id: string; title: string; refProp: React.RefObject<HTMLDivElement>; children: React.ReactNode }> = ({ id, title, refProp, children }) => (
    <section id={id} ref={refProp} className="mb-16 scroll-mt-16">
        <h2 className="text-2xl font-bold text-[var(--accent-cyan)] border-b-2 border-[var(--border-primary)] pb-2 mb-6">{title}</h2>
        {children}
    </section>
);


const NormalView: React.FC<NormalViewProps> = ({ refs, onRunProject }) => {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto terminal-scrollbar">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
            <img 
                src="https://github.com/Queror254/Queror254/raw/main/download.gif" 
                alt="Futuristic AI and technology banner" 
                className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg border border-[var(--border-primary)]" 
            />
        </div>
        
        <SectionWrapper id="about" title="about.md" refProp={refs.about}>
            <AboutOutput />
        </SectionWrapper>

        <SectionWrapper id="projects" title="projects.json" refProp={refs.projects}>
            <ProjectsOutput onRunProject={onRunProject} />
        </SectionWrapper>
        
        <SectionWrapper id="skills" title="skills.ts" refProp={refs.skills}>
            <SkillsOutput />
        </SectionWrapper>

        <SectionWrapper id="contact" title="contact.html" refProp={refs.contact}>
            <ContactOutput />
        </SectionWrapper>
      </div>
    </div>
  );
};

export default NormalView;