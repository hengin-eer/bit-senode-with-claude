import React from 'react';
import { MAX_PLAYERS, MIN_PLAYERS } from '../../utils/constants';

interface PlayerSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const PlayerSelector: React.FC<PlayerSelectorProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        プレイヤー人数 (CPU含む)
      </label>
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {Array.from(
          { length: MAX_PLAYERS - MIN_PLAYERS + 1 },
          (_, i) => i + MIN_PLAYERS
        ).map((num) => (
          <option key={num} value={num}>
            {num}人
          </option>
        ))}
      </select>
    </div>
  );
};
