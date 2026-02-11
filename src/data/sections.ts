import type { Section } from '@/types';

export const SECTIONS: Section[] = [
  { title: 'Intro', layout: 'default', meta: 'en attente.' },
  { title: 'La coupure', layout: 'default', meta: 'premier silence. ils écoutent.' },
  { title: 'Qui je suis', layout: 'default', meta: 'ils ne savent pas encore où tu les emmènes.' },
  { title: "C'est normal", layout: 'default', meta: 'la routine, c\'est ce qui les rassure. casse-la.' },
  { title: "C'est de la merde", layout: 'default', meta: 'maintenant ils doutent. c\'est exactement là qu\'il faut être.' },
  { title: "C'est pervers", layout: 'split', meta: 'le piège se referme. doucement.' },
  { title: 'Les outils', layout: 'grid', meta: 'montre. ne raconte pas.' },
  { title: 'Le fantasme', layout: 'default', meta: 'le vertige de ce qui est possible.' },
  { title: "L'IA m'a rendu con", layout: 'default', meta: 'la partie qu\'ils attendaient sans le savoir.' },
  { title: 'Et pourtant', layout: 'default', meta: 'fin de transmission.' },
];

export const BOOT_LINES = [
  { text: 'CONF:IA v8.0 — presentation system', cls: 'bright', delay: 0 },
  { text: 'mirco@classe2 — 2026', cls: '', delay: 70 },
  { text: '', cls: '', delay: 25 },
  { text: 'renderer              [OK]', cls: 'ok', delay: 80 },
  { text: 'audio                 [OK]', cls: 'ok', delay: 60 },
  { text: 'modules               [OK]', cls: 'ok', delay: 90 },
  { text: '10 sections × 4:30    [OK]', cls: 'ok', delay: 70 },
  { text: '', cls: '', delay: 25 },
  { text: '⚠ sycophancy_filter = off', cls: 'warn', delay: 120 },
  { text: '⚠ bullshit_tolerance = 0', cls: 'warn', delay: 90 },
  { text: '', cls: '', delay: 25 },
  { text: 'nominal.', cls: 'ok', delay: 130 },
  { text: 'READY', cls: 'bright', delay: 180 },
];
