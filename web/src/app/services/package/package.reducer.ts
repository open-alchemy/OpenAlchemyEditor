import { Action, createReducer, on } from '@ngrx/store';

import { calculateLimitedSpecInfo } from '../../helpers/calculate-limited-spec-info';
import * as EditorActions from '../editor/editor.actions';
import { LimitedSpecInfo } from './types';

export interface PackageState {
  spec: LimitedSpecInfo;
}

export const initialState: PackageState = {
  spec: {},
};

const packageReducerValue = createReducer(
  initialState,
  on(EditorActions.stableSpecValueChange, (state, action) => ({
    ...state,
    spec: calculateLimitedSpecInfo(action.value),
  }))
);

export function packageReducer(
  state: PackageState | undefined,
  action: Action
) {
  return packageReducerValue(state, action);
}
