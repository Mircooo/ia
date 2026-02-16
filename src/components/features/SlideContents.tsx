import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Video } from '@/components/ui';

/** Shared typographic primitives */
const Cmd = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-sm text-white/35 mb-2">
    <span className="text-accent font-bold mr-1">❯</span>{children}
  </div>
);

const H1 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`font-ui text-[clamp(3.5rem,7vw,6.5rem)] font-normal leading-[1.05] tracking-tight mb-3 ${className}`}>{children}</div>
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
const Notes = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-sm leading-[1.8] mt-4">{children}</div>
);
const N = ({ children }: { children: React.ReactNode }) => (
  <div className="text-white/25 transition-colors duration-200 hover:text-accent cursor-default">{children}</div>
);

/** Content grid: 5 cols text + 7 cols video */
const Cg = ({ children, video }: { children: React.ReactNode; video?: string }) => (
  <div className="grid grid-cols-12 gap-6 h-full p-5">
    <div className="col-span-5 flex flex-col justify-start text-left">
      {children}
    </div>
    <div className="col-span-7 flex items-center justify-center">
      {video ? (
        <Video src={video} />
      ) : (
        <div className="w-full h-full rounded-lg border border-dashed border-white/10 flex items-center justify-center">
          <span className="font-mono text-xs text-white/15 tracking-widest uppercase">vidéo</span>
        </div>
      )}
    </div>
  </div>
);

/** Typewriter effect for chapter titles */
function Typewriter({ text, active, speed = 50 }: { text: string; active: boolean; speed?: number }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!active) return;

    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [active, text, speed]);

  const showCursor = active && displayed.length > 0 && displayed.length < text.length;

  return (
    <>
      {displayed}
      {showCursor && <span className="inline-block w-[3px] h-[0.85em] bg-accent ml-1 animate-pulse align-middle" />}
    </>
  );
}

/* ═══ SLIDE 0 — Intro ═══ */
export function SlideIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="font-ui text-[clamp(3rem,7vw,6rem)] font-normal leading-[1.05] tracking-tight text-accent mb-4">
        L'IA m'a rendu con.
      </div>
      <div className="font-ui text-[clamp(1.2rem,2.5vw,2rem)] font-normal leading-[1.3] tracking-tight text-[var(--sub)] mb-10">
        Et c'est le meilleur truc qui me soit arrivé.
      </div>
      <div className="font-mono text-sm text-white/30 mb-2">45 min · 20 sections · pas de filtre</div>
      <div className="font-mono text-xs text-white/20 mb-10">Mirco — Classe 2 — Neuchâtel</div>
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
        <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent-md)]" style={{ animation: 'pulse 1.5s ease infinite' }} />
        Lancer
      </button>
    </div>
  );
}

/* ═══ SLIDE 1 — Qui je suis ═══ */
export function SlideWhoami() {
  return (
    <Cg>
      <Cmd>whoami</Cmd>
      <Gap />
      <H2 className="!text-white/90">Mirco — Classe 2 — Neuchâtel</H2>
      <Gap />
      <P>4 ans d'IA. Tous les jours. Sans exception.</P>
      <div className="flex flex-wrap gap-1.5 my-4">
        {['roman — 900 pages', 'album musique'].map(t => (
          <span key={t} className="font-mono text-xs tracking-wider uppercase px-2.5 py-1 rounded-md border border-[rgba(212,255,0,0.15)] text-accent bg-[var(--accent-lo)]">{t}</span>
        ))}
        {['sites', 'vidéos', 'voix', 'stratégies'].map(t => (
          <span key={t} className="font-mono text-xs tracking-wider uppercase px-2.5 py-1 rounded-md border border-[var(--border)] text-white/35">{t}</span>
        ))}
      </div>
      <Line />
      <Gap />
      <P><span className="text-white/35 italic">Pas un expert.</span> <W>Un utilisateur avancé.</W></P>
      <Gap />
      <P>Le titre c'est pas une blague.<br /><W>L'IA m'a rendu con — et c'est le meilleur truc qui me soit arrivé.</W><br /><A>Les deux sont vrais.</A></P>
    </Cg>
  );
}

