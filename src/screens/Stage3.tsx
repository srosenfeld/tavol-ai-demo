import { useEffect } from 'react';
import {
  ArrowRight,
  Bookmark,
  Camera,
  Check,
  ClipboardPaste,
  FileText,
  Film,
  Image,
  ImagePlus,
  Link,
  PenLine,
  Play,
  Plus,
  Repeat,
  Share,
  Sparkles,
  Star,
  Timer,
} from 'lucide-react';
import { COVER_COLORS } from '../data/seed';
import { AppBar, Btn, Chip, FoodThumb, HigNote, Progress, Screen, SousBubble, StatusBar } from '../components/ui';
import { useDemo } from '../state/demoStore';

export function BookNameScreen() {
  const { state, setField, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="New book" onClose={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Create book</Btn>}>
        <h1 className="h sm">Start your first recipe book</h1>
        <p className="sub">One recipe per page. Make as many books as you like.</p>
        <HigNote title="Materials">
          Recipe photos run edge to edge under the status bar; back, share and save sit on clear glass with a 35% dim
          behind them.
        </HigNote>
        <div className="cover" style={{ background: 'var(--sorrel)' }}>
          <div className="t" style={{ fontFamily: 'var(--font-display)' }}>
            {state.bookTitle || 'Untitled book'}
          </div>
          <div className="s">{state.firstName}&apos;s book</div>
        </div>
        <div className="fld">
          <label>Book title</label>
          <div className="inp focus">
            <input value={state.bookTitle} onChange={(e) => setField('bookTitle', e.target.value)} />
          </div>
        </div>
        <div className="lbl">Start from</div>
        <div className="chips">
          <Chip on>Blank</Chip>
          <Chip>Weeknights</Chip>
          <Chip>Family classics</Chip>
          <Chip>Baking</Chip>
        </div>
        <SousBubble>
          <b>Sous</b> I can suggest a title once you add recipes.
        </SousBubble>
      </Screen>
    </>
  );
}

export function BookAddScreen() {
  const { goNext, goBack, progress } = useDemo();
  const sources = [
    { icon: Camera, label: 'Photo' },
    { icon: Image, label: 'Screenshot' },
    { icon: Link, label: 'Link' },
    { icon: ClipboardPaste, label: 'Paste text' },
    { icon: FileText, label: 'File' },
    { icon: Play, label: 'Video' },
  ];
  return (
    <>
      <StatusBar />
      <AppBar title="Okafor Family Table" onBack={goBack} />
      <Progress value={progress} />
      <Screen
        footer={
          <Btn onClick={goNext}>
            <Plus /> Add 4 items
          </Btn>
        }
      >
        <h1 className="h sm">Add your first pages</h1>
        <p className="sub">Any format works. Sous formats them into clean pages for you to check.</p>
        <div className="drop">
          {sources.map((s) => (
            <button key={s.label} type="button" className="src on">
              <s.icon />
              {s.label}
            </button>
          ))}
        </div>
        <div className="pcard row">
          <FoodThumb tone="#9A3A62" src="/brand/card.jpg" alt="Recipe card photo" />
          <div className="grow">
            <b style={{ fontSize: 15 }}>Grandma&apos;s card, photographed</b>
            <div className="tiny">Handwriting is fine. Stains too.</div>
          </div>
        </div>
        <div className="pcard row">
          <span className="qi">
            <PenLine />
          </span>
          <div className="grow">
            <b style={{ fontSize: 13 }}>Or write one from scratch</b>
            <div className="tiny">Name, ingredients, steps, with help</div>
          </div>
        </div>
      </Screen>
    </>
  );
}

