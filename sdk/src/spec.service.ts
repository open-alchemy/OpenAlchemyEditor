import axios from 'axios';
import { from, Observable } from 'rxjs';

import { SpecValue, ValidationResponse } from './types';

import { SpecError } from './errors';
import { decodeResponse } from './helpers';

export const BASE_URL = 'https://editor.api.openalchemy.io/v1/spec';

interface IValidateManagedParams {
  value: SpecValue;
  language: 'JSON' | 'YAML';
}

// interface IValidateUnManagedParams {
//   value: SpecValue;
//   language: 'JSON' | 'YAML';
// }

export class SpecService {
  /**
   * Validate a spec
   *
   * Throws SpecError is something goes wrong whilst validating the spec
   *
   * @param params.value The value of the spec
   * @param params.language The language the spec is in
   */
  async validateManaged(
    params: IValidateManagedParams
  ): Promise<ValidationResponse> {
    const url = `${BASE_URL}/validate-managed`;

    const response = await axios
      .post<ValidationResponse>(url, params.value, {
        headers: {
          'Content-Type': 'text/plain',
          'X-LANGUAGE': params.language,
        },
      })
      .catch((error) => {
        console.log(error);
        const message = decodeResponse(error.response.data);
        throw new SpecError(
          `error whilst validating the managed portion of the spec: ${message}`
        );
      });
    return response.data;
  }

  validateManaged$(
    params: IValidateManagedParams
  ): Observable<ValidationResponse> {
    return from(this.validateManaged(params));
  }
}
