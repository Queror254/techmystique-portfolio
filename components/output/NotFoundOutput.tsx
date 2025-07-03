import React from 'react';

interface NotFoundOutputProps {
    command: string;
}

const NotFoundOutput: React.FC<NotFoundOutputProps> = ({ command }) => (
  <div>
    <p className="text-[var(--accent-red)]">
      bash: command not found: {command}
    </p>
    <p>
      Type '<span className="text-[var(--accent-cyan)]">help</span>' to see the list of available commands.
    </p>
  </div>
);

export default NotFoundOutput;