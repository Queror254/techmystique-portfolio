
import React, { useState, useCallback, ReactNode, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import NormalView from './components/NormalView';
import ViewModeToggle from './components/ViewModeToggle';
import ThemeSwitcher from './components/ThemeSwitcher';
import ProjectModal from './components/ProjectModal';
import { YOUR_NAME, YOUR_HEADLINE, PROJECTS, THEMES } from './constants';
import WelcomeOutput from './components/output/WelcomeOutput';
import HelpOutput from './components/output/HelpOutput';
import AboutOutput from './components/output/AboutOutput';
import ProjectsOutput from './components/output/ProjectsOutput';
import SkillsOutput from './components/output/SkillsOutput';
import ContactOutput from './components/output/ContactOutput';
import NotFoundOutput from './components/output/NotFoundOutput';
import HistoryOutput from './components/output/HistoryOutput';
import CowsayOutput from './components/output/CowsayOutput';
import { Project } from './types';
import TopBar from './components/TopBar';
import AskOutput from './components/output/AskOutput';
import GameView from './components/GameView';

type ViewMode = 'terminal' | 'normal' | 'game';

interface HistoryItem {
  command: string;
  output: ReactNode;
}

interface ModalContent {
    name: string;
    url: string;
}

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: 'init', output: <WelcomeOutput executeCommand={(cmd) => executeCommand(cmd, true)} /> }
  ]);
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeCommand, setActiveCommand] = useState('init');
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('terminal');
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [contactFormStep, setContactFormStep] = useState<'idle' | 'name' | 'email' | 'message'>('idle');
  const [contactFormData, setContactFormData] = useState({ name: '', email: '', message: '' });
  const [prompt, setPrompt] = useState<ReactNode>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };
  
  const isTerminalMode = viewMode === 'terminal';

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'default';
    document.body.setAttribute('data-theme', savedTheme);

    const savedViewMode = localStorage.getItem('portfolio-view-mode') as ViewMode | null;
    setViewMode(savedViewMode || 'terminal');
  }, []);

  useEffect(() => {
    let newPrompt: ReactNode = null;
    if (contactFormStep !== 'idle' && isTerminalMode) {
      const promptStyle = "text-[var(--accent-green-light)] font-bold mr-2";
      switch (contactFormStep) {
        case 'name':
          newPrompt = <label htmlFor="terminal-input" className={promptStyle}>Name:</label>;
          break;
        case 'email':
          newPrompt = <label htmlFor="terminal-input" className={promptStyle}>Email:</label>;
          break;
        case 'message':
          newPrompt = <label htmlFor="terminal-input" className={promptStyle}>Message:</label>;
          break;
      }
    }
    setPrompt(newPrompt);
  }, [contactFormStep, isTerminalMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const setView = (mode: ViewMode) => {
      setViewMode(mode);
      localStorage.setItem('portfolio-view-mode', mode);
      if(mode !== 'game') {
        setActiveGame(null);
      }
      closeSidebar();
  }

  const toggleViewMode = () => {
    const newMode = isTerminalMode ? 'normal' : 'terminal';
    setView(newMode);
  }
  
  const handleNavigation = (section: string) => {
    if (section in sectionRefs) {
        sectionRefs[section as keyof typeof sectionRefs]?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRunProject = (project: Project) => {
     if (project.liveUrl) {
        setModalContent({ name: project.name, url: project.liveUrl });
     }
  };

  const executeCommand = useCallback((command: string, fromClick: boolean = false) => {
    if (isProcessing) return;

    const trimmedCommand = command.trim();

    if (contactFormStep !== 'idle') {
      setIsProcessing(true);

      let output: ReactNode;
      let nextStep: 'idle' | 'name' | 'email' | 'message' = contactFormStep;
      let newFormData = { ...contactFormData };
      
      const newHistoryItem: HistoryItem = { command: (contactFormStep === 'message' && !trimmedCommand) ? '<empty message>' : trimmedCommand, output: '' };

      if (trimmedCommand.toLowerCase() === 'abort') {
        output = <p>Contact process aborted.</p>;
        nextStep = 'idle';
        setContactFormData({ name: '', email: '', message: '' });
      } else if (!trimmedCommand && contactFormStep !== 'message') {
        output = <p className="text-[var(--accent-red)]">Input cannot be empty. Please try again, or type 'abort' to cancel.</p>;
      } else {
        switch (contactFormStep) {
          case 'name':
            newFormData.name = trimmedCommand;
            nextStep = 'email';
            output = <p>Thanks, {trimmedCommand}. What is your email address?</p>;
            break;
          case 'email':
            if (!/^\S+@\S+\.\S+$/.test(trimmedCommand)) {
                output = <p className="text-[var(--accent-red)]">Please enter a valid email address, or type 'abort' to cancel.</p>;
            } else {
                newFormData.email = trimmedCommand;
                nextStep = 'message';
                output = <p>Got it. Finally, what is your message?</p>;
            }
            break;
          case 'message':
            newFormData.message = trimmedCommand;
            nextStep = 'idle';
            console.log('New contact submission:', newFormData);
            output = (
              <div className="p-2 rounded-md border border-[var(--accent-green)] bg-[var(--bg-tertiary-alpha)]">
                <h3 className="font-bold text-[var(--accent-green)]">Success!</h3>
                <p className="text-[var(--text-primary)]">Your message has been sent. Thank you for reaching out, {newFormData.name}!</p>
              </div>
            );
            setContactFormData({ name: '', email: '', message: '' });
            break;
        }
      }

      newHistoryItem.output = output;
      setHistory(prev => [...prev, newHistoryItem]);
      setContactFormStep(nextStep);
      setContactFormData(newFormData);
      if (nextStep !== 'idle' || contactFormStep === 'message') {
          setCommandLog(prev => [...prev, `contact:${contactFormStep}`]);
      }
      setIsProcessing(false);
      return;
    }
    
    if (!trimmedCommand) return;

    setIsProcessing(true);
    
    if (trimmedCommand !== 'clear' && !trimmedCommand.startsWith('message:sent')) {
        setCommandLog(prev => [...prev, trimmedCommand]);
    }

    const newHistory: HistoryItem[] = fromClick ? [] : [...history, { command: trimmedCommand, output: null }];
    let output: ReactNode;
    
    const args = trimmedCommand.toLowerCase().split(' ');
    const cmd = args[0];

    setTimeout(() => {
      let commandHandled = true;
      switch (cmd) {
        case 'help':
          output = <HelpOutput />;
          if(fromClick) setView('terminal');
          break;
        case 'about':
        case 'projects':
        case 'skills':
        case 'contact':
            if (fromClick) {
                if(isTerminalMode) {
                    executeCommand(cmd, false);
                } else {
                    handleNavigation(cmd);
                    closeSidebar();
                }
                setIsProcessing(false);
                return;
            }
             switch(cmd) {
                case 'about': output = <AboutOutput />; break;
                case 'projects': output = <ProjectsOutput onRunProject={handleRunProject} isTerminalMode={true}/>; break;
                case 'skills': output = <SkillsOutput />; break;
                case 'contact':
                    setContactFormStep('name');
                    output = (
                        <div>
                            <p>Happy to connect! Please answer the following questions.</p>
                            <p>(Type <span className="text-[var(--accent-red)] font-bold">abort</span> at any time to cancel.)</p>
                            <p className="mt-2 font-bold text-[var(--text-bright)]">What is your name?</p>
                        </div>
                    );
                    break;
            }
            break;
        case 'clear':
          setHistory([{ command: 'init', output: <WelcomeOutput executeCommand={(cmd) => executeCommand(cmd, true)} /> }]);
          setActiveCommand('init');
          setContactFormStep('idle');
          setIsProcessing(false);
          return;
        case 'history':
            output = <HistoryOutput log={commandLog} />;
            if(fromClick) setView('terminal');
            break;
        case 'cowsay':
            const message = command.substring('cowsay'.length).trim() || 'Moo-ve along!';
            output = <CowsayOutput message={message} />;
            if(fromClick) setView('terminal');
            break;
        case 'ask':
            const question = command.substring('ask'.length).trim();
            output = <AskOutput prompt={question} />;
            if(fromClick) setView('terminal');
            break;
        case 'play':
            const gameName = args[1];
            if (gameName === 'tictactoe') {
                setView('game');
                setActiveGame('tictactoe');
                output = <p>Launching Tic-Tac-Toe...</p>;
            } else {
                if(fromClick) setView('terminal');
                output = <div>
                    <p>Which game would you like to play?</p>
                    <p>Available games: <span className="text-[var(--accent-cyan)]">tictactoe</span></p>
                    <p>Usage: play {'<game_name>'}</p>
                </div>;
            }
            break;
        case 'run':
            const slug = args[1];
            const projectToRun = PROJECTS.find(p => p.slug === slug);
            if (projectToRun) {
                handleRunProject(projectToRun);
                output = <p>Launching project: <span className="font-bold text-[var(--accent-green-light)]">{projectToRun.name}</span>...</p>
            } else {
                output = <p className="text-[var(--accent-red)]">Error: Project '{slug}' not found or has no live demo.</p>
            }
            if(fromClick) setView('terminal');
            break;
        case 'theme':
            const subCmd = args[1];
            const themeName = args[2];
            if (subCmd === 'set' && themeName && THEMES.includes(themeName)) {
                document.body.setAttribute('data-theme', themeName);
                localStorage.setItem('portfolio-theme', themeName);
                output = <p>Theme set to <span className="font-bold text-[var(--accent-cyan)]">{themeName}</span></p>;
            } else if (subCmd === 'list') {
                 output = <div><p>Available themes:</p><ul className="list-disc list-inside">{THEMES.map(t=><li key={t}>{t}</li>)}</ul></div>
            }
            else {
                output = <p className="text-[var(--accent-red)]">Usage: theme [set|list] {'<theme_name>'}</p>;
            }
            if(fromClick) setView('terminal');
            break;
        case 'view':
            if (args[1] === 'normal') {
                setView('normal');
                output = <p>Switching to normal view...</p>;
            } else if (args[1] === 'terminal') {
                setView('terminal');
                output = <p>Switching to terminal view...</p>;
            } else {
                output = <p className="text-[var(--accent-red)]">Usage: view [normal|terminal]</p>;
            }
            break;
        case 'ls':
             output = <HelpOutput />
             if(fromClick) setView('terminal');
             break;
        default:
          commandHandled = false;
          output = <NotFoundOutput command={command} />;
          if(fromClick) setView('terminal');
          break;
      }

      setActiveCommand(commandHandled ? cmd : 'not-found');
      
      if (fromClick && cmd !== 'play') { // Play command handles its own view
        setHistory([{ command, output }]);
      } else {
        setHistory(prev => {
            const updatedHistory = [...prev];
            updatedHistory[updatedHistory.length-1].output = output;
            return updatedHistory;
        });
      }

      setIsProcessing(false);
    }, 300);
  }, [history, isProcessing, commandLog, contactFormStep, contactFormData, viewMode]);

  return (
    <>
      <div className="flex flex-col h-screen antialiased">
        <TopBar
            activeCommand={activeCommand}
            isTerminalMode={isTerminalMode}
            onToggle={toggleViewMode}
            onToggleSidebar={toggleSidebar}
            activeGame={activeGame}
            viewMode={viewMode}
        />
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden relative">
            <div className={`
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
              absolute top-0 left-0 h-full w-72 md:h-auto 
              md:relative 
              bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] 
              flex-shrink-0 p-3 overflow-y-auto terminal-scrollbar flex flex-col 
              transition-transform duration-300 ease-in-out z-30
            `}>
              <div className="mb-6">
                  <h1 className="text-xl font-bold text-[var(--text-bright)]">{YOUR_NAME}</h1>
                  <p className="text-sm text-[var(--accent-cyan)]">{YOUR_HEADLINE}</p>
              </div>
              <Sidebar 
                executeCommand={executeCommand} 
                activeCommand={activeCommand}
                isTerminalMode={isTerminalMode}
                onClose={closeSidebar}
              />
            </div>

            {isSidebarOpen && (
              <div 
                className="md:hidden fixed inset-0 bg-black/50 z-20"
                onClick={closeSidebar}
                aria-hidden="true"
              ></div>
            )}

            <main className="flex-1 flex flex-col bg-[var(--bg-primary)] overflow-hidden relative">
              { viewMode === 'terminal' && (
                <Terminal 
                  history={history} 
                  onCommand={executeCommand}
                  isProcessing={isProcessing}
                  prompt={prompt}
                />
              )}
              { viewMode === 'normal' && (
                <NormalView refs={sectionRefs} onRunProject={handleRunProject} />
              )}
              { viewMode === 'game' && (
                <GameView activeGame={activeGame} onExit={() => setView('terminal')} />
              )}
            </main>
        </div>
      </div>
      {modalContent && (
        <ProjectModal 
            name={modalContent.name} 
            url={modalContent.url} 
            onClose={() => setModalContent(null)} 
        />
      )}
    </>
  );
}

export default App;
