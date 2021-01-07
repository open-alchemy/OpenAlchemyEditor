#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { ApiStack } from '../lib/api-stack';
import { IdentityStack } from '../lib/identity-stack';
import { WebStack } from '../lib/web-stack';
import { ENVIRONMENT } from '../lib/environment';

const env = {
  account: ENVIRONMENT.awsAccount,
  region: ENVIRONMENT.awsDefaultRegion,
};

const app = new cdk.App();
if (ENVIRONMENT.stack === 'EditorApiStack') {
  new ApiStack(app, 'EditorApiStack', { env });
}
if (ENVIRONMENT.stack === 'IdentityStack') {
  new IdentityStack(app, 'IdentityStack', { env });
}
if (ENVIRONMENT.stack === 'EditorWebStack') {
  new WebStack(app, 'EditorWebStack', { env });
}
