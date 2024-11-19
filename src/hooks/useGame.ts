import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Player, GamePhase, GameState } from '../types/game';
import { calculateMaxNumber, determineWinner } from '../utils/gameLogic';
import { getCPUMove } from '../utils/cpuLogic';
import { WINS_TO_ELIMINATE } from '../utils/constants';

const TURN_DURATION = 5000; // 5秒

export const useGame = (
  gameState: GameState,
  setGameState: Dispatch<SetStateAction<GameState>>,
  phase: GamePhase,
  setPhase: Dispatch<SetStateAction<GamePhase>>
) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState(TURN_DURATION);

  // 次のプレイヤーに移動する関数
  const moveToNextPlayer = useCallback(() => {
    const nextTurn = (gameState.currentTurn + 1) % gameState.players.length;
    
    setGameState(prev => ({
      ...prev,
      currentTurn: nextTurn,
      players: prev.players.map(p => ({
        ...p,
        isActive: p.id === nextTurn
      }))
    }));
  }, [gameState, setGameState]);

  // CPUの行動を処理する関数
  const handleCPUTurn = useCallback(() => {
    const currentPlayer = gameState.players[gameState.currentTurn];
    if (!currentPlayer.isCPU) return;

    const cpuMove = getCPUMove(currentPlayer.fingers.filter(f => f).length);
    
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(p => 
        p.id === currentPlayer.id
          ? {
              ...p,
              fingers: cpuMove.fingers,
              selectedNumber: cpuMove.selectedNumber
            }
          : p
      )
    }));

    // すべてのプレイヤーが選択を完了したか確認
    const updatedPlayers = gameState.players.map(p => 
      p.id === currentPlayer.id
        ? { ...p, fingers: cpuMove.fingers, selectedNumber: cpuMove.selectedNumber }
        : p
    );

    const allPlayersSelected = updatedPlayers.every(p => p.selectedNumber !== null);
    
    if (allPlayersSelected) {
      // 結果判定
      const result = determineWinner(updatedPlayers);
      
      if (result.winner) {
        const finalPlayers = updatedPlayers.map((p: Player) =>
          p.id === result.winner?.id
            ? {
                ...p,
                wins: p.wins + 1,
                fingers: p.fingers.map((_, i) => 
                  i === p.fingers.lastIndexOf(true) ? false : p.fingers[i]
                )
              }
            : p
        );

        setGameState(prev => ({
          ...prev,
          players: finalPlayers,
          winner: result.winner?.id || null
        }));
      }

      setPhase(GamePhase.RESULT);
    } else {
      moveToNextPlayer();
    }
  }, [gameState, setGameState, setPhase, moveToNextPlayer]);

  // タイマー終了時の処理
  const handleTimerEnd = useCallback(() => {
    const currentPlayer = gameState.players[gameState.currentTurn];
    
    // CPUの場合は自動で手を決定
    if (currentPlayer.isCPU && phase === GamePhase.FINGER_SELECTION) {
      handleCPUTurn();
    }

    // 次のプレイヤーに進む
    const nextTurn = (gameState.currentTurn + 1) % gameState.players.length;
    
    // 全プレイヤーが指を選択し終わった場合
    if (nextTurn === 0 && phase === GamePhase.FINGER_SELECTION) {
      // 結果判定フェーズへ
      const result = determineWinner(gameState.players);
      
      if (result.winner) {
        const updatedPlayersAfterWin = gameState.players.map((p: Player) =>
          p.id === result.winner?.id
            ? {
                ...p,
                wins: p.wins + 1,
                fingers: p.fingers.map((_, i) => 
                  i === p.fingers.lastIndexOf(true) ? false : p.fingers[i]
                )
              }
            : p
        );

        setGameState(prev => ({
          ...prev,
          players: updatedPlayersAfterWin,
          winner: result.winner?.id || null
        }));
      }
      
      setPhase(GamePhase.RESULT);
      return;
    }

    moveToNextPlayer();
    startTimer();
  }, [gameState, phase, setGameState, setPhase, handleCPUTurn, moveToNextPlayer]);

  // タイマーの開始
  const startTimer = useCallback(() => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(handleTimerEnd, TURN_DURATION);
    setTimer(newTimer);
  }, [handleTimerEnd, timer]);

  // タイマーの更新処理
  useEffect(() => {
    if (phase !== GamePhase.FINGER_SELECTION) {
      setRemainingTime(TURN_DURATION);
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        const newTime = Math.max(0, prev - 100);
        return newTime;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [phase, gameState.currentTurn]);

  // コンポーネントのマウント時とフェーズ変更時にタイマーを開始
  useEffect(() => {
    if (phase === GamePhase.FINGER_SELECTION) {
      startTimer();
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phase, startTimer, timer]);

  // CPU自動プレイの処理
  useEffect(() => {
    const currentPlayer = gameState.players[gameState.currentTurn];
    if (currentPlayer?.isCPU && phase === GamePhase.FINGER_SELECTION) {
      handleCPUTurn();
    }
  }, [gameState.currentTurn, gameState.players, phase, handleCPUTurn]);

  const toggleFinger = useCallback((playerId: number, fingerIndex: number) => {
    if (gameState.players[playerId].isCPU) return;
    
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(player => 
        player.id === playerId
          ? {
              ...player,
              fingers: player.fingers.map((f: boolean, i: number) => 
                i === fingerIndex ? !f : f
              )
            }
          : player
      )
    }));
  }, [gameState, setGameState]);

  const submitNumber = useCallback((playerId: number, number: number) => {
    const player = gameState.players[playerId];
    const maxNumber = calculateMaxNumber(player.fingers);
    
    if (number > maxNumber) {
      alert(`数字は${maxNumber}以下を選択してください`);
      return;
    }

    const updatedPlayers = gameState.players.map((p: Player) =>
      p.id === playerId ? { ...p, selectedNumber: number } : p
    );

    const allPlayersSelected = updatedPlayers.every(p => 
      p.isCPU || p.selectedNumber !== null
    );

    if (allPlayersSelected) {
      const result = determineWinner(updatedPlayers);
      
      if (result.winner) {
        const finalPlayers = updatedPlayers.map((p: Player) =>
          p.id === result.winner?.id
            ? {
                ...p,
                wins: p.wins + 1,
                fingers: p.fingers.map((_, i) => 
                  i === p.fingers.lastIndexOf(true) ? false : p.fingers[i]
                )
              }
            : p
        );

        setGameState(prev => ({
          ...prev,
          players: finalPlayers,
          winner: result.winner?.id || null
        }));
      }

      setPhase(GamePhase.RESULT);
    } else {
      setGameState(prev => ({
        ...prev,
        players: updatedPlayers
      }));
      moveToNextPlayer();
    }
  }, [gameState, setGameState, setPhase, moveToNextPlayer]);

  const nextRound = useCallback(() => {
    const eliminatedPlayers = gameState.players.filter((p: Player) => 
      p.wins >= WINS_TO_ELIMINATE
    );

    if (eliminatedPlayers.length === gameState.players.length - 1) {
      const winner = gameState.players.find((p: Player) => 
        p.wins < WINS_TO_ELIMINATE
      );
      
      setGameState(prev => ({
        ...prev,
        isGameOver: true,
        winner: winner?.id || null
      }));
      
      setPhase(GamePhase.GAME_OVER);
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      currentTurn: 1, // CPUから開始
      players: prev.players.map((p, i) => ({
        ...p,
        selectedNumber: null,
        isActive: i === 1 // CPU(id: 1)をアクティブに
      }))
    }));
    
    setPhase(GamePhase.FINGER_SELECTION);
  }, [gameState, setGameState, setPhase]);

  return {
    toggleFinger,
    submitNumber,
    nextRound,
    remainingTime,
    totalTime: TURN_DURATION
  };
};
