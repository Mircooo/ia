let ctx: AudioContext | null = null;
let master: GainNode | null = null;

export function initAudio(): boolean {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.06;
    master.connect(ctx.destination);
    return true;
  } catch {
    return false;
  }
}

export function tick(): void {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(800 + Math.random() * 120, t);
  g.gain.setValueAtTime(0.08, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + 0.06);
}

export function hasAudio(): boolean {
  return ctx !== null;
}
