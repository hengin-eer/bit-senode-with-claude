import React, { useState } from "react";
import { Player, GamePhase } from "../../types/game";
import { FingerButton } from "./FingerButton";
import { NumberInput } from "./NumberInput";
import { Button } from "../shared/Button";
import { calculateMaxNumber } from "../../utils/gameLogic";

interface PlayerBoardProps {
  player: Player;
  phase: GamePhase;
  onFingerToggle: (index: number) => void;
  onNumberSubmit: (number: number) => void;
}

export const PlayerBoard: React.FC<PlayerBoardProps> = ({
  player,
  phase,
  onFingerToggle,
  onNumberSubmit,
}) => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const maxNumber = calculateMaxNumber(player.fingers);

  return (
    <div
      className={`p-4 rounded-lg border ${
        player.isActive ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{player.name}</h3>
        <span className="text-sm text-gray-500">勝利数: {player.wins}</span>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {player.fingers.map((isUp, index) => (
          <FingerButton
            key={index}
            isUp={isUp}
            onClick={() => onFingerToggle(index)}
            disabled={
              !player.isActive ||
              phase !== GamePhase.FINGER_SELECTION ||
              player.isCPU
            }
          />
        ))}
      </div>

      {phase === GamePhase.NUMBER_INPUT && player.isActive && (
        <div className="flex flex-col items-center gap-4">
          <NumberInput
            value={selectedNumber}
            onChange={setSelectedNumber}
            maxValue={maxNumber}
            disabled={player.isCPU}
          />
          <Button
            onClick={() => onNumberSubmit(selectedNumber)}
            disabled={player.isCPU}
          >
            決定
          </Button>
        </div>
      )}
    </div>
  );
};
