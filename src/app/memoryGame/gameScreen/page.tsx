'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useGameContext, NumberSystem } from '../context';

type GamePhase = 'display' | 'input' | 'result';

const GameScreen: React.FC = () => {
  const router = useRouter();
  const { theme, numberSystem, score, setScore } = useGameContext();
  
  const [gamePhase, setGamePhase] = useState<GamePhase>('display');
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(3);
  const [round, setRound] = useState(1);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const convertNumber = useCallback((num: number, system: NumberSystem): string => {
    switch (system) {
      case 'binary':
        return num.toString(2);
      case 'hexadecimal':
        return num.toString(16).toUpperCase();
      case 'decimal':
      default:
        return num.toString();
    }
  }, []);



  const generateSequence = useCallback(() => {
    const length = 5 + round; // Start with 3 (round 1), increase by 1 each round
    const newSequence: number[] = [];
    
    for (let i = 0; i < length; i++) {
      let maxValue: number;
      switch (numberSystem) {
        case 'binary':
          maxValue = 1; // Single binary digits (0 or 1)
          break;
        case 'hexadecimal':
          maxValue = 15; // Single hex digits (0-F)
          break;
        case 'decimal':
        default:
          maxValue = 9; // Single decimal digits (0-9)
          break;
      }
      newSequence.push(Math.floor(Math.random() * (maxValue + 1)));
    }
    
    setSequence(newSequence);
  }, [round, numberSystem]);

  const startNewRound = useCallback(() => {
    setGamePhase('display');
    setUserInput('');
    setIsCorrect(null);
    setTimeLeft(10); // 10 seconds for display
    generateSequence();
  }, [generateSequence]);

  const checkAnswer = useCallback(() => {
    const correctAnswer = sequence.map(num => convertNumber(num, numberSystem)).join('');
    const userAnswer = userInput.trim().toUpperCase();
    const correct = userAnswer === correctAnswer.toUpperCase();
    
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + round * 10);
      setTimeout(() => {
        setRound(prev => prev + 1);
        startNewRound();
      }, 2000);
    } else {
      setTimeout(() => {
        router.push('/memoryGame/gameOver');
      }, 2000);
    }
  }, [sequence, userInput, numberSystem, convertNumber, score, setScore, round, startNewRound, router]);

  // Timer effect for display and input phases
  useEffect(() => {
    if (gamePhase === 'display' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gamePhase === 'display' && timeLeft === 0) {
      setGamePhase('input');
      setTimeLeft(10); // 10 seconds for input
    } else if (gamePhase === 'input' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gamePhase === 'input' && timeLeft === 0) {
      setGamePhase('result');
      checkAnswer();
    }
  }, [gamePhase, timeLeft, checkAnswer]);

  // Initialize first round
  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gamePhase === 'input' && userInput.trim()) {
      setGamePhase('result');
      checkAnswer();
    }
  };

  const CircularTimer = ({ time, maxTime }: { time: number; maxTime: number }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = ((maxTime - time) / maxTime) * circumference;

    return (
      <div className="relative w-24 h-24 mx-auto mb-4">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="timer-circle"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{time}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`memory-game ${getThemeClass()} min-h-screen flex items-center justify-center p-4`}>
      <div className="game-container">
        <div className="game-card rounded-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Memory Challenge</h1>
          <p className="text-white/80 mb-6">{getThemeTitle()}</p>
          
          <div className="mb-4">
            <span className="text-white/60">Round: </span>
            <span className="text-white font-bold">{round}</span>
            <span className="text-white/60 ml-4">Score: </span>
            <span className="text-white font-bold">{score}</span>
          </div>

          {gamePhase === 'display' && (
            <div>
              <CircularTimer time={timeLeft} maxTime={10} />
              <div className="number-display">
                {sequence.map(num => convertNumber(num, numberSystem)).join('')}
              </div>
              <p className="text-white/80">Memorize this sequence!</p>
            </div>
          )}

          {gamePhase === 'input' && (
            <div>
              <CircularTimer time={timeLeft} maxTime={10} />
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={`Type ${numberSystem} sequence`}
                  className="input-field w-full mb-4"
                  autoFocus
                />
                <button
                  type="submit"
                  className="theme-btn w-full py-3 px-6 rounded-lg font-bold"
                  disabled={!userInput.trim()}
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {gamePhase === 'result' && (
            <div>
              <div className={`text-4xl mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '✓' : '✗'}
              </div>
              <p className={`text-xl mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect!'}
              </p>
              <div className="text-white/80">
                <p>Correct answer: {sequence.map(num => convertNumber(num, numberSystem)).join('')}</p>
                <p>Your answer: {userInput}</p>
              </div>
              {isCorrect && (
                <p className="text-white/60 mt-4">Preparing next round...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;