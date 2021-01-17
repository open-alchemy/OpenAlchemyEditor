import { Action, createReducer, on } from '@ngrx/store';

import {
  SeedValue,
  Seed,
  SeedPath,
  Error,
  ValidationResponse,
  ArtifactResponse,
} from './types';
import * as EditorActions from './editor.actions';

export interface EditorSeedSelectedState {
  value: SeedPath | null;
}
export interface EditorSeedAvailableState {
  values: Seed[] | null;
  success: boolean | null;
  loading: boolean;
}
export interface EditorSeedState {
  current: {
    value: SeedValue | null;
    success: boolean | null;
    loading: boolean;
  };
  selected: EditorSeedSelectedState;
  available: EditorSeedAvailableState;
}
export interface EditorValidateState {
  managed: {
    value: ValidationResponse | null;
    success: boolean | null;
    loading: boolean;
  };
  unManaged: {
    value: ValidationResponse | null;
    success: boolean | null;
    loading: boolean;
  };
}
export interface EditorArtifactState {
  value: ArtifactResponse;
  success: boolean | null;
  loading: boolean;
}
export interface EditorState {
  seed: EditorSeedState;
  validate: EditorValidateState;
  artifact: EditorArtifactState;
  error: Error | null;
}

export const initialState: EditorState = {
  seed: {
    current: {
      value: null,
      success: null,
      loading: false,
    },
    selected: {
      value: null,
    },
    available: {
      values: null,
      success: null,
      loading: false,
    },
  },
  validate: {
    managed: {
      value: null,
      success: null,
      loading: false,
    },
    unManaged: {
      value: null,
      success: null,
      loading: false,
    },
  },
  artifact: {
    value: null,
    success: null,
    loading: false,
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
      current: { ...state.seed.current, loading: true },
      selected: { value: action.path },
    },
  })),
  on(EditorActions.routerNavigationStartExamplesId, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      current: { ...state.seed.current, loading: true },
      selected: { value: action.path },
    },
  })),
  on(EditorActions.routerNavigationStartSpecsId, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      current: { ...state.seed.current, loading: true },
      selected: { value: null },
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
  })),
  on(EditorActions.packageApiSpecsSpecNameGetSuccess, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      current: { value: action.response.value, success: true, loading: false },
    },
  })),
  on(EditorActions.packageApiSpecsSpecNameGetError, (state, action) => ({
    ...state,
    seed: {
      ...state.seed,
      current: { value: null, success: false, loading: false },
    },
    error: { ...state.error, message: action.message },
  })),
  on(
    EditorActions.editorComponentSeedLoaded,
    EditorActions.editorComponentValueChange,
    (state) => ({
      ...state,
      validate: {
        ...state.validate,
        managed: {
          ...state.validate.managed,
          loading: true,
        },
        unManaged: {
          ...state.validate.managed,
          loading: true,
        },
      },
      artifact: {
        ...state.artifact,
        loading: true,
      },
    })
  ),
  on(EditorActions.editorApiSpecValidateManagedSuccess, (state, action) => ({
    ...state,
    validate: {
      ...state.validate,
      managed: {
        ...state.validate.managed,
        value: action.response,
        success: true,
        loading: false,
      },
    },
  })),
  on(EditorActions.editorApiSpecValidateManagedError, (state, action) => ({
    ...state,
    validate: {
      ...state.validate,
      managed: {
        ...state.validate.managed,
        value: null,
        success: false,
        loading: false,
      },
    },
    error: { ...state.error, message: action.message },
  })),
  on(EditorActions.editorApiSpecValidateUnManagedSuccess, (state, action) => ({
    ...state,
    validate: {
      ...state.validate,
      unManaged: {
        ...state.validate.managed,
        value: action.response,
        success: true,
        loading: false,
      },
    },
  })),
  on(EditorActions.editorApiSpecValidateUnManagedError, (state, action) => ({
    ...state,
    validate: {
      ...state.validate,
      unManaged: {
        ...state.validate.managed,
        value: null,
        success: false,
        loading: false,
      },
    },
    error: { ...state.error, message: action.message },
  })),
  on(EditorActions.editorApiArtifactCalculateSuccess, (state, action) => ({
    ...state,
    artifact: {
      ...state.artifact,
      value: action.response,
      success: true,
      loading: false,
    },
  })),
  on(EditorActions.editorApiArtifactCalculateError, (state, action) => ({
    ...state,
    artifact: {
      ...state.artifact,
      value: null,
      success: false,
      loading: false,
    },
    error: { ...state.error, message: action.message },
  }))
);

export function editorReducer(
  state: EditorState | undefined,
  action: Action
): EditorState {
  return editorReducerValue(state, action);
}
