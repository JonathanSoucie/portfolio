'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGameContext, Theme, NumberSystem } from '../context';

const HomePage: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme, numberSystem, setNumberSystem } = useGameContext();

  const themes: { id: Theme; name: string; subtitle: string }[] = [
    { id: 'space', name: 'Space Adventure', subtitle: 'Explore the cosmos' },
    { id: 'cyberpunk', name: 'Cyberpunk', subtitle: 'Digital frontier' },
    { id: 'retro', name: 'Retro', subtitle: 'Classic vibes' },
  ];

  const numberSystems: { id: NumberSystem; name: string }[] = [
    { id: 'decimal', name: 'Decimal' },
    { id: 'hexadecimal', name: 'Hexadecimal' },
    { id: 'binary', name: 'Binary' },
  ];

  const handleStartGame = () => {
    router.push('/memoryGame/gameScreen');
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'space':
        return 'theme-space';
      case 'cyberpunk':
        return 'theme-cyberpunk';
      case 'retro':
        return 'theme-retro';
      default:
        return 'theme-space';
    }
  };

  return (
    <div className={`memory-game ${getThemeClass()} min-h-screen flex items-center justify-center p-4`}>
      <div className="game-container">
        <div className="game-card rounded-xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Memory Challenge</h1>
          <p className="text-white/80 mb-8">
            {themes.find(t => t.id === theme)?.subtitle || 'Test your memory'}
          </p>

          {/* Theme Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Select Theme</h2>
            <div className="flex gap-2 justify-center flex-wrap">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`theme-btn px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    theme === t.id ? 'active' : ''
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Number System Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Select Number System</h2>
            <div className="flex gap-2 justify-center flex-wrap">
              {numberSystems.map((system) => (
                <button
                  key={system.id}
                  onClick={() => setNumberSystem(system.id)}
                  className={`theme-btn px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    numberSystem === system.id ? 'active' : ''
                  }`}
                >
                  {system.name}
                </button>
              ))}
            </div>
          </div>

          {/* Start Game Button */}
          <button
            onClick={handleStartGame}
            className="theme-btn w-full py-4 px-8 rounded-lg text-xl font-bold transition-all duration-200 hover:scale-105"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;