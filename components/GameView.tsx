
import React from 'react';
import TicTacToeGame from './games/TicTacToeGame';

interface GameViewProps {
    activeGame: string | null;
    onExit: () => void;
}

const GameView: React.FC<GameViewProps> = ({ activeGame, onExit }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
            <button
                onClick={onExit}
                className="absolute top-4 right-4 px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] font-bold rounded-md hover:bg-[var(--accent-red)] hover:text-white transition-colors duration-200 z-10"
                title="Exit Game"
                aria-label="Exit Game"
            >
                Exit Game
            </button>

            {activeGame === 'tictactoe' && <TicTacToeGame />}
            {!activeGame && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[var(--text-bright)]">No Game Selected</h2>
                    <p className="text-[var(--text-secondary)] mt-2">
                        Choose a game from the sidebar or use the `play` command in the terminal.
                    </p>
                </div>
            )}
        </div>
    );
};

export default GameView;
