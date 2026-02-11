import type { Section } from '@/types';

interface NavPanelProps {
  sections: Section[];
  current: number;
  meta: string;
  onGo: (i: number) => void;
}

export default function NavPanel({ sections, current, meta, onGo }: NavPanelProps) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] backdrop-blur-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-[var(--border2)] flex justify-between items-center font-mono text-xs tracking-widest uppercase text-white/35">
        <span>Sections</span>
        <span>{sections.length}</span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {sections.map((s, i) => {
          const state = i === current ? 'active' : i < current ? 'done' : 'default';
          return (
            <button
              key={i}
              onClick={() => onGo(i)}
              className={`
                flex items-center gap-2 px-3 py-2.5 border-none w-full
                border-b border-[var(--border2)] bg-transparent cursor-pointer
                text-left transition-all duration-100 relative
                ${state === 'active' ? 'bg-[var(--accent-lo)]' : ''}
                ${state === 'done' ? 'opacity-40 hover:opacity-60' : 'hover:bg-white/[0.025]'}
              `}
            >
              {state === 'active' && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-accent" />
              )}
              <span className={`font-mono text-xs w-4 shrink-0 ${state === 'active' ? 'text-accent' : 'text-white/15'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`text-[13px] font-medium flex-1 ${
                state === 'active' ? 'text-white/90' : state === 'done' ? 'text-white/35' : 'text-white/60'
              }`}>
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Meta */}
      <div className="px-3 py-2.5 border-t border-[var(--border2)] min-h-[52px]">
        <div className="font-mono text-xs tracking-widest uppercase text-[rgba(212,255,0,0.4)] mb-1">système</div>
        <div className="font-mono text-[13px] text-white/35 leading-relaxed italic">{meta}</div>
      </div>
    </div>
  );
}
