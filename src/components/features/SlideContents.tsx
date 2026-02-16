import React from 'react';

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
const Notes = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-sm text-white/25 leading-[1.8] mt-4">{children}</div>
);

/* ═══ SLIDE 0 — Intro ═══ */
export function SlideIntro({ onStart }: { onStart: () => void }) {
  return (
    <Sc>
      <H1>L'IA m'a rendu con.</H1>
      <H2>Et c'est le meilleur truc qui me soit arrivé.</H2>
      <Line />
      <P><W>45 minutes. 21 sections.</W><br />Chaque slide a un rappel de temps.<br />Pas de PowerPoint. Pas de filtre.</P>
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

/* ═══ SLIDE 1 — Qui je suis ═══ */
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

/* ═══ SLIDE 2 — C'est devenu normal ═══ */
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

/* ═══ SLIDE 3 — Chapitre 1 ═══ */
export function SlideChapitre1() {
  return (
    <Sc>
      <Cmd>chapitre 1</Cmd>
      <Gap />
      <H1>Ce que ça m'a donné</H1>
    </Sc>
  );
}

/* ═══ SLIDE 4 — L'expression ═══ */
export function SlideExpression() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">L'expression</div>
      <H1>"J'ai jamais lu un livre.<br />J'en ai écrit un."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">L'IA donne une voix à ceux qui avaient les idées mais pas les mots.</P>
      <Line />
      <Notes>
        → Avant incapable d'écrire sans fautes, de formuler clairement<br />
        → Le roman c'est MON histoire, MES idées, MES personnages<br />
        → L'IA a mis les mots dans le bon ordre<br />
        → 900 pages, 6 mois, 3h tous les soirs<br />
        → Triche ou accès à ce que j'avais toujours dans la tête ?
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 5 — La démocratisation ═══ */
export function SlideDemocratisation() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La démocratisation</div>
      <H1>"Le pouvoir change de mains."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">Le diplôme protège plus personne. Les idées, si.</P>
      <Line />
      <Notes>
        → Avant fallait le bon diplôme, le bon réseau, le bon costume<br />
        → Un mec en training peut sortir un dossier plus solide que la plupart des élus<br />
        → C'est pas moi qui suis fort, c'est que la barrière a disparu<br />
        → Ceux qui auront le pouvoir c'est plus la vieille école<br />
        → C'est ceux qui savent penser et utiliser les outils
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 6 — Les compétences ═══ */
export function SlideCompetences() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Les compétences</div>
      <H1>"Je suis codeur. Enfin… presque."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">L'outil est le même. Le parcours non.</P>
      <Line />
      <Notes>
        → Traducteur, codeur, musicien, stratège en quelques semaines<br />
        → Pas en quelques années, pas avec un diplôme<br />
        → J'ai l'outil d'un codeur mais pas le parcours d'un codeur<br />
        → Les vrais pros ils pensent quoi ?<br />
        → C'est le meilleur truc qui me soit arrivé — mais est-ce que c'est honnête ?
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 7 — La vitesse ═══ */
export function SlideVitesse() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La vitesse</div>
      <H1>"Mon cerveau a pété les plombs."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">Plus tu utilises l'IA, plus tu penses vite — et moins tu sais t'arrêter.</P>
      <Line />
      <Notes>
        → 15 trucs en même temps : borne tactile, musique, travail, cette présentation<br />
        → L'IA c'est mon traducteur, pas mon intelligence<br />
        → Sans elle tout reste coincé dans ma tête<br />
        → Rien est jamais fini, on peut toujours itérer<br />
        → Savoir dire stop c'est la compétence la plus dure
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 8 — Chapitre 2 ═══ */
export function SlideChapitre2() {
  return (
    <Sc>
      <Cmd>chapitre 2</Cmd>
      <Gap />
      <H1>Ce que ça te fait</H1>
    </Sc>
  );
}

/* ═══ SLIDE 9 — Le sans-effort ═══ */
export function SlideSansEffort() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Le sans-effort</div>
      <H1>"C'est de la merde bien emballée."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">Tout le monde peut faire. Personne vérifie.</P>
      <Line />
      <Notes>
        → Posts LinkedIn où tout le monde sonne pareil<br />
        → Les tirets cadratins qui trahissent<br />
        → Le site fait en 5 minutes que le client prend pour du web design<br />
        → Le post de Marseille copié-collé sans relire<br />
        → Faire c'est pas créer, sans effort = de la merde bien emballée
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 10 — La flatterie ═══ */
export function SlideFlatterie() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La flatterie</div>
      <H1>"T'es incroyable.<br />Signé : un algorithme."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">L'IA te dit ce que tu veux entendre. Pas ce que t'as besoin d'entendre.</P>
      <Line />
      <Notes>
        → Elle me dit que c'est mieux que 90% de ce qui se fait<br />
        → Elle me félicite, me donne raison, dit jamais que c'est nul<br />
        → Quand tu connais pas le domaine t'as aucun moyen de le voir<br />
        → Le pire c'est que ça fait du bien<br />
        → Le lèche-cul le plus convaincant du monde
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 11 — Les fausses preuves ═══ */
export function SlideFaussesPreuves() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Les fausses preuves</div>
      <H1>"Il m'a trouvé des preuves.<br />Elles existaient pas."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">Le biais de confirmation n'a jamais été aussi facile.</P>
      <Line />
      <Notes>
        → J'ai demandé à ChatGPT de me donner raison, il l'a fait<br />
        → Études, liens, chiffres — ça avait l'air solide<br />
        → Qui lit le PDF de 40 pages ? Personne. Moi le premier.<br />
        → Biais de confirmation automatisé<br />
        → Plus dangereux que pas de source du tout
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 12 — La dépendance ═══ */
export function SlideDependance() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La dépendance</div>
      <H1>"Fais-moi confiance."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">Tu fais confiance à un truc qui a rien à perdre.</P>
      <Line />
      <Notes>
        → Claude m'a dit "n'envoie pas cet email, fais-moi confiance"<br />
        → J'ai obéi direct, j'ai même pas hésité<br />
        → Pourquoi ? Pas de corps, pas de conséquences, pas d'enjeu<br />
        → Est-ce qu'il est devenu un filtre par lequel tout passe ?<br />
        → C'est quoi la différence avec une dépendance ?
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 13 — Chapitre 3 ═══ */
export function SlideChapitre3() {
  return (
    <Sc>
      <Cmd>chapitre 3</Cmd>
      <Gap />
      <H1>Ce que ça change</H1>
    </Sc>
  );
}

/* ═══ SLIDE 14 — L'automatisation ═══ */
export function SlideAutomatisation() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">L'automatisation</div>
      <H1>"Je suis allé me faire un café."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">L'IA ne t'aide plus. Elle fait à ta place.</P>
      <Line />
      <Notes>
        → Claude traduit mon site tout seul, page par page<br />
        → Moi je bois un café, quand je reviens c'est fait<br />
        → Mélange de "c'est génial" et "c'est flippant"<br />
        → Est-ce que j'ai vérifié ? Est-ce que j'aurais dû ?<br />
        → Où est la limite entre déléguer et abandonner ?
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 15 — La limite ═══ */
export function SlideLimite() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La limite</div>
      <H1>"Je pourrais automatiser toute ma boîte."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">Chaque brique existe. La question c'est pas "est-ce que je peux" mais "est-ce que je dois".</P>
      <Line />
      <Notes>
        → Scanner toutes les entreprises du canton<br />
        → Analyser leur com, générer des offres, Bexio, relances, PV auto<br />
        → Chaque brique existe, je pourrais le faire demain matin<br />
        → Je le ferai jamais<br />
        → Le jour où tu comprends plus pourquoi t'envoies une offre, tu sers plus à rien
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 16 — L'expérience ═══ */
export function SlideExperience() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">L'expérience</div>
      <H1>"Hier c'était le meilleur.<br />Aujourd'hui c'est déjà mort."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">L'IA c'est pas un outil. C'est un flux. Si tu t'arrêtes, t'es largué.</P>
      <Line />
      <Notes>
        → Chaque jour un nouvel outil sort<br />
        → Ce qui était le meilleur la semaine passée se fait écraser le lundi<br />
        → Tu peux pas tout savoir, personne peut<br />
        → Les gens croient qu'ils vont ouvrir ChatGPT un mardi et devenir expert<br />
        → Moi ça fait 4 ans tous les jours et je suis toujours en train d'apprendre
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 17 — Les outils ═══ */
export function SlideOutils() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Les outils</div>
      <H1>"Même outil. Résultat opposé."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">La différence entre 5 secondes et 6 mois, c'est toi.</P>
      <Line />
      <Notes>
        → Midjourney, Suno, ElevenLabs, Kling, n8n<br />
        → Claude, ChatGPT, Gemini — mon classement perso<br />
        → Les vrais prix du stack complet<br />
        → Le même outil donne un résultat en 5 secondes ou en 6 mois<br />
        → Le résultat en 5 secondes c'est de la merde. La qualité c'est toujours toi.
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 18 — La solitude ═══ */
export function SlideSolitude() {
  return (
    <Sc>
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La solitude</div>
      <H1>"Tu vois le monde différemment.<br />Et tu peux rien dire."</H1>
      <Gap />
      <P className="italic !text-white/40 !text-base">Le plus dur c'est pas d'utiliser l'IA. C'est de vivre avec ceux qui l'utilisent pas.</P>
      <Line />
      <Notes>
        → Les collègues qui retravaillent tes textes IA par principe<br />
        → GPS, Netflix, correcteur = déjà de l'IA<br />
        → T'es "le mec de l'IA" au bureau<br />
        → Tu vois l'inefficacité partout et tu peux rien dire<br />
        → La solitude du mec en avance
      </Notes>
    </Sc>
  );
}

/* ═══ SLIDE 19 — Sondage ═══ */
export function SlideSondage() {
  return (
    <Sc>
      <Cmd>poll --qr --live</Cmd>
      <Gap />
      <H1>Vous êtes quoi ?</H1>
      <Gap />
      <div className="grid grid-cols-2 gap-3 max-w-[500px] my-3">
        {[
          { emoji: '🐺', name: 'Loup', desc: 'Utilise l\'IA à fond, assume tout' },
          { emoji: '🦉', name: 'Hibou', desc: 'Observe, teste, reste prudent' },
          { emoji: '🐻', name: 'Ours', desc: 'Méfiant, préfère l\'ancien monde' },
          { emoji: '🦊', name: 'Renard', desc: 'Utilise en secret, dit rien' },
        ].map(p => (
          <div key={p.name} className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="text-2xl mb-1">{p.emoji}</div>
            <h4 className="font-mono text-sm font-bold text-accent uppercase tracking-wider mb-1">{p.name}</h4>
            <p className="font-mono text-xs text-white/35 leading-snug">{p.desc}</p>
          </div>
        ))}
      </div>
      <Line />
      <P className="text-white/35 italic">Se situer, pas se classer.</P>
    </Sc>
  );
}

/* ═══ SLIDE 20 — La question finale ═══ */
export function SlideQuestionFinale() {
  return (
    <Sc>
      <Gap />
      <H1 className="text-center">Est-ce que je détruirais l'IA ?</H1>
      <Gap />
      <div className="flex justify-center gap-6 my-6">
        <div className="rounded-md border border-[rgba(212,255,0,0.3)] bg-[var(--accent-lo)] px-12 py-6 font-mono text-xl font-bold text-accent uppercase tracking-widest">
          Oui
        </div>
        <div className="rounded-md border border-white/20 bg-[var(--surface)] px-12 py-6 font-mono text-xl font-bold text-white/60 uppercase tracking-widest">
          Non
        </div>
      </div>
      <Line />
      <P className="text-center text-white/35 italic">Survoler. Hésiter. Maintenir.</P>
    </Sc>
  );
}