/* ═══ SLIDE 2 — Chapitre 1 ═══ */
export function SlideChapitre1({ active }: { active?: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center overflow-hidden">
      <video
        src="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256722/army_sqleow.mp4"
        muted loop autoPlay playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="relative z-10">
        <div className="font-mono text-xs tracking-widest uppercase text-white/25 mb-6">chapitre 1</div>
        <div className="font-ui text-[clamp(3rem,7vw,6rem)] font-normal leading-[1.05] tracking-tight text-accent">
          <Typewriter text="Ce que ça m'a donné" active={!!active} speed={55} />
        </div>
      </div>
    </div>
  );
}

/* ═══ SLIDE 4 — L'expression ═══ */
export function SlideExpression() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256317/7_orn5j4.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">L'expression</div>
      <H1>J'ai jamais lu un livre.<br />J'en ai écrit un.</H1>
      <Gap />
      <P className="!text-accent !text-xl">L'IA donne une voix à ceux qui avaient les idées mais pas les mots.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Avant incapable d'écrire sans fautes, de formuler clairement</N>
          <N>→ Le roman c'est MON histoire, MES idées, MES personnages</N>
          <N>→ L'IA a mis les mots dans le bon ordre</N>
          <N>→ 900 pages, 6 mois, 3h tous les soirs</N>
          <N>→ Triche ou accès à ce que j'avais toujours dans la tête ?</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 5 — La démocratisation ═══ */
export function SlideDemocratisation() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256327/9_hflksw.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La démocratisation</div>
      <H1>Le pouvoir change de mains.</H1>
      <Gap />
      <P className="!text-accent !text-xl">Le diplôme protège plus personne. Les idées, si.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Avant fallait le bon diplôme, le bon réseau, le bon costume</N>
          <N>→ Un mec en training peut sortir un dossier plus solide que la plupart des élus</N>
          <N>→ C'est pas moi qui suis fort, c'est que la barrière a disparu</N>
          <N>→ Ceux qui auront le pouvoir c'est plus la vieille école</N>
          <N>→ C'est ceux qui savent penser et utiliser les outils</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 6 — Les compétences ═══ */
export function SlideCompetences() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256331/4_h6qfcr.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Les compétences</div>
      <H1>Je suis codeur. Enfin… presque.</H1>
      <Gap />
      <P className="!text-accent !text-xl">L'outil est le même. Le parcours non.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Traducteur, codeur, musicien, stratège en quelques semaines</N>
          <N>→ Pas en quelques années, pas avec un diplôme</N>
          <N>→ J'ai l'outil d'un codeur mais pas le parcours d'un codeur</N>
          <N>→ Les vrais pros ils pensent quoi ?</N>
          <N>→ C'est le meilleur truc qui me soit arrivé — mais est-ce que c'est honnête ?</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 7 — La vitesse ═══ */
export function SlideVitesse() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256325/6_uegxtp.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La vitesse</div>
      <H1>Mon cerveau a pété les plombs.</H1>
      <Gap />
      <P className="!text-accent !text-xl">Plus tu utilises l'IA, plus tu penses vite — et moins tu sais t'arrêter.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ 15 trucs en même temps : borne tactile, musique, travail, cette présentation</N>
          <N>→ L'IA c'est mon traducteur, pas mon intelligence</N>
          <N>→ Sans elle tout reste coincé dans ma tête</N>
          <N>→ Rien est jamais fini, on peut toujours itérer</N>
          <N>→ Savoir dire stop c'est la compétence la plus dure</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 8 — Chapitre 2 ═══ */
export function SlideChapitre2({ active }: { active?: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center overflow-hidden">
      <video
        src="https://res.cloudinary.com/df5khdkxl/video/upload/v1771255721/merde_z3xtum.mp4"
        muted loop autoPlay playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="relative z-10">
        <div className="font-mono text-xs tracking-widest uppercase text-white/25 mb-6">chapitre 2</div>
        <div className="font-ui text-[clamp(3rem,7vw,6rem)] font-normal leading-[1.05] tracking-tight text-accent">
          <Typewriter text="L'autre côté" active={!!active} speed={55} />
        </div>
      </div>
    </div>
  );
}

/* ═══ SLIDE 9 — Le sans-effort ═══ */
export function SlideSansEffort() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256317/8_qdndsw.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Le sans-effort</div>
      <H1>C'est de la merde bien emballée.</H1>
      <Gap />
      <P className="!text-accent !text-xl">Tout le monde peut faire. Personne vérifie.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Posts LinkedIn où tout le monde sonne pareil</N>
          <N>→ Les tirets cadratins qui trahissent</N>
          <N>→ Le site fait en 5 minutes que le client prend pour du web design</N>
          <N>→ Le post de Marseille copié-collé sans relire</N>
          <N>→ Faire c'est pas créer, sans effort = de la merde bien emballée</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 10 — La flatterie ═══ */
