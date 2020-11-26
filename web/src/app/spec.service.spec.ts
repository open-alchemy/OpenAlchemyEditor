import { cold } from 'jasmine-marbles';
import { EMPTY } from 'rxjs';

import { SeedService } from './seed.service';
import { SpecService } from './spec.service';

describe('SpecService', () => {
  let service: SpecService;
  let seedServiceSpy: jasmine.SpyObj<SeedService>;

  beforeEach(() => {
    seedServiceSpy = jasmine.createSpyObj('SeedService', ['seed$', 'saveSeed']);
  });

  describe('spec$', () => {
    const parameters = [
      {
        description: 'seed emits once',
        expectation: 'should emit the seed',
        seed: ['-b', { b: 'seed value b' }],
        updateSpec: ['--', undefined],
        specMarbles: '-b',
        specValues: { b: 'seed value b' },
      },
      {
        description: 'seed emits multiple',
        expectation: 'should emit the seed',
        seed: ['-b-d', { b: 'seed value b', d: 'seed value d' }],
        updateSpec: ['----', undefined],
        specMarbles: '-b-d',
        specValues: { b: 'seed value b', d: 'seed value d' },
      },
      {
        description: 'spec updated once',
        expectation: 'should emit the spec',
        seed: ['--', undefined],
        updateSpec: ['-b', { b: 'spec value b' }],
        specMarbles: '-b',
        specValues: { b: 'spec value b' },
      },
      {
        description: 'spec updated multiple times',
        expectation: 'should emit the spec',
        seed: ['----', undefined],
        updateSpec: ['-b-d', { b: 'spec value b', d: 'spec value d' }],
        specMarbles: '-b-d',
        specValues: { b: 'spec value b', d: 'spec value d' },
      },
      {
        description: 'seed then spec',
        expectation: 'should emit the seed and spec',
        seed: ['-b--', { b: 'seed value b' }],
        updateSpec: ['---d', { d: 'spec value d' }],
        specMarbles: '-b-d',
        specValues: { b: 'seed value b', d: 'spec value d' },
      },
    ];

    parameters.forEach(
      ({
        description,
        expectation,
        seed,
        updateSpec,
        specMarbles,
        specValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            // GIVEN mock seed service
            seedServiceSpy.seed$.and.returnValue((cold as any)(...seed));
            service = new SpecService(seedServiceSpy);

            // WHEN updateSpec is called
            (cold as any)(...updateSpec).subscribe((spec) =>
              service.updateSpec(spec)
            );

            // THEN the spec is emitted
            expect(service.spec$()).toBeObservable(
              cold(specMarbles, specValues)
            );
          });
        });
      }
    );
  });

  describe('updateSpec', () => {
    it('should send the new spec to be saved', () => {
      // GIVEN new spec
      const spec = 'spec 1';
      seedServiceSpy.seed$.and.returnValue(EMPTY);
      service = new SpecService(seedServiceSpy);

      // WHEN updateSpec is called
      service.updateSpec(spec);

      // THEN the seed service saveSeed is called
      expect(seedServiceSpy.saveSeed).toHaveBeenCalledTimes(1);
      expect(seedServiceSpy.saveSeed).toHaveBeenCalledWith('spec 1');
    });
  });
});
