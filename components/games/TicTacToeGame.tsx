import React, { useState, useEffect } from 'react';

const Square: React.FC<{ value: string | null; onClick: () => void; isWinner: boolean }> = ({ value, onClick, isWinner }) => {
    const color = value === 'X' ? 'text-[var(--accent-cyan)]' : 'text-[var(--accent-orange)]';
    const winnerBg = isWinner ? 'bg-[var(--accent-green-light)]' : '';
    const winnerText = isWinner ? 'text-[var(--bg-primary)]' : color;
    return (
        <button 
            className={`w-20 h-20 md:w-24 md:h-24 bg-[var(--bg-secondary)] rounded-md flex items-center justify-center text-5xl font-bold transition-all duration-200 hover:bg-[var(--bg-tertiary)] ${winnerBg}`}
            onClick={onClick}
        >
            <span className={`${winnerText}`}>{value}</span>
        </button>
    );
};


const TicTacToeGame: React.FC = () => {
    const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winnerInfo, setWinnerInfo] = useState<{ winner: string | null, line: number[] | null }>({ winner: null, line: null });

    const calculateWinner = (squares: (string | null)[]) => {
        const lines = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
          [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
          }
        }
        if (squares.every(square => square !== null)) {
          return { winner: 'Draw', line: null };
        }
        return { winner: null, line: null };
    };

    useEffect(() => {
        setWinnerInfo(calculateWinner(board));
    }, [board]);
    
    const handleClick = (i: number) => {
        if (winnerInfo.winner || board[i]) {
            return;
        }
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinnerInfo({ winner: null, line: null });
    };

    let status;
    if (winnerInfo.winner) {
        status = winnerInfo.winner === 'Draw' ? "It's a Draw!" : `Winner: ${winnerInfo.winner}`;
    } else {
        status = `Next player: ${isXNext ? 'X' : 'O'}`;
    }

    return (
        <div className="flex flex-col items-center gap-6 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-2xl">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[var(--text-bright)]">Tic-Tac-Toe</h2>
                <p className={`mt-2 text-xl font-semibold ${winnerInfo.winner ? 'text-[var(--accent-green)]' : 'text-[var(--text-secondary)]'}`}>
                    {status}
                </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {board.map((_, i) => (
                    <Square 
                        key={i} 
                        value={board[i]} 
                        onClick={() => handleClick(i)}
                        isWinner={winnerInfo.line?.includes(i) ?? false}
                    />
                ))}
            </div>
            {winnerInfo.winner && (
                 <button onClick={resetGame} className="px-6 py-2 bg-[var(--button-primary-bg)] text-white font-bold rounded-md hover:bg-[var(--button-primary-hover-bg)] transition-colors text-lg">
                    Play Again
                </button>
            )}
        </div>
    );
};

export default TicTacToeGame;
