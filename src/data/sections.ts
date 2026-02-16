import type { Section } from '@/types';

export const SECTIONS: Section[] = [
  // Prologue
  { title: 'Intro', layout: 'default', meta: 'en attente.' },
  { title: 'Qui je suis', layout: 'default', meta: 'ils ne savent pas encore où tu les emmènes.' },

  // Chapitre 1
  { title: 'Ce que ça m\'a apporté', layout: 'chapter', meta: '' },
  { title: 'L\'expression', layout: 'default', meta: 'c\'est ton histoire. raconte-la.' },
  { title: 'La démocratisation', layout: 'default', meta: 'là tu ouvres une porte.' },
  { title: 'Les compétences', layout: 'default', meta: 'honnêteté.' },
  { title: 'La vitesse', layout: 'default', meta: 'respire.' },

  // Chapitre 2
  { title: 'L\'autre côté', layout: 'chapter', meta: '' },
  { title: 'Le sans-effort', layout: 'default', meta: 'tape là où ça fait mal.' },
  { title: 'La flatterie', layout: 'default', meta: 'le piège se referme.' },
  { title: 'Les fausses preuves', layout: 'default', meta: 'ça refroidit.' },
  { title: 'La dépendance', layout: 'default', meta: 'le moment le plus personnel.' },

  // Chapitre 3
  { title: 'Ce que ça change', layout: 'chapter', meta: '' },
  { title: 'L\'automatisation', layout: 'default', meta: 'le vertige.' },
  { title: 'La limite', layout: 'default', meta: 'montre que tu connais les limites.' },
  { title: 'L\'expérience', layout: 'default', meta: 'rappelle-leur que c\'est un marathon.' },
  { title: 'Les outils', layout: 'default', meta: 'montre. ne raconte pas.' },
  { title: 'La solitude', layout: 'default', meta: 'laisse le silence.' },

  // Épilogue
  { title: 'Mot de fin', layout: 'default', meta: 'laisse résonner.' },
  { title: 'La question finale', layout: 'default', meta: 'fin de transmission.' },
];

export interface NavGroup {
  label: string;
  items: number[];
  chapterIndex?: number;
}

export const NAV_GROUPS: NavGroup[] = [
  { label: 'Prologue', items: [0, 1] },
  { label: 'Ce que ça m\'a apporté', items: [3, 4, 5, 6], chapterIndex: 2 },
  { label: 'L\'autre côté', items: [8, 9, 10, 11], chapterIndex: 7 },
  { label: 'Ce que ça change', items: [13, 14, 15, 16, 17], chapterIndex: 12 },
  { label: 'Épilogue', items: [18, 19] },
];

export const BOOT_LINES = [
  { text: 'CONF:IA v8.0 — presentation system', cls: 'bright', delay: 0 },
  { text: 'mirco@classe2 — 2026', cls: '', delay: 70 },
  { text: '', cls: '', delay: 25 },
  { text: 'renderer              [OK]', cls: 'ok', delay: 80 },
  { text: 'audio                 [OK]', cls: 'ok', delay: 60 },
  { text: 'modules               [OK]', cls: 'ok', delay: 90 },
  { text: '20 sections × ~2:15   [OK]', cls: 'ok', delay: 70 },
  { text: '', cls: '', delay: 25 },
  { text: '⚠ sycophancy_filter = off', cls: 'warn', delay: 120 },
  { text: '⚠ tolerance = 0', cls: 'warn', delay: 90 },
  { text: '', cls: '', delay: 25 },
  { text: 'nominal.', cls: 'ok', delay: 130 },
  { text: 'READY', cls: 'bright', delay: 180 },
];
