import {
  Ban,
  Bike,
  Check,
  ChefHat,
  Ellipsis,
  ExternalLink,
  House,
  Mail,
  Mic,
  ShoppingBasket,
  Sparkles,
  TriangleAlert,
  Type,
  Utensils,
} from 'lucide-react';
import {
  ALLERGIES,
  DAYS,
  DIETS,
  MEAL_KITS,
  MEAL_MODES,
  SLOTS,
  type MealMode,
} from '../data/seed';
import { Mark } from '../components/Logo';
import { AppBar, Btn, Check as CheckBox, Chip, FoodThumb, HigNote, Progress, Screen, SousBubble, StatusBar, Toggle } from '../components/ui';
import { useDemo } from '../state/demoStore';

const MODE_ICONS = [House, ChefHat, Bike, Utensils, Ellipsis];

function WeekGrid({
  grid,
  onCycle,
  highlightSatDinner,
}: {
  grid: MealMode[];
  onCycle: (i: number) => void;
  highlightSatDinner?: boolean;
}) {
  return (
    <div className="mini-cal">
      <span />
      {DAYS.map((d, i) => (
        <span key={`${d}-${i}`} className="hd">
          {d}
        </span>
      ))}
      {SLOTS.flatMap((slot, si) => {
        const row = [
          <span key={`rl-${slot}-${si}`} className="rl">
            {slot}
          </span>,
        ];
        DAYS.forEach((_, di) => {
          const idx = si * 7 + di;
          const mode = grid[idx] ?? 0;
          const meta = MEAL_MODES[mode];
          const Icon = MODE_ICONS[mode];
          const isSatDinner = highlightSatDinner && si === 2 && di === 5;
          row.push(
            <button
              key={idx}
              type="button"
              className={`cell ${meta.cls}${isSatDinner ? ' m-with' : ''}`}
              aria-label={`${slot} ${DAYS[di]}: ${meta.label}`}
              onClick={() => onCycle(idx)}
            >
              <Icon />
            </button>,
          );
        });
        return row;
      })}
    </div>
  );
}

export function WeekGridScreen() {
  const { state, cycleWeekCell, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Just me" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Looks like my week</Btn>}>
        <h1 className="h sm">Your usual week</h1>
        <p className="sub">Tap a meal to change it. Rough is fine. This just tells Sous where your food comes from.</p>
        <HigNote title="Layout">
          The week grid groups by day, with the next meal at top leading. Details open with progressive disclosure, not
          on the grid.
        </HigNote>
        <WeekGrid grid={state.weekGrid} onCycle={cycleWeekCell} />
        <div className="chips" style={{ gap: 4 }}>
          {MEAL_MODES.map((m) => {
            const Icon = MODE_ICONS[m.id];
            return (
              <span key={m.id} className={`chip sm ${m.cls}`} style={{ border: 0 }}>
                <Icon size={12} /> {m.label}
              </span>
            );
          })}
        </div>
      </Screen>
    </>
  );
}

export function WeekCookScreen() {
  const { state, setField, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Just me" onBack={goBack} />
      <Progress value={progress} />
      <Screen
        footer={
          <Btn onClick={goNext}>
            <Sparkles /> Turn these into recipes
          </Btn>
        }
      >
        <h1 className="h sm">What do you usually cook?</h1>
        <p className="sub">Type like you would text a friend. Sous handles the rest.</p>
        <div className="chips">
          <Chip sm on>
            <Check size={12} /> Lunch: leftovers, big salads
          </Chip>
        </div>
        <div className="pcard">
          <div className="row sp">
            <b style={{ fontSize: 13 }}>Breakfast at home</b>
            <span className="tiny">5 days</span>
          </div>
          <div className="inp area" style={{ marginTop: 6 }}>
            <textarea
              rows={2}
              value={state.breakfastText}
              onChange={(e) => setField('breakfastText', e.target.value)}
            />
          </div>
        </div>
        <div className="pcard">
          <div className="row sp">
            <b style={{ fontSize: 13 }}>Dinner at home</b>
            <span className="tiny">4 days</span>
          </div>
          <div className="inp area focus" style={{ marginTop: 6 }}>
            <textarea
              rows={3}
              value={state.dinnerText}
              onChange={(e) => setField('dinnerText', e.target.value)}
            />
          </div>
        </div>
        <div className="row tiny" style={{ gap: 6 }}>
          <Mic size={14} color="var(--saffron-700)" /> Hold the mic on the keyboard to say it instead
        </div>
      </Screen>
    </>
  );
}

