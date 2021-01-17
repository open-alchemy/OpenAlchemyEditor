import { Injectable } from '@angular/core';

import { createSelector, select } from '@ngrx/store';
import { Store } from '@ngrx/store';

import { AppState, selectPackage } from '../app.state';
import { PackageState, PackageSpecState } from './package.reducer';
import { SpecName, SpecValue } from './types';
import * as PackageActions from './package.actions';

const selectSpec = createSelector(
  selectPackage,
  (state: PackageState) => state.spec
);
const selectSave = createSelector(
  selectPackage,
  (state: PackageState) => state.save
);
const selectCredentials = createSelector(
  selectPackage,
  (state: PackageState) => state.credentials
);
const selectError = createSelector(
  selectPackage,
  (state: PackageState) => state.error
);

const selectSpecInfo = createSelector(
  selectSpec,
  (state: PackageSpecState) => state.info
);

@Injectable({ providedIn: 'root' })
export class PackageService {
  spec$ = this.store.pipe(select(selectSpec));
  specInfo$ = this.store.pipe(select(selectSpecInfo));
  save$ = this.store.pipe(select(selectSave));
  credentials$ = this.store.pipe(select(selectCredentials));
  error$ = this.store.pipe(select(selectError));

  constructor(private store: Store<AppState>) {}

  saveComponentSaveClick(value: SpecValue, name: SpecName): void {
    this.store.dispatch(PackageActions.saveComponentSaveClick({ value, name }));
  }
}
