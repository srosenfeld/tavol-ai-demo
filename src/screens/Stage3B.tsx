import {
  ArrowRight,
  Ban,
  Bell,
  BookOpen,
  Camera,
  ChartColumn,
  Check,
  ChevronDown,
  Copy,
  Eye,
  GitFork,
  Globe,
  GripVertical,
  Heart,
  Image as ImageIcon,
  Info,
  Link,
  Lock,
  Mail,
  Mic,
  Palette,
  Quote,
  ScanBarcode,
  Search,
  Send,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Type,
  Users,
} from 'lucide-react';
import { asset } from '../asset';
import type { BookPurpose } from '../flow/routePlan';
import { AppBar, Btn, Chip, Progress, Screen, SousBubble, StatusBar } from '../components/ui';
import { useDemo } from '../state/demoStore';

const FILTERS: Record<string, string> = {
  Natural: 'none',
  Hearth: 'sepia(0.28) saturate(1.3) contrast(1.06)',
  Golden: 'sepia(0.4) saturate(1.45) brightness(1.06) hue-rotate(-8deg)',
  Market: 'saturate(1.7) contrast(1.12)',
  Supper: 'contrast(1.18) brightness(0.86) saturate(0.85)',
  Matte: 'contrast(0.82) brightness(1.12) saturate(0.75)',
  Noir: 'grayscale(1) contrast(1.25)',
};

const COVER_TEMPLATES = [
  { id: 'heirloom', name: 'Heirloom', bg: 'linear-gradient(160deg,#8A3557,#5E2139)', font: 'Georgia, serif', img: 'brand/card.jpg' },
  { id: 'polaroid', name: 'Polaroid', bg: '#F4EDE1', font: 'var(--font-display)', img: 'brand/pasta.jpg', fg: '#26231F' },
  { id: 'editorial', name: 'Editorial', bg: '#26231F', font: 'var(--font-display)', img: 'brand/platter.jpg' },
  { id: 'market', name: 'Market', bg: '#F0B033', font: 'var(--font-display)', fg: '#26231F' },
  { id: 'linen', name: 'Linen', bg: 'repeating-linear-gradient(0deg,#E9DFCC 0 2px,#EFE7D7 2px 4px)', font: 'Georgia, serif', fg: '#5E2139' },
  { id: 'bleed', name: 'Full bleed', bg: '#2F5E3D', font: 'var(--font-display)', img: 'brand/salmon.jpg' },
] as const;

const PHOTO_CELLS = [
  { src: 'brand/pasta.jpg', n: 1 },
  { src: 'brand/salsa.jpg', n: 2 },
  { src: 'brand/soup.jpg', n: 0 },
  { src: 'brand/tacos.jpg', n: 0 },
  { src: 'brand/focaccia.jpg', n: 3 },
  { src: 'brand/salmon.jpg', n: 0 },
  { src: 'brand/sheetpan.jpg', n: 0 },
  { src: 'brand/platter.jpg', n: 0 },
];

function BookCover({
  title,
  sub,
  templateId,
  className = '',
}: {
  title: string;
  sub: string;
  templateId: string;
  className?: string;
}) {
  const tpl = COVER_TEMPLATES.find((t) => t.id === templateId) ?? COVER_TEMPLATES[0];
  return (
    <div
      className={`bk-cover ${className}`}
      style={{
        background: tpl.bg,
        color: 'fg' in tpl && tpl.fg ? tpl.fg : '#FFFCF6',
        fontFamily: tpl.font,
      }}
    >
      {'img' in tpl && tpl.img ? <img src={asset(tpl.img)} alt="" /> : null}
      <div className="bk-t">{title}</div>
      {sub ? <div className="bk-s">{sub}</div> : null}
    </div>
  );
}

