import { ValidatorModelModel } from '../validator.model';

export function modelCompletelyValid(model: ValidatorModelModel): boolean {
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
