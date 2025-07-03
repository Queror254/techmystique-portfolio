
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, FolderIcon, FileIcon, SOCIAL_LINKS, YOUR_EMAIL, ControllerIcon } from '../constants';
import { ViewMode } from '../types';

interface SidebarProps {
  executeCommand: (command: string, fromClick: boolean) => void;
  activeCommand: string;
  onClose: () => void;
  activeGame: string | null;
  viewMode: ViewMode;
}

const Sidebar: React.FC<SidebarProps> = ({ executeCommand, activeCommand, onClose, activeGame, viewMode }) => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'portfolio': true,
  });

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const sections = [
    { name: 'about.md', command: 'about' },
    { name: 'projects.json', command: 'projects' },
    { name: 'skills.ts', command: 'skills' },
    { name: 'contact.html', command: 'contact' }
  ];
  
  const handleItemClick = (command: string) => {
    executeCommand(command, true);
    onClose();
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="px-1 py-2 text-xs font-bold tracking-wider text-[var(--text-secondary)] uppercase select-none">
        Explorer
      </div>
      <nav>
        <div className="space-y-1">
          <button
            onClick={() => toggleFolder('portfolio')}
            className="w-full flex items-center text-left text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-tertiary-alpha)] p-1 rounded"
          >
            {openFolders['portfolio'] ? <ChevronDownIcon className="w-4 h-4 mr-2" /> : <ChevronRightIcon className="w-4 h-4 mr-2" />}
            <FolderIcon className="w-5 h-5 mr-2 text-[var(--accent-cyan)]" />
            <span>Portfolio</span>
          </button>
          {openFolders['portfolio'] && (
            <div className="pl-5 space-y-1 border-l border-[var(--border-primary)] ml-3">
              {sections.map(section => {
                const isActive = section.command === activeCommand;
                return (
                  <a
                    key={section.name}
                    href={`#/${section.command}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleItemClick(section.command);
                    }}
                    className={`w-full flex items-center text-left text-sm p-1 rounded transition-colors duration-150 ${
                      isActive 
                        ? 'bg-[var(--bg-tertiary)] text-[var(--text-bright)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-bright)] hover:bg-[var(--bg-tertiary-alpha)]'
                    }`}
                  >
                    <FileIcon className="w-5 h-5 mr-2 text-[var(--text-muted)]" />
                    <span>{section.name}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </nav>
      
      <div className="mt-4 px-1 py-2 text-xs font-bold tracking-wider text-[var(--text-secondary)] uppercase select-none">
        Games
      </div>
      <nav className="space-y-1">
         <a
            href="#/play/tictactoe"
            onClick={(e) => {
                e.preventDefault();
                handleItemClick('play tictactoe');
            }}
            className={`w-full flex items-center text-left text-sm p-1 rounded transition-colors duration-150 ${
              activeGame === 'tictactoe' && viewMode === 'game'
                ? 'bg-[var(--bg-tertiary)] text-[var(--text-bright)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-bright)] hover:bg-[var(--bg-tertiary-alpha)]'
            }`}
          >
            <ControllerIcon className="w-5 h-5 mr-2 text-[var(--accent-green)]" />
            <span>tictactoe.jsx</span>
        </a>
      </nav>

      <div className="mt-auto pt-6 border-t border-[var(--border-primary)]">
          <div className="flex justify-center items-center gap-5 mb-4">
              {SOCIAL_LINKS.map(({ name, url, Icon }) => (
                  <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={name}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200"
                  >
                      <Icon className="w-5 h-5" />
                  </a>
              ))}
          </div>
          <a
              href={`mailto:${YOUR_EMAIL}`}
              className="block text-center text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 truncate"
              title={`Email ${YOUR_EMAIL}`}
          >
              {YOUR_EMAIL}
          </a>
      </div>
    </div>
  );
};

export default Sidebar;
