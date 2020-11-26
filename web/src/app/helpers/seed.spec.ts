import { NavigationEnd } from '@angular/router';
import { isExample, getSeedFromSeeds, getSeedNameFromEvent } from './seed';

describe('seed helper', () => {
  describe('isExample', () => {
    const parameters = [
      {
        description: 'event null',
        expectation: 'return false',
        event: null,
        expectedResult: false,
      },
      {
        description: 'url null',
        expectation: 'return false',
        event: new NavigationEnd(1, null, '/example/'),
        expectedResult: false,
      },
      {
        description: 'incorrect url but urlAfterRedirects is correct',
        expectation: 'return false',
        event: new NavigationEnd(1, 'url 1', '/example/'),
        expectedResult: false,
      },
      {
        description: 'url correct',
        expectation: 'return true',
        event: new NavigationEnd(1, '/example/', 'url 2'),
        expectedResult: true,
      },
      {
        description: 'url correct with additional',
        expectation: 'return true',
        event: new NavigationEnd(1, '/example/example 1', 'url 2'),
        expectedResult: true,
      },
    ];

    parameters.map(({ description, expectation, event, expectedResult }) => {
      describe(description, () => {
        it(expectation, () => {
          expect(isExample(event)).toEqual(expectedResult);
        });
      });
    });
  });

  describe('getSeedNameFromEvent', () => {
    const parameters = [
      {
        description: 'event null',
        expectation: 'should throw',
        event: null,
        throws: true,
        expectedSeedName: undefined,
      },
      {
        description: 'event url null',
        expectation: 'should throw',
        event: new NavigationEnd(1, null, 'url 2'),
        throws: true,
        expectedSeedName: undefined,
      },
      {
        description: 'event url empty string',
        expectation: 'should throw',
        event: new NavigationEnd(1, '', 'url 2'),
        throws: true,
        expectedSeedName: undefined,
      },
      {
        description: 'event url too few /',
        expectation: 'should throw',
        event: new NavigationEnd(1, '/example', 'url 2'),
        throws: true,
        expectedSeedName: undefined,
      },
      {
        description: 'event with seed name',
        expectation: 'should return name',
        event: new NavigationEnd(1, '/example/seed 1', 'url 2'),
        throws: false,
        expectedSeedName: 'seed 1',
      },
      {
        description: 'event with seed url encoded',
        expectation: 'should return name',
        event: new NavigationEnd(1, '/example/seed%2F1', 'url 2'),
        throws: false,
        expectedSeedName: 'seed/1',
      },
    ];

    parameters.forEach(
      ({ description, expectation, event, throws, expectedSeedName }) => {
        describe(description, () => {
          it(expectation, () => {
            if (throws) {
              expect(() => getSeedNameFromEvent(event)).toThrow(
                'seed name could not be in the url'
              );
            } else {
              expect(getSeedNameFromEvent(event)).toEqual(expectedSeedName);
            }
          });
        });
      }
    );
  });

  describe('getSeedFromSeeds', () => {
    const parameters = [
      {
        description: 'seeds null',
        expectation: 'should throw',
        seeds: null,
        seedName: undefined,
        throws: true,
        expectedSeed: undefined,
      },
      {
        description: 'seeds empty',
        expectation: 'should throw',
        seeds: [],
        seedName: 'seed 1',
        throws: true,
        expectedSeed: undefined,
      },
      {
        description: 'single seeds different name',
        expectation: 'should throw',
        seeds: [{ name: 'seed 1', path: 'path 1' }],
        seedName: 'seed 2',
        throws: true,
        expectedSeed: undefined,
      },
      {
        description: 'single seeds same name',
        expectation: 'should return seed',
        seeds: [{ name: 'seed 1', path: 'path 1' }],
        seedName: 'seed 1',
        throws: false,
        expectedSeed: { name: 'seed 1', path: 'path 1' },
      },
      {
        description: 'multiple seeds different name',
        expectation: 'should return seed',
        seeds: [
          { name: 'seed 1', path: 'path 1' },
          { name: 'seed 2', path: 'path 2' },
        ],
        seedName: 'seed 3',
        throws: true,
        expectedSeed: undefined,
      },
      {
        description: 'multiple seeds name first',
        expectation: 'should return seed',
        seeds: [
          { name: 'seed 1', path: 'path 1' },
          { name: 'seed 2', path: 'path 2' },
        ],
        seedName: 'seed 1',
        throws: false,
        expectedSeed: { name: 'seed 1', path: 'path 1' },
      },
      {
        description: 'multiple seeds name second',
        expectation: 'should return seed',
        seeds: [
          { name: 'seed 1', path: 'path 1' },
          { name: 'seed 2', path: 'path 2' },
        ],
        seedName: 'seed 2',
        throws: false,
        expectedSeed: { name: 'seed 2', path: 'path 2' },
      },
    ];

    parameters.forEach(
      ({ description, expectation, seeds, seedName, throws, expectedSeed }) => {
        describe(description, () => {
          it(expectation, () => {
            if (throws) {
              expect(() => getSeedFromSeeds(seedName, seeds)).toThrow(
                'seed is not valid'
              );
            } else {
              expect(getSeedFromSeeds(seedName, seeds)).toEqual(expectedSeed);
            }
          });
        });
      }
    );
  });
});
