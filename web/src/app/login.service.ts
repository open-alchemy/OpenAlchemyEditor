import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';

import {
  calculateState,
  calculateRedirectHref,
  isNavigationEnd,
  isSignInComplete,
  isStateValid,
  getState,
  getCode,
  AUTHORIZATION_HEADERS,
  TOKEN_URI,
  calculatePostBody,
  addMetaToTokens,
  getPreviousPath,
  State,
} from './helpers/login';

import { GlobalService } from './global.service';

const STATE_KEY = 'state';
const TOKENS_KEY = 'tokens';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) {
    this.lookForSignInComplete(this.router.events);
  }

  login(): void {
    const window = this.globalService.getWindow();
    const state = calculateState(window.location.pathname);
    localStorage.setItem(STATE_KEY, state);
    window.location.href = calculateRedirectHref(window.location.origin, state);
  }

  lookForSignInComplete(events: Observable<Event>): void {
    events
      .pipe(
        filter(isNavigationEnd),
        filter(isSignInComplete),
        tap(this.checkStateValid.bind(this)),
        concatMap(this.getTokens.bind(this)),
        map(getState)
      )
      .subscribe({
        next: this.processNavigationEnd.bind(this),
        error: this.processNavigationError.bind(this),
      });
  }

  checkStateValid(event: NavigationEnd): void {
    const storedState = localStorage.getItem(STATE_KEY);
    localStorage.removeItem(STATE_KEY);

    if (!isStateValid(event, storedState)) {
      throw 'state is not valid';
    }
  }

  getTokens(event: NavigationEnd): Observable<NavigationEnd> {
    const window = this.globalService.getWindow();
    const code = getCode(event);
    const body = calculatePostBody(code, window.location.origin);
    return this.httpClient
      .post(TOKEN_URI, body, { headers: AUTHORIZATION_HEADERS })
      .pipe(
        map(addMetaToTokens),
        tap((tokens) =>
          localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens))
        ),
        map(() => event)
      );
  }

  processNavigationEnd(state: State): void {
    const pathname = getPreviousPath(state);
    this.router.navigate([pathname]);
  }

  processNavigationError(): void {
    this.router.navigate(['error']);
  }

  isLoggedIn(): boolean {
    return Boolean(localStorage.getItem(TOKENS_KEY));
  }
}
