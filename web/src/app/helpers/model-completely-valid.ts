import { ValidationResponseModel } from '../services/editor/types';

export function modelCompletelyValid(model: ValidationResponseModel): boolean {
  if (!model || !model.result || model.result.valid === false) {
    return false;
  }

  if (!model.properties) {
    return true;
  }

  return !Object.keys(model.properties)
    .map((key) => model.properties[key])
    .map((value) => value?.result?.valid)
    .some((value) => value === false);
}
