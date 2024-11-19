import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Game } from './pages/Game';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);

  const handleGameStart = (count: number) => {
    setPlayerCount(count);
    setGameStarted(true);
  };

  const handleReturnHome = () => {
    setGameStarted(false);
    setPlayerCount(0);
  };

  return gameStarted ? (
    <Game
      playerCount={playerCount}
      onReturnHome={handleReturnHome}
    />
  ) : (
    <Home onGameStart={handleGameStart} />
  );
};

export default App;
