/** Shared typographic primitives */
const Cmd = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-sm text-white/35 mb-2">
    <span className="text-accent font-bold mr-1">❯</span>{children}
  </div>
);

const H1 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`font-ui text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-tight mb-3 ${className}`}>{children}</div>
);

const H2 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`font-ui text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.15] tracking-tight text-white/60 mb-3.5 ${className}`}>{children}</div>
);

const P = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`font-mono text-[24px] leading-[1.65] text-white/60 ${className}`}>{children}</div>
);

const W = ({ children }: { children: React.ReactNode }) => <span className="text-white/90 font-medium">{children}</span>;
const A = ({ children }: { children: React.ReactNode }) => <span className="text-accent">{children}</span>;
const Gap = () => <div className="h-3.5" />;
const Line = () => <div className="w-full h-px bg-[var(--border)] my-4" />;
const Sc = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col justify-start p-5 pt-5 h-full text-left">{children}</div>
);

/* ═══ SLIDE 0 — Intro ═══ */
export function SlideIntro({ onStart }: { onStart: () => void }) {
  return (
    <Sc>
      <H1>L'IA m'a rendu con.</H1>
      <H2>Et c'est le meilleur truc qui me soit arrivé.</H2>
      <Line />
      <P><W>45 minutes. 10 sections.</W><br />Chaque slide a un rappel de temps.<br />Pas de PowerPoint. Pas de filtre.</P>
      <Gap />
      <div className="font-mono text-sm text-white/35">Mirco — Classe 2 — Neuchâtel</div>
      <button
        onClick={onStart}
        className="
          inline-flex items-center gap-2 mt-5 px-8 py-3.5 rounded-md
          border border-[var(--accent-md)]
          bg-gradient-to-b from-[rgba(212,255,0,0.08)] to-transparent
          font-mono text-xs font-bold tracking-widest uppercase text-accent
          cursor-pointer transition-all duration-150
          hover:bg-[rgba(212,255,0,0.12)] hover:border-[rgba(212,255,0,0.4)] hover:shadow-[0_8px_32px_rgba(212,255,0,0.08)]
          active:scale-[0.98]
        "
      >
        <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent-md)]" style={{ animation: 'pulse 1.5s ease infinite' }} />
        Lancer
      </button>
    </Sc>
  );
}

/* ═══ SLIDE 1 — La coupure ═══ */
export function SlideCoupure() {
  return (
    <Sc>
      <Cmd>kill -9 chatgpt.exe</Cmd>
      <P className="text-white/60 mb-5">process terminated.</P>
      <H1 className="animate-[glitch_6s_infinite]">Tout ce que je viens de faire<br />en 3 minutes…</H1>
      <H1 className="!text-white/90">c'est exactement<br />ce que je combats.</H1>
    </Sc>
  );
}

/* ═══ SLIDE 2 — Qui je suis ═══ */
export function SlideWhoami() {
  return (
    <Sc>
      <Cmd>whoami</Cmd>
      <Gap />
      <H2 className="!text-white/90">Mirco — Classe 2 — Neuchâtel</H2>
      <P>4 ans d'IA. Tous les jours. Sans exception.</P>
      <div className="flex flex-wrap gap-1.5 my-2.5">
        {['roman — 900 pages', 'album musique'].map(t => (
          <span key={t} className="font-mono text-xs tracking-wider uppercase px-2.5 py-1 rounded-md border border-[rgba(212,255,0,0.15)] text-accent bg-[var(--accent-lo)]">{t}</span>
        ))}
        {['sites', 'vidéos', 'voix', 'stratégies'].map(t => (
          <span key={t} className="font-mono text-xs tracking-wider uppercase px-2.5 py-1 rounded-md border border-[var(--border)] text-white/35">{t}</span>
        ))}
      </div>
      <Line />
      <P><span className="text-white/35 italic">Pas un expert.</span> <W>Un utilisateur avancé.</W></P>
      <Gap />
      <P>Le titre c'est pas une blague.<br /><W>L'IA m'a rendu con — et c'est le meilleur truc qui me soit arrivé.</W><br /><A>Les deux sont vrais.</A></P>
    </Sc>
  );
}

