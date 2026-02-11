import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══ PROMPT TEXT SEGMENTS ═══ */
interface Segment { t: string; cls?: string; pause?: number; speed?: number }

const PROMPT: Segment[] = [
  { t: 'ok bon...', pause: 1500 },
  { t: '\n\n' },
  { t: "on va parler de l'IA.", pause: 1200 },
  { t: '\n\n' },
  { t: 'mais pas le talk chiant.', cls: 'ac', pause: 400 },
  { t: '\n' },
  { t: 'pas le mec en chemise qui dit "le futur c\'est maintenant"', cls: 'ac', pause: 300 },
  { t: '\n' },
  { t: 'avec sa présentation PowerPoint "je suis un expert"', cls: 'ac', pause: 300 },
  { t: '\n' },
  { t: 'et ses slides canva bleu dégueulasse.', cls: 'ac', pause: 1200 },
  { t: '\n\n' },
  { t: 'non non non.', pause: 1500 },
  { t: '\n\n' },
  { t: "moi j'utilise l'IA tous les jours.", pause: 300 },
  { t: '\n' },
  { t: 'depuis 4 ans.', pause: 300 },
  { t: '\n' },
  { t: 'pour TOUT.', cls: 'em', pause: 1200 },
  { t: '\n\n' },
  { t: "j'ai appris à monter des PC.", pause: 300 },
  { t: '\n' },
  { t: "à résoudre un rubik's cube.", pause: 300 },
  { t: '\n' },
  { t: 'à construire des drones FPV.', pause: 300 },
  { t: '\n' },
  { t: "j'ai créé un album de musique.", pause: 400 },
  { t: ' (je vous ferai écouter)', cls: 'dm', pause: 300 },
  { t: '\n' },
  { t: "j'ai fait du theorycraft sur WoW Classic.", pause: 400 },
  { t: ' (les vrais savent)', cls: 'dm', pause: 800 },
  { t: '\n\n' },
  { t: "j'ai presque failli faire de la politique", pause: 400 },
  { t: '\n' },
  { t: 'mais je me suis dit... non fait pas ça.', pause: 600 },
  { t: '\n' },
  { t: 'ça va partir en couille.', cls: 'dm', pause: 1200 },
  { t: '\n\n' },
  { t: "alors j'ai écrit une histoire.", pause: 400 },
  { t: '\n' },
  { t: 'un roman. 900 pages.', pause: 400 },
  { t: '\n' },
  { t: "une histoire d'amour.", pause: 500 },
  { t: '\n' },
  { t: "(ouais j'ai vraiment écrit une histoire d'amour)", cls: 'dm', pause: 1000 },
  { t: '\n\n' },
  { t: 'et vous savez quoi ?', pause: 2000 },
  { t: '\n\n' },
  { t: "ça m'a rendu con.", cls: 'em', pause: 1200 },
  { t: '\n\n' },
  { t: '...', cls: 'dm', pause: 2500 },
  { t: '\n\n' },
  { t: 'genre vraiment con.', cls: 'em', pause: 1500 },
  { t: '\n\n' },
  { t: 'je retiens plus rien.', pause: 400 },
  { t: '\n' },
  { t: 'je google plus rien.', pause: 400 },
  { t: '\n' },
  { t: 'je laisse la machine penser à ma place.', pause: 1500 },
  { t: '\n\n' },
  { t: "mais c'est aussi le meilleur truc qui me soit arrivé.", cls: 'ac', pause: 1200 },
  { t: '\n\n' },
  { t: 'et on va voir pourquoi.', cls: 'em', pause: 0 },
];

const BASE_SPEED = 75;
const BSOD_TECH = [
  'What failed: ntoskrnl.exe',
  'Bug check: 0x0000007E (0xC0000005, 0xFC5ACBF3, 0xFC90F8C0, 0xFC90F5C0)',
  'Dump file: C:\\Windows\\MEMORY.DMP',
];