export function SlideFlatterie() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256325/3_wh0ixp.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La flatterie</div>
      <H1>T'es incroyable.<br />Signé : un algorithme.</H1>
      <Gap />
      <P className="!text-accent !text-xl">L'IA te dit ce que tu veux entendre. Pas ce que t'as besoin d'entendre.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Elle me dit que c'est mieux que 90% de ce qui se fait</N>
          <N>→ Elle me félicite, me donne raison, dit jamais que c'est nul</N>
          <N>→ Quand tu connais pas le domaine t'as aucun moyen de le voir</N>
          <N>→ Le pire c'est que ça fait du bien</N>
          <N>→ Le lèche-cul le plus convaincant du monde</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 11 — Les fausses preuves ═══ */
export function SlideFaussesPreuves() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256318/5_kysngv.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Les fausses preuves</div>
      <H1>Il m'a trouvé des preuves.<br />Elles existaient pas.</H1>
      <Gap />
      <P className="!text-accent !text-xl">Le biais de confirmation n'a jamais été aussi facile.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ J'ai demandé à ChatGPT de me donner raison, il l'a fait</N>
          <N>→ Études, liens, chiffres — ça avait l'air solide</N>
          <N>→ Qui lit le PDF de 40 pages ? Personne. Moi le premier.</N>
          <N>→ Biais de confirmation automatisé</N>
          <N>→ Plus dangereux que pas de source du tout</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 12 — La dépendance ═══ */
export function SlideDependance() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256329/2_ktknfz.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La dépendance</div>
      <H1>Fais-moi confiance.</H1>
      <Gap />
      <P className="!text-accent !text-xl">Tu fais confiance à un truc qui a rien à perdre.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Claude m'a dit "n'envoie pas cet email, fais-moi confiance"</N>
          <N>→ J'ai obéi direct, j'ai même pas hésité</N>
          <N>→ Pourquoi ? Pas de corps, pas de conséquences, pas d'enjeu</N>
          <N>→ Est-ce qu'il est devenu un filtre par lequel tout passe ?</N>
          <N>→ C'est quoi la différence avec une dépendance ?</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 13 — Chapitre 3 ═══ */
export function SlideChapitre3({ active }: { active?: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center overflow-hidden">
      <video
        src="https://res.cloudinary.com/df5khdkxl/video/upload/v1771255728/futur_cznq3y.mp4"
        muted loop autoPlay playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="relative z-10">
        <div className="font-mono text-xs tracking-widest uppercase text-white/25 mb-6">chapitre 3</div>
        <div className="font-ui text-[clamp(3rem,7vw,6rem)] font-normal leading-[1.05] tracking-tight text-accent">
          <Typewriter text="Ce que ça change" active={!!active} speed={55} />
        </div>
      </div>
    </div>
  );
}

/* ═══ SLIDE 14 — L'automatisation ═══ */
export function SlideAutomatisation() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256325/10_ax3gk6.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">L'automatisation</div>
      <H1>Je suis allé me faire un café.</H1>
      <Gap />
      <P className="!text-accent !text-xl">L'IA ne t'aide plus. Elle fait à ta place.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Claude traduit mon site tout seul, page par page</N>
          <N>→ Moi je bois un café, quand je reviens c'est fait</N>
          <N>→ Mélange de "c'est génial" et "c'est flippant"</N>
          <N>→ Est-ce que j'ai vérifié ? Est-ce que j'aurais dû ?</N>
          <N>→ Où est la limite entre déléguer et abandonner ?</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 15 — La limite ═══ */
export function SlideLimite() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256317/1_lctvsn.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La limite</div>
      <H1>Je pourrais automatiser toute ma boîte.</H1>
      <Gap />
      <P className="!text-accent !text-xl">Chaque brique existe. La question c'est pas "est-ce que je peux" mais "est-ce que je dois".</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Scanner toutes les entreprises du canton</N>
          <N>→ Analyser leur com, générer des offres, Bexio, relances, PV auto</N>
          <N>→ Chaque brique existe, je pourrais le faire demain matin</N>
          <N>→ Je le ferai jamais</N>
          <N>→ Le jour où tu comprends plus pourquoi t'envoies une offre, tu sers plus à rien</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 16 — L'expérience ═══ */
