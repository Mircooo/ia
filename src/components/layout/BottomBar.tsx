import { Pause, Play } from 'lucide-react';

interface BottomBarProps {
  onNext: () => void;
  onPrev: () => void;
  onPause: () => void;
  paused: boolean;
}

export default function BottomBar({ onNext, onPrev, onPause, paused }: BottomBarProps) {
  return (
    <div className="flex items-center justify-between gap-6 px-6 py-4 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-2">
        <NavBtn onClick={onPrev}>←</NavBtn>
      </div>

      {/* Center */}
      <div className="flex-1 flex justify-center gap-6">
        <button
          onClick={onNext}
          className="
            flex-1 max-w-[400px] flex items-center justify-center gap-2
            px-6 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)]
            font-mono text-sm font-semibold tracking-wider uppercase text-white/35
            cursor-pointer transition-all duration-100
            hover:border-accent hover:text-accent hover:bg-[var(--accent-lo)]
            active:scale-[0.98]
          "
        >
          <span className="px-3 py-1 rounded border border-white/15 text-xs text-white/60">espace</span>
          section suivante
        </button>
        <button
          onClick={onPause}
          className="
            flex items-center justify-center gap-1.5
            px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)]
            font-mono text-lg font-extrabold tracking-wider text-white/35
            cursor-pointer transition-all duration-100
            hover:border-white/15 hover:text-white/90
            active:scale-[0.97]
          "
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
          <span className="px-3 py-1 rounded border border-white/15 text-xs text-white/60 font-semibold">enter</span>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <NavBtn onClick={onNext} accent>→</NavBtn>
      </div>
    </div>
  );
}

function NavBtn({ children, onClick, accent }: { children: React.ReactNode; onClick: () => void; accent?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-1.5
        px-4 py-2 rounded-md border font-mono text-[28px] font-extrabold tracking-wider
        cursor-pointer transition-all duration-100 whitespace-nowrap leading-none
        active:scale-[0.97]
        ${accent
          ? 'border-[rgba(212,255,0,0.2)] text-accent bg-gradient-to-b from-[rgba(212,255,0,0.06)] to-transparent hover:border-[var(--accent-md)] hover:shadow-[0_4px_16px_rgba(212,255,0,0.06)]'
          : 'border-[var(--border)] bg-[var(--surface)] text-white/35 hover:border-white/15 hover:text-white/90'
        }
      `}
    >
      {children}
    </button>
  );
}
