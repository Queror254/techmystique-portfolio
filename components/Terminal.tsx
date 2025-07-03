
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

const TerminalPrompt: React.FC = () => (
    <>
      <span className="text-[var(--accent-cyan)] hidden sm:inline">user@portfolio</span>
      <span className="text-[var(--text-secondary)] hidden sm:inline">:</span>
      <span className="text-[var(--accent-purple)]">~</span>
      <span className="text-[var(--text-secondary)] sm:hidden"> </span>
      <span className="text-[var(--text-secondary)]">$</span>
    </>
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
    if(isProcessing) return;
    onCommand(inputValue);
    setInputValue('');
  };

  return (
    <div 
      className="flex-1 p-4 text-base leading-relaxed overflow-y-auto terminal-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item, index) => {
        if (item.command === 'init') {
            return <div key={index} className="mt-1 mb-4">{item.output}</div>
        }
        return (
          <div key={index}>
            <div className="flex flex-wrap items-baseline">
                <div className="flex-shrink-0 mr-2">
                    <TerminalPrompt />
                </div>
                <span className="text-[var(--text-bright)] break-all">{item.command}</span>
            </div>
            {item.output !== null ? (
                <div className="mt-1 mb-4">{item.output}</div>
            ) : (
                isProcessing && index === history.length - 1 && <div className="mt-1 mb-4 h-6"></div>
            )}
          </div>
        )
      })}

      {!isProcessing && (
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center">
              {prompt || (
                <div className="flex-shrink-0 mr-2">
                  <TerminalPrompt />
                </div>
              )}
            <input
              ref={inputRef}
              type="text"
              id="terminal-input"
              value={inputValue}
              onChange={handleInputChange}
              className={`flex-1 bg-transparent border-none outline-none text-[var(--text-bright)] w-full`}
              autoFocus
              disabled={isProcessing}
              autoComplete="off"
              aria-label="Terminal input"
            />
          <BlinkingCursor />
          </div>
        </form>
      )}
      <div ref={terminalEndRef} />
    </div>
  );
};

export default Terminal;
