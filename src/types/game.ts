export type Player = {
  id: number;
  name: string;
  isCPU: boolean;
  fingers: boolean[];  // true: 上げている, false: 下げている
  selectedNumber: number | null;
  wins: number;
  isActive: boolean;
};

export type GameState = {
  players: Player[];
  currentRound: number;
  currentTurn: number;
  isGameOver: boolean;
  winner: number | null;
};

export enum GamePhase {
  SETUP = 'SETUP',
  FINGER_SELECTION = 'FINGER_SELECTION',
  NUMBER_INPUT = 'NUMBER_INPUT',
  RESULT = 'RESULT',
  GAME_OVER = 'GAME_OVER'
}

export type GameResult = {
  winner: Player | null;
  correctNumber: number;
  players: Player[];
};
