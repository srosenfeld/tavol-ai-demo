import { ArrowRight, Building2, TriangleAlert } from 'lucide-react';
import { AppBar, Btn, Chip, HigNote, Progress, Screen, SousBubble, StatusBar, Toggle } from '../components/ui';
import { useDemo } from '../state/demoStore';

export function OfficeTeamScreen() {
  const { goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Office" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Continue</Btn>}>
        <h1 className="h sm">Brightline Studio office</h1>
        <HigNote title="Size classes">
          On iPad and Mac the tab bar becomes a sidebar and the order view shows team and budget side by side. Same
          features in every size.
        </HigNote>
        <div
          className="mcard"
          style={{ marginBottom: 4 }}
          role="img"
          aria-label="Brightline Studio office"
        >
          <div
            className="hero"
            style={{
              height: 96,
              backgroundImage: 'url(/brand/office.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div className="fld">
          <label>Office address</label>
          <div className="inp">
            <Building2 size={16} aria-hidden="true" />
            <span>2 Greenwich Office Park</span>
          </div>
        </div>
        <div className="lbl">Add people</div>
        <div className="chips">
          <Chip on>
            ✓ Google Workspace
          </Chip>
          <Chip>Paste emails</Chip>
          <Chip>Upload CSV</Chip>
          <Chip>Slack</Chip>
        </div>
        <div className="pcard row sp">
          <div>
            <b style={{ fontSize: 13 }}>24 people found</b>
            <div className="tiny">Engineering, Design, Ops</div>
          </div>
          <div className="avs">
            <span className="av sm" style={{ ['--c' as string]: 'var(--sorrel)' }}>
              A
            </span>
            <span className="av sm" style={{ ['--c' as string]: 'var(--tomato)' }}>
              P
            </span>
            <span className="av sm" style={{ ['--c' as string]: 'var(--blueberry)' }}>
              N
            </span>
            <span className="av sm" style={{ ['--c' as string]: 'var(--ink-3)' }}>
              +21
            </span>
          </div>
        </div>
        <div className="lbl">How often</div>
        <div className="chips">
          <Chip on>Tue lunch</Chip>
          <Chip on>Thu lunch</Chip>
          <Chip>Friday breakfast</Chip>
          <Chip>Ad hoc</Chip>
        </div>
      </Screen>
    </>
  );
}

export function OfficeBudgetScreen() {
  const { goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Office" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Save rules</Btn>}>
        <h1 className="h sm">Budget and rules</h1>
        <div className="pcard">
          <div className="row sp">
            <b style={{ fontSize: 13 }}>Per person, per meal</b>
            <span className="price" style={{ fontSize: 20 }}>
              $22
            </span>
          </div>
          <div className="slider">
            <i style={{ width: '44%', background: 'var(--tomato)' }} />
            <b style={{ left: '44%', borderColor: 'var(--tomato)' }} />
          </div>
          <div className="ticks">
            <span>$10</span>
            <span>$25</span>
            <span>$40</span>
          </div>
        </div>
        <div className="list">
          <div>
            <div className="grow">
              <b style={{ fontSize: 13 }}>Monthly budget</b>
              <div className="tiny">$4,200. Alerts at 80%</div>
            </div>
          </div>
          <div>
            <div className="grow">
              <b style={{ fontSize: 13 }}>Include tax, tip and fees</b>
            </div>
            <Toggle on />
          </div>
          <div>
            <div className="grow">
              <b style={{ fontSize: 13 }}>Approval over cap</b>
              <div className="tiny">Ops lead approves</div>
            </div>
            <Toggle on />
          </div>
          <div>
            <div className="grow">
              <b style={{ fontSize: 13 }}>Payment</b>
              <div className="tiny">DoorDash for Business</div>
            </div>
            <span className="badge blue">Connected</span>
          </div>
        </div>
        <div className="mcpbar">
          <Building2 size={14} />
          <span>DoorDash corporate ordering. Orders need your confirmation</span>
        </div>
      </Screen>
    </>
  );
}

export function OfficeNeedsScreen() {
  const { goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Office" onBack={goBack} />
      <Progress value={progress} />
      <Screen
        footer={
          <Btn variant="gather" onClick={goNext}>
            <ArrowRight /> Plan Tuesday lunch
          </Btn>
        }
      >
        <h1 className="h sm">What the team needs</h1>
        <p className="sub">From 19 of 24 responses. Names hidden from everyone except each person.</p>
        <div className="pcard">
          <div className="row sp">
            <span style={{ fontSize: 13, fontWeight: 700 }}>Vegetarian</span>
            <span className="tiny">7</span>
          </div>
          <div className="bar">
            <i style={{ width: '37%' }} />
          </div>
          <div className="row sp">
            <span style={{ fontSize: 13, fontWeight: 700 }}>Gluten free</span>
            <span className="tiny">3</span>
          </div>
          <div className="bar">
            <i style={{ width: '16%' }} />
          </div>
          <div className="row sp">
            <span style={{ fontSize: 13, fontWeight: 700 }}>Halal</span>
            <span className="tiny">2</span>
          </div>
          <div className="bar">
            <i style={{ width: '11%' }} />
          </div>
        </div>
        <div className="lbl">Strict allergies to plan around</div>
        <div className="chips">
          <Chip sm strict>
            <TriangleAlert size={12} /> Tree nuts (2)
          </Chip>
          <Chip sm strict>
            <TriangleAlert size={12} /> Shellfish (1)
          </Chip>
          <Chip sm strict>
            <TriangleAlert size={12} /> Sesame (1)
          </Chip>
        </div>
        <SousBubble>
          <b>Sous</b> 5 people have not answered yet. I will remind them Monday.
        </SousBubble>
      </Screen>
    </>
  );
}
