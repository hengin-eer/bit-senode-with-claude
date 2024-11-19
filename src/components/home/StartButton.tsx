import React from 'react';
import { Button } from '../shared/Button';

interface StartButtonProps {
  onClick: () => void;
  playerCount: number;
}

export const StartButton: React.FC<StartButtonProps> = ({
  onClick,
  playerCount
}) => {
  return (
    <Button
      onClick={onClick}
      className="w-full py-3 text-lg"
    >
      {playerCount}人でゲームを始める
    </Button>
  );
};
