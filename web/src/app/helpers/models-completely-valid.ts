import { ValidationResponse } from '../services/editor/types';
import { modelCompletelyValid } from './model-completely-valid';

export function modelsCompletelyValid(response: ValidationResponse): boolean {
  if (!response || !response.result || response.result.valid === false) {
    return false;
  }

  if (!response.models) {
    return true;
  }

  return !Object.keys(response.models)
    .map((modelName) => response.models[modelName])
    .some((model) => !modelCompletelyValid(model));
}