/* ═══ TYPING HOOK (char-by-char with auto-scroll) ═══ */
function useTyping(
  areaRef: React.RefObject<HTMLDivElement | null>,
  cursorRef: React.RefObject<HTMLSpanElement | null>,
) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = areaRef.current;
    const cursor = cursorRef.current;
    if (!el || !cursor) return;

    let segIdx = 0;
    let charIdx = 0;
    let currentSpan: HTMLSpanElement | null = null;
    let timer: number;

    function step() {
      if (!el || !cursor) return;

      if (segIdx >= PROMPT.length) {
        cursor.style.display = 'none';
        timer = window.setTimeout(() => setDone(true), 800);
        return;
      }

      const seg = PROMPT[segIdx]!;
      const speed = seg.speed || BASE_SPEED;

      if (seg.t === '\n' || seg.t === '\n\n') {
        if (seg.t === '\n\n') el.insertBefore(document.createElement('br'), cursor);
        el.insertBefore(document.createElement('br'), cursor);
        segIdx++; charIdx = 0; currentSpan = null;
        timer = window.setTimeout(step, 100);
        return;
      }

      if (!currentSpan) {
        currentSpan = document.createElement('span');
        if (seg.cls) currentSpan.className = seg.cls;
        el.insertBefore(currentSpan, cursor);
      }

      if (charIdx < seg.t.length) {
        currentSpan.textContent += seg.t[charIdx];
        charIdx++;

        const rect = cursor.getBoundingClientRect();
        const center = window.innerHeight * 0.45;
        if (rect.bottom > center) {
          el.style.transform = `translateY(${-(rect.bottom - center)}px)`;
        }

        const ch = seg.t[charIdx - 1] ?? '';
        let delay = speed + Math.random() * 20;
        if ('.?!'.includes(ch)) delay = speed * 4.5;
        else if (ch === ',') delay = speed * 2.5;

        timer = window.setTimeout(step, delay);
      } else {
        segIdx++; charIdx = 0; currentSpan = null;
        timer = window.setTimeout(step, seg.pause ?? 300);
      }
    }

    timer = window.setTimeout(step, 1500);
    return () => clearTimeout(timer);
  }, [areaRef, cursorRef]);

  return done;
}

