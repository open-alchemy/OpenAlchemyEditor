import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../../../environments/environment';

const SELECTOR = 'app-login';

@Component({
  selector: SELECTOR,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  selector = SELECTOR;

  constructor(public oAuthService: OAuthService, private router: Router) {}

  onLoginClick(): void {
    // Save the current url
    sessionStorage.setItem(
      environment.signInCompleteReturnPathKey,
      this.router.url
    );
    this.oAuthService.initLoginFlow();
  }

  onLogoutClick(): void {
    this.oAuthService.logOut();
  }
}
