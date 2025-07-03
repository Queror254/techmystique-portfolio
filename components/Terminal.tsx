
import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  history: { command: string; output: React.ReactNode }[];
  onCommand: (command: string) => void;
  isProcessing: boolean;
  prompt?: React.ReactNode;
}

const BlinkingCursor: React.FC = () => (
    <span className="w-2.5 h-5 bg-[var(--accent-green)] inline-block animate-pulse"></span>
);

const Terminal: React.FC<TerminalProps> = ({ history, onCommand, isProcessing, prompt }) => {
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, [isProcessing, prompt]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCommand(inputValue);
    setInputValue('');
  };

  return (
    <div 
      className="flex-1 p-4 text-base leading-relaxed overflow-y-auto terminal-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item, index) => (
        item.command !== 'init' && (
          <div key={index}>
            <div className="flex items-center">
              <span className="text-[var(--accent-cyan)]">user@portfolio</span>
              <span className="text-[var(--text-secondary)]">:</span>
              <span className="text-[var(--accent-purple)]">~</span>
              <span className="text-[var(--text-secondary)]">$</span>
              <span className="ml-2 text-[var(--text-bright)]">{item.command}</span>
            </div>
            <div className="mt-1 mb-4">
              {item.output}
            </div>
          </div>
        )
      ))}

        {history.length > 0 && history[0].command === 'init' && (
             <div className="mt-1 mb-4">{history[0].output}</div>
        )}


      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center">
            {prompt || (
              <>
                <span className="text-[var(--accent-cyan)]">user@portfolio</span>
                <span className="text-[var(--text-secondary)]">:</span>
                <span className="text-[var(--accent-purple)]">~</span>
                <span className="text-[var(--text-secondary)]">$</span>
              </>
            )}
          <input
            ref={inputRef}
            type="text"
            id="terminal-input"
            value={inputValue}
            onChange={handleInputChange}
            className={`flex-1 ml-2 bg-transparent border-none outline-none text-[var(--text-bright)] ${prompt ? '' : 'pl-2'}`}
            autoFocus
            disabled={isProcessing}
            autoComplete="off"
            aria-label="Terminal input"
          />
         {!isProcessing && <BlinkingCursor />}
        </div>
      </form>
      <div ref={terminalEndRef} />
    </div>
  );
};

export default Terminal;
