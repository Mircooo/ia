export interface Section {
  title: string;
  layout: 'default' | 'split' | 'grid';
  meta: string;
}

export interface TimerState {
  running: boolean;
  paused: boolean;
  startTime: number | null;
  pauseOffset: number;
  elapsed: number;
}
