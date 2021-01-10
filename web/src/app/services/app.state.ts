import { createFeatureSelector } from '@ngrx/store';

import {
  EditorState,
  initialState as editorInitialState,
} from './editor/editor.reducer';
import {
  PackageState,
  initialState as packageInitialState,
} from './package/package.reducer';

export interface AppState {
  editor: EditorState;
  package: PackageState;
}

export const selectEditor = createFeatureSelector<AppState, EditorState>(
  'editor'
);
export const selectPackage = createFeatureSelector<AppState, PackageState>(
  'package'
);

export const initialState: AppState = {
  editor: editorInitialState,
  package: packageInitialState,
};
