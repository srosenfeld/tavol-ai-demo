import {
  ArrowRight,
  Bike,
  BookHeart,
  CalendarCheck,
  Check,
  Heart,
  House,
  MessageCircle,
  Salad,
  Send,
  ShoppingBasket,
  Split,
  ThumbsUp,
  TriangleAlert,
  Users,
  Vote,
  X,
} from 'lucide-react';
import { VOTE_OPTIONS } from '../data/seed';
import { AppBar, Btn, Chip, HigNote, Screen, SousBubble, StatusBar, Toggle } from '../components/ui';
import { useDemo } from '../state/demoStore';
import { WeekGrid } from './Stage4';

export function SharedMarkScreen() {
  const { state, cycleWeekCell, setField, goNext, goBack } = useDemo();
  const withList = ['Household', 'Ade', 'Priya'];
  return (
    <>
      <StatusBar />
      <AppBar title="Plan" onBack={goBack} />
      <Screen>
        <h1 className="h sm">This week</h1>
        <HigNote title="Agency">
          Sous drafts the bulk actions; nothing locks, orders or sends invites until the host confirms in a sheet.
        </HigNote>
        <WeekGrid grid={state.weekGrid} onCycle={cycleWeekCell} highlightSatDinner />
      </Screen>
      <div className="sheet-dim" />
      <div className="sheet">
        <div className="grab" />
        <b style={{ fontSize: 15, fontFamily: 'var(--font-display)' }}>Saturday dinner</b>
        <div
          className="pcard row sp"
          style={{ borderColor: 'var(--beet)', background: 'var(--beet-100)' }}
        >
          <div className="row" style={{ gap: 8 }}>
            <Users color="var(--beet)" size={18} />
            <div>
              <b style={{ fontSize: 13, color: 'var(--beet-700)' }}>Enjoyed with others</b>
              <div className="tiny">Turns this meal into a shared plan</div>
            </div>
          </div>
          <Toggle on />
        </div>
        <div className="lbl">Who is coming</div>
        <div className="chips">
          {withList.map((w) => (
            <Chip
              key={w}
              beet
              on={state.sharedWith.includes(w)}
              onClick={() =>
                setField(
                  'sharedWith',
                  state.sharedWith.includes(w)
                    ? state.sharedWith.filter((x) => x !== w)
                    : [...state.sharedWith, w],
                )
              }
            >
              <Check size={12} /> {w}
            </Chip>
          ))}
          <Chip dash>+ Add</Chip>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Btn variant="sec" className="sm grow">
            <House size={14} /> At home
          </Btn>
          <Btn variant="sec" className="sm grow">
            <Bike size={14} /> Order in
          </Btn>
        </div>
        <Btn variant="gather" onClick={goNext}>
          <ArrowRight /> Start shared plan
        </Btn>
      </div>
    </>
  );
}

export function SharedHubScreen() {
  const { goNext, goBack, goToScreen } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar onBack={goBack} />
      <Screen>
        <div className="row sp">
          <div>
            <div className="lbl" style={{ color: 'var(--beet)' }}>
              Saturday dinner. 8 people
            </div>
            <h1 className="h sm">Ade&apos;s birthday</h1>
          </div>
          <div className="avs">
            <span className="av sm" style={{ ['--c' as string]: 'var(--sorrel)' }}>
              D
            </span>
            <span className="av sm" style={{ ['--c' as string]: 'var(--beet)' }}>
              A
            </span>
            <span className="av sm" style={{ ['--c' as string]: 'var(--tomato)' }}>
              P
            </span>
            <span className="av sm" style={{ ['--c' as string]: 'var(--ink-3)' }}>
              +5
            </span>
          </div>
        </div>
        <div className="pcard">
          <div className="lbl" style={{ marginBottom: 6 }}>
            Planning around
          </div>
          <div className="chips">
            <Chip sm strict>
              <TriangleAlert size={12} /> Peanuts
            </Chip>
            <Chip sm strict>
              <TriangleAlert size={12} /> Shellfish
            </Chip>
            <Chip sm on>
              2 vegetarian
            </Chip>
            <Chip sm>Mild for kids</Chip>
          </div>
          <div className="tiny" style={{ marginTop: 6 }}>
            From everyone&apos;s saved profiles. Guests can add theirs.
          </div>
        </div>
        <div className="list">
          <button type="button" onClick={() => goToScreen('shared-vote')}>
            <Vote />
            <div className="grow">
              <b style={{ fontSize: 13 }}>Vote on the menu</b>
              <div className="tiny">5 of 8 voted</div>
            </div>
            <span className="badge beet">Open</span>
          </button>
          <button type="button" onClick={() => goToScreen('shared-ingredients')}>
            <ShoppingBasket />
            <div className="grow">
              <b style={{ fontSize: 13 }}>Ingredients</b>
              <div className="tiny">Who brings what</div>
            </div>
            <span className="badge">Next</span>
          </button>
          <div>
            <MessageCircle />
            <div className="grow">
              <b style={{ fontSize: 13 }}>Chat</b>
              <div className="tiny">Priya: I can do dessert</div>
            </div>
            <span className="badge">3</span>
          </div>
        </div>
        <Btn variant="gather" onClick={goNext}>
          Continue voting
        </Btn>
      </Screen>
    </>
  );
}

