import axios from 'axios';
import { from, Observable } from 'rxjs';

import { SpecValue, ArtifactResponse } from './types';

import { ArtifactError } from './errors';
import { decodeResponse } from './helpers';

export const BASE_URL = 'https://editor.api.openalchemy.io/v1/artifact';

interface ICalculateParams {
  value: SpecValue;
  language: 'JSON' | 'YAML';
}

export class ArtifactService {
  /**
   * Calculate the artifacts of a spec
   *
   * Throws ArtifactError is something goes wrong whilst calculating the artifacts
   *
   * @param params.value The value of the spec
   * @param params.language The language the spec is in
   */
  async calculate(params: ICalculateParams): Promise<ArtifactResponse> {
    const url = `${BASE_URL}/calculate`;

    const response = await axios
      .post<ArtifactResponse>(url, params.value, {
        headers: {
          'Content-Type': 'text/plain',
          'X-LANGUAGE': params.language,
        },
      })
      .catch((error) => {
        const message = decodeResponse(error.response.data);
        throw new ArtifactError(
          `error whilst calculating the artifacts of the spec: ${message}`
        );
      });
    return response.data;
  }

  calculate$(params: ICalculateParams): Observable<ArtifactResponse> {
    return from(this.calculate(params));
  }
}
