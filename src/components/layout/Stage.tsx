import type { ReactNode } from 'react';

interface StageProps {
  children: ReactNode;
}

export default function Stage({ children }: StageProps) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] relative overflow-hidden min-h-0">
      {/* 12-col grid lines */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(90deg,
            rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px,
            transparent 1px, transparent calc(100%/12)
          )`,
        }}
      />
      {children}
    </div>
  );
}
