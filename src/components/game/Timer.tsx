import React from 'react';

interface TimerProps {
  remainingTime: number;
  totalTime: number;
}

export const Timer: React.FC<TimerProps> = ({ remainingTime, totalTime }) => {
  const percentage = (remainingTime / totalTime) * 100;
  const seconds = Math.ceil(remainingTime / 1000);
  
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">
          残り時間: {seconds}秒
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full transition-all duration-200"
          style={{
            width: `${percentage}%`,
            backgroundColor: percentage > 60 
              ? '#22c55e' 
              : percentage > 30 
                ? '#eab308'
                : '#ef4444'
          }}
        />
      </div>
    </div>
  );
};
