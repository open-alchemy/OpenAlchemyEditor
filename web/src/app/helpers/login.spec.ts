import { NavigationEnd, NavigationStart } from '@angular/router';
import {
  calculateState,
  calculateRedirectHref,
  isNavigationEnd,
  isSignInComplete,
  isStateValid,
  getCode,
  calculatePostBody,
  addMetaToTokens,
  getState,
  getPreviousPath,
} from './login';

describe('login helper', () => {
  describe('calculateState', () => {
    it('should put pathname and salt into base64 encoded string', () => {
      const pathname = 'path 1';

      const state = calculateState(pathname);

      const decodedState = atob(state);
      const stateObject = JSON.parse(decodedState);
      expect(stateObject.pathname).toEqual(pathname);
      expect(stateObject.salt).toBeTruthy();
    });

    it('should not generate the same state twice', () => {
      const pathname = 'path 1';

      const state1 = calculateState(pathname);
      const state2 = calculateState(pathname);

      expect(state1).not.toEqual(state2);
    });
  });

  describe('calculateRedirectHref', () => {
    it('should calculate the correct redirect Uri', () => {
      const origin = 'origin 1';
      const state = 'state 1';

      expect(calculateRedirectHref(origin, state)).toEqual(
        'https://login.openalchemy.io/login?response_type=code&client_id=1ahpcjva4jst9385sk7pv71nmb&redirect_uri=origin 1/sign-in-complete&state=state 1'
      );
    });
  });

  describe('isNavigationEnd', () => {
    const parameters = [
      {
        description: 'undefined',
        expectation: 'return false',
        event: undefined,
        expectedResult: false,
      },
      {
        description: 'null',
        expectation: 'return false',
        event: null,
        expectedResult: false,
      },
      {
        description: 'not NavigationEnd',
        expectation: 'return false',
        event: new NavigationStart(1, 'url 1'),
        expectedResult: false,
      },
      {
        description: 'NavigationEnd',
        expectation: 'return true',
        event: new NavigationEnd(1, 'url 1', 'url 2'),
        expectedResult: true,
      },
    ];

    parameters.map(({ description, expectation, event, expectedResult }) => {
      describe(description, () => {
        it(expectation, () => {
          expect(isNavigationEnd(event)).toEqual(expectedResult);
        });
      });
    });
  });

  describe('isSignInComplete', () => {
    const parameters = [
      {
        description: 'event null',
        expectation: 'return false',
        event: null,
        expectedResult: false,
      },
      {
        description: 'url null',
        expectation: 'return false',
        event: new NavigationEnd(1, null, '/sign-in-complete'),
        expectedResult: false,
      },
      {
        description: 'incorrect url but urlAfterRedirects is correct',
        expectation: 'return false',
        event: new NavigationEnd(1, 'url 1', '/sign-in-complete'),
        expectedResult: false,
      },
      {
        description: 'url correct',
        expectation: 'return true',
        event: new NavigationEnd(1, '/sign-in-complete', 'url 2'),
        expectedResult: true,
      },
      {
        description: 'url correct with additional',
        expectation: 'return true',
        event: new NavigationEnd(1, '/sign-in-complete?', 'url 2'),
        expectedResult: true,
      },
    ];

    parameters.map(({ description, expectation, event, expectedResult }) => {
      describe(description, () => {
        it(expectation, () => {
          expect(isSignInComplete(event)).toEqual(expectedResult);
        });
      });
    });
  });

  describe('isStateValid', () => {
    const parameters = [
      {
        description: 'event null',
        expectation: 'return false',
        event: null,
        storedState: 'state 1',
        expectedResult: false,
      },
      {
        description: 'storedState null',
        expectation: 'return false',
        event: new NavigationEnd(1, 'url 1', 'url 2'),
        storedState: null,
        expectedResult: false,
      },
      {
        description: 'event url no state',
        expectation: 'return false',
        event: new NavigationEnd(1, 'url 1', 'url 2'),
        storedState: 'state 1',
        expectedResult: false,
      },
      {
        description: 'event url different state',
        expectation: 'return false',
        event: new NavigationEnd(1, '?state=state 2', 'url 2'),
        storedState: 'state 1',
        expectedResult: false,
      },
      {
        description: 'event url same state',
        expectation: 'return false',
        event: new NavigationEnd(1, '?state=state 1', 'url 2'),
        storedState: 'state 1',
        expectedResult: true,
      },
    ];

    parameters.map(
      ({ description, expectation, event, storedState, expectedResult }) => {
        describe(description, () => {
          it(expectation, () => {
            expect(isStateValid(event, storedState)).toEqual(expectedResult);
          });
        });
      }
    );
  });

  describe('getCode', () => {
    it('should throw an error if no code is present', () => {
      expect(() => getCode(new NavigationEnd(1, 'url 1', 'url 2'))).toThrow(
        'sign in complete without code from sign in'
      );
    });

    it('should return the code from the url', () => {
      expect(getCode(new NavigationEnd(1, '?code=code 1', 'url 2'))).toEqual(
        'code 1'
      );
    });
  });

  describe('calculatePostBody', () => {
    it('should return the post body', () => {
      const code = 'code 1';
      const origin = 'origin 1';

      expect(calculatePostBody(code, origin)).toEqual(
        'grant_type=authorization_code&client_id=1ahpcjva4jst9385sk7pv71nmb&code=code 1&redirect_uri=origin 1/sign-in-complete'
      );
    });
  });

  describe('addMetaToTokens', () => {
    it('should add the current time', () => {
      const tokens = {
        access_token: 'access token 1',
        refresh_token: 'refresh token 1',
        id_token: 'id token 1',
        token_type: 'token type 1',
        expires_in: 1,
      };

      const returnedTokens = addMetaToTokens(tokens);
      expect(returnedTokens.access_token).toEqual(tokens.access_token);
      expect(returnedTokens.refresh_token).toEqual(tokens.refresh_token);
      expect(returnedTokens.id_token).toEqual(tokens.id_token);
      expect(returnedTokens.token_type).toEqual(tokens.token_type);
      expect(returnedTokens.expires_in).toEqual(tokens.expires_in);
      expect(returnedTokens.currentTime).toBeCloseTo(
        new Date().getTime() / 1000,
        -1
      );
    });
  });

  describe('getState', () => {
    it('should throw an error if no code is present', () => {
      expect(() => getState(new NavigationEnd(1, 'url 1', 'url 2'))).toThrow(
        'sign in complete without state from sign in'
      );
    });

    it('should return the code from the url', () => {
      const state = { pathname: 'path 1', salt: 'salt 1' };
      const stateString = window.btoa(JSON.stringify(state));

      expect(
        getState(new NavigationEnd(1, `?state=${stateString}`, 'url 2'))
      ).toEqual(state);
    });
  });

  describe('getPreviousPath', () => {
    it('should return pathname', () => {
      const pathname = 'path 1';
      const state = { pathname, salt: 'salt 1' };

      expect(getPreviousPath(state)).toEqual(pathname);
    });
  });
});
