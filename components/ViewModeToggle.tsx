import React from 'react';
import { TerminalIcon, LayoutIcon } from '../constants';

interface ViewModeToggleProps {
  isTerminalMode: boolean;
  onToggle: () => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ isTerminalMode, onToggle }) => {
  const title = isTerminalMode ? 'Switch to Normal View' : 'Switch to Terminal View';
  return (
    <button
      onClick={onToggle}
      title={title}
      aria-label={title}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-bright)] transition-colors duration-200 text-xs font-semibold"
    >
      {isTerminalMode ? (
        <>
          <LayoutIcon className="w-4 h-4" />
          <span>Normal View</span>
        </>
      ) : (
        <>
          <TerminalIcon className="w-4 h-4" />
          <span>Terminal View</span>
        </>
      )}
    </button>
  );
};

export default ViewModeToggle;