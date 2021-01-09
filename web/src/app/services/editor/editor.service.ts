import { Injectable } from '@angular/core';

import { createSelector, select } from '@ngrx/store';
import { Store } from '@ngrx/store';

import { combineResult } from '../../helpers/combine-results';
import * as EditorActions from './editor.actions';
import { SpecValue, SeedPath } from './types';
import { EditorState, EditorSeedState } from './editor.reducer';
import { AppState, selectEditor } from '../app.state';

const selectEditorSeed = createSelector(
  selectEditor,
  (state: EditorState) => state.seed
);
const selectEditorSeedCurrent = createSelector(
  selectEditorSeed,
  (state: EditorSeedState) => state.current
);
const selectEditorSeedSelected = createSelector(
  selectEditorSeed,
  (state: EditorSeedState) => state.selected
);
const selectEditorSeedAvailable = createSelector(
  selectEditorSeed,
  (state: EditorSeedState) => state.available
);
const selectEditorValidate = createSelector(
  selectEditor,
  (state: EditorState) => state.validate
);
const selectEditorArtifact = createSelector(
  selectEditor,
  (state: EditorState) => state.artifact
);
const selectEditorResult = createSelector(selectEditor, (state: EditorState) =>
  combineResult(state.validate.managed.value, state.artifact.value)
);

@Injectable({ providedIn: 'root' })
export class EditorService {
  seed$ = this.store.pipe(select(selectEditorSeed));
  seedCurrent$ = this.store.pipe(select(selectEditorSeedCurrent));
  seedAvailable$ = this.store.pipe(select(selectEditorSeedAvailable));
  seedSelected$ = this.store.pipe(select(selectEditorSeedSelected));
  validate$ = this.store.pipe(select(selectEditorValidate));
  artifact$ = this.store.pipe(select(selectEditorArtifact));

  constructor(private store: Store<AppState>) {}

  editorComponentOnInit(): void {
    this.store.dispatch(EditorActions.editorComponentOnInit());
  }

  editorComponentSeedLoaded(value: SpecValue): void {
    this.store.dispatch(EditorActions.editorComponentSeedLoaded({ value }));
  }

  editorComponentValueChange(value: SpecValue): void {
    this.store.dispatch(EditorActions.editorComponentValueChange({ value }));
  }

  seedComponentOnInit(): void {
    this.store.dispatch(EditorActions.seedComponentOnInit());
  }

  seedComponentSelectChange(path: SeedPath): void {
    this.store.dispatch(EditorActions.seedComponentSelectChange({ path }));
  }
}