/* ═══ SLIDE 3 — C'est normal ═══ */
export function SlideNormal() {
  return (
    <Sc>
      <Cmd>status --year 2026</Cmd>
      <Gap />
      <H1>Le "wow" devrait être mort.</H1>
      <Gap />
      <div className="font-mono text-[24px] leading-[2.2] text-white/60">
        Générer un texte → <A>acquis</A><br />
        Générer une image → <A>acquis</A><br />
        Générer un slide → <A>acquis</A><br />
        Être impressionné par ça → <span className="text-white/35 line-through">obsolète</span>
      </div>
      <Line />
      <P><W>C'est comme être impressionné par un email.</W></P>
      <Gap />
      <P><span className="text-white/35 italic">Si on en est encore là, on est déjà en retard.</span></P>
    </Sc>
  );
}

/* ═══ SLIDE 4 — C'est de la merde ═══ */
export function SlideMerde() {
  return (
    <Sc>
      <Cmd>diagnostic --brutal</Cmd>
      <Gap />
      <H1 className="!text-white/90 animate-[glitch_6s_infinite]">L'IA c'est de la merde.</H1>
      <Gap />
      <P className="leading-[2.2]">
        → Ça te permet sans rien connaître de faire un site en 5 minutes.<br />
        → Sans recul, tu deviens un con qui pense tout savoir.<br />
        → Ça rend les tâches complexes démotivantes.<br />
        → Ça standardise. Tu te contentes de ce qu'on te donne.<br />
        → Tu fais des choses que tu ne comprends pas —<br />
        <span className="ml-5"><W>et que tu ne veux plus comprendre.</W></span>
      </P>
      <Line />
      <div className="font-ui text-[clamp(1.2rem,2.2vw,1.65rem)] font-semibold text-white/90">L'IA c'est de la merde si tu creuses pas.</div>
    </Sc>
  );
}

/* ═══ SLIDE 5 — C'est pervers ═══ */
export function SlidePervers() {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="flex flex-col justify-start p-5 pt-5">
        <Cmd>trap --sycophancy</Cmd>
        <Gap />
        <H2 className="!text-white/90">L'IA est un <span className="text-white/90">lèche-cul</span>.</H2>
        <P>Elle te félicite.<br />Elle te donne raison.<br />Elle te dit jamais que c'est nul.</P>
        <Gap />
        <P><span className="text-white/35 italic">Quand tu connais pas le domaine —<br />t'as aucun moyen de le voir.</span></P>
        <Line />
        <div className="font-mono text-sm text-accent mb-3">// le paradoxe</div>
        <P>
          <W>Le mec qui refuse l'IA "par principe" :</W><br /><br />
          → Google Maps<br />→ Netflix<br />→ Correcteur auto<br />→ Spotify
        </P>
        <Gap />
        <P><W>Pourquoi l'un est normal et l'autre "diabolique" ?</W></P>
      </div>
      <div className="flex items-center justify-center bg-white/[0.01] border-l border-[var(--border2)]">
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/15">[ module visuel ]</span>
      </div>
    </div>
  );
}

/* ═══ SLIDE 6 — Les outils ═══ */
export function SlideOutils() {
  const tools = [
    { name: 'LLM_', desc: 'Raisonnement, stratégie, dialogue' },
    { name: 'IMG_', desc: 'Génération, itération, direction' },
    { name: 'VID_', desc: 'Clips, montage, prototypage' },
    { name: 'MUS_', desc: 'Composition, production' },
    { name: 'CODE_', desc: 'Sites, apps, automatisation' },
    { name: 'VOICE_', desc: 'Clonage, synthèse, avatars' },
  ];
  return (
    <Sc>
      <Cmd>ls tools/ --demo</Cmd>
      <div className="font-mono text-sm text-accent my-1 mb-3">// un exemple de chaque</div>
      <div className="grid grid-cols-3 gap-2 my-3.5 max-w-[680px]">
        {tools.map(t => (
          <div key={t.name} className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-150 hover:border-[rgba(212,255,0,0.2)] hover:bg-[var(--accent-lo)]">
            <h4 className="font-mono text-sm font-bold text-accent uppercase tracking-wider mb-1">{t.name}</h4>
            <p className="font-mono text-xs text-white/35 leading-snug">{t.desc}</p>
          </div>
        ))}
      </div>
      <Line />
      <P><span className="text-white/35 italic">C'est pas une science exacte.</span> Résultats variables. Beaucoup d'itérations.</P>
      <Gap />
      <P><A>Ce qui prend 50h en prendra 25 dans deux semaines.</A></P>
    </Sc>
  );
}