export function StudioPurposeScreen() {
  const { state, setField, goNext, goBack, progress } = useDemo();
  const options: { id: BookPurpose; icon: typeof Users; color: string; title: string; body: string }[] = [
    {
      id: 'family',
      icon: Users,
      color: 'var(--beet)',
      title: 'Family cookbook',
      body: 'Gather recipes from relatives. Private by default, easy to invite.',
    },
    {
      id: 'creator',
      icon: Sparkles,
      color: 'var(--tomato)',
      title: 'Creator book',
      body: 'Publish to followers, share to social, see what is working.',
    },
    {
      id: 'personal',
      icon: BookOpen,
      color: 'var(--sorrel)',
      title: 'Just for me',
      body: 'A tidy personal collection. Nothing is shared.',
    },
  ];
  return (
    <>
      <StatusBar />
      <AppBar title="New book" onClose={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Continue <ArrowRight /></Btn>}>
        <h1 className="h sm">What kind of book is this?</h1>
        <p className="sub">We set up covers, roles and sharing to match.</p>
        <div className="opt-list">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`opt ${state.bookPurpose === o.id ? 'on' : ''}`}
              onClick={() => setField('bookPurpose', o.id)}
            >
              <span className="oi" style={{ ['--c' as string]: o.color }}>
                <o.icon />
              </span>
              <div className="grow">
                <b>{o.title}</b>
                <small>{o.body}</small>
              </div>
              <span className="rad" aria-hidden="true" />
            </button>
          ))}
        </div>
        <SousBubble>
          <b>Sous</b> You mentioned the holiday reunion. Want a chapter for each branch of the family?
        </SousBubble>
      </Screen>
    </>
  );
}

export function StudioCoverScreen() {
  const { state, setField, goNext, goBack, progress } = useDemo();
  const tpl = COVER_TEMPLATES.find((t) => t.id === state.coverTemplate) ?? COVER_TEMPLATES[0];
  return (
    <>
      <StatusBar />
      <AppBar title="Cover" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Use {tpl.name}</Btn>}>
        <div className="row sp">
          <h1 className="h sm">Choose a cover</h1>
          <span className="tiny">12 designs</span>
        </div>
        <div className="chips">
          <Chip sm on>
            All
          </Chip>
          <Chip sm>Heirloom</Chip>
          <Chip sm>Editorial</Chip>
          <Chip sm>Photo</Chip>
        </div>
        <div className="tpl-grid">
          {COVER_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`tpl ${state.coverTemplate === t.id ? 'on' : ''}`}
              onClick={() => setField('coverTemplate', t.id)}
            >
              <BookCover title={state.bookTitle.replace(' ', '\n')} sub="" templateId={t.id} className="sm" />
              <span>{t.name}</span>
            </button>
          ))}
        </div>
        <SousBubble>
          <b>Sous</b> Heirloom fits a family book. I matched the color to the beet in Grandma Ada&apos;s photo.
        </SousBubble>
      </Screen>
    </>
  );
}

