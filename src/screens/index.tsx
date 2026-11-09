import type { ComponentType } from 'react';
import type { ScreenId } from '../flow/routePlan';
import {
  InterestsScreen,
  LoginScreen,
  ProfileScreen,
  SetupPlanScreen,
  SignupScreen,
  WelcomeScreen,
} from './Stage12';
import {
  BookAddScreen,
  BookImportScreen,
  BookIngredientsScreen,
  BookNameScreen,
  BookReviewScreen,
  BookStepsScreen,
  BookStyleScreen,
} from './Stage3';
import {
  WeekApproveScreen,
  WeekAppsScreen,
  WeekCookScreen,
  WeekDietScreen,
  WeekGridScreen,
  WeekKitsScreen,
  WeekRegularsScreen,
  WeekStoresScreen,
  WeekVoiceScreen,
} from './Stage4';
import { HhInviteeScreen, HhInvitesScreen, HhMembersScreen, HhOverrideScreen } from './Stage5';
import { OfficeBudgetScreen, OfficeNeedsScreen, OfficeTeamScreen } from './Stage6';
import {
  SharedHubScreen,
  SharedIngredientsScreen,
  SharedLockedScreen,
  SharedMarkScreen,
  SharedSousScreen,
  SharedVoteScreen,
} from './Stage7';
import { HomeScreen } from './Home';

const SCREENS: Record<ScreenId, ComponentType> = {
  welcome: WelcomeScreen,
  signup: SignupScreen,
  login: LoginScreen,
  profile: ProfileScreen,
  interests: InterestsScreen,
  'setup-plan': SetupPlanScreen,
  'book-name': BookNameScreen,
  'book-add': BookAddScreen,
  'book-import': BookImportScreen,
  'book-review': BookReviewScreen,
  'book-ingredients': BookIngredientsScreen,
  'book-steps': BookStepsScreen,
  'book-style': BookStyleScreen,
  'week-grid': WeekGridScreen,
  'week-cook': WeekCookScreen,
  'week-approve': WeekApproveScreen,
  'week-stores': WeekStoresScreen,
  'week-kits': WeekKitsScreen,
  'week-voice': WeekVoiceScreen,
  'week-regulars': WeekRegularsScreen,
  'week-apps': WeekAppsScreen,
  'week-diet': WeekDietScreen,
  'hh-members': HhMembersScreen,
  'hh-invites': HhInvitesScreen,
  'hh-invitee': HhInviteeScreen,
  'hh-override': HhOverrideScreen,
  'office-team': OfficeTeamScreen,
  'office-budget': OfficeBudgetScreen,
  'office-needs': OfficeNeedsScreen,
  'shared-mark': SharedMarkScreen,
  'shared-hub': SharedHubScreen,
  'shared-vote': SharedVoteScreen,
  'shared-ingredients': SharedIngredientsScreen,
  'shared-sous': SharedSousScreen,
  'shared-locked': SharedLockedScreen,
  home: HomeScreen,
};

export function CurrentScreen({ id }: { id: ScreenId }) {
  const Comp = SCREENS[id] ?? WelcomeScreen;
  return <Comp />;
}
