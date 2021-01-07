import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import { BASE_URL } from '../src/artifact.service';
import { ArtifactError, ArtifactService } from '../src';

describe('ArtifactService', () => {
  let mockAdaptor: MockAdaptor;
  let service: ArtifactService;

  beforeEach(() => {
    mockAdaptor = new MockAdaptor(axios);
    service = new ArtifactService();
  });

  describe('calculate', () => {
    test('should calculate the artifacts of the spec when 200 is returned', async () => {
      // GIVE mocked axios that returns 200
      const specValue = 'spec value 1';
      const language = 'JSON';
      const response = { key: 'value' };
      mockAdaptor.onPost(`${BASE_URL}/calculate`).replyOnce((config) => {
        expect(config.headers).toHaveProperty('Content-Type');
        expect(config.headers['Content-Type']).toEqual('text/plain');
        expect(config.headers).toHaveProperty('X-LANGUAGE');
        expect(config.headers['X-LANGUAGE']).toEqual(language);

        return [200, response];
      });

      // WHEN calculate is called
      const returnedPromise = service.calculate({
        value: specValue,
        language,
      });

      // THEN the promise resolves
      await expect(returnedPromise).resolves.toEqual(response);
    });

    test('should calculate the artifacts of the spec when 200 is returned using observable', async () => {
      // GIVE mocked axios that returns 200
      const specValue = 'spec value 1';
      const language = 'JSON';
      const response = { key: 'value' };
      mockAdaptor.onPost(`${BASE_URL}/calculate`).replyOnce(200, response);

      // WHEN calculate is called
      const returnedPromise = service
        .calculate$({
          value: specValue,
          language,
        })
        .toPromise();

      // THEN the promise resolves
      await expect(returnedPromise).resolves.toEqual(response);
    });

    test('should throw error if a 400 error is returned', async () => {
      // GIVE mocked axios that returns 400
      const specValue = 'spec value 1';
      const message = 'message 1';
      const language = 'JSON';
      mockAdaptor.onPost(`${BASE_URL}/calculate`).replyOnce(400, btoa(message));

      // WHEN calculate is called
      const returnedPromise = service.calculate({
        value: specValue,
        language,
      });

      // THEN the expected error is thrown
      const expectedError = new ArtifactError(
        `error whilst calculating the artifacts of the spec: ${message}`
      );
      await expect(returnedPromise).rejects.toEqual(expectedError);
    });
  });
});
