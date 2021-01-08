import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SeedService } from '@open-alchemy/editor-sdk';

import * as EditorActions from './editor.actions';

@Injectable()
export class EditorEffects {
  seedsGet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.seedComponentOnInit.type),
      switchMap(() =>
        this.seedService.list$().pipe(
          map((seeds) => EditorActions.editorApiSeedsGetSuccess({ seeds })),
          catchError((error) =>
            of(EditorActions.editorApiSeedsGetError({ message: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private seedService: SeedService) {}
}