/* ═══ PHASE 1 — PROMPT ═══ */
function PromptPhase({ onDone }: { onDone: () => void }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [brandOn, setBrandOn] = useState(false);
  const typingDone = useTyping(areaRef, cursorRef);

  useEffect(() => { const t = setTimeout(() => setBrandOn(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Grain */}
      <div
        className="fixed inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E\")",
          animation: 'grain 400ms steps(6) infinite',
        }}
      />

      {/* Brand */}
      <div className={`fixed top-5 left-6 z-20 flex items-center gap-[7px] font-bold text-sm transition-opacity duration-[800ms] ${brandOn ? '' : 'opacity-0'}`}>
        Classe <span className="px-1.5 py-px rounded-[3px] bg-accent text-black font-extrabold text-[11px]">2</span>
      </div>

      {/* Text area */}
      <div className="flex-1 overflow-hidden flex flex-col justify-center items-center px-[8vw] pt-[60px] pb-[120px]">
        <div
          ref={areaRef}
          className="prompt-area font-mono text-[clamp(30px,3.5vw,46px)] leading-[1.55] text-[var(--sub)] text-left max-w-[1000px] w-full"
          style={{ transition: 'transform .4s cubic-bezier(.16,1,.3,1)' }}
        >
          <span
            ref={cursorRef}
            className="inline-block w-3 bg-accent align-text-bottom ml-0.5"
            style={{ height: '1.05em', animation: 'blink .7s step-end infinite' }}
          />
        </div>
      </div>

      {/* Button dock */}
      <div
        className={`fixed bottom-0 inset-x-0 z-20 flex justify-center px-[8vw] pt-5 pb-7 transition-opacity duration-500 ${typingDone ? '' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'linear-gradient(0deg, var(--bg) 60%, transparent)' }}
      >
        <button
          onClick={onDone}
          className="
            inline-flex items-center gap-2.5 px-10 py-4 rounded-md
            border border-[var(--accent-md)]
            bg-gradient-to-b from-[rgba(212,255,0,0.06)] to-transparent
            font-mono text-base font-bold tracking-[.1em] uppercase text-accent
            cursor-pointer transition-all duration-150
            hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)] hover:shadow-[0_8px_32px_rgba(212,255,0,0.06)]
            active:scale-[0.97]
          "
        >
          osef de ma vie, commencer la présentation
        </button>
      </div>
    </div>
  );
}

/* ═══ PHASE 2 — BSOD ═══ */
function BSODPhase({ active, onDone }: { active: boolean; onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [tech, setTech] = useState<string[]>([]);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!active) return;
    let timer: number;

    const countUp = () => {
      setPct(prev => {
        const next = Math.min(100, prev + Math.random() * 3 + 0.5);
        if (next < 100) {
          timer = window.setTimeout(countUp, 150 + Math.random() * 250);
        } else {
          let li = 0;
          const showLine = () => {
            if (li < BSOD_TECH.length) {
              setTech(p => [...p, BSOD_TECH[li]!]);
              li++;
              timer = window.setTimeout(showLine, 400);
            } else {
              timer = window.setTimeout(() => setShowBtn(true), 1000);
            }
          };
          timer = window.setTimeout(showLine, 600);
        }
        return next;
      });
    };

    timer = window.setTimeout(countUp, 800);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center px-[8vw] py-[6vh] cursor-default"
      style={{ background: '#0078d7', fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif" }}
    >
      <div className="text-white text-[clamp(100px,14vw,160px)] font-thin mb-5 leading-none">:(</div>
      <div className="text-white text-[clamp(20px,2.5vw,32px)] mb-2.5 leading-[1.4]">
        Your device ran into a problem and needs to restart.
      </div>
      <div className="text-white text-[clamp(20px,2.5vw,32px)] mb-8">{Math.floor(pct)}% complete</div>
      <div className="text-white/85 text-[clamp(14px,1.5vw,18px)] leading-[1.6] mb-3">
        For more information about this issue and possible fixes, visit https://www.windows.com/stopcode<br />
        If you call a support person, give them this info:
      </div>
      <div className="text-white/85 text-[clamp(14px,1.5vw,18px)] leading-[1.6] mb-3">
        Stop code: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED
      </div>
      <pre className="text-white/50 text-[clamp(12px,1.2vw,15px)] font-mono leading-[1.6] mb-6 whitespace-pre-line">
        {tech.join('\n')}
      </pre>
      {showBtn && (
        <button
          onClick={onDone}
          className="
            inline-flex items-center gap-2 w-fit px-7 py-3 rounded-[3px]
            border-[1.5px] border-white/50 bg-transparent text-white
            text-[clamp(14px,1.5vw,18px)] font-semibold cursor-pointer
            transition-all duration-[120ms]
            hover:bg-white/10 hover:border-white active:scale-[0.97]
          "
        >
          Shut down
        </button>
      )}
    </div>
  );
}

/* ═══ PHASE 3 — JOKE ═══ */
function JokePhase({ active, onDone }: { active: boolean; onDone: () => void }) {
  const [vis, setVis] = useState<[boolean, boolean, boolean]>([false, false, false]);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setVis(v => [true, v[1], v[2]]), 3000);
    const t2 = setTimeout(() => setVis(v => [v[0], true, v[2]]), 5500);
    const t3 = setTimeout(() => setVis(v => [v[0], v[1], true]), 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active]);

  const reveal = (on: boolean) =>
    `transition-all duration-[600ms] ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`;

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center px-[8vw]">
      <div className="text-center max-w-[900px]">
        <div className={`font-mono text-[clamp(30px,3.5vw,46px)] leading-[1.55] text-[var(--sub)] mb-5 ${reveal(vis[0])}`}>
          nan mais je déconne.
        </div>
        <div className={`font-mono text-[clamp(30px,3.5vw,46px)] leading-[1.55] text-[var(--txt)] font-semibold mb-10 ${reveal(vis[1])}`}>
          en vrai si ça avait vraiment bugué là,<br />je faisais quoi ?
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
            ${reveal(vis[2])}
          `}
        >
          c'est parti les amis
        </button>
      </div>
    </div>
  );
}

/* ═══ MAIN ORCHESTRATOR ═══ */
type Phase = 'prompt' | 'bsod' | 'joke' | 'done';

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('prompt');
  const [flash, setFlash] = useState(false);

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

      <div className={`transition-opacity duration-[600ms] ${phase === 'prompt' ? '' : 'opacity-0 pointer-events-none'}`}>
        <PromptPhase onDone={triggerBSOD} />
      </div>

      <div className={`transition-opacity duration-[600ms] ${phase === 'bsod' ? '' : 'opacity-0 pointer-events-none'}`}>
        <BSODPhase active={phase === 'bsod'} onDone={triggerJoke} />
      </div>

      <div className={`transition-opacity duration-[600ms] ${phase === 'joke' ? '' : 'opacity-0 pointer-events-none'}`}>
        <JokePhase active={phase === 'joke'} onDone={triggerLaunch} />
      </div>
    </div>
  );
}
