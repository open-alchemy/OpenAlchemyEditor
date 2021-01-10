import {
  initialState as packageInitialState,
  packageReducer,
} from './package.reducer';
import { calculateLimitedSpecInfo } from '../../helpers/calculate-limited-spec-info';

import * as EditorActions from '../editor/editor.actions';

const SPEC_VALUE = `
info:
  title: title 1`;

describe('PackageReducer', () => {
  [
    {
      description: 'initial state: undefined, action stableSpecValueChange',
      expectation: 'should copy the title into the spec info',
      initialState: undefined,
      action: EditorActions.stableSpecValueChange({ value: SPEC_VALUE }),
      expectedFinalState: {
        ...packageInitialState,
        spec: calculateLimitedSpecInfo(SPEC_VALUE),
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
