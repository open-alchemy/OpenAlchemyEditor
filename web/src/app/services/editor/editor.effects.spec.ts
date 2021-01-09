import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';

import { EMPTY } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { SeedService, SeedError } from '@open-alchemy/editor-sdk';

import { EditorEffects, SEED_KEY } from './editor.effects';
import * as EditorActions from './editor.actions';
import { SEED_1, SEED_2 } from './fixtures';
import { Seed } from './types';

describe('PackageEffects', () => {
  let actions$: Actions<EditorActions.Actions>;
  let effects: EditorEffects;
  let seedServiceSpy: jasmine.SpyObj<SeedService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    seedServiceSpy = jasmine.createSpyObj('SeedService', [
      'list$',
      'getDefault$',
      'get$',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    (routerSpy as any).events = EMPTY;
    actions$ = EMPTY;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    localStorage.removeItem(SEED_KEY);
  });

  afterEach(() => {
    localStorage.removeItem(SEED_KEY);
  });

  describe('seedsGet$', () => {
    ([
      {
        description: 'empty actions',
        expectation: 'should return empty actions',
        actionsMarbles: '',
        actionsValues: {},
        seedServiceListReturnValues: [],
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'different action actions',
        expectation: 'should return empty actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: EditorActions.editorApiSeedsGetError({ message: 'message 1' }),
        },
        seedServiceListReturnValues: [],
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description:
          'single seed component on init action actions list$ returns seeds',
        expectation: 'should return single success action actions',
        actionsMarbles: 'a',
        actionsValues: { a: EditorActions.seedComponentOnInit() },
        seedServiceListReturnValues: [
          { marbles: '-b|', values: { b: [{ ...SEED_1 }] } },
        ],
        expectedMarbles: '-b',
        expectedValues: {
          b: EditorActions.editorApiSeedsGetSuccess({
            seeds: [{ ...SEED_1 }],
          }),
        },
      },
      {
        description:
          'single seed component on init action actions list$ throws error',
        expectation: 'should return single error action actions',
        actionsMarbles: 'a',
        actionsValues: { a: EditorActions.seedComponentOnInit() },
        seedServiceListReturnValues: [{ marbles: '-#|' }],
        expectedMarbles: '-b',
        expectedValues: {
          b: EditorActions.editorApiSeedsGetError({ message: 'message 1' }),
        },
      },
      {
        description:
          'multiple seed component on init action actions list$ returns seeds before next',
        expectation: 'should return multiple success action actions',
        actionsMarbles: 'a--d',
        actionsValues: {
          a: EditorActions.seedComponentOnInit(),
          d: EditorActions.seedComponentOnInit(),
        },
        seedServiceListReturnValues: [
          { marbles: '-b|', values: { b: [{ ...SEED_1 }] } },
          { marbles: '-e|', values: { e: [{ ...SEED_2 }] } },
        ],
        expectedMarbles: '-b--e',
        expectedValues: {
          b: EditorActions.editorApiSeedsGetSuccess({
            seeds: [{ ...SEED_1 }],
          }),
          e: EditorActions.editorApiSeedsGetSuccess({
            seeds: [{ ...SEED_2 }],
          }),
        },
      },
      {
        description:
          'multiple seed component on init action actions list$ returns seeds after next',
        expectation: 'should return single success actions',
        actionsMarbles: 'a--d',
        actionsValues: {
          a: EditorActions.seedComponentOnInit(),
          d: EditorActions.seedComponentOnInit(),
        },
        seedServiceListReturnValues: [
          { marbles: '----e|', values: { e: [{ ...SEED_1 }] } },
          { marbles: '-e|', values: { e: [{ ...SEED_2 }] } },
        ],
        expectedMarbles: '----e',
        expectedValues: {
          e: EditorActions.editorApiSeedsGetSuccess({
            seeds: [{ ...SEED_2 }],
          }),
        },
      },
    ] as {
      description: string;
      expectation: string;
      actionsMarbles: string;
      actionsValues: { [key: string]: Action };
      seedServiceListReturnValues: {
        marbles: string;
        values: { [key: string]: Seed[] };
      }[];
      expectedMarbles: string;
      expectedValues: { [key: string]: Action };
    }[]).forEach(
      ({
        description,
        expectation,
        actionsMarbles,
        actionsValues,
        seedServiceListReturnValues,
        expectedMarbles,
        expectedValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            testScheduler.run((helpers) => {
              // GIVEN actions
              actions$ = helpers.cold(actionsMarbles, actionsValues) as Actions<
                EditorActions.Actions
              >;
              // AND seedService list$ that returns values
              seedServiceSpy.list$.and.returnValues(
                ...seedServiceListReturnValues.map(({ marbles, values }) =>
                  helpers.cold(marbles, values, new SeedError('message 1'))
                )
              );

              // WHEN seedsGet$ is called
              effects = new EditorEffects(actions$, seedServiceSpy, routerSpy);
              const returnedActions = effects.seedsGet$;

              // THEN the expected actions are returned
              helpers
                .expectObservable(returnedActions)
                .toBe(expectedMarbles, expectedValues);
            });

            // AND seedService list$ has been called
            expect(seedServiceSpy.list$).toHaveBeenCalledTimes(
              seedServiceListReturnValues.length
            );
            if (seedServiceListReturnValues.length > 0) {
              expect(seedServiceSpy.list$).toHaveBeenCalledWith();
            }
          });
        });
      }
    );
  });

  describe('currentUrl$', () => {
    ([
      {
        description: 'no event',
        expectation: 'return empty urls$',
        routerEventsMarbles: '',
        routerEventsValues: {},
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'single event different',
        expectation: 'return empty urls$',
        routerEventsMarbles: 'a',
        routerEventsValues: {
          a: new NavigationEnd(1, 'url 1', 'url after redirect 1'),
        },
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'single event hit',
        expectation: 'return single url in urls$',
        routerEventsMarbles: 'a',
        routerEventsValues: {
          a: new NavigationStart(1, 'url 1'),
        },
        expectedMarbles: 'a',
        expectedValues: { a: 'url 1' },
      },
      {
        description: 'multiple event hit',
        expectation: 'return multiple urls in urls$',
        routerEventsMarbles: 'ab',
        routerEventsValues: {
          a: new NavigationStart(1, 'url 1'),
          b: new NavigationStart(1, 'url 2'),
        },
        expectedMarbles: 'ab',
        expectedValues: { a: 'url 1', b: 'url 2' },
      },
    ] as {
      description: string;
      expectation: string;
      routerEventsMarbles: string;
      routerEventsValues: { [key: string]: RouterEvent };
      expectedMarbles: string;
      expectedValues: { [key: string]: string };
    }[]).forEach(
      ({
        description,
        expectation,
        routerEventsMarbles,
        routerEventsValues,
        expectedMarbles,
        expectedValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            testScheduler.run((helpers) => {
              // GIVEN router with events
              const events$ = helpers.cold(
                routerEventsMarbles,
                routerEventsValues
              );
              (routerSpy as any).events = events$;

              // WHEN currentUrl$ is called
              effects = new EditorEffects(actions$, seedServiceSpy, routerSpy);
              const returnedUrls$ = effects.currentUrl$();

              // THEN the expected urls are returned
              helpers
                .expectObservable(returnedUrls$)
                .toBe(expectedMarbles, expectedValues);
            });
          });
        });
      }
    );
  });

  describe('seedLocalStorage$', () => {
    ([
      {
        description: 'empty actions',
        expectation: 'should return empty actions',
        actionsMarbles: '',
        actionsValues: {},
        routerEventsMarbles: '',
        routerEventsValues: {},
        localStorageSeedValue: null,
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description:
          'single editor component on init action actions router NavigationStart before on init with example url',
        expectation: 'should return single localStorageEmpty actions',
        actionsMarbles: '-b',
        actionsValues: { b: EditorActions.editorComponentOnInit() },
        routerEventsMarbles: 'a',
        routerEventsValues: { a: new NavigationStart(1, 'example/') },
        localStorageSeedValue: null,
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description:
          'single editor component on init action actions router NavigationStart before on init local storage empty',
        expectation: 'should return single localStorageEmpty actions',
        actionsMarbles: '-b',
        actionsValues: { b: EditorActions.editorComponentOnInit() },
        routerEventsMarbles: 'a',
        routerEventsValues: { a: new NavigationStart(1, 'url 1') },
        localStorageSeedValue: null,
        expectedMarbles: '-b',
        expectedValues: { b: EditorActions.localStorageSeedNotFound() },
      },
      {
        description:
          'single editor component on init action actions router NavigationStart before on init local storage has seed',
        expectation: 'should return single localStorageEmpty actions',
        actionsMarbles: '-b',
        actionsValues: { b: EditorActions.editorComponentOnInit() },
        routerEventsMarbles: 'a',
        routerEventsValues: { a: new NavigationStart(1, 'url 1') },
        localStorageSeedValue: 'value 1',
        expectedMarbles: '-b',
        expectedValues: {
          b: EditorActions.localStorageSeedLoaded({ value: 'value 1' }),
        },
      },
    ] as {
      description: string;
      expectation: string;
      actionsMarbles: string;
      actionsValues: { [key: string]: Action };
      routerEventsMarbles: string;
      routerEventsValues: { [key: string]: RouterEvent };
      localStorageSeedValue: string | null;
      expectedMarbles: string;
      expectedValues: { [key: string]: Action };
    }[]).forEach(
      ({
        description,
        expectation,
        actionsMarbles,
        actionsValues,
        routerEventsMarbles,
        routerEventsValues,
        localStorageSeedValue,
        expectedMarbles,
        expectedValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            testScheduler.run((helpers) => {
              // GIVEN actions
              actions$ = helpers.cold(actionsMarbles, actionsValues) as Actions<
                EditorActions.Actions
              >;
              // AND router with events
              const events$ = helpers.cold(
                routerEventsMarbles,
                routerEventsValues
              );
              (routerSpy as any).events = events$;
              // AND localStorage with seed value
              if (localStorageSeedValue !== null) {
                localStorage.setItem('seed', localStorageSeedValue);
              }

              // WHEN seedLocalStorage$ is called
              effects = new EditorEffects(actions$, seedServiceSpy, routerSpy);
              const returnedActions = effects.seedLocalStorage$;

              // THEN the expected actions are returned
              helpers
                .expectObservable(returnedActions)
                .toBe(expectedMarbles, expectedValues);
            });
          });
        });
      }
    );
  });

  describe('seedGet$', () => {
    ([
      {
        description: 'empty actions',
        expectation: 'should return empty actions',
        actionsMarbles: '',
        actionsValues: {},
        seedServiceGetDefaultReturnValues: [],
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'different action actions',
        expectation: 'should return empty actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: EditorActions.editorApiSeedGetError({ message: 'message 1' }),
        },
        seedServiceGetDefaultReturnValues: [],
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description:
          'single local storage seed not found action actions getDefault$ returns default seed',
        expectation: 'should return single success action actions',
        actionsMarbles: 'a',
        actionsValues: { a: EditorActions.localStorageSeedNotFound() },
        seedServiceGetDefaultReturnValues: [
          { marbles: '-b|', values: { b: 'value 1' } },
        ],
        expectedMarbles: '-b',
        expectedValues: {
          b: EditorActions.editorApiSeedGetSuccess({
            value: 'value 1',
          }),
        },
      },
      {
        description:
          'single local storage seed not found action actions getDefault$ throws error',
        expectation: 'should return single error action actions',
        actionsMarbles: 'a',
        actionsValues: { a: EditorActions.localStorageSeedNotFound() },
        seedServiceGetDefaultReturnValues: [{ marbles: '-#|' }],
        expectedMarbles: '-b',
        expectedValues: {
          b: EditorActions.editorApiSeedGetError({ message: 'message 1' }),
        },
      },
      {
        description:
          'multiple local storage seed not found action actions getDefault$ returns default seed before next',
        expectation: 'should return multiple success action actions',
        actionsMarbles: 'a--d',
        actionsValues: {
          a: EditorActions.localStorageSeedNotFound(),
          d: EditorActions.localStorageSeedNotFound(),
        },
        seedServiceGetDefaultReturnValues: [
          { marbles: '-b|', values: { b: 'value 1' } },
          { marbles: '-e|', values: { e: 'value 2' } },
        ],
        expectedMarbles: '-b--e',
        expectedValues: {
          b: EditorActions.editorApiSeedGetSuccess({
            value: 'value 1',
          }),
          e: EditorActions.editorApiSeedGetSuccess({
            value: 'value 2',
          }),
        },
      },
      {
        description:
          'multiple local storage seed not found action actions getDefault$ returns default seed after next',
        expectation: 'should return single success actions',
        actionsMarbles: 'a--d',
        actionsValues: {
          a: EditorActions.localStorageSeedNotFound(),
          d: EditorActions.localStorageSeedNotFound(),
        },
        seedServiceGetDefaultReturnValues: [
          { marbles: '----e|', values: { e: 'value 1' } },
          { marbles: '-e|', values: { e: 'value 2' } },
        ],
        expectedMarbles: '----e',
        expectedValues: {
          e: EditorActions.editorApiSeedGetSuccess({
            value: 'value 2',
          }),
        },
      },
    ] as {
      description: string;
      expectation: string;
      actionsMarbles: string;
      actionsValues: { [key: string]: Action };
      seedServiceGetDefaultReturnValues: {
        marbles: string;
        values: { [key: string]: string };
      }[];
      expectedMarbles: string;
      expectedValues: { [key: string]: Action };
    }[]).forEach(
      ({
        description,
        expectation,
        actionsMarbles,
        actionsValues,
        seedServiceGetDefaultReturnValues,
        expectedMarbles,
        expectedValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            testScheduler.run((helpers) => {
              // GIVEN actions
              actions$ = helpers.cold(actionsMarbles, actionsValues) as Actions<
                EditorActions.Actions
              >;
              // AND seedService getDefault$ that returns values
              seedServiceSpy.getDefault$.and.returnValues(
                ...seedServiceGetDefaultReturnValues.map(
                  ({ marbles, values }) =>
                    helpers.cold(marbles, values, new SeedError('message 1'))
                )
              );

              // WHEN seedGet$ is called
              effects = new EditorEffects(actions$, seedServiceSpy, routerSpy);
              const returnedActions = effects.seedGet$;

              // THEN the expected actions are returned
              helpers
                .expectObservable(returnedActions)
                .toBe(expectedMarbles, expectedValues);
            });

            // AND seedService getDefault$ has been called
            expect(seedServiceSpy.getDefault$).toHaveBeenCalledTimes(
              seedServiceGetDefaultReturnValues.length
            );
            if (seedServiceGetDefaultReturnValues.length > 0) {
              expect(seedServiceSpy.getDefault$).toHaveBeenCalledWith();
            }
          });
        });
      }
    );
  });

  describe('seedsSeedGet$', () => {
    ([
      {
        description: 'empty actions',
        expectation: 'should return empty actions',
        actionsMarbles: '',
        actionsValues: {},
        seedServiceGetReturnValues: [],
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'different action actions',
        expectation: 'should return empty actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: EditorActions.editorApiSeedGetError({ message: 'message 1' }),
        },
        seedServiceGetReturnValues: [],
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description:
          'single seed component select change action actions get$ returns seed',
        expectation: 'should return single success action actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: EditorActions.seedComponentSelectChange({ path: 'path 1' }),
        },
        seedServiceGetReturnValues: [
          { marbles: '-b|', values: { b: 'value 1' } },
        ],
        expectedMarbles: '-b',
        expectedValues: {
          b: EditorActions.editorApiSeedsSeedGetSuccess({
            value: 'value 1',
          }),
        },
      },
      {
        description:
          'single router navigation start example id action actions get$ returns seed',
        expectation: 'should return single success action actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: EditorActions.routerNavigationStartExampleId({
            path: encodeURIComponent('path 1'),
          }),
        },
        seedServiceGetReturnValues: [
          { marbles: '-b|', values: { b: 'value 1' } },
        ],
        expectedMarbles: '-b',
        expectedValues: {
          b: EditorActions.editorApiSeedsSeedGetSuccess({
            value: 'value 1',
          }),
        },
      },
      {
        description:
          'single seed component select change action actions get$ throws error',
        expectation: 'should return single error action actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: EditorActions.seedComponentSelectChange({ path: 'path 1' }),
        },
        seedServiceGetReturnValues: [{ marbles: '-#|' }],
        expectedMarbles: '-b',
        expectedValues: {
          b: EditorActions.editorApiSeedsSeedGetError({ message: 'message 1' }),
        },
      },
      {
        description:
          'multiple seed component select change action actions get$ returns seed before next',
        expectation: 'should return multiple success action actions',
        actionsMarbles: 'a--d',
        actionsValues: {
          a: EditorActions.seedComponentSelectChange({ path: 'path 1' }),
          d: EditorActions.seedComponentSelectChange({ path: 'path 2' }),
        },
        seedServiceGetReturnValues: [
          { marbles: '-b|', values: { b: 'value 1' } },
          { marbles: '-e|', values: { e: 'value 2' } },
        ],
        expectedMarbles: '-b--e',
        expectedValues: {
          b: EditorActions.editorApiSeedsSeedGetSuccess({
            value: 'value 1',
          }),
          e: EditorActions.editorApiSeedsSeedGetSuccess({
            value: 'value 2',
          }),
        },
      },
      {
        description:
          'multiple seed component select change action actions get$ returns seed after next',
        expectation: 'should return single success actions',
        actionsMarbles: 'a--d',
        actionsValues: {
          a: EditorActions.seedComponentSelectChange({ path: 'path 1' }),
          d: EditorActions.seedComponentSelectChange({ path: 'path 2' }),
        },
        seedServiceGetReturnValues: [
          { marbles: '----e|', values: { e: 'value 1' } },
          { marbles: '-e|', values: { e: 'value 2' } },
        ],
        expectedMarbles: '----e',
        expectedValues: {
          e: EditorActions.editorApiSeedsSeedGetSuccess({
            value: 'value 2',
          }),
        },
      },
    ] as {
      description: string;
      expectation: string;
      actionsMarbles: string;
      actionsValues: { [key: string]: Action };
      seedServiceGetReturnValues: {
        marbles: string;
        values: { [key: string]: string };
      }[];
      expectedMarbles: string;
      expectedValues: { [key: string]: Action };
    }[]).forEach(
      ({
        description,
        expectation,
        actionsMarbles,
        actionsValues,
        seedServiceGetReturnValues,
        expectedMarbles,
        expectedValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            testScheduler.run((helpers) => {
              // GIVEN actions
              actions$ = helpers.cold(actionsMarbles, actionsValues) as Actions<
                EditorActions.Actions
              >;
              // AND seedService get$ that returns values
              seedServiceSpy.get$.and.returnValues(
                ...seedServiceGetReturnValues.map(({ marbles, values }) =>
                  helpers.cold(marbles, values, new SeedError('message 1'))
                )
              );

              // WHEN seedsSeedGet$ is called
              effects = new EditorEffects(actions$, seedServiceSpy, routerSpy);
              const returnedActions = effects.seedsSeedGet$;

              // THEN the expected actions are returned
              helpers
                .expectObservable(returnedActions)
                .toBe(expectedMarbles, expectedValues);
            });

            // AND seedService get$ has been called
            expect(seedServiceSpy.get$).toHaveBeenCalledTimes(
              seedServiceGetReturnValues.length
            );
            if (seedServiceGetReturnValues.length > 0) {
              expect(seedServiceSpy.get$).toHaveBeenCalledWith({
                path: 'path 1',
              });
            }
          });
        });
      }
    );
  });

  describe('routerNavigationSelectedSeed$', () => {
    ([
      {
        description: 'empty actions',
        expectation: 'should return empty actions',
        actionsMarbles: '',
        actionsValues: {},
        expectedPath: null,
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'different action actions',
        expectation: 'should return empty actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: EditorActions.editorApiSeedsGetError({ message: 'message 1' }),
        },
        expectedPath: null,
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'single seed component select change actions',
        expectation:
          'should navigate to example/:<seed path> and return single action actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: EditorActions.seedComponentSelectChange({ path: 'path 1' }),
        },
        expectedPath: `example/${encodeURIComponent('path 1')}`,
        expectedMarbles: 'a',
        expectedValues: { a: EditorActions.routerNavigationSelectedSeed() },
      },
    ] as {
      description: string;
      expectation: string;
      actionsMarbles: string;
      actionsValues: { [key: string]: Action };
      expectedPath: string | null;
      expectedMarbles: string;
      expectedValues: { [key: string]: Action };
    }[]).forEach(
      ({
        description,
        expectation,
        actionsMarbles,
        actionsValues,
        expectedPath,
        expectedMarbles,
        expectedValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            testScheduler.run((helpers) => {
              // GIVEN actions
              actions$ = helpers.cold(actionsMarbles, actionsValues) as Actions<
                EditorActions.Actions
              >;

              // WHEN routerNavigationSelectedSeed$ is called
              effects = new EditorEffects(actions$, seedServiceSpy, routerSpy);
              const returnedActions = effects.routerNavigationSelectedSeed$;

              // THEN the expected actions are returned
              helpers
                .expectObservable(returnedActions)
                .toBe(expectedMarbles, expectedValues);
            });

            // AND location.go has been called
            if (expectedPath !== null) {
              expect(routerSpy.navigate).toHaveBeenCalledWith([expectedPath]);
            }
          });
        });
      }
    );
  });

  describe('routerNavigationBase$', () => {
    ([
      {
        description: 'empty actions',
        expectation: 'should return empty actions',
        actionsMarbles: '',
        actionsValues: {},
        expectedPath: null,
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'different action actions',
        expectation: 'should return empty actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: EditorActions.editorComponentSeedLoaded({ value: 'value 1' }),
        },
        expectedPath: null,
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'single editor component value change actions',
        expectation: "should navigate to '' and return single action actions",
        actionsMarbles: 'a',
        actionsValues: {
          a: EditorActions.editorComponentValueChange({ value: 'value 1' }),
        },
        expectedPath: '',
        expectedMarbles: 'a',
        expectedValues: { a: EditorActions.routerNavigationBase() },
      },
    ] as {
      description: string;
      expectation: string;
      actionsMarbles: string;
      actionsValues: { [key: string]: Action };
      expectedPath: string | null;
      expectedMarbles: string;
      expectedValues: { [key: string]: Action };
    }[]).forEach(
      ({
        description,
        expectation,
        actionsMarbles,
        actionsValues,
        expectedPath,
        expectedMarbles,
        expectedValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            testScheduler.run((helpers) => {
              // GIVEN actions
              actions$ = helpers.cold(actionsMarbles, actionsValues) as Actions<
                EditorActions.Actions
              >;

              // WHEN routerNavigationBase$ is called
              effects = new EditorEffects(actions$, seedServiceSpy, routerSpy);
              const returnedActions = effects.routerNavigationBase$;

              // THEN the expected actions are returned
              helpers
                .expectObservable(returnedActions)
                .toBe(expectedMarbles, expectedValues);
            });

            // AND location.go has been called
            if (expectedPath !== null) {
              expect(routerSpy.navigate).toHaveBeenCalledWith([expectedPath]);
            }
          });
        });
      }
    );
  });
});