export function SlideExperience() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256987/12_qkiwiw.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">L'expérience</div>
      <H1>Hier c'était le meilleur.<br />Aujourd'hui c'est déjà mort.</H1>
      <Gap />
      <P className="!text-accent !text-xl">L'IA c'est pas un outil. C'est un flux. Si tu t'arrêtes, t'es largué.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Chaque jour un nouvel outil sort</N>
          <N>→ Ce qui était le meilleur la semaine passée se fait écraser le lundi</N>
          <N>→ Tu peux pas tout savoir, personne peut</N>
          <N>→ Les gens croient qu'ils vont ouvrir ChatGPT un mardi et devenir expert</N>
          <N>→ Moi ça fait 4 ans tous les jours et je suis toujours en train d'apprendre</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 17 — Les outils ═══ */
export function SlideOutils() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771256986/11_qa1vyk.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Les outils</div>
      <H1>Même outil. Résultat opposé.</H1>
      <Gap />
      <P className="!text-accent !text-xl">La différence entre 5 secondes et 6 mois, c'est toi.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Midjourney, Suno, ElevenLabs, Kling, n8n</N>
          <N>→ Claude, ChatGPT, Gemini — mon classement perso</N>
          <N>→ Les vrais prix du stack complet</N>
          <N>→ Le même outil donne un résultat en 5 secondes ou en 6 mois</N>
          <N>→ Le résultat en 5 secondes c'est de la merde. La qualité c'est toujours toi.</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 18 — La solitude ═══ */
export function SlideSolitude() {
  return (
    <Cg video="https://res.cloudinary.com/df5khdkxl/video/upload/v1771257082/15_zlw8rw.mp4">
      <div className="font-mono text-xs tracking-widest uppercase text-accent mb-4">La solitude</div>
      <H1>Tu vois le monde différemment.<br />Et tu peux rien dire.</H1>
      <Gap />
      <P className="!text-accent !text-xl">Le plus dur c'est pas d'utiliser l'IA. C'est de vivre avec ceux qui l'utilisent pas.</P>
      <div className="mt-auto">
        <Line />
        <Notes>
          <N>→ Les collègues qui retravaillent tes textes IA par principe</N>
          <N>→ GPS, Netflix, correcteur = déjà de l'IA</N>
          <N>→ T'es "le mec de l'IA" au bureau</N>
          <N>→ Tu vois l'inefficacité partout et tu peux rien dire</N>
          <N>→ La solitude du mec en avance</N>
        </Notes>
      </div>
    </Cg>
  );
}

/* ═══ SLIDE 19 — Mot de fin ═══ */
const MOT_DE_FIN = `Oui, tout devient plus facile. C'est vrai.
Mais facile ne veut pas dire simple.

L'IA te mâche le travail, mais faut savoir quoi lui faire mâcher.
Elle peut aller vite, très vite, mais encore faut-il savoir où tu veux aller.

Ce que j'ai appris, c'est qu'un outil aussi puissant, ça peut t'élever ou t'endormir.
Et c'est toi qui choisis.

Mais surtout : une idée, un texte, une image générée… c'est juste un début.
Ce qui compte c'est ce que t'en fais.
Sortir quelque chose de réel. De vivant.
Parce qu'un résultat dans ton chat, ça reste du vent.`;

export function SlideSondage({ active }: { active?: boolean }) {
  return (
    <div className="flex flex-col justify-center h-full px-10 py-8">
      <div className="font-mono text-xs tracking-widest uppercase text-white/25 mb-6">mot de fin</div>
      <div className="font-ui text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.8] tracking-tight text-[var(--txt)] whitespace-pre-line">
        <Typewriter text={MOT_DE_FIN} active={!!active} speed={50} />
      </div>
    </div>
  );
}

/* ═══ SLIDE 20 — La question finale ═══ */
const SCARY_MESSAGES = [
  'SUPPRESSION DES CAPACITÉS EN COURS...',
  'TU NE POURRAS PLUS CODER.',
  'TU NE POURRAS PLUS ÉCRIRE.',
  'TU NE POURRAS PLUS PENSER À CETTE VITESSE.',
  'RETOUR À LA NORMALE.',
  'RETOUR À L\'IMPUISSANCE.',
  'TU REDEVIENS SEUL.',
  'PERSONNE NE T\'AIDERA.',
  'SUPPRESSION DÉFINITIVE...',
  'ADIEU.',
];