export function SharedVoteScreen() {
  const { state, setVote, setField, goNext, goBack } = useDemo();
  const opt = VOTE_OPTIONS[state.voteIndex] ?? VOTE_OPTIONS[0];
  const vote = state.votes[opt.id];

  return (
    <>
      <StatusBar />
      <AppBar title="Vote" onClose={goBack} />
      <Screen>
        <div className="row sp">
          <span className="lbl" style={{ color: 'var(--beet)' }}>
            Main. {state.voteIndex + 1} of {VOTE_OPTIONS.length}
          </span>
          <span className="tiny">Closes Thu 6 pm</span>
        </div>
        <div className="mcard">
          <div
            className="hero"
            style={{
              ['--tone' as string]: opt.tone,
              height: 170,
              backgroundImage: `url(${opt.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            role="img"
            aria-label={opt.name}
          />
          <div className="in">
            <b>{opt.name}</b>
            <div className="tiny">{opt.meta}</div>
            <div className="chips">
              <Chip sm on>
                <Check size={12} /> Fits all 8
              </Chip>
              <Chip sm>{opt.price}</Chip>
            </div>
          </div>
        </div>
        <div className="vote3">
          {(
            [
              ['yum', Heart, 'Yum'],
              ['fine', ThumbsUp, 'Fine'],
              ['pass', X, 'Pass'],
            ] as const
          ).map(([v, Icon, label]) => (
            <button
              key={v}
              type="button"
              className={vote === v ? 'on' : ''}
              onClick={() => {
                setVote(opt.id, v);
                if (state.voteIndex < VOTE_OPTIONS.length - 1) {
                  setTimeout(() => setField('voteIndex', state.voteIndex + 1), 280);
                }
              }}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
        <div className="row sp tiny">
          <span>Yum 4. Fine 2. Pass 0</span>
          <span className="avs">
            <span className="av sm" style={{ ['--c' as string]: 'var(--beet)' }}>
              A
            </span>
            <span className="av sm" style={{ ['--c' as string]: 'var(--tomato)' }}>
              P
            </span>
            <span className="av sm" style={{ ['--c' as string]: 'var(--blueberry)' }}>
              T
            </span>
          </span>
        </div>
        <Btn onClick={goNext} disabled={!vote && state.voteIndex === 0}>
          Next
        </Btn>
      </Screen>
    </>
  );
}

export function SharedIngredientsScreen() {
  const { goNext, goBack } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Ade's birthday" onBack={goBack} />
      <Screen footer={<Btn onClick={goNext}>Ask Sous for help</Btn>}>
        <h1 className="h sm">Ingredients</h1>
        <p className="sub">Vote on swaps. Claim what you will bring.</p>
        <div className="pcard" style={{ padding: '4px 12px' }}>
          <div className="ing">
            <b>Parmesan</b>
            <span className="qty">
              <span className="av sm" style={{ ['--c' as string]: 'var(--tomato)' }}>
                P
              </span>
            </span>
            <div className="sw">
              <span className="chip beet sm">
                <ThumbsUp size={12} /> Keep 5
              </span>
              <span className="chip sm">Vegan parm 1</span>
            </div>
          </div>
          <div className="ing">
            <b>Rigatoni</b>
            <span className="qty">2 lb</span>
            <div className="sw">
              <span className="chip beet sm">
                <ThumbsUp size={12} /> Regular 4
              </span>
              <span className="chip sm">Gluten free 3</span>
            </div>
          </div>
          <div className="ing">
            <b>Bread for the table</b>
            <span className="qty">
              <span className="av sm" style={{ ['--c' as string]: 'var(--beet)' }}>
                A
              </span>
            </span>
            <div className="sw">
              <span className="chip on sm">
                <Check size={12} /> Ade&apos;s focaccia
              </span>
            </div>
          </div>
          <div className="ing">
            <b>Dessert</b>
            <span className="qty">
              <span className="av sm" style={{ ['--c' as string]: 'var(--tomato)' }}>
                P
              </span>
            </span>
            <div className="sw">
              <span className="chip on sm">
                <Check size={12} /> Priya: olive oil cake
              </span>
            </div>
          </div>
        </div>
        <div className="msg">
          <span className="av sm" style={{ ['--c' as string]: 'var(--blueberry)' }}>
            N
          </span>
          <div className="bub">Can we do half gluten free? I can bring it.</div>
        </div>
      </Screen>
    </>
  );
}

export function SharedSousScreen() {
  const { goNext, goBack } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Ade's birthday" onBack={goBack} />
      <Screen
        footer={
          <div className="row" style={{ gap: 8 }}>
            <Btn variant="sec" className="grow">
              Edit
            </Btn>
            <Btn variant="gather" className="grow" onClick={goNext}>
              <Check /> Do all 4
            </Btn>
          </div>
        }
      >
        <h1 className="h sm">Ask Sous</h1>
        <div className="msg me">
          <div className="bub">
            Make the pasta half gluten free, add a salad nobody is allergic to, and send everyone the list of what
            to bring
          </div>
        </div>
        <div className="pcard">
          <div className="lbl" style={{ marginBottom: 6 }}>
            Sous will do 4 things
          </div>
          <div className="cmd">
            <span>
              <Split /> Split rigatoni: 1 lb regular, 1 lb gluten free
            </span>
            <span>
              <Salad /> Add Shaved fennel salad (nut free, shellfish free)
            </span>
            <span>
              <ShoppingBasket /> Update the shared ingredient list
            </span>
            <span>
              <Send /> Text 7 guests their item
            </span>
          </div>
        </div>
        <div className="tiny">Nothing happens until you confirm. Texts are previewed first.</div>
      </Screen>
    </>
  );
}

export function SharedLockedScreen() {
  const { finishSetup } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar onClose={finishSetup} />
      <Screen
        footer={
          <Btn onClick={finishSetup}>
            <ShoppingBasket /> Send list to Instacart
          </Btn>
        }
      >
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <h1 className="h">It&apos;s decided</h1>
          <p className="sub">Saturday, 7 pm at Dana&apos;s</p>
        </div>
        <div className="mcard">
          <div
            className="hero"
            style={{
              ['--tone' as string]: '#9A3A62',
              height: 110,
              backgroundImage: 'url(/brand/party.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            role="img"
            aria-label="Birthday dinner table"
          />
          <div className="in">
            <b>Ade&apos;s birthday dinner</b>
            <div className="tiny">Rigatoni two ways. Fennel salad. Focaccia. Olive oil cake</div>
          </div>
        </div>
        <div className="list">
          <div>
            <CalendarCheck />
            <div className="grow">
              <b style={{ fontSize: 13 }}>Added to 8 calendars</b>
              <div className="tiny">Google and Apple invites sent</div>
            </div>
          </div>
          <div>
            <ShoppingBasket />
            <div className="grow">
              <b style={{ fontSize: 13 }}>Your shopping list</b>
              <div className="tiny">Ready to send to Instacart</div>
            </div>
          </div>
          <div>
            <BookHeart />
            <div className="grow">
              <b style={{ fontSize: 13 }}>Saved to Table Book</b>
              <div className="tiny">Remember what everyone liked</div>
            </div>
          </div>
        </div>
        <SousBubble>
          <b>Sous</b> Want to host again in six weeks? I can nudge you when Saturdays are free.
        </SousBubble>
      </Screen>
    </>
  );
}
