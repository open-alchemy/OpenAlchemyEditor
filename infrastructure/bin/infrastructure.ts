#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

import { ApiStack } from "../lib/api-stack";
import { IdentityStack } from "../lib/identity-stack";
import { WebStack } from "../lib/web-stack";
import { ENVIRONMENT } from "../lib/environment";

const env = {
  account: ENVIRONMENT.AWS_ACCOUNT,
  region: ENVIRONMENT.AWS_DEFAULT_REGION,
};

const app = new cdk.App();
new ApiStack(app, "EditorApiStack", { env });
new IdentityStack(app, "IdentityStack", { env });
new WebStack(app, "EditorWebStack", { env });
