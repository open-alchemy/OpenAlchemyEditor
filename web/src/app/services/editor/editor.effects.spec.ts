import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';

import { Observable, EMPTY } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { Action } from '@ngrx/store';
import { SeedService, SeedError } from '@open-alchemy/editor-sdk';

import { EditorEffects, SEED_KEY } from './editor.effects';
import * as EditorActions from './editor.actions';
import { SEED_1, SEED_2 } from './fixtures';
import { Seed } from './types';

describe('PackageEffects', () => {
  let actions$: Observable<Action>;
  let effects: EditorEffects;
  let seedServiceSpy: jasmine.SpyObj<SeedService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    seedServiceSpy = jasmine.createSpyObj('SeedService', ['list$']);
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
              actions$ = helpers.cold(actionsMarbles, actionsValues);
              // AND seedService list that returns values
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
              actions$ = helpers.cold(actionsMarbles, actionsValues);
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
});
