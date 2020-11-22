#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

import { InfrastructureStack } from "../lib/infrastructure-stack";
import { ENVIRONMENT } from "../lib/environment";

const env = {
  account: ENVIRONMENT.AWS_ACCOUNT,
  region: ENVIRONMENT.AWS_DEFAULT_REGION,
};

const app = new cdk.App();
new InfrastructureStack(app, "InfrastructureStack", { env });
