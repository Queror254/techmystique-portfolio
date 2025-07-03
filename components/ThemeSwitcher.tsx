import React, { useState, useEffect, useRef } from 'react';
import { PaletteIcon, THEMES } from '../constants';

const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'default';
    setCurrentTheme(savedTheme);

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleThemeChange = (theme: string) => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Change theme"
        aria-label="Change theme"
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-bright)] transition-colors duration-200 text-xs font-semibold"
      >
        <PaletteIcon className="w-4 h-4" />
        <span>Theme</span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-md shadow-lg z-20 animate-fade-in-fast">
          <ul className="py-1">
            {THEMES.map((theme) => (
              <li key={theme}>
                <button
                  onClick={() => handleThemeChange(theme)}
                  className={`w-full text-left px-4 py-2 text-sm capitalize ${
                    currentTheme === theme ? 'bg-[var(--bg-tertiary-alpha)] text-[var(--text-bright)]' : 'text-[var(--text-primary)]'
                  } hover:bg-[var(--bg-tertiary)]`}
                >
                  {theme.replace('-', ' ')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ThemeSwitcher;
