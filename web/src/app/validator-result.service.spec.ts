import { HttpClient } from '@angular/common/http';
import { cold, getTestScheduler } from 'jasmine-marbles';

import { SpecService } from './spec.service';
import { ValidatorResultService } from './validator-result.service';

describe('ValidatorResultService', () => {
  let service: ValidatorResultService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let specServiceSpy: jasmine.SpyObj<SpecService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    specServiceSpy = jasmine.createSpyObj('SpecService', ['spec$']);
  });

  describe('result$', () => {
    it('should send the spec to the validator', () => {
      getTestScheduler().run(({ expectObservable }) => {
        // GIVEN mock http service that returns a value
        httpClientSpy.post.and.returnValue(cold('-d|', { d: 'post value d' }));
        // AND a spec service that emits specs
        const spec = cold('-b', { b: 'spec value b' });
        specServiceSpy.spec$.and.returnValue(spec);

        // WHEN validator service is constructed
        service = new ValidatorResultService(specServiceSpy, httpClientSpy);
        service.options.delayTime = 1;

        // THEN the expected results are emitted
        expectObservable(service.result$()).toBe('---d', { d: 'post value d' });
        // AND the expected errors are reported
        expectObservable(service.error$()).toBe('');
      });

      // AND post has been called with the expected arguments
      expect(httpClientSpy.post).toHaveBeenCalledTimes(2);
      expect(
        httpClientSpy.post
      ).toHaveBeenCalledWith(
        'https://editor.api.openalchemy.io/v1/spec/validate-managed',
        'spec value b',
        { headers: { 'X-LANGUAGE': 'YAML' } }
      );
    });
  });

  describe('unmanagedResult$', () => {
    it('should send the spec to the unmanaged validator', () => {
      getTestScheduler().run(({ expectObservable }) => {
        // GIVEN mock http service that returns a value
        httpClientSpy.post.and.returnValue(cold('-d|', { d: 'post value d' }));
        // AND a spec service that emits specs
        const spec = cold('-b', { b: 'spec value b' });
        specServiceSpy.spec$.and.returnValue(spec);

        // WHEN validator service is constructed
        service = new ValidatorResultService(specServiceSpy, httpClientSpy);
        service.options.delayTime = 1;

        // THEN the expected results are emitted
        expectObservable(service.unmanagedResult$()).toBe('---d', {
          d: 'post value d',
        });
        // AND the expected errors are reported
        expectObservable(service.error$()).toBe('');
      });

      // AND post has been called with the expected arguments
      expect(httpClientSpy.post).toHaveBeenCalledTimes(2);
      expect(
        httpClientSpy.post
      ).toHaveBeenCalledWith(
        'https://editor.api.openalchemy.io/v1/spec/validate-un-managed',
        'spec value b',
        { headers: { 'X-LANGUAGE': 'YAML' } }
      );
    });
  });
});
