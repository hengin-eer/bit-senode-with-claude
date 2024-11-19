import React from 'react';
import { Dialog } from '../shared/Dialog';
import { Button } from '../shared/Button';
import { Player } from '../../types/game';

interface ResultPopupProps {
  winner: Player | null;
  totalFingers: number;
  onNext: () => void;
}

export const ResultPopup: React.FC<ResultPopupProps> = ({
  winner,
  totalFingers,
  onNext
}) => {
  return (
    <Dialog
      isOpen={true}
      onClose={() => {}}
      title="ラウンド結果"
    >
      <div className="space-y-4">
        <p className="text-lg text-center">
          指の合計本数: {totalFingers}
        </p>
        {winner ? (
          <p className="font-medium text-center text-blue-600">
            {winner.name}が当てました！
          </p>
        ) : (
          <p className="text-center text-gray-600">
            誰も正解できませんでした
          </p>
        )}
        <div className="flex justify-center">
          <Button onClick={onNext}>
            次のラウンドへ
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
