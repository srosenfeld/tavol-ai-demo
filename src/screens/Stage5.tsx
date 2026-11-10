import { Calendar, Leaf, Lock, Send, Sparkles, TriangleAlert, UserRound } from 'lucide-react';
import { Lockup } from '../components/Logo';
import { AppBar, Btn, Chip, HigNote, Progress, Screen, SousBubble, StatusBar } from '../components/ui';
import { useDemo } from '../state/demoStore';

function TagIcon({ kind }: { kind: 'strict' | 'diet' | 'soft' | 'ai' }) {
  if (kind === 'strict') return <TriangleAlert size={12} aria-hidden="true" />;
  if (kind === 'diet') return <Leaf size={12} aria-hidden="true" />;
  if (kind === 'ai') return <Sparkles size={12} aria-hidden="true" />;
  return <UserRound size={12} aria-hidden="true" />;
}

export function HhMembersScreen() {
  const { state, setField, parseAddMember, goNext, goBack, progress } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Your household" onBack={goBack} />
      <Progress value={progress} />
      <Screen
        footer={
          <Btn
            onClick={() => {
              parseAddMember();
              goNext();
            }}
          >
            Continue
          </Btn>
        }
      >
        <h1 className="h sm">Who do you cook for?</h1>
        <HigNote title="Responsibility">
          Allergies are always words plus an icon, never color alone, and invites are only sent after a confirm tap.
        </HigNote>
        {state.members.map((m) => (
          <div key={m.id} className="pcard">
            <div className="row">
              <span className="av" style={{ ['--c' as string]: m.color }} aria-hidden="true">
                {m.name[0]}
              </span>
              <div className="grow">
                <b style={{ fontSize: 15 }}>{m.name}</b>
                <div className="tiny">{m.ageLabel}</div>
              </div>
            </div>
            <div className="chips" style={{ marginTop: 7 }}>
              {m.tags.map((t) => (
                <Chip key={t.label} sm strict={t.kind === 'strict'} on={t.kind === 'diet'} ai={t.kind === 'ai'}>
                  <TagIcon kind={t.kind} />
                  {t.label}
                </Chip>
              ))}
            </div>
          </div>
        ))}
        <div className="fld">
          <label>Add someone</label>
          <div className="inp area focus" style={{ minHeight: 44 }}>
            <textarea
              rows={2}
              placeholder="My mom Ada, 70s, low sodium, loves fish"
              value={state.addMemberText}
              onChange={(e) => setField('addMemberText', e.target.value)}
              onBlur={parseAddMember}
            />
          </div>
        </div>
        <SousBubble>
          <b>Sous</b> I turn free-text needs into tags. Confirm any allergy I find before we save it as strict.
        </SousBubble>
      </Screen>
    </>
  );
}

export function HhInvitesScreen() {
  const { state, goNext, goBack, progress } = useDemo();
  const invitees = state.members.filter((m) => m.invite && !m.managed);
  const kids = state.members.filter((m) => m.managed);
  return (
    <>
      <StatusBar />
      <AppBar title="Invites" onBack={goBack} />
      <Progress value={progress} />
      <Screen
        footer={
          <>
            <Btn onClick={goNext}>
              <Send /> Send {invitees.length} invites
            </Btn>
            <button type="button" className="link" onClick={goNext}>
              Skip, I will handle it
            </button>
          </>
        }
      >
        <h1 className="h sm">Invite them to fill in their own?</h1>
        <p className="sub">They can confirm what you set or change it. Kids under 13 stay managed by you.</p>
        <div className="list">
          {invitees.map((m) => (
            <div key={m.id}>
              <span className="av" style={{ ['--c' as string]: m.color }}>
                {m.name[0]}
              </span>
              <div className="grow">
                <b style={{ fontSize: 13 }}>{m.name}</b>
                <div className="tiny">{m.contact}</div>
              </div>
              <span className="badge blue">{m.channel === 'text' ? 'Text' : 'Email'}</span>
            </div>
          ))}
          {kids.length ? (
            <div style={{ opacity: 0.55 }}>
              <span className="av" style={{ ['--c' as string]: 'var(--tomato)' }}>
                {kids[0].name[0]}
              </span>
              <div className="grow">
                <b style={{ fontSize: 13 }}>{kids.map((k) => k.name).join(', ')}</b>
                <div className="tiny">Managed by you</div>
              </div>
              <Lock size={14} />
            </div>
          ) : null}
        </div>
        <div className="lbl">Message preview</div>
        <div className="msg me">
          <div className="bub">
            {state.firstName} set up our family table on Tavol.io. Check your food preferences, takes 2 minutes:
            tavol.io/j/7Hq2
          </div>
        </div>
      </Screen>
    </>
  );
}

