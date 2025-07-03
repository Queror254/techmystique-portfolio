import React from 'react';

interface CowsayOutputProps {
    message: string;
}

const CowsayOutput: React.FC<CowsayOutputProps> = ({ message }) => {
    const bubbleWidth = message.length + 2;
    const top = ' ' + '_'.repeat(bubbleWidth) + ' ';
    const bottom = ' ' + '-'.repeat(bubbleWidth) + ' ';
    const textLine = `< ${message} >`;

    const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
    `;

    return (
        <pre className="text-[var(--text-primary)] font-mono text-sm leading-tight">
            {top}
            {'\n'}
            {textLine}
            {'\n'}
            {bottom}
            {cow}
        </pre>
    );
};

export default CowsayOutput;
