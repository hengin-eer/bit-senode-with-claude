import React from 'react';
import { motion } from 'framer-motion';

interface FingerButtonProps {
  isUp: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const FingerButton: React.FC<FingerButtonProps> = ({
  isUp,
  onClick,
  disabled = false
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`
        w-16 h-16 
        rounded-full 
        flex items-center justify-center 
        text-2xl
        transition-colors 
        ${isUp 
          ? 'bg-blue-500 hover:bg-blue-600' 
          : 'bg-gray-300 hover:bg-gray-400'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {isUp ? '👍' : '👎'}
    </motion.button>
  );
};
