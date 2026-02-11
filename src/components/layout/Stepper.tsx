interface StepperProps {
  total: number;
  current: number;
  onGo: (i: number) => void;
}

export default function Stepper({ total, current, onGo }: StepperProps) {
  const progressPct = (current / (total - 1)) * 100;

  return (
    <div className="w-full px-6 mb-3 shrink-0">
      {/* Container with line */}
      <div className="relative w-full h-2 flex items-center">
        {/* Background line (full width) */}
        <div className="absolute inset-x-0 h-px bg-white/[0.05]" />

        {/* Progress line (done portion) */}
        <div
          className="absolute left-0 h-px bg-[rgba(212,255,0,0.3)] transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />

        {/* Bullets positioned on top */}
        {Array.from({ length: total }, (_, i) => {
          const state = i < current ? 'done' : i === current ? 'active' : 'future';
          const leftPct = (i / (total - 1)) * 100;

          return (
            <div
              key={i}
              className="absolute cursor-pointer -translate-x-1/2"
              style={{ left: `${leftPct}%` }}
              onClick={() => onGo(i)}
            >
              <div className={`
                rounded-full transition-all duration-200
                ${state === 'done' ? 'w-2 h-2 border-[1.5px] border-accent bg-accent' : ''}
                ${state === 'active' ? 'w-2.5 h-2.5 border-[1.5px] border-accent bg-accent shadow-[0_0_8px_rgba(212,255,0,0.25)]' : ''}
                ${state === 'future' ? 'w-2 h-2 border-[1.5px] border-white/[0.06] bg-transparent' : ''}
              `} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
