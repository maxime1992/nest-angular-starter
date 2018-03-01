import { Action } from '@ngrx/store';

export const SET_LANGUAGE = 'Set language';
export class SetLanguage implements Action {
  readonly type = SET_LANGUAGE;

  constructor(public payload: { language: string }) {}
}

export const TOGGLE_SIDENAV = 'Toggle sidenav';
export class ToggleSidenav implements Action {
  readonly type = TOGGLE_SIDENAV;

  constructor() {}
}

export const OPEN_SIDENAV = 'Open sidenav';
export class OpenSidenav implements Action {
  readonly type = OPEN_SIDENAV;

  constructor() {}
}

export const CLOSE_SIDENAV = 'Close sidenav';
export class CloseSidenav implements Action {
  readonly type = CLOSE_SIDENAV;

  constructor() {}
}

export type All = SetLanguage | ToggleSidenav | OpenSidenav | CloseSidenav;
