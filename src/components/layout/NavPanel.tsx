import type { Section } from '@/types';
import { NAV_GROUPS } from '@/data';

interface NavPanelProps {
  sections: Section[];
  current: number;
  meta: string;
  onGo: (i: number) => void;
}

export default function NavPanel({ sections, current, meta, onGo }: NavPanelProps) {
  let chapterNum = 0;

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] backdrop-blur-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-[var(--border2)] flex justify-between items-center font-mono text-xs tracking-widest uppercase text-white/35">
        <span>Sections</span>
        <span>{sections.length}</span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {NAV_GROUPS.map((group) => {
          const isChapter = group.chapterIndex !== undefined;
          if (isChapter) chapterNum++;

          return (
            <div key={group.label}>
              {/* Group header */}
              {isChapter ? (
                <button
                  onClick={() => onGo(group.chapterIndex!)}
                  className={`
                    flex items-center gap-2 px-3 py-2.5 border-none w-full
                    bg-transparent cursor-pointer text-left transition-all duration-100 relative
                    ${current === group.chapterIndex ? 'bg-[var(--accent-lo)]' : 'hover:bg-white/[0.025]'}
                  `}
                >
                  {current === group.chapterIndex && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-accent" />
                  )}
                  <span className="font-mono text-[10px] tracking-widest uppercase text-accent/50">
                    ch.{chapterNum}
                  </span>
                  <span className={`text-[13px] font-semibold flex-1 ${
                    current === group.chapterIndex ? 'text-white/90' : 'text-white/50'
                  }`}>
                    {group.label}
                  </span>
                </button>
              ) : (
                <div className="px-3 py-2 font-mono text-[10px] tracking-widest uppercase text-white/20 mt-1">
                  {group.label}
                </div>
              )}

              {/* Group items */}
              {group.items.map((idx) => {
                const s = sections[idx];
                if (!s) return null;
                const state = idx === current ? 'active' : idx < current ? 'done' : 'default';

                return (
                  <button
                    key={idx}
                    onClick={() => onGo(idx)}
                    className={`
                      flex items-center gap-2 w-full border-none
                      bg-transparent cursor-pointer text-left transition-all duration-100 relative
                      ${isChapter ? 'px-3 pl-7 py-1.5' : 'px-3 py-2'}
                      ${state === 'active' ? 'bg-[var(--accent-lo)]' : ''}
                      ${state === 'done' ? 'opacity-40 hover:opacity-60' : 'hover:bg-white/[0.025]'}
                    `}
                  >
                    {state === 'active' && (
                      <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r bg-accent" />
                    )}
                    <span className={`text-[12px] flex-1 ${
                      state === 'active' ? 'text-white/90 font-medium' : state === 'done' ? 'text-white/35' : 'text-white/50'
                    }`}>
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
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
