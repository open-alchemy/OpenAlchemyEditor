import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import { BASE_URL } from '../src/spec.service';
import { SpecError, SpecService } from '../src';

describe('SpecService', () => {
  let mockAdaptor: MockAdaptor;
  let service: SpecService;

  beforeEach(() => {
    mockAdaptor = new MockAdaptor(axios);
    service = new SpecService();
  });

  describe('validateManaged', () => {
    test('should validate the spec when 200 is returned', async () => {
      // GIVE mocked axios that returns 200
      const specValue = 'spec value 1';
      const language = 'JSON';
      const response = { key: 'value' };
      mockAdaptor.onPost(`${BASE_URL}/validate-managed`).replyOnce((config) => {
        expect(config.headers).toHaveProperty('Content-Type');
        expect(config.headers['Content-Type']).toEqual('text/plain');
        expect(config.headers).toHaveProperty('X-LANGUAGE');
        expect(config.headers['X-LANGUAGE']).toEqual(language);

        return [200, response];
      });

      // WHEN validateManaged is called
      const returnedPromise = service.validateManaged({
        value: specValue,
        language,
      });

      // THEN the promise resolves
      await expect(returnedPromise).resolves.toEqual(response);
    });

    test('should validate spec when 200 is returned using observable', async () => {
      // GIVE mocked axios that returns 200
      const specValue = 'spec value 1';
      const language = 'JSON';
      const response = { key: 'value' };
      mockAdaptor
        .onPost(`${BASE_URL}/validate-managed`)
        .replyOnce(200, response);

      // WHEN validateManaged is called
      const returnedPromise = service
        .validateManaged$({
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
      mockAdaptor
        .onPost(`${BASE_URL}/validate-managed`)
        .replyOnce(400, btoa(message));

      // WHEN validateManaged is called
      const returnedPromise = service.validateManaged({
        value: specValue,
        language,
      });

      // THEN the expected error is thrown
      const expectedError = new SpecError(
        `error whilst validating the managed portion of the spec: ${message}`
      );
      await expect(returnedPromise).rejects.toEqual(expectedError);
    });
  });

  describe('validateUnManaged', () => {
    test('should validate the spec when 200 is returned', async () => {
      // GIVE mocked axios that returns 200
      const specValue = 'spec value 1';
      const language = 'JSON';
      const response = { key: 'value' };
      mockAdaptor
        .onPost(`${BASE_URL}/validate-un-managed`)
        .replyOnce((config) => {
          expect(config.headers).toHaveProperty('Content-Type');
          expect(config.headers['Content-Type']).toEqual('text/plain');
          expect(config.headers).toHaveProperty('X-LANGUAGE');
          expect(config.headers['X-LANGUAGE']).toEqual(language);

          return [200, response];
        });

      // WHEN validateUnManaged is called
      const returnedPromise = service.validateUnManaged({
        value: specValue,
        language,
      });

      // THEN the promise resolves
      await expect(returnedPromise).resolves.toEqual(response);
    });

    test('should validate spec when 200 is returned using observable', async () => {
      // GIVE mocked axios that returns 200
      const specValue = 'spec value 1';
      const language = 'JSON';
      const response = { key: 'value' };
      mockAdaptor
        .onPost(`${BASE_URL}/validate-un-managed`)
        .replyOnce(200, response);

      // WHEN validateUnManaged is called
      const returnedPromise = service
        .validateUnManaged$({
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
      mockAdaptor
        .onPost(`${BASE_URL}/validate-un-managed`)
        .replyOnce(400, btoa(message));

      // WHEN validateUnManaged is called
      const returnedPromise = service.validateUnManaged({
        value: specValue,
        language,
      });

      // THEN the expected error is thrown
      const expectedError = new SpecError(
        `error whilst validating the un managed portion of the spec: ${message}`
      );
      await expect(returnedPromise).rejects.toEqual(expectedError);
    });
  });
});
