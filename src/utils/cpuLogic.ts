export const getCPUMove = (availableFingers: number): {
  fingers: boolean[],
  selectedNumber: number
} => {
  const maxNumber = Math.pow(2, availableFingers) - 1;
  const fingerStates = Array(availableFingers).fill(false)
    .map(() => Math.random() > 0.5);
  
  return {
    fingers: fingerStates,
    selectedNumber: Math.floor(Math.random() * (maxNumber + 1))
  };
};
