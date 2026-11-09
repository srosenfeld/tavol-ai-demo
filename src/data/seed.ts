import { asset } from '../asset';

export type InterestKey = 'rec' | 'me' | 'grp' | 'party' | 'off';
export type InterestLevel = 0 | 1 | 2;
export type MealMode = 0 | 1 | 2 | 3 | 4; // home, else, order_in, eat_out, other
export type VoteValue = 'yum' | 'fine' | 'pass' | null;

export const INTEREST_LABELS: Record<InterestKey, string> = {
  rec: 'Recipe books',
  me: 'Planning meals for me',
  grp: 'Family and groups',
  party: 'Dinner parties',
  off: 'Office meals',
};

export const INTEREST_ICONS: Record<InterestKey, string> = {
  rec: 'book-open',
  me: 'user-round',
  grp: 'users',
  party: 'party-popper',
  off: 'building-2',
};

export const DEFAULT_INTERESTS: Record<InterestKey, InterestLevel> = {
  rec: 2,
  me: 2,
  grp: 1,
  party: 2,
  off: 0,
};

export const MEAL_MODES = [
  { id: 0 as MealMode, cls: 'm-home', icon: 'house', label: 'Cook at home' },
  { id: 1 as MealMode, cls: 'm-else', icon: 'chef-hat', label: 'Cook elsewhere' },
  { id: 2 as MealMode, cls: 'm-in', icon: 'bike', label: 'Order in' },
  { id: 3 as MealMode, cls: 'm-out', icon: 'utensils', label: 'Eat out' },
  { id: 4 as MealMode, cls: 'm-oth', icon: 'ellipsis', label: 'Other' },
] as const;

export const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;
export const SLOTS = ['Bkfst', 'Lunch', 'Dinner', 'Snack', 'Drink'] as const;

/** Default week pattern matching the journey guide mockup */
export function defaultWeekGrid(): MealMode[] {
  // 5 slots × 7 days
  const g: MealMode[] = [];
  // Breakfast: home x5, out Sat, else Sun
  g.push(0, 0, 0, 0, 0, 3, 1);
  // Lunch
  g.push(4, 0, 4, 0, 2, 3, 0);
  // Dinner
  g.push(0, 0, 2, 0, 3, 0, 1);
  // Snack
  g.push(0, 0, 0, 0, 0, 0, 0);
  // Drink
  g.push(0, 0, 0, 0, 0, 3, 3);
  return g;
}

export interface Member {
  id: string;
  name: string;
  ageLabel: string;
  color: string;
  tags: { kind: 'strict' | 'diet' | 'soft' | 'ai'; label: string }[];
  contact?: string;
  channel?: 'text' | 'email';
  managed?: boolean;
  invite?: boolean;
}

export const SEED_MEMBERS: Member[] = [
  {
    id: 'theo',
    name: 'Theo',
    ageLabel: 'Adult',
    color: 'var(--blueberry)',
    tags: [
      { kind: 'strict', label: 'Shellfish' },
      { kind: 'soft', label: 'Big eater' },
    ],
    contact: '(203) 555-0144',
    channel: 'text',
    invite: true,
  },
  {
    id: 'maya',
    name: 'Maya',
    ageLabel: 'Age 9',
    color: 'var(--tomato)',
    tags: [
      { kind: 'diet', label: 'Vegetarian' },
      { kind: 'ai', label: 'No mushrooms' },
    ],
    managed: true,
  },
  {
    id: 'leo',
    name: 'Leo',
    ageLabel: 'Age 5',
    color: 'var(--saffron-700)',
    tags: [
      { kind: 'strict', label: 'Peanuts' },
      { kind: 'ai', label: 'Mild only' },
    ],
    managed: true,
  },
];

export interface RecipeCard {
  id: string;
  name: string;
  meta: string;
  tone: string;
  image?: string;
  status?: 'ready' | 'linked' | 'new' | 'importing';
  selected?: boolean;
}

