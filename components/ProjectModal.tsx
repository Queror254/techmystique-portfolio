import React, { useEffect } from 'react';

interface ProjectModalProps {
  name: string;
  url: string;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ name, url, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full h-full max-w-6xl max-h-[90vh] bg-[var(--bg-secondary)] rounded-lg shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-[var(--border-primary)] flex-shrink-0">
          <h3 className="font-bold text-[var(--text-bright)]">{name}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--accent-red)] hover:text-white transition-colors"
            aria-label="Close project demo"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 bg-white">
          <iframe
            src={url}
            title={name}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
