import { cold, getTestScheduler } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs';

import { postSpec } from './post-spec';
import { filter } from 'rxjs/operators';

describe('checkSpec', () => {
  const parameters = [
    {
      description: 'single spec trigger',
      expectation: 'should emit the result',
      delayTime: 1,
      specMarbles: '-b',
      specValues: { b: 'spec value b' },
      posts: [['-d|', { d: 'post value d' }]],
      expectedCallArgs: ['spec value b'],
      resultMarbles: '---d',
      resultValues: { d: 'post value d' },
      errorMarbles: '',
      errorValues: undefined,
    },
    {
      description: 'multiple spec trigger before post returns',
      expectation: 'should emit the result',
      delayTime: 1,
      specMarbles: '-b-d',
      specValues: { b: 'spec value b', d: 'spec value d' },
      posts: [
        ['--e|', { e: 'post value e' }],
        ['-f|', { f: 'post value f' }],
      ],
      expectedCallArgs: ['spec value b', 'spec value d'],
      resultMarbles: '-----f',
      resultValues: { f: 'post value f' },
      errorMarbles: '',
      errorValues: undefined,
    },
    {
      description: 'multiple spec trigger before delay',
      expectation: 'should emit the result',
      delayTime: 2,
      specMarbles: '-b-d',
      specValues: { b: 'spec value b', d: 'spec value d' },
      posts: [['-g|', { g: 'post value g' }]],
      expectedCallArgs: ['spec value d'],
      resultMarbles: '------g',
      resultValues: { g: 'post value g' },
      errorMarbles: '',
      errorValues: undefined,
    },
    {
      description: 'single spec trigger post error',
      expectation: 'should emit the result',
      delayTime: 1,
      specMarbles: '-b',
      specValues: { b: 'spec value b' },
      posts: [['-#|', undefined]],
      expectedCallArgs: ['spec value b'],
      resultMarbles: '----',
      resultValues: undefined,
      errorMarbles: '---d',
      errorValues: { d: 'error' },
    },
  ];

  parameters.forEach(
    ({
      description,
      expectation,
      delayTime,
      specMarbles,
      specValues,
      posts,
      expectedCallArgs,
      resultMarbles,
      resultValues,
      errorMarbles,
      errorValues,
    }) => {
      describe(description, () => {
        it(expectation, () => {
          const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
          const error$ = new BehaviorSubject<any>(null);

          getTestScheduler().run(({ expectObservable }) => {
            // GIVEN mock http service that returns a value
            const postReturnValues = (posts as any).map((args) =>
              (cold as any)(...args)
            );
            httpClientSpy.post.and.returnValues(...postReturnValues);

            // THEN the expected results are emitted when the spec source is passed in
            const spec = cold(specMarbles, specValues);
            expectObservable(
              postSpec(spec, 'some-url', httpClientSpy, { delayTime }, error$)
            ).toBe(resultMarbles, resultValues);
            // AND the expected errors are reported
            expectObservable(
              error$.pipe(filter((error) => error !== null))
            ).toBe(errorMarbles, errorValues);
          });

          // AND post has been called with the expected arguments
          expect(httpClientSpy.post).toHaveBeenCalledTimes(
            expectedCallArgs.length
          );
          expectedCallArgs.map((expectedCallArg) =>
            expect(httpClientSpy.post).toHaveBeenCalledWith(
              'some-url',
              expectedCallArg,
              { headers: { 'Content-Type': 'application/yaml' } }
            )
          );
        });
      });
    }
  );
});
