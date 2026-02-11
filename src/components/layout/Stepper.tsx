interface StepperProps {
  total: number;
  current: number;
  onGo: (i: number) => void;
}

export default function Stepper({ total, current, onGo }: StepperProps) {
  return (
    <div className="flex items-center px-4 mb-1 shrink-0">
      {Array.from({ length: total }, (_, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'future';
        return (
          <div key={i} className="flex-1 flex items-center cursor-pointer" onClick={() => onGo(i)}>
            <div className={`
              rounded-full transition-all duration-200 shrink-0 z-[1]
              ${state === 'done' ? 'w-2 h-2 border-[1.5px] border-accent bg-accent' : ''}
              ${state === 'active' ? 'w-2.5 h-2.5 border-[1.5px] border-accent bg-accent shadow-[0_0_8px_rgba(212,255,0,0.25)]' : ''}
              ${state === 'future' ? 'w-2 h-2 border-[1.5px] border-white/[0.06] bg-transparent' : ''}
            `} />
            {i < total - 1 && (
              <div className={`flex-1 h-px mx-1.5 ${state === 'done' ? 'bg-[rgba(212,255,0,0.3)]' : 'bg-white/[0.05]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
