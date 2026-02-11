import { useEffect, useState } from 'react';

interface HeaderProps {
  current: number;
  total: number;
}

export default function Header({ current, total }: HeaderProps) {
  const [clock, setClock] = useState('--:--');

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setClock(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
    };
    update();
    const id = setInterval(update, 5000);
    return () => clearInterval(id);
  }, []);

  const label = `${String(current + 1).padStart(2, '0')} / ${total}`;

  return (
    <div className="flex items-center justify-between px-4 py-2.5 shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight">
          Classe <span className="px-1.5 py-px rounded bg-accent text-black font-extrabold text-xs">2</span>
        </div>
        <div className="w-px h-3.5 bg-white/15" />
        <span className="font-mono text-xs tracking-widest uppercase text-white/35">conf:ia — 2026</span>
      </div>
      <div className="flex items-center gap-2">
        <Pill accent>
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(212,255,0,0.25)]" style={{ animation: 'pulse 2s ease infinite' }} />
          <b>LIVE</b>
        </Pill>
        <Pill><b>{clock}</b></Pill>
        <Pill accent><b>{label}</b></Pill>
      </div>
    </div>
  );
}

function Pill({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`
      inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md
      border font-mono text-xs tracking-wider uppercase
      ${accent
        ? 'border-[rgba(212,255,0,0.12)] [&_b]:text-accent'
        : 'border-[var(--border)] [&_b]:text-white/90'
      }
      bg-[var(--surface)] text-white/35
    `}>
      {children}
    </div>
  );
}
