import React from 'react';
import { SKILLS } from '../../constants';
import { SkillCategory } from '../../types';

const SkillsOutput: React.FC = () => (
  <div className="space-y-6">
    {SKILLS.map((category: SkillCategory, index: number) => (
      <div key={index}>
        <h3 className="text-lg font-bold text-[var(--accent-cyan)] border-b-2 border-[var(--border-primary)] pb-1 mb-3">
          {`// ${category.title}`}
        </h3>
        <div className="flex flex-wrap gap-3">
          {category.skills.map((skill: string, skillIndex: number) => (
            <span key={skillIndex} className="bg-[var(--bg-tertiary-alpha)] border border-[var(--border-secondary)] text-[var(--accent-green-light)] text-sm px-3 py-1 rounded-md">
              {skill}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default SkillsOutput;