import type { InterestKey, InterestLevel } from '../data/seed';

export type Depth = 'skip' | 'quick' | 'full';
/** 30 = Book Studio (journey label 3B), sits between Recipe books and Just me */
export type StageId = 1 | 2 | 3 | 30 | 4 | 5 | 6 | 7 | 8;
export type BookPurpose = 'family' | 'creator' | 'personal';

export const STAGE_ORDER: StageId[] = [1, 2, 3, 30, 4, 5, 6, 7, 8];

export function stageRank(id: StageId): number {
  return STAGE_ORDER.indexOf(id);
}

export function isStageAtOrBefore(a: StageId, b: StageId): boolean {
  return stageRank(a) <= stageRank(b);
}

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
  | 'studio-purpose'
  | 'studio-cover'
  | 'studio-designer'
  | 'studio-book'
  | 'studio-pages'
  | 'studio-photos'
  | 'studio-story'
  | 'studio-collab'
  | 'studio-contribute'
  | 'studio-rights'
  | 'studio-publish'
  | 'studio-insights'
  | 'studio-cite'
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
  /** Sidebar / setup label — "3B" for Book Studio */
  label: string;
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
    { id: 1, label: '1', name: 'Sign in', depth: 'full' },
    { id: 2, label: '2', name: 'About you', depth: 'full' },
    { id: 3, label: '3', name: 'Recipe books', depth: depthFrom(interests.rec), interest: 'rec' },
    {
      id: 30,
      label: '3B',
      name: 'Book Studio',
      depth: interests.rec === 2 ? 'full' : 'skip',
      interest: 'rec',
    },
    { id: 4, label: '4', name: 'Just me', depth: depthFrom(interests.me), interest: 'me' },
    { id: 5, label: '5', name: 'Household', depth: depthFrom(interests.grp), interest: 'grp' },
    { id: 6, label: '6', name: 'Office', depth: depthFrom(interests.off), interest: 'off' },
    {
      id: 7,
      label: '7',
      name: 'Shared meals',
      depth: sharedLevel === 0 ? 'skip' : interests.party === 2 || interests.grp === 2 || interests.off === 2 ? 'full' : 'quick',
      interest: 'party',
    },
    { id: 8, label: '8', name: 'Home', depth: 'full' },
  ];
}

