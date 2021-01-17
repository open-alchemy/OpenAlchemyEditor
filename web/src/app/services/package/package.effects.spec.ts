import { Router } from '@angular/router';

import { EMPTY } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { SpecService, SpecError } from '@open-alchemy/package-sdk';
import { OAuthService } from 'angular-oauth2-oidc';

import { PackageEffects } from './package.effects';
import * as PackageActions from './package.actions';

describe('PackageEffects', () => {
  let actions$: Actions<PackageActions.Actions>;
  let effects: PackageEffects;
  let specServiceSpy: jasmine.SpyObj<SpecService>;
  let oAuthServiceSpy: jasmine.SpyObj<OAuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    specServiceSpy = jasmine.createSpyObj('SpecService', ['put$']);
    oAuthServiceSpy = jasmine.createSpyObj('SpecService', [
      'hasValidAccessToken',
      'getAccessToken',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    actions$ = EMPTY;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('packageApiSpecsSpecNamePut$', () => {
    ([
      {
        description: 'empty actions',
        expectation: 'should return empty actions',
        actionsMarbles: '',
        actionsValues: {},
        oAuthServiceHasValidAccessTokenReturnValue: false,
        oAuthServiceGetAccessTokenReturnValue: 'token 1',
        specServicePutReturnValues: [],
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'different action actions',
        expectation: 'should return empty actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: PackageActions.packageApiSpecsSpecNamePutSuccess({
            name: 'name 1',
          }),
        },
        oAuthServiceHasValidAccessTokenReturnValue: false,
        oAuthServiceGetAccessTokenReturnValue: 'token 1',
        specServicePutReturnValues: [],
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description:
          'single save component save click actions hasValidAccessToken returns false put$ return success',
        expectation: 'should return single error action actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: PackageActions.saveComponentSaveClick({
            value: 'value 1',
            name: 'name 1',
          }),
        },
        specServicePutReturnValues: [],
        oAuthServiceHasValidAccessTokenReturnValue: false,
        oAuthServiceGetAccessTokenReturnValue: 'token 1',
        expectedMarbles: 'a',
        expectedValues: {
          a: PackageActions.authNotLoggedIn({
            message: 'you are not logged in, please login to save',
          }),
        },
      },
      {
        description:
          'single save component save click actions put$ return success',
        expectation: 'should return single success action actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: PackageActions.saveComponentSaveClick({
            value: 'value 1',
            name: 'name 1',
          }),
        },
        specServicePutReturnValues: [{ marbles: '-b|', values: { b: null } }],
        oAuthServiceHasValidAccessTokenReturnValue: true,
        oAuthServiceGetAccessTokenReturnValue: 'token 1',
        expectedMarbles: '-b',
        expectedValues: {
          b: PackageActions.packageApiSpecsSpecNamePutSuccess({
            name: 'name 1',
          }),
        },
      },
      {
        description:
          'single save component save click actions put$ throws error',
        expectation: 'should return single error action actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: PackageActions.saveComponentSaveClick({
            value: 'value 1',
            name: 'name 1',
          }),
        },
        specServicePutReturnValues: [{ marbles: '-#|' }],
        oAuthServiceHasValidAccessTokenReturnValue: true,
        oAuthServiceGetAccessTokenReturnValue: 'token 1',
        expectedMarbles: '-b',
        expectedValues: {
          b: PackageActions.packageApiSpecsSpecNamePutError({
            message: 'message 1',
          }),
        },
      },
      {
        description:
          'multiple save component save click actions put$ return success before next',
        expectation: 'should return multiple success action actions',
        actionsMarbles: 'a--d',
        actionsValues: {
          a: PackageActions.saveComponentSaveClick({
            value: 'value 1',
            name: 'name 1',
          }),
          d: PackageActions.saveComponentSaveClick({
            value: 'value 2',
            name: 'name 2',
          }),
        },
        specServicePutReturnValues: [
          { marbles: '-b|', values: { b: null } },
          { marbles: '-e|', values: { e: null } },
        ],
        oAuthServiceHasValidAccessTokenReturnValue: true,
        oAuthServiceGetAccessTokenReturnValue: 'token 1',
        expectedMarbles: '-b--e',
        expectedValues: {
          b: PackageActions.packageApiSpecsSpecNamePutSuccess({
            name: 'name 1',
          }),
          e: PackageActions.packageApiSpecsSpecNamePutSuccess({
            name: 'name 2',
          }),
        },
      },
      {
        description:
          'multiple save component save click actions put$ return success after next',
        expectation: 'should return single success actions',
        actionsMarbles: 'a--d',
        actionsValues: {
          a: PackageActions.saveComponentSaveClick({
            value: 'value 1',
            name: 'name 1',
          }),
          d: PackageActions.saveComponentSaveClick({
            value: 'value 2',
            name: 'name 2',
          }),
        },
        specServicePutReturnValues: [
          { marbles: '----e|', values: { e: null } },
          { marbles: '-e|', values: { e: null } },
        ],
        oAuthServiceHasValidAccessTokenReturnValue: true,
        oAuthServiceGetAccessTokenReturnValue: 'token 1',
        expectedMarbles: '----e',
        expectedValues: {
          e: PackageActions.packageApiSpecsSpecNamePutSuccess({
            name: 'name 2',
          }),
        },
      },
    ] as {
      description: string;
      expectation: string;
      actionsMarbles: string;
      actionsValues: { [key: string]: PackageActions.Actions };
      specServicePutReturnValues: {
        marbles: string;
        values: { [key: string]: null };
      }[];
      oAuthServiceHasValidAccessTokenReturnValue: boolean;
      oAuthServiceGetAccessTokenReturnValue: string;
      expectedMarbles: string;
      expectedValues: { [key: string]: Action };
    }[]).forEach(
      ({
        description,
        expectation,
        actionsMarbles,
        actionsValues,
        specServicePutReturnValues,
        oAuthServiceHasValidAccessTokenReturnValue,
        oAuthServiceGetAccessTokenReturnValue,
        expectedMarbles,
        expectedValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            testScheduler.run((helpers) => {
              // GIVEN actions
              actions$ = helpers.cold(
                actionsMarbles,
                actionsValues
              ) as Actions<PackageActions.Actions>;
              // AND seedService put$ that returns values
              specServiceSpy.put$.and.returnValues(
                ...specServicePutReturnValues.map(({ marbles, values }) =>
                  helpers.cold(marbles, values, new SpecError('message 1'))
                )
              );
              // AND OAuthService that returns values
              oAuthServiceSpy.hasValidAccessToken.and.returnValue(
                oAuthServiceHasValidAccessTokenReturnValue
              );
              oAuthServiceSpy.getAccessToken.and.returnValue(
                oAuthServiceGetAccessTokenReturnValue
              );

              // WHEN packageApiSpecsSpecNamePut$ is called
              effects = new PackageEffects(
                actions$,
                specServiceSpy,
                oAuthServiceSpy,
                routerSpy
              );
              const returnedActions = effects.packageApiSpecsSpecNamePut$;

              // THEN the expected actions are returned
              helpers
                .expectObservable(returnedActions)
                .toBe(expectedMarbles, expectedValues);
            });

            // AND seedService put$ has been called
            expect(specServiceSpy.put$).toHaveBeenCalledTimes(
              specServicePutReturnValues.length
            );
            if (specServicePutReturnValues.length > 0) {
              expect(specServiceSpy.put$).toHaveBeenCalledWith({
                accessToken: 'token 1',
                name: 'name 1',
                value: 'value 1',
                language: 'YAML',
              });
            }
          });
        });
      }
    );
  });

  describe('routerNavigationSpecsId$', () => {
    ([
      {
        description: 'empty actions',
        expectation: 'should return empty actions',
        actionsMarbles: '',
        actionsValues: {},
        expectedPath: null,
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'different action actions',
        expectation: 'should return empty actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: PackageActions.packageApiSpecsSpecNamePutError({
            message: 'message 1',
          }),
        },
        expectedPath: null,
        expectedMarbles: '',
        expectedValues: {},
      },
      {
        description: 'single package api specs spec name get success actions',
        expectation:
          'should navigate to specs/:id and return single action actions',
        actionsMarbles: 'a',
        actionsValues: {
          a: PackageActions.packageApiSpecsSpecNamePutSuccess({
            name: 'name 1',
          }),
        },
        expectedPath: 'name 1',
        expectedMarbles: 'a',
        expectedValues: { a: PackageActions.routerNavigationSpecsId() },
      },
    ] as {
      description: string;
      expectation: string;
      actionsMarbles: string;
      actionsValues: { [key: string]: Action };
      expectedPath: string | null;
      expectedMarbles: string;
      expectedValues: { [key: string]: Action };
    }[]).forEach(
      ({
        description,
        expectation,
        actionsMarbles,
        actionsValues,
        expectedPath,
        expectedMarbles,
        expectedValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            testScheduler.run((helpers) => {
              // GIVEN actions
              actions$ = helpers.cold(
                actionsMarbles,
                actionsValues
              ) as Actions<PackageActions.Actions>;

              // WHEN routerNavigationSpecsId$ is called
              effects = new PackageEffects(
                actions$,
                specServiceSpy,
                oAuthServiceSpy,
                routerSpy
              );
              const returnedActions = effects.routerNavigationSpecsId$;

              // THEN the expected actions are returned
              helpers
                .expectObservable(returnedActions)
                .toBe(expectedMarbles, expectedValues);
            });

            // AND router.navigate has been called
            if (expectedPath !== null) {
              expect(routerSpy.navigate).toHaveBeenCalledWith([
                'specs',
                expectedPath,
              ]);
            }
          });
        });
      }
    );
  });
});