export function WeekApproveScreen() {
  const { state, toggleRecipe, goNext, goBack, progress } = useDemo();
  const selected = state.suggestedRecipes.filter((r) => r.selected).length;
  return (
    <>
      <StatusBar />
      <AppBar title="Review" onBack={goBack} />
      <Progress value={progress} />
      <Screen
        footer={
          <Btn onClick={goNext}>
            <Check /> Add {selected} to my book
          </Btn>
        }
      >
        <h1 className="h sm">Sous found 5 recipes</h1>
        <p className="sub">Check the ones to add. Tap one for details.</p>
        <div className="queue">
          {state.suggestedRecipes.map((r) => (
            <div key={r.id} className="qitem">
              <FoodThumb tone={r.tone} src={r.image} alt="" />
              <div className="grow">
                <b>{r.name}</b>
                <div className="tiny">{r.meta}</div>
              </div>
              {r.status === 'linked' ? <span className="badge ok">Linked</span> : null}
              {r.status === 'new' ? <span className="badge ai">New</span> : null}
              <CheckBox on={!!r.selected} onClick={() => toggleRecipe(r.id)} />
            </div>
          ))}
        </div>
        <SousBubble>
          <b>Sous</b> Sunday Sauce was already in your book, so I linked it.
        </SousBubble>
      </Screen>
    </>
  );
}

export function WeekStoresScreen() {
  const { state, toggleStore, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Just me" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Continue</Btn>}>
        <h1 className="h sm">Where do you shop?</h1>
        <p className="sub">Near 06830. Helps with prices and stock.</p>
        <div className="map-box">
          <span className="you" style={{ left: '44%', top: '46%' }} />
          <span className="pin" style={{ left: '20%', top: '22%', ['--c' as string]: 'var(--sorrel)' }}>
            1
          </span>
          <span className="pin" style={{ left: '64%', top: '18%', ['--c' as string]: 'var(--sorrel)' }}>
            2
          </span>
          <span className="pin" style={{ left: '76%', top: '60%', ['--c' as string]: 'var(--ink-3)' }}>
            3
          </span>
          <span className="pin" style={{ left: '30%', top: '66%', ['--c' as string]: 'var(--ink-3)' }}>
            4
          </span>
        </div>
        <div className="list">
          {state.stores.map((s) => (
            <button key={s.id} type="button" onClick={() => toggleStore(s.id)}>
              <div className="store grow">
                <span className="lg-ic" style={{ background: s.color }}>
                  {s.letter}
                </span>
                <div>
                  <b style={{ fontSize: 13 }}>{s.name}</b>
                  <div className="tiny">{s.meta}</div>
                </div>
              </div>
              <CheckBox on={s.selected} />
            </button>
          ))}
        </div>
      </Screen>
    </>
  );
}