export function BookImportScreen() {
  const { state, goNext, goBack, animateImports } = useDemo();
  useEffect(() => {
    const t = setTimeout(animateImports, 1600);
    return () => clearTimeout(t);
  }, [animateImports]);

  return (
    <>
      <StatusBar />
      <AppBar title="Importing" onBack={goBack} />
      <Screen
        footer={
          <Btn onClick={goNext}>
            <ArrowRight /> Review Sunday Sauce
          </Btn>
        }
      >
        <h1 className="h sm">Sous is formatting 4 pages</h1>
        <p className="sub">Keep going. We will let you know when each one is ready to review.</p>
        <div className="queue">
          {state.importItems.map((item) => (
            <div key={item.id} className="qitem">
              <FoodThumb tone={item.tone} src={item.image} alt="" />
              <div className="grow">
                <b>{item.name}</b>
                <div className="tiny">{item.meta}</div>
              </div>
              {item.status === 'ready' ? <span className="badge ok">Ready</span> : <span className="spin" />}
            </div>
          ))}
        </div>
        <SousBubble>
          <b>Sous</b> The pasted text has two recipes in it. I will make two pages. You can merge them back if you prefer.
        </SousBubble>
      </Screen>
    </>
  );
}

export function BookReviewScreen() {
  const { goNext, goBack } = useDemo();
  return (
    <>
      <div className="photo-bleed">
        <img src="/brand/salsa.jpg" alt="Sunday Sauce" />
        <div className="photo-dim" aria-hidden="true" />
        <div className="photo-chrome">
          <StatusBar light />
          <AppBar
            clear
            onBack={goBack}
            right={
              <div className="row" style={{ gap: 6 }}>
                <button type="button" className="icon-btn clear" aria-label="Save">
                  <Bookmark aria-hidden="true" />
                </button>
                <button type="button" className="icon-btn clear" aria-label="Share">
                  <Share aria-hidden="true" />
                </button>
              </div>
            }
          />
        </div>
      </div>
      <Screen
        footer={
          <div className="row" style={{ gap: 8 }}>
            <Btn variant="sec" className="grow">
              Edit
            </Btn>
            <Btn className="grow" onClick={goNext}>
              <Check /> Approve
            </Btn>
          </div>
        }
      >
        <div className="row sp">
          <h1 className="h sm">Sunday Sauce</h1>
          <span className="badge ai">Draft</span>
        </div>
        <div className="pcard gen" style={{ fontSize: 12 }}>
          Grandma Ada&apos;s slow tomato sauce. Simmered for most of a Sunday, finished with basil.
        </div>
        <div className="chips">
          <Chip sm>Serves 6</Chip>
          <Chip sm>3 hr</Chip>
          <Chip sm ai>
            <Sparkles size={12} /> Vegetarian
          </Chip>
          <Chip sm ai>
            <Sparkles size={12} /> Freezes well
          </Chip>
        </div>
        <div className="lbl">We read this from the photo</div>
        <div className="pcard" style={{ fontSize: 12, lineHeight: 1.5 }}>
          2 cans San Marzano tomatoes
          <br />
          1 onion, chopped
          <br />
          4 cloves garlic
          <br />
          <span style={{ background: 'var(--saffron-100)', borderRadius: 4, padding: '0 3px' }}>
            A pinch of sugar (optional)
          </span>
        </div>
        <div className="tiny">Highlighted: hard to read. Tap to check.</div>
      </Screen>
    </>
  );
}

