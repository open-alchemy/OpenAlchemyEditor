import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { OAuthService } from 'angular-oauth2-oidc';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpecService } from '@open-alchemy/package-sdk';

import * as PackageActions from './package.actions';

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
            map(() => PackageActions.packageApiSpecsSpecNamePutSuccess()),
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

  constructor(
    private actions$: Actions<PackageActions.Actions>,
    private specService: SpecService,
    private oAuthService: OAuthService
  ) {}
}
