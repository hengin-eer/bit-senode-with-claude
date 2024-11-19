import React from 'react';
import { Layout } from '../components/shared/Layout';
import { GameBoard } from '../components/game/GameBoard';
import { useGameState } from '../hooks/useGameState';
import { useGame } from '../hooks/useGame';
import { Button } from '../components/shared/Button';

interface GameProps {
  playerCount: number;
  onReturnHome: () => void;
}

export const Game: React.FC<GameProps> = ({
  playerCount,
  onReturnHome
}) => {
  const {
    gameState,
    setGameState,
    phase,
    setPhase
  } = useGameState(playerCount);

  const {
    toggleFinger,
    submitNumber,
    nextRound,
    remainingTime,
    totalTime
  } = useGame(gameState, setGameState, phase,setPhase);

  if (gameState.isGameOver) {
    const loser = gameState.players.find(p => p.id === gameState.winner);
    return (
      <Layout>
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-bold">ゲーム終了！</h2>
          <p className="text-xl">
            {loser?.name}の負けです！
          </p>
          <div className="space-x-4">
            <Button onClick={onReturnHome}>
              ホームに戻る
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">ラウンド {gameState.currentRound}</h2>
          <Button
            variant="secondary"
            onClick={onReturnHome}
            className="text-sm"
          >
            ホームに戻る
          </Button>
        </div>

        <GameBoard
          gameState={gameState}
          phase={phase}
          onFingerToggle={toggleFinger}
          onNumberSubmit={submitNumber}
          onNextRound={nextRound}
          remainingTime={remainingTime}
          totalTime={totalTime}
        />
      </div>
    </Layout>
  );
};