export function StudioDesignerScreen() {
  const { state, setField, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Edit cover" onBack={goBack} />
      <Progress value={progress} />
      <Screen
        footer={
          <>
            <div className="tools">
              {(['Layout', 'Photo', 'Type', 'Color', 'Texture'] as const).map((n) => (
                <span key={n} className={n === 'Type' ? 'on' : ''}>
                  {n === 'Photo' ? <ImageIcon /> : n === 'Type' ? <Type /> : n === 'Color' ? <Palette /> : <Sparkles />}
                  {n}
                </span>
              ))}
            </div>
            <Btn onClick={goNext}>Save cover</Btn>
          </>
        }
      >
        <div className="canvas">
          <BookCover
            title={state.bookTitle.replace(' ', '\n')}
            sub="Recipes from four generations"
            templateId={state.coverTemplate}
            className="lg"
          />
        </div>
        <div className="chips">
          <Chip sm>
            <ImageIcon size={12} /> Photo
          </Chip>
          <Chip sm on>
            <Type size={12} /> Title
          </Chip>
          <Chip sm>Subtitle</Chip>
          <Chip sm>Frame</Chip>
        </div>
        <div className="lbl">Title type</div>
        <div className="fontpick">
          {(
            [
              ['modern', 'var(--font-display)', 'Modern'],
              ['classic', 'Georgia, serif', 'Heirloom'],
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
        <div className="style-sw">
          {['#7A2E4C', 'var(--sorrel)', 'var(--tomato)', 'var(--saffron)', 'var(--blueberry)', '#F4EDE1'].map((c) => (
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
      </Screen>
    </>
  );
}

export function StudioBookScreen() {
  const { state, setField, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Book" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Save cover</Btn>}>
        <div className="seg b3-seg">
          <button type="button" className="on">
            Front
          </button>
          <button type="button">Spine</button>
          <button type="button">Back</button>
        </div>
        <div className="book-3d">
          <BookCover
            title={state.bookTitle.replace(' ', '\n')}
            sub="Recipes from four generations"
            templateId={state.coverTemplate}
            className="md"
          />
        </div>
        <div className="fld">
          <label>
            Back cover blurb <em>Optional</em>
          </label>
          <div className="inp area">
            <textarea
              rows={3}
              value={state.backBlurb}
              onChange={(e) => setField('backBlurb', e.target.value)}
            />
          </div>
        </div>
        <div className="list">
          <div>
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>Foil title on spine</b>
            </div>
            <span className="tog on" aria-hidden="true" />
          </div>
        </div>
      </Screen>
    </>
  );
}

export function StudioPagesScreen() {
  const { state, setField, goNext, goBack, progress } = useDemo();
  const layouts = [
    { id: 'photo-left' as const, label: 'Photo left' },
    { id: 'full-bleed' as const, label: 'Full bleed' },
    { id: 'card' as const, label: 'Card' },
    { id: 'story' as const, label: 'Story first' },
  ];
  return (
    <>
      <StatusBar />
      <AppBar title="Pages" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Apply to all pages</Btn>}>
        <div className="spread">
          <div className="pg l">
            <img src={asset('brand/salsa.jpg')} alt="" />
          </div>
          <div className="pg r">
            <span className="ch">Chapter 2. Grandma Ada</span>
            <b style={{ fontFamily: 'Georgia, serif' }}>Sunday Sauce</b>
            <span className="ln" />
            <span className="ln s" />
            <span className="ln" />
            <span className="pno">24</span>
          </div>
        </div>
        <div className="lbl">Page layout</div>
        <div className="lay">
          {layouts.map((l) => (
            <button
              key={l.id}
              type="button"
              className={state.pageLayout === l.id ? 'on' : ''}
              onClick={() => setField('pageLayout', l.id)}
            >
              <i className={`l-${l.id}`} />
              {l.label}
            </button>
          ))}
        </div>
        <div className="lbl">Chapters</div>
        <div className="list">
          <div>
            <GripVertical color="var(--ink-3)" size={16} />
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>1. Lagos side</b>
              <div className="tiny">Uncle Femi · 9 recipes</div>
            </div>
          </div>
          <div>
            <GripVertical color="var(--ink-3)" size={16} />
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>2. Grandma Ada</b>
              <div className="tiny">You · 14 recipes</div>
            </div>
          </div>
        </div>
        <div className="lbl">Personal pages</div>
        <div className="pp-list">
          <div className="pp">
            <span className="pi">
              <Heart />
            </span>
            <div className="grow">
              <b>Dedication</b>
              <small>{state.dedication}</small>
            </div>
            <span className="badge ok">Added</span>
          </div>
          <div className="pp">
            <span className="pi">
              <GitFork />
            </span>
            <div className="grow">
              <b>Family tree</b>
              <small>Who each recipe came from</small>
            </div>
            <span className="badge ok">Added</span>
          </div>
          <div className="pp">
            <span className="pi">
              <Mic />
            </span>
            <div className="grow">
              <b>Voice memory</b>
              <small>A 30 second clip plays on the page</small>
            </div>
          </div>
        </div>
      </Screen>
    </>
  );
}

export function StudioPhotosScreen() {
  const { state, setField, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Add photos" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Next: edit</Btn>}>
        <div className="pick-prev">
          <img
            src={asset('brand/pasta.jpg')}
            alt=""
            style={{ filter: FILTERS[state.coverFilter] ?? 'none' }}
          />
          <span className="ratio">4:5</span>
        </div>
        <div className="row sp">
          <b style={{ fontSize: 13 }}>
            Recents <ChevronDown size={13} />
          </b>
          <span className="multi">
            <Copy size={13} /> 3 selected
          </span>
        </div>
        <div className="pgrid">
          {PHOTO_CELLS.map((c) => (
            <span key={c.src} className={`gp ${c.n ? 'sel' : ''}`}>
              <img src={asset(c.src)} alt="" />
              <b>{c.n || ''}</b>
            </span>
          ))}
        </div>
        <div className="lbl">Food-tuned filters</div>
        <div className="fstrip">
          {Object.keys(FILTERS).map((n) => (
            <button
              key={n}
              type="button"
              className={`fl ${state.coverFilter === n ? 'on' : ''}`}
              onClick={() => setField('coverFilter', n)}
            >
              <img src={asset('brand/pasta.jpg')} alt="" style={{ filter: FILTERS[n] }} />
              <b>{n}</b>
            </button>
          ))}
        </div>
      </Screen>
    </>
  );
}

export function StudioStoryScreen() {
  const { goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Story" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Save story cards</Btn>}>
        <div className="story-card">
          <img src={asset('brand/focaccia.jpg')} alt="" />
          <div className="dots">
            <i className="on" />
            <i className="on" />
            <i />
            <i />
            <i />
          </div>
          <div className="who">
            <span className="av sm" style={{ background: 'var(--beet)' }}>
              A
            </span>
            <b>Grandma Ada&apos;s focaccia</b>
          </div>
          <span className="stk tip">
            <Quote size={12} /> Dimple it like you mean it
          </span>
          <span className="stk step">Step 2 of 5</span>
          <div className="cap-ov">
            <b>Fold and stretch</b>
            Four times, ten minutes apart. The dough should feel like a pillow.
          </div>
        </div>
        <SousBubble>
          <b>Sous</b> Drafted five story cards from the steps. Exports to 9:16 for Instagram.
        </SousBubble>
      </Screen>
    </>
  );
}

export function StudioCollabScreen() {
  const { goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Collaborators" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}><Send /> Send 21 invites</Btn>}>
        <h1 className="h sm">Invite the family</h1>
        <div className="inp">
          <Search />
          <input placeholder="Name, phone or email" readOnly />
        </div>
        <div className="list">
          <div>
            <span className="av" style={{ background: 'var(--blueberry)' }}>
              N
            </span>
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>Aunt Nkem</b>
              <div className="tiny">Chapter: Lagos side</div>
            </div>
            <span className="role ed">Co-editor</span>
          </div>
          <div>
            <span className="av" style={{ background: 'var(--sorrel)' }}>
              F
            </span>
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>Uncle Femi</b>
              <div className="tiny">Text message</div>
            </div>
            <span className="role">Contributor</span>
          </div>
          <div>
            <span className="av" style={{ background: 'var(--saffron-700)' }}>
              T
            </span>
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>Theo</b>
              <div className="tiny">Email</div>
            </div>
            <span className="role">Contributor</span>
          </div>
        </div>
        <div className="roles">
          <div>
            <b>Co-editor</b>Edits everything, approves additions
          </div>
          <div>
            <b>Contributor</b>Adds recipes, edits their own
          </div>
          <div>
            <b>Reader</b>Reads, cooks, comments
          </div>
        </div>
      </Screen>
    </>
  );
}

export function StudioContributeScreen() {
  const { goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Activity" onBack={goBack} />
      <Progress value={progress} />
      <Screen
        footer={
          <div className="row" style={{ gap: 8 }}>
            <Btn className="grow" onClick={goNext}>
              <Check /> Add to book
            </Btn>
            <Btn variant="sec" className="grow">
              Reply
            </Btn>
          </div>
        }
      >
        <div className="web-url">
          <Lock size={12} /> tavol.io/b/okafor/add
        </div>
        <p className="sub">Relatives add recipes from a web link: photo, link or voice. No account needed.</p>
        <div className="drop" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <span className="src">
            <Camera /> Photo
          </span>
          <span className="src">
            <Link /> Link
          </span>
          <span className="src">
            <Mic /> Say it
          </span>
        </div>
        <div className="lbl">Waiting for you (3)</div>
        <div className="contrib">
          <img src={asset('brand/soup.jpg')} alt="" />
          <div className="grow">
            <b>Pepper soup, Femi&apos;s way</b>
            <div className="tiny">Femi, via web link · 2 min ago</div>
          </div>
        </div>
        <div className="contrib">
          <img src={asset('brand/tacos.jpg')} alt="" />
          <div className="grow">
            <b>Suya tacos</b>
            <div className="tiny">Theo · Needs a photo</div>
          </div>
          <span className="badge ai">Draft</span>
        </div>
        <SousBubble>
          <b>Sous</b> Formatted Femi&apos;s voice note into a clean page and flagged shellfish in the broth.
        </SousBubble>
      </Screen>
    </>
  );
}

export function StudioRightsScreen() {
  const { state, setField, goNext, goBack, progress } = useDemo();
  const presets = [
    { id: 'family' as const, label: 'Family only' },
    { id: 'credit' as const, label: 'Share with credit' },
    { id: 'remix' as const, label: 'Remix with credit' },
    { id: 'reserved' as const, label: 'All rights reserved' },
  ];
  return (
    <>
      <StatusBar />
      <AppBar title="Rights" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Save rights</Btn>}>
        <div className="lbl">Start from a preset</div>
        <div className="chips">
          {presets.map((p) => (
            <Chip key={p.id} sm on={state.rightsPreset === p.id} onClick={() => setField('rightsPreset', p.id)}>
              {p.label}
            </Chip>
          ))}
        </div>
        <div className="list perm-list">
          <div>
            <Eye size={16} />
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>Read</b>
            </div>
            <span className="pv">Anyone with link</span>
          </div>
          <div>
            <Share2 size={16} />
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>Share</b>
            </div>
            <span className="pv">Readers</span>
          </div>
          <div>
            <GitFork size={16} />
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>Remix</b>
            </div>
            <span className="pv">Followers</span>
          </div>
        </div>
        <div className="list">
          <div>
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>Remixes must credit me</b>
              <div className="tiny">Always shown, cannot be removed</div>
            </div>
            <Lock size={13} color="var(--ink-3)" />
          </div>
        </div>
      </Screen>
    </>
  );
}

export function StudioPublishScreen() {
  const { state, goNext, goBack, progress } = useDemo();
  const channels = [
    { n: 'Instagram', c: 'linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)' },
    { n: 'TikTok', c: '#111' },
    { n: 'Pinterest', c: '#E60023' },
    { n: 'Messages', c: '#34C759' },
    { n: 'WhatsApp', c: '#25D366' },
    { n: 'Email', c: 'var(--blueberry)' },
  ];
  return (
    <>
      <StatusBar />
      <AppBar title="Publish book" onClose={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}><Globe /> Publish</Btn>}>
        <div className="og">
          <BookCover title={state.bookTitle.replace(' ', '\n')} sub="" templateId={state.coverTemplate} className="xs" />
          <div className="grow">
            <b>{state.bookTitle}</b>
            <span>48 recipes by {state.firstName} {state.lastName}</span>
            <small>tavol.io</small>
          </div>
        </div>
        <div className="lbl">Your link</div>
        <div className="slug">
          <Link size={14} />
          <span>
            tavol.io/<b>okafor/family-table</b>
          </span>
        </div>
        <div className="row" style={{ gap: 10, alignItems: 'center' }}>
          <span className="qr" aria-hidden="true" />
          <div className="grow tiny">
            QR for packaging and events. Scans are tracked as <b>QR</b>.
          </div>
        </div>
        <div className="lbl">Share everywhere</div>
        <div className="chgrid">
          {channels.map((ch) => (
            <span key={ch.n} className="chn">
              <i style={{ background: ch.c }} />
              {ch.n}
            </span>
          ))}
        </div>
        <div className="trk-l">
          <ChartColumn size={14} />
          <span>
            Each channel gets its own link so Insights can tell them apart.
          </span>
        </div>
      </Screen>
    </>
  );
}

export function StudioInsightsScreen() {
  const { goNext, goBack, progress } = useDemo();
  const bars = [
    { label: 'Instagram', pct: 100, val: '41%', color: '#DD2A7B' },
    { label: 'TikTok', pct: 46, val: '19%', color: '#26231F' },
    { label: 'Messages', pct: 29, val: '12%', color: '#34C759' },
    { label: 'Email', pct: 27, val: '11%', color: 'var(--blueberry)' },
    { label: 'QR and direct', pct: 22, val: '9%', color: 'var(--ink-3)' },
  ];
  return (
    <>
      <StatusBar />
      <AppBar title="Insights" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Continue</Btn>}>
        <div className="seg">
          <button type="button">7 days</button>
          <button type="button" className="on" aria-pressed="true">
            30 days
          </button>
          <button type="button">All</button>
        </div>
        <div className="kpis">
          <div className="kpi">
            <b>18.4k</b>
            <span>Views</span>
            <em className="up">+22%</em>
          </div>
          <div className="kpi">
            <b>6.2k</b>
            <span>Readers</span>
            <em className="up">+18%</em>
          </div>
          <div className="kpi">
            <b>1,140</b>
            <span>Saves</span>
            <em className="up">+9%</em>
          </div>
          <div className="kpi">
            <b>312</b>
            <span>Remixes</span>
            <em className="up">+41%</em>
          </div>
        </div>
        <div className="lbl">Readers by source</div>
        <div className="sbars">
          {bars.map((b) => (
            <div key={b.label} className="sbar">
              <span className="sl">{b.label}</span>
              <span className="tr">
                <i style={{ width: `${b.pct}%`, background: b.color }} />
              </span>
              <b>{b.val}</b>
            </div>
          ))}
        </div>
        <div className="row sp" style={{ marginTop: 4 }}>
          <div className="h sm" style={{ fontSize: 15 }}>
            Who has opened it
          </div>
          <span className="badge ok">19 of 23</span>
        </div>
        <div className="list">
          <div>
            <span className="av sm" style={{ background: 'var(--blueberry)' }}>
              N
            </span>
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>Aunt Nkem</b>
              <div className="tiny">Email</div>
            </div>
            <span className="badge ok">Opened</span>
          </div>
          <div>
            <span className="av sm" style={{ background: 'var(--tomato)' }}>
              A
            </span>
            <div className="grow">
              <b style={{ fontSize: 12.5 }}>Cousin Ama</b>
              <div className="tiny">Email</div>
            </div>
            <span className="badge">Not yet</span>
          </div>
        </div>
        <SousBubble>
          <b>Sous</b> Email readers finish 64% of a recipe, the most of any source.
        </SousBubble>
      </Screen>
    </>
  );
}

export function StudioCiteScreen() {
  const { goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Citation" onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Continue with 45 recipes <ArrowRight /></Btn>}>
        <div className="row sp">
          <h1 className="h sm">Buttermilk chicken</h1>
          <span className="badge blue">
            <Quote size={10} /> Cited
          </span>
        </div>
        <div className="cite">
          <div className="row" style={{ gap: 10 }}>
            <div className="bk-cover xs" style={{ background: '#F4EDE1', color: '#C4441F' }}>
              <div className="bk-t" style={{ fontSize: 9, lineHeight: 1.1 }}>
                SALT
                <br />
                FAT
                <br />
                ACID
                <br />
                HEAT
              </div>
            </div>
            <div className="grow">
              <b>Salt, Fat, Acid, Heat</b>
              <span>Samin Nosrat · Simon and Schuster, 2017 · Page 342</span>
              <small>
                <ScanBarcode size={11} /> ISBN 978-1-4767-5383-6
              </small>
            </div>
          </div>
          <div className="locked">
            <Lock size={12} /> Source is attached for good. It shows on every copy, share and remix.
          </div>
        </div>
        <div className="lbl">What you can do with it</div>
        <div className="use">
          <div className="y">
            <Check size={14} />
            <span>
              <b>Your books, family books</b> Cook, edit, share with people you invite
            </span>
          </div>
          <div className="n">
            <Ban size={14} />
            <span>
              <b>Paid books and paid remixes</b> Not allowed for published recipes
            </span>
          </div>
        </div>
        <div className="block-card">
          <span className="bi">
            <ShieldCheck />
          </span>
          <div>
            <b>3 recipes cannot be sold</b>
            <span>They come from published books or sites. They can stay in a free edition.</span>
          </div>
        </div>
        <div className="opt on" style={{ padding: 10 }}>
          <span className="oi" style={{ ['--c' as string]: 'var(--sorrel)' }}>
            <BookOpen />
          </span>
          <div className="grow">
            <b>Sell 45, keep 3 free</b>
            <small>A free companion with the cited recipes, linked from the paid book</small>
          </div>
          <span className="rad" aria-hidden="true" />
        </div>
        <button type="button" className="link">
          <ShoppingBag size={13} /> Buy the book from the publisher
        </button>
        <div className="tiny row" style={{ gap: 6 }}>
          <Info size={12} /> <Mail size={12} /> <Bell size={12} /> Capture from a printed page asks for cover or barcode first.
        </div>
      </Screen>
    </>
  );
}
