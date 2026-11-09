import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_INTERESTS,
  DELIVERY_APPS,
  IMPORT_QUEUE,
  MEAL_KITS,
  SEED_MEMBERS,
  STORES,
  SUGGESTED_RECIPES,
  defaultWeekGrid,
  type InterestKey,
  type InterestLevel,
  type MealMode,
  type Member,
  type RecipeCard,
  type VoteValue,
} from '../data/seed';
import { buildRoutePlan, buildStageMeta, type RouteStep, type ScreenId, type StageMeta } from '../flow/routePlan';

const STORAGE_KEY = 'tavol-demo-v1';

export type TabId = 'today' | 'plan' | 'books' | 'table' | 'you';

interface DemoState {
  firstName: string;
  lastName: string;
  email: string;
  interests: Record<InterestKey, InterestLevel>;
  bookTitle: string;
  coverColor: string;
  dedication: string;
  titleFont: 'modern' | 'classic' | 'script';
  importItems: RecipeCard[];
  suggestedRecipes: RecipeCard[];
  weekGrid: MealMode[];
  breakfastText: string;
  dinnerText: string;
  stores: typeof STORES;
  mealKits: string[];
  instacartConnected: boolean;
  deliveryApps: typeof DELIVERY_APPS;
  allergies: string[];
  diets: string[];
  dislikes: string;
  dislikeTags: string[];
  members: Member[];
  addMemberText: string;
  voteIndex: number;
  votes: Record<string, VoteValue>;
  sharedWith: string[];
  setupComplete: boolean;
  stepIndex: number;
  activeTab: TabId;
  showConnectSheet: boolean;
  viewingAs: 'dana' | 'theo';
}

function initialState(): DemoState {
  return {
    firstName: 'Dana',
    lastName: 'Okafor',
    email: 'dana.okafor@gmail.com',
    interests: { ...DEFAULT_INTERESTS },
    bookTitle: 'Okafor Family Table',
    coverColor: 'var(--beet)',
    dedication: 'For Ada, who fed all of us',
    titleFont: 'classic',
    importItems: IMPORT_QUEUE.map((r) => ({ ...r })),
    suggestedRecipes: SUGGESTED_RECIPES.map((r) => ({ ...r })),
    weekGrid: defaultWeekGrid(),
    breakfastText: 'Overnight oats or eggs and toast. Smoothies when I am rushing.',
    dinnerText: "Sheet pan chicken, tacos on tuesdays, my mom's sunday sauce, salmon and rice",
    stores: STORES.map((s) => ({ ...s })),
    mealKits: ['HelloFresh'],
    instacartConnected: false,
    deliveryApps: DELIVERY_APPS.map((a) => ({ ...a })),
    allergies: ['Tree nuts'],
    diets: ['Pescatarian'],
    dislikes: 'Not a fan of cilantro. Trying to eat less red meat.',
    dislikeTags: ['No cilantro', 'Limit red meat'],
    members: SEED_MEMBERS.map((m) => ({ ...m, tags: m.tags.map((t) => ({ ...t })) })),
    addMemberText: '',
    voteIndex: 0,
    votes: {},
    sharedWith: ['Household', 'Ade', 'Priya'],
    setupComplete: false,
    stepIndex: 0,
    activeTab: 'today',
    showConnectSheet: false,
    viewingAs: 'dana',
  };
}

function loadState(): DemoState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState();
    return { ...initialState(), ...JSON.parse(raw) };
  } catch {
    return initialState();
  }
}

interface DemoContextValue {
  state: DemoState;
  route: RouteStep[];
  stages: StageMeta[];
  current: RouteStep;
  progress: number;
  setField: <K extends keyof DemoState>(key: K, value: DemoState[K]) => void;
  setInterest: (key: InterestKey, level: InterestLevel) => void;
  goNext: () => void;
  goBack: () => void;
  goToScreen: (id: ScreenId) => void;
  goToStage: (stageId: number) => void;
  reset: () => void;
  cycleWeekCell: (index: number) => void;
  toggleStore: (id: string) => void;
  toggleKit: (name: string) => void;
  toggleApp: (id: string) => void;
  toggleAllergy: (name: string) => void;
  toggleDiet: (name: string) => void;
  toggleRecipe: (id: string) => void;
  setVote: (id: string, value: VoteValue) => void;
  finishSetup: () => void;
  parseAddMember: () => void;
  animateImports: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(loadState);

  const route = useMemo(() => buildRoutePlan(state.interests), [state.interests]);
  const stages = useMemo(() => buildStageMeta(state.interests), [state.interests]);

