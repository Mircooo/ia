export const COLORS = {
  ACCENT: '#D4FF00',
  BG: '#060709',
  TXT: 'rgba(255,255,255,0.90)',
  SUB: 'rgba(255,255,255,0.60)',
  DIM: 'rgba(255,255,255,0.35)',
  MUTED: 'rgba(255,255,255,0.15)',
  AMBER: '#ffb700',
  GREEN: '#4af626',
} as const;

export const Z_LAYERS = {
  BG: 0,
  GRID: 1,
  CONTENT: 10,
  HUD: 100,
  BOOT: 200,
} as const;

export const TIMER = {
  TOTAL_MS: 45 * 60 * 1000,
  SECTIONS: 20,
  CHAPTER_DURATION_MS: 15_000,
  CHAPTER_INDICES: [2, 7, 12] as readonly number[],
} as const;