export const IMPORT_QUEUE: RecipeCard[] = [
  { id: 'sauce', name: 'Sunday Sauce', meta: 'Photo. Handwriting read', tone: '#9A3A62', image: asset('brand/salsa.jpg'), status: 'ready' },
  { id: 'chicken', name: 'Sheet-pan chicken', meta: 'nytcooking.com link', tone: '#C4441F', image: asset('brand/sheetpan.jpg'), status: 'ready' },
  { id: 'focaccia', name: 'Rosemary focaccia', meta: 'Video. Transcribing steps', tone: '#F0B033', image: asset('brand/focaccia.jpg'), status: 'importing' },
  { id: 'paste', name: 'Pasted text', meta: 'Looks like 2 recipes. Splitting', tone: '#3D5A80', image: asset('brand/pasta.jpg'), status: 'importing' },
];

export const SUGGESTED_RECIPES: RecipeCard[] = [
  { id: 'chicken', name: 'Sheet-pan chicken thighs', meta: 'Dinner. 9 ingredients. 45 min', tone: '#C4441F', image: asset('brand/sheetpan.jpg'), selected: true },
  { id: 'tacos', name: 'Tuesday chicken tacos', meta: 'Dinner. 11 ingredients. 30 min', tone: '#F0B033', image: asset('brand/tacos.jpg'), selected: true },
  { id: 'sauce', name: 'Sunday Sauce', meta: 'Already in your book', tone: '#9A3A62', image: asset('brand/salsa.jpg'), status: 'linked', selected: false },
  { id: 'salmon', name: 'Salmon and rice bowls', meta: 'Dinner. 8 ingredients. 25 min', tone: '#3D5A80', image: asset('brand/salmon.jpg'), selected: true },
  { id: 'salad', name: 'Chickpea big salad', meta: 'Lunch. 10 ingredients', tone: '#2F5E3D', image: asset('brand/platter.jpg'), status: 'new', selected: true },
];

export const STORES = [
  { id: 'ss', name: 'Stop & Shop', meta: '0.8 mi. On Instacart', color: '#E02F2F', letter: 'S', selected: true },
  { id: 'wf', name: 'Whole Foods Market', meta: '1.6 mi. On Amazon', color: '#00674B', letter: 'W', selected: true },
  { id: 'tj', name: "Trader Joe's", meta: '2.1 mi. In store only', color: '#B5121B', letter: 'T', selected: false },
  { id: 'co', name: 'Costco', meta: '5.4 mi. On Instacart', color: '#1F4E9C', letter: 'C', selected: false },
];

export const MEAL_KITS = ['HelloFresh', 'Marley Spoon', 'Home Chef', 'Blue Apron'];

export const DELIVERY_APPS = [
  { id: 'dd', name: 'DoorDash', meta: 'Open your usual order in one tap', color: '#EB1700', letter: 'D', selected: true },
  { id: 'ue', name: 'Uber Eats', meta: 'Open your usual order in one tap', color: '#06C167', letter: 'U', selected: true },
  { id: 'gh', name: 'Grubhub', meta: '', color: '#F63440', letter: 'G', selected: false },
  { id: 'ot', name: 'OpenTable', meta: 'For eating out', color: '#DA3743', letter: 'O', selected: true },
];

export const ALLERGIES = ['Tree nuts', 'Peanuts', 'Shellfish', 'Gluten', 'Dairy', 'Eggs', 'Sesame'];
export const DIETS = ['Pescatarian', 'Vegetarian', 'Vegan', 'Halal'];

export const VOTE_OPTIONS = [
  {
    id: 'rigatoni',
    name: 'Sunday Sauce rigatoni',
    meta: 'From Okafor Family Table. Vegetarian. Nut free',
    tone: '#9A3A62',
    image: asset('brand/pasta.jpg'),
    fits: true,
    price: '$4.10 a plate',
  },
  {
    id: 'salmon',
    name: 'Miso glazed salmon',
    meta: "From Priya's Plant Kitchen. Shellfish free",
    tone: '#3D5A80',
    image: asset('brand/salmon.jpg'),
    fits: true,
    price: '$6.20 a plate',
  },
  {
    id: 'tacos',
    name: 'Build-your-own taco bar',
    meta: 'Mild for kids. Two vegetarian fillings',
    tone: '#F0B033',
    image: asset('brand/tacos.jpg'),
    fits: true,
    price: '$3.80 a plate',
  },
];

export const COVER_COLORS = [
  'var(--sorrel)',
  'var(--beet)',
  'var(--tomato)',
  'var(--saffron)',
  'var(--blueberry)',
  'var(--ink)',
];
