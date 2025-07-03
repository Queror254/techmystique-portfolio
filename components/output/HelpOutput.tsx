
import React from 'react';

const commands = [
  { cmd: 'about', desc: 'Display my professional summary.' },
  { cmd: 'ask <question>', desc: 'Ask the AI anything (e.g., `ask What is React?`).' },
  { cmd: 'clear', desc: 'Clear the terminal history.' },
  { cmd: 'contact', desc: 'Show contact form and information.' },
  { cmd: 'cowsay <msg>', desc: 'An ASCII cow will say your message.' },
  { cmd: 'help', desc: 'Display this list of commands.' },
  { cmd: 'history', desc: 'Show command history.' },
  { cmd: 'play <game>', desc: 'Launch a graphical game. Try `play tictactoe`.' },
  { cmd: 'projects', desc: 'Showcase my recent projects.' },
  { cmd: 'run <slug>', desc: 'Launch a live project demo (e.g., `run project-nebula`).' },
  { cmd: 'skills', desc: 'List my technical skills.' },
  { cmd: 'theme <cmd>', desc: 'Change theme. Use `theme list` or `theme set <name>`.' },
  { cmd: 'view <cmd>', desc: 'Change view. Use `view normal` or `view terminal`.'}
];

const HelpOutput: React.FC = () => (
  <div>
    <p className="font-bold text-[var(--text-bright)]">Available Commands:</p>
    <ul className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1">
      {commands.sort((a, b) => a.cmd.localeCompare(b.cmd)).map(({ cmd, desc }) => (
        <li key={cmd}>
          <span className="text-[var(--accent-cyan)] mr-2">{cmd}</span>
          <span className="text-[var(--text-primary)]">{desc}</span>
        </li>
      ))}
    </ul>
    <p className="mt-4">Tip: You can also click on the files in the sidebar to navigate.</p>
  </div>
);

export default HelpOutput;