export function BookIngredientsScreen() {
  const { goNext, goBack } = useDemo();
  const lines = [
    { name: 'San Marzano tomatoes', qty: '2 cans', brand: 'Cento', swap: 'crushed plum' },
    { name: 'Yellow onion', qty: '1 large', swap: 'shallots x3' },
    { name: 'Olive oil', qty: '3 tbsp', brand: 'Colavita' },
    { name: 'Fresh basil', qty: '1 bunch', swap: '1 tsp dried' },
  ];
  return (
    <>
      <StatusBar />
      <AppBar title="Sunday Sauce" onBack={goBack} />
      <Screen footer={<Btn onClick={goNext}>Next: steps</Btn>}>
        <div className="row sp">
          <h1 className="h sm">Ingredients</h1>
          <Btn variant="soft" className="sm">
            <Sparkles size={14} /> Fill with Sous
          </Btn>
        </div>
        <div className="pcard" style={{ padding: '2px 12px' }}>
          {lines.map((l) => (
            <div key={l.name} className="ing">
              <b>{l.name}</b>
              <span className="qty">{l.qty}</span>
              <div className="sw">
                {l.brand ? (
                  <span className="chip on sm">
                    <Star size={12} /> {l.brand}
                  </span>
                ) : null}
                {l.swap ? (
                  <span className="chip ai sm">
                    <Repeat size={12} /> Swap: {l.swap}
                  </span>
                ) : (
                  <span className="chip dash sm">+ brand</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="tiny row" style={{ gap: 6 }}>
          <Star size={12} /> Preferred brand &nbsp; <Repeat size={12} /> Substitute
        </div>
        <div className="mcpbar">
          <Link size={14} />
          <span>Instacart: preferred brands map to products at Stop &amp; Shop</span>
        </div>
      </Screen>
    </>
  );
}

export function BookStepsScreen() {
  const { goNext, goBack } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Rosemary focaccia" onBack={goBack} />
      <Screen
        footer={
          <Btn onClick={goNext}>
            <Check /> Save page
          </Btn>
        }
      >
        <h1 className="h sm">Steps</h1>
        <div className="pcard" style={{ fontSize: 13 }}>
          <b>1.</b> Stir flour, warm water, yeast and salt until shaggy. Rest 15 min.
        </div>
        <div className="pcard" style={{ fontSize: 15 }}>
          <b>2.</b> Fold and stretch the dough 4 times, 10 min apart.
          <div className="step-media">
            <img src="/brand/knead.jpg" alt="Folding focaccia dough" />
            <span className="play">
              <Play size={16} fill="#fff" aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="pcard gen" style={{ fontSize: 13 }}>
          <b>3.</b> Oil the pan, dimple the dough, top with rosemary and flaky salt. Bake at 450F for 22 min.
        </div>
        <div className="chips">
          <Chip sm dash>
            <ImagePlus size={12} /> Photo
          </Chip>
          <Chip sm dash>
            <Film size={12} /> Video
          </Chip>
          <Chip sm dash>
            <Timer size={12} /> Timer
          </Chip>
          <Chip sm ai>
            <Sparkles size={12} /> Split step
          </Chip>
        </div>
      </Screen>
    </>
  );
}

export function BookStyleScreen() {
  const { state, setField, goNext, goBack } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Style" onBack={goBack} />
      <Screen footer={<Btn onClick={goNext}>Done</Btn>}>
        <div
          className="cover"
          style={{
            background: state.coverColor.includes('beet')
              ? 'linear-gradient(160deg,#9A3A62,#6E2843)'
              : state.coverColor,
            height: 118,
          }}
        >
          <div
            className="t"
            style={{
              fontFamily:
                state.titleFont === 'classic'
                  ? 'Georgia, serif'
                  : state.titleFont === 'script'
                    ? "'Brush Script MT', cursive"
                    : 'var(--font-display)',
            }}
          >
            {state.bookTitle.replace(' ', '\n') || 'Your book'}
          </div>
          <div className="s">{state.dedication}</div>
        </div>
        <div className="lbl">Cover color</div>
        <div className="style-sw">
          {COVER_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={state.coverColor === c ? 'on' : ''}
              style={{ ['--c' as string]: c }}
              onClick={() => setField('coverColor', c)}
              aria-label={c}
            />
          ))}
        </div>
        <div className="lbl">Title font</div>
        <div className="fontpick">
          {(
            [
              ['modern', 'var(--font-display)', 'Modern'],
              ['classic', 'Georgia, serif', 'Classic'],
              ['script', "'Brush Script MT', cursive", 'Script'],
            ] as const
          ).map(([id, font, label]) => (
            <button
              key={id}
              type="button"
              className={state.titleFont === id ? 'on' : ''}
              onClick={() => setField('titleFont', id)}
            >
              <span style={{ fontFamily: font, fontWeight: 700, fontSize: 22 }}>Aa</span>
              <small>{label}</small>
            </button>
          ))}
        </div>
        <div className="fld">
          <label>
            Dedication <em>Optional</em>
          </label>
          <div className="inp">
            <input value={state.dedication} onChange={(e) => setField('dedication', e.target.value)} />
          </div>
        </div>
      </Screen>
    </>
  );
}
