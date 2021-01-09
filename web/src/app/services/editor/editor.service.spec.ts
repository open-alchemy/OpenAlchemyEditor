import { Injector } from '@angular/core';
import { TestScheduler } from 'rxjs/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppState } from '../app.state';
import {
  initialState as initialEditorState,
  EditorSeedState,
  EditorResultState,
  EditorArtifactState,
} from './editor.reducer';
import { EditorService } from './editor.service';
import * as EditorActions from './editor.actions';

describe('EditorService', () => {
  let service: EditorService;
  let store: MockStore<AppState>;
  let testScheduler: TestScheduler;

  const initialState = { editor: initialEditorState };

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

  describe('result$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const resultState: EditorResultState = {
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
              editor: { ...initialState.editor, result: resultState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the result state is returned
        helpers
          .expectObservable(service.result$)
          .toBe('ab', { a: initialEditorState.result, b: resultState });
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
