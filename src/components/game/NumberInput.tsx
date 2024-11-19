import React from 'react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  maxValue: number;
  disabled?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  maxValue,
  disabled = false
}) => {
  return (
    <input
      type="number"
      min={0}
      max={maxValue}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      className="w-20 p-2 text-center border rounded-lg"
      disabled={disabled}
    />
  );
};
