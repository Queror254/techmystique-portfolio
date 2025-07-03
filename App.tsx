
import React, { useState, useCallback, ReactNode, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import NormalView from './components/NormalView';
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
import { Project, ViewMode } from './types';
import TopBar from './components/TopBar';
import AskOutput from './components/output/AskOutput';
import GameView from './components/GameView';
import ProjectModal from './components/ProjectModal';

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
    let title = `${YOUR_NAME} - Portfolio`;
    if (viewMode === 'game' && activeGame) {
        const gameName = activeGame.charAt(0).toUpperCase() + activeGame.slice(1);
        title = `${gameName} Game | ${YOUR_NAME}`;
    } else if (viewMode === 'normal') {
        const visibleSection = Object.keys(sectionRefs).find(key => {
            const ref = sectionRefs[key as keyof typeof sectionRefs];
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                return rect.top >= 0 && rect.top <= window.innerHeight / 2;
            }
            return false;
        });
        const sectionTitle = visibleSection ? `${visibleSection.charAt(0).toUpperCase() + visibleSection.slice(1)} | ` : '';
        title = `${sectionTitle}${YOUR_NAME}`;
    } else { // terminal view
        switch(activeCommand) {
            case 'init': title = `Welcome | ${YOUR_NAME}`; break;
            case 'about': title = `About Me | ${YOUR_NAME}`; break;
            case 'projects': title = `My Projects | ${YOUR_NAME}`; break;
            case 'skills': title = `My Skills | ${YOUR_NAME}`; break;
            case 'contact': title = `Contact Me | ${YOUR_NAME}`; break;
            default: title = `Terminal | ${YOUR_NAME}`; break;
        }
    }
    document.title = title;
  }, [viewMode, activeCommand, activeGame, history]); // Re-check title on history change for normal view scroll

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

    // --- Contact Form Logic ---
    if (contactFormStep !== 'idle') {
      setIsProcessing(true);
      let output: ReactNode;
      let nextStep: 'idle' | 'name' | 'email' | 'message' = contactFormStep;
      let newFormData = { ...contactFormData };
      const userInput = (contactFormStep === 'message' && !trimmedCommand) ? '<empty message>' : trimmedCommand;

      if (trimmedCommand.toLowerCase() === 'abort') {
        output = <p>Contact process aborted.</p>;
        nextStep = 'idle';
        setContactFormData({ name: '', email: '', message: '' });
      } else if (!trimmedCommand && contactFormStep !== 'message') {
        output = <p className="text-[var(--accent-red)]">Input cannot be empty. Please try again, or type 'abort' to cancel.</p>;
      } else {
        switch (contactFormStep) {
          case 'name':
            newFormData.name = trimmedCommand; nextStep = 'email';
            output = <p>Thanks, {trimmedCommand}. What is your email address?</p>;
            break;
          case 'email':
            if (!/^\S+@\S+\.\S+$/.test(trimmedCommand)) {
              output = <p className="text-[var(--accent-red)]">Please enter a valid email address, or type 'abort' to cancel.</p>;
            } else {
              newFormData.email = trimmedCommand; nextStep = 'message';
              output = <p>Got it. Finally, what is your message?</p>;
            }
            break;
          case 'message':
            newFormData.message = trimmedCommand; nextStep = 'idle';
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

      setHistory(prev => [...prev, { command: userInput, output }]);
      setContactFormStep(nextStep);
      setContactFormData(newFormData);
      if (nextStep !== 'idle' || contactFormStep === 'message') {
        setCommandLog(prev => [...prev, `contact:${contactFormStep}`]);
      }
      setIsProcessing(false);
      return;
    }
    
    // --- Default Command Logic ---
    if (!trimmedCommand) return;

    setIsProcessing(true);
    setCommandLog(prev => [...prev, trimmedCommand]);
    
    if (!fromClick) {
        setHistory(prev => [...prev, { command: trimmedCommand, output: null }]);
    }

    setTimeout(() => {
      let output: ReactNode;
      let commandHandled = true;
      const args = trimmedCommand.toLowerCase().split(' ');
      const cmd = args[0];

      switch (cmd) {
        case 'help': output = <HelpOutput />; break;
        case 'about':
        case 'projects':
        case 'skills':
        case 'contact':
            if (fromClick) {
                if (isTerminalMode) executeCommand(cmd, false); else handleNavigation(cmd);
                closeSidebar(); setIsProcessing(false); return;
            }
            switch(cmd) {
                case 'about': output = <AboutOutput />; break;
                case 'projects': output = <ProjectsOutput onRunProject={handleRunProject} isTerminalMode={true}/>; break;
                case 'skills': output = <SkillsOutput />; break;
                case 'contact':
                    setContactFormStep('name');
                    output = (<div><p>Happy to connect! Please answer the following questions.</p><p>(Type <span className="text-[var(--accent-red)] font-bold">abort</span> at any time to cancel.)</p><p className="mt-2 font-bold text-[var(--text-bright)]">What is your name?</p></div>);
                    break;
            }
            break;
        case 'clear':
          setHistory([{ command: 'init', output: <WelcomeOutput executeCommand={(cmd) => executeCommand(cmd, true)} /> }]);
          setActiveCommand('init'); setContactFormStep('idle'); setIsProcessing(false); return;
        case 'history': output = <HistoryOutput log={commandLog} />; break;
        case 'cowsay':
            const message = command.substring('cowsay'.length).trim() || 'Moo-ve along!';
            output = <CowsayOutput message={message} />; break;
        case 'ask': output = <AskOutput prompt={command.substring('ask'.length).trim()} />; break;
        case 'play':
            const gameName = args[1];
            if (gameName === 'tictactoe') {
                setView('game'); setActiveGame('tictactoe');
                output = <p>Launching Tic-Tac-Toe...</p>;
            } else {
                output = (<div><p>Which game would you like to play?</p><p>Available games: <span className="text-[var(--accent-cyan)]">tictactoe</span></p><p>Usage: play {'<game_name>'}</p></div>);
            }
            break;
        case 'run':
            const projectToRun = PROJECTS.find(p => p.slug === args[1]);
            if (projectToRun) {
                handleRunProject(projectToRun);
                output = <p>Launching project: <span className="font-bold text-[var(--accent-green-light)]">{projectToRun.name}</span>...</p>
            } else {
                output = <p className="text-[var(--accent-red)]">Error: Project '{args[1]}' not found or has no live demo.</p>
            }
            break;
        case 'theme':
            const subCmd = args[1], themeName = args[2];
            if (subCmd === 'set' && themeName && THEMES.includes(themeName)) {
                document.body.setAttribute('data-theme', themeName); localStorage.setItem('portfolio-theme', themeName);
                output = <p>Theme set to <span className="font-bold text-[var(--accent-cyan)]">{themeName}</span></p>;
            } else if (subCmd === 'list') {
                 output = <div><p>Available themes:</p><ul className="list-disc list-inside">{THEMES.map(t=><li key={t}>{t}</li>)}</ul></div>
            } else {
                output = <p className="text-[var(--accent-red)]">Usage: theme [set|list] {'<theme_name>'}</p>;
            }
            break;
        case 'view':
            if (args[1] === 'normal') { setView('normal'); output = <p>Switching to normal view...</p>; }
            else if (args[1] === 'terminal') { setView('terminal'); output = <p>Switching to terminal view...</p>; }
            else { output = <p className="text-[var(--accent-red)]">Usage: view [normal|terminal]</p>; }
            break;
        case 'ls': output = <HelpOutput />; break;
        default:
          commandHandled = false;
          output = <NotFoundOutput command={command} />; break;
      }
      
      if(fromClick) setView('terminal');
      setActiveCommand(commandHandled ? cmd : 'not-found');

      setHistory(prev => {
        const newHistory = [...prev];
        if (fromClick && cmd !== 'play') {
            return [{ command: trimmedCommand, output }];
        }
        if (newHistory.length > 0) {
            newHistory[newHistory.length - 1].output = output;
        }
        return newHistory;
      });

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
                onClose={closeSidebar}
                activeGame={activeGame}
                viewMode={viewMode}
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
