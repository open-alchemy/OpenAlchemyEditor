import { Action, createReducer, on } from '@ngrx/store';

import { calculateLimitedSpecInfo } from '../../helpers/calculate-limited-spec-info';
import * as EditorActions from '../editor/editor.actions';
import { LimitedSpecInfo } from './types';

export interface PackageSpecState {
  info: LimitedSpecInfo;
  beingEdited: boolean;
  value: string | null;
  valid: boolean | null;
}
export interface PackageState {
  spec: PackageSpecState;
}

export const initialState: PackageState = {
  spec: {
    info: {},
    beingEdited: false,
    value: null,
    valid: null,
  },
};

const packageReducerValue = createReducer(
  initialState,
  on(EditorActions.stableSpecValueChange, (state, action) => ({
    ...state,
    spec: {
      ...state.spec,
      info: calculateLimitedSpecInfo(action.value),
    },
  }))
);

export function packageReducer(
  state: PackageState | undefined,
  action: Action
) {
  return packageReducerValue(state, action);
}
