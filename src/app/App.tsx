import { useState, useCallback } from 'react';
import { SECTIONS } from '@/data';
import { useTimer, useKeyboard } from '@/hooks';
import { initAudio, tick, hasAudio } from '@/utils';
import { Background } from '@/components/ui';
import { Header, Stepper, TimerBar, NavPanel, BottomBar, Stage } from '@/components/layout';
import {
  BootScreen, Slide,
  SlideIntro, SlideCoupure, SlideWhoami, SlideNormal,
  SlideMerde, SlidePervers, SlideOutils, SlideFantasme,
  SlideCon, SlidePourtant,
} from '@/components/features';

const SLIDE_COMPONENTS = [
  null, // Intro handled separately
  SlideCoupure,
  SlideWhoami,
  SlideNormal,
  SlideMerde,
  SlidePervers,
  SlideOutils,
  SlideFantasme,
  SlideCon,
  SlidePourtant,
];

export default function App() {
  const [booted, setBooted] = useState(false);
  const [current, setCurrent] = useState(0);
  const timer = useTimer(current);

  const goTo = useCallback((i: number) => {
    if (i < 0 || i >= SECTIONS.length || i === current) return;
    setCurrent(i);
    if (timer.paused) timer.resume();
    if (hasAudio()) tick();
  }, [current, timer]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  const handleStart = useCallback(() => {
    initAudio();
    timer.start();
    goTo(1);
  }, [timer, goTo]);

  useKeyboard({
    enabled: booted,
    onNext: goNext,
    onPrev: goPrev,
    onPause: timer.togglePause,
  });

  const meta = SECTIONS[current]?.meta ?? '';

  return (
    <>
      <Background />

      {!booted && <BootScreen onComplete={() => setBooted(true)} />}

      <div className={`fixed inset-0 z-10 flex flex-col transition-opacity duration-500 ${booted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Header current={current} total={SECTIONS.length} />
        <Stepper total={SECTIONS.length} current={current} onGo={goTo} />
        <TimerBar
          formatted={timer.formatted}
          pct={timer.pct}
          paused={timer.paused}
          sectionStatus={timer.sectionStatus}
          onTogglePause={timer.togglePause}
          total={SECTIONS.length}
        />

        {/* Main: Nav + Stage */}
        <div className="flex-1 grid grid-cols-[220px_1fr] gap-2 px-4 min-h-0">
          <NavPanel
            sections={SECTIONS}
            current={current}
            meta={meta}
            onGo={goTo}
          />
          <Stage>
            {/* Slide 0: Intro */}
            <Slide active={current === 0}>
              <SlideIntro onStart={handleStart} />
            </Slide>

            {/* Slides 1-9 */}
            {SLIDE_COMPONENTS.map((Comp, i) => {
              if (i === 0 || !Comp) return null;
              return (
                <Slide key={i} active={current === i}>
                  <Comp />
                </Slide>
              );
            })}
          </Stage>
        </div>

        <BottomBar
          onNext={goNext}
          onPrev={goPrev}
          onPause={timer.togglePause}
          paused={timer.paused}
        />
      </div>
    </>
  );
}