export function HhInviteeScreen() {
  const { state, setField, goNext, goBack } = useDemo();
  return (
    <>
      <StatusBar />
      <div className="web-url">
        <Lock size={12} /> tavol.io/j/7Hq2
      </div>
      <Screen
        footer={
          <>
            <Btn
              variant="apple"
              onClick={() => {
                setField('viewingAs', 'theo');
                goNext();
              }}
            >
              Continue with Apple
            </Btn>
            <Btn
              variant="google"
              onClick={() => {
                setField('viewingAs', 'theo');
                goNext();
              }}
            >
              <b style={{ color: '#4285F4' }}>G</b> Continue with Google
            </Btn>
            <button type="button" className="link" onClick={goNext}>
              Continue with phone number
            </button>
          </>
        }
      >
        <Lockup />
        <h1 className="h sm">Theo, {state.firstName} added you to the Okafor table</h1>
        <div className="avs">
          <span className="av" style={{ ['--c' as string]: 'var(--sorrel)' }}>
            D
          </span>
          <span className="av" style={{ ['--c' as string]: 'var(--tomato)' }}>
            M
          </span>
          <span className="av" style={{ ['--c' as string]: 'var(--saffron-700)' }}>
            L
          </span>
          <span className="av" style={{ ['--c' as string]: 'var(--beet)' }}>
            A
          </span>
        </div>
        <p className="sub">
          She filled in a few things for you. Check them, change anything, and you are done. No app needed.
        </p>
        <button type="button" className="link" onClick={goBack}>
          Back to Dana&apos;s phone
        </button>
      </Screen>
    </>
  );
}

export function HhOverrideScreen() {
  const { setField, goNext, goBack } = useDemo();
  return (
    <>
      <StatusBar />
      <AppBar title="Your profile" onBack={goBack} />
      <Screen
        footer={
          <Btn
            onClick={() => {
              setField('viewingAs', 'dana');
              goNext();
            }}
          >
            Confirm
          </Btn>
        }
      >
        <h1 className="h sm">Check what Dana set</h1>
        <div className="pcard">
          <div className="row sp">
            <b style={{ fontSize: 13 }}>Allergies</b>
            <span className="badge beet">Set by Dana</span>
          </div>
          <div className="chips" style={{ marginTop: 6 }}>
            <Chip sm strict>
              <TriangleAlert size={12} /> Shellfish
            </Chip>
          </div>
          <div className="tiny" style={{ marginTop: 4 }}>
            Only you can remove an allergy someone set for you.
          </div>
        </div>
        <div className="pcard">
          <div className="row sp">
            <b style={{ fontSize: 13 }}>Preferences</b>
            <span className="badge ok">You changed</span>
          </div>
          <div className="chips" style={{ marginTop: 6 }}>
            <Chip sm>Big eater</Chip>
            <Chip sm on>
              Spicy
            </Chip>
            <Chip sm on>
              No olives
            </Chip>
          </div>
        </div>
        <div className="pcard">
          <div className="row sp">
            <b style={{ fontSize: 13 }}>Your usual week</b>
            <span className="badge">Not set</span>
          </div>
          <div className="tiny">Takes 1 minute. Same grid Dana used.</div>
          <Btn variant="soft" className="sm" style={{ marginTop: 8 }}>
            <Calendar size={14} /> Fill my week
          </Btn>
        </div>
        <SousBubble>
          <b>Sous</b> Dana will see your changes. Your notes stay private unless you share them.
        </SousBubble>
      </Screen>
    </>
  );
}
