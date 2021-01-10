import { Injectable } from '@angular/core';

import { createSelector, select } from '@ngrx/store';
import { Store } from '@ngrx/store';

import { AppState, selectPackage } from '../app.state';
import { PackageState } from './package.reducer';

const selectSpec = createSelector(
  selectPackage,
  (state: PackageState) => state.spec
);

@Injectable({ providedIn: 'root' })
export class PackageService {
  spec$ = this.store.pipe(select(selectSpec));

  constructor(private store: Store<AppState>) {}
}
