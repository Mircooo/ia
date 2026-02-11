import { Pause, Play } from 'lucide-react';

interface TimerBarProps {
  formatted: string;
  pct: number;
  paused: boolean;
  sectionStatus: { text: string; color: string };
  onTogglePause: () => void;
  total: number;
}

function getTimerColor(pct: number): { color: string; shadow: string } {
  if (pct < 50) return { color: 'var(--accent)', shadow: '0 0 8px var(--accent-md)' };
  if (pct < 80) return { color: 'var(--amber)', shadow: '0 0 8px rgba(255,183,0,0.2)' };
  return { color: 'var(--txt)', shadow: '0 0 8px rgba(255,255,255,0.15)' };
}

export default function TimerBar({ formatted, pct, paused, sectionStatus, onTogglePause, total }: TimerBarProps) {
  const { color, shadow } = getTimerColor(pct);

  return (
    <div className="flex items-center gap-2.5 px-4 mb-1.5 shrink-0">
      <span className="font-mono text-xs tracking-widest uppercase text-white/35">Timer</span>

      {/* Track */}
      <div className="flex-1 h-1.5 rounded bg-white/[0.04] relative overflow-visible">
        <div
          className="h-full rounded transition-[width] duration-1000 linear"
          style={{ width: `${pct.toFixed(2)}%`, background: color, boxShadow: shadow }}
        />
        {/* Marks */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: total - 1 }, (_, i) => (
            <span
              key={i}
              className="absolute -top-1 w-px h-3.5 bg-white/10"
              style={{ left: `${((i + 1) / total) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Timer box */}
      <div
        className="font-mono text-[28px] font-extrabold tracking-wider text-center px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] whitespace-nowrap transition-colors duration-500"
        style={{ color }}
      >
        {formatted}
      </div>

      {/* Pause */}
      <button
        onClick={onTogglePause}
        className={`
          w-8 h-8 rounded-md border flex items-center justify-center cursor-pointer
          transition-all duration-100 shrink-0
          ${paused
            ? 'border-accent bg-[var(--accent-lo)]'
            : 'border-[var(--border)] bg-[var(--surface)] hover:border-accent hover:bg-[var(--accent-lo)]'
          }
        `}
      >
        {paused
          ? <Play size={12} className="text-accent fill-accent" />
          : <Pause size={12} className={`${paused ? 'text-accent fill-accent' : 'text-white/60 fill-white/60'}`} />
        }
      </button>

      {/* Section status box */}
      <div
        className="font-mono text-[28px] font-extrabold tracking-wider text-center px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] whitespace-nowrap transition-colors duration-300"
        style={{ color: sectionStatus.color }}
      >
        {sectionStatus.text}
      </div>
    </div>
  );
}
