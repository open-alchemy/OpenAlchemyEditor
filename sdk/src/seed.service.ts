import axios from 'axios';
import { from, Observable } from 'rxjs';

import { SeedPath, SeedValue, Seed } from './types';

import { SeedError } from './errors';
import { decodeResponse } from './helpers';

export const BASE_URL = 'https://editor.api.openalchemy.io/v1';

interface IGetParams {
  path: SeedPath;
}

export class SeedService {
  /**
   * Get the default seed
   *
   * Throws SeedError is something goes wrong whilst retrieving the seed
   */
  async getDefault(): Promise<SeedValue> {
    const url = `${BASE_URL}/seed`;

    const response = await axios.get<SeedValue>(url).catch((error) => {
      const message = decodeResponse(error.response.data);
      throw new SeedError(
        `error whilst retrieving the default seed: ${message}`
      );
    });
    return response.data;
  }

  getDefault$(): Observable<SeedValue> {
    return from(this.getDefault());
  }

  /**
   * Get all available seeds
   *
   * Throws SeedError is something goes wrong whilst retrieving the available seeds
   */
  async list(): Promise<Seed> {
    const url = `${BASE_URL}/seeds`;

    const response = await axios.get<Seed>(url).catch((error) => {
      const message = decodeResponse(error.response.data);
      throw new SeedError(
        `error whilst retrieving the available seeds: ${message}`
      );
    });
    return response.data;
  }

  list$(): Observable<Seed> {
    return from(this.list());
  }

  /**
   * Get a particular seed
   *
   * Throws SeedError is something goes wrong whilst retrieving the seed
   */
  async get(params: IGetParams): Promise<SeedValue> {
    const url = `${BASE_URL}/seeds/${encodeURIComponent(params.path)}`;

    const response = await axios.get<SeedValue>(url).catch((error) => {
      const message = decodeResponse(error.response.data);
      throw new SeedError(
        `error whilst retrieving the seed ${params.path}: ${message}`
      );
    });
    return response.data;
  }

  get$(params: IGetParams): Observable<SeedValue> {
    return from(this.get(params));
  }
}