  // Clamp step when route shrinks
  useEffect(() => {
    if (state.stepIndex >= route.length) {
      setState((s) => ({ ...s, stepIndex: Math.max(0, route.length - 1) }));
    }
  }, [route.length, state.stepIndex]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const current = route[Math.min(state.stepIndex, route.length - 1)] ?? route[0];
  const progress = current?.progress ?? 0;

  const setField = useCallback(<K extends keyof DemoState>(key: K, value: DemoState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
  }, []);

  const setInterest = useCallback((key: InterestKey, level: InterestLevel) => {
    setState((s) => ({ ...s, interests: { ...s.interests, [key]: level } }));
  }, []);

  const goNext = useCallback(() => {
    setState((s) => {
      const r = buildRoutePlan(s.interests);
      const next = Math.min(s.stepIndex + 1, r.length - 1);
      const done = r[next]?.id === 'home' || s.setupComplete;
      return { ...s, stepIndex: next, setupComplete: done || r[next]?.stage === 8 };
    });
  }, []);

  const goBack = useCallback(() => {
    setState((s) => {
      if (s.setupComplete) {
        const r = buildRoutePlan(s.interests);
        const homeIdx = r.findIndex((x) => x.id === 'home');
        if (homeIdx >= 0 && r[s.stepIndex]?.id !== 'home') {
          return { ...s, stepIndex: homeIdx, activeTab: 'today' };
        }
      }
      return { ...s, stepIndex: Math.max(0, s.stepIndex - 1) };
    });
  }, []);

  const goToScreen = useCallback((id: ScreenId) => {
    setState((s) => {
      const r = buildRoutePlan(s.interests);
      const idx = r.findIndex((x) => x.id === id);
      if (idx < 0) return s;
      return { ...s, stepIndex: idx, setupComplete: r[idx].stage === 8 || s.setupComplete };
    });
  }, []);

  const goToStage = useCallback((stageId: number) => {
    setState((s) => {
      const r = buildRoutePlan(s.interests);
      const idx = r.findIndex((x) => x.stage === stageId);
      if (idx < 0) return s;
      return { ...s, stepIndex: idx };
    });
  }, []);

  const reset = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setState(initialState());
  }, []);

  const cycleWeekCell = useCallback((index: number) => {
    setState((s) => {
      const weekGrid = [...s.weekGrid];
      weekGrid[index] = (((weekGrid[index] + 1) % 5) as MealMode);
      return { ...s, weekGrid };
    });
  }, []);

  const toggleStore = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      stores: s.stores.map((x) => (x.id === id ? { ...x, selected: !x.selected } : x)),
    }));
  }, []);

  const toggleKit = useCallback((name: string) => {
    setState((s) => {
      const has = s.mealKits.includes(name);
      return {
        ...s,
        mealKits: has ? s.mealKits.filter((k) => k !== name) : [...s.mealKits, name],
      };
    });
  }, []);

  const toggleApp = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      deliveryApps: s.deliveryApps.map((x) => (x.id === id ? { ...x, selected: !x.selected } : x)),
    }));
  }, []);

  const toggleAllergy = useCallback((name: string) => {
    setState((s) => ({
      ...s,
      allergies: s.allergies.includes(name)
        ? s.allergies.filter((a) => a !== name)
        : [...s.allergies, name],
    }));
  }, []);

  const toggleDiet = useCallback((name: string) => {
    setState((s) => ({
      ...s,
      diets: s.diets.includes(name) ? s.diets.filter((d) => d !== name) : [...s.diets, name],
    }));
  }, []);

  const toggleRecipe = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      suggestedRecipes: s.suggestedRecipes.map((r) =>
        r.id === id ? { ...r, selected: !r.selected } : r,
      ),
    }));
  }, []);

  const setVote = useCallback((id: string, value: VoteValue) => {
    setState((s) => ({ ...s, votes: { ...s.votes, [id]: value } }));
  }, []);

  const finishSetup = useCallback(() => {
    setState((s) => {
      const r = buildRoutePlan(s.interests);
      const homeIdx = r.findIndex((x) => x.id === 'home');
      return { ...s, setupComplete: true, stepIndex: homeIdx >= 0 ? homeIdx : r.length - 1, activeTab: 'today' };
    });
  }, []);

  const parseAddMember = useCallback(() => {
    setState((s) => {
      const text = s.addMemberText.trim();
      if (!text) return s;
      const lower = text.toLowerCase();
      const tags: Member['tags'] = [];
      if (lower.includes('low sodium') || lower.includes('sodium')) tags.push({ kind: 'diet', label: 'Low sodium' });
      if (lower.includes('fish')) tags.push({ kind: 'ai', label: 'Loves fish' });
      if (lower.includes('nut')) tags.push({ kind: 'strict', label: 'Tree nuts' });
      const nameMatch = text.match(/^([^,\d]+)/);
      const name = (nameMatch?.[1] || 'Guest').replace(/^my\s+(mom|dad|sister|brother)\s*/i, '').trim() || 'Ada';
      const member: Member = {
        id: `m-${Date.now()}`,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        ageLabel: /\d0s|70|65|elder/i.test(text) ? '65+' : 'Adult',
        color: 'var(--beet)',
        tags: tags.length ? tags : [{ kind: 'ai', label: 'From your note' }],
        contact: lower.includes('@') ? text.match(/\S+@\S+/)?.[0] : undefined,
        channel: 'email',
        invite: true,
      };
      return { ...s, members: [...s.members, member], addMemberText: '' };
    });
  }, []);

  const animateImports = useCallback(() => {
    setState((s) => ({
      ...s,
      importItems: s.importItems.map((item, i) =>
        item.status === 'importing' ? { ...item, status: i % 2 === 0 ? 'ready' : 'ready' } : item,
      ),
    }));
  }, []);

  const value: DemoContextValue = {
    state,
    route,
    stages,
    current,
    progress,
    setField,
    setInterest,
    goNext,
    goBack,
    goToScreen,
    goToStage,
    reset,
    cycleWeekCell,
    toggleStore,
    toggleKit,
    toggleApp,
    toggleAllergy,
    toggleDiet,
    toggleRecipe,
    setVote,
    finishSetup,
    parseAddMember,
    animateImports,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within DemoProvider');
  return ctx;
}

export { MEAL_KITS };
