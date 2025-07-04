import React from "react";
import { YOUR_NAME } from "../constants";
import ViewModeToggle from "./ViewModeToggle";
import ThemeSwitcher from "./ThemeSwitcher";

type ViewMode = "terminal" | "normal" | "game";

interface TopBarProps {
  activeCommand: string;
  isTerminalMode: boolean;
  onToggle: () => void;
  onToggleSidebar: () => void;
  activeGame: string | null;
  viewMode: ViewMode;
}

const getTitle = (
  viewMode: ViewMode,
  activeCommand: string,
  activeGame: string | null
) => {
  if (viewMode === "game") {
    const gameTitle = activeGame === "tictactoe" ? "Tic-Tac-Toe" : "Game";
    return `${gameTitle} - Games - ${YOUR_NAME}`;
  }

  let fileName = "terminal";
  switch (activeCommand) {
    case "init":
      fileName = "welcome.sh";
      break;
    case "about":
      fileName = "about.md";
      break;
    case "projects":
      fileName = "projects.json";
      break;
    case "skills":
      fileName = "skills.ts";
      break;
    case "contact":
      fileName = "contact.html";
      break;
    case "help":
      fileName = "help.txt";
      break;
    case "history":
      fileName = "history.log";
      break;
    case "cowsay":
      fileName = "cow.txt";
      break;
    case "run":
      fileName = "runner.js";
      break;
    case "theme":
      fileName = "settings.json";
      break;
    case "view":
      fileName = "settings.json";
      break;
    case "ls":
      fileName = "help.txt";
      break;
    case "ask":
      fileName = "ask.ai";
      break;
    case "play":
      fileName = "launcher.sh";
      break;
  }
  return `${fileName} — ${YOUR_NAME} — Portfolio`;
};

const TopBar: React.FC<TopBarProps> = ({
  activeCommand,
  isTerminalMode,
  onToggle,
  onToggleSidebar,
  activeGame,
  viewMode,
}) => {
  const title = getTitle(viewMode, activeCommand, activeGame);

  return (
    <header className="bg-[var(--bg-secondary)] text-[var(--text-primary)] flex items-center justify-between h-14 border-b border-[var(--border-primary)] px-2 md:px-4 flex-shrink-0 z-20">
      {/* Left side: Hamburger and Window controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="p-1 rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-bright)] transition-colors md:hidden"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--accent-red)]"></div>
          <div className="w-3 h-3 rounded-full bg-[var(--accent-yellow)]"></div>
          <div className="w-3 h-3 rounded-full bg-[var(--accent-green)]"></div>
        </div>
      </div>

      {/* Center: Title */}
      <div className="text-sm text-[var(--text-secondary)] hidden md:block text-center truncate px-4">
        {title}
      </div>

      {/* Right side: View and Theme controls */}
      <div className="flex items-center gap-2">
        {viewMode === "normal" && <ThemeSwitcher />}
        <ViewModeToggle isTerminalMode={isTerminalMode} onToggle={onToggle} />
      </div>
    </header>
  );
};

export default TopBar;
