import {
  initialState as editorInitialState,
  editorReducer,
} from './editor.reducer';

import * as EditorActions from './editor.actions';
import { SEED_1 } from './fixtures';

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
          selected: { value: 'path 1' },
          current: { value: 'value 1', loading: false, success: true },
        },
      },
      action: EditorActions.seedComponentSelectChange({ path: 'path 2' }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          selected: { value: 'path 2' },
          current: { value: 'value 1', loading: true, success: true },
        },
      },
    },
    {
      description:
        'initial state: seed.selected defined and current seed loaded, action routerNavigationEndExamplesId',
      expectation:
        'should set selected value to the seed in the action and set current loading to true',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          selected: { value: 'path 1' },
          current: { value: 'value 1', loading: false, success: true },
        },
      },
      action: EditorActions.routerNavigationEndExamplesId({ path: 'path 2' }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          selected: { value: 'path 2' },
          current: { value: 'value 1', loading: true, success: true },
        },
      },
    },
    {
      description:
        'initial state: seed.selected defined, action routerNavigationEndSpecsId',
      expectation:
        'should set selected value to null and set current loading to true',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          selected: { value: 'path 1' },
          current: { value: 'value 1', loading: false, success: true },
        },
      },
      action: EditorActions.routerNavigationEndSpecsId({
        spec_name: 'name 1',
      }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          selected: { value: null },
          current: { value: 'value 1', loading: true, success: true },
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
        error: { ...editorInitialState.error, message: 'message 1' },
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
      action: EditorActions.editorApiSeedsGetError({ message: 'message 1' }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          available: { values: null, success: false, loading: false },
        },
        error: { ...editorInitialState.error, message: 'message 1' },
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
      action: EditorActions.editorApiSeedsSeedGetSuccess({ value: 'seed 1' }),
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
        error: { ...editorInitialState.error, message: 'message 1' },
      },
    },
    {
      description:
        'initial state: seed.current null, action packageApiSpecsSpecNameGetSuccess',
      expectation:
        'should set current value to the values in the action, success to true and loading to false',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: null, loading: true },
        },
      },
      action: EditorActions.packageApiSpecsSpecNameGetSuccess({
        response: {
          value: 'value 1',
          name: 'name 1',
          id: 'name 1',
          model_count: 1,
          version: 'version 1',
        },
      }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: 'value 1', success: true, loading: false },
        },
      },
    },
    {
      description:
        'initial state: seed.current null, action packageApiSpecsSpecNameGetError',
      expectation:
        'should set current value to null, success to false and loading to false',
      initialState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: null, loading: true },
        },
      },
      action: EditorActions.packageApiSpecsSpecNameGetError({
        message: 'message 1',
      }),
      expectedFinalState: {
        ...editorInitialState,
        seed: {
          ...editorInitialState.seed,
          current: { value: null, success: false, loading: false },
        },
        error: { ...editorInitialState.error, message: 'message 1' },
      },
    },
    {
      description:
        'initial state: managed, un managed and artifact value and success null, action editorComponentSeedLoaded',
      expectation: 'should set loading to true',
      initialState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          managed: { value: null, success: null, loading: false },
          unManaged: { value: null, success: null, loading: false },
        },
        artifact: { value: null, success: null, loading: false },
      },
      action: EditorActions.editorComponentSeedLoaded({ value: 'seed 1' }),
      expectedFinalState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          managed: { value: null, success: null, loading: true },
          unManaged: { value: null, success: null, loading: true },
        },
        artifact: { value: null, success: null, loading: true },
      },
    },
    {
      description:
        'initial state: managed, un managed and artifact value set and success true, action editorComponentSeedLoaded',
      expectation: 'should set loading to true',
      initialState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          managed: {
            value: { result: { valid: true } },
            success: true,
            loading: false,
          },
          unManaged: {
            value: { result: { valid: true } },
            success: true,
            loading: false,
          },
        },
        artifact: { value: {}, success: true, loading: false },
      },
      action: EditorActions.editorComponentSeedLoaded({ value: 'seed 1' }),
      expectedFinalState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          managed: {
            value: { result: { valid: true } },
            success: true,
            loading: true,
          },
          unManaged: {
            value: { result: { valid: true } },
            success: true,
            loading: true,
          },
        },
        artifact: { value: {}, success: true, loading: true },
      },
    },
    {
      description:
        'initial state: managed, un managed and artifact value and success null, action editorComponentValueChange',
      expectation: 'should set loading to true',
      initialState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          managed: { value: null, success: null, loading: false },
          unManaged: { value: null, success: null, loading: false },
        },
        artifact: { value: null, success: null, loading: false },
      },
      action: EditorActions.editorComponentValueChange({ value: 'seed 1' }),
      expectedFinalState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          managed: { value: null, success: null, loading: true },
          unManaged: { value: null, success: null, loading: true },
        },
        artifact: { value: null, success: null, loading: true },
      },
    },
    {
      description:
        'initial state: managed value and success null, loading true, action editorApiSpecValidateManagedSuccess',
      expectation:
        'should copy result into state, set success to true and set loading to false',
      initialState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          managed: { value: null, success: null, loading: true },
        },
      },
      action: EditorActions.editorApiSpecValidateManagedSuccess({
        response: { result: { valid: true } },
      }),
      expectedFinalState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          managed: {
            value: { result: { valid: true } },
            success: true,
            loading: false,
          },
        },
      },
    },
    {
      description:
        'initial state: managed value and success null, loading true, action editorApiSpecValidateManagedError',
      expectation:
        'should set value to null, set success to false and set loading to false and cope message into error',
      initialState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          managed: {
            value: { result: { valid: false } },
            success: null,
            loading: true,
          },
        },
      },
      action: EditorActions.editorApiSpecValidateManagedError({
        message: 'message 1',
      }),
      expectedFinalState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          managed: { value: null, success: false, loading: false },
        },
        error: { ...editorInitialState.error, message: 'message 1' },
      },
    },
    {
      description:
        'initial state: managed value and success null, loading true, action editorApiSpecValidateUnManagedSuccess',
      expectation:
        'should copy result into state, set success to true and set loading to false',
      initialState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          unManaged: { value: null, success: null, loading: true },
        },
      },
      action: EditorActions.editorApiSpecValidateUnManagedSuccess({
        response: { result: { valid: true } },
      }),
      expectedFinalState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          unManaged: {
            value: { result: { valid: true } },
            success: true,
            loading: false,
          },
        },
      },
    },
    {
      description:
        'initial state: managed value and success null, loading true, action editorApiSpecValidateUnManagedError',
      expectation:
        'should set value to null, set success to false and set loading to false and cope message into error',
      initialState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          unManaged: {
            value: { result: { valid: false } },
            success: null,
            loading: true,
          },
        },
      },
      action: EditorActions.editorApiSpecValidateUnManagedError({
        message: 'message 1',
      }),
      expectedFinalState: {
        ...editorInitialState,
        validate: {
          ...editorInitialState.validate,
          unManaged: { value: null, success: false, loading: false },
        },
        error: { ...editorInitialState.error, message: 'message 1' },
      },
    },
    {
      description:
        'initial state: managed value and success null, loading true, action editorApiArtifactCalculateSuccess',
      expectation:
        'should copy result into state, set success to true and set loading to false',
      initialState: {
        ...editorInitialState,
        artifact: { value: null, success: null, loading: true },
      },
      action: EditorActions.editorApiArtifactCalculateSuccess({
        response: {},
      }),
      expectedFinalState: {
        ...editorInitialState,
        artifact: {
          value: {},
          success: true,
          loading: false,
        },
      },
    },
    {
      description:
        'initial state: managed value and success null, loading true, action editorApiArtifactCalculateError',
      expectation:
        'should set value to null, set success to false and set loading to false and cope message into error',
      initialState: {
        ...editorInitialState,
        artifact: { value: {}, success: null, loading: true },
      },
      action: EditorActions.editorApiArtifactCalculateError({
        message: 'message 1',
      }),
      expectedFinalState: {
        ...editorInitialState,
        artifact: { value: null, success: false, loading: false },
        error: { ...editorInitialState.error, message: 'message 1' },
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
