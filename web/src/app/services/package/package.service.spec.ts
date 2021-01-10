import { Injector } from '@angular/core';
import { TestScheduler } from 'rxjs/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppState, initialState } from '../app.state';
import { initialState as initialPackageState } from './package.reducer';
import { PackageService } from './package.service';
import { LimitedSpecInfo } from './types';

describe('PackageService', () => {
  let service: PackageService;
  let store: MockStore<AppState>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    const injector = Injector.create({
      providers: provideMockStore({ initialState }),
    });
    store = injector.get(MockStore);
    service = new PackageService(store);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('spec$', () => {
    it('should pick the correct state', () => {
      testScheduler.run((helpers) => {
        // GIVEN store with initial state and then a different state
        const specState: LimitedSpecInfo = {
          title: 'title 1',
        };
        helpers
          .cold('-b', {
            b: {
              ...initialState,
              package: { ...initialState.package, spec: specState },
            },
          })
          .subscribe((newState) => store.setState(newState));

        // WHEN

        // THEN the spec state is returned
        helpers
          .expectObservable(service.spec$)
          .toBe('ab', { a: initialPackageState.spec, b: specState });
      });
    });
  });
});
