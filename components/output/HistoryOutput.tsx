import React from 'react';

interface HistoryOutputProps {
    log: string[];
}

const HistoryOutput: React.FC<HistoryOutputProps> = ({ log }) => (
    <div className="space-y-1">
        {log.map((cmd, index) => (
            <div key={index} className="flex">
                <span className="w-8 text-right pr-4 text-[var(--text-secondary)]">{index + 1}</span>
                <span className="text-[var(--text-primary)]">{cmd}</span>
            </div>
        ))}
    </div>
);

export default HistoryOutput;
