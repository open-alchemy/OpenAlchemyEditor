import { HttpClient } from '@angular/common/http';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { EMPTY, of } from 'rxjs';

import { SeedService } from './seed.service';

describe('SeedService', () => {
  let service: SeedService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let localStorageSetItemSpy: jasmine.Spy;
  let localStorageGetItemSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    localStorageSetItemSpy = spyOn(localStorage, 'setItem');
    localStorageGetItemSpy = spyOn(localStorage, 'getItem');
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  describe('unit tests', () => {
    beforeEach(() => {
      (routerSpy as any).events = EMPTY as any;
      service = new SeedService(httpClientSpy, routerSpy);
    });

    describe('loadSeed', () => {
      describe('no seed', () => {
        beforeEach(() => {
          (routerSpy as any).events = EMPTY as any;
          localStorageGetItemSpy.and.returnValue(null);
        });

        const parameters = [
          {
            description: 'single get',
            expectation: 'should emit the result',
            get: ['-b|', { b: { key: 'value' } }],
            expectedCallCount: 1,
            seedMarbles: '-b',
            seedValues: { b: { key: 'value' } },
            errorMarbles: '',
            errorValues: undefined,
          },
          {
            description: 'single get error',
            expectation: 'should not emit the result',
            get: ['-#|', undefined],
            expectedCallCount: 1,
            seedMarbles: '---',
            seedValues: undefined,
            errorMarbles: '-b',
            errorValues: { b: 'error' },
          },
        ];

        parameters.forEach(
          ({
            description,
            expectation,
            get,
            expectedCallCount,
            seedMarbles,
            errorMarbles,
            errorValues,
            seedValues,
          }) => {
            describe(description, () => {
              it(expectation, () => {
                getTestScheduler().run(({ expectObservable }) => {
                  // GIVEN mock http service that returns a value
                  httpClientSpy.get.and.returnValue((cold as any)(...get));

                  // WHEN loadSeed is called
                  service.loadSeed();

                  // THEN the seed is emitted
                  expectObservable(service.seed$()).toBe(
                    seedMarbles,
                    seedValues
                  );
                  // AND the expected errors are reported
                  expectObservable(service.error$()).toBe(
                    errorMarbles,
                    errorValues
                  );
                });
                // AND get was called with the correct url and responseType
                expect(httpClientSpy.get).toHaveBeenCalledTimes(
                  expectedCallCount
                );
                expect(httpClientSpy.get as any).toHaveBeenCalledWith(
                  'https://editor-v2.api.openalchemy.io/v1/seed',
                  {
                    responseType: 'text',
                  }
                );
                // AND localStorage getItem was called
                expect(localStorageGetItemSpy).toHaveBeenCalledTimes(1);
                expect(localStorageGetItemSpy).toHaveBeenCalledWith('seed');
              });
            });
          }
        );
      });

      describe('seed set', () => {
        beforeEach(() => {
          localStorageGetItemSpy.and.returnValue('seed 1');
        });

        it('should not retrieve the seed', () => {
          getTestScheduler().run(({ expectObservable }) => {
            // WHEN loadSeed is called
            service.loadSeed();

            // THEN the seed is emitted
            expectObservable(service.seed$()).toBe('a', { a: 'seed 1' });
          });
          // AND get was called with the correct url and responseType
          expect(httpClientSpy.get).not.toHaveBeenCalled();
          // AND localStorage getItem was called
          expect(localStorageGetItemSpy).toHaveBeenCalledTimes(1);
          expect(localStorageGetItemSpy).toHaveBeenCalledWith('seed');
        });
      });
    });

    describe('no seed', () => {
      beforeEach(() => {
        localStorageGetItemSpy.and.returnValue(null);
      });

      const parameters = [
        {
          description: 'single get',
          expectation: 'should emit the result',
          get: ['-b|', { b: { key: 'value' } }],
          expectedCallCount: 1,
          seedMarbles: '-b',
          seedValues: { b: { key: 'value' } },
          errorMarbles: '',
          errorValues: undefined,
        },
        {
          description: 'single get error',
          expectation: 'should not emit the result',
          get: ['-#|', undefined],
          expectedCallCount: 1,
          seedMarbles: '---',
          seedValues: undefined,
          errorMarbles: '-b',
          errorValues: { b: 'error' },
        },
      ];

      parameters.forEach(
        ({
          description,
          expectation,
          get,
          expectedCallCount,
          seedMarbles,
          errorMarbles,
          errorValues,
          seedValues,
        }) => {
          describe(description, () => {
            it(expectation, () => {
              getTestScheduler().run(({ expectObservable }) => {
                // GIVEN mock http service that returns a value
                httpClientSpy.get.and.returnValue((cold as any)(...get));

                // WHEN loadSeed is called
                service.loadSeed();

                // THEN the seed is emitted
                expectObservable(service.seed$()).toBe(seedMarbles, seedValues);
                // AND the expected errors are reported
                expectObservable(service.error$()).toBe(
                  errorMarbles,
                  errorValues
                );
              });
              // AND get was called with the correct url and responseType
              expect(httpClientSpy.get).toHaveBeenCalledTimes(
                expectedCallCount
              );
              expect(httpClientSpy.get as any).toHaveBeenCalledWith(
                'https://editor-v2.api.openalchemy.io/v1/seed',
                {
                  responseType: 'text',
                }
              );
              // AND localStorage getItem was called
              expect(localStorageGetItemSpy).toHaveBeenCalledTimes(1);
              expect(localStorageGetItemSpy).toHaveBeenCalledWith('seed');
            });
          });
        }
      );
    });

    describe('selectSeed', () => {
      const parameters = [
        {
          description: 'no selected seed',
          expectation: 'should not emit a seed',
          selectSeedMarbles: '',
          selectSeedValues: undefined,
          navigateCallCount: 0,
          navigateCalls: [],
        },
        {
          description: 'single selected seed',
          expectation: 'should emit the seed',
          selectSeedMarbles: '-b',
          selectSeedValues: { b: 'name b' },
          navigateCallCount: 1,
          navigateCalls: [['example', 'name b']],
        },
        {
          description: 'multiple selected seed',
          expectation: 'should emit the seed',
          selectSeedMarbles: '-b-d',
          selectSeedValues: { b: 'name b', d: 'name d' },
          navigateCallCount: 2,
          navigateCalls: [
            ['example', 'name b'],
            ['example', 'name d'],
          ],
        },
      ];

      parameters.forEach(
        ({
          description,
          expectation,
          selectSeedMarbles,
          selectSeedValues,
          navigateCallCount,
          navigateCalls,
        }) => {
          describe(description, () => {
            it(expectation, () => {
              getTestScheduler().run(() => {
                const selectSeed$ = cold(selectSeedMarbles, selectSeedValues);

                selectSeed$.subscribe((seed) => service.selectSeed(seed));
              });

              expect(routerSpy.navigate).toHaveBeenCalledTimes(
                navigateCallCount
              );
              navigateCalls.forEach((call) =>
                expect(routerSpy.navigate).toHaveBeenCalledWith(call)
              );
            });
          });
        }
      );
    });

    describe('loadSelectedSeeds', () => {
      const parameters = [
        {
          description: 'single get',
          expectation: 'should emit the seeds',
          get: ['-b|', { b: { key: 'value' } }],
          expectedCallCount: 1,
          seedsMarbles: '-b',
          seedsValues: { b: { key: 'value' } },
          errorMarbles: '',
          errorValues: undefined,
        },
        {
          description: 'single get error',
          expectation: 'should not emit the seeds',
          get: ['-#|', undefined],
          expectedCallCount: 1,
          seedsMarbles: '---',
          seedsValues: undefined,
          errorMarbles: '-b',
          errorValues: { b: 'error' },
        },
      ];

      parameters.forEach(
        ({
          description,
          expectation,
          get,
          expectedCallCount,
          seedsMarbles,
          errorMarbles,
          errorValues,
          seedsValues,
        }) => {
          describe(description, () => {
            it(expectation, () => {
              getTestScheduler().run(({ expectObservable }) => {
                // GIVEN mock http service that returns a value
                httpClientSpy.get.and.returnValue((cold as any)(...get));

                // WHEN loadSeed is called
                service.loadSelectedSeed({
                  name: 'seed 1',
                  path: 'path/to/seed',
                });

                // THEN the seed is emitted
                expectObservable(service.seed$()).toBe(
                  seedsMarbles,
                  seedsValues
                );
                // AND the expected errors are reported
                expectObservable(service.error$()).toBe(
                  errorMarbles,
                  errorValues
                );
              });
              // AND get was called with the correct url and responseType
              expect(httpClientSpy.get).toHaveBeenCalledTimes(
                expectedCallCount
              );
              expect(httpClientSpy.get as any).toHaveBeenCalledWith(
                'https://editor-v2.api.openalchemy.io/v1/seeds/path%2Fto%2Fseed',
                {
                  responseType: 'text',
                }
              );
            });
          });
        }
      );
    });

    describe('loadSeeds', () => {
      const parameters = [
        {
          description: 'single get',
          expectation: 'should emit the seeds',
          get: ['-b|', { b: { key: 'value' } }],
          expectedCallCount: 1,
          seedsMarbles: '-b',
          seedsValues: { b: { key: 'value' } },
          errorMarbles: '',
          errorValues: undefined,
        },
        {
          description: 'single get error',
          expectation: 'should not emit the seeds',
          get: ['-#|', undefined],
          expectedCallCount: 1,
          seedsMarbles: '---',
          seedsValues: undefined,
          errorMarbles: '-b',
          errorValues: { b: 'error' },
        },
      ];

      parameters.forEach(
        ({
          description,
          expectation,
          get,
          expectedCallCount,
          seedsMarbles,
          errorMarbles,
          errorValues,
          seedsValues,
        }) => {
          describe(description, () => {
            it(expectation, () => {
              getTestScheduler().run(({ expectObservable }) => {
                // GIVEN mock http service that returns a value
                httpClientSpy.get.and.returnValue((cold as any)(...get));

                // WHEN loadSeed is called
                service.loadSeeds();

                // THEN the seed is emitted
                expectObservable(service.seeds$()).toBe(
                  seedsMarbles,
                  seedsValues
                );
                // AND the expected errors are reported
                expectObservable(service.error$()).toBe(
                  errorMarbles,
                  errorValues
                );
              });
              // AND get was called with the correct url and responseType
              expect(httpClientSpy.get).toHaveBeenCalledTimes(
                expectedCallCount
              );
              expect(httpClientSpy.get as any).toHaveBeenCalledWith(
                'https://editor-v2.api.openalchemy.io/v1/seeds'
              );
            });
          });
        }
      );
    });

    describe('saveSeed', () => {
      it('should set seed in store', () => {
        // GIVEN seed
        const seed = 'seed 1';

        // WHEN saveSeed is called
        service.saveSeed(seed);

        // THEN setItem was called
        expect(localStorageSetItemSpy).toHaveBeenCalledTimes(1);
        expect(localStorageSetItemSpy).toHaveBeenCalledWith('seed', 'seed 1');
      });
    });

    describe('listenForExampleRoutes', () => {
      it('should not load the new seed if event was not NavigationEnd', () => {
        spyOn(service, 'seeds$').and.returnValue(
          cold('a', { a: [{ name: 'example 1' }] })
        );
        const loadSelectedSeedSpy = spyOn(service, 'loadSelectedSeed');

        getTestScheduler().run(() => {
          const event$ = cold('a', {
            a: new NavigationStart(1, `/example/example 1`),
          });

          service.listenForExampleRoutes(event$);
        });

        expect(loadSelectedSeedSpy).toHaveBeenCalledTimes(0);
        expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
      });

      it('should not load the new seed if navigation was not to an example', () => {
        spyOn(service, 'seeds$').and.returnValue(
          cold('a', { a: [{ name: 'example 1' }] })
        );
        const loadSelectedSeedSpy = spyOn(service, 'loadSelectedSeed');

        getTestScheduler().run(() => {
          const event$ = cold('a', {
            a: new NavigationEnd(1, `/example`, 'url 2'),
          });

          service.listenForExampleRoutes(event$);
        });

        expect(loadSelectedSeedSpy).toHaveBeenCalledTimes(0);
        expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
      });

      it('should not load a seed of seeds$ has not emitted', () => {
        spyOn(service, 'seeds$').and.returnValue(cold(''));
        const loadSelectedSeedSpy = spyOn(service, 'loadSelectedSeed');

        getTestScheduler().run(() => {
          const event$ = cold('a', {
            a: new NavigationEnd(1, `/example/example 1`, 'url 2'),
          });

          service.listenForExampleRoutes(event$);
        });

        expect(loadSelectedSeedSpy).toHaveBeenCalledTimes(0);
        expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
      });

      it('should navigate to error if the seed does not exist', () => {
        spyOn(service, 'seeds$').and.returnValue(cold('a', { a: [] }));
        const loadSelectedSeedSpy = spyOn(service, 'loadSelectedSeed');

        getTestScheduler().run(() => {
          const event$ = cold('a', {
            a: new NavigationEnd(1, `/example/example 1`, 'url 2'),
          });

          service.listenForExampleRoutes(event$);
        });

        expect(loadSelectedSeedSpy).toHaveBeenCalledTimes(0);
        expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['error']);
      });

      describe('both seeds$ and navigation emit', () => {
        const parameters = [
          {
            description: 'seeds$ emits first',
            expectation: 'selected seed is loaded',
            seedsMarbles: 'a-',
            seedsValues: { a: [{ name: 'example 1' }] },
            eventMarbles: '-b',
            eventValues: {
              b: new NavigationEnd(1, `/example/example 1`, 'url 2'),
            },
          },
          {
            description: 'seeds$ emits first',
            expectation: 'selected seed is loaded',
            seedsMarbles: '-b',
            seedsValues: { b: [{ name: 'example 1' }] },
            eventMarbles: 'a-',
            eventValues: {
              a: new NavigationEnd(1, `/example/example 1`, 'url 2'),
            },
          },
        ];

        parameters.forEach(
          ({
            description,
            expectation,
            seedsMarbles,
            seedsValues,
            eventMarbles,
            eventValues,
          }) => {
            describe(description, () => {
              it(expectation, () => {
                spyOn(service, 'seeds$').and.returnValue(
                  cold(seedsMarbles, seedsValues)
                );
                const loadSelectedSeedSpy = spyOn(service, 'loadSelectedSeed');

                getTestScheduler().run(() => {
                  const event$ = cold(eventMarbles, eventValues);

                  service.listenForExampleRoutes(event$);
                });

                expect(loadSelectedSeedSpy).toHaveBeenCalledTimes(1);
                expect(loadSelectedSeedSpy).toHaveBeenCalledWith({
                  name: 'example 1',
                } as any);
                expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
              });
            });
          }
        );
      });
    });
  });

  describe('integration', () => {
    it('should listen to example routes', () => {
      (routerSpy as any).events = cold('-b', {
        b: new NavigationEnd(1, `/example/example 1`, 'url 2'),
      });
      service = new SeedService(httpClientSpy, routerSpy);

      httpClientSpy.get.and.returnValue(
        cold('a', { a: [{ name: 'example 1' }] })
      );
      service.loadSeeds();

      const loadSelectedSeedSpy = spyOn(service, 'loadSelectedSeed');

      getTestScheduler().run(() => {});

      expect(loadSelectedSeedSpy).toHaveBeenCalledTimes(1);
      expect(loadSelectedSeedSpy).toHaveBeenCalledWith({
        name: 'example 1',
      } as any);
      expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
    });
  });
});
