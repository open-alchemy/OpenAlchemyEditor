import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as certificatemanager from '@aws-cdk/aws-certificatemanager';

import { ENVIRONMENT } from './environment';
import { CONFIG } from './config';

export class IdentityStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // User pool
    const pool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'OpenAlchemyUserPool',
      selfSignUpEnabled: true,
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        phoneNumber: {
          required: false,
          mutable: true,
        },
      },
      userVerification: {
        emailSubject: CONFIG.identity.userVerification.subject,
        emailBody: CONFIG.identity.userVerification.message,
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage: CONFIG.identity.userVerification.message,
      },
      userInvitation: {
        emailSubject: CONFIG.identity.userInvitation.subject,
        emailBody: CONFIG.identity.userInvitation.message,
        smsMessage: CONFIG.identity.userInvitation.message,
      },
      signInAliases: {
        username: true,
        email: true,
        phone: true,
        preferredUsername: true,
      },
      mfa: cognito.Mfa.OPTIONAL,
      mfaSecondFactor: {
        sms: true,
        otp: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
    });

    // Package server
    const packageUrl = `https://${CONFIG.package.api.recordName}.${CONFIG.domainName}`;
    const packageScopeSpecRead = 'spec.read';
    const packageScopeSpecWrite = 'spec.write';
    const packageScopeCredentialsRead = 'credentials.read';
    const packageScopeCredentialsWrite = 'credentials.write';
    pool.addResourceServer('PackageesourceServer', {
      userPoolResourceServerName: 'package',
      identifier: packageUrl,
      scopes: [
        new cognito.ResourceServerScope({
          scopeName: packageScopeSpecRead,
          scopeDescription: 'read only spec access',
        }),
        new cognito.ResourceServerScope({
          scopeName: packageScopeSpecWrite,
          scopeDescription: 'write only spec access',
        }),
        new cognito.ResourceServerScope({
          scopeName: packageScopeCredentialsRead,
          scopeDescription: 'read only credentials access',
        }),
        new cognito.ResourceServerScope({
          scopeName: packageScopeCredentialsWrite,
          scopeDescription: 'write only credentials access',
        }),
        new cognito.ResourceServerScope({
          scopeName: cognito.OAuthScope.COGNITO_ADMIN.scopeName,
          scopeDescription: 'admin access',
        }),
      ],
    });

    // Add editor client
    const editorUrl = `https://${CONFIG.web.recordName}.${CONFIG.domainName}`;
    pool.addClient('open-alchemy-editor', {
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      oAuth: {
        flows: {
          implicitCodeGrant: true,
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.PHONE,
          cognito.OAuthScope.PROFILE,
          cognito.OAuthScope.custom(`${packageUrl}/${packageScopeSpecRead}`),
          cognito.OAuthScope.custom(`${packageUrl}/${packageScopeSpecWrite}`),
          cognito.OAuthScope.custom(
            `${packageUrl}/${packageScopeCredentialsRead}`
          ),
        ],
        callbackUrls: [
          `${editorUrl}${CONFIG.identity.signInCompletePath}`,
          `${CONFIG.identity.localHostname}${CONFIG.identity.signInCompletePath}`,
        ],
      },
      preventUserExistenceErrors: true,
    });

    // Add package client
    const packageClientUrl = `https://${CONFIG.package.web.recordName}.${CONFIG.domainName}`;
    pool.addClient('open-alchemy-package', {
      userPoolClientName: 'package',
      authFlows: {
        userPassword: true,
        userSrp: true,
        adminUserPassword: true,
      },
      oAuth: {
        flows: {
          implicitCodeGrant: true,
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.PHONE,
          cognito.OAuthScope.PROFILE,
          cognito.OAuthScope.custom(`${packageUrl}/${packageScopeSpecRead}`),
          cognito.OAuthScope.custom(`${packageUrl}/${packageScopeSpecWrite}`),
          cognito.OAuthScope.custom(
            `${packageUrl}/${packageScopeCredentialsRead}`
          ),
          cognito.OAuthScope.custom(
            `${packageUrl}/${packageScopeCredentialsWrite}`
          ),
        ],
        callbackUrls: [
          `${packageClientUrl}${CONFIG.identity.signInCompletePath}`,
          `${CONFIG.identity.localHostname}${CONFIG.identity.signInCompletePath}`,
        ],
      },
      preventUserExistenceErrors: true,
    });

    // Add admin client
    pool.addClient('open-alchemy-admin', {
      userPoolClientName: 'admin',
      authFlows: {
        adminUserPassword: true,
      },
      oAuth: {
        flows: {
          implicitCodeGrant: true,
          authorizationCodeGrant: true,
        },
        scopes: [cognito.OAuthScope.COGNITO_ADMIN],
      },
      preventUserExistenceErrors: true,
    });

    // Configure domain
    const certificateArn = ENVIRONMENT.AWS_OPEN_ALCHEMY_CERTIFICATE_ARN;
    const certificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      'Certificate',
      certificateArn
    );
    const poolDomain = pool.addDomain('PoolDomain', {
      customDomain: {
        domainName: `${CONFIG.identity.recordName}.${CONFIG.domainName}`,
        certificate,
      },
    });

    // Define DNS record
    const zone = route53.PublicHostedZone.fromLookup(this, 'PublicHostedZone', {
      domainName: CONFIG.domainName,
    });
    new route53.ARecord(this, 'AliasRecord', {
      zone,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.UserPoolDomainTarget(poolDomain)
      ),
      recordName: CONFIG.identity.recordName,
    });
  }
}
