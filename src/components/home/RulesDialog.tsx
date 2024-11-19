import React from 'react';
import { Dialog } from '../shared/Dialog';
import { Button } from '../shared/Button';

interface RulesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesDialog: React.FC<RulesDialogProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="遊び方"
    >
      <div className="space-y-4">
        <section>
          <h3 className="mb-2 font-medium">基本ルール</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>各プレイヤーは2本の指を持っています</li>
            <li>プレイヤーは指を上げ下げし、合計本数を予想します</li>
            <li>正解したプレイヤーは指を1本失います</li>
            <li>先に指を2本なくしたプレイヤーが勝利です</li>
          </ul>
        </section>
        
        <section>
          <h3 className="mb-2 font-medium">ゲームの流れ</h3>
          <ol className="space-y-2 list-decimal list-inside">
            <li>指の上げ下げを決めます</li>
            <li>予想する数字を入力します</li>
            <li>全員の指の合計本数を当てた人が指を1本失います</li>
            <li>これを繰り返し、先に指を2本なくした人が勝利です</li>
          </ol>
        </section>
        
        <Button onClick={onClose} variant="primary" className="w-full">
          閉じる
        </Button>
      </div>
    </Dialog>
  );
};
