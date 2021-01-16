import { Component } from '@angular/core';

import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

const AUTH_CODE_FLOW_CONFIG: AuthConfig = {
  issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XBKoHuMO2',
  redirectUri: `${window.location.origin}/sign-in-complete`,
  clientId: '1doe7pd4aijcnsjl01pga20nhv',
  responseType: 'code',
  scope:
    'https://package.api.openalchemy.io/spec.read ' +
    'https://package.api.openalchemy.io/spec.write ' +
    'https://package.api.openalchemy.io/credentials.read',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OpenAlchemy Editor';

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(AUTH_CODE_FLOW_CONFIG);
    this.oauthService.setStorage(localStorage);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
  }
}
