'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGameContext } from '../context';

const GameOverPage: React.FC = () => {
  const router = useRouter();
  const { theme, numberSystem, score, setScore } = useGameContext();

  const handlePlayAgain = () => {
    setScore(0);
    router.push('/memoryGame/gameScreen');
  };

  const handleBackToHome = () => {
    setScore(0);
    router.push('/memoryGame/home');
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

  const getThemeTitle = () => {
    switch (theme) {
      case 'space':
        return 'Space Adventure | Decimal';
      case 'cyberpunk':
        return 'CyberPunk | Hexadecimal';
      case 'retro':
        return 'Retro | Binary';
      default:
        return `${theme} | ${numberSystem}`;
    }
  };

  const getScoreMessage = () => {
    if (score >= 100) return "Incredible! You're a memory master!";
    if (score >= 50) return "Great job! Excellent memory skills!";
    if (score >= 20) return "Good work! Keep practicing!";
    return "Nice try! Practice makes perfect!";
  };

  return (
    <div className={`memory-game ${getThemeClass()} min-h-screen flex items-center justify-center p-4`}>
      <div className="game-container">
        <div className="game-card rounded-xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Memory Challenge</h1>
          <p className="text-white/80 mb-8">{getThemeTitle()}</p>
          
          <div className="mb-8">
            <h2 className="text-6xl font-bold text-white mb-4">Game Over</h2>
            <div className="mb-6">
              <p className="text-3xl font-bold text-white mb-2">Score: {score}</p>
              <p className="text-white/80 text-lg">{getScoreMessage()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handlePlayAgain}
              className="theme-btn w-full py-4 px-8 rounded-lg text-xl font-bold transition-all duration-200 hover:scale-105"
            >
              Play Again
            </button>
            
            <button
              onClick={handleBackToHome}
              className="theme-btn w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 opacity-80 hover:opacity-100"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverPage;