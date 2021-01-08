import { Action, createReducer, on } from '@ngrx/store';

import { SeedValue, Seed, SeedPath, Error } from './types';
import * as EditorActions from './editor.actions';

export interface EditorSeedState {
  current: {
    value: SeedValue | null;
    success: boolean | null;
    loading: boolean;
  };
  selected: SeedPath | null;
  available: {
    values: Seed[] | null;
    success: boolean | null;
    loading: boolean;
  };
}
export interface EditorState {
  seed: EditorSeedState;
  error: Error | null;
}

export const initialState: EditorState = {
  seed: {
    current: {
      value: null,
      success: null,
      loading: false,
    },
    selected: null,
    available: {
      values: null,
      success: null,
      loading: false,
    },
  },
  error: null,
};

const editorReducerValue = createReducer(
  initialState,
  on(EditorActions.seedComponentOnInit, (state) => ({
    ...state,
    seed: {
      ...state.seed,
      available: { values: null, success: null, loading: true },
    },
  })),
  on(EditorActions.editorComponentOnInit, (state) => ({
    ...state,
    seed: {
      ...state.seed,
      current: { value: null, success: null, loading: true },
    },
  })),
  on(EditorActions.seedComponentSelectChange, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      selected: action.path,
    },
  })),
  on(EditorActions.routerNavigationStartExampleId, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      selected: action.path,
    },
  })),
  on(EditorActions.localStorageSeedLoaded, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      current: { value: action.value, success: true, loading: false },
    },
  })),
  on(EditorActions.editorApiSeedGetSuccess, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      current: { value: action.value, success: true, loading: false },
    },
  })),
  on(EditorActions.editorApiSeedGetError, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      current: { value: null, success: false, loading: false },
    },
    error: { ...state.error, message: action.message },
  })),
  on(EditorActions.editorApiSeedsGetSuccess, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      available: { values: [...action.seeds], success: true, loading: false },
    },
  })),
  on(EditorActions.editorApiSeedsGetError, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      available: { values: null, success: false, loading: false },
    },
    error: { ...state.error, message: action.message },
  })),
  on(EditorActions.editorApiSeedsSeedGetSuccess, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      current: { value: action.value, success: true, loading: false },
    },
  })),
  on(EditorActions.editorApiSeedsSeedGetError, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      current: { value: null, success: false, loading: false },
    },
    error: { ...state.error, message: action.message },
  }))
);

export function editorReducer(state: EditorState | undefined, action: Action) {
  return editorReducerValue(state, action);
}
