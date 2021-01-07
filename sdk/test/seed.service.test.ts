import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import { BASE_URL } from '../src/seed.service';
import { SeedError, SeedService } from '../src';

describe('SeedService', () => {
  let mockAdaptor: MockAdaptor;
  let service: SeedService;

  beforeEach(() => {
    mockAdaptor = new MockAdaptor(axios);
    service = new SeedService();
  });

  describe('getDefault', () => {
    test('should get the default seed when 200 is returned', async () => {
      // GIVE mocked axios that returns 200
      const response = 'seed value 1';
      mockAdaptor.onGet(`${BASE_URL}/seed`).replyOnce(200, response);

      // WHEN getDefault is called
      const returnedPromise = service.getDefault();

      // THEN the promise resolves
      await expect(returnedPromise).resolves.toEqual(response);
    });

    test('should get the default seed when 200 is returned using observable', async () => {
      // GIVE mocked axios that returns 200
      const response = 'seed value 1';
      mockAdaptor.onGet(`${BASE_URL}/seed`).replyOnce(200, response);

      // WHEN getDefault is called
      const returnedPromise = service.getDefault$().toPromise();

      // THEN the promise resolves
      await expect(returnedPromise).resolves.toEqual(response);
    });

    test('should throw error if a 400 error is returned', async () => {
      // GIVE mocked axios that returns 400
      const message = 'message 1';
      mockAdaptor.onGet(`${BASE_URL}/seed`).replyOnce(400, btoa(message));

      // WHEN getDefault is called
      const returnedPromise = service.getDefault();

      // THEN the expected error is thrown
      const expectedError = new SeedError(
        `error whilst retrieving the default seed: ${message}`
      );
      await expect(returnedPromise).rejects.toEqual(expectedError);
    });
  });

  describe('list', () => {
    test('should retrieve available seeds when 200 is returned', async () => {
      // GIVE mocked axios that returns 200
      const response = [{ key: 'value' }];
      mockAdaptor.onGet(`${BASE_URL}/seeds`).replyOnce(200, response);

      // WHEN list is called
      const returnedPromise = service.list();

      // THEN the promise resolves
      await expect(returnedPromise).resolves.toEqual(response);
    });

    test('should retrieve available seeds when 200 is returned using observable', async () => {
      // GIVE mocked axios that returns 200
      const response = [{ key: 'value' }];
      mockAdaptor.onGet(`${BASE_URL}/seeds`).replyOnce(200, response);

      // WHEN list is called
      const returnedPromise = service.list$().toPromise();

      // THEN the promise resolves
      await expect(returnedPromise).resolves.toEqual(response);
    });

    test('should throw error if a 400 error is returned', async () => {
      // GIVE mocked axios that returns 400
      const message = 'message 1';
      mockAdaptor.onGet(`${BASE_URL}/seeds`).replyOnce(400, btoa(message));

      // WHEN list is called
      const returnedPromise = service.list();

      // THEN the expected error is thrown
      const expectedError = new SeedError(
        `error whilst retrieving the available seeds: ${message}`
      );
      await expect(returnedPromise).rejects.toEqual(expectedError);
    });
  });

  describe('get', () => {
    test('should retrieve the seed when 200 is returned', async () => {
      // GIVE mocked axios that returns 200
      const path = 'seed/1';
      const response = 'seed value 1';
      mockAdaptor
        .onGet(`${BASE_URL}/seeds/${encodeURIComponent(path)}`)
        .replyOnce(200, response);

      // WHEN get is called
      const returnedPromise = service.get({ path });

      // THEN the promise resolves
      await expect(returnedPromise).resolves.toEqual(response);
    });

    test('should retrieve the seed when 200 is returned using observable', async () => {
      // GIVE mocked axios that returns 200
      const path = 'seed1';
      const response = 'seed value 1';
      mockAdaptor.onGet(`${BASE_URL}/seeds/${path}`).replyOnce(200, response);

      // WHEN get is called
      const returnedPromise = service.get$({ path }).toPromise();

      // THEN the promise resolves
      await expect(returnedPromise).resolves.toEqual(response);
    });

    test('should throw error if a 400 error is returned', async () => {
      // GIVE mocked axios that returns 400
      const path = 'seed1';
      const message = 'message 1';
      mockAdaptor
        .onGet(`${BASE_URL}/seeds/${path}`)
        .replyOnce(400, btoa(message));

      // WHEN get is called
      const returnedPromise = service.get({ path });

      // THEN the expected error is thrown
      const expectedError = new SeedError(
        `error whilst retrieving the seed ${path}: ${message}`
      );
      await expect(returnedPromise).rejects.toEqual(expectedError);
    });
  });
});
