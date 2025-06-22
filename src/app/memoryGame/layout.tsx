'use client';
import "../globals.css"; // or wherever your global styles are

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'space' | 'cyberpunk' | 'retro';
export type NumberSystem = 'decimal' | 'hexadecimal' | 'binary';

interface GameContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  numberSystem: NumberSystem;
  setNumberSystem: (system: NumberSystem) => void;
  score: number;
  setScore: (score: number) => void;
  gameSettings: {
    sequenceLength: number;
    displayTime: number;
    inputTime: number;
  };
  setGameSettings: (settings: {
    sequenceLength: number;
    displayTime: number;
    inputTime: number;
  }) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('space');
  const [numberSystem, setNumberSystem] = useState<NumberSystem>('decimal');
  const [score, setScore] = useState(0);
  const [gameSettings, setGameSettings] = useState({
    sequenceLength: 5,
    displayTime: 3000,
    inputTime: 10000,
  });

  return (
    <GameContext.Provider
      value={{
        theme,
        setTheme,
        numberSystem,
        setNumberSystem,
        score,
        setScore,
        gameSettings,
        setGameSettings,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

interface LayoutProps {
  children: ReactNode;
}

export default function MemoryGameLayout({ children }: LayoutProps) {
  return (
    <html lang = "en">
        <body className= "memory-game">
         <GameProvider>
             <div className="memory-game min-h-screen">
             {children}
             </div>
         </GameProvider>
     </body>
    </html>
  );
}