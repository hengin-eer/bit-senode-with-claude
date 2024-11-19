import { Player, GameResult } from '../types/game';

export const calculateMaxNumber = (fingers: boolean[]): number => {
  const upCount = fingers.filter(f => f).length;
  return Math.pow(2, upCount) - 1;
};

export const countUpFingers = (players: Player[]): number => {
  return players.reduce((total, player) => 
    total + player.fingers.filter(f => f).length, 0);
};

export const determineWinner = (players: Player[]): GameResult => {
  const totalUpFingers = countUpFingers(players);
  const correctPlayers = players.filter(p => p.selectedNumber === totalUpFingers);
  
  if (correctPlayers.length === 1) {
    return {
      winner: correctPlayers[0],
      correctNumber: totalUpFingers,
      players: players
    };
  }
  
  return {
    winner: null,
    correctNumber: totalUpFingers,
    players: players
  };
};
