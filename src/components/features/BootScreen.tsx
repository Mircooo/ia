import { useState, useEffect, useRef, useCallback } from 'react';

const BSOD_LINES = [
  'Collecting data for crash dump...',
  'Initializing disk for crash dump...',
  'Stop code: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED',
  'What failed: ntoskrnl.exe',
];

const VIDEO_SRC = 'https://res.cloudinary.com/df5khdkxl/video/upload/v1771249008/IA_zithce.mp4';

/* ═══ PHASE 1 — SPLASH ═══ */
function SplashPhase({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      <div className="font-mono text-[clamp(1.5rem,4vw,3rem)] text-white/90 text-center leading-[1.4] mb-10 max-w-[800px] px-8">
        ce que je viens de vous montrer,<br />
        <span className="text-accent font-semibold">c'était du vent.</span>
      </div>
      <button
        onClick={onStart}
        className="
          inline-flex items-center gap-2.5 px-10 py-4 rounded-md
          border border-[var(--accent-md)]
          bg-gradient-to-b from-[rgba(212,255,0,0.06)] to-transparent
          font-mono text-base font-bold tracking-[.1em] uppercase text-accent
          cursor-pointer transition-all duration-150
          hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)]
          hover:shadow-[0_8px_32px_rgba(212,255,0,0.06)]
          active:scale-[0.97]
        "
      >
        Commencer
      </button>
    </div>
  );
}

/* ═══ PHASE 2 — VIDEO ═══ */
function VideoPhase({ active, onSkip }: { active: boolean; onSkip: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (active && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [active]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="w-full h-full object-contain"
        onEnded={onSkip}
        playsInline
      />
      <button
        onClick={onSkip}
        className="fixed bottom-5 right-6 z-20 font-mono text-xs text-white/20 cursor-pointer transition-colors duration-150 hover:text-white/50"
      >
        skip
      </button>
    </div>
  );
}

/* ═══ PHASE 3 — BSOD ═══ */
function BSODPhase({ active, onDone, onSkip }: { active: boolean; onDone: () => void; onSkip: () => void }) {
  const [pct, setPct] = useState(0);
  const [line, setLine] = useState<string | null>(null);
  const [showBtn, setShowBtn] = useState(false);
  const pctRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    let timer: number;
    let techStarted = false;

    const countUp = () => {
      const next = Math.min(100, pctRef.current + Math.random() * 5 + 2);
      pctRef.current = next;
      setPct(next);

      if (next < 100) {
        timer = window.setTimeout(countUp, 80 + Math.random() * 150);
      } else if (!techStarted) {
        techStarted = true;
        let li = 0;
        const showLine = () => {
          if (li < BSOD_LINES.length) {
            setLine(BSOD_LINES[li]!);
            li++;
            timer = window.setTimeout(showLine, 1800);
          } else {
            setLine(null);
            timer = window.setTimeout(() => setShowBtn(true), 1500);
          }
        };
        timer = window.setTimeout(showLine, 1200);
      }
    };

    timer = window.setTimeout(countUp, 1200);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center px-[8vw] py-[6vh] cursor-default overflow-hidden"
      style={{ background: '#0078d7', fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif" }}
    >
      <div className="text-white text-[clamp(80px,10vw,120px)] font-thin mb-4 leading-none">:(</div>
      <div className="text-white text-[clamp(16px,2vw,22px)] leading-[1.5] mb-6 max-w-[700px]">
        Your PC ran into a problem and needs to restart.<br />
        We&apos;re just collecting some error info, and then we&apos;ll restart for you.
      </div>
      <div className="text-white text-[clamp(16px,2vw,22px)] mb-8">{Math.floor(pct)}% complete</div>
      <div className="h-6">
        {line && (
          <div className="text-white/50 font-mono text-[clamp(11px,1vw,14px)] transition-opacity duration-300">
            {line}
          </div>
        )}
      </div>
      {showBtn && (
        <button
          onClick={onDone}
          className="
            inline-flex items-center gap-2 w-fit mt-6 px-7 py-3 rounded-[3px]
            border-[1.5px] border-white/50 bg-transparent text-white
            text-[clamp(14px,1.5vw,18px)] font-semibold cursor-pointer
            transition-all duration-[120ms]
            hover:bg-white/10 hover:border-white active:scale-[0.97]
          "
        >
          Restart
        </button>
      )}
      <button
        onClick={onSkip}
        className="fixed bottom-5 right-6 z-20 text-white/20 text-xs cursor-pointer transition-colors duration-150 hover:text-white/50"
        style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif" }}
      >
        skip
      </button>
    </div>
  );
}

/* ═══ PHASE 4 — JOKE ═══ */
function JokePhase({ active, onDone }: { active: boolean; onDone: () => void }) {
  const [vis, setVis] = useState<[boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false]);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setVis(v => [true, v[1], v[2], v[3], v[4]]), 1500);
    const t2 = setTimeout(() => setVis(v => [v[0], true, v[2], v[3], v[4]]), 3500);
    const t3 = setTimeout(() => setVis(v => [v[0], v[1], true, v[3], v[4]]), 5500);
    const t4 = setTimeout(() => setVis(v => [v[0], v[1], v[2], true, v[4]]), 7500);
    const t5 = setTimeout(() => setVis(v => [v[0], v[1], v[2], v[3], true]), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [active]);

  const reveal = (on: boolean) =>
    `transition-all duration-[600ms] ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`;

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center px-[8vw]">
      <div className="text-center max-w-[900px]">
        <div className={`font-mono text-[clamp(24px,3vw,40px)] leading-[1.55] text-[var(--sub)] mb-4 ${reveal(vis[0])}`}>
          bon.
        </div>
        <div className={`font-mono text-[clamp(24px,3vw,40px)] leading-[1.55] text-[var(--sub)] mb-4 ${reveal(vis[1])}`}>
          je me suis toujours imaginé ce moment.
        </div>
        <div className={`font-mono text-[clamp(24px,3vw,40px)] leading-[1.55] text-[var(--txt)] font-semibold mb-4 ${reveal(vis[2])}`}>
          le pc qui lâche devant tout le monde.
        </div>
        <div className={`font-mono text-[clamp(24px,3vw,40px)] leading-[1.55] text-[var(--sub)] mb-10 ${reveal(vis[3])}`}>
          fallait que je le fasse au moins une fois.
        </div>
        <button
          onClick={onDone}
          className={`
            inline-flex items-center gap-2.5 px-10 py-4 rounded-md
            border border-[var(--accent-md)]
            bg-gradient-to-b from-[rgba(212,255,0,0.06)] to-transparent
            font-mono text-base font-bold tracking-[.1em] uppercase text-accent
            cursor-pointer transition-all duration-150
            hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)]
            hover:shadow-[0_8px_32px_rgba(212,255,0,0.06)]
            active:!scale-[0.97]
            ${reveal(vis[4])}
          `}
        >
          c'est parti les amis
        </button>
      </div>
    </div>
  );
}

