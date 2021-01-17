import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import { of, Observable, timer } from 'rxjs';
import {
  map,
  filter,
  catchError,
  switchMap,
  withLatestFrom,
  tap,
} from 'rxjs/operators';

import { OAuthService } from 'angular-oauth2-oidc';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  SeedService,
  SpecService as EditorSpecService,
  ArtifactService,
} from '@open-alchemy/editor-sdk';
import { SpecService as PackageSpecService } from '@open-alchemy/package-sdk';

import * as EditorActions from './editor.actions';

export const SEED_KEY = 'seed';
export const SEED_URL_PREFIX = '/examples/';
export const SPEC_URL_PREFIX = '/specs/';
export const SPEC_LANGUAGE = 'YAML';

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
      tap((action) => this.router.navigate([SEED_URL_PREFIX, action.path])),
      map(() => EditorActions.routerNavigationSelectedSeed())
    )
  );

  specSaved$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EditorActions.editorComponentSeedLoaded.type,
        EditorActions.editorComponentValueChange.type
      ),
      tap((action) => localStorage.setItem(SEED_KEY, action.value)),
      map(() => EditorActions.specSaved())
    )
  );

  routerNavigationBase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.editorComponentValueChange.type),
      tap(() => this.location.go('')),
      map(() => EditorActions.routerNavigationBase())
    )
  );

  routerNavigationStartExamplesId$ = createEffect(() =>
    this.currentUrl$().pipe(
      filter((url) => url.startsWith(SEED_URL_PREFIX)),
      map((url) =>
        EditorActions.routerNavigationStartExamplesId({
          path: decodeURIComponent(url.slice(SEED_URL_PREFIX.length)),
        })
      )
    )
  );

  routerNavigationStartSpecsId$ = createEffect(() =>
    this.currentUrl$().pipe(
      filter((url) => url.startsWith(SPEC_URL_PREFIX)),
      map((url) =>
        EditorActions.routerNavigationStartSpecsId({
          spec_name: url.slice(SPEC_URL_PREFIX.length),
        })
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
      filter(({ url }) => !url.startsWith(SEED_URL_PREFIX)),
      filter(({ url }) => !url.startsWith(SPEC_URL_PREFIX)),
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
      ofType(EditorActions.routerNavigationStartExamplesId.type),
      map((action) => decodeURIComponent(action.path)),
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

  specsSpecNameGet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.routerNavigationStartSpecsId.type),
      switchMap((action) =>
        this.packageSpecService
          .get$({
            name: action.spec_name,
            accessToken: this.oAuthService.getAccessToken(),
          })
          .pipe(
            map((response) =>
              EditorActions.packageApiSpecsSpecNameGetSuccess({ response })
            ),
            catchError((error) =>
              of(
                EditorActions.packageApiSpecsSpecNameGetError({
                  message: error.message,
                })
              )
            )
          )
      )
    )
  );

  stableSpecValueChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EditorActions.editorComponentSeedLoaded.type,
        EditorActions.editorComponentValueChange.type
      ),
      switchMap((action) =>
        timer(1000).pipe(
          map(() =>
            EditorActions.stableSpecValueChange({ value: action.value })
          )
        )
      )
    )
  );

  specValidateManaged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.stableSpecValueChange.type),
      switchMap((action) =>
        this.editorSpecService
          .validateManaged$({ value: action.value, language: SPEC_LANGUAGE })
          .pipe(
            map((response) =>
              EditorActions.editorApiSpecValidateManagedSuccess({ response })
            ),
            catchError((error) =>
              of(
                EditorActions.editorApiSpecValidateManagedError({
                  message: error.message,
                })
              )
            )
          )
      )
    )
  );

  specValidateUnManaged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.stableSpecValueChange.type),
      switchMap((action) =>
        this.editorSpecService
          .validateUnManaged$({ value: action.value, language: SPEC_LANGUAGE })
          .pipe(
            map((response) =>
              EditorActions.editorApiSpecValidateUnManagedSuccess({ response })
            ),
            catchError((error) =>
              of(
                EditorActions.editorApiSpecValidateUnManagedError({
                  message: error.message,
                })
              )
            )
          )
      )
    )
  );

  artifactCalculate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.stableSpecValueChange.type),
      switchMap((action) =>
        this.artifactService
          .calculate$({ value: action.value, language: SPEC_LANGUAGE })
          .pipe(
            map((response) =>
              EditorActions.editorApiArtifactCalculateSuccess({ response })
            ),
            catchError((error) =>
              of(
                EditorActions.editorApiArtifactCalculateError({
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
    private editorSpecService: EditorSpecService,
    private packageSpecService: PackageSpecService,
    private artifactService: ArtifactService,
    private router: Router,
    private location: Location,
    private oAuthService: OAuthService
  ) {}

  currentUrl$(): Observable<string> {
    return this.router.events.pipe(
      filter<NavigationStart>((event) => event instanceof NavigationStart),
      map((event) => event.url)
    );
  }
}
