import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialTime: number, onTimeUp: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);
  
  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setIsRunning(true);
  }, [initialTime]);
  
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);
  
  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);
  
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, onTimeUp]);
  
  return {
    timeLeft,
    isRunning,
    reset,
    pause,
    resume
  };
};