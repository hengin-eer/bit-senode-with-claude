import { useState } from 'react';
// type Player が使われていなかった
import { GameState, GamePhase } from '../types/game';
import { INITIAL_FINGERS } from '../utils/constants';

export const useGameState = (playerCount: number) => {
  const [gameState, setGameState] = useState<GameState>({
    players: Array.from({ length: playerCount }, (_, i) => ({
      id: i,
      name: i === 0 ? 'Player' : `CPU ${i}`,
      isCPU: i !== 0,
      fingers: Array(INITIAL_FINGERS).fill(true),
      selectedNumber: null,
      wins: 0,
      isActive: i === 0
    })),
    currentRound: 1,
    currentTurn: 0,
    isGameOver: false,
    winner: null
  });

  const [phase, setPhase] = useState<GamePhase>(GamePhase.FINGER_SELECTION);

  return {
    gameState,
    setGameState,
    phase,
    setPhase
  };
};
