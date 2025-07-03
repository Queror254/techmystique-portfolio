import React from 'react';
import { YOUR_NAME } from '../../constants';

interface WelcomeOutputProps {
    executeCommand: (command: string) => void;
}

const WelcomeOutput: React.FC<WelcomeOutputProps> = ({ executeCommand }) => (
  <div>
    <pre className="text-[var(--accent-green)] font-semibold text-sm md:text-base leading-tight">
{` ______   ______     ______     __  __     __    __     __  __     ______     ______   __     ______     __  __     ______    
/\\__  _\\ /\\  ___\\   /\\  ___\\   /\\ \\_\\ \\   /\\ "-./  \\   /\\ \\_\\ \\   /\\  ___\\   /\\__  _\\ /\\ \\   /\\  __ \\   /\\ \\/\\ \\   /\\  ___\\   
\\/_/\\ \\/ \\ \\  __\\   \\ \\ \\____  \\ \\  __ \\  \\ \\ \\-./\\ \\  \\ \\____ \\  \\ \\___  \\  \\/_/\\ \\/ \\ \\ \\  \\ \\ \\/\\_\\  \\ \\ \\_\\ \\  \\ \\  __\\   
   \\ \\_\\  \\ \\_____\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_\\ \\ \\_\\  \\/\\_____\\  \\/\\_____\\    \\ \\_\\  \\ \\_\\  \\ \\___\\_\\  \\ \\_____\\  \\ \\_____\\ 
    \\/_/   \\/_____/   \\/_____/   \\/_/\\/_/   \\/_/  \\/_/   \\/_____/   \\/_____/     \\/_/   \\/_/   \\/___/_/   \\/_____/   \\/_____/`}
    </pre>
    <p className="mt-4">Welcome to the portfolio of <span className="text-[var(--text-bright)] font-bold">{YOUR_NAME}</span>.</p>
    <p className="mt-2">This is an interactive terminal. You can navigate using the sidebar or by typing commands.</p>
    <p>Type '<button onClick={() => executeCommand('help')} className="text-[var(--accent-cyan)] hover:underline focus:outline-none">help</button>' to see a list of available commands.</p>
  </div>
);

export default WelcomeOutput;