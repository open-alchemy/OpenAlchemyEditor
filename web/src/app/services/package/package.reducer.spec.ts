import {
  initialState as packageInitialState,
  packageReducer,
} from './package.reducer';
import { calculateLimitedSpecInfo } from '../../helpers/calculate-limited-spec-info';

import * as EditorActions from '../editor/editor.actions';
import * as PackageActions from './package.actions';

const SPEC_VALUE = `
info:
  title: title 1`;

describe('PackageReducer', () => {
  [
    {
      description: 'initial state: undefined, action stableSpecValueChange',
      expectation:
        'should copy the title into the spec info, the value into the value and set beingEdited to false',
      initialState: undefined,
      action: EditorActions.stableSpecValueChange({ value: SPEC_VALUE }),
      expectedFinalState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          info: calculateLimitedSpecInfo(SPEC_VALUE),
          value: SPEC_VALUE,
          beingEdited: false,
        },
      },
    },
    {
      description:
        'initial state: value null being edited true, action stableSpecValueChange',
      expectation:
        'should copy the title into the spec info, the value into the value and set beingEdited to false',
      initialState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          info: null,
          value: null,
          beingEdited: true,
        },
      },
      action: EditorActions.stableSpecValueChange({ value: SPEC_VALUE }),
      expectedFinalState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          info: calculateLimitedSpecInfo(SPEC_VALUE),
          value: SPEC_VALUE,
          beingEdited: false,
        },
      },
    },
    {
      description:
        'initial state: value defined and valid true being edited false, action editorComponentSeedLoaded',
      expectation: 'should set value and valid to null and beingEdited to true',
      initialState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          value: SPEC_VALUE,
          beingEdited: false,
          valid: true,
        },
      },
      action: EditorActions.editorComponentSeedLoaded({ value: 'value 1' }),
      expectedFinalState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          value: null,
          beingEdited: true,
          valid: null,
        },
      },
    },
    {
      description:
        'initial state: value defined and valid true being edited false, action editorComponentValueChange',
      expectation: 'should set value and valid to null and beingEdited to true',
      initialState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          value: SPEC_VALUE,
          beingEdited: false,
          valid: true,
        },
      },
      action: EditorActions.editorComponentValueChange({ value: 'value 1' }),
      expectedFinalState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          value: null,
          beingEdited: true,
          valid: null,
        },
      },
    },
    {
      description:
        'initial state: valid null, action editorApiSpecValidateManagedSuccess with valid result',
      expectation: 'should set valid to true',
      initialState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          valid: null,
        },
      },
      action: EditorActions.editorApiSpecValidateManagedSuccess({
        response: { result: { valid: true } },
      }),
      expectedFinalState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          valid: true,
        },
      },
    },
    {
      description:
        'initial state: valid null, action editorApiSpecValidateManagedSuccess with invalid result',
      expectation: 'should set valid to true',
      initialState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          valid: null,
        },
      },
      action: EditorActions.editorApiSpecValidateManagedSuccess({
        response: { result: { valid: false } },
      }),
      expectedFinalState: {
        ...packageInitialState,
        spec: {
          ...packageInitialState.spec,
          valid: false,
        },
      },
    },
    {
      description:
        'initial state: save loading false success true, action saveComponentSaveClick',
      expectation: 'should set loading to true and success to null',
      initialState: {
        ...packageInitialState,
        save: {
          ...packageInitialState.save,
          loading: false,
          success: true,
        },
      },
      action: PackageActions.saveComponentSaveClick({
        value: 'value 1',
        name: 'name 1',
      }),
      expectedFinalState: {
        ...packageInitialState,
        save: {
          ...packageInitialState.save,
          loading: true,
          success: null,
        },
      },
    },
    {
      description:
        'initial state: save loading true success null, action packageApiSpecsSpecNamePutSuccess',
      expectation: 'should set loading to false and success to true',
      initialState: {
        ...packageInitialState,
        save: {
          ...packageInitialState.save,
          loading: true,
          success: null,
        },
      },
      action: PackageActions.packageApiSpecsSpecNamePutSuccess(),
      expectedFinalState: {
        ...packageInitialState,
        save: {
          ...packageInitialState.save,
          loading: false,
          success: true,
        },
      },
    },
    {
      description:
        'initial state: save loading true success null, action packageApiSpecsSpecNamePutError',
      expectation:
        'should set loading to false and success to false and copy the error',
      initialState: {
        ...packageInitialState,
        save: {
          ...packageInitialState.save,
          loading: true,
          success: null,
        },
      },
      action: PackageActions.packageApiSpecsSpecNamePutError({
        message: 'message 1',
      }),
      expectedFinalState: {
        ...packageInitialState,
        save: {
          ...packageInitialState.save,
          loading: false,
          success: false,
        },
        error: {
          message: 'message 1',
        },
      },
    },
    {
      description:
        'initial state: save loading true success null, action authNotLoggedIn',
      expectation:
        'should set loading to false and success to false and copy the error',
      initialState: {
        ...packageInitialState,
        save: {
          ...packageInitialState.save,
          loading: true,
          success: null,
        },
      },
      action: PackageActions.authNotLoggedIn({
        message: 'message 1',
      }),
      expectedFinalState: {
        ...packageInitialState,
        save: {
          ...packageInitialState.save,
          loading: false,
          success: false,
        },
        error: {
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
          expect(packageReducer(initialState, action)).toEqual(
            expectedFinalState
          );
        });
      });
    }
  );
});
