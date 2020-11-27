import { cold, getTestScheduler } from 'jasmine-marbles';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { LoginService } from './login.service';
import { GlobalService } from './global.service';
import { EMPTY, of } from 'rxjs';

interface Window {
  location: {
    href: string;
    origin: string;
  };
}

describe('LoginService', () => {
  let service: LoginService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;
  let globalServiceSpy: jasmine.SpyObj<GlobalService>;
  let localStorageSetItemSpy: jasmine.Spy;
  let localStorageGetItemSpy: jasmine.Spy;
  let localStorageRemoveItemSpy: jasmine.Spy;
  let window: Window;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    globalServiceSpy = jasmine.createSpyObj('GlobalService', ['getWindow']);
    window = { location: { href: 'initial href', origin: 'initial origin' } };
    globalServiceSpy.getWindow.and.returnValue(window as any);
    localStorageSetItemSpy = spyOn(localStorage, 'setItem');
    localStorageGetItemSpy = spyOn(localStorage, 'getItem');
    localStorageRemoveItemSpy = spyOn(localStorage, 'removeItem');
  });

  describe('unit tests', () => {
    beforeEach(() => {
      (routerSpy as any).events = EMPTY as any;

      service = new LoginService(routerSpy, httpClientSpy, globalServiceSpy);
    });

    describe('login', () => {
      it('should set the state', () => {
        service.login();

        expect(localStorageSetItemSpy).toHaveBeenCalledTimes(1);
        expect(localStorageSetItemSpy.calls.mostRecent().args[0]).toEqual(
          'state'
        );
        expect(localStorageSetItemSpy.calls.mostRecent().args[1]).toBeTruthy();
      });

      it('should set the href', () => {
        service.login();

        expect(
          window.location.href.startsWith(
            'https://login.openalchemy.io/login?response_type=code&client_id=2p8jirs0n59c4f3n4nttiv14u4&redirect_uri=initial origin/sign-in-complete&state='
          )
        ).toBeTrue();
      });
    });

    describe('checkStateValid', () => {
      it('should retrieve the state', () => {
        localStorageGetItemSpy.and.returnValue('state 1');

        service.checkStateValid(
          new NavigationEnd(1, '?state=state 1', 'url 2')
        );

        expect(localStorageGetItemSpy).toHaveBeenCalledTimes(1);
        expect(localStorageGetItemSpy).toHaveBeenCalledWith('state');
      });

      it('should remove the state', () => {
        localStorageGetItemSpy.and.returnValue('state 1');

        service.checkStateValid(
          new NavigationEnd(1, '?state=state 1', 'url 2')
        );

        expect(localStorageRemoveItemSpy).toHaveBeenCalledTimes(1);
        expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('state');
      });

      it('should throw an error if the state is not valid', () => {
        expect(() =>
          service.checkStateValid(new NavigationEnd(1, 'url 1', 'url 2'))
        ).toThrow('state is not valid');
      });
    });

    describe('getTokens', () => {
      it('should call post with correct uri, body and headers', () => {
        httpClientSpy.post.and.returnValue(EMPTY);

        service.getTokens(new NavigationEnd(1, '?code=code 1', 'url 2'));

        expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
        expect(httpClientSpy.post.calls.mostRecent().args[0]).toEqual(
          'https://login.openalchemy.io/oauth2/token'
        );
        expect(httpClientSpy.post.calls.mostRecent().args[1]).toEqual(
          'grant_type=authorization_code&client_id=2p8jirs0n59c4f3n4nttiv14u4&code=code 1&redirect_uri=initial origin/sign-in-complete'
        );
        expect(httpClientSpy.post.calls.mostRecent().args[2]).toEqual({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
      });

      it('should save the tokens', () => {
        httpClientSpy.post.and.returnValue(of({ key: 'value' }));

        service
          .getTokens(new NavigationEnd(1, '?code=code 1', 'url 2'))
          .subscribe();

        expect(localStorageSetItemSpy).toHaveBeenCalledTimes(1);
        expect(localStorageSetItemSpy.calls.mostRecent().args[0]).toEqual(
          'tokens'
        );
        const valueArg = JSON.parse(
          localStorageSetItemSpy.calls.mostRecent().args[1]
        );
        expect(valueArg.key).toEqual('value');
        expect(valueArg.currentTime).toBeCloseTo(
          new Date().getTime() / 1000,
          -1
        );
      });

      it('should emit the event', () => {
        httpClientSpy.post.and.returnValue(of({ key: 'value' }));

        const event = new NavigationEnd(1, '?code=code 1', 'url 2');

        expect(service.getTokens(event)).toBeObservable(
          cold('(a|)', { a: event })
        );
      });

      it('should emit the event', () => {
        httpClientSpy.post.and.returnValue(cold('#'));

        const event = new NavigationEnd(1, '?code=code 1', 'url 2');

        expect(service.getTokens(event)).toBeObservable(cold('#'));
      });
    });

    describe('lookForSignInComplete', () => {
      it('should do nothing if not navigation end', () => {
        getTestScheduler().run(() => {
          const event$ = cold('a', {
            a: new NavigationStart(1, '/sign-in-complete'),
          });

          service.lookForSignInComplete(event$);
        });

        expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
      });

      it('should do nothing if not sign in complete navigation', () => {
        getTestScheduler().run(() => {
          const event$ = cold('a', {
            a: new NavigationEnd(1, `url 1`, 'url 2'),
          });

          service.lookForSignInComplete(event$);
        });

        expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
      });

      it('should navigate to error page if state is not valid', () => {
        getTestScheduler().run(() => {
          const stateString = 'state 1';
          localStorageGetItemSpy.and.returnValue('state 2');
          const event$ = cold('a', {
            a: new NavigationEnd(
              1,
              `/sign-in-complete?code=code 1&state=${stateString}`,
              'url 2'
            ),
          });
          httpClientSpy.post.and.returnValue(
            cold('a', { a: { key: 'value' } })
          );

          service.lookForSignInComplete(event$);
        });

        expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['error']);
      });

      it('should navigate to error page if http post returns an error', () => {
        getTestScheduler().run(() => {
          const state = { pathname: 'path 1' };
          const stateString = btoa(JSON.stringify(state));
          localStorageGetItemSpy.and.returnValue(stateString);
          const event$ = cold('a', {
            a: new NavigationEnd(
              1,
              `/sign-in-complete?code=code 1&state=${stateString}`,
              'url 2'
            ),
          });
          httpClientSpy.post.and.returnValue(cold('#'));

          service.lookForSignInComplete(event$);
        });

        expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['error']);
      });

      it('should navigate to previous path on sign in success', () => {
        getTestScheduler().run(() => {
          const state = { pathname: 'path 1' };
          const stateString = btoa(JSON.stringify(state));
          localStorageGetItemSpy.and.returnValue(stateString);
          const event$ = cold('a', {
            a: new NavigationEnd(
              1,
              `/sign-in-complete?code=code 1&state=${stateString}`,
              'url 2'
            ),
          });
          httpClientSpy.post.and.returnValue(
            cold('a', { a: { key: 'value' } })
          );

          service.lookForSignInComplete(event$);
        });

        expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['path 1']);
      });
    });

    describe('isLoggedIn', () => {
      it('should return false if session storage does not contain tokens', () => {
        localStorageGetItemSpy.and.returnValue(null);

        expect(service.isLoggedIn()).toBeFalse();
      });

      it('should return true if session storage does contain tokens', () => {
        localStorageGetItemSpy.and.returnValue('tokens');

        expect(service.isLoggedIn()).toBeTrue();
      });
    });
  });

  describe('integration', () => {
    it('should navigate to new path', () => {
      getTestScheduler().run(() => {
        const state = { pathname: 'path 1' };
        const stateString = btoa(JSON.stringify(state));
        localStorageGetItemSpy.and.returnValue(stateString);
        (routerSpy.events as any) = cold('a', {
          a: new NavigationEnd(
            1,
            `/sign-in-complete?code=code 1&state=${stateString}`,
            'url 2'
          ),
        });
        httpClientSpy.post.and.returnValue(cold('a', { a: { key: 'value' } }));

        service = new LoginService(routerSpy, httpClientSpy, globalServiceSpy);
      });

      expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['path 1']);
    });
  });
});
