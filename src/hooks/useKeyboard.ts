import { useEffect } from 'react';

interface UseKeyboardProps {
  enabled: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPause: () => void;
}

export function useKeyboard({ enabled, onNext, onPrev, onPause }: UseKeyboardProps): void {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        onNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        onPrev();
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        onPause();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled, onNext, onPrev, onPause]);
}