/* ═══ MAIN ORCHESTRATOR ═══ */
type Phase = 'splash' | 'video' | 'bsod' | 'joke' | 'done';

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('splash');
  const [flash, setFlash] = useState(false);

  const triggerVideo = useCallback(() => setPhase('video'), []);

  const triggerBSOD = useCallback(() => {
    setFlash(true);
    setTimeout(() => { setFlash(false); setPhase('bsod'); }, 80);
  }, []);

  const triggerJoke = useCallback(() => setPhase('joke'), []);

  const triggerLaunch = useCallback(() => {
    setPhase('done');
    setTimeout(onComplete, 600);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] transition-opacity duration-500 ${phase === 'done' ? 'opacity-0 pointer-events-none' : ''}`}>
      {flash && <div className="fixed inset-0 z-[301] bg-white" />}

      <div className={`transition-opacity duration-[600ms] ${phase === 'splash' ? '' : 'opacity-0 pointer-events-none'}`}>
        <SplashPhase onStart={triggerVideo} />
      </div>

      <div className={`transition-opacity duration-[600ms] ${phase === 'video' ? '' : 'opacity-0 pointer-events-none'}`}>
        <VideoPhase active={phase === 'video'} onSkip={triggerBSOD} />
      </div>

      <div className={`transition-opacity duration-[600ms] ${phase === 'bsod' ? '' : 'opacity-0 pointer-events-none'}`}>
        <BSODPhase active={phase === 'bsod'} onDone={triggerJoke} onSkip={triggerLaunch} />
      </div>

      <div className={`transition-opacity duration-[600ms] ${phase === 'joke' ? '' : 'opacity-0 pointer-events-none'}`}>
        <JokePhase active={phase === 'joke'} onDone={triggerLaunch} />
      </div>
    </div>
  );
}
