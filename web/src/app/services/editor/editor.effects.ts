import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { of, Observable } from 'rxjs';
import {
  map,
  filter,
  catchError,
  switchMap,
  withLatestFrom,
  startWith,
} from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SeedService } from '@open-alchemy/editor-sdk';

import * as EditorActions from './editor.actions';

export const SEED_KEY = 'seed';

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

  seedLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.editorComponentOnInit.type),
      // It is not possible for editorComponentOnInit to emit before this.currentUrl$()
      withLatestFrom(this.currentUrl$()),
      map(([action, url]) => ({
        action,
        url,
      })),
      filter(({ url }) => !url.startsWith('example/')),
      map(() => {
        return localStorage.getItem(SEED_KEY) !== null
          ? EditorActions.localStorageSeedLoaded({
              value: localStorage.getItem(SEED_KEY),
            })
          : EditorActions.localStorageSeedNotFound();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private seedService: SeedService,
    private router: Router
  ) {}

  currentUrl$(): Observable<string> {
    return this.router.events.pipe(
      filter<NavigationStart>((event) => event instanceof NavigationStart),
      map((event) => event.url)
    );
  }
}
