import React, { useState } from 'react';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';

interface ProjectsOutputProps {
    onRunProject: (project: Project) => void;
    isTerminalMode?: boolean;
}

const ProjectImageSlider: React.FC<{ images: string[], projectName: string }> = ({ images, projectName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex: number) => {
      setCurrentIndex(slideIndex);
  }

  if (!images || images.length === 0) {
    return (
        <div className="relative h-64 w-full rounded-md overflow-hidden group bg-[#161618] flex items-center justify-center">
            <p className="text-[var(--text-muted)]">No preview available</p>
        </div>
    );
  }

  return (
    <div className="relative h-64 w-full rounded-md overflow-hidden group bg-[#161618]">
        <div 
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
            className="w-full h-full bg-center bg-cover duration-500 transition-transform transform group-hover:scale-105"
            role="img"
            aria-label={`${projectName} - Image ${currentIndex + 1} of ${images.length}`}
        ></div>
        
        {images.length > 1 && (
            <>
                <button 
                    onClick={goToPrevious} 
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 focus:outline-none"
                    aria-label="Previous image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                <button 
                    onClick={goToNext} 
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 focus:outline-none"
                    aria-label="Next image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, slideIndex) => (
                        <button
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                            aria-label={`Go to image ${slideIndex + 1}`}
                        ></button>
                    ))}
                </div>
            </>
        )}
    </div>
  );
};


const ProjectCard: React.FC<{ project: Project; onRunProject: (project: Project) => void; isTerminalMode?: boolean; }> = ({ project, onRunProject, isTerminalMode }) => (
    <div className="border border-[var(--border-primary)] bg-[var(--bg-secondary)] rounded-lg p-4 mb-6 transition-all duration-300 hover:border-[var(--accent-cyan)]">
        <h3 className="text-xl font-bold text-[var(--accent-green)]">{project.name}</h3>
        <p className="my-2 text-[var(--text-primary)]">{project.description}</p>
        
        {isTerminalMode && project.liveUrl && (
            <p className="text-sm text-[var(--text-secondary)]">Run this demo with: <code className="text-[var(--accent-orange)]">run {project.slug}</code></p>
        )}

        <div className="flex flex-wrap gap-2 my-3">
            {project.stack.map(tech => (
                <span key={tech} className="bg-[var(--bg-tertiary)] text-[var(--accent-cyan)] text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
            ))}
        </div>
        <ProjectImageSlider images={project.images} projectName={project.name} />
        <div className="mt-4 flex gap-4">
            {project.liveUrl && (
                <button 
                    onClick={() => onRunProject(project)} 
                    className="text-[var(--accent-yellow)] hover:underline font-semibold"
                >
                    Run Demo
                </button>
            )}
            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-yellow)] hover:underline">GitHub Repo</a>}
        </div>
    </div>
);


const ProjectsOutput: React.FC<ProjectsOutputProps> = ({ onRunProject, isTerminalMode }) => (
  <div>
    {PROJECTS.map((project, index) => (
      <ProjectCard key={index} project={project} onRunProject={onRunProject} isTerminalMode={isTerminalMode} />
    ))}
  </div>
);

export default ProjectsOutput;