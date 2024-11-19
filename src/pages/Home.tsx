import React, { useState } from 'react';
import { Layout } from '../components/shared/Layout';
import { PlayerSelector } from '../components/home/PlayerSelector';
import { RulesDialog } from '../components/home/RulesDialog';
import { StartButton } from '../components/home/StartButton';
import { Button } from '../components/shared/Button';
import { MIN_PLAYERS } from '../utils/constants';

interface HomeProps {
  onGameStart: (playerCount: number) => void;
}

export const Home: React.FC<HomeProps> = ({ onGameStart }) => {
  const [playerCount, setPlayerCount] = useState(MIN_PLAYERS);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-center">びっせーのーで</h1>
        
        <div className="space-y-4">
          <PlayerSelector
            value={playerCount}
            onChange={setPlayerCount}
          />
          
          <Button
            variant="secondary"
            onClick={() => setIsRulesOpen(true)}
            className="w-full"
          >
            遊び方
          </Button>
          
          <StartButton
            onClick={() => onGameStart(playerCount)}
            playerCount={playerCount}
          />
        </div>

        <RulesDialog
          isOpen={isRulesOpen}
          onClose={() => setIsRulesOpen(false)}
        />
      </div>
    </Layout>
  );
};
