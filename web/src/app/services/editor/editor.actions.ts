import { createAction, props } from '@ngrx/store';

import {
  Seed,
  SeedValue,
  SeedPath,
  SpecValue,
  Error,
  ValidationResponse,
  ArtifactResponse,
} from './types';

export const editorComponentOnInit = createAction('[editor component] on init');
export const editorComponentValueChange = createAction(
  '[editor component] value change',
  props<{ value: SpecValue }>()
);

export const seedComponentOnInit = createAction('[seed component] on init');
export const seedComponentSelectChange = createAction(
  '[seed component] select change',
  props<{ path: SeedPath }>()
);
export const locationGoSelectedSeed = createAction(
  '[location] changed to seed location'
);

export const routerNavigationStartExampleId = createAction(
  '[router] navigation start example/:id',
  props<{ path: SeedPath }>()
);

export const localStorageSeedLoaded = createAction(
  '[localStorage] seed loaded',
  props<{ value: SeedValue }>()
);
export const localStorageSeedNotFound = createAction(
  '[localStorage] seed not found'
);

export const editorApiSpecValidateManagedSuccess = createAction(
  '[editor API] /spec/validate-managed POST success',
  props<{ result: ValidationResponse }>()
);
export const editorApiSpecValidateManagedError = createAction(
  '[editor API] /spec/validate-managed POST error',
  props<Error>()
);
export const editorApiSpecValidateUnManagedSuccess = createAction(
  '[editor API] /spec/validate-un-managed POST success',
  props<{ result: ValidationResponse }>()
);
export const editorApiSpecValidateUnManagedError = createAction(
  '[editor API] /spec/validate-un-managed POST error',
  props<Error>()
);

export const editorApiArtifactCalculateSuccess = createAction(
  '[editor API] /artifact/calculate POST success',
  props<{ artifacts: ArtifactResponse }>()
);
export const editorApiArtifactCalculateError = createAction(
  '[editor API] /artifact/calculate POST error',
  props<Error>()
);

export const editorApiSeedGetSuccess = createAction(
  '[editor API] /seed GET success',
  props<{ value: SeedValue }>()
);
export const editorApiSeedGetError = createAction(
  '[editor API] /seed GET error',
  props<Error>()
);
export const editorApiSeedsGetSuccess = createAction(
  '[editor API] /seeds GET success',
  props<{ seeds: Seed[] }>()
);
export const editorApiSeedsGetError = createAction(
  '[editor API] /seeds GET error',
  props<Error>()
);
export const editorApiSeedsSeedGetSuccess = createAction(
  '[editor API] /seeds/{seed_path} GET success',
  props<{ value: SeedValue }>()
);
export const editorApiSeedsSeedGetError = createAction(
  '[editor API] /seeds/{seed_path} GET error',
  props<Error>()
);

export type Actions =
  | ReturnType<typeof editorComponentOnInit>
  | ReturnType<typeof editorComponentValueChange>
  | ReturnType<typeof seedComponentOnInit>
  | ReturnType<typeof seedComponentSelectChange>
  | ReturnType<typeof routerNavigationStartExampleId>
  | ReturnType<typeof localStorageSeedLoaded>
  | ReturnType<typeof localStorageSeedNotFound>
  | ReturnType<typeof editorApiSpecValidateManagedSuccess>
  | ReturnType<typeof editorApiSpecValidateManagedError>
  | ReturnType<typeof editorApiSpecValidateUnManagedSuccess>
  | ReturnType<typeof editorApiSpecValidateUnManagedError>
  | ReturnType<typeof editorApiArtifactCalculateSuccess>
  | ReturnType<typeof editorApiArtifactCalculateError>
  | ReturnType<typeof editorApiSeedGetSuccess>
  | ReturnType<typeof editorApiSeedGetError>
  | ReturnType<typeof editorApiSeedsGetSuccess>
  | ReturnType<typeof editorApiSeedsGetError>
  | ReturnType<typeof editorApiSeedsSeedGetSuccess>
  | ReturnType<typeof editorApiSeedsSeedGetError>
  | ReturnType<typeof editorApiSeedsSeedGetError>;
