import { Injector } from '@angular/core';
import { TestScheduler } from 'rxjs/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { combineResult } from '../../helpers/combine-results';
import { AppState, initialState } from '../app.state';
import {
  initialState as initialEditorState,
  EditorSeedState,
  EditorValidateState,
  EditorArtifactState,
} from './editor.reducer';
import { EditorService } from './editor.service';
import * as EditorActions from './editor.actions';
import { Error } from './types';

describe('EditorService', () => {
  let service: EditorService;
  let store: MockStore<AppState>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    const injector = Injector.create({
      providers: provideMockStore({ initialState }),
    });
    store = injector.get(MockStore);
    service = new EditorService(store);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('seed$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const seedState: EditorSeedState = {
          current: {
            value: null,
            loading: true,
            success: null,
          },
          selected: { value: 'path 1' },
          available: {
            values: null,
            loading: true,
            success: null,
          },
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              editor: { ...initialState.editor, seed: seedState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the seed state is returned
        helpers
          .expectObservable(service.seed$)
          .toBe('ab', { a: initialEditorState.seed, b: seedState });
      });
    });
  });

  describe('seedCurrent$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const seedState: EditorSeedState = {
          current: {
            value: null,
            loading: true,
            success: null,
          },
          selected: { value: 'path 1' },
          available: {
            values: null,
            loading: true,
            success: null,
          },
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              editor: { ...initialState.editor, seed: seedState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the seed state is returned
        helpers.expectObservable(service.seedCurrent$).toBe('ab', {
          a: initialEditorState.seed.current,
          b: seedState.current,
        });
      });
    });
  });

  describe('seedAvailable$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const seedState: EditorSeedState = {
          current: {
            value: null,
            loading: true,
            success: null,
          },
          selected: { value: 'path 1' },
          available: {
            values: null,
            loading: true,
            success: null,
          },
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              editor: { ...initialState.editor, seed: seedState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the seed state is returned
        helpers.expectObservable(service.seedAvailable$).toBe('ab', {
          a: initialEditorState.seed.available,
          b: seedState.available,
        });
      });
    });
  });

  describe('seedSelected$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const seedState: EditorSeedState = {
          current: {
            value: null,
            loading: true,
            success: null,
          },
          selected: { value: 'path 1' },
          available: {
            values: null,
            loading: true,
            success: null,
          },
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              editor: { ...initialState.editor, seed: seedState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the seed state is returned
        helpers.expectObservable(service.seedSelected$).toBe('ab', {
          a: initialEditorState.seed.selected,
          b: seedState.selected,
        });
      });
    });
  });

  describe('validate$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const validateState: EditorValidateState = {
          managed: {
            value: null,
            loading: true,
            success: null,
          },
          unManaged: {
            value: null,
            loading: true,
            success: null,
          },
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              editor: { ...initialState.editor, validate: validateState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the validate state is returned
        helpers
          .expectObservable(service.validate$)
          .toBe('ab', { a: initialEditorState.validate, b: validateState });
      });
    });
  });

  describe('validateManaged$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const validateState: EditorValidateState = {
          managed: {
            value: null,
            loading: true,
            success: false,
          },
          unManaged: {
            value: null,
            loading: true,
            success: null,
          },
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              editor: { ...initialState.editor, validate: validateState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the validateManaged state is returned
        helpers.expectObservable(service.validateManaged$).toBe('ab', {
          a: initialEditorState.validate.managed,
          b: validateState.managed,
        });
      });
    });
  });

  describe('validateUnManaged$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const validateState: EditorValidateState = {
          managed: {
            value: null,
            loading: true,
            success: false,
          },
          unManaged: {
            value: null,
            loading: true,
            success: null,
          },
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              editor: { ...initialState.editor, validate: validateState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the validateUnManaged state is returned
        helpers.expectObservable(service.validateUnManaged$).toBe('ab', {
          a: initialEditorState.validate.unManaged,
          b: validateState.unManaged,
        });
      });
    });
  });

  describe('artifact$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const artifactState: EditorArtifactState = {
          value: null,
          loading: true,
          success: null,
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              editor: { ...initialState.editor, artifact: artifactState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the artifact state is returned
        helpers
          .expectObservable(service.artifact$)
          .toBe('ab', { a: initialEditorState.artifact, b: artifactState });
      });
    });
  });

  describe('result$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const validateState: EditorValidateState = {
          managed: {
            value: null,
            loading: true,
            success: false,
          },
          unManaged: {
            value: null,
            loading: true,
            success: null,
          },
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              editor: { ...initialState.editor, validate: validateState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the result state is returned
        helpers.expectObservable(service.result$).toBe('ab', {
          a: combineResult(
            initialEditorState.validate.managed.value,
            initialEditorState.artifact.value
          ),
          b: combineResult(
            validateState.managed.value,
            initialEditorState.artifact.value
          ),
        });
      });
    });
  });

  describe('error$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const errorState: Error = {
          message: 'message 1',
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              editor: { ...initialState.editor, error: errorState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the error state is returned
        helpers.expectObservable(service.error$).toBe('ab', {
          a: initialState.editor.error,
          b: errorState,
        });
      });
    });
  });

  describe('editorComponentOnInit', () => {
    it('should dispatch specs component on init action', () => {
      testScheduler.run((helpers) => {
        // GIVEN a trigger for editorComponentOnInit
        helpers.cold('-b').subscribe(() => service.editorComponentOnInit());

        // WHEN

        // THEN store emits the expected actions
        helpers.expectObservable(store.scannedActions$).toBe('ab', {
          a: { type: '@ngrx/store/init' },
          b: EditorActions.editorComponentOnInit(),
        });
      });
    });
  });

  describe('editorComponentSeedLoaded', () => {
    it('should dispatch specs component on init action', () => {
      testScheduler.run((helpers) => {
        // GIVEN a trigger for editorComponentSeedLoaded
        const value = 'value 1';
        helpers
          .cold('-b')
          .subscribe(() => service.editorComponentSeedLoaded(value));

        // WHEN

        // THEN store emits the expected actions
        helpers.expectObservable(store.scannedActions$).toBe('ab', {
          a: { type: '@ngrx/store/init' },
          b: EditorActions.editorComponentSeedLoaded({ value }),
        });
      });
    });
  });

  describe('editorComponentValueChange', () => {
    it('should dispatch specs component on init action', () => {
      testScheduler.run((helpers) => {
        // GIVEN a trigger for editorComponentValueChange
        const value = 'value 1';
        helpers
          .cold('-b')
          .subscribe(() => service.editorComponentValueChange(value));

        // WHEN

        // THEN store emits the expected actions
        helpers.expectObservable(store.scannedActions$).toBe('ab', {
          a: { type: '@ngrx/store/init' },
          b: EditorActions.editorComponentValueChange({ value }),
        });
      });
    });
  });

  describe('seedComponentOnInit', () => {
    it('should dispatch specs component on init action', () => {
      testScheduler.run((helpers) => {
        // GIVEN a trigger for seedComponentOnInit
        helpers.cold('-b').subscribe(() => service.seedComponentOnInit());

        // WHEN

        // THEN store emits the expected actions
        helpers.expectObservable(store.scannedActions$).toBe('ab', {
          a: { type: '@ngrx/store/init' },
          b: EditorActions.seedComponentOnInit(),
        });
      });
    });
  });

  describe('seedComponentSelectChange', () => {
    it('should dispatch specs component on init action', () => {
      testScheduler.run((helpers) => {
        // GIVEN a trigger for seedComponentSelectChange
        const path = 'path 1';
        helpers
          .cold('-b')
          .subscribe(() => service.seedComponentSelectChange(path));

        // WHEN

        // THEN store emits the expected actions
        helpers.expectObservable(store.scannedActions$).toBe('ab', {
          a: { type: '@ngrx/store/init' },
          b: EditorActions.seedComponentSelectChange({ path }),
        });
      });
    });
  });
});