export function buildRoutePlan(
  interests: Record<InterestKey, InterestLevel>,
  bookPurpose: BookPurpose = 'family',
): RouteStep[] {
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
      { id: 'book-name', stage: 3, title: 'Start your first recipe book', progress: 0.38 },
      { id: 'book-add', stage: 3, title: 'Add your first pages', progress: 0.4 },
      { id: 'book-import', stage: 3, title: 'Importing', progress: 0.42 },
      { id: 'book-review', stage: 3, title: 'Review page', progress: 0.44 },
    );
    if (s3.depth === 'full') {
      steps.push(
        { id: 'book-ingredients', stage: 3, title: 'Ingredients', progress: 0.46 },
        { id: 'book-steps', stage: 3, title: 'Steps', progress: 0.48 },
        { id: 'book-style', stage: 3, title: 'Style', progress: 0.5 },
      );
    }
  }

  const s3b = stages.find((s) => s.id === 30)!;
  if (s3b.depth !== 'skip') {
    const shared = bookPurpose !== 'personal';
    steps.push(
      { id: 'studio-purpose', stage: 30, title: "What kind of book is this?", progress: 0.52 },
      { id: 'studio-cover', stage: 30, title: 'Choose a cover', progress: 0.54 },
      { id: 'studio-designer', stage: 30, title: 'Edit cover', progress: 0.56 },
      { id: 'studio-book', stage: 30, title: 'Front, spine and back', progress: 0.58 },
      { id: 'studio-pages', stage: 30, title: 'Pages and personal', progress: 0.6 },
      { id: 'studio-photos', stage: 30, title: 'Photos', progress: 0.62 },
      { id: 'studio-story', stage: 30, title: 'Story pages', progress: 0.64 },
    );
    if (shared) {
      steps.push(
        { id: 'studio-collab', stage: 30, title: 'Collaborators', progress: 0.66 },
        { id: 'studio-contribute', stage: 30, title: 'Contribute without the app', progress: 0.68 },
        { id: 'studio-rights', stage: 30, title: 'Share and remix rights', progress: 0.7 },
        { id: 'studio-publish', stage: 30, title: 'Publish', progress: 0.72 },
        { id: 'studio-insights', stage: 30, title: 'Insights', progress: 0.74 },
      );
    }
    steps.push({ id: 'studio-cite', stage: 30, title: 'Citation', progress: 0.76 });
  }

  const s4 = stages.find((s) => s.id === 4)!;
  if (s4.depth !== 'skip') {
    steps.push({ id: 'week-grid', stage: 4, title: 'Your usual week', progress: 0.78 });
    if (s4.depth === 'full') {
      steps.push(
        { id: 'week-cook', stage: 4, title: 'What do you usually cook?', progress: 0.8 },
        { id: 'week-approve', stage: 4, title: 'Review recipes', progress: 0.82 },
        { id: 'week-stores', stage: 4, title: 'Where do you shop?', progress: 0.84 },
        { id: 'week-kits', stage: 4, title: 'Meal kits & delivery', progress: 0.86 },
        { id: 'week-voice', stage: 4, title: 'Where do you get food?', progress: 0.87 },
        { id: 'week-regulars', stage: 4, title: 'Your regulars', progress: 0.88 },
        { id: 'week-apps', stage: 4, title: 'Delivery apps', progress: 0.89 },
      );
    } else {
      steps.push({ id: 'week-stores', stage: 4, title: 'Where do you shop?', progress: 0.84 });
    }
    steps.push({ id: 'week-diet', stage: 4, title: 'Dietary needs', progress: 0.9 });
  }

  const s5 = stages.find((s) => s.id === 5)!;
  if (s5.depth !== 'skip') {
    steps.push({ id: 'hh-members', stage: 5, title: 'Who do you cook for?', progress: 0.91 });
    if (s5.depth === 'full') {
      steps.push(
        { id: 'hh-invites', stage: 5, title: 'Invites', progress: 0.92 },
        { id: 'hh-invitee', stage: 5, title: 'Invite landing', progress: 0.93 },
        { id: 'hh-override', stage: 5, title: 'Check what Dana set', progress: 0.94 },
      );
    }
  }

  const s6 = stages.find((s) => s.id === 6)!;
  if (s6.depth !== 'skip') {
    steps.push(
      { id: 'office-team', stage: 6, title: 'Office team', progress: 0.95 },
      { id: 'office-budget', stage: 6, title: 'Budget and rules', progress: 0.96 },
    );
    if (s6.depth === 'full') {
      steps.push({ id: 'office-needs', stage: 6, title: 'Team needs', progress: 0.97 });
    }
  }

  const s7 = stages.find((s) => s.id === 7)!;
  if (s7.depth !== 'skip') {
    steps.push(
      { id: 'shared-mark', stage: 7, title: 'Mark shared', progress: 0.975 },
      { id: 'shared-hub', stage: 7, title: "Ade's birthday", progress: 0.98 },
    );
    if (s7.depth === 'full') {
      steps.push(
        { id: 'shared-vote', stage: 7, title: 'Vote', progress: 0.985 },
        { id: 'shared-ingredients', stage: 7, title: 'Ingredients', progress: 0.99 },
        { id: 'shared-sous', stage: 7, title: 'Ask Sous', progress: 0.993 },
      );
    }
    steps.push({ id: 'shared-locked', stage: 7, title: "It's decided", progress: 0.996 });
  }

  steps.push({ id: 'home', stage: 8, title: 'Today', progress: 1 });
  return steps;
}

export function depthLabel(d: Depth): string {
  if (d === 'skip') return 'Off';
  if (d === 'quick') return 'Quick';
  return 'Full';
}
