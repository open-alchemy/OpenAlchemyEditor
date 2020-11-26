import { HttpClient } from '@angular/common/http';
import { cold, getTestScheduler } from 'jasmine-marbles';

import { SpecService } from './spec.service';
import { ArtifactsResultService } from './artifacts-result.service';

describe('ArtifactsResultService', () => {
  let service: ArtifactsResultService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let specServiceSpy: jasmine.SpyObj<SpecService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    specServiceSpy = jasmine.createSpyObj('SpecService', ['spec$']);
  });

  describe('result$', () => {
    it('should send the spec to the artifacts', () => {
      getTestScheduler().run(({ expectObservable }) => {
        // GIVEN mock http service that returns a value
        httpClientSpy.post.and.returnValue(cold('-d|', { d: 'post value d' }));
        // AND a spec service that emits specs
        const spec = cold('-b', { b: 'spec value b' });
        specServiceSpy.spec$.and.returnValue(spec);

        // WHEN artifacts service is constructed
        service = new ArtifactsResultService(specServiceSpy, httpClientSpy);
        service.options.delayTime = 1;

        // THEN the expected results are emitted
        expectObservable(service.artifacts$()).toBe('---d', {
          d: 'post value d',
        });
        // AND the expected errors are reported
        expectObservable(service.error$()).toBe('');
      });

      // AND post has been called with the expected arguments
      expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
      expect(
        httpClientSpy.post
      ).toHaveBeenCalledWith(
        'https://editor-v2.api.openalchemy.io/v1/artifact/calculate',
        'spec value b',
        { headers: { 'Content-Type': 'application/yaml' } }
      );
    });
  });
});
