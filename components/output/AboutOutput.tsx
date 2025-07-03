import React from 'react';
import { YOUR_NAME, YOUR_HEADLINE, PROFILE_IMAGE_URL, SOCIAL_LINKS } from '../../constants';

const AboutOutput: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
    <div className="flex-shrink-0">
      <img 
        src={PROFILE_IMAGE_URL} 
        alt={YOUR_NAME}
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[var(--border-secondary)] shadow-lg"
      />
    </div>
    <div className="text-center md:text-left">
      <h2 className="text-2xl font-bold text-[var(--accent-cyan)]">{YOUR_NAME}</h2>
      <h3 className="text-lg text-[var(--accent-green)] mt-1">{YOUR_HEADLINE}</h3>
      <div className="mt-4 space-y-3 text-[var(--text-primary)]">
        <p>
          I am a passionate and results-driven Full-Stack Developer with a knack for building elegant, efficient, and scalable web applications. With a strong foundation in both front-end and back-end technologies, I thrive on turning complex problems into simple, beautiful, and intuitive designs.
        </p>
        <p>
          My journey in tech is fueled by a relentless curiosity and a desire to learn. I'm currently exploring the fascinating world of Artificial Intelligence and Large Language Models, seeking to integrate intelligent features into modern software solutions.
        </p>
      </div>
       <div className="mt-6 flex justify-center md:justify-start items-center gap-5">
        {SOCIAL_LINKS.map(({ name, url, Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={name}
            className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200"
          >
            <Icon className="w-6 h-6" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default AboutOutput;