export function WeekKitsScreen() {
  const { state, setField, toggleKit, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Just me" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Continue</Btn>}>
        <div className="lbl">Meal kits you use</div>
        <div className="chips">
          {MEAL_KITS.map((k) => (
            <Chip key={k} on={state.mealKits.includes(k)} onClick={() => toggleKit(k)}>
              {state.mealKits.includes(k) ? <Check size={12} /> : null} {k}
            </Chip>
          ))}
          <Chip dash>None</Chip>
        </div>
        <SousBubble>
          <b>Sous</b> Turn on Gmail below and I will add this week&apos;s HelloFresh meals to your plan.
        </SousBubble>
        <div className="lbl">Get groceries delivered</div>
        <div className="list">
          <div>
            <div className="store grow">
              <span className="lg-ic" style={{ background: '#0AAD0A' }}>
                <ShoppingBasket size={16} />
              </span>
              <div>
                <b style={{ fontSize: 13 }}>Instacart</b>
                <div className="tiny">Send lists to any store above</div>
              </div>
            </div>
            {state.instacartConnected ? (
              <span className="badge ok">Connected</span>
            ) : (
              <Btn className="sm" onClick={() => setField('showConnectSheet', true)}>
                Connect
              </Btn>
            )}
          </div>
          <div>
            <div className="store grow">
              <span className="lg-ic" style={{ background: '#1F4E9C' }}>
                K
              </span>
              <div>
                <b style={{ fontSize: 13 }}>Kroger family</b>
                <div className="tiny">Not in your area</div>
              </div>
            </div>
            <span className="badge">Later</span>
          </div>
          <div>
            <div className="store grow">
              <span className="lg-ic" style={{ background: '#EA4335' }}>
                <Mail size={16} />
              </span>
              <div>
                <b style={{ fontSize: 13 }}>Gmail receipts</b>
                <div className="tiny">Read meal-kit orders only</div>
              </div>
            </div>
            <Toggle />
          </div>
        </div>
      </Screen>
      {state.showConnectSheet ? (
        <>
          <div className="sheet-dim" onClick={() => setField('showConnectSheet', false)} />
          <div className="sheet">
            <div className="grab" />
            <div className="row" style={{ justifyContent: 'center', gap: 12, padding: '6px 0' }}>
              <Mark className="mark-hero" />
              <span className="lg-ic" style={{ width: 44, height: 44, borderRadius: 12, background: '#0AAD0A' }}>
                <ShoppingBasket />
              </span>
            </div>
            <b style={{ fontSize: 16, fontFamily: 'var(--font-display)', textAlign: 'center' }}>
              Connect Instacart
            </b>
            <div className="list">
              <div>
                <Check size={16} />
                <span className="tiny" style={{ fontSize: 12 }}>
                  Send shopping lists and recipes
                </span>
              </div>
              <div>
                <Check size={16} />
                <span className="tiny" style={{ fontSize: 12 }}>
                  Pick your store and see prices
                </span>
              </div>
              <div>
                <Ban size={16} />
                <span className="tiny" style={{ fontSize: 12 }}>
                  Never place an order without your tap
                </span>
              </div>
            </div>
            <Btn
              onClick={() => {
                setField('instacartConnected', true);
                setField('showConnectSheet', false);
              }}
            >
              <ExternalLink /> Continue to Instacart
            </Btn>
            <button type="button" className="link" onClick={() => setField('showConnectSheet', false)}>
              Not now
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}

export function WeekVoiceScreen() {
  const { goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Just me" onBack={goBack} />
      <Progress value={progress} />
      <Screen
        footer={
          <div className="row" style={{ gap: 8 }}>
            <Btn variant="sec" className="grow">
              <Type /> Type it
            </Btn>
            <Btn className="grow" onClick={goNext}>
              <Check /> Use this
            </Btn>
          </div>
        }
      >
        <h1 className="h sm">Where do you get food from?</h1>
        <p className="sub">Just say it. Restaurants, what you order, how often.</p>
        <div style={{ padding: '12px 0 2px' }}>
          <div className="mic">
            <Mic />
          </div>
        </div>
        <div className="wave">
          {[6, 12, 20, 9, 16, 24, 11, 7, 18, 22, 10, 14, 6].map((h, i) => (
            <span key={i} style={{ height: h }} />
          ))}
        </div>
        <div className="pcard" style={{ fontSize: 13, lineHeight: 1.5 }}>
          &ldquo;Pizza from Colony Grill most Fridays, the hot oil pie. Sushi at Kumo a couple times a month,
          usually the salmon avocado roll. And Chipotle for lunch, burrito bowl.&rdquo;
        </div>
        <SousBubble>
          <b>Sous</b> Got 3 places. Friday pizza is a habit, so I will plan around it.
        </SousBubble>
      </Screen>
    </>
  );
}

export function WeekRegularsScreen() {
  const { goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Just me" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Continue</Btn>}>
        <h1 className="h sm">Your regulars</h1>
        <div className="pcard">
          <div className="row sp">
            <b style={{ fontSize: 13 }}>Colony Grill</b>
            <span className="tiny">Order in. Stamford</span>
          </div>
          <div className="slider">
            <i style={{ width: '72%' }} />
            <b style={{ left: '72%' }} />
          </div>
          <div className="ticks">
            <span>Rarely</span>
            <span>Monthly</span>
            <span>Weekly</span>
            <span>Often</span>
          </div>
          <div className="chips" style={{ marginTop: 7 }}>
            <Chip sm on>
              Hot oil pie
            </Chip>
            <Chip sm>Garden salad</Chip>
            <Chip sm dash>
              + item
            </Chip>
          </div>
          <div className="tiny" style={{ marginTop: 4 }}>
            About weekly, Fridays
          </div>
        </div>
        <div className="pcard">
          <div className="row sp">
            <b style={{ fontSize: 13 }}>Kumo Sushi</b>
            <span className="tiny">Eat out. Greenwich</span>
          </div>
          <div className="slider">
            <i style={{ width: '45%' }} />
            <b style={{ left: '45%' }} />
          </div>
          <div className="ticks">
            <span>Rarely</span>
            <span>Monthly</span>
            <span>Weekly</span>
            <span>Often</span>
          </div>
          <div className="chips" style={{ marginTop: 7 }}>
            <Chip sm on>
              Salmon avocado roll
            </Chip>
            <Chip sm>Miso soup</Chip>
            <Chip sm dash>
              + item
            </Chip>
          </div>
          <div className="tiny" style={{ marginTop: 4 }}>
            Twice a month
          </div>
        </div>
        <button type="button" className="link">
          + Add a place
        </button>
      </Screen>
    </>
  );
}

export function WeekAppsScreen() {
  const { state, toggleApp, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Just me" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Continue</Btn>}>
        <h1 className="h sm">Which delivery apps do you use?</h1>
        <div className="list">
          {state.deliveryApps.map((a) => (
            <button key={a.id} type="button" onClick={() => toggleApp(a.id)}>
              <div className="store grow">
                <span className="lg-ic" style={{ background: a.color }}>
                  {a.letter}
                </span>
                <div>
                  <b style={{ fontSize: 13 }}>{a.name}</b>
                  {a.meta ? <div className="tiny">{a.meta}</div> : null}
                </div>
              </div>
              <CheckBox on={a.selected} />
            </button>
          ))}
        </div>
        <SousBubble>
          <b>Sous</b> These open the app with the restaurant ready. Your login stays with them, not us.
        </SousBubble>
      </Screen>
    </>
  );
}

export function WeekDietScreen() {
  const { state, toggleAllergy, toggleDiet, setField, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Just me" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Finish my week</Btn>}>
        <h1 className="h sm">Anything you cannot or will not eat?</h1>
        <div className="lbl">Allergies (strict)</div>
        <div className="chips">
          {ALLERGIES.map((a) => (
            <Chip key={a} strict={state.allergies.includes(a)} onClick={() => toggleAllergy(a)}>
              <TriangleAlert size={12} aria-hidden="true" /> {a}
            </Chip>
          ))}
        </div>
        <div className="lbl">Diets</div>
        <div className="chips">
          {DIETS.map((d) => (
            <Chip key={d} on={state.diets.includes(d)} onClick={() => toggleDiet(d)}>
              {d}
            </Chip>
          ))}
        </div>
        <div className="lbl">Dislikes</div>
        <div className="inp area">
          <textarea
            rows={2}
            value={state.dislikes}
            onChange={(e) => setField('dislikes', e.target.value)}
          />
        </div>
        <div className="chips">
          {state.dislikeTags.map((t) => (
            <Chip key={t} sm ai>
              <Sparkles size={12} /> {t}
            </Chip>
          ))}
        </div>
      </Screen>
    </>
  );
}

// Re-export grid for Stage 7
export { WeekGrid };
