import type { ReactNode } from 'react';
import { Lockup } from './Logo';
import { useDemo } from '../state/demoStore';

export function DemoChrome({ children }: { children: ReactNode }) {
  const { stages, current, goToStage, reset, state } = useDemo();
  const visibleStages = stages.filter((s) => s.id <= 7 && s.depth !== 'skip');

  return (
    <div className="demo-root">
      <aside className="demo-sidebar">
        <div className="demo-brand">
          <Lockup className="lockup-sm" />
          <small>Demo · 3.0</small>
        </div>
        <nav className="stage-stepper" aria-label="Stages">
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
                <span className="stage-num">{s.id}</span>
                <span className="stage-name">{s.name}</span>
              </button>
            );
          })}
        </nav>
        <button type="button" className="ghost-btn sidebar-reset" onClick={reset}>
          Reset demo
        </button>
      </aside>

      <div className="demo-stage">
        <div className="phone-shell">
          <div className="phone-screen">{children}</div>
        </div>
      </div>
    </div>
  );
}