/* ═══ SLIDE 7 — Le fantasme ═══ */
export function SlideFantasme() {
  return (
    <Sc>
      <Cmd><span className="text-[13px]">scan | analyze | generate | bexio | notify | schedule</span></Cmd>
      <Gap />
      <H1>Le fantasme de<br />l'automatisation totale.</H1>
      <Gap />
      <P>
        Scanner toutes les entreprises du canton.<br />
        Analyser leur com. Générer des offres.<br />
        Bexio. WhatsApp. Agenda. PV auto. Relance.
      </P>
      <Gap />
      <P><A>Chaque brique existe.</A></P>
      <Line />
      <H2 className="!text-white/90">Je le ferai jamais.</H2>
      <P>Tu construis un système qui te remplace toi.<br /><W>Si tu comprends plus pourquoi t'envoies cette offre — tu sers plus à rien.</W></P>
    </Sc>
  );
}

/* ═══ SLIDE 8 — L'IA m'a rendu con ═══ */
export function SlideCon() {
  const layers = [
    { label: 'Layer 1 — cognitif', text: "Je mémorise moins. Je cherche moins.\nLe GPS de la pensée — j'arrive à destination mais je sais plus par où.", cls: 'border-white/60 [&_.lh]:text-white/60 hover:bg-white/[0.03]' },
    { label: 'Layer 2 — lucide', text: "Rien n'est jamais fini. Tout peut être mieux.\nCe que j'ai fait hier est déjà obsolète.", cls: 'border-white/60 [&_.lh]:text-white/60 hover:border-accent hover:bg-[var(--accent-lo)]' },
    { label: 'Layer 3 — aigri', text: "Je regarde les gens perdre des heures par principe.\nEt je dois me taire parce que sinon je suis \"le mec de l'IA\".", cls: 'border-white/35 [&_.lh]:text-white/35 hover:border-white/90 hover:bg-white/[0.025]' },
  ];
  return (
    <Sc>
      <Cmd>dump --ego</Cmd>
      <Gap />
      <H1 className="animate-[glitch_6s_infinite]">L'IA m'a rendu con.</H1>
      <div className="h-7" />
      {layers.map(l => (
        <div key={l.label} className={`border-l-2 pl-5 py-3.5 mb-1.5 rounded-r-md transition-all duration-200 max-w-[580px] ${l.cls}`}>
          <div className="lh font-mono text-[11px] uppercase tracking-widest mb-1.5">{l.label}</div>
          <div className="font-mono text-[15px] text-white/60 leading-relaxed whitespace-pre-line">{l.text}</div>
        </div>
      ))}
    </Sc>
  );
}

/* ═══ SLIDE 9 — Et pourtant ═══ */
export function SlidePourtant() {
  return (
    <Sc>
      <Cmd><span className="text-accent">et pourtant_</span></Cmd>
      <Gap />
      <H2 className="!text-white/90">C'est le meilleur truc qui me soit arrivé.</H2>
      <P>
        Parce que des mecs comme moi — qui ont les idées mais pas les mots —<br />
        <W>maintenant ils se font entendre.</W>
      </P>
      <Gap />
      <P>
        J'ai jamais lu un livre de ma vie.<br />
        <A>J'ai écrit un roman de 900 pages.</A>
      </P>
      <Line />
      <P className="mb-3"><W>Si tout le monde peut sonner pro en 2 secondes…</W></P>
      <H1 className="!text-accent">Ça vaut quoi, un texte<br />aujourd'hui ?</H1>
      <div className="mt-6">
        <Cmd><span className="text-white/35">merci.<span className="inline-block w-2 h-[1.1em] bg-accent align-text-bottom ml-0.5 animate-[blink_1s_step-end_infinite]" /></span></Cmd>
      </div>
    </Sc>
  );
}
