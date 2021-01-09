import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { of, Observable } from 'rxjs';
import {
  map,
  filter,
  catchError,
  switchMap,
  withLatestFrom,
  tap,
} from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SeedService } from '@open-alchemy/editor-sdk';

import * as EditorActions from './editor.actions';

export const SEED_KEY = 'seed';
export const SEED_URL_PREFIX = 'example/';

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

  routerNavigationSelectedSeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.seedComponentSelectChange.type),
      tap((action) =>
        this.router.navigate([
          `${SEED_URL_PREFIX}${encodeURIComponent(action.path)}`,
        ])
      ),
      map(() => EditorActions.routerNavigationSelectedSeed())
    )
  );

  routerNavigationBase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.editorComponentValueChange.type),
      tap(() => this.router.navigate([''])),
      map(() => EditorActions.routerNavigationBase())
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
      filter(({ url }) => !url.startsWith(SEED_URL_PREFIX)),
      map(() => {
        return localStorage.getItem(SEED_KEY) !== null
          ? EditorActions.localStorageSeedLoaded({
              value: localStorage.getItem(SEED_KEY),
            })
          : EditorActions.localStorageSeedNotFound();
      })
    )
  );

  seedGet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.localStorageSeedNotFound.type),
      switchMap(() =>
        this.seedService.getDefault$().pipe(
          map((value) => EditorActions.editorApiSeedGetSuccess({ value })),
          catchError((error) =>
            of(EditorActions.editorApiSeedGetError({ message: error.message }))
          )
        )
      )
    )
  );

  seedsSeedGet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EditorActions.seedComponentSelectChange.type,
        EditorActions.routerNavigationStartExampleId.type
      ),
      map((action) =>
        action.type === EditorActions.seedComponentSelectChange.type
          ? action.path
          : decodeURIComponent(action.path)
      ),
      switchMap((path) =>
        this.seedService.get$({ path }).pipe(
          map((value) => EditorActions.editorApiSeedsSeedGetSuccess({ value })),
          catchError((error) =>
            of(
              EditorActions.editorApiSeedsSeedGetError({
                message: error.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions<EditorActions.Actions>,
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
