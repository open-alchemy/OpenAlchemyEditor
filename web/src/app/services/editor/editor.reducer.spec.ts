import {
  initialState as editorInitialState,
  editorReducer,
} from './editor.reducer';

import * as EditorActions from './editor.actions';
import { SEED_1, SEED_2 } from './fixtures';

describe('EditorReducer', () => {
  [
    {
      description: 'initial state: undefined, action seedComponentOnInit',
      expectation:
        'should set available value to null, success to null and loading to true',
      initialState: undefined,
      action: EditorActions.seedComponentOnInit(),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          available: { values: null, success: null, loading: true },
        },
      },
    },
    {
      description:
        'initial state: seed.available loaded, action seedComponentOnInit',
      expectation:
        'should set available value to null, success to null and loading to true',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          available: { values: [{ ...SEED_1 }], success: true, loading: false },
        },
      },
      action: EditorActions.seedComponentOnInit(),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          available: { values: null, success: null, loading: true },
        },
      },
    },
    {
      description:
        'initial state: seed.current loaded, action editorComponentOnInit',
      expectation:
        'should set current value to null, success to null and loading to true',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: 'seed 1', success: true, loading: false },
        },
      },
      action: EditorActions.editorComponentOnInit(),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: null, loading: true },
        },
      },
    },
    {
      description:
        'initial state: seed.selected defined, action seedComponentSelectChange',
      expectation: 'should set selected value to the seed in the action',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          selected: { ...SEED_1 },
        },
      },
      action: EditorActions.seedComponentSelectChange({ seed: { ...SEED_2 } }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          selected: { ...SEED_2 },
        },
      },
    },
    {
      description:
        'initial state: seed.selected defined, action routerNavigationStartExampleIdSeedSelectChange',
      expectation: 'should set selected value to the seed in the action',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          selected: { ...SEED_1 },
        },
      },
      action: EditorActions.routerNavigationStartExampleIdSeedSelectChange({
        seed: { ...SEED_2 },
      }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          selected: { ...SEED_2 },
        },
      },
    },
    {
      description:
        'initial state: seed.current null, action localStorageSeedLoaded',
      expectation:
        'should set current value to the value in the action, success to true and loading to false',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: null, loading: true },
        },
      },
      action: EditorActions.localStorageSeedLoaded({ value: 'seed 1' }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: 'seed 1', success: true, loading: false },
        },
      },
    },
    {
      description:
        'initial state: seed.current null, action editorApiSeedGetSuccess',
      expectation:
        'should set current value to the value in the action, success to true and loading to false',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: null, loading: true },
        },
      },
      action: EditorActions.editorApiSeedGetSuccess({ value: 'seed 1' }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: 'seed 1', success: true, loading: false },
        },
      },
    },
    {
      description:
        'initial state: seed.current null, action editorApiSeedGetError',
      expectation:
        'should set current value to the value in the action, success to true and loading to false',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: null, loading: true },
        },
      },
      action: EditorActions.editorApiSeedGetError({ message: 'message 1' }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: false, loading: false },
        },
        error: {
          ...editorInitialState.error,
          message: 'message 1',
        },
      },
    },
    {
      description:
        'initial state: seed.available null, action editorApiSeedsGetSuccess',
      expectation:
        'should set available values to the values in the action, success to true and loading to false',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          available: { values: null, success: null, loading: true },
        },
      },
      action: EditorActions.editorApiSeedsGetSuccess({
        seeds: [{ ...SEED_1 }],
      }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          available: { values: [{ ...SEED_1 }], success: true, loading: false },
        },
      },
    },
    {
      description:
        'initial state: seed.available null, action editorApiSeedsGetError',
      expectation:
        'should set available values to null, success to false and loading to false',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          available: { values: null, success: null, loading: true },
        },
      },
      action: EditorActions.editorApiSeedsGetError({
        message: 'message 1',
      }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          available: { values: null, success: false, loading: false },
        },
        error: {
          ...editorInitialState.error,
          message: 'message 1',
        },
      },
    },
    {
      description:
        'initial state: seed.current null, action editorApiSeedsSeedGetSuccess',
      expectation:
        'should set current value to the values in the action, success to true and loading to false',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: null, loading: true },
        },
      },
      action: EditorActions.editorApiSeedsSeedGetSuccess({
        value: 'seed 1',
      }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: 'seed 1', success: true, loading: false },
        },
      },
    },
    {
      description:
        'initial state: seed.current null, action editorApiSeedsSeedGetError',
      expectation:
        'should set current value to null, success to false and loading to false',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: null, loading: true },
        },
      },
      action: EditorActions.editorApiSeedsSeedGetError({
        message: 'message 1',
      }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: false, loading: false },
        },
        error: {
          ...editorInitialState.error,
          message: 'message 1',
        },
      },
    },
  ].forEach(
    ({
      description,
      expectation,
      initialState,
      action,
      expectedFinalState,
    }) => {
      describe(description, () => {
        it(expectation, () => {
          expect(editorReducer(initialState, action)).toEqual(
            expectedFinalState
          );
        });
      });
    }
  );
});
