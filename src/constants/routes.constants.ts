export enum RoutesEnum {
  BASE = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  TASKS = '/tasks',
  CONFIRM_EMAIL = '/auth/confirm',
}

export const PROTECTED_ROUTES = [RoutesEnum.TASKS];
export const AUTH_ROUTES = [RoutesEnum.SIGN_IN, RoutesEnum.SIGN_UP];
