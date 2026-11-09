import type { InterestKey, InterestLevel } from '../data/seed';

export type Depth = 'skip' | 'quick' | 'full';
export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ScreenId =
  | 'welcome'
  | 'signup'
  | 'login'
  | 'profile'
  | 'interests'
  | 'setup-plan'
  | 'book-name'
  | 'book-add'
  | 'book-import'
  | 'book-review'
  | 'book-ingredients'
  | 'book-steps'
  | 'book-style'
  | 'week-grid'
  | 'week-cook'
  | 'week-approve'
  | 'week-stores'
  | 'week-kits'
  | 'week-voice'
  | 'week-regulars'
  | 'week-apps'
  | 'week-diet'
  | 'hh-members'
  | 'hh-invites'
  | 'hh-invitee'
  | 'hh-override'
  | 'office-team'
  | 'office-budget'
  | 'office-needs'
  | 'shared-mark'
  | 'shared-hub'
  | 'shared-vote'
  | 'shared-ingredients'
  | 'shared-sous'
  | 'shared-locked'
  | 'home';

export interface RouteStep {
  id: ScreenId;
  stage: StageId;
  title: string;
  progress?: number;
}

export interface StageMeta {
  id: StageId;
  name: string;
  depth: Depth;
  interest?: InterestKey;
}

function depthFrom(level: InterestLevel): Depth {
  if (level === 0) return 'skip';
  if (level === 1) return 'quick';
  return 'full';
}

export function buildStageMeta(interests: Record<InterestKey, InterestLevel>): StageMeta[] {
  const sharedLevel = Math.max(interests.grp, interests.party, interests.off) as InterestLevel;
  return [
    { id: 1, name: 'Sign in', depth: 'full' },
    { id: 2, name: 'About you', depth: 'full' },
    { id: 3, name: 'Recipe books', depth: depthFrom(interests.rec), interest: 'rec' },
    { id: 4, name: 'Just me', depth: depthFrom(interests.me), interest: 'me' },
    { id: 5, name: 'Household', depth: depthFrom(interests.grp), interest: 'grp' },
    { id: 6, name: 'Office', depth: depthFrom(interests.off), interest: 'off' },
    {
      id: 7,
      name: 'Shared meals',
      depth: sharedLevel === 0 ? 'skip' : interests.party === 2 || interests.grp === 2 || interests.off === 2 ? 'full' : 'quick',
      interest: 'party',
    },
    { id: 8, name: 'Home', depth: 'full' },
  ];
}

export function buildRoutePlan(interests: Record<InterestKey, InterestLevel>): RouteStep[] {
  const stages = buildStageMeta(interests);
  const steps: RouteStep[] = [];

  // Stage 1
  steps.push(
    { id: 'welcome', stage: 1, title: 'Welcome', progress: 0.05 },
    { id: 'signup', stage: 1, title: 'Create account', progress: 0.1 },
    { id: 'login', stage: 1, title: 'Log in', progress: 0.12 },
  );

  // Stage 2
  steps.push(
    { id: 'profile', stage: 2, title: 'What should we call you?', progress: 0.18 },
    { id: 'interests', stage: 2, title: 'How interested are you', progress: 0.28 },
    { id: 'setup-plan', stage: 2, title: 'Your setup', progress: 0.35 },
  );

  const s3 = stages.find((s) => s.id === 3)!;
  if (s3.depth !== 'skip') {
    steps.push(
      { id: 'book-name', stage: 3, title: 'Start your first recipe book', progress: 0.4 },
      { id: 'book-add', stage: 3, title: 'Add your first pages', progress: 0.44 },
      { id: 'book-import', stage: 3, title: 'Importing', progress: 0.48 },
      { id: 'book-review', stage: 3, title: 'Review page', progress: 0.52 },
    );
    if (s3.depth === 'full') {
      steps.push(
        { id: 'book-ingredients', stage: 3, title: 'Ingredients', progress: 0.55 },
        { id: 'book-steps', stage: 3, title: 'Steps', progress: 0.58 },
        { id: 'book-style', stage: 3, title: 'Style', progress: 0.62 },
      );
    }
  }

  const s4 = stages.find((s) => s.id === 4)!;
  if (s4.depth !== 'skip') {
    steps.push({ id: 'week-grid', stage: 4, title: 'Your usual week', progress: 0.66 });
    if (s4.depth === 'full') {
      steps.push(
        { id: 'week-cook', stage: 4, title: 'What do you usually cook?', progress: 0.7 },
        { id: 'week-approve', stage: 4, title: 'Review recipes', progress: 0.72 },
        { id: 'week-stores', stage: 4, title: 'Where do you shop?', progress: 0.75 },
        { id: 'week-kits', stage: 4, title: 'Meal kits & delivery', progress: 0.78 },
        { id: 'week-voice', stage: 4, title: 'Where do you get food?', progress: 0.8 },
        { id: 'week-regulars', stage: 4, title: 'Your regulars', progress: 0.82 },
        { id: 'week-apps', stage: 4, title: 'Delivery apps', progress: 0.84 },
      );
    } else {
      steps.push({ id: 'week-stores', stage: 4, title: 'Where do you shop?', progress: 0.75 });
    }
    steps.push({ id: 'week-diet', stage: 4, title: 'Dietary needs', progress: 0.86 });
  }

  const s5 = stages.find((s) => s.id === 5)!;
  if (s5.depth !== 'skip') {
    steps.push({ id: 'hh-members', stage: 5, title: 'Who do you cook for?', progress: 0.88 });
    if (s5.depth === 'full') {
      steps.push(
        { id: 'hh-invites', stage: 5, title: 'Invites', progress: 0.9 },
        { id: 'hh-invitee', stage: 5, title: 'Invite landing', progress: 0.91 },
        { id: 'hh-override', stage: 5, title: 'Check what Dana set', progress: 0.92 },
      );
    }
  }

  const s6 = stages.find((s) => s.id === 6)!;
  if (s6.depth !== 'skip') {
    steps.push(
      { id: 'office-team', stage: 6, title: 'Office team', progress: 0.93 },
      { id: 'office-budget', stage: 6, title: 'Budget and rules', progress: 0.94 },
    );
    if (s6.depth === 'full') {
      steps.push({ id: 'office-needs', stage: 6, title: 'Team needs', progress: 0.95 });
    }
  }

  const s7 = stages.find((s) => s.id === 7)!;
  if (s7.depth !== 'skip') {
    steps.push(
      { id: 'shared-mark', stage: 7, title: 'Mark shared', progress: 0.96 },
      { id: 'shared-hub', stage: 7, title: "Ade's birthday", progress: 0.97 },
    );
    if (s7.depth === 'full') {
      steps.push(
        { id: 'shared-vote', stage: 7, title: 'Vote', progress: 0.98 },
        { id: 'shared-ingredients', stage: 7, title: 'Ingredients', progress: 0.985 },
        { id: 'shared-sous', stage: 7, title: 'Ask Sous', progress: 0.99 },
      );
    }
    steps.push({ id: 'shared-locked', stage: 7, title: "It's decided", progress: 0.995 });
  }

  steps.push({ id: 'home', stage: 8, title: 'Today', progress: 1 });
  return steps;
}

export function depthLabel(d: Depth): string {
  if (d === 'skip') return 'Off';
  if (d === 'quick') return 'Quick';
  return 'Full';
}
