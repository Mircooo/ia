import { useEffect, useRef, useState, useCallback } from 'react';
import { BOOT_LINES } from '@/data';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [lines, setLines] = useState<typeof BOOT_LINES>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let idx = 0;
    const tick = () => {
      if (idx >= BOOT_LINES.length) {
        setReady(true);
        return;
      }
      const line = BOOT_LINES[idx];
      if (line) {
        setLines(prev => [...prev, line]);
        setProgress((idx + 1) / BOOT_LINES.length * 100);
      }
      idx++;
      const nextDelay = BOOT_LINES[idx]?.delay ?? 100;
      setTimeout(tick, nextDelay);
    };
    setTimeout(tick, 250);
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  const launch = useCallback(() => {
    if (!ready) return;
    setHidden(true);
    setTimeout(onComplete, 450);
  }, [ready, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent | MouseEvent) => {
      if (ready) {
        e.preventDefault();
        launch();
      }
    };
    window.addEventListener('keydown', handler);
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('click', handler);
    };
  }, [ready, launch]);

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black/95 grid place-items-center transition-opacity duration-500 cursor-pointer ${hidden ? 'opacity-0 pointer-events-none' : ''}`}
    >
      <div className="w-[min(520px,90vw)] rounded-lg border border-[var(--border)] bg-[var(--surface)] backdrop-blur-[30px] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2 font-bold text-sm">
            Classe <span className="px-1.5 py-px rounded bg-accent text-black font-extrabold text-xs">2</span>
          </div>
          <span className="font-mono text-[9px] text-white/35 tracking-widest uppercase">
            {lines.length}/{BOOT_LINES.length}
          </span>
        </div>

        <div ref={logRef} className="font-mono text-xs leading-[1.8] text-white/35 max-h-[200px] overflow-hidden mb-3">
          {lines.map((l, i) => (
            <div key={i} className={l.cls === 'ok' ? 'text-green-400' : l.cls === 'warn' ? 'text-amber-400' : l.cls === 'bright' ? 'text-white/90' : ''}>
              {l.text || '\u00a0'}
            </div>
          ))}
        </div>

        <div className="h-[3px] rounded bg-white/5 overflow-hidden">
          <div className="h-full rounded bg-accent transition-[width] duration-50" style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-3 font-mono text-[12px] tracking-[0.14em] uppercase text-center" style={{ color: 'rgba(212,255,0,0.4)', animation: 'pulse 1.5s ease infinite' }}>
          {ready ? '[ cliquer pour lancer ]' : 'initialisation…'}
        </div>
      </div>
    </div>
  );
}
