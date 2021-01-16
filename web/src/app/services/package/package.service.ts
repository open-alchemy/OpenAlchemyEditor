import { Injectable } from '@angular/core';

import { createSelector, select } from '@ngrx/store';
import { Store } from '@ngrx/store';

import { AppState, selectPackage } from '../app.state';
import { PackageState, PackageSpecState } from './package.reducer';

const selectSpec = createSelector(
  selectPackage,
  (state: PackageState) => state.spec
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
  error$ = this.store.pipe(select(selectError));

  constructor(private store: Store<AppState>) {}
}
