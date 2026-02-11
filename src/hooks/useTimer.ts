import { useState, useRef, useCallback, useEffect } from 'react';
import { TIMER } from '@/constants';

interface UseTimerReturn {
  elapsed: number;
  remaining: number;
  pct: number;
  formatted: string;
  paused: boolean;
  running: boolean;
  start: () => void;
  togglePause: () => void;
  resume: () => void;
  sectionStatus: { text: string; color: string };
}

export function useTimer(currentSection: number): UseTimerReturn {
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [running, setRunning] = useState(false);

  const startRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedAtRef = useRef<number>(0);

  const update = useCallback(() => {
    const el = Date.now() - startRef.current;
    setElapsed(el);
  }, []);

  const start = useCallback(() => {
    if (running) return;
    setRunning(true);
    startRef.current = Date.now();
    intervalRef.current = setInterval(update, 1000);
    update();
  }, [running, update]);

  const togglePause = useCallback(() => {
    if (!running) return;
    if (!paused) {
      setPaused(true);
      pausedAtRef.current = Date.now();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      const pauseDuration = Date.now() - pausedAtRef.current;
      startRef.current += pauseDuration;
      setPaused(false);
      intervalRef.current = setInterval(update, 1000);
      update();
    }
  }, [running, paused, update]);

  const resume = useCallback(() => {
    if (!paused) return;
    const pauseDuration = Date.now() - pausedAtRef.current;
    startRef.current += pauseDuration;
    setPaused(false);
    intervalRef.current = setInterval(update, 1000);
    update();
  }, [paused, update]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const remaining = Math.max(0, TIMER.TOTAL_MS - elapsed);
  const pct = Math.min(100, (elapsed / TIMER.TOTAL_MS) * 100);
  const m = Math.floor(remaining / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  // Section timing
  const ideal = currentSection * TIMER.PER_SECTION_MS;
  const diff = elapsed - ideal;
  const abs = Math.abs(Math.round(diff / 1000));
  const mm = Math.floor(abs / 60);
  const ss = abs % 60;
  const str = mm > 0 ? `${mm}m${String(ss).padStart(2, '0')}` : `${abs}s`;

  let sectionStatus: { text: string; color: string };
  if (!running) {
    sectionStatus = { text: '~4:30 / section', color: 'var(--dim)' };
  } else if (diff > 30000) {
    sectionStatus = { text: `▸ +${str}`, color: 'var(--txt)' };
  } else if (diff < -30000) {
    sectionStatus = { text: `▸ −${str}`, color: 'var(--accent)' };
  } else {
    sectionStatus = { text: '▸ on track', color: 'var(--accent)' };
  }

  return { elapsed, remaining, pct, formatted, paused, running, start, togglePause, resume, sectionStatus };
}
