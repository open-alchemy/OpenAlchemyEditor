import { Action, createReducer, on } from '@ngrx/store';

import { calculateLimitedSpecInfo } from '../../helpers/calculate-limited-spec-info';
import * as EditorActions from '../editor/editor.actions';
import { LimitedSpecInfo } from './types';

export interface PackageSpecState {
  info: LimitedSpecInfo;
}
export interface PackageState {
  spec: PackageSpecState;
}

export const initialState: PackageState = {
  spec: {
    info: {},
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