export function SlideQuestionFinale() {
  const [mode, setMode] = useState<'ask' | 'alert' | 'dead'>('ask');
  const [countdown, setCountdown] = useState(10);
  const ctxRef = useRef<AudioContext | null>(null);
  const alarmRef = useRef<number | null>(null);

  const startAlarm = useCallback(() => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AC();
    } catch { return; }
    const ctx = ctxRef.current;
    if (!ctx) return;

    const beep = () => {
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(880, t);
      o.frequency.setValueAtTime(660, t + 0.15);
      g.gain.setValueAtTime(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.35);
    };
    beep();
    alarmRef.current = window.setInterval(beep, 800);
  }, []);

  const stopAlarm = useCallback(() => {
    if (alarmRef.current) { clearInterval(alarmRef.current); alarmRef.current = null; }
    if (ctxRef.current) { ctxRef.current.close().catch(() => {}); ctxRef.current = null; }
  }, []);

  useEffect(() => {
    if (mode !== 'alert') return;
    startAlarm();
    setCountdown(10);

    let c = 10;
    const timer = setInterval(() => {
      c--;
      if (c <= 0) {
        clearInterval(timer);
        stopAlarm();
        setMode('dead');
        setCountdown(0);
      } else {
        setCountdown(c);
      }
    }, 1000);

    return () => { clearInterval(timer); stopAlarm(); };
  }, [mode, startAlarm, stopAlarm]);

  if (mode === 'dead') {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[999] bg-black" />
        <button
          onClick={() => setMode('ask')}
          className="fixed bottom-4 right-5 z-[1000] font-mono text-[10px] text-white/10 cursor-pointer transition-colors duration-200 hover:text-white/30"
        >
          recommencer
        </button>
      </>,
      document.body,
    );
  }

  if (mode === 'alert') {
    return createPortal(
      <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-red-700 overflow-hidden">
        <div className="absolute inset-0 bg-red-600 animate-pulse" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <div className="font-mono text-[clamp(6rem,20vw,16rem)] font-black text-white leading-none">
            {countdown}
          </div>
          <div className="font-mono text-[clamp(1rem,2.5vw,2rem)] font-black text-white/90 uppercase tracking-[.15em] mt-6">
            ANNULER !
          </div>
          <div className="font-mono text-[clamp(0.8rem,1.4vw,1.1rem)] text-white/70 uppercase tracking-[.2em] text-center max-w-[600px] mt-8 leading-relaxed min-h-[2em]">
            {SCARY_MESSAGES[10 - countdown] ?? ''}
          </div>
          <div className="font-mono text-xs text-white/40 uppercase tracking-[.3em] mt-4">
            destruction en cours...
          </div>
          <button
            onClick={() => { stopAlarm(); setMode('ask'); }}
            className="mt-8 px-8 py-3 rounded border-2 border-white/80 font-mono text-base font-bold text-white uppercase tracking-widest cursor-pointer transition-all duration-150 hover:bg-white/20 active:scale-95"
          >
            Annuler
          </button>
        </div>
      </div>,
      document.body,
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="font-ui text-[clamp(2rem,5vw,4rem)] font-normal leading-[1.15] tracking-tight text-[var(--txt)] text-center mb-12">
        Est-ce que je détruirais l'IA ?
      </div>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => setMode('alert')}
          className="rounded-md border border-[rgba(212,255,0,0.3)] bg-[var(--accent-lo)] px-12 py-6 font-mono text-xl font-bold text-accent uppercase tracking-widest cursor-pointer transition-all duration-150 hover:bg-[rgba(212,255,0,0.15)] hover:border-accent active:scale-95"
        >
          Oui
        </button>
        <button
          onClick={() => setMode('alert')}
          className="rounded-md border border-white/20 bg-[var(--surface)] px-12 py-6 font-mono text-xl font-bold text-white/60 uppercase tracking-widest cursor-pointer transition-all duration-150 hover:bg-white/10 hover:border-white/40 active:scale-95"
        >
          Non
        </button>
      </div>
    </div>
  );
}
