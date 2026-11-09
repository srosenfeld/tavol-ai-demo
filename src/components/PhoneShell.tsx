import type { ReactNode } from 'react';
import { Lockup } from './Logo';
import { useDemo } from '../state/demoStore';

export function DemoChrome({ children }: { children: ReactNode }) {
  const { stages, current, goToStage, reset, state } = useDemo();
  const visibleStages = stages.filter((s) => s.id <= 7 && s.depth !== 'skip');

  return (
    <div className="demo-root">
      <div className="demo-chrome">
        <header className="demo-header">
          <div className="demo-brand">
            <Lockup className="lockup-sm" />
            <small>Journey demo · 3.0</small>
          </div>
          <div className="demo-actions">
            <button type="button" className="ghost-btn" onClick={reset}>
              Reset
            </button>
          </div>
        </header>
        <div className="stage-stepper" role="navigation" aria-label="Stages">
          {visibleStages.map((s) => {
            const unlocked = state.setupComplete || s.id <= current.stage;
            const isCurrent = s.id === current.stage;
            return (
              <button
                key={s.id}
                type="button"
                className={`stage-dot ${unlocked ? 'on' : ''} ${isCurrent ? 'current' : ''}`}
                disabled={!unlocked}
                onClick={() => unlocked && goToStage(s.id)}
              >
                {s.id}. {s.name}
              </button>
            );
          })}
        </div>
        <div className="phone-shell">
          <div className="phone-screen">{children}</div>
        </div>
      </div>
    </div>
  );
}
