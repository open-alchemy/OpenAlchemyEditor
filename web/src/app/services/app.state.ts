import { createFeatureSelector } from '@ngrx/store';

import { EditorState } from './editor/editor.reducer';

export interface AppState {
  editor: EditorState;
}

export const selectEditor = createFeatureSelector<AppState, EditorState>(
  'editor'
);
