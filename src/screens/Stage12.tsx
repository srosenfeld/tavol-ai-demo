import {
  Apple,
  ArrowRight,
  AtSign,
  BookOpen,
  Building2,
  Check,
  Fingerprint,
  Info,
  KeyRound,
  Mail,
  MapPin,
  Navigation,
  PartyPopper,
  UserRound,
  Users,
} from 'lucide-react';
import { INTEREST_LABELS, type InterestKey } from '../data/seed';
import { depthLabel } from '../flow/routePlan';
import { asset } from '../asset';
import { PoweredByKinlith } from '../components/Kinlith';
import { AppIcon } from '../components/Logo';
import { AppBar, Btn, HigNote, Progress, Screen, SousBubble, StatusBar } from '../components/ui';
import { useDemo } from '../state/demoStore';

const ICONS: Record<InterestKey, typeof BookOpen> = {
  rec: BookOpen,
  me: UserRound,
  grp: Users,
  party: PartyPopper,
  off: Building2,
};

export function WelcomeScreen() {
  const { goToScreen } = useDemo();
  return (
    <>
      <StatusBar />
      <Screen
        className="welcome"
        footer={
          <>
            <Btn variant="apple" onClick={() => goToScreen('profile')} aria-label="Continue with Apple">
              <Apple aria-hidden="true" /> Continue with Apple
            </Btn>
            <Btn variant="google" onClick={() => goToScreen('profile')}>
              <b style={{ color: '#4285F4', fontWeight: 800 }} aria-hidden="true">
                G
              </b>{' '}
              Continue with Google
            </Btn>
            <Btn variant="sec" onClick={() => goToScreen('signup')}>
              <Mail aria-hidden="true" /> Use email instead
            </Btn>
            <button type="button" className="link" onClick={() => goToScreen('login')}>
              I already have an account
            </button>
            <div className="cobrand-foot">
              <PoweredByKinlith variant="splash" />
            </div>
          </>
        }
      >
        <AppIcon className="app-icon-img welcome-icon" />
        <h1 className="h welcome-title">
          Dinner,
          <br />
          decided together.
        </h1>
        <p className="sub">Plan the week, keep your recipes, and get everyone on the same page.</p>
        <HigNote title="Familiarity">
          Sign in with Apple comes first, using the system button pattern. No custom login screen to learn.
        </HigNote>
        <div className="mcard welcome-hero">
          <div
            className="hero"
            style={{
              backgroundImage: `url(${asset('brand/hero.jpg')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            role="img"
            aria-label="Shared dinner table"
          />
        </div>
      </Screen>
    </>
  );
}

export function SignupScreen() {
  const { state, setField, goToScreen } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar onBack={() => goToScreen('welcome')} />
      <Screen
        footer={
          <Btn onClick={() => goToScreen('profile')}>
            <ArrowRight /> Create account
          </Btn>
        }
      >
        <h1 className="h">Create your account</h1>
        <p className="sub">Use the email you check most. We send recipe shares and invites here.</p>
        <div className="fld">
          <label>Email</label>
          <div className="inp">
            <AtSign />
            <input
              value={state.email}
              onChange={(e) => setField('email', e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>
        <div className="fld">
          <label>Password</label>
          <div className="inp focus">
            <KeyRound />
            <input type="password" defaultValue="••••••••••" readOnly />
          </div>
          <span className="hint">
            <Info /> 10+ characters. Passkey offered after sign-up.
          </span>
        </div>
        <div className="row tiny">
          <span className="check on">
            <Check size={14} />
          </span>
          Keep me signed in on this phone
        </div>
        <div className="divider">or</div>
        <div className="row" style={{ gap: 8 }}>
          <Btn variant="apple" className="sm grow" onClick={() => goToScreen('profile')}>
            <Apple /> Apple
          </Btn>
          <Btn variant="google" className="sm grow" onClick={() => goToScreen('profile')}>
            <b style={{ color: '#4285F4' }}>G</b> Google
          </Btn>
        </div>
        <p className="tiny" style={{ marginTop: 'auto' }}>
          By continuing you agree to the Terms and Privacy Policy. We never sell your food data.
        </p>
        <button type="button" className="link" onClick={() => goToScreen('login')}>
          Already have an account? Log in
        </button>
      </Screen>
    </>
  );
}

export function LoginScreen() {
  const { state, setField, goToScreen } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar onBack={() => goToScreen('welcome')} />
      <Screen footer={<Btn onClick={() => goToScreen('profile')}>Log in</Btn>}>
        <h1 className="h">Welcome back</h1>
        <div className="fld">
          <label>Email</label>
          <div className="inp">
            <AtSign />
            <input value={state.email} onChange={(e) => setField('email', e.target.value)} />
          </div>
        </div>
        <div className="fld">
          <label>Password</label>
          <div className="inp">
            <KeyRound />
            <input type="password" defaultValue="••••••••" readOnly />
          </div>
        </div>
        <button type="button" className="link" style={{ textAlign: 'right' }}>
          Forgot password
        </button>
        <div className="pcard row" style={{ gap: 10 }}>
          <span className="act" style={{ border: 0, padding: 0 }}>
            <span className="ico">
              <Fingerprint />
            </span>
          </span>
          <div className="grow">
            <b style={{ fontSize: 13 }}>Sign in with a passkey</b>
            <div className="tiny">Face ID on this device</div>
          </div>
        </div>
        <SousBubble>
          <b>Account found</b> This email is linked to Apple sign-in too. Either works, and your books stay in one place.
        </SousBubble>
      </Screen>
    </>
  );
}

export function ProfileScreen() {
  const { state, setField, goNext, goToScreen, progress } = useDemo();
  const canContinue = state.firstName.trim().length > 0;
  return (
    <>
      <StatusBar />
      <AppBar onBack={() => goToScreen('welcome')} />
      <Progress value={progress} />
      <Screen
        footer={
          <Btn onClick={goNext} disabled={!canContinue}>
            Continue
          </Btn>
        }
      >
        <div className="lbl">Step 1 of 2</div>
        <h1 className="h">What should we call you?</h1>
        <div className="fld">
          <label>
            First name <em>Required</em>
          </label>
          <div className="inp focus">
            <input
              value={state.firstName}
              onChange={(e) => setField('firstName', e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <div className="fld">
          <label>
            Last name <em>Optional</em>
          </label>
          <div className="inp">
            <input value={state.lastName} onChange={(e) => setField('lastName', e.target.value)} />
          </div>
        </div>
        <div className="fld">
          <label>
            Home address <em>Optional</em>
          </label>
          <div className="inp">
            <MapPin />
            <input placeholder="Start typing your street" />
          </div>
          <span className="hint">
            <Info /> Used to find stores and delivery near you. Skip anytime.
          </span>
        </div>
        <div className="chips">
          <span className="chip dash">
            <Navigation size={14} /> Use my current location
          </span>
        </div>
        <p className="tiny" style={{ marginTop: 'auto' }}>
          Only your first name is required.
        </p>
      </Screen>
    </>
  );
}

export function InterestsScreen() {
  const { state, setInterest, goNext, goBack, progress } = useDemo();
  const keys = Object.keys(INTEREST_LABELS) as InterestKey[];
  return (
    <>
      <StatusBar />
      <AppBar onBack={goBack} />
      <Progress value={progress} />
      <Screen footer={<Btn onClick={goNext}>Build my setup</Btn>}>
        <h1 className="h sm">How interested are you in...</h1>
        <HigNote title="Dynamic Type">
          Each rating stacks the label above the scale, and every option is a 44 pt target.
        </HigNote>
        {keys.map((key) => {
          const Icon = ICONS[key];
          const level = state.interests[key];
          return (
            <div key={key} className="pcard interest-card" style={{ padding: '12px 14px' }}>
              <div className="row" style={{ gap: 8 }}>
                <Icon size={18} color="var(--sorrel)" aria-hidden="true" />
                <b style={{ fontSize: 15 }}>{INTEREST_LABELS[key]}</b>
              </div>
              <div className="seg" role="group" aria-label={INTEREST_LABELS[key]}>
                {(['Not for me', 'Some', 'Very'] as const).map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={level === i}
                    className={level === i ? 'on' : ''}
                    onClick={() => setInterest(key, i as 0 | 1 | 2)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </Screen>
    </>
  );
}

export function SetupPlanScreen() {
  const { state, stages, goNext, goBack, goToScreen, progress, finishSetup } = useDemo();
  const setupStages = stages.filter((s) => s.id === 30 || (s.id >= 3 && s.id <= 7));
  const firstActive = setupStages.find((s) => s.depth !== 'skip');
  const startLabel =
    firstActive?.id === 3
      ? 'Start with recipe books'
      : firstActive?.id === 30
        ? 'Start with Book Studio'
        : firstActive?.id === 4
          ? 'Start with your week'
          : firstActive
            ? `Start with ${firstActive.name.toLowerCase()}`
            : 'Go to home';

  return (
    <>
      <StatusBar />
      <AppBar onBack={goBack} />
      <Progress value={progress} />
      <Screen
        footer={
          <>
            <Btn
              onClick={() => {
                if (!firstActive) finishSetup();
                else goNext();
              }}
            >
              <ArrowRight /> {startLabel}
            </Btn>
            <button type="button" className="link" onClick={finishSetup}>
              Skip to my home screen
            </button>
          </>
        }
      >
        <h1 className="h sm">Your setup, {state.firstName}</h1>
        <p className="tiny">
          About {setupStages.filter((s) => s.depth !== 'skip').length * 2} minutes. Skip anything.
        </p>
        <div className="setup-list">
          {setupStages.map((s) => (
            <div key={s.id} className={`item ${s.depth === 'skip' ? 'off' : ''}`}>
              <span className={`check ${s.depth !== 'skip' ? '' : ''}`} />
              <div className="grow">
                <b style={{ fontSize: 13 }}>{s.name}</b>
                <div className="tiny">
                  {s.depth === 'skip'
                    ? 'Hidden for now'
                    : s.depth === 'quick'
                      ? 'Quick: required inputs only'
                      : 'Full setup'}
                </div>
              </div>
              <span className={`badge ${s.depth === 'full' ? 'ok' : s.depth === 'quick' ? 'ai' : ''}`}>
                {s.depth === 'skip' ? 'Off' : depthLabel(s.depth)}
              </span>
            </div>
          ))}
        </div>
        <SousBubble>
          <b>Sous</b> Change any rating and your path updates. You can always open skipped stages later in Settings.
        </SousBubble>
        <button type="button" className="link" onClick={() => goToScreen('interests')}>
          Change my interests
        </button>
      </Screen>
    </>
  );
}
