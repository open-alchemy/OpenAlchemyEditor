import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../../../environments/environment';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let oAuthServiceSpy: jasmine.SpyObj<OAuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    oAuthServiceSpy = jasmine.createSpyObj('OAuthService', [
      'hasValidAccessToken',
      'initLoginFlow',
      'logOut',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MatButtonModule, FormsModule, NoopAnimationsModule],
      providers: [
        { provide: OAuthService, useValue: oAuthServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    sessionStorage.removeItem(environment.signInCompleteReturnPathKey);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    [
      {
        description: 'does not have valid access token',
        expectation: 'should show login',
        hasValidAccessTokenReturnValue: false,
        expectedLoginExists: true,
      },
      {
        description: 'has valid access token',
        expectation: 'should not show login',
        hasValidAccessTokenReturnValue: true,
        expectedLoginExists: false,
      },
    ].forEach(
      ({
        description,
        expectation,
        hasValidAccessTokenReturnValue,
        expectedLoginExists,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            // GIVEN oAuthService hasValidAccessToken that returns a value
            oAuthServiceSpy.hasValidAccessToken.and.returnValue(
              hasValidAccessTokenReturnValue
            );

            // WHEN change detection is run
            fixture.detectChanges();

            // THEN the login component exists or not as expected
            const login: HTMLButtonElement = fixture.nativeElement.querySelector(
              `[test-id="${component.selector}.login"]`
            );
            if (expectedLoginExists) {
              expect(login).toBeTruthy();
            } else {
              expect(login).toBeFalsy();
            }
          });
        });
      }
    );

    describe('click', () => {
      it('should set the current route in the session storage and call initLoginFlow', () => {
        // GIVEN oAuthService hasValidAccessToken that returns a value
        oAuthServiceSpy.hasValidAccessToken.and.returnValue(false);
        // AND router with a url
        const url = 'url 1';
        (routerSpy as any).url = url;

        // WHEN change detection is run and login is clicked
        fixture.detectChanges();
        const login: HTMLButtonElement = fixture.nativeElement.querySelector(
          `[test-id="${component.selector}.login"]`
        );
        expect(login).toBeTruthy();
        login.click();

        // THEN the url is written to session storage
        expect(
          sessionStorage.getItem(environment.signInCompleteReturnPathKey)
        ).toEqual(url);
        // AND initLoginFlow has been called
        expect(oAuthServiceSpy.initLoginFlow).toHaveBeenCalledOnceWith();
      });
    });
  });

  describe('logout', () => {
    [
      {
        description: 'does not have valid access token',
        expectation: 'should show logout',
        hasValidAccessTokenReturnValue: true,
        expectedLogoutExists: true,
      },
      {
        description: 'has valid access token',
        expectation: 'should not show logout',
        hasValidAccessTokenReturnValue: false,
        expectedLogoutExists: false,
      },
    ].forEach(
      ({
        description,
        expectation,
        hasValidAccessTokenReturnValue,
        expectedLogoutExists,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            // GIVEN oAuthService hasValidAccessToken that returns a value
            oAuthServiceSpy.hasValidAccessToken.and.returnValue(
              hasValidAccessTokenReturnValue
            );

            // WHEN change detection is run and login is clicked
            fixture.detectChanges();

            // THEN the logout component exists or not as expected
            const logout: HTMLButtonElement = fixture.nativeElement.querySelector(
              `[test-id="${component.selector}.logout"]`
            );
            if (expectedLogoutExists) {
              expect(logout).toBeTruthy();
            } else {
              expect(logout).toBeFalsy();
            }
          });
        });
      }
    );

    describe('click', () => {
      it('should call logout', () => {
        // GIVEN oAuthService hasValidAccessToken that returns a value
        oAuthServiceSpy.hasValidAccessToken.and.returnValue(true);

        // WHEN change detection is run and login is clicked
        fixture.detectChanges();
        const logout: HTMLButtonElement = fixture.nativeElement.querySelector(
          `[test-id="${component.selector}.logout"]`
        );
        expect(logout).toBeTruthy();
        logout.click();

        // THEN the url is written to session storage
        // AND logOut has been called
        expect(oAuthServiceSpy.logOut).toHaveBeenCalledOnceWith();
      });
    });
  });
});
