import type { ReactNode } from 'react';

interface SlideProps {
  active: boolean;
  children: ReactNode;
}

export default function Slide({ active, children }: SlideProps) {
  return (
    <div className={`
      absolute inset-0 z-[1]
      transition-all duration-[450ms] cubic-bezier(.16,1,.3,1)
      overflow-y-auto scrollbar-hide
      ${active
        ? 'opacity-100 translate-y-0 pointer-events-auto'
        : 'opacity-0 translate-y-1.5 pointer-events-none'
      }
    `}>
      {children}
    </div>
  );
}
