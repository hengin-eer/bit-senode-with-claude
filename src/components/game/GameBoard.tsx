import React from 'react';
import { GamePhase, GameState } from '../../types/game';
import { PlayerBoard } from './PlayerBoard';
import { ResultPopup } from './ResultPopup';
import { Timer } from './Timer';

interface GameBoardProps {
  gameState: GameState;
  phase: GamePhase;
  remainingTime: number;
  totalTime: number;
  onFingerToggle: (playerId: number, fingerIndex: number) => void;
  onNumberSubmit: (playerId: number, number: number) => void;
  onNextRound: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  phase,
  remainingTime,
  totalTime,
  onFingerToggle,
  onNumberSubmit,
  onNextRound
}) => {
  const currentPlayer = gameState.players[gameState.currentTurn];
  
  return (
    <div className="space-y-6">
      {phase === GamePhase.FINGER_SELECTION && (
        <div className="space-y-2">
          <p className="text-lg font-medium text-center">
            {currentPlayer.name}のターン
          </p>
          <Timer
            remainingTime={remainingTime}
            totalTime={totalTime}
          />
        </div>
      )}

      {gameState.players.map((player) => (
        <PlayerBoard
          key={player.id}
          player={player}
          phase={phase}
          onFingerToggle={(index) => onFingerToggle(player.id, index)}
          onNumberSubmit={(number) => onNumberSubmit(player.id, number)}
        />
      ))}

      {phase === GamePhase.RESULT && (
        <ResultPopup
          winner={gameState.players.find(p => p.id === gameState.winner) || null}
          totalFingers={gameState.players.reduce(
            (sum, p) => sum + p.fingers.filter(f => f).length,
            0
          )}
          onNext={onNextRound}
        />
      )}
    </div>
  );
};
