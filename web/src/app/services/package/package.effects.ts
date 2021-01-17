import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { OAuthService } from 'angular-oauth2-oidc';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpecService, CredentialsService } from '@open-alchemy/package-sdk';

import * as PackageActions from './package.actions';
import * as EditorActions from '../editor/editor.actions';

export const SPEC_LANGUAGE = 'YAML';

@Injectable()
export class PackageEffects {
  packageApiSpecsSpecNamePut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PackageActions.saveComponentSaveClick.type),
      switchMap((action) => {
        if (!this.oAuthService.hasValidAccessToken()) {
          return of(
            PackageActions.authNotLoggedIn({
              message: 'you are not logged in, please login to save',
            })
          );
        }

        const accessToken = this.oAuthService.getAccessToken();
        return this.specService
          .put$({
            accessToken,
            name: action.name,
            value: action.value,
            language: SPEC_LANGUAGE,
          })
          .pipe(
            map(() =>
              PackageActions.packageApiSpecsSpecNamePutSuccess({
                name: action.name,
              })
            ),
            catchError((error) =>
              of(
                PackageActions.packageApiSpecsSpecNamePutError({
                  message: error.message,
                })
              )
            )
          );
      })
    )
  );

  routerNavigationSpecsId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PackageActions.packageApiSpecsSpecNamePutSuccess.type),
      tap((action) => this.router.navigate(['specs', action.name])),
      map(() => PackageActions.routerNavigationSpecsId())
    )
  );

  getCredentials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.routerNavigationEndSpecsId.type),
      switchMap(() =>
        this.credentialsService
          .get$({
            accessToken: this.oAuthService.getAccessToken(),
          })
          .pipe(
            map((credentials) =>
              PackageActions.packageApiCredentialsGetSuccess({ credentials })
            ),
            catchError((error) =>
              of(
                PackageActions.packageApiCredentialsGetError({
                  message: error.message,
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions<PackageActions.Actions>,
    private specService: SpecService,
    private credentialsService: CredentialsService,
    private oAuthService: OAuthService,
    private router: Router
  ) {}
}
