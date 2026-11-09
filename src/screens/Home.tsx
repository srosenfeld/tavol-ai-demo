import {
  BookOpen,
  Calendar,
  PartyPopper,
  ShoppingBasket,
  Sparkles,
  Sun,
  UserRound,
  Users,
} from 'lucide-react';
import { AppBar, Btn, Chip, Screen, SousBubble, StatusBar } from '../components/ui';
import { useDemo, type TabId } from '../state/demoStore';

function TabBar({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  const tabs: { id: TabId; label: string; Icon: typeof Sun }[] = [
    { id: 'today', label: 'Today', Icon: Sun },
    { id: 'plan', label: 'Plan', Icon: Calendar },
    { id: 'books', label: 'Books', Icon: BookOpen },
    { id: 'table', label: 'Table', Icon: Users },
    { id: 'you', label: 'You', Icon: UserRound },
  ];
  return (
    <div className="tabbar-wrap">
      <nav className="tabbar" aria-label="Main">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={active === t.id ? 'on' : ''}
            aria-current={active === t.id ? 'page' : undefined}
            onClick={() => onChange(t.id)}
          >
            <t.Icon aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export function HomeScreen() {
  const { state, setField, goToScreen, reset } = useDemo();
  const tab = state.activeTab;

  return (
    <>
      <StatusBar />
      {tab === 'today' ? (
        <>
          <AppBar title="Today" />
          <Screen className="has-tab">
            <h1 className="h sm">Good afternoon, {state.firstName}</h1>
            <p className="sub">Dinner is decided for Saturday. Tonight is still open.</p>
            <SousBubble>
              <b>Sous suggests</b>
              <div style={{ marginTop: 4 }}>
                Sheet-pan chicken from your book fits tonight. Tree-nut free, and Maya can eat the sides.
              </div>
              <div className="chips" style={{ marginTop: 8 }}>
                <Chip on>Cook this tonight</Chip>
                <Chip>Show others</Chip>
              </div>
            </SousBubble>
            <div className="lbl">This week</div>
            <div className="mcard">
              <div
                className="hero"
                style={{
                  backgroundImage: 'url(/brand/party.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: 110,
                }}
              />
              <div className="in">
                <b>Ade&apos;s birthday dinner</b>
                <div className="tiny">Sat 7 pm · Locked · 8 people</div>
                <div className="chips">
                  <Chip sm beet>
                    <PartyPopper size={12} aria-hidden="true" /> Gather
                  </Chip>
                  <Chip sm>Shopping list ready</Chip>
                </div>
              </div>
            </div>
            <div className="pcard row">
              <div
                className="food-thumb"
                style={{
                  ['--tone' as string]: '#C4441F',
                  width: 48,
                  height: 48,
                  backgroundImage: 'url(/brand/sheetpan.jpg)',
                  backgroundSize: 'cover',
                }}
              />
              <div className="grow">
                <b style={{ fontSize: 15 }}>Tonight · open</b>
                <div className="tiny">3 options ready from your usual week</div>
              </div>
              <Btn className="sm" onClick={() => setField('activeTab', 'plan')}>
                Plan
              </Btn>
            </div>
          </Screen>
          <div className="fab-sous">
            <Btn className="glass-tint" aria-label="Ask Sous">
              <Sparkles size={16} aria-hidden="true" /> Ask Sous
            </Btn>
          </div>
        </>
      ) : null}

      {tab === 'plan' ? (
        <>
          <AppBar title="Plan" />
          <Screen className="has-tab">
            <h1 className="h sm">Your week</h1>
            <p className="sub">Tap Saturday dinner to revisit the shared plan.</p>
            <button
              type="button"
              className="pcard"
              style={{ width: '100%', textAlign: 'left', minHeight: 64 }}
              onClick={() => goToScreen('shared-hub')}
            >
              <div className="lbl" style={{ color: 'var(--beet)' }}>
                Saturday · shared
              </div>
              <b>Ade&apos;s birthday</b>
              <div className="tiny">Rigatoni two ways · Locked</div>
            </button>
            <div className="pcard">
              <div className="lbl">Friday</div>
              <b>Colony Grill · hot oil pie</b>
              <div className="tiny">Your weekly habit</div>
            </div>
            <Btn variant="soft" onClick={() => goToScreen('week-grid')}>
              Edit usual week
            </Btn>
          </Screen>
        </>
      ) : null}

      {tab === 'books' ? (
        <>
          <AppBar title="Books" />
          <Screen className="has-tab">
            <div
              className="cover"
              style={{
                background:
                  state.coverColor.includes('beet')
                    ? 'linear-gradient(160deg,#9A3A62,#6E2843)'
                    : state.coverColor,
                minHeight: 140,
              }}
            >
              <div className="t">{state.bookTitle}</div>
              <div className="s">{state.dedication}</div>
            </div>
            <div className="queue">
              {[
                ['Sunday Sauce', '/brand/salsa.jpg'],
                ['Sheet-pan chicken thighs', '/brand/sheetpan.jpg'],
                ['Rosemary focaccia', '/brand/pasta.jpg'],
              ].map(([name, img]) => (
                <div key={name} className="qitem">
                  <img className="thumb" src={img} alt="" />
                  <div className="grow">
                    <b>{name}</b>
                    <div className="tiny">In {state.bookTitle}</div>
                  </div>
                </div>
              ))}
            </div>
            <Btn variant="soft" onClick={() => goToScreen('book-add')}>
              <Sparkles size={14} aria-hidden="true" /> Add more pages
            </Btn>
          </Screen>
        </>
      ) : null}

      {tab === 'table' ? (
        <>
          <AppBar title="Table" />
          <Screen className="has-tab">
            <h1 className="h sm">Okafor table</h1>
            <p className="sub">Household needs and upcoming Gather nights.</p>
            {state.members.map((m) => (
              <div key={m.id} className="pcard row">
                <span className="av" style={{ ['--c' as string]: m.color }} aria-hidden="true">
                  {m.name[0]}
                </span>
                <div className="grow">
                  <b style={{ fontSize: 15 }}>{m.name}</b>
                  <div className="tiny">{m.tags.map((t) => t.label).join(' · ')}</div>
                </div>
              </div>
            ))}
            <Btn variant="gather" onClick={() => goToScreen('shared-hub')}>
              <PartyPopper size={14} aria-hidden="true" /> Open Ade&apos;s birthday
            </Btn>
          </Screen>
        </>
      ) : null}

      {tab === 'you' ? (
        <>
          <AppBar title="You" />
          <Screen className="has-tab">
            <div className="row" style={{ gap: 12 }}>
              <span className="av lg" style={{ ['--c' as string]: 'var(--sorrel)' }} aria-hidden="true">
                {state.firstName[0]}
              </span>
              <div>
                <h1 className="h sm" style={{ fontSize: 22 }}>
                  {state.firstName} {state.lastName}
                </h1>
                <div className="tiny">{state.email}</div>
              </div>
            </div>
            <div className="list">
              <div>
                <ShoppingBasket aria-hidden="true" />
                <div className="grow">
                  <b style={{ fontSize: 15 }}>Instacart</b>
                  <div className="tiny">{state.instacartConnected ? 'Connected' : 'Not connected'}</div>
                </div>
              </div>
              <div>
                <Users aria-hidden="true" />
                <div className="grow">
                  <b style={{ fontSize: 15 }}>Interests</b>
                  <div className="tiny">
                    Recipes {state.interests.rec}, Me {state.interests.me}, Groups {state.interests.grp}, Parties{' '}
                    {state.interests.party}, Office {state.interests.off}
                  </div>
                </div>
              </div>
            </div>
            <Btn variant="sec" onClick={() => goToScreen('interests')}>
              Change interests &amp; path
            </Btn>
            <Btn variant="sec" onClick={reset}>
              Reset demo
            </Btn>
            <p className="tiny" style={{ textAlign: 'center' }}>
              Tavol.ai journey demo · Design System 3.0 · Brand 2.0. No real accounts or payments.
            </p>
          </Screen>
        </>
      ) : null}

      <TabBar active={tab} onChange={(t) => setField('activeTab', t)} />
    </>
  );
}
